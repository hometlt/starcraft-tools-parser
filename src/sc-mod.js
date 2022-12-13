import fs from 'fs'
import path from 'path'
import url from 'url'
import xml2js from 'xml2js'
import * as yaml from "js-yaml";
import {SCGame} from "./sc-game.js";
import {SCEntity} from "./sc-entity.js";
import {LibrarySchema} from "./sc-schema.js";
import {deep,formatData, optimizeObject, optimizeJSONObject, fromXMLToObject, capitalize, optimiseForXML, convertObjectsToIndexedArray, stringValues} from "./operations.js";
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));


export class SCMod {
    constructor(mod){

        this.entities = []
        Object.defineProperty(this, 'cache',{ configurable:true, writable: true,enumerable: false,value: {} })
        Object.defineProperty(this, 'catalogs',{ configurable:true, writable: true,enumerable: false,value: {} })

        mod && this.read(mod)
    }
    directory(url){
        if(!url.endsWith('/'))url += '/'
        this._directory = url
    }
    async read (...input) {
        for (let item of input) {
            if(item){
                await this._read(item)
            }
        }
        return this
    }
    async _read (input){
        let data
        if(input.constructor === String){

            if(!'./'.includes(input[0])){
                input = this._directory + input
            }
            data = {};

            //supports json, xml, yaml, sc2mod
            let format = path.extname(input).substr(1).toUpperCase()

            if(!format){
                for(let formatTemp of ['JSON', 'XML', 'YAML', 'SC2MOD'])
                if(fs.existsSync(input + '.' + formatTemp)){
                    format = formatTemp
                    input += '.' + formatTemp
                    break;
                }
            }


            if(format === 'SC2MOD') {
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
                                let data = this._readTextFile(`${input}${locale}.sc2data/LocalizedData/${textFile}.txt`)
                                if (data) {
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

                    let raw = fs.existsSync(triggersFile) && fs.readFileSync(triggersFile, {encoding: 'utf-8'})
                    if(raw){
                        data.triggers = raw.substring(raw.indexOf("<TriggerData>") + 13, raw.indexOf("</TriggerData>"))
                    }

                    //todo : parse triggers
                    // let triggersDataParsed = await this._readXMLFile(triggersFile, true)
                    // let triggersData = triggersDataParsed?.TriggerData
                    // if(triggersData){
                    //     fromXMLToObject(triggersData)
                    //     data.triggers = triggersData.Library
                    // }
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
                    // this._getAllFiles(input).forEach(file => files[file] = input + file)//.filter(file => file.endsWith("m3"))
                    // for(let m3File of files){
                    //     let raw = fs.readFileSync(m3File, {encoding: 'utf-8'})
                    //     const indexes = raw.matchAll(new RegExp(`Assets\\[\\\w_]+\.dds`, 'gi'))
                    //     console.log(indexes)
                    //
                    // }
                    let files = {}
                    let galaxyFiles = fs.readdirSync(input + "Base.SC2Data").filter(file => file.endsWith(".galaxy"))

                    if(data.layouts){
                        for (let include of data.layouts) {
                            files["Base.SC2Data/" + include.$.path] = {
                                path: (input + "Base.SC2Data/" + include.$.path),
                                scope: 'layouts'
                            }
                        }
                    }

                    for (let file of galaxyFiles) {
                        files["Base.SC2Data/" + file] = {
                            path: (input + "Base.SC2Data/" + file),
                            scope: 'triggers'
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
                                    if(SCGame.classlist[entity.class]?.$$namespace && !SCGame.ignoredNamespaces.includes(SCGame.classlist[entity.class]?.$$namespace)){
                                        optimizeObject(entity, SCGame.classlist[entity.class].$$schema)
                                        entities.push(entity)
                                    }
                                }
                            }
                        }
                    }
                    if(entities.length){
                        data.entities = entities
                    }
                }
            }
            else{
                if(!fs.existsSync(input))return

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
        }
        else{
            data = input
        }


        ////////     triggers     /////////////////////////////////////////////////////////////////////////////////////

