import { Plotter3D } from "../geometry/Plotter3D.js";
import { Plotter2D } from "../view/Plotter2D.js";
import { Camera } from "./Camera.js";
import { ShapeData } from "./ShapeData.js";
import { StreamData2D } from "./StreamData2D.js";
import { Vector2D } from "./vectors/Vector2D.js";

export class PaintableCanvas {
    /**
     * An extended HTML Canvas for painting 2d data to a canvas
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
    }

    /** Renders 2d shapes data into canvas 
     * @param {StreamData2D} data
    */
    render(data) {
        const shapes = data.getShapes();
        const context = this.canvas.getContext("2d");
        const dimensions = [this.canvas.width, this.canvas.height];
        const dimensionsHalves = [dimensions[0]/2, dimensions[1]/2];
        context.clearRect(0, 0, dimensions[0], dimensions[1]);

        const _fillStyle = context.fillStyle;
        const _lineWidth = context.lineWidth;
        const _strokeStyle = context.strokeStyle;

        shapes.forEach(shape => this.drawShape(context, dimensions, dimensionsHalves, shape));


        context.fillStyle = _fillStyle;
        context.lineWidth = _lineWidth;
        context.strokeStyle = _strokeStyle;
    }


    /**
     * 
     * @param {Camera} camera 
     */
    drawGround(camera) {
        const context = this.canvas.getContext("2d");
        const dimensions = [this.canvas.width, this.canvas.height];
        const lines = [];

        const size = 70;

        for(let x = -5; x <= 5; x++) {
            let xx = camera.position.x + (x*size) - (camera.position.x % size);
            let yy = camera.position.y - 100;
            let zz = camera.position.z;
            let line = [[xx, yy, zz + 0.99], [xx, yy, zz + 50000]];

            line[0] = Plotter3D.getRelativePosition(
                camera.position, line[0], camera.rotation);
            line[1] = Plotter3D.getRelativePosition(
                camera.position, line[1], camera.rotation);

            line[0] = Plotter2D.getRasteredPosition(line[0], camera.perspective);
            line[1] = Plotter2D.getRasteredPosition(line[1], camera.perspective);

            line[0] = Plotter2D.getApparentPosition(line[0], dimensions);
            line[1] = Plotter2D.getApparentPosition(line[1], dimensions);

            lines.push(line);
        }

        context.beginPath();
        context.strokeStyle = "black";
        context.lineWidth = 1;
        for(const line of lines) {
            context.moveTo(line[0][0], line[0][1]);
            context.lineTo(line[1][0], line[1][1]);
            context.stroke();
        }
    }

    /** Draws a shape to the canvas
     * @param {ShapeData} shape
    */
    drawShape(context, dimensions, dimensionsHalves, shape) {
        


        
        // // Get bounds
        let minX = 0;
        let maxX = 0;
        let minY = 0;
        let maxY = 0;

        for(const v of shape.vertices) {
            if(v[0]<minX) minX = v[0]; else 
            if(v[0]>maxX) maxX = v[0];
            if(v[1]<minY) minY = v[1]; else
            if(v[1]>maxY) maxY = v[1];
        }

        if(maxX < -dimensionsHalves[0] || minX > dimensionsHalves[0] || 
            maxY < -dimensionsHalves[1] || minY > dimensionsHalves[1]) return;

        context.beginPath();
        for(let i = 0; i<shape.vertices.length; i++) {
            
            const vertex = Plotter2D.getApparentPosition(shape.vertices[i], dimensions);

            if(i===0) context.moveTo(vertex[0], vertex[1]);
            else context.lineTo(vertex[0], vertex[1]);

            //console.log(vertex);
        }

        context.closePath();

        context.fillStyle = shape.style.fillColor || "transparent";
        context.lineWidth = shape.style.strokeWidth || 0;
        context.strokeStyle = shape.style.strokeColor || "transparent";

        context.fill();
        context.stroke();

    }
}