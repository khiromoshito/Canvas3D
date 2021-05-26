import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";


export var DegRad = {
    
    /**
     * Converts an angle to degrees
     * @param {number} angle 
     */
    toDegrees: (angleInRadians) => {
        return (angleInRadians/Math.PI)*180;
    },

    /**
     * Converts an angle to radians
     * @param {number} angleInDegrees
     */
    toRadians: (angleInDegrees) => {
        return (angleInDegrees/180)*Math.PI;
    },

    /**
     * Converts a vector of angles to radians
     * @param {Vector2D | Vector3D} angles
     */
    vectorToRadians: (angles) => {
        const newAngles = angles.toArray().map(angle=>DegRad.toRadians(angle));
        
        if(angles instanceof Vector2D) 
            return new Vector2D(...newAngles);
        
        if(angles instanceof Vector3D) 
            return new Vector3D(...newAngles);
    }
}