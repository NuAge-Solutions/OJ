OJ.importJs('oj.events.OjTextEvent');


'use strict';

OJ.extendClass(
	OjTextEvent, 'OjErrorEvent',
	{
		'_get_props_' : {
			'code'    : 0
		},


		'_constructor' : function(type/*, text = null, code = 0, bubbles = false, cancelable = false*/){
			var args = Array.array(arguments),
				ln = args.length;

			if(ln > 2){
				this._code = args[2];

				args.splice(2, 1);
			}

			this._super('OjErrorEvent', '_constructor', args);
		}
	},
	{
		'ERROR' : 'onError'
	}
);