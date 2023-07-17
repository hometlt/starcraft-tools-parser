import * as SCParser from "./index.js";
import fs from 'fs'

let mod = await SCParser.createMod({
    //data from 'core' mods will not be added to the output mod
    core: [
        './mods/Core',
        './mods/Liberty',
        './mods/Swarm',
        './mods/Void',
        './mods/Multi',
    ],
    mods: [
        'C:\\Program Files (x86)\\StarCraft II\\mods\\all-races-mods\\factions\\Hybrids.SC2Mod'
    ]
})

//do not add the following entities and its children to the output data
mod.ignoreEntities({
    unit: [
        "DESTRUCTIBLE",
        "POWERUP",
        "STARMAP",
        "SS_Plane",
        "SS_BackgroundSpace",
        "Shape",
        "MISSILE_INVULNERABLE",
        "MISSILE",
        "MISSILE_HALFLIFE",
        "PLACEHOLDER",
        "PLACEHOLDER_AIR",
        "PATHINGBLOCKER",
        "BEACON",
        "SMCHARACTER",
        "SMCAMERA",
        "SMSET",
        "ITEM",
    ]
})
//pick specific races
// mod.pick({race: ["Terr","Zerg","Prot"]})
mod.index()
//replace text strings expressions with data values
mod.resolveTextValues()
//load the list of available icons
mod.readImages('./../wiki/src/icons')
//check entities icons and use the available ones
mod.checkImages()
//add actor data to units
mod.resolveUnitActors()

