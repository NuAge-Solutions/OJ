importJs('oj.events.OjEvent');




OJ.extendClass(
    'OjTweenEvent', [OjEvent],
    {
        '_get_props_' : {
            'progress' : 0,
            'value'    : 0
        },


        '_constructor' : function(type, value, progress/*, bubbles = false, cancelable = false*/){
            var progress = 0,
                bubbles = false,
                cancelable = false,
                args = arguments,
                ln = args.length;

            this._value = value;
            this._progress = progress;

            if(ln > 3){
                bubbles = args[3];

                if(ln > 4){
                    cancelable = args[4];
                }
            }

            this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
        }
    },
    {
        'TICK'     : 'onTweenTick',
        'COMPLETE' : 'onTweenComplete'
    }
);