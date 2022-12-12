import {merge} from "./sc2mod.js";

await merge({
    directory: "./../Mods/all-races-tester/",
    input: [
        // "CORE",
        "LOTV",
        "DRAGON",
        "SCION",
        "NHBR",
        "UED",
        "UPL",
        // "COOP"
    ],
    output: "PVP.SC2Mod/",
})