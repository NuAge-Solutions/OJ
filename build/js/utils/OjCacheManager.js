OJ.importJs("oj.events.OjActionable");OJ.importJs("oj.utils.OjCacheObject");OJ.importJs("oj.utils.OjCachePolicy");"use strict";OJ.extendManager("CacheManager",OjActionable,"OjCacheManager",{MINUTE:60,HOUR:3600,DAY:86400,WEEK:604800,MONTH:2419200,YEAR:29030400,FOREVER:0,_cache_size:0,_localStorage:null,_policies:null,_getCached:null,_setCached:null,_unsetCached:null,_constructor:function(){this._super("OjCacheManager","_constructor",arguments);try{this._localStorage="localStorage" in window&&!isNull(window.localStorage)?window.localStorage:null}catch(a){}if(this._localStorage){this.getData=this.getLocalData;this.setData=this.setLocalData;this.unsetData=this.unsetLocalData}else{this.getData=this.getCookie;this.setData=this.setCookie;this.unsetData=this.unsetCookie}this._policies={}},_getCookie:function(b){var c=";"+document.cookie;var a=c.indexOf(";"+b+"=");if(a==-1||isEmpty(b)){return undefined}var d=c.indexOf(";",a+1);if(d==-1){d=theCookie.length}return this._getData(decodeURIComponent(c.substring(a+b.length+2,d)))},_getData:function(c){var b;if(!c||!(b=c.parseJson())){return null}if(isObject(b)){var a=b._class_name;if(isUndefined(a)||(!isNull(a)&&a!="undefined"&&a!="boolean"&&a!="number"&&a!="string")){return OjObject.importData(b)}if(!a){return null}if(a=="undefined"){return undefined}return b.value}return b},_getLocalData:function(a){return this._getData(this._localStorage.getItem(a))},_isDataExpired:function(a){var b;if(isObjective(a)&&a.is("OjCacheObject")&&(b=a.getExpiration())&&b<new Date()){return true}return false},_setCookie:function(b,c){var a=new Date();var d=arguments.length>2?arguments[2]:this.FOREVER;if(isNull(d)||d==0){d=this.YEAR}a.setTime((new Date()).getTime()+d);document.cookie=b+"="+encodeURIComponent(this._setData(c))+";expires="+a.toGMTString()},_setData:function(a){if(isObject(a)){a=isObjective(a)?a.exportData():OjObject.exportData(a)}else{a={_class_name:typeof a,value:a}}return toJson(a)},_setLocalData:function(a,b){this._localStorage[a]=this._setData(b)},getCacheUrlRequestData:function(a){if(isEmpty(a=a.toString())){return null}return this.getData(a)},getCacheUrlRequestPolicy:function(a){if(isEmpty(a=a.toString())){return null}var b;for(b in this._policies){if(a.match(b)){return this._policies[b]}}return null},setCacheUrlRequestData:function(a,b){if(isEmpty(a=a.toString())){return null}var c=arguments.length>2?arguments[2]:this.getCacheUrlRequestPolicy(a);CacheManager.setData(a,b,c?c.getLifespan():null)},setCacheUrlRequestPolicy:function(a){this._policies[a.getUrl().replace(/\*/g,"[^ ]*")]=a},unsetCacheUrlRequestPolicy:function(c){var a;if(isObjective(c)&&c.is("OjCachePolicy")){a=c.getUrl().toString()}else{a=c.toString()}try{delete this._policies[a.replace(/\*/g,"[^ ]*")]}catch(b){}},unsetCacheUrlRequestData:function(a){CacheManager.unsetData(a)},getData:function(a){throw new Error("No getData() defined.");return;var b=this._getCachedData(a);return b?b.getData():null},setData:function(a,b){throw new Error("No setData() defined.");return;this._setCachedData(a,this._setData.apply(this,[].slice.call(arguments,1)))},unsetData:function(a){throw new Error("No unsetData() defined.")},getCookie:function(a){var b=this._getCookie(a);return b?b.getData():null},setCookie:function(a,c){var b=arguments.length;this._setCookie(a,new OjCacheObject(c,b>2?arguments[2]:null))},unsetCookie:function(a){document.cookie=a+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"},getLocalData:function(a){var b=this._getLocalData(a);if(this._isDataExpired(b)){this.unsetLocalData(a);return null}return b?b.getData():null},setLocalData:function(b,d){var a=arguments,c=a.length;this._setLocalData(b,new OjCacheObject(d,c>2?a[2]:null))},unsetLocalData:function(a){delete this._localStorage[a]}});