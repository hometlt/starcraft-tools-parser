import fs from 'fs'

import {getImagesList,readTextFile,removeEmptyValues} from "./data-parser.mjs";

const data = {
    Unit: JSON.parse(fs.readFileSync("./data/WebData/units.json", {encoding: 'utf-8'})),
    Ability: JSON.parse(fs.readFileSync("./data/WebData/abilities.json", {encoding: 'utf-8'})),
    Effect: JSON.parse(fs.readFileSync("./data/WebData/effects.json", {encoding: 'utf-8'})),
    Weapon: JSON.parse(fs.readFileSync("./data/WebData/weapons.json", {encoding: 'utf-8'})),
    Button: JSON.parse(fs.readFileSync("./data/WebData/buttons.json", {encoding: 'utf-8'})),
    Actor: JSON.parse(fs.readFileSync("./data/WebData/actors.json", {encoding: 'utf-8'})),
    Upgrade: JSON.parse(fs.readFileSync("./data/WebData/upgrades.json", {encoding: 'utf-8'})),
    Behavior: JSON.parse(fs.readFileSync("./data/WebData/behaviors.json", {encoding: 'utf-8'})),
    Requirement: JSON.parse(fs.readFileSync("./data/WebData/requirements.json", {encoding: 'utf-8'})),
    RequirementNode: JSON.parse(fs.readFileSync("./data/WebData/requirementNodes.json", {encoding: 'utf-8'}))
}

const cache = {
    upgrades: Object.entries(data.Upgrade).map(([id,upgrade]) => ({id, upgrade})),
    units: Object.entries(data.Unit).map(([id,unit]) => ({id, unit})),
    abilcmds: Object.entries(data.Ability).map(([id,ability]) => ({id, ability})).filter(entry => entry.ability.info).reduce((prev,entry)=> {
            prev.push(...Object.entries(entry.ability.info).map(([cmd,info]) => ({id: entry.id +"," + cmd, abil: entry.id, cmd, info})))
            return prev
        },[]),
    images: getImagesList(),
    text: readTextFile("./data/LocalizedData/enUS.SC2Data/GameStrings.txt")
}

function gameText(id){
    let result = cache.text[id]
    if(!result)return ""
    // dd<d ref="Behavior,ZerglingArmorShredTarget,Duration" precision="2"/>dd
    // dd<d ref="Behavior,ZerglingArmorShredTarget,Duration"/>dd
    result = result
        .replace(/<n\/>/g,"<br/>")
        .replace(/<c val="(\w+)">/g,`<span style="color: #$1">`)
        .replace(/<\/c>/g,"</span>")
        .replace(/<d ref="(\w+),(\w+),(\w+)"(?:\s+precision="(\d+)")?\/>/g, (_,catalog,entity,field,precision)=>{
            let value = data[catalog]?.[entity]?.[field];
            if(!value)return 0;
            return precision ? +value.toFixed(precision) : +value
        })

    return result
}

function quickInfo(catalog,id){
    let entity = data[catalog][id] || {}
    switch(catalog){
        case "Unit":
            let actor = data.Actor[entity.actor]
            return {
                Id: id,
                Icon: actor && (cache.images.includes(actor.icon) && actor.icon || cache.images.includes(actor.wireframe) && actor.wireframe) || "",
                Description: gameText(entity.Description || `Button/Tooltip/${id}`),
                Name: gameText(entity.Name || `${catalog}/Name/${id}`)
            }
        case "Actor":
            return {
                Id: id,
                Icon: cache.images.includes(entity.Icon) && entity.Icon ||cache.images .includes(entity.wireframe) && entity.wireframe || "",
                Description: gameText(entity.Description || `Actor/Tooltip/${id}`),
                Name: gameText(entity.Name || `Actor/Name/${id}`)
            }
        case "Weapon":
            return {
                Id: id,
                Icon: cache.images.includes(entity.Icon) && entity.Icon || "",
                Name: gameText(entity.Name || `Weapon/Name/${id}`),
                DisplayEffect: entity.DisplayEffect && data.Effect[entity.DisplayEffect],
                DisplayAttackCount: entity.DisplayAttackCount,
                TargetFilters: entity.TargetFilters?.split(";")[0].replace(",Visible","").replace("Visible",""),
                Range: entity.Range || entity.MinScanRange,
                Period: entity.Period,
            }
        case "Upgrade":
            return {
                Id: id,
                Icon: cache.images.includes(entity.Icon) && entity.Icon || "",
                Name: gameText(entity.Name || `Upgrade/Name/${id}`)
            }
        case "Ability":
            if(data.Button[entity.button]){
                return quickInfo("Button",entity.button)
            }
            return {
                Id: id,
                Icon: cache.images.includes(entity.Icon) && entity.Icon || "",
                Name: gameText(entity.name  || `Abil/Name/${id}`)
            }
        case "Button":
            return {
                Icon: cache.images.includes(entity.Icon) && entity.Icon || "",
                Description: gameText(entity.Description || `${catalog}/Tooltip/${id}`),
                Name: gameText(entity.name  || `${catalog}/Name/${id}`)
            }
        case "Behavior":
            return {
                Id: id,
                Icon: cache.images.includes(entity.InfoIcon) && entity.InfoIcon || "",
                Description: gameText(entity.Tooltip || `Behavior/Tooltip/${id}`),
                Name: gameText(entity.name  || `Behavior/Name/${id}`) || id
            }
        default:
            return {
                Id: id,
                Icon: cache.images.includes(entity.Icon) && entity.Icon || "",
                Description: gameText(entity.Description || `${catalog}/Tooltip/${id}`),
                Name: gameText(entity.name  || `${catalog}/Name/${id}`)
            }
    }
}

