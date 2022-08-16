import re
from zint_os_functions import zint_file_write, zint_file_read


# line = "# include /../../file.txt"
#
# # INCLUDE_RE = "(^# ?include )([\w\./]+)"
#
# p = re.compile(INCLUDE_RE)
# m = p.match(line)
# print(m)
# print(m.group(1))
# print(m.group(2))


# result = re.sub(r"(\d.*?)\s(\d.*?)", r"\1 \2", line)
# print(result)
#
# print(re.search('^From', 'Reciting From Memory'))
#
# print(re.search('^From', 'From Here to Eternity'))


def convert(path_to_md, path_to_html):
    text = zint_file_read(path_to_md)
    text = process_includes(text)
    zint_file_write(path_to_html, text)


def process_includes(text):
    re_include = "(^# ?include )([\w\./-]+)"
    #
    text_out = ""
    lines = text.splitlines()
    for i in range(len(lines)):
        # process each line
        line = lines[i]
        patter = re.compile(re_include)
        match = patter.match(line)
        if match:
            file_to_include = match.group(2)
            text_included = zint_file_read(file_to_include)
            text_out += text_included
        else:
            text_out += lines[i] + "\n"
    return text_out


convert('in.md', 'out.html')
