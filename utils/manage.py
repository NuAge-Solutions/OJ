from utils import *


def add(src, classes=[], types=ALL):
    # todo: chance this to look it up in the manifest file
    src = os.path.join(src, 'src')

    # check to make sure we have a class to create
    if not classes or classes == ALL:
        print('ERROR: Must specify at least one class to create.')
        exit()

    # convenience method for making files
    def _make(path, type, dir, ext, content):
            if dir:
                mkdir(os.path.join(src, type, dir))

            file = os.path.join(src, type, path + '.' + ext)

            if not os.path.exists(file):
                file_put_contents(file, content)

    # process the classes
    cls = classes[0]
    parents = ['OjObject'] if len(classes) == 1 else classes[1:]

    # process class path
    parts = cls.split('.')[1:]

    # process pathing
    dir = None if len(parts) == 1 else os.path.sep.join(parts[:-1])

    path = os.path.join(*parts)

    name = os.path.basename(path)

    # create files
    if CSS in types:
        _make(path, CSS, dir, CSS, '.' + name + ' { }\n')

    if TEMPLATE in types:
        _make(path, TEMPLATE + 's', dir, 'html', '<div></div>')

    if JS in types:
        content = ''

        if CSS in types:
            content += "importCss('" + cls + "');\n\n\n"

        content += 'OJ.extendClass('
        content += "\n    '" + name + "', [" + ', '.join(parents) + '],'
        content += '\n    {'
        content += "\n\n        '_constructor' : function(){"
        content += "\n            this._super(" + parents[0] + ", '_constructor', arguments);"
        content += '\n        }'
        content += '\n    },'
        content += '\n    {'

        if TEMPLATE in types:
            content += "\n        '_TEMPLATE' : '" + cls + "'"

        content += '\n    }'
        content += '\n);\n'

        _make(path, JS, dir, JS, content)


def remove(src, classes=[], types=ALL):
    # todo: chance this to look it up in the manifest file
    src = os.path.join(src, 'src')

    # check to make sure we have a class to create
    if not classes or classes == ALL:
        print('ERROR: Must specify at least one class to create.')
        exit()

    # convenience method for making files
    def _remove(path, type, ext):
        file = os.path.join(src, type, path + '.' + ext)

        rm(file)

    # process classes
    for cls in classes:
        # process class path
        parts = cls.split('.')[1:]
        path = os.path.join(*parts)

        # remove files
        if CSS in types:
            _remove(path, CSS, CSS)

        if TEMPLATE in types:
            _remove(path, TEMPLATE + 's', 'html')

        if JS in types:
            _remove(path, JS, JS)


def setup(src, package, destination):
    lc_package = package.lower()
    uc_package = package.upper()

    # get the destination if there is any
    os.chdir(destination)

    # make sure all the dirs exist
    dirs = ['builds', 'dependencies', 'src']

    for d in dirs:
        if not os.path.isdir(d):
            os.mkdir(d)

    # make sure all src dirs exist
    dirs = [
        os.path.join('src', 'assets'),
        os.path.join('src', 'css'),
        os.path.join('src', 'includes'),
        os.path.join('src', 'js'),
        os.path.join('src', 'templates'),
        os.path.join('src', 'themes')
    ]

    for d in dirs:
        if not os.path.isdir(d):
            os.mkdir(d)

    # make sure these files exist
    files = [
        (os.path.join(src, 'utils', 'genesis', 'index.html'), os.path.join('builds', 'index.html')),
        (os.path.join(src, 'utils', 'genesis', 'index-dev.html'), os.path.join('builds', 'index-dev.html')),
        (os.path.join(src, 'utils', 'genesis', 'manifest.json'), 'manifest.json'),
        (os.path.join(src, 'utils', 'genesis', 'oj.py'), 'oj.py'),
        (os.path.join(src, 'utils', 'genesis', 'package.css'), os.path.join('src', 'css', uc_package + '.css')),
        (os.path.join(src, 'utils', 'genesis', 'package.js'), os.path.join('src', 'js', uc_package + '.js')),
    ]

    for (s, d) in files:
        if not os.path.isfile(d):
            with open(s, 'r') as f:
                data = f.read().replace(
                    '{package}', package
                ).replace(
                    '{lc_package}', lc_package
                ).replace(
                    '{uc_package}', uc_package
                )

                with open(d, 'w') as f2:
                    f2.write(data)

                    # make sure py files are executable
                    if d[-3:] == '.py':
                        mode = os.stat(d).st_mode
                        mode |= (mode & 0o444) >> 2    # copy R bits to X
                        os.chmod(d, mode)

    # make sure the oj dependency exists
    dependency = os.path.join('dependencies', 'oj')

    if not os.path.exists(dependency):
        os.symlink(src, dependency)