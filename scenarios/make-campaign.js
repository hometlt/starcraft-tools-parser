import {merge} from "./sc2mod.js";

await merge({
    input: [
        "./input/Core",
        "./input/Liberty",
        "./input/LibertyCampaign",
        "./input/Swarm",
        "./input/SwarmCampaign",
        "./input/Void",
        "./input/VoidCampaign"
    ],
    output: "./output",
})
