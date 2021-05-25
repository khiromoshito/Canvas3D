
export class Vector3D {

    /** 3-dimensional field values
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        
        /** @type {number} */
        this.x = x;

        /** @type {number} */
        this.y = y;

        /** @type {number} */
        this.z = z;
    
    }

    /**
    * Moves the coordinates by increment and returns a corresponding vector
    * 
    * `mutating`: Whether to affect original vector (defaults to true)
    * @param {number} offsetX
    * @param {number} offsetY
    * @param {number} offsetZ
    * @param {boolean} mutating
    * @returns {Vector2D}
    */
    shift(offsetX, offsetY, offsetZ, mutating = true) {

        const newValues = [
            this.x + offsetX, this.y + offsetY, this.z + offsetZ
        ];

        if(mutating)
            return this.set(...newValues);
        else
            return new Vector3D(...newValues);
    }

    /** Changes this vector's coordinates */
    set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    toString() {
        return `V(${this.toArray().join(", ")})`;
    }

    /** Converts this to a 3-item array */
    toArray() {
        return [this.x, this.y, this.z];
    }


    /** Returns a copy of this */
    clone() {
        return new Vector3D(this.x, this.y, this.z);
    }
}