function produceAbilities(unitname){
    return cache.abilcmds.filter(entry => entry.info.Unit?.includes(unitname)).map(abilcmd => abilcmd.id)
}

function producingUnits (unitname){
    let abilCmds = produceAbilities(unitname).map(abilcmd => abilcmd.id)
    return cache.units.filter(entry => entry.unit.CardLayouts?.find(card => card.AbilCmd && abilCmds.includes(card.AbilCmd))).map(unit => unit.id)
}

function producingRequirements (unitname){
    let abilCmds = cache.abilcmds.filter(entry => entry.info.Unit?.includes(unitname))
    let abilCmdsIds = abilCmds.map(abilcmd => abilcmd.id)
    let requirements = abilCmds.map(entry => entry.info.Requirements).filter(Boolean)
        .map(req => data.Requirement[req]?.Node).filter(Boolean)
        .map(reqNode => data.RequirementNode[reqNode]).filter(Boolean)

    let reqUnitsAliases = requirements.map(req => req.Unit).filter(Boolean)
    let reqUpgradeAliases = requirements.map(req => req.Upgrade).filter(Boolean)

    let requiredUnits = cache.units.filter(entry => reqUnitsAliases.includes(entry.unit.TechAliasArray) || reqUnitsAliases.includes(entry.id) ).map(unit => unit.id)
    let requiredUpgrades = cache.upgrades.filter(entry => reqUpgradeAliases.includes(entry.upgrade.TechAliasArray) || reqUpgradeAliases.includes(entry.id) ).map(unit => unit.id)
    let producingUnits = cache.units.filter(entry => entry.unit.CardLayouts?.find(card => card.AbilCmd && abilCmdsIds.includes(card.AbilCmd))).map(unit => unit.id)

    return {requiredUnits,requiredUpgrades,producingUnits}
}

function trainingUnits (unitname){
    let unit = data.Unit[unitname]
    let result = []
    if(unit.CardLayouts){
        for(let card of unit.CardLayouts){
            let abilcmd = card.AbilCmd
            if(abilcmd){
                let [abil,cmd] = abilcmd.split(",")
                let ability = data.Ability[abil]
                let abilityCommand = ability?.info?.[cmd]
                if(abilityCommand?.Unit){
                    result.push(...abilityCommand.Unit)
                }
            }
        }
    }
    return result
}

function affectingUpgrades (unitname){
    return cache.upgrades.filter(entry => entry.upgrade.units?.includes(unitname)).map(entry => entry.id)
}

export function getUnits(params){
    let units = cache.units
        .filter(entry => !entry.unit.ignore)
        .filter(entry => entry.unit.Race)
        .filter(entry => entry.unit.ObjectFamily === "Melee")
        .filter(entry => !["Orc","Human","Other","Naga","Critters","NightElf","Creeps","Undead"].includes(entry.unit.Race) )
        .map(entry =>quickInfo("Unit",entry.id))
    console.log(units.length)
    return units;
}

export function getCommands(unitname){
    let unit = data.Unit[unitname]
    return unit.CardLayouts?.filter(card => card.Face).map(card => ({
        ... (() => {
            let [l,x,y] = "0:4x2".split(/[:x]/);
            return {l,x,y};
        })(),
        ...quickInfo("Button",card.Face)
    }));
}

export function getUnitData(unitname){
    let unit = data.Unit[unitname]
    if(!unit) return null
    let actor = data.Actor[unit.actor] || null
    let upgrades = affectingUpgrades(unitname)
    let trainings = trainingUnits(unitname)

    let {requiredUnits,requiredUpgrades,producingUnits} = producingRequirements(unitname)


    return removeEmptyValues({
        ...quickInfo("Unit",unitname),
        Race: unit.Race,
        ObjectFamily: unit.ObjectFamily,
        ObjectType: unit.ObjectType,
        CargoSize: unit.CargoSize,
        Sight: unit.Sight,
        Food: unit.Food,
        Speed: unit.Speed,
        GlossaryPriority: unit.GlossaryPriority,
        CostResource: unit.CostResource,
        Attributes: unit.Attributes,
        EnergyMax: unit.EnergyMax,
        LifeMax: unit.LifeMax,
        LifeArmor: unit.LifeArmor,
        LifeArmorIcon: actor?.LifeArmorIcon,
        ShieldsMax: unit.ShieldsMax,
        ShieldArmor: unit.ShieldArmor,
        ShieldArmorIcon: actor?.ShieldArmorIcon,
        Commands: getCommands(unitname),
        Behaviors: unit.BehaviorArray?.map(x=>quickInfo("Behavior",x)),
        Weapons:  unit.WeaponArray?.map(x=>quickInfo("Weapon",x)),
        Strengths: unit.GlossaryStrongArray?.map(x=>quickInfo("Unit",x)),   
        Weaknesses: unit.GlossaryWeakArray?.map(x=>quickInfo("Unit",x)),
        Abilities: unit.AbilArray?.map(x=>quickInfo("Ability",x)),
        Upgrades: upgrades.map(x=>quickInfo("Upgrade",x)),
        Producers: producingUnits.map(x=>quickInfo("Unit",x)),
        Production: trainings.map(x=>quickInfo("Unit",x)),
        Requirements: [
            ...requiredUnits.map(x=>quickInfo("Unit",x)),
            ...requiredUpgrades.map(x=>quickInfo("Upgrade",x))
        ]
    })
}