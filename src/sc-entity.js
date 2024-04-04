import {
    deep,
    buildXMLObject,
    optimiseForXML,
    deepReplaceMatch,
    relations,
    resolveArrays,
    convertIndexedArrayToObjects,
    isNumeric, resolveSchemaType, eventEntityType, eventConditionEntityType
} from "./operations.js";
import {SCGame} from "./sc-game.js";
import {resolveAssets, resolveText} from "./operations.js";
import {LibrarySchema, SCSchema} from "./sc-schema.js";
import {SCMod} from "./sc-mod.js";

/**
 `
 <CUnit id="LegacyMarauderCopy" parent="LegacyMarauder"/>   //cant make copy of previously created instance
 <CUnitHero id="LegacyMarauderHero" parent="LegacyMarauder"/>  //can change class to more specific class
 <!--CUnit id="LegacyMarauderHeroCopy" parent="LegacyMarine"/-->  //cant do opposite
 <CUnit id="LegacyMarauder" parent="Zealot"> <Race value="Prot"/></CUnit> //can change parent
 <CUnit id="LegacyMarauderZealotCopy" parent="LegacyMarauder"/>  //cant make copy of previously created instance
 <!--CUnit id="LegacyMarauder" parent="Queen"><Race value="Zerg"/> </CUnit--> //cant duplicate in the same file
 `
 **/

export class SCEntity {
    id
    parent
    default
    $class
    $parent
    $namespace
    $schema

    $mod
    class
    constructor(data) {
        delete this.$mod
        delete this.$class
        delete this.$parent
        delete this.$schema
        delete this.$namespace
        delete this.parent
        delete this.default
        delete this.id
        delete this.class

        for(let property in data) {
            if(data[property] === null || data[property] === undefined) continue
            if (property.startsWith('$')){
                Object.defineProperty(this, property,{ configurable:true, writable: true,enumerable: false, value: data[property]})
            }
            else{
                this[property] = data[property]
            }
        }

        if(this.$parent){
            if(!this.$parent.$children){
                Object.defineProperty(this.$parent, '$children',{ configurable:true, writable: true,enumerable: false, value: []})
            }
            this.$parent.$children.push(this)
        }
        // if(this.$parent && this.$parent.id === this.id && this.$parent.__core){
        //     Object.defineProperty(this, '__core',{ configurable:true, writable: true,enumerable: false,value: true })
        // }
        // convertIndexedArrayToObjects(this)
        // arrayValues(this)
        // this.arrayValues()
    }

