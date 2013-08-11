OJ.importJs('oj.fx.OjTween');


'use strict';

OJ.extendClass(
	'OjPropTween', [OjTween],
	{
		'_props_' : {
			'mode'     : 'Javascript',
			'target'   : null
		},

		'_callback' : null,  '_delta' : null,  '_from_cache' : null,


		'_constructor' : function(/*target = null, to = null, duration = 500, easing = NONE*/){
			this._super(OjTween, '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setTarget(arguments[0]);

				if(ln > 1){
					this.setTo(arguments[1]);

					if(ln > 2){
						this.setDuration(arguments[2]);

						if(ln > 3){
							this.setEasing(arguments[3]);
						}
					}
				}
			}

			var engine = OJ.getEngine();

			if(engine == OJ.WEBKIT && !OJ.isMobile()){
//						this._mode = OjPropTween.WEBKIT;
			}
		},

		'_destructor' : function(){
			this._callback = null;

			return this._super(OjTween, '_destructor', arguments);
		},


		'_calculateDelta' : function(){
			this._from_cache = {};
			this._delta = {};

			var has_from = !isEmptyObject(this._from), key, new_key, transition_properties = '';

			for(key in this._to){
				new_key = 'set' + key.ucFirst();

				if(!has_from){
					this._from[key] = this._target['get' + key.ucFirst()]();
				}

				this._from_cache[new_key] = parseFloat(this._from[key]);

				this._delta[new_key] = parseFloat(this._to[key]) - this._from_cache[new_key];

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
			var key;

			for(key in this._delta){
				this._target[key](this._easing(time, this._from_cache[key], this._delta[key], this._duration, 0, 0));
			}
		},


		'_onComplete' : function(evt){
			this._isAnimating(false);

			this._super(OjTween, '_onComplete', arguments);
		},

		'_onTargetDestroy' : function(evt){
			this._super(OjTween, 'stop', arguments);

			this.setTarget(null);
		},

		'_onWebKitComplete' : function(evt){
			var prop = OjPropTween.CSS_PROPERTY_MAP[evt.propertyName];

			if(isUndefined(this._from[prop])){
				return;
			}

			// cleanup the webkit transition settings
			this._target._setStyle('-webkit-transition-duration', null);

			this._target._setStyle('-webkit-transition-property', null);

			this._target.dom().removeEventListener('webkitTransitionEnd', this._callback, false);

			this._onComplete(evt);

			this._callback = null;
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
				this._target.dom().addEventListener('webkitTransitionEnd', this._callback = this._onWebKitComplete.bind(this), false);

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


		'setMode' : function(val){
			if(this._mode == val){
				return;
			}

			this._mode = val;

			if(this._timer){
				OJ.destroy(this._timer);
			}
		},

		'setTarget' : function(target){
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
			'alpha'     : 'opacity',
			'x'         : 'left',
			'y'         : 'top',
			'width'     : 'width',
			'height'    : 'height'
		},

		'CSS_PROPERTY_MAP' : {
			'opacity'   : 'alpha',
			'left'      : 'x',
			'right'     : 'y',
			'width'     : 'width',
			'height'    : 'height'
		},

		'JS'     : 'Javascript',
		'WEBKIT' : 'WebKit'
	}
);