import { ExceptionHadler } from "../handlers/ExceptionHandler.js";
import { Collection } from "./Collection.js";
import { Mesh } from "./Mesh.js";
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
     * Adds a model to the canvas with object options
     * @param {Mesh | Model3D} object
     * @param {{x?:number, y?:number, z?:number, rx?:number, ry?:number, rz?:number}} options 
     */
    add(model, options = {}) {

        if(!(model instanceof Mesh || model instanceof Model3D))
            ExceptionHadler.throw("context3d", "Only `Mesh` and `Model3D` instances can be added to the context");

        let object = new Object3D(model, options);

        const oid = ++this._counter;
        object.id = oid;

        this.objects.set(`${oid}`, object);
    }


    /** Directly draws a line into the 3d canvas 
     * @param {Vector3D | {x: number, y: number, z: number}} p1
     * @param {Vector3D | {x: number, y: number, z: number}} p2
     * @param {{color: string, width: number}} style
    */
    drawLine(p1, p2, style = {}) {

    }

}