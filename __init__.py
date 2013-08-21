import gzip
import json
import os
import re
import sys
from os import path, walk
from subprocess import call


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
def compile(src, mode='prod', output=False, profiles=None, type='all'):
    # setup trace func
    def trace(msg):
        if output:
            print(msg)

    # store old dir then change to src
    prev_dir = os.getcwd()

    os.chdir(src)

    # extract the package name
    package = path.basename(path.normpath(src)).lower()

    # get the build profiles
    try:
        build_profiles = loadJson(path.join('build', 'profiles.json'))

    except:
        trace('Build Profiles File Invalid... Using Default Profile\n')

        build_profiles = {'': {'package': package, 'includes': ['*'], 'excludes': []}}

    # get the build lists
    build_list_path = path.join('build', 'list.json')

    try:
        build_lists = loadJson(build_list_path)

    except:
        build_lists = {}

    # default the build_lists for un-built profiles
    for key in build_profiles:
        if key not in build_lists:
            build_lists[key] = {'css': [], 'js': []}

    # default profiles and detect 'all'
    if not profiles:
        profiles = ['']

    has_all = 'all' in profiles

    # compile themes
    # note: this only needs to be done once since themes are independent from build profiles
    if type in ['all', 'theme']:
        trace('\nCompiling Themes...')

        for theme in dirFilesOfType('themes', 'css'):
            theme_name = path.splitext(path.basename(theme))[0] + '-theme'

            updatePackage(
                theme_name, 'css', fileGetContents(theme), None, mode,
                '  Compressing "' + theme_name + '"...' if output else None
            )

    # loop through profiles and build selected
    for key in build_profiles:
        if has_all or key in profiles:
            trace('\nProcessing "' + ('default' if key == '' else key) + '" Profile')

            build_list = build_lists[key]
            profile = build_profiles[key]

            # process the js
            if type in ['all', 'js']:
                trace('  Compiling JS Files...')

                # reset the build_list since we are going back through all the js anyway
                build_list['js'] = []
                build_list['css'] = []

                # find all the js files in this package
                js_path = path.join('js', '')
                contents = ''

                # compile the js contents
                for js in dirFilesOfType(js_path, 'js'):
                    try:
                        js = package + '.' + path.splitext(js)[0].replace(js_path, '').replace(path.sep, '.')

                        contents += processJs(js, build_list, profile)
                    except:
                        pass

                # remove the css imports
                trace('  Building CSS Import List...')

                contents = processCss(contents, build_list, profile)

                # insert template strings
                trace('  Inserting Template Strings...')

                contents = processTemplates(contents, build_list, profile)

                # add in strict flag and optimize
                trace('  Optimizing...')

                contents = replace_all(
                    "'use strict';" + contents,
                    [(';;', ';'), ('\n;', ''), ('\n\n', '\n')]
                )

                # update the package with the new js file
                updatePackage(
                    package, 'js', contents, key, mode,
                    '  Compressing JS...' if output else None
                )

            # process the css
            if type in ['all', 'css']:
                # process the css
                trace('  Compiling CSS...')

                contents = ''

                for css_file in build_list['css']:
                    contents += fileGetContents(css_file)

                updatePackage(
                    package, 'css', contents, key, mode,
                    '  Compressing CSS...' if output else None
                )

    # save the build list
    saveJson(build_list_path, build_lists)

    # change back to previous dir
    os.chdir(prev_dir)


def dirFilesOfType(src, file_type):
    rtrn = []

    if not isinstance(file_type, (tuple, list)):
        file_types = [file_type]

    else:
        file_types = file_type

    for root, subFolders, files in walk(src):
        # remove hidden folders
        for folder in subFolders:
            if folder[0] == '.':
                subFolders.remove(folder)

        for f in files:
            file_path = path.join(root, f)

            # ignore hidden files
            # ignore files of the wrong type
            # ignore files already listed
            if f[0] == '.' or path.splitext(f)[1][1:] not in file_types:
                continue

            rtrn.append(file_path)

    return rtrn


def fileGetContents(path):
    try:
        with open(path) as f:
            return f.read()

    except:
        return ''


def filePutContents(path, contents):
    with open(path, 'w') as f:
        f.write(contents)


