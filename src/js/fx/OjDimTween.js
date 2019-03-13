importJs("oj.fx.OjPropTween");
importJs("oj.fx.OjTweenEvent");


OJ.extendClass(
    "OjDimTween", [OjPropTween],
    {
        "_props_" : {
            "amount"    : null,
            "direction" : null
        },


        "_constructor" : function(target, direction, amount, duration, easing, units){
            this._super(OjPropTween, "_constructor", []);

            this._to = {};

            this._set("target", target);
            this._set("direction", direction, this._static.BOTH);
            this._set("amount", amount);
            this._set("duration", duration, 250);
            this._set("easing", easing, OjEasing.NONE);
            this._set("units", units, OJ.dim_unit);
        }
    },
    {
        "HORIZONTAL" : "dimTweenHorizontal",
        "VERTICAL"   : "dimTweenVertical",
        "BOTH"       : "dimTweenBoth"
    }
);