import {SCMod} from "./sc-mod.js";
import {deep, deepReplaceMatch, isNumeric, matchType, TYPES} from "./operations.js";
import {SCEntity} from "./sc-entity.js";
import {SCSchema} from './sc-schema.js';

export const SCGame = {
    datafiles: [
        "abil", "accumulator", "achievement", "achievementterm", "actor", "actorsupport", "alert", "armycategory", "armyunit",
        "armyupgrade", "artifact", "artifactslot", "attachmethod", "bankcondition", "beam", "behavior", "boost", "bundle",
        "button", "camera", "campaign", "character", "cliff", "cliffmesh", "colorstyle", "commander", "config", "consoleskin",
        "conversation", "conversationstate", "cursor", "datacollection", "datacollectionpattern", "decalpack", "dsp", "effect",
        "emoticon", "emoticonpack", "error", "footprint", "fow", "game", "gameui", "herd", "herdnode", "hero", "heroabil",
        "herostat", "item", "itemclass", "itemcontainer", "kinetic", "lensflareset", "light", "location", "loot", "map",
        "model", "mount", "mover", "objective", "physicsmaterial", "ping", "playerresponse", "portraitpack", "preload",
        "premiummap", "racebannerpack", "race", "requirement", "requirementnode", "reverb", "reward", "scoreresult", "scorevalue",
        "shape", "skin", "skinpack", "sound", "soundexclusivity", "soundmixsnapshot", "soundtrack", "spray", "spraypack",
        "stimpack", "taccooldown", "tactical", "talent", "talentprofile", "targetfind", "targetsort", "terrain", "terrainobject",
        "terraintex", "texture", "texturesheet", "tile", "trophy", "turret", "unit",
        "upgrade","user","validator","voiceover","voicepack","warchest","warchestseason","water","weapon"
    ],
    schema: {},
    classlist : {},
    defaultPickIgnoreObjects: {
        validator:  [
            'CasterNotDead',
            'NotHidden',
            'Failure',
            'Pathable',
        ],
        path:  [
            "*.*.Race",
            'CValidatorUnitFilters',
            'CValidatorUnitCompareDamageTakenTime',
            'CEffectRemoveBehavior',
            'CValidatorUnitFilters',
            'CValidatorUnitCompareVital',
            'CValidatorUnitOrderQueue',
            'CValidatorUnitCompareResourceContents',
            'CValidatorUnitMover',
            'CValidatorUnitCompareMoverPhase',
            "CEffectIssueOrder.*.Abil",
            "CUpgrade.*.AffectedUnitArray",
            "CUpgrade.*.EffectArray.Reference",
            "CUnit.*.TechTreeProducedUnitArray.value",
            "CBehaviorBuff.*.Modification.AbilLinkDisableArray",
            "CBehaviorBuff.*.Modification.AbilLinkEnableArray",
            "CBehaviorBuff.*.Modification.BehaviorLinkDisableArray",
            "CBehaviorBuff.*.Modification.BehaviorLinkEnableArray.value",
            "CUnit.*.TechTreeUnlockedUnitArray",
            "CValidatorUnitCompareBehaviorCount.*.Behavior",
            "CValidator*.*.*.Effect",
            "CBehaviorBuff.*.DamageResponse.RequireEffectArray",
            "CRequirement*.*.Count.Link"
        ],
        requirementnode: [1,2,3,4,5,6,7,8,9,10],
        turret: [
            'FreeRotate'
        ],
        behavior: [
            'CloneDummy',
            'ForceLowDeath',
            'KillsToCaster',
            'CloakFieldEffect',
            'CloakField',

            'SCVHarvest',
            'ProbeHarvest',
            'DroneHarvest',
            'CarryMineralFieldMinerals',
            'CarryHighYieldMineralFieldMinerals',
            'CarryHarvestableVespeneGeyserGas',
            'CarryHarvestableVespeneGeyserGasProtoss',
            'CarryHarvestableVespeneGeyserGasZerg',
            'HarvestableVespeneGeyserGas',
            'HarvestableVespeneGeyserGasProtoss',
            'HarvestableVespeneGeyserGasZerg',
            'HarvestableRichVespeneGeyserGas',
            'HarvestableRichVespeneGeyserGasProtoss',
            'HarvestableRichVespeneGeyserGasZerg',
        ],
        effect: [
            'Kill',
            'Suicide',
            'AttackCancel',
            'DisableCasterWeaponsApplyBehavior',
            'DisableCasterEnergyRegenApplyBehavior',
            'TimedLifeFate',
        ],
        button: [
            'Move',
            'MovePatrol',
            'MoveHoldPosition',
            'AcquireMove',
            'Turn',
            'Stop',
            'Cheer',
            'Dance',
            'HoldFire',
            'HoldFireSpecial',
            'Cancel',
            'CancelBuilding',
            'Halt',
            'Spray',
            'AttackBuilding',
            'Attack',
            'Rally',
            'AttackWorker',
            'LoadOutSprayDefault',
            'LoadOutSpray@1',
            'LoadOutSpray@2',
            'LoadOutSpray@3',
            'LoadOutSpray@4',
            'LoadOutSpray@5',
            'LoadOutSpray@6',
            'LoadOutSpray@7',
            'LoadOutSpray@8',
            'LoadOutSpray@9',
            'LoadOutSpray@10',
            'LoadOutSpray@11',
            'LoadOutSpray@12',
            'LoadOutSpray@13',
            'LoadOutSpray@14',
        ],
        actor: [
            'CreepMgr'
        ],
        abil: [
            '255',
            'RallyCommand',
            'HoldFire',
            'attack',
            'move',
            'stop',
            'que5',
            'que5Passive',
            'que5Addon',
            'que5CancelToSelection',
            'que5PassiveCancelToSelection',
            'que1',
            'Rally',
            'BuildInProgress',

            'SCVHarvest',
            'ProbeHarvest',
            'ProgressRally',
            'DroneHarvest'
        ]
    },
    ignoredNamespaces: [
        "sss",
        // "achievement",
        // "achievementterm",
        // // "alert",
        // "armycategory",
        // "armyunit",
        // "armyupgrade",
        // "artifact",
        // "artifactslot",
        // "bankcondition",
        // "boost",
        // "bundle",
        // "camera",
        // "campaign",
        // "character",
        // // "cliff",
        // // "cliffmesh",
        // "colorstyle",
        // "conversation",
        // "conversationstate",
        // "config",
        // "consoleskin",
        // "gameui",
        // "location",
        // "map",
        // // "objective",
        // "premiummap",
        // "racebannerpack",
        // "reward",
        // "stimpack",
        // "trophy",
        // "warchest",
        // "warchestseason",
        // "dsp",
        // "decalpack",
        // "emoticon",
        // "emoticonpack",
        // "fow",
        // "game",
        // "herd",
        // "herdnode",
        // "hero",
        // "heroabil",
        // "herostat",
        // "lensflareset",
        // "mount",
        // "physicsmaterial",
        // "ping",
        // "playerresponse",
        // "portraitpack",
        // "preload",
        // "reverb",
        // "scoreresult",
        // "scorevalue",
        // "skinpack",
        // "soundexclusivity",
        // "soundmixsnapshot",
        // "soundtrack",
        // "spray",
        // "spraypack",
        // "talent",
        // "talentprofile",
        // "terrain",
        // "terrainobject",
        // "terraintex",
        // "tile",
        // "voiceover",
        // "voicepack",
        // "water",
        // "beam",
        // "commander"
    ],
    pickIgnoreObjects: {},
    setSchema (schemaData){
        let classlist = {}

        function _setSchemaInstance(entityID){
            let entitydata = schemaData[entityID]

            let schema = {}
            if(entitydata.catalog && schemaData[entitydata.catalog]){
                deep(schema,schemaData[entitydata.catalog],'unite');
            }
            let selfschema = {...entitydata}
            delete selfschema.prototype
            delete selfschema.catalog
            if(Object.keys(selfschema).length){
                deep(schema,selfschema,'unite')
            }
            if(entitydata.prototype && !classlist[entitydata.prototype]){
                _setSchemaInstance(entitydata.prototype)
            }

            let entity = new SCEntity({
                class: entityID,
                $namespace: entitydata.catalog,
                $parent: entitydata.prototype && classlist[entitydata.prototype],
                $schema: schema
            });
            classlist[entityID] = entity

            //todo remvoe this
            if(schema.OperandArray){
                Object.freeze(entity.$$schema.OperandArray[0])
            }


        }
        for (let entityID in schemaData){
            _setSchemaInstance(entityID)
        }
        this.classlist = classlist
    },
    _objectScheme(object,schema,path,options = {}){
        if(! this._matchPath(options.path,path)){
            return
        }
        for (let property in object) {
            if (['id', 'class', 'parent', 'default', 'removed'].includes(property)) continue;
            let _path = [...path,property].join(".")
            if(property === "Unit"){
                property
            }
            if(! this._matchPath(options.path,_path))continue
            if(property === "Unit"){
                property
            }
            let value = object[property]
            if(!this._schemaValues[_path]){
                this._schemaValues[_path] = []
            }
            let values = this._schemaValues[_path];
            let isarray = property.endsWith("Array") || (value.constructor === Array && value.length > 1)
            if(isarray && value.constructor === String){
                value = [{value}]
            }

            if (value.constructor === Array && value.length === 1){
                value = value[0]
            }
            if(value.constructor === Object){
                isarray = isarray || value.index || value.removed
                value = {...value}
                // delete value.index
                delete value.removed
                if(isarray) value = [value]
            }
            if (value.constructor === Object && !Object.keys(value).length) {
                continue
            }
            if (value.constructor === Object && Object.keys(value).length === 1 && value.value !== undefined) {
                value = value.value
            }


            if(value === ""){
                continue
            }
            let type = this._getType(schema,property)

            if(type){
                if(type.constructor === Array ){
                    if(value.constructor === Object){
                        value = [value]
                    }
                    if(value.constructor === String){
                        value = [{value}]
                    }
                }
                if (type.constructor === Object ) {
                    if(value.constructor === Array){
                        type = [type]
                    }
                    if(value.constructor === String){
                        value = {value}
                    }
                }
                if (type.constructor === String ) {
                    if (value.constructor === Array) {
                        type = [{value: type}]
                    }
                    if (value.constructor === Object) {
                        type = {value: type}
                    }
                }
            }
            else {
                if(value.constructor === Array ){
                    type = [{}]
                }
                if (value.constructor === Object) {
                    type = {}
                }
                if (value.constructor === String) {
                    type = 'unknown'
                }
            }

            values.push(value)

            let specialProperties = {
                "SortArray": "[targetsort]",
                // "EffectArray": "[effect]",
                // "PeriodicEffectArray": "[effect]",
                race: "race",
                Race: "race",
                Face: "button",
                "BuildOnAs": "unit",
                // "BuiltOn": "[unit]",
                // GlossaryAlias: "[unit]",
                // TechAliasArray: "[unit]",
                // GlossaryStrongArray: "[unit]",
                // GlossaryWeakArray: "[unit]",
                Ops: "ops",
                Send: "send",
                Terms: "terms",
                Reference: "reference",
                AbilCmd: "abilcmd",
                SelectAbilCmd: "abilcmd",
            };


            let newtypeoptions
            if(property === "index"){
                if(type !== 'word' && isNumeric(value)){
                    type = 'int'
                    continue;
                }
                else{
                    type = 'word'
                }
            }
            else if(specialProperties[property]){
                type = specialProperties[property]
            }
            else if (value.constructor === Array) {
                let typeitem = type[0]
                // if (value.find(item => item.index && !isNumeric(item.index))) {
                //     typeitem.index = "word"
                // }
                for (let valueitem of value) {
                    this._objectScheme(valueitem, typeitem,[...path,property],options)
                }
                let len = Object.keys(typeitem).length

                if(typeitem.value?.constructor === String){
                    if(len === 1 || (len === 2 && ["bit","int"].includes(typeitem.index))){
                        type = `[${typeitem.value}]`
                    }
                    else if(len === 2 && typeitem.index === "word"){
                        type = `{${typeitem.value}}`
                    }
                }
            }
            else if (value.constructor === Object) {
                this._objectScheme(value, type,[...path,property],options)
            }
            else if (matchType(value,TYPES.BIT)) {
                newtypeoptions = {
                    type: 'bit',
                    bigger: ['reals','real','int']
                }
            }
            else if (matchType(value,TYPES.INT)) {
                newtypeoptions = {
                    type: 'int',
                    smaller: ['bit'],
                    bigger: ['reals','real']
                }
            }
            else if (matchType(value,TYPES.REAL)) {
                newtypeoptions = {
                    type: 'real',
                    smaller: ['int','ints','bit'],
                    bigger: ['reals']
                }
            }
            else if (matchType(value,TYPES.INTS)) {
                newtypeoptions = {
                    type: 'ints',
                    smaller: ['int','bit'],
                    bigger: ['reals']
                }
            }
            else if (matchType(value,TYPES.REALS)) {
                newtypeoptions = {
                    type: 'reals',
                    smaller: ['ints','real','int','bit']
                }
            }
            else if (matchType(value,TYPES.FILTERS)) {
                newtypeoptions = {
                    type: 'filters'
                }
            }
            else if (matchType(value,TYPES.CATEGORIES)) {
                newtypeoptions = {
                    type: 'categories',
                    smaller: ['word']
                }
            }
            else if (matchType(value,TYPES.FILE)|| property.endsWith("Icon")) {
                newtypeoptions = {
                    type: 'file',
                    smaller: ['word']
                }
            }
            else if (matchType(value,TYPES.LINK)) {
                newtypeoptions = {
                    type: 'link',
                    smaller: ['word']
                }
            }
            else if (matchType(value,TYPES.WORD)) {
                let catalog;
                for (let compareCatalog in this.cache) {
                    // let compareCatalogCapitalized = compareCatalog.substr(0, 1).toUpperCase() + compareCatalog.substr(1);

                    if (this.cache[compareCatalog][value]) {
                        let parentNode = path[path.length - 1]

                        if (property.toLowerCase().includes(compareCatalog)) {
                            catalog = compareCatalog;
                            break;
                        }
                        if ((property==="value" || property==="Link") && parentNode.toLowerCase().includes(compareCatalog)) {
                            catalog = compareCatalog;
                            break;
                        }
                    }

                    if(type === compareCatalog){
                        catalog = compareCatalog;
                        break;
                    }
                }
                if(catalog){

                    newtypeoptions = {
                        type: catalog,
                        smaller: ['word']
                    }
                }
                else{
                    newtypeoptions = {
                        type: 'word',
                        bigger: ['words']
                    }
                }

            }
            else if (/^[\w+@_#]+(,[\w+@_#]+)+$/.test(value)) {
                newtypeoptions = {
                    type: 'words',
                    smaller: ['word']
                }
            }
            else {
                newtypeoptions = {
                    type: 'string'
                }
            }



            if(newtypeoptions && type !== newtypeoptions.type && !newtypeoptions.bigger?.includes(type) && type !== 'string'){
                if(type === 'unknown' || newtypeoptions.smaller?.includes(type)) {
                    type = newtypeoptions.type
                }
                else{
                    type = 'string'
                }
            }


            schema[property] = type
        }
    }
}
SCGame.setSchema(SCSchema)


