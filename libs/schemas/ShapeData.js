import { Vector2D } from "./vectors/Vector2D.js";


export class ShapeData {

    /**
     * Defines a shape with styles and vertices
     * @param {Vector2D[]} vertices
     * @param {{fillColor: string, strokeWidth: number, strokeColor: string}} style
     */
    constructor(vertices = [], style = {}, z = 0) {

        this.z = Math.round(z);

        /** @type {Vector2D[]} */
        this.vertices = vertices;

        /** @type {{fillColor: string, strokeWidth: number, strokeColor: string}} */
        this.style = style;
    }
}