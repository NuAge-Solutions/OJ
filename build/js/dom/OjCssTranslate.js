"use strict";OJ.extendClass(OjObject,"OjCssTranslate",{_props_:{x:0,unitX:OJ.setting("dimUnit"),unitY:OJ.setting("dimUnit"),y:0},_constructor:function(){var a=arguments,b=a.length;this._super("OjCssTranslate","_constructor",[]);if(b){this.setX(a[0]);if(b>1){this.setY(a[1]);if(b>2){this.setUnitX(a[2]);if(b>3){this.setUnitY(a[3])}}}}},clone:function(){var a=this._super("OjCssTranslate","clone",arguments);a._x=this._x;a._unitX=this._unitX;a._unitY=this._unitY;a._y=this._y;return a},isEqualTo:function(a){return a&&a._x==this._x&&a._unitX==this._unitX&&a._unitY==this._unitY&&a._y==this._y},toString:function(){return !this._x&&!this._y?"":String(this._x)+this._unitX+", "+String(this._y)+this._unitY}});