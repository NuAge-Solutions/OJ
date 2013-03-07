OJ.importJs('oj.events.Event');


'use strict';

OJ.compileClass(
	'OjDomEvent',
	oj.events.DomEvent = function(){
		return new oj.events.Event(arguments, 'OjDomEvent', { });
	},
	{
		'normalizeDomEvent' : function(evt){
			if(!evt){
				evt = window.event;
			}

			if(evt.clientX || evt.clientY){
				evt.pageX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				evt.pageY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}

			if(evt.which){
				evt.rightClick = evt.which == 3;
			}
			else if(evt.button){
				evt.rightClick = evt.button == 2;
			}

			return evt;
		},

		'convertDomEvent' : function(evt){
			var type;

			evt = OjDomEvent.normalizeDomEvent(evt);

			return new OjDomEvent(evt.type, true, true);
		},

		// mouse events
		'CLICK'        : 'click',
		'DOUBLE_CLICK' : 'dblclick',
		'MOUSE_DOWN'   : 'mousedown',
		'MOUSE_MOVE'   : 'mousemove',
		'MOUSE_OVER'   : 'mouseover',
		'MOUSE_OUT'    : 'mouseout',
		'MOUSE_UP'     : 'mouseup',

		// keyboard events
		'KEY_DOWN'  : 'keydown',
		'KEY_PRESS' : 'keypress',
		'KEY_UP'    : 'keyup',

		// focus events
		'FOCUS_IN'  : 'focus',
		'FOCUS_OUT' : 'blur',

		// form events
		'CHANGE' : 'change',

		// touch events
		'TOUCH_START' : 'touchstart',
		'TOUCH_MOVE'  : 'touchmove',
		'TOUCH_END'   : 'touchend'
	}
);