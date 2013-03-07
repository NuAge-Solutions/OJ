OJ.importJs('oj.events.DomEvent');


'use strict';

OJ.compileClass(
	'OjTouchEvent',
	oj.events.TouchEvent = function(){
		return new oj.events.DomEvent(
			arguments, 'OjTouchEvent',
			{
				'_get_properties_' : {
					'layerX'  : NaN,
					'layerY'  : NaN,
					'pageX'   : NaN,
					'pageY'   : NaN
				},


				'_constructor' : function(type/*, bubbles, cancelable, pageX = NaN, pageY = NaN*/){
					var ln = arguments.length;

					this._super('OjTouchEvent', '_constructor', ln > 3 ? [].slice.call(arguments, 0, 3) : arguments);

					if(ln > 3){
						this._pageX = arguments[3];

						if(ln > 4){
							this._pageY = arguments[4];
						}
					}
				},


				'clone' : function(){
					var clone = this._super('OjTouchEvent', 'clone', arguments);

					clone._pageX = this._pageX;
					clone._pageY = this._pagY;

					return clone;
				}
			}
		)
	},
	{
		'convertDomEvent' : function(evt){
			var type;

			evt = OjDomEvent.normalizeDomEvent(evt);

			if(evt.type == OjDomEvent.TOUCH_END){
				type = OjTouchEvent.END;
			}
			else if(evt.type == OjDomEvent.TOUCH_MOVE){
				type = OjTouchEvent.MOVE;
			}
			else if(evt.type == OjDomEvent.TOUCH_START){
				type = OjTouchEvent.START;
			}

			var new_evt = new OjTouchEvent(type, evt.bubbles, evt.cancelable, evt.changedTouches[0].pageX, evt.changedTouches[0].pageY);
			new_evt._target = evt.target ? evt.target.ojProxy : null;
			new_evt._currentTarget = evt.currentTarget ? evt.currentTarget.ojProxy : null;

			return new_evt;
		},

		'isTouchEvent' : function(type){
			return type == OjTouchEvent.END || type == OjTouchEvent.MOVE || type == OjTouchEvent.START;
		},

		'isTouchDomEvent' : function(type){
			return type == OjDomEvent.TOUCH_END || type == OjDomEvent.TOUCH_MOVE || type == OjDomEvent.TOUCH_START;
		},

		'START' : 'touchStart',
		'MOVE'  : 'touchMove',
		'END'   : 'touchEnd'
	}
);