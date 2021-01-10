class Latex2svg {
    /**
     * Constructs LaTeX to SVG engine
     * @param elementID {string} ID of svg element
     * @param flagDisplay {boolean} true for display, false for inline LateX
     */
    constructor(elementID = undefined, flagDisplay = false) {
        this.elementID = elementID;
        this.optionsDefault = {
            display: flagDisplay,
            containerWidth: -2,
            em: 16,
            ex: 8,
            lineWidth: 1000000,
            scale: 1.1312217194570136
        };
        if (this.elementID === undefined) {
            //     nop
        } else {
            // get MathJax metrics from environment
            MathJax.texReset();
            this.element = document.getElementById(elementID);
            this.options = MathJax.getMetricsFor(this.element);
            this.options.display = flagDisplay;
        }
    }

    /**
     *
     * @param strLatex {string} LateX expression
     * @param options
     * @param successCallback
     * @param failureCallback
     * @param handleError
     * @returns {Promise<unknown>}
     */
    latex2svgString(strLatex,
                    // options = this.optionsDefault,
                    successCallback = this.successCallback,
                    failureCallback = this.failureCallback,
                    handleError = this.handleError) {
        return new Promise(
            (resolve, reject) => {
                let wrapper = MathJax.tex2svg(strLatex, this.options);
                let mjOut = wrapper.getElementsByTagName("svg")[0];
                // resolve([this, mjOut.outerHTML]);
                let arr = [this, mjOut.outerHTML];
                resolve(arr);
            }
        )
            .then(successCallback, failureCallback)
            .catch(handleError);
    }

    // successCallback([that, svg]) {
    successCallback(arr) {
        let that = arr[0];
        let svg = arr[1];
        console.log("successCallback");
        if (that.elementID === undefined) {
            return svg;
        } else {
            // document.getElementById(this.elementID).innerHTML = svg;
            // const element = document.getElementById(this.elementID);
            // element.innerHTML = svg;
            that.element.innerHTML = svg;
        }
    }

    failureCallback([that, svg]) {
        console.log("failureCallback");
    }

    handleError([that, svg]) {
        console.log("handleError");
    }

} // class latex2svg
