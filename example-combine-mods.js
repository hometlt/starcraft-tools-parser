import { SCMod } from "./src/sc-mod.js";

//create the mod instance
let mod = new SCMod()

//read all needed mods in an order
await mod.read("./input/0.Core.SC2Mod")
await mod.read("./input/1.Liberty.SC2Mod")
await mod.read("./input/4.Swarm.SC2Mod")
await mod.read("./input/7.Void.SC2Mod")
await mod.read("./input/9.Void Multi.SC2Mod")

//save data in JSON format to use on Web
await mod.write('./output/web', {format: 'json', resolve: true, structure: 'components', scopes: ['data','locales']})

//save new mod dara in a specific folder (can be used in game)
await mod.write('./output/combined')

//save Data to json file (to use with scripts later)
await mod.write('./output/combined.json')

//or even Yaml format (most compact and readable notation)
await mod.write('./output/combined.yaml')
