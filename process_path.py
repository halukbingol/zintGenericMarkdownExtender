# process_path.py

#  https://docs.python.org/3/library/pathlib.html

from pathlib import Path
#
from config_constants import DESTINATION, SOURCE

"""
Naming conventions

p_path:posix path
path: path as str
str_path: path as str


path_to_course|        |- path_ch_to_md
              v        v
/.../courseTest/source/chA/secA/a.md
                              ^
       path_via_source_to_sec-|                                   
                              v
/.../courseTest/source/chA/secA/images/a.jpg
                       ^
                       |- path_ch_to_file
"""


# ************************************* V
# # reminder for pathlib
# from pathlib import Path
# #
# p_path = Path('aaa/bbb/ccc.ddd')
# name = p_path.name  # 'ccc.ddd'
# stem = p_path.stem  # 'ccc'
# suffix = p_path.suffix  # '.ddd'
# parent = p_path.parent  # 'aaa/bbb'
# ************************************* A


def get_corresponding_path_in_destination(path_via_source_to_file):
    """
    Return absolute posix path to the corresponding file in destination.
    :param path_via_source_to_file:
    :return: str_path_via_destination_to_file
    """
    # replace source with destination
    str_path_via_source_to_file = str(path_via_source_to_file)
    str_path_via_destination_to_file = str_path_via_source_to_file.replace(SOURCE, DESTINATION, 1)
    return Path(str_path_via_destination_to_file)


def get_corresponding_path_in_destination_to_html(path_via_source_to_md):
    """
    Return absolute posix path to the corresponding file in destination.
    If the extension of the file is `.md`, change it to `.html`;
    otherwise do not change the extension.
    Example
    '.../courseTest/source/chA/secA/a.md' becomes
    '.../courseTest/destination/chA/secA/a.html'
    Note that `.md` becomes `.html`.
    :param path_via_source_to_md: absolute path to md file in the source
    :return: p_path_via_destination_to_html: absolute posix path to the corresponding file in the destination.
    """
    p_path_tmp = get_corresponding_path_in_destination(path_via_source_to_md)
    # change .md to .html
    stem = p_path_tmp.stem
    suffix = p_path_tmp.suffix
    if suffix == '.md':
        p_path_tmp = p_path_tmp.parent.joinpath(stem + '.html')

    return p_path_tmp

    # p_path_via_destination_to_md = get_corresponding_path_in_destination(path_via_source_to_md)
    # # change `.md` to `.html`
    # p_path_via_destination_to_sec = p_path_via_destination_to_md.parent
    # file_stem = p_path_via_destination_to_md.stem
    # p_path_via_destination_to_html = p_path_via_destination_to_sec.joinpath(file_stem + '.html')
    # return p_path_via_destination_to_html


def get_path_to_source(path_via_source_to_md):
    p_path_tmp = Path(path_via_source_to_md)
    # source/ch/sec/a.md
    p_path_tmp = p_path_tmp.parent.parent.parent
    return p_path_tmp
