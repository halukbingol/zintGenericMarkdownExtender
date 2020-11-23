# config_constants.py

from pathlib import Path

DESTINATION = "WebContent"
SOURCE = "source"

# md to html processing
PATH_FIXED_F1 = "static/ch/sec/flexbox-f1.html"
PATH_FIXED_F2 = "static/ch/sec/flexbox-f2.html"
PATH_INIT_FOLDER = "/Users/bingol/Documents/"
FILE_TMP = 'tmp/_tmp.html'

# zintBundle
PATH_ZINT_HOME = '/Users/bingol/Documents/workspace-WebStorm/01pi-ZintLib/ZintLib-snap'
PATH_ZINT_BUNDLE = Path(PATH_ZINT_HOME).joinpath('zintBundle')
PATH_TO_ZINT_NAVIGATION = PATH_ZINT_BUNDLE.joinpath('zintNavigation')
PATH_TO_INDEX_HTML = PATH_ZINT_BUNDLE.joinpath('zintNavigation', 'index.html')
# processing path_to_sec
DIRECTORIES_TO_COPY = ['images']
FILES_TO_SKIP = ['.DS_Store', ',gitignore']

# *************************************
# path of pandoc
PANDOC = "/usr/local/bin/pandoc"
# app configuration
CONFIG_CONVERSION = "config_extension_definitions.json"
