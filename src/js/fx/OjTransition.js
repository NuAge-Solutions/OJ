OJ.importJs('oj.data.OjObject');


OJ.extendClass(
	'OjTransition', [OjObject],
	{
		'_props_' : {
			'easing'   : null,
			'effect'   : null,
			'duration' : null
		},


		'_constructor' : function(/*effect, duration, easing*/){
			this._super(OjObject, '_constructor', []);

			// default the easing property
			this._processArguments(arguments, {
                'effect' : OjTransition.FADE,
                'duration' : 250,
                'easing' : [OjEasing.NONE, OjEasing.NONE]
            });
		},


		'_getEasing' : function(direction){
			var easing = this.easing,
                ln = easing.length;

			if(ln){
				if(ln > 1 && direction == OjTransition.OUT){
					return easing[1];
				}

				return easing[0];
			}

			return null;
		},

		'_makeNone' : function(elm, amount){
			return null;
		},

		'_makeFade' : function(elm, direction, amount){
			return new OjFade(elm, amount ? OjFade.IN : OjFade.OUT, this.duration, this._getEasing(direction))
		},

        '_makeFlip' : function(elm, direction, amount){
            return new OjFlip(elm, amount, this.duration, this._getEasing(direction))
        },

		'_makeSlideHorz' : function(elm, direction, amount){
			return new OjMove(elm, OjMove.X, amount, this.duration, this._getEasing(direction));
		},

		'_makeSlideVert' : function(elm, direction, amount){
			return new OjMove(elm, OjMove.Y, amount, this.duration, this._getEasing(direction));
		},

		'_makeZoom' : function(elm, direction, amount){
			return null;
		},


		'make' : function(elm, direction, amount){
            var self = this;

			return self['_make' + self.effect.ucFirst()].apply(self, arguments);
		},


		'.easing' : function(){
			var e = this._easing;

			return e ? e.clone() : null;
		},

		'=easing' : function(val){
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
        'FLIP'       : 'flip',
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
				var dflt = ln > 1 && args[1] ? args[1] : OjTransition.DEFAULT,
                    easing = dflt.easing;

				args = trans.fulltrim(' ').split(',');
				ln = args.length;

				return new OjTransition(
					ln ? args[0] : dflt.effect,
					ln > 1 ? args[1] : dflt.duration,
					[
						ln > 2 ? OjEasing[args[2]] : easing[0],
						ln > 3 ? OjEasing[args[3]] : easing[1]
					]
				);
			}

			return new OjTransition(OjTransition.NONE, 250);
		}
	}
);

// setup the default transition
OjTransition.DEFAULT = new OjTransition(OjTransition.NONE, 250);