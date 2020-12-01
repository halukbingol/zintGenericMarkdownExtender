# Running at Comment Line


## Requirements

- `Python 3` version: `3.7.0`
- `pip3` Python package installer
- `pandoc` Universal document converter

## Installation

1. Download pandoc separately. Make sure that it runs.

2. Make a home director for `zintGenericMarkdownExtender`, say `zGME`, 
and switch to there.

    ```bash
    cd ..../somewhere
    mkdir zGME
    cd zGME
    ```

3. Download `zintGenericMarkdownExtender` from `https://github.com/halukbingol/zintGenericMarkdownExtender`.

4. Add the path to the pandoc executable inside `config_constants.py`.

    ```bash
    PANDOC = ".../bin/pandoc"
    ```

5. Then run virtualenv and create a virtual environment.

    ```bash
    pip install virtualenv
    python -m virtualenv venv
    . venv/bin/activate
    ```

6. Now that the virtual environment is running, 
you can install other packages without touching your local python libraries.

    ```bash
    pip install -r requirements.txt
    ```
    You can deactivate the virtual environment by typing `deactivate` in the command line.
	
7. To start `zintGenericMarkdownExtender`
    ```bash
    ./venv/bin/python3.7 main_gui.py
    ```

8. To stop `zintGenericMarkdownExtender` close the window.

