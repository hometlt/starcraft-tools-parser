/**
    mods/1-LibertyMod
    mods/2-LibertyCampaign
    mods/3-SwarmMod
    mods/4-SwarmCampaign
    mods/5-VoidMod
    mods/6-VoidCampaign
    mods/7-VoidMulti
**/
import * as SCParser from "./index.js";
import fs from 'fs'
import {capitalize, deep, formatData} from "./index.js";
import path from "path";


SCParser.SCGame.directories.mods = `C:\\Program Files (x86)\\StarCraft II\\mods\\all-races-mods`

//Legacy X
if(false) {

    let mod = await SCParser.createMod({
        core: [
            '$mods/dependencies/Core',
            '$mods/dependencies/Base',
        ],
        mods: [
            '$mods/dependencies/Legacy',
        ]
    })

    mod.renamePickedEntities()
    await mod.writeMod('compiled/Legacy','./data/compiled-legacy',{Name:`[ARX] Legacy`, LongDest: `Compiled Legacy dependency`})

}

// //Legacy X + Starlight
//
if(false) {

    let mod = await SCParser.createMod({
        core: [
            '$mods/dependencies/Core',
            '$mods/dependencies/Base',
        ],
        mods: [
            '$mods/dependencies/Legacy',
            '$mods/factions/Scion',
            '$mods/dependencies/Starlight',
        ]
    })

    mod.renamePickedEntities()
    await mod.writeMod('compiled/Starlight','./data/compiled-legacy',{Name:`[ARX] Starlight`, LongDest: `Compiled Starlight dependency`})

}

/**
 * Make Base Dependency
 * Path: dependencies/Coop.sc2mod/Base.SC2Data/GameData
 * Path: dependencies/Coop.sc2mod/enUS.SC2Data
 * Path: dependencies/Coop.sc2mod/ruRU.SC2Data
 */
if(false){
    let mod = new SCParser.SCMod()
    await mod.read([
        './data/legacy/factions/Liberty',
        './data/legacy/factions/Swarm',
        './data/legacy/factions/Void',
        './data/legacy/factions/Multi'
    ])
    await mod.writeMod( 'combined/VoidMulti','./data/base', {Name:`[ARC] VoidMulti`, LongDest: `Combined Void Multi dependency`})
}

/**
 * Make Base Dependency
 * Path: dependencies/Coop.sc2mod/Base.SC2Data/GameData
 * Path: dependencies/Coop.sc2mod/enUS.SC2Data
 * Path: dependencies/Coop.sc2mod/ruRU.SC2Data
 */
if(false){
    let mod = new SCParser.SCMod()
    await mod.read([
        '$mods/legacy/base/Liberty',
        '$mods/legacy/base/Swarm',
        '$mods/legacy/base/Void',
        '$mods/legacy/base/Multi',
        '$mods/legacy/base-campaign/Liberty',
        '$mods/legacy/base-campaign/Swarm',
        '$mods/legacy/base-campaign/Void',
        '$mods/legacy/base-campaign/Coop',
        '$mods/legacy/base-campaign/Coop2',
    ])
    await mod.writeMod( 'combined/Base','./data/base', {Name:`[ARC] Base`, LongDest: `Combined Base dependency`})
}

/**
 * Make Coop Dependency
 * Path: dependencies/Coop.sc2mod
 */
if(false){
    let mod = new SCParser.SCMod()
    await mod.read([
        '$dependencies/Coop',
    ])
    mod.saveCore()

    await mod.read([
        '$mods/legacy/factions/Liberty',
        '$mods/legacy/factions/Swarm',
        '$mods/legacy/factions/Void',
        '$mods/legacy/factions/Multi',
        '$mods/legacy/factions-campaign/Liberty.SC2Mod',
        '$mods/legacy/factions-campaign/Swarm.SC2Mod',
        '$mods/legacy/factions-campaign/Void.SC2Mod',
        '$mods/legacy/factions-campaign/Coop.SC2Mod',
    ])
    mod.removeUnusedSounds()

    await mod.writeMod('combined/Legacy','./data/combined-legacy', {Name:`[ARC] Legacy`, LongDest: `Combined Legacy dependency`})

    mod.renamePickedEntities(mod)
    await mod.writeMod('compiled/Legacy','./data/compiled-legacy',{Name:`[ARX] Legacy`, LongDest: `Compiled Legacy dependency`})
}

/**
 * Mace Factions Mod
 */
