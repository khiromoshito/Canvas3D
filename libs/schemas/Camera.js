import { ViewStreamer } from "./ViewStreamer.js";


export class Camera {
    /**
     * Captures views from a `Canvas3D`
     * @param {{canvas: HTMLCanvasElement | HTMLCanvasElement[], x: number, y: number, z: number, rx: number, y: number, z: number, scale: number}} options
     */
    constructor(options = {}) {

        /** This camera's view streamer 
         * @type {ViewStreamer}
        */
        this.streamer = new ViewStreamer();

        if("canvas" in options) {
            if(options.canvas instanceof Array)
                for(let canvas of options.canvas)
                    this.streamer.addCanvas(canvas);
            else this.streamer.addCanvas(options.canvas); 
        }
            
    }

    
}