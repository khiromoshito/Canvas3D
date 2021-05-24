import { Context3D } from "./Context3D.js";


export class Canvas3D {

    /**
     * Main 3d canvas object where all 3d manipulations are maneuvered.
     */
    constructor() {

        /** The context for this canvas where object transactions are made 
         * @type {Context3D}
        */
        this.context = new Context3D();
    }

    /**
     * Installs a camera and starts rendering.
     * 
     * Multiple cameras for multiple canvases can be installed for multiple-perspective viewing.
     * @param {Camera} camera 
     * @param {{quality: number}} options 
     */
    install(camera, options = {}) {
        
    }

    /**
     * Detaches a camera
     * @param {Camera} camera
     */
    uninstall(camera) {

    }


}

