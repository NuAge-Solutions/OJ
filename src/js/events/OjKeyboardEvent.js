importJs("oj.events.OjDomEvent");




OJ.extendClass(
    "OjKeyboardEvent", [OjDomEvent],
    {
        "_get_props_" : {
            "key": null,
            "key_code": null,
            "is_enter": null
        },

        "_constructor" : function(type, key, key_code, bubbles, cancelable){
            this._super(OjDomEvent, "_constructor", [type, bubbles, cancelable]);

            this._key = key;
            this._key_code = key_code;
        },


        "clone" : function(){
            const clone = this._super(OjDomEvent, "clone", arguments);

            clone._key = this._key;
            clone._key_code = this._key_code;

            return clone;
        },

        ".is_enter" : function(){
            return this._key == "Enter" || this._key_code == 13;
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

            return new OjKeyboardEvent(type, evt.key, evt.keyCode, true, true);
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
