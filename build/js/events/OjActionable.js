OJ.importJs("oj.data.OjObject");"use strict";OJ.extendClass("OjActionable",[OjObject],{_props_:{eventProxy:null},_prevent_dispatch:false,_constructor:function(){this._eventProxy=this;this._super(OjObject,"_constructor",arguments)},_destructor:function(){if(this._eventProxy){this.dispatchEvent(new OjEvent(OjEvent.DESTROY));this.removeAllListeners();this._eventProxy=null}return this._super(OjObject,"_destructor",arguments)},_listeners:function(a){return null},_updateListeners:function(e,b){var b=b.ucFirst(),d=e=="add"?"addEventListener":"removeEventListener",a=this._listeners(b),c=a?a.length:0,f;if(c){if((f=a[0])&&f[d]){if(c>1){f[d](a[1],this,"_on"+b)}if(c>2){f[d](a[2],this,"_on"+b+"Fail")}}}},addEventListener:function(b,a,c){EventManager.addEventListener(this._eventProxy,b,a,c)},hasEventListener:function(a){return EventManager.hasEventListener(this._eventProxy,a)},hasEventListeners:function(b){var a=arguments,c=a.length;if(c==1){if(isArray(a[0])){a=a[0];c=a.length}else{a=[a[0]];c=1}}for(;c--;){if(!EventManager.hasEventListener(this._eventProxy,a[c])){return false}}return true},removeAllListeners:function(){return EventManager.removeAllListeners(this._eventProxy)},removeEventListener:function(b,a,c){EventManager.removeEventListener(this._eventProxy,b,a,c)},dispatchEvent:function(a){if(this._prevent_dispatch||a.isCanceled()){return}EventManager.dispatchEvent(this._eventProxy,a)},setEventProxy:function(a){if(this._eventProxy){this.removeAllListeners()}this._eventProxy=a}});