        if(data.triggers){

            if (!this.triggers) this.triggers = ""
            this.triggers += data.triggers

            //todo parsed triggers
            // if (!this.triggers) this.triggers = []
            // this.triggers.push(...data.triggers)
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
                if(data.catalogs[catalog].constructor === Array){
                    data.entities.push(...data.catalogs[catalog])
                }
                //cache format
                if(data.catalogs[catalog].constructor === Object){
                    for(let id in data.catalogs[catalog]) {
                        data.entities.push(...data.catalogs[catalog][id])
                    }
                }
            }
        }

        if(data.entities){
            for(let entity of data.entities) {
                this.makeEntity(entity)
            }
        }
    }
    /**
     *
     * @param destpath {string}
     * @param resolve { boolean } add full entity info, including info inherited from its class and parent
     * @param format { 'xml', 'json', 'yaml', 'auto' } output data fromat
     * @param structure { 'file', 'components' | 'compact' | 'auto' } put all data in single file or in a folder with multiple components. compact is components structure but with all data catalogs merged together
     * @param scopes { ['components','documentinfo', 'assets', 'triggers', 'locales', 'styles', 'layouts', 'data'] | 'all' } which mod components to save
     * @returns {Promise<SCMod>}
     */
    async write (destpath,{resolve = false, format = 'auto', structure = 'auto', scopes = 'all'} = {}){
        if(scopes.constructor === String){
            scopes = [scopes]
        }
        if(scopes.includes('all')){
            scopes = [
                'assets',
                'triggers',
                'locales',
                'styles',
                'layouts',
                'data',
                'components',
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

        if(scopes.includes('header')){
            output[`DocumentHeader`] = ``
        }
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
            let info = {
                DocInfo: {
                    ModType: {
                        Value: {
                            _: 'Interface'
                        }
                    },
                    Dependencies: {
                        // Value: this.dependencies.map(dep => ({_: dep})),
                        // Value: [{_: 'bnet:Void (Mod)/0.0/999,file:Mods/Void.SC2Mod'}]
                        Value: [{_: 'bnet:Void (Campaign)/0.0/999,file:Campaigns/Void.SC2Campaign'}]
                    }
                }
            }
            output[`DocumentInfo`] = formatData(info , 'xml')
            if(format === 'auto'){
                fs.copyFileSync(path.resolve(__dirname ,'versions/DocumentInfo.version'), destpath + `DocumentInfo.version`)
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

            if(format === 'auto'){
                fs.copyFileSync(path.resolve(__dirname ,'versions/GameText.version'), destpath + `GameText.version`)
            }
        }
        if(scopes.includes('styles') && this.styles){
            extension = format === 'auto' ? 'SC2Style' : format
            formatting = format === 'auto' ? 'xml' : format;
            output[`Base.SC2Data/UI/FontStyles.${extension}`] = formatData(this.styles, formatting)
            if(format === 'auto'){
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
                let outputCatalogData

                let entities = data[cat].filter(entity => !entity.$overriden)
                if(formatting === "xml") {
                    // let catalogXMLObjectData = data.map(entity => entity.getXMLObject())
                    // output[`Base.SC2Data/GameData/${capitalize(cat)}Data.xml`] = formatData({Catalog: catalogXMLObjectData}, 'xml')
                    let catalogXML =entities .reduce((acc, entity) => {return acc + entity.getXML(resolve)}, '')
                    outputCatalogData = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Catalog>\n${catalogXML}\n</Catalog>`
                }
                else {
                    let catalogCache = {}
                    for(let entity of entities){
                        let entityData = {...(resolve ? entity.$$resolved : entity)}
                        catalogCache[entityData.id] = entityData
                        delete entityData.id;
                    }
                    outputCatalogData = formatData(catalogCache, formatting)
                }
                output[`Base.SC2Data/GameData/${capitalize(cat)}Data.${extension}`] = outputCatalogData
                if(format === 'auto'){
                    fs.copyFileSync(path.resolve(__dirname ,'versions/GameData.version'), destpath + `GameData.version`)
                }
            }
        }
        if(scopes.includes('triggers') && this.triggers){

            output[`Triggers`]  = `<?xml version="1.0" encoding="utf-8"?>\n<TriggerData>\n${this.triggers}\n</TriggerData>`

            //todo parsed triggers
            // let libraries = this.triggers.map(lib => optimiseForXML(lib, LibrarySchema))
            // output[`Triggers`] = formatData({TriggerData: {Library: libraries}}, format === 'auto' ? 'xml' : format)

            if(format === 'auto'){
                fs.copyFileSync(path.resolve(__dirname ,'versions/Triggers.version'), destpath + `Triggers.version`)
            }
        }
        for (let file in this.files) {
            if(scopes.includes(this.files[file].scope)){

                let foutput = destpath + file.replace(/\\/g, "\/")
                fs.mkdirSync(foutput.substring(0, foutput.lastIndexOf("/")), {recursive: true});

                let finput = this.files[file].path.replace(/\\/g, "\/")
                fs.copyFileSync(finput, foutput)
            }
        }

        for(let file in output){
            let foutput = destpath + file.replace(/\\/g, "\/")
            fs.mkdirSync(foutput.substring(0, foutput.lastIndexOf("/")), {recursive: true});
            fs.writeFileSync(foutput, output[file])
        }

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
                    trim: true,
                    explicitArray: true,
                    explicitChildren: true,
                    preserveChildrenOrder: true
                });
            }
            else{
                parser = new xml2js.Parser({trim: true, explicitArray: true});
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
    pickEntity(entity){
        if(!entity) {
            return
        }
        if(SCGame.pickIgnoreObjects[entity.$$namespace]?.includes(entity.id)){
            return
        }
        // console.log(entity.class +" " + entity.id)
        for(let relation of entity.$$relations){
            let linkedEntity = this.cache[relation.namespace][relation.link]
            if(!linkedEntity)continue
            if(linkedEntity.$$references){
                linkedEntity.addReferences(relation.path)
            }
            else{
                linkedEntity.addReferences(relation.path)
                this.pickEntity(linkedEntity)
            }
        }
    }
    pick(include = {}, {exclude = {}} = {}){
        SCGame.pickIgnoreObjects = {}
        deep(SCGame.pickIgnoreObjects,SCGame.defaultPickIgnoreObjects)
        deep(SCGame.pickIgnoreObjects,exclude)

        for(let namespace in include){
            for(let link of include[namespace]){
                let entity = this.cache[namespace][link]
                if(!entity)continue;
                entity.addReferences("")
                this.pickEntity(entity)
            }
        }
    }
    pickActors(){
        for (let actor of this.catalogs.actor){
            let termRelations = actor.$$relations.filter(rel => rel.type === "terms")
            let used = false
            for(let relation of termRelations){
                let linkedEntity = this.cache[relation.namespace][relation.link]
                if(linkedEntity?.$$references){
                    // linkedEntity.addReferences(relation.path)
                    used = true;
                }
            }
            if(used) {
                actor.addReferences("")
                this.pickEntity(actor)
            }
        }
    }
    createActorsForPickedUnits(){

        let copiedEvents = []

        for (let actor of this.catalogs.actor){
            let createdEntity;
            if(actor.$created)continue;
            if(actor.$overriden)continue;

            delete actor.$$references

            let termRelations = actor.$$relations.filter(rel => rel.type === "terms")
            for(let relation of termRelations){
                let linkedEntity = this.cache[relation.namespace][relation.link]
                if(!linkedEntity || !relation.path)continue
                if(linkedEntity?.$$references){
                    let _path = relation.path.split(".")

                    if(linkedEntity.$$references.includes(relation.path)){
                        linkedEntity.$$references.splice(linkedEntity.$$references.indexOf(relation.path),1)
                    }

                    if(!createdEntity){
                        createdEntity = this.makeEntity({
                            id: actor.id,
                            class: actor.class,
                            $class: actor.$class
                        })
                        Object.defineProperty(createdEntity, '$created',{ configurable:true, writable: true,enumerable: false,value: true })
                        createdEntity.addReferences("")
                    }
                    let property = _path[2]

                    if(!createdEntity[property])createdEntity[property] = []
                    let event = actor.$$resolved[property][_path[3]]
                    if(copiedEvents.includes(event)) continue;
                    copiedEvents.push(event)
                    _path[3] = createdEntity[property].length
                    createdEntity[property].push({...event})
                    linkedEntity.addReferences(_path.join("."))
                }
            }


        }
    }
    filter(){
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
    }
    renameEntities(mask){
        for(let catalog in this.catalogs) {
            // if(catalog === 'actor')continue
            for (let entity of this.catalogs[catalog]) {
                let oldName = entity.id
                entity.id = mask.replace("*", oldName)
                if (entity.$$references) {
                    for (let reference of entity.$$references) {
                        if(reference === "")continue //nothing to rename
                        let _path = reference.split(".")
                        let value,valueObject,valueProperty, valueEntity, newvalue
                        let referenceEntity = this.cache[_path[0]][_path[1]]
                        if(!referenceEntity){
                            console.warn("wrong reference " + reference)
                            continue;
                        }
                        if(SCGame.useResolve){
                            valueEntity = referenceEntity.$created ? referenceEntity : referenceEntity.$$resolved;
                        }
                        else{
                            valueEntity = referenceEntity;
                        }
                        value = valueEntity
                        for(let pathItem of _path.slice(2)){
                            if(value === undefined)break;
                            valueObject = value
                            valueProperty = pathItem
                            value = value[pathItem]
                        }
                        if(value === undefined){
                            console.warn("wrong reference " + reference)
                            continue;
                        }
                        if(value.constructor === Object){
                            valueObject = value
                            valueProperty = "value"
                            value = valueObject.value
                        }
                        //todo objects????


                        if(value.includes(".") || value.includes(" ") || value.includes(";")){
                            //this is a term

                            let [event,...conditions] = value.split(";").map(term => term.trim())
                            let eventParts = event.split(".")
                            let namespace = {
                                Behavior: "behavior",
                                Abil: "abil",
                                WeaponStart: "weapon",
                                Upgrade: "upgrade",
                                Confirmation: "unit",
                                UnitConstruction: "unit",
                                UnitDeath: "unit",
                                UnitBirth: "unit",
                                UnitRevive: "unit",
                                Effect: "effect",
                            }[eventParts[0]]


                            if(namespace === entity.$$namespace && eventParts[1] === oldName){
                                eventParts[1] = entity.id
                                event = eventParts.join(".")
                            }
                            for(let index =0; index < conditions.length; index++){
                                let condition = conditions[index]
                                let eventParts = condition.split(" ").map(term => term.trim())
                                let namespace = {
                                    // ModelSwap: "model",
                                    ValidateUnit: "validator",
                                    MorphFrom: "unit",
                                    MorphTo: "unit",
                                }[eventParts[0]]
                                if(namespace === entity.$$namespace && eventParts[1] === oldName){
                                    eventParts[1] = entity.id
                                    conditions[index] = eventParts.join(" ")
                                }
                            }
                            newvalue = [event, ...conditions].join(";")
                        }
                        else if(value.includes(",") && value.lastIndexOf(",") !==  value.indexOf(","))  {
                            //this is a reference
                            let [entityType, entityName, entityProperty] = value.split(",")
                            newvalue = [entityType, entity.id, entityProperty].join(",")
                        }
                        else if(value.includes(",")) {
                            //this is a abilcmd
                            let [entityName, cmd] = value.split(",")
                            newvalue = [entity.id, cmd].join(",")
                        }
                        else{
                            //this is a link
                            newvalue = entity.id
                        }
                        valueObject[valueProperty] = newvalue
                    }
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

        if(classname === "const"){
            return
        }
        if(!entityid){
            entityclass.mixin(entitydata)
            this.entities.push(entityclass)
            return entityclass
        }
        else{
            let namespace = entityclass.$$namespace
            if(!namespace || SCGame.ignoredNamespaces.includes(namespace))return;
            if(!this.cache[namespace])this.cache[namespace] ={}
            if(!this.catalogs[namespace])this.catalogs[namespace] =[]
            let catalog = this.catalogs[namespace]
            let existed = this.cache[namespace][entityid]
            let parent = entityparent && this.cache[namespace][entityparent]

            if(existed) {
                if (entityparent) {
                    Object.defineProperty(existed, '$overriden',{ configurable:true, writable: true,enumerable: false,value: true })
                    // console.log(entityid + ': overriding element parent ')
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
            this.cache[namespace][entityid] = entityInstance
            catalog.push(entityInstance)
            this.entities.push(entityInstance)
            return entityInstance
        }
    }
}
