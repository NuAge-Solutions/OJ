OJ.importJs('oj.data.Object');
OJ.importJs('oj.timer.TimerManager');


'use strict';

OJ.extendClass(
	OjActionable, 'OjTimer',
	{
		'_props_' : {
			'duration'    : 0,
			'repeatCount' : 0 // run n additional times, negative value means run forever
		},

		'_get_props_' : {
			'count' : 0,
			'state' : 'stopped' // OjTimer.STOPPED
		},

		'_last_tick' : 0,


		'_constructor' : function(/*duration, repeat_count*/){
			this._s('OjTimer', '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setDuration(arguments[0]);

				if(ln > 1){
					this.setRepeatCount(arguments[1]);
				}
			}
		},

		'_destructor' : function(){
			TimerManager.unregisterTimer(this);

			return this._s('OjTimer', '_destructor', arguments);
		},


		'_tick' : function(){
			this.dispatchEvent(new OjEvent(OjTimer.TICK));

			if(this._repeatCount > 0 && this._count++ == this._repeatCount){
				this.stop();

				this.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
			}
		},


		'isPaused' : function(){
			return this._state == OjTimer.PAUSED;
		},

		'isRunning' : function(){
			return this._state == OjTimer.RUNNING;
		},

		'isStopped' : function(){
			return this._state == OjTimer.STOPPED;
		},


		'pause' : function(){
			this._state = OjTimer.PAUSED;

			TimerManager.unregisterTimer(this);
		},

		'restart' : function(){
			this.stop();

			this.start();
		},

		'start' : function(){
			if(!this.isRunning()){
				this._state = OjTimer.RUNNING;

				TimerManager.registerTimer(this);
			}
		},

		'stop' : function(){
			this.pause();

			this._count = 0;

			this._state = OjTimer.STOPPED;
		},


		'setDuration' : function(duration){
			if(this._duration != duration){
				this._duration = Math.abs(duration);

				TimerManager.updateTimer(this);
			}
		},

		'setRepeatCount' : function(repeat_count){
			this._repeatCount = Math.max(repeat_count, 0);

			if(repeat_count >= this._count && this.isRunning()){
				this.stop();

				this.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
			}
		}
	},
	{
		'TICK'     : 'onTimerTick',
		'COMPLETE' : 'onTimerComplete',

		'PAUSED'   : 'paused',
		'RUNNING'  : 'running',
		'STOPPED'  : 'stopped',


		'SECOND'   : 1000,
		'MINUTE'   : 60000,
		'HOUR'     : 3600000,
		'DAY'      : 86400000
	}
);