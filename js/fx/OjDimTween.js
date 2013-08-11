OJ.importJs('oj.fx.OjPropTween');
OJ.importJs('oj.fx.OjTweenEvent');


'use strict';

OJ.extendClass(
	'OjDimTween', [OjPropTween],
	{
		'_props_' : {
			'amount'    : null,
			'direction' : 'dimTweenBoth'
		},


		'_constructor' : function(/*target, direction, amount, duration, easing*/){
			this._super(OjPropTween, '_constructor', []);

			var ln = arguments.length;

			this._to = {};

			if(ln){
				this.setTarget(arguments[0]);

				if(ln > 1){
					this.setDirection(arguments[1]);

					if(ln > 2){
						this.setAmount(arguments[2]);

						if(ln > 3){
							this.setDuration(arguments[3]);

							if(ln > 4){
								this.setEasing(arguments[4]);
							}
						}
					}
				}
			}
		}
	},
	{
		'HORIZONTAL' : 'dimTweenHorizontal',
		'VERTICAL'   : 'dimTweenVertical',
		'BOTH'       : 'dimTweenBoth'
	}
);