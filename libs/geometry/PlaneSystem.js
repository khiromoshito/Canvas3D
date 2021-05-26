import { Vector2D } from "../schemas/vectors/Vector2D.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";
import { LineSystem } from "./LineSystem.js";

/** Manages plane equations */
export var PlaneSystem = {
    
    /**
     * Gets point intersection of a 3d line and the XY plane
     * @param {[Vector3D, Vector3D]} line 
     * @returns {Vector3D}
     */
    getLineXYIntersection: (line) => {
        const intXZ = LineSystem.getIntersection(
            [new Vector2D(0, 0), new Vector2D(1, 0)],
            [new Vector2D(line[0].x, line[0].z), 
            new Vector2D(line[1].x, line[1].z)]
        );

        const x = intXZ.x;

        const intXY = LineSystem.getIntersection(
            [new Vector2D(x, 0), new Vector2D(x, 1)],
            [new Vector2D(line[0].x, line[0].y), 
            new Vector2D(line[1].x, line[1].y)]
        );

        const y = intXY.y;

        return new Vector3D(x, y, 0);
    }
}