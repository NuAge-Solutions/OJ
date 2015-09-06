OJ.importJs('oj.events.OjDomEvent');




OJ.extendClass(
	'OjTouchEvent', [OjDomEvent],
	{
		'_get_props_' : {
			'pageX'   : NaN,
			'pageY'   : NaN
		},


		'_constructor' : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
			var args = Array.array(arguments),
				ln = args.length;

			if(ln > 1){
				this._pageX = args.removeAt(1)[0];

				if(ln > 2){
					this._pageY = args.removeAt(1)[0];
				}
			}

			this._super(OjDomEvent, '_constructor', args);
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

			if(evt.type == OjDomEvent.TOUCH_MOVE){
				type = OjTouchEvent.MOVE;
			}
			else if(evt.type == OjDomEvent.TOUCH_START){
				type = OjTouchEvent.START;
			}
      else if(
        evt.type == OjDomEvent.TOUCH_END || evt.type == OjDomEvent.TOUCH_CANCEL || evt.type == OjDomEvent.TOUCH_LEAVE
      ){
				type = OjTouchEvent.END;
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