import { SCMod } from './src/sc-mod.js';

const mod = new SCMod()
mod.directory('../../Mods/all-races-mods')
await mod.read('VoidBalance','Campaign','Scion','UED','Hybrids','Dragons','UPL','UPLCampaign','UPLBalance','LIB')
await mod.write('../../Mods/ARM.SC2Mod',{scopes: 'all'})