OJ.importJs('oj.data.Xml');
OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.events.Event');
OJ.importJs('oj.events.HttpStatusEvent');
OJ.importJs('oj.events.IoErrorEvent');
OJ.importJs('oj.events.ProgressEvent');
OJ.importJs('oj.net.UrlRequest');
OJ.importJs('oj.utils.CacheManager');


'use strict';

OJ.compileClass(
	'OjUrlLoader',
	oj.net.UrlLoader = function(){
		return new oj.events.Actionable(
			arguments, 'OjUrlLoader',
			{
				'_properties_' : {
					'async'       : false,
					'data'        : null,
					'contentType' : OjUrlLoader.QUERY_STRING,
					'request'     : null,
					'timeout'     : 10000
				},

				'_policy' : null,  '_xhr' : null,


				'_constructor' : function(/*request, async,*/){
					this._super('OjUrlLoader', '_constructor', []);

					var ln = arguments.length;

					if(ln){
						this.setRequest(arguments[0]);

						if(ln > 1){
							this.setAsync(arguments[1]);
						}
					}
				},

				'_destructor' : function(){
					this._xhr = null;
					this._request = null;

					return this._super('OjUrlLoader', '_destructor', arguments);
				},


				'_load' : function(){
					// check to see if we have this cached
					if(!this._request.ignoresCache()){
						var url = this._request.toString();

						this._policy = CacheManager.getCacheUrlRequestPolicy(url);

						if(
							this._policy && this._policy.getAction() == OjCachePolicy.ALWAYS &&
							(this._data = CacheManager.getCacheUrlRequestData(url, this._policy))
						){
							this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));

							return;
						}
					}

					// if not cached or ignored send the request as usual
					if(OjUrlLoader.USE_ACTIVEX){
						this._xhr = this._request.getHost() != HistoryManager.get().getHost() ? new window.XDomainRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
					}
					else{
						this._xhr = new window.XMLHttpRequest();
					}

					this._xhrOpen();

					this._xhrFormat();

					this._xhrEvents();

					this._xhrSend();
				},

				'_loadMultiPart' : function(){
					// add in form data handling here
				},

				'_xhrEvents' : function(){
					this.dispatchEvent(new OjEvent(OjEvent.OPEN));

					this._xhr.onreadystatechange = this._onReadyStateChange.bind(this);
					this._xhr.ontimeout = this._onTimeout.bind(this);
				},

				'_xhrFormat' : function(){
					// set the format
					var key, headers = this._request.getHeaders();

					if(headers){
						for(key in headers){
							// ignore content-type setting when safe since no data is sent
							if(key == 'content-type' && this._request.isSafe()){
								continue;
							}

							this._xhr.setRequestHeader(key, headers[key]);
						}
					}

					// set the caching
					if(this._policy){
						if(this._policy.getAction() == OjCachePolicy.ALWAYS){
							var lifespan = this._policy.getLifespan();

							if(!lifespan){
								lifespan = CacheManager.YEAR;
							}

							this._xhr.setRequestHeader('cache-control', 'max-age=' + lifespan);
						}
						else{
							this._xhr.setRequestHeader('cache-control', 'no-cache');
						}
					}
				},

				'_xhrOpen' : function(){
					var data, url = this._request,
						method = this._request.getMethod();

					if(method != OjUrlRequest.POST && (data = this._request.getData())){
						var key;

						url = url.clone();

						for(key in data){
							url.setQueryParam(key, data[key]);
						}
					}

					this._xhr.open(method, url.toString(), this._async);

					if(this._async){
						this._xhr.timeout = this._timeout;
					}
					else{
						//todo: look into adding sync timeout capability if at all possible
					}
				},

				'_xhrSend' : function(){
					var data;

					if(this._request.getMethod() == OjUrlRequest.POST){
						if(data = this._request.getData()){
							var type = this._request.getContentType();

							if(type == OjUrlLoader.JSON){
								data = toJson(data);
							}
							else if(type == OjUrlLoader.XML){
								data = toXml(data);
							}
							else if(type == OjUrlLoader.QUERY_STRING){
								data = toQueryString(data);
							}
						}
					}

					this._xhr.send(data);
				},


				'_onReadyStateChange' : function(){
					var status = this._xhr.status, state = this._xhr.readyState;

					// add header processing
					this.dispatchEvent(new OjHttpStatusEvent(OjHttpStatusEvent.HTTP_STATUS, status));

					if(status > 199 && status < 300 && state == 4){
						// clear the timeout timer
						OJ.destroy(this._timer);

						// detect the content type from the response
						this._contentType = this._xhr.getResponseHeader('Content-Type');

						if(this._contentType){
							this._contentType = this._contentType.toLowerCase();
						}
						else{
							this._contentType = OjUrlLoader.TEXT;
						}

						if(this._contentType.indexOf('/xml') != -1){
							this._contentType = OjUrlLoader.XML;

							this.setData(this._xhr.responseXML);
						}
						else{
							if(this._contentType.indexOf('/json') != -1){
								this._contentType = OjUrlLoader.JSON;
							}
							else if(this._contentType == OjUrlLoader.QUERY_STRING){
								this._contentType = OjUrlLoader.QUERY_STRING;
							}
							else{
								this._contentType = OjUrlLoader.TEXT;
							}

							this.setData(this._xhr.responseText);
						}

						this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
					}
					else if((!status && state == 4) || status > 399){
						// clear the timeout timer
						OJ.destroy(this._timer);

						this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR, this._xhr.statusText, status));
						this.dispatchEvent(new OjEvent(OjEvent.FAIL));
					}
					else{
						this.dispatchEvent(new OjProgressEvent(OjProgressEvent.PROGRESS));
					}
				},

				'_onTimeout' : function(evt){
					if(this._xhr){
						this._xhr.abort();
					}

					this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_TIMEOUT));
					this.dispatchEvent(new OjEvent(OjEvent.FAIL));
				},


				'cancel' : function(){
					this._xhr.abort();

					this._xhr = null;
				},

				'load' : function(/*request*/){
					var ln = arguments.length;

					if(ln){
						this.setRequest(arguments[0]);
					}

					if(this._request.isMultiPart()){
						this._loadMultiPart();
					}
					else{
						this._load();
					}

					return this._data;
				},


				'setData' : function(data){
					this._data = null;

					if(data){
						if(this._contentType.indexOf('/json') > -1){
							this._data = data.parseJson();
						}
						else if(this._contentType.indexOf('/xml') > -1){
							this._data = OjXml.xml(data);
						}
						else if(this._contentType == OjUrlLoader.QUERY_STRING){
							this._data = data.parseQueryString();
						}
						else{
							this._data = data;
						}
					}

					if(this._policy && this._policy.getAction() != OjCachePolicy.NEVER){
						CacheManager.setCacheUrlRequestData(this._request, this._data, this._policy);
					}
				}
			}
		);
	},
	{
		'CSS'          : OjUrlRequest.CSS,
		'QUERY_STRING' : OjUrlRequest.QUERY_STRING,
		'HTML'         : OjUrlRequest.HTML,
		'JS'           : OjUrlRequest.JS,
		'JSON'         : OjUrlRequest.JSON,
		'TEXT'         : OjUrlRequest.TEXT,
		'XML'          : OjUrlRequest.XML
	}
);