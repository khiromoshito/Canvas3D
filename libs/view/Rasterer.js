import { Plotter3D } from "../geometry/Plotter3D.js";
import { Slicer } from "../geometry/Slicer.js";
import { Camera } from "../schemas/Camera.js";
import { Drawable } from "../schemas/Drawable.js";
import { Object3D } from "../schemas/Object3D.js";
import { ShapeData } from "../schemas/ShapeData.js";
import { Plotter2D } from "./Plotter2D.js";

export var Rasterer = {
    
    /**
     * 
     * @param {Object3D | Drawable} rasterable 
     * @returns {ShapeData[]}
     */
    raster: (rasterable, camera) => {
        if(rasterable instanceof Object3D)
            return Rasterer.rasterObject(rasterable, camera);
        else if(rasterable instanceof Drawable)
            return Rasterer.rasterDrawable(rasterable, camera);


        console.log(`Found non-rasterable`);
        return [];

    },


    /**
     * 
     * @param {Object3D} object
     * @param {Camera} camera
     * @returns {ShapeData[]} 
     */
    rasterObject: (object, camera) => {
        const frame = object.frame;
        const vertices = frame.toArray();

        const faces = [
            vertices.slice(0, 4),
            vertices.slice(4)
        ];

        const rasteredFaces = faces.map(face=>{
            const rasteredVertices = face
            .map(vertex => {
    
                const relativePos = Plotter3D.getRelativePosition(
                    camera.position, vertex, camera.rotation);
    
    
                const rasteredPos = Plotter2D.getRasteredPosition(relativePos);
    
                return rasteredPos;
            });

            const slicedVertices = Slicer.sliceByXY(rasteredVertices);
            return new ShapeData(slicedVertices);
        });
        

        return rasteredFaces;
    },


    /**
     * 
     * @param {Drawable} drawable
     * @returns {ShapeData[]} 
     */
    rasterDrawable: (drawable, camera) => {

        let maxZ = 0;

        const relativeVertices = drawable.vertices.map(vertex => {
            const relativeVertex = Plotter3D.getRelativePosition(
                camera.position, vertex, camera.rotation);

            return relativeVertex;
        });

        const slicedVertices = Slicer.sliceByXY(relativeVertices);

        const rasteredVertices = slicedVertices.map(vertex => {
            if(vertex.z > maxZ) maxZ = vertex.z;
            return Plotter2D.getRasteredPosition(vertex, camera.perspective);
        });

        return [new ShapeData(rasteredVertices, drawable.style, maxZ)];
    }
}