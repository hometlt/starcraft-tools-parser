import {SCMod} from "./src/sc-mod.js";
import {getDebugInfo} from "./src/operations.js";

let prefix = ''
let output = ''
let input = []
let test = false

let mode = process.argv[2]?.toLowerCase() || 'Coop';

let shortcuts = {
    Test: ['t'],
    Broodwar: ['b','bw'],
    Liberty: ['l','wol'],
    Swarm: ['s','hots'],
    Void: ['v','lotv']
}
if(mode){
    for(let m in shortcuts){
        if(shortcuts[m].includes(mode)){
            mode = m;
            break;
        }
    }
}
console.log(`Active Config: ${mode}`)

let mod = new SCMod()
mod.directory('../../Mods/all-races-mods')
await mod.read('Core - Core')
mod.saveCore()

switch(mode){
    case 'Liberty': {
        input = [
            'Core - Liberty',
            'Core - LibertyMulti'
        ]
        prefix = 'WOL'
        output = 'MP - Liberty'
        break;
    }
    case 'Swarm': {
        input = [
            'Core - Liberty',
            'Core - Swarm',
            'Core - SwarmMulti'
        ]
        prefix = 'HOTS'
        output = 'MP - Swarm'
        break;
    }
    case 'Void': {
        input = [
            'Core - Liberty',
            'Core - Swarm',
            'Core - Void',
            'Core - VoidMulti'
        ]
        prefix = 'LOTV'
        output = 'MP - Void'
        break;
    }
    case 'Broodwar': {
        input = [
            'Core - Liberty',
            'Core - LibertyCampaign',
            'Core - Swarm',
            'Core - SwarmCampaign',
            'Core - Void',
            'Core - VoidCampaign',
            'Core - Nova',
            '>../../Mods/all-races-mods',
            'BroodWar'
        ]
        prefix = 'BW'
        output = 'MP - Broodwar'
        break;
    }
    case 'Coop': {
        input = [
            'Core - Liberty',
            'Core - LibertyCampaign',
            'Core - Swarm',
            'Core - SwarmCampaign',
            'Core - Void',
            'Core - VoidCampaign',
            '>../../Mods/all-races-mods',
            'Campaign'
        ]
        prefix = 'ARC'
        output = 'MP - Coop'
        break;
    }
    case 'ARC': {
        input = [
            'Core - VoidMulti',
            'Factions - Campaign',
            'Factions - Scion',
            'Factions - UED',
            'Factions - Hybrids',
            'Factions - Dragons',
            'Factions - UPL',
            'Factions - UPLCampaign',
            'Factions - UPLBalance',
            'Factions - LIB'
        ]
        output = 'Compiled - ARM'
        break;
    }
    case 'ARM': {
        input = [
            'Factions - Scion',
            'Factions - UED',
            'Factions - Hybrids',
            'Factions - Dragons',
            'Factions - UPL',
            'Factions - UPLBalance',
            'LIB',
            'PVP',
        ]
        output = 'Compiled - PVP'
        break;
    }
    case 'TEST': {
        input = [
            '1.Liberty',
            '2.LibertyCampaign',
            '3.LibertyMulti',
            '4.Swarm',
            '5.SwarmCampaign',
            '6.SwarmMulti',
            '7.Void',
            '8.VoidCampaign',
            '9.VoidMulti',
            '10.Nova',
            '11.NovaCampaign',
            '12.Warcraft',
            '13.Warcraft Coop',
            '>../../Mods/all-races-mods',
            'Campaign',
            'BroodWar',
            'Campaigns - Ambivalence',
            'Campaigns - AWS',
            'Campaigns - Chistar',
            'Campaigns - COW',
            'Campaigns - RWD',
            'Campaigns - TGH',
            'Factions - Confederates',
            'Factions - Dragons',
            'Factions - Erls',
            'Factions - Hybrids',
            'Factions - Scion',
            'Factions - Talon',
            'Factions - Tyranid',
            'Factions - UED',
            'Factions - Umojan',
            'Factions - UPL',
            'Factions - UPLBalance',
            'Factions - UPLCampaign',
            'Factions - WarCraft',
            'Mods - Alternate',
            'Mods - Hepta',
            'Mods - Reforged',
            'Mods - Reforged Dependency',
            'Mods - Reforged2',
            'Mods - SCExpanded',
            'Mods - Starlight',
            'COOP+ ARTMOD',
            'COOP+ BASE',
            'COOP+ Extension',
            'COOP - ARC',
            'COOP - Nexus',
            'COOP - TychusReworked',
            'COOP - WAR3'
        ]
        output = 'Compiiled - TEST'
        break;
    }
}

await mod.read(...input)

// let info = getDebugInfo(mod)
// function x(obj){
//     for(let i in  obj){
//         if(obj[i].constructor === String){
//             if(obj[i] === 'unknown' || obj[i] === 'word' || obj[i] === 'link'){
//               delete obj[i]
//             }
//         }
//         else{
//             x(obj[i])
//             if(Object.keys(obj[i]).length === 0){
//                 delete obj[i]
//             }
//         }
//     }
// }
// x(info.scheme)
// info

if(!test){
    if(prefix){
        mod.pick({race: ["Terr","Zerg","Prot"]})
        mod.pickActors()
        mod.pickEntity(mod.cache.actor?.['SYSTEM_ActorConfig'])
        mod.pickTriggers()
        mod.filter()
        mod.renameEntities(prefix + "*");
        mod.renameTags();
        mod.removeCore()
    }

    await mod.write('./../../Mods/all-races-mods/'+ output + '.SC2Mod')
}