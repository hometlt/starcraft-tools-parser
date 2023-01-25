import {SCMod} from "./src/sc-mod.js";

let mod = new SCMod()
mod.directory('../../Mods/all-races-mods')

switch(process.argv[2]?.toLowerCase()){
    case 'liberty': {
        await mod.readLibrary('Core')
        await mod.read(
            'Core - Liberty',
            'Core - LibertyMulti'
        )
        mod.pick({race: ["Terr","Zerg","Prot"]})
        mod.renameEntities('WOL*');
        await mod.write('MP - Liberty.SC2Mod')
        break;
    }
    case 'swarm': {
        await mod.readLibrary('Core')
        await mod.read(
            'Core - Liberty',
            'Core - Swarm',
            'Core - SwarmMulti'
        )
        mod.pick({race: ["Terr","Zerg","Prot"]})
        mod.renameEntities('HOTS*');
        await mod.write('MP - Swarm.SC2Mod')
        break;
    }
    default:
    case 'void': {
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
        break;
    }
    case 'broodwar': {
        await mod.readLibrary('Core')
        await mod.read(
            'Core - Liberty',
            'Core - LibertyCampaign',
            'Core - Swarm',
            'Core - SwarmCampaign',
            'Core - Void',
            'Core - VoidCampaign',
            'Core - Nova',
            'BroodWar'
        )
        mod.renameEntities('BW*');
        await mod.write('MP - Broodwar.SC2Mod')
        break;
    }
    case 'coop': {
        await mod.readLibrary('Core')
        await mod.read(
            'Core - Liberty',
            'Core - LibertyCampaign',
            'Core - Swarm',
            'Core - SwarmCampaign',
            'Core - Void',
            'Core - VoidCampaign',
            'Campaign'
        )
        mod.renameEntities('ARC*');
        await mod.write('MP - Coop.SC2Mod')
        break;
    }
    case 'arc': {
        await mod.read(
            'Assets - Scion',
            'Assets - UED',
            'Assets - Hybrids',
            'Assets - Dragons',
            'Assets - Talon',
            'Assets - UPL',
            'Assets - UPLCampaign',
            'Assets - COOP',
            'Core - VoidMulti',
            'Campaign',
            'Factions - Scion',
            'Factions - UED',
            'Factions - Hybrids',
            'Factions - Dragons',
            'Factions - UPL',
            'Factions - UPLCampaign',
            'Factions - UPLBalance',
            'LIB'
        )
        await mod.write('../../Mods/ARM.SC2Mod')
        break;
    }
    case 'arm': {
        await mod.read(
            'Factions - Scion',
            'Factions - UED',
            'Factions - Hybrids',
            'Factions - Dragons',
            'Factions - UPL',
            'Factions - UPLBalance',
            'LIB',
            'PVP'
        )
        await mod.write('../../Mods/PVP.SC2Mod')
        break;
    }
    case 'test': {
        await mod.readLibrary('Core')
        await mod.read(
            // 'Core',
            'Core - Liberty',
            'Core - LibertyCampaign',
            'Core - LibertyMulti',
            'Core - Swarm',
            'Core - SwarmCampaign',
            'Core - SwarmMulti',
            'Core - Void',
            'Core - VoidCampaign',
            'Core - VoidMulti',
            'Core - Nova',
            'Core - NovaCampaign',
            'Core - Warcraft',
            'Core - Warcraft Coop',
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
            'COOP - WAR3',
            'LIB')
        await mod.write('../../Mods/TEST.SC2Mod')
        break;
    }
}
