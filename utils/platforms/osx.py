import os

from utils import DEV, PROD


def destination(action, dst):
    if action == "dist":
        return os.path.join(
            os.environ.get("BUILT_PRODUCTS_DIR"),
            os.environ.get("CONTENTS_FOLDER_PATH"),
            "Resources"
        )

    return dst


def mode(action, mode):
    return PROD
    # return DEV if os.environ.get("CONFIGURATION", "").lower() == "debug" else PROD


def package(action, package):
    return os.environ.get(
        "NATIVEWEB_BUILD_ID",
        os.environ.get("PRODUCT_BUNDLE_IDENTIFIER", None)
    )
