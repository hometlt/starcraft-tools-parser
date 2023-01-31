import {SCMod} from "./src/sc-mod.js";
import fs from "fs";
import {capitalize, formatData, deep, cleanup} from "./src/operations.js";
import path from "path";
//this operation might need >2Gb of Memory
//node --max_old_space_size=4000 make

let mod = new SCMod()
mod.directory('../../Mods/all-races-mods')

console.time('time')
switch(process.argv[2]?.toLowerCase()){
    case 'reforged': {
        await mod.readLibrary('Core')
        await mod.read(
            'Core - Liberty',
            'Core - LibertyCampaign',
            'Core - Swarm',
            'Core - SwarmCampaign',
            'Core - Void',
            'Core - VoidCampaign',
            'Factions - Reforged'
        )
        mod.pick({race: ["Tald","Puri","Scav","Hybr"]})
        mod.renameEntities('Ref*');
        await mod.write('Tald.SC2Mod')
        break;
    }
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
        mod.pick({race: ["Terr","Zerg","Prot"]})
        mod.renameEntities('BW*');
        await mod.write('MP - Broodwar.SC2Mod')
        break;
    }
    case 'heresy': {
        await mod.readLibrary('Core')
        await mod.read(
            'Core - Liberty',
            'Core - LibertyCampaign',
            'Core - Swarm',
            'Core - SwarmCampaign',
            'Core - Void',
            'Core - VoidCampaign',
            'Core - VoidMulti'
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
        await mod.readLibrary('Core')
        await mod.read(
            'Core - Liberty',
            'Core - LibertyCampaign',
            'Core - Swarm',
            'Core - SwarmCampaign',
            'Core - Void',
            'Core - VoidCampaign',
            'Core - VoidMulti',
            'Campaign',
            'COOP - ARC'
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
            'Factions - UPLBalance'
        )
        await mod.write('../../Mods/PVP.SC2Mod')
        break;
    }
    case 'tester':
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

    default:
    case 'web-pvp': {
        await mod.read(
            'Core',
            {
                cache: {
                    unit: {
                        DESTRUCTIBLE: {ignore : true},
                        POWERUP: {ignore : true},
                        STARMAP: {ignore : true},
                        SS_Plane: {ignore : true},
                        SS_BackgroundSpace: {ignore : true},
                        Shape: {ignore : true},
                        MISSILE_INVULNERABLE: {ignore : true},
                        MISSILE: {ignore : true},
                        MISSILE_HALFLIFE: {ignore : true},
                        PLACEHOLDER: {ignore : true},
                        PLACEHOLDER_AIR: {ignore : true},
                        PATHINGBLOCKER: {ignore : true},
                        BEACON: {ignore : true},
                        SMCHARACTER: {ignore : true},
                        SMCAMERA: {ignore : true},
                        SMSET: {ignore : true},
                        ITEM: {ignore : true},
                    }
                }
            },
            'Core - Liberty',
            'Core - Swarm',
            'Core - Void',
            'Core - VoidMulti',
            'Factions - Scion',
            'Factions - UED',
            'Factions - Hybrids',
            'Factions - Dragons',
            'Factions - UPL',
            'Factions - UPLBalance'
        )
        mod.readImages('./../wiki/src/icons')
        mod.checkImages()
        mod.populateUnitsWithActorsData()
        // mod.pick({race: ["Terr","Zerg","Prot"]})

        mod.makeAbilCmds()
        mod.resolveTextValues()

        function quickInfo(entity){
            if(!entity){
                return {}
            }
            return {
                Id: entity.id,
                Icon: entity.$$resolved.Icon,
                Tooltip: mod.locales.enUS.GameStrings[entity.$$resolved.Tooltip],
                Description: mod.locales.enUS.GameStrings[entity.$$resolved.Description],
                Name:  mod.locales.enUS.GameStrings[entity.$$resolved.Name],
            }
        }

        function weaponInfo(entity){
            if(!entity){
                return {}
            }
            let effect = entity.$$resolved.DisplayEffect && mod.cache.effect[entity.$$resolved.DisplayEffect]?.$$resolved
            return {
                ...quickInfo(entity),
                Amount: effect?.Amount?.value,
                AttributeBonus: effect?.AttributeBonus,
                Kind: effect?.Kind,
                DisplayAttackCount: entity.$$resolved.DisplayAttackCount,
                TargetFilters: entity.$$resolved.TargetFilters?.split(";")[0].replace(",Visible","").replace("Visible",""),
                Range: entity.$$resolved.Range || entity.$$resolved.MinScanRange,
                Period: entity.$$resolved.Period,
            }
        }

        for(let upgrade of mod.catalogs.upgrade){
            mod.pickEntity(upgrade)
        }
        for(let cat in mod.catalogs){
            for(let entity of mod.catalogs[cat]) {
                cleanup(entity.$$resolved)
            }
        }

        mod.directory('../../tools/wiki/src')
        await mod.write('data',{
            catalogs: ['unit', 'upgrade'],
            outputFn: (mod,output) => {


                let quick = ['race','weapon','upgrade','abil','button','behavior']
                for(let catalog of quick){
                    output[`${catalog}s.json`] =  formatData(mod.catalogs[catalog].map(entity => ({
                        Id: entity.id,
                        Icon: entity.Icon,
                        Description: mod.locales.enUS.GameStrings[entity.$$resolved.Description],
                        Name:  mod.locales.enUS.GameStrings[entity.$$resolved.Name]
                    })), 'json')
                }

                output[`images.json`] =  formatData({images: mod.images}, 'json')

                let unitsData = []
                for (let unit of mod.catalogs.unit) {
                    let unitData = unit.$$resolved

                    if (unit.$overriden || unit.__core){
                        continue;
                    }
                    if (!unitData.Race || unitData.Race === 'Neut') {
                        continue;
                    }
                    if (!unitData.GlossaryPriority) {
                        continue;
                    }
                    if (unitData.ignore) {
                        continue;
                    }
                    if (unitData.EditorFlags?.NoPalettes || unitData.EditorFlags?.NoPlacement){
                        continue;
                    }

                    function unitAbilCmds(unit){
                        let lbs = []
                        if(unit.CardLayouts){
                            for(let cl of unitData.CardLayouts){
                                if(cl.LayoutButtons){
                                    for(let lb of cl.LayoutButtons) {
                                        if(lb.AbilCmd){
                                            lbs.push({
                                                ...quickInfo(mod.cache.button[lb.Face]),
                                                AbilCmd: lb.AbilCmd
                                            })
                                        }
                                    }
                                }
                            }
                        }
                        return lbs
                    }

                    let {abilCmdsIds,requiredUnits, requiredUpgrades, producingUnits} = mod.producingRequirements(unit.id)
                    let Producers = producingUnits.map(x => quickInfo(mod.cache.unit[x]));
                    // if(!Producers.length){
                    //     console.log('no producers '+ unit.id)
                    //     continue
                    // }

                    let {productionUnits, productionUpgrades} = mod.unitProduction(unit.id)

                    let Production = [
                        ...productionUnits.map(x => quickInfo(mod.cache.unit[x])),
                        ...productionUpgrades.map(x => quickInfo(mod.cache.upgrade[x]))
                    ]

                    let Requirements = [
                        ...requiredUnits.map(x => quickInfo(mod.cache.unit[x])),
                        ...requiredUpgrades.map(x => quickInfo(mod.cache.upgrade[x]))
                    ]

                    let Upgrades = mod.catalogs.upgrade
                        .filter(entry => entry.$$resolved.AffectedUnitArray?.includes(unit.id))
                        .map(entry => entry.id)
                        .map(Link => ({Link}))

                    Upgrades.forEach(entry => Object.assign(entry, {...quickInfo(mod.cache.upgrade[entry.Link])}))

                    let Abilities = unitData.AbilArray && unitData.AbilArray.map(entry => ({
                        ...entry,
                        ...quickInfo(mod.cache.abil[entry.Link])
                    })) || null

                    let Behaviors = unitData.BehaviorArray && unitData.BehaviorArray.map(entry => ({
                        ...entry,
                        ...quickInfo(mod.cache.behavior[entry.Link])
                    })) || null

                    let Weapons = unitData.WeaponArray && unitData.WeaponArray
                        .filter(entity => entity.Link)
                        .map(entry => ({
                            ...entry,
                            ...weaponInfo(mod.cache.weapon[entry.Link])
                        }))

                    function flagArray(property){
                        return property && Object.entries(property).filter(([key,value]) => value).map(([key,value]) => key)
                    }

                    let categories = unitData.EditorCategories?.split(",").map(cat => cat.split(':'))
                        .reduce((acc, [category, value]) => ({...acc, [category]: value}), {}) || null

                    output[`unit/${unit.id}.json`] = formatData({
                        ...unitData,
                        ...quickInfo(mod.cache.unit[unit.id]),
                        LifeArmorName:  unitData.LifeArmorName && mod.locales.enUS.GameStrings[unitData.LifeArmorName],
                        ShieldArmorName: unitData.ShieldArmorName && mod.locales.enUS.GameStrings[unitData.ShieldArmorName],
                        id: null,
                        class: null,
                        BehaviorArray: null,
                        WeaponArray: null,
                        AbilArray: null,
                        Weapons,
                        Behaviors,
                        Upgrades,
                        Abilities,
                        Requirements,
                        Production,
                        Producers,
                        // Icon: unitActors[unit.id]?.UnitIcon,
                        // LifeArmorIcon:  unitActors[unit.id]?.LifeArmorIcon,
                        // ShieldArmorIcon:  unitActors[unit.id]?.ShieldArmorIcon,
                        Commands: unitAbilCmds(unitData),
                        EditorFlags: flagArray(unitData.EditorFlags),
                        FlagArray: flagArray(unitData.FlagArray),
                        PlaneArray: flagArray(unitData.PlaneArray),
                        Collide: flagArray(unitData.Collide),
                        Attributes: flagArray(unitData.Attributes),
                        EditorCategories: categories
                    }, 'json')

                    unitsData.push({
                        ...quickInfo(mod.cache.unit[unit.id]),
                        EditorCategories: categories,
                        Race: unitData.Race,
                        GlossaryPriority: unitData.GlossaryPriority
                    })
                }

                // unitsData = unitsData.sort((a,b) => {
                //     if(a.Race === b.Race){
                //         return a.EditorCategories?.ObjectType > b.EditorCategories?.ObjectType ? -1 : 1
                //     }
                //     else{
                //         return a.Race > b.Race ? -1 : 1
                //     }
                // })
                output[`units.json`] =  formatData(unitsData, 'json')

            },
            scopes: []
        })

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
console.timeEnd('time')
