from zint_os_functions import zint_file_write, zint_file_read
from process_convert import convert

path_to_test = '/Users/bingol/Documents/workspace-PyCharm' \
               + '/zintGenericMarkdownExtender/test'

# content = zint_file_read(path_to + '/in.md')
#
# zint_file_write(path_to + 'out.txt', content)

convert(path_to_test + '/in.md', path_to_test + '/out.txt')
