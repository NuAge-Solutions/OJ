importJs('oj.events.OjEvent');




OJ.extendClass(
    'OjHttpStatusEvent', [OjEvent],
    {
        '_get_props_' : {
            'status' : null
        },


        '_constructor' : function(type/*, status = 0, bubbles = false, cancelable = false*/){
            var bubbles = false,
                cancelable = false,
                args = arguments,
                ln = args.length;

            if(ln > 1){
                this._status = args[1];

                if(ln > 2){
                    bubbles = args[2];

                    if(ln > 3){
                        cancelable = args[3];
                    }
                }
            }

            this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
        }
    },
    {
        'HTTP_STATUS' : 'onHttpStatus'
    }
);