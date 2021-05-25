import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";

/** For plotting points on the canvas */
export var Plotter2D = {

    /** Gets canvas position of a point 
     * @param {Vector2D} point
     * @param {Vector2D} canvasDimensions
    */
    getApparentPosition: (point, canvasDimensions) => {
        const halves = new Vector2D(canvasDimensions.x/2, canvasDimensions.y/2);
        const nx = point.x + halves.x;
        const ny = point.y + halves.y;

        return new Vector2D(nx, ny);
    },


    /**
     * Rasters relative 3D position into 2D
     * @param {Vector3D} point 
     * @returns {Vector2D}
     */
    getRasteredPosition: (point) => {
        return new Vector2D(point.x, point.y);
    }
}