
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
    * Moves the values by increment and returns a corresponding vector
    * 
    * `mutating`: Whether to affect original vector (defaults to true)
    * @param {number} x 
    * @param {number} y 
    * @param {number} z 
    * @param {Boolean} mutating
    */
    shift(x, y, z, mutating = true) {
        
        const newValues = [
            this.x + x,
            this.y + y,
            this.z + z
        ];

        if(mutating) {
            this.x = newValues[0];
            this.y = newValues[1];
            this.z = newValues[2];
        }
        
        return new Vector3D(...newValues);
    }

    toString() {
        return `V(${this.x}, ${this.y}, ${this.z})`;
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