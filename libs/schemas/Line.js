import { Drawable } from "./Drawable.js";
import { Vector3D } from "./vectors/Vector3D.js";


export class Line extends Drawable {
    /**
     * 
     * @param {Vector3D} point1 
     * @param {Vector3D} point2 
     * @param {{fillColor: string, strokeWidth: number, strokeColor: string}} style
     */
    constructor(point1, point2, style = {}) {
        super([point1, point2], style);
    }
}