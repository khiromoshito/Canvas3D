import { DegRad } from "../geometry/DegRad.js";
import { Vectors } from "../geometry/Vectors.js";
import { CameraPerspective } from "../schemas/CameraPerspective.js";
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
        const ny = halves.y - point.y;

        return new Vector2D(nx, ny);
    },


    /**
     * Rasters relative 3D position into 2D
     * @param {Vector3D} point 
     * @param {CameraPerspective} perspective
     * @returns {Vector2D}
     */
    getRasteredPosition: (point, perspective) => {
        const angle = DegRad.toRadians(perspective.angle);

        const distance = Vectors.getDistance(new Vector3D(0, 0, 0), point);

        const W = perspective.constant/Math.abs(Math.sin(angle) * point.z);
        const nx = point.x*W;
        const ny = point.y*W; 

        return new Vector2D(nx, ny);
    }
}