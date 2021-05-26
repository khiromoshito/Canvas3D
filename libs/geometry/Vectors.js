import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";


export var Vectors = {

    /**
     * Gets the distance between two points
     * @param {Vector2D | Vector3D} p1 
     * @param {Vector2D | Vector3D} p2 
     */
    getDistance: (p1, p2) => {
        const squareDiffs = Vectors.subtract(p1, p2).toArray().map(diff=>diff**2);
        const distance = Math.sqrt(squareDiffs.reduce((a, b)=>a+b));

        return distance;
    },

    /** Gets the difference between two vectors
     * @param {Vector2D | Vector3D} p1 
     * @param {Vector2D | Vector3D} p2
     * @returns {Vector2D | Vector3D}
     */
    subtract: (p1, p2) => {
        const points1 = p1.toArray();
        const points2 = p2.toArray();

        const diffs = points1.map((coord1, i)=>coord1 - (points2[i] || 0));
        return diffs.length === 2 ? new Vector2D(...diffs) : new Vector3D(...diffs);
    },

    equal: (p1, p2) => {
        return p1.x === p2.x && p1.y === p2.y;
    }

}