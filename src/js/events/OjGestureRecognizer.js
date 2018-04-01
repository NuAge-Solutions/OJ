importJs('oj.data.OjObject');
importJs('oj.libs.Hammer');


OJ.extendClass(
    'OjGestureRecognizer', [OjObject],
    {
        '_props_' : {
            'callback' : null,
            "enable": true,
            'event' : null,
            'pointers' : null,
            'threshold' : null
        },


        '_constructor' : function(event, pointers, threshold, callback){
            var self = this;

            self._super(OjObject, '_constructor', []);

            self.event = event;
            self.pointers = pointers;
            self.threshold = threshold;

            self.callback = callback;
        },


        '_add' : function(hammer){
            var self = this,
                recognizer = self._recognizer;

            if(!recognizer){
                self._recognizer = recognizer = self._make();

                hammer.on(
                    self.oj_id,
                    function(evt){
                        var callback = self.callback;

                        if(callback){
                            callback(evt);
                        }
                    }
                );
            }

            hammer.add(recognizer);

            return hammer;
        },

        "_has" : function(hammer){
            var self = this,
                recognizer = self._recognizer;

            if(recognizer){
                return hammer.get(self.oj_id) != null;
            }

            return false;
        },

        '_make' : function(){
            var self = this,
                cls = self._cls,
                options = self._options();

            return cls ? new cls(options) : null;
        },

        '_options' : function(){
            var self = this;

            return {
                "enable"    : self.enable,
                'event'     : self.oj_id,
                'pointers'  : self.pointers,
                'threshold' : self.threshold
            };
        },

        '_remove' : function(hammer){
            var self = this,
                recognizer = self._recognizer;

            if(recognizer){
                hammer.remove(recognizer);
            }

            return hammer;
        },

        ".enable" : function(val){
            var self = this,
                recognizer = self._recognizer;

            if(recognizer){
                recognizer.set({"enable": val});
            }

            return self._enable = val;
        }
    },
    {
        'DOWN' : Hammer.DIRECTION_DOWN,
        'LEFT' : Hammer.DIRECTION_LEFT,
        'NONE' : Hammer.DIRECTION_NONE,
        'RIGHT' : Hammer.DIRECTION_RIGHT,
        'UP' : Hammer.DIRECTION_UP,

        'ALL' : Hammer.DIRECTION_ALL,
        'HORIZONTAL' : Hammer.HORIZONTAL,
        'VERTICAL' : Hammer.VERTICAL
    }
);


OJ.extendClass(
    'OjPanRecognizer', [OjGestureRecognizer],
    {
        '_props_' : {
            'direction' : null
        },


        '_constructor' : function(callback, direction, pointers, threshold){
            var self = this;

            self._cls = Hammer.Pan;

            self._super(OjGestureRecognizer, '_constructor', [
                self._static.PAN, Math.max(pointers || 1, 1), Math.max(threshold || 10, 1), callback
            ]);

            self.direction = direction || self._static.ALL;
        },


        '_options' : function(){
            var self = this,
                options = self._super(OjGestureRecognizer, '_options', arguments);

            options.direction = self.direction;

            return options;
        }
    },
    {
        'PAN'        : 'pan',
        'PAN_CANCEL' : 'pancancel',
        'PAN_DOWN'   : 'pandown',
        'PAN_END'    : 'panend',
        'PAN_LEFT'   : 'panleft',
        'PAN_MOVE'   : 'panmove',
        'PAN_RIGHT'  : 'panright',
        'PAN_START'  : 'panstart',
        'PAN_UP'     : 'panup'
    }
);


OJ.extendClass(
    'OjPinchRecognizer', [OjGestureRecognizer],
    {
        '_constructor' : function(callback, pointers, threshold){
            var self = this;

            self._cls = Hammer.Pinch;

            self._super(OjGestureRecognizer, '_constructor', [
                self._static.PINCH, Math.max(pointers || 1, 1), Math.max(threshold || 10, 1), callback
            ]);
        }
    },
    {
        'PINCH'        : 'pinch',
        'PINCH_CANCEL' : 'pinchcancel',
        'PINCH_END'    : 'pinchend',
        'PINCH_IN'     : 'pinchin',
        'PINCH_MOVE'   : 'pinchmove',
        'PINCH_OUT'    : 'pinchout',
        'PINCH_START'  : 'pinchstart'
    }
);


