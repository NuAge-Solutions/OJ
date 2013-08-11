OJ.importJs('oj.fx.OjPropTween');
OJ.importJs('oj.fx.OjTweenEvent');


'use strict';

OJ.extendClass(
	'OjFade', [OjPropTween],
	{
		'_props_' : {
			'direction' : 'fadeIn', // OjFade.IN
			'duration'  : 250
		},

		'_force' : false,


		'_constructor' : function(/*target = null, direction = IN, duration = 250, easing = NONE*/){
			this._super(OjPropTween, '_constructor', []);

			var args = arguments,
				ln = args.length;

			if(ln){
				this.setTarget(args[0]);

				if(ln > 1){
					this.setDirection(args[1]);

					if(ln > 2){
						this.setDuration(args[2]);

						if(ln > 3){
							this.setEasing(args[3]);
						}
					}
				}
			}
		},


		'_onComplete' : function(evt){
			if(this._direction == OjFade.NONE){
				this._target.setAlpha(1);
				this._target.hide();
			}

			this._super(OjPropTween, '_onComplete', arguments);
		},


		'start' : function(){
			// for some reason this happens every once and awhile
			if(!this._target){
				return;
			}

			if(!this._to){
				this._to = {};
			}

			if(this._direction == OjFade.IN){
				if(this._force || this._target.getAlpha() == 1){
					this._target.setAlpha(0);
				}

				this._to['alpha'] = 1;
			}
			else{
				if(this._force || this._target.getAlpha() == 0){
					this._target.setAlpha(1);
				}

				this._to['alpha'] = 0;
			}

			this._target.show();

			this._super(OjPropTween, 'start', arguments);
		}
	},
	{
		'IN'   : 'onFadeIn',
		'NONE' : 'onFadeNone',
		'OUT'  : 'onFadeOut'
	}
);