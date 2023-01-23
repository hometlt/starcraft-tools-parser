const Bit = 'bit'
const Int = 'int'
const Word = 'word'
const Real = 'real'

const Host = {
  Subject: 'subject',
  Actor: 'actor',
  Scope: Word,
  FailOnNoHost: Bit,
  Effect: 'effect',
  ReachAcrossEffectTrees: Bit
}

export const TargetSorts = {
  SortArray: '[targetsort]',
  RequestCount: Int,
  RequestPercentage: Real
}

export const EffectBehaviorSchema = {
  Flags: '{bit}', Behavior: 'behavior', Count: Int, Duration: Real
}

export const FieldSchema = {$Id: 'string', Index: Int, Flags: '{bit}'}

export const CostSchema = {
  Abil: 'string',
  CooldownOperation: Word,
  CooldownTimeUse: Real,
  ChargeCountUse: Int,
  Fraction: {
    Vital: "{int}",
    Charge: Int,
    Cooldown: Int,
  },
  Charge: {
    TimeDelay: "real",
    Flags: '{bit}',
    CountMax: Int,
    CountStart: Int,
    CountUse: Real,
    Link: 'string',
    Location: Word,
    TimeStart: Real,
    TimeUse: Real,
    HideCount: Bit
  },
  Player: {
    Value: Word
  },
  ChargeTimeUse: Real,
  Behavior: 'behavior',
  TimeDelay: "real",
  Vital: '{real}',
  Display: '{bit}',
  Cooldown: {
    TimeStart: Real,
    TimeUse: Real,
    Link: 'string',
    Operation: 'string',
    Location: Word
  },
  Resource: '{int}',
  VitalFraction: '{real}'
}

export const ModificationSchema = {
  AbilCategoriesDisable: "[int]",
  AbilTechAliasEnableArray: "[word]",
  AbilTechAliasDisableArray: "[word]",
  MoveSpeedBaseMaximumBonus: "int",
  DetectFilters: 'filters',
  RadarFilters: 'filters',
  StateFlags: '{bit}',
  SoundArray: '{string}',
  VitalMaxDecreaseAffectsCurrentArray: "{int}",
  HealTakenMultiplier: "real",
  DamageTakenMaximum: "[int]",
  MeleeWeaponRange: "int",
  UnifiedDamageTakenFraction: "[real]",
  XPMultiplier: "real",
  CriticalAttackChanceMultiplier: "int",
  CriticalAttackChanceScaledBonus: "real",
  DamageTakenUnscaled: "[int]",
  ResourceHarvestTimeBonus: "{real}",
  BehaviorClassEnableArray: "{int}",
  TurretEnableArray: '{turret}',
  DamageDealtFraction: '{real}',
  DamageDealtAttributeUnscaled: '{real}',
  ResourceHarvestAmountMultiplier: '{real}',
  DamageDealtAttributeMultiplier: '{real}',
  BehaviorCategoryDurationFactor: '{real}',
  UnifiedDamageDealtFraction: '{real}',
  VitalMaxAdditiveMultiplierArray: '{real}',
  VitalDamageLeechArray: [{KindArray: '{real}',index:Word}],
  AttributeChangeArray: [{Attribute:"behavior",Points:"int"}],
  Radar: Real,
  DetectBonus: Real,
  WeaponMinRange: Real,
  AttackTargetPriority: Int,
  EnergyDamageRatioBonus: Real,
  SightMinimum: Real,
  DecelerationMultiplier: Real,
  UnitNameOverride: 'link',
  LevelGainEffect: 'effect',
  MoveSpeedMultiplier: Real,
  UnifiedAttackSpeedFactor: Real,
  RadiusMultiplier: Real,
  ModifyFlags: '{bit}',
  DamageDealtMaximum: '{real}',
  DamageTakenFraction: '{real}',
  DamageTakenScaled: '{real}',
  DamageTotalMultiplier: '{real}',
  ResourceHarvestTimeMultiplier: '{real}',
  VitalMaxIncreaseAffectsCurrentArray: '{real}',
  AbilLinkEnableArray: '[abil]',
  BehaviorLinkDisableArray: '[behavior]',
  BehaviorClassDisableArray: '{bit}',
  AbilClassDisableArray: '{bit}',
  Relationship: '{bit}',
  AbilLinkDisableArray: '[abil]',
  DeathResponse: {
    Relationship: '{bit}',
    Cost: CostSchema,
    Chance: Real,
    Effect: 'effect',
    Type: '{bit}'
  },
  TimeScale: Real,
  VitalRegenArray: [{
    index: "string",
    AccumulatorArray: [{value:"accumulator"}],
    value:"real"
  }],
  WeaponDisableArray: '[weapon]',
  Height: Real,
  HeightTime: '{real}',
  PlaneDelta: '{int}',
  AbilClassEnableArray: '{bit}',
  BehaviorLinkEnableArray: '[behavior]',
  AttackSpeedMultiplier: Real,
  Food: Real,
  QueueCount: Int,
  QueueSize: Int,
  WeaponRange: Real,
  Detect: Real,
  MoveSpeedMinimum: Real,
  LifeArmorMultiplier: Real,
  ShieldArmorMultiplier: Real,
  SubgroupPriority: Int,
  SightBonus: Real,
  DetectArc: Bit,
  RadarArc: Bit,
  MoveSpeedBonus: Real,
  WeaponEnableArray: '[weapon]',
  VitalMaxArray: '{real}',
  WeaponArray: [
    {
      Link: 'weapon',
      Turret: 'turret'
    }
  ],
  BehaviorCategoriesEnable: [
    {
      index: 'behavior',
      value: Bit
    }
  ],
  CriticalAttackChanceUnscaledBonus: Int,
  ResourceHarvestAmountBonus: '{int}',
  AccelerationBonus: Real,
  MoveSpeedMaximum: Real,
  RateMultiplierArray: '{real}',
  SightMaximum: Real,
  DecelerationBonus: Real,
  DamageDealtAttributeScaled: '{int}',
  DamageDealtUnscaled: [{index: 'word', AccumulatorArray:[{value:"accumulator"}],value:"real"}],
  VitalMaxFractionArray: '{real}',
  AccelerationMultiplier: Real,
  DamageDealtScaled: '{real}',
  WeaponScanBonus: Real,
  SnareMultiplier: Real,
  LifeArmorBonus: Real,
  TurretDisableArray: '[turret]',
  VitalRegenMultiplier: '{real}',
  RangedWeaponRange: Real,
  UnifiedMoveSpeedFactor: Real,
  ShieldArmorBonus: Real,
  BehaviorCategoriesDisable: '{bit}',
  AdditiveMoveSpeedFactor: { AccumulatorArray:[{value:"accumulator"}],value:"real"},
  AdditiveAttackSpeedFactor: { AccumulatorArray:[{value:"accumulator"}],value:"real"},
  AbilCategoriesEnable: '{bit}',
  HealDealtMultiplier: Int
}

export const ConditionSchema ={
  Value: "int",
  User: [{
    Instance:"tring",
    Type:Word,
    Field:Word
  }],
  Index:Word,
  State:Word,
  FixedId:Word,
  Operation:Word
}

export const LineSchema = {
  $Id: Word,
  Text: 'text',
  Sound: 'sound',
  ChoiceSelection: Word,
  MaxChoices: "int",
  FacialAnim: Word,
  AltLineMatchText: "int",
  OverlapPrevious: Int,
  SpeakerVariation: Word,
  CutsceneFile: 'file',
  AnimProps: Word,
  CustomSpeaker: 'link',
  CutscenePosition: 'ints',
  AnimBlendIn: Int,
  AnimBlendOut: Int,
  ApplyCutsceneToChildren: Bit,
  SpeakerCharacter: 'character',
  Comment: 'string',
  Objects: '{word}',
  Variations: '{word}',
  FacialBlend: Int,
  LookAtAttach: Word,
  Conditions: [ConditionSchema],
  Name: 'text',
  LineSelection: Word,
  MaxLines: Int,
  Children: '[word]',
  NoWait: Int,
  AltLine: Int,
  Tags: '[word]',
  ConditionCheck: '[word]',
}

