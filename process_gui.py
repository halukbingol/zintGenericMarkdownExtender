# gui_process

import os
from pathlib import Path

from config_constants import DIRECTORIES_TO_COPY, FILES_TO_SKIP
from process_convert import convert
from process_path import get_corresponding_path_in_destination, \
    get_corresponding_path_in_destination_to_html
from process_file import update_zint_bundle, copy_file


def gui_process_update_zint_bundle(path_to_md, option):
    if path_to_md != "":
        path_to_destination = get_corresponding_path_in_destination(path_to_md)
        if option != "":
            update_zint_bundle(path_to_destination)
        else:
            update_zint_bundle(path_to_destination, option)


def gui_process_md(path_to_md):
    path_to_html = get_corresponding_path_in_destination_to_html(path_to_md)
    convert(path_to_md, path_to_html)


def gui_process_sec(path_via_source_to_md):
    # TODO check if it is a path to `.md` file
    # get to_sec from to_md
    p_path_via_source_to_md = Path(path_via_source_to_md)
    suffix = p_path_via_source_to_md.suffix
    if suffix != '.md':
        # TODO warning to user interface
        # alarm
        print(
            '**ERROR** gui_process_sec:path_via_source_to_md should be path to `.md` file \n%s'
            % p_path_via_source_to_md
        )
        return

    p_path_via_source_to_sec = p_path_via_source_to_md.parent

    for p_directory, subdirList, fileList in os.walk(p_path_via_source_to_sec):
        p_path_via_source_to_dir = Path(p_directory)
        subdir = p_path_via_source_to_dir.name
        for file in fileList:
            if file in FILES_TO_SKIP:
                continue

            if p_path_via_source_to_dir == p_path_via_source_to_sec:
                # process md => html
                # get file stem
                p_tmp = Path(file)
                file_name = p_tmp.stem
                # convert
                p_path_via_source_to_md = p_path_via_source_to_sec.joinpath(file_name + '.md')
                p_path_via_destination_to_html = get_corresponding_path_in_destination_to_html(p_path_via_source_to_md)
                convert(p_path_via_source_to_md, p_path_via_destination_to_html)

            elif subdir in DIRECTORIES_TO_COPY:
                # directory copy
                path_source_to_file = p_path_via_source_to_dir.joinpath(file)
                path_destination_to_file = get_corresponding_path_in_destination(path_source_to_file)
                path_destination_directory = path_destination_to_file.parent
                copy_file(path_source_to_file, path_destination_directory)

            else:
                continue

