#!/Users/bingol/miniconda3/bin/python
# main_gui.py

# see: https://realpython.com/pysimplegui-python/

import PySimpleGUI as sg
from config_constants import PATH_INIT_FOLDER, LANGUAGE
from process_gui import gui_process_md, gui_process_sec, gui_process_update_zint_bundle, \
    gui_process_update_course_structure_js, gui_process_update_lib_used

# define the layout
column_left = [
    [
        sg.Text("update")
    ],
    [
        sg.Button(
            button_text='courseStructureJs',
            key='update_course_structure_js'
        )
    ],
    [
        sg.Button(
            button_text='zint_content',
            key='update_zint_content'
        )
    ],
    [
        sg.Button(
            button_text='zint_lib',
            key='update_zint_lib'
        )
    ],
    [
        sg.Button(
            button_text='zint_navigation',
            key='update_zint_navigation'
        )
    ],
    [
        sg.Button(
            button_text='flexbox',
            key='update_flexbox'
        )
    ],
    [
        sg.Button(
            button_text='math_jax',
            key='update_math_jax'
        )
    ],
    [
        sg.Button(
            button_text='prism',
            key='update_prism'
        )
    ],
    [
        sg.Button(
            button_text='snap_svg',
            key='update_snap_svg'
        )
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
            # initial_folder=PATH_INIT_FOLDER,
            # initial_folder=path_initial_folder,
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

layout = [
    [
        sg.Column(column_left),
        sg.VSeperator(),
        sg.Column(column_right),
    ]
]

# execution ----
# TODO keep last value in FileBrowse
# see: https://stackoverflow.com/questions/62037000/how-to-keep-the-last-selected-file-from-sg-filebrowser-in-default-text-from-sg-i
# path_initial_folder = PATH_INIT_FOLDER + '/source'

window = sg.Window("zintContentEditor App", layout)

# Run the Event Loop
while True:

    event, values = window.read()

    if event == "Exit" or event == sg.WIN_CLOSED:
        break


    # *********************************
    # zint libraries
    if event == 'update_zint_content':
        path_to_md = values['path_to_md']
        gui_process_update_lib_used(path_to_md, 'zintContent')
        continue

    if event == 'update_zint_lib':
        path_to_md = values['path_to_md']
        gui_process_update_lib_used(path_to_md, 'zintLib')
        continue

    if event == 'update_zint_navigation':
        path_to_md = values['path_to_md']
        gui_process_update_lib_used(path_to_md, 'zintNavigation')
        # TODO copy index.html
        continue

    # *********************************
    # external libraries
    if event == 'update_flexbox':
        path_to_md = values['path_to_md']
        gui_process_update_lib_used(path_to_md, 'flexbox')
        continue

    if event == 'update_math_jax':
        path_to_md = values['path_to_md']
        gui_process_update_lib_used(path_to_md, 'math_jax')
        continue

    if event == 'update_prism':
        path_to_md = values['path_to_md']
        gui_process_update_lib_used(path_to_md, 'prism')
        continue

    if event == 'update_snap_svg':
        path_to_md = values['path_to_md']
        gui_process_update_lib_used(path_to_md, 'snap_svg')
        continue

    if event == 'update_course_structure_js':
        path_to_md = values['path_to_md']
        gui_process_update_course_structure_js(path_to_md)
        continue

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
