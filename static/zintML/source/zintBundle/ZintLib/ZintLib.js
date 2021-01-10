// ********************************************************** version
// ZintLib.js
// created at 2020-11-18T11-30-53
// **********************************************************
"use strict";
let zintParameter;
let zintObject;




// **********************************************************
/**
 * ZintApplet is base of all standstill drawqble objects.
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */
class ZintApplet {

    /**
     *
     * @param svgID
     */
    constructor(svgID) {
        this.paper = Snap(svgID);
        this.colorBackground = ZintApplet.COLOR_BACKGROUND_DEFAULT;
        this.arrDrawable = [];
    }

    init() {
        // default origin
        ZintCor.setOriginXp(ZintCor.ORIGIN_XP_DEFAULT);
        ZintCor.setOriginYp(ZintCor.ORIGIN_YP_DEFAULT);
    }

    /**
     * Reads parameters from html file.
     *
     *  ZintParameter = {
     *      "origin": "originXP|OriginYP",
     *      "bgColor": "rgba(200,200,200,1)",
     *  }
     */
    initParam() {
        let strParam;
        let strArr;

        //
        strParam = this.getParameter("bounds");
        if (strParam !== undefined) {
            strArr = strParam.split(ZintCommon.SEPARATOR);
            let x = parseInt(strArr[0], 10);
            let y = parseInt(strArr[1], 10);
            let width = parseInt(strArr[2], 10);
            let height = parseInt(strArr[3], 10);
            this.bounds = {
                "x": x,
                "y": y,
                "width": width,
                "height": height
            };
            let strTmp = x + " " + y + " " + width + " " + height;
            this.paper.attr({viewBox: strTmp});
        }

        // Sets the origin
        strParam = this.getParameter("origin");
        if (strParam !== undefined) {
            strArr = strParam.split(ZintCommon.SEPARATOR);
            ZintCor.setOriginXp(parseInt(strArr[0], 10));
            ZintCor.setOriginYp(parseInt(strArr[1], 10));
        }

        // background color
        strParam = this.getParameter("bgColor");
        if (strParam !== undefined) {
            this.colorBackground = strParam;
        }
    }

    update(deltaTime) {
        // nop
    }

    draw(paper = this.paper) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
        paper.rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height)
            .attr({
                fill: this.colorBackground,
                'opacity': 1
            });
        for (let i = 0; i < this.arrDrawable.length; i++) {
            this.arrDrawable[i].draw(paper);
        }
    }


    getParameter(paramName) {
        return ZintCommon.getParameter(paramName);
    }

    static get COLOR_BACKGROUND_DEFAULT() {
        // "rgba(200,10,10,1)";
        return "rgb(227,167,45)";
    }
} // ZintApplet



// **********************************************************
class ZintAppletThread extends ZintApplet {

    // TODO migrate from canvasID to svgID
    constructor(canvasID) {
        super(canvasID);
        this.timeLast = 0;
        this.animator = 0;

        this.gameLoop =
            (timeNow) => {
                // get time difference
                if (this.timeLast === undefined) {
                    this.lastTime = timeNow;
                }
                const timeDelta = timeNow - this.timeLast;
                this.lastTime = timeNow;

                // update
                this.update(timeDelta);

                // clear previous drawings and draw present
                // see: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
                this.ctx.clearRect(this.bound.x, this.bound.y, this.bound.width, this.bound.height);
                this.ctx.beginPath();

                this.draw(this.ctx);

                // set for the next turn
                this.animator = window.requestAnimationFrame(this.gameLoop);
            }
    }

    pause(delay) {

    }

    run() {

    }

    start() {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
        this.timeLast = 0;
        this.animator = window.requestAnimationFrame(this.gameLoop);
    }

    stop() {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
        if (this.animator !== 0) {
            window.cancelAnimationFrame(this.animator);
        }
    }
}



// **********************************************************
// ~~~~~~~~~~~~~~~~~~~~~
// ZintCommon.js
//

// when       who what
// 2020-06-09 HB init

/**
 * Common constants
 */
class ZintCommon {

    static notImplemented(str) {
        console.log("NOT IMPLEMENTED" + str);
    }

    /**
     * Gets parameter from html file.
     *
     * @param paramID {string} parameter name
     * @returns {*} parameter value
     */
    static getParameter(paramID) {
        return zintParameter[paramID];
    }

    /**
     * Converts string to string of rgb color
     * @param str {string} 6 char string representing rgb color.
     *
     * Accepts:
     * - rrggbb
     * - #rrggbb
     * - rgb(rrr,ggg,bbb)
     */
    static getColor(str) {
        if (str.length === 7 && str.charAt(0) === "#") {
            // "#rrggbb"
            return str;
        } else if (str.substr(0, 3) === "rgb") {
            // "rgb(rrr,ggg,bbb)"
            return str;
        } else if (str.length === 6) {
            // "rrggbb"
            return "#" + str;
        } else {
            console.log("***ERROR*** ZintCommon.getColor:" + str);
        }
        return "red";
        // possible: https://www.phpied.com/files/rgbcolor/rgbcolor.js
    }

    /**
     * Sets configuration flag according to mask.
     *
     * @param config {number} Binary coded configuration.
     * @param mask {number} Binary coded mask in binary, 0bxxx, form.
     * @returns {boolean} Binary value of the flag.
     */
    static setFlag(config, mask) {
        return (config & mask) === mask;
    }

    static get VERSION() {
        return "1.0";
    }

    // For unicode symbols see:
    // http://www.fileformat.info/info/unicode/block/geometric_shapes/images.htm
    static get SEPARATOR() {
        // return "|";
        return '\u25B2'; // BLACK UP-POINTING TRIANGLE
    }

    static get SEPARATOR_SUB() {
        // return ",";
        return '\u25B3'; // WHITE UP-POINTING TRIANGLE
    }

    static get SEPARATORA() {
        // return "\\";
        return '\u25C6'; // BLACK DIAMOND
    }

    static get SEPARATORB() {
        // return "#";
        return '\u25C7'; // WHITE DIAMOND
    }

    static get SEPARATOR_SUBA() {
        // return "^";
        return '\u25CF'; // BLACK CIRCLE
    }

    static get SEPARATOR_SUBB() {
        // return "@";
        return '\u25CB'; // WHITE CIRCLE
    }

    static get COLOR_BLACK() {
        return "#000000";
    }
}



// **********************************************************
class ZintMathML {

    constructor(x, y, strLatex) {
        this.strLatex = strLatex;
        this.x = x;
        this.y = y;
    }

    /**
     * Draw on context.
     * @param paper {paper} Snap paper.
     */
    draw(paper) {
        // TODO color
        // paper.attr({
        //     "stroke": "#pink"
        // });
        new ZintLatex2Svg(paper, this.x, this.y, this.strLatex, true);
    }

    /** Set color
     *
     * @param color {String} color of equation.
     */
    setColor(color) {
        // TODO MathJax color setting is not working yet.
        let zintColor = ZintCommon.getColor(color);
    }

    get getWidth() {
        // TODO equation with
        // https://stackoverflow.com/questions/13567456/display-size-width-adjustment
        return 100;
    }

    get getHeight() {
        // TODO equation height
        // https://stackoverflow.com/questions/13567456/display-size-width-adjustment
    }

} // class ZintMathML



// **********************************************************
// =====================
// ZintAnalytic.js
//

