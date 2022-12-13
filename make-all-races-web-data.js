import { SCMod } from './src/sc-mod.js';

const mod = new SCMod()

mod.directory('../data-input')
await mod.read('0.Core','1.Liberty','2.Liberty Campaign','4.Swarm','5.Swarm Campaign','7.Void','8.Void Campaign')

mod.directory('../../Mods/all-races-mods')
await mod.read('VoidBalance','Campaign','Scion','UED','Hybrids','Dragons','UPL','UPLCampaign','UPLBalance')

mod.directory('../../Mods/all-races-core')
await mod.read('Core')

//save data in JSON format to use on Web
await mod.write('../data-editor/data', {format: 'json', resolve: true, scopes: ['data','locales']})