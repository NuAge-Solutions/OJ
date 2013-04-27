OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.fx.Easing');
OJ.importJs('oj.fx.TweenEvent');
OJ.importJs('oj.timer.Timer');


'use strict';

OJ.extendClass(
	OjActionable, 'OjTween',
	{
		'_props_' : {
			'duration' : 500,
			'easing'   : OjEasing.NONE,
			'from'     : null,
			'quality'  : 60,  // frame rate
			'to'       : null
		},

		'_callback' : null,  '_delta' : 0,  '_start' : null,  '_timer' : null,


		'_constructor' : function(/*from = null, to = null, duration = 500, easing = NONE*/){
			this._super('OjTween', '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setFrom(arguments[0]);

				if(ln > 1){
					this.setTo(arguments[1]);

					if(ln > 2){
						this.setDuration(arguments[2]);

						if(ln > 3){
							this.setEasing(arguments[3]);
						}
					}
				}
			}
		},


		'_destructor' : function(){
			this._unset('_timer');

			return this._super('OjTween', '_destructor', arguments);
		},


		'_calculateDelta' : function(){
			this._delta = this._to - this._from;
		},

		'_tick' : function(time){
			this.dispatchEvent(
				new OjTweenEvent(
					OjTweenEvent.TICK, // type
					this._easing(time, this._from, this._delta, this._duration, 0, 0), // value
					time / this._duration // progress
				)
			);
		},


		'_onTick' : function(evt){
			var key, time = Date.time() - this._start;

			if(time >= this._duration){
				time = this._duration;

				this._timer.stop();
			}

			this._tick(time);

			if(time == this._duration){
				this._onComplete(evt);
			}
		},

		'_onComplete' : function(evt){
			this.dispatchEvent(new OjTweenEvent(OjTweenEvent.COMPLETE, this._to, 1));
		},


		'start' : function(){
			// make sure we have what we need to get started
			if(!isSet(this._from) || !isSet(this._to)){
				return;
			}

			this._calculateDelta();

			// only create the time once
			if(!this._timer){
				this._timer = new OjTimer();

				this._timer.addEventListener(OjTimer.TICK, this, '_onTick');
			}
			else{
				this._timer.stop();
			}

			this._timer.setDuration(1000 / this._quality);

			this._start = Date.time();

			this._timer.start();
		},

		'pause' : function(){
			this._timer.pause();
		},

		'stop' : function(){
			this._timer.stop();
		},

		'restart' : function(){
			this._timer.restart();
		},

		'reverse' : function(){
			// todo: implement tween reverse
		}
	}
);