OJ.importJs('oj.fx.OjTween');




OJ.extendClass(
    'OjPropTween', [OjTween],
    {
        '_props_' : {
            'mode' : 'Javascript',
            'target' : null,
            'units' : null
        },

        //'_callback' : null, '_delta' : null, '_from_cache' : null,


        '_constructor' : function(/*target = null, to = null, duration = 500, easing = NONE, units = null*/){
            this._super(OjTween, '_constructor', []);

            this._processArguments(arguments, {
                'target' : undefined,
                'to' : undefined,
                'duration' : 250,
                'easing' : OjEasing.NONE,
                'units' : undefined
            });

//			var engine = OJ.getEngine();
//
//			if(engine == OJ.WEBKIT && !OJ.isMobile()){
//						this._mode = OjPropTween.WEBKIT;
//			}
        },

        '_destructor' : function(){
            this._callback = null;

            return this._super(OjTween, '_destructor', arguments);
        },


        '_calculateDelta' : function(){
            var self = this,
                target = self.target;

            self._from_cache = {};
            self._delta = {};

            var has_from = !isEmptyObject(self._from), key, transition_properties = '';

            for(key in self._to){
                if(!has_from){
                    self._from[key] = target[key];
                }

                self._from_cache[key] = parseFloat(self._from[key]);

                self._delta[key] = parseFloat(self._to[key]) - self._from_cache[key];

                if(transition_properties != ''){
                    transition_properties += ', ';
                }

                transition_properties += OjPropTween.PROPERTY_CSS_MAP[key];
            }
        },

        '_isAnimating' : function(val){
            if(this._target && this._target.is('OjComponent')){
                this._target._setIsAnimating(val);
            }
        },

        '_tick' : function(time){
            var key,
                self = this,
                duration = self.duration,
                delta = self._delta,
                easing = self.easing,
                target = self.target,
                units = self.units;

            for(key in delta){
                var args = [
                    Math.round(
                        easing(time, self._from_cache[key], delta[key], duration, 0, 0) * 1000
                    ) / 1000
                ];

                if(units){
                    args.append(units);
                }

                target[key] = args;
            }
        },


        '_onComplete' : function(evt){
            this._isAnimating(false);

            this._super(OjTween, '_onComplete', arguments);
        },

        '_onTargetDestroy' : function(evt){
            this._super(OjTween, 'stop', arguments);

            this.target = null;
        },

        '_onWebKitComplete' : function(evt){
            var self = this,
                target = self.target,
                prop = OjPropTween.CSS_PROPERTY_MAP[evt.propertyName];

            if(isUndefined(self._from[prop])){
                return;
            }

            // cleanup the webkit transition settings
            target._setStyle('-webkit-transition-duration', null);

            target._setStyle('-webkit-transition-property', null);

            target.dom.removeEventListener('webkitTransitionEnd', self._callback, false);

            self._onComplete(evt);

            self._callback = null;
        },


        'pause' : function(){
            this._isAnimating(false);

            this._super(OjTween, 'pause', arguments);
        },

        'start' : function(){
            if(!isSet(this._target) || !isSet(this._to)){
                return;
            }

            if(!isSet(this._from)){
                this._from = {};
            }

            this._isAnimating(true);

            if(this._mode == OjPropTween.WEBKIT){
                var key;

                this._calculateDelta();

                this._target._setStyle('-webkit-transition-duration', this._duration + 'ms');
                this._target._setStyle('-webkit-transition-property', transition_properties);

                // add in easing setting later
                this._target.dom.addEventListener('webkitTransitionEnd', this._callback = this._onWebKitComplete.bind(this), false);

                for(key in this._delta){
                    this._target[key](this._from_cache[key] + this._delta[key]);
                }

                // maybe add fallback timer to trigger event in case something goes wrong...
            }
            else{
                this._super(OjTween, 'start', arguments);
            }
        },

        'stop' : function(){
            this._isAnimating(false);

            this._super(OjTween, 'stop', arguments);
        },


        '=mode' : function(val){
            if(this._mode == val){
                return;
            }

            this._mode = val;

            if(this._timer){
                OJ.destroy(this._timer);
            }
        },

        '=target' : function(target){
            if(this._target == target){
                return;
            }

            if(this._target){
                this._target.removeEventListener(OjEvent.DESTROY, this, '_onTargetDestroy');
            }

            if(this._target = target){
                this._target.addEventListener(OjEvent.DESTROY, this, '_onTargetDestroy');
            }
        }
    },
    {
        'PROPERTY_CSS_MAP' : {
            'alpha' : 'opacity',
            'x' : 'left',
            'y' : 'top',
            'width' : 'width',
            'height' : 'height'
        },

        'CSS_PROPERTY_MAP' : {
            'opacity' : 'alpha',
            'left' : 'x',
            'right' : 'y',
            'width' : 'width',
            'height' : 'height'
        },

        'JS' : 'Javascript',
        'WEBKIT' : 'WebKit'
    }
);