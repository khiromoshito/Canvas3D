import { Shifter } from "../geometry/Shifter.js";
import { Capturer } from "../view/Capturer.js";
import { CameraPerspective } from "./CameraPerspective.js";
import { CameraStats } from "./CameraStats.js";
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


        /** Interval for each snaps (in ms) */
        this.tickInterval = 20;

        this.ticker = null;

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

        /** Performance statistics for this camera */
        this.stats = new CameraStats();



        /** This camera's relative position on the 3d canvas 
         * @type {Vector3D}
        */
        this.position = new Vector3D(options.x || 0, options.y || 0, options.z || 0);


         /** This camera's rotation
          * @type {Vector3D}
         */
        this.rotation = new Vector3D(options.rx || 0, options.ry || 0, options.rz || 0);


        /** How warped objects are by distance */
        this.perspective = new CameraPerspective(70, 600);
    }


    /** Shift this camera's position relative to its direction 
     *  @param {number} ox
     *  @param {number} oy
     *  @param {number} oz
    */
    shift(ox, oy, oz) {
        this.position = Shifter.shiftPoint(this.position, this.rotation, new Vector3D(ox, oy, oz));
    }

    /** Tilt this camera's angles 
     *  @param {number} ox
     *  @param {number} oy
     *  @param {number} oz
    */
    tilt(ox, oy, oz) {
        this.rotation = Shifter.tiltAngles(this.rotation, new Vector3D(ox, oy, oz));
    }



    /**
     * Updates the view corresponding to a snapshot of the canvas
     */
    async _snap() {
        const startTime = Date.now();
        const data = Capturer.capture3D(this.canvas, this);
        const endTime = Date.now();

        const elapsedTime = endTime - startTime;

        this.stats.update("averageParseTime", elapsedTime);

        this.streamer._snap(data);
    }

    /** Starts the camera */
    _start() {
        this.ticker = setInterval(()=>this._snap(), this.tickInterval);
    }

    _stop() {
        this.rolling = false;
        clearInterval(this.ticker);
    }

    
}