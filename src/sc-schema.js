export const StarcraftSchema = {
  CAbil: {
    catalog: "abil"
  },
  CAbilArmMagazine: {
    prototype: "CAbil",
    InfoArray: [
      {
        index: "word"
      }
    ]
  },
  CAbilAttack: {
    prototype: "CAbil"
  },
  CAbilAttackModifier: {
    prototype: "CAbil"
  },
  CAbilAugment: {
    prototype: "CAbil"
  },
  CAbilBattery: {
    prototype: "CAbil"
  },
  CAbilBeacon: {
    prototype: "CAbil"
  },
  CAbilBehavior: {
    prototype: "CAbil"
  },
  CAbilBuild: {
    prototype: "CAbil",
    InfoArray: [
      {
        index: "word"
      }
    ]
  },
  CAbilBuildable: {
    prototype: "CAbil"
  },
  CAbilEffect: {
    prototype: "CAbil"
  },
  CAbilEffectInstant: {prototype: "CAbilEffect"},
  CAbilEffectTarget: {prototype: "CAbilEffect"},
  CAbilHarvest: {
    prototype: "CAbil"
  },
  CAbilInteract: {
    prototype: "CAbil"
  },
  CAbilInventory: {
    prototype: "CAbil"
  },
  CAbilLearn: {
    prototype: "CAbil",
    InfoArray: [
      {
        index: "word"
      }
    ]
  },
  CAbilMerge: {
    prototype: "CAbil"
  },
  CAbilMergeable: {
    prototype: "CAbil"
  },
  CAbilMorph: {
    prototype: "CAbil"
  },
  CAbilMorphPlacement: {
    prototype: "CAbil"
  },
  CAbilMove: {
    prototype: "CAbil"
  },
  CAbilPawn: {
    prototype: "CAbil",
    InfoArray: [
      {
        index: "word"
      }
    ]
  },
  CAbilProgress: {
    prototype: "CAbil"
  },
  CAbilQueue: {
    prototype: "CAbil"
  },
  CAbilQueueable: {
    prototype: "CAbil"
  },
  CAbilRally: {
    prototype: "CAbil"
  },
  CAbilRedirect: {
    prototype: "CAbil"
  },
  CAbilRedirectInstant: {
    prototype: "CAbil"
  },
  CAbilRedirectTarget: {
    prototype: "CAbil"
  },
  CAbilResearch: {
    prototype: "CAbil",
    InfoArray: [
      {
        index: "word"
      }
    ]
  },
  CAbilRevive: {
    prototype: "CAbil"
  },
  CAbilSpecialize: {
    prototype: "CAbil",
    InfoArray: [
      {
        index: "word"
      }
    ]
  },
  CAbilStop: {
    prototype: "CAbil"
  },
  CAbilTrain: {
    prototype: "CAbil",
    InfoArray: [
      {
        index: "word",
        Unit: "[unit]"
      }
    ]
  },
  CAbilTransport: {
    prototype: "CAbil"
  },
  CAbilWarpTrain: {
    prototype: "CAbil",
    InfoArray: [
      {
        index: "word"
      }
    ]
  },
  CAbilWarpable: {
    prototype: "CAbil"
  },
  CAccumulator: {
    catalog: "accumulator"
  },
  CAccumulatorConstant: {
    prototype: "CAccumulator"
  },
  CAccumulatorAbilLevel: {
    prototype: "CAccumulator"
  },
  CAccumulatorArithmetic: {
    prototype: "CAccumulator"
  },
  CAccumulatorAttributePoints: {
    prototype: "CAccumulator"
  },
  CAccumulatorBehavior: {
    prototype: "CAccumulator"
  },
  CAccumulatorCargo: {
    prototype: "CAccumulator"
  },
  CAccumulatorDistance: {
    prototype: "CAccumulator"
  },
  CAccumulatorEffectAmount: {
    prototype: "CAccumulator"
  },
  CAccumulatorSwitch: {
    prototype: "CAccumulator"
  },
  CAccumulatorUnitCustomValue: {
    prototype: "CAccumulator"
  },
  CAccumulatorUserData: {
    prototype: "CAccumulator"
  },
  CAccumulatorVitals: {
    prototype: "CAccumulator"
  },
  CAchievement: {
    catalog: "achievement"
  },
  CAchievementTerm: {
    catalog: "achievementterm"
  },
  CAchievementTermAbilInteract: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermAbilLoad: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermAbilUse: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermAchievement: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermBehaviorCount: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermBehaviorState: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermCombine: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermEffectAbsorbed: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermEffectDamaged: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermEffectDodged: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermEffectHealed: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermEffectKilled: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermEffectUse: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermGeneric: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermReplay: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermScoreValue: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermTime: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermUnitBirth: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermUnitDeath: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermUnitKills: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermUnitRegen: {
    prototype: "CAchievementTerm"
  },
  CAchievementTermUnitSupplyLoss: {
    prototype: "CAchievementTerm"
  },
  CActor: {
    catalog: "actor"
  },
  CActorAction: {
    prototype: "CActor"
  },
  CActorActionOverride: {
    prototype: "CActor"
  },
  CActorArc: {
    prototype: "CActor"
  },
  CActorBase: {
    prototype: "CActor"
  },
  CActorBatch: {
    prototype: "CActor"
  },
  CActorBeamStandard: {
    prototype: "CActor"
  },
  CActorBearings: {
    prototype: "CActor"
  },
  CActorCamera: {
    prototype: "CActor"
  },
  CActorCameraModel: {
    prototype: "CActor"
  },
  CActorCreep: {
    prototype: "CActor"
  },
  CActorCutscene: {
    prototype: "CActor"
  },
  CActorDoodad: {
    prototype: "CActor"
  },
  CActorDoodadPreserver: {
    prototype: "CActor"
  },
  CActorEditorCamera: {
    prototype: "CActor"
  },
  CActorEventMacro: {
    prototype: "CActor"
  },
  CActorFoliageFXSpawner: {
    prototype: "CActor"
  },
  CActorForce: {
    prototype: "CActor"
  },
  CActorForceBox: {
    prototype: "CActor"
  },
  CActorForceConeRoundedEnd: {
    prototype: "CActor"
  },
  CActorForceCylinder: {
    prototype: "CActor"
  },
  CActorForceSphere: {
    prototype: "CActor"
  },
  CActorGlobalConfig: {
    prototype: "CActor"
  },
  CActorLightModel: {
    prototype: "CActor"
  },
  CActorLightOmni: {
    prototype: "CActor"
  },
  CActorLightOmniModel: {
    prototype: "CActor"
  },
  CActorLightSpot: {
    prototype: "CActor"
  },
  CActorLightSpotModel: {
    prototype: "CActor"
  },
  CActorList: {
    prototype: "CActor"
  },
  CActorLookAt: {
    prototype: "CActor"
  },
  CActorModel: {
    prototype: "CActor"
  },
  CActorBeamSimple: {
    prototype: "CActorModel"
  },
  CActorEditorPoint: {
    prototype: "CActorModel"
  },
  CActorModelMaterial: {
    prototype: "CActorModel"
  },
  CActorPortrait: {
    prototype: "CActor"
  },
  CActorPower: {
    prototype: "CActor"
  },
  CActorProgress: {
    prototype: "CActor"
  },
  CActorPropertyCurveSet: {
    prototype: "CActor"
  },
  CActorQuad: {
    prototype: "CActor"
  },
  CActorQueryResponse: {
    prototype: "CActor"
  },
  CActorRange: {
    prototype: "CActor"
  },
  CActorRegion: {
    prototype: "CActor"
  },
  CActorRegionArc: {prototype: "CActorRegion"},
  CActorRegionCircle: {prototype: "CActorRegion"},
  CActorRegionQuad: {prototype: "CActorRegion"},
  CActorRegionWater: {prototype: "CActorRegion"},
  CActorRegionGame: {prototype: "CActorRegion"},


  CActorScene: {
    prototype: "CActor"
  },
  CActorSelection: {
    prototype: "CActor"
  },
  CActorSetQueried: {
    prototype: "CActor"
  },
  CActorShadow: {
    prototype: "CActor"
  },
  CActorShield: {
    prototype: "CActor"
  },
  CActorShieldImpact: {
    prototype: "CActor"
  },
  CActorSimple: {
    prototype: "CActor"
  },
  CActorSite: {
    prototype: "CActor"
  },
  CActorSiteBillboard: {
    prototype: "CActor"
  },
  CActorSiteMover: {
    prototype: "CActor"
  },
  CActorSiteOp2DRotation: {
    prototype: "CActor"
  },
  CActorSiteOpAction: {
    prototype: "CActor"
  },
  CActorSiteOpAttach: {
    prototype: "CActor"
  },
  CActorSiteOpAttachVolume: {
    prototype: "CActor"
  },
  CActorSiteOpBanker: {
    prototype: "CActor"
  },
  CActorSiteOpBankerUnit: {
    prototype: "CActor"
  },
  CActorSiteOpBasic: {
    prototype: "CActor"
  },
  CActorSiteOpCursor: {
    prototype: "CActor"
  },
  CActorSiteOpDeathMotion: {
    prototype: "CActor"
  },
  CActorSiteOpEffect: {
    prototype: "CActor"
  },
  CActorSiteOpForward: {
    prototype: "CActor"
  },
  CActorSiteOpGameCameraFollow: {
    prototype: "CActor"
  },
  CActorSiteOpHeight: {
    prototype: "CActor"
  },
  CActorSiteOpHigherOfTerrainAndWater: {
    prototype: "CActor"
  },
  CActorSiteOpHostBearings: {
    prototype: "CActor"
  },
  CActorSiteOpHostedOffset: {
    prototype: "CActor"
  },
  CActorSiteOpIncoming: {
    prototype: "CActor"
  },
  CActorSiteOpLocalOffset: {
    prototype: "CActor"
  },
  CActorSiteOpOrbiter: {
    prototype: "CActor"
  },
  CActorSiteOpPatch: {
    prototype: "CActor"
  },
  CActorSiteOpPhysicsImpact: {
    prototype: "CActor"
  },
  CActorSiteOpRandomPointInCircle: {
    prototype: "CActor"
  },
  CActorSiteOpRandomPointInCrossbar: {
    prototype: "CActor"
  },
  CActorSiteOpRandomPointInSphere: {
    prototype: "CActor"
  },
  CActorSiteOpRotationExplicit: {
    prototype: "CActor"
  },
  CActorSiteOpRotationRandom: {
    prototype: "CActor"
  },
  CActorSiteOpRotationSmooth: {
    prototype: "CActor"
  },
  CActorSiteOpRotationVariancer: {
    prototype: "CActor"
  },
  CActorSiteOpRotator: {
    prototype: "CActor"
  },
  CActorSiteOpSelectionOffset: {
    prototype: "CActor"
  },
  CActorSiteOpSerpentHead: {
    prototype: "CActor"
  },
  CActorSiteOpSerpentSegment: {
    prototype: "CActor"
  },
  CActorSiteOpShadow: {
    prototype: "CActor"
  },
  CActorSiteOpTilter: {
    prototype: "CActor"
  },
  CActorSiteOpTipability: {
    prototype: "CActor"
  },
  CActorSiteOpUp: {
    prototype: "CActor"
  },
  CActorSiteOpZ: {
    prototype: "CActor"
  },
  CActorSiteOrbiter: {
    prototype: "CActor"
  },
  CActorSiteRocker: {
    prototype: "CActor"
  },
  CActorSnapshot: {
    prototype: "CActor"
  },
  CActorSound: {
    prototype: "CActor"
  },
  CActorSplat: {
    prototype: "CActor"
  },
  CActorSquib: {
    prototype: "CActor"
  },
  CActorStateMonitor: {
    prototype: "CActor"
  },
  CActorTerrain: {
    prototype: "CActor"
  },
  CActorTerrainDeformer: {
    prototype: "CActor"
  },
  CActorText: {
    prototype: "CActor"
  },
  CActorTurret: {
    prototype: "CActor"
  },
  CActorUnit: {
    prototype: "CActor"
  },
  CActorMissile: {
    prototype: "CActorUnit"
  },
  CAlert: {
    catalog: "alert"
  },
  CArmyCategory: {
    catalog: "armycategory"
  },
  CArmyUnit: {
    catalog: "armyunit"
  },
  CArmyUpgrade: {
    catalog: "armyupgrade"
  },
  CArtifact: {
    catalog: "artifact"
  },
  CArtifactSlot: {
    catalog: "artifactslot"
  },
  CAttachMethod: {
    catalog: "attachmethod"
  },
  CAttachMethodArcTest: {
    prototype: "CAttachMethod"
  },
  CAttachMethodAttachType: {
    prototype: "CAttachMethod"
  },
  CAttachMethodBestMatch: {
    prototype: "CAttachMethod"
  },
  CAttachMethodFilter: {
    prototype: "CAttachMethod"
  },
  CAttachMethodIncoming: {
    prototype: "CAttachMethod"
  },
  CAttachMethodNodeOccupancy: {
    prototype: "CAttachMethod"
  },
  CAttachMethodNodeOccupancy2: {
    prototype: "CAttachMethod"
  },
  CAttachMethodNumericField: {
    prototype: "CAttachMethod"
  },
  CAttachMethodPattern: {
    prototype: "CAttachMethod"
  },
  CAttachMethodPortAllocator: {
    prototype: "CAttachMethod"
  },
  CAttachMethodProximity: {
    prototype: "CAttachMethod"
  },
  CAttachMethodRandom: {
    prototype: "CAttachMethod"
  },
  CAttachMethodReduction: {
    prototype: "CAttachMethod"
  },
  CAttachMethodVolumesRequery: {
    prototype: "CAttachMethod"
  },
  CAttachMethodVolumesTargets: {
    prototype: "CAttachMethod"
  },
  CAttachMethodVolumesWeightedPick: {
    prototype: "CAttachMethod"
  },
  CBankConditionCompare: {
    catalog: "bankcondition"
  },
  CBankConditionCompareValueCount: {
    prototype: "CBankConditionCompare"
  },
  CBankConditionCompareValueSum: {
    prototype: "CBankConditionCompare"
  },
  CBeamAsyncLinear: {
    catalog: "beam"
  },
  CBehavior: {
    catalog: "behavior"
  },
  CBehaviorAttackModifier: {
    prototype: "CBehavior"
  },
  CBehaviorAttribute: {
    prototype: "CBehavior"
  },
  CBehaviorBuff: {
    prototype: "CBehavior"
  },
  CBehaviorClickResponse: {
    prototype: "CBehavior"
  },
  CBehaviorConjoined: {
    prototype: "CBehavior"
  },
  CBehaviorCreepSource: {
    prototype: "CBehavior"
  },
  CBehaviorJump: {
    prototype: "CBehavior"
  },
  CBehaviorPowerSource: {
    prototype: "CBehavior"
  },
  CBehaviorPowerUser: {
    prototype: "CBehavior"
  },
  CBehaviorResource: {
    prototype: "CBehavior"
  },
  CBehaviorReveal: {
    prototype: "CBehavior"
  },
  CBehaviorSpawn: {
    prototype: "CBehavior"
  },
  CBehaviorUnitTracker: {
    prototype: "CBehavior"
  },
  CBehaviorVeterancy: {
    prototype: "CBehavior"
  },
  CBehaviorWander: {
    prototype: "CBehavior"
  },
  CBoost: {
    catalog: "boost"
  },
  CBundle: {
    catalog: "bundle"
  },
  CButton: {
    catalog: "button"
  },
  CCamera: {
    catalog: "camera"
  },
  CCampaign: {
    catalog: "campaign"
  },
  CCharacter: {
    catalog: "character"
  },
  CCliff: {
    catalog: "cliff"
  },
  CCliffDoodad: {
    prototype: "CCliff"
  },
  CCliffMesh: {
    catalog: "cliffmesh"
  },
  CColorStyle: {
    catalog: "colorstyle"
  },
  CCommander: {
    catalog: "commander"
  },
  CConfig: {
    catalog: "config"
  },
  CConsoleSkin: {
    catalog: "consoleskin"
  },
  CConversation: {
    catalog: "conversation"
  },
  CConversationState: {
    catalog: "conversationstate"
  },
  CCursor: {
    catalog: "cursor"
  },
  CDataCollection: {
    catalog: "datacollection"
  },
  CDataCollectionAbil: {
    prototype: "CDataCollection"
  },
  CDataCollectionUnit: {
    prototype: "CDataCollection"
  },
  CDataCollectionUpgrade: {
    prototype: "CDataCollection"
  },
  CDataCollectionPattern: {
    catalog: "datacollectionpattern"
  },
  CDecalPack: {
    catalog: "decalpack"
  },
  CDSPChorus: {
    catalog: "dsp"
  },
  CDSPCompressor: {
    prototype: "CDSPChorus"
  },
  CDSPCustomCompressor: {
    prototype: "CDSPChorus"
  },
  CDSPDistortion: {
    prototype: "CDSPChorus"
  },
  CDSPEcho: {
    prototype: "CDSPChorus"
  },
  CDSPFlange: {
    prototype: "CDSPChorus"
  },
  CDSPHighPass: {
    prototype: "CDSPChorus"
  },
  CDSPLimiter: {
    prototype: "CDSPChorus"
  },
  CDSPLowPass: {
    prototype: "CDSPChorus"
  },
  CDSPLowPassSimple: {
    prototype: "CDSPChorus"
  },
  CDSPNormalize: {
    prototype: "CDSPChorus"
  },
  CDSPParamEQ: {
    prototype: "CDSPChorus"
  },
  CDSPPitchShift: {
    prototype: "CDSPChorus"
  },
  CDSPReverb: {
    prototype: "CDSPChorus"
  },
  CEffect: {
    catalog: "effect"
  },
  CEffectAddTrackedUnit: {
    prototype: "CEffect"
  },
  CEffectApplyBehavior: {
    prototype: "CEffect"
  },
  CEffectApplyForce: {
    prototype: "CEffect"
  },
  CEffectApplyKinetic: {
    prototype: "CEffect"
  },
  CEffectCancelOrder: {
    prototype: "CEffect"
  },
  CEffectCreateHealer: {
    prototype: "CEffect"
  },
  CEffectCreatePersistent: {
    prototype: "CEffect"
  },
  CEffectCreateUnit: {
    prototype: "CEffect"
  },
  CEffectCreep: {
    prototype: "CEffect"
  },
  CEffectDamage: {
    prototype: "CEffect"
  },
  CEffectDestroyPersistent: {
    prototype: "CEffect"
  },
  CEffectEnumArea: {
    prototype: "CEffect"
  },
  CEffectEnumMagazine: {
    prototype: "CEffect"
  },
  CEffectEnumTransport: {
    prototype: "CEffect"
  },
  CEffectIssueOrder: {
    prototype: "CEffect"
  },
  CEffectLastTarget: {
    prototype: "CEffect"
  },
  CEffectLaunchMissile: {
    prototype: "CEffect"
  },
  CEffectLoadContainer: {
    prototype: "CEffect"
  },
  CEffectModifyPlayer: {
    prototype: "CEffect"
  },
  CEffectModifyUnit: {
    prototype: "CEffect"
  },
  CEffectRandomPointInCircle: {
    prototype: "CEffect"
  },
  CEffectRedirectMissile: {
    prototype: "CEffect"
  },
  CEffectReleaseMagazine: {
    prototype: "CEffect"
  },
  CEffectRemoveBehavior: {
    prototype: "CEffect"
  },
  CEffectRemoveKinetic: {
    prototype: "CEffect"
  },
  CEffectReturnMagazine: {
    prototype: "CEffect"
  },
  CEffectSet: {
    prototype: "CEffect"
  },
  CEffectSwitch: {
    prototype: "CEffect"
  },
  CEffectTeleport: {
    prototype: "CEffect"
  },
  CEffectTransferBehavior: {
    prototype: "CEffect"
  },
  CEffectUseCalldown: {
    prototype: "CEffect"
  },
  CEffectUseMagazine: {
    prototype: "CEffect"
  },
  CEffectUserData: {
    prototype: "CEffect"
  },
  CEmoticon: {
    catalog: "emoticon"
  },
  CEmoticonPack: {
    catalog: "emoticonpack"
  },
  CFootprint: {
    catalog: "footprint"
  },
  CFoW: {
    catalog: "fow"
  },
  CGame: {
    catalog: "game"
  },
  CGameUI: {
    catalog: "gameui"
  },
  CHerd: {
    catalog: "herd"
  },
  CHerdNode: {
    catalog: "herdnode"
  },
  CHero: {
    catalog: "hero"
  },
  CHeroAbil: {
    catalog: "heroabil"
  },
  CHeroStat: {
    catalog: "herostat"
  },
  CItem: {
    catalog: "item"
  },
  CItemAbil: {
    prototype: "CItem"
  },
  CItemEffect: {
    prototype: "CItem"
  },
  CItemEffectInstant: {
    prototype: "CItem"
  },
  CItemEffectTarget: {
    prototype: "CItem"
  },
  CItemClass: {
    catalog: "itemclass"
  },
  CItemContainer: {
    catalog: "itemcontainer"
  },
  CKinetic: {
    catalog: "kinetic"
  },
  CKineticDistance: {
    prototype: "CKinetic"
  },
  CKineticFollow: {
    prototype: "CKinetic"
  },
  CKineticRotate: {
    prototype: "CKinetic"
  },
  CKineticSequence: {
    prototype: "CKinetic"
  },
  CKineticSet: {
    prototype: "CKinetic"
  },
  CKineticTranslate: {
    prototype: "CKinetic"
  },
  CLensFlareSet: {
    catalog: "lensflareset"
  },
  CLight: {
    catalog: "light"
  },
  CLocation: {
    catalog: "location"
  },
  CLoot: {
    catalog: "loot"
  },
  CLootEffect: {
    prototype: "CLoot"
  },
  CLootItem: {
    prototype: "CLoot"
  },
  CLootSet: {
    prototype: "CLoot"
  },
  CLootSpawn: {
    prototype: "CLoot"
  },
  CLootUnit: {
    prototype: "CLoot"
  },
  CMap: {
    catalog: "map"
  },
  CModel: {
    catalog: "model"
  },
  CModelFoliage: {
    prototype: "CModel"
  },
  CMount: {
    catalog: "mount"
  },
  CMover: {
    catalog: "mover"
  },
  CMoverAvoid: {
    prototype: "CMover"
  },
  CMoverFlock: {
    prototype: "CMover"
  },
  CMoverMissile: {
    prototype: "CMover"
  },
  CObjective: {
    catalog: "objective"
  },
  CPhysicsMaterial: {
    catalog: "physicsmaterial"
  },
  CPing: {
    catalog: "ping"
  },
  CPlayerResponse: {
    catalog: "playerresponse"
  },
  CPlayerResponseUnit: {
    prototype: "CPlayerResponse"
  },
  CPlayerResponseUnitBirth: {
    prototype: "CPlayerResponse"
  },
  CPlayerResponseUnitDamage: {
    prototype: "CPlayerResponse"
  },
  CPlayerResponseUnitDeath: {
    prototype: "CPlayerResponse"
  },
  CPortraitPack: {
    catalog: "portraitpack"
  },
  CPreload: {
    catalog: "preload"
  },
  CPreloadActor: {
    prototype: "CPreload"
  },
  CPreloadConversation: {
    prototype: "CPreload"
  },
  CPreloadModel: {
    prototype: "CPreload"
  },
  CPreloadSound: {
    prototype: "CPreload"
  },
  CPreloadUnit: {
    prototype: "CPreload"
  },
  CPremiumMap: {
    catalog: "premiummap"
  },
  CRaceBannerPack: {
    catalog: "racebannerpack"
  },
  CRace: {
    catalog: "race"
  },
  CRequirement: {
    catalog: "requirement"
  },

  requirementnode: {
    Tooltip: "string",
    Flags: "{bit}",
    Value: "int",
    Count: {
      Link: "string",
      State: "word",
      Unlock: "word"
    },
    Link: "word",
    OperandArray: "{requirementnode}",
    Index: "int"
  },
  CRequirementAnd: {
    prototype: "CRequirementAllowAbil",
    OperandArray: "[requirementnode]"
  },
  CRequirementOr: {
    prototype: "CRequirementAllowAbil",
    OperandArray: "[requirementnode]"
  },
  CRequirementAllowAbil: {
    catalog: "requirementnode"
  },
  CRequirementAllowBehavior: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementAllowUnit: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementAllowUpgrade: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementConst: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementCountAbil: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementCountBehavior: {
    prototype: "CRequirementAllowAbil",
    Count: {
      Link: "behavior"
    }
  },
  CRequirementCountUnit: {
    prototype: "CRequirementAllowAbil",
    Count: {
      Link: "unit"
    }
  },
  CRequirementCountUpgrade: {
    prototype: "CRequirementAllowAbil",
    Count: {
      Link: "upgrade"
    }
  },
  CRequirementDiv: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementEq: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementGT: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementGTE: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementLT: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementLTE: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementMod: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementMul: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementNE: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementNode: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementNot: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementOdd: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementSum: {
    prototype: "CRequirementAllowAbil"
  },
  CRequirementXor: {
    prototype: "CRequirementAllowAbil"
  },

  CReverb: {
    catalog: "reverb"
  },
  CReward: {
    catalog: "reward"
  },
  CRewardConsoleSkin: {
    prototype: "CReward"
  },
  CRewardDecal: {
    prototype: "CReward"
  },
  CRewardEmoticon: {
    prototype: "CReward"
  },
  CRewardIcon: {
    prototype: "CReward"
  },
  CRewardModel: {
    prototype: "CReward"
  },
  CRewardPoints: {
    prototype: "CReward"
  },
  CRewardPortrait: {
    prototype: "CReward"
  },
  CRewardPortraitInGame: {
    prototype: "CReward"
  },
  CRewardRaceBanner: {
    prototype: "CReward"
  },
  CRewardSpray: {
    prototype: "CReward"
  },
  CRewardSprayUseDecal: {
    prototype: "CReward"
  },
  CRewardTrophy: {
    prototype: "CReward"
  },
  CRewardVoicePack: {
    prototype: "CReward"
  },
  CScoreResult: {
    catalog: "scoreresult"
  },
  CScoreResultBuildOrder: {
    prototype: "CScoreResult"
  },
  CScoreResultExperience: {
    prototype: "CScoreResult"
  },
  CScoreResultGraph: {
    prototype: "CScoreResult"
  },
  CScoreResultPerformance: {
    prototype: "CScoreResult"
  },
  CScoreResultRoot: {
    prototype: "CScoreResult"
  },
  CScoreResultScore: {
    prototype: "CScoreResult"
  },
  CScoreValue: {
    catalog: "scorevalue"
  },
  CScoreValueCustom: {
    prototype: "CScoreValue"
  },
  CScoreValueCombine: {
    prototype: "CScoreValueCustom"
  },
  CScoreValueStandard: {
    prototype: "CScoreValue"
  },
  CShape: {
    catalog: "shape"
  },
  CShapeArc: {
    prototype: "CShape"
  },
  CShapeQuad: {
    prototype: "CShape"
  },
  CSkin: {
    catalog: "skin"
  },
  CSkinPack: {
    catalog: "skinpack"
  },
  CSound: {
    catalog: "sound"
  },
  CSoundExclusivity: {
    catalog: "soundexclusivity"
  },
  CSoundMixSnapshot: {
    catalog: "soundmixsnapshot"
  },
  CSoundtrack: {
    catalog: "soundtrack"
  },
  CSpray: {
    catalog: "spray"
  },
  CSprayPack: {
    catalog: "spraypack"
  },
  CStimPack: {
    catalog: "stimpack"
  },
  CTacCooldown: {
    catalog: "taccooldown"
  },
  CTactical: {
    catalog: "tactical"
  },
  CTacticalOrder: {
    prototype: "CTactical"
  },
  CTacticalSet: {
    prototype: "CTactical"
  },
  CTalent: {
    catalog: "talent"
  },
  CTalentProfile: {
    catalog: "talentprofile"
  },
  CTargetFind: {
    catalog: "targetfind"
  },
  CTargetFindBestPoint: {
    prototype: "CTargetFind"
  },
  CTargetFindEffect: {
    prototype: "CTargetFind"
  },
  CTargetFindEnumArea: {
    prototype: "CTargetFind"
  },
  CTargetFindLastAttacker: {
    prototype: "CTargetFind"
  },
  CTargetFindOffset: {
    prototype: "CTargetFind"
  },
  CTargetFindOrder: {
    prototype: "CTargetFind"
  },
  CTargetFindRallyPoint: {
    prototype: "CTargetFind"
  },
  CTargetFindSet: {
    prototype: "CTargetFind"
  },
  CTargetFindWorkerRallyPoint: {
    prototype: "CTargetFind"
  },
  CTargetSort: {
    catalog: "targetsort"
  },
  CTargetSortValidator: {
    prototype: "CTargetSort"
  },
  CTargetSortField: {
    prototype: "CTargetSort"
  },
  CTargetSortAlliance: {
    prototype: "CTargetSort"
  },
  CTargetSortAngle: {
    prototype: "CTargetSort"
  },
  CTargetSortBehaviorCount: {
    prototype: "CTargetSort"
  },
  CTargetSortChargeCount: {
    prototype: "CTargetSort"
  },
  CTargetSortChargeRegen: {
    prototype: "CTargetSort"
  },
  CTargetSortCooldown: {
    prototype: "CTargetSort"
  },
  CTargetSortDistance: {
    prototype: "CTargetSort"
  },
  CTargetSortInterruptible: {
    prototype: "CTargetSort"
  },
  CTargetSortMarker: {
    prototype: "CTargetSort"
  },
  CTargetSortPowerSourceLevel: {
    prototype: "CTargetSort"
  },
  CTargetSortPowerUserLevel: {
    prototype: "CTargetSort"
  },
  CTargetSortPriority: {
    prototype: "CTargetSort"
  },
  CTargetSortRandom: {
    prototype: "CTargetSort"
  },
  CTargetSortVital: {
    prototype: "CTargetSort"
  },
  CTargetSortVitalFraction: {
    prototype: "CTargetSort"
  },
  CTerrain: {
    catalog: "terrain"
  },
  CTerrainObject: {
    catalog: "terrainobject"
  },
  CTerrainTex: {
    catalog: "terraintex"
  },
  CTexture: {
    catalog: "texture"
  },
  CTextureSheet: {
    catalog: "texturesheet"
  },
  CTile: {
    catalog: "tile"
  },
  CTrophy: {
    catalog: "trophy"
  },
  CTurret: {
    catalog: "turret"
  },
  CUnit: {
    catalog: "unit"
  },
  CUpgrade: {
    catalog: "upgrade"
  },
  CUser: {
    catalog: "user"
  },
  CValidator: {
    catalog: "validator"
  },
  CValidatorUnitCompareCooldown: {
    prototype: "CValidator"
  },
  CValidatorCombine: {
    prototype: "CValidator"
  },
  CValidatorCondition: {
    prototype: "CValidator"
  },
  CValidatorEffect: {
    prototype: "CValidator"
  },
  CValidatorEffectCompareDodged: {
    prototype: "CValidator"
  },
  CValidatorEffectCompareEvaded: {
    prototype: "CValidator"
  },
  CValidatorEffectTreeUserData: {
    prototype: "CValidator"
  },
  CValidatorFunction: {
    prototype: "CValidator"
  },
  CValidatorGameCommanderActive: {
    prototype: "CValidator"
  },
  CValidatorGameCompareTerrain: {
    prototype: "CValidator"
  },
  CValidatorGameCompareTimeEvent: {
    prototype: "CValidator"
  },
  CValidatorGameCompareTimeOfDay: {
    prototype: "CValidator"
  },
  CValidatorLocation: {
    prototype: "CValidator"
  },
  CValidatorLocationArc: {
    prototype: "CValidator"
  },
  CValidatorLocationCompareCliffLevel: {
    prototype: "CValidator"
  },
  CValidatorLocationComparePower: {
    prototype: "CValidator"
  },
  CValidatorLocationCompareRange: {
    prototype: "CValidator"
  },
  CValidatorLocationCreep: {
    prototype: "CValidator"
  },
  CValidatorLocationCrossChasm: {
    prototype: "CValidator"
  },
  CValidatorLocationCrossCliff: {
    prototype: "CValidator"
  },
  CValidatorLocationEnumArea: {
    prototype: "CValidator"
  },
  CValidatorLocationInPlayableMapArea: {
    prototype: "CValidator"
  },
  CValidatorLocationPathable: {
    prototype: "CValidator"
  },
  CValidatorLocationPlacement: {
    prototype: "CValidator"
  },
  CValidatorLocationShrub: {
    prototype: "CValidator"
  },
  CValidatorLocationType: {
    prototype: "CValidator"
  },
  CValidatorLocationVision: {
    prototype: "CValidator"
  },
  CValidatorPlayer: {
    prototype: "CValidator"
  },
  CValidatorPlayerAlliance: {
    prototype: "CValidator"
  },
  CValidatorPlayerCompareDifficulty: {
    prototype: "CValidator"
  },
  CValidatorPlayerCompareFoodAvailable: {
    prototype: "CValidator"
  },
  CValidatorPlayerCompareFoodUsed: {
    prototype: "CValidator"
  },
  CValidatorPlayerCompareRace: {
    prototype: "CValidator"
  },
  CValidatorPlayerCompareResource: {
    prototype: "CValidator"
  },
  CValidatorPlayerCompareResult: {
    prototype: "CValidator"
  },
  CValidatorPlayerCompareType: {
    prototype: "CValidator"
  },
  CValidatorPlayerFood: {
    prototype: "CValidator"
  },
  CValidatorPlayerRequirement: {
    prototype: "CValidator",
    Value: "requirement"
  },
  CValidatorUnit: {
    prototype: "CValidator"
  },
  CValidatorUnitAI: {
    prototype: "CValidator"
  },
  CValidatorUnitAbil: {
    prototype: "CValidator"
  },
  CValidatorUnitAlliance: {
    prototype: "CValidator"
  },
  CValidatorUnitBehaviorStackAlias: {
    prototype: "CValidator"
  },
  CValidatorUnitBehaviorState: {
    prototype: "CValidator"
  },
  CValidatorUnitCombatAI: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareAIAreaEvalRatio: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareAbilSkillPoint: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareAttackPriority: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareBehaviorCount: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareCargo: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareChargeUsed: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareDamageDealtTime: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareDamageTakenTime: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareDeath: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareField: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareHeight: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareKillCount: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareMarkerCount: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareMoverPhase: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareOrderCount: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareOrderTargetRange: {
    prototype: "CValidator"
  },
  CValidatorUnitComparePowerSourceLevel: {
    prototype: "CValidator"
  },
  CValidatorUnitComparePowerUserLevel: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareRallyPointCount: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareResourceContents: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareResourceHarvesters: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareSpeed: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareVeterancyLevel: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareVital: {
    prototype: "CValidator"
  },
  CValidatorUnitCompareVitality: {
    prototype: "CValidator"
  },
  CValidatorUnitDetected: {
    prototype: "CValidator"
  },
  CValidatorUnitFilters: {
    prototype: "CValidator"
  },
  CValidatorUnitFlying: {
    prototype: "CValidator"
  },
  CValidatorUnitInWeaponRange: {
    prototype: "CValidator"
  },
  CValidatorUnitInventory: {
    prototype: "CValidator"
  },
  CValidatorUnitInventoryContainsItem: {
    prototype: "CValidator"
  },
  CValidatorUnitInventoryIsFull: {
    prototype: "CValidator"
  },
  CValidatorUnitKinetic: {
    prototype: "CValidator"
  },
  CValidatorUnitLastDamagePlayer: {
    prototype: "CValidator"
  },
  CValidatorUnitMissileNullified: {
    prototype: "CValidator"
  },
  CValidatorUnitMover: {
    prototype: "CValidator"
  },
  CValidatorUnitOrder: {
    prototype: "CValidator"
  },
  CValidatorUnitOrderQueue: {
    prototype: "CValidator"
  },
  CValidatorUnitOrderTargetPathable: {
    prototype: "CValidator"
  },
  CValidatorUnitOrderTargetType: {
    prototype: "CValidator"
  },
  CValidatorUnitPathable: {
    prototype: "CValidator"
  },
  CValidatorUnitPathing: {
    prototype: "CValidator"
  },
  CValidatorUnitScanning: {
    prototype: "CValidator"
  },
  CValidatorUnitState: {
    prototype: "CValidator"
  },
  CValidatorUnitTestWeaponType: {
    prototype: "CValidator"
  },
  CValidatorUnitType: {
    prototype: "CValidator",
    Value: "unit"
  },
  CValidatorUnitWeaponAnimating: {
    prototype: "CValidator"
  },
  CValidatorUnitWeaponFiring: {
    prototype: "CValidator"
  },
  CValidatorUnitWeaponPlane: {
    prototype: "CValidator"
  },
  CVoiceOver: {
    catalog: "voiceover"
  },
  CVoicePack: {
    catalog: "voicepack"
  },
  CWarChest: {
    catalog: "warchest"
  },
  CWarChestSeason: {
    catalog: "warchestseason"
  },
  CWater: {
    catalog: "water"
  },
  CWeapon: {
    catalog: "weapon"
  },
  CWeaponLegacy: {
    prototype: "CWeapon"
  },
  CWeaponStrafe: {
    prototype: "CWeapon"
  },
  abil: {
    Name: "link",
    TechPlayer: "word",
    EditorCategories: "categories",
    TargetMessage: "link",
    OrderArray: [
      {
        DisplayType: "word",
        Color: "ints",
        Model: "file",
        LineTexture: "string",
        Scale: "real"
      }
    ],
    SharedFlags: "{bit}",
    DataCollection: "word",
    RangeSlop: "real",
    ArcSlop: "real",
    AutoCastAcquireLevel: "word",
    AutoCastFilters: "filters",
    Flags: "{bit}",
    Effect: "[effect]",
    EffectRange: "ints",
    AINotifyEffect: "effect",
    RefundArray: "{bit}",
    RefundFraction: {
      Charge: "int",
      Cooldown: "int",
      Resource: "{real}",
      Vital: "{int}"
    },
    UseMarkerArray: "{bit}",
    PauseableArray: "{bit}",
    PreemptableArray: "{bit}",
    ValidatedArray: "{bit}",
    DefaultError: "string",
    AcquirePriority: "int",
    SetLastTarget: "word",
    VeterancyLevelMin: "bit",
    VeterancyLevelSkip: "bit",
    ErrorAlert: "string",
    Activity: "link",
    Cancelable: "bit",
    Leash: "real",
    Alert: "string",
    AbilSetId: "abil",
    Alignment: "word",
    AcquireFilters: "filters",
    SmartFilters: "filters",
    SupportedFilters: "filters",
    CmdButtonArray: [
      {
        index: "word",
        DefaultButtonFace: "button",
        Flags: "{bit}",
        ReviverIndex: "int",
        Requirements: "requirement",
        State: "word"
      }
    ],
    MaxAttackSpeedMultiplier: "int",
    MinAttackSpeedMultiplier: "real",
    TargetFilters: "[filters]",
    Range: "[real]",
    EnumRange: "int",
    HaltCmdButton: {
      DefaultButtonFace: "button"
    },
    FlagArray: "{bit}",
    InfoArray: [
      {
        index: "int",
        Button: {
          Flags: "{bit}",
          DefaultButtonFace: "button",
          State: "word",
          Requirements: "requirement"
        },
        Unit: "unit",
        SectionArray: [
          {
            index: "word",
            DurationArray: "{real}",
            EffectArray: "{effect}"
          }
        ],
        Time: "real",
        AddOnParentCmdPriority: "int",
        CollideRange: "real",
        Effect: "effect",
        Charge: {
          CountMax: "int",
          CountStart: "int",
          CountUse: "bit",
          Location: "word",
          TimeStart: "int",
          TimeUse: "int",
          Link: "string",
          Flags: "{bit}",
          HideCount: "bit"
        },
        Upgrade: "upgrade",
        Resource: "{int}",
        Alert: "alert",
        Flags: "{bit}",
        UseFilters: "filters",
        SetValidators: "[validator]",
        UseValidators: "[validator]",
        SetOnGround: "bit",
        ValidatorArray: "[validator]",
        Cooldown: {
          Link: "string",
          TimeUse: "real",
          Location: "word",
          TimeStart: "int"
        },
        RandomDelayMax: "real",
        CountStart: "int",
        Manage: "word",
        Score: "bit",
        RandomDelayMin: "real",
        Delay: "int",
        Vital: "{int}",
        RallyResetPhase: "word",
        Display: "{bit}",
        Alignment: "word",
        Container: "word",
        EmptyFace: "word",
        Item: "item",
        TargetFilters: "filters",
        RefundFraction: "{bit}",
        Abil: "abil",
        Distance: "int",
        Rotation: "word",
        AllowSetFilters: "filters",
        AllowSetOnGround: "bit"
      }
    ],
    VitalStartFactor: "{real}",
    FollowRange: "real",
    AcquireRadius: "int",
    ReservedMarker: {
      Link: "link"
    },
    ResourceAllowed: "{bit}",
    ResourceAcquire: "{bit}",
    ResourceDestroy: "{bit}",
    ResourceAmountMultiplier: "{int}",
    ResourceTimeMultiplier: "{real}",
    UninterruptibleArray: "{bit}",
    ActorKey: "word",
    AbilClassEnableArray: "{bit}",
    AbilClassDisableArray: "{bit}",
    QueueCount: "int",
    NameOverride: "link",
    SelfReviveCmd: "word",
    TargetType: "word",
    VitalArray: "{word}",
    MaxInfo: {
      TimeFactor: "int",
      Time: "int",
      ResourceFactor: "{int}",
      Resource: "{int}"
    },
    DeathTypeOnFinish: "word",
    DeathTypeOnCancel: "word",
    MaxUnloadRange: "int",
    TargetSorts: {
      SortArray: "[targetsort]",
      RequestCount: "bit"
    },
    ReplaceFilters: "filters",
    ValidatorArray: "[validator]",
    AttackModifierBehavior: "word",
    FleeRange: "int",
    FleeTime: "int",
    FollowRangeSlop: "bit",
    FollowAcquireRange: "int",
    MinPatrolDistance: "bit",
    CursorEffect: "[effect]",
    Type: "word",
    BehaviorArray: "[behavior]",
    Cost: [
      {
        Charge: {
          CountMax: "int",
          CountStart: "int",
          CountUse: "int",
          Link: "string",
          Location: "word",
          TimeStart: "int",
          TimeUse: "int",
          HideCount: "bit"
        },
        Vital: "{int}",
        Cooldown: {
          TimeStart: "int",
          TimeUse: "real",
          Link: "string",
          Location: "word"
        },
        Resource: "{int}",
        VitalFraction: "{int}"
      }
    ],
    AbilityCategories: "{bit}",
    DefaultButtonCardId: "word",
    CancelableArray: "{bit}",
    AutoCastRange: "real",
    AutoCastValidatorArray: "[validator]",
    Marker: {
      Link: "string",
      MatchFlags: "{bit}",
      MismatchFlags: "{bit}"
    },
    InheritAttackPriorityArray: "{bit}",
    MorphUnit: "unit",
    Arc: "real",
    Placeholder: "word",
    ProducedUnitArray: "[unit]",
    PlaceUnit: "unit",
    InfoTooltipPriority: "int",
    CastIntroTime: "real",
    CastOutroTime: "[real]",
    FinishTime: "[real]",
    PrepTime: "real",
    QueueSize: "int",
    ConstructionMover: "mover",
    FidgetDelayMin: "int",
    FidgetDelayMax: "int",
    AcquireAttackers: "bit",
    SmartValidatorArray: "[validator]",
    MaxCargoCount: "int",
    MaxCargoSize: "int",
    TotalCargoSpace: "int",
    UnloadPeriod: "real",
    ShowProgressArray: "{bit}",
    ProgressButtonArray: "{button}",
    LoadCargoBehavior: "behavior",
    LoadValidatorArray: "[validator]",
    SearchRadius: "int",
    DeathUnloadEffect: "effect",
    LoadCargoEffect: "effect",
    UnloadCargoEffect: "effect",
    unit: "unit",
    BuildMorphAbil: "abil",
    Launch: "word",
    CalldownEffect: "effect",
    EffectArray: "{effect}",
    AutoCastCountMin: "bit",
    LoadTransportBehavior: "word",
    PowerUserBehavior: "behavior",
    InitialUnloadDelay: "real",
    LoadPeriod: "real",
    AlertArray: "{word}",
    Abil: "abil",
    ProgressButton: "button",
    Info: {
      Unit: "unit",
      Time: "real",
      Resource: "{int}"
    },
    ExternalAngle: "[real]",
    AbilCmd: "abilcmd",
    ResourceAmountRequest: "{int}",
    Offset: "ints",
    MaxCount: "int",
    CancelUnit: "unit",
    TrackingArc: "real",
    PrepEffect: "effect",
    MaxDropRange: "bit",
    BaseInfo: {
      Time: "int",
      Resource: "{int}",
      Cooldown: {
        Location: "word",
        TimeUse: "real"
      }
    },
    LevelInfo: {
      Time: "int",
      Resource: "{int}"
    },
    PointsPerLevel: "bit",
    IgnoreFilters: "filters",
    ProxyOffset: "ints",
    ProxyUnit: "unit",
    AbilLinkEnableArray: "[abil]",
    InterruptCost: {
      Charge: {
        Link: "link"
      },
      Cooldown: {
        Link: "link",
        TimeUse: "int"
      }
    },
    CastOutroTimeEffect: "effect",
    CursorRangeMode: "word",
    PreEffectBehavior: {
      Behavior: "behavior",
      Count: "bit"
    },
    SmartPriority: "int",
    CancelEffect: "{effect}",
    ResourceQueueIndex: "bit",
    AutoCastCountMax: "int",
    CancelCost: {
      Cooldown: {
        TimeUse: "int"
      }
    }
  },
  accumulator: {
    PreviousValueFactor: "bit",
    Scale: "bit",
    Type: "word",
    AmountType: "word",
    Key: "word",
    CaseArray: [
      {
        Validator: "validator",
        Accumulator: "accumulator"
      }
    ],
    CaseDefault: "word",
    ApplicationRule: "word",
    Amount: "bit"
  },
  actor: {
    FogVisibility: "word",
    EditorCategories: "categories",
    InheritType: "word",
    Inherits: "{bit}",
    AddToProximitySystem: "bit",
    AcceptedTransfers: "{bit}",
    On: [
      {
        Terms: "terms",
        Send: "send",
        Target: "string"
      }
    ],
    Camera: "camera",
    Model: "model",
    AnimBlendTime: "real",
    ModelFlags: "{bit}",
    ProximityPosition: "word",
    LaunchActor: "actor",
    LaunchHeight: "real",
    CenterActor: "actor",
    CenterHeight: "real",
    ImpactActor: "actor",
    ImpactHeight: "real",
    QuadFlags: "{bit}",
    PowerSource: "word",
    SpawnTarget: "word",
    HostSiteOps: {
      Ops: "actor",
      HoldPosition: "bit",
      HoldRotation: "bit"
    },
    Host: {
      Subject: "subject",
      Actor: "word",
      Scope: "word",
      FailOnNoHost: "bit",
      Effect: "effect",
      ReachAcrossEffectTrees: "bit"
    },
    TerrainDeformerFlags: "{bit}",
    FoliageFXDeathSpawnTarget: "word",
    Supporter: {
      Subject: "subject",
      Actor: "word",
      Scope: "word",
      Effect: "effect"
    },
    Arc: "real",
    Icon: "file",
    IconArcLength: "real",
    CliffLevelFlags: "{bit}",
    RangeFlags: "{bit}",
    IconTint: "ints",
    Flags: "{bit}",
    RadiusMedium: "real",
    RadiusLarge: "real",
    MaxCountSmall: "int",
    MaxCountMedium: "int",
    MaxCountLarge: "int",
    Sound: "sound",
    SoundFlags: "{bit}",
    Color: "ints",
    FadeIn: "real",
    FadeOut: "real",
    TextScale: "real",
    MaxSize: "reals",
    AlignH: "word",
    AlignV: "word",
    PitchQuery: {
      Methods: "word"
    },
    YawQuery: {
      Methods: "word"
    },
    TurretBody: {
      Subject: "subject",
      Actor: "word"
    },
    Aliases: "[word]",
    AngleAnimProps: "word",
    Beam: "word",
    DoodadFlags: "{bit}",
    EditorIcon: "file",
    Radius: "reals",
    RandomScaleRange: "reals",
    OccludeHeight: "real",
    EditorFlags: "{bit}",
    MinimapRenderPriority: "word",
    VisibleOpacity: "real",
    Terms: "terms",
    HoldTime: "real",
    FallOff: "real",
    HalfHeight: "real",
    Attenuation: "real",
    Layer: "word",
    HostRadiusPercent: "real",
    Alpha: "reals",
    AttachQuery: {
      Methods: "string",
      Fallback: "word"
    },
    RollMax: "reals",
    RollInActivationAngle: "real",
    RollInArc: "reals",
    RollOutDuration: "reals",
    Variance: "real",
    NotifyClosestScaleKey: "word",
    Quad: "reals",
    AcceptedHostedPropTransfers: "{bit}",
    unitName: "unit",
    AutoScaleFactor: "real",
    InnerWidth: "real",
    OuterWidth: "real",
    RotationSpeed: "real",
    SegmentCount: "int",
    SegmentPercentSolid: "real",
    InnerBoundaryFallOffRatio: "real",
    InnerBoundaryRatio: "real",
    InnerOffsetRatio: "real",
    SelectionFlags: "{bit}",
    SelectionFilter: "{bit}",
    ForceFlags: "{bit}",
    Field: "word",
    StatusBarFlags: "{bit}",
    StatusBarGroups: "{bit}",
    StatusColors: [
      {
        index: "word",
        BackgroundColor: "ints",
        EmptyColor: "ints",
        ColorArray: "[ints]"
      }
    ],
    BarDistance: "int",
    BarWidth: "int",
    BarHeight: "int",
    BarOffset: "int",
    NameOffset: "int",
    HighlightTooltip: "string",
    CopySource: "word",
    UnitFlags: "{bit}",
    GlossaryAnim: "words",
    MinimapIconScale: "real",
    MinimapIconBackgroundScale: "real",
    MinimapFlashWhenAttacked: "bit",
    MinimapUseSelfColor: "bit",
    MinimapUseSelectionColor: "bit",
    Baselines: [
      {
        index: "word",
        AnimProps: "words",
        BlendIn: "real",
        BlendOut: "real"
      }
    ],
    WalkAnimMoveSpeed: "real",
    BuildModel: "model",
    PlacementModel: "model",
    PlacementActorModel: "actor",
    PlaceholderActorModel: "actor",
    PortraitActor: "actor",
    PortraitModel: "model",
    DeathActorModel: "actor",
    DeathActorModelLow: "actor",
    DeathActorSound: "actor",
    DeathActorVoice: "actor",
    SnapshotActor: "actor",
    UnitIcon: "file",
    HeroIcon: "file",
    SoundArray: "{string}",
    GroupSoundThreshold: "int",
    GroupSoundArray: "{string}",
    ShieldArmorIcon: "file",
    VarianceWindowStandIntro: "real",
    VarianceWindowStand: "real",
    VarianceWindowWalkIntro: "real",
    VarianceWindowWalk: "real",
    VarianceWindowWalkOutro: "real",
    EventDataFootprint: [
      {
        Actor: "actor",
        Model: "model"
      }
    ],
    EventDataSound: [
      {
        Actor: "actor",
        Name: "word",
        Sound: "sound"
      }
    ],
    DeathArray: [
      {
        index: "word",
        AnimProps: "words",
        ModelLink: "string",
        SoundLink: "sound",
        VoiceLink: "word"
      }
    ],
    DeathCustoms: [
      {
        ModelLink: "string",
        Name: "word",
        ActorModel: "actor",
        PhysicsMatchKeysOrdered: "words",
        BodySquibs: [
          {
            Name: "word",
            IsFallback: "bit",
            Model: "model"
          }
        ],
        InheritsFrom: "word",
        AnimProps: "words",
        IsAbstract: "bit",
        SoundLink: "sound",
        VoiceLink: "word"
      }
    ],
    DeathCustomData: [
      {
        Name: "word",
        SyncPassChance: "int",
        Members: "filters",
        Supersedes: "words"
      }
    ],
    OverkillByDamagePastRemainingHealth: {
      Value: "int",
      TestType: "word"
    },
    OverkillByDamageOverInterval: {
      Value: "int",
      Interval: "bit",
      TestType: "word"
    },
    PhysicsMatchKeysOrdered: "words",
    StatusTextInfo: {
      Offset: "ints",
      Attachment: "word",
      FontSize: "int",
      BackgroundColor: "ints",
      BackgroundImage: "string"
    },
    Macros: "[word]",
    EditorModel: "model",
    Filter: "{bit}",
    HarnessModel: "model",
    HarnessSound: "word",
    Map: [
      {
        index: "word",
        Model: "model",
        Sound: "sound"
      }
    ],
    PreHost: "word",
    IsTentacle: "bit",
    LaunchGuideAlias: "word",
    LaunchSite: "word",
    LaunchSiteOps: {
      Ops: "actor",
      HoldPosition: "bit",
      HoldRotation: "bit"
    },
    LaunchSiteFallback: "word",
    LaunchAttachQuery: {
      Methods: "string",
      Fallback: "word"
    },
    LaunchAssets: {
      Model: "model",
      Sound: "sound"
    },
    LaunchModel: "model",
    LaunchSound: "word",
    LaunchTerrainSquibModel: "model",
    LaunchTerrainSquibSound: "word",
    ContainerSite: "word",
    ContainerSiteOps: {
      Ops: "actor"
    },
    ContainerAttachQuery: {
      Methods: "string",
      Fallback: "word"
    },
    ContainerAssets: {
      Model: "model",
      Sound: "sound"
    },
    ContainerModel: "model",
    ContainerSound: "word",
    ContainerTerrainSquibModel: "model",
    ContainerTerrainSquibSound: "word",
    BeamScope: "word",
    Missile: "word",
    ImpactGuideAlias: "word",
    ImpactSiteOps: {
      Ops: "actor",
      HoldPosition: "bit",
      HoldRotation: "bit"
    },
    ImpactSite: "word",
    ImpactSiteFallback: "word",
    ImpactAttachQuery: {
      Methods: "string",
      Fallback: "word"
    },
    ImpactReattachQuery: {
      Methods: "word",
      Fallback: "word"
    },
    ImpactPointSite: "word",
    ImpactPointSiteOps: {
      Ops: "actor"
    },
    ImpactMap: [
      {
        index: "word",
        Model: "model",
        Sound: "sound",
        ModelReaction: "string",
        Scale: "real"
      }
    ],
    ImpactModel: "model",
    ImpactModelReaction: "word",
    ImpactSound: "word",
    ImpactTerrainSquibModel: "model",
    ImpactTerrainSquibSound: "word",
    DamageSite: "word",
    DamageSiteOps: {
      Ops: "actor",
      HoldPosition: "bit",
      HoldRotation: "bit"
    },
    DamageAttachQuery: {
      Methods: "string",
      Fallback: "word"
    },
    DamageReattachQuery: {
      Methods: "word",
      Fallback: "word"
    },
    DamageMap: [
      {
        index: "word",
        Model: "model",
        Sound: "word",
        ModelReaction: "string"
      }
    ],
    DamageModel: "model",
    DamageModelReaction: "word",
    DamageSound: "word",
    DamageTerrainSquibModel: "model",
    DamageTerrainSquibSound: "word",
    AttackAnimSource: "string",
    AttackAnimName: "word",
    Lifetime: "real",
    effectAttack: "effect",
    effectImpact: "effect",
    effectLaunch: "effect",
    ShieldFlashType: "word",
    effectHit: "effect",
    Remove: [
      {
        Terms: "terms",
        Send: "send",
        Target: "string"
      }
    ],
    HostTargetSiteOps: {
      Ops: "actor"
    },
    Type: "word",
    SceneActor: "actor",
    MainActor: "word",
    MissileBoundsOptSpeedThreshold: "real",
    ModelCacheFallback: "model",
    AttachHarnessActor: "actor",
    AttachHarnessSOpAttach: "word",
    AttachHarnessSOpLocalOffset: "word",
    AttachHarnessSOpRotationExplicit: "word",
    ActorUnitFallback: "actor",
    CommandUIActor: "actor",
    CloakModel: "model",
    CloakModelLow: "model",
    CloakTransitionArray: [
      {
        index: "word",
        StateArray: [
          {
            index: "word",
            Enter: "words",
            Loop: "words"
          }
        ]
      }
    ],
    MaxSpeedForSound: "int",
    RevealTint: "ints",
    PopulationLimitModel: "int",
    CreepEngulfmentModel: "model",
    CreepHeightClasses: [
      {
        Name: "word",
        SolidHeight: "real",
        FadeHeight: "real",
        StartOffset: "real"
      }
    ],
    CreepRates: [
      {
        Name: "word",
        Rate: "real"
      }
    ],
    DeathCustomPriorityList: "[word]",
    MinimapRenderPriorityList: "[word]",
    BodySquibs: [
      {
        Name: "word",
        ActorModel: "actor",
        Model: "model",
        ModelSiteOps: {
          Ops: "actor"
        },
        ModelAttachQuery: {
          Methods: "string"
        },
        ActorSound: "actor",
        Sound: "word",
        SoundSiteOps: {
          Ops: "actor"
        },
        SoundAttachQuery: {
          Methods: "word"
        },
        RequiredSquibType: "word"
      }
    ],
    ModelMaterialPriorityList: "[word]",
    Scale: "reals",
    Location: "word",
    ForceSoftAttach: "bit",
    HoldPosition: "bit",
    HoldRotation: "bit",
    HostIncoming: {
      Subject: "subject",
      Actor: "word",
      Scope: "word"
    },
    UpwardVisibilityEnhancement: "bit",
    UpwardVisibilityEnhancementVarianceUp: "real",
    UpwardVisibilityEnhancementVarianceDown: "real",
    RollAngleMax: "real",
    RollInRate: "real",
    RollOutRate: "real",
    RollOutRemainderFractionForLevelOff: "real",
    BasicType: "word",
    HostForwardSiteOps: {
      Ops: "actor"
    },
    Invert: "bit",
    ZOnly: "bit",
    HostForward: {
      Subject: "subject",
      Scope: "word",
      Actor: "word",
      Effect: "effect"
    },
    Forward: "reals",
    HostHeight: {
      Subject: "subject",
      Scope: "word",
      Actor: "word"
    },
    HeightSourceType: "word",
    TerrainAndWaterFlags: "{bit}",
    ForcedWadingMaxDepth: "real",
    HostBearings: {
      Subject: "subject",
      Scope: "word",
      Actor: "word"
    },
    HostBearingsSiteOps: {
      Ops: "actor"
    },
    HostImpact: {
      Subject: "subject",
      Actor: "word",
      Scope: "word"
    },
    FreezePositionAtImpact: "bit",
    PullBack: "real",
    LocalOffset: "reals",
    OverridingLength: "reals",
    PatchAngle: "real",
    IsLocal: "bit",
    Up: "reals",
    RestrictToCircumference: "bit",
    HalfWidth: "real",
    Distribution: "word",
    YawHalfAngle: "real",
    PitchHalfAngle: "real",
    ForwardAngle: "real",
    UpAngle: "real",
    IsUpDominantWhenOrthogonalized: "bit",
    Acceleration: "real",
    Deceleration: "real",
    MaxSpeed: "real",
    ShadowFlags: "{bit}",
    TipabilityFlags: "{bit}",
    Sharing: "word",
    HostLaunch: {
      Subject: "subject",
      Actor: "word",
      Scope: "word"
    },
    HostLaunchSiteOps: {
      Ops: "actor",
      HoldPosition: "bit",
      HoldRotation: "bit"
    },
    Subject: {
      Filters: "words",
      Terms: "terms"
    },
    OnResponse: [
      {
        Send: "send",
        Target: "string",
        Scope: "word"
      }
    ],
    NotifyArcKey: "word",
    NotifyRadiusKey: "word",
    RegionFlags: "{bit}",
    HostForProps: {
      Subject: "subject",
      Scope: "word",
      Actor: "word"
    },
    Magnitude: "reals",
    Duration: "real",
    InfluenceRange: "real",
    BlendTime: "real",
    HostInitialSiteOps: {
      Ops: "actor"
    },
    PhysicsImpactDefault: {
      ActorModel: "actor",
      ActorSound: "actor",
      OccuranceThrottlingDistance: "reals",
      AutoVolumeRangeMin: "real"
    },
    Receiver: {
      Subject: "subject"
    },
    Direction: "word",
    HostEnd: {
      Subject: "subject",
      Scope: "word"
    },
    Length: "reals",
    FixedSize: "int",
    HeightOffset: "real",
    DoFAttenuationStartModel: "model",
    DoFAttenuationEndModel: "model",
    MinimapIcon: "file",
    Footprint: "string",
    CreepHeightClass: "word",
    Facing: "real",
    sprayIndex: "int",
    LaunchRequest: {
      Subject: "subject",
      Actor: "word",
      Scope: "word"
    },
    FaceFXTarget: "word",
    AnimTargets: "word",
    CantSelectUncontrollableTooltip: "link",
    effectPickup: "effect",
    actorCreate: "actor",
    Text: "link",
    RequiredSquibType: "word",
    StateThinkInterval: "real",
    StateArray: [
      {
        Name: "word",
        Terms: "terms"
      }
    ],
    CreepRateGrow: "word",
    CreepRateShrink: "word",
    PlacementSound: "sound",
    LifeArmorIcon: "file",
    TerrainSquibs: [
      {
        MovementDistance: "reals",
        IdlePeriod: "reals",
        RangeDown: "real",
        RangeDownFade: "real",
        AttachQuery: {
          Methods: "word"
        },
        Visuals: {
          TerrainPhysicsMaterial: "word",
          ActorModel: "actor",
          ModelLink: "string",
          Flags: "{bit}"
        },
        RangeUp: "real",
        GroupName: "word"
      }
    ],
    AddonIndicator: "link",
    GroupIcon: {
      Image: "[string]"
    },
    Wireframe: {
      Image: "[string]"
    },
    StatusHarvesterData: {
      Text: "link",
      SearchFilters: "filters",
      SearchRadius: "int"
    },
    WireframeShield: {
      Image: "[string]"
    },
    abil: "abil",
    Height: "reals",
    Width: "real",
    //todo
    // <Layers Sound="Disruptor_DisruptionOvercharge_Discharge">
    // <Chance value="100"/>
    // <Pitch value="0.000000,0.000000"/>
    // <PlayDelay value="0,0"/>
    // <Volume value="0.000000,0.000000"/>
    // </Layers>
    Layers: [
      {
        Sound: "sound",
        PitchSource: "word",
        PlayDelaySource: "word",
        VolumeSource: "word",
        Chance: "int",
        Pitch: "reals",
        PlayDelay: "ints",
        Volume: "reals",
      }
    ],
    Weapon: "weapon",
    StageArray: [
      {
        AnimProps: "words",
        BlendTime: "real"
      }
    ],
    LocalOffsetFor2ndVisibilityTest: "reals",
    Mean: "real",
    HeightOffsetOnCliff: "real",
    CliffTests: "[reals]",
    Range: "real",
    AcquisitionYawHalfArc: "real",
    AcquisitionPitchHalfArc: "real",
    AccuracyHalfArc: "real",
    HostEndSiteOps: {
      Ops: "actor",
      HoldPosition: "bit",
      HoldRotation: "bit"
    },
    Types: {
      Id: "word",
      Start: {
        Group: "word",
        Weight: "bit",
        Time: "int"
      },
      Stop: {
        Group: "word",
        Weight: "bit",
        Time: "int"
      },
      Name: "link"
    },
    HostImpactSiteOps: {
      Ops: "actor",
      HoldPosition: "bit",
      HoldRotation: "bit"
    },
    Angle: "reals",
    TexSets: "[word]",
    VisibleOpacityBlendDuration: "real",
    NoFlyZoneSoftRadius: "int",
    NoFlyZoneHardRadius: "int",
    EditorFacingAlignment: "int",
    Speed: "real",
    SpeedMax: "real",
    type: "word",
    HeightDelta: "real",
    StandAnimTurnTime: "real",
    StandAnimTurnTimeScaleMin: "real",
    sight: "word",
    ErrorArray: [
      {
        Error: "word",
        Sound: "sound",
        GroupSound: "sound",
        Text: "word"
      }
    ],
    AbilSoundArray: [
      {
        AbilCmd: "abilcmd",
        Sound: "sound"
      }
    ],
    ShieldRippleScaleFactor: "real",
    HeightTests: "[reals]",
    HeightTestType: "word",
    ImpactPhysics: [
      {
        Name: "word",
        MatchKeys: "word",
        Physics: "word",
        AttackAnimProps: "words",
        AttackModelVariation: "bit"
      }
    ],
    SelectAbilCmd: "abilcmd",
    Ripple: "word",
    ScaleDamageMin: "real",
    ScaleDamageMax: "real",
    RadiusMin: "real",
    RadiusMax: "real",
    VisualDirectionalFacer: "word",
    VisualDirectionalHeader: "word",
    VisualDirectionless: "word",
    ActionFlags: "{bit}",


      //todo
      // <GroupIconVariations Number="0">
      // <Image value="Assets\Textures\Wireframe-Protoss-DarkTemplar00.dds"/>
      // </GroupIconVariations>

    WireframeShieldVariations: [{Number: "bit", Image: "[string]"}],
    GroupIconVariations: [{Number: "int", Image: "string"}],
    WireframeVariations: [{Number: "int", Image: "string"}],


    CooldownDisplay: "words",
    HostImpactSource: {
      Subject: "subject",
      ReachAcrossEffectTrees: "bit"
    },
    Elevation: "reals",
    ElevationPeriod: "reals",
    Pitch: "reals",
    PitchPeriod: "reals",
    Roll: "reals",
    RollPeriod: "reals",
    FoliageSpawnTarget: "word",
    SubjectResponses: [
      {
        Filters: "words",
        Terms: "terms",
        OnResponse: [
          {
            Target: "word",
            Send: "send"
          }
        ]
      }
    ],
    UnitModelFrameActor: "actor",
    HostFor2ndVisibilityTest: {
      Subject: "subject",
      Actor: "word"
    },
    HostedAttaches: [
      {
        Name: "word",
        AttachQuery: {
          Methods: "string"
        },
        HostSiteOps: {
          Ops: "actor"
        }
      }
    ],
    ImpactSiteOpsReaction: {
      Ops: "actor",
      HoldPosition: "bit",
      HoldRotation: "bit"
    },
    CombatRevealDurationType: "word",
    HostReturn: {
      Subject: "subject",
      Scope: "word",
      Actor: "word",
      Effect: "effect"
    },
    HostReturnSiteOps: {
      Ops: "actor"
    },
    MovementHerdNode: "string",
    VisualArray: "[word]",
    Behavior: "behavior",
    EditorAnim: "words",
    weapon: "weapon",
    BaseYaw: "int",
    BaseYawPeriod: "real",
    BaseRadiusInner: "real",
    BaseRadiusOuter: "real",
    BaseRadiusPeriod: "real",
    BasePitch: "real",
    BasePitchPeriod: "real",
    LocalAxis: "reals",
    Rate: "real",
    deco: "word",
    unitNameAlt: "unit",
    alt: "word",
    HostOffset: {
      Subject: "subject",
      Scope: "word"
    },
    HostOffsetSiteOps: {
      Ops: "actor"
    },
    PhysicsImpacts: [
      {
        Name: "word",
        Group: "word",
        ActorModel: "actor",
        ModelLink: "word",
        OccuranceThrottlingDistance: "reals",
        OccuranceThrottlingPeriod: "reals",
        SoundLink: "sound",
        AutoVolumeRange: "word",
        AutoVolumeRangeMin: "real",
        AutoVolumeRangeMax: "real",
        ActorSound: "word"
      }
    ],
    Abil: {
      Link: "abil"
    },
    DamagePhysics: [
      {
        Name: "word",
        MatchKeys: "word",
        Physics: "word"
      }
    ],
    TiltAmount: "real",
    AngleRate: "real",
    Aggregate: {
      Type: "word",
      BaseElementLengthMax: "real",
      SegmentRotationRate: "real",
      SwimmingUndulationElementLength: "real",
      SwimmingUndulationStartOffset: "real",
      SwimmingUndulationAmplitudePerUnit: "real",
      SwimmingUndulationWavelength: "real",
      SwimmingUndulationIdlePhaseVelocity: "real",
      TurnSmoothingActivationAngleMin: "real",
      TurnSmoothingActivationAngleMax: "real",
      TurnSmoothingRadiusMax: "real",
      UncoilingWhileIdleRotationRateMin: "real",
      UncoilingWhileIdleRotationRateMax: "real",
      Flags: "{bit}"
    },
    Head: "actor",
    HostZ: {
      Subject: "subject"
    },
    Segment: {
      Radius: "real"
    },
    IsHemisphere: "bit",
    PlayMode: "word",
    LoopCount: "int",
    LookAtPriorityList: "[word]",
    ScopeBearingsTracking: "word",
    IconScale: "reals",
    UnitBorderNormalColor: "ints",
    UnitBorderSubgroupColor: "ints",
    UnitKillRank: {
      Text: "link"
    },
    InfoText: "link",
    ForceCommencementFrom: "word",
    VitalColors: [
      {
        index: "word",
        ColorArray: "[ints]"
      }
    ],
    VitalNames: "{link}",
    WireframeShieldColor: "ints",
    CustomUnitStatusFrame: "link",
    StatusBarOn: "{bit}",
    impactEffect: "effect",
    MinimapTooltip: "link",
    BoostedHeight: "{int}",
    upgradedActorCreate: "actor",
    ImpactSoundActor: "actor",
    Decoration: {
      Actor: "word",
      SpawnInterval: "real",
      TravelSpeed: "real",
      Flags: "{bit}"
    },
    MinimapIconTintColor: "ints",
    HighlightSubTooltip: "link",
    unitSound: "unit",
    Sight: "word"
  },
  alert: {
    Display: "{bit}",
    PrimaryActions: "{bit}",
    SecondaryActions: "{bit}",
    Flags: "{bit}",
    Fade: "real",
    Life: "real",
    PingColor: "ints",
    PingTime: "real",
    Sound: "sound",
    Text: "link",
    Tooltip: "link",
    Voice: "word",
    SupersededVolume: "real",
    OverlapDuration: "real",
    OverlapGlobalCount: "int",
    OverlapLocalCount: "bit",
    OverlapLocalRadius: "int",
    QueueTime: "real",
    Icon: "file",
    Peripheral: "word",
    PingModel: "model"
  },
  artifact: {
    Name: "link",
    InfoText: "link",
    Model: "model",
    TileCutsceneFile: "string",
    PreviewCutsceneFile: "string",
    HeroSelectCutsceneFile: "string",
    AdditionalSearchText: "link",
    Talent: "word",
    HyperlinkId: "word",
    ApplyTo: "{bit}"
  },
  artifactslot: {
    Name: "link"
  },
  attachmethod: {
    Multiplier: "int",
    RequestCount: "int",
    Location: {
      Value: "word"
    },
    Distribution: "word",
    AttachType: "word",
    Keys: [
      {
        Keyword: "word",
        value: "word",
        Index: "int"
      }
    ],
    PassChanceEach: "real",
    PassChanceFull: "real",
    Targets: "[string]",
    Logic: "word",
    Tests: "{bit}",
    Type: "word",
    FilterType: "word",
    Keyword: "word",
    Driver: "string",
    VolumeFactor: "real",
    ProximityFactorNear: "real",
    ProximityFactorFar: "real",
    SortResults: "bit",
    ExponentialMean: "real",
    ReductionType: "word",
    RequestPercentage: "real",
    Base: "string",
    PortLimit: "int",
    RequestCountRange: "int"
  },
  behavior: {
    Name: "link",
    Tooltip: "link",
    InfoIcon: "file",
    EditorCategories: "categories",
    BehaviorFlags: "{bit}",
    AttackModifierFlags: "{bit}",
    InfoFlags: "{bit}",
    MaxStackCount: "int",
    MaxPoints: "int",
    PointDisplayFlags: "{bit}",
    PrimaryName: "link",
    PrimaryTooltip: "link",
    DurationBonusMin: "int",
    DurationBonusMax: "int",
    TimeScaleSource: {
      Value: "word"
    },
    Player: {
      Value: "word"
    },
    AcquirePlayer: {
      Value: "word",
      Effect: "effect"
    },
    BuffFlags: "{bit}",
    DamageResponse: {
      Location: "word",
      ModifyFraction: "real",
      Chance: "real",
      ModifyMinimumDamage: "bit",
      Cost: {
        Charge: {
          Link: "link",
          CountMax: "int",
          CountStart: "int",
          CountUse: "bit"
        },
        Cooldown: {
          Link: "link",
          TimeUse: "real",
          Location: "word",
          TimeStart: "bit"
        }
      },
      Kind: "{bit}",
      ModifyAmount: "int",
      ClampMinimum: "bit",
      Handled: "word",
      Minimum: "int",
      ClampMaximum: "int",
      TargetFilters: "filters",
      Fatal: "bit",
      RequireEffectArray: "[effect]",
      ModifyLimit: "int",
      ExcludeEffectArray: "[effect]",
      ValidatorArray: "[validator]"
    },
    KillCredit: {
      Value: "word"
    },
    RevealUnit: {
      Value: "word"
    },
    SharedListPlayer: {
      Value: "word"
    },
    Modification: {
      DetectFilters: "filters",
      RadarFilters: "filters",
      StateFlags: "{bit}",
      DamageDealtFraction: "{real}",
      Radar: "int",
      MoveSpeedMultiplier: "real",
      ModifyFlags: "{bit}",
      DamageDealtMaximum: "{bit}",
      DamageTakenFraction: "{real}",
      AbilLinkEnableArray: "[abil]",
      BehaviorLinkDisableArray: "[behavior]",
      BehaviorClassDisableArray: "{bit}",
      AbilClassDisableArray: "{bit}",
      AbilLinkDisableArray: "[abil]",
      DeathResponse: {
        Cost: {
          Charge: {
            Link: "link"
          },
          Cooldown: {
            Link: "link"
          }
        },
        Chance: "real",
        Effect: "effect",
        Type: "{bit}"
      },
      TimeScale: "real",
      VitalRegenArray: "{real}",
      WeaponDisableArray: "[weapon]",
      Height: "real",
      HeightTime: "{real}",
      PlaneDelta: "{int}",
      AbilClassEnableArray: "{bit}",
      BehaviorLinkEnableArray: "[behavior]",
      AttackSpeedMultiplier: "real",
      Food: "int",
      QueueCount: "bit",
      QueueSize: "int",
      WeaponRange: "real",
      Detect: "real",
      MoveSpeedMinimum: "real",
      LifeArmorMultiplier: "real",
      ShieldArmorMultiplier: "bit",
      SubgroupPriority: "int",
      SightBonus: "int",
      DetectArc: "bit",
      RadarArc: "bit",
      MoveSpeedBonus: "real",
      WeaponEnableArray: "[weapon]",
      VitalMaxArray: "{int}",
      WeaponArray: [
        {
          Link: "weapon",
          Turret: "turret"
        }
      ],
      AccelerationBonus: "real",
      MoveSpeedMaximum: "real",
      RateMultiplierArray: "{real}",
      SightMaximum: "int",
      DecelerationBonus: "int",
      DamageDealtAttributeScaled: "{int}",
      DamageDealtUnscaled: "{int}",
      VitalMaxFractionArray: "{real}",
      AccelerationMultiplier: "real",
      DamageDealtScaled: "{int}",
      WeaponScanBonus: "real",
      SnareMultiplier: "bit",
      LifeArmorBonus: "int",
      TurretDisableArray: "[turret]",
      VitalRegenMultiplier: "{real}",
      RangedWeaponRange: "int",
      UnifiedMoveSpeedFactor: "real",
      ShieldArmorBonus: "int",
      BehaviorCategoriesDisable: "{bit}",
      AdditiveMoveSpeedFactor: "real",
      AdditiveAttackSpeedFactor: "real",
      AbilCategoriesEnable: "{bit}",
      HealDealtMultiplier: "int"
    },
    BehaviorCategories: "{bit}",
    Chance: "bit",
    ConjoinedFlags: "{bit}",
    PowerLink: "word",
    CliffLevelFlags: "{bit}",
    CarryResourceBehavior: "behavior",
    EnabledSearchFilters: "filters",
    EnabledSearchRadius: "int",
    Range: "real",
    Flags: "{bit}",
    ShareFilters: "{filters}",
    TargetFilters: "{filters}",
    XPFraction: "{bit}",
    TimeLimitFactor: "bit",
    DurationRandomMax: "real",
    DisplayDuration: "{bit}",
    ExpireEffect: "effect",
    Alignment: "word",
    Duration: "real",
    DisableValidatorArray: "[validator]",
    PeriodicEffect: "effect",
    RemoveValidatorArray: "[validator]",
    Period: "real",
    Capacity: "int",
    HarvestTime: "real",
    HarvestAmount: "int",
    RequiredAlliance: "word",
    ExhaustedAlert: "alert",
    IdealHarvesterCount: "int",
    Delay: "real",
    Leash: "bit",
    PeriodCount: "int",
    InitialEffect: "effect",
    MaxTrackedUnits: "int",
    UnitAddedAtMaxRule: "word",
    ReplacedEffect: "effect",
    UnitTrackerFlags: "{bit}",
    Cost: {
      Charge: {
        Link: "link"
      },
      Cooldown: {
        Link: "string",
        TimeStart: "int",
        Location: "word",
        TimeUse: "real"
      },
      Vital: "{int}"
    },
    Radius: "real",
    Contents: "int",
    ReturnDelay: "real",
    DepletionThreshold: "int",
    DepletionVariationCount: "int",
    TriggerHeightDeltaMin: "real",
    TriggerHeightDeltaMax: "real",
    InitiateRangeUp: "real",
    InitiateRangeDown: "real",
    JumpRangeMax: "int",
    Mover: "mover",
    MoverUp: "mover",
    MoverDown: "mover",
    DurationPreLaunch: "real",
    DurationPostLand: "real",
    DurationMoveOut: "real",
    Placeholder: "word",
    LandAdjustmentDown: "real",
    LandArrivalRange: "real",
    LandCheckRadius: "int",
    PlacementMinPowerLevel: "bit",
    PowerStageArray: [
      {
        Modification: {
          ModifyFlags: "{bit}",
          StateFlags: "{bit}",
          AbilLinkEnableArray: "[abil]",
          BehaviorLinkDisableArray: "[behavior]",
          SoundArray: "{sound}",
          DeathResponse: {
            Cost: {
              Charge: {
                Link: "link"
              },
              Cooldown: {
                Link: "link"
              }
            }
          },
          BehaviorLinkEnableArray: "[behavior]",
          RateMultiplierArray: "{real}"
        },
        MinPowerLevel: "int"
      }
    ],
    PoweredWhileUnderConstruction: "bit",
    InfoArray: [
      {
        Unit: "unit",
        MaxCount: "int",
        Delay: "real",
        Requirements: "requirement",
        Effect: "effect"
      }
    ],
    Slop: "bit",
    Center: "ints",
    Offset: "[ints]",
    Limit: "int",
    ConjoinedLink: "word",
    Birth: "word",
    Start: "word",
    Grown: "word",
    Build: "word",
    Requirements: "requirement",
    AINotifyEffect: "effect",
    Replace: "word",
    ReplaceLocation: {
      Effect: "effect",
      Value: "word"
    },
    RefreshEffect: "effect",
    Count: "int",
    CountDelay: "real",
    CountEffect: "effect",
    ResetDelay: "int",
    ResetEffect: "word",
    FinalEffect: "effect",
    MaxStackCountPerCaster: "bit",
    PowerLevel: "int",
    SharedXPFraction: "{real}",
    SharedXPRadius: "{int}",
    VeterancyLevelArray: [
      {
        MinVeterancyXP: "int",
        Modification: {
          MoveSpeedMultiplier: "int",
          AttackSpeedMultiplier: "real",
          WeaponRange: "bit",
          LifeArmorBonus: "bit",
          LifeArmorMultiplier: "bit",
          ShieldArmorMultiplier: "bit",
          DamageDealtUnscaled: "{int}",
          VitalMaxArray: "{int}"
        }
      }
    ],
    DurationRandomMin: "real",
    LandAdjustmentUp: "real",
    MinimumRange: "real"
  },
  button: {
    Name: "link",
    Tooltip: "link",
    AlertName: "link",
    AlertTooltip: "link",
    Hotkey: "link",
    HotkeyAlias: "word",
    TooltipFlags: "{bit}",
    UseHotkeyLabel: "bit",
    Icon: "file",
    AlertIcon: "file",
    EditorCategories: "categories",
    TintRacially: "bit",
    Universal: "bit",
    DefaultButtonLayout: {
      Column: "int",
      Row: "int"
    },
    Placeholder: "bit",
    SimpleDisplayText: "link",
    HotkeySet: "word",
    HidesForSimpleText: "bit",
    art: "string",
    TooltipAppender: [
      {
        Validator: "validator",
        Text: "link"
      }
    ]
  },
  character: {
    Name: "link",
    RaceCustom: "link",
    Attitude: "link",
    Timbre: "link",
    Dialect: "link",
    VoiceRef: "link",
    Description: "link",
    Gender: "word",
    Voice: "string",
    Race: "race",
    Color: "ints",
    Age: "int",
    Image: "string",
    Variations: [
      {
        Model: "model",
        DefaultCategories: "[string]",
        Name: "link",
        Actor: "actor"
      }
    ],
    Relevance: "word",
    Pitch: "int"
  },
  cliff: {
    CliffMesh: "cliff",
    CliffMaterial: "string",
    EditorIcon: "file",
    OccludeHeight: "real",
    TexSets: "word",
    CliffSet: "cliff",
    Model: "file",
    NumCellsDown: "int",
    NumCellsAcross: "int",
    HeightCodes: "[string]",
    EditorCategories: "categories",
    Footprint: "footprint"
  },
  cliffmesh: {
    ModelPath: "string",
    WeldNormals: "bit",
    CliffHeights: "[real]"
  },
  colorstyle: {
    Name: "link",
    ColorEntry: [
      {
        index: "word",
        Value: "{reals}"
      }
    ]
  },
  commander: {
    RequiredRewardArray: "[word]",
    Name: "link",
    StoreName: "link",
    Description: "link",
    PurchaseMessage: "link",
    Details: "link",
    Portrait: "string",
    HomePanelImage: "string",
    CutsceneFilterSelf: "word",
    CutsceneFilterAlly: "word",
    LoadingImage: "string",
    LoadingImageAlly: "string",
    TraitIcon: "file",
    CommanderAbilTitle: "link",
    Movie: "string",
    MasteryMaxRank: "int",
    FeaturedImagePath: "string",
    FeaturedDescription: "link",
    ProfileImagePath: "string",
    StoreTypeName: "link",
    LearnMoreBackgroundImage: "string",
    LearnMoreImage1: "string",
    LearnMoreImage2: "string",
    LearnMoreImage3: "string",
    LearnMoreTitleText1: "link",
    LearnMoreTitleText2: "link",
    LearnMoreTitleText3: "link",
    LearnMoreBodyText1: "link",
    LearnMoreBodyText2: "link",
    LearnMoreBodyText3: "link",
    Color: "ints",
    CommanderPrestigeAchievementId: "int",
    AttributeId: "word",
    Race: "race",
    LevelAchievementId: "int",
    UnitArray: [
      {
        Unit: "unit",
        Upgrade: "word"
      }
    ],
    TalentTreeArray: [
      {
        Talent: "talent",
        Level: "int",
        Type: "word",
        Unit: "unit",
        IsHidden: "bit"
      }
    ],
    CommanderAbilArray: [
      {
        Button: "button"
      }
    ],
    MasteryTalentArray: [
      {
        Talent: "talent",
        ValuePerRank: "real",
        MaxRank: "int",
        Type: "word",
        Bucket: "int",
        MaxValuePrecision: "bit"
      }
    ],
    ConsoleSkin: "consoleskin",
    PrestigeArray: "[word]",
    ProductId: "int",
    Campaign: "word",
    PurchaseImage: "string"
  },
  config: {
    Name: "link",
    CommanderMastery: "commander",
    CommanderDifficultyLevels: [
      {
        DifficultyLevel: "int",
        Name: "string",
        Description: "string",
        IsDefault: "bit",
        AISkillLevel: "int",
        CommanderLevel: "int",
        BeyondBrutalLevel: "int",
        RequirePartyToQueue: "bit",
        IsRetry: "bit"
      }
    ],
    CommanderAchievementCategoryId: "int",
    CoopCampaignAchievementCategoryId: "int",
    SilencePenaltyLicense: "int",
    FreeNonKRIGRLicense: "int",
    BoostLicense: "int",
    GameContentArray: "[words]"
  },
  consoleskin: {
    Name: "link",
    StoreName: "link",
    StoreTypeName: "link",
    Description: "link",
    ThumbnailImage: "string",
    FeaturedImage: "string",
    MinimapPanelModel: {
      Model: "file",
      Position: "reals",
      Scale: "reals"
    },
    InfoPanelModel: {
      Model: "file",
      Position: "reals",
      Scale: "reals"
    },
    CommandPanelModel: {
      Model: "file",
      Position: "reals",
      Scale: "reals"
    },
    Light: "light",
    race: "race",
    assetname: "word",
    preview: "word",
    Default: "bit",
    ReleaseDate: "link",
    RequiredReward: "reward",
    SkinId: "word",
    ProductId: "int",
    CommandPanelImage: "string",
    InfoPanelImage: "string",
    MinimapPanelImage: "string"
  },
  cursor: {
    Texture: "string",
    HotspotX: "int",
    HotspotY: "int"
  },
  datacollection: {
    Name: "link",
    Button: "word",
    EditorCategories: "categories",
    EditorIconSource: "word",
    TechInfoUnit: "word",
    TechInfoAbil: "word",
    TechInfoUpgrade: "word",
    DataRecord: [
      {
        Entry: "words"
      }
    ]
  },
  datacollectionpattern: {
    Fields: {
      Reference: "reference"
    }
  },
  decalpack: {
    Name: "link",
    StoreName: "link",
    StoreTypeName: "link",
    ProductId: "int",
    DecalArray: "[word]"
  },
  dsp: {
    Delay: "real",
    Depth: "real",
    DryMix: "real",
    Rate: "real",
    WetMix1: "real",
    WetMix2: "real",
    WetMix3: "real",
    Attack: "real",
    Release: "real",
    Level: "real",
    DecayRatio: "real",
    WetMix: "real",
    Cutoff: "real",
    Resonance: "real",
    FadeTime: "real",
    MaxAmp: "real",
    Threshhold: "real",
    Bandwidth: "real",
    Center: "real",
    Gain: "real",
    FFTSize: "int",
    Pitch: "real",
    DecayTime: "real",
    DecayHFRatio: "real",
    Density: "real",
    Diffusion: "real",
    HFReference: "real",
    LFReference: "real",
    ReflectionsLevel: "real",
    ReflectionsDelay: "real",
    ReverbLevel: "real",
    ReverbDelay: "real",
    RoomRolloffFactor: "real",
    Room: "real",
    ReleaseMs: "int",
    UseARC: "bit",
    ThresholdDB: "real",
    MakeUpGainDB: "real",
    SoftKneeWidthDB: "real",
    ARCReleaseMs: "int",
    ARCMinReleaseMs: "int",
    ARCMaxReleaseMs: "int",
    ARCReleaseSweepMs: "int",
    AttackMs: "int",
    Ratio: "real",
    GainMakeUp: "real",
    Threshold: "real",
    RoomHF: "real"
  },
  effect: {
    Name: "link",
    EditorCategories: "categories",
    Chance: "real",
    Marker: {
      Link: "string",
      MatchFlags: "{bit}",
      Count: "bit"
    },
    DamageModifierSource: {
      Value: "word"
    },
    OwningPlayer: {
      Value: "word"
    },
    Behavior: "behavior",
    ValidatorArray: "[validator]",
    WhichUnit: {
      Value: "word",
      Effect: "effect"
    },
    Count: "int",
    MassFraction: "bit",
    WhichLocation: {
      Value: "word",
      Effect: "effect"
    },
    Kinetic: "word",
    ImpactUnit: {
      Value: "word",
      Effect: "effect"
    },
    Flags: "{bit}",
    TimeScaleSource: {
      Value: "word"
    },
    OffsetVectorStartLocation: {
      Value: "word",
      Effect: "effect"
    },
    OffsetVectorEndLocation: {
      Value: "word",
      Effect: "effect"
    },
    OffsetFacingFallback: {
      Value: "word"
    },
    SpawnCount: "int",
    CreateFlags: "{bit}",
    RallyUnit: {
      Value: "word",
      Effect: "effect"
    },
    SpawnRange: "real",
    SelectUnit: {
      Value: "word"
    },
    CreepFlags: "{bit}",
    Radius: "real",
    Visibility: "word",
    MaxCount: "int",
    MinCountError: "word",
    LaunchLocation: {
      Value: "word",
      Effect: "effect"
    },
    ImpactLocation: {
      Value: "word",
      Effect: "effect"
    },
    SearchFlags: "{bit}",
    Type: "word",
    Fraction: "bit",
    Player: {
      Value: "word"
    },
    Target: {
      Value: "word",
      Effect: "effect"
    },
    DeathType: "word",
    AmmoOwner: {
      Value: "word"
    },
    AmmoUnit: "unit",
    PlacementAround: {
      Value: "word",
      Effect: "effect"
    },
    WhichPlayer: {
      Value: "word"
    },
    LaunchUnit: {
      Value: "word",
      Effect: "effect"
    },
    KillCreditUnit: {
      Value: "word"
    },
    SelectTransferUnit: {
      Value: "word",
      Effect: "effect"
    },
    FacingLocation: {
      Value: "word",
      Effect: "effect"
    },
    ArmorReduction: "real",
    Kind: "word",
    ResponseFlags: "{bit}",
    ImpactFilters: "filters",
    BehaviorClass: "word",
    BehaviorLink: "behavior",
    ExcludeOriginPlayer: {
      Value: "word"
    },
    ExcludeCasterUnit: {
      Value: "word"
    },
    RequireOriginPlayer: {
      Value: "word"
    },
    RequireCasterUnit: {
      Value: "word"
    },
    MatchesAll: "bit",
    KineticLink: "word",
    ClearQueuedOrders: "bit",
    MinDistance: "real",
    PlacementArc: "int",
    PlacementRange: "real",
    Range: "int",
    TeleportFlags: "{bit}",
    BehaviorAlignment: "word",
    TargetLocation: {
      Value: "word",
      Effect: "effect"
    },
    Key: "word",
    Amount: "real",
    SourceKey: "word",
    ValidateMin: "bit",
    TargetLocationType: "word",
    ContainerUnit: {
      Value: "word"
    },
    ContainerType: "word",
    AreaArray: [
      {
        Radius: "real",
        Effect: "effect",
        RectangleWidth: "real",
        RectangleHeight: "real",
        MaxCount: "int",
        Fraction: "real",
        Arc: "real",
        Validator: "validator",
        RadiusBonus: "real",
        FacingAdjustment: "real"
      }
    ],
    Death: "word",
    ExpireDelay: "real",
    FacingType: "word",
    SelectTransferFlags: "{bit}",
    SearchFilters: "filters",
    ImpactEffect: "effect",
    EffectArray: "[effect]",
    InitialEffect: "effect",
    LaunchEffect: "effect",
    PeriodicEffectArray: "[effect]",
    PeriodicPeriodArray: "[real]",
    PeriodicValidator: "validator",
    PeriodCount: "int",
    RevealerParams: {
      Duration: "real",
      ShapeExpansion: "real",
      RevealFlags: "{bit}"
    },
    FinalEffect: "effect",
    ExcludeArray: [
      {
        Value: "word",
        Effect: "effect"
      }
    ],
    TargetSorts: {
      SortArray: "[targetsort]",
      RequestCount: "int",
      RequestPercentage: "bit"
    },
    Abil: "abil",
    CmdFlags: "{bit}",
    SpawnEffect: "effect",
    SpawnOwner: {
      Value: "word"
    },
    SpawnUnit: "unit",
    VitalArray: [
      {
        index: "word",
        ChangeFraction: "real",
        Change: "real"
      }
    ],
    TrackedUnit: {
      Value: "word"
    },
    Upgrades: {
      Upgrade: "upgrade",
      Count: "bit"
    },
    ExpireEffect: "effect",
    Alert: "alert",
    VitalFractionCurrent: "{real}",
    LeechFraction: "{int}",
    AINotifyEffect: "effect",
    AINotifyFlags: "{bit}",
    CaseArray: [
      {
        Validator: "validator",
        Effect: "effect",
        FallThrough: "bit"
      }
    ],
    MinCount: "bit",
    AbilCmdIndex: "int",
    SourceLocation: {
      Effect: "effect",
      Value: "word"
    },
    PeriodicOffsetArray: "[reals]",
    FinishEffect: "effect",
    Movers: [
      {
        Link: "mover",
        IfRangeLTE: "int"
      }
    ],
    InitialDelay: "real",
    Effect: "effect",
    PlaceholderUnit: "unit",
    KindSplash: "word",
    ModifyFlags: "{bit}",
    DrainResourceCostFactor: "{real}",
    RechargeVitalRate: "real",
    TimeFactor: "bit",
    AttributeBonus: "{real}",
    CaseDefault: "word",
    RevealRadius: "real",
    RevealFlags: "{bit}",
    CalldownCount: "bit",
    CalldownEffect: "effect",
    ReturnMovers: [
      {
        Link: "mover",
        IfRangeLTE: "int"
      }
    ],
    ReturnDelay: "real",
    SalvageFactor: {
      Resource: "{real}"
    },
    IncludeArray: [
      {
        Effect: "effect",
        Value: "word"
      }
    ],
    MoverRollingJump: "bit",
    DrainVital: "word",
    DrainVitalCostFactor: {
      value: "real",
      AccumulatorArray: "[accumulator]"
    },
    AbilCmd: "abilcmd",
    SpawnOffset: "reals",
    TypeFallbackUnit: {
      Value: "word",
      Effect: "effect"
    },
    CopyOrderCount: "int",
    ModifyOwnerPlayer: {
      Value: "word"
    },
    FinalOffset: "reals",
    Origin: {
      Effect: "effect",
      Value: "word"
    },
    InitialOffset: "reals",
    Resources: "{int}",
    ShieldBonus: "int",
    EffectExternal: "effect",
    RechargeVital: "word",
    ModifyTurret: {
      Turret: "turret",
      Target: {
        Effect: "effect",
        Value: "word"
      },
      Flags: "{bit}",
      Action: "word",
      AimCompleteEffect: "effect"
    },
    EffectInternal: "effect",
    AmmoEffect: "effect",
    CopyRallyCount: "int",
    ImpactOffset: "reals",
    LaunchOffset: "reals",
    Cost: [
      {
        Abil: "string",
        CooldownOperation: "word",
        CooldownTimeUse: "real",
        ChargeCountUse: "int",
        Charge: {
          CountMax: "int",
          CountUse: "int",
          Link: "link",
          Location: "word"
        },
        Player: {
          Value: "word"
        },
        ChargeTimeUse: "real",
        Behavior: "behavior"
      }
    ],
    Duration: "real",
    VitalBonus: "{int}",
    Copy: "bit",
    AreaRelativeOffset: "reals",
    VitalFractionMax: "{real}",
    RetargetFilters: "filters",
    RetargetRange: "int",
    ImpactUnitValidator: "validator",
    ResourcesHarvestedFraction: "bit",
    HeightMap: "word",
    TransferUnit: {
      Value: "word"
    },
    Height: "real",
    HeightTime: "real",
    ImpactRange: "real",
    MoverExecuteJump: "bit",
    PeriodicEffect: "effect",
    InterruptEffect: "effect",
    TeleportEffect: "effect",
    abil: "abil",
    PeriodicPeriod: "real",
    OffsetRandMode: "word",
    RechargeVitalMax: "int",
    Random: "bit",
    Weapon: {
      Weapon: "weapon",
      CooldownOperation: "word",
      CooldownFraction: "bit"
    }
  },
  footprint: {
    Flags: "{bit}",
    Layers: [
      {
        index: "word",
        Area: "ints",
        Sets: [
          {
            Character: "string",
            Negative: "{bit}",
            Positive: "{bit}"
          }
        ],
        Rows: "[string]"
      }
    ],
    Shape: {
      Radius: "real",
      Offsets: "string",
      Borders: "string",
      Mode: "word"
    },
    EditorCategories: "categories"
  },
  fow: {
    Color: "ints",
    BlendSpeed: "int",
    Hidden: "bit",
    UnhideRadius: "int",
    Expand: "bit"
  },
  gameui: {
    SoundQuality: [
      {
        AutoDetectCPUCoreMaximum: "int",
        Channels: "int",
        Name: "link",
        Format: "word",
        SampleRate: "int",
        SpeakerMode: "word",
        VariationMaximum: "{int}",
        Resampler: "word",
        Flags: "{bit}"
      }
    ],
    RegionNameSize: "int",
    SelectionData: {
      SelectionWidth: "real",
      SelectionFallOff: "real",
      SelectionAlpha: "reals",
      SelectionTiming: "reals",
      SelectionSegmentCount: "bit",
      SelectionSegmentPercentSolid: "real",
      SelectionInnerOffsetRatio: "real",
      SelectionInnerBoundaryRatio: "real",
      SelectionInnerBoundaryFallOffRatio: "real",
      PreselectionWidth: "real",
      PreselectionFallOff: "real",
      PreselectionAlpha: "reals",
      PreselectionTiming: "reals",
      PreselectionSegmentCount: "int",
      PreselectionSegmentPercentSolid: "real",
      PreselectionRotationSpeed: "real"
    },
    SoundData: [
      {
        index: "word",
        MixerPriority: "int",
        Volume: "real",
        MuteControl: "word",
        MuteFadeOut: [
          {
            Time: "int"
          }
        ],
        VolumeRolloffPoints: [
          {
            Distance: "real"
          }
        ],
        VolumeControl: "word",
        DupeFadeOut: [
          {
            Time: "int"
          }
        ],
        AlertFadeVolume: "reals",
        ThresholdPoints: [
          {
            Count: "int",
            Volume: "real"
          }
        ],
        VolumeBaseline: "real",
        AlertFadeTimeOut: "int",
        AlertFadeTimeIn: "int",
        DSPArray: "[dsp]"
      }
    ],
    LookAtTypes: [
      {
        Id: "word",
        Name: "link",
        Start: [
          {
            Group: "word",
            Weight: "real",
            Time: "int"
          }
        ],
        Stop: [
          {
            Group: "word",
            Weight: "bit",
            Time: "int"
          }
        ]
      }
    ],
    CameraShakeAmplitudes: [
      {
        Id: "word",
        Name: "link",
        Position: "reals",
        Rotation: {
          Yaw: "real",
          Pitch: "real",
          Roll: "real"
        }
      }
    ],
    CameraShakeFrequencies: [
      {
        Id: "word",
        Name: "link",
        Position: "reals",
        Rotation: {
          Yaw: "real",
          Pitch: "real",
          Roll: "real"
        }
      }
    ],
    ListenerAngleRolloff: [
      {
        CameraValue: "real",
        ListenerFactor: "real"
      }
    ],
    ListenerDistanceRolloff: [
      {
        CameraValue: "real",
        ListenerFactor: "real"
      }
    ],
    PlanetPanelDefaultBackground: "word",
    WayPointMultiUnitFadePoint: "real",
    WayPointMultiUnitFadeAlpha: "real",
    WayPointLineWidth: "real",
    WayPointTileLength: "real",
    DefaultPathColor: "{ints}",
    DefaultPathLineWidth: "{real}",
    DefaultPathTexture: "{string}",
    DefaultPathTileLength: "{real}",
    DefaultPathStepModel: "{string}",
    DefaultPathStepModelScale: "{real}",
    PointModels: [
      {
        index: "word",
        Model: "file",
        Scale: "real",
        NameSize: "int",
        SelectionOffset: "reals",
        SelectionRadius: "real"
      }
    ],
    OverrideColors: [
      {
        index: "word",
        Value: "{reals}"
      }
    ],
    ColorBlindColors: [
      {
        index: "word",
        Value: "{reals}"
      }
    ],
    RadarAlpha: "int",
    PlayerIdObserverColorMap: "{word}",
    InfoColorBuffed: "ints",
    InfoColorDebuffed: "ints",
    InfoColorUpgraded: "ints",
    RequirementsSatisfiedColor: "ints",
    RequirementsUnsatisfiedColor: "ints",
    UnitDamageFlashDuration: "int",
    UnitDamageNotificationCooldown: "int",
    UnitDamageNotificationDelay: "int",
    CancelTargetModeButtonFace: "button",
    CancelPlacementModeButtonFace: "button",
    PlacementDisplayBonusRadius: "int",
    PlacementErrorColor: "ints",
    PlacementWarningColor: "ints",
    PlacementPerfectColor: "ints",
    PlacementColorBlindErrorColor: "ints",
    PlacementColorBlindWarningColor: "ints",
    PlacementColorBlindDefaultColor: "ints",
    PlacementGridDimensions: "ints",
    ScreenModeTransitionDuration: "int",
    PossibleEnemyPlacementPingDuration: "int",
    PossibleEnemyPlacementPingModel: "model",
    PossibleEnemyPlacementPingColor: "ints",
    CostDisplayFade: "int",
    CostDisplayHeight: "int",
    CostDisplayHeightOffset: "real",
    CostDisplaySpeed: "int",
    CostDisplayTime: "int",
    MinimapData: {
      InnerBorderColor: "ints",
      OuterBorderColor: "ints",
      FrustumColor: "ints",
      ResourceUnitColor: "ints",
      ResourceUnitColorBlindColor: "ints",
      BlipUnitColor: "ints",
      UnitBorderColor: "ints",
      SelectedUnitBorderColor: "ints",
      BackGroundColor: "ints",
      BorderSize: "real",
      SelectedBorderSize: "real",
      MinUnitDotSize: "real",
      RadarAlpha: "int"
    },
    BehaviorIconColors: "{ints}",
    BehaviorBorderColors: "{ints}",
    VitalColors: [
      {
        index: "word",
        ColorArray: "[ints]"
      }
    ],
    SelectionColors: "{ints}",
    SelectionColorBlindColors: "{ints}",
    WireframeColorArray: "[ints]",
    CostDisplayColor: "{ints}",
    GlowPeakMultiplier: "reals",
    TransmissionSoundDepth: "real",
    AlertPanMaxVelocity: "real",
    AlertPanMaxDuration: "real",
    AlertPanMinDuration: "real",
    BeaconMinimapIcon: "file",
    BeaconMinimapRenderPriority: "word",
    DefaultInfoTooltipTypes: "words",
    CameraEventThresholdDistance: "real",
    CameraEventThresholdPitch: "real",
    CameraEventThresholdYaw: "real",
    CameraEventThresholdTarget: "real",
    GameCategories: [
      {
        Info: {
          Id: "int",
          Name: "link",
          Description: "link"
        },
        Modes: [
          {
            Id: "int",
            CanOverrideText: "bit",
            Name: "link",
            Description: "link",
            IsTutorial: "bit"
          }
        ],
        Usage: "word"
      }
    ],
    AutoVariantArcade: {
      CategoryId: "bit",
      ModeId: "bit",
      Options: "{bit}"
    },
    AutoVariantMelee: {
      CategoryId: "int",
      ModeId: "bit",
      Options: "{bit}"
    },
    DefaultVariants: [
      {
        CategoryId: "int",
        ModeId: "int",
        MinPlayers: "int",
        MaxPlayers: "int",
        TeamCount: "int",
        PlayersPerTeam: "int",
        Options: "{bit}",
        AIDifficulty: "int",
        PlayersPerTandem: "int"
      }
    ],
    DefaultUIRace: "race",
    MinCooldownDisplayDuration: "int",
    MinTimeDisplayDuration: "int",
    AchievementTags: "[word]",
    AltSoundtrack: [
      {
        AltSoundtrackName: "link",
        Suffix: "word"
      }
    ],
    TargetModeValidation: "word",
    MusicArray: "[word]",
    IntroMusic: "word",
    PostGameMusic: "word",
    CreditsMusic: "word",
    LoopAmbience: "word",
    ObjectGroupData: [
      {
        MinimapIcon: "file",
        MinLevel: "int"
      }
    ],
    LoadingScreenHelpIntro: [
      {
        Text: "link"
      }
    ],
    LoadingScreenHelp: [
      {
        Text: "link",
        Race: "race"
      }
    ],
    LoadingBars: [
      {
        Name: "link",
        FrameSuffix: "word"
      }
    ],
    UnitKillRank: [
      {
        Text: "link",
        MinKills: "int"
      }
    ],
    ObserverSoundtrack: "soundtrack",
    StrobeHaloEmission: "real",
    StrobeHighlightColor: "ints",
    TutorialArray: [
      {
        Title: "link",
        Icon: "file",
        Movie: "string"
      }
    ],
    MixRouting: [
      {
        index: "word",
        ParentCategory: "word"
      }
    ],
    StartupMovieArray: [
      {
        Name: "link",
        Path: "string",
        Source: "string"
      }
    ],
    HelpTechTitle: "link",
    HelpGameMechanics: [
      {
        Icon: "file",
        IconBackground: "link",
        Name: "link",
        Description: "link"
      }
    ],
    HelpControlCategories: [
      {
        Name: "link",
        Description: "link"
      }
    ],
    HelpControls: [
      {
        Category: "link",
        Name: "link",
        Description: "link",
        Basic: "bit"
      }
    ],
    HotkeyInfoArray: [
      {
        index: "word",
        Category: "link",
        Name: "link",
        Tooltip: "link"
      }
    ],
    CutsceneAssetPath: [
      {
        Path: "string",
        Theme: "word"
      }
    ],
    CutsceneThemeChoiceArray: "[link]",
    CutsceneLatest: "word",
    StrobeCycleLength: "int",
    StrobeFalloff: "real",
    StrobeHeight: "real",
    HelpTechTreeSuffix: "word",
    DSPArray: "[dsp]",
    HelpHiddenInGlue: "bit",
    DisplayScaledTime: "bit"
  },
  herd: {
    PositionBias: "real",
    NodeSearchRadius: "real",
    Nodes: {
      Weight: "real",
      Link: "word"
    },
    Levels: [
      {
        Weight: "real"
      }
    ],
    SpeedLimit: "reals"
  },
  hero: {
    Name: "link",
    Flags: "{bit}",
    Model: "model",
    Description: "link",
    InfoText: "link",
    Title: "link",
    RequiredRewardArray: "[word]",
    Portrait: "string",
    SelectScreenButtonImage: "string",
    PartyPanelButtonImage: "string",
    LeaderboardImage: "string",
    ScoreScreenImage: "string",
    VariationIcon: "file",
    CollectionIcon: "file",
    DraftScreenLargeImage: "string",
    DraftScreenLargeImageBackground: "string",
    DraftScreenPortrait: "string",
    DraftScreenPortraitBackground: "string",
    ImageFacing: "word",
    AdditionalSearchText: "link",
    HyperlinkId: "word",
    SkinVariationRequiredReward: "[word]",
    MountVariationRequiredReward: "[word]",
    ReleaseDate: {
      Month: "bit",
      Day: "bit",
      Year: "int"
    }
  },
  heroabil: {
    Name: "link",
    Description: "link",
    Tooltip: "link"
  },
  herostat: {
    Name: "link"
  },
  item: {
    Face: "button",
    Flags: "{bit}",
    Charge: {
      Link: "link"
    },
    Abil: "word",
    Effect: "effect",
    Class: "word",
    Container: "word",
    EffectCost: {
      Charge: {
        CountMax: "int",
        CountStart: "int",
        CountUse: "bit"
      },
      Cooldown: {
        Location: "word",
        TimeUse: "int"
      }
    },
    Range: "int"
  },
  itemclass: {
    Name: "link"
  },
  kinetic: {
    Name: "link",
    Chance: "bit",
    Duration: "real"
  },
  lensflareset: {
    Flare: [
      {
        Model: "model",
        Template: "word"
      }
    ]
  },
  light: {
    TimePerDay: "string",
    TimePerLoop: "word",
    TimeStart: "string",
    TimeEventArray: [
      {
        index: "word",
        Time: "string",
        Name: "word"
      }
    ],
    ToDInfoArray: [
      {
        AmbientColor: "reals",
        Colorize: "bit",
        Param: "{real}",
        DirectionalLight: [
          {
            index: "word",
            Color: "reals",
            ColorMultiplier: "real",
            SpecColorMultiplier: "real",
            Direction: "reals",
            SpecularColor: "reals",
            UseAmbientOcclusion: "bit"
          }
        ],
        OperatorHDR: "int",
        Id: "string",
        AmbientEnvironmentMultiplier: "real",
        UseSeparateDetailSSAO: "bit",
        TimeOfDay: "string",
        Variations: [
          {
            Command: "word",
            Sensitivity: "int",
            Region: "word"
          }
        ],
        DirectionalLightShadows: "bit",
        TerrainUseBackLight: "bit",
        LightRegions: [
          {
            UseDefault: "bit",
            AmbientColor: "reals",
            AmbientEnvironmentMultiplier: "real",
            SpecularColor: "reals",
            SpecularMultiplier: "real",
            FogColor: "reals",
            DiffuseColor: "{reals}",
            DiffuseMultiplier: "{real}"
          }
        ]
      }
    ],
    EditorCategories: "categories",
    AmbientEnvironmentMap: "string",
    LightingRegionMap: "string"
  },
  location: {
    Name: "link",
    Description: "link"
  },
  loot: {
    ClassArray: "[string]",
    SpawnOwner: "word",
    SpawnRange: "int",
    Effect: "word",
    Unit: "word",
    MinLevel: "int"
  },
  map: {
    Name: "link",
    Description: "link",
    Summary: "link",
    LoadingTitle: "link",
    LoadingSubtitle: "link",
    LoadingBody: "link",
    LoadingHelp: "link",
    LoadingHelpRestart: "link",
    LoadingHelpAlternate: "link",
    BonusText: "link",
    BonusTitle: "link",
    MissionText: "link",
    MissionTitle: "link",
    PrimaryObjectiveText: "link",
    PrimaryObjectiveTitle: "link",
    ResearchText: "link",
    ResearchTitle: "link",
    RewardText: "link",
    RewardTitle: "link",
    SecondaryObjectiveText: "link",
    SecondaryObjectiveTitle: "link",
    TechnologyNameText: "link",
    TechnologyTitle: "link"
  },
  model: {
    tokens: ['Prefix','Race'],
    Flags: "{bit}",
    Lighting: "string",
    Quality: "bit",
    ScaleMax: "reals",
    ScaleMin: "reals",
    Radius: "real",
    Priority: "int",
    SelectionRadius: "real",
    ShadowRadius: "real",
    AnimSpeed: "real",
    AnimBlendTime: "real",
    TechPurchaseCamera: "word",
    UnitGlossaryCamera: "word",
    PlanetPanelCamera: "word",
    TechPurchaseSpeed: "real",
    OccludingOpacity: "real",
    EditorCategories: "categories",
    Image: "file",
    Model: "file",
    FacialController: "file",
    PausedParticleSystemBehavior: "word",
    Race: "string",
    Prefix: "string",
    Occlusion: "word",
    RadiusLoose: "real",
    COOP: "word",
    SelectionLayer: "int",
    LowQualityModel: "model",
    SquibTypeDefault: "word",
    low: "word",
    Tipability: "real",
    name: "word",
    Events: [
      {
        Anim: "words",
        Name: "string",
        Type: "word",
        Time: "real",
        Payload: "word",
        Variation: "int",
        Attachment: "word",
        ModelQuality: "word"
      }
    ],
    TipabilityLength: "real",
    TipabilityWidth: "real",
    VariationCount: "int",
    TextureDeclares: [
      {
        Prefix: "word",
        Adaptions: [
          {
            TriggerOnSubstring: "string",
            Slot: "string",
            PropsRemove: "word",
            AppliesToFile: "bit"
          }
        ]
      }
    ],
    SelectionOffset: "reals",
    AttachProps: [
      {
        Id: "string",
        Keys: "{int}",
        RadiusTarget: "real",
        SquibType: "word",
        RadiusShield: "real"
      }
    ],
    RequiredAnims: "[file]",
    Variations: [
      {
        Number: "bit",
        Probability: "int",
        Radius: "real",
        RadiusLoose: "real",
        TextureExpressionsForEditor: {
          Slot: "string",
          Expression: "string"
        }
      }
    ],
    PhysicsDeathMotionFactor: "reals",
    PhysicsForceFactor: "real",
    SpringDampening: "real",
    SpringStrength: "real",
    DragCoefficient: "real",
    WindInfluence: "real",
    RequiredAnimsEx: {
      FilePath: "string",
      Flags: "{bit}"
    },
    PhysicsMaterialOverride: "word",
    OptionalAnims: "[string]",
    baseKey: "word",
    TextureAppliedGroups: "word",
    TextureMatchesForEditor: {
      Slot: "string",
      Source: "word"
    },
    race: "race"
  },
  mount: {
    Name: "link",
    InfoText: "link",
    Model: "model",
    VariationIcon: "file"
  },
  mover: {
    HeightMap: "word",
    RestoreHeightDuration: "real",
    PlacementArray: [
      {
        index: "word",
        Bits: "{bit}"
      }
    ],
    MotionPhases: [
      {
        Driver: "word",
        Acceleration: "real",
        MaxSpeed: "real",
        ClearanceAcceleration: "int",
        Outro: "reals",
        YawPitchRoll: "string",
        Speed: "real",
        RotationLaunchActorType: "word",
        Gravity: "real",
        IgnoresTerrain: "bit",
        ActorTracking: "word",
        YawPitchRollAccel: "real",
        ThrowRotationType: "word",
        ThrowVector: "reals",
        Overlays: {
          Scale: "reals"
        },
        TurnType: "word",
        MinSpeed: "int",
        AdaptableParabolaIsUpright: "bit",
        AdaptableParabolaClearance: "reals",
        AdaptableParabolaDistances: "{real}",
        AdaptableParabolaAccels: "{int}",
        Clearance: "real",
        ClearanceLookahead: "int",
        Timeout: "real",
        RotationActorType: "word",
        ThrowBandYaw: "reals",
        ThrowBandPitch: "reals",
        FlightTime: "reals",
        ClearanceIgnoresTargetProximity: "bit",
        ArrivalTestType: "word",
        AccelerationRange: "int",
        PowerslideAngle: "real",
        PowerslideDecel: "int",
        SpeedRange: "int",
        OutroAltitude: "real",
        BlendType: "word"
      }
    ],
    Flags: "{bit}",
    MotionOverlays: [
      {
        Type: "word",
        Polarity: "word",
        Axis: "reals",
        Wavelength: "reals",
        PolarityDriver: "string",
        WavelengthChangeProbability: "real",
        RevolverSpeed: "real",
        RevolverSpeedRange: "real",
        RevolverMaxSpeed: "real",
        RevolverMaxSpeedRange: "real",
        RevolverAccel: "real",
        RevolverAccelRange: "real"
      }
    ],
    PathMode: "word",
    RespectUnitHeightAtDestination: "bit",
    RotationIgnoredByUnit: "bit"
  },
  physicsmaterial: {
    Density: "real",
    Friction: "real",
    Restitution: "real",
    LinearDamping: "real",
    AngularDamping: "real"
  },
  ping: {
    Color: "ints",
    Duration: "int",
    Scale: "bit"
  },
  playerresponse: {
    Location: "word",
    Chance: "bit",
    CasterFilters: "filters",
    TargetFilters: "filters",
    DeathType: "{bit}"
  },
  portraitpack: {
    Name: "link",
    StoreName: "link",
    StoreTypeName: "link",
    ProductId: "int",
    PortraitArray: "[word]"
  },
  race: {
    Name: "link",
    RaceIcon: "file",
    StartLocationAlert: "alert",
    GameMusic: "word",
    FoodCeiling: "int",
    ShowResource: "{bit}",
    MiniMapBorderColor: "ints",
    PlacementGridColorBlindColor: "ints",
    AttributeId: "word",
    ExpansionOrder: "int",
    StartingResource: "{int}",
    Flags: "{bit}",
    StartingUnitArray: [
      {
        Unit: "unit",
        Flags: "{bit}",
        Count: "int",
        Offset: "[ints]"
      }
    ],
    GlossaryTeamColorIndex: "int",
    VictorySound: "sound",
    DefeatSound: "sound",
    LevelAchievementId: "int"
  },
  requirement: {
    CanBeSuppressed: "{bit}",
    NodeArray: [
      {
        index: "word",
        Link: "requirementnode"
      }
    ],
    EditorCategories: "categories"
  },
  reverb: {
    Room: "int",
    DecayTime: "real",
    DecayHFRatio: "real",
    Reflections: "int",
    ReflectionsDelay: "real",
    Reverb: "int",
    ReverbDelay: "real",
    HFReference: "real",
    LFReference: "real",
    Diffusion: "real",
    Density: "real",
    RoomHF: "int",
    RoomRolloffFactor: "real",
    SpeakerMix: "{real}",
    RoomLF: "int"
  },
  shape: {
    Name: "link"
  },
  skin: {
    Name: "link",
    InfoText: "link",
    VariationIcon: "file",
    ReplacementArray: [
      {
        Catalog: "word",
        From: "word",
        To: "word"
      }
    ],
    Rotation: "int",
    DisplayModel: "[model]",
    WarChestUILight: "light",
    CollectionDisplayModel: "model",
    collection: "word",
    race: "race",
    Camera: "word",
    CollectionDisplayUnit: "unit",
    unit: "unit",
    CollectionDisplayModelAlternate: "model",
    CollectionDisplayUnitAlternate: "unit",
    unitAlter: "unit",
    EffectArray: [
      {
        Operation: "word",
        Reference: "reference",
        Value: "string"
      }
    ],
    IsDefaultSkin: "bit",
    CollectionDisplayActor: "actor",
    ModelGroups: {
      Name: "word",
      Models: "[model]"
    }
  },
  skinpack: {
    Name: "link",
    StoreName: "link",
    StoreTypeName: "link",
    ShortName: "link",
    EntryArray: [
      {
        Reward: "reward",
        Unit: "unit",
        UnitAlternate: "unit",
        RewardAlternate: "reward"
      }
    ],
    CollectionId: "word",
    collection: "word",
    ReleaseDate: "link",
    ProductId: "int",
    Default: "bit",
    unit: "unit"
  },
  sound: {
    Actor: "actor",
    Category: "word",
    ConeAngle: "reals",
    ConeVolume: "reals",
    DopplerLevel: "real",
    DupeDestroyCount: "int",
    DupeDestroyCountPerPlayer: "int",
    DupeHistoryCount: "int",
    DupeFadeBlend: "word",
    DupeMuteCount: "int",
    DupeMuteCountPerPlayer: "int",
    DupeRepeatCount: "int",
    DupeThresholdFadeTime: "int",
    Flags: "{bit}",
    FogFadeBlend: "word",
    LowPassGain: "real",
    MuteFadeBlend: "word",
    OverlapPitchDelta: "real",
    OverlapTimeDelta: "int",
    PanLevel: "real",
    ResourcePriority: "int",
    ReverbBalance: {
      Room: "int",
      Direct: "int"
    },
    ReverbRolloffBlend: "word",
    Select: "word",
    SpeakerMix: "{real}",
    SustainFade: [
      {
        Time: "int",
        Volume: "real"
      }
    ],
    VolumeRolloffBlend: "word",
    VolumeRolloffFadeBlend: "word",
    Volume: "reals",
    AssetArray: [
      {
        File: "string",
        Volume: "reals",
        Speaker: "link",
        Subtitle: "link",
        FacialAnim: "word",
        PortraitModel: "model",
        FacialGroup: "word",
        FacialFile: "string",
        TemplateParam: "string",
        Pitch: "reals",
        Weight: "int",
        LoopCount: "int",
        LoopTime: "ints",
        SyncPoints: "[int]",
        Offset: "ints",
        PortraitActor: "word"
      }
    ],
    Mode: "word",
    MuteFadeOut: [
      {
        Time: "int",
        Volume: "real"
      }
    ],
    VolumeRolloffPoints: [
      {
        Distance: "real",
        Volume: "real"
      }
    ],
    OffsetFadeIn: [
      {
        Volume: "real",
        Time: "int"
      }
    ],
    LoopCount: "int",
    Chance: "int",
    ReverbRolloffPoints: [
      {
        Direct: "real",
        Room: "real",
        Distance: "real"
      }
    ],
    Race: "race",
    EditorCategories: "categories",
    AssetArrayTemplate: {
      File: "string",
      FacialAnim: "string",
      FacialGroup: "string",
      FacialFile: "string"
    },
    Exclusivity: "word",
    CategoryDuckingLocal: "word",
    LoopDelay: "ints",
    MixerPriority: "int",
    Pitch: "reals",
    PlayDelay: "ints",
    PositionRandomOffset: "reals",
    DupeMaximumMethod: "word",
    VariationMinimum: "int",
    Pan: "reals",
    Spread: "real",
    DupePrioritization: "word",
    DupeWait: "ints",
    FogFadeIn: [
      {
        Volume: "real",
        Time: "int"
      }
    ],
    FogFadeOut: [
      {
        Time: "int",
        Volume: "real"
      }
    ],
    VolumeRolloffFadeIn: [
      {
        Volume: "real",
        Time: "int"
      }
    ],
    VolumeRolloffFadeOut: [
      {
        Time: "int",
        Volume: "real"
      }
    ],
    SustainFadeBlend: "word",
    OffsetShiftBlend: "word",
    PanLevelNonLocal: "real",
    DupeFadeOut: [
      {
        Time: "int",
        Volume: "real"
      }
    ],
    OffsetFadeOut: [
      {
        Time: "int",
        Volume: "real"
      }
    ],
    Subtitle: "word",
    Speaker: "word",
    Line: "word",
    Portrait: "word",
    OffsetFadeBlend: "word",
    OffsetShiftIn: [
      {
        Time: "int",
        Pitch: "real"
      }
    ],
    DupeFadeIn: [
      {
        Volume: "real",
        Time: "int"
      }
    ],
    DupeThresholdPoints: [
      {
        Count: "int",
        Volume: "real"
      }
    ],
    HerdNode: "word",
    MuteFadeIn: [
      {
        Volume: "real",
        Time: "int"
      }
    ],
    NonLocalVolumeAdjustment: "reals",
    PositionRandomOffsetPower: "real",
    OcclusionReverb: "reals",
    defaul: "bit",
    CategoryLocal: "word"
  },
  soundtrack: {
    Flags: "{bit}",
    CueArray: [
      {
        MasterLayer: {
          Sound: "sound"
        },
        SlaveLayers: [
          {
            Sections: {
              Sound: "sound"
            }
          }
        ]
      }
    ],
    Delay: "ints",
    Select: "word",
    Next: "word"
  },
  spray: {
    Button: "word",
    Texture: "word",
    Model: "model"
  },
  spraypack: {
    Name: "link",
    StoreName: "link",
    StoreTypeName: "link",
    SprayArray: "[spray]",
    ProductId: "int"
  },
  targetfind: {
    AreaArray: [{}],
    Effect: "effect",
    MaxCount: "int",
    MinCountError: "word",
    LaunchLocation: {
      Value: "word"
    },
    ImpactLocation: {
      Value: "word"
    },
    SearchFlags: "{bit}",
    TargetFilters: "filters",
    Abil: "abil",
    Type: "word",
    Array: "[word]",
    CasterValidator: "validator",
    SearchFilters: "filters",
    TargetValidator: "validator",
    ExtendRadius: "int",
    TargetSorts: {
      SortArray: "[targetsort]"
    },
    CommandIndex: "bit",
    Flags: "{bit}",
    DamageBase: "int",
    MinCount: "int",
    MinScore: "real",
    BonusAttri: "word",
    Angle: "int",
    Distance: "reals"
  },
  targetsort: {
    WhichUnit: {
      Value: "word"
    },
    Alliance: "word",
    WhichLocation: {
      Value: "word"
    },
    Descending: "bit",
    Value: "bit",
    Vital: "word",
    Behavior: "behavior",
    Field: "string",
    Validator: "validator"
  },
  terrain: {
    Name: "link",
    Lighting: "light",
    Camera: "string",
    Ambience: "word",
    ReverbGlobal: "reverb",
    ReverbAmbient: "string",
    SoundDistanceFactor: "real",
    SoundDopplerFactor: "real",
    SoundRolloffFactor: "real",
    TilingFreq: "real",
    POMScale: "real",
    MinimapBackgroundColor: "ints",
    FOWColor: "ints",
    FogColor: "ints",
    Gravity: "real",
    PhysicsTimeScale: "real",
    WindAngleHorizontal: "real",
    WindSpeed: "real",
    WindTurbulencePower: "real",
    WindTurbulenceSpeed: "real",
    CreepBaseTexture: "string",
    CreepBaseSpecularMap: "string",
    CreepEdgeNormalMap: "string",
    CreepHeightMap: "string",
    CreepNoiseMap: "string",
    CreepSettingsArray: [
      {
        index: "word",
        CreepGroundNormalBlend: "real",
        CreepOpaqueAlphaThreshold: "real",
        CreepTranslucentMinThreshold: "real",
        CreepTranslucentPassTint: "reals",
        CreepTranslucentMaxThreshold: "real"
      }
    ],
    FoliageSettingsArray: [
      {
        index: "word",
        SamplingDistance: "{real}",
        AcceptWorldForces: "{bit}"
      }
    ],
    HeightFlags: "{bit}",
    LoadingScreen: "string",
    EditorCategories: "categories",
    BlendTextures: "[word]",
    CliffSets: "[cliff]",
    HardTiles: "string",
    FogEnabled: "bit",
    FogDensity: "real",
    FogFalloff: "real",
    FogStartingHeight: "real",
    HideLowestLevel: "bit",
    FixedSkyboxModel: "model",
    NonFixedSkyboxModel: "model",
    EnvironmentMap: "string",
    MinimapBrightenFactor: "real",
    EditorHidden: "bit",
    TextureProp: "word",
    HeightMapEnabled: "bit",
    FixedSkyboxActor: "actor"
  },
  terrainobject: {
    EditorCursorOffset: "real"
  },
  terraintex: {
    Texture: "string",
    EditorIcon: "file",
    Normalmap: "string",
    PhysicsMaterial: "string",
    DoodadEntry: [
      {
        Model: "model",
        RandomRotation: "bit",
        Probability: "real",
        PlacementRadius: "real"
      }
    ],
    Heightmap: "string",
    HeightMapOffset: "real",
    HeightMapScale: "real"
  },
  texture: {
    File: "string",
    Flags: "{bit}",
    Slot: "string",
    MovieSoundSettings5dot1: "sound",
    MovieSoundSettingsStereo: "sound",
    MovieSoundSettings: "sound",
    Prefix: "word"
  },
  texturesheet: {
    Image: "string",
    Rows: "int",
    Columns: "int"
  },
  tile: {
    Material: "string",
    EditorIcon: "file",
    TesselationDistance: "real",
    TileWidthDistance: "real",
    TileHeightRepetitions: "bit",
    CapLength: "real",
    DefaultSplineWidth: "real",
    DefaultWingWidth: "real",
    Flags: "{bit}"
  },
  turret: {
    Fidget: {
      TurnAngle: "int",
      TurningRate: "real",
      ChanceArray: "{int}",
      DelayMax: "int",
      DelayMin: "int"
    },
    YawArc: "real",
    YawRate: "real",
    Idle: "word",
    YawStart: "real",
    YawIdleRate: "real"
  },
  unit: {
    Name: "string",
    Description: "link",
    DeathRevealFilters: "filters",
    DeathRevealRadius: "int",
    DeathRevealDuration: "int",
    DeathRevealType: "word",
    Race: "race",
    DefaultAcquireLevel: "word",
    Response: "word",
    ResourceState: "word",
    ResourceType: "word",
    LifeStart: "int",
    LifeMax: "int",
    LifeArmorName: "link",
    Mover: "mover",
    StationaryTurningRate: "real",
    TurningRate: "real",
    Radius: "real",
    SeparationRadius: "real",
    MinimapRadius: "real",
    EditorCategories: "categories",
    TacticalAIFilters: "filters",
    AIEvalFactor: "real",
    Mass: "real",
    FlagArray: "{bit}",
    EditorFlags: "{bit}",
    PushPriority: "int",
    LeaderAlias: "word",
    HotkeyAlias: "word",
    SelectAlias: "word",
    SubgroupAlias: "word",
    OccludeHeight: "real",
    TacticalAI: "string",
    AIEvaluateAlias: "word",
    ReviveType: "word",
    PawnItemReduction: "bit",
    Fidget: {
      DelayMax: "int",
      DelayMin: "int",
      DistanceMax: "int",
      DistanceMin: "int",
      TurnAngle: "int",
      TurningRate: "int",
      ChanceArray: "{int}"
    },
    ReviveInfoBase: {
      Charge: {
        Link: "link",
        Location: "word"
      },
      Cooldown: {
        Link: "link",
        Location: "word",
        TimeUse: "real"
      },
      Time: "int",
      Resource: "{int}"
    },
    InnerRadiusSafetyMultiplier: "bit",
    ArmorType: "word",
    _: "word",
    FogVisibility: "word",
    Sight: "real",
    Item: "item",
    PowerupEffect: "word",
    PowerupCost: {
      Charge: {
        CountMax: "bit",
        CountStart: "bit",
        CountUse: "bit",
        Link: "word"
      },
      Cooldown: {
        Link: "word"
      }
    },
    Mob: "word",
    PlaneArray: "{bit}",
    Collide: "{bit}",
    AbilArray: [
      {
        Link: "abil"
      }
    ],
    Speed: "real",
    Acceleration: "real",
    LateralAcceleration: "real",
    Height: "real",
    SubgroupPriority: "int",
    BehaviorArray: [
      {
        Link: "behavior"
      }
    ],
    CardLayouts: [
      {
        LayoutButtons: [
          {
            Face: "button",
            Type: "word",
            AbilCmd: "abilcmd",
            Row: "int",
            Column: "int",
            Requirements: "requirement",
            SubmenuCardId: "word",
            SubmenuFullSubCmdValidation: "bit",
            Behavior: "behavior",
            SubmenuAbilState: "abil",
            ShowInGlossary: "bit",
            SubmenuIsSticky: "bit"
          }
        ],
        CardId: "word",
        RowText: "[link]"
      }
    ],
    Attributes: "{bit}",
    Deceleration: "real",
    InnerRadius: "real",
    LifeArmor: "int",
    ShieldsStart: "int",
    ShieldsMax: "int",
    ShieldRegenRate: "real",
    CostResource: "{int}",
    AttackTargetPriority: "int",
    Footprint: "string",
    PlacementFootprint: "string",
    ShieldArmorName: "link",
    LifeRegenRate: "real",
    DamageDealtXP: "bit",
    DamageTakenXP: "bit",
    KillXP: "int",
    Facing: "real",
    VisionHeight: "int",
    ShieldRegenDelay: "int",
    CostCategory: "word",
    BuiltOn: "[word]",
    ScoreMake: "int",
    ScoreKill: "int",
    ScoreResult: "string",
    GlossaryPriority: "int",
    HotkeyCategory: "link",
    GlossaryAlias: "word",
    RepairTime: "real",
    AddedOnArray: [
      {
        UnitLink: "unit",
        BehaviorLink: "behavior",
        ParentBehaviorLink: "behavior"
      }
    ],
    AddOnOffsetX: "real",
    AddOnOffsetY: "real",
    TechAliasArray: "[word]",
    TechTreeUnlockedUnitArray: "[unit]",
    SpeedMultiplierCreep: "real",
    Food: "real",
    CargoSize: "int",
    EquipmentArray: [
      {
        Weapon: "weapon",
        Effect: "effect",
        Icon: "file"
      }
    ],
    GlossaryStrongArray: "[word]",
    GlossaryWeakArray: "[word]",
    KillDisplay: "word",
    RankDisplay: "word",
    WeaponArray: [
      {
        Link: "weapon",
        Turret: "turret"
      }
    ],
    GlossaryCategory: "link",
    EffectArray: "{effect}",
    EnergyStart: "int",
    EnergyMax: "int",
    EnergyRegenRate: "real",
    AIOverideTargetPriority: "int",
    DeathTime: "int",
    DeadFootprint: "string",
    TauntDuration: "{int}",
    TacticalAIThink: "word",
    BuildOnAs: "unit",
    ResourceDropOff: "{bit}",
    TechTreeProducedUnitArray: "[unit]",
    TurretArray: "[turret]",
    CargoOverlapFilters: "filters",
    EditorFacingAlignment: "int",
    AIKiteRange: "int",
    LifeRegenDelay: "int",
    AINotifyEffect: "effect",
    ShieldArmor: "int",
    SyncModelData: "string",
    TacticalAIChannel: "word",
    ReviveDelay: "real",
    Subtitle: "link",
    AlliedPushPriority: "int",
    SpeedBonusCreep: "real",
    abil: "abil"
  },
  upgrade: {
    Flags: "{bit}",
    Name: "string",
    MaxLevel: "int",
    Alert: "string",
    ScoreCount: "word",
    ScoreValue: "string",
    WebPriority: "bit",
    LeaderAlias: "word",
    InfoTooltipPriority: "int",
    Race: "race",
    EditorCategories: "categories",
    ScoreResult: "string",
    EffectArray: [
      {
        Reference: "reference",
        Value: "string",
        Operation: "word"
      }
    ],
    AffectedUnitArray: "[unit]",
    ScoreAmount: "int",
    Icon: "file",
    LeaderLevel: "int",
    TechAliasArray: "[word]"
  },
  validator: {
    ResultFailed: "string",
    Type: "word",
    WhichEffect: "word",
    ResultNoEffect: "word",
    Compare: "word",
    CheckExistence: "bit",
    ResultNoKey: "string",
    WhichLocation: {
      Value: "word",
      Effect: "effect"
    },
    OtherLocation: {
      Value: "word",
      Effect: "word"
    },
    FromUnit: {
      Value: "word"
    },
    Find: "bit",
    LaunchLocation: {
      Value: "word",
      Effect: "effect"
    },
    CombinedVital: "word",
    SearchFlags: "{bit}",
    Types: "{bit}",
    OtherUnit: {
      Value: "word"
    },
    Range: "real",
    OtherPlayer: {
      Value: "word"
    },
    WhichPlayer: {
      Value: "word"
    },
    ResultNoUnit: "string",
    WhichUnit: {
      Value: "word",
      Effect: "effect"
    },
    WithPlayer: {
      Value: "word"
    },
    AbilClass: "word",
    ResultNoInventory: "word",
    Target: {
      Value: "word"
    },
    ExcludeOriginPlayer: {
      Value: "word"
    },
    ExcludeCasterUnit: {
      Value: "word"
    },
    RequireOriginPlayer: {
      Value: "word"
    },
    RequireCasterUnit: {
      Value: "word"
    },
    BehaviorAlignment: "word",
    ResultMaxLevel: "word",
    IgnoreDisabledBehavior: "bit",
    AllowCheat: "bit",
    ResultFoodMax: "word",
    Count: "int",
    WeaponType: "word",
    RequireActivated: "bit",
    RequireEnabled: "bit",
    CountType: "word",
    CombineArray: "[validator]",
    Field: "string",
    Value: {
      value: "string",
      Value: "word",
      Effect: "effect"
    },
    Filters: "filters",
    Plane: "word",
    Flag: "word",
    Flags: "{bit}",
    Vital: "word",
    AbilLink: "abil",
    Point: "string",
    Behavior: "behavior",
    RadiusBonus: "real",
    ResultFallback: "word",
    Relationship: "word",
    Arc: "real",
    SearchFilters: "filters",
    Line: [
      {
        Failure: "word",
        Ignored: "word",
        Success: "word",
        Test: "word",
        Return: "word"
      }
    ],
    CachedSearch: "word",
    AreaArray: [
      {
        Radius: "real",
        Validator: "validator",
        Count: "int",
        Compare: "word"
      }
    ],
    ResultNoPlayer: "word",
    Negate: "bit",
    AbilCmdIndex: "int",
    Active: "bit",
    PowerLink: "word",
    Unit: "unit",
    BehaviorState: "word",
    Pathing: "bit",
    PowerSource: "word",
    AttackerAlternateType: "word",
    CombinedVitalCompare: "word",
    unitLink: "unit",
    maxVitals: "int",
    minVitals: "int",
    Weapon: "weapon",
    Detected: "bit",
    Location: "word",
    ChargeLink: "string",
    ExcludeArray: [
      {
        Effect: "effect",
        Value: "word"
      }
    ],
    Ability: "abil",
    CasterGroundHeight: "bit",
    CasterAdd: "real",
    TargetGroundHeight: "bit",
    Categories: "{bit}",
    CooldownLink: "link"
  },
  voicepack: {
    Name: "link",
    TypeName: "link",
    StoreName: "link",
    Description: "link",
    Icon: "file",
    StoreTypeName: "link",
    Default: "bit",
    ReleaseDate: "link",
    ImageTexture: "string",
    UnlockedRewardArray: "[reward]",
    ExampleLineArray: [
      {
        Description: "link",
        Sound: "sound"
      }
    ],
    ProductId: "int",
    LocaleRestriction: "word",
    ParentBundle: "bundle",
    IsPurchaseHidden: "bit"
  },
  water: {
    TextureKey: "string",
    TilingFreq: "reals",
    ScrollVectors: "reals",
    CausticsTilingFreq: "reals",
    CausticsFPS: "real",
    FramesPerSec: "real",
    LavaModel: "model",
    Sound: "sound",
    Density: "real",
    Drag: "real",
    AngularDamping: "real",
    MaxLinearVelocity: "real",
    State: [
      {
        Name: "string",
        Height: "real",
        Color: "reals",
        ColorFallOff: "real",
        Specularity: "real",
        SpecularScaler: "real",
        UvRate: "reals",
        ReflectionDistortion: "real",
        RefractionDistortion: "real",
        MinReflection: "real",
        ReflectivityPower: "real",
        MeshRoughness: "real",
        TextureRoughness: "real",
        CausticsFallOff: "real",
        UvRotate: "real",
        ShadowDistortion: "real"
      }
    ],
    BeachShoreline: "word",
    CliffShoreline: "word",
    Doodads: {
      Model: "model",
      Density: "real",
      MinSize: "real",
      MaxSize: "real",
      Lifetime: "int"
    },
    ReceiveShadows: "bit",
    IsLava: "bit"
  },
  weapon: {
    Name: "link",
    DisplayName: "link",
    EditorCategories: "categories",
    InfoTooltipPriority: "bit",
    Icon: "file",
    Tip: "link",
    DisplayEffect: "effect",
    MinScanRange: "real",
    Range: "real",
    RangeSlop: "int",
    TeleportResetRange: "int",
    ArcSlop: "real",
    Period: "real",
    DamagePoint: "real",
    Backswing: "real",
    Options: "{bit}",
    Marker: {
      Link: "string",
      MatchFlags: "{bit}",
      MismatchFlags: "{bit}",
      Count: "bit"
    },
    Cost: {
      Cooldown: {
        Link: "link",
        Location: "word",
        TimeUse: "real"
      },
      Vital: "{int}"
    },
    TargetFilters: "filters",
    AttackType: "word",
    SupportedFilters: "filters",
    LegacyOptions: "{bit}",
    RandomDelayMin: "real",
    RandomDelayMax: "real",
    Effect: "effect",
    UninterruptibleDuration: "real",
    LoiterInnerRadius: "int",
    LoiterRadius: "int",
    DisplayAttackCount: "int",
    AllowedMovement: "word",
    AcquireFilters: "filters",
    Arc: "real",
    AcquirePrioritization: "word",
    MinimumRange: "real",
    ChaseFilters: "filters",
    AcquireCliffLevelRange: "ints",
    AcquireScanFilters: "filters",
    RangeDisplayFlags: "{bit}",
    AcquireCallForHelpFilters: "filters",
    PreswingBeforeAttack: "int",
    AcquireTargetSorts: {
      SortArray: "[targetsort]"
    }
  },
  conversation: {
    AnimBlendDefault: "int",
    AnimBlendOut: "int",
    ObjectStates: "{word}",
    FacialAnims: [
      {
        Id: "word",
        Text: "link",
        SpeechTag: "word"
      }
    ],
    EditorCategories: "categories",
    ProductionLevel: "int",
    Lines: [
      {
        Id: "word",
        Text: "link",
        Sound: "sound",
        OverlapPrevious: "int",
        AnimProps: "word",
        AnimBlendIn: "int",
        AnimBlendOut: "int",
        SpeakerCharacter: "character",
        Comment: "string",
        Objects: "{word}",
        Variations: "{word}",
        FacialBlend: "int",
        LookAtAttach: "word"
      }
    ],
    Groups: [
      {
        Id: "word",
        Name: "link",
        Children: "[word]"
      }
    ],
    Comments: [
      {
        Id: "word",
        Text: "link"
      }
    ],
    RootItems: "[word]",
    ProductionLevelInfo: [
      {
        SubtitlePrefix: "string",
        Flags: "{bit}"
      }
    ],
    DefaultSpeaker1: "word",
    DefaultSpeaker2: "word"
  },
  conversationstate: {
    ValueRange: "ints",
    Flags: "{bit}",
    Indices: [
      {
        Id: "string",
        Name: "string",
        Color: "ints",
        Variations: [
          {
            Value: "word",
            DefaultCategories: "[categories]"
          }
        ],
        InfoText: [
          {
            Text: "string",
            Id: "string"
          }
        ]
      }
    ],
    CustomColors: "[ints]",
    InfoIds: [
      {
        index: "word",
        Id: "string"
      }
    ]
  },
  game: {
    CreepDecaySound: "sound",
    CreepGrowSound: "sound",
    JoinInProgress: "bit",
    PlayersRequiredForLargeFormat: "int",
    PlayerLeaveFlags: "{bit}",
    TriggerLibs: {
      Id: "word",
      IncludePath: "link"
    },
    EnforcedGameResultScoreResult: "scoreresult",
    SprayAbil: "abil",
    SprayButtonReplacementTarget: "[button]",
    BeaconInfoArray: [
      {
        index: "word",
        Unit: "unit",
        Tooltip: "link",
        Clear: "{bit}"
      }
    ],
    AIBuilds: [
      {
        AttributeId: "word",
        Name: "link",
        MenuTooltip: "link",
        Enabled: "bit",
        Race: "race",
        MaxDiff: "int",
        BuildScriptNum: "int",
        MinDiff: "int"
      }
    ],
    DamageHistoryIntervalMax: "bit"
  },
  itemcontainer: {
    Slots: [
      {
        Row: "int",
        Column: "int",
        Equip: "bit",
        Classes: "[word]"
      }
    ],
    ModelWidth: "int",
    ModelHeight: "int"
  },
  soundexclusivity: {
    Group: "int",
    CollideWithLower: "word",
    CollideWithEqual: "word",
    CollideWithHigher: "word",
    InterruptFade: [
      {
        Time: "int",
        Volume: "real"
      }
    ],
    QCollideWithLower: "word",
    QCollideWithEqual: "word",
    QCollideWithHigher: "word",
    Priority: "real",
    QTimeout: "int"
  },
  soundmixsnapshot: {
    Attack: "int",
    Hold: "int",
    Release: "int",
    Flags: "{bit}",
    MixGlobal: "{real}"
  },
  tactical: {
    Abil: "abil",
    TargetFind: "targetfind",
    Retreat: "bit",
    Array: "[word]",
    Validator: "validator",
    AbilCmdIndex: "bit"
  },
  voiceover: {
    Groups: [
      {
        Id: "word",
        SoundParent: "sound"
      }
    ],
    Lines: [
      {
        Group: "word",
        FacialBlend: "int",
        SoundIndex: "int",
        Comment: "string",
        SoundType: "word",
        SoundText: "word"
      }
    ],
    Character: "character"
  },
  user: {
    Fields: [
      {
        Id: "word",
        Type: "word",
        EditorColumn: "int",
        GameLinkType: "word"
      }
    ],
    Instances: [
      {
        Id: "string",
        GameLink: {
          GameLink: "word",
          Field: {
            Id: "word"
          }
        },
        String: [
          {
            String: "string",
            Field: {
              Id: "word"
            }
          }
        ]
      }
    ]
  },
  taccooldown: {
    UnitLink: "unit",
    TacAbilData: [
      {
        AbilLink: "abil",
        Cooldown: "[int]"
      }
    ]
  }
}