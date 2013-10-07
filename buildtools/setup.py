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

parser.add_argument('--dest', type=str, help='The path to the directory of the package.')

# process the script args
args = parser.parse_args()

# change dir if we have a destination
package = args.package.lower()

if args.dest:
    os.chdir(args.dest)
# otherwise create the dir and move there
else:
    os.mkdir(package)

    os.chdir(package)

# make sure all the dirs exist
dirs = ['assets', 'build', 'css', 'js', 'templates', 'themes']

for dir in dirs:
    if not os.path.isdir(dir):
        os.mkdir(dir)

# make sure these files exist
package = args.package.upper()
files = ['css/' + package + '.css', 'js/' + package + '.js']

for f in files:
    open(f, 'a').close()


# download all the necessary files
files = {
    'https://raw.github.com/NuAge-Solutions/OJ/master/build/compiler.py': 'build/compiler.py',
    'https://raw.github.com/NuAge-Solutions/OJ/master/build/htmlcompressor.jar': 'build/htmlcompressor.jar',
    'https://raw.github.com/NuAge-Solutions/OJ/master/build/yuicompressor.jar': 'build/yuicompressor.jar',
    'https://raw.github.com/NuAge-Solutions/OJ/master/__init__.py': '__init__.py'
}
v = sys.version_info[0]

for f in files:
    if v == 3:
        urllib.request.urlretrieve(f, files[f])
    else:
        urllib.urlretrieve(f, files[f])


# make sure we have a build profile
path = 'build/profiles.json'

if not os.path.isfile(path):
    f = open(path, 'w')
    f.write('{"" : {"package" : "%s", "includes" : ["*"], "excludes" : []}}' % args.package.lower())
    f.close()

