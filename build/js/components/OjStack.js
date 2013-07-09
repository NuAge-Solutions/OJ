OJ.importJs("oj.components.OjCollectionComponent");OJ.importJs("oj.events.OjCollectionEvent");OJ.importJs("oj.events.OjStackEvent");OJ.importJs("oj.fx.OjEasing");OJ.importJs("oj.fx.OjFade");OJ.importJs("oj.fx.OjMove");OJ.importJs("oj.fx.OjResize");OJ.importJs("oj.fx.OjTransition");OJ.importJs("oj.fx.OjTweenSet");OJ.importCss("oj.components.OjStack");"use strict";OJ.extendComponent(OjCollectionComponent,"OjStack",{_props_:{active:null,activeIndex:-1,allowLooping:false,alwaysTrans:false,autoSizeHeight:false,autoSizeWidth:false,transition:null},_current_index:0,_prev_index:-1,_constructor:function(){var a=arguments,b=a.length;this._super("OjStack","_constructor",[]);if(b>2){this.setItemRenderer(a[2])}this.setTransition(b>1?a[1]:OjTransition.NONE);this._items.setItems(b?a[0]:[])},_destructor:function(){var b,a=arguments,c=a.length&&a[0];this._unset("_trans_in",true);this._unset("_trans_out",true);if(this._prev_active){this._removeActive(this._prev_active);this._prev_active=null}if(this._active){this._removeActive();this._active=null}if(c>1){b=this.numElms();for(;b--;){OJ.destroy(this.renderItemAt(b),c)}}this._controller=this._transition=null;return this._super("OjStack","_destructor",a)},_callElmFunc:function(f,b){var d=this._transition,e=b.length,a=-1;if(!this._elm_funcs[f]){return}switch(f){case"removeAllElms":a=0;break;case"removeElmAt":if(e){b[0]=this._processIndex(b[0])}case"addElm":case"removeElm":a=1;break;case"addElmAt":case"replaceElmAt":if(e>1){b[1]=this._processIndex(b[1])}case"moveElm":case"replaceElm":a=2;break;case"getElmAt":if(e){this[0]=this._processIndex(b[0])}break}if(a>-1){if(e>a){this.setTransition(this._processTransParam(b[a]));b.pop()}}var c=this._getContainer()[this._elm_funcs[f]].apply(this._items,b);if(a>-1){this.setTransition(d)}return c},_processDomSourceChild:function(a,b){if(OjElement.isTextNode(a)){return false}return this._super("OjStack","_processDomSourceChild",arguments)},_processDomSourceChildren:function(a,d){var c=a.childNodes,e=c.length,b=0,f;for(;b<e;b++){if(f=this._processDomSourceChild(c[b],d)){f.setParent(null);this.addElm(f);b+=c.length-e;e=c.length}}},_addActive:function(b,a){this._active=b;this._activeIndex=a;this._addActiveElm(this.renderItem(b))},_addActiveElm:function(a){a.setIsActive(true);this.container.addChild(a)},_animationDirection:function(b,a){return b<a?-1:1},_dispatchChangeComplete:function(){this.dispatchEvent(new OjStackEvent(OjStackEvent.CHANGE_COMPLETE,this._active,this._transition,this._activeIndex,this._prev_index))},_makeTransIn:function(c){var b=0,d,a=this.container;this._unset("_trans_in");if(!c){return null}d=a.getChildAt(Math.bounds(a.numChildren()-1,0,1));switch(this._transition.getEffect()){case OjTransition.FADE:if(this._trans_out){return null}b=1;break;case OjTransition.SLIDE_HORZ:d.setX(-1*c*a.getWidth());break;case OjTransition.SLIDE_VERT:d.setY(-1*c*a.getHeight());break}if(this._trans_in=this._transition.make(d,OjTransition.IN,b)){this._trans_in.addEventListener(OjTweenEvent.COMPLETE,this,"_onTransIn");this._trans_in.start();this._setIsAnimating(true)}else{if(!this._trans_out){this._dispatchChangeComplete()}}return this._trans_in},_makeTransOut:function(c){var b=0,a=this.container,d=a.getChildAt(0);this._unset("_trans_out");if(d){switch(this._transition.getEffect()){case OjTransition.SLIDE_HORZ:b=d.getX()+(c*a.getWidth());break;case OjTransition.SLIDE_VERT:b=d.getY()+(c*a.getHeight());break}if(this._trans_out=this._transition.make(d,OjTransition.OUT,b)){d.addCss("prev-active");this._trans_out.addEventListener(OjTweenEvent.COMPLETE,this,"_onTransOut");this._trans_out.start();this._setIsAnimating(true)}else{this._removeActive(this._prev_active)}}return this._trans_out},_processIndex:function(a){var b=this.numElms();if(this._allowLooping){a=a%b;if(a<0){return b+a}return a}return Math.bounds(a,0,b-1)},_processTransParam:function(a){if(!a){return OjStack.NONE}if(a===true){return this._transition}return a},_removeActive:function(){var a=arguments,c,d,b=a.length?a[0]:this.getElmAt(this._activeIndex);if(b){d=b;if(this._itemRenderer){c=this.container.numChildren();for(;c--;){d=this.container.getChildAt(c);if(d.getData()==b){break}}}this._removeActiveElm(d)}},_removeActiveElm:function(a){this.container.removeChild(a);a.removeCss(["prev-active"]);a.setWidth(OjStyleElement.AUTO);a.setHeight(OjStyleElement.AUTO);a.setAlpha(1);a.setIsActive(false)},_onItemAdd:function(a){this._super("OjStack","_onItemAdd",arguments);var b=a.getIndex(),c=a.getItem();this.dispatchEvent(new OjStackEvent(OjStackEvent.ADD,c,this._transition,b));if(!this._active){this.setActiveIndex(b)}else{this._current_index=this.indexOfElm(this._active)}},_onItemMove:function(a){this._super("OjStack","_onItemMove",arguments);this.dispatchEvent(new OjStackEvent(OjStackEvent.MOVE,a.getItem(),this._transition,a.getIndex()));if(this._active==a.getItem()){this._current_index=a.getIndex()}},_onItemRemove:function(a){this._super("OjStack","_onItemRemove",arguments);var d,c=a.getItem(),b=a.getIndex();this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE,c,this._transition,b));if(this._active==c){if(this._current_index){this.setActiveIndex(this._current_index-1)}else{if(d=this.numElms()){this.setActiveIndex(d-1)}else{this._active=null;this._current_index=-1}}}else{if(this._prev_active==c){this._prev_active=null}this._current_index=this.indexOfElm(this._active)}},_onItemReplace:function(a){this._super("OjStack","_onItemReplace",arguments);var c=a.getItem(),b=a.getIndex();this.dispatchEvent(new OjStackEvent(OjStackEvent.REPLACE,c,this._transition,b));if(this._activeIndex==b){this._removeActive(this._active);this._addActive(c,this._activeIndex)}},_onTransIn:function(a){this._unset("_trans_in");if(!this._trans_out){this._setIsAnimating(false);this._dispatchChangeComplete()}if(!isNull(this._deferred_active)){this.setActiveIndex.apply(this,this._deferred_active)}},_onTransOut:function(a){this._unset("_trans_out");this._removeActive(this._prev_active);if(!this._trans_in){this._setIsAnimating(false);this._dispatchChangeComplete()}this._prev_active=null;this._prev_index=null},next:function(){this.setActiveIndex(this._current_index+1)},prev:function(){this.setActiveIndex(this._current_index-1)},renderItemAt:function(a){return this._super("OjStack","renderItemAt",[this._processIndex(a)])},setActive:function(a){if((arguments[0]=this.indexOfElm(a))>-1){this.setActiveIndex.apply(this,arguments)}},setActiveIndex:function(f){var b,e,c,d,a;if(this._current_index==f&&this._active){return}if(this._trans_in){this._deferred_active=arguments;return}b=this._transition;e=arguments.length>1;if(e){this.setTransition(this._processTransParam(arguments[1]))}this._deferred_active=null;d=this._alwaysTrans?1:0;this._current_index=f;this._prev_index=-1;if(this._active){this._prev_active=this._active;this._makeTransOut(d=this._animationDirection(this._prev_index=this._activeIndex,f))}if(!this.numElms()){this._activeIndex=-1;this._current_index=-1;this._active=null;return}f=this._processIndex(f);a=new OjStackEvent(OjStackEvent.CHANGE,c=this.getElmAt(f),this._transition,f,this._prev_index);this._addActive(c,f);if(this._trans_out||this._alwaysTrans){this._makeTransIn(d)}if(e){this.setTransition(b)}this.dispatchEvent(a);if(!this._trans_out&&!this._alwaysTrans){this._dispatchChangeComplete()}},setAllowLooping:function(a){if(this._allowLooping==a){return}if(!(this._allowLooping=a)){var b=this.numElms();if(this._current_index<0){this.setActiveIndex((b-this._current_index)%b)}else{if(this._current_index>=b){this.setActiveIndex(this._current_index%b)}}}},setTransition:function(a){if(this._transition==a){return}this._transition=OjTransition.transition(a,this._transition)}},{_TAGS:["stack"]});