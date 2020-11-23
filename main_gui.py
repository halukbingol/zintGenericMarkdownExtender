#!/Users/bingol/miniconda3/bin/python
# main_gui.py

# see: https://realpython.com/pysimplegui-python/

import PySimpleGUI as sg
from config_constants import PATH_INIT_FOLDER, LANGUAGE
from process_gui import gui_process_md, gui_process_sec, gui_process_update_zint_bundle

column_left = [
    [
        sg.Text("update")
    ],
    [
        sg.Button(
            button_text='zintBundle',
            key='update_zintBundle'
        )
    ],
    [
        sg.Button(
            button_text='zintBundle w/static',
            key='update_zintBundle_static'
        )
    ]
]

column_right = [
    [
        sg.Text('Language:'),
        sg.Text(LANGUAGE, text_color='red'),
        # sg.T('Not Selected ', size=(52, 1), justification='left', text_color='red', background_color='white',
        #      key='exml_language'
        #      ),
    ],
    [
        sg.Text("md file"),
        sg.InputText(key="path_to_md", size=(100, 1)),
        sg.FileBrowse(
            button_text="md file",
            # file_types=(("ALL Files", "*.*"),),
            file_types=(("Markdown Files", "*.md"),),
            # see: https://stackoverflow.com/questions/57443004/pysimplegui-file-browser-specific-file-type
            initial_folder=PATH_INIT_FOLDER,
            target='path_to_md'
        )
    ],
    [
        sg.Button('process_md')
    ],
    [
        sg.Button('process_sec')
    ]
]

# ----- Full layout -----
layout = [
    [
        sg.Column(column_left),
        sg.VSeperator(),
        sg.Column(column_right),
    ]
]

window = sg.Window("ZintContentEditor App", layout)

# Run the Event Loop
while True:
    event, values = window.read()
    if event == "Exit" or event == sg.WIN_CLOSED:
        break

    if event == 'update_zintBundle':
        path_to_md = values['path_to_md']
        gui_process_update_zint_bundle(path_to_md, "")
        continue

    if event == 'update_zintBundle_static':
        path_to_md = values['path_to_md']
        gui_process_update_zint_bundle(path_to_md, "static")
        continue

    if event == 'process_md':
        path_to_md = values['path_to_md']
        gui_process_md(path_to_md)
        continue

    if event == 'process_sec':
        path_to_md = values['path_to_md']
        gui_process_sec(path_to_md)
        continue

window.close()
