import { Mesh } from "../schemas/Mesh.js";
import { RectFrame3D } from "../schemas/RectFrame3D.js";

export var MeshParser = {
    
    /**
     * Parses mesh from OBJ format
     * @param {string} str 
     * @returns {Mesh}
     */
    parseObj: (str) => {
        const lines = str.split("\n");

        /**
         * @type {[number, number, number][]}
         */
        const vertices = [];

        /**
         * @type {[number, number, number][]}
         */
        const vertexNormals = [];

        /**
         * @typedef {[number, number, number]} MeshVertex
         * @type {MeshVertex[]}
         */
        const faces = [];

        const textures = [];


        const bounds = {
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0,
            minZ: 0,
            maxZ: 0
        };

        for(const line of lines) {
            if(line.startsWith("#")) continue;

            const args = line.trim().split(/ +/);
            if(args[0]==="v") {
                const vertex = args.slice(1, 4).map(c=>Number(c));
                vertices.push(vertex);
            } else if(args[0]==="vn") {
                const vertex_normal = args.slice(1, 4).map(c=>Number(c));
                vertexNormals.push(vertex_normal);
            } else if(args[0]==="f") {
                const face_vertices = [];
                for(const vertex of args.slice(1)) {
                    const vertex_opts = vertex.split("/");

                    const vertex_origin_index = Number(vertex_opts[0]);
                    const vertex_normal_index = Number(vertex_opts[2]);

                    const vertex_origin = vertices[vertex_origin_index-1];
                    
                    if(vertex_origin[0] < bounds.minX) bounds.minX = vertex_origin[0];
                    if(vertex_origin[0] > bounds.maxX) bounds.maxX = vertex_origin[0];

                    if(vertex_origin[1] < bounds.minY) bounds.minY = vertex_origin[1];
                    if(vertex_origin[1] > bounds.maxY) bounds.maxY = vertex_origin[1];

                    if(vertex_origin[2] < bounds.minZ) bounds.minZ = vertex_origin[2];
                    if(vertex_origin[2] > bounds.maxZ) bounds.maxZ = vertex_origin[3];
                    
                    
                    //const vertex_normal = vertex_normal_index ? vertexNormals[vertex_normal_index-1] : [0,0,0];

                    face_vertices.push(vertex_origin);

                    // face_vertices.push([
                    //     vertex_origin[0] + vertex_normal[0],
                    //     vertex_origin[1] + vertex_normal[1],
                    //     vertex_origin[2] + vertex_normal[2]
                    // ]);
                }

                faces.push([face_vertices, "blue"]);
            }
        }

        //console.log({vertices});

        return new Mesh(faces, new RectFrame3D(bounds));
    }
};