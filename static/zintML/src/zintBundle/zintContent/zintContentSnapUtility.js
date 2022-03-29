// =====================
// zintSnapUtility.js
//
// when       who what
// 2020-12-21 HB init


/**
 * Utility functions for snap
 */
class zintContentSnapUtility {

    // TODO clean This uses `snapJs`


    /**
     * Make a 20x20 grid of size
     *
     * @param s {snap} snap paper
     * @param width {number}
     * @param height {number}
     */
    static makeAGrid20(s, width = 300, height = 200) {
        let gridArrCol = [];
        let gridArrRow = [];
        for (let i = 0; i < width; i += 20) {
            gridArrCol.push(i);
        }
        for (let i = 0; i < height; i += 20) {
            gridArrRow.push(i);
        }
        zintContentSnapUtility.makeAGrid(s, gridArrCol, gridArrRow);
    } // makeAGrid20

    /**
     * Draw a grid.
     * Convention: Point (arrX[0], arrY[0]) is the upper left corner
     *
     * @param s {snap} snap paper
     * @param arrX {[number]} array of `x` values
     * @param arrY {[number]} array of 'y' values
     */
    static makeAGrid(s, arrX, arrY) {
        // grid horizontal
        let xLeft = arrX[0];
        let xRight = arrX[arrX.length - 1];
        let gridH = [];
        for (let i = 0; i < arrY.length; i++) {
            gridH[i] = s.line(xLeft, arrY[i], xRight, arrY[i]).attr({
                opacity: ".2",
                fill: "none",
                strokeWidth: "2",
                stroke: "red"
            });
        }
        // grid vertical
        let yTop = arrY[0];
        let yBottom = arrY[arrY.length - 1];
        let gridV = [];
        for (let i = 0; i < arrX.length; i++) {
            gridV[i] = s.line(arrX[i], yTop, arrX[i], yBottom).attr({
                opacity: ".2",
                fill: "none",
                strokeWidth: "2",
                stroke: "red"
            });
        }
    } // makeAGrid

    /**
     *
     * @param centerX {number}
     * @param centerY {number}
     * @param radius {number}
     * @param angleInDegrees {number}
     * @returns {{x: *, y: *}}
     */
    static polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    /**
     * Return svg A-command for arc
     *
     * @param cx
     * @param cy
     * @param radius
     * @param startAngle
     * @param endAngle
     * @returns {string}
     */
    static describeArc(cx, cy, radius, startAngle, endAngle) {
        // source: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
        let start = zintContentSnapUtility.polarToCartesian(cx, cy, radius, endAngle);
        let end = zintContentSnapUtility.polarToCartesian(cx, cy, radius, startAngle);
        let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    }
}
