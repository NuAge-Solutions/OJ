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
            content += "OJ.importCss('" + cls + "');\n\n\n"

        content += 'OJ.extendClass('
        content += "\n    '" + name + "', [" + ', '.join(parents) + '],'
        content += '\n    {'

        if TEMPLATE in types:
            content += "\n        '_template' : '" + cls + "',"

        content += "\n\n        '_constructor' : function(){"
        content += "\n            this._super(" + parents[0] + ", '_constructor', arguments);"
        content += '\n        }'
        content += '\n    },'
        content += '\n    {}'
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


def setup(src):
    pass