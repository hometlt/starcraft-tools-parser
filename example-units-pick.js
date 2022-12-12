//create the mod instance
import {SCMod} from "./src/sc-mod.js";

let mod = new SCMod()

//we can read the previously saved combined mod
await mod.read('./input/combined.json')

//pick the instances and all related data from the mod. prevent from adding too much data using exclude option
mod.pick({race: ["Terr"]},{
    exclude: {
        unit: ['WarHound'],
        abil: ['PlacePointDefenseDrone']
    }
})
mod.pick({race: ["Zerg"]},{
    exclude: {
        validator: ['IsNotWarpingIn', 'IsNotPhaseShifted', 'BattlecruiserNotJumping', 'IsBunker', 'IsVikingAir', 'IsVikingGround',],
        unit: ["Zealot", "Marine", "InfestorTerran", "VikingAssault", "VikingFighter",],
        behavior: ['Precursor', 'LockOnDisableAttack', 'MothershipCoreRecalling', 'Recalling',],
        weapon: ['PsiBlades', 'GuassRifle'],
        abil: ['Stimpack', 'InfestedTerrans',]
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

//get the count of picked entities
console.log("Picked Entities: " + mod.entities.length)

//prefix all filtered entities with 'Legacy' word. where '*' is an old entity id
mod.renameEntities("Legacy*")

//save new mod dara in a specific folder (can be used in game)
await mod.write('./output/patch')