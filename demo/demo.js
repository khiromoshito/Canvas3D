
import { Canvas3D, Camera, MeshParser, Vector3D} from "../libs/index.js";
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
    

    for(let x = -1; x < 2; x++) {
        for(let z = -1; z < 2; z++) {
            ctx.add(mesh, {
                x: x*200,
                y: 0,
                z: z*170
            });
        } 
    }
    


    camera.position = new Vector3D(-267.55, 96.29, -467.96);
    camera.rotation = new Vector3D(-2, 32, 0);





    /////////// IGNORE: Not part of the library //////////
    Controller.initialize(camera);
    window.onkeydown = Controller.keydown;
    window.onkeyup = Controller.keyup;
    //////////////////////////////////////////////////////

}



