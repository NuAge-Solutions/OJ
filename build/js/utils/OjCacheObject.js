"use strict";OJ.extendClass("OjCacheObject",[OjObject],{_props_:{created:null,data:null,expiration:null},_class_path:"oj.utils.OjCacheObject",_constructor:function(){this._super(OjObject,"_constructor",[]);this.setCreated(new Date());var a=arguments,b=a.length;if(b){this.setData(a[0]);if(b>1){this.setExpiration(a[1])}}},exportData:function(){var a=this._super(OjObject,"exportData",arguments);a.created=this._created;a.data=this._data?OjObject.exportData(this._data):null;a.expiration=this._expiration;return a},importData:function(a){if(!a){a={created:null,data:null,expiration:null}}this._created=a.created;this._data=OjObject.importData(a.data);this._expiration=a.expiration},setExpiration:function(a){if(this._expiration==a){return}if(!isDate(a)){this._expiration=new Date();this._expiration.setSeconds(this._expiration.getSeconds()+a)}else{this._expiration=a}}});