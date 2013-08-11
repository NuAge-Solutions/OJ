OJ.importJs("oj.data.OjXml");OJ.importJs("oj.events.OjActionable");OJ.importJs("oj.events.OjEvent");OJ.importJs("oj.events.OjHttpStatusEvent");OJ.importJs("oj.events.OjIoErrorEvent");OJ.importJs("oj.events.OjProgressEvent");OJ.importJs("oj.net.OjUrlRequest");OJ.importJs("oj.utils.OjCacheManager");"use strict";OJ.extendClass("OjUrlLoader",[OjActionable],{_props_:{async:false,data:null,contentType:OjUrlRequest.QUERY_STRING,request:null,timeout:10000},_is_xdomain:false,_policy:null,_url:null,_xhr:null,_constructor:function(){this._super(OjActionable,"_constructor",[]);var a=arguments.length;if(a){this.setRequest(arguments[0]);if(a>1){this.setAsync(arguments[1])}}},_destructor:function(){if(this._xhr){if(this._is_xdomain){this._xhr.onload=null;this._xhr.onerror=null}else{this._xhr.onreadystatechange=null}this._xhr.ontimeout=null}this._xhr=null;this._request=null;return this._super(OjActionable,"_destructor",arguments)},_load:function(){var c,d=this._request.getMethod();this._url=this._request.clone();if(d!=OjUrlRequest.POST&&(c=this._request.getData())){var b;for(b in c){this._url.setQueryParam(b,c[b])}}this._request.setSource(this._url);if(!this._request.ignoresCache()){var a=this._url.toString();this._policy=CacheManager.getCacheUrlRequestPolicy(a);if(this._policy&&this._policy.getAction()==OjCachePolicy.ALWAYS&&(this._data=CacheManager.getCacheUrlRequestData(a,this._policy))){this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));return}}if(this._static.USE_ACTIVEX&&this._request.getHost()!=HistoryManager.get().getHost()){this._xhr=new window.XDomainRequest();this._is_xdomain=true}else{this._xhr=new window.XMLHttpRequest();this._is_xdomain=false}this._xhrOpen();this._xhrFormat();this._xhrEvents();this._xhrSend()},_loadMultiPart:function(){},_xhrEvents:function(){this.dispatchEvent(new OjEvent(OjEvent.OPEN));if(this._is_xdomain){this._xhr.onload=this._onLoad.bind(this);this._xhr.onerror=this._onError.bind(this)}else{this._xhr.onreadystatechange=this._onReadyStateChange.bind(this)}this._xhr.ontimeout=this._onTimeout.bind(this)},_xhrFormat:function(){var a,c=this._request.getHeaders();if(c&&!this._is_xdomain){for(a in c){if(a=="content-type"&&this._request.isSafe()){continue}this._xhr.setRequestHeader(a,c[a])}}if(this._policy&&!this._is_xdomain){if(this._policy.getAction()==OjCachePolicy.ALWAYS){var b=this._policy.getLifespan();if(!b){b=CacheManager.YEAR}this._xhr.setRequestHeader("cache-control","max-age="+b)}else{this._xhr.setRequestHeader("cache-control","no-cache")}}},_xhrOpen:function(){this._xhr.open(this._request.getMethod(),this._url,this._async);if(this._async&&!this._is_xdomain){this._xhr.timeout=this._timeout}else{}},_xhrSend:function(){var b;if(this._request.getMethod()==OjUrlRequest.POST){if(b=this._request.getData()){var a=this._request.getContentType();if(a==OjUrlLoader.JSON){b=toJson(b)}else{if(a==OjUrlLoader.XML){b=toXml(b)}else{if(a==OjUrlLoader.QUERY_STRING){b=toQueryString(b)}}}}}if(this._is_xdomain){var c=this._xhr;setTimeout(function(){c.send(b)},0)}else{this._xhr.send(b)}},_onError:function(){if(!this._xhr){return}OJ.destroy(this._timer);this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR,this._xhr.statusText,status));this.dispatchEvent(new OjEvent(OjEvent.FAIL))},_onLoad:function(){if(!this._xhr){return}OJ.destroy(this._timer);if(this._is_xdomain){this._contentType=this._xhr.contentType}if(this._contentType){this._contentType=this._contentType.toLowerCase()}else{this._contentType=OjUrlLoader.TEXT}if(this._contentType.indexOf("/xml")!=-1){this._contentType=OjUrlLoader.XML;this.setData(this._xhr.responseXML)}else{if(this._contentType.indexOf("/json")!=-1){this._contentType=OjUrlLoader.JSON}else{if(this._contentType==OjUrlLoader.QUERY_STRING){this._contentType=OjUrlLoader.QUERY_STRING}else{this._contentType=OjUrlLoader.TEXT}}this.setData(this._xhr.responseText)}this.dispatchEvent(new OjEvent(OjEvent.COMPLETE))},_onReadyStateChange:function(){if(!this._xhr){return}var a=this._xhr.status,b=this._xhr.readyState;this.dispatchEvent(new OjHttpStatusEvent(OjHttpStatusEvent.HTTP_STATUS,a));if(a>199&&a<300&&b==4){this._contentType=this._xhr.getResponseHeader("Content-Type");this._onLoad()}else{if((!a&&b==4)||a>399){this._onError()}else{this.dispatchEvent(new OjProgressEvent(OjProgressEvent.PROGRESS))}}},_onTimeout:function(a){if(this._xhr){this._xhr.abort()}this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_TIMEOUT));this.dispatchEvent(new OjEvent(OjEvent.FAIL))},cancel:function(){this._xhr.abort();this._xhr=null},load:function(){var a=arguments,b=a.length;if(b){this.setRequest(a[0])}if(this._request.isMultiPart()){this._loadMultiPart()}else{this._load()}return this._data},setData:function(a){this._data=null;if(a){if(this._contentType.indexOf("/json")>-1){this._data=a.parseJson()}else{if(this._contentType.indexOf("/xml")>-1){this._data=OjXml.xml(a)}else{if(this._contentType==OjUrlLoader.QUERY_STRING){this._data=a.parseQueryString()}else{this._data=a}}}}if(this._policy&&this._policy.getAction()!=OjCachePolicy.NEVER){CacheManager.setCacheUrlRequestData(this._request,this._data,this._policy)}}},{USE_ACTIVEX:(window.XDomainRequest||window.ActiveXObject),CSS:OjUrlRequest.CSS,QUERY_STRING:OjUrlRequest.QUERY_STRING,HTML:OjUrlRequest.HTML,JS:OjUrlRequest.JS,JSON:OjUrlRequest.JSON,TEXT:OjUrlRequest.TEXT,XML:OjUrlRequest.XML});