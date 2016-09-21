importJs('oj.events.OjDomEvent');




OJ.extendClass(
    'OjFocusEvent', [OjDomEvent],
    {},
    {
        'convertDomEvent' : function(evt){
            var type;

            evt = OjDomEvent.normalizeDomEvent(evt);

            if(evt.type == OjDomEvent.FOCUS_IN){
                type = OjFocusEvent.IN;
            }
            else if(evt.type == OjDomEvent.FOCUS_OUT){
                type = OjFocusEvent.OUT;
            }

            return new OjFocusEvent(type, true, true);
        },

        'isFocusEvent' : function(type){
            return type == OjFocusEvent.IN || type == OjFocusEvent.OUT;
        },

        'isFocusDomEvent' : function(type){
            return type == OjDomEvent.FOCUS_IN || type == OjDomEvent.FOCUS_OUT;
        },


        'IN'  : 'onFocusIn',
        'OUT' : 'onFocusOut'
    }
);