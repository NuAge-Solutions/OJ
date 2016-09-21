import re

from utils import *
from zipfile import ZipFile, ZIP_DEFLATED


class Builder (object):

    # lifecycle methods
    def __init__(self, manifest):
        super(Builder, self).__init__()

        self.manifest = manifest if isinstance(manifest, dict) else load_manifest_file(manifest)

    def _build_zip(self, destination, package, build, mode):
        zip_name = package
        mode_suffix = ""
        source = os.path.join(destination, package)
        dist = os.path.join(destination, "dist")

        if mode != "prod":
            mode_suffix = "-" + mode

            zip_name += mode_suffix

        mkdir(dist)

        zip = ZipFile(os.path.join(dist, zip_name + ".zip"), 'w', ZIP_DEFLATED)
        checksums = {}

        def _add_file(file_path, is_assets=False):
            file_path = os.path.join(source, file_path)

            if not os.path.exists(file_path):
                return

            if os.path.isdir(file_path):
                for root, dirs, files in os.walk(file_path):
                    for file in files:
                        if file[0] == ".":
                            continue

                        if not is_assets and (
                                        file[-3:] == ".gz" or (mode_suffix and mode_suffix not in file) or (not mode_suffix and "-" in file)
                        ):
                            continue

                        sub_file = os.path.join(root, file)

                        zip_path = sub_file.replace(source, "")

                        checksums[zip_path[1:]] = githash(sub_file)

                        zip.write(sub_file, "www" + zip_path)

            else:
                zip_path = file_path.replace(source, "")

                checksums[zip_path[1:]] = githash(file_path)

                zip.write(file_path, "www" + zip_path)

        for html_path in build["html_files"]:
            _add_file(os.path.basename(html_path))

        for pkg in build["packages"]:
            parts = pkg.split(".")

            if len(parts) > 1:
                parts.insert(1, "packages")

            path = "/".join(parts)

            _add_file(os.path.join(path, "main" + mode_suffix + ".js"))
            _add_file(os.path.join(path, "main" + mode_suffix + ".css"))
            _add_file(os.path.join(path, "assets"), is_assets=True)
            _add_file(os.path.join(path, "themes"))

            # add tests file
            if mode_suffix:
                _add_file(os.path.join(path, "tests.js"))

        
        zip.writestr("www/checksum.json", json.dumps(checksums))
        
        zip.close()

    def _find_manifest_and_build(self, package):
        manifest = None

        for k in self.manifest:
            manifest = self.manifest[k]
            build = manifest.get("builds", {}).get(package)

            if build:
                return manifest, build

        return manifest, None

    def run(self, destination, packages, mode="prod"):
        # setup compiler
        from utils.compiler import Compiler

        compiler = Compiler(self.manifest)

        # process builds
        for package in packages:
            manifest, build = self._find_manifest_and_build(package)
            p_destination = os.path.join(destination, package)

            if not build:
                raise Exception("No Build Found ({})".format(package))

            # run the compiler
            compiler.run(p_destination, mode=mode, packages=build["packages"])

            # process the html
            css_imports = []
            js_imports = []
            test_imports = []

            head_indent = "    "
            meta_indent = "        "

            for p in build["packages"]:
                parts = p.split(".")
                parts.append("main")

                is_sub_package = len(parts) > 2

                if is_sub_package:
                    parts.insert(1, "packages")

                file = "/".join(parts)

                css_imports.append(
                    meta_indent + "<link rel=\"stylesheet\" type=\"text/css\" href=\"{}-dev.css\" />".format(file)
                )

                js_imports.append(
                    meta_indent + "<script type=\"text/javascript\" language=\"javascript\" src=\"{}-dev.js\"></script>".format(file)
                )

                # add tests file
                parts[-1] = "tests.js"

                file = "/".join(parts)

                tests_file = os.path.join(p_destination, file)

                if os.path.exists(tests_file):
                    test_imports.append(
                        meta_indent + "<script type=\"text/javascript\" language=\"javascript\" src=\"{}\"></script>".format(
                            file
                        )
                    )

            html_files = {}
            html_paths = build["html"] if isinstance(build["html"], (list, tuple)) else [build["html"]]

            for html_path in html_paths:
                html_dev_path = os.path.join(p_destination, html_path.split("/")[-1].replace(".", "-dev."))

                html_files[html_dev_path] = file_get_contents(os.path.join(manifest["source_path"], html_path)).replace(
                    "</head>",
                    "\n{}\n\n{}\n{}</head>".format(
                        "\n".join(css_imports),
                        "\n".join(js_imports),
                        head_indent
                    )
                )

            for html_path in html_files:
                # process dev html
                dev_html = html_files[html_path].replace(
                    "<head>",
                    "<head>" +
                    "\n" + meta_indent + "<meta content=\"utf-8\" http-equiv=\"encoding\" />" +
                    "\n" + meta_indent + "<meta http-equiv=\"cache-control\" content=\"no-cache\">" +
                    "\n" + meta_indent + "<meta http-equiv=\"expires\" content=\"0\">" +
                    "\n" + meta_indent + "<meta http-equiv=\"pragma\" content=\"no-cache\">" +
                    "\n"
                )

                dev_html = dev_html.replace(
                    "</head>",
                    "\n{}\n{}</head>".format(
                        "\n".join(test_imports),
                        head_indent
                    )
                )

                needle = re.search("id=[\"|']OJ[\"|']", dev_html)

                if needle:
                    index = needle.end(0)

                    dev_html = dev_html[:index] + " mode=\"development\" " + dev_html[index:]

                else:
                    dev_html = dev_html.replace("<body", "<body mode=\"development\" ")

                file_put_contents(html_path, dev_html)

            build["html_files"] = html_files

            self._build_zip(destination, package, build, "dev")

            # process prod html
            if mode == "prod":
                prod_html_files = {}

                for html_path in html_files:
                    prod_html = html_files[html_path].replace("-dev.", ".")
                    prod_html_path = html_path.replace("-dev.", ".")

                    prod_html_files[prod_html_path] = prod_html

                    file_put_contents(prod_html_path, prod_html)

                build["html_files"] = prod_html_files

                self._build_zip(destination, package, build, mode)
