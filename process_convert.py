# process_convert.py

# process single file

import re
import json
import subprocess
from os.path import dirname, join, abspath
from pathlib import Path
#
from config_constants import \
    GENERIC_MARKDOWN_EXTENDER, \
    PANDOC, FILE_TMP, \
    LANGUAGE, SOURCE, \
    CONFIG_EXTENSION_DEFINITIONS, \
    CH_SEC_TEMPLATE_F1, CH_SEC_TEMPLATE_F2, CH_SEC_TEMPLATE_SBS
from zint_os_functions import zint_file_write, zint_file_read

# set variables
PATH_LANGUAGE = GENERIC_MARKDOWN_EXTENDER \
                + "/static/" + LANGUAGE + '/' + SOURCE
CONFIG_CONVERSION = PATH_LANGUAGE + "/" + CONFIG_EXTENSION_DEFINITIONS
PATH_FIXED_F1 = PATH_LANGUAGE + "/" + CH_SEC_TEMPLATE_F1
PATH_FIXED_F2 = PATH_LANGUAGE + "/" + CH_SEC_TEMPLATE_F2
PATH_FIXED_SBS = PATH_LANGUAGE + "/" + CH_SEC_TEMPLATE_SBS


def convert(path_to_md, path_to_html):
    """
    Order the processes.
    """

    # read in `.md` file
    text = zint_file_read(path_to_md)

    # process head
    text = process_head_zint(text)
    text = process_head_locals_js(text)
    text = process_head_locals_css(text)

    # process templates
    text = process_template(text)

    # process include files
    text = process_includes(text, path_to_md)

    # apply tc => md on `content`
    text = process_xm_to_md(text)

    # apply md => html by pandoc
    text = process_md_to_html(text)

    # process for prism
    text = process_html_prism_html(text)

    # process to html page
    text = process_html_to_page(text)

    # write
    zint_file_write(path_to_html, text)

    return


def process_head_locals_js(text):
    return process_head_locals(text, "headLocalJs")


def process_head_locals_css(text):
    return process_head_locals(text, "headLocalCss")


def process_head_locals(text, opcode):
    """
    replaces `# headLocalX fileA` with `<link>` or `<script>` in `head`
    """
    re_include = "(^# ?" + opcode + " )([\w\./ -]+)"
    #
    text_out: str = ""
    lines = text.splitlines()
    for i in range(len(lines)):
        # process each line
        line = lines[i]
        patter = re.compile(re_include)
        match = patter.match(line)
        if match:
            file_to_include = match.group(2)
            if opcode == "headLocalJs":
                text_out += "<script src=\"" + file_to_include + "\"></script>"
            else:
                text_out += "<link rel=\"stylesheet\" href=\"" + file_to_include + "\">"
        else:
            text_out += lines[i] + "\n"
    return text_out


def process_head_zint(text):
    """
    replaces `# headLocalX fileA` with `<link>` or `<script>` in `head`
    """
    re_include = "(^# ?headZintBundle )([\w\./-]+)"
    #
    text_out: str = ""
    lines = text.splitlines()
    for i in range(len(lines)):
        # process each line
        line = lines[i]
        patter = re.compile(re_include)
        match = patter.match(line)
        if match:
            file_to_include = match.group(2)

            # zintLab libraries
            if file_to_include == "zintContent":
                text_out += "<link rel=\"stylesheet\" href=\"../../zintBundle/zintContent/zintContent.css\">"
                text_out += "<script src=\"../../zintBundle/zintContent/zintContent.js\"></script>"
                text_out += "<script src=\"../../zintBundle/zintContent/zintContentSnapStepByStepDescription.js\"></script>"
                text_out += "<script src=\"../../zintBundle/zintContent/zintContentSnapUtility.js\"></script>"

            # external libs
            if file_to_include == "mathjax":
                text_out += "<script src=\"../../zintBundle/MathJax/tex-svg.js\"></script>"

            if file_to_include == "prism":
                text_out += "<link rel=\"stylesheet\" href=\"../../zintBundle/prism/prism.css\">"
                text_out += "<script src=\"../../zintBundle/prism/prism.js\"></script>"

            if file_to_include == "snapsvg":
                text_out += "<script src=\"../../zintBundle/SnapSvg/snap.svg-min.js\"></script>"

            # # dummy
            # if file_to_include == "aa":
            #     text_out += "<link rel=\"stylesheet\" href=\"../../zintBundle/aa/bb.css\">"
            #     text_out += "<script src=\"../../zintBundle/aa/bb.js\"></script>"
            # if file_to_include == "aa":
            #     text_out += "<link rel=\"stylesheet\" href=\"../../zintBundle/aa/bb.css\">"
            #     text_out += "<script src=\"../../zintBundle/aa/bb.js\"></script>"

        else:
            text_out += lines[i] + "\n"
    return text_out

    # <link rel=\"stylesheet\" href=\"../../zintBundle/aa/bb.css\">
    # <script src=\"../../zintBundle/aa/bb.js\"></script>


def process_includes(text, path_to_md):
    """
    replaces `# include fileA` with content of `fileA`
    """
    re_include = "(^# ?include )([\w\./-]+)"
    p_path_to_md = Path(path_to_md)
    p_directory = p_path_to_md.parent
    #
    text_out: str = ""
    lines = text.splitlines()
    for i in range(len(lines)):
        # process each line
        line = lines[i]
        patter = re.compile(re_include)
        match = patter.match(line)
        if match:
            file_to_include = match.group(2)
            p_file_to_include = p_directory.joinpath(file_to_include)
            text_included = zint_file_read(p_file_to_include)
            text_out += text_included
        else:
            text_out += lines[i] + "\n"
    return text_out


def process_xm_to_md(text):
    """
    Convert extended markup to md and html.

    Read text, return text
    - Read 'config_extension_definitions.json'
    - for each line in text
    -   for each em tag
    -     apply each rule

    Note that only 'Open Project' needs special processing.
    """
    f = open(CONFIG_CONVERSION)
    patterns = json.load(f)

    # TODO inline markup such as `dd{aaa}dd` not working

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
                    # elif "include" in pattern:
                    #
                    else:
                        # lines[i] = exp.sub(value, line)
                        after = exp.sub(value, line)
                        line = after
        lines[i] = line

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


def process_template(text):
    """
    replaces `# includeTemplate template-xx` content of `template-xx.html`
    """
    re_include = "(^# ?includeTemplate )([\w\./-]+)"
    #
    text_out: str = ""
    lines = text.splitlines()
    for i in range(len(lines)):
        # process each line
        line = lines[i]
        patter = re.compile(re_include)
        match = patter.match(line)
        if not match:
            text_out += lines[i] + "\n"
        else:
            file_to_include = match.group(2)
            if file_to_include == "template-sbs":
                template = zint_file_read(PATH_FIXED_SBS)
                text_out = text_out + template
            # if file_to_include == "template-xxx":
            #     # dummy
    return text_out


def process_html_to_page(text):
    # f1 = zint_file_read(PATH_FIXED_F1)
    f2 = zint_file_read(PATH_FIXED_F2)
    # content = f1 + content + f2
    text = text + f2
    return text
