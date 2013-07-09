OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.fx.OjEasing');
OJ.importJs('oj.fx.OjTweenEvent');
OJ.importJs('oj.timer.OjTimer');


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

//		'_callback' : null,  '_start' : null,  '_timer' : null,

		'_delta' : 0,


		'_constructor' : function(/*from = null, to = null, duration = 500, easing = NONE*/){
			this._super('OjTween', '_constructor', []);

			var args = arguments,
				ln = args.length;

			if(ln){
				this.setFrom(args[0]);

				if(ln > 1){
					this.setTo(args[1]);

					if(ln > 2){
						this.setDuration(args[2]);

						if(ln > 3){
							this.setEasing(args[3]);
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
			var time = Date.time() - this._start;

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
			if(isUnset(this._from) || isUnset(this._to)){
				return;
			}

			var timer = this._timer;

			this._calculateDelta();

			// only create the time once
			if(!timer){
				timer = this._timer = new OjTimer();

				timer.addEventListener(OjTimer.TICK, this, '_onTick');
			}
			else{
				timer.stop();
			}

			timer.setDuration(1000 / this._quality);

			this._start = Date.time();

			timer.start();
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