'use strict';

OJ.extendClass(
	OjObject, 'OjCachePolicy',
	{
		'_get_props_' : {
			'action'     : 1,
			'lifespan'   : null,
			'url'        : null
		},


		'_constructor' : function(url/*, action, lifespan*/){
			this._super('OjCachePolicy', '_constructor', arguments);

			var args = arguments,
				ln = args.length;

			this._url = url;

			if(ln > 1){
				this._action = args[1];

				if(ln > 2){
					this._lifespan = args[2];
				}
			}
		}
	},
	{
		// actions
		'ALWAYS'  : 1,
		'NEVER'   : 0,
		'OFFLINE' : 2
	}
);