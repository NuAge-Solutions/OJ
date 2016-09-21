importJs('oj.events.OjEvent');




OJ.extendClass(
    'OjTextEvent', [OjEvent],
    {
        '_get_props_' : {
            'text' : ''
        },


        '_constructor' : function(type/*, text = "", bubbles = false, cancelable = false*/){
            var cancelable, bubbles = cancelable = false, ln = arguments.length;

            if(ln > 1){
                this._text = arguments[1];

                if(ln > 2){
                    bubbles = arguments[2];

                    if(ln > 3){
                        cancelable = arguments[3];
                    }
                }
            }

            this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
        }
    },
    {
        'TEXT' : 'onText'
    }
);