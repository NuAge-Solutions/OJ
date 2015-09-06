import errno
import json
import os
import re
import shutil
import sys


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

VERBOSE = 0


if sys.version < '3':
    import codecs

    def u(x):
        return codecs.unicode_escape_decode(x)[0]
else:
    def u(x):
        return x


utils_dir = os.path.dirname(os.path.realpath(__file__))


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
    if VERBOSE and indent <= VERBOSE:
        print(('\n' if newline else '') + ('  ' * indent) + msg)


def warning(msg):
    print("WARNING: " + msg)
