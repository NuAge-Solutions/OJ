OJ.importJs("oj.components.OjItemRenderer");OJ.importJs("oj.media.OjImage");"use strict";OJ.extendComponent("OjListItem",[OjItemRenderer],{_props_:{showAccessory:false,showIcon:false},accessory:null,content:null,icon:null,_constructor:function(){this._super(OjItemRenderer,"_constructor",[]);this.addChild(this.accessory=new OjStyleElement('<div class="-accessory valign-middle"></div>'));this.addChild(this.icon=new OjImage());this.addChild(this.content=new OjStyleElement('<div class="-content valign-middle"></div>'));this.icon.addCss("-icon");if(arguments.length){this.setData(arguments[0])}},_destructor:function(){if(this._data&&this._data.is&&this._data.is("OjActionable")){this._data.removeEventListener(OjEvent.CHANGE,this,"_onDataChange")}this._list=this._data=null;return this._super(OjItemRenderer,"_destructor",arguments)},_redrawAccessory:function(){if(this._showAccessory){this.removeCss(["no-accessory"])}else{this.addCss(["no-accessory"])}},_redrawData:function(){this.content.setText(this._data)},_redrawIcon:function(){if(this._showIcon){this.removeCss(["no-icon"])}else{this.addCss(["no-icon"])}},redraw:function(){if(this._super(OjItemRenderer,"redraw",arguments)){this._redrawData();this._redrawAccessory();this._redrawIcon();return true}return false},_onDataChange:function(a){this._redrawData()},setData:function(a){if(this._data&&this._data.is&&this._data.is("OjActionable")){this._data.removeEventListener(OjEvent.CHANGE,this,"_onDataChange")}this._data=a;if(this._data&&this._data.is&&this._data.is("OjActionable")){this._data.addEventListener(OjEvent.CHANGE,this,"_onDataChange")}this.redraw()},setShowAccessory:function(a){if(this._showAccessory==a){return}this._showAccessory=a;this.redraw()},setShowIcon:function(a){if(this._showIcon==a){return}this._showIcon=a;this.redraw()}},{_TAGS:["listitem"]});