import { Plotter3D } from "../geometry/Plotter3D.js";
import { Slicer } from "../geometry/Slicer.js";
import { Camera } from "../schemas/Camera.js";
import { Drawable } from "../schemas/Drawable.js";
import { Mesh } from "../schemas/Mesh.js";
import { Object3D } from "../schemas/Object3D.js";
import { ShapeData } from "../schemas/ShapeData.js";
import { Vector3D } from "../schemas/vectors/Vector3D.js";
import { Plotter2D } from "./Plotter2D.js";

export var Rasterer = {
    
    /**
     * 
     * @param {Object3D | Drawable | Mesh} rasterable 
     * @returns {ShapeData[]}
     */
    raster: (rasterable, camera) => {

        if(rasterable instanceof Object3D)
            return Rasterer.rasterObject(rasterable, camera);
        else if(rasterable instanceof Drawable)
            return Rasterer.rasterDrawable(rasterable, camera);
        else if(rasterable instanceof Mesh)
            return Rasterer.rasterMesh(rasterable, camera);


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

        // First, the object is tested if its bounds are visible (max z is positive)

        const frontTopLeftBound = object.frame.vertices[0];
        const maxZ = Plotter3D.getRelativePosition(camera.position,
            [frontTopLeftBound[0] + object.position.x, 
                frontTopLeftBound[1] + object.position.y, 
                frontTopLeftBound[2] + object.position.z], camera.rotation);

        if(maxZ <= 0) return [];




        const model = object.model;

        if(model instanceof Mesh) 
            return Rasterer.rasterMesh(model, camera, object.position);

        return [];
    },


    /**
     * @param {Drawable} drawable
     * @param {Camera} camera
     * @returns {ShapeData[]} 
     */
    rasterDrawable: (drawable, camera) => {
        //console.time(`Drawable raster time: `);

        let maxZ = 0;

        const relativeVertices = [];
        for(const vertex of drawable.vertices) {
            const relativeVertex = Plotter3D.getRelativePosition(
                camera.position, vertex, camera.rotation);

            if(relativeVertex.z > maxZ) maxZ = relativeVertex.z;

            relativeVertices.push(relativeVertex);
        }
            
        console.log(maxZ);

        if(maxZ > 0) {
            for(let i=0; i<relativeVertices.length; i++)
                relativeVertices[i] = 
                    Plotter2D.getRasteredPosition(relativeVertices[i], camera.perspective);
            

            const rastered = [new ShapeData(relativeVertices, drawable.style, Math.round(maxZ))];
            //console.timeEnd(`Drawable raster time: `);

            return rastered;
        }

    

        //console.timeEnd(`Drawable raster time: `);
        return [];

        // const slicedVertices = Slicer.sliceByXY(relativeVertices);

        // const rasteredVertices = slicedVertices.map(vertex => {
        //     if(vertex.z > maxZ) maxZ = vertex.z;
        //     return Plotter2D.getRasteredPosition(vertex, camera.perspective);
        // });

        // const rastered = [new ShapeData(rasteredVertices, drawable.style, maxZ)];

        

        
    },

    /**
     * @param {Mesh} mesh
     * @param {Camera} camera
     * @param {Vector3D} offset
     * @param {Vector3D} rotation
     * @returns {ShapeData[]} 
     */
    rasterMesh: (mesh, camera, offset) => {
        let shapes = [];


        for(const face of mesh.faces) {


            const relativeVertices = [];
            let maxZ = 0;

            for(const vertex of face[0]) {

                
                const relativeVertex = Plotter3D.getRelativePosition(
                    camera.position,
                    [vertex[0] + offset.x,
                        vertex[1] + offset.y,
                        vertex[2] + offset.z,]
                    , camera.rotation);

                if(relativeVertex[2] > maxZ) maxZ = relativeVertex[2];
                
                

                relativeVertices.push(relativeVertex);
            }
                

            if(maxZ > 0) {

                
                // for(let i=0; i<relativeVertices.length; i++)
                //     relativeVertices[i] = 
                //         Plotter2D.getRasteredPosition(relativeVertices[i], camera.perspective);

                for(let i = 0; i<relativeVertices.length; i++)
                    relativeVertices[i] = Plotter2D.getRasteredPosition(relativeVertices[i], camera.perspective);

                shapes.push(
                    new ShapeData(relativeVertices, 
                        {fillColor: face[1], strokeColor: "black", strokeWidth: 0.5}, maxZ));
            }
        }

        return shapes;
    }
}