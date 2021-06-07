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

    // groupFrames() {
    //     function getGroupIndex(z) {
    //         if(z < 50) return 0;
    //         if(z < 100) return 1;
    //         if(z < 150) return 2;
    //         if(z < 200) return 3;
    //         if(z < 250) return 4;
    //         if(z < 300) return 5;
    //         if(z < 350) return 6;
    //         if(z < 400) return 7;
    //         if(z < 450) return 8;
    //         return 9;
    //     }

    //     const groups = [
    //         [], [], [], [], [], [], [], [], [], []
    //     ];
    // }
}