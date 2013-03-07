OJ.importJs('oj.events.DomEvent');


'use strict';

OJ.compileClass(
	'OjKeyboardEvent',
	oj.events.KeyboardEvent = function(){
		return new oj.events.DomEvent(arguments, 'OjKeyboardEvent');
	},
	{
		'convertDomEvent' : function(evt){
			var type;

			evt = OjDomEvent.normalizeDomEvent(evt);

			if(evt.type == OjDomEvent.KEY_DOWN){ type = OjKeyboardEvent.DOWN; }
			else if(evt.type == OjDomEvent.KEY_PRESS){ type = OjKeyboardEvent.PRESS; }
			else if(evt.type == OjDomEvent.KEY_UP){ type = OjKeyboardEvent.UP; }

			return new OjKeyboardEvent(type, true, true);
		},

		'isKeyboardEvent' : function(type){
			return type == OjKeyboardEvent.DOWN || type == OjKeyboardEvent.PRESS || type == OjKeyboardEvent.UP;
		},

		'isKeyboardDomEvent' : function(type){
			return type == OjDomEvent.KEY_DOWN || type == OjDomEvent.KEY_PRESS || type == OjDomEvent.KEY_UP;
		},

		'DOWN'  : 'keyDown',
		'PRESS' : 'keyPress',
		'UP'    : 'keyUp'
	}
);