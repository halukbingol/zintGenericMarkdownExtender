# gui_process

import os
from pathlib import Path

from config_constants import \
    DIRECTORIES_TO_COPY, FILES_TO_SKIP, \
    ZINT_BUNDLE, \
    HOME_FLEXBOX, LIB_FLEXBOX, \
    HOME_MATH_JAX, LIB_MATH_JAX, \
    HOME_PRISM, LIB_PRISM, \
    HOME_SNAP_SVG, LIB_SNAP_SVG, \
    HOME_ZINT_CONTENT, LIB_ZINT_CONTENT, \
    HOME_ZINT_NAVIGATION, LIB_ZINT_NAVIGATION, \
    HOME_ZINT_LIB, LIB_ZINT_LIB
from process_convert import convert
from process_path import get_corresponding_path_in_destination, \
    get_corresponding_path_in_destination_to_html, get_path_to_source
from process_file import update_zint_bundle, copy_file, update_directory


def gui_process_update_lib_used(path_to_md, lib):
    if path_to_md == '':
        print("**ERROR** Select .md file first")
        return

    #  path to zintBundle
    p_path_destination = get_path_to_source(path_to_md)
    p_path_destination = get_corresponding_path_in_destination(p_path_destination)
    p_path_destination = p_path_destination.joinpath(ZINT_BUNDLE)
    # path to directory of the library

    # zint libraries
    if lib == 'zintContent':
        path_source = HOME_ZINT_CONTENT
        p_path_destination = p_path_destination.joinpath(LIB_ZINT_CONTENT)
    elif lib == 'zintLib':
        path_source = HOME_ZINT_LIB
        p_path_destination = p_path_destination.joinpath(LIB_ZINT_LIB)
    elif lib == 'zintNavigation':
        path_source = HOME_ZINT_NAVIGATION
        p_path_destination = p_path_destination.joinpath(LIB_ZINT_NAVIGATION)

    # external libraries
    elif lib == 'flexbox':
        path_source = HOME_FLEXBOX
        p_path_destination = p_path_destination.joinpath(LIB_FLEXBOX)
    elif lib == 'math_jax':
        path_source = HOME_MATH_JAX
        p_path_destination = p_path_destination.joinpath(LIB_MATH_JAX)
    elif lib == 'prism':
        path_source = HOME_PRISM
        p_path_destination = p_path_destination.joinpath(LIB_PRISM)
    elif lib == 'snap_svg':
        path_source = HOME_SNAP_SVG
        p_path_destination = p_path_destination.joinpath(LIB_SNAP_SVG)
    else:
        path_source = ''
        print('**ERROR** gui_process_update_lib_used: updating library %s is not implemented.' % lib)

    update_directory(path_source, p_path_destination)
    print("...updating %s: %s" % (lib, str(p_path_destination)))


def gui_process_update_course_structure_js(path_to_md):
    if path_to_md != "":
        p_path_to_source = get_path_to_source(path_to_md)
        p_path_via_source_to_course_structure_js = p_path_to_source.joinpath('courseStructure.js')
        p_path_via_destination_to_course_structure_js \
            = get_corresponding_path_in_destination(p_path_via_source_to_course_structure_js)
        copy_file(p_path_via_source_to_course_structure_js, p_path_via_destination_to_course_structure_js.parent)
        print("...updating courseStructure.js: %s" % str(p_path_via_destination_to_course_structure_js))


def gui_process_update_zint_bundle(path_to_md, option):
    if path_to_md != "":
        path_to_destination = get_path_to_source(path_to_md)
        path_to_destination = get_corresponding_path_in_destination(path_to_destination)
        if option != "":
            update_zint_bundle(path_to_destination)
            print("...zintBundle is updated")
        else:
            update_zint_bundle(path_to_destination, option)
            print("...zintBundle is updated with %s" % option)


def gui_process_md(path_to_md):
    print('...processing file: %s' % str(path_to_md))

    path_to_html = get_corresponding_path_in_destination_to_html(path_to_md)
    convert(path_to_md, path_to_html)


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
                copy_file(path_source_to_file, path_destination_directory)

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
