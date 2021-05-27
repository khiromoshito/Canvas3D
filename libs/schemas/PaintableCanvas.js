import { Plotter2D } from "../view/Plotter2D.js";
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
        context.clearRect(0, 0, dimensions[0], dimensions[1]);

        shapes.forEach(shape => this.drawShape(context, dimensions, shape));
    }

    /** Draws a shape to the canvas
     * @param {ShapeData} shape
    */
    drawShape(context, dimensions, shape) {
        
        const _fillStyle = context.fillStyle;
        const _lineWidth = context.lineWidth;
        const _strokeStyle = context.strokeStyle;

        
        

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

        context.fillStyle = _fillStyle;
        context.lineWidth = _lineWidth;
        context.strokeStyle = _strokeStyle;
    }
}