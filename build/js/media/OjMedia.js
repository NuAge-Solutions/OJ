OJ.importJs("oj.components.OjSpinner");OJ.importJs("oj.events.OjEvent");OJ.importCss("oj.media.OjMedia");"use strict";OJ.extendClass(OjComponent,"OjMedia",{_props_:{preload:false,resizeBy:"none",source:null,showSpinner:false,spinnerTint:"#333"},_height:0,_loaded:false,_resize_vals:["none","fill","fit","hFill","wFill"],_width:0,_h_align:OjStyleElement.CENTER,_v_align:OjStyleElement.MIDDLE,_constructor:function(){this._super("OjMedia","_constructor",[]);if(arguments.length){this.setSource(arguments[0])}},_destructor:function(){this._unset("media");this._unset("loading");return this._super("OjMedia","_destructor",arguments)},_load:function(){},_makeMedia:function(){return new OjStyleElement('<div class="media"></div>')},_resize:function(){if(!this._media){return}if(this._source_is_css){this._media.setWidth(OjStyleElement.AUTO);this._media.setHeight(OjStyleElement.AUTO);return}var b=this._getStyleBackup("width"),c=this._getStyleBackup("height");if(!isEmpty(b)){this._media.setWidth("100","%");if(c){this._media.setHeight("100","%")}else{this._media.setHeight(OjStyleElement.AUTO)}}else{if(!isEmpty(c)){this._media.setHeight("100","%");this._media.setWidth(OjStyleElement.AUTO)}else{if(this._resizeBy==this._static.WIDTH){this._media.setWidth("100","%");this._media.setHeight(OjStyleElement.AUTO)}else{this._media.setHeight("100","%");this._media.setWidth(OjStyleElement.AUTO);var a=this.getWidth();if(b>a){this._media.setMarginLeft((a-b)/2)}}}}},_setIsDisplayed:function(a){this._super("OjMedia","_setIsDisplayed",arguments);if(a&&!this._loaded){this._load()}},_setSource:function(a){this._source=a},_onMediaLoad:function(a){this._unset("loading");this._loaded=true;if(this._media){if(this._original_w){this._media.setMaxWidth(this._original_w)}if(this._original_h){this._media.setMaxHeight(this._original_h)}}this._resize();this.dispatchEvent(new OjEvent(OjEvent.LOAD))},isLoaded:function(){return this._loaded},load:function(){if(!this._loaded){this._load()}},getOriginalHeight:function(){return this._original_h},getOriginalWidth:function(){return this._original_w},setSource:function(a){if(Array.isArray(a)){a=a.join(", ")}else{if(a){a=a.toString()}}if(this._source==a){return}this._loaded=false;if(!this.loading&&this._showSpinner){this.addChild(this.loading=new OjSpinner(this._spinnerTint))}this._setSource(a);if(this._preload||this._is_displayed){this._load()}},setResizeBy:function(a){if(this._resizeBy==a){return}this._resizeBy=this._resize_vals.indexOf(a)>-1?a:this._static.NONE;this._resize()},_setHeight:function(a){this._super("OjMedia","_setHeight",arguments);this._height=a},_setWidth:function(a){this._super("OjMedia","_setWidth",arguments);this._width=a}},{NONE:"none",FILL:"fill",FIT:"fit",HEIGHT:"hFill",WIDTH:"wFill"});