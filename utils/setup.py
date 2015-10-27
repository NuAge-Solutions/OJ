#!/usr/bin/env python

# dependencies
import argparse
import os
import stat


# get the oj source path
oj_path = os.path.realpath(os.path.join(__file__, os.pardir, os.pardir))

# setup script arguments
parser = argparse.ArgumentParser(description='Setup Objective-JS Package.')

parser.add_argument('package', type=str, help='The package name.')

parser.add_argument('--destination', type=str, help='The path to the directory of the package.')

# process the script args
args = parser.parse_args()

# change dir if we have a destination
package = args.package.title()

lc_package = package.lower()
uc_package = package.upper()

# get the destination if there is any
if args.destination:
    os.chdir(args.destination)

# # otherwise create the dir and move there
# else:
#     os.mkdir(lc_package)
#
#     os.chdir(lc_package)

# make sure all the dirs exist
dirs = ['builds', 'dependencies', 'src']

for d in dirs:
    if not os.path.isdir(d):
        os.mkdir(d)

# make sure all src dirs exist
dirs = [
    os.path.join('src', 'assets'),
    os.path.join('src', 'css'),
    os.path.join('src', 'js'),
    os.path.join('src', 'templates'),
    os.path.join('src', 'themes')
]

for d in dirs:
    if not os.path.isdir(d):
        os.mkdir(d)

# make sure these files exist
files = [
    (os.path.join(oj_path, 'utils', 'genesis', 'index.html'), os.path.join('builds', 'index.html')),
    (os.path.join(oj_path, 'utils', 'genesis', 'index-dev.html'), os.path.join('builds', 'index-dev.html')),
    (os.path.join(oj_path, 'utils', 'genesis', 'manifest.json'), 'manifest.json'),
    (os.path.join(oj_path, 'utils', 'genesis', 'oj.py'), 'oj.py'),
    (os.path.join(oj_path, 'utils', 'genesis', 'package.css'), os.path.join('src', 'css', uc_package + '.css')),
    (os.path.join(oj_path, 'utils', 'genesis', 'package.js'), os.path.join('src', 'js', uc_package + '.js')),
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
    os.symlink(oj_path, dependency)