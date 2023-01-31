import {SCMod} from "./src/sc-mod.js";
let mod = new SCMod()
mod.directory('..')
await mod.readLibrary('Core')
await mod.read(
    'Core - Liberty',
    'Core - Swarm',
    'Core - Void',
    'Core - VoidMulti'
)
mod.pick({race: ["Terr","Zerg","Prot"]})
mod.renameEntities('LOTV*');
await mod.write('MP - Void.SC2Mod')