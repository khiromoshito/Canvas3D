import { Vector3D } from "./Vector3D.js";
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




        /** This camera's relative position on the 3d canvas 
         * @type {Vector3D}
        */
        this.position = new Vector3D(options.x || 0, options.y || 0, options.z || 0);


         /** This camera's rotation
          * @type {Vector3D}
         */
        this.rotation = new Vector3D(options.rx || 0, options.ry || 0, options.rz || 0);
            
    }

    
}