import { RectFrame3D } from "./RectFrame3D.js";

export class Mesh {
    /**
     * 
     * @param {[MeshVertex[], string][]} faces 
     * @param {RectFrame3D} frame 
     */
    constructor(faces, frame) {

        /** @typedef {[number number number]} MeshVertex */

        /** @type {[MeshVertex[], string][]} */
        this.faces = faces;


        /** @type {RectFrame3D} */
        this.frame = frame;
        
    }
}