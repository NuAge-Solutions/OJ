OJ.importJs("oj.events.OjActionable");"use strict";OJ.extendClass(OjActionable,"OjElement",{_draggable:false,_dragX:0,_dragY:0,_did_drag:false,_constructor:function(){var a=arguments,c=a.length,d=c&&a[0]?a[0]:OjElement.elm("div"),b=c>1?a[1]:null;this._super("OjElement","_constructor",[]);this._setDom(d,b)},_destructor:function(){OjElement.unregister(this);this.setParent(null);if(this._dom){delete this._dom.ojElm;delete this._dom.ojProxy;this._dom=this._proxy=null}return this._super("OjElement","_destructor",arguments)},_setDom:function(a){this._setProxy(this._dom=a);this._dom.ojElm=this.id()},_setProxy:function(a){if(this._proxy){this._proxy.ojProxy=null}this._proxy=a;a.ojProxy=this.id()},_isDisplayed:function(){},_isNotDisplayed:function(){},dom:function(){return this._dom},inDom:function(){var a=this._dom;return a.ownerDocument&&isObject(a.ownerDocument)&&a.parentNode?true:false},hasDomElement:function(a){return OjElement.hasDomElement(this._dom,a)},parent:function(){return OjElement.element(this._dom.parentNode)},getParent:function(){return OjElement.element(this._dom.parentNode)},setParent:function(a){if(a){a.addChild(this)}else{if(a=this.parent()){a.removeChild(this)}}},_setIsDisplayed:function(a){if(this._is_displayed==a){return}if(this._is_displayed=a){this._isDisplayed();this.dispatchEvent(new OjEvent(OjEvent.ADDED_TO_DISPLAY))}else{this._isNotDisplayed();this.dispatchEvent(new OjEvent(OjEvent.REMOVED_FROM_DISPLAY))}}},{_elms:{},byId:function(c){var a=this._elms,b;if(a[c]){return a[c]}return(b=document.getElementById(c))&&b.ojProxy?a[b.ojProxy]:null},elm:function(a){return document.createElement(a)},element:function(a){if(!a){return null}if(isDomElement(a)){return this.isTextNode(a)?new OjTextElement(a):this.byId(a.ojProxy)}if(isObjective(a)){return a}return new OjStyleElement(a)},hasDomElement:function(a,b){if(a==b){return true}while((b=b.parentNode)){if(b==a){return true}}return false},isCommentNode:function(a){return a.nodeName.toLowerCase()=="#comment"},isTextNode:function(a){return a.nodeName.toLowerCase()=="#text"},parentComponent:function(b){if(isElement(b)){b=b._dom}var a;while(b){a=b.parentNode;if(a&&(b=this.element(a))&&isComponent(b)){return b}b=a}return null},register:function(a){this._elms[a.id()]=a},unregister:function(a){delete this._elms[a.id()]}});OJ.importJs("oj.dom.OjStyleElement");OJ.importJs("oj.dom.OjTextElement");