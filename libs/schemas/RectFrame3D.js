import { Vector3D } from "./vectors/Vector3D.js";


export class RectFrame3D {

    /** Represents a rectangular prism frame with position and dimensions.
     *  The position is the center of this frame.
     * @param {{x: number, y: number, z: number, lx: number, ly: number, lz: number}} options
    */
    constructor(options = {}) {
        
        /** This frame's relative position 
         * @type {Vector3D}
        */
        this.position = new Vector3D(options.x || 0, options.y || 0, options.z || 0);

        /** This frame's side lengths 
         * @type {Vector3D}
        */
        this.lengths = new Vector3D(options.lx || 0, options.ly || 0, options.lz || 0);
    }

    /** Returns an array `Vector3D` corresponding to this frame's eight vertices.
     * 
     * Sequence:
     * 
     *  0 - front top left
     * 
     *  1 - front top right
     * 
     *  2 - front bottom left
     * 
     *  3 - front bottom right
     * 
     *  4 - front bottom left
     * 
     *  5 - rear top left
     * 
     *  6 - rear top right
     * 
     *  7 - rear bottom right
     * 
     *  8 - rear bottom left
     * @returns {Vector3D[]}
    */
    toArray() {

        // Center
        const x = this.position.x;
        const y = this.position.y;
        const z = this.position.z;

        // Half lengths
        const hlx = this.lengths.x / 2;
        const hly = this.lengths.y / 2;
        const hlz = this.lengths.z / 2;

        // Semantic positions
        const left = x - hlx;
        const right = x + hlx;
        const top = y + hly;
        const bottom = y - hly;
        const front = z - hlz;
        const rear = z + hlz;

        return [
            new Vector3D(left, top, front),
            new Vector3D(right, top, front),
            new Vector3D(right, bottom, front),
            new Vector3D(left, bottom, front),
            new Vector3D(left, top, rear),
            new Vector3D(right, top, rear),
            new Vector3D(right, bottom, rear),
            new Vector3D(left, bottom, rear)
        ];
    }

    /** Returns a copy of this */
    clone() {
        const copy = new RectFrame3D();
        copy.position = this.position.clone();
        copy.lengths = this.lengths.clone();

        return copy;
    }
}