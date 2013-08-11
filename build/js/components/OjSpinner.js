OJ.importJs("oj.dom.OjCssTranslate");OJ.importJs("oj.timer.OjTimer");OJ.importCss("oj.components.OjSpinner");"use strict";OJ.extendComponent("OjSpinner",[OjComponent],{_props_:{numBlades:null,period:1,tint:"#FFFFFF"},_position:0,_template:"oj.components.OjSpinner",_constructor:function(){var a=arguments,b=a.length,c=13;this._super(OjComponent,"_constructor",[]);if(b){this.setTint(a[0]);if(b>1){this.setPeriod(a[1]);if(b>2){c=a[2]}}}this._translate=new OjCssTranslate(70,0,"%");this._timer=new OjTimer(1000,0);this._timer.addEventListener(OjTimer.TICK,this,"_onTimer");this.setNumBlades(c);this.start()},_destructor:function(){this._unset("_timer");return this._super(OjComponent,"_destructor",arguments)},_setIsDisplayed:function(){var a=this._timer;this._super(OjComponent,"_setIsDisplayed",arguments);if(a){a[this._is_displayed?"start":"stop"]()}},_updateTimer:function(){this._timer.setDuration((this._period*1000)/this._numBlades)},_onTimer:function(){if(this._position==0){this._position=this._numBlades}this._position--;this.redraw()},hide:function(){this._timer.pause();this._super(OjComponent,"hide",arguments)},redraw:function(){if(this._super(OjComponent,"redraw",arguments)){var a=this._numBlades,c,b;for(;a--;){c=this.wrapper.getChildAt(a);b=(a-this._position)%this._numBlades;if(b<0){b=b+this._numBlades}c.setAlpha(Math.max(1-(b/this._numBlades),0.2))}return true}return false},show:function(){if(this._running){this._timer.start()}this._super(OjComponent,"show",arguments)},start:function(){this._timer.start();this._running=true},stop:function(){this._timer.pause();this._running=false},setAlpha:function(a){if(this._running){if(a==0){this._timer.pause()}else{this._timer.start()}}this._super(OjComponent,"setAlpha",arguments)},setNumBlades:function(c){var a,d,b;if(this._numBlades==c){return}this._numBlades=c;a=this._numBlades;b=360/a;for(;a--;){d=new OjStyleElement();d.addCss("blade");d.setRotation(b*a);d.setTranslate(this._translate);d.setBackgroundColor(this._tint);this.wrapper.addChild(d)}this.redraw();this._updateTimer()},setPeriod:function(a){if(this._period==a){return}this._period=a;this._updateTimer()},setTint:function(b){var a;if(this._tint==b){return}this._tint=b;a=this._numBlades;for(;a--;){this.wrapper.getChildAt(a).setBackgroundColor(this._tint)}}},{_TAGS:["spinner"]});