#!/Users/bingol/miniconda3/bin/python
# main_gui.py

# see: https://realpython.com/pysimplegui-python/

import PySimpleGUI as sg
from pathlib import Path
#
from config_constants import LANGUAGE
from process_gui import \
    gui_process_md, \
    gui_process_sec, \
    gui_process_ch, \
    gui_process_course, \
    gui_process_update_course_structure_js

# sg.theme('DarkAmber')

# define the layout
column_right = [
    [
        sg.Text('Language:'),
        sg.Text(
            LANGUAGE,
            text_color='red'
        )
    ],
    [
        sg.Text("md file"),
        sg.InputText(
            key="path_to_md",
            size=(100, 1),
            default_text="Select an .md file"
        ),
        sg.FileBrowse(
            button_text="md file",
            # file_types=(("ALL Files", "*.*"),),
            file_types=(("Markdown Files", "*.md"),),
            # see: https://stackoverflow.com/questions/57443004/pysimplegui-file-browser-specific-file-type
            target='path_to_md'
        )
    ],
    [
        sg.Button('process_md')
    ],
    [
        sg.Button('process_sec')
    ],
    [
        sg.Button('process_ch')
    ],
    [
        sg.Button('process_course')
    ]
]

layout = [
    [
        # sg.Column(column_left),
        # sg.VSeperator(),
        sg.Column(column_right),
    ]
]

# execution ----
# TODO keep last value in FileBrowse
# see: https://stackoverflow.com/questions/62037000/how-to-keep-the-last-selected-file-from-sg-filebrowser-in-default-text-from-sg-i
# path_initial_folder = PATH_INIT_FOLDER + '/source'

window = sg.Window("zintGenericMarkdownExtender", layout)

# Run the Event Loop
while True:

    event, values = window.read()

    if event == "Exit" or event == sg.WIN_CLOSED:
        break

    # if event == 'zintGenericMarkdownExtender':
    #     # TODO remove zintGenericMarkdownExtender
    #     path_to_md = values['path_to_md']
    #     gui_process_update_lib_used(path_to_md, 'zintGenericMarkdownExtender')
    #     continue

    if event == 'update_course_structure_js':
        path_to_md = values['path_to_md']
        gui_process_update_course_structure_js(path_to_md)
        continue

    if event == 'process_md':
        path_to_md = values['path_to_md']
        gui_process_md(path_to_md)
        continue

    if event == 'process_sec':
        path_to_md = values['path_to_md']
        p_source_md = Path(path_to_md)
        p_source_sec = p_source_md.parent
        gui_process_sec(p_source_sec)
        continue

    if event == 'process_ch':
        path_to_md = values['path_to_md']
        p_source_md = Path(path_to_md)
        p_source_sec = p_source_md.parent
        p_source_ch = p_source_sec.parent
        # p_source_ch = p_source_md.parent.patent
        gui_process_ch(p_source_ch)
        continue

    if event == 'process_course':
        path_to_md = values['path_to_md']
        p_source_md = Path(path_to_md)
        p_source_course = p_source_md.parent.parent.parent
        gui_process_course(p_source_course)
        continue

window.close()
