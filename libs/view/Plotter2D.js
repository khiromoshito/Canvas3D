import { DegRad } from "../geometry/DegRad.js";
import { Vectors } from "../geometry/Vectors.js";
import { CameraPerspective } from "../schemas/CameraPerspective.js";
import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";

/** For plotting points on the canvas */
export var Plotter2D = {

    /** Gets canvas position of a point 
     * @param {[number, number]} point
     * @param {[number, number]} canvasDimensions
    */
    getApparentPosition: (point, canvasDimensions) => {
        const halves = [canvasDimensions[0]/2, canvasDimensions[1]/2];

        return [point[0] + halves[0], halves[1] - point[1]];
    },


    /**
     * Rasters relative 3D position into 2D
     * @param {[number, number, number]} point 
     * @param {CameraPerspective} perspective
     * @returns {Vector2D}
     */
    getRasteredPosition: (point, perspective) => {
        const W = perspective.constant/Math.abs(
            Math.sin(DegRad.toRadians(perspective.angle)) * point[2]);
        return [point[0]*W, point[1]*W];
    },


    /**
     * 
     * @param {[number, number, number]} p1 
     * @param {[number, number, number]} p2 
     */
    getPointDistance: (p1, p2) => {
        const squareSum = ((p1[0] - p2[0])**2) + ((p1[1] - p2[1])**2) + ((p1[2] - p2[2])**2);
        return Math.sqrt(squareSum);
    }
}