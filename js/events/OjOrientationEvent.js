OJ.importJs('oj.events.OjDomEvent');


'use strict';

OJ.extendClass(
	'OjOrientationEvent', [OjDomEvent],
	{
		'_get_props_' : {
			'orientation' : null
		},


		'_constructor' : function(type/*, orientation = NULL, bubbles, cancelable*/){
			var args = Array.array(arguments),
				ln = args.length;

			if(ln > 1){
				this._orientation = args.splice(1, 1)[0];
			}

			this._super(OjDomEvent, '_constructor', args);
		},


		'clone' : function(){
			var clone = this._super(OjDomEvent, 'clone', arguments);

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

			return new OjOrientationEvent(type, window.orientation, false, false);
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