import fs from "fs";
import {SCGame} from "./sc-game.js";
import "./libs.js"

const unknowns = {}

export const TYPES = {
    BIT: 'bit',
    INT: 'int',
    REAL: 'real',
    INTS: 'ints',
    REALS: 'reals',
    FILTERS: 'filters',
    CATEGORIES: 'categories',
    FILE: 'file',
    LINK: 'link',
    WORD: 'word',
}

let regexps  = {
    bool: /^true|false$/,
    bit: /^[01]$/,
    int: /^-?(0|[1-9]\d*)$/,
    real: /^(-?(0|[1-9]\d*)(\.\d+)?)|\.\d+$/,
    ints: /^(-?(0|[1-9]\d*)(,-?(0|[1-9]\d*))*|NULL)$/,
    reals: /^((-?(0|[1-9]\d*)(\.\d+)?)(\,-?(0|[1-9]\d*)(\.\d+)?)*|NULL)$/,
    filters: /^(-|\w+(,\w+){0,});(-|\w+(,\w+){0,})$/,
    categories: /^(\w+\:[\w -#]+)(,\w+\:[\w -#]+)*$/,
    file: /^.*$/,
    link: /^[A-Za-z_\-@#0-9-]+(\/+[A-Za-z_\-@#0-9-]+)*\/?$/,
    linkstrict: /^[A-Za-z_\-@#0-9-]+(\/+[A-Za-z_\-@#0-9-]+)+\/?$/,
    links: /^[A-Za-z_\-@#0-9-]+(\/+[A-Za-z_\-@#0-9-]+)*\/?(,[A-Za-z_@#0-9-]+(\/+[A-Za-z_@#0-9-]+)*\/?)*$/,
    text: /^[A-Za-z_\-@#0-9-]+((\/+[A-Za-z_\-@#0-9-]+)\/?)*(\/+.+)+\/?$/,
    word: /^[\w@_\-%#]+$/,
    wordstrict: /^[\w@_\-%#]+$/,
    abilcmd: /^([\w@_#]+([.,][\w]+)?|255)$/,
    abilcmdstrict: /^([\w@_#]+[.,][\w]+|255)$/,
    words: /^[\w@_\-%#]+(,[\w@_\-%#]+)*$/,
    ops: /^[\w@_\-%#]+(\s[\w@_\-%#]+)*$/,
    reference: /^.*$/,
    referencestrict: /^\w+,\w+,[\w\[\].]+$/,
    subject: /^.*$/,
    driver: /^.*$/,
    send: /^.*$/,
    terms: /^.*$/,


    filestrict: /^[Za-z_#'0-9\-]+[\\/a-z_#'0-9\-. ]+\.(dds|fxa|m3|tga|m3a|ogv|wav|mp3|SC2Map|SC2Layout|SC2Cutscene|SC2Campaign|SC2Mod)$/i,
}

export function getDataScheme(u, mod, path){
    if(!path)path = []

    let s = {}
    for(let ua in u){
        if(u[ua].constructor === Object){
            s[ua] = getDataScheme(u[ua], mod,[...path,ua])
        }
        else{
            s[ua] = getValuesType(u[ua], mod,[...path,ua])
        }
    }
    return s
}

function matchTypeAll(values ,type){
    for(let value of values){
        if(!matchType(value,type,true)){
            return false
        }
    }
    return true
}

function getNotMatched(values ,type){
    let notMatched = []
    for(let value of values){
        if(!matchType(value,type,true)){
            notMatched.push(value)
        }
    }
    return notMatched
}

let keywords = {
    Display: "Default|Always|Never",
    Key: "Default|DamageLoss|RefundEnergy|HitCount|Annex",
    AmountType: "Damaged|DamageInherited",
    Position: "Center|Top|Bottom",
    CreepRates: "Grow|Shrink",
    Mode: "Persist|Overlay",
    HeightClass: "Default|Medium|Small|Smaller|Tiny|Large|Huge|Full",
    Player: 'Creator|Upkeep|CasterPlayer|Owner',
    Report: "Average|Samples",
    DisplayType: 'Confirm|Legacy',
    ContainerType: "Any|Transport",
    DamageCategories: "Physical|Magical",
    BuildType: 'AddOn',
    PathMode: "Builder|Scaler|Jumper|Amphibious|Float|Flying",
    HeightMap: "Glide|Air|Ground",
    AcquireLevel: 'Offensive|Passive|Defensive',
    Phase: "Delay",
    Alignment: 'Negative|Positive|Neutral',
    TargetLocationType: "UnitOrPoint|Point",
    AccumulatorCargo: "Load|Free",
    Target: 'Outer|Unknown|Caster|Origin|Target|CasterOuter',
    Evaluate: "Failed|Attain|Expand",
    Check: "Absent|Present",
    Relationship: "Self|Ally|Enemy",
    BehaviorState: "SuppressEnergy|Untargetable|SuppressInvulnerability|SuppressCloak|Hallucination|Summoned|Stun|Daze|SuppressItemUsage",
    WhichLocation: 'Any|Attacker|Source|TargetPoint|TargetUnit|OriginUnit|CasterPoint|SourceUnit|CasterUnit|TargetOuter|TargetOuterUnitOrPoint|TargetUnitOrPoint|SourcePoint|OriginPoint|TargetOuter|TargetOuterUnit|CasterUnitOrPoint|SourceUnitOrPoint|TargetOuterPoint',
    Vitals: 'Ignore|Start|Maximum',
    Location: 'Global|Player|Unit|Abil|Behavior',
    Select: "Sequential|Shuffle",
    Compare: "GT|GE|Eq|LT|LE|NE",
    Fraction: "Current|Fraction|Delta",
    State: "Suppressed|Restricted|Available",
    Count: "CompleteOnly|QueuedOrBetter|CompleteOnlyAtUnit|InProgressOrBetter|InProgressOnly|QueuedOrBetterAtUnit|InProgressOnlyAtUnit|QueuedOnly",
    Sort: "Descending",
    Operation: "Subtract|Set|Multiply|Divide|Add|AddBaseMultiply",
    ChoiceSelection: "Multiple|Random",
    Type: "Fixed",
    Visibility: "Visible|Hidden|Dimmed|Snapshot"
}

export function getValuesType(values, mod, path){
    let isArray = false;
    let flatten = []
    let structure = {}
    for(let value of values){
        let subflatten = value.constructor === Array ? value : [value]
        if(subflatten.length > 1) {
            isArray = true;
        }
        for(let subvalue of subflatten){
            if(subvalue){
                subvalue = subvalue.value || subvalue
                if(subvalue.constructor === Object){
                    for(let prop in subvalue){
                        if(!structure[prop])structure[prop] = []
                        structure[prop].push(subvalue[prop])
                    }
                }
                else{
                    //todo remove this
                    // if(keywordsAll.includes(subvalue)){
                    //     continue
                    // }
                    if(subvalue.includes('#')){
                        continue
                    }
                    if(flatten.includes(subvalue)){
                        continue
                    }
                    flatten.push(subvalue)
                }
            }
        }
    }


    if(Object.keys(structure).length > 0){
        let subscheme = getDataScheme(structure,mod)
        return isArray ? [subscheme] : subscheme
    }
    else{

        if(!flatten.length ){
            return 'unknown'
        }

        let types = ['int', 'real', 'ints', 'reals', 'filters', 'categories', 'file', 'link', 'word', 'abilcmd', 'words','reference']
        for(let regexptype of types){
            if(matchTypeAll(flatten,regexptype)){
                if(regexptype === 'link'){
                    let isTextAll = true
                    for(let val of flatten) {
                        let isTextCurrent = false
                        for (let locale in mod.locales.enUS) {
                            if (mod.locales.enUS[locale][val]) {
                                isTextCurrent = true
                                break
                            }
                        }
                        if(!isTextCurrent){
                            isTextAll = false
                            break
                        }
                    }
                    if(isTextAll){
                        regexptype = 'text'
                    }
                }
                else if(regexptype === 'word'){
                    let catalogs = []
                    for (let catalog in mod.cache) {
                        let allFromCurrentCatalog = true

                        for(let val of flatten) {
                            if (!mod.cache[catalog][val]) {
                                allFromCurrentCatalog = false
                                break
                            }
                        }
                        if(allFromCurrentCatalog){
                            catalogs.push(catalog)
                        }
                    }


                    if(catalogs.length > 0){
                        regexptype = catalogs.join("|")
                    }
                    else{
                        regexptype = '>'+flatten.join("|")
                    }
                }



                return isArray ? '['+regexptype+']' : regexptype
            }
        }
        getNotMatched(flatten,'word')
        return 'unknown'
    }
}

let TriggerTypes = {
    color: 'ints',
    cooldown: 'string',
    charge: 'string',
    userfield: 'string',
    userinstance: 'string',
    attributegame: 'string',
    attributevalue: 'string',
    convcharacter: 'string',
    convline: 'string',
    attributeplayer: 'string',
    layoutframe: 'link',
    layoutframerel: 'link',
    actormsg: 'string',
    catalogfieldpath: 'string',
    filepath: 'file',
    modelanim: 'string',
    timeofday: 'string',
    modelcamera: 'string',
    unitfilter: 'filters',
    fixed: 'real',
}

export function matchType(value, type, strict){
    if(TriggerTypes[type]){
        type = TriggerTypes[type]
    }
    if(strict && type === 'file'){
        type = 'filestrict'
    }
    if(strict && type === 'reference'){
        type = 'referencestrict'
    }
    if(strict && type === 'link'){
        type = 'linkstrict'
    }
    if(!strict && type === 'link'){
        if(regexps.word.test(value))return true
    }
    if(type === 'string'){
        return value.constructor === String
    }
    if(!regexps[type]){
        type = 'word'
    }
    return regexps[type].test(value)
}

export function getAllFiles (dirPath, relativePath, arrayOfFiles = []) {
    let files = fs.readdirSync(dirPath)
    files.forEach(function (file) {
        let relativeFile = relativePath ? relativePath + "/" + file : file
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, relativeFile, arrayOfFiles)
        } else {
            arrayOfFiles.push(relativeFile)
        }
    })
    return arrayOfFiles
}

export function deepReplaceMatch(obj, testVal, testProp, cb, id, _path = [], _pathids = []) {
    const keys = Object.keys(obj)
    for (let i = 0, len = keys.length; i < len; i++) {
        let prop = keys[i], val = obj[prop]
        let path = [..._path, obj]
        let crumbs = [..._pathids, prop]
        if ((!testVal || testVal(val)) && (!testProp || testProp(prop))){
            let result = cb({val, value: val,property: prop, object: obj, prop, obj, id, path,crumbs})
            if(result !== undefined) {
                obj[prop] = result;
                val = result;
            }
        }
        if (val && typeof val === 'object'){
            deepReplaceMatch(val, testVal, testProp, cb, prop, path,crumbs)
        }
    }
}

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export function deep(a,b,c = 'merge'){
    if(!a){
        console.error("wrong deep a argument")
    }
    for(let i in b){
        let value = b[i]
        let target = a[i]

        if(value === undefined || value === null)continue;

        if(value.constructor === Array){
            value = deep([],value)
        }
        else if(value.constructor === Object){
            value = deep({},value)
        }


        if(!target){
            a[i] = value
        }
        else{
            if(value.constructor === String || value.constructor !== target.constructor){
                target = value
            }
            else if(target && target.constructor === Array && c === 'replace') {
                target = value
            }
            else if(target && target.constructor === Array && c === 'unite') {
                deep(target,value,c)
            }
            else if(target && target.constructor === Array && c === 'merge') {
                target = [...target,...value]
            }
            else if(target && target.constructor === Object){
                deep(target,value,c)
            }
            else {
                target = value
            }
            a[i] = target
        }
    }
    return a
}

export function matchPath(path1,path2){
    if(!path1 || path1 === "*"){
        return true;
    }
    let path1Array = path1.constructor === String ? path1.split("."): path1
    let path2Array = path2.constructor === String ? path2.split("."): path2

    for(let i in path2Array){
        if(path1Array[i] === "*")continue

        if(path1Array[i] !== path2Array[i]){
            if(new RegExp(path1Array[i]).test(path2Array[i]) === false ){
                return false
            }
        }
    }
    return true;
}

export function resolveSchemaType(schema,property,pathobject,schemaForResolvedArrays = false){

    let type

    if(property.includes('[') || property.includes('.')){
        let path = property.replace(/]/g,"").replace(/\[/g,".").split(".")
        type = schema
        while (path.length){
            let crumb = path.shift()
            if(type.constructor === Array){
                type = type[0]
                if(!path.length && type?.value){
                    type = type.value
                }
            }
            else{
                type = resolveSchemaType(type,crumb,pathobject)
            }
        }
        if(!type){
            console.log(object)
        }
    }
    else{
        type = schema[property] || schema['$' + property] || schema['*']
    }


    // if(property === "OperandArray"){
    //     property
    // }

    if(!type)return false

    if(type.constructor === Function){
        type = type(pathobject[0])
        if(!type){
            //todo cant resolve by field if field defined in arent objects
            return 'string'
        }
    }
    if(type.constructor === String && type.startsWith("{")) {
        let valueType = type.replace("{", "").replace("}", "")
        if(schemaForResolvedArrays) return {'*': valueType}
        return [{value: valueType, index: "word"}]
    }
    if(type.constructor === String && type.startsWith("[")) {
        let valueType = type.replace("[", "").replace("]", "")
        if(schemaForResolvedArrays) return [valueType]
        return [{value: valueType}]
    }
    if(type.constructor === Array && type[0].index === "word" && schemaForResolvedArrays){
         type = {...type[0]}
        delete type.index
        return {'*': type }
    }



    if(type.constructor === String && type[0] === '.'){

        function getRelativeType(variation){

            let _valueindex = pathobject.length
            let path = variation.split('.')
            let value;

            while(path.length){
                let crumb = path.shift()
                if(crumb === ""){
                    _valueindex --
                }
                else{
                    if(!value){
                        value = pathobject[_valueindex]
                    }
                    if(!isNumeric(crumb) && value.constructor === Array){
                        value = value[0]
                    }
                    value = value[crumb]
                    if(!value){
                        return false
                    }
                }
            }
            if(value.constructor === String){
                if(value === "Effect"){
                    value
                }
                return value.toLowerCase()
            }
            else{
                return value
            }
        }

        let typesVariations = type.split("|")
        for(let typesVariation of typesVariations){
            if(typesVariation[0] === "."){
                type = getRelativeType(typesVariation)
            }
            else{
                type = typesVariation
            }
            if(type){
                break;
            }
        }
    }


    return type
}

function isToken(property){
    return /[a-z]/.test(property[0])
}

/**
 * {property: value} => [{property: value}]
 */
export function convertObjectsToIndexedArray(object) {
    deepReplaceMatch(object, val => val.constructor === Object && val.$map, null, ({value, object, property}) => {
        let result = []
        for (let index  in value) {
            result.push({index,...value[index][0]})
        }
        object[property] = result
    })
}

function convertIndexedArrayToObject(value) {
    let result = {}
    for (let i = 0; i < value.length; i++) {
        let item = {...value[i]}
        delete item.index
        delete item.removed
        result[value[i].index] = [item]
    }
    // Object.defineProperty(result, '$map',{ configurable:true, writable: true,enumerable: false ,value: true})
    return result
}

/**
 * [{property: value}] => {property: value}
 */
export function convertIndexedArrayToObjects(object) {
    deepReplaceMatch(object, val => val.constructor === Array && val.find(item => item.index && !isNumeric(item.index)), null, ({value, object, property}) => {
        object[property] = convertIndexedArrayToObject(value)
    })
}

export function _addRelation({target,namespace, link, patharray, type, result, ignorelist}){
    if( !namespace || !link ||
        link === "*" || link.startsWith(":") ||
        SCGame.ignoredNamespaces.includes(namespace) || ignorelist[namespace]?.includes(link)){
        return;
    }

    let path = patharray.join(".")


    if(ignorelist.path) {
        let ignorelistFiltered = ignorelist.path.map(item => item.split("."))
        for (let index = 0; index < patharray.length; index++) {
            ignorelistFiltered = ignorelistFiltered.filter(item => {
                if (item[index].includes("*")) {
                    if(item[index].indexOf("*") === item[index].length - 1){
                        return patharray[index].startsWith(item[index].substring(0,item[index].length - 1))
                    }
                    else{
                        console.log("not implemented")
                    }
                }
                return item[index] === patharray[index]
            })
            if(ignorelistFiltered.find(item => item.length === index + 1)){
                return;
            }
        }
    }



    result.push({target,namespace, link, path, type})
}

const entityType = {
    TurretEnable: "turret",
    TurretTarget: "turret",
    Behavior: "behavior",
    BehaviorLevel: "behavior",
    AbilTrain: "abil",
    Abil: "abil",
    AbilTransport: "abil",
    WeaponStart: "weapon",
    WeaponStop: "weapon",
    Upgrade: "upgrade",
    Confirmation: "unit",
    UnitConstruction: "unit",
    UnitDeath: "unit",
    UnitBirth: "unit",
    UnitRevive: "unit",
    Effect: "effect",
    Model: "model",
    Actor: "actor",
}

const conditionEntityType = {
    ValidatePlayer: "validator",
    // ModelSwap: "model",
    AbilTrainProduced: "unit",
    ValidateCreationEffect: "validator",
    ValidateUnit: "validator",
    ValidateEffect: "validator",
    // "!ValidateUnit": "validator",
    AbilTransport: "unit",
    MorphFrom: "unit",
    MorphTo: "unit",
}

export function eventConditionEntityType(eventname){

    return conditionEntityType[eventname.replace(/^\!/,"")]
}

export function eventEntityType(eventname){
    return entityType[eventname]
}

export function getDebugInfo(mod){



    function x(obj){
        for(let i in  obj){
            if(obj[i].constructor === String){
                if(obj[i] === 'unknown' || obj[i] === 'word' || obj[i] === 'link'){
                  delete obj[i]
                }
            }
            else{
                x(obj[i])
                if(Object.keys(obj[i]).length === 0){
                    delete obj[i]
                }
            }
        }
    }

    let schema
    if(Object.keys(unknowns).length){
        console.log('unknown values exists')

        schema = mod && getDataScheme(unknowns,mod)
        // x(schema)
    }

    return {unknowns, schema}
}

/**
 *
 * @param object
 * @param schema
 * @param path
 * @param chain
 * @returns {{}}
 */
export function _propertyRelations(target,value,type,result,patharray,ignorelist){

    let link , namespace

    switch (type) {
        case 'ops': {
            let type = 'actors', namespace = 'actor', actors = value.split(" ")
            for(let index =0; index < actors.length; index++){
                let link = actors[index]
                _addRelation({target,namespace, link, patharray, type, result, ignorelist})
            }
            return;
        }
        case 'send': {
            let type = 'send'
            let args = value.split(" ")

            //
            // if(!collect[args[0]]){
            //     collect[args[0]] = []
            // }
            // collect[args[0]].push(value)
            if(args.length > 1) {
                switch (args[0]) {
                    case "AttachSetBearingsFrom":
                    {
                        //AttachSetBearingsFrom {Weapon 0} {} {LurkerMPSOpAoEVariancer SOpShadow SOpForwardCasterPoint SOp2DRotation LurkerMPSOpShadowSpine SOpRotVariancerUp15}
                        let namespace = 'actor'
                        let _val = value
                        _val = _val.substring(_val.indexOf('}')+1)
                        _val = _val.substring(_val.indexOf('}')+1)
                        let parts = _val.replace(/([\{\} }])/g,'\n$1\n').split('\n')
                        for(let link of parts){
                            if(matchType(link,'wordstrict')) {
                                _addRelation({target, namespace, link, patharray, type, result, ignorelist})
                            }
                        }

                        break;
                    }
                    case "HostSiteOpsSet":
                    {
                        //HostSiteOpsSet ::HostImpact SOpAttachCenter 1 1
                        //HostSiteOpsSet ::Host {SOpAttachCenter SOp2DRotation NovaGriffinBombingRunBombRandomRotation}
                        let namespace = 'actor'
                        let _val = value
                        _val = _val.substring(_val.indexOf(' '))
                        _val = _val.substring(_val.indexOf(' '))
                        let parts = _val.replace(/([\{\} }])/g,'\n$1\n').split('\n')
                        for(let link of parts){
                            if(matchType(link,'wordstrict')){
                                _addRelation({target,namespace, link, patharray, type, result, ignorelist})
                            }
                        }
                        break;
                    }
                    case "PortraitCustomize":
                    case "ModelSwap": {
                        let link = args[1], namespace = 'model'
                        _addRelation({target,namespace, link, patharray, type, result, ignorelist})
                        break;
                    }
                    case "RefSetFromMsg": {
                        // Send="RefSetFromMsg ::actor.SiegeTankSieged ::Sender"/>
                        let _val = value.split(" ")
                        if(_val[1][0] !== ":"){console.log("RefSetFromMsg! starts with character")}
                        let [namespace,link] = _val[1].substring(2).split(".")
                        _addRelation({target,namespace, link, patharray, type, result, ignorelist})
                        break;
                    }
                    case "ModelMaterialRemove":
                    case "ModelMaterialApply":
                    case "CreateCopy":
                    case "Create": {
                        let link = args[1], namespace = 'actor'
                        _addRelation({target,namespace, link, patharray, type, result, ignorelist})
                        break;
                    }
                    case "TimerSet":
                    case "QueryRegion":
                    case "QueryRadius": {
                        let link = args[2], namespace = 'actor'
                        _addRelation({target,namespace, link, patharray, type, result, ignorelist})
                        break;
                    }
                }
            }
            return;
        }
        case 'terms': {
            let added = []

            let [...conditions] = value.split(";").map(term => term.trim())

            for(let index =0; index < conditions.length; index++){
                let condition = conditions[index]
                if(condition.includes(".")){

                    let [entityType, entityName, argumentName] = condition.split(".")

                    namespace = eventEntityType(entityType)

                    if(namespace){
                        link = entityName
                        added.push(namespace+"."+link)
                        _addRelation({target,namespace, link, patharray,  type: 'terms', result, ignorelist})
                    }
                }
                else{
                    let [entityType, entityName] = condition.split(" ").map(term => term.trim())

                    namespace = eventConditionEntityType(entityType)
                    link = entityName

                    if(!added.includes(namespace+"."+link)){
                        added.push(namespace+"."+link)
                        _addRelation({target,namespace, link, patharray,  type: 'terms', result, ignorelist})
                    }
                }
            }
            return;
        }
        case 'driver':
            if(/[a-zA-Z]/.test(value[0])){
                type = 'effect'
                link = value;
                namespace = type
            }
            break;
        case 'subject':
            if(/[a-zA-Z]/.test(value[0])){
                type = 'actor'
                link = value;
                namespace = type
            }
            else if(value.startsWith(':')){
                let [subjjNamespace,subjLink] = value.substring(2).split(".")
                if(subjLink){
                    namespace = subjjNamespace
                    type = 'subject'
                    link = subjLink
                }
            }
            break;
        case 'reference':
            let [entityType, entityName, entityProperty] = value.split(",")
            link = entityName; namespace = entityType.toLowerCase()
            break;
        case 'abilcmd':
            let [abilName, cmd] = value.split(",")
            link = value; namespace = "abil"
            break;
        default:
            if([
                'abil',
                'actor',
                'accumulator',
                'attachmethod',
                'alert',
                'behavior',
                'button',
                'commander',
                'effect',
                'footprint',
                'model',
                'mover',
                'kinetic',
                'light',
                'race',
                'requirement',
                'requirementnode',
                'sound',
                'soundtrack',
                'tactical',
                'texture',
                'targetfind',
                'targetsort',
                'turret',
                'unit',
                'upgrade',
                'validator',
                'weapon'
            ].includes(type)){
                link = value;
                namespace = type
            }
            else{
                return
            }
    }

    _addRelation({target,namespace, link, patharray,  type, result, ignorelist})


}

export function relations(target,object,schema,path = [], ignorelist = {}, result = [],pathobject = [object]){
    if(!object) return
    if( !schema){
        console.log("no schema",path)
        return;
    }
    for(let property in object){
        if(["index",'class', "removed" ,'id','ID','parent','default'].includes(property))continue;
        // if(property !== 'value' && /[a-z]/.test(property))continue;
        let value = object[property]
        if(!value) continue;
        let type = resolveSchemaType(schema,property,pathobject,true);
        let _path = [...path,property]
        if(!type){
            // console.log("unknown field",_path.join(".") );
            continue;
        }


        if(type.constructor === Array && type[0].constructor === String){
            type = type[0];
        }

        if(type.constructor === String){
            if(value.constructor === Array){
                for(let index =0; index< value.length; index++){
                    let _value = value[index]
                    if(!_value){
                        continue;
                    }
                    if(_value.constructor === Object){
                        _value = _value.value
                    }
                    _propertyRelations(target,_value,type,result,[..._path,index],ignorelist)
                }
            }
            else if(value.constructor === String){
                _propertyRelations(target,value,type,result,_path,ignorelist)
            }
        }
        else{
            let typed = type.constructor === Array ? type[0] : type
            if(value.constructor === Array){
                for(let index =0; index< value.length; index++){

                    if(!value[index])continue;

                    if(value[index].constructor === String){
                        _propertyRelations(target,value[index],typed.value,result,[..._path,index],ignorelist)
                    }
                    else{
                        relations(target,value[index],typed, [..._path,index],ignorelist, result, [...pathobject,value[index]])
                    }
                }
            }
            if(value.constructor === Object){
                if(type.constructor === Array){

                    for(let index in value){
                        relations(target,value[index],typed, [..._path,index],ignorelist, result, [...pathobject,value[index]])
                    }
                }
                else{
                    relations(target,value, typed, [..._path],ignorelist, result, [...pathobject,value])
                }
            }
        }
    }
    return result
}

/**
 * property: [{value}] =>  property: value
 */
export function stringValues(object = this) {
    for(let property in object){
        if (isToken(property)) continue;
        let value = object[property]

        if(value.constructor === Array){
            if(value.length === 1 && value[0].constructor === Object && Object.keys(value[0]).length === 1 && value[0].value !== undefined) {
                object[property] = value[0].value
            }
            else{
                for(let item of value) {
                    stringValues(item)
                }
            }
        }
    }
    return object
}

export function resolveArrays(object, schema, path) {
    if(!schema){
        console.log("no schema",path)
        return;
    }
    if( schema.constructor === String) return;

    for(let property in object){
        let type = resolveSchemaType(schema,property,[object]), value = object[property]
        if(!type || !value || value.constructor === String)continue
        let _path = [...path,property];
        if(value.constructor === Array){
            if(type.constructor === Array) {
                type = type[0]
                delete type.index
                delete type.removed

                let result = [];
                //Resolving Arrays
                for(let i = 0 ; i< value.length;i++) {
                    let item = {...value[i]}
                    let index
                    if (type.index === 'word') {
                        index = result.indexOf(result.find(i => i.index === item.index));
                    } else {
                        index = +item.index;
                        if (index === undefined) index = -1
                        delete item.index
                    }

                    let removed = item.removed;
                    if (index >= 0) {
                        if (removed) {
                            result.splice(index, 1)
                        } else {
                            if (!result[index]) {
                                result[index] = item
                            } else {
                                deep(result[index], item)
                            }
                        }
                    } else {
                        result.push(item)
                    }

                }

                if(Object.keys(type).length === 1 && type.value !== undefined){
                    type =  type.value
                    for(let i in result){
                        result[i] = result[i].value
                    }
                }
                else{
                    for(let item of result){
                        if(!item){
                            continue
                        }
                        resolveArrays(item,type, _path)
                    }
                }
                value = result
            }
            else {
                let result = {}
                for (let val of value) {
                    deep(result, val)
                }
                value = [result]
                resolveArrays(value[0],type, _path)
            }
        }
        else if(value.constructor === Object) {
            if(type.constructor === Array) {//indxed array if value.$map
                resolveArrays(value,{'*': type[0]}, _path)
            }
            else{
                resolveArrays(value,type, _path)
            }
        }
        object[property] = value
    }
}

// convertObjectsToIndexedArray(entityData)
/**
 * token: "value"            => $: {token: "value"}
 * property: "value"         => property: {$: {token: "value"}}
 */
export function optimiseForXML(object,schema = object.$$schema, path = [object.class], pathobject = [object]) {

    if(!schema){
        console.log("no schema",path)
        return;
    }


    for(let property in object){

        let type = resolveSchemaType(schema,property,pathobject), value = object[property]



        let isToken =  /[a-z]/.test(property[0]) || schema['$'+property] || property === 'ID'


        if(['id','ID', 'parent', 'default', 'index', 'removed','$tokens'].includes(property)) {
            type = 'string'
        }

        let _path = [...path,property];
        if(!type){
            console.warn("unknown field", _path.join("."), JSON.stringify(value) );
            continue;
        }

        // if(type._ && value.constructor === String){
        //     object[property] = {_: value}
        // }
        // else
        if(type === 'void'){
            object[property] = {}
        }
        else if(type.constructor === String) {
            // value = value.replace(/"/g,'&quot;')

            if(property !== '_'){
                //['id', 'class', 'parent', 'default', 'index', 'removed']
                if(isToken || (path.length > 1 && !isToken)) {
                    if (!object.$) object.$ = {}
                    object.$[property] = value
                    delete object[property]
                }
                else{
                    object[property] = {$: {value}}
                }

            }

        }
        else if(type.constructor === Array){
            type = {...type[0]}
            if(type.index === "word" || type.index === "string"){
                delete type.index
                delete type.removed
                let result = []
                if(Object.keys(type).length === 1 && type.value !== undefined){
                    type =  type.value
                    for (let index  in value) {
                        result.push({$: {index,value: value[index]}})
                    }
                }
                else{
                    for (let index  in value) {
                        let itemvalue = {...value[index]}
                        optimiseForXML(itemvalue, type, _path,[...pathobject,itemvalue])

                        result.push(deep({$: {index}},itemvalue))
                    }
                }
                object[property] = result

            }
            else{


                for(let index  = value.length; index--;) {
                    if(value[index] === undefined){
                        value.splice(index,1)
                    }
                }
                if(value.length === 0){
                    delete object[property]
                    continue;
                }

                for(let index  in value){
                    if(value[index].constructor !== Object){
                        if(type._){
                            value[index] = {_: value[index], $: {}}
                        }
                        else{
                            if(type.constructor === String || type.value){
                                value[index] = {$: {value: value[index]}}
                            }
                            else{
                                //for Empty Tags
                                if(value[index]){
                                    console.log("value is not empty")
                                }
                                value[index] = {}
                            }
                        }
                        //
                        // //force array indexes for requirementnode
                        if(type.index === "int"){
                            value[index].$.index = index
                        }
                    }
                    else{
                        optimiseForXML(value[index],type, _path,[...pathobject,value[index]])
                        // //force array indexes for requirementnode
                        if(type.index === "int"){
                            if(!value[index].$){
                                value[index].$ = {}
                            }
                            value[index].$.index = index
                        }
                    }

                }
            }

        }
        else if(type.constructor === Object) {
            optimiseForXML(value, type, _path,[...pathobject,value])
        }
    }



    return object
}

/**
 * delete $$
 * $: {property: "value"} => property: "value"
 *
 */
export function fromXMLToObject (object) {
    deepReplaceMatch(object, null, prop => prop === "$$", ({val, obj, prop}) => {
        delete obj[prop]
    })
    if (object.$) {
        for (let property in object.$) {
            object[property] = object.$[property]
        }
        delete object.$;
    }
    for (let property in object) {
        if (property === "$") continue
        let value = object[property]

        if (/^__(.*)__$/.test(property)) {
            let tokenID = property.substring(2, property.length - 2)
            let tokenType = value[0].$?.type?.substr(1,value[0].$.type.length -5).toLowerCase() || 'string';
            let tokenValue = value[0].$?.value || ''
            if(!object.$tokens){
                object.$tokens = {}
            }
            object.$tokens[tokenID] = {type: tokenType , value: tokenValue}
            // object[property.substring(2, property.length - 2)] = object[property][0].value
            // object[tokenID] = tokenValue
            delete object[property]
        }
        else if(property === "#name"){
            object.class = object["#name"]
            delete object["#name"]
        }
        else if (value.constructor === Array) {
            if (!object[property]) object[property] = []
            for (let item of value) {
                let element = fromXMLToObject(item)
                if (object[property].constructor === String) {
                    console.log(`duplicate property value ${object.id} ${property}`)
                    object[property] = element
                } else {
                  //  object[property].push(element)
                }
            }
        }
    }
    return object
}

export function optimizeObject(object, schema = object.$$schema, path = [object.class],pathobject = [object]) {
    if(!schema) {
        console.log("no schema", path )
        return;
    }
    for(let property in object){
        let type = resolveSchemaType(schema,property,pathobject), value = object[property]
        let _path = [...path,property];

        if (['id', 'ID','class', 'parent', 'default', 'index', 'removed','$tokens'].includes(property)) continue;
        if(value === undefined ||
            (value.constructor === Array && !value.length) ||
            (value.constructor === Object && !Object.keys(value).length)){
            delete object[property];
            continue;
        }
        if(!type){// || type === 'word'|| type === 'string'){//todo
            if(value.constructor === String){
                //possibly token?
                type = 'string'
            }
            else{
                //unknown field
                let obj = unknowns
                let li = _path.length - 1
                for(let i = 0; i < li;i++){
                    let crumb = _path[i]
                    if(!obj[crumb]){
                        obj[crumb] = {}
                    }
                    obj = obj[crumb]
                }
                if(!obj[_path[li]]){
                    obj[_path[li]] = []
                    console.warn("unknown field", _path.join("."), JSON.stringify(value) );
                }
                obj = obj[_path[li]]
                obj.push(value)

                continue;
            }
        }
        //
        if(type._){
            for(let i  in value){
                if(value[i].constructor === String){
                    value[i] = {_: value[i]}
                }
            }
            // if(value.constructor === Array && value[0].constructor === String) {
            //     if(value.length > 1){
            //         console.warn('too many elemetns')
            //     }
            //     value = value[0]
            //     type = type._
            // }
        }


        if(type.constructor === Object){

            //relpace 'value' with '{value: value}'
            if(value.constructor === String && (type.value?.constructor === String)){
                value = [{value}]
            }
            if(value.constructor !== Array || value.length !== 1){
                console.warn(`wrong value. #${object.id}  path: ${JSON.stringify(_path)}. ${JSON.stringify(object[property])}.`)
                continue;
            }
            value = value[0]
            optimizeObject(value, type, _path, [...pathobject,value])
        }
        else if(type.constructor === Array){
            type = {...type[0]}

            if(type.index === "word" || type.index === "string"){
                value = convertIndexedArrayToObject(value)
                optimizeObject(value,{'*': type},_path, [...pathobject,value])

                delete type.index
                delete type.removed
                if(Object.keys(type).length === 1 && type.value !== undefined){
                    type =  type.value
                    for(let i in value){
                        value[i] = value[i].value
                    }
                }
            }
            else{
                for(let item in value){
                    optimizeObject(value[item],type, _path, [...pathobject,value[item]])
                }
            }
        }
        else if(type.constructor === String){

            if (value.constructor === Array){
                if (value.length === 1) {
                    value = value[0]
                }
                if (value.constructor === Object && Object.keys(value).length === 1 && value.value !== undefined) {
                    value = value.value
                }
            }

            if(type === 'void'){
                if(value !== ''){
                    console.warn(`Warn: #${pathobject[0].id}[${_path.join(".")}] = ${JSON.stringify(object[property])}`)
                }
                value = true
            }

            if(value){
                if(!matchType(value,type)){
                    if(type !== 'text' && type !== 'unknown'){
                        //if Token
                        if(schema['$' + property] && object[property] === "*"){
                         //its fine. we allow to use "*" for tokens
                        }
                        else{
                            console.warn(`Warn: #${pathobject[0].id || pathobject[0].Id}[${_path.join(".")}] = ${JSON.stringify(object[property])}`)
                        }
                    }
                }
                else{


                    if(type === 'int' || type === 'real' || type === 'bit'){
                        value = +value
                    }
                }
            }
        }
        object[property] = value
    }
}

export function resolveText(object, schema = object.$$schema, path = [], picked, mask) {
    if(!schema) {
        console.log("no schema", path )
        return;
    }
    let result = {}
    for(let property in object){
        let type = resolveSchemaType(schema,property,[object]), value = object[property]

        if (['id', 'ID','class', 'parent', 'default', 'index', 'removed','$tokens'].includes(property)) continue;
        let _path = [...path, property];
        if(!value || !type){
            continue;
        }

        if(type.constructor === Object){
            value = value[0]
            let _result = resolveText(value, type, _path,picked, mask)
            if(Object.keys(_result).length > 0){
                result[property] = _result
            }
        }
        else if(type.constructor === Array){
            type = {...type[0]}

            for(let item in value){
                let _result = resolveText(value[item], type, _path,picked, mask)
                if(Object.keys(_result).length > 0){
                    if(! result[property]){
                        if(value.constructor === Array) {
                            result[property] = []
                        }
                        else{
                            result[property] = {}
                        }
                    }
                    result[property][item] = _result
                }
            }
        }
        else if(type.constructor === String){
            if (type === 'text'){
                let parts = object[property].split("/")
                parts[parts.length - 1]  = mask.replace("*", parts[parts.length - 1])
                result[property] = parts.join("/")
                picked.push(object[property])
            }
        }
    }
    return result
}

export function resolveAssets(object, schema = object.$$schema, path = []) {
    if(!schema) {
        console.log("no schema", path )
        return;
    }
    let result = {}

    for(let property in object){

        let type = resolveSchemaType(schema,property,[object]), value = object[property]

        if (['id', 'ID','class', 'parent', 'default', 'index', 'removed'].includes(property)) continue;
        let _path = [...path, property];
        if(!value || !type){
            continue;
        }

        if(type.constructor === Object){
            // value = value[0]
            let _result = resolveAssets(value, type, _path)
            if(Object.keys(_result).length > 0){
                result[property] = _result
            }
        }
        else if(type.constructor === Array){
            type = {...type[0]}

            for(let item in value){
                let _result = resolveAssets(value[item], type, _path)
                if(Object.keys(_result).length > 0){
                    if(! result[property]){
                        if(value.constructor === Array) {
                            result[property] = []
                        }
                        else{
                            result[property] = {}
                        }
                    }
                    result[property][item] = _result
                }
            }
        }
        else if(type.constructor === String){
            if (type === 'file'){
                result[property] = object[property]
            }
        }
    }
    return result
}

export function optimizeJSONObject(object, schema = object.$$schema, path = [object.class]) {
    if(!schema){
        console.log("no schema",path)
        return;
    }
    for(let property in object){
        let type = resolveSchemaType(schema,property,[object]), value = object[property]
        if (['id','ID', 'class', 'parent', 'default', 'index', 'removed'].includes(property)) continue;
        let _path = [...path,property];
        if(value === undefined ||
            (value.constructor === Array && !value.length) ||
            (value.constructor === Object && !Object.keys(value).length)){
            delete object[property];
            continue;
        }
        if(!type){
            console.warn("unknown field", _path.join("."), JSON.stringify(value) );
            continue;
        }

        if(type.constructor === Object){
            optimizeJSONObject(value, type, _path)
        }
        if(type.constructor === Array){
            type = {...type[0]}

            if(type.index === "word" || type.index === "string"){
                delete type.index
                delete type.removed
                if(Object.keys(type).length === 1 && type.value !== undefined){
                    type =  type.value
                }
            }
            else{
                for(let item in value){
                    optimizeJSONObject(value[item],type, _path)
                }
            }
        }
        if(type.constructor === String){
        }
    }
}

export function filterTypedProperties(object, filter, schema = object.$$schema) {
    if(!schema){
        console.log("no schema",path)
        return;
    }
    for(let property in object){
        if (['id','ID', 'class', 'parent', 'default', 'index', 'removed'].includes(property)) {
            continue;
        }
        let type = resolveSchemaType(schema,property,[object]), value = object[property]

        if(!type){
            console.warn("unknown field", JSON.stringify(value) );
            continue;
        }

        if(type.constructor === Object){
                value = value[0]
            filterTypedProperties(value, filter, type)
        }
        else if(type.constructor === Array){
            type = {...type[0]}


            if(type.index === "word" || type.index === "string") {
                delete type.index
                delete type.removed

                if (Object.keys(type).length === 1 && type.value !== undefined) {
                    type = type.value
                    if (type !== filter) {
                        delete object[property]
                    }
                }
                else{
                    for(let index in value){
                        if(value[index].constructor === String){
                            value[index] = {value: value[index] }
                        }
                        value.index = index
                        filterTypedProperties(value[index],filter, type)
                    }
                }
            }
            else{
                for(let index in value){
                    if(value[index].constructor === String){
                        value[index] = {value: value[index] }
                    }
                    value[index].index = index
                    filterTypedProperties(value[index],filter, type)
                    if (Object.keys(value[index]).length === 1) {
                        delete value[index]
                    }
                }
                value = value.filter(item => Object.keys(item).length >1)
                if(value.length){
                    object[property] = value
                }
                else{
                    delete object[property]
                }
            }

        }
        else if(type.constructor === String){
            if(type !== filter){
                delete object[property]
            }
        }
    }
}

export function cleanup(object) {
    for(let property in object){
        let value = object[property]
        if(value === undefined || value === null){
            delete object[property];
        }
        else if(value.constructor === Object){
            if(Object.keys(value) === 1 && value.value){
                object[property] = value.value
            }
            cleanup(value)
        }
        else if(value.constructor === Array){
            for(let item in value){
                cleanup(value[item])
            }
        }
    }
}


function debugXMLBuild(builder , data){
    for(let i in data){
        try{
            return builder.buildObject(data[i]);
        }
        catch(e){
            console.log(i)
            debugXMLBuild(data[i])
        }
    }
}

export function formatData(data, format) {
    cleanup(data)
    switch(format){
        case 'xml':
            let builder = new XML.Builder()
            try{
                return builder.buildObject(data);
            }
            catch(e){
                debugXMLBuild(builder,data)
            }
            return
        case 'ini':
            return Object.entries(data).map(([key, value]) => `${key}=${value}`).join("\n")
        case 'json':
            return JSON.stringify(data, null,"  ")
        case 'yaml':
            return YAML.dump(data, {flowLevel: 4, lineWidth: -1, noCompatMode: true});
    }
}

const CMBuilder2 = new XML.Builder({headless: true});

export const buildXMLObject = function(value){
    try{
        return CMBuilder2.buildObject(value)
    }
    catch (e){
        debugXMLBuild(CMBuilder2,value)
    }
}

export function capitalize(str){
    return str.at(0).toUpperCase() + str.substring(1)
}