OJ.importJs("oj.events.OjFocusEvent");OJ.importJs("oj.form.OjComboBox");OJ.importCss("oj.form.OjFilterBox");"use strict";OJ.extendClass("OjFilterBox",[OjComboBox],{_item_index:null,_previous_search:null,_constructor:function(){this._super(OjComboBox,"_constructor",arguments);this.valueHldr.addEventListener(OjEvent.CHANGE,this,"_onSearch");this.valueHldr.addEventListener(OjFocusEvent.IN,this,"_onFocusIn");this.valueHldr.addEventListener(OjFocusEvent.OUT,this,"_onFocusOut");this._item_index={}},_setDom:function(a){this._super(OjComboBox,"_setDom",arguments);var c=this.valueHldr.parent();var b=new OjTextInput();b.addCss("value");b.addEventListener(OjFocusEvent.IN,this,"_onValueFocus");c.replaceChild(this.valueHldr,b);this.valueHldr=b},_redrawList:function(){var b=arguments.length&&arguments[0]?arguments[0]:null;var c=this._options_dp.numItems(),d=0,a;if(this._options){if(isEmpty(b)||b==this._none_lbl){b=null}else{b=b.toLowerCase()}if(this._previous_search==b){return}this._options_index=[];this._previous_search=b;for(a in this._options){this._options_index.push(a);if(b&&this._options[a]&&this._item_index[a]&&this._item_index[a].indexOf(b)==-1){continue}if(c>d){if(this._options_dp.getItemAt(d)!=this._options[a]){this._options_dp.setItemAt(this._options[a],d)}}else{this._options_dp.addItem(this._options[a])}d++}}else{this._options_index=[]}while(c-->d){this._options_dp.removeItemAt(c)}},_redrawValue:function(){var a=null;if(isObject(this._selected)){if(isFunction(this._selected.toString)){a=this._selected.toString()}else{a=this._value}}else{if(this._selected){a=this._selected.toString()}}this.valueHldr.setValue(a)},_showList:function(){this._redrawList();this._super(OjComboBox,"_showList",arguments)},_hideList:function(){this._super(OjComboBox,"_hideList",arguments);this._redrawValue()},_onSearch:function(a){this._redrawList(this.valueHldr.getValue())},_onFocusIn:function(a){this._showList()},_onFocusOut:function(a){var b=this.find(a.getTarget());if(!b.length){this._hideList()}},_onValueFocus:function(a){if(this.valueHldr.getValue()==this._none_lbl){this.valueHldr.setValue(null)}},setOptions:function(a){var b,c;this._item_index={};for(b in a){if(isString(a[b])){this._item_index[b]=a[b].toLowerCase()}else{if(isNumber(a[b])){this._item_index[b]=a[b].toString()}else{if(isObject(a[b])){if(isFunction(a[b].toString)){this._item_index[b]=a[b].toString().toLowerCase()}else{this._item_index[b]="";for(c in a[b]){if(isString(a[b][c])){this._item_index[b]+=" "+a[b][c].toLowerCase()}else{if(isNumber(a[b][c])){this._item_index[b]+=" "+a[b][c].toString()}}}this._item_index[b]=this._item_index[b].trim()}}}}}this._options=a;this._previous_search=-1;this._redrawValue();this.setValue(this._value)}});