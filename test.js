import * as fs from "fs";
import {SCGame} from "./src/sc-game.js";
import {SCMod} from "./src/sc-mod.js";
import {stringValues, convertObjectsToIndexedArray} from "./src/operations.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
process.chdir(__dirname)


let mod = new SCMod({title: "Test mode"})
const JSON_FILE = './input/melee1.json'
const PATCH_PATH = './output/patch'
const PATCH_CREATED = fs.existsSync(PATCH_PATH)
const JSON_CREATED = fs.existsSync(JSON_FILE)
const LOAD_METHOD = 'MERGE'
const FORCE_PATCH = true

//Load Mods as XML and Save Catalogs Data as JSON
if(LOAD_METHOD === 'MERGE' || !JSON_CREATED){
    await mod.read("./input/0.Core.SC2Mod")
    await mod.read("./input/1.Liberty.SC2Mod")
    await mod.read("./input/4.Swarm.SC2Mod")
    await mod.read("./input/7.Void.SC2Mod")
    // await mod.read("./input/LibertyCampaign.SC2Mod")
    // await mod.read("./input/SwarmCampaign.SC2Mod")
    // await mod.read("./input/VoidCampaign.SC2Mod")
    await mod.read("./input/9.Void Multi.SC2Mod")


    // fs.writeFileSync(JSON_FILE, JSON.stringify(mod, null,"  "))
}

//Load Mods from JSON
if(LOAD_METHOD === 'JSON' && JSON_CREATED){
    await mod.read(JSON_FILE)
}

//creating game patch
// if(FORCE_PATCH || !PATCH_CREATED) {
    mod.cache.model.Barracks
    mod.cache.actor.Barracks

    mod.pick({race: ["Terr"]},{
        unit: ['WarHound'],
        abil: [
            'MorphToInfestedTerran',
            'PlacePointDefenseDrone',
        ]
    })
    mod.pick({race: ["Zerg"]},{
        validator: [
            'IsNotWarpingIn',
            'IsNotPhaseShifted',
            'BattlecruiserNotJumping',
            'IsBunker',
            'IsVikingAir',
            'IsVikingGround',
        ],
        unit: [
            "Zealot",
            "Marine",
            "InfestorTerran",
            "VikingAssault",
            "VikingFighter",
        ],
        behavior: [
            'Precursor',
            'LockOnDisableAttack',
            'MothershipCoreRecalling',
            'Recalling',
        ],
        weapon: [
            'PsiBlades',
            'GuassRifle'
        ],
        abil: [
            'Stimpack',
            'InfestedTerrans',
        ]
    })
    mod.pick({race: ["Prot"]},{
            effect: [
                'InstantUnburrow',
                'InstantMorphUnburrowAB',
            ],
            unit: [
                'ArbiterMP',
                'CorsairMP',
                'Replicant',
            ],
            abil: [
                'ResourceStun',
            ]
        })

    mod.createActorsForPickedUnits()
    mod.filter()
    console.log("Total Entities: " + mod.entities.length)
    mod.renameEntities("Legacy*")

    mod.cache.model.Barracks
    await mod.saveCatalogs("./output/patch")
    // await mod.saveCatalogs("./output/patch.json")
    // await mod.saveCatalogs("./output/patch.yaml")
    // await mod.saveCatalogs("./output/patch.xml")
// }
// else{
//     await mod.read('./output/patch')
// }


