import * as Parser from "./index.js";

import {formatData, cleanup} from "./src/operations.js";
import path from "path";
//this operation might need >2Gb of Memory
//node --max_old_space_size=4000 make

let mod = new Parser.SCMod()
mod.directory('../../Mods/all-races-mods')

console.time('time')
switch(process.argv[2]?.toLowerCase()){
    case 'reforged': {
        await mod.readLibrary('built-in/Core')
        await mod.read(
            'built-in/Liberty',
            'built-in/LibertyCampaign',
            'built-in/Swarm',
            'built-in/SwarmCampaign',
            'built-in/Void',
            'built-in/VoidCampaign',
            'factions/Reforged'
        )
        mod.pick({race: ["Tald","Puri","Scav","Hybr"]})
        mod.renameEntities('Ref*');
        await mod.write('Tald.SC2Mod')
        break;
    }
    case 'liberty': {
        await mod.readLibrary('built-in/Core')
        await mod.read(
            'built-in/Liberty',
            'built-in/LibertyMulti'
        )
        mod.pick({race: ["Terr","Zerg","Prot"]})
        mod.renameEntities('WOL*');
        await mod.write('picked/Liberty.SC2Mod')
        break;
    }
    case 'swarm': {
        await mod.readLibrary('built-in/Core')
        await mod.read(
            'built-in/Liberty',
            'built-in/Swarm',
            'built-in/SwarmMulti'
        )
        mod.pick({race: ["Terr","Zerg","Prot"]})
        mod.renameEntities('HOTS*');
        await mod.write('picked/Swarm.SC2Mod')
        break;
    }
    case 'void': {
        await mod.readLibrary('built-in/Core')
        await mod.read(
            'built-in/Liberty',
            'built-in/Swarm',
            'built-in/Void',
            'built-in/VoidMulti'
        )
        mod.pick({race: ["Terr","Zerg","Prot"]})
        mod.renameEntities('LOTV*');
        await mod.write('picked/Void.SC2Mod')
        break;
    }
    case 'broodwar': {
        await mod.readLibrary('built-in/Core')
        await mod.read(
            'built-in/Liberty',
            'built-in/LibertyCampaign',
            'built-in/Swarm',
            'built-in/SwarmCampaign',
            'built-in/Void',
            'built-in/VoidCampaign',
            'built-in/Nova',
            'BroodWar'
        )
        mod.pick({race: ["Terr","Zerg","Prot"]})
        mod.renameEntities('BW*');
        await mod.write('picked/Broodwar.SC2Mod')
        break;
    }
    case 'heresy': {
        await mod.readLibrary('built-in/Core')
        await mod.read(
            'built-in/Liberty',
            'built-in/LibertyCampaign',
            'built-in/Swarm',
            'built-in/SwarmCampaign',
            'built-in/Void',
            'built-in/VoidCampaign',
            'built-in/VoidMulti'
        )
        for(let entity of mod.catalogs.sound){
            entity.ghost()
        }
        mod.directory('../../Mods/heresy')
        await mod.read(
            'HERESY'
        )
        mod.pick()
        mod.renameEntities('X2*');
        await mod.write('HERESY-X2.SC2Mod')
        break;
    }
    case 'coop': {
        await mod.readLibrary('built-in/Core')
        await mod.read(
            'built-in/Liberty',
            'built-in/LibertyCampaign',
            'built-in/Swarm',
            'built-in/SwarmCampaign',
            'built-in/Void',
            'built-in/VoidCampaign',
            'built-in/VoidMulti',
            'factions/Campaign',
            'COOP - Triggers'
        )
        mod.renameEntities('ARC*');
        await mod.write('picked/Coop.SC2Mod')
        break;
    }
    default:
    case 'arc': {
        await mod.read(
            // 'Assets - Scion',
            // 'Assets - UED',
            // 'Assets - Hybrids',
            // 'Assets - Dragons',
            // 'Assets - Talon',
            // 'Assets - UPL',
            // 'Assets - UPLCampaign',
            // 'Assets - COOP',
            'built-in/VoidMulti',
            'factions/Campaign',
            'factions/Scion',
            'factions/Hybrids',
            'factions/UED',
            'factions/Dragons',
            'factions/UPL',
            'factions/UPLCampaign',
            'factions/UPLBalance',
            'factions/Talon',
            'dependencies/LIB'
        )
        await mod.write('../../Mods/ARM.SC2Mod')
        break;
    }
    case 'arm': {
        await mod.read(
            'factions/Scion',
            'factions/UED',
            'factions/Hybrids',
            'factions/Dragons',
            'factions/UPL',
            'factions/UPLBalance'
        )
        await mod.write('../../Mods/PVP.SC2Mod')
        break;
    }
    case 'tester': {
        mod.directory('../../Mods/all-races-tester')
        await mod.read(
            // "CORE",
            "LOTV",
            "DRAGON",
            "SCION",
            "NHBR",
            "UED",
            "UPL",
            // "COOP"
        )
        await mod.write('PVP.SC2Mod')
        break;
    }
    case 'wiki-arc': {
        await mod.read(
            'built-in/Core',
            'built-in/Liberty',
            'built-in/Swarm',
            'built-in/Void',
            'built-in/VoidMulti',
            'factions/Scion',
            'factions/UED',
            'factions/Hybrids',
            'factions/Dragons',
            'factions/UPL',
            'factions/UPLBalance'
        )
        mod.readImages('./../wiki/src/icons')
        mod.writeWiki('../../tools/wiki/src/data/arc')
        break;
    }
    case 'wiki-scmr': {
        await mod.read(
            'built-in/Core',
            'built-in/Liberty',
            'built-in/LibertyCampaign',
            'built-in/Swarm',
            'built-in/SwarmCampaign',
            'built-in/Void',
            'built-in/VoidCampaign',
            'built-in/Nova',
            'campaigns/MassRecall',
        )
        mod.readImages('./../wiki/src/icons')
        mod.writeWiki('../../tools/wiki/src/data/scmr')
        break;
    }
    case 'wiki-warcraft': {
        await mod.read(
            'built-in/Core',
            'built-in/Warcraft',
            'factions/WarCraft'
        )
        mod.readImages('./../wiki/src/icons')
        mod.writeWiki('../../tools/wiki/src/data/warcraft',{requireGlossaryPriority: false})
        break;
    }
    case 'wiki-coop': {
        await mod.read(
            'built-in/Core',
            'built-in/Liberty',
            'built-in/LibertyCampaign',
            'built-in/Swarm',
            'built-in/SwarmCampaign',
            'built-in/Void',
            'built-in/VoidCampaign',
            'built-in/VoidMulti',
            'factions/Campaign',
            'factions/Scion',
            'factions/UED',
            'factions/Hybrids',
            'factions/Dragons',
            'factions/UPL',
            'factions/UPLBalance',
            'factions/UPLCampaign',
            'factions/Talon',
            'COOP - Triggers',
        )
        mod.readImages('./../wiki/src/icons')
        mod.writeWiki('../../tools/wiki/src/data/coop')
        break;
    }
    case 'wiki-coop-nexus': {
        await mod.read(
            'built-in/Core',
            'built-in/Liberty',
            'built-in/LibertyCampaign',
            'built-in/Swarm',
            'built-in/SwarmCampaign',
            'built-in/Void',
            'built-in/VoidCampaign',
            'built-in/VoidMulti',
            'factions/Campaign',
            'COOP - Triggers',
            'COOP - Addon Nexus'
        )
        mod.readImages('./../wiki/src/icons')
        mod.writeWiki('../../tools/wiki/src/data/nexus')
        break;
    }
    case 'wiki-erls': {
        await mod.read(
            'built-in/Core',
            'built-in/Liberty',
            'built-in/LibertyCampaign',
            'built-in/Swarm',
            'built-in/SwarmCampaign',
            'built-in/Void',
            'built-in/VoidCampaign',
            'built-in/VoidMulti',
            'factions/Erls'
        )
        mod.readImages('./../wiki/src/icons')
        mod.writeWiki('../../tools/wiki/src/erls')
        break;
    }
    case 'test': {
        await mod.readLibrary('built-in/Core')
        await mod.read(
            // 'built-in/Core',
            'built-in/Liberty',
            'built-in/LibertyCampaign',
            'built-in/LibertyMulti',
            'built-in/Swarm',
            'built-in/SwarmCampaign',
            'built-in/SwarmMulti',
            'built-in/Void',
            'built-in/VoidCampaign',
            'built-in/VoidMulti',
            'built-in/Nova',
            'built-in/NovaCampaign',
            'built-in/Warcraft',
            'built-in/Warcraft Coop',
            'Campaign',
            'BroodWar',
            'Campaigns - Ambivalence',
            'Campaigns - AWS',
            'Campaigns - Chistar',
            'Campaigns - COW',
            'Campaigns - RWD',
            'Campaigns - TGH',
            'factions/Confederates',
            'factions/Dragons',
            'factions/Erls',
            'factions/Hybrids',
            'factions/Scion',
            'factions/Talon',
            'factions/Tyranid',
            'factions/UED',
            'factions/Umojan',
            'factions/UPL',
            'factions/UPLBalance',
            'factions/UPLCampaign',
            'factions/WarCraft',
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
            'COOP - WAR3',
            'LIB')
        await mod.write('../../Mods/TEST.SC2Mod')
        break;
    }
}
console.timeEnd('time')
