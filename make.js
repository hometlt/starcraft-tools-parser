//create the mod instance
import {SCMod} from "./src/sc-mod.js";
import {getUnknowns} from "./src/operations.js";

let mod = new SCMod()
mod.directory('../data-input')
let prefix = ''
let output = ''
let input = []
let test = true

await mod.read('0.Core')
mod.saveCore()



let mode = 'BroodWar'
switch(mode){
    case 'Liberty':
        input = ['1.Liberty', '2.Liberty Multi']
        prefix = 'WOL'
        output = 'MP - Liberty'
        break;
    case 'Swarm':
        input = ['1.Liberty', '4.Swarm', '6.Swarm Multi']
        prefix = 'HOTS'
        output = 'MP - Swarm'
        break;
    case 'Void':
        input = ['1.Liberty', '4.Swarm', '7.Void', '9.Void Multi']
        prefix = 'LOTV'
        output = 'MP - Void'
        break;
    case 'BroodWar':
        //this operation might needs >2Gb of Memory
        //node --max_old_space_size=4000 make.js
        input = ['1.Liberty', '2.Liberty Campaign', '4.Swarm','5.Swarm Campaign', '7.Void','8.Void Campaign', '10.Nova.sc2mod', './../../Mods/all-races-mods/BroodWar']
        prefix = 'BW'
        output = 'MP - Broodwar'
        break;
}

await mod.read(...input)


let unk = getUnknowns()

if(!test){
    mod.pick({race: ["Terr","Zerg","Prot"]})
    mod.pickActors()
    mod.filter()

//prefix all filtered entities with 'Legacy' word. where '*' is an old entity id

    mod.renameEntities(prefix + "*");
    mod.removeCore()
    await mod.write('./../../Mods/all-races-mods/'+ output + '.SC2Mod')
}
else{
    await mod.write('./TEST.SC2Mod')
}

SAbilArmMagazineInfo