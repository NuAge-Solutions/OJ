OJ.importJs("oj.fx.OjTween");"use strict";OJ.extendClass("OjPropTween",[OjTween],{_props_:{mode:"Javascript",target:null},_callback:null,_delta:null,_from_cache:null,_constructor:function(){this._super(OjTween,"_constructor",[]);var b=arguments.length;if(b){this.setTarget(arguments[0]);if(b>1){this.setTo(arguments[1]);if(b>2){this.setDuration(arguments[2]);if(b>3){this.setEasing(arguments[3])}}}}var a=OJ.getEngine();if(a==OJ.WEBKIT&&!OJ.isMobile()){}},_destructor:function(){this._callback=null;return this._super(OjTween,"_destructor",arguments)},_calculateDelta:function(){this._from_cache={};this._delta={};var d=!isEmptyObject(this._from),a,b,c="";for(a in this._to){b="set"+a.ucFirst();if(!d){this._from[a]=this._target["get"+a.ucFirst()]()}this._from_cache[b]=parseFloat(this._from[a]);this._delta[b]=parseFloat(this._to[a])-this._from_cache[b];if(c!=""){c+=", "}c+=OjPropTween.PROPERTY_CSS_MAP[a]}},_isAnimating:function(a){if(this._target&&this._target.is("OjComponent")){this._target._setIsAnimating(a)}},_tick:function(b){var a;for(a in this._delta){this._target[a](this._easing(b,this._from_cache[a],this._delta[a],this._duration,0,0))}},_onComplete:function(a){this._isAnimating(false);this._super(OjTween,"_onComplete",arguments)},_onTargetDestroy:function(a){this._super(OjTween,"stop",arguments);this.setTarget(null)},_onWebKitComplete:function(a){var b=OjPropTween.CSS_PROPERTY_MAP[a.propertyName];if(isUndefined(this._from[b])){return}this._target._setStyle("-webkit-transition-duration",null);this._target._setStyle("-webkit-transition-property",null);this._target.dom().removeEventListener("webkitTransitionEnd",this._callback,false);this._onComplete(a);this._callback=null},pause:function(){this._isAnimating(false);this._super(OjTween,"pause",arguments)},start:function(){if(!isSet(this._target)||!isSet(this._to)){return}if(!isSet(this._from)){this._from={}}this._isAnimating(true);if(this._mode==OjPropTween.WEBKIT){var a;this._calculateDelta();this._target._setStyle("-webkit-transition-duration",this._duration+"ms");this._target._setStyle("-webkit-transition-property",transition_properties);this._target.dom().addEventListener("webkitTransitionEnd",this._callback=this._onWebKitComplete.bind(this),false);for(a in this._delta){this._target[a](this._from_cache[a]+this._delta[a])}}else{this._super(OjTween,"start",arguments)}},stop:function(){this._isAnimating(false);this._super(OjTween,"stop",arguments)},setMode:function(a){if(this._mode==a){return}this._mode=a;if(this._timer){OJ.destroy(this._timer)}},setTarget:function(a){if(this._target==a){return}if(this._target){this._target.removeEventListener(OjEvent.DESTROY,this,"_onTargetDestroy")}if(this._target=a){this._target.addEventListener(OjEvent.DESTROY,this,"_onTargetDestroy")}}},{PROPERTY_CSS_MAP:{alpha:"opacity",x:"left",y:"top",width:"width",height:"height"},CSS_PROPERTY_MAP:{opacity:"alpha",left:"x",right:"y",width:"width",height:"height"},JS:"Javascript",WEBKIT:"WebKit"});