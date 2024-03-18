import * as SCParser from "./index.js";
import fs from 'fs'

SCParser.SCGame.directories.mods = `C:\\Program Files (x86)\\StarCraft II\\mods\\all-races-mods`

// let mod = await SCParser.createMod({mods: ['./xx.json']})

let mod = await SCParser.createMod({
    //data from 'core' mods will not be added to the output modR
    core: [
        '$mods/dependencies/Core',
        '$mods/dependencies/Base',
        '$mods/dependencies/LegacyCoop',
    ],
    mods: [
        // '$mods/dependencies/Legacy',
        // '$mods/factions/Scion',
        // '$mods/factions/Dragons',
        // '$mods/factions/Hybrids',
        // '$mods/factions/UED',
        // '$mods/factions/UPL',
        // '$mods/factions/UPLMulti',
        // '$mods/other/factions-other/Erls',

        '$mods/factions/Nexus',
        // '$mods/factions/ProtossTalon',
        // '$mods/factions/Colonial',
        // '$mods/factions/Tyranid',
        // '$mods/factions/Umojan',
        // '$mods/factions/WarCraft',
        // '$mods/factions/UPLCampaign',
    ]
})




// for(let entity of mod.entities){
//     if(entity.__core){
//         entity.$core = 1
//     }
// }
// mod.write('xxx.json')

//mod.makeAbilCmds()

//do not add the following entities and its children to the output data
/*mod.ignoreEntities({
    unit: [
        "DESTRUCTIBLE",
        "POWERUP",
        "STARMAP",
        "SS_Plane",
        "SS_BackgroundSpace",
        "Shape",
        "MISSILE_INVULNERABLE",
        "MISSILE",
        "MISSILE_HALFLIFE",
        "PLACEHOLDER",
        "PLACEHOLDER_AIR",
        "PATHINGBLOCKER",
        "BEACON",
        "SMCHARACTER",
        "SMCAMERA",
        "SMSET",
        "ITEM",
    ]
})*/

//pick specific races
// mod.pick({race: ["Nafash"]})

// mod.pick({unit: ["CerberusHunter"]})


mod.filter()

await mod.write( 'C:\\Program Files (x86)\\StarCraft II\\TOOLS\\parser\\outputNexus.SC2Mod', {
    text: {
        Name: `mod name`,
        DescLong: `combined mod`,
        DescShort: `1-12 players`,
        Signature: `<n/>mod By Visceroid<n/>ALL RACES COOP<n/>ponomarevtlt@gmail.com`,
        Website: `https://discord.gg/2RbcjRkddw`
    }
})
console.log("Finished!")

// for (let file in output){
//     fs.writeFileSync('./../wiki/src/data/erls/' + file + '.json', SCParser.formatData(output[file],'json' ),'utf-8')
// }