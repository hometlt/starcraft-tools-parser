import fs from 'fs'
import path from 'path'
import {SCGame} from "./sc-game.js";
import {SCEntity} from "./sc-entity.js";
import config from "./config.js";

import { Octokit} from "octokit";
import {
    deep,
    formatData,
    capitalize,
    optimiseForXML,
    isNumeric,
    getDebugInfo,
    relations,
    buildXMLObject,
    cleanup
} from "./operations.js";
import {LibrarySchema, SCSchema} from "./sc-schema.js";
import {FileReader, LocalSCComponentReader, GithubSCComponentReader} from "./readers.js";

const __dirname = process.cwd()


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
    async read (input,options) {

        if(input.constructor !== Array){
            input = [input]
        }
        for (let item of input) {
            if(item){
                let data
                if(item.constructor === String){
                    for(let dir in SCGame.directories){
                        item = item.replace("$"+ dir , SCGame.directories[dir])
                    }
                    if( item[item.length -1 ] === '/'){
                        this.directory(item.substring(1))
                    }
                    if(item[0] === '>'){
                        await this.write(item.substring(1))
                    }
                    data = await this.getModData(item,options)
                }
                else {
                    data = item
                }
                if(data){
                    this.apply(data)
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
                    this.locales[locale][type][id] = this.resolveTextValue( this.locales[locale][type][id], ["locales",locale,type,id])
                }
            }
        }
    }
    resolveTextValue(expresion,path){
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
            .replace(/<d\s+(?:time|ref)\s*=\s*"(.+?)(?=")"((?:\s+\w+\s*=\s*"\s*([\d\w]+)?\s*")*)\s*\/>/gi, (_,ref,opts) => {
                let precision = /(?:\s+precision\s*=\s*"\s*(\d+)?\s*")/.exec(opts)?.[1]
                let value = this.parseReference(ref,path)
                value = precision ?  value.toFixed(precision) : Math.round(value)
                return `<b>${value}</b>`
            })
            .replace(/<n\/>/g,"<br/>")
    }
    cleaup(){

        for(let cat in mod.catalogs) {
            for(let entity of mod.catalogs[cat]) {
                cleanup(entity.$$resolved)
            }
        }
    }
    ignoreEntities (data){
        for(let catalog in data){
            if(this.cache[catalog]){
                for(let unit of data[catalog]) {
                    if (this.cache[catalog][unit]) {
                        if(this.cache[catalog][unit]) {
                            this.cache[catalog][unit].ignore = true;
                        }
                    }
                }
            }
        }
    }
    parseReference(expressionReference,path){


        let ref = expressionReference.replace(/\[d\s+(?:time|ref)\s*=\s*'(.+?)(?=')'((?:\s+\w+\s*=\s*'\s*([\d\w]+)?\s*')*)\s*\/?\]/gi, (_,ref,opts) => {
            let precision = /(?:\s+precision\s*=\s*"\s*(\d+)?\s*")/.exec(opts)?.[1]
            let value = this.parseReference(ref,path)
            return precision ?  value.toFixed(precision) : Math.round(value)
        })

        ref = ref.replace(/<n\/>/g,"")

        ref = ref.replace(/\$(.+?)\$/g,(_,cc)=>{
            let options = cc.split(':')
            switch(options[0]){
                case 'AbilChargeCount':
                    let ability = options[1]
                    let index = options[2]
                    let refObject = this.cache.abil[ability]
                    if(!refObject){
                        console.warn(`Entity not found:  abil.${ability} (${path.join(".")})`)
                        return '0'
                    }

                    let refIndex = "Train" + (index+ 1)
                    let refInfo = refObject.InfoArray[refIndex]
                    if(!refInfo){
                        console.warn(`Wrong Ability InfoArray index:  abil.${ability}.${refIndex} (${path.join(".")})`)
                    }
                    return ` ${refObject.Charge?.CountStart || 0} `

                case 'UpgradeEffectArrayValue':
                    let upgrade = options[1]
                    let effectArrayValue = options[2]

                    let refValue = this.cache.upgrade[upgrade]?.EffectArray.find(eff => eff.Reference === effectArrayValue)?.Value
                    return refValue ? ' ' + refValue + ' ' : ' 0 '
            }
            return '0'
        })

        ref = ref.replace(/((\w+),([\w@]+),(\w+[\.\w\[\]]*))/g,(_,expr)=>{
            let refValue = this.getReferenceValue(expr,path)
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
                console.warn('wrong Expression: ' + expressionReference + "   (" + path.join(".") + ")")
                result = 0
            }

        }
        return result
    }
    readImages(imagesDiretory){
        this.images = fs.readdirSync(imagesDiretory).map(file => file.replace(/\.png|\.dds/,'').toLowerCase())
    }
    checkImage(imagePath,path){
        if(!imagePath)return null
        imagePath = (imagePath.value || imagePath)
        let imagePath2 = imagePath.toLowerCase().replace(/\\/g,'/').replace(/.*\//,'').replace('.dds','')
        // if(!this.images.includes(imagePath2)){
        //     // console.log("Image not found: " + imagePath + " (" + path.join(".") + ")" )
        //     return null
        // }
        return imagePath2
    }
    checkImages(){

        for(let entity of this.catalogs.actor) {
            entity = entity.$$resolved
            if(entity.Wireframe?.Image){
                for(let image in entity.Wireframe.Image){
                    entity.Wireframe.Image[image] = this.checkImage(entity.Wireframe.Image[image],["actor",entity.id]);
                }
            }
            if(entity.UnitIcon){
                entity.UnitIcon = this.checkImage(entity.UnitIcon,["actor",entity.id]);
            }
            if(entity.LifeArmorIcon) {
                entity.LifeArmorIcon = this.checkImage(entity.LifeArmorIcon,["actor",entity.id]);
            }
            if(entity.ShieldArmorIcon) {
                entity.ShieldArmorIcon = this.checkImage(entity.ShieldArmorIcon,["actor",entity.id]);
            }
        }
        for(let entity of this.catalogs.weapon) {
            entity = entity.$$resolved
            if(entity.Icon){
                entity.Icon = this.checkImage(entity.Icon,["actor",entity.id]);
            }
        }
        for(let entity of this.catalogs.upgrade) {
            entity = entity.$$resolved
            if(entity.Icon) {
                entity.Icon = this.checkImage(entity.Icon,["actor",entity.id]);
            }
        }
        for(let entity of this.catalogs.button) {
            entity = entity.$$resolved
            if(entity.Icon) {
                entity.Icon = this.checkImage(entity.Icon,["actor",entity.id]);
            }
        }
        for(let entity of this.catalogs.behavior) {
            entity = entity.$$resolved
            if(entity.Icon) {
                entity.Icon = this.checkImage(entity.InfoIcon,["actor",entity.id]);
            }
        }
    }
    resolveUnitActors(){
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

                        if(!entity.UnitIcon && ! entity.Wireframe?.Image?.[0]){
                            continue;
                        }
                        // if(unit.$actor){
                        //     console.log("!")
                        // }
                        Object.defineProperty(unit, '$actor',{ configurable:true, writable: true,enumerable: false,value: entity })
                    }
                }
            }
        }
    }
    getReferenceValue(expr,path){
            let [catalog,entityId,field] = expr.split(",")
            let entity = this.cache[catalog.toLowerCase()]?.[entityId]

            if(!entity){
                console.warn('Entity not found:  ' + catalog + '.' + entityId + " (" + path.join(".") + ")")
                return ''
            }

        try{
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
                    console.warn('Value is undefined:  '  + expr + " (" + path.join(".") + ")")
                    return ''
                }
            }

            __val = __val.value || __val
            return +__val
        }
        catch(e){
            console.warn('Wrong Expression: '  + e + " (" + path.join(".") + ")")
            return ''
        }
    }


    async getModData (modpath,{catalogs= 'all', scopes = 'all'} = {}){


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
                'files',
                'banklist',
                'mapdata',
                'documentinfo'
            ]
        }


        let reader;
        if(modpath.startsWith("github:")){
            reader = new GithubSCComponentReader(modpath)
        }
        else{
            let input = this.resolvePath(modpath)
            let format = path.extname(input).substring(1).toUpperCase()

            //supports json, xml, yaml, sc2mod
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
                reader = new LocalSCComponentReader(input)
            }

            else{
                reader = new FileReader(input,format)
            }
        }


        let data;
        data = {};
        data.path = modpath

        console.log(`Reading: ${modpath.replace(/.*StarCraft II/,'$')}`)

        data = await reader.read(scopes);

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
        if(data.layoutFilesData){
            if (!this.layoutFilesData) this.layoutFilesData = {}
            Object.assign(this.layoutFilesData,data.layoutFilesData)
        }

        if(data.banklist){
            if (!this.banklist) this.banklist = {}
            deep(this.banklist, data.banklist)
        }



        if(data.objects) {
            if (!this.objects) this.objects = {}
            deep(this.objects, data.objects)
        }
        if(data.preload) {
            if (!this.preload) this.preload = {}
            deep(this.preload, data.preload)
        }
        if(data.terrain) {
            if (!this.terrain) this.terrain = {}
            deep(this.terrain, data.terrain)
        }
        if(data.regions) {
            if (!this.regions) this.regions = {}
            deep(this.regions, data.regions)
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
            for(let catalog in data.cache){
                //cache format
                for(let id in data.cache[catalog]) {
                    let entity = data.cache[catalog][id];
                    let existed = this.cache[catalog][id];
                    entity.id = id;
                    if(existed){
                        entity.class = existed.class
                    }
                    data.entities.push(entity)
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

    resolvePath(destpath){

        if(!destpath.startsWith('./') && !destpath.startsWith('.\\') && !destpath.includes(":")){
            destpath = this._directory + destpath
        }
        return path.resolve(destpath)
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
    write (destpath,{text = {}, outputFn = null, formatFn = null,catalogs= 'all',resolve = false, format = 'auto', structure = 'auto', scopes = 'all', core = false} = {}){

        // set mod name
        for(let locale in this.locales){
                this.locales[locale].GameStrings["DocInfo/Website"] = text.Website
                this.locales[locale].GameStrings["DocInfo/Name"] = text.Name
                if(text.DescLong){
                    this.locales[locale].GameStrings["DocInfo/DescLong"] = `${text.DescLong}${text.Signature || ''}`
                }
                if(text.DescShort){
                    this.locales[locale].GameStrings["DocInfo/DescShort"] = text.DescShort
                }
            }

        destpath = this.resolvePath(destpath)

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

        console.log(`Writing: ${destpath.replace(/.*StarCraft II/,'$')}`)

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

            // if(this.dependencies?.find(d => d.endsWith('file:Campaigns/Void.SC2Campaign'))){
            //     deps.push({_: voidCampaign})
            //     includeCampaign = true;
            // }
            // else if(this.dependencies?.find(d => d.endsWith('file:Mods/Void.SC2Mod'))){
            //     deps.push({_: voidMod})
            //     includeVoid = true;
            // }



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
                        Value: this.dependencies.map(dep => ({_: dep})),
                        // Value: [{_: 'bnet:Void (Mod)/0.0/999,file:Mods/Void.SC2Mod'}]
                        // Value: deps
                    }
                })
            }
            output[`DocumentInfo`] = formatData(info , 'xml')

            if(scopes.includes('binary') && format === 'auto'){
                fs.copyFileSync(path.resolve(__dirname ,config.binaryFolder+  '/DocumentInfo.version'), destpath + `DocumentInfo.version`)
            }

            if(scopes.includes('binary')){
                if(includeVoid){
                    fs.copyFileSync(path.resolve(__dirname ,config.binaryFolder+ '/DocumentHeader VOID'), destpath + `DocumentHeader`)
                }
                if(includeCampaign) {
                    fs.copyFileSync(path.resolve(__dirname ,config.binaryFolder+ '/DocumentHeader VOID CAMPAIGN'), destpath + `DocumentHeader`)
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
                fs.copyFileSync(path.resolve(__dirname ,config.binaryFolder+ '/GameText.version'), destpath + `GameText.version`)
            }
        }
        if(scopes.includes('styles') && this.styles){
            extension = format === 'auto' ? 'SC2Style' : format
            formatting = format === 'auto' ? 'xml' : format;
            output[`Base.SC2Data/UI/FontStyles.${extension}`] = formatData(this.styles, formatting)
            if(scopes.includes('binary') && format === 'auto'){
                fs.mkdirSync(destpath+  `Base.SC2Data/UI/`, {recursive: true});
                fs.copyFileSync(path.resolve(__dirname ,config.binaryFolder+ '/FontStyles.version'), destpath + `Base.SC2Data/UI/FontStyles.version`)
            }
        }
        if(scopes.includes('layouts') && this.layouts){
            extension = format === 'auto' ? 'SC2Layout' : format
            formatting = format === 'auto' ? 'xml' : format;
            output[`Base.SC2Data/UI/Layout/DescIndex.${extension}`] = formatData({Desc: {Include: this.layouts }}, formatting)

            for(let layout in this.layoutFilesData){
                if(layout.toLowerCase() === "base.sc2data/ui/layout/descindex.sc2layout"){
                    continue
                }
                output[layout] = this.layoutFilesData[layout]
            }
        }
        if(scopes.includes('data') && this.banklist){
            formatting = format === 'auto' ? 'xml' : 'xml';

            if(formatting === "xml") {
                let catalogXML = buildXMLObject(this.banklist)
                output[`BankList.xml`] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n${catalogXML}\n`
            }
        }


        // entityData = JSON.parse(JSON.stringify(entityData))
        if(this.objects) {
            let objectsData = JSON.parse(JSON.stringify(this.objects))
            optimiseForXML(objectsData, SCSchema.Objects)
            output[`Objects`] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n${buildXMLObject({PlacedObjects: objectsData})}\n`
        }
        if(this.preload) {
            let preloadData = JSON.parse(JSON.stringify(this.preload))
            optimiseForXML(preloadData, SCSchema.Preload,['Preload'])
            output[`Preload.xml`] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n${buildXMLObject({Preload: preloadData})}\n`
        }
        if(this.terrain) {
            let terrainData = JSON.parse(JSON.stringify(this.terrain))
            optimiseForXML(terrainData, SCSchema.Terrain)
            output[`t3Terrain.xml`] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n${buildXMLObject({terrain: terrainData})}\n`
        }
        if(this.regions) {
        //     optimiseForXML(this.regions, SCSchema.Regions)
        //     output[`Regions`] = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n${buildXMLObject(this.regions)}\n`
        }



        if(scopes.includes('data') && this.entities){
            extension = format === 'auto' ? 'xml' : format
            formatting = format === 'auto' ? 'xml' : format;
            let data = (structure === 'compact') ? {mod: this.entities} : this.catalogs
            for (let cat in data) {
                if(cat === "abilcmd")continue
                if(catalogs === 'all' || catalogs.includes(cat)){

                    let outputCatalogData

                    let entities = data[cat];//.filter(entity => !entity.$overriden)

                    if(!core){
                        entities = entities.filter(entity => !entity.__core)
                    }

                    if(formatting === "xml") {
                        // let catalogXMLObjectData = data.map(entity => entity.getXMLObject())
                        // output[`Base.SC2Data/GameData/${capitalize(cat)}Data.xml`] = formatData({Catalog: catalogXMLObjectData}, 'xml')
                        let catalogXML = entities.reduce((acc, entity) => {
                            let entityData
                            if(formatFn){
                                entityData = formatFn(entity)
                            }
                            else{
                                entityData = {...(resolve ? entity.$$resolved : entity)}
                            }
                            return acc + entity.getXML(entityData)
                        }, '')

                        catalogXML = catalogXML.replace(/<__token__ (.*)\/>/g,`<?token $1?>`)
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
                        fs.copyFileSync(path.resolve(__dirname ,config.binaryFolder+ '/GameData.version'), destpath + `GameData.version`)
                    }
                }

            }
        }
        if(scopes.includes('triggers') && this.triggers){

            // output[`Triggers`]  = `<?xml version="1.0" encoding="utf-8"?>\n<TriggerData>\n${this.triggers}\n</TriggerData>`

            //todo parsed triggers
            let libraries = this.triggers.map(lib => optimiseForXML(JSON.parse(JSON.stringify(lib)), LibrarySchema))
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
                fs.copyFileSync(path.resolve(__dirname ,config.binaryFolder+ '/Triggers.version'), destpath + `Triggers.version`)
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
                if(fs.existsSync(finput)) {
                    fs.copyFileSync(finput, foutput)
                }
                else{
                    console.warn("File not exist: " + finput)
                }
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
        for(let i in b) {
            if(a.constructor === Object && b.constructor === Object && a[i]) {
                mixin(a[i], b[i])
            }
            else {
                a[i] = b[i]
            }
        }
    }
    pickEntity (entity,path = []){
        if(!entity) {
            return
        }
        if(SCGame.pickIgnoreObjects[entity.$$namespace]?.includes(entity.id)){
            return
        }

        if(entity.__core){
            return
        }

        let readablePath = path.join(".")

        if(!entity.__paths){
            Object.defineProperty(entity, '__paths',{ configurable:true, writable: true,enumerable: false,value: [] })
        }
        entity.__paths.push(readablePath)
        // console.log(entity.class,entity.id,readablePath)

        if(entity.__picked){
            return
        }

        if(!this.pickedCounter){
            this.pickedCounter  = 0
        }
        this.pickedCounter++
        Object.defineProperty(entity, '__picked',{ configurable:true, writable: true,enumerable: false,value: true })

        if(entity.$$relations){
            // console.log(entity.class +" " + entity.id)
            for(let relation of entity.$$relations){
                relation.refpath = path


                if(entity.id === "Requirements"){

                }

                this._pickRelation(relation,[...path,entity.$$namespace + '.' + entity.id])
            }
        }
    }
    index(){
        if(this.supportEntities){

            for(let namespace in this.supportEntities){
                for(let entityID in this.supportEntities[namespace]){
                    let entity = this.supportEntities[namespace][entityID]
                    this.pickEntity(entity)
                }
            }
        }
        for(let namespace in this.catalogs){
            for(let entity of this.catalogs[namespace]){
                // entity.addReferences({})
                this.pickEntity(entity)
            }
        }
        this.pickTriggers()
        this.pickObjects()
        this.pickActors()
    }
    pick(include = {}, {exclude = {}} = {}){
        console.log("Picking entities")
        this.pickedCounter = 0
        SCGame.pickIgnoreObjects = {}
        deep(SCGame.pickIgnoreObjects,SCGame.defaultPickIgnoreObjects)
        deep(SCGame.pickIgnoreObjects,exclude)

        this.pickTriggers()
        this.pickObjects()

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
        if(!this.catalogs.actor){
            return
        }
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
        delete this.locales
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
    remove(entity){
        let catalog = this.catalogs[entity.$$namespace]
        catalog.splice(catalog.indexOf(entity),1)
        this.entities.splice(this.entities.indexOf(entity),1)
        delete this.cache[entity.$$namespace][entity.id]
    }
    filter(){

        let before = this.entities.length
        for(let catalog in this.catalogs){
            for(let entity of this.catalogs[catalog]){
                if(!entity.$$references || !entity.__picked){
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
                if(entity.__core){
                    continue
                }
                if(entity.__picked){
                    entity.resolveAssets()
                }
            }
        }
    }
    resolveText(mask){
        let picked = []
        for(let catalog in this.catalogs) {
            for (let entity of this.catalogs[catalog]) {
                if(entity.__core){
                    continue
                }
                if(entity.__picked) {
                    entity.resolveText(mask, picked)
                }
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

    removeUnusedSounds(){

        let removed = 0
        for(let i = this.catalogs.actor.length; i--;){
            let entity = this.catalogs.actor[i]
            if(entity.SoundArray?.Pissed){
                delete entity.SoundArray?.Pissed
            }
        }
        for(let i = this.catalogs.sound.length; i--;){
            let entity = this.catalogs.sound[i]
            if((
                    entity.id.endsWith("_NP") ||
                    entity.id.endsWith("_MC")
                    // entity.id.includes("Warcry") ||
                    // entity.id.includes("Pissed") ||
                    // entity.id.endsWith("Help") ||
                    // entity.id.includes("_Help") ||
                    // entity.id.endsWith("HelpAlt") ||
                    // entity.id.includes("YesAttack")
                ) &&
                (!["MindControlled_Yes_MC", "MindControlled_Death_MC", "MindControlled_Pissed_MC", "MindControlled_Ready_MC", "MindControlled_What_MC"].includes(entity.id)) &&
                (!["TerranPissed","ZergPissed","ProtossPissed"].includes(entity.id))){
                this.catalogs.sound.splice(i,1)
                delete this.cache.sound[entity.id]
                this.entities.splice(this.entities.indexOf(entity))
                removed++
            }
        }
        console.log("removed " + removed + " sounds")

    }
    collectDataForRenaming () {
        let pick = {
            unit: [],
            abil: [],
            actor: [],
            behavior: [],
            button: [],
            sound: [],
            effect: [],
            footprint: [],
            model: [],
            mover: [],
            requirement: [],
            requirementnode: [],
            turret: [],
            upgrade: [],
            validator: [],
            weapon: [],
        }

        {
            let catalog
            let entityid
            for (catalog in pick) {
                if(this.catalogs[catalog]){
                    for (let entity of this.catalogs[catalog]) {
                        if(entity.__core || entity.__cantBeRenamed){
                            continue;
                        }
                        entityid = entity.id
                        if(entityid && !entity.__core && !SCGame.defaultPickIgnoreObjects[catalog]?.includes(entityid)){
                            pick[catalog].push(entityid)
                        }
                    }
                }
            }
        }
        return pick;
    }
    _pickRelation(relation,path,createGhostEntities = false){

        let linkedEntity = this.cache[relation.namespace]?.[relation.link]


        if(!linkedEntity){
            if(!createGhostEntities){
                return;
            }
            if(!this[relation.namespace]?.[relation.link] && !this.supportEntities?.[relation.namespace]?.[relation.link]){


                let parts = relation.xpath.split(".").slice(2)
                let val = relation.target;
                for (let part of parts) {
                    if(!val) {
                        break;
                    }
                    val = parts[part]
                }
                if(val) {
                    console.log("no entity found " + relation.namespace + "#" + relation.link)
                }
            }
            if(!this.cache[relation.namespace]){
                this.cache[relation.namespace] = {}
            }
            linkedEntity = new SCEntity({
                $mod: this,
                $namespace: relation.namespace
            });
            linkedEntity.ghost()
            this.cache[relation.namespace][relation.link]  = linkedEntity
        }
        if(linkedEntity.$$references){
            linkedEntity.addReferences(relation)
        }
        else{
            linkedEntity.addReferences(relation)
            this.pickEntity(linkedEntity,path)
        }

    }
    pickTriggers(){
        if(this._triggersPicked ){
            return
        }
        this._triggersPicked = true
        // console.log("Picking entities used by Triggers")
        this.pickedCounter = 0
        this.pickedCounter = 0
        SCGame.pickIgnoreObjects = {}
        deep(SCGame.pickIgnoreObjects,SCGame.defaultPickIgnoreObjects)

        for(let libIndex in this.triggers){
            let result = relations(this.triggers[libIndex],this.triggers[libIndex], LibrarySchema,['library',libIndex],SCGame.pickIgnoreObjects)

            for(let i in result){
                if(!result[i].xpath) {
                    result[i].xpath = result[i].path
                }
            }

            for(let relation of result){
                this._pickRelation(relation)
            }
        }
    }


    pickObjects(){
        if(!this.objects || this._objectsPicked){
            return
        }
        this._objectsPicked = true
        console.log("Picking entities used by Objects")
        this.pickedCounter = 0

        SCGame.pickIgnoreObjects = {}
        deep(SCGame.pickIgnoreObjects,SCGame.defaultPickIgnoreObjects)

        let result = relations(this.objects, this.objects, SCSchema.Objects,['map','objects'],SCGame.pickIgnoreObjects)

        for(let i in result){
            if(!result[i].xpath) {
                result[i].xpath = result[i].path
            }
        }

        for(let relation of result){
            this._pickRelation(relation)
        }
    }

    //prefix all filtered entities with 'Legacy' word. where '*' is an old entity id
    /**
     *
     * @param mask
     * @param tags rename uniqueTags
     */
    renameEntities(mask,{tags = true,pick = null} = {}){

        // for(let type in DataSchema){
        //     if(!DataSchema[type].prototype){
        //         DataSchema[type].$ID = 'string'
        //     }
        // }
        console.log(`Renaming entities`)

        if(!pick){
            this.pickTriggers()
            this.pickObjects()
            this.pickAll()
        }
        // this.resolveAssets()
        // this.resolveText(mask)

        let counter = 0


        function doRenaming(entity){
            if(entity.__cantBeRenamed) {
                return
            }
            if(!entity.__picked) {
                return
            }
            if(entity.__core){
                return
            }
            if(entity.__renamed){
                return
            }

            // if(entity.$children){
            //     for(let child of entity.$children){
            //         doRenaming(child)
            //     }
            // }


            counter += entity.rename(mask)
        }

        for(let catalog in this.catalogs) {
            // if(catalog === 'actor')continue
            for (let entity of this.catalogs[catalog]) {
                doRenaming(entity)
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
                    //new behavior. replace old entities with new one
                    if(true){
                        entitydata.$mod = this
                        entitydata.$parent =  parent || null;
                        entitydata.class = classname
                        entitydata.$class = entityclass
                        let entityInstance = new SCEntity(entitydata)
                        if(existed.__core){
                            entityInstance
                            // entityInstance.ghost()
                        }
                        catalog.splice(catalog.indexOf(existed),1,entityInstance)
                        this.cache[namespace][entityid] = entityInstance
                        this.entities.splice(this.entities.indexOf(existed),1,entityInstance)
                        return entityInstance
                    }

                    // Object.defineProperty(existed, '$overriden',{ configurable:true, writable: true,enumerable: false,value: true })
                    // console.info('OVERRIDING: ' + namespace+ '#' + entityid)
                    // if(existed.__core)_core = true
                }
                else{
                    //replace Core with new value
                    if(existed.__core && !_core){
                        entitydata.$mod = this
                        entitydata.$parent =  parent || existed;
                        entitydata.class = classname
                        entitydata.$class = entityclass
                        let entityInstance = new SCEntity(entitydata)
                        Object.defineProperty(entityInstance, '__cantBeRenamed',{ configurable:true, writable: true,enumerable: false,value: true })

                        catalog.splice(catalog.indexOf(existed),1,entityInstance)
                        this.cache[namespace][entityid] = entityInstance
                        this.entities.splice(this.entities.indexOf(existed),1,entityInstance)
                        return entityInstance

                    }
                    else{
                        existed.mixin(entitydata)
                        if(existed.class === "CUser"){
                            for(let index = 0; index < existed.Instances.length - 1 ; index++){
                                let item = existed.Instances[index]
                                for(let index2 = index + 1; index2 < existed.Instances.length ; index2++){
                                    let item2 = existed.Instances[index2]
                                    if(item2.Id === item.Id){
                                        deep(item,item2)
                                        existed.Instances.splice(index2,1)
                                    }
                                }
                            }
                        }
                        return existed
                    }
                }
            }
            entitydata.$mod = this
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


    setDocInfo({
       Name,
       DescLong,
       DescShort,
       Website  = `https://discord.gg/2RbcjRkddw`,
       Signature = `<n/>mod By Visceroid<n/>ALL RACES COOP<n/>ponomarevtlt@gmail.com`,
   }){
        for(let locale in this.locales){
            this.locales[locale].GameStrings["DocInfo/Website"] = Website
            this.locales[locale].GameStrings["DocInfo/Name"] = Name
            if(DescLong){
                this.locales[locale].GameStrings["DocInfo/DescLong"] = `${DescLong}${Signature}`
            }
            if(DescShort){
                this.locales[locale].GameStrings["DocInfo/DescShort"] = DescShort
            }
        }
    }



     renamePickedEntities(){

        // for(let cat in this.catalogs){
        //     for(let entity of this.catalogs[cat]){
        //         if(entity.__core){
        //             continue;
        //         }
        //
        //         if(entity.Race){
        //             if (entity.Race === "Zerg" || entity.Race === "Prot" || entity.Race === "Terr" ){
        //                 this.pickEntity(entity)
        //             }
        //         }
        //         else if(entity.EditorCategories){
        //             if(entity.EditorCategories.includes("Race:Protoss") || entity.EditorCategories.includes("Race:Zerg") || entity.EditorCategories.includes("Race:Terran")){
        //                 this.pickEntity(entity)
        //             }
        //         }
        //     }
        // }
        // this.filter()


        //todo for legacy
        // let pick = this.renaming()

        this.supportEntities =  Object.entries(JSON.parse(fs.readFileSync("data/pick.json",{encoding: 'utf-8'}))).reduce((prev,curr) => Object.assign(prev, {[curr[0]]: curr[1].reduce((prev,curr) => Object.assign(prev,{[curr]:{}}),{})}), {})


        // this.renameEntities("ARC@*",{pick})

        //for others
        this.index();


        for(let namespace in this.supportEntities){
            for(let entityID in this.supportEntities[namespace]){
                // this.supportEntities[namespace] = new SCEntity({})
                // let entity = this.supportEntities[namespace]
                let entity = this.cache[namespace][entityID]
                if(entity){
                    entity.rename("ARC@*")
                }
            }
        }


        //  for(let catalog in pick) for(let entityid in pick[catalog]) mod.cache[catalog]?.[entityid]?.rename("ARC" + entityid)
    }
}



export async function createMod({mods = [], core  = null}){
    let mod = new SCMod()

    if(core){
        await mod.read(core,{scopes: ['data']});
        mod.saveCore()
    }
    // else{
    //     mod.supportEntities =  getPickData()
    // }
    await mod.read(mods);
    return mod
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

