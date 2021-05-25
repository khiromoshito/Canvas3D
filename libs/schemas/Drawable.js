import { Camera } from "./Camera.js";


export class Drawable {
    /**
     * Non-objects that can be directly draw to the HTML canvas
     */
    constructor() {}

    /** Draws to the HTML canvas
     * @param {CanvasRenderingContext2D} context
     * @param {Camera} camera
     */
    draw(context, camera) {}
}