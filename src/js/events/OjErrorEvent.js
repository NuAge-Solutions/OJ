importJs('oj.events.OjTextEvent');


OJ.extendClass(
    'OjErrorEvent', [OjTextEvent],
    {
        '_get_props_' : {
            'code'    : 0
        },


        '_constructor' : function(type/*, text = null, code = 0, bubbles = false, cancelable = false*/){
            var args = Array.array(arguments),
                ln = args.length;

            if(ln > 2){
                this._code = args[2];

                args.removeAt(2);
            }

            this._super(OjTextEvent, '_constructor', args);
        }
    },
    {
        'ERROR' : 'onError'
    }
);