OJ.extendClass(
    'OjPressRecognizer', [OjGestureRecognizer],
    {
        '_props_' : {
            'time' : null
        },


        '_constructor' : function(callback, pointers, time, threshold){
            var self = this;

            self._cls = Hammer.Press;

            self._super(OjGestureRecognizer, '_constructor', [
                self._static.PRESS, Math.max(pointers || 1, 1), Math.max(threshold || 5, 1), callback
            ]);

            self.time = Math.max(time || 500, 10);
        },


        '_options' : function(){
            var self = this,
                options = self._super(OjGestureRecognizer, '_options', arguments);

            options.time = self.time;

            return options;
        }
    },
    {
        'PRESS'    : 'press',
        'PRESS_UP' : 'pressup'
    }
);



OJ.extendClass(
    'OjRotateRecognizer', [OjGestureRecognizer],
    {
        '_constructor' : function(callback, pointers, threshold){
            var self = this;

            self._cls = Hammer.Rotate;

            self._super(OjGestureRecognizer, '_constructor', [
                self._static.ROTATE, Math.max(pointers || 2, 2), Math.max(threshold || 0, 0), callback
            ]);
        }
    },
    {
        'ROTATE'        : 'rotate',
        'ROTATE_CANCEL' : 'rotatecancel',
        'ROTATE_END'    : 'rotateend',
        'ROTATE_MOVE'   : 'rotatemove',
        'ROTATE_START'  : 'rotatestart'
    }
);



OJ.extendClass(
    'OjSwipeRecognizer', [OjGestureRecognizer],
    {
        '_props_' : {
            'direction' : null,
            'velocity' : null
        },


        '_constructor' : function(callback, direction, pointers, velocity, threshold){
            var self = this;

            self._cls = Hammer.Swipe;

            self._super(OjGestureRecognizer, '_constructor', [
                self._static.SWIPE, Math.max(pointers || 1, 1), Math.max(threshold || 10, 1), callback
            ]);

            self.direction = direction || self._static.ALL;
            self.velocity = Math.max(velocity || 0.65, 0.01);
        },


        '_options' : function(){
            var self = this,
                options = self._super(OjGestureRecognizer, '_options', arguments);

            options.direction = self.direction;
            options.velocity = self.velocity;

            return options;
        }
    },
    {
        'SWIPE'       : 'swipe',
        'SWIPE_DOWN'  : 'swipedown',
        'SWIPE_LEFT'  : 'swipeleft',
        'SWIPE_RIGHT' : 'swiperight',
        'SWIPE_UP'    : 'swipeup'
    }
);



OJ.extendClass(
    'OjTapRecognizer', [OjGestureRecognizer],
    {
        '_props_' : {
            'interval' : null,
            'pos_threshold' : null,
            'taps' : null,
            'time' : null
        },


        '_constructor' : function(callback, taps, pointers, interval, time, threshold, pos_threshold){
            var self = this;

            self._cls = Hammer.Tap;

            self._super(OjGestureRecognizer, '_constructor', [
                self._static.TAP, Math.max(pointers || 1, 1), Math.max(threshold || 2, 1), callback
            ]);

            self.interval = Math.max(interval || 300, 10);
            self.pos_threshold = Math.max(pos_threshold || 10, 1);
            self.taps = Math.max(taps || 1, 1);
            self.time = Math.max(time || 250, 1);
        },


        '_options' : function(){
            var self = this,
                options = self._super(OjGestureRecognizer, '_options', arguments);

            options.interval = self.interval;
            options.pos_threshold = self.pos_threshold;
            options.taps = self.taps;
            options.time = self.time;

            return options;
        }
    },
    {
        'TAP' : 'tap'
    }
);