if(true){

    let mod = await SCParser.createMod({
        core: [
            '$mods/dependencies/Core',
            '$mods/dependencies/Base',
            '$mods/factions/Legacy',
        ],
        mods: [
            // '$mods/dependencies/LegacyCoop',
            // '$mods/factions/ProtossTalon',
            '$mods/dependencies/Triggers',
            '$mods/factions/Scion',
            '$mods/factions/Hybrids',
            '$mods/factions/UED',
            '$mods/factions/Dragons',
            '$mods/factions/UPL',
            '$mods/factions/Umojan',
            '$mods/factions/Synoid',
            '$mods/dependencies/Melee',
            // '$mods/factions/Colonial',
            // '$mods/factions/Tyranid',
            // '$mods/factions/WarCraft',
            // '$mods/factions/Nexus',
        ]
    })


    let result = {
        Ready :{},
        Birth :{},
        What :{},
        Yes :{},
        Attack :{},
        Pissed :{},
    }


    mod.index()

    if(false){
        mod.removeUnusedSounds()

        function removeSoundReference(actor,sound, events, type){
            if(sound?.id){
                for(let event of events){
                    let unit = event.Terms.split(".")[1]
                    if(!result[type]){
                        result[type] = {}
                    }

                    let assets = sound.$$resolved.AssetArray?.map(asset => {
                        if(asset.TemplateParam){
                            let template = sound.$$resolved.AssetArrayTemplate
                            asset = Object.assign(asset,{
                                File: template.File.replace(/\^TemplateParam[1-9]\^/,asset.TemplateParam),
                                FacialAnim: template.FacialAnim.replace(/\^TemplateParam[1-9]\^/,asset.TemplateParam),
                                FacialGroup: template.FacialGroup.replace(/\^TemplateParam[1-9]\^/,asset.TemplateParam),
                                FacialFile: template.FacialFile.replace(/\^TemplateParam[1-9]\^/,asset.TemplateParam),
                                Volume: asset.Volume?.replace(/\.0+/g,""),
                                Pitch: asset.Pitch?.replace(/\.0+/g,"")
                            })
                            delete asset.TemplateParam
                            // <AssetArrayTemplate File="LocalizedData\Sounds\VO\Protoss\^TemplateParam2^.ogg" FacialAnim="^TemplateParam1^" FacialGroup="^TemplateParam1^" FacialFile="LocalizedData\Sounds\VO\Protoss\^TemplateParam1^.fxe"/>
                            // return asset.File
                        }
                        for(let prop in asset){
                            if(!asset[prop]){
                                delete asset[prop]
                            }
                        }

                        return asset
                    })

                    if(assets){
                        result[type][unit] = {
                            //  id: sound.id,
                            AssetArray: assets,
                            Pitch: sound.$$resolved.Pitch?.replace(/\.0+/g,""),
                            Volume: sound.$$resolved.Volume?.replace(/\.0+/g,""),
                        }
                    }


                }
                if(!sound.$$references){
                    console.log("removeSoundReference - No Refenrces: " + sound.id + " actor: " + actor.id)
                }

                sound.$$references = sound.$$references?.filter(ref =>  ref.target !== actor)

                if(!sound.$$references || sound.$$references.length === 0){
                    mod.remove(sound)
                    console.log("Sound Removed: "  + sound.id)
                    count++
                    return;
                }
            }
        }

        let count = 0
        for(let actor of mod.catalogs.actor){
            if(actor.default || actor.__core)continue
            let events = actor.$$resolved.On?.filter(On => /UnitBirth.[\w@]+/.test(On.Terms) && On.Send === "Create")
            if(!events?.length) continue

            let types = ['Birth','Ready','What','Pissed','Yes','Attack']
            for(let type of types){
                if(actor.$$resolved.DeathArray){
                    for(let deathType in actor.$$resolved.DeathArray){
                        let deathArrayValue = actor.$$resolved.DeathArray[deathType]
                        if(deathArrayValue.SoundLink){
                            SCParser.deep(actor,{DeathArray: {[deathType]: {SoundLink: ""}}})
                            removeSoundReference(actor,mod.cache.sound[deathArrayValue.SoundLink], events, "Death" + deathType)
                        }
                    }
                }

                let soundArrayTypes = ['GroupSoundArray','SoundArray']
                for(let soundArrayType of soundArrayTypes){
                    let soundArray = actor.$$resolved[soundArrayType]
                    if(soundArray?.[type]){
                        SCParser.deep(actor,{SoundArray: {[type]: ""}})
                        removeSoundReference(actor,mod.cache.sound[soundArray[type]],  events, type)
                        // let symbol = sound?.id ? '✔' : '⨉'
                        // console.log(symbol + ' Birth Sound ID: ' + soundArray.Birth)
                    }
                }
            }
        }

        console.log("removed sounds: " + count)
        fs.writeFileSync('result2.json',JSON.stringify(result),{encoding: 'utf-8'})
    }

    await mod.writeMod('./result2','./data/combined-factions',{Name:`[ARC] Factions`, LongDest: `Combined Factions dependency`, ShortDesc: `1-16`})
}

/**
 * make coop
 factions/Scion
 factions/Hybrids
 factions/UED
 factions/Dragons
 factions/UPL
 factions/UPLMulti
 factions/UPLCampaign
 factions/Umojan
 factions/War�raftMulti
 **/
if(false){
    let mod = await SCParser.createMod({ mods: [
            '$coop/Legacy',
            '$coop/Factions',
            '$coop/Nexus',
            '$coop/ProtossTalon',
            '$coop/UmojanKerrigan',
            '$coop/KeironMeneltor',
            // '$coop/UPLCampaign',
            '$coop/Warcraft',
        ]})
    mod.removeUnusedSounds()

    await mod.writeMod('combined', 'Coop',{Name:`[ARC] Coop`, LongDest: `Combined Coop dependency`, ShortDesc: `1-16`})
// renamePickedEntities(mod)
// await writeMod(mod,'compiled','Coop',{Name:`[ARX] Coop`, LongDest: `Compiled Coop dependency`, ShortDesc: `1-16`})
}