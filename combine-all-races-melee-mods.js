import { SCMod } from './src/sc-mod.js';

const mod = new SCMod()
mod.directory('../../Mods/all-races-mods')
await mod.read('Scion','UED','Hybrids','Dragons','UPL','UPLBalance','LIB','PVP')
await mod.write('../../Mods/PVP.SC2Mod',{scopes: 'all'})