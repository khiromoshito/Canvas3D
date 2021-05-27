import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vectors } from "./Vectors.js";


/** Works on with linear systems and equations */
export var LineSystem = {
    
    /** Gets the intersection between two lines 
     * @param {[Vector2D, Vector2D]} line1
     * @param {[Vector2D, Vector2D]} line2
     * @returns {Vector2D}
    */
    getIntersection: (line1, line2) => {

        if(Vectors.equal(...line1)) {
            if(isUndefined(LineSystem.getSlope(...line2))) {
                if(line1[0].x === line2[0].x) {
                    return line1[0];
                } else return undefined;
            }

            const y = LineSystem.getY(line2, line1[0].x);
            return new Vector2D(line1[0].x, y);
        }

        if(Vectors.equal(...line2)) {
            if(isUndefined(LineSystem.getSlope(...line1))) {
                if(line1[0].x === line2[0].x) {
                    return line2[0];
                } else return undefined;
            }

            const y = LineSystem.getY(line1, line2[0].x);
            return new Vector2D(line2[0].x, y);
        }



        const m1 = LineSystem.getSlope(...line1);
        const m2 = LineSystem.getSlope(...line2);

        const b1 = line1[0].y - (m1 * line1[0].x);
        const b2 = line2[0].y - (m2 * line2[0].x);

        if(isUndefined(m1)) {
            const iy = LineSystem.getY(line2, line1[0].x);
            return new Vector2D(line1[0].x, iy);
        }

        if(isUndefined(m2)) {
            const iy = LineSystem.getY(line1, line2[0].x);
            return new Vector2D(line2[0].x, iy);
        }

        const ix = (b2 - b1)/(m1 - m2);
        const iy = (m1 * ix) + b1;

        return new Vector2D(ix, iy);
    },

    /** Gets the slope of two points */
    getSlope: (p1, p2) => {
        return (p2.y - p1.y)/(p2.x - p1.x);
    },

    /** Gets the y ordinate of an x value from a line 
     * @param {[Vector2D, Vector2D]} line 
     * @param {number} x
     * @returns {number}
    */
    getY: (line, x) => {
        const m = LineSystem.getSlope(...line);
        const b = line[0].y - (m*line[0].x);

        return (m*x) + b;
    },

}

function isUndefined(number) {
    return number === NaN || number === Infinity || number === -Infinity;
}