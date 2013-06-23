OJ.importJs('oj.events.OjDomEvent');


'use strict';

OJ.extendClass(
	OjDomEvent, 'OjOrientationEvent',
	{
		'_get_props_' : {
			'orientation' : null
		},


		'_constructor' : function(type/*, bubbles, cancelable, orientation = NULL*/){
			var args = arguments,
				ln = args.length;

			this._super('OjOrientationEvent', '_constructor', ln > 3 ? [].slice.call(args, 0, 3) : args);

			if(ln > 3){
				this._orientation = args[3];
			}
		},


		'clone' : function(){
			var clone = this._super('OjOrientationEvent', 'clone', arguments);

			clone._orientation = this._orientation;

			return clone;
		}
	},
	{
		'convertDomEvent' : function(evt){
			var type;

			evt = OjDomEvent.normalizeDomEvent(evt);

			if(evt.type == OjDomEvent.ORIENTATION_CHANGE){
				type = OjOrientationEvent.CHANGE;
			}

			return new OjOrientationEvent(type, true, true, window.orientation);
		},

		'isOrientationEvent' : function(type){
			return type == OjOrientationEvent.CHANGE;
		},

		'isOrientationDomEvent' : function(type){
			return type == OjDomEvent.ORIENTATION_CHANGE;
		},

		'PORTRAIT' : 0,
		'LANDSCAPE_LEFT' : 90,
		'LANDSCAPE_RIGHT' : -90,

		'CHANGE'  : 'onOrienationChange'
	}
);