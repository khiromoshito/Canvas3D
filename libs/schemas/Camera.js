import { Capturer } from "../view/Capturer.js";
import { Canvas3D } from "./Canvas3D.js";
import { Vector3D } from "./vectors/Vector3D.js";
import { ViewStreamer } from "./ViewStreamer.js";


export class Camera {

    /**
     * Captures views from a `Canvas3D`
     * @param {{canvas: HTMLCanvasElement | HTMLCanvasElement[], x: number, y: number, z: number, rx: number, ry: number, rz: number, scale: number}} options
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


        /** The 3D canvas that this camera is attached to 
         * @type {Canvas3D}
        */
        this.canvas = null;


        /** Whether this camera is rolling */
        this.rolling = false;



        /** This camera's relative position on the 3d canvas 
         * @type {Vector3D}
        */
        this.position = new Vector3D(options.x || 0, options.y || 0, options.z || 0);


         /** This camera's rotation
          * @type {Vector3D}
         */
        this.rotation = new Vector3D(options.rx || 0, options.ry || 0, options.rz || 0);
            
    }

    /**
     * Updates the view corresponding to a snapshot of the canvas
     */
    async _snap() {
        console.log(`Camera took a snap (obj count: ${this.canvas.context.objects.size})`);

        const data = Capturer.capture3D(this.canvas, this);
        this.streamer._snap(data);
    }

    /** Starts the camera */
    _start() {
        this._snap();
    }

    _stop() {
        this.rolling = false;
    }

    
}