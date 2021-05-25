import { Collection } from "./Collection.js"
import { PaintableCanvas } from "./PaintableCanvas.js";
import { StreamData2D } from "./StreamData2D.js";

export class ViewStreamer {
    
    /**
     * Streams view from a camera to multiple canvases.
     * 
     * This object receives 2d data from the camera through the
     * `_snap` method where it parses the data and directly writes into the HTML canvases
     * 
     * @param {HTMLCanvasElement[]} canvases
     */
    constructor() {


        this._counter = 0;

        /**
         * This streamer's collection of paintable canvases
         * @type {Map<String, PaintableCanvas>}
         */
        this.canvases = new Map();
    }



    /**
     * Adds a canvas to the stream
     * @param {HTMLCanvasElement} canvas
     */
    addCanvas(canvas) {
        const id = ++this._counter;

        canvas.cid = id;
        this.canvases.set(`${id}`, new PaintableCanvas(canvas));
        console.log("Added a canvas to stream");
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
        this.canvases.forEach(paintableCanvas => paintableCanvas.render(data));
    }
}