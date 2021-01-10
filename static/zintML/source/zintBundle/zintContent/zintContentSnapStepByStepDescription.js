/**
 * Step by step description
 *
 * - Board is optional.
 *
 * Requires Snapsvg
 *
 * Usage:
 * -
 */
class ZintContentSnapStepByStepDescription {

    /**
     * Create step by step description
     * @param c_description_item {String} Unique CSS class of description items
     * @param board {Object} Optional board for drawings.
     */
    constructor(c_description_item, board = null) {
        this.snap = Snap;
        // get description steps
        this.indexCurrent = 0;
        this.arrDiv = [];
        // hide all steps except the first
        this.arrDiv = document.getElementsByClassName(c_description_item);
        this.arrDiv[0].style.display = "block";
        for (let i = 1; i < this.arrDiv.length; i++) {
            this.arrDiv[i].style.display = "none";
        }

        // `div` hierarchy
        let divStepByStepDescription = this.arrDiv[0].parentElement;
        let divFlexRow = divStepByStepDescription.parentElement;
        let divStepByStepBlock = divFlexRow.parentElement;

        // navigation
        // create buttons
        this.isForward = true;
        // create divStepByStepNavigation
        let divStepByStepNavigation = document.createElement("div");
        divStepByStepNavigation.classList.add("step-by-step-navigation-div");
        // put divStepByStepNavigation after divFlexRow in divStepByStepBlock
        divStepByStepBlock.appendChild(divStepByStepNavigation);
        // populate divStepByStepNavigation
        // backward
        let btn_backward = document.createElement('button');
        btn_backward.classList.add("step-by-step-navigation-button");
        btn_backward.id = "id_button_backward_" + c_description_item;
        btn_backward.appendChild(document.createTextNode("Backward"));
        btn_backward.addEventListener("click", () => this.backward(), true);
        divStepByStepNavigation.appendChild(btn_backward);
        // repeat
        let btn_repeat = document.createElement('button');
        btn_repeat.classList.add("step-by-step-navigation-button");
        btn_repeat.id = "id_button_repeat_" + c_description_item;
        btn_repeat.appendChild(document.createTextNode("Repeat"));
        btn_repeat.addEventListener("click", () => this.repeat(), true);
        divStepByStepNavigation.appendChild(btn_repeat);
        // forward
        let btn_forward = document.createElement('button');
        btn_repeat.classList.add("step-by-step-navigation-button");
        btn_forward.id = "id_button_forward_" + c_description_item;
        btn_forward.appendChild(document.createTextNode("Forward"));
        btn_forward.addEventListener("click", () => this.forward(), true);
        divStepByStepNavigation.appendChild(btn_forward);


        // board
        this.isBoard = false;
        if (board !== null) {
            this.isBoard = true;
            // create svg element
            let elSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            elSvg.setAttribute("width", "100%");
            elSvg.setAttribute("height", "100%");

            divFlexRow.insertBefore(elSvg, divFlexRow.childNodes[0]);
            // get snap
            this.p = new Snap(elSvg)
                .attr({'viewBox': board.viewBox});
            this.arrSnap = board.arrSnap;
            this.svgBackgroundColor = window.getComputedStyle(elSvg).getPropertyValue("background-color");
        }
    }

    start() {
        if (this.isBoard) {
            this.arrSnap[0]();
        }
    }

    forward() {
        if (this.indexCurrent + 1 < this.arrDiv.length) {
            let indexPresent = this.indexCurrent;
            this.indexCurrent++;
            this.switchDiv(indexPresent, this.indexCurrent);
            if (this.isBoard) {
                this.arrSnap[this.indexCurrent]();
            }
            // direction
            this.isForward = true;
        } else {
            // nop
        }
    }

    backward() {
        if (this.indexCurrent > 0) {
            let indexPresent = this.indexCurrent;
            this.indexCurrent--;
            this.switchDiv(indexPresent, this.indexCurrent);
            if (this.isBoard) {
                // clear board
                this.boardClear();
                // redraw from the start
                this.isForward = false;
                if (this.isBoard) {
                    for (let i = 0; i <= this.indexCurrent; i++) {
                        this.arrSnap[i]();
                    }
                }
            }
            // direction
            this.isForward = true;
        } else {
            // nop
        }
    }

    boardClear() {
        let viewBox = this.p.attr("viewBox");
        this.p.rect(viewBox.x, viewBox.y, viewBox.width, viewBox.height)
            .attr({fill: this.svgBackgroundColor});
    }

    repeat() {
        if (this.isBoard) {
            if (this.indexCurrent === 0) {
                this.boardClear();
                this.start();
            } else {
                this.backward();
                this.forward();
            }
        }
    }

    switchDiv(indexPresent, indexNext) {
        this.arrDiv[indexPresent].style.display = "none";
        this.arrDiv[indexNext].style.display = "block";
    }

    drawAnimated(pathDefinition, attr_specific = ZintContentSnapStepByStepDescription.PEN_DEFAULT) {
        let shape = this.p.path(pathDefinition);
        shape.attr(attr_specific);
        //
        if (this.isForward) {
            let pathLength = this.snap.path.getTotalLength(pathDefinition);
            shape.attr({
                'stroke-dasharray': pathLength + ' ' + pathLength,
                'stroke-dashoffset': pathLength
            }).animate({
                    strokeDashoffset: 0
                }, 3000, mina.easein
            );
        }
    }

    static PEN_DEFAULT = {
        'fill': "none",
        'stroke': "black",
        'stroke-width': "3",
    };

    static PEN_MASTER = {
        'fill': "none",
        'stroke': "#3268d2",
        'stroke-width': "3",
    };

    static PEN_HELPER = {
        'fill': "none",
        'stroke': "red",
        'stroke-width': "1",
        'opacity': "0.3"
    };
}