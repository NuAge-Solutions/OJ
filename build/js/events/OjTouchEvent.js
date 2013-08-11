OJ.importJs("oj.events.OjDomEvent");"use strict";OJ.extendClass("OjTouchEvent",[OjDomEvent],{_get_props_:{pageX:NaN,pageY:NaN},_constructor:function(a){var b=arguments.length;this._super(OjDomEvent,"_constructor",b>3?[].slice.call(arguments,0,3):arguments);if(b>3){this._pageX=arguments[3];if(b>4){this._pageY=arguments[4]}}},clone:function(){var a=this._super(OjDomEvent,"clone",arguments);a._pageX=this._pageX;a._pageY=this._pageY;return a}},{convertDomEvent:function(a){var c;a=OjDomEvent.normalizeDomEvent(a);if(a.type==OjDomEvent.TOUCH_END){c=OjTouchEvent.END}else{if(a.type==OjDomEvent.TOUCH_MOVE){c=OjTouchEvent.MOVE}else{if(a.type==OjDomEvent.TOUCH_START){c=OjTouchEvent.START}}}var b=new OjTouchEvent(c,a.changedTouches[0].pageX,a.changedTouches[0].pageY,a.bubbles,a.cancelable);b._target=OjElement.element(a.target);b._currentTarget=OjElement.element(a.currentTarget);return b},isTouchEvent:function(a){return a==OjTouchEvent.END||a==OjTouchEvent.MOVE||a==OjTouchEvent.START},isTouchDomEvent:function(a){return a==OjDomEvent.TOUCH_END||a==OjDomEvent.TOUCH_MOVE||a==OjDomEvent.TOUCH_START},START:"onTouchStart",MOVE:"onTouchMove",END:"onTouchEnd"});