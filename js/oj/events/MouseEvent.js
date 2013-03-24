OJ.importJs('oj.events.DomEvent');


'use strict';

OJ.extendClass(
	OjDomEvent, 'OjMouseEvent',
	{
		'_get_props_' : {
			'pageX' : NaN,
			'pageY' : NaN
		},


		'_constructor' : function(type/*, bubbles, cancelable, pageX = NaN, pageY = NaN*/){
			var ln = arguments.length;

			this._s('OjMouseEvent', '_constructor', ln > 3 ? [].slice.call(arguments, 0, 3) : arguments);

			if(ln > 3){
				this._pageX = arguments[3];

				if(ln > 4){
					this._pageY = arguments[4];
				}
			}
		},


		'clone' : function(){
			var clone = this._s('OjMouseEvent', 'clone', arguments);

			clone._pageX = this._pageX;
			clone._pageY = this._pageY;

			return clone;
		}
	},
	{
		'convertDomEvent' : function(evt){
			var type;

			evt = OjDomEvent.normalizeDomEvent(evt);

			if(evt.type == OjDomEvent.CLICK){
				type = OjMouseEvent.CLICK;
			}
			else if(evt.type == OjDomEvent.DOUBLE_CLICK){
				type = OjMouseEvent.DOUBLE_CLICK;
			}
			else if(evt.type == OjDomEvent.MOUSE_DOWN){
				type = OjMouseEvent.DOWN;
			}
			else if(evt.type == OjDomEvent.MOUSE_MOVE){
				type = OjMouseEvent.MOVE;
			}
			else if(evt.type == OjDomEvent.MOUSE_OUT){
				type = OjMouseEvent.OUT;
			}
			else if(evt.type == OjDomEvent.MOUSE_OVER){
				type = OjMouseEvent.OVER;
			}
			else if(evt.type == OjDomEvent.MOUSE_UP){
				type = OjMouseEvent.UP;
			}

			var new_evt = new OjMouseEvent(type, evt.bubbles, evt.cancelable, evt.pageX, evt.pageY);
			new_evt._target = evt.target ? evt.target.ojProxy : null;
			new_evt._currentTarget = evt.currentTarget ? evt.currentTarget.ojProxy : null;

			return new_evt;
		},

		'isMouseEvent' : function(type){
			return type == OjMouseEvent.CLICK || OjMouseEvent.DRAG || type == OjMouseEvent.DOUBLE_CLICK ||
				type == OjMouseEvent.DOWN || type == OjMouseEvent.MIDDLE_CLICK || type == OjMouseEvent.MOVE ||
				type == OjMouseEvent.OVER || type == OjMouseEvent.OUT || type == OjMouseEvent.RIGHT_CLICK ||
				type == OjMouseEvent.RIGHT_UP || type == OjMouseEvent.RIGHT_DOWN || type == OjMouseEvent.UP || type == OjMouseEvent.WHEEL;
		},

		'isMouseDomEvent' : function(type){
			return type == OjDomEvent.CLICK || type == OjDomEvent.DOUBLE_CLICK || type == OjDomEvent.MOUSE_DOWN ||
				type == OjDomEvent.MOUSE_MOVE || type == OjDomEvent.MOUSE_OVER || type == OjDomEvent.MOUSE_OUT ||
				type == OjDomEvent.MOUSE_UP;
		},

		'CLICK'        : 'onClick',
		'DOUBLE_CLICK' : 'onDoubleClick',
		'DOWN'         : 'onMouseDown',
		'MIDDLE_CLICK' : 'onMiddleClick',
		'MOVE'         : 'onMouseMove',
		'OVER'         : 'onMouseOver',
		'OUT'          : 'onMouseOut',
		'RIGHT_CLICK'  : 'onRightClick',
		'RIGHT_UP'     : 'onMouseRightUp',
		'RIGHT_DOWN'   : 'onMouseRightDown',
		'UP'           : 'onMouseUp',
		'WHEEL'        : 'onMouseWheel'
	}
);