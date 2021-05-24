import { StreamData2D } from "./StreamData2D.js";

export class ViewStreamer {
    
    /**
     * Streams view from a camera to multiple canvases.
     * 
     * This object receives 2d data from the camera through the
     * `_snap` method where it parses the data and directly writes into the HTML canvases
     */
    constructor() {

    }



    /**
     * Adds a canvas to the stream
     * @param {HTMLCanvasElement} canvas
     */
    addCanvas(canvas) {

    }


    /**
     * Removes a canvas from the stream
     * @param {HTMLCanvasElement} canvas
     */
    removeCanvas(canvas) {

    }



    /**
     * Processes data from camera
     * @param {StreamData2D} data
     */
    _snap(data) {

    }
}