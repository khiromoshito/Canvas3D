import { Model3D } from "./Model3D.js";
import { RectFrame3D } from "./RectFrame3D.js";
import { Vector3D } from "./vectors/Vector3D.js";

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


        /** This object's relative position on its parent 
         * @type {Vector3D}
        */
        this.position = new Vector3D(options.x || 0, options.y || 0, options.z || 0);


        /** This object's rotation
         * @type {Vector3D}
        */
        this.rotation = new Vector3D(options.rx || 0, options.ry || 0, options.rz || 0);


        /** This object's maximum bounds
         * @type {RectFrame3D}
         */
        this.frame = this.model.frame.clone();

    }

    /** Returns a copy of this */
    clone() {
        const copy = new Object3D();
        copy.model = this.model.clone();
        copy.position = this.position.clone();
        copy.rotation = this.rotation.clone();
        copy.frame = this.frame.clone();

        return copy;
    }
}
