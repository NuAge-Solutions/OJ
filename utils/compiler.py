import gzip

from subprocess import call
from random import randint
from utils import *


class Compiler (object):

    # lifecycle methods
    def __init__(self, manifest):
        super(Compiler, self).__init__()

        self._assets_exc = None
        self._assets_inc = None
        self._assets_src = None
        self._css_src = None
        self._classes_exc = []
        self._classes_inc = ['*']
        self._destination = None
        self._is_sub_pkg = False
        self._js_src = None
        self._name = None
        self._namespace = None
        self._package = None
        self._pre_compiled = []
        self._templates_src = None
        self._themes_exc = []
        self._themes_inc = ['*']
        self._themes_src = None

        self.build = None
        self.destination = None
        self.mode = PROD
        self.packages = ALL
        self.types = TYPES

        self.manifest = manifest if isinstance(manifest, dict) else load_manifest_file(manifest)

    # loading methods
    def _load_manifest_file(self, manifest_path):
        # get the manifest directory path
        manifest_dir = os.path.dirname(manifest_path)

        # load the manifest file
        manifest = load_json(manifest_path)
        dependencies = {}

        # process the manifest packages
        for key in manifest:
            val = manifest[key]

            # check for a package dict
            if isinstance(val, dict):
                # update the source path
                if 'source' in val:
                    val['source'] = os.path.join(manifest_dir, val['source'])

            # its a sub-manifest path
            elif val:
                # process the dependency manifest
                dependency = self._load_manifest_file(
                    os.path.join(manifest_dir, val)
                )

                # store sub-dependencies
                for d in dependency:
                    dependencies[d] = dependency[d]

                # update manifest with dependency manifest object
                manifest[key] = dependency[key]

            else:
                manifest[key] = None

        # process sub-dependencies to fill in any gaps
        for key in dependencies:
            if key not in manifest:
                manifest[key] = dependencies[key]

        return manifest

    # processing methods
    def _process_css(self, contents):
        # process css imports
        # search for import css statements
        needle = 'importCss('
        ln = len(needle) + 1
        index = 0

        while index > -1:
            index = contents.find(needle, index)

            if index > -1:
                end = contents.find(')', index)

                include = os.path.join(
                    self._css_src, os.path.sep.join(contents[index + ln:end - 1].split('.')[1:])
                ) + '.css'

                if os.path.exists(include):
                    if include not in self.build[self._name][CSS]:
                        self.build[self._name][CSS].append(include)

                    contents = contents[:index] + contents[end + 3:]

                else:
                    index = end

        return contents

    def _process_js(self, path):
        # if we have already included this file then return empty
        if path in self.build[self._namespace][JS]:
            return ''

        # check to see if we are allowed to include
        pkg_path = path.replace(self._js_src + os.path.sep, '')

        if not is_path_allowed(pkg_path, self._classes_inc, self._classes_exc, self._pre_compiled):
            return ''

        # if the path doesn't exist then raise an exception
        if not os.path.exists(path):
            warning('JS file "' + path + '" does not exist.')

            return ''

        # add the include path to the build list
        self.build[self._namespace][JS].append(path)

        trace(path, indent=2)

        # get the file contents
        contents = file_get_contents(path)

        # search for include statements
        needle = 'include('
        ln = len(needle) + 1
        index = 0

        while index > -1:
            index = contents.find(needle, index)

            if index > -1:
                end = contents.find(')', index)

                try:
                    include = os.path.join(self._source, contents[index + ln:end - 1])

                    contents = contents[:index] + file_get_contents(include) + contents[end + 1:]

                except Exception as e:
                    print(e)
                    index = end

        # auto add css import if one does not exist and css does exist
        css_path = os.path.join(self._css_src, pkg_path.replace(".js", ".css"))

        if os.path.exists(css_path):
            css_path = self._namespace + "." + pkg_path.replace(os.path.sep, ".").replace(".js", "")

            result = re.search(
                "importCss\([\"|']{}[\"|']\)".format(css_path),
                contents
            )

            if result is None:
                contents = "importCss(\"{}\");\n".format(css_path) + contents

        # search for js import statements
        needle = 'importJs('
        ln = len(needle) + 1
        index = 0
        prefix = ''
        suffix = ''

        while index > -1:
            index = contents.find(needle, index)

            if index > -1:
                end = contents.find(')', index)

                include = contents[index + ln:end - 1]
                include_str = ''
                parts = include.split('.')

                try:
                    # if the file is from another package then don't process
                    if parts[0] == self._namespace:
                        include_str = self._process_js(os.path.join(*([self._js_src] + parts[1:])) + '.js')

                    contents = contents[:index] + contents[end + 3:]

                    cutoff = len(contents) * .3

                    if index < cutoff:
                        prefix += include_str

                    else:
                        suffix += include_str

                except Exception as e:
                    print(e)
                    index = end

        # remove redundant js statements
        contents = replace_all(contents, [
            ("'use strict'", ''), ('"use strict"', ''),
            ('\n;', '')
        ])

        # return the results
        return '\n'.join([prefix, contents, suffix])

    def _process_package(self, name, source, package):
        trace('Compiling Package "' + name + '"', newline=True)

        # parse name
        parts = name.split('.')

        # setup package vars
        self._assets_exc = package.get('assets_exclude', ['.*'])
        self._assets_inc = package.get('assets', ['*'])
        self._assets_src = os.path.join(source, 'assets')
        self._css_src = os.path.join(source, 'css')
        self._classes_exc = package.get('classes_exclude', [])
        self._classes_inc = package.get('classes', ['*'])
        self._is_sub_pkg = len(parts) > 1
        self._js_src = os.path.join(source, 'js')
        self._name = name
        self._namespace = parts[0]
        self._package = package
        self._pre_compiled = package.get('pre_compiled', [])
        self._source = source
        self._templates_src = os.path.join(source, 'templates')
        self._tests_src = os.path.join(source, 'tests')
        self._themes_exc = package.get('themes_exclude', [])
        self._themes_inc = package.get('themes', ['*'])
        self._themes_src = os.path.join(source, 'themes')

        # setup build dict
        self.build[name] = {
            ASSETS: [],
            CSS: [],
            JS: []
        }

        # if sub-package ensure parent
        if self._namespace not in self.build:
            self.build[self._namespace] = {
                ASSETS: [],
                CSS: [],
                JS: []
            }

        #
        # Setup Build Directories
        #
        try:
            self._destination = os.path.join(self.destination, self._namespace)

            if self._is_sub_pkg:
                self._destination = os.path.join(self._destination, 'packages', parts[1])

            # remove the old build dir
            rm(self._destination)

            # setup the new assets build dir
            assets_destination = os.path.join(self._destination, 'assets')
            mkdir(assets_destination)

            # setup the new themes build dir
            themes_destination = os.path.join(self._destination, 'themes')
            mkdir(themes_destination)

            # setup the new packages build dir
            if not self._is_sub_pkg:
                packages_destination = os.path.join(self._destination, 'packages')
                mkdir(packages_destination)

        except:
            error('Could not create build directories.')

        #
        # Compile Themes
        #
        if THEME in self.types:
            trace('Compiling Themes...', indent=1)

            for path in dir_files_of_type(self._themes_src, CSS):
                theme = os.path.splitext(os.path.basename(path))[0]

                if is_path_allowed(path, self._themes_inc, self._themes_exc):
                    trace(path, indent=2)

                    self._update_package(themes_destination, theme, CSS, file_get_contents(path))

        #
        # Compile Templates  (only do this for the main package once)
        #
        if JS in self.types and 'templates' not in self.build[self._namespace]:
            trace('Compiling Templates...', indent=1)

            templates = {}
            tmp = os.path.join(self._destination, '%i.html' % randint(1, 9999))
            tmplt_str = ''
            sep = '<template:divider/>'
            order = []

            for path in dir_files_of_type(self._templates_src, TEMPLATES):
                if tmplt_str:
                    tmplt_str += sep

                trace(path, indent=2)

                tmplt_str += file_get_contents(path)

                template = path.replace(self._templates_src, '').split(os.path.sep)[1:]
                template.insert(0, self._namespace)
                template[-1] = os.path.splitext(template[-1])[0]

                order.append('.'.join(template))

            # save the templates html
            file_put_contents(tmp, tmplt_str)

            # compress the templates html
            trace('Compressing Templates...', indent=1)

            call(
                'java -jar "' + os.path.join(utils_dir, 'htmlcompressor.jar') +
                '" --remove-quotes --remove-intertag-spaces -o "' +
                tmp + '" "' + tmp + '"', shell=True
            )

            # process compressed templates
            if len(order):
                index = 0

                for template in file_get_contents(tmp).split(sep):
                    templates[order[index]] = template

                    index += 1

            # store the templates
            self.build[self._namespace]['templates'] = templates

            # make sure to cleanup temporary template file
            try:
                rm(tmp)

            except:
                pass

        #
        # Copy Assets
        #
        trace('Copying Assets...', indent=1)

        for root, subFolders, files in os.walk(self._assets_src):
            d = root.replace(self._assets_src, '')

            if d:
                d = d[1:]

            # check if directory is excluded
            if not is_path_allowed(d, self._assets_inc, self._assets_exc):
                continue

            for file in files:
                f = os.path.join(d, file)

                # check if file is an exclude
                if not is_path_allowed(f, self._assets_inc, self._assets_exc):
                    continue

                trace(os.path.join(root, file), indent=2)

                cp(os.path.join(root, file), os.path.join(assets_destination, f))

        # process the js
        if JS in self.types:
            trace('Compiling JS Files...', indent=1)

            # find all the js files in this package
            contents = ''
            pre_compiled = ''

            # compile the js contents
            for path in dir_files_of_type(self._js_src, JS):
                try:
                    tmp = self._process_js(path)

                    if tmp:
                        contents += tmp

                    elif path not in self.build[self._namespace][JS]:
                        p = path.replace(self._js_src + os.path.sep, '')

                        for pre_c in self._pre_compiled:
                            if is_path_match(pre_c, p):
                                self.build[self._namespace][JS].append(path)

                                pre_compiled += file_get_contents(path).replace("//# sourceMappingURL=", "//# map=") + '\n'

                                break

                except:
                    pass

            #
            # Compile Tests  (only do this for the main package once)
            #
            if JS in self.types and 'tests' not in self.build[self._namespace]:
                trace('Processing Tests...', indent=1)

                tests = []
                tests_str = ""

                for root, subFolders, files in os.walk(self._tests_src):
                    for file in files:
                        p = os.path.join(root, file)

                        if p[0] != "." and os.path.isfile(p):
                            tests.append(p)

                            tests_str += file_get_contents(p) + "\n"

                self.build[self._namespace]['tests'] = tests

                if tests:
                    file_put_contents(os.path.join(self._destination, "tests.js"), tests_str)

            # remove the css imports
            trace('Building CSS Import List...', indent=1)

            contents = self._process_css(contents)

            # insert template strings
            trace('Inserting Template Strings...', indent=1)

            contents = self._process_templates(contents)

            # add in strict flag and optimize
            trace('Optimizing...', indent=1)

            contents = replace_all(contents, [(';;', ';'), ('\n;', ''), ('\n\n', '\n')])

            # update the package with the new js file
            self._update_package(
                self._destination, 'main', JS, contents, pre_compiled=pre_compiled + '"use strict";'
            )

            #
            # Compile CSS
            #
            if CSS in self.types:
                # process the css
                trace('Compiling CSS...', indent=1)

                contents = ''

                for css_file in self.build[self._name][CSS]:
                    contents += file_get_contents(css_file)

                self._update_package(self._destination, 'main', CSS, contents)

    def _process_templates(self, contents):
        templates = self.build[self._namespace]['templates']

        # search through the contents to replace template strings
        index = 1
        needle = "['|\"]_template['|\"][ ]*:[ ]*('|\")([\S]+)['|\"]"

        while index:
            match = re.search(needle, contents[index:])

            if match:
                # get the template path
                quote = match.group(1)
                pkg = match.group(2)

                # if we were able to get contents continue with replacement
                if pkg in templates:
                    html = templates[pkg]

                    # make the substitution
                    contents = contents[:index + match.start(1) + 1] + \
                               html.replace(quote, "\\" + quote) + contents[index + match.end(2):]

                    # move the index up
                    index += len(html)

                # move the index up
                index += match.end(1)

            else:
                index = 0

        needle = 'importHtml('
        ln = len(needle) + 1
        index = 0
        quote = "\""

        while index > -1:
            index = contents.find(needle, index)

            if index > -1:
                end = contents.find(')', index)

                try:
                    pkg = contents[index + ln:end - 1]

                    if pkg in templates:
                        html = templates[pkg]

                    contents = contents[:index] + quote + html.replace(quote, "\\" + quote) + quote + contents[end + 1:]

                except Exception as e:
                    print(e)
                    index = end

        return contents

    def _update_package(self, directory, name, ext, contents, pre_compiled=''):
        # setup vars
        dev_path = os.path.join(directory, name + '-dev.' + ext)

        pre_compiled = pre_compiled if pre_compiled else pre_compiled + "\n"

        # put dev file temporarily without pre_compiled
        file_put_contents(dev_path, contents)

        # process prod mode
        if self.mode == PROD:
            trace('Compressing "' + name + '"...', indent=2)

            prod_path = os.path.join(directory, name + '.' + ext)

            call(
                'java -jar "' + os.path.join(utils_dir, 'yuicompressor.jar') +
                '" -o "' + prod_path + '" "' + dev_path + '"',
                shell=True
            )

            prod_contents = file_get_contents(prod_path)

            if ext == JS:
                prod_contents = pre_compiled + replace_all(
                    prod_contents,
                    [
                        ('"_constructor"', '"_c"'), ('_constructor:', '_c:'), ('._constructor', '._c'),
                        ('"_destructor"', '"_d"'), ('_destructor:', '_d:'), ('._destructor', '._d'),
                        ('"_get_props_"', '"_g_p_"'), ('_get_props_:', '_g_p_:'), ('._get_props_', '._g_p_'),
                        ('"_set_props_"', '"_s_p_"'), ('_set_props_:', '_s_p_:'), ('._set_props_', '._s_p_'),
                        ('"_props_"', '"_p_"'), ('_props_:', '_p_:'), ('._props_', '._p_'),
                        ('"_static"', '".$"'), ('._static', '.$'),
                        ('"_super"', '"_s"'), ('_super:', '_s:'), ('._super(', '._s('), ('._super=', '._s='),
                        ('"_template"', '"_t"'), ('_template:', '_t:'), ('._template', '._t'),
                        ('"_unset"', '"_u"'), ('_unset:', '_u:'), ('._unset', '._u')
                    ]
                )

                file_put_contents(prod_path, prod_contents)

            with gzip.open(prod_path + '.gz', 'wb') as f:
                try:
                    prod_contents = prod_contents.encode('utf-8')

                except:
                    pass

                f.write(prod_contents)

        # add the pre_compiled to the dev
        if pre_compiled:
            file_put_contents(dev_path, pre_compiled + contents)

    def run(self, destination, mode="prod", packages="all", types="all"):
        # setup vars
        self.build = {}
        self.destination = destination
        self.mode = mode
        self.packages = packages if ALL != packages else sorted(self.manifest.keys())
        self.types = types if ALL != types else TYPES

        # process packages
        processed = []

        for package in self.packages:
            if package in processed:
                continue

            processed.append(package)

            parts = package.split(".")
            root = parts[0]

            if root in self.manifest:
                sub_packages = self.manifest[root]["packages"]
                source = self.manifest[root]["source_path"]

                # check for wildcard
                if len(parts) > 1 and parts[1] == "*":
                    # process the root package first
                    self._process_package(root, source, sub_packages[root])

                    # then process the sub-packages
                    for sub_package in sub_packages:
                        if sub_package != root:
                            self._process_package(sub_package, source, sub_packages[sub_package])

                elif package in sub_packages:
                    self._process_package(package, source, sub_packages[package])

            else:
                warning("Package \"" + package + "\" not found in manifest.")
