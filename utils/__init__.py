import errno
import json
import os
import re
import utils.sh as sh
import shutil
import sys

from hashlib import sha1


ALL = 'all'
ASSETS = 'assets'
CSS = 'css'
DEV = 'dev'
JS = 'js'
PROD = 'prod'
TEMPLATE = 'template'
TEMPLATES = ['htm', 'html']
THEME = 'theme'

TYPES = [CSS, JS, TEMPLATE, THEME]
MODES = [DEV, PROD]

INDENT = 0
RECURSIVE = 0
VERBOSE = 0

if sys.version < '3':
    import codecs

    def u(x):
        return codecs.unicode_escape_decode(x)[0]
else:
    def u(x):
        return x


utils_dir = os.path.dirname(os.path.realpath(__file__))
bin_dir = os.path.join(utils_dir, "node_modules", ".bin")


class Manifest:
    def __init__(self, path):
        # get the manifest directory path
        self.path = os.path.dirname(path)

        if not self.path:
            self.path = os.getcwd()

        # load the manifest file
        self.json = load_json(path)

        # setup vars
        self.builds = self.json.get("builds", {})
        self.dependencies = self.json.get("dependencies", {})
        self.dependencies_path = os.path.join(self.path, self.json.get("dependencies_path", "dependencies"))
        self.install = self.json.get("install", [])
        self.name = self.json.get("name", os.path.basename(self.path))
        self.packages = self.json.get("packages", {})
        self.root_builds = self.builds.keys(),
        self.root_packages = self.packages.keys()
        self.source_path = os.path.join(self.path, self.json.get("source_path", "src"))

        for pkg in self.root_packages:
            self.packages[pkg]["dependencies_path"] = self.dependencies_path
            self.packages[pkg]["path"] = self.path
            self.packages[pkg]["source_path"] = self.source_path


def cp(source, destination):
    if os.path.isdir(source):
        if os.path.exists(destination):
            rm(destination)

        shutil.copytree(source, destination)
    else:
        mkdir(os.path.abspath(os.path.join(destination, os.path.pardir)))

        shutil.copy(source, destination)


def dir_files(src):
    rtrn = []

    for root, subFolders, files in os.walk(src):
        # remove hidden folders
        for folder in subFolders:
            if folder[0] == '.':
                subFolders.remove(folder)

        for f in files:
            file_path = os.path.join(root, f)

            # ignore hidden files
            # ignore files of the wrong type
            # ignore files already listed
            if f[0] == '.':
                continue

            rtrn.append(file_path)

    return rtrn


def dir_files_of_type(src, file_type):
    rtrn = []

    if isinstance(file_type, (tuple, list)):
        file_types = file_type
    else:
        file_types = [file_type]

    for root, subFolders, files in os.walk(src):
        subFolders.sort()
        files.sort()

        # remove hidden folders
        for folder in subFolders:
            if folder[0] == '.':
                subFolders.remove(folder)

        for f in files:
            file_path = os.path.join(root, f)

            # ignore hidden files
            # ignore files of the wrong type
            # ignore files already listed
            if f[0] == '.' or os.path.splitext(f)[1][1:] not in file_types:
                continue

            rtrn.append(file_path)

    return rtrn


def file_get_contents(path):
    try:
        with open(path) as f:
            return f.read()
    except:
        return ''


def file_put_contents(path, contents):
    with open(path, 'w') as f:
        f.write(contents)


def githash(path):
    data = file_get_contents(path)

    s = sha1()
    s.update(("blob %u\0" % len(data)).encode("utf-8"))
    s.update(data.encode("utf-8"))

    return s.hexdigest()


def is_path_allowed(file_path, includes=[], excludes=[], pre_compiled=[]):
    file_name = os.path.basename(file_path)

    # check for direct/common matches
    if '*' + file_name in excludes or file_path in excludes or \
       '*' + file_name in pre_compiled or file_path in pre_compiled:
        return False

    if '*' + file_name in includes or file_path in includes:
        return True

    # check for exclusion
    for exclude in excludes:
        if is_path_match(exclude, file_path):
            return False

    # check for pre-compiled
    for pre_c in pre_compiled:
        if is_path_match(pre_c, file_path):
            return False

    # check for inclusion
    for include in includes:
        if is_path_match(include, file_path):
            return True

    # if neither then not allowed
    return False


def is_path_match(needle, haystack):
    # if we are matching all then just return true
    if needle == '*':
        return True

    # prepare the needle for regex format
    # escape '.' and convert '*' to '.'
    needle = replace_all(needle, [('.', '\.'), ('*', '.')])

    # if needle doesn't end in a wildcard then format regex for exact search
    if needle[-1] != '.' or needle[-2] == '\\':
        needle += '$'

    return re.match(needle, haystack)


def js_get_contents(js, path='js'):
    ary = js.split('.')

    return file_get_contents(os.path.join(path, os.path.sep.join(ary[1:]) + '.js'))


def load_json(source):
    return json.loads(file_get_contents(source))


def load_manifest_dependencies(dependencies_path):
    dependencies = {}
    sub_dependencies = []

    if os.path.isdir(dependencies_path):
        for path in os.listdir(dependencies_path):
            if path[0] == "." or path in dependencies:
                continue

            dependency_path = os.path.join(dependencies_path, path)
            dependency_manifest_path = os.path.join(dependency_path, "manifest.json")

            if os.path.isfile(dependency_manifest_path):
                manifest = Manifest(dependency_manifest_path)

                dependencies[path] = manifest

                sub_dependencies.append(manifest.dependencies_path)

    for sub_dependency in sub_dependencies:
        dependencies.update(
            load_manifest_dependencies(sub_dependency)
        )

    # load manual path dependencies
    for pkg in dependencies:
        dependency = dependencies[pkg]

        if isinstance(dependency, str):
            for sub_pkg, dependency in load_manifest_dependencies(dependency).items():
                if sub_pkg == pkg or sub_pkg not in dependencies:
                    dependencies[sub_pkg] = dependency

    return dependencies


def load_manifest_file(manifest_path):
    manifest = Manifest(manifest_path)

    # process dependencies
    for ns, dependency in load_manifest_dependencies(manifest.dependencies_path).items():
        manifest.builds = dict(dependency.builds, **manifest.builds)
        manifest.dependencies[ns] = dependency
        manifest.packages = dict(dependency.packages, **manifest.packages)

    return manifest


def mkdir(path, *args):
    try:
        os.makedirs(path, *args)

    except OSError as exc:
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass

        else:
            raise


def rm(path, *args):
    if os.path.isdir(path):
        shutil.rmtree(path, True)

    elif os.path.exists(path):
        os.remove(path, *args)


def replace_all(text, ary):
    for (s, r) in ary:
        text = text.replace(s, r)

    return text


def save_json(destination, obj):
    file_put_contents(destination, json.dumps(obj, indent=2, separators=(',', ' : ')))


# messaging/print methods
def error(msg):
    print("ERROR: " + msg)

    exit()


def trace(msg, indent=0, newline=False):
    if msg and VERBOSE:
        indent = ('  ' * (INDENT + indent))
        msg = indent + str(msg)

        print(("\n" if newline else "") + msg.replace("\n", "\n" + indent).replace("\r", "\n" + indent))


def warning(msg):
    print("WARNING: " + msg)
