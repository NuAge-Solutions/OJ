importJs("oj.events.OjDomEvent");


OJ.extendClass(
    "OjUiEvent", [OjDomEvent],
    {
        "_get_props_" : {
            "pageX" : NaN,
            "pageY" : NaN
        },


        "_constructor" : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
            var args = Array.array(arguments),
                ln = args.length;

            if(ln > 1){
                this._pageX = args.removeAt(1)[0];

                if(ln > 2){
                    this._pageY = args.removeAt(1)[0];
                }
            }

            this._super(OjDomEvent, "_constructor", args);
        },


        "clone" : function(){
            var clone = this._super(OjDomEvent, "clone", arguments);

            clone._pageX = this._pageX;
            clone._pageY = this._pageY;

            return clone;
        }
    },
    {
        "_evt_map" : {
            "click"        : "onPress",
            "contextmenu"  : "onUp",
            "dblclick"     : "onDoublePress",
            "mousedown"    : "onDown",
            "mousemove"    : "onMove",
            "mouseover"    : "onOver",
            "mouseout"     : "onOut",
            "mouseup"      : "onUp",
            "mousewheel"   : "onWheel"
        },

        "convertDomEvent" : function(evt){
            var norm = evt = OjDomEvent.normalizeDomEvent(evt),
                type = this._evt_map[norm.type];

            if(type == OjUiEvent.PRESS){
                // todo: OjUiEvent - add middle and right click event detection
            }

            var new_evt = new OjUiEvent(type, norm.pageX, norm.pageY, norm.bubbles, norm.cancelable);
            new_evt._target = OjElement.element(norm.target);
            new_evt._current_target = OjElement.element(norm.current_target);
            new_evt._source = evt;

            return new_evt;
        },

        "isMouseEvent" : function(type){
            var k;

            for(k in this._evt_map){
                if(type == this._evt_map[k]){
                    return true;
                }
            }

            return false;
        },

        "isMouseDomEvent" : function(type){
            var k;

            for(k in this._evt_map){
                if(type == k){
                    return true;
                }
            }

            return false;
        },

        "PRESS"           : "onPress",
        "DOUBLE_PRESS"    : "onDoublePress",
        "MIDDLE_PRESS"    : "onMiddlePress",
        "RIGHT_PRESS"  : "onRightPress",

        "DOWN"            : "onDown",
        "RIGHT_DOWN"   : "onRightDown",

        "UP"           : "onUp",
        "UP_OUTSIDE"   : "onUpOutside",
        "RIGHT_UP"     : "onRightUp",

        "MOVE"         : "onMove",
        "OVER"         : "onOver",
        "OUT"          : "onOut",

        "WHEEL"        : "onWheel"
    }
);