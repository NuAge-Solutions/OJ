OJ.importJs('oj.fx.PropTween');
OJ.importJs('oj.fx.TweenEvent');


'use strict';

OJ.compileClass(
	'OjDimTween',
	oj.fx.DimTween = function(){
		return new oj.fx.PropTween(
			arguments, 'OjDimTween',
			{
				'_properties_' : {
					'amount'    : null,
					'direction' : OjDimTween.BOTH
				},


				'_constructor' : function(/*target, direction, amount, duration, easing*/){
					this._super('OjDimTween', '_constructor', []);

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
			}
		);
	},
	{
		'HORIZONTAL' : 'dimTweenHorizontal',
		'VERTICAL'   : 'dimTweenVertical',
		'BOTH'       : 'dimTweenBoth'
	}
);