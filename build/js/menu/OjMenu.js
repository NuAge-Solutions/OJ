OJ.importJs("oj.components.OjComponent");OJ.importCss("oj.menu.OjMenu");"use strict";OJ.extendClass("OjMenu",[OjComponent],{_props_:{content:null,horzOffset:null,positioning:null,parentMenu:null,vertOffset:0},_constructor:function(){this._super(OjComponent,"_constructor",[]);var a=arguments.length;if(a){this.setContent(arguments[0]);if(a>1){this.setPositioning(arguments[1]);if(a>2){this.setParentMenu(arguments[2])}}}if(!this._positioning){this.setPositioning([OjMenu.RIGHT_MIDDLE,OjMenu.RIGHT_TOP,OjMenu.RIGHT_BOTTOM,OjMenu.LEFT_MIDDLE,OjMenu.LEFT_TOP,OjMenu.LEFT_BOTTOM,OjMenu.BOTTOM_LEFT,OjMenu.BOTTOM_CENTER,OjMenu.BOTTOM_RIGHT,OjMenu.TOP_LEFT,OjMenu.TOP_CENTER,OjMenu.TOP_RIGHT])}},_destructor:function(){this._content=null;return this._super(OjComponent,"_destructor",arguments)},hasSubMenu:function(a){while(a){if(a.getParentMenu()==this){return}a=a.getParentMenu()}return false},setContent:function(a){if(this._content==a){return}if(this._content){this.replaceChild(this._content,this._content=a)}else{this.addChild(this._content=a)}}},{TOP_LEFT:"positionTopLeft",TOP_CENTER:"positionTopCenter",TOP_RIGHT:"positionTopRight",BOTTOM_LEFT:"positionBottomLeft",BOTTOM_CENTER:"positionBottomCenter",BOTTOM_RIGHT:"positionBottomRight",LEFT_TOP:"positionLeftTop",LEFT_MIDDLE:"positionLeftMiddle",LEFT_BOTTOM:"positionLeftBottom",RIGHT_TOP:"positionRightTop",RIGHT_MIDDLE:"positionRightMiddle",RIGHT_BOTTOM:"positionRightBottom"});