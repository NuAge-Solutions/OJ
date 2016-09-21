importJs('oj.dom.OjCssTranslate');
importJs('oj.utils.OjTimer');


OJ.extendComponent(
    'OjSpinner', [OjComponent],
    {
        '_props_' : {
            'numBlades' : null,
            'period'    : 1,
            'tint'      : '#FFFFFF'
        },

        '_position' : 0,  '_template' : 'oj.components.OjSpinner',


        '_constructor' : function(/*tint, period, num_blades*/){
            var args = arguments,
                ln = args.length,
                num_blades = 13;

            this._super(OjComponent, '_constructor', []);

            if(ln){
                this.tint = args[0];

                if(ln > 1){
                    this.period = args[1];

                    if(ln > 2){
                        num_blades = args[2];
                    }
                }
            }

            this._translate = new OjCssTranslate(70, 0, '%');

            // setup the timer
            this._timer = new OjTimer(1000, 0);
            this._timer.addEventListener(OjTimer.TICK, this, '_onTimer');

            // setup the blades
            this.numBlades = num_blades;

            // start the timer/animation
            this.start();
        },

        '_destructor' : function(){
            this._unset('_timer');

            return this._super(OjComponent, '_destructor', arguments);
        },


        '_setIsDisplayed' : function(){
            var timer = this._timer;

            this._super(OjComponent, '_setIsDisplayed', arguments);

            if(timer){
                timer[this._is_displayed ? 'start' : 'stop']();
            }
        },

        '_updateTimer' : function(){
            this._timer.duration = (this._period * 1000) / this._numBlades;
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

            this._super(OjComponent, 'hide', arguments);
        },

        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){

                var ln = this._numBlades, elm, pos;

                for(; ln--;){
                    elm = this.wrapper.getChildAt(ln);

                    // calculate the translated position
                    pos = (ln - this._position) % this._numBlades;

                    if(pos < 0){
                        pos = pos + this._numBlades;
                    }

                    elm.alpha = Math.max(1 - (pos / this._numBlades), .2);
                }

                return true;
            }

            return false;
        },

        'show' : function(){
            if(this._running){
                this._timer.start();
            }

            this._super(OjComponent, 'show', arguments);
        },

        'start' : function(){
            this._timer.start();

            this._running = true;
        },

        'stop' : function(){
            this._timer.pause();

            this._running = false;
        },


        '=alpha' : function(val){
            if(this._running){
                if(val == 0){
                    this._timer.pause();
                }
                else{
                    this._timer.start();
                }
            }

            this._super(OjComponent, '=alpha', arguments);
        },

        '=numBlades' : function(val){
            var ln, elm, section;

            if(this._numBlades == val){
                return;
            }

            this._numBlades = val;

            // redraw the blades
            ln = this._numBlades;
            section = 360 / ln;

            this.wrapper.removeAllChildren();

            for(; ln--;){
                elm = new OjStyleElement();
                elm.addCss('blade');
                elm.rotation = section * ln;
                elm.translate = this._translate;
                elm.background_color = this._tint;

                this.wrapper.appendChild(elm);
            }

            // redraw the tint
            this.redraw();

            // update the timer
            this._updateTimer();
        },

        '=period' : function(val){
            if(this._period == val){
                return;
            }

            this._period = val;

            // update the timer
            this._updateTimer();
        },

        '=tint' : function(val){
            var ln;

            if(this._tint == val){
                return;
            }

            this._tint = val;

            ln = this._numBlades;

            for(; ln--;){
                this.wrapper.getChildAt(ln).background_color = this._tint;
            }
        }
    },
    {
        '_TAGS' : ['spinner']
    }
);