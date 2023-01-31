import {SCMod} from "./src/sc-mod.js";

let mod = new SCMod()
mod.directory('..')
await mod.read(
    'Core - LibertyCampaign',
    'Core - Swarm',
    'Core - SwarmCampaign',
    'Core - Void',
    'Core - VoidCampaign'
)
await mod.write('VoidCampaignMergedIntoOneMod.SC2Mod')