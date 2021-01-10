/**
 *
 *
 *
 * Object `concept` has the following form.
 * ```python
 * concept = {
 *     "id": "aaa",
 *     "name": "bbb",
 *     "path": "ch/sec",
 *     "arrPage": [
 *        "page1.html",
 *        "*CallConceptB"
 *     ]
 * }
 * ```
 *
 * ```javascript
 * stackNode = {
 *     "concept": concept,
 *     "inxArrPage": inxArrPage
 * }
 * ```
 */
class ZintNavigation {

    constructor() {
        this.dicConcept = {}; // dictionary of concepts
        this.arrConcept = []; // array of concepts in presentation order
        this.arrConceptIndex = -1;
        this.conceptCurrent = {}; // current concept
        this.pageCurrentIndex = -1; // page index within "conceptCurrent"
        this.callStack = []; // call stack of [conceptIDCurrent, inxArrPageCurrent] pairs
        this.direction = ZintNavigation.DIRECTION_FORWARD;
        // elements
        this.element_ToC = document.getElementById("navigation-toc");


        // init UI
        // TODO enable/disable
        ZintNavigation.elementDisabled(false, "btnForward");
        ZintNavigation.elementDisabled(true, "btnBackward");
    }

    // TODO is this in use?
    switchContent(concept, indexArrPage) {
        this.pushConcept(concept, indexArrPage);
        this.presentPage(indexArrPage);
    }

    switchContentByToc(conceptID) {
        this.element_ToC.style.display = "none";
        this.pushConcept(this.conceptCurrent, this.pageCurrentIndex);
        this.conceptCurrent = this.getConcept(conceptID);
        this.pageCurrentIndex = ZintNavigation.PAGE_START;
        this.presentPage();
    }


    /**
     * Get the page by processing the concept calls
     */
    getPage() {
        if (this.pageCurrentIndex < 0) {
            // backward from the current concept
            if (this.callStack.length > 0) {
                // pop the
                this.popConcept();
            } else {
                // if stack empty move to the next concept
                this.getConceptBackward();
            }
            this.getPage();
        } else if (this.pageCurrentIndex >= this.conceptCurrent.arrPage.length) {
            // forward from the current concept
            if (this.callStack.length > 0) {
                // pop the
                this.popConcept();
            } else {
                // if stack empty move to the next concept
                this.getConceptForward();
            }
            this.getPage();
        } else {
            //within the current concept
            let strPage = this.conceptCurrent.arrPage[this.pageCurrentIndex];
            let charFirst = strPage.substr(0, 1);
            if (ZintNavigation.CHAR_CALL === charFirst) {
                // concept call
                let conceptID = strPage.substr(1);
                this.pushConcept(this.conceptCurrent, this.pageCurrentIndex);
                this.conceptCurrent = this.getConcept(conceptID);
                this.pageCurrentIndex = ZintNavigation.PAGE_START;
                this.getPage();
            }
        }
    }

    getConcept(conceptID) {
        if (conceptID in this.dicConcept) {
            return this.dicConcept[conceptID];
        } else {
            alert("getConcept: concept " + conceptID + " is not found.");
        }
    }

    presentPage() {
        this.getPage();
        let strPage = this.conceptCurrent.arrPage[this.pageCurrentIndex];
        let pathToPage = this.conceptCurrent.path + '/' + strPage;
        document.getElementById("idPathToContentPage").innerHTML = pathToPage;
        document.getElementById("idFrameContent").src = "../../" + pathToPage;

    }

    btnBackward() {
        this.direction = ZintNavigation.DIRECTION_BACKWARD;
        ZintNavigation.elementDisabled(false, "btnForward");
        this.pageCurrentIndex--;
        this.presentPage();
    }

    btnForward() {
        this.direction = ZintNavigation.DIRECTION_FORWARD;
        ZintNavigation.elementDisabled(false, "btnBackward");
        this.pageCurrentIndex++;
        this.presentPage();
    }

    btnReturn() {
    }

    btnToC() {
        if (this.element_ToC.style.display === "block") {
            this.element_ToC.style.display = "none";
        } else {
            let strTmp = "<div class='navigation-toc-div'>";
            for (let conceptID in this.dicConcept) {
                let concept = this.dicConcept[conceptID];
                // strTmp += "<button class='navigation-toc-button' onclick='this.switchContentByToc("
                strTmp += "<button class='navigation-toc-button' " +
                    "onclick='zintNavigation.switchContentByToc(\""
                    + concept.id + "\")'>"
                    + concept.name
                    + "</button><br>"
            }
            strTmp += "</div>"

            this.element_ToC.innerHTML = strTmp;
            this.element_ToC.style.display = "block";
        }
    }

