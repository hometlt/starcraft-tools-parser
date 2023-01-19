import { SCMod } from './src/sc-mod.js';

const mod = new SCMod()
mod.directory('../../Mods/all-races-tester')
await mod.read( "LOTV", "DRAGON", "SCION", "NHBR", "UED", "UPL")
await mod.write('../../Mods/all-races-tester/PVP.SC2Mod',{scopes: ['triggers', 'locales', 'styles', 'layouts', 'data']})

