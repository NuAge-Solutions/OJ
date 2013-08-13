#!/usr/bin/python3

__author__ = "Tony Osibov"


# module imports
import argparse, pickle
from os import path, walk

# setup the script args
parser = argparse.ArgumentParser(description='Compile Objective-JS Project.')

parser.add_argument('path',
                    type=str, nargs='?',
                    default=path.abspath(path.join(path.dirname(__file__), path.pardir)),
                    help='The path of the package you want to compile.')

parser.add_argument('--mode',
                    type=str, choices=['dev', 'prod'], default='prod',
                    help='The mode to compile in.')

parser.add_argument('--type',
                    type=str, choices=['all', 'css', 'js', 'theme'], default='all',
                    help='The file types to compile.')


def file_get_contents(path):
    try:
        with open(path) as f:
            return f.read()

    except:
        return ''


def file_put_contents(path, contents):
    with open(path, 'w') as f:
        f.write(contents)


def processDir(dir, build_list, file_type, func):
    global package

    content = ''
    list = build_list[file_type]

    # then process the directories
    files_dir = path.join(dir, file_type)

    for root, subFolders, files in walk(files_dir):
        # remove hidden folders
        for folder in subFolders:
            if folder[0] == '.':
                subFolders.remove(folder)

        for file in files:
            file_path = path.join(root, file)

            # ignore hidden files
            # ignore files of the wrong type
            # ignore files already listed
            if file[0] == '.' or path.splitext(file)[1] != '.' + file_type or file_path in list:
                continue

            list.append(file_path)

            content += func(dir, file_get_contents(file_path), build_list)

    if file_type == 'js':
        # search for import css statements
        needle = 'OJ.importCss('
        ln = len(needle) + 1
        index = 0

        while index > -1:
            index = content.find(needle, index)

            if index > -1:
                end = content.find(')', index)

                include = path.join(dir, 'css', path.sep.join(content[index + ln:end - 1].split('.')[1:])) + '.css'

                if path.exists(include):
                    if include not in build_list['css']:
                        build_list['css'].append(include)

                    content = content[:index] + content[end + 3:]

                else:
                    index = end

        content = ("'use strict';" + content).replace(';;', ';')

    file_put_contents(path.join(dir, package + '-dev.' + file_type), content)


def processJs(dir, file, list):
    # search for import js statements
    needle = 'OJ.importJs('
    ln = len(needle) + 1
    index = 0
    prefix = ''
    suffix = ''

    while index > -1:
        index = file.find(needle, index)

        if index > -1:
            end = file.find(')', index)

            include = path.join(dir, 'js', path.sep.join(file[index + ln:end - 1].split('.')[1:])) + '.js'

            if path.exists(include):
                include_str = ''
                ln2 = 0

                if include not in list['js']:
                    list['js'].append(include)

                    include_str = processJs(dir, file_get_contents(include), list)

                cutoff = len(file) * .3
                file = file[:index] + file[end + 3:]

                if index < cutoff:
                    prefix += include_str

                else:
                    suffix += include_str
            else:
                index = end

    # return the results
    return prefix + "\n" + file.replace("'use strict'", '').replace('"use strict"', '').replace("\n;", '') + "\n" + suffix


def processCss(dir, file, list):
    # return {'file': file, 'build_list': {'css': [], 'js': []}}
    return file


# process the script args
args = parser.parse_args()

# extract the package name
package = path.basename(path.normpath(args.path))

# if production mode then we need to compress our output
compress = args.mode == 'prod'

# get the build list if there is one otherwise init to empty
build_list_path = path.join(args.path, 'build', 'build.list')

try:
    with open(build_list_path, 'r') as f:
        build_list = pickle.load(f)

except:
    build_list = {'css': [], 'js': []}


# process the js
if args.type in ['all', 'js']:
    print('we got js to compile')

    # reset the build_list since we are going back through all the js anyway
    build_list['js'] = []
    build_list['css'] = []

    processDir(args.path, build_list, 'js', processJs)

    if compress:
        print('we need to compress the js')


# process the css
if args.type in ['all', 'css']:
    print('we got css to compile')

    processDir(args.path, build_list, 'css', processCss)

    if compress:
        print('we need to compress the css')


# process the theme
if args.type in ['all', 'theme']:
    print('we got themes to compile')

    if compress:
        print('we need to compress the themes')


# save the build list
with open(build_list_path, 'wb') as f:
    pickle.dump(build_list, f)