// when       who what
// 2020-06-01 HB init

/**
 * General utility for analytic geometry
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */
class ZintAnalytic {

    // constructor() {
    //     this.WHERE = Object.freeze({
    //         IN: Symbol("in"),
    //         OUT: Symbol("out"),
    //         ON: Symbol("on")
    //     });
    // }

    // static get SET_CONTAINS() {
    //     return 1;
    // }
    //
    // static get SET_CONTAINS_NOT() {
    //     return 0;
    // }

    // static get SIDE_IN() {
    //     // return this.WHERE.IN;
    //     return 10;
    // }
    //
    // static get SIDE_OUT() {
    //     return -10;
    // }
}



// **********************************************************
// =====================
// ZintCircle.js
//

// when       who what
// 2020-06-01 HB init

/**
 * Circle in analytic geometry
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */
class ZintCircle {
    /*
     * (x, y): center
     * r: radius
     */
    /**
     * Circle in analytic geometry
     * @param {number} x `x` of the center
     * @param {number} y `y` of the center
     * @param {number} r Radius.
     */
    constructor(x = 0, y = 0, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    clone() {
        return new ZintCircle(this.x, this.y, this.r);
    }

    /**
     *
     * @param {Z01piPoint} pointA Center of the circle
     * @param {Z01piPoint} pointB The point that the circle passes.
     */
    static circleCenteredAPassingB(pointA, pointB){
        let r = pointA.distancePoint(pointB);
        return new ZintCircle(pointA.x, pointA.y, r);
    }

    isOn(pointA) {
        // where is point
        let delX = this.x - pointA.x;
        let delY = this.y - pointA.y;
        let distanceSquared = delX * delX + delY * delY;
        let rSquared = this.r * this.r;
        if (distanceSquared === rSquared) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns true if the point is inside.
     * @param {Z01piPoint} pointA.
     * @returns {boolean}.
     */
    isInside(pointA) {
        let delX = this.x - pointA.x;
        let delY = this.y - pointA.y;
        let distanceSquared = delX * delX + delY * delY;
        let rSquared = this.r * this.r;
        // TODO How do you compare with EPSILON?
        if (distanceSquared < rSquared) {
            return true;
        } else {
            return false;
        }
    }

    center() {
        // returns the center as a point
        return new ZintPoint(this.x, this.y);
    }

    area() {
        return Math.PI * this.r * this.r;
    }

    equals(circleA) {
        return ZintMath.isEqual(this.x, circleA.x)
            && ZintMath.isEqual(this.y, circleA.y)
            && ZintMath.isEqual(this.r, circleA.r);
    }

    toString() {
        return "[c"
            + " x:" + this.x
            + ", y:" + this.y
            + ", r:" + this.r
            + "]";
    }
}



// **********************************************************
/**
 * Line in analytic geometry.
 *
 * The line represented by `ax + by + c = 0`.
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */
class ZintLine {
    /**
     * Constructs a line represented by `ax + by + c = 0`.
     * @param {number} a
     * @param {number} b
     * @param {number} c
     */
    constructor(a = -1, b = 1, c = 0) {
        this._a = a;
        this._b = b;
        this._c = c;
    }

    /**
     * The line passing `pointA` and `pointB`.
     * @param {ZintPoint } pointA.
     * @param {ZintPoint} pointB.
     * @returns {ZintLine} The line.
     */
    linePassingAB(pointA, pointB) {
        if (pointA.x === pointB.x) {
            return new ZintLine(1, 0, pointA.x);
        } else {
            let m = (pointA.y - pointB.y) / (pointA.x - pointB.x);
            return new ZintLine(m, -1, pointA.y - m * pointA.x);
        }
    }

    /**
     * The line passing `pointA` and perpendicular to the line.
     * @param {ZintPoint} pointA.
     * @returns {ZintLine} The line.
     */
    linePassingPointPerpendicular(pointA) {
        // let slope = this.slopePerpendicular();
        if (pointA.x === pointB.x) {
            return new ZintLine(1, 0, pointA.x);
        } else {
            let m = (pointA.y - pointB.y) / (pointA.x - pointB.x);
            return new ZintLine(m, -1, pointA.y - m * pointA.x);
        }
    }

    /**
     * The line passing through the point with the slope.
     * @param {ZintPoint} pointA.
     * @param {number} slope.
     * @returns {ZintLine}.
     */
    static linePassingPointWithSlope(pointA, slope) {
        if (slope === ZintLine.SLOPE_INFINITY) {
            return new ZintLine(1, 0, pointA.x);
        } else {
            return new ZintLine(-slope, 1, slope * (pointA.x - pointA.y));
        }
    }

    /**
     * The slope of a perpendicular line to the line.
     * @returns {number}
     */
    slopePerpendicular() {
        let slope = this.slope();
        if (slope === 0) {
            slope = ZintLine.SLOPE_INFINITY;
        } else if (slope === ZintLine.SLOPE_INFINITY) {
            slope = 0;
        } else {
            slope = -1 / slope;
        }
        return slope;
    }


    /**
     *
     * @param {ZintLine} lineA
     * @returns {boolean}
     */
    isPerpendicular(lineA) {
        ZintCommon.notImplemented("ZintLine.isPerpendicular");
        return false;
    }

    isParallel(lineA) {
        ZintCommon.notImplemented("ZintLine.isParallel" + lineA);
        return false;
    }

    perpendicularAt(pointA) {
        ZintCommon.notImplemented("ZintLine.perpendicularAt" + pointA);
        return new ZintLine(0, 0, 0);
    }

    parallelAt(pointA) {
        ZintCommon.notImplemented("ZintLine.parallelAt" + pointA);
        return new ZintLine(0, 0, 0);
    }

    /**
     * The slope of the line.
     * @returns {number} The slope.
     */
    slope() {
        if (this._b === 0) {
            return ZintLine.SLOPE_INFINITY;
        } else {
            return -this._a / this._b;
        }
    }

    distanceToPoint(pointA) {
        let d = this._a * pointA.x + this._b * pointA.y + this._c;
        let n = this._a * this._a + this._b * this._b;
        return Math.abs(d / Math.sqrt(n));
    }

    /**
     * Is point on the line?
     * @param {ZintPoint} pointA.
     * @returns {boolean}
     */
    isOn(pointA) {
        let d = this._a * pointA.x + this._b * pointA.y + this._c;
        return ZintMath.isEqual(d, 0);
    }

    equals(lineA) {
        let a = this._a / lineA._a;
        return ZintMath.isEqual(a, this._b / lineA._b) && ZintMath.isEqual(a, this._c / lineA._c);
    }

    toString() {
        return "[c"
            + " a:" + this._a
            + ", b:" + this._b
            + ", c:" + this._c
            + "]";
    }


    static get SLOPE_INFINITY() {
        return Number.MAX_VALUE;
    }

    static get PARALLEL() {
        return 180;
    }

    static get PERPENDICULAR() {
        return 90;
    }

} // ZintLine




// **********************************************************
// =====================
// ZintLineSegment.js
//
// 2020-06-01 HB init

/**
 * Line segment in analytic geometry.
 *
 * The line represented by `ax + by + c = 0`.
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */
class ZintLineSegment extends ZintLine {

    /**
     *
     * @param {Z01piPoint} pointA
     * @param {Z01piPoint} pointB
     */
    constructor(pointA, pointB) {
        super(0, 0, 0);
        this.pointA = pointA;
        this.pointB = pointB;
        if (pointA.x === pointB.x) {
            this.line = new ZintLine(1, 0, pointA.x);
        } else {
            let slope = (pointB.y - pointA.y) / (pointB.x - pointA.x);
            this.line = new ZintLine(-slope, 1, slope - pointA.y);
        }
    }

    /**
     * Is point on the line segment?
     * @param {Z01piPoint} pointA.
     * @returns {boolean}
     */
    isOn(pointA) {
        if (this.line.isOn(pointA)) {
            let minX = Math.min(this.pointA.x, this.pointB.x);
            let maxX = Math.max(this.pointA.x, this.pointB.x);
            let minY = Math.min(this.pointA.y, this.pointB.y);
            let maxY = Math.max(this.pointA.y, this.pointB.y);
            if ((minX <= pointA.x && pointA.x <= maxX) && (minY <= pointA.y && pointA.y <= maxY)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}



// **********************************************************
// =====================
// ZintMath.js
//

// when       who what
// 2020-06-01 HB init

/**
 * General math utilities.
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */

class ZintMath {

    /**
     * Float equal
     * @param {number} numberA.
     * @param {number} numberB.
     * @returns {boolean} true if `numberA` is equal to `numberB` within `EPSILON` range.
     */
    static isEqual(numberA, numberB) {
        return Math.abs(numberA - numberB) < ZintMath.EPSILON;
    }

    /**
     * Very small number.
     * @returns {number}.
     */
    static get EPSILON() {
        return 1e-15;
    }

}



// **********************************************************
// ~~~~~~~~~~~~~~~~~~~~~
// ZintPoint.js
//

// when       who what
// 2020-06-01 HB init

/**
 * Point in analytic geometry
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */
class ZintPoint {
    /**
     * @constructor
     * @param {number} x `x` coordinate of the point.
     * @param {number} y `y` coordinate of the point.
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * clone of the point
     * @returns {ZintPoint} - A clone of the point.
     */
    clone() {
        return new ZintPoint(this.x, this.y);
    }

    /**
     * vector addition of the point to `pointA`
     * @param {ZintPoint} pointA Point to be added.
     * @returns {ZintPoint} pointR New point sum of the two.
     */
    add(pointA) {
        // vector addition
        let pA = this.clone();
        pA.x = pA.x + pointA.x;
        pA.y = pA.y + pointA.y;
        return pA;
    }

    /**
     * Distance from the point to `pointA`.
     * @param {ZintPoint} pointA.
     * @returns {number} The distance.
     */
    distancePoint(pointA) {
        let delX = (this.x - pointA.x);
        let delY = (this.y - pointA.y);
        return Math.sqrt(delX * delX + delY * delY);
    }

    /**
     * The midpoint between the point and `pointA`.
     * @param {ZintPoint} pointA.
     * @returns {ZintPoint} New point.
     */
    getMidPoint(pointA) {
        return new ZintPoint((this.x + pointA.x) / 2, (this.y + pointA.y) / 2);
    }

    equals(pointA) {
        return ZintMath.isEqual(this.x, pointA.x)
            && ZintMath.isEqual(this.y, pointA.y);
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }

    /**
     * The origin
     * @returns {ZintPoint}
     */
    // TODO This implementation results multiple copy of the origin. Is it possible to have one copy of the origin?
    static get ORIGIN() {
        return new ZintPoint(0, 0);
    }

} // ZintPoint




// **********************************************************
// ~~~~~~~~~~~~~~~~~~~~~
// ZintTriangle.js
//

// when       who what
// 2020-06-01 HB init

/**
 * Triangle in analytic geometry
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */
class ZintTriangle {
    /**
     * @constructor
     * @param {Z01piPoint} pointA The point A.
     * @param {Z01piPoint} pointB The point B.
     * @param {Z01piPoint} pointC The point C.
     */
    constructor(pointA, pointB, pointC) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.pointC = pointC;
    }

    pointUpperLeft(){

    }
}



// **********************************************************
/*
 * A class representing a <B>drawing point</B> in Java Applet coordinates.<br>
 * It has two public variables. integer x, y are intentionally public in order
 * to simplify code.<br>
 */
/**
 * Handles analytic and graphic coordinates.
 *
 * The rules are
 * `xg = originXg + x` and
 * `yg = originYg - y`
 * where
 * - `x`, `y` are in analytic coordinates
 * - `xg`, `yg` are in graphics coordinates
 * - `(originXg, originXg)` is the origin in graphics coordinates.
 */
class ZintCor {

    /**
     *
     * @param x {number} x in analytic coordinates
     * @param y {number} y in analytic coordinates
     */
    constructor(x, y) {
        this.xg = this.x2xg(x);
        this.yg = this.y2yg(x);
    }

    x2xg(x) {
        return ZintCor.originXg + x;
    }

    xg2x(xg) {
        return xg - ZintCor.originXg;
    }

    y2yg(y) {
        return ZintCor.originYg - y;
    }

    yg2y(yg) {
        return ZintCor.originYg - yg;
    }

    // origin functions

    static get ORIGIN_XP_DEFAULT() {
        return 100;
    }

    static get ORIGIN_YP_DEFAULT() {
        return 200;
    }

    static originXg = ZintCor.ORIGIN_XP_DEFAULT; // default 100
    static originYg = ZintCor.ORIGIN_YP_DEFAULT; // default 200

    static setOriginXp(xp) {
        ZintCor.originXg = xp;
    }

    static setOriginYp(yp) {
        ZintCor.originYg = yp;
    }
}



// **********************************************************
/**
 * Generic Drawable Object
 */
class ZintObjectD {

    constructor(bounds) {
        this.bounds = bounds;
    }

    /**
     *
     * @param x {number} x in graph coordinates
     * @param y {number} y in graph coordinates
     * @param width {number} width in graph coordinates
     * @param height {number} height in graph coordinates
     */
    setBounds(bounds) {
        this.bounds = {
            'x': bounds.x,
            'y': bounds.y,
            'width': bounds.width,
            'height': bounds.height,
        };
    }

    setLocation(x, y) {
        this.setBounds(x, y, this.bounds.width, this.bounds.height);
    }

    /**
     * Draws on context.
     * @param paper {paper} Snap paper.
     * @param kvAttr {kvAttr} attributes as key-value pairs.
     */
    draw(paper) {
        paper.rect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height)
            .attr(kvAttr);
    }

    /**
     * Draws a line between pointA (x1, y1) and pointB (x2, y2).
     * @param paper {paper} Snap paper.
     * @param x1 {number} x coordinate of pointA.
     * @param y1 {number} y coordinate of pointA.
     * @param x2 {number} x coordinate of pointB.
     * @param y2 {number} y coordinate of pointB.
     * @param kvAttr {kvAttr} attributes as key-value pairs.
     */
    static drawLine(paper, x1, y1, x2, y2, kvAttr) {
        paper.line(x1, y1, x2, y2)
            .attr(kvAttr);
        // ctx.beginPath();
        // ctx.moveTo(x1, y1);
        // ctx.lineTo(x2, y2);
        // ctx.stroke();
    }

} // ZintObjectD



// **********************************************************
/**
 * Number line in math.
 *
 * Note that it is always horizontal
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */
class ZintNumberLine extends ZintApplet {

    constructor(svgID) {
        super(svgID);
    }

    init() {
        super.init();
        // this.arrLine = [];
        this.initParam();
        this.draw();
    }

    initParam() {
        super.initParam();
        this.initParamConfigLine();
        this.initParamConfigPoints();
        this.initParamConfigArcs();
    }

    /**
     * Process the configLine parameters
     * format:
     *    "configLine": "x,y,width,pointNO,lineColor,pointColor"
     *    - `(x,y)`: Screen coordinates of where the line starts.<br>
     *    - width: Width of the line.<br>
     *    - pointNO: Number of points on the number line.<br>
     *    - lineColor,pointColor: Color codes (hex) of the line and of the points.
     *
     */
    initParamConfigLine() {
        let strParam;
        let arrStr;
        // let strParamSub;
        // let arrStrSub;

        strParam = this.getParameter("configLine");
        if (strParam === undefined) {
            console.log('**ERROR** ZintNumberLine.initParamConfigLine');
        } else {
            arrStr = strParam.split(ZintCommon.SEPARATOR);
            let k = 0;
            this.x = parseInt(arrStr[k++]);
            this.y = parseInt(arrStr[k++]);
            this.width = parseInt(arrStr[k++]);
            this.colorLine = ZintCommon.getColor(arrStr[k++]);
        }
    }

    /**
     * Process configPoints
     *
     * format:
     *   "pointNO
     *    |pointNum,dx,dy,latex,color
     *    [|pointNum,dx,dy,latex,color]"
     *
     *   - `pointNO`: number of points
     *   - `pointNum`: index of point in {0, ..., `pointNO`-1} range.
     *   - `dx`: displacement from point in `x`.
     *   - `dy`: displacement from point in `y`.
     *   - `latex`: latex string.
     *   - `color`: color.
     */
    initParamConfigPoints() {
        let strParam;
        let arrStr;
        let strParamSub;
        let arrStrSub;
        //
        let pointno;
        let dx, dy;
        let strLatex;
        let colorPoint;
        let equation;

        strParam = this.getParameter("configPoints");
        if (strParam === undefined) {
            console.log('**ERROR** ZintNumberLine.initParamConfigString');
        } else {
            arrStr = strParam.split(ZintCommon.SEPARATOR);
            strParamSub = arrStr[0];
            arrStrSub = strParamSub.split(ZintCommon.SEPARATOR_SUB);

            // number of points
            this.pointNO = parseInt(arrStrSub[0]);
            let stepWidth = this.width / (this.pointNO + 1);
            this.xpPoint = [];
            for (let i = 0; i < this.pointNO; i++) {
                this.xpPoint[i] = this.x + (i + 1) * stepWidth;
            }
            // default color for points
            this.colorPointDefault = ZintCommon.getColor(arrStrSub[1]);


            // points
            for (let i = 1; i < arrStr.length; i++) {
                strParamSub = arrStr[i];
                arrStrSub = strParamSub.split(ZintCommon.SEPARATOR_SUB);
                let k = 0;
                pointno = parseInt(arrStrSub[k++]);
                dx = parseInt(arrStrSub[k++]);
                console.log("dx:", dx);
                dy = parseInt(arrStrSub[k++]);
                strLatex = arrStrSub[k++];
                if (k === arrStrSub.length - 1) {
                    colorPoint = ZintCommon.getColor(arrStrSub[k++]);
                } else {
                    colorPoint = this.colorPointDefault;
                }
                // TODO use MathJax width and height to position equation
                equation = new ZintMathML(this.xpPoint[pointno] + dx, this.y + dy, strLatex);
                equation.setColor(colorPoint);
                this.arrDrawable.push(equation);
            }
        }
    }

    /**
     * Process configArcs
     *
     * format:
     *   "config
     *   ^pointNumA^pointNumB
     *   ^controlAx^controlAy
     *   ^controlBx^controlBy
     *
     *   value^style(PLAIN/BOLD/ITALIC)^position(1:up/0:down)[^color]"
     *   "pointno^latex^isUp[^color]
     *   |pointno^latex^isUp[^color]"
     *   - pointno: in {0, ..., n-1} range.
     *   - latex: latex string.
     *   - isUp: 1:up; 0:down.
     *   - color: color.
     *
     * example:
     *   "0^0^1^0|10^1^1^0|20^2^1^0
     *   |14^<fra>14/10</fra>^1^0^FF0000"
     */
    initParamConfigArcs() {
        this.arrArc = [];
        //
        let strParam;
        let arrStr;
        let strParamSub;
        let arrStrSub;
        //
        let json;
        strParam = this.getParameter("configArcs");
        if (strParam === undefined) {
            console.log('**ERROR** ZintNumberLine.initParamConfigArcs');
        } else {
            arrStr = strParam.split(ZintCommon.SEPARATOR);
            // Arcs
            for (let i = 0; i < arrStr.length; i++) {
                strParamSub = arrStr[i];
                arrStrSub = strParamSub.split(ZintCommon.SEPARATOR_SUB);
                let k = 0;
                json = {
                    "config": parseInt(arrStrSub[k++]),
                    "pointNumA": parseInt(arrStrSub[k++]),
                    "pointNumB": parseInt(arrStrSub[k++]),
                    "controlAx": parseInt(arrStrSub[k++]),
                    "controlAy": parseInt(arrStrSub[k++]),
                    "controlBx": parseInt(arrStrSub[k++]),
                    "controlBy": parseInt(arrStrSub[k++]),
                    "color": ZintCommon.getColor(arrStrSub[k++])
                }
                this.arrArc.push(json);
            }
        }
    }

    draw(paper = this.paper) {
        super.draw(paper);
        this.drawLine(paper);
        this.drawArc(paper);
    }

    drawLine(paper) {
        // line
        // TODO unused local variable: tmp
        let tmp = paper.line(this.x, this.y, this.x + this.width, this.y)
            .attr({
                "stroke": this.colorLine,
                "stroke-width": "5",
                "stroke-linecap": "round",
                "stroke-opacity": "0.5",
            });
        // direction arrow
        let d = 20;
        let xRight = this.x + this.width + d;
        // TODO unused local variable: direction
        let direction = paper.polygon(
            xRight, this.y,
            xRight - d, this.y - d,
            xRight - d, this.y + d
        )
            .attr({
                // "stroke": this.colorLine,
                "stroke": "none",
                "stroke-width": "5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-opacity": "0.5",
                "fill": this.colorLine,
                "fill-opacity": "0.5"
            });
        //    points
        for (let i = 0; i < this.pointNO; i++) {
            paper.circle(this.xpPoint[i], this.y, 6)
                .attr({
                    "stroke": this.colorLine,
                    "stroke-opacity": "0.5",
                    "fill": this.colorLine,
                    "fill-opacity": "0.5"
                });
        }
    }

    drawArc(paper) {
        let json;
        let config;
        let pathString;
        let pAx, pAy;
        let pBx, pBy;
        let pCAx, pCAy;
        let pCBx, pCBy;
        let flgArrowAtA, flgArrowAtB;
        let strDashArray = "none";
        // let g = paper.group();
        for (let i = 0; i < this.arrArc.length; i++) {
            json = this.arrArc[i];
            config = json.config;

            // TODO config management with attr
            pAx = this.xpPoint[json.pointNumA];
            pAy = this.y;
            pBx = this.xpPoint[json.pointNumB];
            pBy = this.y;
            pCAx = pAx + json.controlAx;
            pCAy = pAy + json.controlAy;
            pCBx = pBx + json.controlBx;
            pCBy = pBy + json.controlBy;
            pathString = "M";
            pathString += " " + pAx + " " + pAy;
            pathString += " " + "C";
            pathString += " " + pCAx + " " + pCAy;
            pathString += "," + pCBx + " " + pCBy;
            pathString += "," + pBx + " " + pBy;
            // dash array
            if (ZintCommon.setFlag(config, ZintNumberLine.CONFIG_DASHARRAY_A)) {
                strDashArray = "4 1";
            } else if (ZintCommon.setFlag(config, ZintNumberLine.CONFIG_DASHARRAY_B)) {
                strDashArray = "6 1";
            }

            let path = paper.path(pathString)
                .attr({
                    "stroke": json.color,
                    "stroke-width": "2",
                    "stroke-dasharray": strDashArray,
                    "fill": "none"
                });
            let group = paper.group();
            group.add(path);
            // arrow heads
            let arrowHead;
            flgArrowAtA = ZintCommon.setFlag(config, ZintNumberLine.CONFIG_ARROW_AT_A);
            flgArrowAtB = ZintCommon.setFlag(config, ZintNumberLine.CONFIG_ARROW_AT_B);
            if (flgArrowAtA) {
                arrowHead = this.drawArcArrowHead(paper,
                    pAx, pAy,
                    pCAy,
                    json.color
                );
                group.add(arrowHead);
            }
            if (flgArrowAtB) {
                arrowHead = this.drawArcArrowHead(paper,
                    pBx, pBy,
                    pCBy,
                    json.color
                );
                group.add(arrowHead);
            }
        }
    }

    drawArcArrowHead(paper, px, py, cy, color) {
        let dx = 1;
        let dy = dx + dx + dx;
        let yPM;
        if (cy - py > 0) {
            yPM = py + dy;  // down
        } else {
            yPM = py - dy;  // up
        }
        // TODO redundant local variable: arrowHead
        let arrowHead = paper.polygon(
            px, py,
            px - dx, yPM,
            px + dx, yPM
        )
            .attr({
                "stroke": color,
                "stroke-width": "5",
                "stroke-linejoin": "miter",
                "fill": color
            });
        return arrowHead;
    }

    static get CONFIG_ARROW_AT_A() {
        return 0x1;
    }

    static get CONFIG_ARROW_AT_B() {
        return 0x2;
    }

    static get CONFIG_DASHARRAY_A() {
        return 0x4;
    }

    static get CONFIG_DASHARRAY_B() {
        return 0x8;
    }

} // ZintNumberLine



// **********************************************************
/**
 * Generic fraction
 */
class ZintRatioGeneric extends ZintApplet {

    constructor(svgID) {
        super(svgID);
        // this.rectangle = [];
        // this.circle = [];
        // this.equation = [];
    }

    init() {
        super.init();
        // this.rectangle = [];
        // this.circle = [];
        // this.equation = [];
        this.initParam();
        this.draw();
    }

    initParam() {
        super.initParam();
        this.initParamConfigRatio();
        this.initParamConfigString();
    }


    /**
     * Get ratio parameters.
     *
     * configRatio =
     * Circle,config,a,b,xp,yp,width,height[,colorStroke,colorFill]|
     * Rect,config,a,b,xp,yp,width,height[,colNumOf,rowNumOf][,colorStroke,colorFill][,fillOrder]|...
     */
    initParamConfigRatio() {
        let strParam;
        let arrStr;
        let strParamSub;
        let arrStrSub;
        //
        let strRatioType;
        let config;
        let a;
        let b;
        let bounds;
        let flgRectDimension;
        let flgRectColor;
        let flgRectFillOrder;
        let flgRectFillColors;
        let colNumOf;
        let rowNumOf;
        let colorStroke;
        let colorFill;
        let fillOrder;
        let fillColors;
        let ratioRect;
        // let latex;

        strParam = this.getParameter("configRatio");
        if (strParam === undefined) {
            console.log('**ERROR** ZintRatioGeneric.initParam: configRatio');
        } else {
            // st = new StringTokenizer(strParam, ZintCommon.SEPARATOR);
            arrStr = strParam.split(ZintCommon.SEPARATOR);
            for (let i = 0; i < arrStr.length; i++) {
                strParamSub = arrStr[i];
                arrStrSub = strParamSub.split(ZintCommon.SEPARATOR_SUB);
                let k = 0;
                strRatioType = arrStrSub[k++];
                config = parseInt(arrStrSub[k++], 16);
                a = parseInt(arrStrSub[k++]); // numerator in a/b
                b = parseInt(arrStrSub[k++]); // denominator in a/b
                bounds = {
                    'x': parseInt(arrStrSub[k++]),
                    'y': parseInt(arrStrSub[k++]),
                    'width': parseInt(arrStrSub[k++]),
                    'height': parseInt(arrStrSub[k++]),
                };
                switch (strRatioType) {
                    case "R":
                        //flags
                        flgRectColor = ZintCommon.setFlag(config, ZintRatioGeneric.CONFIG_RECT_COLOR); // 1
                        flgRectDimension = ZintCommon.setFlag(config, ZintRatioGeneric.CONFIG_RECT_DIMENSION); // 2
                        flgRectFillOrder = ZintCommon.setFlag(config, ZintRatioGeneric.CONFIG_RECT_FILL_ORDER); // 4
                        flgRectFillColors = ZintCommon.setFlag(config, ZintRatioGeneric.CONFIG_RECT_FILL_COLORS); // 8
                        // Collect necessary tokens
                        if (flgRectDimension) {
                            colNumOf = parseInt(arrStrSub[k++]);
                            rowNumOf = parseInt(arrStrSub[k++]);
                        }
                        if (flgRectColor) {
                            colorStroke = ZintCommon.getColor(arrStrSub[k++]);
                            colorFill = ZintCommon.getColor(arrStrSub[k++]);
                        }
                        // if (flgRectFillOrder) {
                        //     fillOrder = parseInt(arrStrSub[k++]);
                        // }
                        // if (flgRectFillColors) {
                        //     fillColors = arrStrSub[k++];
                        // }
                        // Construct the rectangle
                        ratioRect = new ZintRatioRectangle(
                            bounds,
                            a, b,
                            colNumOf, rowNumOf,
                            colorStroke, colorFill
                        );
                        if (flgRectFillOrder) {
                            fillOrder = parseInt(arrStrSub[k++]);
                            ratioRect.setFillOrder(fillOrder);
                        }
                        if (flgRectFillColors) {
                            fillColors = arrStrSub[k++];
                            ratioRect.setFillColors(fillColors);
                        }
                        // this.rectangle.push(ratioRect);
                        this.arrDrawable.push(ratioRect);
                        break;
                    case "C":
                        // //flags
                        // flgCircleColor = (config & CONFIG_CIRCLE_COLOR) == CONFIG_CIRCLE_COLOR;
                        // if (flgCircleColor) {
                        //     drawColor = Integer.parseInt(stSub.nextToken(), 16);
                        //     fillColor = Integer.parseInt(stSub.nextToken(), 16);
                        //     ratioCircle = new ZintRatioCircle(a, b, new Color(drawColor), new Color(fillColor));
                        // } else {
                        //     ratioCircle = new ZintRatioCircle(a, b);
                        // }
                        // ratioCircle.setBounds(xp, yp, width, height);
                        // //ratioCircle.draw(gBuf);
                        // circle.addElement(ratioCircle);
                        break;
                    default:
                        console.log('ZintRatioGeneric/initParam/default');
                }
            }
        }
    }

    //
    /**
     * format: `config,latex,x,y,fillOrder,fillColor|`
     */
    initParamConfigString() {
        let strParam;
        let arrStr;
        let strParamSub;
        let arrStrSub;
        //
        let config;
        let flgStringColor;
        let flgStringSize;
        let x, y;
        let strLatex;
        let fontSize;
        let fontColor;

        strParam = this.getParameter("configString");
        if (strParam === undefined) {
            console.log('**ERROR** ZintRatioGeneric.initParamConfigString: configString');
        } else {
            arrStr = strParam.split(ZintCommon.SEPARATOR);
            for (let i = 0; i < arrStr.length; i++) {
                strParamSub = arrStr[i];
                arrStrSub = strParamSub.split(ZintCommon.SEPARATOR_SUB);
                let k = 0;
                config = parseInt(arrStrSub[k++], 16);
                flgStringColor = ZintCommon.setFlag(config, ZintRatioGeneric.CONFIG_STRING_COLOR); // 1
                flgStringSize = ZintCommon.setFlag(config, ZintRatioGeneric.CONFIG_STRING_SIZE); // 1
                strLatex = arrStrSub[k++];
                x = parseInt(arrStrSub[k++]);
                y = parseInt(arrStrSub[k++]);
                if (flgStringSize) {
                    fontSize = parseInt(arrStrSub[k++]);
                } else {
                    fontSize = 12;
                }
                if (flgStringColor) {
                    fontColor = parseInt(arrStrSub[k++], 16);
                } else {
                    fontColor = 0x0;
                }

                let equation = new ZintMathML(x, y, strLatex);
                this.arrDrawable.push(equation);
            }
        }
    }

    static get CONFIG_CIRCLE_COLOR() {
        return 0x1;
    }

    static get CONFIG_RECT_COLOR() {
        return 0x1;
    }

    static get CONFIG_RECT_DIMENSION() {
        return 0x2;
    }

    static get CONFIG_RECT_FILL_ORDER() {
        return 0x4;
    }

    static get CONFIG_RECT_FILL_COLORS() {
        return 0x8;
    }

    //
    static get CONFIG_STRING_COLOR() {
        return 0x1;
    }

    static get CONFIG_STRING_SIZE() {
        return 0x2;
    }
}

// <APPLET archive=jarConMathematics.jar,jarLibAnalytic.jar,jarLibGraphics.jar,jarLibMathematics.jar,jarLibPhysics.jar,jarLibUtility.jar width="480" height="70"
// code="tr.com.integral.library.mathematics.ZintGenericRatio.class">
//     <param name=configRatio value="
// R,3,3,7,10,10,140,20,7,1,6B8E23,32CD32|
// R,3,2,7,170,10,140,20,7,1,6B8E23,32CD32|
// R,3,5,7,330,10,140,20,7,1,6B8E23,32CD32
// ">
// <param name=configString value="
// 3^<FRA>3/7</FRA>^70^50^14^6B8E23|
// 3^+^155^50^14^6B8E23|
// 3^<FRA>2/7</FRA>^230^50^14^6B8E23|
// 3^=^315^50^14^6B8E23|
// 3^<FRA>5/7</FRA>^390^50^14^6B8E23">
// </APPLET>




// **********************************************************
class ZintRatioRectangle extends ZintObjectD {
    /**
     *
     * @param bounds {bound} Bounding box.
     * @param a {number} Numerator.
     * @param b {number} Denominator.
     * @param colNumOf {number} Number of columns.
     * @param rowNumOf {number} Number of rows.
     * @param colorDraw {number} Color for stroke.
     * @param colorFill {number} Color for fill.
     */
    constructor(bounds, a, b, colNumOf, rowNumOf, colorDraw, colorFill) {
        super(bounds);
        this.setNominator(a);
        this.setDenominator(b, colNumOf, rowNumOf);
        this.colorStroke = colorDraw;
        this.colorFill = colorFill;
        this.fillOrder = ZintRatioRectangle.FILL_ROW;
        this.blnMultipleColoredFill = false;
    }

    setNominator(a) {
        this.a = a;
    }

    setDenominator(b, colNumOf, rowNumOf) {
        this.b = b;
        // Denominator dependent corrections
        this.colNumOf = colNumOf;
        this.rowNumOf = rowNumOf;
        this.colNumOf1M = colNumOf - 1;
        this.rowNumOf1M = rowNumOf - 1;
        this.setPieces();
    }

    setBounds(x, y, width, height) {
        super.setBounds(x, y, width, height);
        this.setPieces();
    }

    /**
     * Sets the coordinates of the vertical and horizontal lines
     */
    setPieces() {
        this.dx = this.bounds.width / this.colNumOf;
        this.dy = this.bounds.height / this.rowNumOf;
        this.x = []; //new int[colNumOf + 1];
        this.y = []; //new int[rowNumOf + 1];

        // Vertical
        this.x[0] = this.bounds.x;
        for (let i = 1; i <= this.colNumOf; i++) {
            this.x[i] = this.x[i - 1] + this.dx;
        }

        // Horizontal
        this.y[0] = this.bounds.y;
        for (let j = 1; j <= this.rowNumOf; j++) {
            this.y[j] = this.y[j - 1] + this.dy;
        }
    }

    setFillOrder(fillOrder) {
        this.fillOrder = fillOrder;
    }

    //  Takes a string containing "n1^c1\n2^c2\n3^c3..." couples,
    //  which means n1 cells will be filled using color c1,
    //  subsequent n2 cells using c2 and so on.
    //  Then fills this information into an array which will be used
    //  later in fillPieces().
    setFillColors(colors) {
        let st, stSub;
        let cellFilledNumOf = 0; // total number of filled cells specified by parameter
        st = colors.split(ZintCommon.SEPARATORA);
        this.fillColorsNumOf = st.length;
        this.fillColors = []; //new int[fillColorsNumOf + 1][2]; // +1 is if correction is needed
        // fill fillColors[][] table
        for (let i = 0; i < this.fillColorsNumOf; i++) {
            stSub = st[i].split(ZintCommon.SEPARATOR_SUBA);
            // this.fillColors[i][ZintRatioRectangle.COLUMN_QUANTITY] = parseInt(stSub[0]);
            // cellFilledNumOf += this.fillColors[i][ZintRatioRectangle.COLUMN_QUANTITY];
            // this.fillColors[i][ZintRatioRectangle.COLUMN_COLOR] = parseInt(stSub[1], 16);
            let arrTmp = [];
            arrTmp[ZintRatioRectangle.COLUMN_QUANTITY] = parseInt(stSub[ZintRatioRectangle.COLUMN_QUANTITY]);
            arrTmp[ZintRatioRectangle.COLUMN_COLOR] = parseInt(stSub[ZintRatioRectangle.COLUMN_COLOR]);
            this.fillColors[i] = arrTmp;
        }
        // If number of filled cells is wrong correct it
        if (cellFilledNumOf < a) {
            this.fillColors[this.fillColorsNumOf][ZintRatioRectangle.COLUMN_QUANTITY] = a - cellFilledNumOf; // missing quantity
            this.fillColors[this.fillColorsNumOf][ZintRatioRectangle.COLUMN_COLOR] = colFill.getRGB();
        }
        this.blnMultipleColoredFill = true;
    }

    /**
     * Draws on context.
     * @param paper {Snap} Context.
     */
    draw(paper) {
        this.drawFillPieces(paper);
        this.drawStrokePieces(paper);
    }

    /**
     * Fills as many pieces as the nominator.
     * @param paper {paper} Snap paper.
     */
    drawFillPieces(paper) {
        let pieceCount = 0;
        // let fillColor;
        let multipleColorIndex = 0;
        let multipleColorCount = 0;

        let fillStyle = this.colorFill;

        // Fill the rectangle using given fill order
        switch (this.fillOrder) {
            case ZintRatioRectangle.FILL_ROW :
                for (let j = this.rowNumOf1M; j >= 0; j--) {
                    for (let i = 0; i <= this.colNumOf1M; i++) {
                        if (pieceCount === this.a) { // Ratio complete
                            return;
                        }
                        if (this.blnMultipleColoredFill) { // means setFillColors() was called
                            if (multipleColorCount === 0) { // use the new color
                                fillStyle = this.fillColors[multipleColorIndex][ZintRatioRectangle.COLUMN_COLOR];
                            }
                            multipleColorCount++;
                            if (multipleColorCount === this.fillColors[multipleColorIndex][ZintRatioRectangle.COLUMN_QUANTITY]) {
                                // Next time will use a different color
                                multipleColorIndex++;
                                multipleColorCount = 0;
                            }
                        }
                        paper.rect(this.x[i], this.y[j], this.dx, this.dy)
                            .attr({
                                fill: fillStyle
                            });
                        pieceCount++;
                    }
                }
                break;
            case ZintRatioRectangle.FILL_COLUMN:
                for (let i = 0; i <= this.colNumOf1M; i++) {
                    for (let j = this.rowNumOf1M; j >= 0; j--) {
                        if (pieceCount === this.a) { // Ratio complete
                            return;
                        }
                        if (this.blnMultipleColoredFill) { // means setFillColors() was called
                            if (multipleColorCount === 0) { // use the new color
                                fillStyle = this.fillColors[multipleColorIndex][ZintRatioRectangle.COLUMN_COLOR];
                            }
                            multipleColorCount++;
                            if (multipleColorCount === this.fillColors[multipleColorIndex][ZintRatioRectangle.COLUMN_QUANTITY]) {
                                // Next time will use a different color
                                multipleColorIndex++;
                                multipleColorCount = 0;
                            }
                        }
                        paper.rect(this.x[i], this.y[j], this.dx, this.dy)
                            .attr({
                                fill: fillStyle
                            });
                        pieceCount++;
                    }
                }
                break;
        }
    }


    /**
     * Draw the rectangle and pieces but do not fill.
     * @param paper {paper} Snap paper.
     */
    drawStrokePieces(paper) {
        // int dxp = dx; // Used to draw the piece lines
        // int dyp = dy;

        let kvAttr
        kvAttr = {
            "stroke": this.colorStroke,
            "strokeWidth": 3,
            "fill": "none"
        };
        // Draw outline frame
        // let strokeStyle = this.colorStroke;
        // s.lineWidth = 3;
        paper.rect(this.x[0], this.y[0], this.bounds.width, this.bounds.height, 0, 0)
            .attr(kvAttr);


        kvAttr.lineWidth = 1;
        // A second rectangle to make the frame thicker
        // ctx.strokeRect(this.xp[0] + 1, this.yp[0] + 1, this.bounds.width - 2, this.bounds.height - 2);

        // Column lines
        for (let i = 1; i < this.colNumOf; i++) {
            ZintObjectD.drawLine(paper, this.x[i], this.y[0], this.x[i], this.y[this.rowNumOf], kvAttr);
        }

        // Row lines
        for (let j = 1; j < this.rowNumOf; j++) {
            ZintObjectD.drawLine(paper, this.x[0], this.y[j], this.x[this.colNumOf], this.y[j], kvAttr);
        }
    }

    static get COLOR_CYAN() {
        return 0x00ffff;
    }

    static get COLOR_BLUE() {
        return 0x0000ff;
    }

    //	1st dimension changes between [0-number of colors] used to fill
    //    (is the index of two columned table)
    //	2nd dimension is either COLUMN_QUANTITY (1) or
    //	  COLUMN_COLOR (2) which tells which column to use.
    //	See setFillColors for usage.
    static get COLUMN_QUANTITY() {
        return 0;
    }

    static get COLUMN_COLOR() {
        return 1;
    }

    /**
     * Fill by columns
     * @returns {number}
     * @constructor
     */
    static get FILL_COLUMN() {
        return 1;
    }

    /**
     * Fill by rows
     * @returns {number}
     * @constructor
     */
    static get FILL_ROW() {
        return 2;
    }

}



// **********************************************************
class ZintRuler {
    

}



// **********************************************************
/**
 * General utility for analytic geometry
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */

class ZintLatex2Svg {

    /**
     * Places LaTeX at a given `(x, y)` on `paper`.
     * @param paper {paper} Snap.svg paper.
     * @param x {number} `x` location.
     * @param y {number} `y` location.
     * @param strLatex {string} math in LaTeX.
     * @param isDisplay {boolean} true for display, false for inline mode of LaTeX.
     */
    constructor(paper,
                x,
                y,
                strLatex,
                isDisplay = false
    ) {
        // this.elementID = "ID_x" + x + "y" + y + Math.random();
        this.elementID = ZintLatex2Svg.uniqueID(x, y);
        // console.log(this.elementID);
        // TODO unused local variable: paperInnerB
        let paperInnerB = paper.svg(x, y)
            .attr({
                id: this.elementID,
            });
        this.element = document.getElementById(this.elementID);


        // TODO color NOT WORKING
        // MathJax.loader = {load: ['[tex]/color']};
        // MathJax.tex = {
        //     packages: {'[+]': ['color']}
        // };
        // MathJax.Hub.Config({ TeX: { extensions: ["color.js"] }});


        // get MathJax metrics from environment
        MathJax.texReset();
        this.options = MathJax.getMetricsFor(this.element);
        this.options.display = isDisplay;
        this.latex2svgString(strLatex);
    } // constructor

    /**
     * Set promise to place math in `this.element`.
     * @param strLatex {string} LateX expression
     * @param successCallback
     * @param failureCallback
     * @param handleError
     * @returns {Promise<unknown>}
     */
    latex2svgString(strLatex,
                    successCallback = this.successCallback,
                    failureCallback = this.failureCallback,
                    handleError = this.handleError) {
        // TODO unused local variable: reject
        return new Promise(
            (resolve, reject) => {
                let wrapper = MathJax.tex2svg(strLatex, this.options);
                let mjOut = wrapper.getElementsByTagName("svg")[0];
                resolve([this, mjOut.outerHTML]);
            }
        )
            .then(successCallback, failureCallback)
            .catch(handleError);
    } // latex2svgString

    successCallback([that, svg]) {
        // console.log("successCallback");
        that.element.innerHTML = svg;
    } // successCallback

    failureCallback([that, svg]) {
        // TODO unused local variable: that, svg
        console.log("failureCallback" + that + svg);
    } // failureCallback

    handleError([that, svg]) {
        // TODO unused local variable: that, svg
        console.log("handleError" + that + svg);
    } // handleError

    static counter = 0;

    static uniqueID(x, y) {
        return "ID_x" + x + "y" + y + "_" + (++ZintLatex2Svg.counter);
    }

} // class ZintLatex2Svg




// **********************************************************
// =====================
// ZintVector.js
//

// when       who what
// 2020-06-01 HB init

/**
 * Point in analytic geometry
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */

class ZintVector {
    // a vector from point pA to point pB

    constructor(theta, magnitude) {
        this.theta = theta; // in [0, 2*pi)
        this.magnitude = magnitude;
        //
        if (ZintMath.isEqual(this.theta, Math.PI / 2) && ZintMath.isEqual(this.theta, 3 * Math.PI / 2)) {
            this.componentX = 0;
            this.componentY = this.magnitude;
        } else {
            this.componentX = this.magnitude * Math.cos(this.magnitude);
            this.componentY = this.magnitude * Math.sin(this.magnitude);
        }
    }

    fromAtoB(pointA, pointB) {
        // vector from A to B
        let theta;
        let magnitude = pointA.distanceToPoint(pointB);
        if (ZintMath.isEqual(pointA.x, pointB.x)) {
            // parallel to y-axes
            if (pointA.y < pointB.y) {
                theta = 0;
            } else {
                theta = 3 * Math.PI / 2;
            }
        } else {
            theta = Math.atan((pointA.y - pointB.y) / (pointA.x - pointB.x));
        }
        return new ZintVector(theta, magnitude);
    }

    clone() {
        return new ZintVector(this.theta, this.magnitude);
    }

    unit() {
        return new ZintVector(this.theta, 1);
    }

    unitPerpendicular() {
        let thetaPer = (this.theta + Math.PI / 2) % (2 * math.PI);
        console.log("thetaPer:" + thetaPer);
        return new ZintVector(thetaPer, 1);
    }

    add(vectorA) {

    }

    equals(vectorA) {
        return ZintMath.isEqual(this.theta, vectorA.theta)
            && ZintMath.isEqual(this.magnitude, vectorA.magnitude);
    }

    toString() {
        return "[v t:" + this.theta + ", m:" + this.magnitude + "]";
    }

    static
    get PARALLEL() {
        return 0;
    }
    ;

    static
    get PERPENDICULAR() {
        return 1;
    }
    ;

    static
    get UNIT_X() {
        return new ZintVector(
            new ZintPoint(0, 0),
            new ZintPoint(1, 0)
        );
    }

    static
    get UNIT_Y() {
        return new ZintVector(
            new ZintPoint(0, 0),
            new ZintPoint(0, 1)
        );
    }

}



// **********************************************************
/**
 * General utility for analytic geometry
 *
 * @author Haluk O. Bingol
 * @version 1.0
 * @since 1.0
 */

class ZintSvgUtility {

    /**
     * Draws the viewBox.
     * @param paper {paper} Snap.svg paper.
     * @param color
     */
    static markViewBox(paper, color = "red") {
        // TODO unused local variable: vbx, vby, vbw, vbh, r
        let viewBox = paper.attr("viewBox");
        let vbx = viewBox.x;
        let vby = viewBox.y;
        let vbw = viewBox.width;
        let vbh = viewBox.height;
        let r = paper.rect(vbx, vby, vbw, vbh)
            .attr({
                fill: color,
                opacity: "0.2"
            });
    } // markViewBox

    /**
     * Draws grid starting at `(0, 0)` with increments of `(dx, dy)` with color.
     * @param paper {paper} Snap.svg paper.
     * @param dx {number} increment in `x`
     * @param dy {number} increment in `y`
     * @param color {string}
     */
    static grid(paper, dx, dy, color = "red") {
        let viewBox = paper.attr("viewBox");
        let vbx = viewBox.x;
        let vby = viewBox.y;
        let vbw = viewBox.width;
        let vbh = viewBox.height;
        //
        let g = paper.g();
        let line;
        let jsonAttr = {
            "stroke": color,
            "strokeWidth": "1",
            "opacity": "0.4"
        };
        // separators
        let darkerLineCounter;
        const darkerCounter = 5;
        let jsonAttrDarker = {
            "stroke": color,
            "strokeWidth": "1",
            "opacity": "0.8"
        };
        darkerLineCounter = 0;
        for (let x = viewBox.x; x <= viewBox.width; x = x + dx) {
            if ((darkerLineCounter % darkerCounter) === 0) {
                line = paper.line(x, viewBox.y, x, viewBox.height)
                    .attr(jsonAttrDarker);
            } else {
                line = paper.line(x, viewBox.y, x, viewBox.height)
                    .attr(jsonAttr);
            }
            darkerLineCounter++;
            g.append(line);
        }
        darkerLineCounter = 0;
        for (let y = viewBox.y; y <= viewBox.height; y = y + dy) {
            if ((darkerLineCounter % darkerCounter) === 0) {
                line = paper.line(viewBox.x, y, viewBox.width, y)
                    .attr(jsonAttrDarker);
            } else {
                line = paper.line(viewBox.x, y, viewBox.width, y)
                    .attr(jsonAttr);
            }
            darkerLineCounter++;
            g.append(line);
        }
    } // grid

} // class ZintSvgUtility



// **********************************************************
class ZintStepByStep {
    constructor(elementID, content) {
        this.stepCurrent = 0;
        this.className = ZintStepByStep.generateClassName();
        this.that = this;
        let arrContent = content.split("|");
        this.contentLength = arrContent.length;
        //
        let tag;
        let text;
        let element = document.getElementById(elementID);
        for (let i = 0; i < this.contentLength; i++) {
            // tag = document.createElement("p");
            tag = document.createElement("div");
            tag.className = this.className;
            tag.id = ZintStepByStep.generateID(this.className, i);
            text = document.createTextNode(arrContent[i]);
            tag.appendChild(text);
            if (i > 0) {
                tag.style.display = "none"; // "block";
            }
            element.appendChild(tag);
        }
        // next
        tag = document.createElement("input");
        tag.type = "button";
        tag.onclick = this.stepPrev;
        tag.value = "<";
        tag.id = this.className + "_Prev";
        tag.that = this;
        element.appendChild(tag);
        // prev
        tag = document.createElement("input");
        tag.type = "button";
        tag.onclick = this.stepNext;
        tag.value = ">";
        tag.id = this.className + "_Next";
        tag.that = this;
        element.appendChild(tag);
    }

    stepPrev() {
        if (this.that.stepCurrent > 0) {
            this.that.stepCurrent--;
            this.that.stepShow();
        } else {
            // nop
            console.log("stepPrev")
        }
    }

    stepNext() {
        if (this.that.stepCurrent < this.that.contentLength - 1) {
            this.that.stepCurrent++;
            this.that.stepShow();
        } else {
            // nop
            console.log("stepNext");
        }
    }

    stepShow() {
        let divs = document.getElementsByClassName(this.that.className);
        let divsLength = divs.length;
        for (let j = 0; j < divsLength; j++) {
            let div = divs[j];
            div.style.display = (j <= this.that.stepCurrent ? "block" : "none");
        }
    }

    static
    randomClassNameCounter = 0;

    static generateClassName() {
        return "rcn" + (ZintStepByStep.randomClassNameCounter++);
    }

    static generateID(className, i) {
        return className + "_" + i;
    }

} // ZintStepByStep