    upgrades (detailed){
        let mod = this.$mod

        let affectingUpgrades = mod.catalogs.upgrade
            .map(u => u.$$resolved)
            .filter(u => u.AffectedUnitArray?.includes(this.id))
            .map(u => ({
                ...u,
                Link: u.id,
                id: null,
                EffectArray: u.EffectArray?.filter(e => e.Reference)
                    // ?.filter(e => e.Reference?.split(',')[1] === unit.id)
                    .map(e => ({
                        Operation: e.Operation,
                        Value: e.Value,
                        Catalog: e.Reference.split(',')[0],
                        Entity: e.Reference.split(',')[1],
                        Property: e.Reference.split(',')[2]
                    }))
                    .filter(e => !e.Property.includes("Icon"))
            }))

        if(affectingUpgrades){
            affectingUpgrades
        }

            // .map(entry => ({...entry, ...mod._quickInfo(mod.cache.upgrade[entry.Link])}))
            // .filter(u => u.Icon)

        return {affectingUpgrades}
    }
    rels(){
        return this.$$relations
    }
    getRelations(){
        return this.$$relations
    }
    data(){
        return this.$$resolved
    }
    getResolvedData(){
        return this.$$resolved
    }
    isCore() {
        return !!this.__core
    }
    getActor(){
        return this.$actor
    }
    getRequirements (detailed){

        let mod = this.$mod
        if(!mod.catalogs.abilcmd){
            //make list of available ability cmmands
            mod.makeAbilCmds()
        }

        let abilCmds = mod.catalogs.abilcmd.filter(entry => {
            let abil = mod.cache.abil[entry.abil].$$resolved;
            let unit = abil.InfoArray[entry.cmd]?.Unit
            if(!unit)return false;
            if(unit.constructor !== Array)    unit = [unit]
            return unit.includes(this.id)
        })


        let abilCmdsIds = abilCmds.map(abilcmd => abilcmd.id)

        let requirements = abilCmds.map(entry => mod.cache.abil[entry.abil].$$resolved.InfoArray[entry.cmd].Button?.Requirements).filter(Boolean)
            .map(req => req.$$resolved)
            .map(req => mod.cache.requirement[req]?.$$resolved).filter(Boolean)
            .map(req => req.NodeArray.Use?.Link || req.NodeArray.Show?.Link).filter(Boolean)
            .map(reqNode => mod.cache.requirementnode[reqNode].$$resolved).filter(Boolean)

        let reqUnitsAliases = requirements.filter(req => req.class === 'CRequirementCountUnit').map(req => req.Count?.Link).filter(Boolean)
        let reqUpgradeAliases = requirements.filter(req => req.class === 'CRequirementCountUpgrade').map(req => req.Count?.Link).filter(Boolean)

        let requiredUnits = mod.catalogs.unit.filter(entry => reqUnitsAliases.includes(entry.$$resolved.TechAliasArray) || reqUnitsAliases.includes(entry.id) ).map(unit => unit.id)
        let requiredUpgrades = mod.catalogs.upgrade.filter(entry => reqUpgradeAliases.includes(entry.$$resolved.TechAliasArray) || reqUpgradeAliases.includes(entry.id) ).map(unit => unit.id)

        let producingUnits = mod.catalogs.unit.filter(entry => entry.$$resolved.CardLayouts?.find(card => {
            if(card.LayoutButtons){
                for(let button of card.LayoutButtons) {
                    if (button.AbilCmd && abilCmdsIds.includes(button.AbilCmd)) {
                        return true
                    }
                }
            }
            return false
        })).map(unit => unit.id)

        return {abilcmds: abilCmdsIds,units: requiredUnits,upgrades: requiredUpgrades,producers: producingUnits}
    }

