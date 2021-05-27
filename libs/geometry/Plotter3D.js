import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";
import { DegRad } from "./DegRad.js";
import { Shifter } from "./Shifter.js";
import { Vectors } from "./Vectors.js";


const QUADRANTS = [
    [true, true, angle => angle],
    [false, true, angle => Math.PI - angle],
    [false, false, angle => Math.PI + angle],
    [true, false, angle => (Math.PI*2) - angle],
];

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
    // getRelativePosition: (refPoint, objectPoint, angles) => {

    //     /** Point coordinates relative to refPoint */
    //     const point = Vectors.subtract(objectPoint, refPoint);


    //     const shiftY = Shifter.shiftAngle(new Vector2D(point.z, point.x), angles.y);
    //     point.z = shiftY.x; 
    //     point.x = shiftY.y;

    //     const shiftZ = Shifter.shiftAngle(new Vector2D(point.x, point.y), angles.z);
    //     point.x = shiftZ.x; 
    //     point.y = shiftZ.y;


    //     const shiftX = Shifter.shiftAngle(new Vector2D(point.z, point.y), angles.x);
    //     point.z = shiftX.x; 
    //     point.y = shiftX.y;

    //     return point;

    // },

    /**
     * [3D] Gets relative position of point from a reference point
     * @param {Vector3D} refPoint 
     * @param {[number, number, number]} objectPoint 
     * @param {Vector3D} angles
     * 
     * @returns {[number, number, number]}
     */
     getRelativePosition: (refPoint, objectPoint, angles) => {

        /** Point coordinates relative to refPoint */
        const point = [
            objectPoint[0] - refPoint.x,
            objectPoint[1] - refPoint.y,
            objectPoint[2] - refPoint.z
        ];


        const shiftY = Shifter.shiftAngle(point[2], point[0], angles.y);
        point[2] = shiftY[0]; 
        point[0] = shiftY[1];

        const shiftZ = Shifter.shiftAngle(point[0], point[1], angles.z);
        point[0] = shiftZ[0]; 
        point[1] = shiftZ[1];


        const shiftX = Shifter.shiftAngle(point[2], point[1], angles.x);
        point[2] = shiftX[0]; 
        point[1] = shiftX[1];

        return point;

    },

    /**
     * 
     * @param {[number, number]} point 
     */
    getAngle: (x, y) => {

        let refAngle = Math.abs(Math.atan(y/x));

        for(const quadrant of QUADRANTS) {
            if(quadrant[0] === (x >= 0) && quadrant[1] === (y >= 0)) {
                refAngle = quadrant[2](refAngle);
                break;
            }
        }

        return refAngle;
    },


}