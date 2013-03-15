OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.timer.Timer');


'use strict';

OJ.extendManager(
	'TimerManager', OjActionable, 'OjTimerManager',
	{
		'_callback' : null,  '_timers' : {},  '_timer_count' : 0,  '_min_interval' : 999999,  '_interval' : null,


		'_constructor' : function(){
			this._s('OjTimerManager', '_constructor', arguments);

			this._callback = this._tick.bind(this);
		},

		'_destructor' : function(){
			this._callback = null;

			return this._s('OjTimerManager', '_destructor', arguments);
		},


		'_updateInterval' : function(){
			if(this._timer_count){
				var key, min_interval = this._min_interval;

				for(key in this._timers){
					min_interval = Math.min(min_interval, this._timers[key].getDuration());
				}

				if(this._min_interval != min_interval){
					this._min_interval = min_interval;

					clearInterval(this._interval);

					this._interval = setInterval(this._callback, Math.max(this._min_interval / 3, 10));

					this._tick();
				}
			}
			else{
				clearInterval(this._interval);

				this._min_interval = 999999;
			}
		},

		'_tick' : function(){
			var key, tick = Date.time(), timer;

			for(key in this._timers){
				timer = this._timers[key];

				if(timer._duration < tick - timer._last_tick){
					timer._last_tick = tick;

					setTimeout('TimerManager._timerTick("' + key + '")', 1);
				}
			}
		},

		'_timerTick' : function(timer_id){
			if(TimerManager._timers[timer_id]){
				TimerManager._timers[timer_id]._tick();
			}
		},


		'timer' : function(/*interval, repeat_count*/){
			var ln = arguments.length;

			if(!ln){
				return new OjTimer();
			}

			if(ln == 1){
				return new OjTimer(arguments[0]);
			}

			return new OjTimer(arguments[0], arguments[1]);
		},


		'registerTimer' : function(timer){
			var id = timer.id();

			if(this._timers[id] != timer){
				this._timers[id] = timer;

				timer._last_tick = Date.time();

				this._timer_count++;

				this._updateInterval();
			}
		},

		'updateTimer' : function(timer){
			if(this._timers[timer.id()]){
				this._updateInterval();
			}
		},

		'unregisterTimer' : function(timer){
			var id = timer.id();

			if(this._timers[id]){
				delete this._timers[id];

				this._timer_count--;

				this._updateInterval();
			}
		}
	}
);