OJ.importJs('oj.events.Event');


'use strict';

OJ.extendClass(
	OjEvent, 'OjAlertEvent',
	{
		'_get_props_' : {
			'buttonIndex' : -1
		},


		'_constructor' : function(type/*, button_index = -1, bubbles = false, cancelable = false*/){
			var cancelable, bubbles = cancelable = false, ln = arguments.length;

			if(ln > 1){
				this._buttonIndex = arguments[1];

				if(ln > 2){
					bubbles = arguments[2];

					if(ln > 3){
						cancelable = arguments[3];
					}
				}
			}

			this._s('OjAlertEvent', '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'BUTTON_CLICK' : 'onAlertButtonClick'
	}
);