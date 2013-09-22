OJ.importJs('oj.events.OjDomEvent');


'use strict';

OJ.extendClass(
	'OjMouseEvent', [OjDomEvent],
	{
		'_get_props_' : {
			'pageX' : NaN,
			'pageY' : NaN
		},


		'_constructor' : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
			var args = Array.array(arguments),
				ln = args.length;

			if(ln > 1){
				this._pageX = args.splice(1, 1)[0];

				if(ln > 2){
					this._pageY = args.splice(1, 1)[0];
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

			var new_evt = new OjMouseEvent(type, evt.pageX, evt.pageY, evt.bubbles, evt.cancelable);
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
    'UP_OUTSIDE'   : 'onMouseUpOutside',
		'WHEEL'        : 'onMouseWheel'
	}
);