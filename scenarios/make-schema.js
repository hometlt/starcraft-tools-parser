import fs from "fs";
import {SCGame} from '../src/sc-game.js'
import {SCMod} from "../src/sc-mod.js";


const mod = new SCMod()
mod.directory('../../data-input')
await mod.read('0.Core','1.Liberty','2.Liberty Campaign','4.Swarm','5.Swarm Campaign','7.Void','8.Void Campaign')

mod.directory('../../../Mods/all-races-mods')
await mod.read('VoidBalance','Campaign','Scion','UED','Hybrids','Dragons','UPL','UPLCampaign','UPLBalance')

mod.directory('../../../Mods/all-races-core')
await mod.read('Core')


let schema1 = await SCGame.makeSchema({
    group: 'catalog',
    path: '*',
    mod
})
fs.writeFileSync("./input/schema.json", JSON.stringify(schema1, null,"  "))

let schema2 = SCGame.makeSchema({
    group: 'class',
    path: 'CAbil*.InfoArray.index',
    files: [
        "./input/Core.SC2Mod",
        "./input/Liberty.SC2Mod",
        "./input/Swarm.SC2Mod",
        "./input/Void.SC2Mod"
    ]
})