export const StarcraftSchema = {
  const: {
    catalog: 'const',
    $type: Word,
    $value: 'string',
    $path: 'string',
  },
  CAbil: {
    catalog: 'abil',
    Name: 'text',
    TechPlayer: Word,
    UnloadTransportEffect: 'effect',
    LoadTransportEffect: 'effect',
    EditorCategories: 'categories',
    TargetMessage: 'link',
    CargoFilter: 'unit',
    CastMovementLimit: Int,
    LevelButtonTooltip: '[link]',
    LevelButtonOffTooltip: '[link]',
    ResourceAmountBonus: '{int}',
    ReturnLifeFraction: Real,
    StateBehavior: 'behavior',
    OrderArray: [
      {
        DisplayType: "word",
        Color: 'ints',
        Model: 'file',
        LineTexture: 'file',
        Scale: Real
      }
    ],
    SharedFlags: '{bit}',
    DataCollection: 'datacollection',
    RangeSlop: Real,
    CancelDelay: '{real}',
    FinishCommand: 'abilcmd',
    ArcSlop: Real,
    AutoCastAcquireLevel: Word,
    AutoCastFilters: 'filters',
    Flags: '{bit}',
    Effect: '[effect]',
    IgnoreUnitCostRequirements: "requirement",
    AgentUnitValidator: "validator",
    $h5: "actor",
    $h6: "actor",
    $h7: "actor",
    $h8: "actor",
    ResourceAmountCapacity: "{int}",
    EffectDelay: "real",
    Requirements: "requirement",
    LevelUnitBuildTimeFactor: "real",
    EffectRange: '[reals]',
    AINotifyEffect: 'effect',
    VeterancyBehavior: 'behavior',
    RefundArray: '{bit}',
    UnloadValidatorArray: '[validator]',
    AutoCastToggleOnValidatorArray: '[validator]',
    AutoCastToggleOffValidatorArray: '[validator]',
    RefundFraction: {
      VitalFraction: "{int}",
      Charge: Int,
      Cooldown: Int,
      Resource: '{real}',
      Vital: '{int}'
    },
    UseMarkerArray: '{bit}',
    PauseableArray: '{bit}',
    PreemptableArray: '{bit}',
    ValidatedArray: '{bit}',
    DefaultError: 'string',
    AcquirePriority: Int,
    Levels: Int,
    Points: Int,
    SetLastTarget: "alert",
    VeterancyLevelMin: Int,
    VeterancyLevelSkip: Int,
    ErrorAlert: 'alert',
    Activity: 'link',
    Cancelable: Bit,
    Leash: Real,
    Alert: 'string',
    AbilSetId: 'abil',
    DebugTrace: Bit,
    Alignment: Word,
    AcquireFilters: 'filters',
    SmartFilters: 'filters',
    SupportedFilters: 'filters',
    CmdButtonArray: [
      {
        index: Word,
        DefaultButtonFace: 'button',
        Flags: '{bit}',
        ReviverIndex: Int,
        ValidatorArray: '[validator]',
        Requirements: 'requirement',
        State: Word
      }
    ],
    MaxAttackSpeedMultiplier: Int,
    MinAttackSpeedMultiplier: Real,
    TargetFilters: '[filters]',
    Range: '[real]',
    EnumRange: Real,
    HaltCmdButton: {
      Flags: "{bit}",
      DefaultButtonFace: 'button'
    },
    FlagArray: '{bit}',
    InfoArray: [
      {
        Requirements: "requirement",
        Location: "abil",
        index: Int,
        Button: {
          Flags: '{bit}',
          DefaultButtonFace: 'button',
          State: Word,
          Requirements: 'requirement'
        },
        Classes: '[itemclass]',
        Unit: 'unit',
        SectionArray: [
          {
            UseBuildTimeArray: "{bit}",
            index: Word,
            DurationArray: '{real}',
            EffectArray: '{effect}'
          }
        ],
        Time: Real,
        VeterancyLevelMin: Int,
        VeterancyLevelSkip: Int,
        AddOnParentCmdPriority: Int,
        Count: Int,
        CollideRange: Real,
        Effect: 'effect',
        Charge: {
          CountMax: Int,
          CountStart: Int,
          CountUse: Real,
          Location: Word,
          TimeStart: Real,
          TimeUse: Real,
          Link: 'string',
          Flags: '{bit}',
          HideCount: Bit
        },
        Upgrade: 'upgrade',
        Resource: '{int}',
        Alert: 'alert',
        Flags: '{bit}',
        UseFilters: 'filters',
        SetFilters: 'filters',
        AllowSetValidators: '[validator]',
        SetValidators: '[validator]',
        UseValidators: '[validator]',
        SetOnGround: Bit,
        ValidatorArray: '[validator]',
        Cooldown: {
          Link: 'string',
          TimeUse: Real,
          Location: Word,
          TimeStart: Real
        },
        RandomDelayMax: Real,
        CountStart: Int,
        Manage: Word,
        Score: Bit,
        RandomDelayMin: Real,
        Delay: Int,
        Vital: '{int}',
        RallyResetPhase: Word,
        Display: '{bit}',
        Alignment: Word,
        Container:  "itemcontainer",
        EmptyFace: "button",
        Item: 'item',
        TargetFilters: 'filters',
        RefundFraction: '{bit}',
        Abil: 'abil',
        Distance: Real,
        Rotation: Word,
        AllowSetFilters: 'filters',
        AllowSetOnGround: Bit
      }
    ],
    VitalStartFactor: '{real}',
    FollowRange: Real,
    AcquireRadius: Real,
    ReservedMarker: {
      Link: 'link'
    },
    ResourceAllowed: '{bit}',
    ResourceAcquire: '{bit}',
    ResourceDestroy: '{bit}',
    ResourceAmountMultiplier: '{real}',
    ResourceTimeMultiplier: '{real}',
    UninterruptibleArray: '{bit}',
    ActorKey: Word,
    AbilClassEnableArray: '{bit}',
    AbilClassDisableArray: '{bit}',
    QueueCount: Int,
    NameOverride: 'link',
    SelfReviveCmd: Word,
    TargetType: Word,
    VitalArray: '{word}',
    MaxInfo: {
      TimeFactor: Real,
      Time: Int,
      ResourceFactor: '{int}',
      Resource: '{int}'
    },
    DeathTypeOnFinish: Word,
    DeathTypeOnCancel: Word,
    MaxUnloadRange: Real,
    TargetSorts: TargetSorts,
    ReplaceFilters: 'filters',
    ValidatorArray: '[validator]',
    AttackModifierBehavior: "behavior",
    FleeRange: Int,
    FleeTime: Int,
    FollowRangeSlop: Int,
    FollowAcquireRange: Int,
    MinPatrolDistance: Real,
    CursorEffect: '[effect]',
    Type: Word,
    BehaviorArray: '[behavior]',
    Cost: [CostSchema],
    OffCost: CostSchema,
    ExpireCost: CostSchema,
    AbilityCategories: '{bit}',
    DefaultButtonCardId: Word,
    CancelableArray: '{bit}',
    AutoCastRange: Real,
    PostEffectBehavior: EffectBehaviorSchema,
    PreEffectBehavior: EffectBehaviorSchema,
    UnloadCargoBehavior: 'behavior',
    UnloadTransportBehavior: 'behavior',
    AutoCastValidatorArray: '[validator]',
    Marker: {
      Duration: Real,
      Link: 'string',
      MatchFlags: '{bit}',
      MismatchFlags: '{bit}'
    },
    InheritAttackPriorityArray: '{bit}',
    MorphUnit: 'unit',
    Arc: Real,
    Placeholder: "unit",
    ProducedUnitArray: '[unit]',
    PlaceUnit: 'unit',
    InfoTooltipPriority: Int,
    CastIntroTime: '[real]',
    CastOutroTime: '[real]',
    FinishTime: '[real]',
    PrepTime: '[real]',
    QueueSize: Int,
    FollowFilters: 'filters',
    ConstructionMover: 'mover',
    FidgetDelayMin: Int,
    FidgetDelayMax: Int,
    AcquireAttackers: Bit,
    SmartValidatorArray: '[validator]',
    MaxCargoCount: Int,
    MaxCargoSize: Int,
    TotalCargoSpace: Int,
    UnloadPeriod: Real,
    ShowProgressArray: '{bit}',
    ProgressButtonArray: '{button}',
    LoadCargoBehavior: 'behavior',
    LoadValidatorArray: '[validator]',
    SearchRadius: Real,
    DeathUnloadEffect: 'effect',
    LoadCargoEffect: 'effect',
    UnloadCargoEffect: 'effect',
    BuildMorphAbil: 'abil',
    Launch: Word,
    CalldownEffect: 'effect',
    EffectArray: '{effect}',
    AutoCastCountMin: Bit,
    LoadTransportBehavior: Word,
    PowerUserBehavior: 'behavior',
    InitialUnloadDelay: Real,
    LoadPeriod: Real,
    AlertArray: '{alert}',
    Abil: 'abil',
    ProgressButton: 'button',
    Info: {
      Charge: {Link: 'link'},
      Cooldown: {Link: 'link'},
      Unit: 'unit',
      Time: Real,
      Resource: '{int}'
    },
    ExternalAngle: '[real]',
    AbilCmd: 'abilcmd',
    ResourceAmountRequest: '{int}',
    Offset: 'reals',
    MaxCount: Int,
    CancelUnit: 'unit',
    TrackingArc: Real,
    PrepEffect: '[effect]',
    MaxDropRange: Real,
    BaseInfo: {
      Time: Int,
      Resource: '{int}',
      Cooldown: {
        Location: Word,
        TimeUse: Real
      }
    },
    LevelInfo: {
      Time: Int,
      Resource: '{int}'
    },
    PointsPerLevel: Int,
    IgnoreFilters: 'filters',
    ProxyOffset: 'ints',
    ProxyUnit: 'unit',
    AbilLinkEnableArray: '[abil]',
    InterruptCost: CostSchema,
    CastOutroTimeEffect: 'effect',
    CursorRangeMode: Word,
    SmartPriority: Int,
    CancelEffect: '{effect}',
    ResourceQueueIndex: Bit,
    AutoCastCountMax: Int,
    $unit: 'unit',
    CancelCost: CostSchema,


    InterruptArray: "[int]",
    Placement: "actor",
    Button: "button",
    Unit: "unit",
    MaxBuilders: "int",
    TacticalAIFunc: Word,
    PowerBuildBonusRate: "real",
    PowerBuildCostFactor: "real",
    ResourceTimeBonus: "[real]",
    BaseUnitCostFactor: {
      Resource: "[real]"
    },
    LevelUnitCostFactor: {
      Resource: "[real]"
    },
    MoveFilters: "filters",
    PowerupSmartPriority: "int",
    LevelButtonOnTooltip: "[link]",
    TechAliasArray: "abil",

    "$race": 'race',
    "$h1": "actor",
    "$h2": "actor",
    "$h3": "actor",
    "$h4": "actor",
    "$l1": "button",
    "$l2": "button",
    "$l3": "button",
    "$l4": "button",
    "$l5": "button",
    "$toUnit": "actor",
    "$unitID": 'unit',
  },
  CAbilArmMagazine: {
    prototype: 'CAbil',
    InfoArray: [
      {
        index: Word
      }
    ]
  },
  CAbilAttack: { prototype: 'CAbil'},
  CAbilAttackModifier: { prototype: 'CAbil'},
  CAbilAugment: { prototype: 'CAbil'},
  CAbilBattery: { prototype: 'CAbil'},
  CAbilBeacon: { prototype: 'CAbil'},
  CAbilBehavior: { prototype: 'CAbil'},
  CAbilBuild: {
    prototype: 'CAbil',
    InfoArray: [
      {
        PeonKillFinish: "int",
        index: Word
      }
    ]
  },
  CAbilBuildable: { prototype: 'CAbil'},
  CAbilEffect: { prototype: 'CAbil'},
  CAbilEffectInstant: {prototype: 'CAbilEffect'},
  CAbilEffectTarget: {prototype: 'CAbilEffect'},
  CAbilHarvest: { prototype: 'CAbil'},
  CAbilInteract: { prototype: 'CAbil'},
  CAbilInventory: { prototype: 'CAbil'},
  CAbilLearn: {
    prototype: 'CAbil',
    InfoArray: [
      {
        index: Word
      }
    ]
  },
  CAbilMerge: { prototype: 'CAbil'},
  CAbilMergeable: { prototype: 'CAbil'},
  CAbilMorph: { prototype: 'CAbil'},
  CAbilMorphPlacement: { prototype: 'CAbil'},
  CAbilMove: { prototype: 'CAbil'},
  CAbilPawn: {
    prototype: 'CAbil',
    InfoArray: [
      {
        index: Word
      }
    ]
  },
  CAbilProgress: { prototype: 'CAbil'},
  CAbilQueue: { prototype: 'CAbil'},
  CAbilQueueable: { prototype: 'CAbil'},
  CAbilRally: { prototype: 'CAbil'},
  CAbilRedirect: { prototype: 'CAbil'},
  CAbilRedirectInstant: { prototype: 'CAbil'},
  CAbilRedirectTarget: { prototype: 'CAbil'},
  CAbilResearch: {
    prototype: 'CAbil',
    InfoArray: [
      {
        index: Word
      }
    ]
  },
  CAbilRevive: { prototype: 'CAbil'},
  CAbilSpecialize: {
    prototype: 'CAbil',
    InfoArray: [
      {
        index: Word
      }
    ]
  },
  CAbilStop: { prototype: 'CAbil'},
  CAbilTrain: {
    prototype: 'CAbil',
    InfoArray: [
      {
        index: Word,
        Unit: '[unit]'
      }
    ]
  },
  CAbilTransport: { prototype: 'CAbil'},
  CAbilWarpTrain: {
    prototype: 'CAbil',
    InfoArray: [
      {
        index: Word
      }
    ]
  },
  CAbilWarpable: { prototype: 'CAbil'},
  CAccumulator: {
    catalog: 'accumulator',
    PreviousValueFactor: Bit,
    Flags: "{bit}",
    Scale: Real,
    Index: Int,
    Type: Word,
    AmountType: Word,
    FallbackValue: "int",
    Attribute: 'behavior',
    Key: Word,
    StartLocation: [{Effect:"effect",Value:"string"}],
    EndLocation : [{Effect:"effect",Value:"string"}],
    CaseArray: [
      {
        Validator: 'validator',
        Accumulator: 'accumulator'
      }
    ],
    Behavior: 'behavior',
    CaseDefault: "accumulator",
    ApplicationRule: Word,
    Amount: '[real]',
    Ratio: Real,
    MinAccumulation: Real,
    MaxAccumulation: Real,
    VitalType: 'colorstyle',
    ModificationType: Word,
    BonusPerLevel: Real,
    UnitSource: {
      Value: Word
    },
    Operation: 'string',
    Parameters: [
      {
        AccumulatorArray: '[accumulator]',
        value: Real
      }
    ],
  },
  CAccumulatorConstant: { prototype: 'CAccumulator'},
  CAccumulatorAbilLevel: { prototype: 'CAccumulator'},
  CAccumulatorArithmetic: { prototype: 'CAccumulator'},
  CAccumulatorAttributePoints: { prototype: 'CAccumulator'},
  CAccumulatorVeterancyLevel: { prototype: 'CAccumulator'},
  CAccumulatorBehavior: { prototype: 'CAccumulator'},
  CAccumulatorCargo: { prototype: 'CAccumulator'},
  CAccumulatorDistance: { prototype: 'CAccumulator'},
  CAccumulatorEffectAmount: { prototype: 'CAccumulator'},
  CAccumulatorSwitch: { prototype: 'CAccumulator'},
  CAccumulatorUnitCustomValue: { prototype: 'CAccumulator'},
  CAccumulatorUserData: { prototype: 'CAccumulator'},
  CAccumulatorVitals: { prototype: 'CAccumulator'},
  CAchievement: {
    catalog: 'achievement',
    Description: 'text',
    Category: 'text',
    Name: 'text',
    MinTermCount: Int,
    Race: 'race',
    SharesTerms: 'achievement',
    Supersedes: 'achievement',
    Filters: '{bit}',
    Flags: '{bit}',
    Icon: 'file',
    Points: Int,
    TermTable: '[achievementterm]',
    RewardTable: "[reward]",
    Tags: [{Value:Word,Check:Word}],
  },
  CAchievementTerm: {
    catalog: 'achievementterm',
    Name: 'text',
    Description: 'text',
    Compare: Word,
    Evaluate: Word,
    AbilCmd: [{value:"abilcmd"}],
    Effect: [{value:"effect"}],
    ChildTable: [{value:'achievementterm'}],
    Flags: '{bit}',
    Quantity: [{value:"int"}],
    Unit: [{value:'unit'}],
    ValidatorArray: '[validator]',
    WhichPlayer: {
      Value: Word
    },
    Period: "int",
    Behavior: "behavior",
    State: "int",
    ScoreValue: "scorevalue",
    Vital: "colorstyle",
    Child: "reward",
    Type: Word,
  },
  CAchievementTermAbilInteract: { prototype: 'CAchievementTerm'},
  CAchievementTermAbilLoad: { prototype: 'CAchievementTerm'},
  CAchievementTermAbilUse: { prototype: 'CAchievementTerm'},
  CAchievementTermAchievement: { prototype: 'CAchievementTerm'},
  CAchievementTermBehaviorCount: { prototype: 'CAchievementTerm'},
  CAchievementTermBehaviorState: { prototype: 'CAchievementTerm'},
  CAchievementTermCombine: { prototype: 'CAchievementTerm'},
  CAchievementTermEffectAbsorbed: { prototype: 'CAchievementTerm'},
  CAchievementTermEffectDamaged: { prototype: 'CAchievementTerm'},
  CAchievementTermEffectDodged: { prototype: 'CAchievementTerm'},
  CAchievementTermEffectHealed: { prototype: 'CAchievementTerm'},
  CAchievementTermEffectKilled: { prototype: 'CAchievementTerm'},
  CAchievementTermEffectUse: { prototype: 'CAchievementTerm'},
  CAchievementTermGeneric: { prototype: 'CAchievementTerm'},
  CAchievementTermReplay: { prototype: 'CAchievementTerm'},
  CAchievementTermScoreValue: { prototype: 'CAchievementTerm'},
  CAchievementTermTime: { prototype: 'CAchievementTerm'},
  CAchievementTermUnitBirth: { prototype: 'CAchievementTerm'},
  CAchievementTermUnitDeath: { prototype: 'CAchievementTerm'},
  CAchievementTermUnitKills: { prototype: 'CAchievementTerm'},
  CAchievementTermUnitRegen: { prototype: 'CAchievementTerm'},
  CAchievementTermUnitSupplyLoss: { prototype: 'CAchievementTerm'},
  CActor: {
    catalog: 'actor',
    Deltas: [
      {
        AttachQuerySource: {
          Methods: Word
        },
        AttachQueryTarget: {
          Methods: Word
        },
        Subject: Word
      }
    ],
    DeltaSumFlags: "{int}",
    ReattachQuery: {
      Fallback: Word
    },
    HostTether: {
      Subject: Word
    },
    EnableY: Word,
    YMinimum: "real",
    YMaximum: "real",
    MissileModel: "model",
    MinimapIconBackground: "file",
    Buff: "behavior",
    ModelMaterialGlazeDisplayLimit: "int",
    UnitButton: "abil",
    Portrait: 'model',
    "$anim": "words",
    "$effectsound": "sound",
    "$model": "actor",
    "$effectsoundlooped": "sound",
    "$dataeffect": "effect",
    "$missile": "actor",
    "$dropBehavior": 'behavior',
    "$dropEffect": 'effect',
    "$defType": Word,
    "$tid": "actor",
    "$art": "file",
    "$effect": 'effect',
    "$file": Word,
    "$buffid": "actor",
    "$A": 'abil',
    "$B": 'abil',
    "$C": 'abil',
    "$D": 'abil',
    $weaponId: 'weapon',
    $unitId: 'unit',
    WeaponSound: Word,
    FogVisibility: Word,
    EditorCategories: 'categories',
    InheritType: Word,
    TiltType: Word,
    EventDataSoundActor: 'actor',
    PlayerIdSource: Word,
    CustomUnitStatusAttachment: Word,
    QueryFilters: 'filters',
    VisibleTo: '{bit}',
    Inherits: '{bit}',
    FilterPlayers: '[int]',
    VisibleToPlayers: '[int]',
    AddToProximitySystem: Bit,
    WalkAnimTimeScalingAsFlyer: Bit,
    HeightRange: 'reals',
    AcceptedTransfers: '{bit}',
    InternalSplatHeight: Word,
    PortraitCamera: 'camera',
    On: [
      {
        Terms: 'terms',
        Send: 'send',
        Target: 'subject'
      }
    ],
    Camera: 'camera',
    Model: 'model',
    UnitIconVariations: [{Number:"int",Image: "file"}],
    CustomUnitStatusOffset: 'ints',
    AnimBlendTime: Real,
    ModelFlags: '{bit}',
    ProximityPosition: Word,
    LaunchActor: 'actor',
    LaunchHeight: Real,
    CenterActor: 'actor',
    CenterHeight: Real,
    ImpactActor: 'actor',
    ImpactHeight: Real,
    QuadFlags: '{bit}',
    PowerSource:  "behavior",
    SpawnTarget:  "actor",
    HostSiteOps: {
      Ops: 'ops',
      HoldPosition: Bit,
      HoldRotation: Bit
    },
    Host: Host,
    TerrainDeformerFlags: '{bit}',
    FoliageFXDeathSpawnTarget: Word,
    Supporter: Host,
    Arc: Real,
    Icon: 'file',
    IconArcLength: Real,
    CliffLevelFlags: '{bit}',
    RangeFlags: '{bit}',
    IconTint: 'ints',
    Flags: '{bit}',
    RadiusMedium: Real,
    RadiusLarge: Real,
    MaxCountSmall: Int,
    MaxCountMedium: Int,
    MaxCountLarge: Int,
    Sound: 'sound',
    SoundFlags: '{bit}',
    Color: 'ints',
    FadeIn: Real,
    FadeOut: Real,
    TextScale: Real,
    MaxSize: 'reals',
    AlignH: Word,
    AlignV: Word,
    PitchQuery: {
      Methods: 'string'
    },
    YawQuery: {
      Methods: 'string'
    },
    TurretBody: Host,
    Aliases: '[word]',
    AngleAnimProps: Word,
    Beam: "actor",
    DoodadFlags: '{bit}',
    EditorIcon: 'file',
    Radius: 'reals',
    RandomScaleRange: 'reals',
    OccludeHeight: Real,
    EditorFlags: '{bit}',
    MinimapRenderPriority: Word,
    VisibleOpacity: Real,
    Terms: 'terms',
    HoldTime: Real,
    FallOff: Real,
    HalfHeight: Real,
    Attenuation: Real,
    Layer: Word,
    HostRadiusPercent: Real,
    Alpha: 'reals',
    AttachQuery: {
      Methods: 'string',
      Fallback: Word
    },
    RollMax: 'reals',
    RollInActivationAngle: Real,
    RollInArc: 'reals',
    RollOutDuration: 'reals',
    Variance: Real,
    NotifyClosestScaleKey: Word,
    Quad: 'reals',
    AcceptedHostedPropTransfers: '{bit}',
    $unitName: 'unit',
    AutoScaleFactor: Real,
    InnerWidth: Real,
    OuterWidth: Real,
    RotationSpeed: Real,
    SegmentCount: Int,
    SegmentPercentSolid: Real,
    InnerBoundaryFallOffRatio: Real,
    InnerBoundaryRatio: Real,
    InnerOffsetRatio: Real,
    SelectionFlags: '{bit}',
    SelectionFilter: '{bit}',
    ForceFlags: '{bit}',
    Field: Word,
    StatusBarFlags: '{bit}',
    StatusBarGroups: '{bit}',
    StatusColors: [
      {
        index: Word,
        BackgroundColor: 'ints',
        EmptyColor: 'ints',
        ColorArray: '[ints]'
      }
    ],
    BarDistance: Int,
    BarWidth: Int,
    BarHeight: Int,
    BarOffset: Int,
    NameOffset: Int,
    HighlightTooltip: 'text',
    CopySource: Word,
    UnitFlags: '{bit}',
    GlossaryAnim: 'string',
    MinimapIconScale: Real,
    MinimapIconBackgroundScale: Real,
    MinimapFlashWhenAttacked: Bit,
    MinimapUseSelfColor: Bit,
    MinimapUseSelectionColor: Bit,
    Baselines: [
      {
        index: Word,
        AnimProps: 'words',
        BlendIn: Real,
        BlendOut: Real
      }
    ],
    WalkAnimMoveSpeed: Real,
    BuildModel: 'model',
    PlacementModel: 'model',
    PlacementActorModel: 'actor',
    PlaceholderActorModel: 'actor',
    PortraitActor: 'actor',
    PortraitModel: 'model',
    DeathActorModel: 'actor',
    DeathActorModelLow: 'actor',
    DeathActorSound: 'actor',
    DeathActorVoice: 'actor',
    SnapshotActor: 'actor',
    UnitIcon: 'file',
    HeroIcon: 'file',
    SoundArray: '{sound}',
    GroupSoundThreshold: Int,
    GroupSoundArray: '{sound}',
    ShieldArmorIcon: 'file',
    VarianceWindowStandIntro: Real,
    VarianceWindowStand: Real,
    VarianceWindowWalkIntro: Real,
    VarianceWindowWalk: Real,
    VarianceWindowWalkOutro: Real,
    EventDataFootprint: [
      {
        Actor: 'actor',
        Name: Word,
        Model: 'model'
      }
    ],
    EventDataSound: [
      {
        Actor: 'actor',
        Name: Word,
        Sound: 'sound'
      }
    ],
    DeathArray: [
      {
        index: Word,
        AnimProps: 'words',
        ModelLink: 'model',
        SoundLink: 'sound',
        VoiceLink: 'actor',
        ActorModel: 'actor',
        BodySquibs: [
          {
            Name: Word,
            ActorModel: 'actor',
            Model: 'model',
            ModelSiteOps: {
              Ops: 'ops'
            },
            ModelAttachQuery: {
              Methods: 'string'
            },
            ActorSound: 'actor',
            Sound: Word,
            SoundSiteOps: {
              Ops: 'ops'
            },
            SoundAttachQuery: {
              Methods: Word
            },
            RequiredSquibType: Word
          }
        ]
      }
    ],
    DeathCustoms: [
      {
        ModelLink: 'model',
        Name: Word,
        ActorModel: 'actor',
        PhysicsMatchKeysOrdered: 'words',
        BodySquibs: [
          {
            Name: Word,
            IsFallback: Bit,
            Model: 'model'
          }
        ],
        InheritsFrom: Word,
        AnimProps: 'words',
        IsAbstract: Bit,
        SoundLink: 'sound',
        VoiceLink: "sound"
      }
    ],
    DeathCustomData: [
      {
        Name: Word,
        SyncPassChance: Int,
        Members: 'filters',
        Supersedes: 'words'
      }
    ],
    OverkillByDamagePastRemainingHealth: {
      Value: Int,
      TestType: Word
    },
    OverkillByDamageOverInterval: {
      Value: Int,
      Interval: Bit,
      TestType: Word
    },
    PhysicsMatchKeysOrdered: 'words',
    StatusTextInfo: {
      Offset: 'ints',
      Attachment: 'string',
      FontSize: Int,
      BackgroundColor: 'ints',
      BackgroundImage: 'file'
    },
    $Sub : 'string',
    MaxScale: 'reals',
    AutoScaleFromSelectionFactor: Real,
    EndYawPeriod: 'reals',
    EndRadiusInner: Real,
    EndRadiusOuter: Real,
    Macros: '[actor]',
    EditorModel: 'model',
    Filter: '{bit}',
    HarnessModel: 'model',
    HarnessSound: "actor",
    Map: [
      {
        Scale: "real",
        index: Word,
        Model: 'model',
        Sound: 'sound'
      }
    ],
    PreHost: Word,
    IsTentacle: Bit,
    LaunchGuideAlias: Word,
    LaunchSite: Word,
    LaunchSiteOps: {
      Ops: 'ops',
      HoldPosition: Bit,
      HoldRotation: Bit
    },
    LaunchSiteFallback: Word,
    LaunchAttachQuery: {
      Methods: 'string',
      Fallback: Word
    },
    LaunchAssets: {
      Scale: Real,
      Model: 'model',
      AnimProps: 'string',
      Sound: 'sound'
    },
    LaunchModel: 'model',
    LaunchSound: "actor",
    LaunchTerrainSquibModel: 'model',
    LaunchTerrainSquibSound: "actor",
    ContainerSite: "actor",
    ContainerSiteOps: {
      Ops: 'ops'
    },
    ContainerAttachQuery: {
      Methods: 'string',
      Fallback: Word
    },
    ContainerAssets: {
      Model: 'model',
      Sound: 'sound'
    },
    ContainerModel: 'model',
    ContainerSound:  'sound',
    ContainerTerrainSquibModel: 'model',
    ContainerTerrainSquibSound:  'sound',
    BeamScope: Word,
    Missile: 'actor',
    ImpactGuideAlias: Word,
    ImpactSiteOps: {
      Ops: 'ops',
      HoldPosition: Bit,
      HoldRotation: Bit
    },
    ImpactSite: Word,
    ImpactSiteFallback:"actor",
    ImpactAttachQuery: {
      Methods: 'string',
      Fallback: Word
    },
    ImpactReattachQuery: {
      Methods:  "attachmethod",
      Fallback: Word
    },
    ImpactPointSite: "actor",
    ImpactPointSiteOps: {
      Ops: 'ops'
    },
    ImpactMap: [
      {
        AnimProps: 'string',
        index: Word,
        AnimPropsReaction: "sound",
        Model: 'model',
        Sound: 'sound',
        ModelReaction: 'string',
        ScaleReaction: Real,
        Scale: Real
      }
    ],
    ImpactModel: 'model',
    ImpactModelReaction:  "actor",
    ImpactSound: "actor",
    ImpactTerrainSquibModel: 'model',
    ImpactTerrainSquibSound:"actor",
    DamageSite: "actor",
    DamageSiteOps: {
      Ops: 'ops',
      HoldPosition: Bit,
      HoldRotation: Bit
    },
    DamageAttachQuery: {
      Methods: 'string',
      Fallback: Word
    },
    DamageReattachQuery: {
      Methods:  "attachmethod",
      Fallback: Word
    },
    DamageMap: [
      {
        index: Word,
        AnimProps: "sound",
        Model: 'model',
        Sound: Word,
        ModelReaction: 'string'
      }
    ],
    DamageModel: 'model',
    DamageModelReaction: "actor",
    DamageSound: "actor",
    DamageTerrainSquibModel: 'model',
    DamageTerrainSquibSound:"actor",
    AttackAnimSource: 'string',
    AttackAnimName: Word,
    Lifetime: Real,
    ShieldFlashType: Word,
    $effectAttack: 'effect',
    $effectImpact: 'effect',
    $effectLaunch: 'effect',
    $effectHit: 'effect',
    Remove: [
      {
        Terms: 'terms',
        Send: 'send',
        Target: 'actor'
      }
    ],
    HostTargetSiteOps: {
      Ops: 'ops'
    },
    Type: 'actor',
    SceneActor: 'actor',
    MainActor: Word,
    MissileBoundsOptSpeedThreshold: Real,
    ModelCacheFallback: 'model',
    AttachHarnessActor: 'actor',
    AttachHarnessSOpAttach: 'actor',
    AttachHarnessSOpLocalOffset: 'actor',
    AttachHarnessSOpRotationExplicit: 'actor',
    ActorUnitFallback: 'actor',
    CommandUIActor: 'actor',
    CloakModel: 'model',
    CloakModelLow: 'model',
    CloakTransitionArray: [
      {
        index: Word,
        StateArray: [
          {
            index: Word,
            Enter: 'words',
            Loop: 'words'
          }
        ]
      }
    ],
    MaxSpeedForSound: Int,
    RevealTint: 'ints',
    PopulationLimitModel: Int,
    CreepEngulfmentModel: 'model',
    CreepHeightClasses: [
      {
        Name: Word,
        SolidHeight: Real,
        FadeHeight: Real,
        StartOffset: Real
      }
    ],
    CreepRates: [
      {
        Name: Word,
        Rate: Real
      }
    ],
    DeathCustomPriorityList: '[word]',
    MinimapRenderPriorityList: '[word]',
    BodySquibs: [
      {
        Name: Word,
        ActorModel: 'actor',
        Model: 'model',
        ModelSiteOps: {
          Ops: 'ops'
        },
        ModelAttachQuery: {
          Methods: 'string'
        },
        ActorSound: 'actor',
        Sound: "sound",
        SoundSiteOps: {
          Ops: 'ops'
        },
        SoundAttachQuery: {
          Methods: Word
        },
        RequiredSquibType: Word
      }
    ],
    ModelMaterialPriorityList: '[word]',
    Scale: 'reals',
    Location: Word,
    ForceSoftAttach: Bit,
    HoldPosition: Bit,
    HoldRotation: Bit,
    HostIncoming: Host,
    UpwardVisibilityEnhancement: Bit,
    UpwardVisibilityEnhancementVarianceUp: Real,
    UpwardVisibilityEnhancementVarianceDown: Real,
    RollAngleMax: Real,
    RollInRate: Real,
    RollOutRate: Real,
    RollOutRemainderFractionForLevelOff: Real,
    BasicType: Word,
    HostForwardSiteOps: {
      Ops: 'ops'
    },
    Invert: Bit,
    ZOnly: Bit,
    HostForward: Host,
    Forward: 'reals',
    HostHeight: Host,
    HeightSourceType: Word,
    TerrainAndWaterFlags: '{bit}',
    ForcedWadingMaxDepth: Real,
    HostBearings: Host,
    HostBearingsSiteOps: {
      Ops: 'ops'
    },
    HostImpact: Host,
    FreezePositionAtImpact: Bit,
    PullBack: Real,
    LocalOffset: 'reals',
    OverridingLength: 'reals',
    PatchAngle: Real,
    IsLocal: Bit,
    Up: 'reals',
    RestrictToCircumference: Bit,
    HalfWidth: Real,
    Distribution: Word,
    YawHalfAngle: Real,
    PitchHalfAngle: Real,
    ForwardAngle: Real,
    UpAngle: Real,
    IsUpDominantWhenOrthogonalized: Bit,
    Acceleration: Real,
    Deceleration: Real,
    MaxSpeed: Real,
    ShadowFlags: '{bit}',
    TipabilityFlags: '{bit}',
    Sharing: Word,
    HostLaunch: Host,
    HostLaunchSiteOps: {
      Ops: 'ops',
      HoldPosition: Bit,
      HoldRotation: Bit
    },
    Subject: {
      Filters: 'words',
      Terms: 'terms'
    },
    OnResponse: [
      {
        Send: 'send',
        Target: 'string',
        Scope: Word
      }
    ],
    NotifyArcKey: Word,
    NotifyRadiusKey: Word,
    RegionFlags: '{bit}',
    HostForProps: Host,
    Magnitude: 'reals',
    Duration: Real,
    InfluenceRange: Real,
    BlendTime: Real,
    HostInitialSiteOps: {
      Ops: 'ops'
    },
    PhysicsImpactDefault: {
      ActorModel: 'actor',
      ActorSound: 'actor',
      OccuranceThrottlingDistance: 'reals',
      AutoVolumeRangeMin: Real
    },
    Receiver: {
      Scope: 'string',
      Subject: 'subject'
    },
    Direction: Word,
    HostEnd: {
      Subject: 'subject',
      Scope: Word
    },
    Length: 'reals',
    FixedSize: Int,
    InitialAngle: Real,
    HeightOffset: Real,
    DoFAttenuationStartModel: 'model',
    DoFAttenuationEndModel: 'model',
    MinimapIcon: 'file',
    Footprint: 'string',
    CreepHeightClass: Word,
    Facing: Real,
    LaunchRequest: Host,
    FaceFXTarget: Word,
    AnimTargets: Word,
    CantSelectUncontrollableTooltip: 'text',
    $sprayIndex: Int,
    $effectPickup: 'effect',
    $actorCreate: 'actor',
    Text: 'text',
    RequiredSquibType: Word,
    StateThinkInterval: Real,
    StateArray: [
      {
        Name: Word,
        Terms: 'terms'
      }
    ],
    CreepRateGrow: Word,
    CreepRateShrink: Word,
    PlacementSound: 'sound',
    LifeArmorIcon: 'file',
    TerrainSquibs: [
      {
        MovementDistance: 'reals',
        IdlePeriod: 'reals',
        RangeDown: Real,
        RangeDownFade: Real,
        AttachQuery: {
          Methods: 'attachmethod'
        },
        Visuals: {
          TerrainPhysicsMaterial: 'physicsmaterial',
          ActorModel: 'actor',
          ModelLink: 'model',
          Flags: '{bit}'
        },
        RangeUp: Real,
        GroupName: Word
      }
    ],
    AddonIndicator: 'link',
    GroupIcon: {
      Image: '[file]'
    },
    Wireframe: {
      Image: '[file]'
    },
    StatusHarvesterData: {
      Text: 'text',
      link: 'link',
      SearchFilters: 'filters',
      SearchRadius: Real
    },
    WireframeShield: {
      Image: '[file]'
    },
    HostTarget: {
      Subject: 'subject'
    },


    SplatEmitterInit: {
      TextureResolution: 'ints',
      ProjectorModel: 'model',
      MaskBlobPath: 'file',
      ScaleDeltaTime: 'reals',
      ScaleUpdateTime: Int,
      MaxBlobScale: 'reals',
      Tint: 'ints',
      TerrainUVTiling: 'reals',
      MinHeightValue: Real,
      MaterialInfo: [{ReplacementLayers: '{int}',MaterialId: Int}]
    },

    ModelAspectSets: {
      Aspects: [{
        Name: Word,
        RegardsAs: Word,
        Model: "modeel"
      }]
    },
    MinimapIconIsTeamColored: Bit,
    VisibilityShape: {
      Shape: "shape"
    },


    $Behavior: 'behavior',
    $Effect: 'effect',
    $abil: 'abil',
    $unitname: 'unit',
    $behavior: 'behavior',
    $behaviorCloak: 'behavior',
    $buildTime: Real,
    $SoundLink: 'sound',
    $VoiceLink: 'sound',
    Height: 'reals',
    Width: Real,
    //todo
    // <Layers Sound='Disruptor_DisruptionOvercharge_Discharge'>
    //   <Chance value='100'/>
    // <Pitch value='0.000000,0.000000'/>
    // <PlayDelay value='0,0'/>
    // <Volume value='0.000000,0.000000'/>
    // </Layers>
    Layers: [
      {
        $Sound: 'sound',
        PlayDelay: '[ints]',
        PitchSource: Word,
        PlayDelaySource: Word,
        VolumeSource: Word,
        Chance: '[int]',
        Pitch: '[reals]',
        Volume: '[reals]',
      }
    ],
    Weapon: 'weapon',
    StageArray: [
      {
        AnimProps: 'words',
        BlendTime: Real
      }
    ],
    LocalOffsetFor2ndVisibilityTest: 'reals',
    Mean: Real,
    HeightOffsetOnCliff: Real,
    CliffTests: '[reals]',
    Range: Real,
    AcquisitionYawHalfArc: Real,
    AcquisitionPitchHalfArc: Real,
    AccuracyHalfArc: Real,
    HostEndSiteOps: {
      Ops: 'ops',
      HoldPosition: Bit,
      HoldRotation: Bit
    },
    Types: {
      $Id: Word,
      Start: {
        Group: Word,
        Weight: Bit,
        Time: Int,
        Rate: Real
      },
      Stop: {
        Group: Word,
        Weight: Bit,
        Time: Int,
        Rate: Real
      },
      Name: 'text'
    },
    HostImpactSiteOps: {
      Ops: 'ops',
      HoldPosition: Bit,
      HoldRotation: Bit
    },
    Angle: 'reals',
    TexSets: '[terrain]',
    VisibleOpacityBlendDuration: Real,
    NoFlyZoneSoftRadius: Real,
    NoFlyZoneHardRadius: Real,
    EditorFacingAlignment: Int,
    Speed: Real,
    SpeedMax: Real,
    HeightDelta: Real,
    StandAnimTurnTime: Real,
    StandAnimTurnTimeScaleMin: Real,
    $type: Word,
    $sight: Word,
    ErrorArray: [
      {
        Error: Word,
        Sound: 'sound',
        GroupSound: 'sound',
        Text: Word
      }
    ],
    AbilSoundArray: [
      {
        GroupSound: 'sound',
        AbilCmd: 'abilcmd',
        Sound: 'sound'
      }
    ],
    ShieldRippleScaleFactor: Real,
    HeightTests: '[reals]',
    HeightTestType: Word,
    ImpactPhysics: [
      {
        Flags: '{bit}',
        Name: Word,
        MatchKeys: Word,
        Physics: 'actor',
        AttackAnimProps: 'words',
        AttackModelVariation: Bit
      }
    ],
    SelectAbilCmd: 'abilcmd',
    Ripple: "actor",
    ScaleDamageMin: Real,
    ScaleDamageMax: Real,
    RadiusMin: Real,
    RadiusMax: Real,
    VisualDirectionalFacer: "actor",
    VisualDirectionalHeader:  "actor",
    VisualDirectionless:  "actor",
    ActionFlags: '{bit}',
    WireframeShieldVariations: [{Number: Bit, Image: '[file]'}],
    GroupIconVariations: [{Number: Int, Image: '[file]'}],
    WireframeVariations: [{Number: Int, Image: '[file]'}],


    CooldownDisplay: 'words',
    HostImpactSource: Host,
    Elevation: 'reals',
    ElevationPeriod: 'reals',
    Pitch: 'reals',
    PitchPeriod: 'reals',
    Roll: 'reals',
    RollPeriod: 'reals',
    FoliageSpawnTarget: "actor",
    SubjectResponses: [
      {
        Filters: 'words',
        Terms: 'terms',
        OnResponse: [
          {
            Target: Word,
            Send: 'send'
          }
        ]
      }
    ],
    UnitModelFrameActor: 'actor',
    HostFor2ndVisibilityTest: Host,
    HostedAttaches: [
      {
        Name: Word,
        AttachQuery: {
          Methods: 'string'
        },
        HostSiteOps: {
          Ops: 'ops'
        }
      }
    ],
    ImpactSiteOpsReaction: {
      Ops: 'ops',
      HoldPosition: Bit,
      HoldRotation: Bit
    },
    CombatRevealDurationType: Word,
    HostReturn: Host,
    HostReturnSiteOps: {
      Ops: 'ops'
    },
    MovementHerdNode: 'herdnode',
    VisualArray: '[actor]',
    EditorAnim: 'words',
    BaseYaw: Real,
    BaseYawPeriod: Real,
    BaseRadiusInner: Real,
    BaseRadiusOuter: Real,
    BaseRadiusPeriod: Real,
    BasePitch: Real,
    BasePitchPeriod: Real,
    LocalAxis: 'reals',
    Rate: Real,
    $weapon: 'weapon',
    $deco: "model",
    $unitNameAlt: 'unit',
    $alt: Word,
    HostOffset: {
      Subject: 'subject',
      Scope: Word
    },
    HostOffsetSiteOps: {
      Ops: 'ops'
    },
    PhysicsImpacts: [
      {
        Name: Word,
        Group: Word,
        ActorModel: 'actor',
        ModelLink: 'model',
        OccuranceThrottlingDistance: 'reals',
        OccuranceThrottlingPeriod: 'reals',
        SoundLink: 'sound',
        AutoVolumeRange: Word,
        AutoVolumeRangeMin: Real,
        AutoVolumeRangeMax: Real,
        ActorSound: "actor"
      }
    ],
    Abil: {
      Index: "int",
      Link: 'abil'
    },
    DamagePhysics: [
      {
        Name: Word,
        MatchKeys: Word,
        Physics: "actor"
      }
    ],
    TiltAmount: Real,
    AngleRate: Real,
    Aggregate: {
      Type: Word,
      BaseElementLengthMax: Real,
      SegmentRotationRate: Real,
      SwimmingUndulationElementLength: Real,
      SwimmingUndulationStartOffset: Real,
      SwimmingUndulationAmplitudePerUnit: Real,
      SwimmingUndulationWavelength: Real,
      SwimmingUndulationIdlePhaseVelocity: Real,
      TurnSmoothingActivationAngleMin: Real,
      TurnSmoothingActivationAngleMax: Real,
      TurnSmoothingRadiusMax: Real,
      UncoilingWhileIdleRotationRateMin: Real,
      UncoilingWhileIdleRotationRateMax: Real,
      Flags: '{bit}'
    },
    Head: 'actor',
    LoadTransportEffect: 'effect',
    UnloadTransportEffect: 'effect',
    SiteFlags: '{bit}',
    HostZ: {
      Scope: Word,
      Actor: Word,
      Subject: 'subject'
    },
    Segment: {
      Radius: Real
    },
    IsHemisphere: Bit,
    PlayMode: Word,
    LoopCount: Int,
    LookAtPriorityList: '[actor]',
    ScopeBearingsTracking: Word,
    IconScale: 'reals',
    UnitBorderNormalColor: 'ints',
    UnitBorderSubgroupColor: 'ints',
    UnitKillRank: [{
      MinKills: Int,
      Text: 'text'
    }],
    InfoText: 'text',
    ForceCommencementFrom:"effect",
    VitalColors: [
      {
        index: Word,
        ColorArray: '[ints]'
      }
    ],
    VitalNames: '{text}',
    WireframeShieldColor: 'ints',
    CustomUnitStatusFrame: 'link',
    StatusBarOn: '{bit}',
    MinimapTooltip: 'text',
    BoostedHeight: '{real}',
    ImpactSoundActor: 'actor',
    Decoration: {
      Actor: Word,
      SpawnInterval: Real,
      TravelSpeed: Real,
      Flags: '{bit}'
    },
    MinimapIconTintColor: 'ints',
    HighlightSubTooltip: 'text',
    $impactEffect: 'effect',
    $upgradedActorCreate: 'actor',
    $unitSound: 'unit',
    $buff: 'behavior',
    sight: 'unit',
    Sight: 'unit'
  },
  CActorBlob: {prototype: 'CActor'},
  CActorSiteOpTether: {prototype: 'CActor'},
  CActorMinimap: {prototype: 'CActor'},
  CActorSiteOpDeltaSum: { prototype: 'CActor'},
  CActorAction: { prototype: 'CActor'},
  CActorActionOverride: { prototype: 'CActor'},
  CActorArc: { prototype: 'CActor'},
  CActorBase: { prototype: 'CActor'},
  CActorBatch: { prototype: 'CActor'},
  CActorBeamStandard: { prototype: 'CActor'},
  CActorBearings: { prototype: 'CActor'},
  CActorCamera: { prototype: 'CActor'},
  CActorCameraModel: { prototype: 'CActor'},
  CActorCreep: { prototype: 'CActor'},
  CActorCutscene: { prototype: 'CActor'},
  CActorDoodad: { prototype: 'CActor'},
  CActorDoodadPreserver: { prototype: 'CActor'},
  CActorEditorCamera: { prototype: 'CActor'},
  CActorEventMacro: { prototype: 'CActor'},
  CActorFoliageFXSpawner: { prototype: 'CActor'},
  CActorForce: { prototype: 'CActor'},
  CActorForceBox: { prototype: 'CActor'},
  CActorForceConeRoundedEnd: { prototype: 'CActor'},
  CActorForceCylinder: { prototype: 'CActor'},
  CActorForceSphere: { prototype: 'CActor'},
  CActorGlobalConfig: { prototype: 'CActor'},
  CActorLightModel: { prototype: 'CActor'},
  CActorLightOmni: { prototype: 'CActor'},
  CActorLightOmniModel: { prototype: 'CActor'},
  CActorLightSpot: { prototype: 'CActor'},
  CActorLightSpotModel: { prototype: 'CActor'},
  CActorList: { prototype: 'CActor'},
  CActorLookAt: { prototype: 'CActor'},
  CActorModel: { prototype: 'CActor'},
  CActorBeamSimple: { prototype: 'CActorModel'},
  CActorEditorPoint: { prototype: 'CActorModel'},
  CActorModelMaterial: { prototype: 'CActorModel'},
  CActorPortrait: { prototype: 'CActor'},
  CActorPower: { prototype: 'CActor'},
  CActorProgress: { prototype: 'CActor'},
  CActorPropertyCurveSet: { prototype: 'CActor'},
  CActorQuad: { prototype: 'CActor'},
  CActorQueryResponse: { prototype: 'CActor'},
  CActorRange: { prototype: 'CActor'},
  CActorRegion: { prototype: 'CActor'},
  CActorRegionArc: {prototype: 'CActorRegion'},
  CActorRegionCircle: {prototype: 'CActorRegion'},
  CActorRegionQuad: {prototype: 'CActorRegion'},
  CActorRegionWater: {prototype: 'CActorRegion'},
  CActorRegionGame: {prototype: 'CActorRegion'},
  CActorScene: { prototype: 'CActor'},
  CActorSelection: { prototype: 'CActor'},
  CActorSetQueried: { prototype: 'CActor'},
  CActorShadow: { prototype: 'CActor'},
  CActorShield: { prototype: 'CActor'},
  CActorShieldImpact: { prototype: 'CActor'},
  CActorSimple: { prototype: 'CActor'},
  CActorSite: { prototype: 'CActor'},
  CActorSiteBillboard: { prototype: 'CActor'},
  CActorSiteMover: { prototype: 'CActor'},
  CActorSiteOp2DRotation: { prototype: 'CActor'},
  CActorSiteOpAction: { prototype: 'CActor'},
  CActorSiteOpAttach: { prototype: 'CActor'},
  CActorSiteOpAttachVolume: { prototype: 'CActor'},
  CActorSiteOpBanker: { prototype: 'CActor'},
  CActorSiteOpBankerUnit: { prototype: 'CActor'},
  CActorSiteOpBasic: { prototype: 'CActor'},
  CActorSiteOpCursor: { prototype: 'CActor'},
  CActorSiteOpDeathMotion: { prototype: 'CActor'},
  CActorSiteOpEffect: { prototype: 'CActor'},
  CActorSiteOpForward: { prototype: 'CActor'},
  CActorSiteOpGameCameraFollow: { prototype: 'CActor'},
  CActorSiteOpHeight: { prototype: 'CActor'},
  CActorSiteOpHigherOfTerrainAndWater: { prototype: 'CActor'},
  CActorSiteOpHostBearings: { prototype: 'CActor'},
  CActorSiteOpHostedOffset: { prototype: 'CActor'},
  CActorSiteOpIncoming: { prototype: 'CActor'},
  CActorSiteOpLocalOffset: { prototype: 'CActor'},
  CActorSiteOpOrbiter: { prototype: 'CActor'},
  CActorSiteOpPatch: { prototype: 'CActor'},
  CActorSiteOpPhysicsImpact: { prototype: 'CActor'},
  CActorSiteOpRandomPointInCircle: { prototype: 'CActor'},
  CActorSiteOpRandomPointInCrossbar: { prototype: 'CActor'},
  CActorSiteOpRandomPointInSphere: { prototype: 'CActor'},
  CActorSiteOpRotationExplicit: { prototype: 'CActor'},
  CActorSiteOpRotationRandom: { prototype: 'CActor'},
  CActorSiteOpRotationSmooth: { prototype: 'CActor'},
  CActorSiteOpRotationVariancer: { prototype: 'CActor'},
  CActorSiteOpRotator: { prototype: 'CActor'},
  CActorSiteOpSelectionOffset: { prototype: 'CActor'},
  CActorSiteOpSerpentHead: { prototype: 'CActor'},
  CActorSiteOpSerpentSegment: { prototype: 'CActor'},
  CActorSiteOpShadow: { prototype: 'CActor'},
  CActorSiteOpTilter: { prototype: 'CActor'},
  CActorSiteOpTipability: { prototype: 'CActor'},
  CActorSiteOpUp: { prototype: 'CActor'},
  CActorSiteOpZ: { prototype: 'CActor'},
  CActorSiteOrbiter: { prototype: 'CActor'},
  CActorSiteRocker: { prototype: 'CActor'},
  CActorSnapshot: { prototype: 'CActor'},
  CActorSound: { prototype: 'CActor'},
  CActorSplat: { prototype: 'CActor'},
  CActorSquib: { prototype: 'CActor'},
  CActorStateMonitor: { prototype: 'CActor'},
  CActorTerrain: { prototype: 'CActor'},
  CActorTerrainDeformer: { prototype: 'CActor'},
  CActorText: { prototype: 'CActor'},
  CActorTurret: { prototype: 'CActor'},
  CActorUnit: { prototype: 'CActor'},
  CActorMissile: { prototype: 'CActorUnit'},
  CAlert: {
    catalog: 'alert',
    Display: '{bit}',
    PrimaryActions: '{bit}',
    SecondaryActions: '{bit}',
    Flags: '{bit}',
    Fade: Real,
    Life: Real,
    PingColor: 'ints',
    PingTime: Real,
    Sound: 'sound',
    Text: 'text',
    Tooltip: 'text',
    Voice: Word,
    SupersededVolume: Real,
    OverlapDuration: Real,
    OverlapGlobalCount: Int,
    OverlapLocalCount: Bit,
    OverlapLocalRadius: Int,
    QueueTime: Real,
    Icon: 'file',
    Peripheral: Word,
    PingModel: 'model',
    "$race": "race"
  },
  CArmyCategory: {
    catalog: 'armycategory',
    Name: 'text',
    Description: 'text',
    Title: "link",
    BankPath: {
      Key: Word,
      File: Word,
      Section: "string"
    },
    AbilCommandArray: "[abilcmd]",
    UserReference: "string",
    ArmyUnitArray: "armycategory",
    Unit: "actor",
    Flags: "{bit}"
  },
  CArmyUnit: {
    catalog: 'armyunit',
    Name: 'text',
    Description:'text',
    Confirmation: 'text',
    Icon: "file",
    UserReference: "string",
    BankPath: {
      Key: Word,
      File: Word,
      Section: "string"
    },
    UpgradeArray: "upgrade",
    Unit: "actor",
    Movie: "file"
  },
  CArmyUpgrade: {
    catalog: 'armyupgrade',
    Name: 'text',
    Description:'text',
    Tooltip:'text',
  },
  CArtifact: {
    catalog: 'artifact',
    Name: 'text',
    InfoText: 'text',
    Model: 'model',
    TileCutsceneFile: 'file',
    PreviewCutsceneFile: 'file',
    HeroSelectCutsceneFile: 'file',
    AdditionalSearchText: 'text',
    Talent: Word,
    HyperlinkId: Word,
    ApplyTo: '{bit}',
    Face: Word,
    Upgrades: "[word]",
    PlayerResponses: Word
  },
  CArtifactSlot: {
    catalog: 'artifactslot',
    Name: 'text'
  },
  CAttachMethod: {
    catalog: 'attachmethod',
    Multiplier: Int,
    RequestCount: Int,
    Offset: Int,
    Location: {
      Value: Word
    },
    Distribution: Word,
    AttachType: Word,
    Keys: [
      {
        Keyword: Word,
        value: Word,
        Index: Int
      }
    ],
    PassChanceEach: Real,
    PassChanceFull: Real,
    Targets: '[string]',
    Logic: Word,
    Tests: '{bit}',
    Type: Word,
    FilterType: Word,
    Keyword: Word,
    Driver: '[driver]',
    VolumeFactor: Real,
    ProximityFactorNear: Real,
    ProximityFactorFar: Real,
    SortResults: Bit,
    ExponentialMean: Real,
    ReductionType: Word,
    RequestPercentage: Real,
    Base: 'string',
    PortLimit: Int,
    RequestCountRange: Int
  },
  CAttachMethodArcTest: { prototype: 'CAttachMethod'},
  CAttachMethodAttachType: { prototype: 'CAttachMethod'},
  CAttachMethodBestMatch: { prototype: 'CAttachMethod'},
  CAttachMethodFilter: { prototype: 'CAttachMethod'},
  CAttachMethodIncoming: { prototype: 'CAttachMethod'},
  CAttachMethodNodeOccupancy: { prototype: 'CAttachMethod'},
  CAttachMethodNodeOccupancy2: { prototype: 'CAttachMethod'},
  CAttachMethodNumericField: { prototype: 'CAttachMethod'},
  CAttachMethodPattern: { prototype: 'CAttachMethod'},
  CAttachMethodPortAllocator: { prototype: 'CAttachMethod'},
  CAttachMethodProximity: { prototype: 'CAttachMethod'},
  CAttachMethodRandom: { prototype: 'CAttachMethod'},
  CAttachMethodReduction: { prototype: 'CAttachMethod'},
  CAttachMethodVolumesRequery: { prototype: 'CAttachMethod'},
  CAttachMethodVolumesTargets: { prototype: 'CAttachMethod'},
  CAttachMethodVolumesWeightedPick: { prototype: 'CAttachMethod'},
  CBankConditionCompare: {
    catalog: 'bankcondition',
    ValueName: Word,
    Bank: Word,
    Section: "string",
    Key: "map",
    AddCompare: Word,
    Compare: Word
  },
  CBankConditionCompareValueCount: {
    prototype: 'CBankConditionCompare'
  },
  CBankConditionCompareValueSum: {
    prototype: 'CBankConditionCompare'
  },
  CBankConditionCompareValueInteger: {
    prototype: 'CBankConditionCompare'
  },
  CBankConditionCurrentMap: {
    catalog: 'bankcondition',
    Map: "map"
  },
  CBankConditionCombine: {
    catalog: 'bankcondition',
    Type: Word,
    CombineArray: "[bankcondition]"
  },
  CBeamAsyncLinear: { catalog: 'beam'},
  CBehavior: {
    catalog: 'behavior',

    Name: 'text',
    Tooltip: 'text',
    InfoIcon: 'file',
    TechAliasArray: '[behavior]',
    ValidatorArray: '[validator]',
    PeriodicDisplayEffect: 'effect',
    EditorCategories: 'categories',
    BehaviorFlags: '{bit}',
    DisplayShield: '{bit}',
    AttackModifierFlags: '{bit}',
    InfoFlags: '{bit}',
    DamageDealtFraction: '{real}',
    MaxStackCount: Int,
    EmptyHarvestAmount: Int,
    DepletionAlert: 'alert',
    MinPoints: Int,
    MaxPoints: Int,
    MinVeterancyXPLevelFactor: Int,
    MinVeterancyXPPreviousValueFactor: Int,
    Levels: Int,
    PointDisplayFlags: '{bit}',
    PrimaryName: 'text',
    PrimaryTooltip: 'text',
    DurationBonusMin: Real,
    DurationBonusMax: Real,
    TimeScaleSource: {
      Value: Word,
      Effect: 'effect'
    },
    Player: {
      Effect: 'effect',
      Value: Word
    },
    AcquirePlayer: {
      Value: Word,
      Effect: 'effect'
    },
    BuffFlags: '{bit}',
    MultishotSearchPattern: Word,
    UniqueSetId: Word,
    WeaponIndexEnableArray: "{bit}",
    WeaponIndexDisableArray: "{int}",
    $alias: Word,
    XPReceiveFraction: [
      {
        TargetFilters: "filters",
        Fraction: { AccumulatorArray: [{value:"accumulator"}],value:"real"},
      }
    ],
    DamageResponse: {
      AttackType: "[int]",
      Exhausted: "effect",
      ExcludeEffectInChainArray: "effect",
      Location: Word,
      ModifyFraction: Real,
      Chance: Real,
      ModifyMinimumDamage: Bit,
      Cost: CostSchema,
      Kind: '{bit}',
      DamageType: '{bit}',
      ModifyAmount: { AccumulatorArray: [{value:"accumulator"}],value:"real"},
      ClampMinimum: Int,
      Handled: Word,
      HandledValue: Word,
      DamageValue: Word,
      Minimum: Int,
      Maximum: Int,
      Priority: Int,
      ClampMaximum: Int,
      TargetFilters: 'filters',
      Fatal: Bit,
      RequireEffectArray: '[effect]',
      ModifyLimit: Real,
      ExcludeEffectArray: '[effect]',
      RequireEffectInChainArray: '[effect]',
      ValidatorArray: '[validator]'
    },
    KillCredit: {
      Effect: 'effect',
      Value: Word
    },
    RevealUnit: {
      Value: Word
    },
    SharedListPlayer: {
      Value: Word
    },
    StackAlias: 'behavior',
    StackAliasPriority: Int,
    Face: 'button',
    Modification: ModificationSchema,
    DurationOverride: [{Duration:Real,ValidatorArray: '[validator]'}],
    BehaviorCategories: '{bit}',
    Chance: [{index: 'word', AccumulatorArray:[{value:"accumulator"}],value:"real"}],
    ConjoinedFlags: '{bit}',
    PowerLink: Word,
    DeathType: Word,
    CliffLevelFlags: '{bit}',
    CarryResourceBehavior: 'behavior',
    EnabledSearchFilters: 'filters',
    EnabledSearchRadius: Int,
    Range: Real,
    Flags: '{bit}',
    ShareFilters: '{filters}',
    TargetFilters: '[filters]',
    XPFraction: '{real}',
    TimeLimitFactor: Bit,
    DurationRandomMax: Real,
    DisplayDuration: '{bit}',
    ExpireEffect: 'effect',
    Alignment: Word,
    Duration: {AccumulatorArray:[{value:"accumulator"}],value:"real"},
    DisableValidatorArray: '[validator]',
    TrackingValidatorArray: '[validator]',
    PeriodicEffect: 'effect',
    RemoveValidatorArray: '[validator]',
    Period: Real,
    Capacity: Int,
    HarvestTime: Real,
    HarvestAmount: Int,
    RequiredAlliance: Word,
    ExhaustedAlert: 'alert',
    IdealHarvesterCount: Int,
    Delay: Real,
    Leash: Bit,
    PeriodCount: [{AccumulatorArray:[{value:"accumulator"}],value:"int"}],
    InitialEffect: 'effect',
    MaxTrackedUnits: Int,
    UnitAddedAtMaxRule: Word,
    ReplacedEffect: 'effect',
    UnitTrackerFlags: '{bit}',
    Cost: CostSchema,
    OffCost: CostSchema,
    Radius: Real,
    Contents: Int,
    ReturnDelay: Real,
    DepletionThreshold: Int,
    DepletionVariationCount: Int,
    TriggerHeightDeltaMin: Real,
    TriggerHeightDeltaMax: Real,
    InitiateRangeUp: Real,
    InitiateRangeDown: Real,
    JumpRangeMax: Int,
    Mover: 'mover',
    MoverUp: 'mover',
    MoverDown: 'mover',
    DurationPreLaunch: Real,
    DurationPostLand: Real,
    DurationMoveOut: Real,
    Placeholder: "unit",
    LandAdjustmentDown: Real,
    LandArrivalRange: Real,
    LandCheckRadius: Int,
    PlacementMinPowerLevel: Bit,
    PowerStageArray: [
      {
        Modification: ModificationSchema,
        MinPowerLevel: Int
      }
    ],
    PoweredWhileUnderConstruction: Bit,
    InfoArray: [
      {
        Unit: 'unit',
        MaxCount: Int,
        Count: Int,
        StartCount: Int,
        Delay: Real,
        Requirements: 'requirement',
        Effect: 'effect'
      }
    ],
    Slop: Int,
    Center: 'reals',
    Offset: '[reals]',
    Limit: Int,
    ConjoinedLink: "behavior",
    Birth: "footprint",
    Start: "footprint",
    Grown: "footprint",
    Build: "footprint",
    Requirements: 'requirement',
    AINotifyEffect: 'effect',
    Replace: Word,
    ReplaceLocation: {
      Effect: 'effect',
      History: Word,
      Value: Word
    },
    RefreshEffect: 'effect',
    Count: Int,
    CountDelay: Real,
    CountEffect: 'effect',
    ResetDelay: Int,
    ResetEffect: "effect",
    FinalEffect: 'effect',
    MaxStackCountPerCaster: Int,
    PowerLevel: Int,
    SharedXPFraction: '{real}',
    SharedXPRadius: '{real}',
    VeterancyLevelArray: [
      {
        RankNameSchema: 'link',
        LevelGainEffect: 'effect',
        LevelLossEffect: 'effect',
        MinVeterancyXP: Int,
        Modification: ModificationSchema
      }
    ],
    DurationRandomMin: Real,
    LandAdjustmentUp: Real,
    MinimumRange: Real,
    $unit: 'unit',
    DamageDealtUnscaled:  [{index: 'word', AccumulatorArray:[{value:"accumulator"}],value:"real"}],
    PreImpactEffect: "effect",
    PeriodicEffectRateMultiplier: "int",
    DurationVitalArray: "{int}",
    DurationVitalMaxArray: "{int}",
    SortIndex: "int",
    EmptyDeathType: Word,
    LimitDeath: "behavior"
  },
  CBehaviorAttackModifier: { prototype: 'CBehavior'},
  CBehaviorAttribute: { prototype: 'CBehavior'},
  CBehaviorBuff: { prototype: 'CBehavior'},
  CBehaviorClickResponse: { prototype: 'CBehavior'},
  CBehaviorConjoined: { prototype: 'CBehavior'},
  CBehaviorCreepSource: { prototype: 'CBehavior'},
  CBehaviorJump: { prototype: 'CBehavior'},
  CBehaviorPowerSource: { prototype: 'CBehavior'},
  CBehaviorPowerUser: { prototype: 'CBehavior'},
  CBehaviorResource: { prototype: 'CBehavior'},
  CBehaviorReveal: { prototype: 'CBehavior'},
  CBehaviorSpawn: { prototype: 'CBehavior'},
  CBehaviorUnitTracker: { prototype: 'CBehavior'},
  CBehaviorVeterancy: { prototype: 'CBehavior'},
  CBehaviorWander: { prototype: 'CBehavior'},
  CBoost: {
    catalog: 'boost',
    Name: 'text',
    StoreName: 'text',
    HyperlinkId: 'word',
    StoreTypeName: 'text'
  },
  CButton: {
    catalog: 'button',
    TooltipVitalOverrideText: '{int}',
    Name: 'text',
    Tooltip: 'text',
    TooltipCooldownOverrideText: 'text',
    ChargeText: 'text',
    AlertName: 'text',
    AlertTooltip: 'text',
    Hotkey: 'text',
    TooltipTimeOverrideAbilCmd: {AbilCmd: 'abilcmd'},
    HotkeyAlias: Word,
    TooltipFlags: '{bit}',
    UseHotkeyLabel: Bit,
    Icon: 'file',
    TooltipImage: 'file',
    AlertIcon: 'file',
    EditorCategories: 'categories',
    TintRacially: Bit,
    Universal: Bit,
    DefaultButtonLayout: {
      CardId: Word,
      Column: Int,
      Row: Int
    },
    Placeholder: Bit,
    SimpleDisplayText: 'text',
    HotkeySet: 'link',
    HidesForSimpleText: Bit,
    TooltipAppender: [
      {
        Validator: 'validator',
        Text: 'text'
      }
    ],
    $art: 'file',
    $originButton: 'button',
    $num: Int,

    HotkeyToggleUnit: "actor",
    $collection: Word,
    Targets: Word,
    Abil1: 'abil',
    Abil2: 'abil',
    Abil3: 'abil',
    Abil4: 'abil',
    Upgrade: 'upgrade'
  },
  CCamera: {
    catalog: 'camera',
    ZoomDefault: "int",
    FieldOfViewMin: Real,
    FieldOfViewMax: Real,
    FieldOfViewIncrement: Real,
    DistanceMin: Real,
    DistanceMax: Real,
    DistanceIncrement: Real,
    PitchMin: Real,
    PitchMax: Real,
    PitchIncrement: Real,
    YawLeft: Real,
    YawRight: Real,
    YawMax: Real,
    YawIncrement: Real,
    FollowOffsetUpdateBandX: 'reals',
    FollowOffsetUpdateBandY: 'reals',
    FollowScrollLeash: 'reals',
    BorderSizeX:Int,
    BorderSizeY:Int,
    ParamInitial:  '{real}',
    ZoomTableObserver: [{Param:[{index:Word,Modify:"int",Value:"real"}]}],
    ParamSmooth: [{index:Word,SmoothTimeMax:"real",VelocityMax:"real",SmoothTimeMin:"real"}],
    TargetSmooth: [{SmoothTimeMin:"real",SmoothTimeMax:"real",VelocityMax:"real"}],
    MaxScrollRate: '{real}',
    MaxScrollDistance:  '{real}',
    VerticalScrollRateMultiplier: '{real}',
    ScrollAccelerationPeriod:  '{real}',
    ScrollDecelerationPeriod:  '{real}',
    ForwardScale: '{real}',
    StrafeScale:  '{real}',
    HeightMap: Word,
    RotateScale: Real,
    FollowScrollLimit: Real,
    SmartPanJumpDistance: Real,
    SmartPanSkipDistance: Real,
    HeightDisplacementFactor: Real,
    HeightDisplacementPitchMin: Real,
    HeightDisplacementPitchMax: Real,
    HeightDisplacementMax: Real,
    FollowResetDecayDuration: Real,
    FollowResetDecayFactor: Real,
    FollowResetJumpDelay: Real,
    FollowResetJumpDistance: Real,
    FollowResetTimeoutNormal: Real,
    FollowResetTimeoutLeashed: Real,
    FollowResetTimeoutUnleashed: Real,
    ZoomTable: [{
      Param:[{index:Word,Modify:"real",Value:"real"}]
    }]
  },
  CCampaign: {
    catalog: 'campaign',
    Name: "link",
    ShortName: "link",
    StoreName: "link",
    StoreTypeName: "text",
    CampaignData: {
      Id: Word,
      Name: "link",
      Description: "link",
      ImagePath: "file",
      LaunchMap: "file",
      TutorialMap: "file",
      ProgressAchievement: "achievement",
      PromoTextCN: "link",
      CinematicsImagePath: "file",
      StorySoFarImagePath: "file",
      Movie: {
        Name: "link",
        Path: "file",
        Source: "file"
      },
      CampaignBanks: "[word]",
      TransitionBanks: "[word]",
      StorySoFarMovie: {
        Name: "link",
        Path: "file",
        Source: "file"
      },
      ProgressLaunchMap: "file",
      PublishArchiveName: "abilcmd",
      ShowArchivesButton: "int",
      ArchiveDisabledTooltip: "link",
      PromoProduct: "int",
      PromoPurchaseWarningTitle: "link",
      PromoPurchaseWarningMessage: "link",
      PromoText: "link",
      Subtitle: "link",
      SubPanelImage: "file",
      PrerequisiteCampaignId: "campaign",
      PrerequisitesNotMetTooltip: "text",
      CompletedCampaignImagePath: "file",
      UnavailableMessageNotPurchased: "link",
      UnavailableMessagePreReleaseOwned: "link",
      UnavailableMessagePreReleaseNotOwned: "link",

      SaveName: 'string',
      CompletedSaveName: 'string',
      FeaturedImagePath: 'file',
      FeaturedDescription: 'text'
    },
    ProductId: "int",
    PurchaseProductIdArray: "[int]",
    ScreenshotImage1: "file",
    ScreenshotImage2: "file",
    ScreenshotImage3: "file",
    ScreenshotImage4: "file",
    ScreenshotImage5: "file",
    LearnMoreBackgroundImage: "file",
    LearnMoreImage1: "file",
    LearnMoreImage2: "file",
    LearnMoreImage3: "file",
    LearnMoreTitleText1: "text",
    LearnMoreTitleText2: "text",
    LearnMoreTitleText3: "text",
    LearnMoreBodyText1: "text",
    LearnMoreBodyText2: "text",
    LearnMoreBodyText3: "text"
  },
  CCharacter: {
    catalog: 'character',
    Name: 'text',
    RaceCustom: 'link',
    Attitude: 'link',
    Timbre: 'link',
    Dialect: 'link',
    VoiceRef: 'link',
    Description: 'text',
    Gender: Word,
    Voice: 'string',
    Race: 'word',
    Unit: 'unit',
    Color: 'ints',
    Age: Int,
    Image: 'string',
    Variations: [
      {
        Model: 'model',
        DefaultCategories: '[string]',
        Name: 'text',
        Actor: 'actor'
      }
    ],
    Relevance: Word,
    Pitch: Int
  },
  CCliff: {
    catalog: 'cliff',
    CliffMesh: 'cliff',
    CliffMaterial: 'string', //file
    EditorIcon: 'file',
    OccludeHeight: Real,
    TexSets: Word,
    CliffSet: 'cliff',
    Model: 'file',
    NumCellsDown: Int,
    NumCellsAcross: Int,
    HeightCodes: '[string]',
    EditorCategories: 'categories',
    Footprint: 'footprint'
  },
  CCliffDoodad: { prototype: 'CCliff'},
  CCliffMesh: {
    catalog: 'cliffmesh',
    ModelPath: 'string',
    WeldNormals: Bit,
    CliffHeights: '[real]'
  },
  CColorStyle: {
    catalog: 'colorstyle',
    Name: 'text',
    ColorEntry: [
      {
        index: Word,
        Value: '{reals}'
      }
    ]
  },
  CCommander: {
    catalog: 'commander',

    RequiredRewardArray: '[word]',
    Name: 'text',
    UserReference: 'string',
    StoreName: 'link',
    Description: 'text',
    PurchaseMessage: 'link',
    Details: 'link',
    Portrait: 'file',
    HomePanelImage: 'file',
    CutsceneFilterSelf: Word,
    CutsceneFilterAlly: Word,
    LoadingImage: 'file',
    LoadingImageAlly: 'file',
    TraitIcon: 'file',
    CommanderAbilTitle: 'text',
    Movie: 'file',
    MasteryMaxRank: Int,
    FeaturedImagePath: 'file',
    FeaturedDescription: 'text',
    ProfileImagePath: 'file',
    StoreTypeName: 'link',
    LearnMoreBackgroundImage: 'file',
    LearnMoreImage1: 'file',
    LearnMoreImage2: 'file',
    LearnMoreImage3: 'file',
    LearnMoreTitleText1: 'text',
    LearnMoreTitleText2: 'text',
    LearnMoreTitleText3: 'text',
    LearnMoreBodyText1: 'text',
    LearnMoreBodyText2: 'text',
    LearnMoreBodyText3: 'text',
    Color: 'ints',
    CommanderPrestigeAchievementId: Int,
    AttributeId: Word,
    Race: 'race',
    LevelAchievementId: Int,
    UnitArray: [
      {
        Unit: 'unit',
        Upgrade: 'upgradde'
      }
    ],
    TalentTreeArray: [
      {
        Talent: 'talent',
        Level: Int,
        Type: Word,
        Unit: 'unit',
        IsHidden: Bit
      }
    ],
    CommanderAbilArray: [
      {
        Button: 'button'
      }
    ],
    MasteryTalentArray: [
      {
        Talent: 'talent',
        ValuePerRank: Real,
        MaxRank: Int,
        Type: Word,
        Bucket: Int,
        MaxValuePrecision: Bit
      }
    ],
    ConsoleSkin: 'consoleskin',
    PrestigeArray: '[word]',
    ProductId: Int,
    Campaign: "campaign",
    PurchaseImage: 'file'
  },
  CConfig: {
    catalog: 'config',
    Name: 'text',
    CommanderMastery: 'commander',
    CommanderDifficultyLevels: [
      {
        DifficultyLevel: Int,
        Name: 'string',
        Description: 'string',
        IsDefault: Bit,
        AISkillLevel: Int,
        CommanderLevel: Int,
        BeyondBrutalLevel: Int,
        RequirePartyToQueue: Bit,
        IsRetry: Bit
      }
    ],
    CommanderAchievementCategoryId: Int,
    CoopCampaignAchievementCategoryId: Int,
    SilencePenaltyLicense: Int,
    FreeNonKRIGRLicense: Int,
    BoostLicense: Int,
    GameContentArray: '[words]'
  },
  CConsoleSkin: {
    catalog: 'consoleskin',
    Name: 'text',
    StoreName: 'link',
    StoreTypeName: 'link',
    Description: 'text',
    ThumbnailImage: 'file',
    FeaturedImage: 'file',
    MinimapPanelModel: [{
      Model: 'file',
      Position: 'reals',
      Scale: 'reals'
    }],
    InfoPanelModel: [{
      Model: 'file',
      Position: 'reals',
      Scale: 'reals'
    }],
    CommandPanelModel: [{
      Model: 'file',
      Position: 'reals',
      Scale: 'reals'
    }],
    Light: 'light',
    $race: 'race',
    $assetname: Word,
    $preview: Word,
    Default: Bit,
    ReleaseDate: 'link',
    RequiredReward: 'reward',
    SkinId: Word,
    ProductId: Int,
    CommandPanelImage: 'file',
    InfoPanelImage: 'file',
    MinimapPanelImage: 'file'
  },
  CConversation: {
    catalog: 'conversation',
    AnimBlendDefault: Int,
    AnimBlendOut: Int,
    ObjectStates: '{conversationstate}',
    SoundParent: 'sound',
    FixedConditions: [{
      Conditions: [ConditionSchema],
      Text: 'text'
    }],
    FacialAnims: [
      {
        $Id: Word,
        Text: 'text',
        SpeechTag: Word
      }
    ],
    EditorCategories: 'categories',
    ProductionLevel: Int,
    Lines: [
      LineSchema
    ],
    Groups: [
      LineSchema
    ],
    Comments: [
      {
        $Id: Word,
        Text: 'text'
      }
    ],
    RootItems: '[word]',
    ProductionLevelInfo: [
      {
        SubtitlePrefix: 'string',
        Flags: '{bit}'
      }
    ],
    DefaultSpeaker1: Word,
    DefaultSpeaker2: Word,
    Jumps: [
      {
        Id: Word
      }
    ],
  },
  CConversationState: {
    catalog: 'conversationstate',
    ValueRange: 'ints',
    Flags: '{bit}',
    Indices: [
      {
        $Id: 'string',
        Name: 'string',
        Color: 'ints',
        Variations: [
          {
            Value: Word,
            DefaultCategories: '[string]'
          }
        ],
        InfoText: [
          {
            Text: 'string',
            $Id: 'string'
          }
        ],
        ImageEdge: Word,
        ImageAttach: Word,
        EditorSuffix: "text"
      }
    ],
    CustomColors: '[ints]',
    InfoIds: [{index: Word, Id: '[string]'}]
  },
  CCursor: {
    catalog: 'cursor',
    Texture: 'file',
    HotspotX: Int,
    HotspotY: Int
  },
  CDataCollection: {
    catalog: 'datacollection',
    Name: 'text',
    Button: "button",
    InfoText: "link",
    ImplementionLevel: Word,
    EditorCategories: 'categories',
    EditorIconSource: Word,
    TechInfoUnit:  'unit',
    TechInfoAbil: 'abil',
    TechInfoUpgrade: 'upgrade',
    Pattern: 'datacollectionpattern',
    DataRecord: [
      {
        Entry: 'words'
      }
    ],

    TechInfoUnitReplaced: 'unit',
    UpgradeInfoWeapon: [
      {
        DamagePerDice: "int"
      }
    ],
    AbilInfoNormal: "[abil]",
    AbilInfoLearned: "[button]",
    UpgradeInfoUnitLifeArmorPerLevel: "int",
    TechInfoUpgradeUsed: "[upgrade]",
    AbilInfoTrainUnit: "[actor]",
    AbilInfoResearch: "[abil]",
    AbilInfoMakeItem: "[abil]",
    AbilInfoUpgradeTo: "[actor]",
    AbilInfoBuilt: "[abil]",
    AbilInfoSellUnit: "[actor]",
    AbilInfoSellItem: "[abil]"
  },
  CDataCollectionAbil: { prototype: 'CDataCollection'},
  CDataCollectionUnit: { prototype: 'CDataCollection'},
  CDataCollectionUpgrade: { prototype: 'CDataCollection'},
  CDataCollectionPattern: {
    catalog: 'datacollectionpattern',
    Fields: [{
      NameOverride: 'link',
      Reference: 'reference',
      UserData: 'user'
    }],
    Tokens: [
      {
        Reference: "reference"
      }
    ]
  },
  CDecalPack: {
    catalog: 'decalpack',
    Name: 'text',
    StoreName: 'link',
    StoreTypeName: 'link',
    ProductId: Int,
    DecalArray: '[reward]'
  },
  CDSP: {
    catalog: 'dsp',
    Delay: Real,
    Depth: Real,
    MaxChannels: Real,
    DryLevel: Real,
    RoomLF: Real,
    DryMix: Real,
    Rate: Real,
    WetMix1: Real,
    WetMix2: Real,
    WetMix3: Real,
    Attack: Real,
    Release: Real,
    Level: Real,
    DecayRatio: Real,
    WetMix: Real,
    Cutoff: Real,
    Resonance: Real,
    FadeTime: Real,
    MaxAmp: Real,
    Threshhold: Real,
    Bandwidth: Real,
    Center: Real,
    Gain: Real,
    FFTSize: Int,
    Pitch: Real,
    DecayTime: Real,
    DecayHFRatio: Real,
    Density: Real,
    Diffusion: Real,
    HFReference: Real,
    LFReference: Real,
    ReflectionsLevel: Real,
    ReflectionsDelay: Real,
    ReverbLevel: Real,
    ReverbDelay: Real,
    RoomRolloffFactor: Real,
    Room: Real,
    ReleaseMs: Int,
    UseARC: Bit,
    ThresholdDB: Real,
    MakeUpGainDB: Real,
    SoftKneeWidthDB: Real,
    ARCReleaseMs: Int,
    ARCMinReleaseMs: Int,
    ARCMaxReleaseMs: Int,
    ARCReleaseSweepMs: Int,
    AttackMs: Int,
    Ratio: Real,
    GainMakeUp: Real,
    Threshold: Real,
    RoomHF: Real
  },
  CDSPChorus: { prototype: 'CDSP'},
  CDSPCompressor: { prototype: 'CDSP'},
  CDSPCustomCompressor: { prototype: 'CDSP'},
  CDSPDistortion: { prototype: 'CDSP'},
  CDSPEcho: { prototype: 'CDSP'},
  CDSPFlange: { prototype: 'CDSP'},
  CDSPHighPass: { prototype: 'CDSP'},
  CDSPLimiter: { prototype: 'CDSP'},
  CDSPLowPass: { prototype: 'CDSP'},
  CDSPLowPassSimple: { prototype: 'CDSP'},
  CDSPNormalize: { prototype: 'CDSP'},
  CDSPParamEQ: { prototype: 'CDSP'},
  CDSPPitchShift: { prototype: 'CDSP'},
  CDSPReverb: { prototype: 'CDSP'},
  CEffect: {
    catalog: 'effect',

    Name: 'text',
    EditorCategories: 'categories',
    ExtraRadiusBonus: {AccumulatorArray:[{value:"accumulator"}],value:"int"},
    Chance: Real,
    Minimum: Int,
    DisplayFlags: '{bit}',
    Marker: {
      Link: 'string',
      MatchFlags: '{bit}',
      MismatchFlags: '{bit}',
      Count: Bit,
      Duration: Real
    },
    DamageModifierSource: {
      Value: Word
    },
    OwningPlayer: {
      Value: Word
    },
    Behavior: 'behavior',
    ValidatorArray: '[validator]',
    PreloadValidatorArray: '[validator]',
    WhichUnit: {
      Value: Word,
      Effect: 'effect'
    },
    Count: Int,
    RecycleCount: Int,
    ShieldFactor: Real,
    KillHallucination: Bit,
    CanBeBlocked: Bit,
    FacingAdjustment: Real,
    Total: Word,
    CastMovementLimit: Int,
    AttributeFactor: '{real}',
    ResourceRestoreBonus: Int,
    CheckOuter: Int,
    ExpireOffset: 'ints',
    MassFraction: Int,
    Preserve: Bit,
    MagazineAbil: 'abil',
    RechargeVitalFraction: Real,
    RestrictToCircumference: Bit,
    StackAlias: 'effect',
    WhichLocation: {
      Value: Word,
      Effect: 'effect'
    },
    Kinetic: "kinetic",
    ImpactUnit: {
      Value: Word,
      Effect: 'effect'
    },
    Flags: '{bit}',
    BehaviorCategories: '{bit}',
    TimeScaleSource: {
      Value: Word,
      Effect: 'effect'
    },
    OffsetVectorStartLocation: {
      Value: Word,
      Effect: 'effect'
    },
    OffsetVectorEndLocation: {
      Value: Word,
      Effect: 'effect'
    },
    OffsetFacingFallback: {
      Value: Word
    },
    SpawnCount: Int,
    CreateFlags: '{bit}',
    RallyUnit: {
      Value: Word,
      Effect: 'effect'
    },
    SpawnRange: Real,
    SelectUnit: {
      Effect: "actor",
      Value: Word
    },
    CreepFlags: '{bit}',
    Radius: Real,
    Visibility: Word,
    MaxCount: {AccumulatorArray:[{value:"accumulator"}],value:"int"},
    MinCountError: 'string',
    LaunchLocation: {
      Value: Word,
      Effect: 'effect'
    },
    ImpactLocation: {
      History: Word,
      Value: Word,
      Effect: 'effect'
    },
    SearchFlags: '{bit}',
    Type: Word,
    Fraction: [{index: 'word', AccumulatorArray:[{value:"accumulator"}],value:"real"}],
    Player: {
      Value: Word,
      Effect: 'effect'
    },
    Target: {
      Value: Word,
      Effect: 'effect'
    },
    DeathType: Word,
    AmmoOwner: {
      Value: Word
    },
    AmmoUnit: 'unit',
    PlacementAround: {
      Value: Word,
      Effect: 'effect'
    },
    WhichPlayer: {
      Value: Word,
      Effect: 'effect'
    },
    BehaviorScope: {Behavior: 'behavior'},
    LaunchUnit: {
      Value: Word,
      Effect: 'effect'
    },
    KillCreditUnit: {
      Value: Word
    },
    SelectTransferUnit: {
      Value: Word,
      Effect: 'effect'
    },
    FacingLocation: {
      Value: Word,
      Effect: 'effect'
    },
    ArmorReduction: Real,
    Kind: Word,
    ResponseFlags: '{bit}',
    ImpactFilters: 'filters',
    BehaviorClass: Word,
    BehaviorLink: 'behavior',
    ExcludeOriginPlayer: {
      Value: Word
    },
    ExcludeCasterUnit: {
      Value: Word
    },
    RequireOriginPlayer: {
      Value: Word
    },
    RequireCasterUnit: {
      Value: Word
    },
    MatchesAll: Bit,
    KineticLink:  "kinetic",
    ClearQueuedOrders: Bit,
    MinDistance: Real,
    PlacementArc: Int,
    PlacementRange: Real,
    Range: Real,
    TeleportFlags: '{bit}',
    BehaviorAlignment: Word,
    TargetLocation: {
      Value: Word,
      Effect: 'effect'
    },
    Key: Word,
    Amount: [
      {
        AccumulatorArray: '[accumulator]',
        value: Real
      }
    ],
    SourceKey: Word,
    ValidateMin: Bit,
    TargetLocationType: Word,
    ContainerUnit: {
      Value: Word,
      Effect: 'effect'
    },
    ContainerType: Word,
    AreaArray: [
      {
        Radius: Real,
        Effect: 'effect',
        RectangleWidth: Real,
        RectangleHeight: Real,
        MaxCount: Int,
        Bonus: Int,
        Fraction: Real,
        Arc: Real,
        Validator: 'validator',
        RadiusBonus: Real,
        FacingAdjustment: Real
      }
    ],
    Death: Word,
    DebugTrace: Bit,
    ExpireDelay: Real,
    ValidateMax: Int,
    FacingType: Word,
    Operation: 'string',
    TrackerUnit: {
      Value: Word
    },
    ContainerAbil: 'abil',
    SelectTransferFlags: '{bit}',
    SearchFilters: 'filters',
    ImpactEffect: 'effect',
    MagazineEffect: 'effect',
    EffectSuccess: 'effect',
    EffectFailure: 'effect',
    EffectArray: '[effect]',
    InitialEffect: 'effect',
    LaunchEffect: 'effect',
    PeriodicEffectArray: '[effect]',
    PeriodicPeriodArray: '[real]',
    PeriodicValidator: 'validator',
    PeriodCount: { AccumulatorArray: [{value:"accumulator"}],value:"int"},
    RevealerParams: {
      DetectFilters: "filters",
      HeightMap: "mover",
      Duration: Real,
      ShapeExpansion: Real,
      RevealFlags: '{bit}'
    },
    FinalEffect: 'effect',
    ExcludeArray: [
      {
        Value: Word,
        History: "effect",
        Effect: 'effect'
      }
    ],
    TargetSorts: TargetSorts,
    Abil: 'abil',
    CmdFlags: '{bit}',
    SpawnEffect: 'effect',
    SpawnOwner: {
      Effect: 'effect',
      Value: Word
    },
    SpawnUnit: '[unit]',
    VitalArray: [
      {
        index: Word,
        ChangeFraction: {AccumulatorArray: '[accumulator]', value: Real},
        Change: {AccumulatorArray: '[accumulator]', value: Real}
      }
    ],
    TrackedUnit: {
      Value: Word
    },
    Upgrades: [{
      Upgrade: 'upgrade',
      Count: Int
    }],
    ExpireEffect: 'effect',
    Alert: 'alert',
    VitalFractionCurrent: '{real}',
    LeechFraction: '{real}',
    AINotifyEffect: 'effect',
    AINotifyFlags: '{bit}',
    CaseArray: [
      {
        Validator: 'validator',
        Effect: 'effect',
        FallThrough: Bit
      }
    ],
    MinCount: Int,
    AbilCmdIndex: Int,
    SourceLocation: {
      Effect: 'effect',
      Value: Word
    },
    PeriodicOffsetArray: '[reals]',
    FinishEffect: 'effect',
    Movers: [
      {
        Link: 'mover',
        IfRangeLTE: Real
      }
    ],
    InitialDelay: Real,
    Effect: 'effect',
    PlaceholderUnit: 'unit',
    KindSplash: Word,
    ModifyFlags: '{bit}',
    DrainResourceCostFactor: '{real}',
    RechargeVitalRate: Real,
    TimeFactor: Real,
    AttributeBonus: '{real}',
    CaseDefault: 'effect',
    RevealRadius: Real,
    RevealFlags: '{bit}',
    CalldownCount: Bit,
    CalldownEffect: 'effect',
    ReturnMovers: [
      {
        Link: 'mover',
        IfRangeLTE: Int
      }
    ],
    ReturnDelay: Real,
    SalvageFactor: {
      VitalFraction: "{int}",
      Resource: '{real}'
    },
    IncludeArray: [
      {
        Effect: 'effect',
        Value: Word
      }
    ],
    MoverRollingJump: Bit,
    DrainVital: "colorstyle",
    DrainVitalCostFactor: {
      value: Real,
      AccumulatorArray: '[accumulator]'
    },
    AbilCmd: 'abilcmd',
    SpawnOffset: '[reals]',
    TypeFallbackUnit: {
      Value: Word,
      Effect: 'effect'
    },
    CopyOrderCount: Int,
    ModifyOwnerPlayer: {
      Value: Word
    },
    FinalOffset: 'reals',
    Origin: {
      Effect: 'effect',
      Value: Word
    },
    InitialOffset: 'reals',
    Resources: '{int}',
    ShieldBonus: Real,
    EffectExternal: 'effect',
    RechargeVital:  "colorstyle",
    ModifyTurret: {
      Turret: 'turret',
      Target: {
        Effect: 'effect',
        Value: Word
      },
      Flags: '{bit}',
      Action: Word,
      AimCompleteEffect: 'effect'
    },
    EffectInternal: 'effect',
    AmmoEffect: 'effect',
    CopyRallyCount: Int,
    ImpactOffset: 'reals',
    LaunchOffset: 'reals',
    Cost: [CostSchema] ,
    Duration: Real,
    VitalBonus: '{int}',
    Copy: Bit,
    AreaRelativeOffset: 'reals',
    VitalFractionMax: '{real}',
    RetargetFilters: 'filters',
    RetargetRange: Real,
    ImpactUnitValidator: 'validator',
    ResourcesHarvestedFraction: Real,
    HeightMap: Word,
    TransferUnit: {
      Value: Word
    },
    Height: Real,
    HeightTime: Real,
    ImpactRange: Real,
    MoverExecuteJump: Bit,
    PeriodicEffect: 'effect',
    InterruptEffect: 'effect',
    TeleportEffect: 'effect',
    PeriodicPeriod: Real,
    OffsetRandMode: Word,
    RechargeVitalMax: Int,
    Random: Real,
    Weapon: {
      Weapon: 'weapon',
      CooldownOperation: Word,
      CooldownAmount: Real,
      CooldownFraction: Real
    },

    MorphFlags: '{bit}',
    MorphUnit: 'unit',
    AbilKeyFallback: 'unit',

    SourceBehaviorLink: 'behavior',
    TargetBehaviorLink: 'behavior',
    TargetTrackerUnit: [{Value:Word}],
    TrackedUnitFilters: 'filters',
    SourceFailBackValue: "int",
    DamageInheritEffect: "effect",

    $abil: 'abil',
    $weaponid: 'weapon',
    ResourcesCollected: "{int}",
    SearchEffect: "effect",
    TransferBehavior: "abil",
    ResourcesHarvestedBonus: "int",
    XP: "int",
    VeterancyBehavior: "behavior",
    Maximum: "int",
    AmountScoreArray: [
      {
        Value: "scorevalue",
        Validator: "validator"
      }
    ],
    DetectFilters: "filters",
    EffectRandMode: Word,
    $unit: "actor",
    $buff: "behavior",
    $aura: "effect",
    Parent: "effect",
  },
  CEffectAddTrackedUnits: {prototype: 'CEffect'},
  CEffectEnumTrackedUnits: {prototype: 'CEffect'},
  CEffectRemoveTrackedUnit: {prototype: 'CEffect'},
  CEffectMorph: {prototype: 'CEffect'},
  CEffectEnumInventory: {prototype: 'CEffect'},
  CEffectAddTrackedUnit: { prototype: 'CEffect'},
  CEffectApplyBehavior: { prototype: 'CEffect'},
  CEffectApplyForce: { prototype: 'CEffect'},
  CEffectApplyKinetic: { prototype: 'CEffect'},
  CEffectCancelOrder: { prototype: 'CEffect'},
  CEffectCreateHealer: { prototype: 'CEffect'},
  CEffectCreatePersistent: { prototype: 'CEffect'},
  CEffectCreateUnit: { prototype: 'CEffect'},
  CEffectCreep: { prototype: 'CEffect'},
  CEffectDamage: { prototype: 'CEffect'},
  CEffectDestroyPersistent: { prototype: 'CEffect'},
  CEffectEnumArea: { prototype: 'CEffect'},
  CEffectEnumMagazine: { prototype: 'CEffect'},
  CEffectEnumTransport: { prototype: 'CEffect'},
  CEffectIssueOrder: { prototype: 'CEffect'},
  CEffectLastTarget: { prototype: 'CEffect'},
  CEffectLaunchMissile: { prototype: 'CEffect'},
  CEffectLoadContainer: { prototype: 'CEffect'},
  CEffectModifyPlayer: {
    prototype: 'CEffect',
    EffectArray: [{
      Reference: "reference",
      Value: "real",
      Operation: Word
    }]
  },
  CEffectModifyUnit: {
    prototype: 'CEffect',
    Resources: Int
  },
  CEffectRandomPointInCircle: { prototype: 'CEffect'},
  CEffectRedirectMissile: { prototype: 'CEffect'},
  CEffectReleaseMagazine: { prototype: 'CEffect'},
  CEffectRemoveBehavior: { prototype: 'CEffect'},
  CEffectRemoveKinetic: { prototype: 'CEffect'},
  CEffectReturnMagazine: { prototype: 'CEffect'},
  CEffectSet: { prototype: 'CEffect'},
  CEffectSwitch: { prototype: 'CEffect'},
  CEffectTeleport: { prototype: 'CEffect'},
  CEffectTransferBehavior: { prototype: 'CEffect'},
  CEffectUseCalldown: { prototype: 'CEffect'},
  CEffectUseMagazine: { prototype: 'CEffect'},
  CEffectUserData: { prototype: 'CEffect'},
  CFootprint: {
    catalog: 'footprint',
    Flags: '{bit}',
    Layers: [
      {
        index: Word,
        Area: 'ints',
        Sets: [
          {
            Character: 'string',
            Negative: '{bit}',
            Positive: '{bit}'
          }
        ],
        Rows: '[string]'
      }
    ],
    Shape: {
      Radius: Real,
      Offsets: 'string',
      Borders: 'string',
      Mode: Word
    },
    EditorCategories: 'categories'
  },
  CFoW: {
    catalog: 'fow',
    Color: 'ints',
    BlendSpeed: Int,
    Hidden: Bit,
    UnhideRadius: Int,
    Expand: Bit
  },
  CHerd: {
    catalog: 'herd',
    PositionBias: Real,
    NodeSearchRadius: Real,
    Nodes: {
      Weight: Real,
      Link: 'herdnode'
    },
    Levels: [
      {
        Weight: Real
      }
    ],
    SpeedLimit: 'reals'
  },
  CHerdNode: { catalog: 'herdnode'},
  CHero: {
    catalog: 'hero',
    Name: 'text',
    Flags: '{bit}',
    Model: 'model',
    Description: 'text',
    InfoText: 'text',
    Title: 'text',
    RequiredRewardArray: '[word]',
    Portrait: 'string',
    SelectScreenButtonImage: 'string',
    PartyPanelButtonImage: 'string',
    LeaderboardImage: 'string',
    ScoreScreenImage: 'string',
    VariationIcon: 'file',
    CollectionIcon: 'file',
    DraftScreenLargeImage: 'string',
    DraftScreenLargeImageBackground: 'string',
    DraftScreenPortrait: 'string',
    DraftScreenPortraitBackground: 'string',
    ImageFacing: Word,
    AdditionalSearchText: 'text',
    HyperlinkId: Word,
    SkinVariationRequiredReward: '[word]',
    MountVariationRequiredReward: '[word]',
    ReleaseDate: {
      Month: Bit,
      Day: Bit,
      Year: Int
    }
  },
  CHeroAbil: {
    catalog: 'heroabil',
    Name: 'text',
    Description: 'text',
    Tooltip: 'text'
  },
  CHeroStat: {
    catalog: 'herostat',
    Name: 'text'
  },
  CItem: {
    catalog: 'item',
    CarryBehaviorArray: "behavior",
    Face: 'button',
    Flags: '{bit}',
    Charge: {
      Link: 'link',
      CountMax: "int",
      CountStart: "int",
      CountUse: "int"
    },
    Abil: '[abil]',
    EquipBehaviorArray: '[behavior]',
    Effect: 'effect',
    Class: 'itemclass',
    Container: Word,
    EffectCost: CostSchema,
    Range: Int,
    Level: "int",
    AbilFlags: "{bit}",
    Requirements: "requirement"
  },
  CItemAbil: {prototype: 'CItem',},
  CItemAbilPowerUp: { prototype: 'CItem'},
  CItemEffect: { prototype: 'CItem'},
  CItemEffectInstant: { prototype: 'CItem'},
  CItemEffectTarget: { prototype: 'CItem'},
  CItemClass: {
    catalog: 'itemclass',
    Name: 'text'
  },
  CItemContainer: {
    catalog: 'itemcontainer',
    Slots: [
      {
        Row: Int,
        Column: Int,
        Equip: Bit,
        EmptyFace: Word,
        Model: 'model',
        Classes: '[itemclass]',
      }
    ],
    Model: 'model',
    ModelWidth: Int,
    ModelHeight: Int
  },
  CKinetic: {
    catalog: 'kinetic',
    Name: 'text',
    Chance: Bit,
    Duration: Real,
    Yaw: Int,
    Cycles: Int,
    Where: {
      Effect: "effect",
      Value: "string"
    },
    Follow: 'string'
  },
  CKineticDistance: { prototype: 'CKinetic'},
  CKineticFollow: { prototype: 'CKinetic'},
  CKineticRotate: { prototype: 'CKinetic'},
  CKineticSequence: { prototype: 'CKinetic'},
  CKineticSet: { prototype: 'CKinetic'},
  CKineticTranslate: { prototype: 'CKinetic'},
  CLensFlareSet: {
    catalog: 'lensflareset',
    Flare: [
      {
        Model: 'model',
        Template: Word
      }
    ]
  },
  CLight: {
    catalog: 'light',

    TimePerDay: 'string',
    TimePerLoop: Word,
    TimeStart: 'string',
    TimeEventArray: [
      {
        index: Word,
        Time: 'string',
        Name: Word
      }
    ],
    ToDInfoArray: [
      {
        AmbientColor: 'reals',
        Colorize: Bit,
        Param: '{real}',
        DirectionalLight: [
          {
            index: Word,
            Color: 'reals',
            ColorMultiplier: Real,
            SpecColorMultiplier: Real,
            Direction: 'reals',
            SpecularColor: 'reals',
            UseAmbientOcclusion: Bit
          }
        ],
        OperatorHDR: Int,
        $Id: 'string',
        AmbientEnvironmentMultiplier: Real,
        UseSeparateDetailSSAO: Bit,
        TimeOfDay: 'string',
        Variations: [
          {
            Command: Word,
            Sensitivity: Int,
            Region: Word
          }
        ],
        DirectionalLightShadows: Bit,
        TerrainUseBackLight: Bit,
        LightRegions: [
          {
            UseDefault: Bit,
            AmbientColor: 'reals',
            AmbientEnvironmentMultiplier: Real,
            SpecularColor: 'reals',
            SpecularMultiplier: Real,
            FogColor: 'reals',
            DiffuseColor: '{reals}',
            DiffuseMultiplier: '{real}'
          }
        ]
      }
    ],
    EditorCategories: 'categories',
    AmbientEnvironmentMap: 'file',
    LightingRegionMap: 'file'
  },
  CLocation: {
    catalog: 'location',
    Name: 'text',
    Description: 'text',
    UserReference: "string"
  },
  CLoot: {
    catalog: 'loot',
    ClassArray: '[itemclass]',
    SpawnOwner: Word,
    SpawnRange: Int,
    Effect: Word,
    Unit: Word,
    MinLevel: Int,
    MaxLevel: "int",
    MinCount: "int",
    MaxCount: "int",
    ChildArray: [
      {
        Child: "actor"
      }
    ]

  },
  CLootEffect: { prototype: 'CLoot'},
  CLootItem: { prototype: 'CLoot'},
  CLootSet: { prototype: 'CLoot'},
  CLootSpawn: { prototype: 'CLoot'},
  CLootUnit: { prototype: 'CLoot'},
  CModel: {
    catalog: 'model',
    RunAnimMoveSpeed: "real",
    RunAnimMoveSpeedThreshold: "real",
    $model: 'model',

    $COOP: Word,
    $Race: 'race',
    $Prefix: 'string',
    $Parent: 'model',
    Flags: '{bit}',
    Lighting: 'string',
    Quality: Bit,
    ScaleMax: 'reals',
    ScaleMin: 'reals',
    Radius: Real,
    TipabilityPitchMax: Real,
    TipabilityRollMax: Real,
    WalkAnimMoveSpeed: Real,
    FuzzyGeometryPadding: Real,
    Priority: Int,
    PortraitOffset: 'reals',
    SelectionRadius: Real,
    ShadowRadius: Real,
    AnimSpeed: Real,
    AnimBlendTime: Real,
    TechPurchaseCamera: Word,
    UnitGlossaryCamera: Word,
    PlanetPanelCamera: Word,
    TechPurchaseSpeed: Real,
    OccludingOpacity: Real,
    EditorCategories: 'categories',
    Image: 'file',
    Model: 'file',
    FacialController: 'file',
    PausedParticleSystemBehavior: Word,
    Occlusion: Word,
    RadiusLoose: Real,
    SelectionLayer: Int,
    LowQualityModel: 'model',
    SquibTypeDefault: 'physicsmaterial',
    Tipability: Real,
    $low: 'model',
    $name: Word,
    AnimAliases: [{
      Anim:"words",
      Alias:"words"
    }],
    Events: [
      {
        Anim: 'words',
        Name: 'string',
        Type: Word,
        Time: Real,
        Payload: Word,
        Variation: Int,
        Attachment: 'string',
        ModelQuality: Word
      }
    ],
    TipabilityLength: Real,
    TipabilityWidth: Real,
    VariationCount: Int,
    TextureDeclares: [
      {
        Slot: Word,
        Prefix: Word,
        Adaptions: [
          {
            PropsAdd: "string",
            AppliesToInnate: "int",
            TriggerOnSubstring: 'string',
            Slot: 'string',
            PropsSet: Word,
            PropsRemove: Word,
            AppliesToFile: Bit
          }
        ]
      }
    ],
    SelectionOffset: 'reals',
    AttachProps: [
      {
        $Id: 'string',
        Keys: '{int}',
        RadiusTarget: Real,
        SquibType: Word,
        RadiusShield: Real
      }
    ],
    RequiredAnims: '[file]',
    Variations: [
      {
        Number: Int,
        Probability: Int,
        Radius: Real,
        RadiusLoose: Real,
        TextureExpressionsForEditor: {
          Slot: 'string',
          Expression: 'string'
        }
      }
    ],
    PhysicsDeathMotionFactor: 'reals',
    PhysicsForceFactor: Real,
    PhysicsGravityFactor: Real,
    SpringDampening: Real,
    SpringStrength: Real,
    DragCoefficient: Real,
    WindInfluence: Real,
    RequiredAnimsEx: {
      FilePath: 'file',
      Flags: '{bit}'
    },
    PhysicsMaterialOverride: Word,
    OptionalAnims: '[file]',
    TextureAppliedGroups: 'words',
    TextureMatchesForEditor: {
      Slot: 'string',
      Source: Word
    },
    $baseKey: 'model',
    "$cate": Word,
    "$tile": Word,
    $race: 'race'
  },
  CModelFoliage: { prototype: 'CModel'},
  CMount: {
    catalog: 'mount',
    Name: 'text',
    InfoText: 'text',
    Model: 'model',
    VariationIcon: 'file'
  },
  CMover: {
    catalog: 'mover',
    HeightMap: Word,
    RestoreHeightDuration: Real,
    PlacementArray: [
      {
        index: Word,
        Bits: '{bit}'
      }
    ],
    MotionPhases: [
      {
        Driver: Word,
        Acceleration: Real,
        MaxSpeed: Real,
        ClearanceAcceleration: Int,
        Outro: 'reals',
        YawPitchRoll: 'string',
        Speed: Real,
        RotationLaunchActorType: Word,
        Gravity: Real,
        IgnoresTerrain: Bit,
        ActorTracking: Word,
        YawPitchRollAccel: Real,
        ThrowRotationType: Word,
        ThrowVector: 'reals',
        Overlays: [{
          Scale: 'reals'
        }],
        TurnType: Word,
        MinSpeed: Real,
        ThrowForward: 'ints',
        AdaptableParabolaIsUpright: Bit,
        AdaptableParabolaClearance: 'reals',
        AdaptableParabolaDistances: '{real}',
        AdaptableParabolaAccels: '{int}',
        Clearance: Real,
        ClearanceLookahead: Int,
        Timeout: Real,
        RotationActorType: Word,
        ThrowBandYaw: 'reals',
        ThrowBandPitch: 'reals',
        FlightTime: 'reals',
        ClearanceIgnoresTargetProximity: Bit,
        ArrivalTestType: Word,
        AccelerationRange: Int,
        PowerslideAngle: Real,
        PowerslideDecel: Real,
        SpeedRange: Real,
        OutroAltitude: 'reals',
        BlendType: Word
      }
    ],
    Flags: '{bit}',
    MotionOverlays: [
      {
        Type: Word,
        Polarity: Word,
        Axis: 'reals',
        Wavelength: 'reals',
        PolarityDriver: 'string',
        WavelengthChangeProbability: Real,
        RevolverSpeed: Real,
        RevolverSpeedRange: Real,
        RevolverMaxSpeed: Real,
        RevolverMaxSpeedRange: Real,
        RevolverAccel: Real,
        RevolverAccelRange: Real
      }
    ],
    PathMode: Word,
    RespectUnitHeightAtDestination: Bit,
    RotationIgnoredByUnit: Bit
  },
  CMoverAvoid: { prototype: 'CMover'},
  CMoverFlock: { prototype: 'CMover'},
  CMoverMissile: { prototype: 'CMover'},
  CObjective: {
    catalog: 'objective',
    Name: 'text',
    Description: 'text',
    UserReference:  [{value:"string"}],
    Type:  "colorstyle",
    RequiredCount: 'number'
  },
  CPhysicsMaterial: {
    catalog: 'physicsmaterial',
    Density: Real,
    Friction: Real,
    Restitution: Real,
    LinearDamping: Real,
    AngularDamping: Real
  },
  CPing: {
    catalog: 'ping',
    Color: 'ints',
    Duration: Real,
    Scale: Real
  },
  CPlayerResponse: {
    catalog: 'playerresponse',
    Location: Word,
    Chance: Bit,
    ModifyFraction: Real,
    Handled: 'effect',
    CasterFilters: 'filters',
    TargetFilters: 'filters',
    DeathType: '{bit}'
  },
  CPlayerResponseUnit: { prototype: 'CPlayerResponse'},
  CPlayerResponseUnitBirth: { prototype: 'CPlayerResponse'},
  CPlayerResponseUnitDamage: { prototype: 'CPlayerResponse'},
  CPlayerResponseUnitDeath: { prototype: 'CPlayerResponse'},
  CPortraitPack: {
    catalog: 'portraitpack',
    Name: 'text',
    StoreName: 'link',
    StoreTypeName: 'link',
    ProductId: Int,
    PortraitArray: '[reward]'
  },
  CRace: {
    catalog: 'race',
    Name: 'text',
    RaceIcon: 'file',
    Icon: 'file',
    StartLocationAlert: 'alert',
    GameMusic: Word,
    FoodCeiling: Int,
    ShowResource: '{bit}',
    MiniMapBorderColor: 'ints',
    PlacementGridColorBlindColor: 'ints',
    AttributeId: Word,
    ExpansionOrder: Int,
    DefaultConsoleSkin: 'consoleskin',
    StartingResource: '{int}',
    Flags: '{bit}',
    StartingUnitArray: [
      {
        Range: "int",
        Unit: 'unit',
        Flags: '{bit}',
        Count: Int,
        Offset: '[ints]'
      }
    ],
    GlossaryTeamColorIndex: Int,
    VictorySound: 'sound',
    DefeatSound: 'sound',
    LevelAchievementId: Int,
    UpkeepTax: [
      {
        FoodLevel: "int",
        Tax: "{real}"
      }
    ]
  },
  CRequirement: {
    catalog: 'requirement',
    CanBeSuppressed: '{bit}',
    NodeArray: [
      {
        index: Word,
        Link: 'requirementnode'
      }
    ],
    EditorCategories: 'categories'
  },
  CRequirementNode: {
    catalog: 'requirementnode',
    Tooltip: 'string',
    Flags: '{bit}',
    Value: Int,
    Count: {
      Link: 'string',
      State: Word
    },
    OperandArray: [{value: 'requirementnode', index: Int}],
    Index: Int
  },
  CRequirementAnd: { prototype: 'CRequirementNode'},
  CRequirementOr: {prototype: 'CRequirementNode'},
  CRequirementAllowAbil: {
    prototype: 'CRequirementNode',
    Link: "abil"
  },
  CRequirementAllowBehavior: {
    prototype: 'CRequirementNode',
    Link: "behavior"
  },
  CRequirementAllowUnit: {
    prototype: 'CRequirementNode',
    Count: {
      Unlock: 'unit'
    },
    Link: 'unit',
  },
  CRequirementAllowUpgrade: {
    prototype: 'CRequirementNode',
    Link: "upgrade"
  },
  CRequirementConst: {prototype: 'CRequirementNode'},
  CRequirementCountAbil: {prototype: 'CRequirementNode'},
  CRequirementCountBehavior: {
    prototype: 'CRequirementNode',
    Count: {
      Link: 'behavior'
    }
  },
  CRequirementCountUnit: {
    prototype: 'CRequirementNode',
    Value: "unit",
    Count: {
      Link: 'unit',
      Unlock: 'unit'
    }
  },
  CRequirementCountUpgrade: {
    prototype: 'CRequirementNode',
    Value: "upgrade",
    Count: {
      Link: 'upgrade'
    }
  },
  CRequirementDiv: {prototype: 'CRequirementNode'},
  CRequirementEq: {prototype: 'CRequirementNode'},
  CRequirementGT: {prototype: 'CRequirementNode'},
  CRequirementGTE: {prototype: 'CRequirementNode'},
  CRequirementLT: {prototype: 'CRequirementNode'},
  CRequirementLTE: {prototype: 'CRequirementNode'},
  CRequirementMod: {prototype: 'CRequirementNode'},
  CRequirementMul: {prototype: 'CRequirementNode'},
  CRequirementNE: {prototype: 'CRequirementNode'},
  CRequirementNot: {prototype: 'CRequirementNode'},
  CRequirementOdd: {prototype: 'CRequirementNode'},
  CRequirementSum: {prototype: 'CRequirementNode'},
  CRequirementXor: {prototype: 'CRequirementNode'},
  CReverb: {
    catalog: 'reverb',
    Room: Int,
    DecayTime: Real,
    DecayHFRatio: Real,
    Reflections: Int,
    ReflectionsDelay: Real,
    Reverb: Int,
    ReverbDelay: Real,
    HFReference: Real,
    LFReference: Real,
    Diffusion: Real,
    Density: Real,
    RoomHF: Int,
    RoomRolloffFactor: Real,
    SpeakerMix: '{real}',
    RoomLF: Int
  },
  CScoreResult: {
    catalog: 'scoreresult',
    Name: 'text',
    PublishName: 'text',
    Tooltip: 'text',
    UniqueTag: Word,
    Operation: Word,
    Icon: 'file',
    Flags: '{bit}',
    HeaderTable: '[scoreresult]',
    ValueTable: '[scorevalue]'
  },
  CScoreResultBuildOrder: { prototype: 'CScoreResult'},
  CScoreResultExperience: { prototype: 'CScoreResult'},
  CScoreResultGraph: { prototype: 'CScoreResult'},
  CScoreResultPerformance: { prototype: 'CScoreResult'},
  CScoreResultRoot: { prototype: 'CScoreResult'},
  CScoreResultScore: { prototype: 'CScoreResult'},
  CScoreValue: {
    catalog: 'scorevalue',
    Type: Word,
    Collapse: Word,
    Flags: '{bit}',
    Name: 'text',
    PublishName: 'text',
    Tooltip: 'text',
    UniqueTag: Word,
    Operation: Word,
    Report: Word,
    Sort: Word,
    Value: Word,
    Icon: 'file',
    HeaderTable: '[word]',
    ValueTable: '[scorevalue]'
  },
  CScoreValueConstant: {
    prototype: 'CScoreValue',
    Value: Real
  },
  CScoreValueCustom: { prototype: 'CScoreValue'},
  CScoreValueCombine: { prototype: 'CScoreValueCustom'},
  CScoreValueStandard: { prototype: 'CScoreValue'},
  CShape: {
    catalog: 'shape',
    Name: 'text',
    Radius: Real,
    Quad: 'reals',
    Arc: Real
  },
  CShapeArc: { prototype: 'CShape'},
  CShapeQuad: { prototype: 'CShape'},
  CSkin: {
    catalog: 'skin',
    Name: 'text',
    InfoText: 'text',
    VariationIcon: 'file',
    ReplacementArray: [
      {
        Catalog: Word,
        From: Word,
        To: Word
      }
    ],
    Rotation: Int,
    DisplayModel: '[model]',
    WarChestUILight: 'light',
    CollectionDisplayModel: 'model',
    Camera: Word,
    CollectionDisplayUnit: 'unit',
    CollectionDisplayModelAlternate: 'model',
    CollectionDisplayUnitAlternate: 'unit',
    EffectArray: [
      {
        Operation: Word,
        Reference: 'reference',
        Value: 'string'
      }
    ],
    IsDefaultSkin: Bit,
    CollectionDisplayActor: 'actor',
    ModelGroups: {
      Name: Word,
      Models: '[model]'
    },
    $collection: Word,
    $race: 'race',
    $unit: 'unit',
    $unitAlter: 'unit',
    $prefix: 'string',
    $suffix: 'string'
  },
  CSkinPack: {
    catalog: 'skinpack',
    Name: 'text',
    StoreName: 'link',
    StoreTypeName: 'link',
    ShortName: 'link',
    EntryArray: [
      {
        Reward: 'reward',
        Unit: 'unit',
        UnitAlternate: 'unit',
        RewardAlternate: 'reward'
      }
    ],
    CollectionId: Word,
    ReleaseDate: 'link',
    ProductId: Int,
    Default: Bit,
    $collection: Word,
    $unit: 'unit'
  },
  CSound: {
    catalog: 'sound',

    $Subtitle: Word,
    $Speaker: Word,
    $Line: Word,
    $Portrait: Word,
    $Actor: 'actor',
    $Unit: 'unit',
    $SubPath: 'string',
    $Path: 'string',
    $Race: 'race',
    Category: Word,
    ConeAngle: 'reals',
    ConeVolume: 'reals',
    LocalVolumeAdjustment: 'reals',
    DopplerLevel: Real,
    DupeDestroyCount: Int,
    DupeDestroyCountPerPlayer: Int,
    DupeHistoryCount: Int,
    DupeFadeBlend: Word,
    DupeMuteCount: Int,
    DupeMuteCountPerPlayer: Int,
    DupeRepeatCount: Int,
    MixerPriorityNonLocal: Int,
    DupeThresholdFadeTime: Int,
    Flags: '{bit}',
    FogFadeBlend: Word,
    LowPassGain: Real,
    MuteFadeBlend: Word,
    OverlapPitchDelta: Real,
    OverlapTimeDelta: Int,
    PanLevel: Real,
    ResourcePriority: Int,
    ReverbBalance: {
      Room: Int,
      Direct: Int
    },
    ReverbRolloffBlend: Word,
    Select: Word,
    CategoryDuckingNonLocal: 'sound',
    SpeakerMix: '{real}',
    SustainFade: [
      {
        Time: Int,
        Volume: Real
      }
    ],
    VolumeRolloffBlend: Word,
    VolumeRolloffFadeBlend: Word,
    Volume: 'reals',
    AssetArray: [
      {
        SyncPointRanges: {
          TimeSignature: "ints",
          BeatsPerMinute: "int",
          SyncPointsPerBar: "int"
        },
        PortraitAnim: 'string',
        File: 'file',
        Volume: 'reals',
        Speaker: 'link',
        Subtitle: 'text',
        FacialAnim: Word,
        PortraitModel: 'model',
        FacialGroup: Word,
        FacialFile: 'file',
        TemplateParam: 'string',
        Pitch: 'reals',
        Weight: Int,
        LoopCount: Int,
        LoopTime: 'ints',
        SyncPoints: '[int]',
        Offset: 'ints',
        PortraitActor: Word
      }
    ],
    Mode: Word,
    MuteFadeOut: [
      {
        Time: Int,
        Volume: Real
      }
    ],
    VolumeRolloffPoints: [
      {
        Distance: Real,
        Volume: Real
      }
    ],
    OffsetFadeIn: [
      {
        Volume: Real,
        Time: Int
      }
    ],
    LoopCount: Int,
    Chance: Int,
    ReverbRolloffPoints: [
      {
        Direct: Real,
        Room: Real,
        Distance: Real
      }
    ],
    EditorCategories: 'categories',
    AssetArrayTemplate: {
      File: 'file',
      FacialAnim: 'string',
      FacialGroup: 'string',
      FacialFile: 'file',
      SyncPointRanges: {
        TimeSignature: "ints",
        BeatsPerMinute: "int",
        SyncPointsPerBar: "int"
      }
    },
    Exclusivity: Word,
    CategoryDuckingLocal: Word,
    LoopDelay: 'ints',
    MixerPriority: Int,
    Pitch: 'reals',
    PlayDelay: 'ints',
    PositionRandomOffset: 'reals',
    DupeMaximumMethod: Word,
    VariationMinimum: Int,
    Pan: 'reals',
    Spread: Real,
    DupePrioritization: Word,
    DupeWait: 'ints',
    FogFadeIn: [
      {
        Volume: Real,
        Time: Int
      }
    ],
    FogFadeOut: [
      {
        Time: Int,
        Volume: Real
      }
    ],
    VolumeRolloffFadeIn: [
      {
        Volume: Real,
        Time: Int
      }
    ],
    VolumeRolloffFadeOut: [
      {
        Time: Int,
        Volume: Real
      }
    ],
    SustainFadeBlend: Word,
    OffsetShiftBlend: Word,
    PanLevelNonLocal: Real,
    DupeFadeOut: [
      {
        Time: Int,
        Volume: Real
      }
    ],
    OffsetFadeOut: [
      {
        Time: Int,
        Volume: Real
      }
    ],
    OffsetFadeBlend: Word,
    OffsetShiftIn: [
      {
        Time: Int,
        Pitch: Real
      }
    ],
    DupeFadeIn: [
      {
        Volume: Real,
        Time: Int
      }
    ],
    DupeThresholdPoints: [
      {
        Count: Int,
        Volume: Real
      }
    ],
    HerdNode:  "herdnode",
    MuteFadeIn: [
      {
        Volume: Real,
        Time: Int
      }
    ],
    NonLocalVolumeAdjustment: 'reals',
    PositionRandomOffsetPower: Real,
    OcclusionReverb: 'reals',
    CategoryLocal: Word,
    race: "race"
  },
  CSoundExclusivity: {
    catalog: 'soundexclusivity',
    Group: Int,
    CollideWithLower: Word,
    CollideWithEqual: Word,
    CollideWithHigher: Word,
    InterruptFade: [
      {
        Time: Int,
        Volume: Real
      }
    ],
    QCollideWithLower: Word,
    QCollideWithEqual: Word,
    QCollideWithHigher: Word,
    InterruptFadeBlend: Word,
    SuppressGroups: '[int]',
    Flags: '{bit}',
    Priority: Real,
    InterruptDelay: Real,
    QDelay: Real,
    QTimeout: Int
  },
  CSoundMixSnapshot: {
    catalog: 'soundmixsnapshot',
    Attack: Int,
    Hold: Int,
    Release: Int,
    Flags: '{bit}',
    MixGlobal: '{real}',
    MixNonLocal: '{real}'
  },
  CSoundtrack: {
    catalog: 'soundtrack',
    Flags: '{bit}',
    CueArray: [
      {
        MasterLayer: {
          Sound: 'sound'
        },
        SlaveLayers: [
          {
            Sections: {
              Sound: 'sound'
            }
          }
        ]
      }
    ],
    Delay: 'ints',
    Select: Word,
    Next: 'soundtrack'
  },
  CSpray: {
    catalog: 'spray',
    Button: Word,
    Texture: Word,
    Model: 'model'
  },
  CSprayPack: {
    catalog: 'spraypack',
    Name: 'text',
    StoreName: 'link',
    StoreTypeName: 'link',
    SprayArray: '[spray]',
    ProductId: Int
  },
  CTacCooldown: {
    catalog: 'taccooldown',
    UnitLink: 'unit',
    TacAbilData: [
      {
        AbilLink: 'abil',
        Cooldown: '[int]'
      }
    ]
  },
  CTactical: {
    catalog: 'tactical',
    Abil: 'abil',
    TargetFind: 'targetfind',
    Retreat: Bit,
    Array: '[tactical]',
    Validator: 'validator',
    AbilCmdIndex: Int,
    Marker: {
      Link: 'link'
    }
  },
  CTacticalOrder: { prototype: 'CTactical'},
  CTacticalSet: { prototype: 'CTactical'},
  CTalent: {
    Face: 'button',
    catalog: 'talent'
  },
  CTargetFind: {
    catalog: 'targetfind',
    AreaArray: [{
      MaxCount: Int,
      Validator: 'validator',
      Radius: Real
    }],
    Effect: 'effect',
    MaxCount: Int,
    MinCountError: Word,
    LaunchLocation: {
      Value: Word
    },
    ImpactLocation: {
      Value: Word
    },
    SearchFlags: '{bit}',
    TargetFilters: 'filters',
    Abil: 'abil',
    Type: Word,
    Array: '[targetfind]',
    CasterValidator: 'validator',
    SearchFilters: 'filters',
    TargetValidator: 'validator',
    ExtendRadius: Real,
    TargetSorts: TargetSorts,
    CommandIndex: Bit,
    Flags: '{bit}',
    DamageBase: Int,
    MinCount: Int,
    MinScore: Real,
    BonusAttri: Word,
    Angle: Int,
    Distance: 'reals'
  },
  CTargetFindBestPoint: { prototype: 'CTargetFind'},
  CTargetFindEffect: { prototype: 'CTargetFind'},
  CTargetFindEnumArea: { prototype: 'CTargetFind'},
  CTargetFindLastAttacker: { prototype: 'CTargetFind'},
  CTargetFindOffset: { prototype: 'CTargetFind'},
  CTargetFindOrder: { prototype: 'CTargetFind'},
  CTargetFindRallyPoint: { prototype: 'CTargetFind'},
  CTargetFindSet: { prototype: 'CTargetFind'},
  CTargetFindWorkerRallyPoint: { prototype: 'CTargetFind'},
  CTargetSort: {
    catalog: 'targetsort',
    WhichUnit: {
      Value: Word
    },
    Alliance: Word,
    WhichLocation: {
      Value: Word
    },
    Descending: Bit,
    Value: Bit,
    Vital: "colorstyle",
    Behavior: 'behavior',
    Field: 'string',
    Validator: 'validator'
  },
  CTargetSortValidator: { prototype: 'CTargetSort'},
  CTargetSortField: { prototype: 'CTargetSort'},
  CTargetSortAlliance: { prototype: 'CTargetSort'},
  CTargetSortAngle: { prototype: 'CTargetSort'},
  CTargetSortBehaviorCount: { prototype: 'CTargetSort'},
  CTargetSortChargeCount: { prototype: 'CTargetSort'},
  CTargetSortChargeRegen: { prototype: 'CTargetSort'},
  CTargetSortCooldown: { prototype: 'CTargetSort'},
  CTargetSortDistance: { prototype: 'CTargetSort'},
  CTargetSortInterruptible: { prototype: 'CTargetSort'},
  CTargetSortMarker: { prototype: 'CTargetSort'},
  CTargetSortPowerSourceLevel: { prototype: 'CTargetSort'},
  CTargetSortPowerUserLevel: { prototype: 'CTargetSort'},
  CTargetSortPriority: { prototype: 'CTargetSort'},
  CTargetSortRandom: { prototype: 'CTargetSort'},
  CTargetSortVital: { prototype: 'CTargetSort'},
  CTargetSortVitalFraction: { prototype: 'CTargetSort'},
  CTerrain: {
    catalog: 'terrain',
    Name: 'text',
    Lighting: 'light',
    Camera: 'camera',
    Ambience: Word,
    RampNoBuild: "int",
    ReverbGlobal: 'reverb',
    ReverbAmbient: 'string',
    SoundDistanceFactor: Real,
    SoundDopplerFactor: Real,
    SoundRolloffFactor: Real,
    TilingFreq: Real,
    POMScale: Real,
    MinimapBackgroundColor: 'ints',
    FOWColor: 'ints',
    FogColor: 'ints',
    Gravity: Real,
    PhysicsTimeScale: Real,
    WindAngleHorizontal: Real,
    WindSpeed: Real,
    WindTurbulencePower: Real,
    WindTurbulenceSpeed: Real,
    CreepBaseTexture: 'file',
    CreepBaseSpecularMap: 'file',
    CreepEdgeNormalMap: 'file',
    CreepHeightMap: 'file',
    CreepNoiseMap: 'file',
    CreepSettingsArray: [
      {
        index: Word,
        CreepGroundNormalBlend: Real,
        CreepOpaqueAlphaThreshold: Real,
        CreepTranslucentMinThreshold: Real,
        CreepTranslucentPassTint: 'reals',
        CreepTranslucentMaxThreshold: Real
      }
    ],
    FoliageSettingsArray: [
      {
        index: Word,
        SamplingDistance: '{real}',
        AcceptWorldForces: '{bit}'
      }
    ],
    HeightFlags: '{bit}',
    LoadingScreen: 'file',
    EditorCategories: 'categories',
    BlendTextures: '[terraintex]',
    CliffSets: '[cliff]',
    HardTiles: 'file',
    FogEnabled: Bit,
    FogDensity: Real,
    FogFalloff: Real,
    FogStartingHeight: Real,
    HideLowestLevel: Bit,
    FixedSkyboxModel: 'model',
    NonFixedSkyboxModel: 'model',
    EnvironmentMap: 'file',
    MinimapBrightenFactor: Real,
    EditorHidden: Bit,
    TextureProp: Word,
    HeightMapEnabled: Bit,
    FixedSkyboxActor: 'actor'
  },
  CTerrainObject: {
    catalog: 'terrainobject',
    EditorCursorOffset: Real
  },
  CTerrainTex: {
    catalog: 'terraintex',
    Texture: 'file',
    EditorIcon: 'file',
    Normalmap: 'string',
    PhysicsMaterial: 'physicsmaterial',
    DoodadEntry: [
      {
        Model: 'model',
        RandomRotation: Bit,
        Probability: Real,
        PlacementRadius: Real
      }
    ],
    Heightmap: 'file',
    HeightMapOffset: Real,
    HeightMapScale: Real
  },
  CTexture: {
    catalog: 'texture',
    File: 'file',
    PropsAdd: "string",
    Flags: '{bit}',
    Slot: 'string',
    PropsSet: Word,
    MovieSoundSettings5dot1: 'sound',
    MovieSoundSettingsStereo: 'sound',
    MovieSoundSettings: 'sound',
    Prefix: Word
  },
  CTextureSheet: {
    catalog: 'texturesheet',
    Image: 'file',
    Rows: Int,
    Columns: Int
  },
  CTile: {
    catalog: 'tile',
    Material: 'file',
    EditorIcon: 'file',
    TesselationDistance: Real,
    TileWidthDistance: Real,
    TileHeightRepetitions: Bit,
    CapLength: Real,
    DefaultSplineWidth: Real,
    DefaultWingWidth: Real,
    Flags: '{bit}'
  },
  CTurret: {
    catalog: 'turret',
    Fidget: {
      TurnAngle: Real,
      TurningRate: Real,
      ChanceArray: '{int}',
      DelayMax: Int,
      DelayMin: Int
    },
    YawArc: Real,
    YawRate: Real,
    Idle: Word,
    YawStart: Real,
    YawIdleRate: Real
  },
  CUnit: {
    catalog: 'unit',
    UserFlagArray: "[bit]",
    StockCharge: {
      CountMax: "int",
      TimeUse: "int",
      TimeDelay: "int"
    },
    MainAttributeDamageBonus: "[int]",
    LearnInfoArray: [
      {
        Button: {
          Flags: "[bit]",
          DefaultButtonFace: "button"
        },
        index: Word,
        Abil: "abil"
      }
    ],
    TierRequirements: [
      {
        value: Word,
        index: "int",
        removed: "int"
      }
    ],
    RandomNameArray: "[text]",
    MainAttribute: "behavior",
    AttributePointsInfoArray: [
      {
        Attribute: "behavior",
        Points: "int",
        PointsPerLevel: "real"
      }
    ],
    LifeRegenRateNight: "real",
    Name: 'string',
    Description: 'text',
    Gender: Word,
    UserTag: 'link',
    DeathRevealFilters: 'filters',
    DeathRevealRadius: Real,
    SpeedMaximum: Real,
    SpeedMinimum: Real,
    BuildTime: Real,
    FormationRank: Int,
    Level: Int,
    AcquireLeashRadius: Real,
    DeathRevealDuration: Real,
    DeathRevealType: Word,
    Race: 'race',
    DefaultAcquireLevel: Word,
    Response: Word,
    ResourceState: Word,
    ResourceType: Word,
    LifeStart: Int,
    LifeMax: Int,
    TacticalAIRange: Int,
    EnergyDamageRatio: Int,
    LifeArmorName: 'text',
    LifeArmorTip: 'text',
    ShieldArmorTip: 'text',
    Mover: 'mover',
    StationaryTurningRate: Real,
    TurningRate: Real,
    Radius: Real,
    SeparationRadius: Real,
    MinimapRadius: Real,
    EditorCategories: 'categories',
    TacticalAIFilters: 'filters',
    AIEvalFactor: Real,
    Mass: Real,
    FlagArray: '{bit}',
    EditorFlags: '{bit}',
    PushPriority: Int,
    LeaderAlias: 'unit',
    HotkeyAlias: 'unit',
    SelectAlias: 'unit',
    SubgroupAlias:'unit',
    OccludeHeight: Real,
    TacticalAI: 'string',
    AIEvaluateAlias: 'unit',
    ReviveType: 'unit',
    PawnItemReduction: Real,
    DataCollection: 'datacollection',
    IfArray: [{
      Test: 'validator',
      Return: 'validator'
    }],
    ReviveInfoLevel: {
      Cooldown: {
        TimeUse: "int",
        Link: 'link'
      },
      Resource: "[int]",
      Charge: {
        Link: "link"
      }
    },
    Fidget: {
      DelayMax: Int,
      DelayMin: Int,
      DistanceMax: Int,
      DistanceMin: Int,
      TurnAngle: Real,
      TurningRate: Real,
      ChanceArray: '{int}'
    },
    ReviveInfoBase: {
      Charge: {
        Link: 'link',
        Location: Word,
        TimeUse: Real
      },
      Cooldown: {
        Link: 'link',
        Location: Word,
        TimeUse: Real
      },
      Time: Int,
      Resource: '{int}'
    },
    InnerRadiusSafetyMultiplier: Bit,
    ArmorType: Word,
    _: Word,
    FogVisibility: Word,
    Sight: Real,
    Item: 'item',
    PowerupEffect: Word,
    PowerupCost: CostSchema,
    Mob: Word,
    PlaneArray: '{bit}',
    Collide: '{bit}',
    AbilArray: [
      {
        Link: 'abil'
      }
    ],
    Speed: Real,
    Acceleration: Real,
    LateralAcceleration: Real,
    Height: Real,
    SubgroupPriority: Int,
    BehaviorArray: [
      {
        Link: 'behavior'
      }
    ],
    CardLayouts: [
      {
        LayoutButtons: [
          {
            Face: 'button',
            Type: Word,
            AbilCmd: 'abilcmd',
            Row: Int,
            Column: Int,
            Requirements: 'requirement',
            SubmenuCardId: Word,
            SubmenuFullSubCmdValidation: Bit,
            Behavior: 'behavior',
            SubmenuAbilState: 'abil',
            ShowInGlossary: Bit,
            SubmenuIsSticky: Bit
          }
        ],
        CardId: Word,
        RowText: '[link]'
      }
    ],
    Attributes: '{bit}',
    Deceleration: Real,
    InnerRadius: Real,
    LifeArmor: Real,
    ShieldsStart: Int,
    ShieldsMax: Int,
    ShieldRegenRate: Real,
    CostResource: '{int}',
    AttackTargetPriority: Int,
    Footprint: 'string',
    PlacementFootprint: 'string',
    ShieldArmorName: 'text',
    LifeRegenRate: Real,
    DamageDealtXP: Int,
    DamageTakenXP: Int,
    KillXP: Int,
    Facing: Real,
    VisionHeight: Real,
    ShieldRegenDelay: Real,
    CostCategory: Word,
    BuiltOn: '[unit]',
    ScoreMake: Int,
    ScoreKill: Int,
    ScoreResult: 'string',
    GlossaryPriority: Int,
    HotkeyCategory: 'text',
    GlossaryAlias: 'unit',
    RepairTime: Real,
    AddedOnArray: [
      {
        UnitLink: 'unit',
        BehaviorLink: 'behavior',
        ParentBehaviorLink: 'behavior'
      }
    ],
    AddOnOffsetX: Real,
    AddOnOffsetY: Real,
    TechAliasArray: '[unit]',
    TechTreeUnlockedUnitArray: '[unit]',
    SpeedMultiplierCreep: Real,
    Food: Real,
    CargoSize: Int,
    EquipmentArray: [
      {
        Tooltip: "text",
        Weapon: 'weapon',
        Effect: 'effect',
        Icon: 'file'
      }
    ],
    GlossaryStrongArray: '[word]',
    GlossaryWeakArray: '[word]',
    KillDisplay: Word,
    RankDisplay: Word,
    WeaponArray: [
      {
        Link: 'weapon',
        Turret: 'turret'
      }
    ],
    GlossaryCategory: 'text',
    EffectArray: '{effect}',
    EnergyStart: Int,
    EnergyMax: Int,
    EnergyRegenRate: Real,
    AIOverideTargetPriority: Int,
    DeathTime: Real,
    DeadFootprint: 'string',
    TauntDuration: '{int}',
    TacticalAIThink: Word,
    BuildOnAs: '[unit]',
    ResourceDropOff: '{bit}',
    TechTreeProducedUnitArray: '[unit]',
    TurretArray: '[turret]',
    CargoOverlapFilters: 'filters',
    EditorFacingAlignment: Int,
    AIKiteRange: Real,
    LifeRegenDelay: Real,
    AINotifyEffect: 'effect',
    ShieldArmor: Int,
    SyncModelData: 'string',
    TacticalAIChannel: Word,
    ReviveDelay: Real,
    Subtitle: 'text',
    AlliedPushPriority: Int,
    SpeedBonusCreep: Real,
    AIEvalConstant: Real,
    ScoreLost: Int,
    LifeArmorLevel:  Int,
    AcquireMovementLimit: Real,
    ShieldArmorLevel:  Int,
    ScoreMakeCostFactor: '{int}',
    ScoreKillCostFactor: '{int}',
    $abil: 'abil',


    EnergyRegenDelay: "int",
    LifeArmorFormula: {
      NegativeArmorMultiplier: "int",
      NegativeDamageBase: "real",
      PositiveArmorMultiplier: "int",
      PositiveDamageRatio: "real"
    },
    EnergyArmor: "int",
    AttackSpeedMultiplierCreep: "real",
    ReviveTime: "int",
    LifeRegenRateCreep: "real",
    ShieldRegenRateCreep: "real",
    SubgroupPriorityDelta: "int",
    EnerArmorFormula: {
      NegativeArmorMultiplier: "int",
      NegativeDamageBase: "real",
      PositiveArmorMultiplier: "int",
      PositiveDamageRatio: "real"
    },
    SpeedDisplayFlags: "{bit}",
    ResourceDamageLeechFilters: "filters",
    ResourceDamageLeech: [
      {
        Amount: "[real]",
        index: Word
      }
    ],
    SightBonus: "[real]",
    LifeArmorDisplayFlags: "[int]",
    PowerupFilters: "filters",
    PowerupRange: "real",
    KillResource: "{int}",
    defType: Word,
    l1: "button",
    l2: "button",
    l3: "button",
    l4: "button",
    aid: "actor",
    alter: "actor",
    l5: "button",
    BoostedHeight: "{real}",
    AcquireLeashResetRadius: Real,
    LifeDamageLeech: "[real]",
    EnergyRegenRateCreep: "real",
    ShieldDamageLeech: "{real}",
    EnergyAgyRegenDelay: "int",
    Lifermor: "int",
    EnergyArmorFormula: {
      PositiveDamageRatio: "int"
    },
    ShieldArmorDisplayFlags: "{bit}"
  },
  CUnitHero: { prototype: 'CUnit'},
  CUpgrade: {
    catalog: 'upgrade',
    Flags: '{bit}',
    Name: 'text',
    MaxLevel: Int,
    BonusResourcePerLevel: '{int}',
    LeaderPriority: Int,
    $Level: Int,
    Alert: 'string',
    ScoreCount: "scorevalue",
    ScoreValue: 'scorevalue',
    UnitDisallowed: 'unit',
    WebPriority: Int,
    LeaderAlias: 'unit',
    InfoTooltipPriority: Int,
    Race: 'race',
    DataCollection: 'datacollection',
    EditorCategories: 'categories',
    ScoreResult: 'string',
    LevelButton: '[button]',
    LevelRequirements: '[requirement]',
    BonusTimePerLevel: Real,
    EffectArray: [
      {
        Reference: 'reference',
        Value: 'string',
        Operation: Word
      }
    ],
    AffectedUnitArray: '[unit]',
    ScoreAmount: Int,
    Icon: 'file',
    LeaderLevel: Int,
    TechAliasArray: '[unit]',
    UnitAllowed: "actor",
    EffectArrayTemplate: [
      {
        Reference: "reference",
        Value: "string",
        Operation: Word
      }
    ],
    $path: 'string',
    $lvl: Int,
    $level: Int,
    $terranairarmor: 'file',
    $icon: 'file',
    $airicon: 'file'
  },
  CUser: {
    catalog: 'user',
    Fields: [
      {
        $Id: 'string',
        Type: Word,
        Count: Int,
        EditorColumn: Int,
        Flags: '{bit}',
        EditorText: 'string',
        GameLinkType: Word,
        UserType: 'user'
      }
    ],
    Instances: [
      {
        $Id: 'string',
        AbilCmd: [{Abil: 'abil', Field: FieldSchema,Cmd: "int"}],
        Unit: [{Unit: 'unit', Field: FieldSchema}],
        User: [{Type: 'user', Instance: 'string', Field: FieldSchema}],
        Int: [{Int: Int, Field: FieldSchema}],
        Fixed: [{Fixed: Real, Field: FieldSchema}],
        Text: [{Text: 'text', Field: FieldSchema}],
        GameLink: [{GameLink: Word, Field: FieldSchema}],
        Image: [{Image: 'file', Field: FieldSchema, Edge: Word, Attach: Word}],
        Model: [{Model: 'model', Field: FieldSchema}],
        Upgrade: [{Upgrade: 'upgrade', Field: FieldSchema}],
        String: [{String: 'string', Field: FieldSchema}],
        Movie: [{Field: FieldSchema, Movie: "file"}],
        Color: [{Field: FieldSchema, Color: "ints"}],
        Actor: [{Field: FieldSchema, Actor: 'actor'}],
        Sound: [{Field: FieldSchema, Sound: 'sound'}]
      }
    ]
  },
  CValidator: {
    catalog: 'validator',
    IgnoreWhileChanneling: "int",
    ResultFailed: 'links',
    Type: Word,
    WhichEffect: Word,
    Resource: 'string',
    ResultNoEffect: "alert",
    IncludeArray: [{Value: Word}],
    Compare: Word,
    State: Word,
    Enabled: Bit,
    Queued: Bit,
    CasterHeight: Real,
    TargetZ: Int,
    UnitSelectionNotRequired: Bit,
    CheckExistence: Bit,
    ResultNoKey: 'string',
    WhichLocation: {
      Value: Word,
      Effect: 'effect'
    },
    OtherLocation: {
      Value: Word,
      Effect: Word
    },
    FromUnit: {
      Value: Word
    },
    Find: Bit,
    LaunchLocation: {
      Value: Word,
      Effect: 'effect'
    },
    BehaviorScope: {Behavior: 'behavior'},
    Key: 'string',
    CombinedVital: Word,
    SearchFlags: '{bit}',
    CmdFlags: '{bit}',
    Types: '{bit}',
    OtherUnit: {
      Value: Word,
      Effect: 'effect'
    },
    Range: Real,
    OtherPlayer: {
      Value: Word
    },
    WhichPlayer: {
      Value: Word
    },
    ResultNoUnit: 'string',
    WhichUnit: {
      Value: Word,
      Effect: 'effect'
    },
    WithPlayer: {
      Value: Word
    },
    AbilClass: Word,
    ResultNoInventory: 'links',
    Target: {
      Value: Word
    },
    ExcludeOriginPlayer: {
      Value: Word
    },
    ExcludeCasterUnit: {
      Value: Word
    },
    RequireOriginPlayer: {
      Value: Word
    },
    RequireCasterUnit: {
      Value: Word
    },
    BehaviorAlignment: Word,
    ResultMaxLevel: Word,
    IgnoreDisabledBehavior: Bit,
    AllowCheat: Bit,
    ResultFoodMax: Word,
    Count: Int,
    WeaponType: Word,
    RequireActivated: Bit,
    RequireEnabled: Bit,
    CountType: Word,
    CombineArray: '[validator]',
    Field: 'string',
    Filters: 'filters',
    Plane: Word,
    Flag: Word,
    Flags: '{bit}',
    Vital: Word,
    AbilLink: 'abil',
    Behavior: 'behavior',
    RadiusBonus: Real,
    ResultFallback: "alert",
    Relationship: Word,
    Arc: Real,
    SearchFilters: 'filters',
    Line: [
      {
        Failure: "validator",
        Ignored: "validator",
        Success: "validator",
        Test: "validator",
        Return:"validator",
      }
    ],
    CachedSearch: Word,
    AreaArray: [
      {
        Arc: Real,
        Radius: Real,
        Validator: 'validator',
        Count: Int,
        Compare: Word,
        IncludeArray: Word
      }
    ],
    ResultNoPlayer: "alert",
    Negate: Bit,
    AbilCmdIndex: Int,
    Active: Bit,
    PowerLink: Word,
    Unit: 'unit',
    BehaviorState: Word,
    Pathing: Bit,
    PowerSource: "behavior",
    AttackerAlternateType: "unit",
    CombinedVitalCompare: Word,
    $unitLink: 'unit',
    $maxVitals: Int,
    $minVitals: Int,
    Weapon: 'weapon',
    Detected: Bit,
    Location: Word,
    ChargeLink: 'string',
    ExcludeArray: [
      {
        History: "effect",
        Effect: 'effect',
        Value: Word
      }
    ],
    Ability: 'abil',
    CasterGroundHeight: Bit,
    CasterAdd: Real,
    TargetGroundHeight: Bit,
    Categories: '{bit}',
    CooldownLink: 'link',
    Value: {
      Effect: Word,
      Value: Word,
      value: 'string'
    },
    IfArray: [{
      Test: 'validator',
      Return: 'validator'
    }],
    AbilityStage: Word,
    TimeEvent: Word,
    BehaviorLink: 'behavior',
    TrackerUnit:  [{Value:Word,History:Word}],
    TrackedUnit:  [{Value:Word,History:Word}],
    TrackedUnitValidatorArray: '[validator]'
  },
  CValidatorCompareTrackedUnitsCount: {prototype: 'CValidator'},
  CValidatorUnitCompareAbilStage: { prototype: 'CValidator'},
  CValidatorUnitCompareCooldown: {
    prototype: 'CValidator',
    Value: Real
  },
  CValidatorCombine: { prototype: 'CValidator'},
  CValidatorCondition: { prototype: 'CValidator'},
  CValidatorEffect: { prototype: 'CValidator'},
  CValidatorEffectCompareDodged: { prototype: 'CValidator'},
  CValidatorEffectCompareEvaded: { prototype: 'CValidator'},
  CValidatorEffectTreeUserData: { prototype: 'CValidator'},
  CValidatorFunction: { prototype: 'CValidator'},
  CValidatorGameCommanderActive: { prototype: 'CValidator'},
  CValidatorGameCompareTerrain: { prototype: 'CValidator'},
  CValidatorGameCompareTimeEvent: { prototype: 'CValidator'},
  CValidatorGameCompareTimeOfDay: { prototype: 'CValidator'},
  CValidatorLocation: { prototype: 'CValidator'},
  CValidatorLocationArc: { prototype: 'CValidator'},
  CValidatorLocationCompareCliffLevel: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorLocationComparePower: { prototype: 'CValidator'},
  CValidatorLocationCompareRange: { prototype: 'CValidator'},
  CValidatorLocationCreep: { prototype: 'CValidator'},
  CValidatorLocationCrossChasm: { prototype: 'CValidator'},
  CValidatorLocationCrossCliff: { prototype: 'CValidator'},
  CValidatorLocationEnumArea: { prototype: 'CValidator'},
  CValidatorLocationInPlayableMapArea: { prototype: 'CValidator'},
  CValidatorLocationPathable: { prototype: 'CValidator'},
  CValidatorLocationPlacement: { prototype: 'CValidator'},
  CValidatorLocationShrub: { prototype: 'CValidator'},
  CValidatorLocationType: {
    prototype: 'CValidator',
    Point: 'validator'
  },
  CValidatorLocationVision: { prototype: 'CValidator'},
  CValidatorPlayer: { prototype: 'CValidator'},
  CValidatorPlayerAlliance: { prototype: 'CValidator'},
  CValidatorPlayerCompareDifficulty: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorPlayerCompareFoodAvailable: {
    prototype: 'CValidator',
    Value: Real
  },
  CValidatorPlayerCompareFoodUsed: {
    prototype: 'CValidator',
    Value: Real
  },
  CValidatorPlayerCompareRace: {
    prototype: 'CValidator',
    Value: 'race'
  },
  CValidatorPlayerCompareResource: {
    prototype: 'CValidator',
    Value: Real
  },
  CValidatorPlayerCompareResult: { prototype: 'CValidator'},
  CValidatorPlayerCompareType: {
    prototype: 'CValidator',
    Value: Word
  },
  CValidatorPlayerFood: { prototype: 'CValidator'},
  CValidatorIsUnitTracked: {prototype: 'CValidator'},
  CValidatorPlayerRequirement: {
    prototype: 'CValidator',
    Value: 'requirement'
  },
  CValidatorUnit: { prototype: 'CValidator'},
  CValidatorUnitAI: { prototype: 'CValidator'},
  CValidatorUnitAbil: { prototype: 'CValidator'},
  CValidatorUnitAlliance: { prototype: 'CValidator'},
  CValidatorUnitBehaviorStackAlias: {
    prototype: 'CValidator',
    "StackAlias": "behavior"
  },
  CValidatorUnitBehaviorState: {
    prototype: 'CValidator'
  },
  CValidatorUnitCombatAI: { prototype: 'CValidator'},
  CValidatorUnitCompareAIAreaEvalRatio: { prototype: 'CValidator'},
  CValidatorUnitCompareAbilSkillPoint: { prototype: 'CValidator'},
  CValidatorUnitCompareAttackPriority: { prototype: 'CValidator'},
  CValidatorUnitCompareBehaviorCount: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorUnitCompareCargo: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorUnitCompareChargeUsed: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorUnitCompareDamageDealtTime: {
    prototype: 'CValidator',
    Value: Real
  },
  CValidatorUnitCompareDamageTakenTime: {
    prototype: 'CValidator',
    Value: Real
  },
  CValidatorUnitCompareDeath: {
    prototype: 'CValidator',
    Value: Word
  },
  CValidatorUnitCompareField: {
    prototype: 'CValidator'
  },
  CValidatorUnitCompareHeight: { prototype: 'CValidator'},
  CValidatorUnitCompareKillCount: { prototype: 'CValidator'},
  CValidatorUnitCompareMarkerCount: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorUnitCompareMoverPhase: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorUnitCompareOrderCount: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorUnitCompareOrderTargetRange: {
    prototype: 'CValidator',
    Value: Real
  },
  CValidatorUnitComparePowerSourceLevel: { prototype: 'CValidator'},
  CValidatorUnitComparePowerUserLevel: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorUnitCompareRallyPointCount: {
    prototype: 'CValidator',
    Point: 'int'
  },
  CValidatorUnitCompareResourceContents: {
    prototype: 'CValidator',
    Value: Int
  },
  CValidatorUnitCompareResourceHarvesters: { prototype: 'CValidator'},
  CValidatorUnitCompareSpeed: { prototype: 'CValidator'},
  CValidatorUnitCompareVeterancyLevel: { prototype: 'CValidator'},
  CValidatorUnitCompareVital: {
    prototype: 'CValidator',
    Value: Real
  },
  CValidatorUnitCompareVitality: {
    prototype: 'CValidator',
    Value: Real
  },
  CValidatorUnitDetected: { prototype: 'CValidator'},
  CValidatorUnitFilters: { prototype: 'CValidator'},
  CValidatorUnitFlying: { prototype: 'CValidator'},
  CValidatorUnitInWeaponRange: { prototype: 'CValidator'},
  CValidatorUnitInventory: { prototype: 'CValidator'},
  CValidatorUnitInventoryContainsItem: { prototype: 'CValidator'},
  CValidatorUnitInventoryIsFull: { prototype: 'CValidator'},
  CValidatorUnitKinetic: {
    prototype: 'CValidator',
    value: "kinetic",
    Value: "kinetic"
  },
  CValidatorUnitLastDamagePlayer: { prototype: 'CValidator'},
  CValidatorUnitMissileNullified: { prototype: 'CValidator'},
  CValidatorUnitMover: {
    prototype: 'CValidator',
    value: "mover"
  },
  CValidatorUnitOrder: { prototype: 'CValidator'},
  CValidatorUnitOrderQueue: { prototype: 'CValidator'},
  CValidatorUnitOrderTargetPathable: { prototype: 'CValidator'},
  CValidatorUnitOrderTargetType: { prototype: 'CValidator'},
  CValidatorUnitPathable: { prototype: 'CValidator'},
  CValidatorUnitPathing: { prototype: 'CValidator'},
  CValidatorUnitScanning: { prototype: 'CValidator'},
  CValidatorUnitState: { prototype: 'CValidator'},
  CValidatorUnitTestWeaponType: { prototype: 'CValidator'},
  CValidatorUnitType: {
    prototype: 'CValidator',
    Value: 'unit'
  },
  CValidatorUnitWeaponAnimating: { prototype: 'CValidator'},
  CValidatorUnitWeaponFiring: { prototype: 'CValidator'},
  CValidatorUnitWeaponPlane: { prototype: 'CValidator'},
  CValidatorUnitCompareAbilLevel: {
    prototype: 'CValidator',
    Value: Int
  },
  CVoiceOver: {
    catalog: 'voiceover',
    Groups: [
      {
        $Id: Word,
        SoundParent: 'sound'
      }
    ],
    Lines: [
      {
        Group: Word,
        FacialBlend: Int,
        SoundIndex: Int,
        Comment: 'string',
        SoundType: Word,
        SoundText: Word
      }
    ],
    Character: 'character'
  },
  CVoicePack: {
    catalog: 'voicepack',
    Name: 'text',
    TypeName: 'link',
    StoreName: 'link',
    Description: 'text',
    Icon: 'file',
    StoreTypeName: 'link',
    Default: Bit,
    ReleaseDate: 'link',
    ImageTexture: 'file',
    UnlockedRewardArray: '[reward]',
    ExampleLineArray: [
      {
        Description: 'text',
        Sound: 'sound'
      }
    ],
    ProductId: Int,
    LocaleRestriction: Word,
    ParentBundle: 'bundle',
    IsPurchaseHidden: Bit
  },
  CWater: {
    catalog: 'water',
    TextureKey: 'file',
    TilingFreq: 'reals',
    ScrollVectors: 'reals',
    CausticsTilingFreq: 'reals',
    CausticsFPS: Real,
    FramesPerSec: Real,
    LavaModel: 'model',
    Sound: 'sound',
    Density: Real,
    Drag: Real,
    AngularDamping: Real,
    MaxLinearVelocity: Real,
    State: [
      {
        Name: 'string',
        Height: Real,
        Color: 'reals',
        ColorFallOff: Real,
        Specularity: Real,
        SpecularScaler: Real,
        UvRate: 'reals',
        ReflectionDistortion: Real,
        RefractionDistortion: Real,
        MinReflection: Real,
        ReflectivityPower: Real,
        MeshRoughness: Real,
        TextureRoughness: Real,
        CausticsFallOff: Real,
        UvRotate: Real,
        ShadowDistortion: Real
      }
    ],
    BeachShoreline:  "model",
    CliffShoreline:  "model",
    Doodads: {
      Model: 'model',
      Density: Real,
      MinSize: Real,
      MaxSize: Real,
      Lifetime: Int
    },
    ReceiveShadows: Bit,
    IsLava: Bit
  },
  CWeapon: {
    catalog: 'weapon',
    Name: 'text',
    DisplayName: 'text',
    EditorCategories: 'categories',
    InfoTooltipPriority: Bit,
    Icon: 'file',
    Tip: 'text',
    DisplayEffect: 'effect',
    PreEffect: 'effect',
    MinScanRange: Real,
    PreswingBetweenAttacks: Real,
    Range: Real,
    RangeSlop: Real,
    Level: Int,
    TeleportResetRange: Int,
    ArcSlop: Real,
    Period: Real,
    DamagePoint: Real,
    Backswing: Real,
    Options: '{bit}',
    Marker: {
      Link: 'string',
      MatchFlags: '{bit}',
      MismatchFlags: '{bit}',
      Count: Int
    },
    CriticalEffect: 'effect',
    PostEffectBehavior: EffectBehaviorSchema,
    PreEffectBehavior: EffectBehaviorSchema,
    Cost: CostSchema,
    TargetFilters: 'filters',
    AttackType: Word,
    SupportedFilters: 'filters',
    LegacyOptions: '{bit}',
    RandomDelayMin: Real,
    RandomDelayMax: Real,
    Effect: 'effect',
    PathingAmmoUnit: 'unit',
    UninterruptibleDuration: Real,
    LoiterInnerRadius: Int,
    LoiterRadius: Real,
    DisplayAttackCount: Int,
    AllowedMovement: Word,
    AcquireFilters: 'filters',
    Arc: Real,
    AcquirePrioritization: Word,
    MinimumRange: Real,
    ReloadDuration: Real,
    ChaseFilters: 'filters',
    AcquireCliffLevelRange: 'ints',
    AcquireScanFilters: 'filters',
    RangeDisplayFlags: '{bit}',
    AcquireCallForHelpFilters: 'filters',
    PreswingBeforeAttack: Int,
    AcquireTargetSorts: TargetSorts,
    CriticalChance: "real",
    PeriodDisplayFlags: "{bit}",
    AcquireProvokeFilters: "filters",
    "$atkType": Word,
  },
  CWeaponLegacy: { prototype: 'CWeapon'},
  CWeaponStrafe: { prototype: 'CWeapon'},
  CMap: {
    catalog: 'map',
    Name: 'text',
    Description: 'text',
    Summary: 'link',
    LoadingTitle: 'text',
    LoadingSubtitle: 'text',
    LoadingBody: 'link',
    LoadingHelp: 'link',
    LoadingHelpRestart: 'link',
    LoadingHelpAlternate: 'link',
    BonusText: 'text',
    BonusTitle: 'text',
    MissionText: 'text',
    MissionTitle: 'text',
    PrimaryObjectiveText: 'text',
    PrimaryObjectiveTitle: 'text',
    ResearchText: 'text',
    ResearchTitle: 'text',
    RewardText: 'text',
    RewardTitle: 'text',
    SecondaryObjectiveText: 'text',
    SecondaryObjectiveTitle: 'text',
    TechnologyNameText: 'text',
    TechnologyTitle: 'text',
    LoadingImage: "file",
    File: Word,
    ContactTitle: "text",
    ContactNameText: "link",
    ContactModelLink: "actor",
    Location: Word,
    UserReference: "string",
    Kind: Word,
    ObjectiveArray: "[objective]",
    ContactActor: "actor"
  },
  CBundle: {
    catalog: 'bundle',
    Name: "link",
    StoreName: "link",
    HyperlinkId: Word,
    Description: "link",
    ReleaseDate: {
      Month: "int",
      Day: "int",
      Year: "int"
    },
    ShortName: "link",
    StoreTypeName: "text",
    Flags: "[int]",
    ProductId: "int",
    TileTexture: "file",
    GameContentArray: "[abilcmd]",
    MediumTileTexture: "file",
    LargeTileTexture: "file",
    LearnMoreImage1: "file",
    LearnMoreImage2: "file",
    LearnMoreImage3: "file",
    CinematicsImagePath: "file",
    SuppressCountryArray: "[word]",
    LearnMoreBackgroundImage: "file",
    LearnMoreTitleText1: "link",
    LearnMoreTitleText2: "link",
    LearnMoreTitleText3: "link",
    LearnMoreBodyText1: "link",
    LearnMoreBodyText2: "link",
    LearnMoreBodyText3: "link"
  },
  CEmoticon: {
    catalog: 'emoticon',
    Name: "text",
    NameAlternate: "text",
    NameInvalid: "text",
    Description: "text",
    DescriptionLocked: "text",
    Image: {
      TextureSheet: "texturesheet",
      Index: "int"
    },
    Hidden: "int",
    RequiredReward: "reward"
  },
  CEmoticonPack: {
    catalog: 'emoticonpack',
    Name: "text",
    StoreName: "text",
    ShortName: "text",
    Description: "text",
    Image: {
      TextureSheet: "texturesheet",
      Index: "int"
    },
    StoreTypeName: "text",
    Default: "int",
    ReleaseDate: "link",
    EmoticonArray: "[emoticon]",
    RequiredCampaign: {
      Campaign: "campaign"
    },
    RequiredRewardArray: "[word]",
    RequiredCommander: "commander",
    ProductId: "int",
    ParentBundle: "bundle",
    HideAchievement: "int",
    Hidden: "int"
  },
  CGame: {
    catalog: 'game',
    CreepDecaySound: 'sound',
    CreepGrowSound: 'sound',
    JoinInProgress: Bit,
    PlayersRequiredForLargeFormat: Int,
    PlayerLeaveFlags: '{bit}',
    TriggerLibs: [{
      $Id: Word,
      IncludePath: 'link'
    }],
    EnforcedGameResultScoreResult: 'scoreresult',
    SprayAbil: 'abil',
    SprayButtonReplacementTarget: '[button]',
    BeaconInfoArray: [
      {
        index: Word,
        Unit: 'unit',
        Tooltip: 'text',
        Clear: '{bit}'
      }
    ],
    AIBuilds: [
      {
        AttributeId: Word,
        Name: 'text',
        MenuTooltip: 'text',
        Enabled: Bit,
        Race: 'race',
        MaxDiff: Int,
        BuildScriptNum: Int,
        MinDiff: Int
      }
    ],
    DamageHistoryIntervalMax: Bit,
    EnableRewardSkins: "int",
    DefaultPauseCountPerPlayer: "int",
    EnableRewardVoicePacks: "int",
    SmartCommandContinuous: "int",
    MeleePointsThreshold: {
      Value: "int",
      Factor: "real"
    },
    UnlimitedPause: "int",
    PathingConfig: "{bit}",
    DifficultyDefault: "int",
    AirFormationDiameter: "int",
    MixedFormationDiameter: "int",
    MeleePointsGameDurationMin: "int",
    WeaponHighGroundChanceToMiss: "real",
    VeterancyLevelKillXPTable: "[int]",
    VeterancyLevelKillXPPreviousValueFactor: "int",
    VeterancyLevelKillXPBonusPerLevel: "int",
    VeterancyKillerFilters: "filters",
    UnitLevelKillXPTable: "int",
    UnitLevelKillXPPreviousValueFactor: "int",
    UnitLevelKillXPLevelFactor: "int",
    UnitLevelKillXPBonusPerLevel: "int",
    UnpathableMargin: "ints",
    AcquireMovementLimit: "int",
    AcquireLeashRadius: "real",
    AcquireLeashResetRadius: "real",
    CallForHelpPeriod: "int",
    CallForHelpRadius: "int",
    CameraMargin: "ints",
    CameraMarginAspectAdjust: [
      {
        AspectWidth: "int",
        AspectHeight: "int",
        Margin: "ints"
      }
    ],
    SplashDamageEffect: "effect",
    UnitSightRangeUnderConstruction: "int",
    DifficultyLevels: [
      {
        AttributeId: Word,
        Name: "text",
        NameMelee: "text",
        MenuTooltip: "text",
        index: "int",
        NameCampaign: "text",
        Enabled: "int",
        ActionsPerMinute: "int",
        Flags: "{int}",
        DefaultRebuildUnit: "int",
        DefaultRebuildStructure: "int"
      }
    ],
    HandicapValues: [
      {
        MenuTooltip: "text",
        Percent: "int"
      }
    ],
    MapSizes: [
      {
        index: "int",
        Name: "text",
        MaxCells: "int"
      }
    ],
    TeamColors: [
      {
        Value: "[reals]",
        Name: "text",
        AttributeId: Word,
        UserChoice: "int",
        MinPlayerCount: "int",
        index: "int"
      }
    ],
    CreepBlendTime: "int",
    CreepDecayTime: "real",
    CreepDecayWeightMultiplier: "int",
    CreepDecayWeightUnscaledBonus: "int",
    DamageMinimum: "real",
    AttackRevealTime: "real",
    PenaltyRevealTime: "int",
    StalemateTestTime: "int",
    StalemateWarningTime: "int",
    AttackRevealBehavior: "behavior",
    AI: {
      Id: Word,
      Name: "text",
      File: "file"
    },
    FilterResults: [
      {
        Filter: "filters",
        Result: "words"
      }
    ],
    UncontestedCombatPeriod: "int",
    AIResourceRequest: "[int]",
    DamageCategories: [
      {
        index: Word,
        Category: Word,
        SupportedFilters: "filters"
      }
    ],
    AttackArmorTable: [
      {
        ArmorFactor: "[real]",
        index: Word,
        FailThroughToDamageType: "int",
        SupportedFilters: "filters"
      }
    ],
    VeterancySearchRadius: "real",
    VeterancySearchFilters: "filters",
    ResourceConvertArray: [
      {
        RatioArray: "{int}",
        index: Word
      }
    ],
    FoodCappedMax: "int",
    TeleportResetRange: "{int}",
    DeepWaterThreshold: "real",
    GenerateWaterPathing: "int",
    TauntAbil: "abil",
    FormationSeparationFactor: "real",
    EnableRewardConsoleSkins: "int"
  },
  CGameUI: {
    catalog: 'gameui',
    SuppressSkinsForParticipants: "int",
    SuppressSkinsInReplay: "int",
    SoundQuality: [
      {
        AutoDetectCPUCoreMaximum: Int,
        Channels: Int,
        Name: 'text',
        Format: Word,
        SampleRate: Int,
        SpeakerMode: Word,
        VariationMaximum: '{int}',
        Resampler: Word,
        Flags: '{bit}'
      }
    ],
    RegionNameSize: Int,
    SelectionData: {
      SelectionWidth: Real,
      SelectionFallOff: Real,
      SelectionAlpha: 'reals',
      SelectionTiming: 'reals',
      SelectionSegmentCount: Bit,
      SelectionSegmentPercentSolid: Real,
      SelectionInnerOffsetRatio: Real,
      SelectionInnerBoundaryRatio: Real,
      SelectionInnerBoundaryFallOffRatio: Real,
      PreselectionWidth: Real,
      PreselectionFallOff: Real,
      PreselectionAlpha: 'reals',
      PreselectionTiming: 'reals',
      PreselectionSegmentCount: Int,
      PreselectionSegmentPercentSolid: Real,
      PreselectionRotationSpeed: Real
    },
    SoundData: [
      {
        index: Word,
        MixerPriority: Int,
        Volume: Real,
        MuteControl: Word,
        MuteFadeOut: [
          {
            Time: Int
          }
        ],
        VolumeRolloffPoints: [
          {
            Distance: Real
          }
        ],
        VolumeControl: Word,
        DupeFadeOut: [
          {
            Time: Int
          }
        ],
        AlertFadeVolume: 'reals',
        ThresholdPoints: [
          {
            Count: Int,
            Volume: Real
          }
        ],
        VolumeBaseline: Real,
        AlertFadeTimeOut: Int,
        AlertFadeTimeIn: Int,
        DSPArray: '[dsp]'
      }
    ],
    LookAtTypes: [
      {
        $Id: Word,
        Name: 'text',
        Start: [
          {
            Group: Word,
            Weight: Real,
            Time: Int
          }
        ],
        Stop: [
          {
            Group: Word,
            Weight: Bit,
            Time: Int
          }
        ]
      }
    ],
    CameraShakeAmplitudes: [
      {
        $Id: Word,
        Name: 'text',
        Position: 'reals',
        Rotation: {
          Yaw: Real,
          Pitch: Real,
          Roll: Real
        }
      }
    ],
    CameraShakeFrequencies: [
      {
        $Id: Word,
        Name: 'text',
        Position: 'reals',
        Rotation: {
          Yaw: Real,
          Pitch: Real,
          Roll: Real
        }
      }
    ],
    ListenerAngleRolloff: [
      {
        CameraValue: Real,
        ListenerFactor: Real
      }
    ],
    ListenerDistanceRolloff: [
      {
        CameraValue: Real,
        ListenerFactor: Real
      }
    ],
    PlanetPanelDefaultBackground: Word,
    WayPointMultiUnitFadePoint: Real,
    WayPointMultiUnitFadeAlpha: Real,
    WayPointLineWidth: Real,
    WayPointTileLength: Real,
    DefaultPathColor: '{ints}',
    DefaultPathLineWidth: '{real}',
    DefaultPathTexture: '{string}',
    DefaultPathTileLength: '{real}',
    DefaultPathStepModel: '{string}',
    DefaultPathStepModelScale: '{real}',
    PointModels: [
      {
        index: Word,
        Model: 'file',
        Scale: Real,
        NameSize: Int,
        SelectionOffset: 'reals',
        SelectionRadius: Real
      }
    ],
    OverrideColors: [
      {
        index: Word,
        Value: '{reals}'
      }
    ],
    ColorBlindColors: [
      {
        index: Word,
        Value: '{reals}'
      }
    ],
    RadarAlpha: Int,
    PlayerIdObserverColorMap: '{word}',
    InfoColorBuffed: 'ints',
    InfoColorDebuffed: 'ints',
    InfoColorUpgraded: 'ints',
    RequirementsSatisfiedColor: 'ints',
    RequirementsUnsatisfiedColor: 'ints',
    UnitDamageFlashDuration: Int,
    UnitDamageNotificationCooldown: Int,
    UnitDamageNotificationDelay: Int,
    CancelTargetModeButtonFace: 'button',
    CancelPlacementModeButtonFace: 'button',
    PlacementDisplayBonusRadius: Int,
    PlacementErrorColor: 'ints',
    PlacementWarningColor: 'ints',
    PlacementPerfectColor: 'ints',
    PlacementColorBlindErrorColor: 'ints',
    PlacementColorBlindWarningColor: 'ints',
    PlacementColorBlindDefaultColor: 'ints',
    PlacementGridDimensions: 'ints',
    ScreenModeTransitionDuration: Int,
    PossibleEnemyPlacementPingDuration: Int,
    PossibleEnemyPlacementPingModel: 'model',
    PossibleEnemyPlacementPingColor: 'ints',
    CostDisplayFade: Int,
    CostDisplayHeight: Int,
    CostDisplayHeightOffset: Real,
    CostDisplaySpeed: Int,
    CostDisplayTime: Int,
    MinimapData: {
      InnerBorderColor: 'ints',
      OuterBorderColor: 'ints',
      FrustumColor: 'ints',
      ResourceUnitColor: 'ints',
      ResourceUnitColorBlindColor: 'ints',
      BlipUnitColor: 'ints',
      UnitBorderColor: 'ints',
      SelectedUnitBorderColor: 'ints',
      BackGroundColor: 'ints',
      BorderSize: Real,
      SelectedBorderSize: Real,
      MinUnitDotSize: Real,
      RadarAlpha: Int
    },
    BehaviorIconColors: '{ints}',
    BehaviorBorderColors: '{ints}',
    VitalColors: [
      {
        index: Word,
        ColorArray: '[ints]'
      }
    ],
    SelectionColors: '{ints}',
    SelectionColorBlindColors: '{ints}',
    WireframeColorArray: '[ints]',
    CostDisplayColor: '{ints}',
    GlowPeakMultiplier: 'reals',
    TransmissionSoundDepth: Real,
    AlertPanMaxVelocity: Real,
    AlertPanMaxDuration: Real,
    AlertPanMinDuration: Real,
    BeaconMinimapIcon: 'file',
    BeaconMinimapRenderPriority: Word,
    DefaultInfoTooltipTypes: 'words',
    CameraEventThresholdDistance: Real,
    CameraEventThresholdPitch: Real,
    CameraEventThresholdYaw: Real,
    CameraEventThresholdTarget: Real,
    GameCategories: [
      {
        Info: {
          $Id: Int,
          Name: 'text',
          Description: 'text'
        },
        Modes: [
          {
            $Id: Int,
            CanOverrideText: Bit,
            Name: 'text',
            Description: 'text',
            IsTutorial: Bit
          }
        ],
        Usage: Word
      }
    ],
    AutoVariantArcade: {
      CategoryId: Bit,
      ModeId: Bit,
      Options: '{bit}'
    },
    AutoVariantMelee: {
      CategoryId: Int,
      ModeId: Bit,
      Options: '{bit}'
    },
    DefaultVariants: [
      {
        CategoryId: Int,
        ModeId: Int,
        MinPlayers: Int,
        MaxPlayers: Int,
        TeamCount: Int,
        PlayersPerTeam: Int,
        Options: '{bit}',
        AIDifficulty: Int,
        PlayersPerTandem: Int
      }
    ],
    DefaultUIRace: 'race',
    MinCooldownDisplayDuration: Int,
    MinTimeDisplayDuration: Int,
    AchievementTags: '[word]',
    AltSoundtrack: [
      {
        AltSoundtrackName: 'link',
        Suffix: Word
      }
    ],
    TargetModeValidation: Word,
    MusicArray: '[word]',
    IntroMusic:  "soundtrack",
    PostGameMusic:  "soundtrack",
    CreditsMusic:  "soundtrack",
    LoopAmbience:  "soundtrack",
    ObjectGroupData: [
      {
        MinimapIcon: 'file',
        MinLevel: Int
      }
    ],
    LoadingScreenHelpIntro: [
      {
        Text: 'text'
      }
    ],
    LoadingScreenHelp: [
      {
        Text: 'text',
        Race: 'race'
      }
    ],
    LoadingBars: [
      {
        Name: 'text',
        FrameSuffix: Word
      }
    ],
    UnitKillRank: [
      {
        Text: 'text',
        MinKills: Int
      }
    ],
    ObserverSoundtrack: 'soundtrack',
    StrobeHaloEmission: Real,
    StrobeHighlightColor: 'ints',
    TutorialArray: [
      {
        Title: 'text',
        Icon: 'file',
        Movie: 'file'
      }
    ],
    MixRouting: [
      {
        index: Word,
        ParentCategory: Word
      }
    ],
    StartupMovieArray: [
      {
        Name: 'text',
        Path: 'file',
        Source: 'file'
      }
    ],
    HelpTechTitle: 'text',
    HelpGameMechanics: [
      {
        Icon: 'file',
        IconBackground: 'link',
        Name: 'text',
        Description: 'text'
      }
    ],
    HelpControlCategories: [
      {
        Name: 'text',
        Description: 'text'
      }
    ],
    HelpControls: [
      {
        Category: 'link',
        Name: 'text',
        Description: 'text',
        Basic: Bit
      }
    ],
    HotkeyInfoArray: [
      {
        index: Word,
        Category: 'link',
        Name: 'text',
        Tooltip: 'text'
      }
    ],
    CutsceneAssetPath: [
      {
        Path: 'file',
        Theme: Word
      }
    ],
    CutsceneThemeChoiceArray: '[link]',
    CutsceneLatest: Word,
    StrobeCycleLength: Int,
    StrobeFalloff: Real,
    StrobeHeight: Real,
    HelpTechTreeSuffix: Word,
    DSPArray: '[dsp]',
    HelpHiddenInGlue: Bit,
    DisplayScaledTime: Bit,
    ChallengeMasterAchievement: "achievement",
    ChallengeCategory: [
      {
        Challenge: [
          {
            Id: Word,
            Name: "text",
            Description: "text",
            Score: "link",
            MapPath: "file",
            ThumbnailImagePath: "file",
            IsAllowedInTrial: "int",
            Achievement: "[achievement]"
          }
        ],
        Name: "text"
      }
    ],
    Campaign: "[campaign]",
    ResourceArray: [{
      index: Word,
      Icon: 'file',
      IconBackground: "link",
      Tooltip: "text"
    }],
    TrialAllowedSinglePlayerMaps: "[file]",
    GlobalSoundData: {
      HeadphoneModeMinAngle: "real",
      HeadphoneModeMaxAngle: "real",
      HeadphoneModeFrequency: "real"
    },
    CustomLayoutFileArray: "[file]"
  },
  CPreload: {
    catalog: 'preload',
    Flags: "[int]",
    File: "file",
    NormalConditions: "bankcondition"
  },
  CPreloadActor: {
    prototype: 'CPreload',
    Link: 'actor'
  },
  CPreloadConversation: {
    prototype: 'CPreload',
    Link:  "conversation"
  },
  CPreloadModel: {
    prototype: 'CPreload',
    Link: "model"
  },
  CPreloadSound: {
    prototype: 'CPreload',
    Link: "sound"
  },
  CPreloadUnit: {
    prototype: 'CPreload',
    Link:  "uuit"
  },
  CPreloadScene: {
    prototype: 'CPreload',
  },
  CPreloadAsset: {
    prototype: 'CPreload',
  },
  CPremiumMap: {
    catalog: 'premiummap',
    Name: Word,
    StoreName: "text",
    ShortName: "text",
    StoreTypeName: "text",
    HyperlinkId: "link",
    ProductId: "int",
    LicenseId: "int",
    Price: "int",
    ScreenShotImageArray: "[file]",
    ScreenShotImageThumbnailArray: "[file]",
    ScreenShotDescriptionArray: "[text]",
    Movie: "file",
    MoviePreviewImage: "file",
    MovieImageThumbnail: "file",
    MovieDescription: "text",
    Description: "text",
    Title: "text",
    PayToPlay: "int",
    ShortDescription: "text",
    LanguageWarning: "text",
    CustomFeaturedDescription: "text"
  },
  CRaceBannerPack: {
    catalog: 'racebannerpack',
    Default: Int,
    RaceBannerArray: '[reward]',
    Name: "text",
    StoreName: "text",
    StoreTypeName: "text"
  },
  CReward: {
    catalog: 'reward',
    Name: "text",
    Description: "text",
    DescriptionUnearned: "text",
    $thumbnail: Word,
    $voicepack: Word,
    $prefix: Word,
    Category: {File:Word,Tag:Word},
    Flags: '{bit}',
    IconSlot: Int,
    IgnorePlayerRace: Int,
    Race: 'race',
    RaceBannerPack: Word,
    Image1v1: 'file',
    Image2v2: 'file',
    Image3v3: 'file',
    Image4v4: 'file',
    ReplacementArray : [{
      Catalog:Word,
      From:Word,
      To:Word
    }],
    License: 'string'
  },
  CRewardPoints: {prototype: 'CReward'},
  CRewardConsoleSkin: {
    prototype: 'CReward',
    ConsoleSkin: 'consoleskin',
    IconFile: "file",
    IconCols: "int",
    IconRows: "int"
  },
  CRewardDecal: {
    prototype: 'CReward',
    Texture: Word,
    IconFile: "file",
    IconCols: "int",
    IconRows: "int",
    Spray: Word,
    Description: "text",
    ParentBundle: "bundle",
    DescriptionUnearned: "text"
  },
  CRewardIcon: {
    prototype: 'CReward',
    IconFile: "file",
    IconCols: "int",
    IconRows: "int"
  },
  CRewardModel: {
    prototype: 'CReward',
    Model: 'model',
    IconCols: "int",
    IconRows: "int",
    IconFile: "file",
    Skin: 'skin',
    collection: Word,
    fileindex: Word,
    unit: "unit",
    ParentBundle: "bundle",
    Upgrades: "upgrade",
    Description: "text"
  },
  CRewardPortrait: {
    prototype: 'CReward',
    Model: Word,
    IconFile: "file",
    IconCols: "int",
    IconRows: "int",
    Description: "text",
    ParentBundle: "bundle",
    DescriptionUnearned: "text"
  },
  CRewardEmoticon: {
    prototype: 'CReward',
    IconFile: "file",
    IconCols: "int",
    IconRows: "int",
    Emoticon: Word
  },
  CRewardSpray: {
    prototype: 'CReward',
    Texture: Word,
    IconFile: "file",
    IconCols: "int",
    IconRows: "int",
    Spray: Word,
    Description: "text",
    ParentBundle: "bundle",
    DescriptionUnearned: "text"
  },
  CRewardRaceBanner: {
    prototype: 'CReward',
    IconFile: "file",
    IconCols: "int",
    IconRows: "int",
    Description: "text"
  },
  CRewardVoicePack: {
    prototype: 'CReward',
    VoicePack: Word,
    LargeImage: "file",
    license: Word
  },
  CRewardTrophy: {
    prototype: 'CReward',
    Trophy: "trophy"
  },
  CRewardPortraitInGame: {
    prototype: 'CReward',
    Enabled: "int"
  },
  CRewardSprayUseDecal: {
    prototype: 'CReward',
    Enabled: "int"
  },
  CStimPack: {
    catalog: 'stimpack',
    Name: "text",
    StoreName: "text",
    ShortName: "text",
    StoreTypeName: "text",
    ProductId: "int",
    Duration: "int",
    ReleaseDate: "link"
  },
  CTalentProfile: {
    catalog: 'talentprofile',
    Name: "text"
  },
  CTrophy: {
    catalog: 'trophy',
    CutsceneFile: "file",
    GameModel: Word,
    Skin: 'skin',
    DefinitionId: "int",
    TopCutsceneFilter: Word,
    BottomCutsceneFilter: Word
  },
  CWarChest: {
    catalog: 'warchest',
    Name: "text",
    StoreName: "text",
    ShortName: "text",
    HyperlinkId: "link",
    StoreTypeName: "text",
    ReleaseDate: "link",
    ProductId: "int",
    SeasonId: "warchestseason",
    CelebrationString: Word,
    Default: "int",
    IsBundle: "int"
  },
  CWarChestSeason: {
    catalog: 'warchestseason',
    Name: "text",
    ESportsSeason: "text",
    ESportsName: "text",
    ESportsLocation: "text",
    ESportsDate: "link",
    ESportsShowPlayers: "int",
    HowItWorks1: "text",
    HowItWorks2: "text",
    HowItWorks3: "text",
    HowItWorks4: "text",
    LearnMoreTitle1: "text",
    LearnMoreTitle2: "text",
    LearnMoreTitle3: "text",
    LearnMoreDescription1: "text",
    LearnMoreDescription2: "text",
    LearnMoreDescription3: "text",
    LearnMoreImage1: "file",
    LearnMoreImage2: "file",
    LearnMoreImage3: "file",
    PurchaseTitle: "text",
    PurchaseDescription: "text",
    PurchaseWarning: "text",
    PurchaseImage: "file"
  }
}

