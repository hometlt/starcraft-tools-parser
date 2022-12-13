import fs from "fs";
import {SCGame} from "./sc-game.js";
import * as yaml from "js-yaml";
import xml2js from "xml2js";


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
    bit: /^[01]$/,
    int: /^-?(0|[1-9]\d*)$/,
    real: /^(-?(0|[1-9]\d*)(\.\d+)?)$/,
    ints: /^-?(0|[1-9]\d*)(,-?(0|[1-9]\d*))+$/,
    reals: /^(-?(0|[1-9]\d*)(\.\d+)?)(\,-?(0|[1-9]\d*)(\.\d+)?)*$/,
    filters: /^(-|\w+(,\w+){0,});(-|\w+(,\w+){0,})$/,
    categories: /^(\w+\:[\w#]+)(,\w+\:[\w#]+)*$/,
    // file: /^[a-z_#'0-9\-]+[\\/a-z_#'0-9\-. ]+\.(dds|fxa|m3|tga|m3a)$/i,
    file: /^.*$/,
    link: /^[A-Za-z_@#0-9-]+(\/+[A-Za-z_@#0-9-]+)+\/?$/,
    word: /^[\w@_%#]+$/,
    abilcmd: /^([\w@_#]+[.,][\w]+|255)$/,
    words: /^[\w@_%#]+(,[\w@_%#]+)*$/,
    reference: /^.*$/,
    subject: /^.*$/,
    send: /^.*$/,
    terms: /^.*$/
}

export function matchType(value, type){
    if(type === 'link'){
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

        if(!value)continue;


        if(value.constructor === Array){
            value = deep([],value)
        }
        if(value.constructor === Object){
            value = deep({},value)
        }

        if(value.constructor === String){
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

export function resolveSchemaType(schema,property,schemaForResolvedArrays = false){
    let type = schema[property] || schema['$' + property] || schema['*']
    if(!type)return false
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


export function _addRelation({namespace, link, patharray, type, result, ignorelist}){
    let path = patharray.join(".")

    if(SCGame.ignoredNamespaces.includes(namespace)){
        return
    }
    if(link === "*" || !namespace || !link || ignorelist[namespace]?.includes(link)){
        return;
    }


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
    result.push({namespace, link, path, type})
}

/**
 *
 * @param object
 * @param schema
 * @param path
 * @param chain
 * @returns {{}}
 */
export function _propertyRelations(value,type,result,patharray,ignorelist){

    let link , namespace

    switch (type) {
        case 'terms': {
            let added = []

            let [event,...conditions] = value.split(";").map(term => term.trim())
            let [entityType, entityName] = event.split(".")
            namespace = {
                TurretEnable: "turret",
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
                Model: "model",
                Actor: "actor",
            }[entityType]
            link = entityName

            added.push(namespace+"."+link)
            _addRelation({namespace, link, patharray,  type: 'terms', result, ignorelist})

            for(let index =0; index < conditions.length; index++){
                let condition = conditions[index]
                let [entityType, entityName] = condition.split(" ").map(term => term.trim())
                namespace = {
                    MorphFrom: "unit",
                    MorphTo: "unit",
                }[entityType]
                link = entityName

                if(!added.includes(namespace+"."+link)){
                    added.push(namespace+"."+link)
                    _addRelation({namespace, link, patharray,  type: 'terms', result, ignorelist})
                }
            }
            return;
        }
        case 'subject':
            if(/[a-zA-Z]/.test(value[0])){
                type = 'actor'
                link = value;
                namespace = type
            }
            break;
        case 'actor':
        case 'model':
        case 'race':
        case 'unit':
        case 'weapon':
        case 'turret':
        case 'upgrade':
        case 'button':
        case 'requirementnode':
        case 'requirement':
        case 'behavior':
        case 'abil':
        case 'validator':
        case 'effect':
            link = value;
            namespace = type
            break;
        case 'reference':
            let [entityType, entityName, entityProperty] = value.split(",")
            link = entityName; namespace = entityType.toLowerCase()
            break;
        case 'abilcmd':
            let [abilName, cmd] = value.split(",")
            link = abilName; namespace = "abil"
            break;
        default:
            return
    }

    _addRelation({namespace, link, patharray,  type, result, ignorelist})


}
export function relations(object,schema,path = [], ignorelist = {}, result = []){
    if(!object || !schema) return
    for(let property in object){
        if(["index",'class', "removed" ,'id','parent','default'].includes(property))continue;
        // if(property !== 'value' && /[a-z]/.test(property))continue;
        let value = object[property]
        if(!value) continue;
        let type = resolveSchemaType(schema,property,true);
        let _path = [...path,property]
        if(!type){
            console.log("unknown field",_path.join(".") );
            continue;
        }

        if(type.constructor === Array && type[0].constructor === String){
            type = type[0];
        }

        if(type.constructor === String){
            if(value.constructor === Array){
                for(let index =0; index< value.length; index++){
                    let _value = value[index]
                    if(_value.constructor === Object){
                        _value = _value.value
                    }
                    _propertyRelations(_value,type,result,[..._path,index],ignorelist)
                }
            }
            else if(value.constructor === String){
                _propertyRelations(value,type,result,_path,ignorelist)
            }
        }
        else{
            let typed = type.constructor === Array ? type[0] : type
            if(value.constructor === Array){
                for(let index =0; index< value.length; index++){
                    relations(value[index],typed, [..._path,index],ignorelist, result)
                }
            }
            if(value.constructor === Object){
                relations(value, typed, [..._path],ignorelist, result)
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
    if(!schema || schema.constructor === String) return;

    for(let property in object){
        let type = resolveSchemaType(schema,property), value = object[property]
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
export function optimiseForXML(object,schema = object.$$schema, path = [object.class]) {

    if(!schema) return;


    for(let property in object){
        let type = resolveSchemaType(schema,property), value = object[property]

        let isToken =  /[a-z]/.test(property[0]) || schema['$'+property]


        if(['id', 'parent', 'default', 'index', 'removed'].includes(property)) {
            type = 'string'
        }


        let _path = [...path,property];
        if(!type){
            console.warn("unknown field", _path.join("."), JSON.stringify(value) );
            continue;
        }

        if(type.constructor === String) {

            value = value.replace('"','&quot;')

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
                        optimiseForXML(itemvalue, type, _path)

                        result.push(deep({$: {index}},itemvalue))
                    }
                }
                object[property] = result

            }
            else{

                for(let index  in value){
                    if(value[index].constructor !== Object){
                        if(type['%value']){
                            value[index] = {_: value[index]}
                        }
                        else{
                            value[index] = {$: {value: value[index]}}
                        }
                    }
                    else{
                        optimiseForXML(value[index],type, _path)
                    }
                }
            }

        }
        else if(type.constructor === Object) {
            optimiseForXML(value, type, _path)
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
            if(property === "__Prefix__"){
                property
            }
            // object[property.substring(2, property.length - 2)] = object[property][0].value
            object[property.substring(2, property.length - 2)] = object[property][0].$.value
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

/**
 * For Better Value Resolving
 * proprety: "value" => proprety: [{value}]
 * proprety: {value} => proprety: [{value}]
 */
/*export function arrayValues(object ){//,_path) {
    for(let property in object){
        if (/[a-z]/.test(property[0])) continue;

        let value = object[property]
        if(value.constructor === String) {
            object[property] = [{value}]
        }
        else if(value.constructor === Object) {
            arrayValues(value)//,[..._path,property])
            object[property] = [value]
        }
        else if(value.constructor === Array) {
            for(let item of value){
                arrayValues(item)//,[..._path,property])
            }
        }
    }
    return object
}
*/
export function optimizeObject(object, schema = object.$$schema, path = [object.class]) {
    if(!schema) return;
    for(let property in object){
        let type = resolveSchemaType(schema,property), value = object[property]

        if (['id', 'class', 'parent', 'default', 'index', 'removed'].includes(property)) continue;
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
            //relpace 'value' with '{value: value}'
            if(value.constructor === String && type.value.constructor === String){
                value = [{value}]
            }
            if(value.constructor !== Array || value.length !== 1){
                console.warn(`wrong value.  path: ${JSON.stringify(_path)}. ${JSON.stringify(object[property])}.`)
                continue;
            }
            value = value[0]
            optimizeObject(value, type, _path)
        }
        else if(type.constructor === Array){
            type = {...type[0]}

            if(type.index === "word" || type.index === "string"){
                value = convertIndexedArrayToObject(value)
                optimizeObject(value,{'*': type},_path)

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
                    optimizeObject(value[item],type, _path)
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

            if(value && !matchType(value,type)){
                matchType(value,type)
                console.warn("potentially wrong value", JSON.stringify(_path), JSON.stringify(object[property]))
            }
        }
        object[property] = value
    }
}




export function optimizeJSONObject(object, schema = object.$$schema, path = [object.class]) {
    if(!schema) return;
    for(let property in object){
        let type = resolveSchemaType(schema,property), value = object[property]
        if (['id', 'class', 'parent', 'default', 'index', 'removed'].includes(property)) continue;
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
    if(!schema) return;
    for(let property in object){
        if (['id', 'class', 'parent', 'default', 'index', 'removed'].includes(property)) {
            continue;
        }
        let type = resolveSchemaType(schema,property), value = object[property]

        if(!type){
            console.warn("unknown field", JSON.stringify(value) );continue;
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

export function formatData(data, format) {
    switch(format){
        case 'xml':
            try{
                return (new xml2js.Builder()).buildObject(data);
            }
            catch(e){
                function debugx(data){
                    for(let i in data){
                        try{
                            return (new xml2js.Builder()).buildObject(data[i]);
                        }
                        catch(e){
                            console.log(i)
                            debugx(data[i])
                        }
                    }
                }
                debugx(data)
            }
        case 'ini':
            return Object.entries(data).map(([key, value]) => `${key}=${value}`).join("\n")
        case 'json':
            return JSON.stringify(data, null,"  ")
        case 'yaml':
            return yaml.dump(data, {flowLevel: 4, lineWidth: -1, noCompatMode: true});
    }
}


const CMBuilder2 = new xml2js.Builder({headless: true});
export const buildXMLObject = CMBuilder2.buildObject.bind(CMBuilder2)

export function capitalize(str){
    return str.at(0).toUpperCase() + str.substring(1)
}