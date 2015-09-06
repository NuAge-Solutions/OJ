OJ.importJs('oj.data.OjObject');




OJ.extendClass(
	'OjRect', [OjObject],
	{
		'_props_' : {
			'top'    : 0,
			'left'   : 0,
			'width'  : 0,
			'height' : 0
		},

		'_get_props_' : {
			'bottom' : 0,
			'right'  : 0
		},


		'_constructor' : function(/*left, top, width, height*/){
			this._super(OjObject, '_constructor', []);

            this._processArguments(arguments, {
                'left' : 0,
                'top' : 0,
                'width' : 0,
                'height' : 0
            });
		},

		'hitTestPoint' : function(x, y){
			return x >= this._left && x <= this._right && y >= this._top && y <= this._bottom;
		},

		'hitTestRect' : function(rect){
			return (rect._top >= this._top && rect._top <= this._bottom && rect._left >= this._left && rect._left <= this._right) ||
				(rect._top >= this._top && rect._top <= this._bottom && rect._right >= this._left && rect._right <= this._right) ||
				(rect._bottom >= this._top && rect._bottom <= this._bottom && rect._left >= this._left && rect._left <= this._right) ||
				(rect._bottom >= this._top && rect._bottom <= this._bottom && rect._right >= this._left && rect._right <= this._right);
		},


		'=top' : function(val){
			this._bottom = (this._top = val) + this._height;
		},

		'=left' : function(val){
			this._right = (this._left = val) + this._width;
		},

		'=width' : function(val){
			this._right = (this._width = val) + this._left;
		},

		'=height' : function(val){
			this._bottom = (this._height = val) + this._top;
		}
	}
);