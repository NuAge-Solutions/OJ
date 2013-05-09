OJ.importJs('oj.data.OjObject');


'use strict';

OJ.extendClass(
	OjObject, 'OjTransition',
	{
		'_props_' : {
			'easing'   : null,
			'effect'   : 'fade', // OjTransition.FADE
			'duration' : 250
		},


		'_constructor' : function(/*effect, duration, easing*/){
			this._super('OjTransition', '_constructor', []);

			// default the easing property
			this._easing = [OjEasing.NONE, OjEasing.NONE];

			// process the constructor params
			var args = arguments,
				ln = args.length;

			if(ln){
				this.setEffect(args[0]);

				if(ln > 1){
					this.setDuration(args[1]);

					if(ln > 2){
						this.setEasing(args[2]);
					}
				}
			}
		},


		'_getEasing' : function(direction){
			var ln = this._easing.length;

			if(ln){
				if(ln > 1 && direction == OjTransition.OUT){
					return this._easing[1];
				}

				return this._easing[0];
			}

			return null;
		},

		'_makeNone' : function(elm, amount){
			return null;
		},

		'_makeFade' : function(elm, direction, amount){
			return new OjFade(elm, amount ? OjFade.IN : OjFade.OUT, this._duration, this._getEasing(direction))
		},

		'_makeSlideHorz' : function(elm, direction, amount){
			return new OjMove(elm, OjMove.X, amount, this._duration, this._getEasing(direction));
		},

		'_makeSlideVert' : function(elm, direction, amount){
			return new OjMove(elm, OjMove.Y, amount, this._duration, this._getEasing(direction));
		},

		'_makeZoom' : function(elm, direction, amount){
			return null;
		},


		'make' : function(elm, direction, amount){
			return this['_make' + this._effect.ucFirst()].apply(this, arguments);
		},


		'getEasing' : function(){
			var e = this._easing;

			return e ? e.clone() : null;
		},

		'setEasing' : function(val){
			if(!isArray(val)){
				val = [val, val];
			}

			this._easing = val;
		}
	},
	{
		// Transition Constants
		'DEFAULT'    : null,

		'NONE'       : 'none',
		'FADE'       : 'fade',
		'SLIDE_HORZ' : 'slideHorz',
		'SLIDE_VERT' : 'slideVert',
		'ZOOM'       : 'zoom',


		// transition make function
		'transition' : function(trans/*, default*/){
			if(isObjective(trans) && trans.is('OjTransition')){
				return trans
			}

			var args = arguments,
				ln = args.length;

			if(isString(trans)){
				var dflt = ln > 1 && args[1] ? args[1] : OjTransition.DEFAULT;

				args = trans.fulltrim(' ').split(',');
				ln = args.length;

				return new OjTransition(
					ln ? args[0] : dflt.getEffect(),
					ln > 1 ? args[1] : dflt.getDuration(),
					[
						ln > 2 ? OjEasing[args[2]] : dflt.getEasing()[0],
						ln > 3 ? OjEasing[args[3]] : dflt.getEasing()[1]
					]
				);
			}

			return new OjTransition(OjTransition.NONE, 250);
		}
	}
);

// setup the default transition
OjTransition.DEFAULT = new OjTransition(OjTransition.NONE, 250);