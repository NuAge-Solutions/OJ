import errno
import gzip
import json
import os
import re
import shutil
import sys
from subprocess import call
from random import randint


if sys.version < '3':
    import codecs

    def u(x):
        return codecs.unicode_escape_decode(x)[0]
else:
    def u(x):
        return x


#
# Compiler Function
#
def compile(source, destination=None, manifest=None, mode='prod', output=False, packages='all', types='all'):
    #
    # Trace
    #
    def trace(msg):
        if output:
            print(msg)

    trace('\nInitializing...')

    #
    # Source & Destination
    #
    # store old dir then change to src
    prev_dir = os.getcwd()

    os.chdir(source)

    # default the destination
    if not destination:
        destination = os.path.abspath(os.path.join(source, 'builds'))

    #
    # Manifest
    #
    # default the manifest
    if not manifest:
        manifest = {
            'name': os.path.basename(os.path.normpath(source)).lower(),

            'includes': [],
            'themes': [],

            'packages': {
                '': {
                    'dependencies': [],
                    'excludes': [],
                    'includes': ['*']
                }
            }
        }

        # try to load the default manifest
        try:
            tmp = load_json(os.path.join('utils', 'manifest.json'))

            if tmp and 'name' in tmp:
                manifest = tmp
        except:
            trace('WARNING: Manifest File Invalid... Using Default Manifest\n')

    #
    # Build Logs
    #
    # load the previous build log
    build_log = load_log(source, manifest['name'])

    #
    # Packages
    #
    # detect all packages
    has_all = 'all' == packages

    # default packages list accordingly
    if has_all:
        packages = []
    elif not packages:
        packages = ['']

    # make build dirs
    try:
        build_dir = os.path.join(destination, manifest['name'])
        assets_dir = os.path.join(build_dir, 'assets')
        packages_dir = os.path.join(build_dir, 'packages')
        themes_dir = os.path.join(build_dir, 'themes')

        rm(build_dir)
        mkdir(assets_dir)
        mkdir(packages_dir)
        mkdir(themes_dir)
    except:
        raise Exception('Could not create build directories.')

    # make sub-packages dirs
    for key in manifest['packages']:
        if key and (has_all or key in packages):
            try:
                mkdir(os.path.join(packages_dir, key))
            except:
                raise Exception('Could not create package "%s" directory.' % key)

    #
    # Types
    #
    # convert all
    if 'all' in types:
        types = ['css', 'js', 'theme']

    #
    # Compile Themes
    #
    # note: this only needs to be done once since themes are independent from build profiles
    if 'theme' in types:
        trace('\nCompiling Themes...')

        for theme in dir_files_of_type('themes', 'css'):
            theme_name = os.path.splitext(os.path.basename(theme))[0]

            if theme_name in manifest['themes']:
                update_package(
                    themes_dir, theme_name, 'css', file_get_contents(theme), mode,
                    '  Compressing "' + theme_name + '"...' if output else None
                )

    #
    # Templates
    #
    if 'js' in types:
        trace('\nCompiling Templates...')

        tmp = os.path.join(build_dir, '%i.html' % randint(1, 9999))
        tmplt_str = ''
        sep = '<template:divider/>'
        templates = {}
        order = []

        for template in dir_files_of_type('templates', ['htm', 'html']):
            if tmplt_str:
                tmplt_str += sep

            tmplt_str += file_get_contents(template)

            template = template.split(os.path.sep)[1:]
            template.insert(0, manifest['namespace'])
            template[-1] = os.path.splitext(template[-1])[0]

            order.append('.'.join(template))

        # save the templates html
        file_put_contents(tmp, tmplt_str)

        # compress the templates html
        trace('Compressing Templates...')

        call(
            'java -jar "' + os.path.join('utils', 'htmlcompressor.jar') +
            '" --remove-quotes --remove-intertag-spaces -o "' +
            tmp + '" "' + tmp + '"', shell=True
        )

        # process compressed templates
        index = 0

        for template in file_get_contents(tmp).split(sep):
            templates[order[index]] = template

            index += 1

        # store the templates
        build_log['_templates'] = templates

        # make sure to cleanup temporary template file
        try:
            rm(tmp)
        except:
            pass

    #
    # Sub-Packages
    #
    for key in manifest['packages']:
        if has_all or key in packages:
            trace('\nProcessing Package "%s"' % ('core' if key == '' else key))

            # auto-create the manifest packages log entry
            if key in build_log:
                log = build_log[key]
            else:
                log = build_log[key] = {'assets': [], 'css': [], 'js': []}

            # get the package and setup the namespace
            package = manifest['packages'][key]
            namespace = package['namespace'] = manifest['namespace']  # make sure the namespace is properly set

            # setup the target directory
            directory = build_dir

            # if we are dealing with sub-package then change the destination directory
            if key:
                directory = os.path.join(packages_dir, key)

            # copy assets
            trace('  Copying Assets...')

            mkdir(os.path.join(directory, 'assets'))

            assets = os.path.join(source, 'assets')
            excludes = manifest['excludes']

            for root, subFolders, files in os.walk(assets):
                d = root.replace(assets, '')
                if d:
                    d = d[1:]

                # check if directory is excluded
                if '*' + d in excludes or d in excludes:
                    continue

                for file in files:
                    f = os.path.join(d, file)
                    p = '.'.join([manifest['namespace'], os.path.splitext(f)[0].replace(os.path.sep, '.')])

                    # check if file is an exclude
                    if '*' + file in excludes or f in excludes or not is_path_allowed(p, package):
                        continue

                    cp(os.path.join(root, file), os.path.join(directory, 'assets', f))

            # process the js
            if 'js' in types:
                trace('  Compiling JS Files...')

                # reset the build_list since we are going back through all the js anyway
                log['js'] = []
                log['css'] = []

                # find all the js files in this package
                js_path = os.path.join('js', '')
                contents = ''

                # compile the js contents
                for js in dir_files_of_type(js_path, 'js'):
                    try:
                        js = '.'.join([
                            namespace, os.path.splitext(js)[0].replace(js_path, '').replace(os.path.sep, '.')
                        ])

                        contents += process_js(js, log, package)
                    except:
                        pass

                # remove the css imports
                trace('  Building CSS Import List...')

                contents = process_css(contents, log, package)

                # insert template strings
                trace('  Inserting Template Strings...')

                contents = process_templates(contents, build_log, package)

                # add in strict flag and optimize
                trace('  Optimizing...')

                contents = replace_all(
                    "'use strict';" + contents,
                    [(';;', ';'), ('\n;', ''), ('\n\n', '\n')]
                )

                # update the package with the new js file
                update_package(
                    directory, 'main', 'js', contents, mode,
                    '  Compressing JS...' if output else None
                )

            # process the css
            if 'css' in types:
                # process the css
                trace('  Compiling CSS...')

                contents = ''

                for css_file in log['css']:
                    contents += file_get_contents(css_file)

                update_package(
                    directory, 'main', 'css', contents, mode,
                    '  Compressing CSS...' if output else None
                )

    #
    # Copy Assets & Includes
    #
    trace('\nCopying Resources...')

    for include in manifest['includes']:
        try:
            trace('  Copying Include "%s' % include)

            path = include.replace('/', os.path.sep)

            cp(os.path.join(source, path), os.path.join(build_dir, path))
        except:
            trace('WARNING: Could not copy include "%s"' % include)

    #
    # Cleanup
    #
    # save the build log
    save_log(source, manifest['name'], build_log)

    # change back to previous dir
    os.chdir(prev_dir)


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


