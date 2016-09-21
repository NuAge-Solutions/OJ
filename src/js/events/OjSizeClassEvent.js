importJs("oj.events.OjEvent");


OJ.extendClass(
    "OjSizeClassEvent", [OjEvent],
    {
        "_get_props_" : {
            "sizes" : null,
            "prev"  : null
        },


        "_constructor" : function(type, sizes, prev, bubbles, cancelable){
            var self = this;

            self._super(OjEvent, "_constructor", [type, bubbles, cancelable]);

            self._prev = prev;
            self._sizes = sizes;
        },


        "clone" : function(){
            var self = this,
                clone = self._super(OjEvent, "clone", arguments);

            clone._prev = self._prev;
            clone._sizes = self._sizes;

            return clone;
        }
    },
    {
        "CHANGE"   : "onSizeClassChange"
    }
);