importJs("oj.events.OjEvent");




OJ.extendClass(
    "OjDomEvent", [OjEvent],
    {
        "cancel" : function(){
            var self = this,
                src = self._source;

            if(self._cancelable){
                if(src){
                    try{ src.preventDefault(); } catch(e){}
                    try{ src.stopPropagation(); } catch(e){}
                }

                self._super(OjEvent, "cancel", arguments);
            }
        }
    },
    {
        "normalizeDomEvent" : function(evt){
            if(!evt){
                evt = window.event;
            }

            // todo: figure out a better way to handle FF not liking us changing event properties
            var new_evt = OJ.merge({}, evt); // because FF sucks

            if(new_evt.clientX || new_evt.clientY){
                new_evt.pageX = new_evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                new_evt.pageY = new_evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            if(new_evt.which){
                new_evt.rightClick = new_evt.which == 3;
            }
            else if(new_evt.button){
                new_evt.rightClick = new_evt.button == 2;
            }

            return new_evt;
        },

        "convertDomEvent" : function(evt){
            var norm = OjDomEvent.normalizeDomEvent(evt),
                new_evt = new OjDomEvent(norm.type, true, true);

            new_evt._source = evt;

            return new_evt;
        },

        // mouse events
        "PRESS"        : "click",
        "DOUBLE_PRESS" : "dblclick",
        "MOUSE_DOWN"   : "mousedown",
        "MOUSE_MOVE"   : "mousemove",
        "MOUSE_OVER"   : "mouseover",
        "MOUSE_OUT"    : "mouseout",
        "MOUSE_UP"     : "mouseup",
        "MOUSE_WHEEL"  : "mousewheel",

        // keyboard events
        "KEY_DOWN"  : "keydown",
        "KEY_PRESS" : "keypress",
        "KEY_UP"    : "keyup",

        // focus events
        "FOCUS_IN"  : "focus",
        "FOCUS_OUT" : "blur",

        // form events
        "CHANGE" : "change",

        // scroll events
        "SCROLL" : "scroll",

        // touch events
        "TOUCH_CANCEL" : "touchcancel",
        "TOUCH_END"    : "touchend",
        "TOUCH_LEAVE"  : "touchleave",
        "TOUCH_MOVE"   : "touchmove",
        "TOUCH_START"  : "touchstart",

        // orientation events
        "ORIENTATION_CHANGE" : "orientationchange"
    }
);