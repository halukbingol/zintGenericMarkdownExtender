#!/Users/bingol/miniconda3/bin/python

# main_cli.py

import sys
import getopt
from process_convert import convert


def main(argv):
    path_to_md = ''
    path_to_html = ''
    try:
        opts, args = getopt.getopt(argv, "hi:o:", ["ifile=", "ofile="])
    except getopt.GetoptError:
        print('test.py -i <inputfile> -o <outputfile>')
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print('test.py -i <inputfile> -o <outputfile>')
            sys.exit()
        elif opt in ("-i", "--ifile"):
            path_to_md = arg
        elif opt in ("-o", "--ofile"):
            path_to_html = arg
    print('Input file is "', path_to_md)
    print('Output file is "', path_to_html)
    convert(path_to_md, path_to_html)


if __name__ == "__main__":
    main(sys.argv[1:])
