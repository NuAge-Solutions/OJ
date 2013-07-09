OJ.importJs("oj.window.OjAlertEvent");OJ.importJs("oj.window.OjModal");OJ.importJs("oj.components.OjButton");OJ.importJs("oj.components.OjLabel");OJ.importCss("oj.window.OjAlert");"use strict";OJ.extendClass(OjComponent,"OjAlert",{_props_:{buttons:null,content:null,selfDestruct:0,title:null},_template:"oj.window.OjAlert",_constructor:function(){this._super("OjAlert","_constructor",[]);if(this.className().indexOf("Alert")>-1){this.buttons.addChild(this.cancelBtn=new OjButton("Ok"));this.cancelBtn.addEventListener(OjMouseEvent.CLICK,this,"_onCancelClick")}var a=arguments.length;if(a){this.setTitle(arguments[0]);if(a>1){this.setContent(arguments[1]);if(a>2){this.setButtons(arguments[2]);if(a>3){this.cancelBtn.setLabel(arguments[3])}else{this.cancelBtn.setLabel("Cancel")}}}}},_destructor:function(){var a=arguments,b=a.length?a[0]:0;if(!b){this.container.removeAllChildren()}return this._super("OjAlert","_destructor",arguments)},_onButtonClick:function(a){this.dispatchEvent(new OjAlertEvent(OjAlertEvent.BUTTON_CLICK,this.buttons.indexOfChild(a.getCurrentTarget())));WindowManager.hide(this)},_onCancelClick:function(a){this.cancel()},cancel:function(){this.dispatchEvent(new OjEvent(OjEvent.CANCEL));WindowManager.hide(this)},hideButtons:function(){this.addCss(["no-buttons"]);this.buttons.hide()},showButtons:function(){this.removeCss(["no-buttons"]);this.buttons.show()},getButtons:function(){return this._buttons.clone()},setButtons:function(d){this._buttons=d?d.clone():[];var a=this._buttons.length;var c=this.buttons.numChildren()-1;var e=a-c,b;if(e>0){while(e>0){this.buttons.addChildAt(b=new OjButton(this._buttons[a-(e--)]),c+1);b.addEventListener(OjMouseEvent.CLICK,this,"_onButtonClick")}}else{if(e<0){while(e++<0){OJ.destroy(this.buttons.getChildAt(--c-1))}}}while(c-->1){b=this.buttons.getChildAt(c);b.setLabel(this._buttons[c])}},getCancelLabel:function(){return this.cancelBtn.getLabel()},setCancelLabel:function(a){return this.cancelBtn.setLabel(a)},setContent:function(a){if(this._content==a){return}this.container.removeAllChildren();this._content=a;if(isString(a)){this.container.setText(a.replaceAll("\n","<br />"))}else{this.container.addChild(a)}},setTitle:function(a){if(this._title==a){return}this.bar.setText(this._title=a)},getPaneHeight:function(){return this.pane.getHeight()},setPaneHeight:function(a){this.pane.setHeight.apply(this.pane,arguments);if(this._is_displayed){WindowManager.position(this)}},getPaneWidth:function(){return this.pane.getWidth()},setPaneWidth:function(a){this.pane.setWidth.apply(this.pane,arguments);if(this._is_displayed){WindowManager.position(this)}}},{NONE:0,SHALLOW:1,DEEP:2});