    /**
     * Push concept and starting page
     * @param conceptCurrent {concept}
     * @param pageCurrentIndex {number}
     */
    pushConcept(conceptCurrent, pageCurrentIndex) {
        let pair = {
            "concept": conceptCurrent,
            "pageStart": pageCurrentIndex
        }
        this.callStack.push(pair);
    }

    popConcept() {
        if (this.callStack.length > 0) {
            // there are
            let pair = this.callStack.pop();
            this.conceptCurrent = pair.concept;
            switch (this.direction) {
                case(ZintNavigation.DIRECTION_FORWARD):
                    this.pageCurrentIndex = pair.pageStart + 1;
                    break;
                case(ZintNavigation.DIRECTION_BACKWARD):
                    this.pageCurrentIndex = pair.pageStart - 1;
                    break;
            }
        } else {
            // empty stack
            alert("popConcept: " + "empty stack");
            // TODO handle that
        }
    }

    /* ******************
    * course structure
    * ****************** */

    addConcept(concept) {
        if (concept.id in this.dicConcept) {
            // TODO check for name collision
            alert("addConcept/ " + "name collision: "
                + "\n  id: " + concept.id
                + "\n  name: " + concept.name
                + "\n  path: " + concept.path
                + "\nis already defined.");
        } else {
            this.dicConcept[concept.id] = concept;
            this.arrConcept.push(concept);
        }
    }

    start() {
        this.arrConceptIndex = 0;
        this.conceptCurrent = this.arrConcept[this.arrConceptIndex];
        this.pageCurrentIndex = ZintNavigation.PAGE_START;
        this.presentPage();
    }

    getConceptForward() {
        this.arrConceptIndex++;
        if (this.arrConceptIndex < this.arrConcept.length) {
            ZintNavigation.elementDisabled(false, "btnBackward");
            this.conceptCurrent = this.arrConcept[this.arrConceptIndex];
            this.pageCurrentIndex = ZintNavigation.PAGE_START;
        } else {
            // roll back
            alert("end of the course");
            ZintNavigation.elementDisabled(true, "btnForward");
            // this.getConceptBackward();
            this.arrConceptIndex--;
            this.pageCurrentIndex--;

        }
    }

    getConceptBackward() {
        this.arrConceptIndex--;
        if (this.arrConceptIndex < 0) {
            alert("beginning of the course");
            ZintNavigation.elementDisabled(true, "btnBackward");
            this.arrConceptIndex++;
            this.pageCurrentIndex++;
        } else {
            ZintNavigation.elementDisabled(false, "btnForward");
            this.conceptCurrent = this.arrConcept[this.arrConceptIndex];
            this.pageCurrentIndex = this.conceptCurrent.arrPage.length - 1;
        }
    }

    static elementDisabled(flag, idElement) {
        // TODO enable/disable
        // source: https://stackoverflow.com/questions/195951/how-can-i-change-an-elements-class-with-javascript
        // document.getElementById("MyElement").classList.add('MyClass');
        // document.getElementById("MyElement").classList.remove('MyClass');
        // if ( document.getElementById("MyElement").classList.contains('MyClass') ) document.getElementById("MyElement").classList.toggle('MyClass');
        let element = document.getElementById(idElement)
        if (flag) {
            element.classList.remove("enabled");
            element.classList.add("disabled");
        } else {
            element.classList.remove("disabled");
            element.classList.add("enabled");
        }
    }

    /**
     * Create concept object.
     * @param id {String} id
     * @param name {String} name for ToC
     * @param path {String} chapterA/section
     * @param arrPage {[]} array of pages or calls to concepts
     * @returns {{}}
     */
    static createConcept(id, name, path, arrPage) {
        let obj = {};
        obj.id = id;
        obj.name = name;
        obj.path = path;
        obj.arrPage = arrPage;
        return obj;
    }

    static CHAR_CALL = "*";
    static PAGE_START = 0; // default start page
    static PATH_NONE = '_/_';

    static DIRECTION_FORWARD = 1;
    static DIRECTION_BACKWARD = -1;

} // ZintNavigation
