export const structure = {
    "units:CUnit(id)": {
        Description: "SC2Text",
        Name: "SC2Text",
        Race: "SC2LinkRace",
        TechAliasArray: "String",
        "ObjectFamily:EditorCategories": "SC2EditorObjectFamily",
        "ObjectType:EditorCategories": "SC2EditorObjectType",
        "CargoSize": "Number",
        "Speed": "Number",
        "Sight": "Number",
        "Food": "Number",
        "EnergyMax": "Number",
        "LifeMax": "Number",
        "ShieldsMax": "Number",
        "ShieldArmor": "Number",
        "LifeArmor": "Number",
        "GlossaryPriority": "Number",
        "CostResource": {value: "Number"},
        "Attributes": {value: "Number"},
        BehaviorArray: [{Link: "String"}],
        "WeaponArray": [{Link: "String"}],
        "GlossaryStrongArray": [{value: "SC2LinkUnit"}],
        "GlossaryWeakArray": [{value: "SC2LinkUnit"}],
        "AbilArray": [{Link: "String"}],
        CardLayouts: [{
            LayoutButtons: [{
                Face: "SC2LinkButton",
                AbilCmd: "SC2LinkAbilCmd",
                Row: "Number",
                Column: "Number"
            }]
        }],
        "NoPlacement:EditorFlags{index=NoPlacement}": "Number",
        "NoPalettes:EditorFlags{index=NoPalettes}": "Number"
    },
    "effects:CEffectEnumArea,CEffectDamage,CEffectApplyBehavior,CEffectRemoveBehavior,CEffectCreatePersistent,CEffectModifyUnit,CEffectLaunchMissile,CEffectSet,CEffectIssueOrder,CEffectCreateUnit,CEffectAddTrackedUnit,CEffectModifyPlayer,CEffectSwitch,CEffectTeleport,CEffectTransferBehavior,CEffectDestroyPersistent,CEffectCreateHealer,CEffectApplyForce,CEffectUseCalldown,CEffectUseMagazine,CEffectReleaseMagazine,CEffectCancelOrder,CEffectEnumTransport,CEffectEnumMagazine,CEffectRedirectMissile,CEffectReturnMagazine,CEffectAddTrackedUnits,CEffectApplyKinetic,CEffectEnumTrackedUnits,CEffectMorph,CEffectUserData,CEffectRemoveKinetic,CEffectLoadContainer,CEffectRemoveTrackedUnit,CEffectRandomPointInCircle,CEffectEnumInventory(id)": {
        "Race:EditorCategories": "SC2EditorRace",
        Amount: "Number",
        Kind: "String",
        AttributeBonus: {value: "Number"}
    },
    "actors:CActorUnit,CActorMissile(id)": {
        LifeArmorIcon: "SC2Icon",
        ShieldArmorIcon: "SC2Icon",
        "Race:EditorCategories": "SC2EditorRace",
        "icon:UnitIcon": "SC2Icon",
        "wireframe:Wireframe.Image": "SC2Icon",
        "events:On": [{Terms: "String", Send: "String"}],
        "unitname:unitName": "SC2LinkUnit",
        art: "SC2Token",
        unit: "SC2LinkUnit",
        "deftype:defType": "SC2Token"
    },
    "races:CRace(id)": {
        AttributeId: "String",
        Icon: "SC2Icon",
        "color:MiniMapBorderColor": "SC2Color"
    },
    "buttons:CButton(id)": {
        Tooltip: "SC2Text",
        Name: "SC2Text",
        Race: "SC2EditorRace",
        Icon: "SC2Icon",
        art: "SC2Token",
        num: "SC2Token"
    },
    "upgrades:CUpgrade(id)": {
        Name: "SC2Text",
        Race: "SC2LinkRace",
        Icon: "SC2Icon",
        TechAliasArray: "String",
        "icon:icon": "SC2Token",
        "units:AffectedUnitArray": [{value: "SC2LinkUnit"}],
        path: "SC2Token",
        lvl: "SC2Token"
    },
    "behaviors:CBehaviorBuff(id)": {
        Tooltip: "SC2Text",
        Name: "SC2Text",
        Race: "SC2EditorRace",
        InfoIcon: "SC2Icon",
        Duration: "Number"
    },
    "scores:CScoreValueCustom(id)": {
        Race: "SC2EditorRace"
    },
    "weapons:CWeaponLegacy(id)|CWeaponStrafe(id)": {
        Name: "SC2Text",
        "Melee:Options{index=Melee}": "Number",
        Race: "SC2EditorRace",
        Icon: "SC2Icon",
        DisplayEffect: "SC2LinkEffect",
        DisplayAttackCount: "Number",
        Range: "Number",
        MinScanRange: "Number",
        TargetFilters: "String",
        Period: "Number",
        Effect: "SC2LinkEffect",
        "atktype:atkType": "SC2Token"
    },
    "abilities:CAbilStop(id)": {
        Name: "SC2Text",
        Race: "SC2EditorRace",
        "button:CmdButtonArray{index=Stop}.DefaultButtonFace": "SC2LinkButton",
        "Requirements:CmdButtonArray{index=Stop}.Requirements": "SC2LinkRequirement"
    },
    "abilities:CAbilMove(id)": {
        Name: "SC2Text",
        Race: "SC2EditorRace",
        "button:CmdButtonArray{index=Move}.DefaultButtonFace": "SC2LinkButton",
        "Requirements:CmdButtonArray{index=Move}.Requirements": "SC2LinkRequirement"
    },
    "abilities:CAbilMerge(id)": {
        Name: "SC2Text",
        Race: "SC2EditorRace",
        "button:CmdButtonArray{index=WithTarget}.DefaultButtonFace": "SC2LinkButton",
        "Requirements:CmdButtonArray{index=WithTarget}.Requirements": "SC2LinkRequirement"
    },
    "abilities:CAbilTransport(id)": {
        Name: "SC2Text",
        Race: "SC2EditorRace",
        "button:CmdButtonArray{index=Load}.DefaultButtonFace": "SC2LinkButton",
        "Requirements:CmdButtonArray{index=Load}.Requirements": "SC2LinkRequirement"
    },
    "abilities:CAbilBehavior(id)": {
        Name: "SC2Text",
        Race: "SC2EditorRace",
        "button:CmdButtonArray{index=On}.DefaultButtonFace": "SC2LinkButton",
        "Requirements:CmdButtonArray{index=On}.Requirements": "SC2LinkRequirement"
    },
    "abilities:CAbilAugment(id),CAbilAttack(id),CAbilEffectInstant(id),CAbilEffectTarget(id),CAbilMorph(id),CAbilMorphPlacement(id),CAbilRedirectInstant(id),CAbilRedirectTarget(id)": {
        Race: "SC2EditorRace",
        Name: "SC2Text",
        "button:CmdButtonArray{index=Execute}.DefaultButtonFace": "SC2LinkButton",
        "Requirements:CmdButtonArray{index=Execute}.Requirements": "SC2LinkRequirement",
        toUnit: "SC2Token"
    },
    "requirements:CRequirement(id)": {
        "Node:NodeArray{index=Use}.Link": "SC2LinkRequirementNode",
    },
    "requirementNodes:CRequirementCountUnit(id)": {
        "Unit:Count.Link": "String",
    },
    "requirementNodes:CRequirementCountUpgrade(id)": {
        "Upgrade:Count.Link": "String",
    },
    "abilities:CAbilArmMagazine(id),CAbilBuild(id),CAbilResearch(id),CAbilSpecialize(id),CAbilTrain(id),CAbilWarpTrain(id)": {
        Race: "SC2EditorRace",
        Name: "SC2Text",
        "info:InfoArray": {
            "CostResource": {value: "Number"},
            Time: "Number",
            Unit: [{value: "SC2LinkUnit"}],
            Upgrade: "SC2LinkUpgrade",
            Effect: "SC2LinkEffect",
            "button:Button.DefaultButtonFace": "SC2LinkButton",
            "Requirements:Button.Requirements": "SC2LinkRequirement"
        }
    },
    "commanders:CUser{id=Commanders}.Instances(Id)": {
        "icon:Image{Field.Id=Icon}.Image": "SC2Icon",
        "race:GameLink{Field.Id=Race}.GameLink": "SC2LinkRace"
    },
    "CommanderType:CUser{id=CommanderType}.Instances": [{
        "id:Id": "String"
    }],
    "replacementFields:CUser{id=Replacements}.Fields(Id)": [{
        "id:Id": "String", Type: "SC2LinkType",
        "Type:GameLinkType": "SC2LinkType",
        "Type:UserType": "SC2LinkType",
        EditorColumn: "Number"
    }],
    "TechFields:CUser{id=Tech}.Fields(Id)": [{
        "id:Id": "String", Type: "SC2LinkType",
        "Type:GameLinkType": "SC2LinkType",
        "Type:UserType": "SC2LinkType",
        EditorColumn: "Number"
    }],
    "Tech:CUser{id=Tech}.Instances(Id)": [{
        "id:Id": "String",
        "ability:AbilCmd{Field.Id=ability}": "SC2AbilCmd",
        "state:User{Field.Id=state}.Instance": "SC2LinkUserState",
        "tech:User{Field.Id=tech}.Instance": "SC2LinkUserTech",
        "commander:User{Field.Id=commander}.Instance": "SC2LinkUserCommander",
        "prestige:User{Field.Id=prestige}.Instance": "SC2LinkUserPrestige",
        "unit:Unit{Field.Id=unit}.Unit": "SC2LinkUnit",
        "level:Int{Field.Id=level}.Int": "SC2LinkUserLevel",
        "upgrade:Upgrade{Field.Id=upgrade}.Upgrade": "SC2LinkUpgrade",
        "behavior:GameLink{Field.Id=behavior}.GameLink": "SC2LinkBehavior"
    }],
    "replacement:CUser{id=Replacements}.Instances(Id)": [{
        "id:Id": "String",
        "@unit:Unit{Field.Id=@unit}.Unit": "SC2LinkUnit",
        "Protoss:Fixed{Field.Id=Protoss}.Fixed": "Number",
        "ProtossUnit:Unit{Field.Id=ProtossUnit}.Unit": "SC2LinkUnit",
        "Terran:Fixed{Field.Id=Terran}.Fixed": "Number",
        "TerranUnit:Unit{Field.Id=TerranUnit}.Unit": "SC2LinkUnit",
        "Zerg:Fixed{Field.Id=Zerg}.Fixed": "Number",
        "ZergUnit:Unit{Field.Id=ZergUnit}.Unit": "SC2LinkUnit",
        "Evolved:Fixed{Field.Id=Evolved}.Fixed": "Number",
        "EvolvedUnit:Unit{Field.Id=EvolvedUnit}.Unit": "SC2LinkUnit",
        "DominionUnit:Unit{Field.Id=DominionUnit}.Unit": "SC2LinkUnit",
        "Dominion:Fixed{Field.Id=Dominion}.Fixed": "Number",
        "InfestedUnit:Unit{Field.Id=InfestedUnit}.Unit": "SC2LinkUnit",
        "Infested:Fixed{Field.Id=Infested}.Fixed": "Number",
        "TaldarimUnit:Unit{Field.Id=TaldarimUnit}.Unit": "SC2LinkUnit",
        "Taldarim:Fixed{Field.Id=Taldarim}.Fixed": "Number",
        "OutlawsUnit:Unit{Field.Id=OutlawsUnit}.Unit": "SC2LinkUnit",
        "Outlaws:Fixed{Field.Id=Outlaws}.Fixed": "Number",
        "Marauders:Fixed{Field.Id=Marauders}.Fixed": "Number",
        "MaraudersUnit:Unit{Field.Id=MaraudersUnit}.Unit": "SC2LinkUnit",
        "IhanRii:Fixed{Field.Id=IhanRii}.Fixed": "Number",
        "IhanRiiUnit:Unit{Field.Id=IhanRiiUnit}.Unit": "SC2LinkUnit",
        "Purifiers:Fixed{Field.Id=Purifiers}.Fixed": "Number",
        "PurifiersUnit:Unit{Field.Id=PurifiersUnit}.Unit": "SC2LinkUnit",
        "Primal:Fixed{Field.Id=Primal}.Fixed": "Number",
        "PrimalUnit:Unit{Field.Id=PrimalUnit}.Unit": "SC2LinkUnit",
        "Simulant:Fixed{Field.Id=Simulant}.Fixed": "Number",
        "SimulantUnit:Unit{Field.Id=SimulantUnit}.Unit": "SC2LinkUnit",
        "CovertOps:Fixed{Field.Id=CovertOps}.Fixed": "Number",
        "CovertOpsUnit:Unit{Field.Id=CovertOpsUnit}.Unit": "SC2LinkUnit",
        "Leviathan:Fixed{Field.Id=Leviathan}.Fixed": "Number",
        "LeviathanUnit:Unit{Field.Id=LeviathanUnit}.Unit": "SC2LinkUnit",
        "UEDUnit:Unit{Field.Id=UEDUnit}.Unit": "SC2LinkUnit",
        "UED:Fixed{Field.Id=UED}.Fixed": "Number",
        "GenetronUnit:Unit{Field.Id=GenetronUnit}.Unit": "SC2LinkUnit",
        "Genetron:Fixed{Field.Id=Genetron}.Fixed": "Number",
        "XayidUnit:Unit{Field.Id=XayidUnit}.Unit": "SC2LinkUnit",
        "Xayid:Fixed{Field.Id=Xayid}.Fixed": "Number",
        "KeironUnit:Unit{Field.Id=KeironUnit}.Unit": "SC2LinkUnit",
        "Keiron:Fixed{Field.Id=Keiron}.Fixed": "Number",
        "HybridsUnit:Unit{Field.Id=HybridsUnit}.Unit": "SC2LinkUnit",
        "Hybrids:Fixed{Field.Id=Hybrids}.Fixed": "Number",
        "UPLUnit:Unit{Field.Id=UPLUnit}.Unit": "SC2LinkUnit",
        "UPL:Fixed{Field.Id=UPL}.Fixed": "Number",
        "DragonUnit:Unit{Field.Id=DragonUnit}.Unit": "SC2LinkUnit",
        "Dragon:Fixed{Field.Id=Dragon}.Fixed": "Number",
        "HumansUnit:Unit{Field.Id=HumansUnit}.Unit": "SC2LinkUnit",
        "Humans:Fixed{Field.Id=Humans}.Fixed": "Number"
    }],
    "prestiges:CUser{id=Prestiges}.Instances(Id)": {
        "button:GameLink{Field.Id=Icon}.GameLink": "SC2LinkButton"
    }
}
