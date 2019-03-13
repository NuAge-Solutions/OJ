importJs("oj.events.OjActionable");


OJ.extendClass(
    "OjTimer", [OjActionable],
    {
        "_props_" : {
            "duration"    : null,
            "on_complete" : null,
            "on_tick" : null,
            "repeat_count" : null // run n additional times, negative value means run forever

        },

        "_get_props_" : {
            "count" : 0,
            "paused" : null,
            "running" : null,
            "state" : null,
            "stopped" : null
        },

        "_elapsed" : 0,


        "_constructor" : function(duration, repeat_count){
            this._super(OjActionable, "_constructor", []);

            this._state = OjTimer.STOPPED;

            this._set("duration", duration, 0);
            this._set("repeat_count", repeat_count, 1);
        },


        "_setupInterval" : function(){
            const self = this,
                intrvl = self._interval;

            if(intrvl){
                clearInterval(intrvl);
            }

            self._interval = setInterval(() => { self._tick(); }, self.duration);

            self._updateLastTick();
        },

        "_tick" : function(){
            const on_complete = this.on_complete,
                on_tick = this.on_tick,
                repeat = this.repeat_count;

            this._updateLastTick();

            if(on_tick){
                on_tick(this);
            }

            this.dispatchEvent(new OjEvent(OjTimer.TICK));

            if(repeat > 0 && this._count++ == repeat){
                this.stop();

                if(on_complete){
                    on_complete(this);
                }

                this.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
            }
        },

        "_updateLastTick" : function(){
            this._last_tick = new Date();
            this._elapsed = 0;
        },


        "pause" : function(){
            const last_tick = this._last_tick,
                intrvl = this._interval;

            this._elapsed = last_tick ? (new Date()).getTime() - last_tick.getTime() : 0;
            this._state = OjTimer.PAUSED;

            if(intrvl){
                // todo: there is an edge case where this could be a timeout from a partial resume. not sure what to do.
                clearInterval(intrvl);

                this._interval = null;
            }
        },

        "restart" : function(){
            this.stop();

            this.start();
        },

        "start" : function(){
            const self = this,
                elapsed = self._elapsed;

            if(!self._interval){
                self._elapsed = 0;
                self._state = OjTimer.RUNNING;

                // check to see if we have a partial we need to complete
                if(elapsed && elapsed < self.duration){
                    self._last_tick = new Date((new Date().getTime() - elapsed)); // post date the last tick

                    // run the last little bit of the tick
                    self._interval = setTimeout(
                        () => {
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

        "stop" : function(){
            this.pause();

            this._count = 0;
            this._elapsed = 0;

            this._state = OjTimer.STOPPED;
        },


        "=duration" : function(duration){
            if(this._duration != duration){
                this._duration = Math.abs(duration);
                this._elapsed = 0;

                if(this._interval){
                    this._setupInterval();
                }
            }
        },

        ".paused" : function(){
            return this._state == OjTimer.PAUSED;
        },

        "=repeat_count" : function(repeat_count){
            this._repeat_count = repeat_count = Math.max(repeat_count, 0);

            if(repeat_count >= this.count && this.running){
                this.stop();

                this.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
            }
        },

        ".running" : function(){
            return this._state == OjTimer.RUNNING;
        },

        ".stopped" : function(){
            return this._state == OjTimer.STOPPED;
        }
    },
    {
        "TICK"     : "onTimerTick",
        "COMPLETE" : "onTimerComplete",

        "PAUSED"   : "paused",
        "RUNNING"  : "running",
        "STOPPED"  : "stopped",


        "SECOND"   : 1000,
        "MINUTE"   : 60000,
        "HOUR"     : 3600000,
        "DAY"      : 86400000,


        "cancel" : function(id){
            clearTimeout(id);

            return null;
        },
        
        "delay" : function(callback, duration, id){
            var self = this;

            if(id){
                self.cancel(id);
            }

            return setTimeout(callback, duration);
        }
    }
);