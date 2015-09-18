OJ.importJs('oj.events.OjActionable');


OJ.extendClass(
	'OjTimer', [OjActionable],
	{
		'_props_' : {
            'duration'    : null,
            'on_complete' : null,
            'on_tick' : null,
			'repeat_count' : null // run n additional times, negative value means run forever

		},

		'_get_props_' : {
            'count' : 0,
            'paused' : null,
            'running' : null,
			'state' : null,
            'stopped' : null
		},

        '_elapsed' : 0,


		'_constructor' : function(/*duration, repeat_count*/){
            var self = this;

			self._super(OjActionable, '_constructor', []);

            self._state = OjTimer.STOPPED;

            self._processArguments(arguments, {
                'duration' : 0,
                'repeat_count' : 1
            });
		},


        '_setupInterval' : function(){
            var self = this,
                intrvl = self._interval;

            if(intrvl){
                clearInterval(intrvl);
            }

            self._interval = setInterval(function(){ self._tick(); }, self.duration);

            self._updateLastTick();
        },

		'_tick' : function(){
            var self = this,
                on_complete = self.on_complete,
                on_tick = self.on_tick,
                repeat = self.repeat_count;

            self._updateLastTick();

            if(on_tick){
                on_tick(this);
            }

			self.dispatchEvent(new OjEvent(OjTimer.TICK));

			if(repeat > 0 && self._count++ == repeat){
				self.stop();

                if(on_complete){
                    on_complete(this);
                }

				self.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
			}
		},

        '_updateLastTick' : function(){
            self._last_tick = new Date();
            self._elapsed = 0;
        },


		'pause' : function(){
            var self = this,
                last_tick = self._last_tick,
                intrvl = self._interval;

            self._elapsed = last_tick ? (new Date()).getTime() - last_tick.getTime() : 0;
			self._state = OjTimer.PAUSED;

            if(intrvl){
                // todo: there is an edge case where this could be a timeout from a partial resume. not sure what to do.
                clearInterval(intrvl);
            }
		},

		'restart' : function(){
			this.stop();

			this.start();
		},

		'start' : function(){
            var self = this,
                elapsed = self._elapsed;

			if(!self._interval){
                self._elapsed = 0;
				self._state = OjTimer.RUNNING;

                // check to see if we have a partial we need to complete
                if(elapsed && elapsed < self.duration){
                    self._last_tick = new Date((new Date().getTime() - elapsed)); // post date the last tick

                    // run the last little bit of the tick
                    self._interval = setTimeout(
                        function(){
                            self._tick();

                            self._setupInterval();
                        },
                        self.duration - elapsed
                    );
                }
                else{
                    self._setupInterval();
                }
			}
		},

		'stop' : function(){
            var self = this;

			self.pause();

			self._count = 0;
            self._elapsed = 0;

			self._state = OjTimer.STOPPED;
		},


		'=duration' : function(duration){
            var self = this,
                intrvl;

			if(self._duration != duration){
				self._duration = Math.abs(duration);
                self._elapsed = 0;

                if(intrvl){
                    self._setupInterval();
                }
			}
		},

        '.paused' : function(){
			return this._state == OjTimer.PAUSED;
		},

		'=repeat_count' : function(repeat_count){
            var self = this;

			self._repeat_count = repeat_count = Math.max(repeat_count, 0);

			if(repeat_count >= self.count && self.running){
				self.stop();

				self.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
			}
		},

        '.running' : function(){
			return this._state == OjTimer.RUNNING;
		},

		'.stopped' : function(){
			return this._state == OjTimer.STOPPED;
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