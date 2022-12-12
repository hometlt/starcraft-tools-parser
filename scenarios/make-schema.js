import fs from "fs";
import {SCGame} from './sc-game.js'


let schema1 = SCGame.makeSchema({
    group: 'catalog',
    path: '*',
    files: [
        "./input/Core.SC2Mod",
        "./input/Liberty.SC2Mod",
        "./input/Swarm.SC2Mod",
        "./input/Void.SC2Mod",
        "./input/LibertyCampaign.SC2Mod",
        "./input/SwarmCampaign.SC2Mod",
        "./input/VoidCampaign.SC2Mod",
        "./input/VoidBalance.SC2Mod"
    ]
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