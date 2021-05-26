import { Vector3D } from "../schemas/vectors/Vector3D.js";
import { PlaneSystem } from "./PlaneSystem.js";

export var Slicer = {
    
    /** Slices a shape with the XY plane 
     * @param {Vector3D[]} vertices
    */
    sliceByXY: (vertices) => {
        const visible = [];

        const isBeyond = (point) => point.z >= 0;
        const isBehind = (point) => point.z < 0;

        for(let i=0; i<vertices.length; i++) {
            
            const vertex = vertices[i];

            if(i==0) {
                if(isBeyond(vertex)) visible.push(vertex);
            } else {
                const vertexPrev = vertices[i-1];
                if((isBeyond(vertex) && isBehind(vertexPrev)) || 
                    (isBehind(vertex) && isBeyond(vertexPrev))) {
                        const intersection = PlaneSystem.getLineXYIntersection(
                            [vertex, vertexPrev]
                        );
                        visible.push(intersection);
                } else if(isBeyond(vertex) && isBeyond(vertexPrev)) {
                    visible.push(vertex);
                }
            }
        }

        return visible;
    }
};