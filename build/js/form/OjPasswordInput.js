OJ.importJs("oj.form.OjTextInput");"use strict";OJ.extendClass("OjPasswordInput",[OjTextInput],{_min:6,_max:30,_setDom:function(a){this._super(OjTextInput,"_setDom",arguments);this.input.setAttr("type","password")}});