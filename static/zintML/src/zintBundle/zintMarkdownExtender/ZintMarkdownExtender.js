let arrGetCssJsZintBundle;
let arrGetCssJsLocal;

class ZintMarkdownExtender {

    static getCssJsLocal(arr) {
        if (arr.length === 0) {
            return;
        }
        let elHead = document.querySelector('head');
        for (let i = 0; i < arr.length; i++) {
            let file = arr[i];
            let extension = file.split('.').pop();
            if (extension === "js") {
                ZintMarkdownExtender.getJs(elHead, file);
            } else if (extension === "css") {
                ZintMarkdownExtender.getCs(elHead, file);
            } else {
                console.log("ZintMarkdownExtender.zintGetFilesCssJsLocal: "
                    + "Unknown file extension: " + extension
                );
            }
        }
    }

    static getCssJsZintBundle(arr) {
        if (arr.length === 0) {
            return;
        }
        let elHead = document.querySelector('head');

        // external libraries
        if (arr.includes("markdown")) {
            ZintMarkdownExtender.getCs(elHead, "../../zintBundle/markdown/markdown.css");
            // ZintMarkdownExtender.getJs(elHead,"../../zintBundle/js/markdown.js");
        }
        if (arr.includes("mathjax")) {
            ZintMarkdownExtender.getJs(elHead, "../../zintBundle/MathJax/tex-svg.js");
        }
        if (arr.includes("prism")) {
            ZintMarkdownExtender.getCs(elHead, "../../zintBundle/prism/prism.css");
            ZintMarkdownExtender.getJs(elHead, "../../zintBundle/prism/prism.js");
        }
        if (arr.includes("snapsvg")) {
            ZintMarkdownExtender.getJs(elHead, "../../zintBundle/SnapSvg/snap.svg-min.js");
        }
        if (arr.includes("zintContent")) {
            // zint stuff
            // console.log("zintContent");
            ZintMarkdownExtender.getCs(elHead, "../../zintBundle/zintContent/zintContent.css");
            ZintMarkdownExtender.getJs(elHead, "../../zintBundle/zintContent/zintContent.js");
            ZintMarkdownExtender.getJs(elHead, "../../zintBundle/zintContent/zintContentSnapStepByStepDescription.js");
            ZintMarkdownExtender.getJs(elHead, "../../zintBundle/zintContent/zintContentSnapUtility.js");
        }
        if (arr.includes("zintLib")) {
            // zint stuff
            // console.log("zintLib");
            ZintMarkdownExtender.getJs(elHead, "../../zintBundle/zintLib/zintLib.js");
        }
    }

    static getJs(el, path) {
        let elScript = document.createElement("script");
        elScript.src = path;
        el.appendChild(elScript);
    }


    static getCs(el, path) {
        let elStyle = document.createElement("link");
        elStyle.rel = "stylesheet";
        elStyle.href = path;
        el.appendChild(elStyle);
    }


    static setTitle(titleRunning, titleSlide) {
        document.getElementById("idTitleRunning")
            .innerHTML = titleRunning;
        document.getElementById("idTitleSlide")
            .innerHTML = titleSlide;
        document.title = titleSlide + " | " + titleRunning + " | 01pi.com";
    }

    static zint_show_hide(el) {
        let elActive = event.target;
        let elNext = elActive.nextElementSibling;
        elNext.classList.toggle("zint-content-hidden");
    }

    static init() {
        ZintMarkdownExtender.getCssJsZintBundle(arrGetCssJsZintBundle);
        ZintMarkdownExtender.getCssJsLocal(arrGetCssJsLocal);
    }

}

