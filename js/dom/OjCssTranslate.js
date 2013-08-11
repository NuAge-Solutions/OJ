'use strict';

OJ.extendClass(
	'OjCssTranslate', [OjObject],
	{
		'_props_' : {
			'x'     : 0,
			'unitX' : OJ.setting('dimUnit'),
			'unitY' : OJ.setting('dimUnit'),
			'y'     : 0
		},


		'_constructor' : function(/*x, y, unitX, unitY*/){
			var args = arguments,
				ln = args.length;

			this._super(OjObject, '_constructor', []);

			if(ln){
				this.setX(args[0]);

				if(ln > 1){
					this.setY(args[1]);

					if(ln > 2){
						this.setUnitX(args[2]);

						if(ln > 3){
							this.setUnitY(args[3]);
						}
					}
				}
			}
		},


		'clone' : function(){
			var obj = this._super(OjObject, 'clone', arguments);

			obj._x     = this._x;
			obj._unitX = this._unitX;
			obj._unitY = this._unitY;
			obj._y     = this._y;

			return obj;
		},

		'isEqualTo' : function(obj){
			return obj && obj._x == this._x && obj._unitX == this._unitX && obj._unitY == this._unitY && obj._y == this._y;
		},

		'toString' : function(){
			return !this._x && !this._y ? '' : String(this._x) + this._unitX + ', ' + String(this._y) + this._unitY;
		}
	}
);