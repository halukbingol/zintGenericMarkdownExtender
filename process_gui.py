# gui_process

import os
from pathlib import Path

from config_constants import \
    DIRECTORIES_TO_COPY, FILES_TO_SKIP
from process_convert import convert
from process_path import get_corresponding_path_in_destination, \
    get_corresponding_path_in_destination_to_html, get_path_to_source
from zint_os_functions import \
    zint_file_copy_create_directory, \
    zint_file_time_stamp


def gui_process_update_course_structure_js(path_to_md):
    if path_to_md != "":
        p_path_to_source = get_path_to_source(path_to_md)
        p_path_to_destination = get_corresponding_path_in_destination(p_path_to_source)
        p_path_via_source_course_structure_js = p_path_to_source.joinpath('courseStructure.js')
        zint_file_copy_create_directory(p_path_via_source_course_structure_js,
                                        p_path_to_destination)
        zint_file_time_stamp(p_path_to_destination)
        print("...updating courseStructure.js: %s" % str(p_path_via_source_course_structure_js))


def gui_process_md(path_to_md):
    path_to_html = get_corresponding_path_in_destination_to_html(path_to_md)
    convert(path_to_md, path_to_html)
    print('...processing file: %s' % str(path_to_md))


def gui_process_sec(path_via_source_to_md):
    # get to_sec from to_md
    p_path_via_source_to_md = Path(path_via_source_to_md)
    suffix = p_path_via_source_to_md.suffix
    if suffix != '.md':
        # TODO warning in the user interface
        # alarm
        print(
            '**ERROR** gui_process_sec:path_via_source_to_md should be path to `.md` file \n%s'
            % p_path_via_source_to_md
        )
        return

    p_path_via_source_to_sec = p_path_via_source_to_md.parent
    print('...processing section: %s' % str(p_path_via_source_to_sec))

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
                # file_name = p_tmp.stem
                file_name = p_tmp.name
                # convert
                p_path_via_source_to_md = p_path_via_source_to_sec.joinpath(file_name)
                p_path_via_destination_to_html = get_corresponding_path_in_destination_to_html(p_path_via_source_to_md)
                convert(p_path_via_source_to_md, p_path_via_destination_to_html)

            elif subdir in DIRECTORIES_TO_COPY:
                # directory copy
                path_source_to_file = p_path_via_source_to_dir.joinpath(file)
                path_destination_to_file = get_corresponding_path_in_destination(path_source_to_file)
                path_destination_directory = path_destination_to_file.parent
                zint_file_copy_create_directory(path_source_to_file, path_destination_directory)

            else:
                continue


def gui_process_ch(path_via_source_to_md):
    # process the chapter containing `.md` file
    # TODO process chapter
    dummy = path_via_source_to_md
    return dummy


def gui_process_course(path_via_source_to_md):
    # process the course containing `.md` file
    # TODO process course
    dummy = path_via_source_to_md
    return dummy
