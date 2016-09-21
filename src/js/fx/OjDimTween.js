importJs('oj.fx.OjPropTween');
importJs('oj.fx.OjTweenEvent');


OJ.extendClass(
    'OjDimTween', [OjPropTween],
    {
        '_props_' : {
            'amount'    : null,
            'direction' : null
        },


        '_constructor' : function(/*target, direction, amount, duration, easing, units*/){
            var self = this;

            self._super(OjPropTween, '_constructor', []);

            self._to = {};

            self._processArguments(arguments, {
                'target' : undefined,
                'direction' : self._static.BOTH,
                'amount': undefined,
                'duration' : 250,
                'easing' : OjEasing.NONE,
                'units' : OJ.dim_unit
            });
        }
    },
    {
        'HORIZONTAL' : 'dimTweenHorizontal',
        'VERTICAL'   : 'dimTweenVertical',
        'BOTH'       : 'dimTweenBoth'
    }
);