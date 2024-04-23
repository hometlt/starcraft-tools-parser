import * as SCParser from "./index.js";
let mod = await SCParser.createMod({
    mods: [
        'C:\\Program Files (x86)\\StarCraft II\\mods\\all-races-mods\\dependencies\\Campaigns.SC2Mod',
        'C:\\Program Files (x86)\\StarCraft II\\mods\\all-races-mods\\dependencies\\CampaignsCoop.SC2Mod'
    ]
})

await mod.write( 'C:\\Program Files (x86)\\StarCraft II\\mods\\all-races-mods\\dependencies\\Campaigns2.SC2Mod', {
    text: {
        Name: `mod name`,
        DescLong: `combined mod`,
        DescShort: `1-12 players`,
        Signature: `<n/>mod By Visceroid<n/>ALL RACES COOP<n/>ponomarevtlt@gmail.com`,
        Website: `https://discord.gg/2RbcjRkddw`
    }
})
console.log("Finished!")