import { Vector2D } from "./vectors/Vector2D.js";


export class ShapeData {

    /**
     * Defines a shape with styles and vertices
     * @param {[number, number][]} vertices
     * @param {{fillColor: string, strokeWidth: number, strokeColor: string}} style
     */
    constructor(vertices = [], style = {}, z = 0, bounds = []) {

        this.z = Math.round(z);

        /** @type {[number, number][]} */
        this.vertices = vertices;

        /** @type {{fillColor: string, strokeWidth: number, strokeColor: string}} */
        this.style = style;

        this.bounds = bounds;
    }
}