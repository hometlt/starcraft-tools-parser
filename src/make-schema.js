
function makeCoreSchema(){
  let namespaces = {
    // "sss": [
    //     "SCameraSmooth",
    //     "SCommanderDifficultyLevel",
    //     "SCommanderMasteryTalent",
    //     "SCommanderTalentTree",
    //     "SConversationAction",
    //     "SConversationCondition",
    //     "SConversationFacialAnim",
    //     "SConversationGroup",
    //     "SConversationLine",
    //     "SCost",
    //     "SDeathResponse",
    //     "SLightInfo",
    //     "SMarker",
    //     "SModification",
    //     "SSoundAsset",
    //     "SSoundData",
    //     "SSpawnInfo",
    //     "SAbil",
    //         "SAbilArmMagazineInfo", "SAbilCmdButton", "SAbilMorphInfo",
    //     "SBehavior",
    //         "SBehaviorDuration", "SBehaviorFraction",
    // ],
    "achievement": [
      "CAchievement"
    ],
    "achievementterm": [
      "CAchievementTerm",
      "CAchievementTermAbilInteract", "CAchievementTermAbilLoad", "CAchievementTermAbilUse", "CAchievementTermAchievement", "CAchievementTermBehaviorCount", "CAchievementTermBehaviorState", "CAchievementTermCombine", "CAchievementTermEffectAbsorbed", "CAchievementTermEffectDamaged", "CAchievementTermEffectDodged", "CAchievementTermEffectHealed", "CAchievementTermEffectKilled", "CAchievementTermEffectUse", "CAchievementTermGeneric", "CAchievementTermReplay", "CAchievementTermScoreValue", "CAchievementTermTime", "CAchievementTermUnitBirth", "CAchievementTermUnitDeath", "CAchievementTermUnitKills", "CAchievementTermUnitRegen", "CAchievementTermUnitSupplyLoss"
    ],
    "alert": [
      "CAlert"
    ],
    "armycategory": [
      "CArmyCategory"
    ],
    "armyunit": [
      "CArmyUnit"
    ],
    "armyupgrade": [
      "CArmyUpgrade"
    ],
    "artifact": [
      "CArtifact"
    ],
    "artifactslot": [
      "CArtifactSlot"
    ],
    "bankcondition": [
      "CBankConditionCompare",
      "CBankConditionCompareValueCount","CBankConditionCompareValueSum"
    ],
    "boost": [
      "CBoost"
    ],
    "bundle": [
      "CBundle"
    ],
    "camera": [
      "CCamera"
    ],
    "campaign": [
      "CCampaign"
    ],
    "character": [
      "CCharacter"
    ],
    "cliff": [
      "CCliff",
      "CCliffDoodad"
    ],
    "cliffmesh": [
      "CCliffMesh"
    ],
    "colorstyle": [
      "CColorStyle"
    ],
    "conversation": [
      "CConversation"
    ],
    "conversationstate": [
      "CConversationState"
    ],
    "config": [
      "CConfig"
    ],
    "consoleskin": [
      "CConsoleSkin"
    ],
    "gameui": [
      "CGameUI"
    ],
    "location": [
      "CLocation"
    ],
    "map": [
      "CMap"
    ],
    "objective": [
      "CObjective"
    ],
    "premiummap": [
      "CPremiumMap"
    ],
    "racebannerpack": [
      "CRaceBannerPack"
    ],
    "reward": [
      "CReward",
      "CRewardConsoleSkin", "CRewardDecal", "CRewardEmoticon", "CRewardIcon", "CRewardModel", "CRewardPoints", "CRewardPortrait", "CRewardPortraitInGame", "CRewardRaceBanner", "CRewardSpray", "CRewardSprayUseDecal", "CRewardTrophy", "CRewardVoicePack"
    ],
    "stimpack": [
      "CStimPack"
    ],
    "trophy": [
      "CTrophy"
    ],
    "warchest": [
      "CWarChest"
    ],
    "warchestseason": [
      "CWarChestSeason"
    ],
    "dsp": [
      "CDSPChorus", "CDSPCompressor", "CDSPCustomCompressor", "CDSPDistortion", "CDSPEcho", "CDSPFlange", "CDSPHighPass", "CDSPLimiter", "CDSPLowPass", "CDSPLowPassSimple", "CDSPNormalize", "CDSPParamEQ", "CDSPPitchShift", "CDSPReverb"
    ],
    "decalpack": ["CDecalPack",],
    "emoticon": ["CEmoticon",],
    "emoticonpack": ["CEmoticonPack",],
    "fow": [    "CFoW",],
    "game": [    "CGame",],
    "herd": [    "CHerd",],
    "herdnode": [    "CHerdNode",],
    "hero": [    "CHero",],
    "heroabil": [    "CHeroAbil",],
    "herostat": [    "CHeroStat",],
    "lensflareset": [    "CLensFlareSet",],
    "mount": [    "CMount",],
    "physicsmaterial": [    "CPhysicsMaterial",],
    "ping": [    "CPing",],
    "playerresponse": [    "CPlayerResponse", "CPlayerResponseUnit", "CPlayerResponseUnitBirth", "CPlayerResponseUnitDamage", "CPlayerResponseUnitDeath",],
    "portraitpack": [    "CPortraitPack",],
    "preload": [    "CPreload", "CPreloadActor", "CPreloadConversation", "CPreloadModel", "CPreloadSound", "CPreloadUnit",],
    "reverb": [    "CReverb",],
    "scoreresult": [    "CScoreResult", "CScoreResultBuildOrder", "CScoreResultExperience", "CScoreResultGraph", "CScoreResultPerformance", "CScoreResultRoot", "CScoreResultScore",],
    "scorevalue": [
      "CScoreValue", "CScoreValueStandard",
      "CScoreValueCombine",
      "CScoreValueCustom"
    ],
    "skinpack": [    "CSkinPack",],
    "soundexclusivity": [    "CSoundExclusivity",],
    "soundmixsnapshot": [    "CSoundMixSnapshot",],
    "soundtrack": [    "CSoundtrack",],
    "spray": [    "CSpray",],
    "spraypack": [    "CSprayPack",],
    "talent": [    "CTalent",],
    "talentprofile": [    "CTalentProfile",],
    "terrain": [    "CTerrain",],
    "terrainobject": [    "CTerrainObject",],
    "terraintex": [    "CTerrainTex",],
    "tile": [    "CTile",],
    "voiceover": [ "CVoiceOver",],
    "voicepack": [ "CVoicePack",],
    "water": [ "CWater",],
    "beam": [ "CBeamAsyncLinear"],
    "commander": [
      "CCommander"
    ],




    "datacollection": [ "CDataCollection", "CDataCollectionAbil", "CDataCollectionUnit", "CDataCollectionUpgrade",],
    "datacollectionpattern": ["CDataCollectionPattern",],
    "texture": [    "CTexture",],
    "texturesheet": [    "CTextureSheet",],
    "item": [
      "CItem",
      "CItemAbil", "CItemEffect", "CItemEffectInstant", "CItemEffectTarget"
    ],
    "itemclass": [
      "CItemClass"
    ],
    "itemcontainer": [
      "CItemContainer"
    ],
    "loot": [
      "CLoot",
      "CLootEffect", "CLootItem", "CLootSet", "CLootSpawn", "CLootUnit"
    ],
    "user": [
      "CUser"
    ],


    "abil": [
      "CAbil",
      "CAbilArmMagazine", "CAbilAttack", "CAbilAttackModifier", "CAbilAugment", "CAbilBattery", "CAbilBeacon", "CAbilBehavior", "CAbilBuild", "CAbilBuildable",              "CAbilHarvest", "CAbilInteract", "CAbilInventory", "CAbilLearn", "CAbilMerge", "CAbilMergeable", "CAbilMorph", "CAbilMorphPlacement", "CAbilMove", "CAbilPawn", "CAbilProgress", "CAbilQueue", "CAbilQueueable", "CAbilRally", "CAbilRedirect", "CAbilRedirectInstant", "CAbilRedirectTarget", "CAbilResearch", "CAbilRevive", "CAbilSpecialize", "CAbilStop", "CAbilTrain", "CAbilTransport", "CAbilWarpTrain", "CAbilWarpable",
      "CAbilEffect",
      "CAbilEffectInstant", "CAbilEffectTarget",
    ],
    "accumulator": [
      "CAccumulator",
      "CAccumulatorConstant","CAccumulatorAbilLevel", "CAccumulatorArithmetic", "CAccumulatorAttributePoints", "CAccumulatorBehavior", "CAccumulatorCargo", "CAccumulatorDistance", "CAccumulatorEffectAmount", "CAccumulatorSwitch", "CAccumulatorUnitCustomValue", "CAccumulatorUserData", "CAccumulatorVitals"
    ],
    "actor": [
      "CActor",
      "CActorAction", "CActorActionOverride", "CActorArc", "CActorBase", "CActorBatch", "CActorBeamStandard", "CActorBearings", "CActorCamera", "CActorCameraModel", "CActorCreep", "CActorCutscene", "CActorDoodad", "CActorDoodadPreserver", "CActorEditorCamera",  "CActorEventMacro", "CActorFoliageFXSpawner", "CActorForce", "CActorForceBox", "CActorForceConeRoundedEnd", "CActorForceCylinder", "CActorForceSphere", "CActorGlobalConfig", "CActorLightModel", "CActorLightOmni","CActorLightOmniModel","CActorLightSpot","CActorLightSpotModel","CActorList","CActorLookAt", "CActorPortrait","CActorPower","CActorProgress","CActorPropertyCurveSet","CActorQuad","CActorQueryResponse","CActorRange", "CActorScene","CActorSelection","CActorSetQueried","CActorShadow","CActorShield","CActorShieldImpact","CActorSimple","CActorSite","CActorSiteBillboard","CActorSiteMover","CActorSiteOp2DRotation","CActorSiteOpAction","CActorSiteOpAttach","CActorSiteOpAttachVolume","CActorSiteOpBanker","CActorSiteOpBankerUnit","CActorSiteOpBasic","CActorSiteOpCursor","CActorSiteOpDeathMotion","CActorSiteOpEffect","CActorSiteOpForward","CActorSiteOpGameCameraFollow","CActorSiteOpHeight","CActorSiteOpHigherOfTerrainAndWater","CActorSiteOpHostBearings","CActorSiteOpHostedOffset","CActorSiteOpIncoming","CActorSiteOpLocalOffset","CActorSiteOpOrbiter","CActorSiteOpPatch","CActorSiteOpPhysicsImpact","CActorSiteOpRandomPointInCircle","CActorSiteOpRandomPointInCrossbar","CActorSiteOpRandomPointInSphere","CActorSiteOpRotationExplicit","CActorSiteOpRotationRandom","CActorSiteOpRotationSmooth","CActorSiteOpRotationVariancer","CActorSiteOpRotator","CActorSiteOpSelectionOffset","CActorSiteOpSerpentHead","CActorSiteOpSerpentSegment","CActorSiteOpShadow","CActorSiteOpTilter","CActorSiteOpTipability","CActorSiteOpUp","CActorSiteOpZ","CActorSiteOrbiter","CActorSiteRocker","CActorSnapshot","CActorSound","CActorSplat","CActorSquib","CActorStateMonitor","CActorTerrain","CActorTerrainDeformer","CActorText","CActorTurret",
      "CActorModel",
      "CActorModelMaterial","CActorEditorPoint", "CActorBeamSimple",
      "CActorUnit",
      "CActorMissile",
      "CActorRegion",
      "CActorRegionArc","CActorRegionCircle","CActorRegionGame","CActorRegionQuad","CActorRegionWater"
    ],
    "attachmethod": [
      "CAttachMethod",
      "CAttachMethodArcTest","CAttachMethodAttachType","CAttachMethodBestMatch","CAttachMethodFilter","CAttachMethodIncoming","CAttachMethodNodeOccupancy","CAttachMethodNodeOccupancy2","CAttachMethodNumericField","CAttachMethodPattern","CAttachMethodPortAllocator","CAttachMethodProximity","CAttachMethodRandom","CAttachMethodReduction","CAttachMethodVolumesRequery","CAttachMethodVolumesTargets","CAttachMethodVolumesWeightedPick"
    ],
    "behavior": [
      "CBehavior","CBehaviorAttackModifier","CBehaviorAttribute","CBehaviorBuff","CBehaviorClickResponse","CBehaviorConjoined","CBehaviorCreepSource","CBehaviorJump","CBehaviorPowerSource","CBehaviorPowerUser","CBehaviorResource","CBehaviorReveal","CBehaviorSpawn","CBehaviorUnitTracker","CBehaviorVeterancy","CBehaviorWander"
    ],
    "button": [
      "CButton"
    ],
    "cursor": [
      "CCursor"
    ],
    "effect": [
      "CEffect",
      "CEffectAddTrackedUnit","CEffectApplyBehavior","CEffectApplyForce","CEffectApplyKinetic","CEffectCancelOrder","CEffectCreateHealer","CEffectCreatePersistent","CEffectCreateUnit","CEffectCreep","CEffectDamage","CEffectDestroyPersistent","CEffectEnumArea","CEffectEnumMagazine","CEffectEnumTransport","CEffectIssueOrder","CEffectLastTarget","CEffectLaunchMissile","CEffectLoadContainer","CEffectModifyPlayer","CEffectModifyUnit","CEffectRandomPointInCircle","CEffectRedirectMissile","CEffectReleaseMagazine","CEffectRemoveBehavior","CEffectRemoveKinetic","CEffectReturnMagazine","CEffectSet","CEffectSwitch","CEffectTeleport","CEffectTransferBehavior","CEffectUseCalldown","CEffectUseMagazine","CEffectUserData"
    ],
    "footprint": [
      "CFootprint"
    ],
    "kinetic": [
      "CKinetic",
      "CKineticDistance", "CKineticFollow", "CKineticRotate", "CKineticSequence", "CKineticSet", "CKineticTranslate",],
    "light": [
      "CLight"
    ],
    "model": [
      "CModel",
      "CModelFoliage"
    ],
    "mover": [
      "CMover",
      "CMoverAvoid", "CMoverFlock", "CMoverMissile"
    ],
    "race": [
      "CRace"
    ],
    "requirement": [
      "CRequirement"
    ],
    "requirementnode": [
      "CRequirementAllowAbil","CRequirementAllowBehavior","CRequirementAllowUnit","CRequirementAllowUpgrade","CRequirementAnd","CRequirementConst","CRequirementCountAbil","CRequirementCountBehavior","CRequirementCountUnit","CRequirementCountUpgrade","CRequirementDiv","CRequirementEq","CRequirementGT","CRequirementGTE","CRequirementLT","CRequirementLTE","CRequirementMod","CRequirementMul","CRequirementNE","CRequirementNode","CRequirementNot","CRequirementOdd","CRequirementOr","CRequirementSum","CRequirementXor"
    ],
    "shape": [
      "CShape",
      "CShapeArc", "CShapeQuad"
    ],
    "skin": [
      "CSkin"
    ],
    "sound": [
      "CSound"
    ],
    "taccooldown": [
      "CTacCooldown"
    ],
    "tactical": [
      "CTactical",
      "CTacticalOrder", "CTacticalSet"
    ],
    "targetfind": [
      "CTargetFind",
      "CTargetFindBestPoint","CTargetFindEffect","CTargetFindEnumArea","CTargetFindLastAttacker","CTargetFindOffset","CTargetFindOrder","CTargetFindRallyPoint","CTargetFindSet","CTargetFindWorkerRallyPoint"
    ],
    "targetsort": [
      "CTargetSort",
      "CTargetSortValidator","CTargetSortField", "CTargetSortAlliance","CTargetSortAngle","CTargetSortBehaviorCount","CTargetSortChargeCount","CTargetSortChargeRegen","CTargetSortCooldown","CTargetSortDistance","CTargetSortInterruptible","CTargetSortMarker","CTargetSortPowerSourceLevel","CTargetSortPowerUserLevel","CTargetSortPriority","CTargetSortRandom","CTargetSortVital","CTargetSortVitalFraction"
    ],
    "turret": [
      "CTurret"
    ],
    "unit": [
      "CUnit"
    ],
    "upgrade": [
      "CUpgrade"
    ],
    "validator": [
      "CValidator",
      "CValidatorUnitCompareCooldown","CValidatorCombine","CValidatorCondition","CValidatorEffect","CValidatorEffectCompareDodged","CValidatorEffectCompareEvaded","CValidatorEffectTreeUserData","CValidatorFunction","CValidatorGameCommanderActive","CValidatorGameCompareTerrain","CValidatorGameCompareTimeEvent","CValidatorGameCompareTimeOfDay","CValidatorLocation","CValidatorLocationArc","CValidatorLocationCompareCliffLevel","CValidatorLocationComparePower","CValidatorLocationCompareRange","CValidatorLocationCreep","CValidatorLocationCrossChasm","CValidatorLocationCrossCliff","CValidatorLocationEnumArea","CValidatorLocationInPlayableMapArea","CValidatorLocationPathable","CValidatorLocationPlacement","CValidatorLocationShrub","CValidatorLocationType","CValidatorLocationVision","CValidatorPlayer","CValidatorPlayerAlliance","CValidatorPlayerCompareDifficulty","CValidatorPlayerCompareFoodAvailable","CValidatorPlayerCompareFoodUsed","CValidatorPlayerCompareRace","CValidatorPlayerCompareResource","CValidatorPlayerCompareResult","CValidatorPlayerCompareType","CValidatorPlayerFood","CValidatorPlayerRequirement","CValidatorUnit","CValidatorUnitAI","CValidatorUnitAbil","CValidatorUnitAlliance","CValidatorUnitBehaviorStackAlias","CValidatorUnitBehaviorState","CValidatorUnitCombatAI","CValidatorUnitCompareAIAreaEvalRatio","CValidatorUnitCompareAbilSkillPoint","CValidatorUnitCompareAttackPriority","CValidatorUnitCompareBehaviorCount","CValidatorUnitCompareCargo","CValidatorUnitCompareChargeUsed","CValidatorUnitCompareDamageDealtTime","CValidatorUnitCompareDamageTakenTime","CValidatorUnitCompareDeath","CValidatorUnitCompareField","CValidatorUnitCompareHeight","CValidatorUnitCompareKillCount","CValidatorUnitCompareMarkerCount","CValidatorUnitCompareMoverPhase","CValidatorUnitCompareOrderCount","CValidatorUnitCompareOrderTargetRange","CValidatorUnitComparePowerSourceLevel","CValidatorUnitComparePowerUserLevel","CValidatorUnitCompareRallyPointCount","CValidatorUnitCompareResourceContents","CValidatorUnitCompareResourceHarvesters","CValidatorUnitCompareSpeed","CValidatorUnitCompareVeterancyLevel","CValidatorUnitCompareVital","CValidatorUnitCompareVitality","CValidatorUnitDetected","CValidatorUnitFilters","CValidatorUnitFlying","CValidatorUnitInWeaponRange","CValidatorUnitInventory","CValidatorUnitInventoryContainsItem","CValidatorUnitInventoryIsFull","CValidatorUnitKinetic","CValidatorUnitLastDamagePlayer","CValidatorUnitMissileNullified","CValidatorUnitMover","CValidatorUnitOrder","CValidatorUnitOrderQueue","CValidatorUnitOrderTargetPathable","CValidatorUnitOrderTargetType","CValidatorUnitPathable","CValidatorUnitPathing","CValidatorUnitScanning","CValidatorUnitState","CValidatorUnitTestWeaponType","CValidatorUnitType","CValidatorUnitWeaponAnimating","CValidatorUnitWeaponFiring","CValidatorUnitWeaponPlane",],
    "weapon": [
      "CWeapon",
      "CWeaponLegacy", "CWeaponStrafe"
    ],
  }

  let _cat = {
    "const": "const"
  }

  for(let fname in namespaces){
    for(let type of namespaces[fname]){
      _cat[type] = fname
    }
  }

  let classinfo = {
  }
  for(let namespace in namespaces){
    let prototype = namespaces[namespace][0]
    classinfo[prototype] = {namespace}

    for(let i= 1;i < namespaces[namespace].length ; i++){
      let classname = namespaces[namespace][i]
      classinfo[classname] = {prototype}
    }
  }

  classinfo.CAbilEffectInstant.prototype = "CAbilEffect"
  classinfo.CAbilEffectTarget.prototype = "CAbilEffect"

  classinfo.CActorRegionArc.prototype = "CActorRegion"
  classinfo.CActorRegionCircle.prototype = "CActorRegion"
  classinfo.CActorRegionQuad.prototype = "CActorRegion"
  classinfo.CActorRegionWater.prototype = "CActorRegion"
  classinfo.CActorRegionGame.prototype = "CActorRegion"

  classinfo.CActorMissile.prototype = "CActorUnit"

  classinfo.CScoreValueCombine.prototype = "CScoreValueCustom"

  classinfo.CActorEditorPoint.prototype = "CActorModel"
  classinfo.CActorBeamSimple.prototype = "CActorModel"
  classinfo.CActorModelMaterial.prototype = "CActorModel"


  return classinfo
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