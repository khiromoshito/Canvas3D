import { Vector3D } from "./vectors/Vector3D.js";


export class Drawable {
    /**
     * Non-objects that can be directly draw to the HTML canvas
     * @param {Vector3D} vertices
     * @param {{fillColor: string, strokeWidth: number, strokeColor: string}} style
     */
    constructor(vertices = [], style = {}) {
        /**
         * This drawable's vertices
         * @type {Vector3D[]}
         */
        this.vertices = vertices;


        /**
         * This drawable's style
         * @type {{fillColor: string, strokeWidth: number, strokeColor: string}}
         */
        this.style = style;
    }
}