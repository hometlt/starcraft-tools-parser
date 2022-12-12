import {merge} from "./sc2mod.js";
import {SCMod} from "./starcraft";

await merge({
    input: [
        "./input/Core",
        "./input/Liberty",
        "./input/LibertyCampaign",
        "./input/Swarm",
        "./input/SwarmCampaign",
        "./input/Void",
        "./input/VoidCampaign",
        "./../Mods/all-races-mods/VoidBalance",
        "./../Mods/all-races-coop/Campaign",
        "./../Mods/all-races-mods/Scion"  ,
        "./../Mods/all-races-mods/UED",
        "./../Mods/all-races-mods/Hybrids",
        "./../Mods/all-races-mods/Dragons",
        "./../Mods/all-races-mods/UPL",
        "./../Mods/all-races-mods/UPLCampaign",
        "./../Mods/all-races-mods/UPLBalance",
        "./../Mods/all-races-mods/Talon",
        "./../Mods/all-races-coop/Core",
        "./../Mods/all-races-mods/WarCraft",
    ],
    output: "./output/",
})

//
// export async function merge({input,output}){
//     let mod = await SCMod.from(...input)
//     await mod.write(output)
// }