import { ViewStreamer } from "./ViewStreamer.js";


export class Camera {
    /**
     * Captures views from a `Canvas3D` and streams it to an HTML canvas
     * @param {{canvas: HTMLCanvasElement, x: number, y: number, z: number, rx: number, y: number, z: number, scale: number}} options
     */
    constructor(options = {}) {

        /** This camera's view streamer 
         * @type {ViewStreamer}
        */
        this.streamer = new ViewStreamer();
    }

    
}