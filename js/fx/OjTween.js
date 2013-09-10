OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.fx.OjEasing');
OJ.importJs('oj.fx.OjTweenEvent');
OJ.importJs('oj.timer.OjTimer');


'use strict';

OJ.extendClass(
	'OjTween', [OjActionable],
	{
		'_props_' : {
			'duration' : null,
			'easing'   : null,
			'from'     : null,
			'quality'  : 60,  // frame rate
			'to'       : null
		},

//	  '_animationFrame': null,	'_callback': null,  '_onAnimationFrame': null,  '_start': null,  '_timer': null,

		'_delta' : 0,


		'_constructor' : function(/*from = null, to = null, duration = 500, easing = NONE*/){
			this._super(OjActionable, '_constructor', []);

      this._processArguments(arguments, {
        'setFrom'     : null,
        'setTo'       : null,
        'setDuration' : 500,
        'setEasing'   : OjEasing.NONE
      });
		},


		'_destructor' : function(){
			this._unset('_timer');

			return this._super(OjActionable, '_destructor', arguments);
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
			var time = Math.min(Date.time() - this._start, this._duration);

      this._tick(time);

			if(time == this._duration){
				this.stop();

        this._onComplete(evt);
			}
      else if(this._onAnimationFrame){
        this._animationFrame = window.requestAnimationFrame(this._onAnimationFrame);
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

			this._calculateDelta();

      this._start = Date.time();

			// only create the time once
      if(window.requestAnimationFrame){
        if(!this._onAnimationFrame){
          this._onAnimationFrame = this._onTick.bind(this);
        }

        this._animationFrame = window.requestAnimationFrame(this._onAnimationFrame);
      }
      else{
        this._timer;

        if(!this._timer){
          this._timer = new OjTimer();

          this._timer.addEventListener(OjTimer.TICK, this, '_onTick');
        }
        else{
          this._timer.stop();
        }

        this._timer.setDuration(1000 / this._quality);

        this._timer.start();
      }
		},

		'pause' : function(){
      if(this._animationFrame){
        window.cancelAnimationFrame(this._animationFrame);

        this._animationFrame = null;
      }
      else if(this._timer){
        this._timer.pause();
      }
		},

		'stop' : function(){
      if(this._animationFrame){
        window.cancelAnimationFrame(this._animationFrame);

        this._animationFrame = null;
      }
      else if(this._timer){
        this._timer.stop();
      }
		},

		'restart' : function(){
			this._timer.restart();
		},

		'reverse' : function(){
			// todo: implement tween reverse
		}
	}
);

// normalize browser diff on requestAnimationFrame function
(function(){
  var vendors = ['o', 'ms', 'webkit', 'moz'],
      ln = vendors.length,
      vendor;

  for(; ln-- && !window.requestAnimationFrame;){
    vendor = vendors[ln];

    window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
  }
})();