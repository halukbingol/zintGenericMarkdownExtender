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
        # os.path.join(p_directory, name)
        p_path_via_source_to_dir = Path(p_directory)
        subdir = p_path_via_source_to_dir.name
        for file in fileList:
            if file in FILES_TO_SKIP:
                continue

            p_source_full_to_file = os.path.join(p_directory, file)
            # filename, file_extension = os.path.splitext(p_source_full_to_file)
            file_extension = p_source_full_to_file.suffix
            if file_extension in ["js", "css"]:
                # copy js and css files
                p_destination_full_to_file = get_corresponding_path_in_destination(p_source_full_to_file)
                zint_file_copy(p_source_full_to_file, p_destination_full_to_file)

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
