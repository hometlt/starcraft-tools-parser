import {merge} from "./sc2mod.js";

await merge({
    directory: "./../Mods/all-races-mods/",
    input: [
        "Scion",
        "UED",
        "Hybrids",
        "Dragons",
        "UPL",
        "UPLCampaign",
        "UPLBalance"
    ],
    output: "MODS.SC2Mod/"
})