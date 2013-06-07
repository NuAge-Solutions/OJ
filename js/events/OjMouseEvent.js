OJ.importJs('oj.events.OjDomEvent');


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

			this._super('OjMouseEvent', '_constructor', ln > 3 ? [].slice.call(arguments, 0, 3) : arguments);

			if(ln > 3){
				this._pageX = arguments[3];

				if(ln > 4){
					this._pageY = arguments[4];
				}
			}
		},


		'clone' : function(){
			var clone = this._super('OjMouseEvent', 'clone', arguments);

			clone._pageX = this._pageX;
			clone._pageY = this._pageY;

			return clone;
		}
	},
	{
		'_evt_map' : {
			'click'        : 'onClick',
			'dblclick'     : 'onDoubleClick',
			'mousedown'    : 'onMouseDown',
			'mousemove'    : 'onMouseMove',
			'mouseover'    : 'onMouseOver',
			'mouseout'     : 'onMouseOut',
			'mouseup'      : 'onMouseUp',
			'mousewheel'   : 'onMouseWheel'
		},

		'convertDomEvent' : function(evt){
			evt = OjDomEvent.normalizeDomEvent(evt);

			var type = this._evt_map[evt.type];

			if(type == OjMouseEvent.CLICK){
				// todo: OjMouseEvent - add middle and right click event detection
			}

			var new_evt = new OjMouseEvent(type, evt.bubbles, evt.cancelable, evt.pageX, evt.pageY);
			new_evt._target = OjElement.element(evt.target);
			new_evt._currentTarget = OjElement.element(evt.currentTarget);

			return new_evt;
		},

		'isMouseEvent' : function(type){
			var k;

			for(k in this._evt_map){
				if(type == this._evt_map[k]){
					return true;
				}
			}

			return false;
		},

		'isMouseDomEvent' : function(type){
			var k;

			for(k in this._evt_map){
				if(type == k){
					return true;
				}
			}

			return false;
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