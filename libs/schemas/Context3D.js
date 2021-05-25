import { Model3D } from "./Model3D.js";
import { Object3D } from "./Object3D.js";

export class Context3D {
    
    /**
     * Manages objects from `Canvas3D` like adding, drawing, removing and plotting.
     * This is the main sandbox of a `Canvas3D`.
     */
    constructor() {

    }

    /**
     * Adds an `Object3D`
     * @param {Object3D} object 
     */
    add(object) {

    }


    /**
     * Adds a 3d object by forming it from a raw model and object properties
     * @param {Model3D} model 
     * @param {{x:number, y:number, z:number, rx:number, ry:number, rz:number}} options 
     */
    addRaw(model, options = {}) {
        const object = new Object3D(model, options);
        this.add(object);
    }

}