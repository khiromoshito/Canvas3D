
export class Collection {

    /**
     * A collection of objects that can be stored by groups
     */
    constructor() {

        /** **[Fragile, DO NOT EDIT]** */
        this._bins = {};

        /** **[Fragile, DO NOT EDIT]** */
        this._misc = {};

    }

    /** Saves a value to this collection, together with a key 
     * @param {String} key
     * @param {any} value
    */
    save(key, value) {
        this._misc[key] = value;
    }

    /** Saves a value to a group on this collection, together with a key 
     * @param {String} group
     * @param {String} key
     * @param {any} value
    */
    saveByGroup(group, key, value) {
        if(this._bins[group] === undefined)
            this._bins[group] = {};

        this._bins[group][key] = value;
    }


    /**
     * Finds an object by iterating through all entries and 
     * expecting for a return value of `true`
     * @param {(item:any)=>boolean} filter 
     */
    find(filter) {
        for(const key in this._misc) {
            const item = this._bins[group][key];
            if(filter(item) === true) return item;
        }

        for(const group in this._bins) {
            for(const key in this._bins[group]) {
                const item = this._bins[group][key];
                if(filter(item) === true) return item;
            }
        }
    }

    /**
     * Finds an object (from a group) by iterating through all entries and 
     * expecting for a return value of `true`
     * @param {string} group
     * @param {(item:any)=>boolean} filter 
     */
    findByGroup(group, filter) {
        if(this._bins[group]) {
            for(const key in this._bins[group]) {
                const item = this._bins[group][key];
                if(filter(item) === true) return item;
            }
        }
    }


}