'use strict';

OJ.compileClass(
	'OjCachePolicy',
	oj.utils.CachePolicy = function(){
		return new oj.data.Object(
			arguments, 'OjCachePolicy',
			{
				'_get_properties_' : {
					'action'     : 1,
					'lifespan'   : null,
					'url'        : null
				},


				'_constructor' : function(url/*, action, lifespan*/){
					this._super('OjCachePolicy', '_constructor', arguments);

					var ln = arguments.length > 2;

					this._url = url;

					if(ln > 1){
						this._action = arguments[1];

						if(ln > 2){
							this._lifespan = arguments[2];
						}
					}
				}
			}
		);
	},
	{
		// actions
		'ALWAYS'  : 1,
		'NEVER'   : 0,
		'OFFLINE' : 2
	}
);