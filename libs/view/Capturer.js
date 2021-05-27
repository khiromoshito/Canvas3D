import { Plotter3D } from "../geometry/Plotter3D.js";
import { Canvas3D } from "../schemas/Canvas3D.js";
import { ShapeData } from "../schemas/ShapeData.js";
import { StreamData2D } from "../schemas/StreamData2D.js";
import { Plotter2D } from "./Plotter2D.js";
import { Rasterer } from "./Rasterer.js";

export var Capturer = {

    /** Captures a snapshot of the canvas with a camera and exports the data as `StreamData2D`
     * @param {Canvas3D} canvas
     * @param {Camera} camera
     * @returns {StreamData2D}
     */
    capture3D: (canvas, camera) => {
        const objects = canvas.context.objects;
        const data = new StreamData2D();

        for(const obkey of objects.keys()) {
            const obj = objects.get(obkey);

            const rastered = Rasterer.raster(obj, camera);
            // console.log(rastered);
            for(const rasteredShape of rastered) 
                data.add(rasteredShape);
        }

        return data;
    }
}