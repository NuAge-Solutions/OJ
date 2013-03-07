OJ.importJs('oj.events.TextEvent');


'use strict';

OJ.compileClass(
	'OjErrorEvent',
	oj.events.ErrorEvent = function(){
		return new oj.events.TextEvent(
			arguments, 'OjErrorEvent',
			{
				'_get_properties_' : {
					'errorId'  : 0
				},


				'_constructor' : function(type/*, text = "", id = 0, bubbles = false, cancelable = false*/){
					var text = '', bubbles = false, cancelable = false, ln = arguments.length;

					if(ln > 1){
						text = arguments[1];

						if(ln > 2){
							this._errorId = arguments[2];

							if(ln > 3){
								bubbles = arguments[3];

								if(ln > 4){
									cancelable = arguments[4];
								}
							}
						}
					}

					this._super('OjErrorEvent', '_constructor', [type, text, bubbles, cancelable]);
				}
			}
		);
	},
	{
		'ERROR' : 'error'
	}
);