OJ.importJs("oj.events.OjEvent");OJ.importJs("oj.media.OjMedia");"use strict";OJ.extendComponent("OjImage",[OjMedia],{_source_is_css:false,_destructor:function(){if(this._img){this._img.removeEventListener("load",this._callback)}this._callback=this._img=null;return this._super(OjMedia,"_destructor",arguments)},_load:function(){if(!this._source_is_css&&this._img){this._loaded=false;this._img.src=this._source}},_makeMedia:function(){return this._super(OjMedia,"_makeMedia",arguments)},_resize:function(){this.removeCss(this._resize_vals);if(this._resizeBy==this._static.NONE){return}this.addCss([this._resizeBy])},_onMediaLoad:function(a){var b=this._super(OjMedia,"_onMediaLoad",arguments);if(this._source_is_css){this._media.addCss([this._source.substring(1)]);this._original_w=this._media.getWidth();this._original_h=this._media.getHeight()}else{this._original_w=this._img.width;this._original_h=this._img.height;if(!this.getWidth()){this.setWidth(this._original_w)}if(!this.getHeight()){this.setHeight(this._original_h)}this._setStyle("backgroundImage","url("+this._source+")")}return b},_setSource:function(a){if(this._source_is_css){this._media.removeCss([this._source.substring(1)])}else{this._setStyle("backgroundImage",null)}this._super(OjMedia,"_setSource",arguments);if(a){if(this._source_is_css=(this._source.charAt(0)=="@")){if(!this._media){this.addChild(this._media=this._makeMedia())}this._onMediaLoad(null)}else{if(this._media){this._unset("_media")}if(!this._img){this._img=new Image();this._img.addEventListener("load",this._callback=this._onMediaLoad.bind(this))}}}}},{_TAGS:["img","image"],image:function(a){if(isString(a)){return new OjImage(a)}if(a.is("OjImage")){return a}return null}});