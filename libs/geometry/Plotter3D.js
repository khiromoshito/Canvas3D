import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";
import { DegRad } from "./DegRad.js";
import { Shifter } from "./Shifter.js";
import { Vectors } from "./Vectors.js";

/** For plotting points on 3d */
export var Plotter3D = {
    /**
     * [3D] Gets relative position of point from a reference point
     * @param {Vector3D} refPoint 
     * @param {Vector3D} objectPoint 
     * @param {Vector3D} angles
     * 
     * @returns {Vector3D}
     */
    getRelativePosition: (refPoint, objectPoint, angles) => {

        /** Point coordinates relative to refPoint */
        const point = Vectors.subtract(objectPoint, refPoint);


        const shiftY = Shifter.shiftAngle(new Vector2D(point.z, point.x), angles.y);
        point.z = shiftY.x; 
        point.x = shiftY.y;

        const shiftZ = Shifter.shiftAngle(new Vector2D(point.x, point.y), angles.z);
        point.x = shiftZ.x; 
        point.y = shiftZ.y;


        const shiftX = Shifter.shiftAngle(new Vector2D(point.z, point.y), angles.x);
        point.z = shiftX.x; 
        point.y = shiftX.y;

        return point;

    },

    /**
     * 
     * @param {Vector2D} point 
     */
    getAngle: (point) => {

        const QUADRANTS = [
            [true, true, angle => angle],
            [false, true, angle => Math.PI - angle],
            [false, false, angle => Math.PI + angle],
            [true, false, angle => (Math.PI*2) - angle],
        ];

        let refAngle = Math.abs(Math.atan(point.y/point.x));


        for(const quadrant of QUADRANTS) {
            if(quadrant[0] === (point.x >= 0) && quadrant[1] === (point.y >= 0)) {
                refAngle = quadrant[2](refAngle);
                break;
            }
        }

        return refAngle;
    },


}