export const LibrarySchema = {
  $Id: Word,
  Root: [{
    Item: [{ Id: Word, Library: Word, Type: Word}],
    Library: Word,
    Type: Word,
    Id: Word
  }],
  Element: [{
    $Type: Word,
    $Id: Word,
    Internal: [{}],
    Disabled: [{}],
    FlagAction: [{}],
    FlagCall: [{}],
    FlagInline: [{}],
    InitOff: [{}],
    PresetInteger: [{}],
    ParamFlagPreload: [{}],
    FlagCondition: [{}],
    FlagCreateThread: [{}],
    PresetGenConstVar: [{}],
    ValueTypeInfo: [{Value: 'string'}],
    ValueContext: [{Value: 'string'}],
    ExpressionCode: [{Value: 'string'}],
    Item: [{ Id: Word, Library: Word, Type: Word}],
    Label: [{ Id: Word, Library: Word, Type: Word}],
    Action: [{ Id: Word, Library: Word, Type: Word}],
    FunctionDef: [{ Id: Word, Library: Word, Type: Word}],
    ParameterDef: [{ Id: Word, Library: Word, Type: Word}],
    Variable: [{ Id: Word, Library: Word, Type: Word}],
    Array: [{ Id: Word, Library: Word, Type: Word}],
    VariableType: [{
      Type:[{Value:"string"}],
      Constant: [{}],
      GameType: [{Value:Word}],
      ArraySize: [{
        Dim:"int",
        Value:"int",
        Type: "Variable",
        Library: "NHBR",
        Id: "4B02FA25"
      }]
    }],
    ValueElement: [{ Id: Word, Library: Word, Type: Word}],
    ValuePreset: [{ Id: Word, Library: Word, Type: Word}],
    Preset: [{ Id: Word, Library: Word, Type: Word}],
    Parameter: [{ Id: Word, Library: Word, Type: Word}],
    ValueParam: [{ Id: Word, Library: Word, Type: Word}],
    ExpressionParam: [{ Id: Word, Library: Word, Type: Word}],
    Default: [{ Id: Word, Library: Word, Type: Word}],
    ParameterType: [{
      Type:[{Value:Word}],
      TypeElement:[{Type:Word,Library:Word,Id:Word}],
      GameType : [{Value:Word}],
      EntryType : [{Value:Word}]
    }],
    FunctionCall: [{ Id: Word, Library: Word, Type: Word}],
    SubFunctionType: [{ Id: Word, Library: Word, Type: Word}],
    Event: [{ Id: Word, Library: Word, Type: Word}],
    Condition: [{ Id: Word, Library: Word, Type: Word}],
    ValueId: [{ Id: Word}],
    ValueType: [{ Type: Word}],
    ValueGameType: [{ Type: Word}],
    BaseType: [{ Type: Word, Value:Word}],
    ReturnType: [{
      Type: [{Value: Word}],
      GameType: [{ Type: Word , Value: Word}],
      TypeElement: [{ Id: Word, Library: Word, Type: Word}],
    }],
    CustomType: [{ Type: Word}],
    ExpressionType: [{ Type: Word}],
    Comment:  [{'%value' : 'string' }],
    Value: [{ Id: Word, Library: Word, Type: Word , '%value': 'string'}],
    Identifier: [{'%value' : 'string' }],
    ExpressionText:  [{'%value': 'string'}],
    ScriptCode: [{'%value': 'string'}],
    InitFunc:  [{'%value': 'string'}],
    //'_Value': 'string'   //<Value>UED</Value>
    // <Value Type="Param" Library="UEDC" Id="5E564F11"/>
  }]
}

