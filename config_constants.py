# config_constants.py

# *************************************
# general
DESTINATION = "WebContent"
SOURCE = "source"
FILE_TMP = 'tmp/_tmp.html'
# path of pandoc
PANDOC = "/usr/local/bin/pandoc"
# processing path_to_sec
DIRECTORIES_TO_COPY = ['images']
FILES_TO_SKIP = ['.DS_Store', ',gitignore']

# *************************************
# zintBundle
PATH_ZINT_HOME = '/Users/bingol/Documents/workspace-WebStorm/01pi-ZintLib/ZintLib-snap'
PATH_ZINT_BUNDLE = PATH_ZINT_HOME + '/zintBundle'
PATH_TO_ZINT_NAVIGATION = PATH_ZINT_BUNDLE + '/zintNavigation'
PATH_TO_INDEX_HTML = PATH_ZINT_BUNDLE + '/zintNavigation/index.html'

# *************************************
# TODO move to save status(?) file
# PATH_INIT_FOLDER = "/Users/bingol/Documents/"
PATH_INIT_FOLDER = '/Users/bingol/Documents/tmp/course-zintML/source/chA/secA'

# *************************************
# ExML language related
# TODO support multiple ExML
# LANGUAGE = "static/zintML"
LANGUAGE = "zintML"
LANGUAGE = "MyML"
#
# app configuration
PATH_LANGUAGE = "static/" + LANGUAGE
CONFIG_CONVERSION = PATH_LANGUAGE + "/config_extension_definitions.json"
PATH_FIXED_F1 = PATH_LANGUAGE + "/ch/sec/template-f1.html"
PATH_FIXED_F2 = PATH_LANGUAGE + "/ch/sec/template-f2.html"
