#!/usr/bin/env python

__author__ = "Tony Osibov"


# dependencies
import argparse
import json
from imp import load_source
from os import path


# figure out the source path
src_path = path.abspath(path.join(path.dirname(__file__), path.pardir))

# load the oj package
utils = load_source('utils', path.join(src_path, 'utils', '__init__.py'))


# setup script arguments
parser = argparse.ArgumentParser(description='Compile Objective-JS Package.')

parser.add_argument(
    'packages', type=str, nargs='*', default='all',
    help='The package(s) you want to compile. Will build all packages if nothing is specified.'
)

parser.add_argument(
    '--mode', type=str, choices=['dev', 'prod'], default='prod',
    help='The mode to compile in. Note that prod will automatically update dev as well.'
)

parser.add_argument(
    '--types', type=str, nargs='*', choices=['all', 'css', 'js', 'theme'], default='all',
    help='The file types to compile. Will compile all file types if nothing is specified.'
)

parser.add_argument('--destination', type=str, help='The path to the build directory.')
parser.add_argument('--source', type=str, help='The path to the directory of the package.')

parser.add_argument('--manifest-file', type=str, help='The path to the manifest.json file.')
parser.add_argument('--manifest-json', type=str, help='The raw manifest JSON.')


# process the script args
args = parser.parse_args()

kwargs = {
    "mode": args.mode,
    "output": True,
    "packages": args.packages,
    "types": args.types
}

if args.destination:
    kwargs['destination'] = args.destination

if args.manifest_file:
    kwargs["manifest"] = utils.load_json(args.manifest_file)

    if not kwargs["manifest"]:
        raise Exception("Could not load manifest file.")

elif args.manifest_json:
    try:
        kwargs["manifest"] = json.loads(args.manifest_json)
    except:
        raise Exception("Could not parse manifest JSON.")

if args.source:
    src_path = args.source

if 'all' in args.types:
    kwargs['types'] = 'all'

# compile
utils.compile(src_path, **kwargs)
