import { Vector3D } from "./vectors/Vector3D.js";


export class RectFrame3D {

    /** Represents a rectangular prism frame with position and dimensions.
     *  The position is the center of this frame.
     * @param {{minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number}} options
    */
    constructor(bounds) {
        
        const {minX, maxX, minY, maxY, minZ, maxZ} = bounds;

        /** This frame's 8 vertices
         * @type {[number, number, number][]}
        */
        this.vertices = [
            [minX, maxY, minZ], // leftTopFront
            [maxX, maxY, minZ], // rightTopFront
            [maxX, minY, minZ], // rightBottomFront
            [minX, minY, minZ], // leftBottomFront
            [minX, maxY, maxZ], // leftTopRear
            [maxX, maxY, maxZ], // rightTopRear
            [maxX, minY, maxZ], // rightBottomRear
            [minX, minY, maxZ], // leftBottomRear
        ];

        /** @type {{minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number}} */
        this.bounds = bounds;
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
        const copy = new RectFrame3D({...this.bounds});

        return copy;
    }
}