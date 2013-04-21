OJ.importCss('oj.components.Spinner');


'use strict';

OJ.extendComponent(
	OjComponent, 'OjSpinner',
	{
		'_props_' : {
			'numBlades' : null,
			'period'    : 1,
			'tint'      : '#FFFFFF'
		},

		'_position' : 0,  '_template' : 'oj.components.Spinner',

		'_timer' : null,  '_running' : false,


		'_constructor' : function(/*tint, period, num_blades*/){
			var ln = arguments.length;

			this._s('OjSpinner', '_constructor', []);

			var num_blades = 13;

			if(ln){
				this.setTint(arguments[0]);

				if(ln > 1){
					this.setPeriod(arguments[1]);

					if(ln > 2){
						num_blades = arguments[2];
					}
				}
			}

			// setup the timer
			this._timer = new OjTimer(1000, 0);
			this._timer.addEventListener(OjTimer.TICK, this, '_onTimer');

			// setup the blades
			this.setNumBlades(num_blades);

			// start the timer/animation
			this.start();
		},

		'_destructor' : function(){
			OJ.destroy(this._timer);

			return this._s('OjSpinner', '_destructor', arguments);
		},


		'_setIsDisplayed' : function(){
			this._s('OjSpinner', '_setIsDisplayed', arguments);

			if(this._is_displayed){
				this._timer.start();
			}
			else{
				this._timer.stop();
			}
		},

		'_updateTimer' : function(){
			this._timer.setDuration((this._period * 1000) / this._numBlades);
		},

		'_onTimer' : function(){
			if(this._position == 0){
				this._position = this._numBlades;
			}

			this._position--;

			this.redraw();
		},


		'hide' : function(){
			this._timer.pause();

			this._s('OjSpinner', 'hide', arguments);
		},

		'redraw' : function(){
			if(this._s('OjSpinner', 'redraw', arguments)){
				var ln = this._numBlades, elm, pos;

				while(ln-- > 0){
					elm = this.wrapper.getChildAt(ln);

					// calculate the translated position
					pos = (ln - this._position) % this._numBlades;

					if(pos < 0){
						pos = pos + this._numBlades;
					}

					elm.setAlpha(Math.max(1 - (pos / this._numBlades), .2));
				}

				return true;
			}

			return false;
		},

		'show' : function(){
			if(this._running){
				this._timer.start();
			}

			this._s('OjSpinner', 'show', arguments);
		},

		'start' : function(){
			this._timer.start();

			this._running = true;
		},

		'stop' : function(){
			this._timer.pause();

			this._running = false;
		},


		'setAlpha' : function(val){
			if(this._running){
				if(val == 0){
					this._timer.pause();
				}
				else{
					this._timer.start();
				}
			}

			this._s('OjSpinner', 'setAlpha', arguments);
		},

		'setNumBlades' : function(val){
			if(this._numBlades == val){
				return;
			}

			this._numBlades = val;

			// redraw the blades
			var ln = this._numBlades, section = 360 / ln;
			var elm;

			for(; ln--;){
				elm = new OjStyleElement();
				elm.addClasses('blade');
				elm.setRotation(section * ln);
				elm.setTranslate('70%, 0px');

				this.wrapper.addChild(elm);
			}

			// redraw the tint
			this.redraw();

			// update the timer
			this._updateTimer();
		},

		'setPeriod' : function(val){
			if(this._period == val){
				return;
			}

			this._period = val;

			// update the timer
			this._updateTimer();
		},

		'setTint' : function(val){
			if(this._tint == val){
				return;
			}

			this._tint = val;

			this.redraw();
		}
	},
	{
		'_TAGS' : ['spinner']
	}
);