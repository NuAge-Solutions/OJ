OJ.importJs("oj.events.OjEvent");"use strict";OJ.extendClass("OjTweenEvent",[OjEvent],{_get_props_:{progress:0,value:0},_constructor:function(e,g,d){var d=0,b=false,a=false,c=arguments,f=c.length;this._value=g;this._progress=d;if(f>3){b=c[3];if(f>4){a=c[4]}}this._super(OjEvent,"_constructor",[e,b,a])}},{TICK:"onTweenTick",COMPLETE:"onTweenComplete"});