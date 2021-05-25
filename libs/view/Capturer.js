import { Plotter3D } from "../geometry/Plotter3D.js";
import { Canvas3D } from "../schemas/Canvas3D.js";
import { ShapeData } from "../schemas/ShapeData.js";
import { StreamData2D } from "../schemas/StreamData2D.js";
import { Plotter2D } from "./Plotter2D.js";

export var Capturer = {

    /** Captures a snapshot of the canvas with a camera and exports the data as `StreamData2D`
     * @param {Canvas3D} canvas
     * @param {Camera} camera
     * @returns {StreamData2D}
     */
    capture3D: (canvas, camera) => {
        const objects = canvas.context.objects;
        const data = new StreamData2D();

        console.log("Camera position: ", camera.position.toArray());

        for(const obkey of objects.keys()) {
            const obj = objects.get(obkey);

            const frame = obj.frame;
            const vertices = frame.toArray();
            
            const flatVertices = vertices
            .map(vertex => {

                const relativePos = Plotter3D.getRelativePosition(
                    camera.position, vertex, camera.rotation);

                const rasteredPos = Plotter2D.getRasteredPosition(relativePos);
                console.log(relativePos.toArray(), rasteredPos.toArray());

                return rasteredPos;
            });

            const shape = new ShapeData(flatVertices);
            data.shapes.push(shape);
        }

        return data;
    }
}