let strings = mod.locales.enUS.GameStrings
function flagArray(property){
    return property && Object.entries(property).filter(([key,value]) => value).map(([key,value]) => key)
}
function weaponInfo (entity){
    let data = entity.getResolvedData()
    let effect = data.DisplayEffect && mod.cache.effect[data.DisplayEffect]?.getResolvedData()
    return {
        ...shortInfo(entity),
        Amount: effect?.Amount?.value,
        AttributeBonus: effect?.AttributeBonus,
        Kind: effect?.Kind,
        DisplayAttackCount: data.DisplayAttackCount,
        TargetFilters: data.TargetFilters?.split(";")[0].replace(",Visible","").replace("Visible",""),
        Range: data.Range || data.MinScanRange,
        Period: data.Period,
    }
}
function shortInfo(entity){
    let data = entity.getResolvedData()
    return {
        Id: entity.id,
        Icon: entity.Icon || entity.InfoIcon,
        Tooltip: strings[data.Tooltip],
        Description: strings[data.Description],
        Name:  strings[data.Name]
    }
}
function getCardData(entity) {
    let commands = []
    let data = entity.getResolvedData()
    if (!data.CardLayouts) {
        return null;
    }
    let layouts = []
    for (let cl of data.CardLayouts) {
        let layout = []
        if (cl.LayoutButtons) {
            cl.LayoutButtons = cl.LayoutButtons.filter(lb => lb.Face && lb.Type && lb.Type !== 'Undefined' && (!lb.Row || lb.Row < 3) && (!lb.Column || lb.Column < 5))
            for (let lb of cl.LayoutButtons) {

                let btn = mod.cache.button[lb.Face]
                if (!btn) {
                    console.warn(`Entity not found: button.${lb.Face}`)
                    continue;
                }

                if(lb.AbilCmd){
                    commands.push({
                        ...shortInfo(btn),
                        AbilCmd: lb.AbilCmd
                    })
                }

                let buttonData = btn.getResolvedData()

                let hotkey = mod.locales.enUS.GameHotkeys[buttonData.Hotkey];

                if (SCParser.SCGame.specialHotkeys[hotkey]) {
                    hotkey = SCParser.SCGame.specialHotkeys[hotkey]
                }
                layout.push({
                    ...buttonData,
                    ...shortInfo(btn),
                    Hotkey: hotkey
                })

            }
        }
        layouts.push(layout)
    }
    return {layouts,commands}
}
function getProduction (commands){
    let units =[], upgrades = []

    for(let abilcmd of commands){
        let [abilId, cmdIndex] = abilcmd.split(",");
        let abil = mod.cache.abil[abilId]?.getResolvedData();
        if(!abil)continue;
        if(cmdIndex === 'Execute') cmdIndex = 0;
        let unitinfo = abil.InfoArray?.[cmdIndex]?.Unit;
        if(unitinfo){
            if(unitinfo?.constructor === Array ){
                for(let unit of unitinfo) if(!units.includes(unit))units.push(unitinfo)
            }
            else{
                if(!units.includes(unitinfo)) units.push(unitinfo)
            }
        }
        let upgradeinfo = abil.InfoArray?.[cmdIndex]?.Upgrade;
        if(upgradeinfo){
            if(upgradeinfo?.constructor === Array ){
                for(let upgrade of upgradeinfo) if(!upgrades.includes(upgrade))upgrades.push(upgradeinfo)
            }
            else{
                if(!upgrades.includes(upgradeinfo)) upgrades.push(upgradeinfo)
            }
        }
    }
    return {
        producedUnits: units,
        producedUpgrades: upgrades
    }
}
function addUnit (unit){
    let unitData = unit.getResolvedData()

    let actor = unit.getActor()
    let {layouts,commands} = getCardData(unit)
    let {producedUnits, producedUpgrades} = getProduction(commands.map(cmd => cmd.AbilCmd))
    let {requiredUnits, requiredUpgrades, producingUnits} = unit.getRequirements()
    let {affectingUpgrades} = unit.$$references.map(ref => ref.target).filter(entity => entity.$$resolved?.class === 'CUpgrade').map(shortInfo)


    let shortUnitData = shortInfo(unit)
    shortUnitData.Icon =  actor?.UnitIcon || actor?.Wireframe?.Image?.[0]

    let categories = unitData.EditorCategories?.split(",").map(cat => cat.split(':')).reduce((acc, [category, value]) => ({...acc, [category]: value}), {})
    let unitType = categories?.ObjectType === 'Structure' ? 'structures' : 'units'


    output[`unit\\${unit.id}`] = {
        ...unitData,
        ...shortUnitData,
        LifeArmorIcon: actor?.LifeArmorIcon,
        ShieldArmorIcon:  actor?.ShieldArmorIcon,
        LifeArmorName:  strings[unitData.LifeArmorName],
        ShieldArmorName: strings[unitData.ShieldArmorName],
        id: null,
        class: null,
        BehaviorArray: null,
        WeaponArray: null,
        AbilArray: null,
        Card: layouts,
        Weapons:  unitData.WeaponArray?.filter(w => w.Link).map(w => ({Turret: w.Turret, ...weaponInfo(mod.cache.weapon[w.Link])})),
        Behaviors: unitData.BehaviorArray?.filter(b => b.Link).map(b => shortInfo(mod.cache.behavior[b.Link])),
        Abilities: unitData.AbilArray?.filter(a => a.Link).map(a => shortInfo(mod.cache.abil[a.Link])),
        Upgrades: affectingUpgrades,
        Requirements: [...requiredUnits, ...requiredUpgrades],
        Production: [...producedUnits,...producedUpgrades],
        Producers: producingUnits,
        Commands: commands,
        EditorFlags: flagArray(unitData.EditorFlags),
        FlagArray: flagArray(unitData.FlagArray),
        PlaneArray: flagArray(unitData.PlaneArray),
        Collide: flagArray(unitData.Collide),
        Attributes: flagArray(unitData.Attributes)
    }

    let raceObject = output.races.find(r => r.Id === unitData.Race)
    if(!raceObject[unitType]){
        raceObject[unitType] = []
    }
    let i = raceObject[unitType].findIndex(e => e.priority > unitData.GlossaryPriority)
    if(i === -1){
        i = raceObject[unitType].length
    }
    raceObject[unitType].splice(i,0,{
        ...shortUnitData,
        priority: unitData.GlossaryPriority
    })

    output.units.push(shortUnitData);
}

let output = {
    races: mod.catalogs.race.map(shortInfo),
    weapons: mod.catalogs.weapon.map(shortInfo),
    upgrades: mod.catalogs.upgrade.map(shortInfo),
    abils: mod.catalogs.abil.map(shortInfo),
    buttons: mod.catalogs.button.map(shortInfo),
    behaviors: mod.catalogs.behavior.map(shortInfo),
    images: mod.images,
    units: []
};


for (let unit of mod.catalogs.unit) {
    let unitData = unit.getResolvedData()

    if (
        //skip units from dependency mods and ignored units
        unit.isCore() || unitData.ignore ||
        //skip units without defined race
        !unitData.Race || unitData.Race === 'Neut' ||
        //skip units without required fields
        !unitData.GlossaryPriority || unitData.EditorFlags?.NoPalettes || unitData.EditorFlags?.NoPlacement
    ){
        continue;
    }

    //add short info to the race data object
    addUnit(unit)
}

let outputDirectory = 'C:\\Program Files (x86)\\StarCraft II\\output'
for (let file in output){
    let foutput = outputDirectory + "\\" + file
    fs.mkdirSync(foutput.substring(0, foutput.lastIndexOf('\\')), {recursive: true});
    fs.writeFileSync(foutput + '.json', SCParser.formatData(output[file],'json' ),'utf-8')
}
console.log("Finished!")