def isPathAllowed(file_path, profile):
    # check for exclusion
    for exclude in profile['excludes']:
        if isPathMatch(exclude, file_path):
            return False

    # check for inclusion
    for include in profile['includes']:
        if isPathMatch(include, file_path):
            return True

    # if neither then not allowed
    return False


def isPathMatch(needle, haystack):
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


def loadJson(src):
    return json.loads(fileGetContents(src))


def processCss(contents, build_list, profile):
    # process css imports
    # search for import css statements
    needle = 'OJ.importCss('
    ln = len(needle) + 1
    index = 0

    while index > -1:
        index = contents.find(needle, index)

        if index > -1:
            end = contents.find(')', index)

            include = path.join(
                'css', path.sep.join(contents[index + ln:end - 1].split('.')[1:])
            ) + '.css'

            if path.exists(include):
                if include not in build_list['css']:
                    build_list['css'].append(include)

                contents = contents[:index] + contents[end + 3:]

            else:
                index = end

    return contents


def processJs(js, build_list, profile):
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
    if pkg != profile['package']:
        return ''

    # check to see if we are allowed to include
    if not isPathAllowed(js, profile):
        raise Exception('Not allowed to include.')

    include_path = path.join(js_path, path.sep.join(js_ary[1:]) + '.js')

    # if the path doesn't exist then raise an exception
    if not path.exists(include_path):
        raise Exception('Cannot locate include.')

    # if we have already included this file then return empty
    if include_path in build_list['js']:
        return ''

    # get the file contents
    contents = fileGetContents(include_path)

    # add the include path to the build list
    build_list['js'].append(include_path)

    # search for js import statements
    while index > -1:
        index = contents.find(needle, index)

        if index > -1:
            end = contents.find(')', index)

            include = contents[index + ln:end - 1]

            try:
                include_str = processJs(include, build_list, profile)

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
    return prefix + '\n' + contents + '\n' + suffix


def processTemplates(contents, build_list, profile):
    # compile the templates
    tmp = path.join('build', 'templates.html')
    tmplt_str = ''
    sep = '<template:divider/>'
    templates = {}
    order = []

    for template in dirFilesOfType('templates', ['htm', 'html']):
        if tmplt_str:
            tmplt_str += sep

        tmplt_str += fileGetContents(template)

        template = template.split(path.sep)[1:]
        template.insert(0, profile['package'])
        template[-1] = path.splitext(template[-1])[0]

        order.append('.'.join(template))

    # save the templates html
    filePutContents(tmp, tmplt_str)

    # compress the templates html
    call(
        'java -jar "' + path.join('build', 'htmlcompressor.jar') +
        '" --remove-quotes --remove-intertag-spaces -o "' +
        tmp + '" "' + tmp + '"', shell=True
    )

    # process compressed templates
    index = 0

    for template in fileGetContents(tmp).split(sep):
        templates[order[index]] = template

        index += 1

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
                contents = contents[:index + match.start(1)] + html.replace("'", "\\'") + contents[index + match.end(1):]

                # move the index up
                index += len(html)

            # move the index up
            index += match.end(1)

        else:
            index = 0

    # make sure to cleanup temporary template file
    try:
        os.remove(tmp)
    except:
        pass

    return contents


def replace_all(text, ary):
    for (s, r) in ary:
        text = text.replace(s, r)

    return text


def saveJson(dest, obj):
    filePutContents(dest, json.dumps(obj, indent=2, separators=(',', ' : ')))


def updatePackage(name, ext, contents, profile, mode, msg=None):
    profile_ext = ('.' + profile) if profile else '.'
    dev_path = path.join(name + profile_ext + ('' if profile_ext == '.' else '-') + 'dev.' + ext)

    filePutContents(dev_path, contents)

    if mode == 'prod':
        if msg:
            print(msg)

        prod_path = path.join(name + profile_ext + ('' if profile_ext == '.' else '.') + ext)

        call('java -jar "' + path.join('build', 'yuicompressor.jar') + '" -o "' + prod_path + '" "' + dev_path + '"', shell=True)

        if ext == 'js':
            filePutContents(
                prod_path,
                replace_all(
                    fileGetContents(prod_path),
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
            contents = fileGetContents(prod_path)

            try:
                contents = contents.encode('utf-8')
            except:
                pass

            f.write(contents)