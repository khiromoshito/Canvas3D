
const KEYS = {
    "87": ["p", [0, 0, 1]],
    "65": ["p", [-1, 0, 0]],
    "83": ["p", [0, 0, -1]],
    "68": ["p", [1, 0, 0]],
    "38": ["r", [1, 0, 0]],
    "37": ["r", [0, -1, 0]],
    "40": ["r", [-1, 0, 0]],
    "39": ["r", [0, 1, 0]]
};
var ACTIVE_KEYS = [];

const SHIFT_STEPS = 10;
const TILT_STEPS = 2;
const TICK_INTERVAL = 30;

let camera;

function motionTick() {
    if(!camera) return;
    for(const key of ACTIVE_KEYS) {
        const motion = KEYS[key];
        
        if(motion[0]==="p") camera.shift(...motion[1].map(i=>i*SHIFT_STEPS))
        else if(motion[0]==="r") camera.tilt(...motion[1].map(i=>i*TILT_STEPS))
    }

    //camera._snap();
    update();
}


function update() {
    const c = document.querySelector("#c");
    const pos = camera.position.toArray().map(c=>Math.round(c*100)/100);
    const rot = camera.rotation.toArray().map(c=>Math.round(c*100)/100);
    c.innerHTML = `Position: (${pos[0]}, ${pos[1]}, ${pos[2]})
        <br>Rotation: (${rot[0]}, ${rot[1]}, ${rot[2]})
        <br>Avg Parse Time: ${camera.stats.averageParseTime}ms`;
}

export var Controller = {

    /** Setups the controller */
    initialize: (cam) => {
        camera = cam;
        setInterval(motionTick, TICK_INTERVAL);
    },

    /** Triggers keydown and checks for any valid actions corresponding to the key  */
    keydown: (keyEvent) => {
        const code = `${keyEvent.keyCode}`;
        if(!ACTIVE_KEYS.includes(code) && KEYS[code]) ACTIVE_KEYS.push(code);
    },

    /** Triggers keyup and checks for any valid actions corresponding to the key  */
    keyup: (keyEvent) => {
        const code = `${keyEvent.keyCode}`;
        if(ACTIVE_KEYS.includes(code)) ACTIVE_KEYS = ACTIVE_KEYS.filter(key=>key!==code);
    }
}