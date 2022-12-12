import {merge} from "./sc2mod.js";

await merge({
    input: [
        "./input/Core",
        "./input/Liberty",
        "./input/Swarm",
        "./input/Void",
        "./input/VoidBalance",
    ],
    output: "./output/lotv",
})
