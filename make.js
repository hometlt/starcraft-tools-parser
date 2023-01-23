import {SCMod} from "./src/sc-mod.js";
import {getDebugInfo} from "./src/operations.js";


let mod = new SCMod()
mod.directory('../data-input')
let prefix = ''
let output = ''
let input = []
let test = false

await mod.read('0.Core')
mod.saveCore()



let mode = 'Void'
switch(mode){
    case 'Liberty': {
        input = ['1.Liberty', '2.Liberty Multi']
        prefix = 'WOL'
        output = 'MP - Liberty'
        break;
    }
    case 'Swarm': {
        input = ['1.Liberty', '4.Swarm', '6.Swarm Multi']
        prefix = 'HOTS'
        output = 'MP - Swarm'
        break;
    }
    case 'Void': {
        input = [
            '1.Liberty', '4.Swarm', '7.Void',
            '9.Void Multi'
        ]
        prefix = 'LOTV'
        output = 'MP - Void'
        break;
    }
    case 'BroodWar': {
        //this operation might need >2Gb of Memory
        //node --max_old_space_size=4000 make.js
        input = [
            '1.Liberty',
            '2.Liberty Campaign',
            '4.Swarm',
            '5.Swarm Campaign',
            '7.Void',
            '8.Void Campaign',
            '10.Nova.sc2mod',
            './../../Mods/all-races-mods/BroodWar'
        ]
        prefix = 'BW'
        output = 'MP - Broodwar'
        break;
    }
    case 'TEST': {
        input = [
            '0.Core',
            '1.Liberty',
            '2.Liberty Campaign',
            '3.Liberty Multi',
            '4.Swarm',
            '5.Swarm Campaign',
            '6.Swarm Multi',
            '7.Void',
            '8.Void Campaign',
            '9.Void Multi',
            '10.Nova',
            '11.Nova Campaign',
            '12.Warcraft',
            '13.Warcraft Coop'
        ]
        await mod.read(...input)

        mod.directory('../../Mods/all-races-mods')
        input = [
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
    // mod.pick({race: ["Terr","Zerg","Prot"]})
    // mod.pickActors()
    // mod.filter()

    // Object.freeze(mod.cache.unit.Battlecruiser.EquipmentArray)

    mod.renameEntities(prefix + "*");
    mod.renameTags(prefix);

    mod.removeCore()
    await mod.write('./../../Mods/all-races-mods/'+ output + '.SC2Mod')
}
else{
    await mod.write('./TEST.SC2Mod')
}