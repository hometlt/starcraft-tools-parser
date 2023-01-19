import { SCMod } from './src/sc-mod.js';

const mod = new SCMod()
mod.directory('../../Mods/nathan')
await mod.read('Merge 1.SC2Mod','Merge 2.SC2Mod','Merge 3.SC2Mod')
await mod.write('../../Mods/nathan/merged.SC2Mod',{scopes: 'all'})