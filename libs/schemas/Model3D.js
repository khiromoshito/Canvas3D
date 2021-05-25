import { RectFrame3D } from "./RectFrame3D.js";

export class Model3D {
    /**
     * Makes up the matter of an `Object3D` which possesses the visuals.
     * This does not have relative properties like position or rotation.
     * 
     * @param {{height: number, width: number, depth: number, color: blue}} options
     */
    constructor(options = {}) {
        
        /** This model's maximum bounds */
        this.frame = new RectFrame3D({
            lx: options.width || 0,
            ly: options.height || 0,
            lz: options.depth || 0
        });
    }

    /** Returns a copy of this */
    clone() {
        const copy = new Model3D();
        copy.frame = this.frame.clone();

        return copy;
    }
}