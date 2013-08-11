OJ.importJs('oj.events.OjDomEvent');


'use strict';

OJ.extendClass(
	'OjTouchEvent', [OjDomEvent],
	{
		'_get_props_' : {
			'pageX'   : NaN,
			'pageY'   : NaN
		},


		'_constructor' : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
			var ln = arguments.length;

			this._super(OjDomEvent, '_constructor', ln > 3 ? [].slice.call(arguments, 0, 3) : arguments);

			if(ln > 3){
				this._pageX = arguments[3];

				if(ln > 4){
					this._pageY = arguments[4];
				}
			}
		},


		'clone' : function(){
			var clone = this._super(OjDomEvent, 'clone', arguments);

			clone._pageX = this._pageX;
			clone._pageY = this._pageY;

			return clone;
		}
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

			var new_evt = new OjTouchEvent(type, evt.changedTouches[0].pageX, evt.changedTouches[0].pageY, evt.bubbles, evt.cancelable);
			new_evt._target = OjElement.element(evt.target)
			new_evt._currentTarget = OjElement.element(evt.currentTarget);

			return new_evt;
		},

		'isTouchEvent' : function(type){
			return type == OjTouchEvent.END || type == OjTouchEvent.MOVE || type == OjTouchEvent.START;
		},

		'isTouchDomEvent' : function(type){
			return type == OjDomEvent.TOUCH_END || type == OjDomEvent.TOUCH_MOVE || type == OjDomEvent.TOUCH_START;
		},

		'START' : 'onTouchStart',
		'MOVE'  : 'onTouchMove',
		'END'   : 'onTouchEnd'
	}
);