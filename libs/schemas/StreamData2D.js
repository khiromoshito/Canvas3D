import { ShapeData } from "./ShapeData.js"


export class StreamData2D {
    /**
     * Composed of 2d shapes as a data to be streamed through a `ViewStreamer`
     */
    constructor(shapes = []) {

        /** @type {ShapeData[]} */
        this.shapes = shapes;
    
    }
}