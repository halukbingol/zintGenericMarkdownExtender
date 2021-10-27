class ZintMarkdownExtender {

    static zintGetFilesCssJs(arr) {
        let elHead = document.querySelector('head');

        // external libraries
        if (arr.includes("mathjax")) {
            getJs("../../zintBundle/MathJax/tex-svg.js");
        }
        // if (arr.includes("markdown")) {
        //     getCs("../../zintBundle/markdown/markdown.css");
        //     // getJs("../../zintBundle/js/markdown.js");
        // }
        if (arr.includes("prism")) {
            getCs("../../zintBundle/prism/prism.css");
            getJs("../../zintBundle/prism/prism.js");
        }
        if (arr.includes("snapsvg")) {
            getJs("../../zintBundle/SnapSvg/snap.svg-min.js");
        }

        // zint stuff
        if (arr.includes("zintContent")) {
            console.log("zintContent");
            getCs("../../zintBundle/zintContent/zintContent.css");
            getJs("../../zintBundle/zintContent/zintContent.js");
            getJs("../../zintBundle/zintContent/zintContentSnapStepByStepDescription.js");
            getJs("../../zintBundle/zintContent/zintContentSnapUtility.js");
        }


        function getJs(path) {
            let elScript = document.createElement("script");
            elScript.src = path;
            elHead.appendChild(elScript);
        }


        function getCs(path) {
            let elStyle = document.createElement("link");
            elStyle.rel = "stylesheet";
            elStyle.href = path;
            elHead.appendChild(elStyle);
        }
    }


    static setTitle(titleRunning, titleSlide) {
        document.getElementById("idTitleRunning")
            .innerHTML = titleRunning;
        document.getElementById("idTitleSlide")
            .innerHTML = titleSlide;
        document.title = "titleNew";
    }
}

