OJ.importJs('oj.events.OjEvent');


'use strict';

OJ.extendClass(
	'OjAlertEvent', [OjEvent],
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

			this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'BUTTON_CLICK' : 'onAlertButtonClick'
	}
);