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


def processDir(dir, file_type, func):
    global package, build_list

    content = ''
    list = build_list[file_type]

    # process the build list first
    for file in list:
        rtrn = func(dir, file_get_contents(file))

        content += rtrn['file']

    # then process the directories
    files_dir = path.join(dir, file_type)

    for root, subFolders, files in walk(files_dir):
        for file in files:
            file_path = path.join(root, file)

            if file[0] != '.' and file.find('.' + file_type) > 0 and file_path not in list:
                rtrn = func(dir, file_get_contents(file_path))

                build_list['css'] += rtrn['build_list']['css']
                build_list['js'] += rtrn['build_list']['js']

                build_list[file_type].append(file_path)

                content += rtrn['file']

    if file_type == 'js':
        content = ("'use strict';" + content).replace(';;', ';')

    file_put_contents(path.join(dir, package + '-dev.' + file_type), content)


def processImport(dir, file, str, ext):
    list = []
    index = 0
    ln = len(str) + 1

    while index > -1:
        index = file.find(str, index)

        if index > -1:
            end = file.find(')', index)

            list.append(path.join(dir, path.sep.join(file[index + ln:end - 1].split('.')[1:])) + '.' + ext)

            file = file[:index] + file[end + 3:]

    return {'file': file, 'list': list}


def processJs(dir, file):
    # setup an empty build list
    build_list = {'css': [], 'js': []}

    # search for import js statements
    rtrn = processImport(path.join(dir, 'js'), file, 'OJ.importJs(', 'js')

    build_list['js'] = rtrn['list']

    # search for import css statements
    rtrn = processImport(path.join(dir, 'css'), rtrn['file'], 'OJ.importCss(', 'css')

    build_list['css'] = rtrn['list']
    print(rtrn['list'])
    # return the results
    return {
        'file': rtrn['file'].replace("'use strict'", '').replace('"use strict"', '').replace("\n;", ''),
        'build_list': build_list
    }


def processCss(dir, file):
    return {'file': file, 'build_list': {'css': [], 'js': []}}


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

    processDir(args.path, 'js', processJs)

    if compress:
        print('we need to compress the js')


# process the css
if args.type in ['all', 'css']:
    print('we got css to compile')

    processDir(args.path, 'css', processCss)

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