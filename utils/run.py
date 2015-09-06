import argparse
import utils

from utils import *


def run(src_path):
    # setup script arguments
    parser = argparse.ArgumentParser(description='Compile Objective-JS Package(s).')

    parser.add_argument(
        'action', choices=['add', 'compile', 'remove', 'setup'], default='compile',
        help='The action to take when running the script.'
    )

    parser.add_argument(
        'packages', type=str, nargs='*', default=ALL,
        help='The package(s) you want to compile. Will build all packages if nothing is specified.'
    )

    parser.add_argument(
        '-v', action='store_true', default=False,
        help='Show verbose output.'
    )

    parser.add_argument(
        '--mode', choices=[DEV, PROD], default='prod',
        help='The mode to compile in. Note that prod will automatically update dev as well.'
    )

    parser.add_argument(
        '--types', nargs='*', choices=[ALL, CSS, JS, TEMPLATE, THEME], default=ALL,
        help='The file types to compile. Will compile all file types if nothing is specified.'
    )

    parser.add_argument(
        '--destination', type=str, default=os.path.join(src_path, 'builds'),
        help='The path to the build directory.'
    )

    parser.add_argument(
        '--manifest', type=str, default=os.path.join(src_path, 'manifest.json'),
        help='The path to the manifest.json file.'
    )

    parser.add_argument(
        '--verbose', type=int, default=0,
        help='The path to the manifest.json file.'
    )

    # process the script args
    args = parser.parse_args()

    kwargs = {
        'types': args.types
    }

    if ALL in args.types:
        kwargs['types'] = TYPES

    # setup verbose setting
    utils.VERBOSE = args.verbose

    if args.v and utils.VERBOSE == 0:
        utils.VERBOSE = 1

    # figure out what action to take
    if args.action == 'add':
        # setup compiler instance
        from utils.manage import add

        kwargs['classes'] = args.packages

        add(src_path, **kwargs)

    elif args.action == 'compile':
        # setup compiler instance
        from utils.compiler import Compiler

        compiler = Compiler(args.manifest)

        # build the compile kwargs
        kwargs['mode'] = args.mode
        kwargs['packages'] = args.packages

        # run the compiler
        compiler.run(args.destination, **kwargs)

    elif args.action == 'remove':
        # setup compiler instance
        from utils.manage import remove

        kwargs['classes'] = args.packages

        remove(src_path, **kwargs)

    elif args.action == 'setup':
        from utils.manage import setup

        setup(src_path)
