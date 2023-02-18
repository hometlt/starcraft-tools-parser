import {SCMod} from "./sc-mod.js";
import {cleanup, formatData} from "./operations.js";

SCMod.prototype._quickInfo = function (entity){
    if(!entity){
        return {}
    }
    return {
        Id: entity.id,
        Icon: entity.$$resolved.Icon,
        Tooltip: this.locales.enUS.GameStrings[entity.$$resolved.Tooltip],
        Description: this.locales.enUS.GameStrings[entity.$$resolved.Description],
        Name:  this.locales.enUS.GameStrings[entity.$$resolved.Name],
    }
}

SCMod.prototype._weaponInfo = function (entity){
    if(!entity){
        return {}
    }
    let effect = entity.$$resolved.DisplayEffect && this.cache.effect[entity.$$resolved.DisplayEffect]?.$$resolved
    return {
        ...this._quickInfo(entity),
        Amount: effect?.Amount?.value,
        AttributeBonus: effect?.AttributeBonus,
        Kind: effect?.Kind,
        DisplayAttackCount: entity.$$resolved.DisplayAttackCount,
        TargetFilters: entity.$$resolved.TargetFilters?.split(";")[0].replace(",Visible","").replace("Visible",""),
        Range: entity.$$resolved.Range || entity.$$resolved.MinScanRange,
        Period: entity.$$resolved.Period,
    }
}

SCMod.prototype._unitAbilCmds = function (unitData){
    let lbs = []
    if(unitData.CardLayouts){
        for(let cl of unitData.CardLayouts){
            if(cl.LayoutButtons){
                for(let lb of cl.LayoutButtons) {
                    if(lb.AbilCmd){
                        lbs.push({
                            ...this._quickInfo(this.cache.button[lb.Face]),
                            AbilCmd: lb.AbilCmd
                        })
                    }
                }
            }
        }
    }
    return lbs
}


SCMod.prototype._unitCard = function (unitData) {
    if (unitData.CardLayouts) {
        for (let cl of unitData.CardLayouts) {
            if (cl.LayoutButtons) {
                cl.LayoutButtons = cl.LayoutButtons.filter(lb => lb.Face && lb.Type && lb.Type !== 'Undefined' && (!lb.Row || lb.Row <3)  && (!lb.Column || lb.Column <5))
                for (let lb of cl.LayoutButtons) {
                    let btn = this.cache.button[lb.Face]
                    if(btn){
                        let hotkey = this.locales.enUS.GameHotkeys[btn.$$resolved.Hotkey];

                        let specialHotkeys = {
                            Escape: 'Esc'
                        }
                        if(specialHotkeys[hotkey]){
                            hotkey = specialHotkeys[hotkey]
                        }

                        Object.assign(lb, {
                            ...this._quickInfo(btn),
                            Hotkey: hotkey
                        })
                    }
                }
            }
        }
    }
}

