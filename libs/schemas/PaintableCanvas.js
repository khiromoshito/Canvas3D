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
        const shapes = data.shapes;
        shapes.forEach(shape => this.drawShape(shape));
    }

    /** Draws a shape to the canvas 
     * @param {ShapeData} shape
    */
    drawShape(shape) {
        const context = this.canvas.getContext("2d");
        const _fillStyle = context.fillStyle;
        const _lineWidth = context.lineWidth;
        const _strokeStyle = context.strokeStyle;

        const dimensions = new Vector2D(this.canvas.width, this.canvas.height);
        
        context.clearRect(0, 0, dimensions.x, dimensions.y);

        context.beginPath();
        for(let i = 0; i<shape.vertices.length; i++) {
            
            const vertex = Plotter2D.getApparentPosition(shape.vertices[i], dimensions);

            if(i===0) context.moveTo(vertex.x, vertex.y);
            else context.lineTo(vertex.x, vertex.y);
        }

        context.closePath();

        context.fillStyle = shape.style.fillColor || "transparent";
        context.lineWidth = shape.style.strokeWidth || 2;
        context.strokeStyle = shape.style.strokeColor || "blue";

        context.fill();
        context.stroke();

        context.fillStyle = _fillStyle;
        context.lineWidth = _lineWidth;
        context.strokeStyle = _strokeStyle;
    }
}