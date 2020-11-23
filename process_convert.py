# process_convert.py

import re
import json
import subprocess
from os.path import dirname, join, abspath
#
from config_constants import CONFIG_CONVERSION, PANDOC, PATH_FIXED_F1, PATH_FIXED_F2, FILE_TMP
from process_file import write_text_file


def convert(path_to_md, path_to_html):
    # print('hbConvert/path_to_md:', path_to_md, ' path_to_html:', path_to_html)

    content = read_text_file(path_to_md)
    # print('content:')
    # print(content)

    # apply tc => md on `content`
    content = process_tc_to_md(content)

    # apply md => html by pandoc
    content = process_md_to_html(content)

    # process for prism
    content = process_html_prism_html(content)

    # process to html page
    content = process_html_to_page(content)

    # write
    write_text_file(path_to_html, content)

    return


def process_tc_to_md(text):
    """
    Read text, return text

    - Read 'config_extension_definitions.json'
    - for each line in text
    -   for each tc tag
    -     apply each rule

    Note that only 'Open Project' needs special processing.
    """
    f = open(CONFIG_CONVERSION)
    patterns = json.load(f)

    lines = text.splitlines()
    for i in range(len(lines)):
        # process each line
        line = lines[i]
        for index, pattern in patterns.items():
            # example
            #   index = "Title Slide"
            #   pattern = "explanation" + "rule" + "enable-groups"
            for key, value in pattern["rule"].items():
                # example
                #   key = "^#TA$"
                #   value = "\n</div>\n</div>\n"
                exp = re.compile(key)
                match = exp.search(line)
                if match:
                    if "enable-groups" in pattern:
                        # case of "Open Project" tag processing
                        p = re.compile(r"\\([\d])")
                        found_group = p.search(value)
                        if found_group:
                            n = int(found_group.group(1))
                            line = p.sub(match.group(n), line)
                        lines[i] = exp.sub(value, line)
                        print(lines[i])
                    else:
                        lines[i] = exp.sub(value, line)

    return "\n".join(lines)


def process_md_to_html(content):
    """"
    Convert md file './tempfiles/tmp.md' to html  by pandoc.
    Return the html content as string.
    """

    # TODO use pathlib
    file_tmp = abspath(join(dirname(__file__), FILE_TMP))
    f = open(file_tmp, "w+", encoding="utf-8")
    f.write(content)
    f.close()
    bytes_tmp = subprocess.check_output(
        [
            PANDOC, "-f", "commonmark", "--no-highlight", "-t", "html",
            file_tmp
        ],
        shell=False
    )
    str_tmp = bytes_tmp.decode("utf-8")
    return str_tmp


def process_html_prism_html(text):
    """
    - Read 'config_extension_definitions.json'
    - for each line in text
    -   for each tc tag
    -     apply each rule

    Note that only 'Open Project' needs special processing.
    """

    f = open(CONFIG_CONVERSION)
    patterns = json.load(f)
    pattern = patterns["prism"]
    rule = pattern["rule"]

    lines = text.splitlines()
    for i in range(len(lines)):
        line = lines[i]
        for key, value in rule.items():
            exp = re.compile(key)
            match = exp.search(line)
            if match:
                lines[i] = exp.sub(value, line)

    return "\n".join(lines)


def process_html_to_page(content):
    f1 = read_text_file(PATH_FIXED_F1)
    f2 = read_text_file(PATH_FIXED_F2)
    content = f1 + content + f2
    return content


def read_text_file(path_to_file):
    # read into content
    f = open(path_to_file, "r", encoding="utf-8")
    content = f.read()
    f.close()
    print('path_to_txt:', content)
    return content
