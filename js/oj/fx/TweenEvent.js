OJ.importJs('oj.events.Event');


'use strict';

OJ.extendClass(
	OjEvent, 'OjTweenEvent',
	{
		'_get_props_' : {
			'progress' : 0,
			'value'    : 0
		},


		'_constructor' : function(type, value, progress/*, bubbles = false, cancelable = false*/){
			var progress = 0, bubbles = false, cancelable = false, ln = arguments.length;

			this._value = value;
			this._progress = progress;

			if(ln > 3){
				bubbles = arguments[3];

				if(ln > 4){
					cancelable = arguments[4];
				}
			}

			this._super('OjTweenEvent', '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'TICK'     : 'onTweenTick',
		'COMPLETE' : 'onTweenComplete'
	}
);