SCMod.prototype.writeWiki = async function(path,options = {requireGlossaryPriority: true}){

    this.apply({
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
    })
    this.checkImages()
    this.populateUnitsWithActorsData()
    this.makeAbilCmds()
    this.resolveTextValues()

    for(let upgrade of this.catalogs.upgrade){
        this.pickEntity(upgrade)
    }
    for(let cat in this.catalogs){
        for(let entity of this.catalogs[cat]) {
            cleanup(entity.$$resolved)
        }
    }

    await this.write(path,{
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

            let result = {
                races: []
            }
            for (let unit of mod.catalogs.unit) {
                let unitData = unit.$$resolved
                if (unit.$overriden || unit.__core){
                    continue;
                }
                if (!unitData.Race || unitData.Race === 'Neut') {
                    continue;
                }
                if (options.requireGlossaryPriority && !unitData.GlossaryPriority) {
                    continue;
                }
                if (unitData.ignore) {
                    continue;
                }
                if (unitData.EditorFlags?.NoPalettes || unitData.EditorFlags?.NoPlacement){
                    continue;
                }



                let {abilCmdsIds,requiredUnits, requiredUpgrades, producingUnits} = mod.producingRequirements(unit.id)
                let Producers = producingUnits.map(x => this._quickInfo(mod.cache.unit[x]));
                // if(!Producers.length){
                //     console.log('no producers '+ unit.id)
                //     continue
                // }

                let {productionUnits, productionUpgrades} = mod.unitProduction(unit.id)

                let Production = [
                    ...productionUnits.map(x => this._quickInfo(mod.cache.unit[x])),
                    ...productionUpgrades.map(x => this._quickInfo(mod.cache.upgrade[x]))
                ]

                let Requirements = [
                    ...requiredUnits.map(x => this._quickInfo(mod.cache.unit[x])),
                    ...requiredUpgrades.map(x => this._quickInfo(mod.cache.upgrade[x]))
                ]

                let Upgrades = mod.catalogs.upgrade
                    .map(u => u.$$resolved)
                    .filter(u => u.AffectedUnitArray?.includes(unit.id))
                    .map(u => ({
                        ...u,
                        Link: u.id,
                        id: null,
                        EffectArray: u.EffectArray?.filter(e => e.Reference)
                            // ?.filter(e => e.Reference?.split(',')[1] === unit.id)
                            .map(e => ({
                                Operation: e.Operation,
                                Value: e.Value,
                                Catalog: e.Reference.split(',')[0],
                                Entity: e.Reference.split(',')[1],
                                Property: e.Reference.split(',')[2]
                            }))
                            .filter(e => !e.Property.includes("Icon"))
                    }))
                    .map(entry => ({...entry, ...this._quickInfo(mod.cache.upgrade[entry.Link])}))
                    .filter(u => u.Icon)

                let Abilities = unitData.AbilArray && unitData.AbilArray.map(entry => ({
                    ...entry,
                    ...this._quickInfo(mod.cache.abil[entry.Link])
                })) || null

                let Behaviors = unitData.BehaviorArray && unitData.BehaviorArray.map(entry => ({
                    ...entry,
                    ...this._quickInfo(mod.cache.behavior[entry.Link])
                })) || null

                let Weapons = unitData.WeaponArray && unitData.WeaponArray
                    .filter(entity => entity.Link)
                    .map(entry => ({
                        ...entry,
                        ...this._weaponInfo(mod.cache.weapon[entry.Link])
                    }))

                function flagArray(property){
                    return property && Object.entries(property).filter(([key,value]) => value).map(([key,value]) => key)
                }

                let categories = unitData.EditorCategories?.split(",").map(cat => cat.split(':'))
                    .reduce((acc, [category, value]) => ({...acc, [category]: value}), {}) || null


                this._unitCard(unitData)

                output[`unit/${unit.id}.json`] = formatData({
                    ...unitData,
                    ...this._quickInfo(mod.cache.unit[unit.id]),
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
                    Commands: this._unitAbilCmds(unitData),
                    EditorFlags: flagArray(unitData.EditorFlags),
                    FlagArray: flagArray(unitData.FlagArray),
                    PlaneArray: flagArray(unitData.PlaneArray),
                    Collide: flagArray(unitData.Collide),
                    Attributes: flagArray(unitData.Attributes),
                    EditorCategories: categories
                }, 'json')


                let raceObject = result.races.find(r => r.link === unitData.Race)
                if(!raceObject){
                    // let mods
                    // switch(unitData.Race){
                    //     case 'Prot':
                    //     case 'Zerg':
                    //     case 'Terr':
                    //         mods = ['lotv','arc','scion']
                    //         break;
                    //     case 'Gen':
                    //     case 'Keir':
                    //     case 'Xayi':
                    //         mods = ['arc','scion']
                    //         break;
                    //     case 'Dragon':
                    //     case 'UED':
                    //     case 'UPL':
                    //     case 'NHbr':
                    //         mods = ['arc']
                    //         break;
                    // }

                    raceObject = {
                        link: unitData.Race,
                        name: mod.locales.enUS.GameStrings[mod.cache.race[unitData.Race].$$resolved.Name],
                        // mods,
                        structures: [],
                        units: []
                    }
                    result.races.push(raceObject)
                }
                let category = categories?.ObjectType === 'Structure' ? 'structures' : 'units'
                let i = raceObject[category].findIndex(e => e.priority > unitData.GlossaryPriority)
                if(i === -1){
                    i = raceObject[category].length
                }
                raceObject[category].splice(i,0,{
                    ...this._quickInfo(mod.cache.unit[unit.id]),
                    priority: unitData.GlossaryPriority
                })
            }
            output[`data.json`] =  formatData(result, 'json')
        },
        scopes: []
    })
}