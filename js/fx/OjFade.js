OJ.importJs('oj.fx.OjPropTween');
OJ.importJs('oj.fx.OjTweenEvent');


'use strict';

OJ.extendClass(
	OjPropTween, 'OjFade',
	{
		'_props_' : {
			'direction' : 'fadeIn', // OjFade.IN
			'duration'  : 250
		},

		'_force' : false,


		'_constructor' : function(/*target = null, direction = IN, duration = 250, easing = NONE*/){
			this._super('OjFade', '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setTarget(arguments[0]);

				if(ln > 1){
					this.setDirection(arguments[1]);

					if(ln > 2){
						this.setDuration(arguments[2]);

						if(ln > 3){
							this.setEasing(arguments[3]);
						}
					}
				}
			}
		},


		'_onComplete' : function(evt){
			if(this._direction == OjFade.NONE){
				this._target.hide();
			}

			this._super('OjFade', '_onComplete', arguments);
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

			this._super('OjFade', 'start', arguments);
		}
	},
	{
		'IN'   : 'onFadeIn',
		'NONE' : 'onFadeNone',
		'OUT'  : 'onFadeOut'
	}
);