
export class Vector2D {

    /** 2-dimensional field values
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        
        /** @type {number} */
        this.x = x;

        /** @type {number} */
        this.y = y;

    }

    /**
    * Moves the coordinates by increment and returns a corresponding vector
    * 
    * `mutating`: Whether to affect original vector (defaults to true)
    * @param {number} offsetX
    * @param {number} offsetY
    * @param {boolean} mutating
    * @returns {Vector2D}
    */
    shift(offsetX, offsetY, mutating = true) {

        const newValues = [
            this.x + offsetX, this.y + offsetY
        ];

        if(mutating)
            return this.set(...newValues);
        else
            return new Vector2D(...newValues);
    }

    /** Changes this vector's coordinates */
    set(x, y) {
        this.x = x;
        this.y = y;

        return this;
    }

    /** Converts this to a 2-item array */
    toArray() {
        return [this.x, this.y];
    }


    toString() {
        return `V(${this.toArray().join(", ")})`;
    }

    /** Returns a copy of this */
    clone() {
        return new Vector2D(this.x, this.y);
    }
}