import { deep,buildXMLObject,optimiseForXML, deepReplaceMatch, relations, resolveArrays, convertIndexedArrayToObjects } from "./operations.js";
import {SCGame} from "./sc-game.js";

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
    class
    constructor(data) {
        delete this.$class
        delete this.$parent
        delete this.$schema
        delete this.$namespace
        delete this.parent
        delete this.default
        delete this.id
        delete this.class

        for(let property in data){
            if(data[property] === null || data[property] === undefined) continue
            if (property.startsWith('$')){
                Object.defineProperty(this, property,{ configurable:true, writable: true,enumerable: false, value: data[property]})
            }
            else{
                this[property] = data[property]
            }
        }
        // convertIndexedArrayToObjects(this)
        // arrayValues(this)
        // this.arrayValues()
    }
    mixin(data){
        if(!Object.keys(data).length)return;
        // arrayValues(data)
        // convertIndexedArrayToObjects(data)
        deep(this,data)
    }
    get $$namespace(){
        let namespace = this.$namespace || this.$class?.$$namespace || this.$parent?.$$namespace || ''
        Object.defineProperty(this, '$$namespace',{ configurable:true, writable: true,enumerable: false,value: namespace })
        return namespace
    }
    get $$relations(){
        let result
        // if(SCGame.useResolve){
            result =  relations(this.$$resolved, this.$$schema,[this.class,this.id],SCGame.pickIgnoreObjects)
        // }
        if(!SCGame.useResolve){
            for(let i in result){
                result[i].path = ""
            }
            result.push(...relations(this, this.$$schema,[this.class,this.id],SCGame.pickIgnoreObjects))
            if(this.parent){
                result.push({namespace: this.$$namespace, link: this.parent, path: [this.class,this.id, "parent"].join(".")})
            }
        }
        Object.defineProperty(this, '$$relations',{ configurable:true, writable: true,enumerable: false,value: result })
        return result
    }
    get $$schema(){
        let schema =  {}
        deep(schema,this.$class?.$$schema,'unite')
        deep(schema,this.$parent?.$$schema,'unite')
        deep(schema,this.$schema,'unite')
        Object.defineProperty(this, '$$schema',{ configurable:true, writable: true,enumerable: false,value: schema })
        return schema
    }
    //Object Data Combined With All Parents And Class Data
    get $$resolved (){
        let resolved = {}
        this.$class && deep(resolved, this.$class.$$data)
        deep(resolved, this.$$data,this.default ? 'replace' : 'merge')
        resolveArrays( resolved , this.$$schema,[this.class + "#" + this.id])

        Object.defineProperty(this, '$$resolved',{ configurable:true, writable: true,enumerable: false,value: resolved })
        // this.resolveTokens()
        deepReplaceMatch(this.$$resolved, val => val && val.constructor === String && val.includes("##"), null, ({val, obj, prop, id, path}) => {
            obj[prop] = val.replace(/##(\w+)##/g,(_,tokenID) =>  {
                if(this.$$resolved[tokenID]){
                    return this.$$resolved[tokenID]
                }
                if(this.$$resolved[tokenID] === undefined){
                    // console.log("incorrect token value",this.class + "#" + this.id + ": "+  tokenID)
                    return _;
                }
                return this[tokenID]
            })
        })

        // for(let property in this.$$resolved){
        //     if(/[a-z]/.test(property[0])){
        //         delete resolved[property]
        //     }
        // }

        return this.$$resolved;
    }
    //Object Data Combined With All Parents Data
    get $$data(){
        // let __default = this.default
        let resolved = {}
        this.$parent && deep(resolved, this.$parent.$$data)
        // deep(resolved, this, __default ? 'replace' : 'merge')
        deep(resolved, this)
        Object.defineProperty(this, '$$data',{ configurable:true, writable: true,enumerable: false,value: resolved })
        return this.$$data;
    }
    addReferences( ...references) {
        if(!this.$$references){
            Object.defineProperty(this, '$$references',{ configurable:true, writable: true,enumerable: false,value: []})
        }
        this.$$references.push(...references)
    }
    getXML(resolve){
        let entityData = {...(resolve ? this.$$resolved : this)}
        entityData.id = this.id
        delete entityData.class
        optimiseForXML(entityData, this.$$schema)
        // return {[this.class]: entityData}

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