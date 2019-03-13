importJs('oj.fx.OjPropTween');
importJs('oj.fx.OjTweenEvent');


OJ.extendClass(
    'OjFade', [OjPropTween],
    {
        '_props_' : {
            'direction' : null,
            'duration'  : null
        },

        '_force' : false,


        "_constructor" : function(target, direction, duration, easing){
            this._super(OjPropTween, "_constructor", []);

            this._set("target", target);
            this._set("direction", direction, OjFade.IN);
            this._set("duration", duration, 250);
            this._set("easing", easing, OjEasing.NONE);
        },


        '_onComplete' : function(evt){
            if(this.direction == OjFade.NONE){
                this.target.alpha = 1;
                this.target.hide();
            }

            this._super(OjPropTween, '_onComplete', arguments);
        },


        'start' : function(){
            // for some reason this happens every once and awhile
            var target = this.target;

            if(!target){
                return;
            }

            if(!this._to){
                this._to = {};
            }

            if(this.direction == OjFade.IN){
                if(this._force || target.alpha == 1){
                    target.alpha = 0;
                }

                this._to.alpha = 1;
            }
            else{
                if(this._force || target.alpha == 0){
                    target.alpha = 1;
                }

                this._to.alpha = 0;
            }

            target.show();

            this._super(OjPropTween, 'start', arguments);
        }
    },
    {
        'IN'   : 'fadeIn',
        'NONE' : 'fadeNone',
        'OUT'  : 'fadeOut'
    }
);