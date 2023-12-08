import {Octokit} from "octokit";
import fs from "fs";
import {fromXMLToObject, optimizeJSONObject, optimizeObject} from "./operations.js";
import {LibrarySchema, SCSchema} from "./sc-schema.js";
import {SCGame} from "./sc-game.js";


export class Reader{
    path = ""

    async read(scopesArray){
        return {}
    }
}

export class SCComponentReader extends Reader{
    constructor (){
        super()
    }
    async parseText(rawtext){
        if (!rawtext) {
            return null
        }
        let data = {}
        rawtext.replace(/\r/g, "").split("\n").forEach(el => {
            let key = el.substring(0, el.indexOf("="))
            let value = el.substring(el.indexOf("=") + 1)
            data[key] = value
        })
        delete data[""]
        return data;
    }
    async parseXML(rawxml,ordered){
        if(!rawxml){
            return null
        }

        let raw = rawxml
            .replace(/<\?xml(.*)\?>/g,'')
            .replace(/<\?token(.*?)\?>/g,(_,row) =>{
                let tokenID = /id="(\w+)"/.exec(row)[1]
                row = row.replace(/id="(\w+)"/,"");
                return `<__${tokenID}__ ${row} />`
            })
            // .replace(/<\?token\s+id="(\w+)"\s+(?:type="(\w+)"\s+)?value="(.*)"\?>/g,(_,tokenID,tokenType,tokenValue) =>{
            //     return `<__${tokenID}__ value="${tokenValue}"/>`
            // })
            .replace(/<\?(.*)\?>/g,function(_){
                return _
            })

        return new Promise((resolve, reject) => {
            let parser
            if(ordered){
                parser = new XML.Parser({
                    // trim: true,
                    explicitArray: true,
                    explicitChildren: true,
                    preserveChildrenOrder: true
                });
            }
            else{
                parser = new XML.Parser({
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

    async getFiles (dirPath, recoursive){

        let {files,folders} = await this.getFilesList(dirPath)
        if(recoursive){
            for(let folder of folders){
                let subFiles =  await this.getFiles(dirPath + "/" + folder, true)
                files.push(...subFiles.map(file => {
                    return folder + "/" + file
                }))
            }
        }
        return files
    }

    async getAssets(){
        let files = []

        let _dirs = [
            'Assets',
            'LocalizedData',
            'Base.SC2Assets',
            'TextureReduction'
        ]

        let locales = [
            "enUS",
            "ruRU",
        ]
        for(let locale of locales){
            _dirs.push(`${locale}.SC2Assets`)
        }

        for(let _dir of _dirs){
            let files2 = await this.getFiles(_dir, true)

            for(let file of files2){
                files.push(_dir + '/' + file)
            }
        }


        let roolFiles = await this.getFiles();
        let mainFolderfiles = roolFiles.filter(f => f.match(/\.(m3|ogg|mp3|m3a|wav|dds)$/))
        files.push(...mainFolderfiles)

        return files
        // for(let m3File of files){
        //     let raw = fs.readFileSync(m3File, {encoding: 'utf-8'})
        //     const indexes = raw.matchAll(new RegExp(`Assets\\[\\\w_]+\.dds`, 'gi'))
        //     console.log(indexes)
        // }
    }

    async getLayouts(){
        let files = await this.getFiles('Base.SC2Data/ui', true)
        return  files.filter(f => f.match(/\.(sc2layout)$/i))
            .map(file => 'Base.SC2Data/UI/' +  file)
    }

    async getGalaxy(){
        let files = await this.getFiles('Base.SC2Data', true)
        return files
            .filter(f => f.match(/\.(galaxy)$/i))
            .map(file => 'Base.SC2Data' + "/"+  file)
    }

    async readXMLFile(localeFile, ordered) {
        return this.readFile(localeFile).then(data => this.parseXML(data,ordered))
    }

    async readTextFile(localeFile) {
        return this.readFile(localeFile).then(data => this.parseText(data))
    }

    async read(scopesArray){
        let scopes = scopesArray.reduce((o,s) => {o[s] = true; return o},{})

        let data = {}
        if(scopes.components) {
            let componentsData = await this.readXMLFile( "ComponentList.SC2Components")
            data.components = componentsData?.Components?.DataComponent
        }
        if(scopes.assets) {
            data.assets = await this.readTextFile( "Base.SC2Data/GameData/Assets.txt")
        }
        if(scopes.documentinfo){
            let documentInfo = await this.readXMLFile( "DocumentInfo")
            let dependencies = documentInfo?.DocInfo?.Dependencies?.[0].Value
            if(dependencies) {
                data.dependencies = dependencies
            }
        }
        if(scopes.styles){
            let stylesData = await this.readXMLFile( "Base.SC2Data/UI/FontStyles.SC2Style")
            if(stylesData){
                data.styles = stylesData
            }
        }
        if(scopes.locales){
            let {folders} = await this.getFilesList();

            let textFiles = ["GameHotkeys", "GameStrings", "ObjectStrings", "TriggerStrings", "ConversationStrings"]
            let locales = {}
            let LocaleData = data.components?.filter(entity => entity.$?.Type.toLowerCase() === "text").map(entity => entity.$.Locale) || ["enUS"];
            if(LocaleData){
                for (let locale of LocaleData) {
                    locales[locale] = {}
                    for (let textFile of textFiles) {

                        data.components.filter(el => el.$.type === "text")

                        let folder = folders.find( f => f.toLowerCase() === `${locale.toLowerCase()}.sc2data`)

                        if(folder){
                            let filename = `${folder}/LocalizedData/${textFile}.txt`
                            let textdata = await this.readTextFile(filename)
                            if (textdata) {
                                locales[locale][textFile] = textdata
                            }
                        }
                    }
                }
                data.locales = locales
            }
        }
        if(scopes.triggers){
            let triggersFile = "Triggers"
            let triggersDataParsed = await this.readXMLFile(triggersFile)
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
        if(scopes.layouts){
            let layoutsData = await this.readXMLFile( "Base.SC2Data/UI/Layout/DescIndex.SC2Layout")
            let layouts = layoutsData?.Desc?.Include
            if(layouts){
                data.layouts = layouts
            }

            //todo
            // let desc = layoutsData?.Desc
            // if(desc){
            //     fromXMLToObject(desc)
            //     data.desc = desc?.Include
            // }
        }
        if(scopes.files){

            let mediaFiles = await this.getAssets()
            if(mediaFiles.length) {
                data.mediaFiles = mediaFiles
            }
            // for(let file of mediaFiles){
            //     files[file] = {
            //         path: (this.path + file),
            //         scope: 'media'
            //     }
            // }

            let layoutFiles = await this.getLayouts()
            if(layoutFiles.length){
                // data.layoutFiles = layoutFiles
                data.layoutFilesData = {}
                for(let layoutFile of layoutFiles ){
                    data.layoutFilesData[layoutFile] = fs.readFileSync(this.path + layoutFile, {encoding: 'utf-8'})
                }
            }

            let galaxyFiles = await this.getGalaxy()
            if(galaxyFiles.length){
                data.galaxyFiles = galaxyFiles
            //     data.galaxy = {}
            //     for(let galaxyFile of galaxyFiles ){
            //         data.galaxy[galaxyFile] = fs.readFileSync(this.path + galaxyFile, {encoding: 'utf-8'})
            //     }
            }

            // if(data.layouts){
            //     for (let include of data.layouts) {
            //         files["Base.SC2Data/" + include.$.path] = {
            //             path: (this.path + "Base.SC2Data/" + include.$.path),
            //             scope: 'layouts'
            //         }
            //     }
            // }
            // for (let file of galaxyFiles) {
            //     files["Base.SC2Data/" + file] = {
            //         path: (this.path + "Base.SC2Data/" + file),
            //         scope: 'triggers'
            //     }
            // }

            // if(Object.keys(files).length){
            //     data.files = files
            // }

        }
        if(scopes.banklist){
            let banklist = await this.readXMLFile( "BankList.xml")
            if(banklist){
                data.banklist = banklist
            }
        }
        if(scopes.mapdata){
            // data.CellAttribute_Pde  = await this.readTextFile( "CellAttribute_Pde")
            // data.CellAttribute_Pnb  = await this.readTextFile( "CellAttribute_Pnb")
            // data.CellAttribute_Pnp  = await this.readTextFile( "CellAttribute_Pnp")
            let objectsRaw =  await this.readXMLFile( "Objects")
            let preloadRaw =  await this.readXMLFile( "Preload.xml")
            let terrainRaw =  await this.readXMLFile( "t3Terrain.xml")
            let regionsRaw =  await this.readXMLFile( "Regions")

            if(objectsRaw) {
                data.objects = fromXMLToObject(objectsRaw.PlacedObjects)
                optimizeObject(data.objects, SCSchema.Objects)
            }
            if(preloadRaw) {
                data.preload = fromXMLToObject(preloadRaw.Preload)
                optimizeObject(data.preload, SCSchema.Preload)
            }
            if(terrainRaw) {
                data.terrain = fromXMLToObject(terrainRaw.terrain)
                optimizeObject(data.terrain, SCSchema.Terrain)
            }
            if(regionsRaw) {
                data.regions = fromXMLToObject(regionsRaw.Regions)
                optimizeObject(data.regions, SCSchema.Regions)
            }

        }
        if(scopes.data){
            let includesData = await this.readXMLFile( "Base.SC2Data/GameData.xml")
            let commonFiles = SCGame.datafiles.map(el => el + "data.xml");
            let existedFiles = await this.getFiles( "Base.SC2Data/GameData" )
            let includes= []
            for(let file of existedFiles){
                if(commonFiles.includes(file.toLowerCase())) {
                    includes.push("Base.SC2Data/GameData/" + file)
                }
            }
            let catalogs = []
            for (let file of includes) {
                let data = await this.readXMLFile( file, true)
                if (data) {
                    catalogs.push({id: file, data: data.Catalog?.constructor === Object ? data : {}});
                }
            }

            let additionalFiles = includesData?.Includes?.Catalog?.map(catalog => "Base.SC2Data/" + catalog.$.path)
            if (additionalFiles) {
                for (let file of additionalFiles) {
                    let data = await this.readXMLFile( file, true)
                    if (!data) {
                        console.log("File not found: " + this.path + file)
                    } else {
                        catalogs.push({id: file, data: data.Catalog?.constructor === Object ? data : {}});
                    }
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

            if(entities.length){
                data.entities = entities
            }
        }
        return data;
    }
}


export class LocalSCComponentReader extends SCComponentReader{
    constructor (modpath){
        super()
        if(!modpath.endsWith("/"))modpath += "/"
        this.path = modpath
    }
    async getFilesList(dirPath = ""){
        let files = [], folders = [];
        if(!fs.existsSync(this.path + dirPath)) {
            return {files,folders}
        }
        let contents = fs.readdirSync(this.path + dirPath)

        for(let content of contents){
            if (fs.statSync(this.path + dirPath + "/" + content).isDirectory()) {
                folders.push(content)
            }
            else{
                files.push(content)
            }
        }

        return {files,folders}

    }

    async readFile(localeFile){
        if (!fs.existsSync(this.path + localeFile)) {
            return null;
        }
        return fs.readFileSync(this.path + localeFile, {encoding: 'utf-8'})
    }
}
export class GithubSCComponentReader extends SCComponentReader {
    constructor(modpath) {
        super()
        this.octokit = new Octokit({auth: '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'});
        let [owner, repo, ...path] = modpath.split(":")[1].split("/")
        this.owner = owner;
        this.repo = repo;
        this.path = path.join("/");
    }
    getFilesList(dirPath = ""){

        let path = this.path
        if(dirPath){
            path += "/" + dirPath
        }
        return this.octokit.rest.repos.getContent({
            owner: this.owner,
            repo: this.repo,
            path
        })
        .then(({data}) => {

            const files = data.filter(item => item.type === 'file').map(f => f.name)
            const folders = data.filter(item => item.type === 'dir').map(f => f.name)
            return {files,folders};

        })
        .catch((error) => {
            if (error.status === 404) {
                console.error(`File not found: ${dirPath}`);
            } else {
                console.error(`Error: ${error.message}`);
            }
            return {files: [],folders: []};
        });

    }

    async readFile(localeFile){
        return this.octokit.rest.repos
            .getContent({
                owner: this.owner,
                repo: this.repo,
                path: this.path + "/" + localeFile
            })
            .then((response) => {
                // File exists, retrieve its content
                const fileInfo = response.data;
                const sha = fileInfo.sha;

                return this.octokit.rest.git.getBlob({
                    owner: this.owner,
                    repo: this.repo,
                    file_sha: sha,
                });
            })
            .then((blobResponse) => {
                // Decode and log content
                const content = Buffer.from(blobResponse.data.content, 'base64').toString();
                return content
            })
            .catch((error) => {
                if (error.status === 404) {
                    console.error(`File not found: ${localeFile}`);
                } else {
                    console.error(`Error: ${error.message}`);
                }
                return null
            });



    }


}
export class FileReader  extends Reader{
    constructor (path,format){
        super()

        this.path = path
        this.format = format
    }
    async read(scopes){

        let data = {}
        let raw = fs.readFileSync(this.path, {encoding: 'utf-8'})

        if (this.format === 'JSON') {
            data = JSON.parse(raw)
        }
        if (this.format === 'YAML') {
            data = YAML.load(raw)
        }
        if (this.format === 'XML') {
            data = {}
        }
        for(let entity of data.entities){
            optimizeJSONObject(entity, SCGame.classlist[entity.class].$$schema)
        }
        return data;
    }
}