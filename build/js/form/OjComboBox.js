OJ.importJs("oj.components.OjButton");OJ.importJs("oj.form.OjInput");OJ.importJs("oj.data.OjCollection");OJ.importJs("oj.list.OjList");OJ.importCss("oj.form.OjComboBox");"use strict";OJ.extendClass("OjComboBox",[OjInput],{_options:null,_options_dp:null,_options_index:null,_selected:null,_selected_index:null,_trigger_evt:null,_tween:null,_list:null,_list_visible:false,_ignore_click:false,_allow_none:false,_none_lbl:"-- Select -- ",_constructor:function(){var a=arguments.length;this._options_index=[];this._super(OjInput,"_constructor",a>2?[].slice.call(arguments,0,2):arguments);this._list=new OjList();this._list.addEventListener(OjListEvent.ITEM_CLICK,this,"_onItemClick");this._options_dp=this._list.getDataProvider();if(a>2){if(a>3){this.setOptions(arguments[3])}this.setValue(arguments[2])}this.input.removeEventListener(OjDomEvent.CHANGE,this,"_onChange");this.psuedoInput.addEventListener(OjMouseEvent.CLICK,this,"_onClick")},_showList:function(){if(this._list_visible){return}this._list.setAlpha(0);this._list.show();var a=this._list.getHeight();this._list.setHeight(0);OJ.destroy(this._tween,true);this._tween=new OjTweenSet(new OjPropTween(this._list,{height:a},250),new OjFade(this._list,OjFade.IN,250));this._tween.addEventListener(OjTweenEvent.COMPLETE,this,"_onTween");this._tween.start();OJ.addEventListener(OjMouseEvent.CLICK,this,"_onPageClick");this._list_visible=true},_hideList:function(){if(!this._list_visible){return}OJ.destroy(this._tween,true);this._tween=new OjTweenSet(new OjPropTween(this._list,{height:0},250),new OjFade(this._list,OjFade.NONE,250));this._tween.addEventListener(OjTweenEvent.COMPLETE,this,"_onTween");this._tween.start();OJ.removeEventListener(OjMouseEvent.CLICK,this,"_onPageClick");this._trigger_evt=null;this._list_visible=this._ignore_click=false},_redrawList:function(){var b=this._options_dp.numItems(),c=0,a;this._options_index=[];for(a in this._options){if(b>c){if(this._options_dp.getItemAt(c)!=this._options[a]){this._options_dp.setItemAt(this._options[a],c)}}else{this._options_dp.addItem(this._options[a])}this._options_index.push(a);c++}while(b-->c){this._options_dp.removeItemAt(b)}if(this._allow_none){if(this._options_dp.getItemAt(0)!=this._none_lbl){this._options_dp.addItemAt(this._none_lbl,0)}}else{if(this._options_dp.getItemAt(0)==this._none_lbl){this._options_dp.removeItemAt(0)}}},_redrawValue:function(){var b,a=this.getItemRenderer();if(!this.valueHldr.numChildren()||!(b=this.valueHldr.getChildAt(0)).is(a)){this.valueHldr.removeAllChildren();this.valueHldr.addChild(new a(this._selected))}else{b.setData(this._selected)}},_onClick:function(a){if(!this._trigger_evt){this._showList()}if(!this._ignore_click){this._trigger_evt=a;this._ignore_click=false}},_onItemClick:function(a){this.setSelected(a.getItem());this._ignore_click=true},_onPageClick:function(a){if(this._trigger_evt==a){return}this._hideList()},_onTween:function(a){this._list.setHeight(OjStyleElement.AUTO);OJ.destroy(this._tween,true)},getAllowNone:function(){return this._allow_none},setAllowNone:function(a){this._allow_none=a},getItemRenderer:function(){return this._list.getItemRenderer()},setItemRenderer:function(a){this._list.setItemRenderer(a);this._redrawValue()},getOptions:function(){return this._options},setOptions:function(a){this._options=a;this._redrawList();this._redrawValue();this.setValue(this._value)},getSelected:function(){return this._selected},setSelected:function(b){if(this._selected!=b){if(this._options){var a;for(a in this._options){if(this._options[a]==b){this.setValue(a);return}}if(this._allow_none){this.setValue(null)}else{this.setSelectedIndex(0)}}else{this._selected=b}}},getSelectedIndex:function(){return this._selected_index},setSelectedIndex:function(a){if(this._selected_index!=a){if(this._options){this.setValue(this._options_index[a])}else{this._selected_index=a}}},setValue:function(c){if(isEmpty(c)){c=null}if(this._value!=c||(isNull(this._selected_index)&&this._options)){if(this._options){var a,b=a=this._options_index.length;while(b-->0){if(this._options_index[b]==c){break}}if(a){if(b==-1){if(this._allow_none){this._selected_index=null;this._selected=this._none_lbl;c=null}else{this._selected_index=0;c=this._options_index[0];this._selected=this._options[c]}}else{this._selected_index=b;this._selected=this._options[c]}}else{this._selected_index=null;this._selected=this._allow_none?this._none_lbl:null;c=null}b=a=null}else{this._selected_index=null;this._selected=this._none_lbl;this._value=null}this._redrawValue();this._super(OjInput,"setValue",[c])}}});