

export class CameraStats {
    constructor() {

        this.cache = {
            "averageParseTime": 0
        };


        /** @type {Number} */
        this.averageParseTime = 0;

        /** @type */
        this.averageParseTimeTick = 0;

        this.maxTick = 20;
    }



    /**
     * 
     * @param {"averageParseTime"} name 
     * @param {number} value 
     */
    update(name, value) {
        if(name==="averageParseTime") {
            if(this.parseTimeTick === 0)
                this.averageParseTime = value;
            else {
                this.cache["averageParseTime"] = Math.round(((this.cache["averageParseTime"] + value)/2)*1000)/1000;
        
                if(this.averageParseTimeTick === this.maxTick) {
                    this.averageParseTime = this.cache["averageParseTime"];
                    this.averageParseTimeTick = 1;
                } else this.averageParseTimeTick++;
            }
                
        }
    }
}