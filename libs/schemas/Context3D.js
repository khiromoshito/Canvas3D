import { Collection } from "./Collection.js";
import { Model3D } from "./Model3D.js";
import { Object3D } from "./Object3D.js";
import { Vector3D } from "./vectors/Vector3D.js";


export class Context3D {


    
    /**
     * Manages objects from `Canvas3D` like adding, drawing, removing and plotting.
     * This is the main sandbox of a `Canvas3D`.
     */
    constructor() {

        /**
         * This context's collection of objects
         * @type {Map<String, Object3D>}
         */
        this.objects = new Map();

        this.drawables = new Map();


        this._counter = 0;
    }

    /**
     * Adds an `Object3D`
     * @param {Object3D} object 
     */
    add(object) {
        const oid = ++this._counter;
        object.id = oid;

        this.objects.set(`${oid}`, object);

        console.log(`Added object ${oid}`);
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

    /** Directly draws a line into the 3d canvas 
     * @param {Vector3D | {x: number, y: number, z: number}} p1
     * @param {Vector3D | {x: number, y: number, z: number}} p2
     * @param {{color: string, width: number}} style
    */
    drawLine(p1, p2, style = {}) {

    }

}