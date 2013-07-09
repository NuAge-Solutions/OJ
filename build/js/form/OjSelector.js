OJ.importJs("oj.data.OjCollection");OJ.importJs("oj.form.OjRadioOption");OJ.importJs("oj.form.OjInput");OJ.importJs("oj.list.OjLabelItemRenderer");OJ.importJs("oj.list.OjList");OJ.importJs("oj.list.OjListEvent");OJ.importCss("oj.form.OjSelector");"use strict";OJ.extendComponent(OjInput,"OjSelector",{_props_:{itemRenderer:OjLabelItemRenderer,selectionMin:0,selectionMax:1},_template:"oj.form.OjSelector",_constructor:function(){var a=arguments,b=a.length;this._value=[];this._super("OjSelector","_constructor",b>2?Array.array(a).slice(0,2):a);this.input.addEventListener(OjListEvent.ITEM_ADD,this,"_onItemAdd");this.input.addEventListener(OjListEvent.ITEM_CLICK,this,"_onItemClick");this.input.addEventListener(OjListEvent.ITEM_MOVE,this,"_onItemMove");this.input.addEventListener(OjListEvent.ITEM_REMOVE,this,"_onItemRemove");this.input.addEventListener(OjListEvent.ITEM_REPLACE,this,"_onItemReplace");this.input.removeEventListener(OjDomEvent.CHANGE,this,"_onChange");if(b>3){this.setOptions(a[3])}},_processDomSourceChild:function(b,c){if(OjElement.isTextNode(b)){return}var a=b.innerHTML;if(a){this.input.addItem(OjObject.importData(a.parseJson()))}},_selectOption:function(a,b){if(this._value.indexOf(b)>-1){return}if(this._selectionMax&&this._selectionMax==this._value.length){this.input.getElmAt(this.input.indexOfItem(this._value.shift())).setIsSelected(false)}a.setIsSelected(true);this._value.push(b);this.dispatchEvent(new OjEvent(OjEvent.CHANGE))},_toggleOptionAt:function(a){var b=this.input.getElmAt(a),c=this.input.getItemAt(a);if(b.getIsSelected()){this._unselectOption(b,c)}else{this._selectOption(b,c)}},_unselectOption:function(b,c){var a=this._value.indexOf(c);if(a==-1||this._value.length<=this._selectionMin){return}b.setIsSelected(false);this._value.splice(a,1);this.dispatchEvent(new OjEvent(OjEvent.CHANGE))},_updateSelection:function(){var c=this._value.length;for(;c--;){if(this.input.indexOfItem(this._value[c])==-1){this._value.splice(c,1)}}var b=0,a=this.input.numItems();for(;(c=this._value.length)<this._selectionMin&&b<a;b++){this._selectOption(this.input.getElmAt(b),this.input.getItemAt(b))}},_onItemAdd:function(a){this._updateSelection()},_onItemClick:function(a){this._toggleOptionAt(a.getIndex())},_onItemMove:function(a){},_onItemRemove:function(a){this._updateSelection()},_onItemReplace:function(a){return;var b,c=this._options.getItemAt(a.getIndex());if((b=this._value.indexOf(c))>-1){this._value.splice(b,1,a.getItem())}this.options.getChildAt(a.getIndex()).setData(a.getItem())},redraw:function(){if(this._super("OjSelector","redraw",arguments)){this.input.redraw();this._updateSelection();return true}return false},setItemRenderer:function(a){if(isString(a)){a=OJ.stringToClass(a)}if(this._itemRenderer==a){return}this._itemRenderer=a;this.redraw()},getOptions:function(){return this.input.getDataProvider()},setOptions:function(f){if(f==this.getOptions()){return}var e=[];var d=this._value.length;for(;d--;){e.unshift(this.input.indexOfItem(this._value[d]))}this._value=[];this.input.setDataProvider(f);var c=this.getOptions();d=c.numItems();var b,a=e.length;for(;a--;){if((b=e[a])<d){this._selectOption(this.input.getElmAt(b),this.input.getItemAt(b))}}this.redraw()},setValue:function(c){c=Array.array(c);if(this._value!=c){if(this._value=c){var a=this.getOptions(),b=a.numItems();for(;b--;){this.input.getElmAt(b).setIsSelected(c.indexOf(a.getItemAt(b))>-1)}}this.dispatchEvent(new OjEvent(OjEvent.CHANGE))}},getSelectionRenderer:function(){return this.input.getItemRenderer()},setSelectionRenderer:function(a){this.input.setItemRenderer(a);if(this.getSelectionRenderer()==OjRadioOption){this.setSelectionMin(1);this.setSelectionMax(1)}}},{_TAGS:["selector"]});