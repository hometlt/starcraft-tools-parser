import fs from 'fs'
import path from 'path'
import url from 'url'
import xml2js from 'xml2js'
import * as yaml from "js-yaml";
import {SCGame} from "./sc-game.js";
import {SCEntity} from "./sc-entity.js";

import {
    getDataScheme,
    deep,
    formatData,
    optimizeObject,
    optimizeJSONObject,
    fromXMLToObject,
    capitalize,
    optimiseForXML,
    convertObjectsToIndexedArray,
    stringValues,
    eventEntityType,
    eventConditionEntityType,
    resolveSchemaType, isNumeric, matchType, _addRelation, getDebugInfo, relations, getAllFiles
} from "./operations.js";
import {LibrarySchema} from "./sc-schema.js";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));


let __lastTag = 0;

export class SCMod {
    constructor(mod){

        this._directory = './'
        this.entities = []
        Object.defineProperty(this, 'cache',{ configurable:true, writable: true,enumerable: false,value: {} })
        Object.defineProperty(this, 'catalogs',{ configurable:true, writable: true,enumerable: false,value: {} })

        mod && this.read(mod)
    }
    debug(){
       let info = getDebugInfo(this)
        fs.writeFileSync('./log',JSON.stringify(info, null,"  "))
    }
    directory(url){
        if(!url.endsWith('/'))url += '/'
        this._directory = url
    }
    async readLibrary (...input) {
        await this.read(...input)
        this.saveCore()
    }
    async read (...input) {
        for (let item of input) {
            if(item){
                if(item.constructor === String && item[0] === '>'){
                    this.directory(item.substring(1))
                }
                else{
                    let data = item
                    if(item.constructor === String){
                        if(!'./'.includes(item[0]) && !'.\\'.includes(item[0])){
                            item = this._directory + item
                        }
                        data = await this.getModData(item)
                    }
                    if(data){
                        this.apply(data)
                    }
                }
            }
        }
        return this
    }
    makeAbilCmds(){

        this.cache.abilcmd = {}
        this.catalogs.abilcmd = []
        let abilcmds = this.catalogs.abil.filter(entry => entry.$$resolved.InfoArray).reduce((prev,ability)=> {
            prev.push(...Object.entries(ability.$$resolved.InfoArray).map(([cmd,info]) => ({id: ability.id +"," + cmd, abil: ability.id, cmd})))
            return prev
        },[])
        for(let abilcmd of abilcmds){
            this.cache.abilcmd[abilcmd.id] = {
                id: abilcmd.id,
                abil: abilcmd.abil,
                cmd: abilcmd.cmd
            }
            this.catalogs.abilcmd.push(abilcmd)
        }
    }
    resolveTextValues(){
        for (let locale in this.locales) {
            for (let type in this.locales[locale]) {
                for (let id in this.locales[locale][type]) {
                    this.locales[locale][type][id] = this.resolveTextValue( this.locales[locale][type][id], id)
                }
            }
        }
    }
    resolveTextValue(expresion){
        if(!expresion) return ""
        // dd<d ref="Behavior,ZerglingArmorShredTarget,Duration" precision="2"/>dd
        // dd<d ref="Behavior,ZerglingArmorShredTarget,Duration"/>dd
        return expresion
            .replace(/<c val="(\w+)">/g,`<span style="color: #$1">`)
            .replace(/<\/c>/g,"</span>")
            .replace(/<d\s+(?:stringref)="(\w+),([\w@]+),(\w+)"\s*\/>/g, (_,catalog,entity,field)=>{
                let value = this.locales.enUS.GameStrings[this.cache[catalog.toLowerCase()]?.[entity]?.$$resolved[field]]
                return `<b>${value}</b>`
            })
            .replace(/<d\s+(?:time|ref)="(.+?)(?=")"((?:\s+\w+="\s*(\d+)?\s*")*)\s*\/>/gi, (_,ref,opts) => {
                let precision = /(?:\s+precision="\s*(\d+)?\s*")/.exec(opts)?.[1]
                let value = this.parseReference(ref)
                value = precision ?  value.toFixed(precision) : Math.round(value)
                return `<b>${value}</b>`
            })
            .replace(/<n\/>/g,"<br/>")
    }
    parseReference(expressionReference){


        let ref = expressionReference.replace(/\[d\s+(?:time|ref)='(.+?)(?=')'((?:\s+\w+='\s*(\d+)?\s*')*)\s*\/\]/gi, (_,ref,opts) => {
            let precision = /(?:\s+precision="\s*(\d+)?\s*")/.exec(opts)?.[1]
            let value = this.parseReference(ref)
            return precision ?  value.toFixed(precision) : Math.round(value)
        })



        ref = ref.replace(/<n\/>/g,"")

        ref = ref.replace(/\$(.+?)\$/g,(_,cc)=>{
            let options = cc.split(':')
            switch(options[0]){
                case 'UpgradeEffectArrayValue':
                    let upgrade = options[1]
                    let effectArrayValue = options[2]

                    let refValue = this.cache.upgrade[upgrade]?.EffectArray.find(eff => eff.Reference === effectArrayValue)?.Value
                    return refValue ? ' ' + refValue + ' ' : ' 0 '
            }
            return '0'
        })

        ref = ref.replace(/((\w+),([\w@]+),(\w+[\.\w\[\]]*))/g,(_,expr)=>{
            let refValue = this.getReferenceValue(expr)
            return refValue ? ' ' + refValue + ' ' : ' 0 '
        })

        let result
        if(ref === 'TimeOfDay'){
            result = 'TimeOfDay'
        }
        else{

            try{
                result = eval(ref)
            }
            catch(e){
                console.warn('wrong Expression: ' + ref)
                result = '0'
            }

        }
        return result
    }
    readImages(imagesDiretory){
        this._imagesDiretory = imagesDiretory;

        this.images = fs.readdirSync(imagesDiretory).map(file => file.replace('.png','').toLowerCase())
    }
    checkImage(path){
        if(!path)return null
        path = (path.value || path)
        path = path.toLowerCase().replace(/\\/g,'/').replace(/.*\//,'').replace('.dds','')
        if(!this.images.includes(path)){
            return null
        }
        return path
    }
    checkImages(){

        for(let entity of this.catalogs.actor) {
            entity = entity.$$resolved
            if(entity.Wireframe?.Image){
                for(let image in entity.Wireframe.Image){
                    entity.Wireframe.Image[image] = this.checkImage(entity.Wireframe.Image[image]);
                }
            }
            if(entity.UnitIcon){
                entity.UnitIcon = this.checkImage(entity.UnitIcon)
            }
            if(entity.LifeArmorIcon) {
                entity.LifeArmorIcon = this.checkImage(entity.LifeArmorIcon)
            }
            if(entity.ShieldArmorIcon) {
                entity.ShieldArmorIcon = this.checkImage(entity.ShieldArmorIcon)
            }
        }
        for(let entity of this.catalogs.weapon) {
            entity = entity.$$resolved
            if(entity.Icon){
                entity.Icon = this.checkImage(entity.Icon)
            }
        }
        for(let entity of this.catalogs.upgrade) {
            entity = entity.$$resolved
            if(entity.Icon) {
                entity.Icon = this.checkImage(entity.Icon)
            }
        }
        for(let entity of this.catalogs.button) {
            entity = entity.$$resolved
            if(entity.Icon) {
                entity.Icon = this.checkImage(entity.Icon)
            }
        }
        for(let entity of this.catalogs.behavior) {
            entity = entity.$$resolved
            if(entity.Icon) {
                entity.Icon = this.checkImage(entity.InfoIcon)
            }
        }
    }
    populateUnitsWithActorsData(){
        for(let entity of this.catalogs.actor) {
            entity = entity.$$resolved;
            let events = entity.On?.filter(event => event.Send === 'Create')
            if(events){
                for (let event of events){
                    let eventname = event.Terms.split('.')[0]
                    if(eventname === 'UnitBirth' || eventname === 'UnitConstruction' || eventname === 'UnitRevive'){
                        let unitId = event.Terms.split('.')[1]
                        if(!unitId)continue;
                        let unit = this.cache.unit[unitId]
                        if(!unit)continue;

                        let UnitIcon = entity.UnitIcon || entity.Wireframe?.Image?.[0]  || unit.UnitIcon
                        let LifeArmorIcon = entity.LifeArmorIcon  || unit.LifeArmorIcon
                        let ShieldArmorIcon = entity.ShieldArmorIcon  || unit.ShieldArmorIcon

                        if(UnitIcon){
                            unit.Icon = UnitIcon
                        }
                        if(LifeArmorIcon){
                            unit.LifeArmorIcon = LifeArmorIcon
                        }
                        if(ShieldArmorIcon){
                            unit.ShieldArmorIcon = ShieldArmorIcon
                        }
                    }
                }
            }
        }
    }
    getReferenceValue(expr){
        try{
            let [catalog,entityId,field] = expr.split(",")
            let entity = this.cache[catalog.toLowerCase()]?.[entityId]

            if(!entity){
                console.warn('wrong entity? ' + catalog + ' ' + entityId)
                return '';
            }

            let crumbs = field.replace(/\[/g,'.').replace(/]/g,'.').split(/[.\[\]]/)
            for(let i = crumbs.length - 1; i>=0; i--){
                if(crumbs[i] === '') {
                    crumbs.splice(i,1)
                }
            }

            let __val = entity.$$resolved
            for(let crumb of crumbs){
                if(crumb === '0' && __val.constructor !== Object && __val.constructor !== Array){

                }
                else if(isNumeric(crumb) && __val.constructor === Object && __val[crumb] === undefined){

                    let consts = {
                        Vital: [
                            'Life',
                            'Shields',
                            'Energy',
                            'Custom'
                        ],
                        AttributeBonus: [
                            'Light',
                            'Armored',
                            'Biological',
                            'Mechanical',
                            'Robotic',
                            'Psionic',
                            'Massive',
                            'Structure',
                            'Hover',
                            'Heroic',
                            'Summoned',
                            'User1',
                            'MapBoss'
                        ]
                    }
                    for(let constCat in consts){
                        if(__val[consts[constCat][crumb]]){
                            __val = __val[consts[constCat][crumb]]
                            break;
                        }
                    }
                }
                else{
                    __val = __val[crumb]
                }
                if(__val === undefined){
                    console.warn('wrong value? ' + field)
                 //   this.getReferenceValue(expr)
                    return ''
                }
            }

            __val = __val.value || __val
            return +__val
        }
        catch(e){
            return ''
        }
    }
    async getModData (modpath){
        let input = modpath
        let data;
        data = {};
        data.path = modpath

        console.log(`Reading: ${data.path}`)

        //supports json, xml, yaml, sc2mod
        let format = path.extname(input).substring(1).toUpperCase()

        if(format && !['JSON', 'XML', 'YAML', 'SC2MOD'].includes(format)){
            format  = false
        }

        if(!format){
            for(let formatTemp of ['JSON', 'XML', 'YAML', 'SC2MOD'])
                if(fs.existsSync(input + '.' + formatTemp)){
                    format = formatTemp
                    input += '.' + formatTemp
                    break;
                }
        }
        if(!fs.existsSync(input)) {
            console.warn(`Not exist!`)
            return
        }

        // console.time(`Reading: ${data.path}`)

        let isdir = fs.lstatSync(input).isDirectory()

        if(format === 'SC2MOD' || isdir) {
            if(!input.endsWith("/"))input += "/"

            let componentsData = await this._readXMLFile(input + "ComponentList.SC2Components")
            if(componentsData?.Components?.DataComponent){
                data.components = componentsData.Components.DataComponent
            }

            ////////     Assets     ////////////////////////////////////////////////////////////////////////////////////
            {
                let assetsTextData = await this._readTextFile(input + "Base.SC2Data/GameData/Assets.txt")
                if(assetsTextData){
                    data.assets = assetsTextData
                }
            }
            ////////     dependencies     //////////////////////////////////////////////////////////////////////////////
            {
                let documentInfo = await this._readXMLFile(input + "DocumentInfo")
                let dependencies = documentInfo?.DocInfo?.Dependencies?.[0].Value
                if(dependencies) {
                    data.dependencies = dependencies
                }
            }
            ////////     styles     ////////////////////////////////////////////////////////////////////////////////////
            {
                let stylesData = await this._readXMLFile(input + "Base.SC2Data/UI/FontStyles.SC2Style")
                if(stylesData){
                    data.styles = stylesData
                }
            }
            ////////     TextData     //////////////////////////////////////////////////////////////////////////////////
            {
                let textFiles = ["GameHotkeys", "GameStrings", "ObjectStrings", "TriggerStrings", "ConversationStrings"]
                let locales = {}
                let LocaleData = data.components?.filter(entity => entity.$?.Type.toLowerCase() === "text").map(entity => entity.$.Locale) || ["enUS"];
                if(LocaleData){
                    for (let locale of LocaleData) {
                        locales[locale] = {}
                        for (let textFile of textFiles) {
                            let filename = `${input}${locale}.sc2data/LocalizedData/${textFile}.txt`
                            let data = this._readTextFile(filename)
                            if (data) {
                                locales[locale][textFile] = data
                            }
                            filename = `${input}${locale}.sc2data/LocalizedData/${textFile}.json`
                            if(fs.existsSync(filename)){
                                let data = JSON.parse(fs.readFileSync(filename, {encoding: 'utf-8'}))
                                locales[locale][textFile] = data
                            }
                        }
                    }
                    data.locales = locales
                }
            }
            ////////     Triggers     //////////////////////////////////////////////////////////////////////////////////
            {
                let triggersFile = input + "Triggers"

                // let raw = fs.existsSync(triggersFile) && fs.readFileSync(triggersFile, {encoding: 'utf-8'})
                // if(raw){
                //     data.triggers = raw.substring(raw.indexOf("<TriggerData>") + 13, raw.indexOf("</TriggerData>"))
                // }
                // data.triggers = triggersData.Library

                //todo : parse triggers
                let triggersDataParsed = await this._readXMLFile(triggersFile)
                let triggersData = triggersDataParsed?.TriggerData
                if(triggersData?.Library){
                    fromXMLToObject(triggersData)
                    let libs = []
                    for(let libindex in triggersData.Library){
                        let lib = triggersData.Library[libindex]
                        optimizeObject(lib, LibrarySchema,['library',libindex])
                        libs.push(lib)
                    }

                    data.triggers = libs
                }
            }
            ////////     layouts     ///////////////////////////////////////////////////////////////////////////////////
            {
                let layoutsData = await this._readXMLFile(input + "Base.SC2Data/UI/Layout/DescIndex.SC2Layout")
                let layouts = layoutsData?.Desc?.Include
                if(layouts){
                    data.layouts = layouts
                }
            }
            ////////     Files     /////////////////////////////////////////////////////////////////////////////////////
            {
                let files = {}

                let _dirs = [
                    'Assets',
                    'LocalizedData',
                    'Base.SC2Assets',
                    'TextureReduction'
                ]

                for(let locale in this.locales){
                    _dirs.push(`${locale}.SC2Assets`)
                }
                for(let _dir of _dirs){
                    if(fs.existsSync(input + _dir)){
                        let files2 = getAllFiles(input + _dir)

                        for(let file of files2){
                            files[_dir + '/' + file] = {
                                path: (input + _dir + '/' + file),
                                scope: 'media'
                            }
                        }

                    }
                }



                 //   .forEach(file => files[file] = input + file)//.filter(file => file.endsWith("m3"))


                // this._getAllFiles(input).forEach(file => files[file] = input + file)//.filter(file => file.endsWith("m3"))
                // for(let m3File of files){
                //     let raw = fs.readFileSync(m3File, {encoding: 'utf-8'})
                //     const indexes = raw.matchAll(new RegExp(`Assets\\[\\\w_]+\.dds`, 'gi'))
                //     console.log(indexes)
                //
                // }
                if(data.layouts){
                    for (let include of data.layouts) {
                        files["Base.SC2Data/" + include.$.path] = {
                            path: (input + "Base.SC2Data/" + include.$.path),
                            scope: 'layouts'
                        }
                    }
                }

                if(fs.existsSync(input + "Base.SC2Data")) {
                    let galaxyFiles = fs.readdirSync(input + "Base.SC2Data").filter(file => file.endsWith(".galaxy"))
                    for (let file of galaxyFiles) {
                        files["Base.SC2Data/" + file] = {
                            path: (input + "Base.SC2Data/" + file),
                            scope: 'triggers'
                        }
                    }
                }

                if(Object.keys(files).length){
                    data.files = files
                }
            }
            ////////     GameData     //////////////////////////////////////////////////////////////////////////////////
            {
                let includesData = await this._readXMLFile(input + "Base.SC2Data/GameData.xml")
                let commonFiles = SCGame.datafiles.map(el => "Base.SC2Data/GameData/" + el + "data.xml");
                let includes = commonFiles.filter(file => fs.existsSync(input + file))
                let additionalFiles = includesData?.Includes?.Catalog?.map(catalog => "Base.SC2Data/" + catalog.$.path)
                if (additionalFiles) {
                    includes.push(...additionalFiles)
                }
                let catalogs = []
                for (let file of includes) {
                    let data = await this._readXMLFile(input + file, true)
                    if (!data) {
                        console.log("File not found: " + input + file)
                    } else {
                        catalogs.push({id: file, data: data.Catalog?.constructor === Object ? data : {}});
                    }
                }
                let entities = []
                for (let catalog of catalogs) {
                    if (catalog.data.Catalog) {
                        if (catalog.data.Catalog.$$) {
                            for (let entity of catalog.data.Catalog.$$) {
                                fromXMLToObject(entity)
                                // if(entity.class === 'const'){
                                //     entity
                                //     if(!this.constants){
                                //         this.constants = {}
                                //     }
                                //     this.constants[entity.id] = entity
                                // }
                                if(entity.class[0] === 'S'){
                                    continue;
                                }
                                if(SCGame.classlist[entity.class] === undefined){
                                    console.log('ignored entity class: ' + entity.class)
                                    SCGame.classlist[entity.class] = false;
                                }
                                if(SCGame.classlist[entity.class]?.$$namespace && !SCGame.ignoredNamespaces.includes(SCGame.classlist[entity.class]?.$$namespace)){
                                    optimizeObject(entity, SCGame.classlist[entity.class].$$schema)
                                    entities.push(entity)
                                }
                            }
                        }
                    }
                }

                let commonFilesJSON = SCGame.datafiles.map(el => "Base.SC2Data/GameData/" + el + "data.json");
                for (let file of commonFilesJSON) {
                    if(fs.existsSync(input + file)){
                        let data = JSON.parse(fs.readFileSync(input + file, {encoding: 'utf-8'}))
                        for(let entityID in data){
                            data[entityID].id = entityID
                            entities.push(data[entityID])
                        }
                    }
                }
                if(entities.length){
                    data.entities = entities
                }
            }
        }
        else{


            let raw = fs.readFileSync(input, {encoding: 'utf-8'})

            if (format === 'JSON') {
                data = JSON.parse(raw)
            }
            if (format === 'YAML') {
                data = yaml.load(raw)
            }
            if (format === 'XML') {
                data = {}
            }
            for(let entity of data.entities){
                optimizeJSONObject(entity, SCGame.classlist[entity.class].$$schema)
            }
        }
        // console.timeEnd(`Reading: ${data.path}`)
        // if(data.entities){
        //     console.log(`${data.entities.length} Entities`)
        // }
        return data
    }
    apply (data){
        // console.time(`Applying: ${data.path}`)

        ////////     triggers     /////////////////////////////////////////////////////////////////////////////////////

        if(data.triggers){

            // if (!this.triggers) this.triggers = ""
            // this.triggers += data.triggers

            if (!this.triggers) this.triggers = []
            this.triggers.push(...data.triggers)
        }
        ////////     dependencies     /////////////////////////////////////////////////////////////////////////////////////
        if(data.dependencies){
            if (!this.dependencies) this.dependencies = []
            for (let dependency of data.dependencies) {
                // dependency = dependency.substring(dependency.lastIndexOf("file:") + 5)
                if (!this.dependencies.includes(dependency)) {
                    this.dependencies.push(dependency)
                }
            }
        }
        ////////     styles     /////////////////////////////////////////////////////////////////////////////////////
        if(data.styles) {
            if (!this.styles) this.styles = {}
            deep(this.styles, data.styles)
        }
        ////////     locales     /////////////////////////////////////////////////////////////////////////////////////
        if(data.locales) {
            if (!this.locales) this.locales = {}
            deep(this.locales, data.locales)
        }
        ////////     assets     /////////////////////////////////////////////////////////////////////////////////////
        if(data.assets){
            if(!this.assets)this.assets = {}
            Object.assign(this.assets, data.assets)
        }
        if(data.files) {
            if (!this.files) this.files = {}
            Object.assign(this.files, data.files)
        }
        if(data.layouts){
            if (!this.layouts) this.layouts = []
            this.layouts.push(...data.layouts)
        }

        if(data.catalogs){
            if (!data.entities) data.entities = []
            for(let catalog in data.catalogs){
                //catalog format
                data.entities.push(...data.catalogs[catalog])
            }
        }
        if(data.cache){
            if (!data.entities) data.entities = []
            for(let catalog in data.catalogs){
                //cache format
                for(let id in data.catalogs[catalog]) {
                    data.entities.push(...data.catalogs[catalog][id])
                }
            }
        }

        if(data.entities){
            for(let entity of data.entities) {
                this.makeEntity(entity)
            }
        }
        // console.timeEnd(`Applying: ${data.path}`)
        return this
    }
    unitProduction (unitname){

        let productionUnits = []
        let productionUpgrades = []
        let unit = this.cache.unit[unitname].$$resolved
        if(unit.CardLayouts){

            for(let card of unit.CardLayouts){
                for(let button of card.LayoutButtons) {
                    let abilcmd = this.cache.abilcmd[button.AbilCmd]
                    if (abilcmd) {
                        let info = this.cache.abil[abilcmd.abil].InfoArray[abilcmd.cmd];
                        if (info?.Unit) {
                            if(info.Unit.constructor === Array){
                                productionUnits.push( ...info.Unit.map(unit => unit.value || unit))
                            }else{
                                productionUnits.push( info.Unit)
                            }
                        }
                        if (info?.Upgrade) {
                            productionUpgrades.push( info.Upgrade)
                        }
                    }
                }
            }
        }

        return {productionUnits,productionUpgrades}

    }
    producingRequirements (unitname){
        let abilCmds = this.catalogs.abilcmd.filter(entry => {
            let abil = this.cache.abil[entry.abil].$$resolved;
            let unit = abil.InfoArray[entry.cmd]?.Unit
            if(!unit)return false;
            if(unit.constructor !== Array)    unit = [unit]
            return unit.includes(unitname)
        })


        let abilCmdsIds = abilCmds.map(abilcmd => abilcmd.id)

        let requirements = abilCmds.map(entry => this.cache.abil[entry.abil].$$resolved.InfoArray[entry.cmd].Button?.Requirements).filter(Boolean)
            .map(req => this.cache.requirement[req]?.$$resolved).filter(Boolean)
            .map(req => req.NodeArray.Use?.Link || req.NodeArray.Show?.Link).filter(Boolean)
            .map(reqNode => this.cache.requirementnode[reqNode].$$resolved).filter(Boolean)

        let reqUnitsAliases = requirements.filter(req => req.class === 'CRequirementCountUnit').map(req => req.Count?.Link).filter(Boolean)
        let reqUpgradeAliases = requirements.filter(req => req.class === 'CRequirementCountUpgrade').map(req => req.Count?.Link).filter(Boolean)

        let requiredUnits = this.catalogs.unit.filter(entry => reqUnitsAliases.includes(entry.$$resolved.TechAliasArray) || reqUnitsAliases.includes(entry.id) ).map(unit => unit.id)
        let requiredUpgrades = this.catalogs.upgrade.filter(entry => reqUpgradeAliases.includes(entry.$$resolved.TechAliasArray) || reqUpgradeAliases.includes(entry.id) ).map(unit => unit.id)

        let producingUnits = this.catalogs.unit.filter(entry => entry.$$resolved.CardLayouts?.find(card => {
            if(card.LayoutButtons){
                for(let button of card.LayoutButtons) {
                    if (button.AbilCmd && abilCmdsIds.includes(button.AbilCmd)) {
                        return true
                    }
                }
            }
            return false
        })).map(unit => unit.id)

        return {abilCmdsIds,requiredUnits,requiredUpgrades,producingUnits}
    }
    // unitAbilCmds(unit){
    //     let lbs = []
    //     if(unit.CardLayouts){
    //         for(let cl of unitData.CardLayouts){
    //             if(cl.LayoutButtons){
    //                 for(let lb of cl.LayoutButtons) {
    //                     if(lb.AbilCmd){
    //                         lbs.push({
    //                             ...quickInfo(this.cache.button[lb.Face]),
    //                             AbilCmd: lb.AbilCmd
    //                         })
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return lbs
    // }

    /**
     *
     * @param destpath {string}
     * @param resolve { boolean } add full entity info, including info inherited from its class and parent
     * @param format { 'xml', 'json', 'yaml', 'auto' } output data fromat
     * @param structure { 'file', 'components' | 'compact' | 'auto' } put all data in single file or in a folder with multiple components. compact is components structure but with all data catalogs merged together
     * @param scopes { ['components','documentinfo', 'assets', 'triggers', 'locales', 'styles', 'layouts', 'data'] | 'all' } which mod components to save
     * @returns {Promise<SCMod>}
     */
    async write (destpath,{outputFn = null, formatFn = null,catalogs= 'all',resolve = false, format = 'auto', structure = 'auto', scopes = 'all',core = false} = {}){


        if(!'./'.includes(destpath) && !'.\\'.includes(destpath)){
            destpath = this._directory + destpath
        }
        destpath = path.resolve(destpath)

        if(scopes.constructor === String){
            scopes = [scopes]
        }
        if(scopes.includes('all')){
            scopes = [
                'media',
                'assets',
                'triggers',
                'locales',
                'styles',
                'layouts',
                'data',
                'components',
                'binary',
                'documentinfo'
            ]
        }
        if(structure === 'auto'){
            structure = /.*\.[A-Za-z]+$/.test(destpath) ? 'file' : 'components'
        }
        if(format === 'auto'){
            format = /.*\.([A-Za-z]+)$/.exec(destpath)?.[1] || 'auto'
        }

        if(structure === 'file'){
            let output = {}
            for(let scope of scopes){
                output[scope] = this[scope]
            }
            if(scopes.includes('data') && !scopes.includes('catalogs') && !scopes.includes('cache')){
                output['entities'] = this['entities']
            }

            fs.writeFileSync(destpath, formatData(output, format))
            return this
        }

        if(!destpath.endsWith("/"))destpath += "/"

        let output = {}

        let extension, formatting;

        console.log(`Writing: ${destpath}`)

        fs.mkdirSync(destpath, {recursive: true});

        if(scopes.includes('components')){
            extension = format === 'auto' ? 'SC2Components' : format
            formatting = format === 'auto' ? 'xml' : format;
            let components = [
                {_: 'DocumentInfo', $: {Type: "info"}}
            ]
            if(this.entities) {
                components.push({_: 'GameData', $: {Type: "gada"}})
            }
            if(this.layouts) {
                components.push({_: 'UI/Layout/DescIndex.SC2Layout', $: {Type: "uiui"}})
            }
            if(this.styles) {
                components.push({_: 'UI/FontStyles.SC2Style', $: {Type: "font"}})
            }
            if(this.triggers) {
                components.push({_: 'Triggers', $: {Type: "trig"}})
            }
            if(this.locales) {
                for(let locale in this.locales){
                    components.push({_: 'GameText', $: {Type: "text", Locale: locale}})
                }
            }
            output[`ComponentList.${extension}`] = formatData({Components: {DataComponent: components}}, formatting)
        }
        if(scopes.includes('documentinfo')){
            let deps = []
            let voidCampaign = "bnet:Void (Campaign)/0.0/999,file:Campaigns/Void.SC2Campaign"
            let voidMod = "bnet:Void (Mod)/0.0/999,file:Mods/Void.SC2Mod"

            let includeCampaign = false;
            let includeVoid = false;
            if(this.dependencies?.includes(voidCampaign)){
                deps.push({_: voidCampaign})
                includeCampaign = true;
            }
            else if(this.dependencies?.includes(voidMod)){
                deps.push({_: voidMod})
                includeVoid = true;
            }



            let info = {
                DocInfo: {
                    ModType: {
                        Value: {
                            _: 'Interface'
                        }
                    },
                }
            }
            if(this.dependencies?.length){
                Object.assign(info.DocInfo,{
                    Dependencies: {
                        // Value: this.dependencies.map(dep => ({_: dep})),
                        // Value: [{_: 'bnet:Void (Mod)/0.0/999,file:Mods/Void.SC2Mod'}]
                        Value: deps
                    }
                })
            }
            output[`DocumentInfo`] = formatData(info , 'xml')

            if(scopes.includes('binary') && format === 'auto'){
                fs.copyFileSync(path.resolve(__dirname ,'versions/DocumentInfo.version'), destpath + `DocumentInfo.version`)
            }

            if(scopes.includes('binary')){
                if(includeVoid){
                    fs.copyFileSync(path.resolve(__dirname ,'versions/DocumentHeader VOID'), destpath + `DocumentHeader`)
                }
                if(includeCampaign) {
                    fs.copyFileSync(path.resolve(__dirname ,'versions/DocumentHeader VOID CAMPAIGN'), destpath + `DocumentHeader`)
                }
            }
        }
        if(scopes.includes('preload')){
            output[`Preload.xml`] = formatData({Preload: {}} , 'xml')
            output[`PreloadAssetDB.txt`] = ''
        }
        if(scopes.includes('assets') && this.assets){
            extension = format === 'auto' ? 'txt' : format
            formatting = format === 'auto' ? 'ini' : format;
            output[`Base.SC2Data/GameData/Assets.${extension}`] = formatData(this.assets, formatting)
        }
        if(scopes.includes('locales') && this.locales){
            extension = format === 'auto' ? 'txt' : format
            formatting = format === 'auto' ? 'ini' : format;
            let baseLocale = this.locales['enUS'] && 'enUS'

            for (let locale in this.locales) {

                for (let type in this.locales[baseLocale || locale]) {
                    let localeData
                    if (locale !== baseLocale && this.locales[baseLocale]) {
                        localeData = {}
                        deep(localeData, this.locales[baseLocale][type])
                        deep(localeData, this.locales[locale][type])
                    } else {
                        localeData = this.locales[locale][type]
                    }

                    output[`${locale}.SC2Data/LocalizedData/${type}.${extension}`] = formatData(localeData, formatting)
                }
            }

            if(scopes.includes('binary') && format === 'auto'){
                fs.copyFileSync(path.resolve(__dirname ,'versions/GameText.version'), destpath + `GameText.version`)
            }
        }
        if(scopes.includes('styles') && this.styles){
            extension = format === 'auto' ? 'SC2Style' : format
            formatting = format === 'auto' ? 'xml' : format;
            output[`Base.SC2Data/UI/FontStyles.${extension}`] = formatData(this.styles, formatting)
            if(scopes.includes('binary') && format === 'auto'){
                fs.mkdirSync(destpath+  `Base.SC2Data/UI/`, {recursive: true});
                fs.copyFileSync(path.resolve(__dirname ,'versions/FontStyles.version'), destpath + `Base.SC2Data/UI/FontStyles.version`)
            }
        }
        if(scopes.includes('layouts') && this.layouts){
            extension = format === 'auto' ? 'SC2Layout' : format
            formatting = format === 'auto' ? 'xml' : format;
            output[`Base.SC2Data/UI/Layout/DescIndex.${extension}`] = formatData({Desc: {Include: this.layouts }}, formatting)
        }
        if(scopes.includes('data') && this.entities){
            extension = format === 'auto' ? 'xml' : format
            formatting = format === 'auto' ? 'xml' : format;
            let data = (structure === 'compact') ? {mod: this.entities} : this.catalogs
            for (let cat in data) {
                if(catalogs === 'all' || catalogs.includes(cat)){

                    let outputCatalogData

                    let entities = data[cat].filter(entity => !entity.$overriden)

                    if(!core){
                        entities = entities.filter(entity => !entity.__core)
                    }

                    if(formatting === "xml") {
                        // let catalogXMLObjectData = data.map(entity => entity.getXMLObject())
                        // output[`Base.SC2Data/GameData/${capitalize(cat)}Data.xml`] = formatData({Catalog: catalogXMLObjectData}, 'xml')
                        let catalogXML =entities .reduce((acc, entity) => {
                            let entityData
                            if(formatFn){
                                entityData = formatFn(entity)
                            }
                            else{
                                entityData = {...(resolve ? entity.$$resolved : entity)}
                            }
                            return acc + entity.getXML(entityData)
                        }, '')
                        outputCatalogData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Catalog>\n${catalogXML}\n</Catalog>`
                    }
                    else {
                        let catalogCache = {}
                        for(let entity of entities){
                            let entityData
                            if(formatFn){
                                entityData = formatFn(entity)
                            }
                            else{
                                entityData = {...(resolve ? entity.$$resolved : entity)}
                            }
                            catalogCache[entityData.id] = entityData
                            delete entityData.id;
                        }
                        outputCatalogData = formatData(catalogCache, formatting)
                    }
                    output[`Base.SC2Data/GameData/${capitalize(cat)}Data.${extension}`] = outputCatalogData
                    if(scopes.includes('binary') && format === 'auto'){
                        fs.copyFileSync(path.resolve(__dirname ,'versions/GameData.version'), destpath + `GameData.version`)
                    }
                }

            }
        }
        if(scopes.includes('triggers') && this.triggers){

            // output[`Triggers`]  = `<?xml version="1.0" encoding="utf-8"?>\n<TriggerData>\n${this.triggers}\n</TriggerData>`

            //todo parsed triggers
            let libraries = this.triggers.map(lib => optimiseForXML(lib, LibrarySchema))
            let triggersString = formatData({TriggerData: {Library: libraries}}, format === 'auto' ? 'xml' : format)

            function fixTriggers(text){
                let chunks = []

                let tagBodyStart = -1, tagBodyEnd = -1;
                let openerTag = false
                let closingTag = false
                let tagBody = false
                let lastChunkEnd = 0
                for(let i =0 ; i < text.length; i++){
                    if(text[i] === '<'){
                        if(text[i+1] === '/'){
                            closingTag = true
                            tagBodyEnd = i
                            if(tagBodyStart !== -1 && tagBodyStart !== tagBodyEnd){
                                let original = text.substring(tagBodyStart, tagBodyEnd)
                                let replacement = original
                                    .replace(/&#xD;/g,'')
                                    .replace(/"/g,'&quot;')
                                    .replace(/'/g,'&apos;')

                                if(replacement !== original){
                                    // let l1 = tagBodyEnd - tagBodyStart
                                    // let l2 = replacement.length

                                    chunks.push(text.substring(lastChunkEnd,tagBodyStart),replacement)
                                    lastChunkEnd = i
                                    // text = text.substring(0,tagBodyStart) + replacement + text.substring(tagBodyEnd)
                                    // i+= l2 - l1
                                }
                            }
                            tagBodyStart = -1
                            tagBodyEnd = -1
                        }
                        else{
                            openerTag = true
                            tagBodyStart = -1
                            tagBodyEnd = -1
                        }
                    }
                    else if(text[i] === '>'){
                        if(openerTag){
                            if(text[i -1] !== '/'){
                                tagBody = true
                                tagBodyStart = i + 1
                            }
                            openerTag = false
                        }
                        else{
                            closingTag = false
                        }
                    }
                }
                chunks.push(text.substring(lastChunkEnd))
                return chunks.join("")
            }


            output[`Triggers`] = fixTriggers(triggersString)

            if(scopes.includes('binary') && format === 'auto'){
                fs.copyFileSync(path.resolve(__dirname ,'versions/Triggers.version'), destpath + `Triggers.version`)
            }
        }

        if(outputFn){
            outputFn(this, output, {scopes})
        }
        
        //writing process
        for (let file in this.files) {
            if(scopes.includes(this.files[file].scope)){
                let foutput = destpath + file.replace(/\\/g, "\/")
                let finput = this.files[file].path.replace(/\\/g, "\/")
                if(this.files[file].scope === 'media'){
                    if(fs.existsSync(foutput)){
                        let stats1 = fs.statSync(finput)
                        let stats2 = fs.statSync(foutput)
                        if(stats1.size === stats2.size){
                            continue;
                        }
                    }
                }
                fs.mkdirSync(foutput.substring(0, foutput.lastIndexOf("/")), {recursive: true});
                fs.copyFileSync(finput, foutput)
            }
        }

        for(let file in output){
            let foutput = destpath + file.replace(/\\/g, "\/")
            fs.mkdirSync(foutput.substring(0, foutput.lastIndexOf("/")), {recursive: true});
            fs.writeFileSync(foutput, output[file])
        }

        this.debug()

        return this

        // if(combo.dependenciesFiles.length) saveXMLData({Includes: {Path: combo.dependenciesFiles.map(dep => ({ $: {value: dep}}))}}, output + "Base.SC2Data/Includes.xml")
    }
    async _readXMLFile(localeFile, ordered) {
        if (!fs.existsSync(localeFile)) {
            return null;
        }

        let raw = fs.readFileSync(localeFile, {encoding: 'utf-8'})
            .replace(/<\?xml(.*)\?>/g,'')
            .replace(/<\?token\s+id="(\w+)"\s+(?:type="(\w+)"\s+)?value="(.*)"\?>/g,(_,tokenID,tokenType,tokenValue) =>{
                return `<__${tokenID}__ value="${tokenValue}"/>`
            })
            .replace(/<\?(.*)\?>/g,function(_){
                return _
            })










        return new Promise((resolve, reject) => {
            let parser
            if(ordered){
                parser = new xml2js.Parser({
                    // trim: true,
                    explicitArray: true,
                    explicitChildren: true,
                    preserveChildrenOrder: true
                });
            }
            else{
                parser = new xml2js.Parser({
                    // trim: true,
                    explicitArray: true
                });
            }

            parser.parseString(raw, function (err, result) {
                if (err) reject(err)
                resolve(result);
            });
        })
    }
    mixin(b){
        function mixin(a,b){
            for(let i in b){
                if(a.constructor === Object && b.constructor === Object && a[i]) {
                    mixin(a[i], b[i])
                }
                else {
                    a[i] = b[i]
                }
            }
        }
        let a = this.cache
        for(let i in b){
            if(a.constructor === Object && b.constructor === Object && a[i]) {
                mixin(a[i], b[i])
            }
            else {
                a[i] = b[i]
            }
        }
    }
    pickEntity(entity,path = []){
        if(!entity) {
            return
        }
        if(SCGame.pickIgnoreObjects[entity.$$namespace]?.includes(entity.id)){
            return
        }

        if(entity.__picked){
            return
        }
        if(!this.pickedCounter){
            this.pickedCounter  = 0
        }
        this.pickedCounter++
        Object.defineProperty(entity, '__picked',{ configurable:true, writable: true,enumerable: false,value: true })

        // console.log(entity.class +" " + entity.id)
        for(let relation of entity.$$relations){
            relation.refpath = path
            let linkedEntity = this.cache[relation.namespace]?.[relation.link]
            // let linkedEntity = relation.target

            if(!linkedEntity)continue
            if(linkedEntity.$$references){
                linkedEntity.addReferences(relation)
            }
            else{
                linkedEntity.addReferences(relation)
                this.pickEntity(linkedEntity,[...path,entity.$$namespace + '.' + entity.id])
            }
        }

    }
    pick(include = {}, {exclude = {}} = {}){
        console.log("Picking entities")
        this.pickedCounter = 0
        SCGame.pickIgnoreObjects = {}
        deep(SCGame.pickIgnoreObjects,SCGame.defaultPickIgnoreObjects)
        deep(SCGame.pickIgnoreObjects,exclude)

        this.pickTriggers()

        for(let namespace in include){
            for(let link of include[namespace]){
                let entity = this.cache[namespace][link]
                if(!entity)continue;
                entity.addReferences({})
                this.pickEntity(entity)
                if(namespace === 'race'){
                    this.pickEntity(this.cache.soundtrack?.[`Music_${link}Low`])
                }
            }
            if(namespace === 'race'){

                this.pickMisc(include[namespace])
            }

        }

        this.pickActors()
        this.pickEntity(this.cache.actor?.['SYSTEM_ActorConfig'])
        this.filter()
        this.entities.forEach(entity => entity.$$references = entity.$$references.filter(ref => ref.path))

        console.log(`${this.pickedCounter} picked`)
    }
    pickMisc(races){
        for(let category of ["cursor","alert","sound","soundtrack"]){
            if(this.catalogs[category]){
                for(let entity of this.catalogs[category]){
                    let li = entity.id.lastIndexOf('_') +1
                    if(li){
                        let race = entity.id.substring(li);
                        if(races.includes(race)) {
                            this.pickEntity(entity)
                            Object.defineProperty(entity, '__misc',{ configurable:true, writable: true,enumerable: false,value: true })
                        }
                    }
                }
            }
        }
    }
    pickActors(){
        for (let actor of this.catalogs.actor){
            let termRelations = actor.$$relations.filter(rel => rel.type === "terms")
            let used = false
            for(let relation of termRelations){
                if(relation.namespace === 'validator'){
                    //do not pick actors by used validators
                    continue
                }
                let linkedEntity = this.cache[relation.namespace][relation.link]
                if(linkedEntity?.$$references){
                    used = true;
                }
                if(linkedEntity?.$$namespace === 'actor'){
                    this.pickEntity(linkedEntity)
                }
            }
            if(used) {
                actor.addReferences({})
                this.pickEntity(actor)
            }
        }
    }
    saveCore(){
        for(let entity of this.entities){
            entity.ghost()
        }
    }
    removeCore(){
        for(let catalog in this.catalogs){
            for(let entity of this.catalogs[catalog]){
                if(entity.__core){
                    if(this.cache[catalog][entity.id] === entity){
                        delete this.cache[catalog][entity.id]
                    }
                }
            }
            this.catalogs[catalog] = this.catalogs[catalog].filter(item => !item.__core)

            if(!this.catalogs[catalog].length){
                delete this.catalogs[catalog]
                delete this.cache[catalog]
            }
        }
        this.entities = this.entities.filter(item => !item.__core)
    }
    filter(){

        let before = this.entities.length
        for(let catalog in this.catalogs){
            for(let entity of this.catalogs[catalog]){
                if(!entity.$$references){
                    if(this.cache[catalog][entity.id] === entity){
                        delete this.cache[catalog][entity.id]
                    }
                }
            }
            this.catalogs[catalog] = this.catalogs[catalog].filter(item => item.$$references)

            if(!this.catalogs[catalog].length){
                delete this.catalogs[catalog]
                delete this.cache[catalog]
            }
        }
        this.entities = this.entities.filter(item => item.$$references)

        let after = this.entities.length
        console.log(`Filtering: ${before} > ${after}`)
    }
    pickAll(){
        SCGame.pickIgnoreObjects = {}
        deep(SCGame.pickIgnoreObjects,SCGame.defaultPickIgnoreObjects)

        for(let catalog in this.catalogs) {
            for (let entity of this.catalogs[catalog]) {
                this.pickEntity(entity)
            }
        }
    }
    resolveAssets(){
        for(let catalog in this.catalogs) {
            for (let entity of this.catalogs[catalog]) {
                entity.resolveAssets()
            }
        }
    }
    resolveText(mask){
        let picked = []
        for(let catalog in this.catalogs) {
            for (let entity of this.catalogs[catalog]) {
                entity.resolveText(mask,picked)
            }
        }
        let races = this.cache.race && Object.keys(this.cache.race)
        for(let locale in this.locales){
            for(let localeCat in this.locales[locale]){
                //Do not need to rename trigger Strings
                if(localeCat === 'TriggerStrings'){
                    continue
                }
                for(let asset in this.locales[locale][localeCat]){

                    let newAssetName;

                    let li = races && asset.lastIndexOf('_') +1
                    let race = li && asset.substring(li);
                    if(race && races.includes(race)) {
                        newAssetName = asset.substring(0, li) + mask.replace("*", race)
                    }
                    else{
                        let parts = asset.split("/")
                        parts[parts.length - 1]  = mask.replace("*", parts[parts.length - 1])
                        newAssetName =  parts.join("/")
                    }
                    this.locales[locale][localeCat][newAssetName] =  this.locales[locale][localeCat][asset]

                    delete this.locales[locale][localeCat][asset]

                }
            }
        }

        for(let asset in this.assets){
            let li = asset.lastIndexOf('_') +1
            if(li){
                let race = asset.substring(li);
                if(races.includes(race)) {

                    let newAssetName = asset.substring(0, li) + mask.replace("*", race)
                    this.assets[newAssetName] = this.assets[asset]
                    delete this.assets[asset]
                }
            }
        }
    }

    pickTriggers(){
        if(this._triggersPicked ){
            return
        }
        this._triggersPicked = true
        console.log("Picking entities used by Triggers")
        this.pickedCounter = 0
        this.pickedCounter = 0
        SCGame.pickIgnoreObjects = {}
        deep(SCGame.pickIgnoreObjects,SCGame.defaultPickIgnoreObjects)

        for(let libIndex in this.triggers){
            let result = relations(this.triggers[libIndex],this.triggers[libIndex], LibrarySchema,['library',libIndex],SCGame.pickIgnoreObjects)


            for(let relation of result){
                let linkedEntity = this.cache[relation.namespace]?.[relation.link]
                if(!linkedEntity)continue
                if(linkedEntity.$$references){
                    linkedEntity.addReferences(relation)
                }
                else{
                    linkedEntity.addReferences(relation)
                    this.pickEntity(linkedEntity)
                }
            }
        }



    }
    //prefix all filtered entities with 'Legacy' word. where '*' is an old entity id
    /**
     *
     * @param mask
     * @param tags rename uniqueTags
     */
    renameEntities(mask,{tags = true} = {}){
        console.log(`Renaming entities`)


        this.pickTriggers()
        this.pickAll()
        this.resolveAssets()
        this.resolveText(mask)

        let counter = 0

        for(let catalog in this.catalogs) {
            // if(catalog === 'actor')continue
            for (let entity of this.catalogs[catalog]) {
                if(entity.__core){
                    continue
                }
                let oldName = entity.id

                // For Race-Specific stuff
                if(entity.__misc){
                    let li = entity.id.lastIndexOf('_') +1
                    if(li) {
                        let race = entity.id.substring(li);
                        entity.id = entity.id.substring(0, li) + mask.replace("*", race)
                    }
                }else{
                    entity.id = mask.replace("*", oldName)
                }

                if (entity.$$references) {
                    for (let reference of entity.$$references) {
                        let refpath = reference.path
                        if(!refpath) continue //nothing to rename
                        let _path = refpath.split(".")
                        let value,valueObject,valueProperty, valueEntity, newvalue
                        let referenceEntity = reference.target ;//this.cache[_path[0]][_path[1]]
                        if(!referenceEntity){
                            console.warn("wrong reference " + refpath)
                            continue;
                        }
                        if(SCGame.useResolve){
                            valueEntity = referenceEntity.$created ? referenceEntity : referenceEntity.$$resolved;
                        }
                        else{
                            valueEntity = referenceEntity;
                        }
                        value = valueEntity
                        let pathobject = [valueEntity]
                        for(let pathItem of _path.slice(2)){
                            if(value === undefined)break;
                            valueObject = value
                            valueProperty = pathItem
                            value = value[pathItem]
                        }
                        if(value === undefined){
                            console.warn("wrong refpath " + refpath)
                            continue;
                        }
                        if(value.constructor === Object){
                            valueObject = value
                            valueProperty = "value"
                            value = valueObject.value
                        }


                        let propertySchema
                        if(_path[0] === 'library'){
                            propertySchema = LibrarySchema
                        }
                        else{
                            propertySchema = referenceEntity.$$schema
                        }
                        let _propertyPath = _path.slice(2)
                        if(_propertyPath[0] === 'parent'){
                            propertySchema = referenceEntity.$$namespace
                        }
                        else{
                            for(let _propertyPathItem of _propertyPath){

                                if(propertySchema[0]?.index === 'word'){
                                    propertySchema = propertySchema[0]
                                }
                                else if( isNumeric(_propertyPathItem)){
                                    propertySchema = propertySchema[0]
                                }
                                else{
                                    propertySchema = resolveSchemaType(propertySchema, _propertyPathItem,pathobject)
                                }
                                if(!propertySchema){
                                    console.log("@@@")
                                }

                                valueEntity = valueEntity[_propertyPathItem]
                                pathobject.push(valueEntity)
                            }
                            propertySchema = propertySchema.value || propertySchema
                        }

                        let namespace
                        switch(propertySchema){
                            case "terms": {
                                let [event,...conditions] = value.split(";").map(term => term.trim())
                                let eventParts = event.split(".")
                                namespace = eventEntityType(eventParts[0])

                                if(namespace === entity.$$namespace && eventParts[1] === oldName){
                                    eventParts[1] = entity.id
                                    event = eventParts.join(".")
                                }

                                // namespace = eventEntityType2(eventParts[0])
                                // if(namespace === entity.$$namespace && eventParts[2] === oldName){
                                //     eventParts[2] = entity.id
                                //     event = eventParts.join(".")
                                // }

                                for(let index =0; index < conditions.length; index++){
                                    let condition = conditions[index]
                                    let eventParts = condition.split(" ").map(term => term.trim())
                                    let namespace = eventConditionEntityType(eventParts[0])

                                    if(namespace === entity.$$namespace && eventParts[1] === oldName){
                                        eventParts[1] = entity.id
                                        conditions[index] = eventParts.join(" ")
                                    }
                                }
                                newvalue = [event, ...conditions].join(";")
                                break;
                            }
                            case "abilcmd": {
                                let [entityName, cmd] = value.split(",")
                                if(cmd){
                                    newvalue = [entity.id, cmd].join(",")
                                }
                                else{
                                    newvalue = entity.id
                                }
                                break;
                            }
                            case "subject": {
                                if(value.startsWith(':')){

                                    let [subjjNamespace,subjLink] = value.substring(2).split(".")
                                    newvalue= `::${subjjNamespace}.${entity.id}`
                                }
                                else{
                                    if(value === oldName){
                                        newvalue = entity.id
                                    }
                                    else{
                                        console.log("#")
                                    }
                                }
                                break;
                            }
                            case "ops": {
                                let actors = value.split(" ")
                                for(let index =0; index < actors.length; index++){

                                    if(actors[index] === oldName){
                                        actors[index] = entity.id
                                    }
                                }
                                newvalue = actors.join(" ")
                                break;
                            }
                            case "reference": {
                                let [entityType, entityName, entityProperty] = value.split(",")
                                newvalue = [entityType, entity.id, entityProperty].join(",")
                                break;
                            }
                            case "send": {

                                let eventParts = value.split(" ")

                                switch (eventParts[0]) {
                                    case "AttachSetBearingsFrom": {
                                        let parts = value.replace(/([\{\} }])/g,'\n$1\n').split('\n')
                                        for(let i in parts){
                                            if(parts[i] === oldName){
                                                parts[i] = entity.id
                                            }
                                        }
                                        newvalue = parts.join("")
                                        break;
                                    }
                                    case "HostSiteOpsSet": {
                                        let parts = value.replace(/([\{\} }])/g,'\n$1\n').split('\n')
                                        for(let i in parts){
                                            if(parts[i] === oldName){
                                                parts[i] = entity.id
                                            }
                                        }
                                        newvalue = parts.join("")
                                        break;
                                    }
                                    case "RefSetFromMsg": {
                                        let _val = value.split(" ")

                                        let [namespace,link] = _val[1].substring(2).split(".")
                                        _val[1] = `::${namespace}.${entity.id}`
                                        newvalue = _val.join(" ")
                                        break;
                                    }
                                    case "ModelSwap": {
                                        eventParts[1] = entity.id
                                        newvalue = eventParts.join(" ")
                                        break;
                                    }
                                    case "QueryRadius":
                                    case "QueryRegion":
                                    case "TimerSet":
                                    {
                                        eventParts[2] = entity.id
                                        newvalue = eventParts.join(" ")
                                        break;
                                    }
                                    case "ModelMaterialApply":
                                    case "ModelMaterialRemove":
                                    case "Create":
                                    case "CreateCopy":
                                    {
                                        eventParts[1] = entity.id
                                        newvalue = eventParts.join(" ")
                                        break;
                                    }
                                    default: {
                                        newvalue = eventParts.join(" ")
                                    }
                                }
                                break;
                            }
                            default: {
                                newvalue = entity.id
                            }
                        }

                        valueObject[valueProperty] = newvalue

                        counter++
                    }
                }

            }
        }

        for(let entity of this.entities) {
            delete entity.__resolved
            delete entity.__data
        }

        if(tags){
            this.renameTags();
        }

        console.log(`${counter} references modified`)
    }
    renameTags(){
        if(this.catalogs.scorevalue){
            for(let scorevalue of this.catalogs.scorevalue){
                if(scorevalue.UniqueTag){
                    let code3 = String.fromCharCode(65 + Math.floor(__lastTag / 26))
                    let code4 = String.fromCharCode(65 + __lastTag  % 26 )
                    scorevalue.UniqueTag = '__' +code3 + code4
                    __lastTag++
                }
            }
        }
    }
    _readTextFile(localeFile) {
        if (!fs.existsSync(localeFile)) {
            return null;
        }
        let raw = fs.readFileSync(localeFile, {encoding: 'utf-8'})
        if (!raw) return {}
        let data = {}
        raw.replace(/\r/g, "").split("\n").forEach(el => {
            let key = el.substring(0, el.indexOf("="))
            let value = el.substring(el.indexOf("=") + 1)
            data[key] = value
        })
        delete data[""]
        return data;
    }
    makeEntity(entity){
        let classname = entity.class;
        let entityparent = entity.parent;
        let entityclass = SCGame.classlist[classname]
        let entityid = entity.id || entity.Id || entity.index;
        let entitydata = {...entity}

        delete entitydata.class

        // if(classname === "const"){
        //     classname
        // }
        if(!entityid){
            entityclass.mixin(entitydata)
            this.entities.push(entityclass)
            return entityclass
        }
        else{
            if(entityclass === undefined){
                SCGame.classlist[classname] = false
                console.log('ignored class ' + classname)
            }
            if(!entityclass){
                return
            }
            let namespace = entityclass.$$namespace
            if(!namespace || SCGame.ignoredNamespaces.includes(namespace))return;
            if(!this.cache[namespace])this.cache[namespace] ={}
            if(!this.catalogs[namespace])this.catalogs[namespace] =[]
            let catalog = this.catalogs[namespace]
            let existed = this.cache[namespace][entityid]
            let parent = entityparent && this.cache[namespace][entityparent]

            let _core = false
            if(existed) {
                if (entityparent) {
                    Object.defineProperty(existed, '$overriden',{ configurable:true, writable: true,enumerable: false,value: true })
                    // console.log(entityid + ': overriding element parent ')
                    if(existed.__core)_core = true
                }
                else{
                    existed.mixin(entitydata)
                    return existed
                }
            }
            entitydata.$parent =  parent || null;
            entitydata.class = classname
            entitydata.$class = entityclass
            let entityInstance = new SCEntity(entitydata)
            if(_core){
                entityInstance.ghost()
            }
            this.cache[namespace][entityid] = entityInstance
            catalog.push(entityInstance)
            this.entities.push(entityInstance)
            return entityInstance
        }
    }
}



/**
 *
 //we can read the previously saved combined mod
 // await mod.read('./output/combined.json')
 *
 * Mod Filtering
 //pick the instances and all related data from the mod. prevent from adding too much data using exclude option

 mod.pick({race: ["Terr","Zerg","Prot"]},{ exclude: {}})
mod.pick({race: ["Zerg"]},{
    exclude: {
        validator: ['IsNotWarpingIn', 'IsNotPhaseShifted', 'BattlecruiserNotJumping', 'IsBunker', 'IsVikingAir', 'IsVikingGround'],
        unit: ["Zealot", "Marine", "VikingAssault", "VikingFighter"],
        behavior: ['Precursor', 'LockOnDisableAttack', 'MothershipCoreRecalling', 'Recalling'],
        weapon: ['PsiBlades', 'GuassRifle'],
        abil: ['Stimpack', 'InfestedTerrans',]
    }
})
mod.pick({race: ["Prot"]},{
    exclude: {
        effect: ['InstantUnburrow', 'InstantMorphUnburrowAB',],
        unit: [],
        abil: ['ResourceStun']
    }
})

 //pick all actors for picked instances. todo: actors are ignored in pick function
 mod.pickActors()

 //only leave picked entities.
 mod.filter()

 //get the count of picked entities
 console.log("Picked Entities: " + mod.entities.length)

 **/

