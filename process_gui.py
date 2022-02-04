# gui_process

import os
from pathlib import Path
# zint libraries
from process_convert import convert
from process_path import get_corresponding_path_in_destination, \
    get_corresponding_path_in_destination_to_html, get_path_to_source
from zint_os_functions import \
    zint_file_copy_create_directory, \
    zint_file_time_stamp, \
    zint_file_copy, \
    zint_directory_create, \
    zint_directory_copy

# *************************************
# processing path_to_sec
SEC_DIRECTORIES_TO_COPY = ['images']
SEC_DIRECTORIES_TO_SKIP = []
SEC_FILES_TO_SKIP = ['.DS_Store', '.gitignore']
SEC_FILES_TO_COPY = [".js", ".css"]


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
    print('...processing file: %s' % str(path_to_md))
    path_to_html = get_corresponding_path_in_destination_to_html(path_to_md)
    convert(path_to_md, path_to_html)


def gui_process_sec(path_source_sec):
    """
    Processes section.

    Converts `.md` files to `.html`.
    Blocks files in `FILES_TO_SKIP`.
    Copies directories in `DIRECTORIES_TO_COPY`
    """
    # p_source_sec = Path(path_source_sec)
    for root, listDirectory, listFile in os.walk(path_source_sec):
        # process the first level of the tree
        p_source_sec = Path(root)
        p_destination_sec = get_corresponding_path_in_destination(p_source_sec)
        zint_directory_create(p_destination_sec)
        for file in listFile:
            p_source_file = p_source_sec.joinpath(file)
            file_extension = p_source_file.suffix
            if file_extension == '.md':
                gui_process_md(p_source_file)
            elif file_extension in SEC_FILES_TO_COPY:
                p_destination_file = get_corresponding_path_in_destination(p_source_file)
                zint_file_copy(p_source_file, p_destination_file)
            elif file in SEC_FILES_TO_SKIP:
                continue
            else:
                print("**WARNING**"
                      + "gui_process_sec: unprocessed file: " + str(p_source_file))
        for directory in listDirectory:
            p_source_directory = p_source_sec.joinpath(directory)
            if directory in SEC_DIRECTORIES_TO_COPY:
                p_destination_directory = get_corresponding_path_in_destination(p_source_directory)
                zint_directory_copy(p_source_directory, p_destination_directory)
            elif directory in SEC_DIRECTORIES_TO_SKIP:
                continue
            else:
                print("**WARNING**"
                      + "gui_process_sec: unprocessed directory: " + str(p_source_directory))
        break  # do not go below the first level


def gui_process_ch(path_source_ch):
    """
    Process the chapter containing `.md` file
    """
    for root, listDirectory, listFile in os.walk(path_source_ch):
        p_source_ch = Path(root)
        for sec in listDirectory:
            p_source_sec = p_source_ch.joinpath(sec)
            gui_process_sec(p_source_sec)
        break  # do not go below the first level


def gui_process_course(path_source_course):
    """
    Process the course containing `.md` file
    """
    for root, listDirectory, listFile in os.walk(path_source_course):
        p_source_course = Path(root)
        for ch in listDirectory:
            p_source_ch = p_source_course.joinpath(ch)
            gui_process_ch(p_source_ch)
        break  # do not go below the first level
