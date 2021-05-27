
import { Canvas3D, Camera, MeshParser} from "../libs/index.js";
import { Controller } from "./controller.js";


window.onload = start;

async function start() {

    // Setups the 3d canvas and the camera
    let canvas3D = new Canvas3D();
    let ctx = canvas3D.context;
    let camera = new Camera({
        canvas: document.querySelector("#cv")
    });


    // Installs the camera to the 3d canvas
    canvas3D.install(camera);
    
    // Fetches obj file, parses it as Mesh model, and adds it to the context
    const file = await (await fetch("./sample.obj")).text();
    const mesh = MeshParser.parseObj(file);
    ctx.add(mesh, {
        x: 0,
        y: 0,
        z: 300
    });





    /////////// IGNORE: Not part of the library //////////
    Controller.initialize(camera);
    window.onkeydown = Controller.keydown;
    window.onkeyup = Controller.keyup;
    //////////////////////////////////////////////////////

}



