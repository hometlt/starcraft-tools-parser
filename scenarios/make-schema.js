import fs from "fs";
import {SCGame} from '../src/sc-game.js'
import {SCMod} from "../src/sc-mod.js";


async function makeSchema({mod,path = '*',group = 'catalog' }){
    let schema = deep({},CoreSchema)


    this._schemaValues = {}
    for(let catalog in mod.catalogs){
        if(SCGame.ignoredNamespaces.includes(catalog))continue;

        for(let entity of mod.catalogs[catalog]) {
            let schemaName
            if(group === "catalog"){
                schemaName = catalog
            }
            if(group === "class"){
                schemaName = entity.class
            }
            if(!schema[schemaName])schema[schemaName] = {}
            this._objectScheme(entity,schema[schemaName],[schemaName] ,{path})
        }
    }

    deepReplaceMatch(schema, val => val.constructor===Object && Object.keys(val).length === 0,null, ({val, obj, prop,x ,path,crumbs}) => {
        let index
        if(obj.constructor === Object){
            index = path.length -1
        }
        if(obj.constructor === Array){
            index = path.length -2
        }
        delete path[index][crumbs[index]]
        while(index> 0 && path[index].constructor===Object && Object.keys(path[index]).length === 0){
            index--
            delete path[index][crumbs[index]]
        }
    })

    delete this._schemaValues


    deep(schema,{
        requirementnode: {OperandArray:  "{string}"},
        requirement: {NodeArray: [{Link : "requirementnode"}]},
        validator: {
            CombineArray: "[validator]",
        },
        actor: {
            "Sight": "word",
            "sight": "word",
        },
        CRequirementCountUpgrade: {Count: {Link: "upgrade",}},
        CRequirementCountBehavior: {Count: {Link: "behavior",}},
        CRequirementCountUnit: {Count: {Link: "unit",}},
        CValidatorUnitType: {Value: "unit"},
        CValidatorPlayerRequirement: {Value: "requirement"},
        abil: {InfoArray: [{Unit : "unit",index:"int"}]},
        CAbilTrain:{InfoArray:[{index:"word", "Unit": "[unit]"}]},
        CAbilBuild:{InfoArray:[{index:"word"}]},
        CAbilLearn:{InfoArray:[{index:"word"}]},
        CAbilPawn:{InfoArray:[{index:"word"}]},
        CAbilResearch:{InfoArray:[{index:"word"}]},
        CAbilSpecialize:{InfoArray:[{index:"word"}]},
        CAbilWarpTrain:{InfoArray:[{index:"word"}]},
        CAbilArmMagazine:{InfoArray:[{index:"word"}]}
    },'unite')

    return schema;
}

