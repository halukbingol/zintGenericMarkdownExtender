#  process_file.py

from pathlib import Path
import subprocess
from pathlib import Path

from config_constants import PATH_ZINT_BUNDLE, PATH_TO_INDEX_HTML, ZINT_BUNDLE
from process_path import get_path_to_source, get_corresponding_path_in_destination


def update_directory(path_directory_source, path_directory_destination):
    # remove and copy destination
    p_path_destination = Path(path_directory_destination)
    subprocess.run(["rm", "-R", p_path_destination, "/dev/null"], capture_output=True)
    subprocess.run(["cp", "-r", path_directory_source, p_path_destination.parent], capture_output=True)
    return


def update_zint_bundle(path_to_destination, static=""):
    if static == "":
        # update zintBundle without static libraries
        path_to_zint_bundle = Path(path_to_destination).joinpath('zintBundle')
        subprocess.run(["rm", "-R", path_to_zint_bundle, "/dev/null"], capture_output=True)
        subprocess.run(["cp", "-r", PATH_ZINT_BUNDLE, path_to_destination], capture_output=True)
        subprocess.run(["cp", PATH_TO_INDEX_HTML, path_to_destination], capture_output=True)
    else:
        # TODO implement zintBundle with static libraries
        print("'update_zint_bundle: with static' is not implemented")

    return


def copy_file(path_source_to_file, path_destination_directory):
    subprocess.run(["mkdir", "-p", path_destination_directory], capture_output=True)
    subprocess.run(["cp", path_source_to_file, path_destination_directory], capture_output=True)
    return


def write_text_file(path_to_file, text):
    p_path_to_file = Path(path_to_file)
    p_parent = p_path_to_file.parent
    p_parent.mkdir(parents=True, exist_ok=True)

    f = open(p_path_to_file, "w", encoding="utf-8")
    f.write(text)
    f.close()
