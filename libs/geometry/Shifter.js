import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";
import { DegRad } from "./DegRad.js";
import { Plotter3D } from "./Plotter3D.js";
import { Vectors } from "./Vectors.js";


export var Shifter = {


    /**
     * Shifts a point to a 3d direction (angles) at a 3d offset
     * @param {Vector3D} point
     * @param {Vector3D} angles
     * @param {Vector3D} offset 
     */
    shiftPoint: (point, anglesDegrees, offset) => {
        let angles = DegRad.vectorToRadians(anglesDegrees);

        let ox = 0, oy = 0, oz = 0;

        //ox += Math.sin(angles.y) * offset.z;
        oy += Math.sin(angles.x) * offset.z;

        let topDiagonal = Math.cos(angles.x) * offset.z;
        ox += Math.sin(angles.y) * topDiagonal;
        oz += Math.cos(angles.y) * topDiagonal;
        // oy += Math.sin(angles.x) * offset.z;


        


        ox += Math.cos(angles.y) * offset.x;
        oz -= Math.sin(angles.y) * offset.x;


        oy += offset.y;

        return point.shift(ox, oy, oz, false);
    },

    /**
     * 
     * @param {Vector3D} angles
     * @param {Vector3D} offset 
     */
    tiltAngles: (angles, offset) => {
        const rotation = angles.clone();
        
        rotation.y += offset.y;
        rotation.x += offset.x;
        // rotation.z += offset.x*(Math.sin(DegRad.toRadians(rotation.y)));

        return new Vector3D(...rotation.toArray().map(angle=>angle%360));
    },

    /** [2D] Rotates a point about the origin (0, 0) to a given angle and returns the new coordinates
     * @param {Vector2D} point
     * @param {number} angle
     * @returns {Vector2D}
    */

    shiftAngle: (point, angle) => {

         if((point.x === 0 && point.y === 0) || angle === 0) 
             return point.clone();

        angle = DegRad.toRadians(angle);
        
        /** Point angle */
        const pa = Plotter3D.getAngle(point);

        /** Relative angle */
        const ra = pa - angle;

        const distance = Vectors.getDistance(new Vector2D(0, 0), point);
        const nx = Math.cos(ra) * distance;
        const ny = Math.sin(ra) * distance;

        return new Vector2D(nx, ny);
    },
}