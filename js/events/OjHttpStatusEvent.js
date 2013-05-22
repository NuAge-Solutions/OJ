OJ.importJs('oj.events.OjEvent');


'use strict';

OJ.extendClass(
	OjEvent, 'OjHttpStatusEvent',
	{
		'_get_props_' : {
			'status' : null
		},


		'_constructor' : function(type/*, status = 0, bubbles = false, cancelable = false*/){
			var bubbles = false, cancelable = false, ln = arguments.length;

			if(ln > 1){
				this._status = arguments[1];

				if(ln > 2){
					bubbles = arguments[2];

					if(ln > 3){
						cancelable = arguments[3];
					}
				}
			}

			this._super('OjHttpStatusEvent', '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'HTTP_STATUS' : 'onHttpStatus'
	}
);