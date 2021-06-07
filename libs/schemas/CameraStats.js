

export class CameraStats {
    constructor() {

        /** @typedef {{ticks: number, temp: string | number, value: string | number}} CacheItem */
        
        
        /** @type {Map<string, CacheItem>} */
        this.cache = new Map();

        this.maxTick = 20;
    }



    /**
     * 
     * @param {"averageParseTime" | "parsed"} name 
     * @param {number} value 
     */
    update(name, value) {
        if(!this.cache.has(name)) this.cache.set(name, {
                ticks: 1,
                temp: value,
                value: value
            });

        else {
            const cache = this.cache.get(name);
            cache.temp = typeof value === "number" ? 
                Math.round(((cache.temp + value)/2)*1000)/1000 :
                value;

            if(cache.ticks === this.maxTick) {
                cache.value = cache.temp;
                cache.ticks = 1;
            } else cache.ticks++;
        }
    }


    get(name) {
        return this.cache.get(name)?.value;
    }
}