    rename(mask){

        // For Race-Specific stuff
        let newName
        if(this.__misc){
            let li = this.id.lastIndexOf('_') +1
            if(li) {
                let race = this.id.substring(li);
                newName = this.id.substring(0, li) + mask.replace("*", race)
            }
        }else{
            newName = mask.replace("*", this.id)
        }

        Object.defineProperty(this, '__renamed',{ configurable:true, writable: true,enumerable: false,value: true })



        this.resolveText(mask)

        let oldName = this.id
        this.ID = oldName
        this.id = newName

        if(this.$mod){
            delete this.$mod.cache[oldName]
            this.$mod.cache[newName] = this
        }

        let counter = 0
        if (this.$$references) {
            for (let reference of this.$$references) {
                let refpath = reference.path
                if (!refpath) continue //nothing to rename
                let _path = refpath.split(".")
                let value, valueObject, valueProperty, valueEntity, newvalue
                let referenceEntity = reference.target;//this.cache[_path[0]][_path[1]]
                if (!referenceEntity) {
                    console.warn("wrong reference " + refpath)
                    continue;
                }
                if (SCGame.useResolve && reference.type !== "text") {
                    valueEntity = referenceEntity.$created ? referenceEntity : referenceEntity.$$resolved;
                } else {
                    valueEntity = referenceEntity;
                }
                value = valueEntity
                let pathobject = [valueEntity]
                for (let pathItem of _path.slice(2)) {
                    if (value === undefined) break;
                    valueObject = value
                    valueProperty = pathItem
                    value = value[pathItem]
                }
                if (value === undefined) {
                    console.warn("wrong refpath " + refpath)
                    continue;
                }
                if (value.constructor === Object) {
                    valueObject = value
                    valueProperty = "value"
                    value = valueObject.value
                }


                let propertySchema
                
                if(reference.type === "text"){ 
                    propertySchema = "text"
                }
                else{
                    if (_path[0] === 'map') {
                        if(_path[1] === 'objects'){
                            propertySchema = SCSchema.Objects
                        }
                        else{
                            console.log("???")
                        }
                    }
                    else if (_path[0] === 'library') {
                        propertySchema = LibrarySchema
                    } else {
                        propertySchema = referenceEntity.$$schema
                    }
                    let _propertyPath = _path.slice(2)
                    if (_propertyPath[0] === 'parent') {
                        propertySchema = referenceEntity.$$namespace
                    } else {
                        for (let _propertyPathItem of _propertyPath) {

                            if (propertySchema[0]?.index === 'word') {
                                propertySchema = propertySchema[0]
                            } else if (isNumeric(_propertyPathItem)) {
                                propertySchema = propertySchema[0]
                            } else {
                                propertySchema = resolveSchemaType(propertySchema, _propertyPathItem, pathobject)
                            }
                            if (!propertySchema) {
                                console.log("@@@")
                            }

                            valueEntity = valueEntity[_propertyPathItem]
                            pathobject.push(valueEntity)
                        }
                        propertySchema = propertySchema.value || propertySchema
                    }
                }

                let namespace
                switch (propertySchema) {
                    case "text": {
                        let nameSpace = this.$$namespace.substring(0,1).toUpperCase() + this.$$namespace.substring(1)
                        let oldString = [nameSpace,oldName].join(",")
                        let newString = [nameSpace,newName].join(",")

                        const regex = new RegExp('\\b' + oldString + '\\b', 'g');
                        newvalue =  value.replace(regex, newString);
                        break;
                    }
                    case "terms": {
                        let [ ...conditions] = value.split(";").map(term => term.trim())

                        for (let index = 0; index < conditions.length; index++) {
                            let condition = conditions[index]
                            if(condition.includes(".")) {
                                let eventParts = condition.split(".")
                                namespace = eventEntityType(eventParts[0])

                                if (namespace === this.$$namespace && eventParts[1] === oldName) {
                                    eventParts[1] = this.id
                                    conditions[index] = eventParts.join(".")
                                }

                            }
                            else{
                                let eventParts = condition.split(" ").map(term => term.trim())
                                let namespace = eventConditionEntityType(eventParts[0])

                                if (namespace === this.$$namespace && eventParts[1] === oldName) {
                                    eventParts[1] = this.id
                                    conditions[index] = eventParts.join(" ")
                                }
                            }
                        }
                        newvalue = [...conditions].join(";")
                        break;
                    }
                    case "abilcmd": {
                        let [entityName, cmd] = value.split(",")
                        if (cmd) {
                            newvalue = [this.id, cmd].join(",")
                        } else {
                            newvalue = this.id
                        }
                        break;
                    }
                    case "subject": {
                        if (value.startsWith(':')) {

                            let [subjjNamespace, subjLink] = value.substring(2).split(".")
                            newvalue = `::${subjjNamespace}.${this.id}`
                        } else {
                            if (value === oldName) {
                                newvalue = this.id
                            } else {
                                // console.log("#")
                            }
                        }
                        break;
                    }
                    case "ops": {
                        let actors = value.split(" ")
                        for (let index = 0; index < actors.length; index++) {

                            if (actors[index] === oldName) {
                                actors[index] = this.id
                            }
                        }
                        newvalue = actors.join(" ")
                        break;
                    }
                    case "reference": {
                        let [entityType, entityName, entityProperty] = value.split(",")
                        newvalue = [entityType, this.id, entityProperty].join(",")
                        break;
                    }
                    case "send": {

                        let eventParts = value.split(" ")

                        switch (eventParts[0]) {
                            case "AttachSetBearingsFrom": {
                                let parts = value.replace(/([\{\} }])/g, '\n$1\n').split('\n')
                                for (let i in parts) {
                                    if (parts[i] === oldName) {
                                        parts[i] = this.id
                                    }
                                }
                                newvalue = parts.join("")
                                break;
                            }
                            case "HostSiteOpsSet": {
                                let parts = value.replace(/([\{\} }])/g, '\n$1\n').split('\n')
                                for (let i in parts) {
                                    if (parts[i] === oldName) {
                                        parts[i] = this.id
                                    }
                                }
                                newvalue = parts.join("")
                                break;
                            }
                            case "RefSetFromMsg": {
                                let _val = value.split(" ")

                                let [namespace, link] = _val[1].substring(2).split(".")
                                _val[1] = `::${namespace}.${this.id}`
                                newvalue = _val.join(" ")
                                break;
                            }
                            case "PortraitCustomize":
                            case "ModelSwap": {
                                eventParts[1] = this.id
                                newvalue = eventParts.join(" ")
                                break;
                            }
                            case "QueryRadius":
                            case "QueryRegion":
                            case "TimerSet": {
                                eventParts[2] = this.id
                                newvalue = eventParts.join(" ")
                                break;
                            }
                            case "ModelMaterialApply":
                            case "ModelMaterialRemove":
                            case "Create":
                            case "CreateCopy": {
                                eventParts[1] = this.id
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
                        if(valueProperty === "unitName"){

                            let resolved = {}
                            referenceEntity.$class && deep(resolved, referenceEntity.$class.$$data)
                            deep(resolved, referenceEntity.$$data,referenceEntity.default ? 'replace' : 'merge')
                            resolveArrays( resolved , referenceEntity.$$schema,[referenceEntity.class + "#" + referenceEntity.id])
                            delete resolved.parent
                            delete resolved.default
                            deepReplaceMatch(resolved, val => val && val.constructor === String && val.includes("##unitName##"), null, ({val, obj, prop, id, path, crumbs}) => {
                                let _temp = {}
                                let _obj = _temp
                                let _sch = referenceEntity.$$schema
                                for(let i = 0; i < crumbs.length - 1; i++){
                                    let crumb = crumbs[i]
                                    if(_sch.constructor === Array){
                                        _sch = _sch[0]
                                    }
                                    else{
                                        _sch = resolveSchemaType(_sch,crumb,path)
                                    }
                                    if(!_obj[crumb]) {
                                        _obj[crumb] = _sch.constructor === Array && _sch[0].index !== 'word' ? [] :  {}
                                    }
                                    _obj = _obj[crumb]
                                }
                                if(_sch.constructor === Array){
                                    _sch = _sch[0]
                                }
                                else{
                                    if(!_sch[prop]){
                                        console.warn('replacement possible data error')
                                    }
                                }
                                if(_sch[prop] === "file"){
                                    _obj[prop] = val.replace(/##unitName##/g,oldName)
                                    referenceEntity.mixin(_temp,'unite')
                                }
                            })

                        }
                        newvalue = this.id
                    }
                }

                valueObject[valueProperty] = newvalue

                counter++
            }
        }



        delete this.__data
        delete this.__resolved

        let resolved = {}
        this.$class && deep(resolved, this.$class.$$data)
        deep(resolved, this.$$data,this.default ? 'replace' : 'merge')
        resolveArrays( resolved , this.$$schema,[this.class + "#" + this.id])
        delete resolved.parent
        delete resolved.default
        deepReplaceMatch(resolved, val => val && val.constructor === String && val.includes("##id##"), null, ({val, obj, prop, id, path, crumbs}) => {
            let _temp = {}
            let _obj = _temp
            let _sch = this.$$schema
            for(let i = 0; i < crumbs.length - 1; i++){
                let crumb = crumbs[i]
                if(_sch.constructor === Array){
                    _sch = _sch[0]
                }
                else{
                    _sch = resolveSchemaType(_sch,crumb,path)
                }
                if(!_obj[crumb]) {
                    _obj[crumb] = _sch.constructor === Array && _sch[0].index !== 'word' ? [] :  {}
                }
                _obj = _obj[crumb]
            }
            if(_sch.constructor === Array){
                _sch = _sch[0]
            }
            else{
                if(!_sch[prop]){
                    console.warn('replacement possible data error')
                }
            }
            if(_sch[prop] === "file"){
                _obj[prop] = val.replace(/##id##/g,"##ID##")
                this.mixin(_temp,'unite')
            }
        })

        delete this.__data
        delete this.__resolved

        return counter
    }
    resolveAssets(){
        let resolvedAssets = resolveAssets(this.$$resolved,this.$$schema)
        if(Object.keys(resolvedAssets).length > 0){
            this.mixin(resolvedAssets,'unite')
        }
    }
    resolveText(mask,picked = []){
        let resolvedText = resolveText(this.$$resolved,this.$$schema,[], picked,mask)
        if(Object.keys(resolvedText).length > 0){
            this.mixin(resolvedText,"unite")

            for(let link of picked){
                for(let locale in this.$mod.locales){
                    for(let file in this.$mod.locales[locale]){
                        if(this.$mod.locales[locale][file]){
                            let value = this.$mod.locales[locale][file][link]
                            if( value){
                                //todo might be used in other entities. should be tracked and not removed if used.
                                //delete this.$mod.locales[locale][file][link]

                                let linkParts = link.split("/");
                                linkParts[linkParts.length - 1] = mask.replace('*',linkParts[linkParts.length - 1])
                                this.$mod.locales[locale][file][linkParts.join("/")] = value
                            }
                        }
                    }
                }
            }
        }
    }
    mixin(data,mergetype){
        if(!Object.keys(data).length)return;
        // arrayValues(data)
        // convertIndexedArrayToObjects(data)
        deep(this,data,mergetype)
    }
    get $$namespace(){
        let namespace = this.$namespace || this.$class?.$$namespace || this.$parent?.$$namespace || ''
        Object.defineProperty(this, '$$namespace',{ configurable:true, writable: true,enumerable: false,value: namespace })
        return namespace
    }
    get $$relations(){
        if(this.__relations){
            return this.__relations;
        }

        let result
        // if(SCGame.useResolve){
            result =  relations(this,this.$$resolved, this.$$schema,[this.$$namespace,this.id || ""],SCGame.pickIgnoreObjects)
        // }
        if(!SCGame.useResolve){
            for(let i in result){
                if(!result[i].xpath){
                    result[i].xpath = result[i].path
                }
                result[i].path = ""
            }


            let relations2 = relations(this,this, this.$$schema,[this.$$namespace,this.id || ""],SCGame.pickIgnoreObjects)
            for(let i in relations2){
                if(!relations2[i].xpath) {
                    relations2[i].xpath = relations2[i].path
                }
            }
            result.push(...relations2)
            if(this.parent){
                result.push({
                    target: this,
                    namespace: this.$$namespace,
                    link: this.parent,
                    path: [this.$$namespace,this.id || "", "parent"].join("."),
                    xpath: [this.$$namespace,this.id || "", "parent"].join(".")
                })
            }
        }
        Object.defineProperty(this, '__relations',{ configurable:true, writable: true,enumerable: false,value: result })
        return result
    }
    ghost(){
        Object.defineProperty(this, '__core',{ configurable:true, writable: true,enumerable: false,value: true })
    }
    get $$schema(){
        if(this.__schema){
            return this.__schema;
        }
        let schema =  {}
        deep(schema,this.$class?.$$schema,'unite')
        deep(schema,this.$parent?.$$schema,'unite')
        deep(schema,this.$schema,'unite')


        if(this.$tokens){
            for(let token in this.$tokens){
                schema['$'+ token] = this.$tokens[token].type || 'string'
            }
        }







        // for(let property in schema){
        //     if(schema[property].constructor === Function){
        //         let type = schema[property](this)
        //         if(type){
        //             schema[property] = type
        //         }
        //         else{
        //             // delete schema[property]
        //             schema[property]
        //         }
        //     }
        // }

        Object.defineProperty(this, '__schema',{ configurable:true, writable: true,enumerable: false,value: schema })

        // Object.defineProperty(this, '$$schema',{ configurable:true, writable: true,enumerable: false,value: schema })
        return schema
    }
    //Object Data Combined With All Parents Data
    get $$data(){
        if(this.__data){
            return this.__data;
        }
        // let __default = this.default
        let resolved = {}
        this.$parent && deep(resolved, this.$parent.$$data)
        // deep(resolved, this, __default ? 'replace' : 'merge')
        deep(resolved, this)
        Object.defineProperty(this, '__data',{ configurable:true, writable: true,enumerable: false,value: resolved })
        // Object.defineProperty(this, '$$data',{ configurable:true, writable: true,enumerable: false,value: resolved })
        return this.__data;
    }
    //Object Data Combined With All Parents And Class Data
    get $$resolved (){
        if(this.__resolved){
            return this.__resolved;
        }
        let resolved = {}
        this.$class && deep(resolved, this.$class.$$data)
        deep(resolved, this.$$data,this.default ? 'replace' : 'merge')
        resolveArrays( resolved , this.$$schema,[this.class + "#" + this.id])
        delete resolved.parent
        delete resolved.default

        Object.defineProperty(this, '__resolved',{ configurable:true, writable: true,enumerable: false,value: resolved })
        // this.resolveTokens()
        deepReplaceMatch(this.__resolved, val => val && val.constructor === String && val.includes("##"), null, ({val, obj, prop, id, path}) => {
            obj[prop] = val.replace(/##(\w+)##/g,(_,tokenID) =>  {

                let lookup = this
                while(lookup){
                    if(lookup.default || !lookup.$parent || lookup.$parent.default ){
                        if(lookup.$tokens?.[tokenID]){
                            return lookup.$tokens?.[tokenID].value || ""
                        }
                        if(lookup[tokenID] !== undefined ){
                            return lookup[tokenID]
                        }
                    }
                    lookup = lookup.$parent
                }
                return _

                // if(this.__resolved[tokenID]){
                //     return this.__resolved[tokenID]
                // }
                // if(this.__resolved[tokenID] === undefined){
                //     // console.log("incorrect token value",this.class + "#" + this.id + ": "+  tokenID)
                //     return _;
                // }
                // return this[tokenID]
            })
        })
        return this.__resolved;
    }
    getReferences(filterFunction) {
        let refs = this.$$references
        if(!refs){
            return []
        }
        if(filterFunction){
            refs.filter(ref => ref.target.$$resolved && filterFunction(ref.target.$$resolved))
        }
        return [...new Set(refs.map(ref => ref.target))]
    }
    addReferences( ...references) {
        if(!this.$$references){
            Object.defineProperty(this, '$$references',{ configurable:true, writable: true,enumerable: false,value: []})
        }
        this.$$references.push(...references)
    }
    getXML(entityData){
        if(!entityData)entityData = this.$$resolved
        entityData = JSON.parse(JSON.stringify(entityData))

        entityData.id = this.id
        delete entityData.class

//todo for some reason index="int" loses in requirementnode
        if(entityData.OperandArray){
            delete this.__schema
            this.$$schema
        }
        optimiseForXML(entityData, this.$$schema)
        // return {[this.class]: entityData}

        if(this.$tokens){
            entityData["__token__"] = []
            for(let token in this.$tokens){
                //todo fix same token name as data field
                if(entityData.$[token]){
                    entityData [token]={$: {value:entityData.$[token]}}
                    delete entityData.$[token]
                }
                let tokenData = {$: {id: token}}
                let tokenValue = this.$tokens[token].value
                if( tokenValue !== undefined){
                    // delete entityData.$[token]
                    tokenData.$.value = tokenValue
                }
                let tokenType =  this.$tokens[token].type
                if( tokenType !== undefined){
                    tokenData.$.type = 'C' + tokenType[0].toUpperCase() + tokenType.substring(1) + 'Link'
                }
                entityData["__token__"].push(tokenData)
            }
            delete entityData.$.tokens
        }

        try{
            return buildXMLObject({[this.class]: entityData}) + "\n";
        }
        catch(e){
            for(let property in entityData){
                try {
                    buildXMLObject({[this.class]: {[property]: entityData[property]}})
                }
                catch(e2){
                    console.error(e2.message, this.id, property ,entityData[property])
                }
            }
        }
    }
}