def is_path_allowed(file_path, package):
    # check for exclusion
    for exclude in package['excludes']:
        if is_path_match(exclude, file_path):
            return False

    # check for inclusion
    for include in package['includes']:
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
    needle = needle.replace('.', '\.').replace('*', '.')

    # if needle doesn't end in a wildcard then format regex for exact search
    if needle[-1] != '.' or needle[-2] == '\\':
        needle += '$'

    return re.match(needle, haystack)


def load_log(directory, name):
    logs = load_logs(directory)

    if name in logs:
        return logs[name]

    return {}


def load_logs(directory):
    try:
        return load_json(os.path.join(directory, 'utils', 'build_log.json'))
    except:
        return {}


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


def process_assets(source, log, package):
    pass


def process_css(contents, log, package):
    # process css imports
    # search for import css statements
    needle = 'OJ.importCss('
    ln = len(needle) + 1
    index = 0

    while index > -1:
        index = contents.find(needle, index)

        if index > -1:
            end = contents.find(')', index)

            include = os.path.join(
                'css', os.path.sep.join(contents[index + ln:end - 1].split('.')[1:])
            ) + '.css'

            if os.path.exists(include):
                if include not in log['css']:
                    log['css'].append(include)

                contents = contents[:index] + contents[end + 3:]

            else:
                index = end

    return contents


