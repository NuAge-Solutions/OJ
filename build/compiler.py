#!/usr/bin/env python

__author__ = "Tony Osibov"

# dependencies
import argparse
from imp import load_source
from os import path

# figure out the source path
src_path = path.abspath(path.join(path.dirname(__file__), path.pardir))

# load the oj package
oj = load_source('oj', path.join(src_path, '__init__.py'))

# setup script arguments
parser = argparse.ArgumentParser(description='Compile Objective-JS Package.')

parser.add_argument('profiles',
                    type=str, nargs='*', default=['all'],
                    help='The profile(s) you want to compile.')

parser.add_argument('--mode',
                    type=str, choices=['dev', 'prod'], default='prod',
                    help='The mode to compile in. Note that prod will automatically update dev as well.')

parser.add_argument('--package',
                    type=str, default=None,
                    help='The package name to use.')

parser.add_argument('--type',
                    type=str, choices=['all', 'css', 'js', 'theme'], default='all',
                    help='The file types to compile.')

parser.add_argument('--source', type=str, help='The path to the directory of the package.')

# process the script args
args = parser.parse_args()

# compile
oj.compile(
    args.source if args.source else src_path,
    mode=args.mode, output=True, profiles=args.profiles, type=args.type, package=args.package
)