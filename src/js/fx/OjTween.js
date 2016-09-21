importJs('oj.events.OjActionable');
importJs('oj.fx.OjEasing');
importJs('oj.fx.OjTweenEvent');
importJs('oj.utils.OjTimer');


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


OJ.extendClass(
    'OjTween', [OjActionable],
    {
        '_props_' : {
            'duration' : null,
            'easing' : null,
            'from' : null,
            'quality' : 60,  // frame rate
            'to' : null
        },

//      '_animationFrame': null,  '_onAnimationFrame': null,  '_start': null,  '_timer': null,

        '_delta' : 0, '_progress' : 0,


        '_constructor' : function(/*from = null, to = null, duration = 500, easing = NONE*/){
            this._super(OjActionable, '_constructor', []);

            this._processArguments(arguments, {
                'from' : undefined,
                'to' : undefined,
                'duration' : 250,
                'easing' : OjEasing.NONE
            });

            this._onAnimationFrame = this._onTick.bind(this);
        },


        '_destructor' : function(){
            this.stop();

            this._unset(['_timer', '_onAnimationFrame']);

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
            var time = Math.min(Date.now() - this._start, this._duration);

            this._tick(time);

            if(time == this._duration){
                this.stop();

                this._onComplete(evt);
            }
            else if(this._animationFrame){
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

            this._start = Date.now() - this._progress;

            // only create the time once
            if(OjTween.USE_RAF){
                this._animationFrame = window.requestAnimationFrame(this._onAnimationFrame);
            }
            else{
                this._interval = setInterval(this._onAnimationFrame, 1000 / this._quality);
            }
        },

        'pause' : function(){
            if(this._animationFrame){
                window.cancelAnimationFrame(this._animationFrame);

                return this._animationFrame = null;
            }

            this._interval = clearInterval(this._interval);
            this._progress = Date.now() - this._start;
        },

        'stop' : function(){
            this.pause();

            this._progress = this._start = 0;
        },

        'restart' : function(){
            this.stop();

            this.start();
        },

        'reverse' : function(){
            // todo: implement tween reverse
        }
    },
    {
        'USE_RAF' : (OJ.os != OJ.IOS || OJ.os_version.compareVersion('6.9') == 1 || !OJ.is_webview()) && window.requestAnimationFrame
    }
);