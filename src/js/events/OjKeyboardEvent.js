importJs("oj.events.OjDomEvent");




OJ.extendClass(
    "OjKeyboardEvent", [OjDomEvent],
    {
        "_get_props_" : {
            "key_code": null
        },

        "_constructor" : function(type, key_code, bubbles, cancelable){
            this._super(OjDomEvent, "_constructor", [type, bubbles, cancelable]);

            this._key_code = key_code;
        },


        "clone" : function(){
            const clone = this._super(OjDomEvent, "clone", arguments);

            clone._key_code = this._key_code;

            return clone;
        }
    },
    {
        "convertDomEvent" : function(evt){
            let type;

            evt = OjDomEvent.normalizeDomEvent(evt);

            if(evt.type == OjDomEvent.KEY_DOWN){
                type = OjKeyboardEvent.DOWN;
            }
            else if(evt.type == OjDomEvent.KEY_PRESS){
                type = OjKeyboardEvent.PRESS;
            }
            else if(evt.type == OjDomEvent.KEY_UP){
                type = OjKeyboardEvent.UP;
            }

            return new OjKeyboardEvent(type, evt.keyCode, true, true);
        },

        "isKeyboardEvent" : function(type){
            return type == OjKeyboardEvent.DOWN || type == OjKeyboardEvent.PRESS || type == OjKeyboardEvent.UP;
        },

        "isKeyboardDomEvent" : function(type){
            return type == OjDomEvent.KEY_DOWN || type == OjDomEvent.KEY_PRESS || type == OjDomEvent.KEY_UP;
        },

        "DOWN"  : "onKeyDown",
        "PRESS" : "onKeyPress",
        "UP"    : "onKeyUp",

        "SHOW"  : "onKeyboardShow",
        "HIDE"  : "onKeyboardHide"
    }
);