def process_js(js, log, package):
    needle = 'OJ.importJs('
    ln = len(needle) + 1
    index = 0
    js_ary = js.split('.')
    js_path = 'js'
    prefix = ''
    suffix = ''

    # build the include path and check to see if we have already included it
    pkg = js_ary[0]

    # if the file is from another package then return empty
    if pkg != package['namespace']:
        return ''

    # check to see if we are allowed to include
    if not is_path_allowed(js, package):
        raise Exception('Not allowed to include.')

    include_path = os.path.join(js_path, os.path.sep.join(js_ary[1:]) + '.js')

    # if the path doesn't exist then raise an exception
    if not os.path.exists(include_path):
        raise Exception('Cannot locate include.')

    # if we have already included this file then return empty
    if include_path in log['js']:
        return ''

    # get the file contents
    contents = file_get_contents(include_path)

    # add the include path to the build list
    log['js'].append(include_path)

    # search for js import statements
    while index > -1:
        index = contents.find(needle, index)

        if index > -1:
            end = contents.find(')', index)

            include = contents[index + ln:end - 1]

            try:
                include_str = process_js(include, log, package)

                contents = contents[:index] + contents[end + 3:]

                if include_str:
                    cutoff = len(contents) * .3

                    if index < cutoff:
                        prefix += include_str

                    else:
                        suffix += include_str

            except:
                index = end

    # remove redundant js statements
    contents = contents.replace("'use strict'", '').replace('"use strict"', '').replace('\n;', '')

    # return the results
    return '\n'.join([prefix, contents, suffix])


def process_templates(contents, log, package):
    templates = log['_templates']

    # search through the contents to replace template strings
    index = 1
    needle = '[\'|"]_template[\'|"][ ]*:[ ]*[\'|"]([\S]+)[\'|"]'

    while index:
        match = re.search(needle, contents[index:])

        if match:
            # get the template path
            pkg = match.group(1)

            # if we were able to get contents continue with replacement
            if pkg in templates:
                html = templates[pkg]

                # make the substitution
                contents = contents[:index + match.start(1)] + \
                           html.replace("'", "\\'") + contents[index + match.end(1):]

                # move the index up
                index += len(html)

            # move the index up
            index += match.end(1)

        else:
            index = 0

    return contents


def rm(path, *args):
    if os.path.isdir(path):
        try:
            shutil.rmtree(path, True)
        except:
            raise
    elif os.path.exists(path):
        os.remove(path, *args)


def replace_all(text, ary):
    for (s, r) in ary:
        text = text.replace(s, r)

    return text


def save_log(directory, name, log):
    logs = load_logs(directory)
    logs[name] = log

    save_json(os.path.join(directory, 'utils', 'build_log.json'), logs)


def save_json(destination, obj):
    file_put_contents(destination, json.dumps(obj, indent=2, separators=(',', ' : ')))


def update_package(directory, name, ext, contents, mode, msg=None):
    dev_path = os.path.join(directory, name + '-dev.' + ext)

    file_put_contents(dev_path, contents)

    if mode == 'prod':
        if msg:
            print(msg)

        prod_path = os.path.join(directory, name + '.' + ext)

        call(
            'java -jar "' + os.path.join('utils', 'yuicompressor.jar') +
            '" -o "' + prod_path + '" "' + dev_path + '"',
            shell=True
        )

        if ext == 'js':
            file_put_contents(
                prod_path,
                replace_all(
                    file_get_contents(prod_path),
                    [
                        ('"_constructor"', '"_c"'), ('_constructor:', '_c:'), ('._constructor', '._c'),
                        ('"_destructor"', '"_d"'), ('_destructor:', '_d:'), ('._destructor', '._d'),
                        ('"_get_props_"', '"_g_p_"'), ('_get_props_:', '_g_p_:'), ('._get_props_', '._g_p_'),
                        ('"_set_props_"', '"_s_p_"'), ('_set_props_:', '_s_p_:'), ('._set_props_', '._s_p_'),
                        ('"_props_"', '"_p_"'), ('_props_:', '_p_:'), ('._props_', '._p_'),
                        ('._static', '.$'),
                        ('"_super"', '"_s"'), ('_super:', '_s:'), ('._super(', '._s('), ('._super=', '._s='),
                        ('"_template"', '"_t"'), ('_template:', '_t:'), ('._template', '._t'),
                        ('"_unset"', '"_u"'), ('_unset:', '_u:'), ('._unset', '._u')
                    ]
                )
            )

        with gzip.open(prod_path + '.gz', 'wb') as f:
            contents = file_get_contents(prod_path)

            try:
                contents = contents.encode('utf-8')
            except:
                pass

            f.write(contents)
