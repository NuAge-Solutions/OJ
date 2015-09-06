OJ.importJs('oj.fx.OjPropTween');
OJ.importJs('oj.fx.OjTweenEvent');


OJ.extendClass(
    'OjFlip', [OjPropTween],
    {
        '_props_' : {
            'direction' : 'flipLeft', // OjFlip.LEFT
            'duration'  : 250
        },

        '_force' : false,


        '_constructor' : function(/*target = null, direction = IN, duration = 250, easing = NONE*/){
            this._super(OjPropTween, '_constructor', []);

            var args = arguments,
                ln = args.length;

            if(ln){
                this.target = args[0];

                if(ln > 1){
                    this.direction = args[1];

                    if(ln > 2){
                        this.duration = args[2];

                        if(ln > 3){
                            this.easing = args[3];
                        }
                    }
                }
            }
        },


        '_onComplete' : function(evt){
            if(this._direction == OjFade.NONE){
                this._target.alpha = 1;
                this._target.hide();
            }

            this._super(OjPropTween, '_onComplete', arguments);
        },


        'start' : function(){
            // for some reason this happens every once and awhile
            if(!this._target){
                return;
            }

            if(!this._to){
                this._to = {};
            }

            if(this._direction == OjFlip.DOWN){
                if(this._force || this._target.alpha == 1){
                    this._target.alpha = 0;
                }

                this._to.alpha = 1;
            }
            else if(this._direction == OjFlip.RIGHT){
                if(this._force || this._target.alpha == 1){
                    this._target.alpha = 0;
                }

                this._to.alpha = 1;
            }
            else if(this._direction == OjFlip.UP){
                if(this._force || this._target.alpha == 1){
                    this._target.alpha = 0;
                }

                this._to.alpha = 1;
            }
            else{
                if(this._force || this._target.alpha == 0){
                    this._target.alpha = 1;
                }

                this._to.alpha = 0;
            }

            this._target.show();

            this._super(OjPropTween, 'start', arguments);
        }
    },
    {
        'DOWN'  : 'flipDown',
        'LEFT'  : 'flipLeft',
        'RIGHT' : 'flipRight',
        'UP'    : 'flipUp'
    }
);