OJ.importJs('oj.events.OjEvent');


'use strict';

OJ.extendClass(
	OjEvent, 'OjProgressEvent',
	{
		'_get_props_' : {
			'progress' : 0
		},


		'_constructor' : function(type/*, progress = 0, bubbles = false, cancelable = false*/){
			var cancelable, bubbles = cancelable = false, ln = arguments.length;

			if(ln > 1){
				this._progress = arguments[1];

				if(ln > 2){
					bubbles = arguments[2];

					if(ln > 3){
						cancelable = arguments[3];
					}
				}
			}

			this._super('OjProgressEvent', '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'PROGRESS' : 'onProgress'
	}
);