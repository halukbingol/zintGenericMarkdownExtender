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
# TODO remove zintBundle from gui
ZINT_BUNDLE = 'zintBundle'

# *************************************
# zint libraries
PATH_WS = '/Users/bingol/Documents/workspace-WebStorm/'
PATH_MIDDLE = '/content/WebContent/zintBundle/'
#
LIB_ZINT_CONTENT = 'zintContent'
HOME_ZINT_CONTENT = PATH_WS + LIB_ZINT_CONTENT + PATH_MIDDLE + LIB_ZINT_CONTENT
#
LIB_ZINT_NAVIGATION = 'zintNavigation'
HOME_ZINT_NAVIGATION = PATH_WS + LIB_ZINT_NAVIGATION + PATH_MIDDLE + LIB_ZINT_NAVIGATION
HOME_ZINT_NAVIGATION_INDEX_HTML = HOME_ZINT_NAVIGATION + '/index.html'
#
LIB_ZINT_LIB = 'zintLib'
HOME_ZINT_LIB = PATH_WS + LIB_ZINT_LIB + PATH_MIDDLE + LIB_ZINT_LIB

# *************************************
# used libraries
HOME_LIB_USED = '/Users/bingol/Documents/workspace-WebStorm/zintZzLibUsed/zintBundle'
#
LIB_FLEXBOX = 'flexbox'
HOME_FLEXBOX = HOME_LIB_USED + '/' + LIB_FLEXBOX
#
LIB_MATH_JAX = 'MathJax'
HOME_MATH_JAX = HOME_LIB_USED + '/' + LIB_MATH_JAX
#
LIB_PRISM = 'prism'
HOME_PRISM = HOME_LIB_USED + '/' + LIB_PRISM
#
LIB_SNAP_SVG = 'SnapSvg'
HOME_SNAP_SVG = HOME_LIB_USED + '/' + LIB_SNAP_SVG

# *************************************
# TODO move to save status(?) file
# PATH_INIT_FOLDER = "/Users/bingol/Documents/"
# PATH_INIT_FOLDER = '/Users/bingol/Documents/tmp/course-zintML/source/chA/secA'
# PATH_INIT_FOLDER = '/Users/bingol/Documents/workspace-WebStorm/course-swe596/source'
PATH_INIT_FOLDER = '/Users/bingol/Documents/workspace-WebStorm/course-swe596'
# *************************************
# ExML language related
# TODO support multiple ExML
# LANGUAGE = "MyML"
LANGUAGE = "zintML"
#
# app configuration
PATH_LANGUAGE = "static/" + LANGUAGE + '/' + SOURCE
CONFIG_CONVERSION = PATH_LANGUAGE + "/config_extension_definitions.json"
PATH_FIXED_F1 = PATH_LANGUAGE + "/ch/sec/template-f1.html"
PATH_FIXED_F2 = PATH_LANGUAGE + "/ch/sec/template-f2.html"
