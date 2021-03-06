importJs("oj.fx.OjTween");




OJ.extendClass(
    "OjPropTween", [OjTween],
    {
        "_props_" : {
            "mode" : "Javascript",
            "target" : null,
            "units" : null
        },


        "_constructor" : function(target, to, duration, easing, units){
            this._super(OjTween, "_constructor", []);

            this._set("target", target);
            this._set("to", to);
            this._set("duration", duration, 250);
            this._set("easing", easing, OjEasing.NONE);
            this._set("units", units);

//            var engine = OJ.getEngine();
//
//            if(engine == OJ.WEBKIT && !OJ.isMobile()){
//                        this._mode = OjPropTween.WEBKIT;
//            }
        },

        "_destructor" : function(){
            this._callback = null;

            return this._super(OjTween, "_destructor", arguments);
        },


        "_calculateDelta" : function(){
            var self = this,
                target = self.target;

            self._from_cache = {};
            self._delta = {};

            var has_from = !isEmptyObject(self._from), key, transition_properties = '';

            for(key in self._to){
                if(!has_from){
                    self._from[key] = target[key] || 0;
                }

                self._from_cache[key] = parseFloat(self._from[key]);

                self._delta[key] = parseFloat(self._to[key]) - self._from_cache[key];

                if(transition_properties != ''){
                    transition_properties += ', ';
                }

                transition_properties += (OjPropTween.PROPERTY_CSS_MAP[key] || key);
            }
        },

        "_is_animating" : function(val){
            if(this._target && this._target.is("OjComponent")){
                this._target._setIsAnimating(val);
            }
        },

        "_tick" : function(time){
            const self = this,
                cache = self._from_cache,
                duration = self.duration,
                delta = self._delta,
                easing = self.easing,
                target = self.target,
                units = self.units;

            if(target && cache && delta){
                for(const key in delta){
                    const args = [
                        Math.round(
                            easing(time, cache[key], delta[key], duration, 0, 0) * 1000
                        ) / 1000
                    ];

                    if(units){
                        args.append(units);
                    }

                    target[key] = args;
                }
            }

            self._super(OjTween, "_tick", arguments);
        },


        "_onComplete" : function(evt){
            this._is_animating(false);

            this._super(OjTween, "_onComplete", arguments);
        },

        "_onTargetDestroy" : function(evt){
            this.target = null;
        },

        "_onWebKitComplete" : function(evt){
            var self = this,
                target = self.target,
                prop = OjPropTween.CSS_PROPERTY_MAP[evt.propertyName] || evt.propertyName;

            if(isUndefined(self._from[prop])){
                return;
            }

            // cleanup the webkit transition settings
            target._setStyle("-webkit-transition-duration", null);

            target._setStyle("-webkit-transition-property", null);

            target.dom.removeEventListener("webkitTransitionEnd", self._callback, false);

            self._onComplete(evt);

            self._callback = null;
        },


        "pause" : function(){
            this._is_animating(false);

            this._super(OjTween, "pause", arguments);
        },

        "start" : function(){
            if(!isSet(this._target) || !isSet(this._to)){
                return;
            }

            if(!isSet(this._from)){
                this._from = {};
            }

            this._is_animating(true);

            if(this._mode == OjPropTween.WEBKIT){
                var key;

                this._calculateDelta();

                this._target._setStyle("-webkit-transition-duration", this._duration + "ms");
                this._target._setStyle("-webkit-transition-property", transition_properties);

                // add in easing setting later
                this._target.dom.addEventListener("webkitTransitionEnd", this._callback = this._onWebKitComplete.bind(this), false);

                for(key in this._delta){
                    this._target[key](this._from_cache[key] + this._delta[key]);
                }

                // maybe add fallback timer to trigger event in case something goes wrong...
            }
            else{
                this._super(OjTween, "start", arguments);
            }
        },

        "stop" : function(){
            this._is_animating(false);

            this._super(OjTween, "stop", arguments);
        },


        "=mode" : function(val){
            if(this._mode == val){
                return;
            }

            this._mode = val;

            if(this._timer){
                OJ.destroy(this._timer);
            }
        },

        "=target" : function(target){
            if(this._target == target){
                return;
            }

            if(this._target){
                this._target.removeEventListener(OjEvent.DESTROY, this, "_onTargetDestroy");
            }

            if(this._target = target){
                this._target.addEventListener(OjEvent.DESTROY, this, "_onTargetDestroy");
            }
        }
    },
    {
        "PROPERTY_CSS_MAP" : {
            "alpha" : "opacity",
            "x" : "left",
            "y" : "top"
        },

        "CSS_PROPERTY_MAP" : {
            "opacity" : "alpha",
            "left" : "x",
            "right" : "y"
        },

        "JS" : "Javascript",
        "WEBKIT" : "WebKit"
    }
);