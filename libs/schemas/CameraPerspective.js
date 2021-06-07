

export class CameraPerspective {
    constructor(angle, constant) {
        this.angle = angle;
        this.constant = constant;
    }

    /** Creates a copy of this */
    clone() {
        return new CameraPerspective(this.angle, this.constant);
    }
}