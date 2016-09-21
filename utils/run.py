import argparse
import utils

from utils import *


_reserved_packages = ["android", "ios", "linux", "osx", "windows"]


def _platform(pkg):
    if pkg == "android":
        import utils.platforms.android

        return utils.platforms.android

    if pkg == "ios":
        import utils.platforms.ios

        return utils.platforms.ios

    if pkg == "linux":
        import utils.platforms.linux

        return utils.platforms.linux

    if pkg == "osx":
        import utils.platforms.osx

        return utils.platforms.osx

    if pkg == "windows":
        import utils.platforms.windows

        return utils.platforms.windows

    return None


def _process_args(args):
    action = args.action
    destination = args.destination
    mode = args.mode
    packages = []

    for pkg in args.packages:
        platform = _platform(pkg)

        if platform:
            destination = platform.destination(action, destination)

            mode = platform.mode(action, mode)

            pkg = platform.package(action, pkg)

            if pkg:
                packages.append(pkg)

        else:
            packages.append(pkg)

    return destination, mode, packages


def run(src_path):
    # setup script arguments
    parser = argparse.ArgumentParser(description="Compile Objective-JS Package(s).")

    parser.add_argument(
        "action", choices=["add", "build", "compile", "dist", "remove", "setup"], default="compile",
        help="The action to take when running the script."
    )

    parser.add_argument(
        "packages", type=str, nargs="*", default=ALL,
        help="Action \"add\": The classes you want to add. At least one class must be specified.\n" +
             "Action \"build\": The packages you want to build. Will build all packages if nothing is specified.\n" +
             "Action \"compile\": The packages you want to compile. Will compile all packages if nothing is specified.\n" +
             "Action \"dist\": The packages you want to distribute.\n" +
             "Action \"remove\": The classes you want to remove. At least one class must be specified.\n" +
             "Action \"setup\": The first argument is the package name and the second is the destination.\n" +
             "***Note: Package names 'android', 'ios', 'linux', 'osx', & 'windows' are reserved."
    )

    parser.add_argument(
        "-v", action="store_true", default=False,
        help="Show verbose output."
    )

    parser.add_argument(
        "--mode", choices=[DEV, PROD], default="prod",
        help="The mode to compile in. Note that prod will automatically update dev as well."
    )

    parser.add_argument(
        "--types", nargs="*", choices=[ALL, CSS, JS, TEMPLATE, THEME], default=ALL,
        help="The file types to compile. Will compile all file types if nothing is specified."
    )

    parser.add_argument(
        "--destination", type=str, default=os.path.join(src_path, "builds"),
        help="The path to the build directory."
    )

    parser.add_argument(
        "--verbose", type=int, default=0,
        help="Show verbose output."
    )

    # process the script args
    args = parser.parse_args()

    kwargs = {
        "types": args.types
    }

    if ALL in args.types:
        kwargs["types"] = TYPES

    # setup verbose setting
    utils.VERBOSE = args.verbose

    if args.v and utils.VERBOSE == 0:
        utils.VERBOSE = 1

    destination, mode, packages = _process_args(args)

    # figure out what action to take
    if args.action == "add":
        # setup compiler instance
        from utils.manage import add

        kwargs["classes"] = packages

        add(src_path, **kwargs)

    elif args.action == "build":
        # check that at least one package was specified
        if args.packages == ALL:
            raise Exception("When building at least one package must be specified. All/empty is unsupported.")

        # setup compiler instance
        from utils.builder import Builder

        builder = Builder("manifest.json")

        # build the compile kwargs
        kwargs["mode"] = mode

        kwargs.pop("types")

        # run the compiler
        builder.run(destination, packages, **kwargs)

    elif args.action == "compile":
        # setup compiler instance
        from utils.compiler import Compiler

        compiler = Compiler("manifest.json")

        # build the compile kwargs
        kwargs["mode"] = mode
        kwargs["packages"] = packages

        # run the compiler
        compiler.run(destination, **kwargs)

    elif args.action == "dist":
        from zipfile import ZipFile

        for package in packages:
            zip_name = "{}{}.zip".format(
                package,
                "-dev" if mode == DEV else ""
            )

            with ZipFile(os.path.join("builds", "dist", zip_name)) as zip:
                print(destination)
                zip.extractall(destination)

    elif args.action == "remove":
        # setup compiler instance
        from utils.manage import remove

        kwargs["classes"] = packages

        remove(src_path, **kwargs)

    elif args.action == "setup":
        from utils.manage import setup

        setup(src_path, *packages)