export const CoreSchema = {
    CAchievement: {
        namespace: "achievement"
    },
    CAchievementTerm: {
        namespace: "achievementterm"
    },
    CAchievementTermAbilInteract: {
        parent: "CAchievementTerm"
    },
    CAchievementTermAbilLoad: {
        parent: "CAchievementTerm"
    },
    CAchievementTermAbilUse: {
        parent: "CAchievementTerm"
    },
    CAchievementTermAchievement: {
        parent: "CAchievementTerm"
    },
    CAchievementTermBehaviorCount: {
        parent: "CAchievementTerm"
    },
    CAchievementTermBehaviorState: {
        parent: "CAchievementTerm"
    },
    CAchievementTermCombine: {
        parent: "CAchievementTerm"
    },
    CAchievementTermEffectAbsorbed: {
        parent: "CAchievementTerm"
    },
    CAchievementTermEffectDamaged: {
        parent: "CAchievementTerm"
    },
    CAchievementTermEffectDodged: {
        parent: "CAchievementTerm"
    },
    CAchievementTermEffectHealed: {
        parent: "CAchievementTerm"
    },
    CAchievementTermEffectKilled: {
        parent: "CAchievementTerm"
    },
    CAchievementTermEffectUse: {
        parent: "CAchievementTerm"
    },
    CAchievementTermGeneric: {
        parent: "CAchievementTerm"
    },
    CAchievementTermReplay: {
        parent: "CAchievementTerm"
    },
    CAchievementTermScoreValue: {
        parent: "CAchievementTerm"
    },
    CAchievementTermTime: {
        parent: "CAchievementTerm"
    },
    CAchievementTermUnitBirth: {
        parent: "CAchievementTerm"
    },
    CAchievementTermUnitDeath: {
        parent: "CAchievementTerm"
    },
    CAchievementTermUnitKills: {
        parent: "CAchievementTerm"
    },
    CAchievementTermUnitRegen: {
        parent: "CAchievementTerm"
    },
    CAchievementTermUnitSupplyLoss: {
        parent: "CAchievementTerm"
    },
    CAlert: {
        namespace: "alert"
    },
    CArmyCategory: {
        namespace: "armycategory"
    },
    CArmyUnit: {
        namespace: "armyunit"
    },
    CArmyUpgrade: {
        namespace: "armyupgrade"
    },
    CArtifact: {
        namespace: "artifact"
    },
    CArtifactSlot: {
        namespace: "artifactslot"
    },
    CBankConditionCompare: {
        namespace: "bankcondition"
    },
    CBankConditionCompareValueCount: {
        parent: "CBankConditionCompare"
    },
    CBankConditionCompareValueSum: {
        parent: "CBankConditionCompare"
    },
    CBoost: {
        namespace: "boost"
    },
    CBundle: {
        namespace: "bundle"
    },
    CCamera: {
        namespace: "camera"
    },
    CCampaign: {
        namespace: "campaign"
    },
    CCharacter: {
        namespace: "character"
    },
    CCliff: {
        namespace: "cliff"
    },
    CCliffDoodad: {
        parent: "CCliff"
    },
    CCliffMesh: {
        namespace: "cliffmesh"
    },
    CColorStyle: {
        namespace: "colorstyle"
    },
    CConversation: {
        namespace: "conversation"
    },
    CConversationState: {
        namespace: "conversationstate"
    },
    CConfig: {
        namespace: "config"
    },
    CConsoleSkin: {
        namespace: "consoleskin"
    },
    CGameUI: {
        namespace: "gameui"
    },
    CLocation: {
        namespace: "location"
    },
    CMap: {
        namespace: "map"
    },
    CObjective: {
        namespace: "objective"
    },
    CPremiumMap: {
        namespace: "premiummap"
    },
    CRaceBannerPack: {
        namespace: "racebannerpack"
    },
    CReward: {
        namespace: "reward"
    },
    CRewardConsoleSkin: {
        parent: "CReward"
    },
    CRewardDecal: {
        parent: "CReward"
    },
    CRewardEmoticon: {
        parent: "CReward"
    },
    CRewardIcon: {
        parent: "CReward"
    },
    CRewardModel: {
        parent: "CReward"
    },
    CRewardPoints: {
        parent: "CReward"
    },
    CRewardPortrait: {
        parent: "CReward"
    },
    CRewardPortraitInGame: {
        parent: "CReward"
    },
    CRewardRaceBanner: {
        parent: "CReward"
    },
    CRewardSpray: {
        parent: "CReward"
    },
    CRewardSprayUseDecal: {
        parent: "CReward"
    },
    CRewardTrophy: {
        parent: "CReward"
    },
    CRewardVoicePack: {
        parent: "CReward"
    },
    CStimPack: {
        namespace: "stimpack"
    },
    CTrophy: {
        namespace: "trophy"
    },
    CWarChest: {
        namespace: "warchest"
    },
    CWarChestSeason: {
        namespace: "warchestseason"
    },
    CDSPChorus: {
        namespace: "dsp"
    },
    CDSPCompressor: {
        parent: "CDSPChorus"
    },
    CDSPCustomCompressor: {
        parent: "CDSPChorus"
    },
    CDSPDistortion: {
        parent: "CDSPChorus"
    },
    CDSPEcho: {
        parent: "CDSPChorus"
    },
    CDSPFlange: {
        parent: "CDSPChorus"
    },
    CDSPHighPass: {
        parent: "CDSPChorus"
    },
    CDSPLimiter: {
        parent: "CDSPChorus"
    },
    CDSPLowPass: {
        parent: "CDSPChorus"
    },
    CDSPLowPassSimple: {
        parent: "CDSPChorus"
    },
    CDSPNormalize: {
        parent: "CDSPChorus"
    },
    CDSPParamEQ: {
        parent: "CDSPChorus"
    },
    CDSPPitchShift: {
        parent: "CDSPChorus"
    },
    CDSPReverb: {
        parent: "CDSPChorus"
    },
    CDecalPack: {
        namespace: "decalpack"
    },
    CEmoticon: {
        namespace: "emoticon"
    },
    CEmoticonPack: {
        namespace: "emoticonpack"
    },
    CFoW: {
        namespace: "fow"
    },
    CGame: {
        namespace: "game"
    },
    CHerd: {
        namespace: "herd"
    },
    CHerdNode: {
        namespace: "herdnode"
    },
    CHero: {
        namespace: "hero"
    },
    CHeroAbil: {
        namespace: "heroabil"
    },
    CHeroStat: {
        namespace: "herostat"
    },
    CLensFlareSet: {
        namespace: "lensflareset"
    },
    CMount: {
        namespace: "mount"
    },
    CPhysicsMaterial: {
        namespace: "physicsmaterial"
    },
    CPing: {
        namespace: "ping"
    },
    CPlayerResponse: {
        namespace: "playerresponse"
    },
    CPlayerResponseUnit: {
        parent: "CPlayerResponse"
    },
    CPlayerResponseUnitBirth: {
        parent: "CPlayerResponse"
    },
    CPlayerResponseUnitDamage: {
        parent: "CPlayerResponse"
    },
    CPlayerResponseUnitDeath: {
        parent: "CPlayerResponse"
    },
    CPortraitPack: {
        namespace: "portraitpack"
    },
    CPreload: {
        namespace: "preload"
    },
    CPreloadActor: {
        parent: "CPreload"
    },
    CPreloadConversation: {
        parent: "CPreload"
    },
    CPreloadModel: {
        parent: "CPreload"
    },
    CPreloadSound: {
        parent: "CPreload"
    },
    CPreloadUnit: {
        parent: "CPreload"
    },
    CReverb: {
        namespace: "reverb"
    },
    CScoreResult: {
        namespace: "scoreresult"
    },
    CScoreResultBuildOrder: {
        parent: "CScoreResult"
    },
    CScoreResultExperience: {
        parent: "CScoreResult"
    },
    CScoreResultGraph: {
        parent: "CScoreResult"
    },
    CScoreResultPerformance: {
        parent: "CScoreResult"
    },
    CScoreResultRoot: {
        parent: "CScoreResult"
    },
    CScoreResultScore: {
        parent: "CScoreResult"
    },
    CScoreValue: {
        namespace: "scorevalue"
    },
    CScoreValueStandard: {
        parent: "CScoreValue"
    },
    CScoreValueCombine: {
        parent: "CScoreValueCustom"
    },
    CScoreValueCustom: {
        parent: "CScoreValue"
    },
    CSkinPack: {
        namespace: "skinpack"
    },
    CSoundExclusivity: {
        namespace: "soundexclusivity"
    },
    CSoundMixSnapshot: {
        namespace: "soundmixsnapshot"
    },
    CSoundtrack: {
        namespace: "soundtrack"
    },
    CSpray: {
        namespace: "spray"
    },
    CSprayPack: {
        namespace: "spraypack"
    },
    CTalent: {
        namespace: "talent"
    },
    CTalentProfile: {
        namespace: "talentprofile"
    },
    CTerrain: {
        namespace: "terrain"
    },
    CTerrainObject: {
        namespace: "terrainobject"
    },
    CTerrainTex: {
        namespace: "terraintex"
    },
    CTile: {
        namespace: "tile"
    },
    CVoiceOver: {
        namespace: "voiceover"
    },
    CVoicePack: {
        namespace: "voicepack"
    },
    CWater: {
        namespace: "water"
    },
    CBeamAsyncLinear: {
        namespace: "beam"
    },
    CCommander: {
        namespace: "commander"
    },
    CDataCollection: {
        namespace: "datacollection"
    },
    CDataCollectionAbil: {
        parent: "CDataCollection"
    },
    CDataCollectionUnit: {
        parent: "CDataCollection"
    },
    CDataCollectionUpgrade: {
        parent: "CDataCollection"
    },
    CDataCollectionPattern: {
        namespace: "datacollectionpattern"
    },
    CTexture: {
        namespace: "texture"
    },
    CTextureSheet: {
        namespace: "texturesheet"
    },
    CItem: {
        namespace: "item"
    },
    CItemAbil: {
        parent: "CItem"
    },
    CItemEffect: {
        parent: "CItem"
    },
    CItemEffectInstant: {
        parent: "CItem"
    },
    CItemEffectTarget: {
        parent: "CItem"
    },
    CItemClass: {
        namespace: "itemclass"
    },
    CItemContainer: {
        namespace: "itemcontainer"
    },
    CLoot: {
        namespace: "loot"
    },
    CLootEffect: {
        parent: "CLoot"
    },
    CLootItem: {
        parent: "CLoot"
    },
    CLootSet: {
        parent: "CLoot"
    },
    CLootSpawn: {
        parent: "CLoot"
    },
    CLootUnit: {
        parent: "CLoot"
    },
    CUser: {
        namespace: "user"
    },
    CAbil: {
        namespace: "abil"
    },
    CAbilArmMagazine: {
        parent: "CAbil"
    },
    CAbilAttack: {
        parent: "CAbil"
    },
    CAbilAttackModifier: {
        parent: "CAbil"
    },
    CAbilAugment: {
        parent: "CAbil"
    },
    CAbilBattery: {
        parent: "CAbil"
    },
    CAbilBeacon: {
        parent: "CAbil"
    },
    CAbilBehavior: {
        parent: "CAbil"
    },
    CAbilBuild: {
        parent: "CAbil"
    },
    CAbilBuildable: {
        parent: "CAbil"
    },
    CAbilHarvest: {
        parent: "CAbil"
    },
    CAbilInteract: {
        parent: "CAbil"
    },
    CAbilInventory: {
        parent: "CAbil"
    },
    CAbilLearn: {
        parent: "CAbil"
    },
    CAbilMerge: {
        parent: "CAbil"
    },
    CAbilMergeable: {
        parent: "CAbil"
    },
    CAbilMorph: {
        parent: "CAbil"
    },
    CAbilMorphPlacement: {
        parent: "CAbil"
    },
    CAbilMove: {
        parent: "CAbil"
    },
    CAbilPawn: {
        parent: "CAbil"
    },
    CAbilProgress: {
        parent: "CAbil"
    },
    CAbilQueue: {
        parent: "CAbil"
    },
    CAbilQueueable: {
        parent: "CAbil"
    },
    CAbilRally: {
        parent: "CAbil"
    },
    CAbilRedirect: {
        parent: "CAbil"
    },
    CAbilRedirectInstant: {
        parent: "CAbil"
    },
    CAbilRedirectTarget: {
        parent: "CAbil"
    },
    CAbilResearch: {
        parent: "CAbil"
    },
    CAbilRevive: {
        parent: "CAbil"
    },
    CAbilSpecialize: {
        parent: "CAbil"
    },
    CAbilStop: {
        parent: "CAbil"
    },
    CAbilTrain: {
        parent: "CAbil"
    },
    CAbilTransport: {
        parent: "CAbil"
    },
    CAbilWarpTrain: {
        parent: "CAbil"
    },
    CAbilWarpable: {
        parent: "CAbil"
    },
    CAbilEffect: {
        parent: "CAbil"
    },
    CAbilEffectInstant: {
        parent: "CAbilEffect"
    },
    CAbilEffectTarget: {
        parent: "CAbilEffect"
    },
    CAccumulator: {
        namespace: "accumulator"
    },
    CAccumulatorConstant: {
        parent: "CAccumulator"
    },
    CAccumulatorAbilLevel: {
        parent: "CAccumulator"
    },
    CAccumulatorArithmetic: {
        parent: "CAccumulator"
    },
    CAccumulatorAttributePoints: {
        parent: "CAccumulator"
    },
    CAccumulatorBehavior: {
        parent: "CAccumulator"
    },
    CAccumulatorCargo: {
        parent: "CAccumulator"
    },
    CAccumulatorDistance: {
        parent: "CAccumulator"
    },
    CAccumulatorEffectAmount: {
        parent: "CAccumulator"
    },
    CAccumulatorSwitch: {
        parent: "CAccumulator"
    },
    CAccumulatorUnitCustomValue: {
        parent: "CAccumulator"
    },
    CAccumulatorUserData: {
        parent: "CAccumulator"
    },
    CAccumulatorVitals: {
        parent: "CAccumulator"
    },
    CActor: {
        namespace: "actor"
    },
    CActorAction: {
        parent: "CActor"
    },
    CActorActionOverride: {
        parent: "CActor"
    },
    CActorArc: {
        parent: "CActor"
    },
    CActorBase: {
        parent: "CActor"
    },
    CActorBatch: {
        parent: "CActor"
    },
    CActorBeamStandard: {
        parent: "CActor"
    },
    CActorBearings: {
        parent: "CActor"
    },
    CActorCamera: {
        parent: "CActor"
    },
    CActorCameraModel: {
        parent: "CActor"
    },
    CActorCreep: {
        parent: "CActor"
    },
    CActorCutscene: {
        parent: "CActor"
    },
    CActorDoodad: {
        parent: "CActor"
    },
    CActorDoodadPreserver: {
        parent: "CActor"
    },
    CActorEditorCamera: {
        parent: "CActor"
    },
    CActorEventMacro: {
        parent: "CActor"
    },
    CActorFoliageFXSpawner: {
        parent: "CActor"
    },
    CActorForce: {
        parent: "CActor"
    },
    CActorForceBox: {
        parent: "CActor"
    },
    CActorForceConeRoundedEnd: {
        parent: "CActor"
    },
    CActorForceCylinder: {
        parent: "CActor"
    },
    CActorForceSphere: {
        parent: "CActor"
    },
    CActorGlobalConfig: {
        parent: "CActor"
    },
    CActorLightModel: {
        parent: "CActor"
    },
    CActorLightOmni: {
        parent: "CActor"
    },
    CActorLightOmniModel: {
        parent: "CActor"
    },
    CActorLightSpot: {
        parent: "CActor"
    },
    CActorLightSpotModel: {
        parent: "CActor"
    },
    CActorList: {
        parent: "CActor"
    },
    CActorLookAt: {
        parent: "CActor"
    },
    CActorPortrait: {
        parent: "CActor"
    },
    CActorPower: {
        parent: "CActor"
    },
    CActorProgress: {
        parent: "CActor"
    },
    CActorPropertyCurveSet: {
        parent: "CActor"
    },
    CActorQuad: {
        parent: "CActor"
    },
    CActorQueryResponse: {
        parent: "CActor"
    },
    CActorRange: {
        parent: "CActor"
    },
    CActorScene: {
        parent: "CActor"
    },
    CActorSelection: {
        parent: "CActor"
    },
    CActorSetQueried: {
        parent: "CActor"
    },
    CActorShadow: {
        parent: "CActor"
    },
    CActorShield: {
        parent: "CActor"
    },
    CActorShieldImpact: {
        parent: "CActor"
    },
    CActorSimple: {
        parent: "CActor"
    },
    CActorSite: {
        parent: "CActor"
    },
    CActorSiteBillboard: {
        parent: "CActor"
    },
    CActorSiteMover: {
        parent: "CActor"
    },
    CActorSiteOp2DRotation: {
        parent: "CActor"
    },
    CActorSiteOpAction: {
        parent: "CActor"
    },
    CActorSiteOpAttach: {
        parent: "CActor"
    },
    CActorSiteOpAttachVolume: {
        parent: "CActor"
    },
    CActorSiteOpBanker: {
        parent: "CActor"
    },
    CActorSiteOpBankerUnit: {
        parent: "CActor"
    },
    CActorSiteOpBasic: {
        parent: "CActor"
    },
    CActorSiteOpCursor: {
        parent: "CActor"
    },
    CActorSiteOpDeathMotion: {
        parent: "CActor"
    },
    CActorSiteOpEffect: {
        parent: "CActor"
    },
    CActorSiteOpForward: {
        parent: "CActor"
    },
    CActorSiteOpGameCameraFollow: {
        parent: "CActor"
    },
    CActorSiteOpHeight: {
        parent: "CActor"
    },
    CActorSiteOpHigherOfTerrainAndWater: {
        parent: "CActor"
    },
    CActorSiteOpHostBearings: {
        parent: "CActor"
    },
    CActorSiteOpHostedOffset: {
        parent: "CActor"
    },
    CActorSiteOpIncoming: {
        parent: "CActor"
    },
    CActorSiteOpLocalOffset: {
        parent: "CActor"
    },
    CActorSiteOpOrbiter: {
        parent: "CActor"
    },
    CActorSiteOpPatch: {
        parent: "CActor"
    },
    CActorSiteOpPhysicsImpact: {
        parent: "CActor"
    },
    CActorSiteOpRandomPointInCircle: {
        parent: "CActor"
    },
    CActorSiteOpRandomPointInCrossbar: {
        parent: "CActor"
    },
    CActorSiteOpRandomPointInSphere: {
        parent: "CActor"
    },
    CActorSiteOpRotationExplicit: {
        parent: "CActor"
    },
    CActorSiteOpRotationRandom: {
        parent: "CActor"
    },
    CActorSiteOpRotationSmooth: {
        parent: "CActor"
    },
    CActorSiteOpRotationVariancer: {
        parent: "CActor"
    },
    CActorSiteOpRotator: {
        parent: "CActor"
    },
    CActorSiteOpSelectionOffset: {
        parent: "CActor"
    },
    CActorSiteOpSerpentHead: {
        parent: "CActor"
    },
    CActorSiteOpSerpentSegment: {
        parent: "CActor"
    },
    CActorSiteOpShadow: {
        parent: "CActor"
    },
    CActorSiteOpTilter: {
        parent: "CActor"
    },
    CActorSiteOpTipability: {
        parent: "CActor"
    },
    CActorSiteOpUp: {
        parent: "CActor"
    },
    CActorSiteOpZ: {
        parent: "CActor"
    },
    CActorSiteOrbiter: {
        parent: "CActor"
    },
    CActorSiteRocker: {
        parent: "CActor"
    },
    CActorSnapshot: {
        parent: "CActor"
    },
    CActorSound: {
        parent: "CActor"
    },
    CActorSplat: {
        parent: "CActor"
    },
    CActorSquib: {
        parent: "CActor"
    },
    CActorStateMonitor: {
        parent: "CActor"
    },
    CActorTerrain: {
        parent: "CActor"
    },
    CActorTerrainDeformer: {
        parent: "CActor"
    },
    CActorText: {
        parent: "CActor"
    },
    CActorTurret: {
        parent: "CActor"
    },
    CActorModel: {
        parent: "CActor"
    },
    CActorModelMaterial: {
        parent: "CActorModel"
    },
    CActorEditorPoint: {
        parent: "CActorModel"
    },
    CActorBeamSimple: {
        parent: "CActorModel"
    },
    CActorUnit: {
        parent: "CActor"
    },
    CActorMissile: {
        parent: "CActorUnit"
    },
    CActorRegion: {
        parent: "CActor"
    },
    CActorRegionArc: {
        parent: "CActorRegion"
    },
    CActorRegionCircle: {
        parent: "CActorRegion"
    },
    CActorRegionGame: {
        parent: "CActorRegion"
    },
    CActorRegionQuad: {
        parent: "CActorRegion"
    },
    CActorRegionWater: {
        parent: "CActorRegion"
    },
    CAttachMethod: {
        namespace: "attachmethod"
    },
    CAttachMethodArcTest: {
        parent: "CAttachMethod"
    },
    CAttachMethodAttachType: {
        parent: "CAttachMethod"
    },
    CAttachMethodBestMatch: {
        parent: "CAttachMethod"
    },
    CAttachMethodFilter: {
        parent: "CAttachMethod"
    },
    CAttachMethodIncoming: {
        parent: "CAttachMethod"
    },
    CAttachMethodNodeOccupancy: {
        parent: "CAttachMethod"
    },
    CAttachMethodNodeOccupancy2: {
        parent: "CAttachMethod"
    },
    CAttachMethodNumericField: {
        parent: "CAttachMethod"
    },
    CAttachMethodPattern: {
        parent: "CAttachMethod"
    },
    CAttachMethodPortAllocator: {
        parent: "CAttachMethod"
    },
    CAttachMethodProximity: {
        parent: "CAttachMethod"
    },
    CAttachMethodRandom: {
        parent: "CAttachMethod"
    },
    CAttachMethodReduction: {
        parent: "CAttachMethod"
    },
    CAttachMethodVolumesRequery: {
        parent: "CAttachMethod"
    },
    CAttachMethodVolumesTargets: {
        parent: "CAttachMethod"
    },
    CAttachMethodVolumesWeightedPick: {
        parent: "CAttachMethod"
    },
    CBehavior: {
        namespace: "behavior"
    },
    CBehaviorAttackModifier: {
        parent: "CBehavior"
    },
    CBehaviorAttribute: {
        parent: "CBehavior"
    },
    CBehaviorBuff: {
        parent: "CBehavior"
    },
    CBehaviorClickResponse: {
        parent: "CBehavior"
    },
    CBehaviorConjoined: {
        parent: "CBehavior"
    },
    CBehaviorCreepSource: {
        parent: "CBehavior"
    },
    CBehaviorJump: {
        parent: "CBehavior"
    },
    CBehaviorPowerSource: {
        parent: "CBehavior"
    },
    CBehaviorPowerUser: {
        parent: "CBehavior"
    },
    CBehaviorResource: {
        parent: "CBehavior"
    },
    CBehaviorReveal: {
        parent: "CBehavior"
    },
    CBehaviorSpawn: {
        parent: "CBehavior"
    },
    CBehaviorUnitTracker: {
        parent: "CBehavior"
    },
    CBehaviorVeterancy: {
        parent: "CBehavior"
    },
    CBehaviorWander: {
        parent: "CBehavior"
    },
    CButton: {
        namespace: "button"
    },
    CCursor: {
        namespace: "cursor"
    },
    CEffect: {
        namespace: "effect"
    },
    CEffectAddTrackedUnit: {
        parent: "CEffect"
    },
    CEffectApplyBehavior: {
        parent: "CEffect"
    },
    CEffectApplyForce: {
        parent: "CEffect"
    },
    CEffectApplyKinetic: {
        parent: "CEffect"
    },
    CEffectCancelOrder: {
        parent: "CEffect"
    },
    CEffectCreateHealer: {
        parent: "CEffect"
    },
    CEffectCreatePersistent: {
        parent: "CEffect"
    },
    CEffectCreateUnit: {
        parent: "CEffect"
    },
    CEffectCreep: {
        parent: "CEffect"
    },
    CEffectDamage: {
        parent: "CEffect"
    },
    CEffectDestroyPersistent: {
        parent: "CEffect"
    },
    CEffectEnumArea: {
        parent: "CEffect"
    },
    CEffectEnumMagazine: {
        parent: "CEffect"
    },
    CEffectEnumTransport: {
        parent: "CEffect"
    },
    CEffectIssueOrder: {
        parent: "CEffect"
    },
    CEffectLastTarget: {
        parent: "CEffect"
    },
    CEffectLaunchMissile: {
        parent: "CEffect"
    },
    CEffectLoadContainer: {
        parent: "CEffect"
    },
    CEffectModifyPlayer: {
        parent: "CEffect"
    },
    CEffectModifyUnit: {
        parent: "CEffect"
    },
    CEffectRandomPointInCircle: {
        parent: "CEffect"
    },
    CEffectRedirectMissile: {
        parent: "CEffect"
    },
    CEffectReleaseMagazine: {
        parent: "CEffect"
    },
    CEffectRemoveBehavior: {
        parent: "CEffect"
    },
    CEffectRemoveKinetic: {
        parent: "CEffect"
    },
    CEffectReturnMagazine: {
        parent: "CEffect"
    },
    CEffectSet: {
        parent: "CEffect"
    },
    CEffectSwitch: {
        parent: "CEffect"
    },
    CEffectTeleport: {
        parent: "CEffect"
    },
    CEffectTransferBehavior: {
        parent: "CEffect"
    },
    CEffectUseCalldown: {
        parent: "CEffect"
    },
    CEffectUseMagazine: {
        parent: "CEffect"
    },
    CEffectUserData: {
        parent: "CEffect"
    },
    CFootprint: {
        namespace: "footprint"
    },
    CKinetic: {
        namespace: "kinetic"
    },
    CKineticDistance: {
        parent: "CKinetic"
    },
    CKineticFollow: {
        parent: "CKinetic"
    },
    CKineticRotate: {
        parent: "CKinetic"
    },
    CKineticSequence: {
        parent: "CKinetic"
    },
    CKineticSet: {
        parent: "CKinetic"
    },
    CKineticTranslate: {
        parent: "CKinetic"
    },
    CLight: {
        namespace: "light"
    },
    CModel: {
        namespace: "model"
    },
    CModelFoliage: {
        parent: "CModel"
    },
    CMover: {
        namespace: "mover"
    },
    CMoverAvoid: {
        parent: "CMover"
    },
    CMoverFlock: {
        parent: "CMover"
    },
    CMoverMissile: {
        parent: "CMover"
    },
    CRace: {
        namespace: "race"
    },
    CRequirement: {
        namespace: "requirement"
    },
    CRequirementAllowAbil: {
        namespace: "requirementnode"
    },
    CRequirementAllowBehavior: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementAllowUnit: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementAllowUpgrade: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementAnd: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementConst: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementCountAbil: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementCountBehavior: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementCountUnit: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementCountUpgrade: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementDiv: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementEq: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementGT: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementGTE: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementLT: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementLTE: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementMod: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementMul: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementNE: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementNode: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementNot: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementOdd: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementOr: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementSum: {
        parent: "CRequirementAllowAbil"
    },
    CRequirementXor: {
        parent: "CRequirementAllowAbil"
    },
    CShape: {
        namespace: "shape"
    },
    CShapeArc: {
        parent: "CShape"
    },
    CShapeQuad: {
        parent: "CShape"
    },
    CSkin: {
        namespace: "skin"
    },
    CSound: {
        namespace: "sound"
    },
    CTacCooldown: {
        namespace: "taccooldown"
    },
    CTactical: {
        namespace: "tactical"
    },
    CTacticalOrder: {
        parent: "CTactical"
    },
    CTacticalSet: {
        parent: "CTactical"
    },
    CTargetFind: {
        namespace: "targetfind"
    },
    CTargetFindBestPoint: {
        parent: "CTargetFind"
    },
    CTargetFindEffect: {
        parent: "CTargetFind"
    },
    CTargetFindEnumArea: {
        parent: "CTargetFind"
    },
    CTargetFindLastAttacker: {
        parent: "CTargetFind"
    },
    CTargetFindOffset: {
        parent: "CTargetFind"
    },
    CTargetFindOrder: {
        parent: "CTargetFind"
    },
    CTargetFindRallyPoint: {
        parent: "CTargetFind"
    },
    CTargetFindSet: {
        parent: "CTargetFind"
    },
    CTargetFindWorkerRallyPoint: {
        parent: "CTargetFind"
    },
    CTargetSort: {
        namespace: "targetsort"
    },
    CTargetSortValidator: {
        parent: "CTargetSort"
    },
    CTargetSortField: {
        parent: "CTargetSort"
    },
    CTargetSortAlliance: {
        parent: "CTargetSort"
    },
    CTargetSortAngle: {
        parent: "CTargetSort"
    },
    CTargetSortBehaviorCount: {
        parent: "CTargetSort"
    },
    CTargetSortChargeCount: {
        parent: "CTargetSort"
    },
    CTargetSortChargeRegen: {
        parent: "CTargetSort"
    },
    CTargetSortCooldown: {
        parent: "CTargetSort"
    },
    CTargetSortDistance: {
        parent: "CTargetSort"
    },
    CTargetSortInterruptible: {
        parent: "CTargetSort"
    },
    CTargetSortMarker: {
        parent: "CTargetSort"
    },
    CTargetSortPowerSourceLevel: {
        parent: "CTargetSort"
    },
    CTargetSortPowerUserLevel: {
        parent: "CTargetSort"
    },
    CTargetSortPriority: {
        parent: "CTargetSort"
    },
    CTargetSortRandom: {
        parent: "CTargetSort"
    },
    CTargetSortVital: {
        parent: "CTargetSort"
    },
    CTargetSortVitalFraction: {
        parent: "CTargetSort"
    },
    CTurret: {
        namespace: "turret"
    },
    CUnit: {
        namespace: "unit"
    },
    CUpgrade: {
        namespace: "upgrade"
    },
    CValidator: {
        namespace: "validator"
    },
    CValidatorUnitCompareCooldown: {
        parent: "CValidator"
    },
    CValidatorCombine: {
        parent: "CValidator"
    },
    CValidatorCondition: {
        parent: "CValidator"
    },
    CValidatorEffect: {
        parent: "CValidator"
    },
    CValidatorEffectCompareDodged: {
        parent: "CValidator"
    },
    CValidatorEffectCompareEvaded: {
        parent: "CValidator"
    },
    CValidatorEffectTreeUserData: {
        parent: "CValidator"
    },
    CValidatorFunction: {
        parent: "CValidator"
    },
    CValidatorGameCommanderActive: {
        parent: "CValidator"
    },
    CValidatorGameCompareTerrain: {
        parent: "CValidator"
    },
    CValidatorGameCompareTimeEvent: {
        parent: "CValidator"
    },
    CValidatorGameCompareTimeOfDay: {
        parent: "CValidator"
    },
    CValidatorLocation: {
        parent: "CValidator"
    },
    CValidatorLocationArc: {
        parent: "CValidator"
    },
    CValidatorLocationCompareCliffLevel: {
        parent: "CValidator"
    },
    CValidatorLocationComparePower: {
        parent: "CValidator"
    },
    CValidatorLocationCompareRange: {
        parent: "CValidator"
    },
    CValidatorLocationCreep: {
        parent: "CValidator"
    },
    CValidatorLocationCrossChasm: {
        parent: "CValidator"
    },
    CValidatorLocationCrossCliff: {
        parent: "CValidator"
    },
    CValidatorLocationEnumArea: {
        parent: "CValidator"
    },
    CValidatorLocationInPlayableMapArea: {
        parent: "CValidator"
    },
    CValidatorLocationPathable: {
        parent: "CValidator"
    },
    CValidatorLocationPlacement: {
        parent: "CValidator"
    },
    CValidatorLocationShrub: {
        parent: "CValidator"
    },
    CValidatorLocationType: {
        parent: "CValidator"
    },
    CValidatorLocationVision: {
        parent: "CValidator"
    },
    CValidatorPlayer: {
        parent: "CValidator"
    },
    CValidatorPlayerAlliance: {
        parent: "CValidator"
    },
    CValidatorPlayerCompareDifficulty: {
        parent: "CValidator"
    },
    CValidatorPlayerCompareFoodAvailable: {
        parent: "CValidator"
    },
    CValidatorPlayerCompareFoodUsed: {
        parent: "CValidator"
    },
    CValidatorPlayerCompareRace: {
        parent: "CValidator"
    },
    CValidatorPlayerCompareResource: {
        parent: "CValidator"
    },
    CValidatorPlayerCompareResult: {
        parent: "CValidator"
    },
    CValidatorPlayerCompareType: {
        parent: "CValidator"
    },
    CValidatorPlayerFood: {
        parent: "CValidator"
    },
    CValidatorPlayerRequirement: {
        parent: "CValidator"
    },
    CValidatorUnit: {
        parent: "CValidator"
    },
    CValidatorUnitAI: {
        parent: "CValidator"
    },
    CValidatorUnitAbil: {
        parent: "CValidator"
    },
    CValidatorUnitAlliance: {
        parent: "CValidator"
    },
    CValidatorUnitBehaviorStackAlias: {
        parent: "CValidator"
    },
    CValidatorUnitBehaviorState: {
        parent: "CValidator"
    },
    CValidatorUnitCombatAI: {
        parent: "CValidator"
    },
    CValidatorUnitCompareAIAreaEvalRatio: {
        parent: "CValidator"
    },
    CValidatorUnitCompareAbilSkillPoint: {
        parent: "CValidator"
    },
    CValidatorUnitCompareAttackPriority: {
        parent: "CValidator"
    },
    CValidatorUnitCompareBehaviorCount: {
        parent: "CValidator"
    },
    CValidatorUnitCompareCargo: {
        parent: "CValidator"
    },
    CValidatorUnitCompareChargeUsed: {
        parent: "CValidator"
    },
    CValidatorUnitCompareDamageDealtTime: {
        parent: "CValidator"
    },
    CValidatorUnitCompareDamageTakenTime: {
        parent: "CValidator"
    },
    CValidatorUnitCompareDeath: {
        parent: "CValidator"
    },
    CValidatorUnitCompareField: {
        parent: "CValidator"
    },
    CValidatorUnitCompareHeight: {
        parent: "CValidator"
    },
    CValidatorUnitCompareKillCount: {
        parent: "CValidator"
    },
    CValidatorUnitCompareMarkerCount: {
        parent: "CValidator"
    },
    CValidatorUnitCompareMoverPhase: {
        parent: "CValidator"
    },
    CValidatorUnitCompareOrderCount: {
        parent: "CValidator"
    },
    CValidatorUnitCompareOrderTargetRange: {
        parent: "CValidator"
    },
    CValidatorUnitComparePowerSourceLevel: {
        parent: "CValidator"
    },
    CValidatorUnitComparePowerUserLevel: {
        parent: "CValidator"
    },
    CValidatorUnitCompareRallyPointCount: {
        parent: "CValidator"
    },
    CValidatorUnitCompareResourceContents: {
        parent: "CValidator"
    },
    CValidatorUnitCompareResourceHarvesters: {
        parent: "CValidator"
    },
    CValidatorUnitCompareSpeed: {
        parent: "CValidator"
    },
    CValidatorUnitCompareVeterancyLevel: {
        parent: "CValidator"
    },
    CValidatorUnitCompareVital: {
        parent: "CValidator"
    },
    CValidatorUnitCompareVitality: {
        parent: "CValidator"
    },
    CValidatorUnitDetected: {
        parent: "CValidator"
    },
    CValidatorUnitFilters: {
        parent: "CValidator"
    },
    CValidatorUnitFlying: {
        parent: "CValidator"
    },
    CValidatorUnitInWeaponRange: {
        parent: "CValidator"
    },
    CValidatorUnitInventory: {
        parent: "CValidator"
    },
    CValidatorUnitInventoryContainsItem: {
        parent: "CValidator"
    },
    CValidatorUnitInventoryIsFull: {
        parent: "CValidator"
    },
    CValidatorUnitKinetic: {
        parent: "CValidator"
    },
    CValidatorUnitLastDamagePlayer: {
        parent: "CValidator"
    },
    CValidatorUnitMissileNullified: {
        parent: "CValidator"
    },
    CValidatorUnitMover: {
        parent: "CValidator"
    },
    CValidatorUnitOrder: {
        parent: "CValidator"
    },
    CValidatorUnitOrderQueue: {
        parent: "CValidator"
    },
    CValidatorUnitOrderTargetPathable: {
        parent: "CValidator"
    },
    CValidatorUnitOrderTargetType: {
        parent: "CValidator"
    },
    CValidatorUnitPathable: {
        parent: "CValidator"
    },
    CValidatorUnitPathing: {
        parent: "CValidator"
    },
    CValidatorUnitScanning: {
        parent: "CValidator"
    },
    CValidatorUnitState: {
        parent: "CValidator"
    },
    CValidatorUnitTestWeaponType: {
        parent: "CValidator"
    },
    CValidatorUnitType: {
        parent: "CValidator"
    },
    CValidatorUnitWeaponAnimating: {
        parent: "CValidator"
    },
    CValidatorUnitWeaponFiring: {
        parent: "CValidator"
    },
    CValidatorUnitWeaponPlane: {
        parent: "CValidator"
    },
    CWeapon: {
        namespace: "weapon"
    },
    CWeaponLegacy: {
        parent: "CWeapon"
    },
    CWeaponStrafe: {
        parent: "CWeapon"
    }
}



const mod = new SCMod()
mod.directory('../../data-input')
await mod.read('0.Core','1.Liberty','2.Liberty Campaign','4.Swarm','5.Swarm Campaign','7.Void','8.Void Campaign')

mod.directory('../../../Mods/all-races-mods')
await mod.read('VoidBalance','Campaign','Scion','UED','Hybrids','Dragons','UPL','UPLCampaign','UPLBalance')

mod.directory('../../../Mods/all-races-core')
await mod.read('Core')


let schema1 = await makeSchema({
    group: 'catalog',
    path: '*',
    mod
})
fs.writeFileSync("./input/schema.json", JSON.stringify(schema1, null,"  "))

let schema2 = makeSchema({
    group: 'class',
    path: 'CAbil*.InfoArray.index',
    files: [
        "./input/Core.SC2Mod",
        "./input/Liberty.SC2Mod",
        "./input/Swarm.SC2Mod",
        "./input/Void.SC2Mod"
    ]
})