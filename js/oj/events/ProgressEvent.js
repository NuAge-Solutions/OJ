OJ.importJs('oj.events.Event');


'use strict';

OJ.compileClass(
	'OjProgressEvent',
	oj.events.ProgressEvent = function(){
		return new oj.events.Event(
			arguments, 'OjProgressEvent',
			{
				'_get_properties_' : {
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
			}
		);
	},
	{
		'PROGRESS' : 'ojProgress'
	}
);