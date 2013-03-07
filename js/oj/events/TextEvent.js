OJ.importJs('oj.events.Event');


'use strict';

OJ.compileClass(
	'OjTextEvent',
	oj.events.TextEvent = function(){
		return new oj.events.Event(
			arguments, 'OjTextEvent',
			{
				'_get_properties_' : {
					'text' : ''
				},


				'_constructor' : function(type/*, text = "", bubbles = false, cancelable = false*/){
					var cancelable, bubbles = cancelable = false, ln = arguments.length;

					if(ln > 1){
						this._text = arguments[1];

						if(ln > 2){
							bubbles = arguments[2];

							if(ln > 3){
								cancelable = arguments[3];
							}
						}
					}

					this._super('OjTextEvent', '_constructor', [type, bubbles, cancelable]);
				}
			}
		);
	},
	{
		'TEXT' : 'text'
	}
);