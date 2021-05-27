import { ShapeData } from "./ShapeData.js"


export class StreamData2D {
    /**
     * Composed of 2d shapes as a data to be streamed through a `ViewStreamer`
     * @param {number} range
     */
    constructor(rangeExponent = 7) {

        this._counter = 0;

        this.rangeExponent = rangeExponent;

        /** @type {Map<String, ShapeData>} */
        this.collection = new Map();

        this.idList = [];
    }

    getShapes() {
        const shapes = [];

        const shapesId = this.idList.sort().reverse();
        for(const shapeId of shapesId)
            shapes.push(this.collection.get(shapeId));


        return shapes;
    }

    /** @param {StreamData2D} data */
    concat(data) {
        for(const shapeid of data.collection.keys())
            this.collection.set(shapeid, data.collection.get(shapeid));
    }

    /**
     * Adds a shape
     * @param {ShapeData} shape
     */
    add(shape) {

        const idNum = shape.z+"";
        try {
            const id = `${"0".repeat(this.rangeExponent - idNum.length)}${idNum}#${++this._counter}`;
            this.collection.set(id, shape);
            this.idList.push(id);
        } catch {
            throw new Error(idNum);
            
        }
        
    }

}