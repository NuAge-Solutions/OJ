OJ.importJs('oj.fx.OjDimTween');


'use strict';

OJ.extendClass(
	'OjResize', [OjDimTween],
	{
		'setAmount' : function(amount){
			this._super(OjDimTween, 'setAmount', arguments);

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