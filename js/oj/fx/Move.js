OJ.importJs('oj.fx.DimTween');


'use strict';

OJ.compileClass(
	'OjMove',
	oj.fx.Move = function(){
		return new oj.fx.DimTween(
			arguments, 'OjMove',
			{
				'setAmount' : function(amount){
					this._super('OjMove', 'setAmount', arguments);

					if(this._direction == OjMove.BOTH){
						this._to.x = amount[0];
						this._to.y = amount[1];
					}
					else if(this._direction == OjMove.X){
						this._to.x = amount;
					}
					else{
						this._to.y = amount;
					}
				}
			}
		);
	},
	{
		'X'    : OjDimTween.HORIZONTAL,
		'Y'    : OjDimTween.VERTICAL,
		'BOTH' : OjDimTween.BOTH
	}
);