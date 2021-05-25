import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";
import { DegRad } from "./DegRad.js";
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

        const shiftX = Plotter3D.shiftAngle(new Vector2D(point.y, point.z), angles.x);
        point.y = shiftX.x; 
        point.z = shiftX.y;

        

        const shiftY = Plotter3D.shiftAngle(new Vector2D(point.x, point.z), angles.y);
        point.x = shiftY.x; 
        point.z = shiftY.y;

        const shiftZ = Plotter3D.shiftAngle(new Vector2D(point.x, point.y), angles.z);
        point.x = shiftZ.x; 
        point.y = shiftZ.y;

        return point;

    },


    /** [2D] Rotates a point about the origin (0, 0) to a given angle and returns the new coordinates
     * @param {Vector2D} point
     * @param {number} angle
     * @returns {Vector2D}
    */
    shiftAngle: (point, angle) => {

        if(point.x === 0 && point.y === 0) 
            return point.clone();

        angle = DegRad.toRadians(angle);
        
        /** Point angle */
        const pa = Math.atan(point.y/point.x);

        /** Relative angle */
        const ra = pa - angle;

        const distance = Vectors.getDistance(new Vector2D(0, 0), point);
        const nx = Math.cos(ra) * distance;
        const ny = Math.sin(ra) * distance;

        return new Vector2D(nx, ny);
    }
}