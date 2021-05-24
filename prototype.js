import { Canvas3D } from "./public/canvas3d/bin/configs/Canvas3D";


const canvas3d = new Canvas3D();
const camera = new Camera();

const canvas = document.querySelector("#cv");

canvas3d.setCamera(camera);
canvas3d.start(canvas, {
    quality: 100
});



// Canvas methods
const context = canvas3d.context3d;
const screen = canvas3d.context2d;


/**
 * This is a box, a model for an object. 
 * 
 * This is not the object itself, because it's only a model. 
 * It only becomes an object once it is added to the canvas.
 * 
 * Since it's not yet an object, it cannot have position properties.
 * 
 * `Box` and other models are extended from the Model class.
 */
const box = new Box({
    width: 100, height: 100, depth: 100,
    
});

/**
 * This is an object. The canvas is composed of objects.
 * 
 * An object has position and rotation properties that
 * define its placement on the canvas. 
 * 
 * An object also has a model which defines its form.
 * Without a model, an object is just an abstract value,
 * because it does not have a form of itself.
 */
const obj = new Object3D({
    model: box,
    x: 10, y: 10, z: 10,
    rx: 0, ry: 0, rz: 10
});



const group = new Group({

});


// Camera methods
camera.position = new Vector3D(0, 0, 0);

camera.position.set(10, 10, 100);
camera.position.setX(100);

camera.angle.set(0, 0, 10);
camera.scale.set();
