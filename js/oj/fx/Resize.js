OJ.importJs('oj.fx.DimTween');


'use strict';

OJ.extendClass(
	OjDimTween, 'OjResize',
	{
		'setAmount' : function(amount){
			this._s('OjResize', 'setAmount', arguments);

			if(this._direction == OjResize.BOTH){
				this._to.width = amount[0];
				this._to.height = amount[1];
			}
			else if(this._direction == OjResize.WIDTH){
				this._to.width = amount;
			}
			else{
				this._to.height = amount;
			}
		}
	},
	{
		'WIDTH'  : OjDimTween.HORIZONTAL,
		'HEIGHT' : OjDimTween.VERTICAL,
		'BOTH'   : OjDimTween.BOTH
	}
);