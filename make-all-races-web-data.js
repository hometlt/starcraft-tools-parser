import { SCMod } from './src/sc-mod.js';
import fs from 'fs'

const mod = new SCMod()

mod.directory('../data-input')
await mod.read('0.Core','1.Liberty','2.Liberty Campaign','4.Swarm','5.Swarm Campaign','7.Void','8.Void Campaign')

mod.directory('../../Mods/all-races-mods')
await mod.read('VoidBalance','Campaign','Scion','UED','Hybrids','Dragons','UPL','UPLCampaign','UPLBalance')

mod.directory('../../Mods/all-races-core')
await mod.read('Core')
/*
mod.pick({race: ["Zerg"]},{
    exclude: {
        validator: ['IsNotWarpingIn', 'IsNotPhaseShifted', 'BattlecruiserNotJumping', 'IsBunker', 'IsVikingAir', 'IsVikingGround',],
        unit: ["Zealot", "Marine", "InfestorTerran", "VikingAssault", "VikingFighter",],
        behavior: ['Precursor', 'LockOnDisableAttack', 'MothershipCoreRecalling', 'Recalling',],
        weapon: ['PsiBlades', 'GuassRifle'],
        abil: ['Stimpack', 'InfestedTerrans',]
    }
})
mod.pick({race: ["Terr"]},{
    exclude: {
        unit: ['WarHound'],
        abil: ['PlacePointDefenseDrone']
    }
})
mod.pick({race: ["Prot"]},{
    exclude: {
        effect: ['InstantUnburrow', 'InstantMorphUnburrowAB',],
        unit: ['ArbiterMP', 'CorsairMP', 'Replicant'],
        abil: ['ResourceStun',]
    }
})
//pick all actors for picked instances. todo: actors are ignored in pick function
mod.pickActors()

//only leave picked entities.
mod.filter()

*/

SCMod.prototype.addActorsDataToUnits = function (){

    let images = fs.readdirSync('./../data-viewer/server/icons').map(file => file.replace('.png',''))

    function checkImage(path){
        if(!path)return false
        path = path.value || path
        path = path.replace(/\\/g,'/').replace('Assets/Textures/','').replace('.dds','')
        if(!images.includes(path)){
            return false
        }
        return path
    }

    for(let actor of mod.catalogs.actor){
        if(mod.catalogs.actor.unitName){
            let unit = mod.cache.unit[unitId]
            if(!unit)continue
            unit.$actor = actor.id
        }
    }

    for(let actor of mod.catalogs.actor){
        let events = actor.$$resolved.On?.filter(event => event.Send === 'Create')
        if(events){
            for (let event of events){
                let eventname = event.Terms.split('.')[0]
                if(eventname === 'UnitBirth' || eventname === 'UnitConstruction'){
                    let unitId = event.Terms.split('.')[1]
                    if(!unitId)continue;
                    let unit = mod.cache.unit[unitId]
                    if(!unit) continue;
                    if(!unit.actor){
                        unit.actor = actor
                    }
                }
            }
        }
    }

    for(let entity of mod.catalogs.weapon) {
        entity.Icon = checkImage(entity.Icon)
    }
    for(let entity of mod.catalogs.upgrade) {
        entity.Icon = checkImage(entity.Icon)
    }
    for(let entity of mod.catalogs.button) {
        entity.Icon = checkImage(entity.Icon)
    }
    for(let entity of mod.catalogs.behavior) {
        entity.Icon = checkImage(entity.InfoIcon)
    }

    for(let unit of mod.catalogs.unit){
        if(unit.actor){
            unit.UnitIcon = checkImage(unit.actor.$$resolved.UnitIcon) || checkImage(unit.actor.$$resolved.Wireframe?.Image?.[0])
            unit.LifeArmorIcon = checkImage(unit.actor.$$resolved.LifeArmorIcon)
            unit.ShieldArmorIcon = checkImage(unit.actor.$$resolved.ShieldArmorIcon)
            delete unit.actor
        }
    }

}

for(let i = mod.catalogs.unit.length; i--;){
    let unit = mod.catalogs.unit[i]
    if(unit.EditorFlags?.NoPalettes || unit.EditorFlags?.NoPlacement){
        mod.entities.splice(mod.entities.indexOf(unit))
        mod.catalogs.unit.splice(i,1)
        delete mod.cache.unit[unit.id]
    }
}


mod.addActorsDataToUnits()



//save data in JSON format to use on Web
await mod.write('../data-viewer/server/data', {
    format: 'json',
    resolve: true,
    scopes: ['data','locales'],
    catalogs: ['abil', 'accumulator', 'footprint','behavior', 'button', 'effect', 'race', 'requirement', 'requirementnode', 'turret', 'unit', 'upgrade', 'user', 'validator', 'weapon', 'skin', 'shape']
})


