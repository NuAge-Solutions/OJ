OJ.importJs("oj.nav.OjView");OJ.importJs("oj.media.OjImage");OJ.importCss("oj.media.OjImageViewer");"use strict";OJ.extendComponent(OjView,"OjImageViewer",{_images:null,_constructor:function(){this._images=[];this._super("OjImageViewer","_constructor",arguments)},getContent:function(){return this._images.clone()},setContent:function(b){this.removeAllElms();if(b){this._images=Array.array(b);var a=this._images.length;for(;a--;){this.addElmAt(new OjImage(this._images[a]),0)}}}},{_TAGS:["imageviewer"]});