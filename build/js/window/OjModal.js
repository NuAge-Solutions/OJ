OJ.importJs("oj.events.OjDragEvent");OJ.importJs("oj.nav.OjFlowNavController");OJ.importJs("oj.nav.OjNavStack");OJ.importJs("oj.nav.OjView");OJ.importJs("oj.window.OjAlert");"use strict";OJ.extendClass("OjModal",[OjAlert],OJ.implementInterface(OjINavController,{_show_bar:true,_show_close:true,_show_underlay:true,_show_buttons:false,_stack:null,_template:"oj.window.OjModal",_constructor:function(){var a=arguments,b=a.length;this._super(OjAlert,"_constructor",[]);this.stack=this.container;this.bar.setStack(this.stack);this.setStack(this.stack);this.showBar(this._show_bar);this.showClose(this._show_close);this.showUnderlay(this._show_underlay);this.showButtons(this._show_buttons);if(b){this.addView(a[0]);if(b>1){this.setTitle(a[1])}}if(OJ.isMobile()){this.bar.setCancelLabel("&#10006")}},_destructor:function(){var a=arguments,b=a.length?a[0]:0;this._unset("bar",b);this._unset("stack",b);this._stack=null;return this._super(OjAlert,"_destructor",arguments)},_onDrag:function(a){this.pane.setX(this.pane.getX()+a.getDeltaX());this.pane.setY(this.pane.getY()+a.getDeltaY())},_onStackChange:function(a){},showBar:function(){if(arguments.length){if(this._show_bar=arguments[0]){this.bar.show()}else{this.bar.hide()}}return this._show_bar},showButtons:function(){var a=arguments;if(a.length){if(this._show_buttons=a[0]){this.removeCss(["no-buttons"])}else{this.addCss(["no-buttons"])}}return this._show_buttons},showClose:function(){var a=arguments;if(a.length){this.bar.showCancel(a[0]);if(a[0]){this.bar.addEventListener(OjEvent.CANCEL,this,"_onCancelClick")}else{this.bar.removeEventListener(OjEvent.CANCEL,this,"_onCancelClick")}}return this.bar.showCancel()},showUnderlay:function(){if(arguments.length){if(this._show_underlay=arguments[0]){this.underlay.show()}else{this.underlay.hide()}}return this._show_underlay},setButtons:function(a){this._super(OjAlert,"setButtons",arguments);if(this.buttons.numChildren()){this.buttons.show()}else{this.buttons.hide()}},setTitle:function(a){this.bar.setTitle(this._title=a)}}));