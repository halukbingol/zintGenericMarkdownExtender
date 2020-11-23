#  process_file.py

from pathlib import Path
import subprocess
from pathlib import Path

from config_constants import PATH_ZINT_BUNDLE, PATH_TO_INDEX_HTML


def update_zint_bundle(path_to_webcontent, static=""):
    if static == "":
        # update zintBundle without static libraries
        path_to_zint_bundle = Path(path_to_webcontent).joinpath('zintBundle')
        subprocess.run(["rm", "-R", path_to_zint_bundle, "/dev/null"], capture_output=True)
        subprocess.run(["cp", "-r", PATH_ZINT_BUNDLE, path_to_webcontent], capture_output=True)
        subprocess.run(["cp", PATH_TO_INDEX_HTML, path_to_webcontent], capture_output=True)
    else:
        # TODO implement zintBundle with static libraries
        print("'update_zint_bundle: with static' is not implemented")

    return


def copy_file(path_source_to_file, path_destination_to_file):
    subprocess.run(["mkdir", "-p", path_destination_to_file], capture_output=True)
    subprocess.run(["cp", path_source_to_file, path_destination_to_file], capture_output=True)
    return


def write_text_file(path_to_file, text):
    p_path_to_file = Path(path_to_file)
    p_parent = p_path_to_file.parent
    p_parent.mkdir(parents=True, exist_ok=True)

    f = open(p_path_to_file, "w", encoding="utf-8")
    f.write(text)
    f.close()
