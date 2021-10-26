#  zint_os_functions.py

from pathlib import Path
import subprocess
from pathlib import Path


# from config_constants import PATH_ZINT_BUNDLE, PATH_TO_INDEX_HTML, ZINT_BUNDLE
# from process_path import get_path_to_source, get_corresponding_path_in_destination


def zint_directory_clear(path_directory_destination):
    """
    Remove the old directory at the destination,
    create a brand new one.
    """
    p_path_destination = Path(path_directory_destination)
    subprocess.run(["rm", "-R", p_path_destination, "/dev/null"], capture_output=True)
    subprocess.run(["mkdir", "-p", p_path_destination], capture_output=True)
    return


def zint_directory_copy(path_directory_source, path_directory_destination):
    """
    Copy recursively the directory at the source to the destination.
    """
    p_path_destination = Path(path_directory_destination)
    subprocess.run(["cp", "-r", path_directory_source, p_path_destination.parent], capture_output=True)
    return


def zint_directory_update(path_directory_source, path_directory_destination):
    """
    Remove the old directory at the destination,
    copy recursively the directory at the source to the destination.
    """
    zint_directory_clear(path_directory_destination)
    zint_directory_copy(path_directory_source, path_directory_destination)

    # p_path_destination = Path(path_directory_destination)
    # subprocess.run(["rm", "-R", p_path_destination, "/dev/null"], capture_output=True)
    # subprocess.run(["mkdir", "-p", p_path_destination], capture_output=True)
    # subprocess.run(["cp", "-r", path_directory_source, p_path_destination.parent], capture_output=True)
    return


def zint_directory_create(path_destination_directory):
    """
    Create a directory.
    """
    subprocess.run(["mkdir", "-p", path_destination_directory], capture_output=True)
    return


def zint_file_copy(path_source_to_file, path_destination_directory):
    """
    Copy `path_source_to_file` to `path_destination_directory`.
    """
    subprocess.run(["cp", path_source_to_file, path_destination_directory], capture_output=True)
    return


def zint_file_copy_create_directory(path_source_to_file, path_destination_directory):
    """
    Copy `path_source_to_file` to `path_destination_directory`.

    If destination directory does not exist, create one.
    """
    zint_directory_create(path_destination_directory)

    subprocess.run(["mkdir", "-p", path_destination_directory], capture_output=True)
    subprocess.run(["cp", path_source_to_file, path_destination_directory], capture_output=True)
    return


def zint_file_read(path_to_file):
    # read into content
    f = open(path_to_file, "r", encoding="utf-8")
    content = f.read()
    f.close()
    return content


def zint_file_write(path_to_file, text):
    """
    Write `text` into `path_to_file`.
    """
    p_path_to_file = Path(path_to_file)
    p_parent = p_path_to_file.parent
    p_parent.mkdir(parents=True, exist_ok=True)
    #
    f = open(p_path_to_file, "w", encoding="utf-8")
    f.write(text)
    f.close()


def zint_file_time_stamp(path_directory_destination):
    """
    Add `timeStamp.txt` file with a time stamp in the directory.
    """
    p_path_time_stamp = Path(path_directory_destination).joinpath('timeStamp.txt')
    from datetime import datetime
    time_stamp = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
    zint_file_write(p_path_time_stamp, time_stamp)

    # subprocess.run(["rm", p_path_time_stamp, "/dev/null"], capture_output=True)
    # subprocess.run(["date +'%Y-%m-%dT%T' >", p_path_time_stamp], capture_output=True)
    return
