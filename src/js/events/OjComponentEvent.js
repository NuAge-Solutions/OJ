importJs("oj.events.OjEvent");


OJ.extendClass(
    "OjComponentEvent", [OjEvent],
    { },
    {
        "ACTIVE" : "onActive",
        "INACTIVE" : "onInactive",
        "ACTIVE_CHANGE" : "onActiveChange",
        "ENABLED" : "onEnabled",
        "DISABLED" : "onDisabled",
        "ENABLED_CHANGE" : "onEnabledChange"
    }
);