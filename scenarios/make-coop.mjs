import {merge} from "./sc2mod.js";

await merge({
    input: [
        //"all-races-mods/assets/Scion",
        //"all-races-mods/assets/Hybrids",
        //"all-races-mods/assets/Talon",
        //"all-races-mods/assets/UED",
        //"all-races-mods/assets/Dragons",
        //"all-races-mods/assets/UPL",
        //"all-races-mods/assets/UPLCampaign",
        //"all-races-mods/assets/COOP",
        //"all-races-mods/assets/LOTC",
        //"all-races-mods/assets/WarCraft",
        "./../Mods/all-races-mods/VoidBalance",
        "./../Mods/all-races-coop/Campaign",
        "./../Mods/all-races-mods/Scion",
        "./../Mods/all-races-mods/UED",
        "./../Mods/all-races-mods/Hybrids",
        "./../Mods/all-races-mods/Dragons",
        "./../Mods/all-races-mods/Talon",
        "./../Mods/all-races-mods/UPL",
        "./../Mods/all-races-mods/UPLCampaign",
        "./../Mods/all-races-mods/UPLBalance"
    ],
    output: "./../Mods/all-races-coop/MODS.SC2Mod",
})
