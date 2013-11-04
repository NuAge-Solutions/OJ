__author__ = 'Tony Osibov'


import argparse
import os
from imp import load_source

# get the current path
current = os.path.abspath(os.path.dirname(__file__))
dest = os.path.abspath(os.path.join(current, os.path.pardir, 'builds'))

# load the utils module
utils = load_source('utils', os.path.join(current, '__init__.py'))

# figure out the available packages
packages = {}

for path in utils.dir_files_of_type(current, 'json'):
    if os.path.join('', 'manifest') in path:
        f = utils.load_json(path)

        packages[f['name']] = f

# setup the script args
parser = argparse.ArgumentParser(description='Compile Objective-JS Package.')

parser.add_argument(
    'packages', type=str, nargs='*', default='all',
    help='The package(s) you want to compile. Will build all packages if nothing is specified.'
)

# process the script args
args = parser.parse_args()

# default arg packages
if args.packages == 'all':
    args.packages = packages.keys()

# process the packages
for p in args.packages:
    if p in packages:
        package = packages[p]
        src = package['source']

        # massage the src path
        if src[0] == '~':
            src = os.path.expanduser(src)
        elif src[0:2] == os.path.pardir:
            src = os.path.join(current, src)

        src = os.path.abspath(src)

        # compile
        utils.compile(
            src, manifest=package, destination=dest, mode='prod', output=True, packages=[''], types='all'
        )
