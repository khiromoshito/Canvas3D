
export var ExceptionHadler = {
    sources: {
        "context3d": "Context3D"
    },

    /**
     * 
     * @param {"context3d"} source 
     * @param {string} message 
     */
    throw: (source, message) => {
        const origin = ExceptionHadler.sources[source] | "Unknown";
        throw new Error(`Canvas3D Exception (${origin}): ${message}`);
    }
}