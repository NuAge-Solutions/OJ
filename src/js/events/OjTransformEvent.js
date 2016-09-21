importJs("oj.events.OjEvent");


OJ.extendClass(
    "OjTransformEvent", [OjEvent],
    {
        "_get_props_" : {
            "rect"   : 0,
            "prev"   : 0,
            "delta"  : 0
        },


        "_constructor" : function(type, rect, prev, bubbles, cancelable){
            var self = this;

            self._super(OjEvent, "_constructor", [type, bubbles, cancelable]);

            self._prev = prev;
            self._rect = rect;

            self._delta = rect.delta(prev);
        },


        "clone" : function(){
            var self = this,
                clone = self._super(OjEvent, "clone", arguments);

            clone._delta = self._delta;
            clone._prev = self._prev;
            clone._rect = self._rect;

            return clone;
        }
    },
    {
        "MOVE"   : "onMove",
        "RESIZE" : "onResize"
    }
);