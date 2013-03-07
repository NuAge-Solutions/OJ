OJ.importJs('oj.fx.DimTween');


'use strict';

OJ.compileClass(
	'OjResize',
	oj.fx.Resize = function(){
		return new oj.fx.DimTween(
			arguments, 'OjResize',
			{
				'setAmount' : function(amount){
					this._super('OjResize', 'setAmount', arguments);

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
			}
		);
	},
	{
		'WIDTH'  : OjDimTween.HORIZONTAL,
		'HEIGHT' : OjDimTween.VERTICAL,
		'BOTH'   : OjDimTween.BOTH
	}
);