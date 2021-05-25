

export var DegRad = {
    
    /**
     * Converts an angle to degrees
     * @param {number} angle 
     */
    toDegrees: (angleInRadians) => {
        return (angleInRadians/Math.PI)*180;
    },

    /**
     * Converts an angle to radians
     * @param {number} angleInDegrees
     */
    toRadians: (angleInDegrees) => {
        return (angleInDegrees/180)*Math.PI;
    }
}