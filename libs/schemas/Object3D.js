import { Model3D } from "./Model3D.js";

export class Object3D {
    /**
     * A single unit for an object in the 3D canvas. 
     * This has a model property where its form is taken.
     * 
     * @param {Model3D} model
     * @param {{x:number, y:number, z:number, rx:number, ry:number, rz:number}} options
     */
    constructor(model = new Model3D(), options = {}) {

        /** This 3d object's visual model 
         * @type {Model3D}
        */
        this.model = model;
    }
}
