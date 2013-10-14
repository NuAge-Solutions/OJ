#!/usr/bin/env python

__author__ = "Tony Osibov"

# dependencies
import argparse
import os
import urllib
import sys

# setup script arguments
parser = argparse.ArgumentParser(description='Compile Objective-JS Package.')

parser.add_argument('package', type=str, help='The package name.')

parser.add_argument('--destination', type=str, help='The path to the directory of the package.')

# process the script args
args = parser.parse_args()

# change dir if we have a destination
package = args.package.lower()

if args.destination:
    os.chdir(args.destination)
# otherwise create the dir and move there
else:
    os.mkdir(package)

    os.chdir(package)

# make sure all the dirs exist
dirs = ['assets', 'builds', 'css', 'js', 'templates', 'themes', 'utils']

for d in dirs:
    if not os.path.isdir(d):
        os.mkdir(d)

# make sure these files exist
package = args.package.upper()
files = ['css/' + package + '.css', 'js/' + package + '.js']

for f in files:
    open(f, 'a').close()


# download all the necessary files
files = {
    'https://raw.github.com/NuAge-Solutions/OJ/master/utils/compiler.py': 'utils/compiler.py',
    'https://raw.github.com/NuAge-Solutions/OJ/master/utils/htmlcompressor.jar': 'utils/htmlcompressor.jar',
    'https://raw.github.com/NuAge-Solutions/OJ/master/utils/yuicompressor.jar': 'utils/yuicompressor.jar',
    'https://raw.github.com/NuAge-Solutions/OJ/master/utils/__init__.py': 'utils/__init__.py'
}
v = sys.version_info[0]

for f in files:
    if v == 3:
        urllib.request.urlretrieve(f, files[f])
    else:
        urllib.urlretrieve(f, files[f])


# make sure we have a build profile
path = 'utils/manifest.json'

if not os.path.isfile(path):
    f = open(path, 'w')
    f.write(
        ('{\n' +
            '\t"name" : "%s",\n' +
            '\t"namespace" : "%s",\n\n' +
            '\t"excludes"  : ["*.DS_Store", "*.git", "*.gitignore", "*.svn"],\n' +
            '\t"includes"  : [],\n' +
            '\t"themes"    : [],\n\n' +
            '\t"packages" : {\n' +
                '\t\t"" : {\n' +
                    '\t\t\t"dependencies" : [],\n' +
                    '\t\t\t"excludes" : [],\n' +
                    '\t\t\t"includes" : ["*"]\n' +
                '\t\t}\n' +
            '\t}\n' +
        '}') % args.package.lower(), args.package.lower()
    )
    f.close()

