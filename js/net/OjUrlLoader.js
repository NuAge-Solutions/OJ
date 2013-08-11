OJ.importJs('oj.data.OjXml');
OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.events.OjEvent');
OJ.importJs('oj.events.OjHttpStatusEvent');
OJ.importJs('oj.events.OjIoErrorEvent');
OJ.importJs('oj.events.OjProgressEvent');
OJ.importJs('oj.net.OjUrlRequest');
OJ.importJs('oj.utils.OjCacheManager');


'use strict';

OJ.extendClass(
	'OjUrlLoader', [OjActionable],
	{
		'_props_' : {
			'async'       : false,
			'data'        : null,
			'contentType' : OjUrlRequest.QUERY_STRING,
			'request'     : null,
			'timeout'     : 10000
		},

		'_is_xdomain' : false,  '_policy' : null,  '_url' : null,  '_xhr' : null,


		'_constructor' : function(/*request, async,*/){
			this._super(OjActionable, '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setRequest(arguments[0]);

				if(ln > 1){
					this.setAsync(arguments[1]);
				}
			}
		},

		'_destructor' : function(){
			if(this._xhr){
				if(this._is_xdomain){
					this._xhr.onload = null;
					this._xhr.onerror = null;
				}
				else{
					this._xhr.onreadystatechange = null;
				}

				this._xhr.ontimeout = null;
			}

			this._xhr = null;
			this._request = null;

			return this._super(OjActionable, '_destructor', arguments);
		},


		'_load' : function(){
			var data,
				method = this._request.getMethod();

			this._url = this._request.clone();

			if(method != OjUrlRequest.POST && (data = this._request.getData())){
				var key;

				for(key in data){
					this._url.setQueryParam(key, data[key]);
				}
			}

			this._request.setSource(this._url);

			// check to see if we have this cached
			if(!this._request.ignoresCache()){
				var url = this._url.toString();

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
			if(this._static.USE_ACTIVEX && this._request.getHost() != HistoryManager.get().getHost()){
				this._xhr = new window.XDomainRequest();

				this._is_xdomain = true;
			}
			else{
				this._xhr = new window.XMLHttpRequest();

				this._is_xdomain = false;
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

			if(this._is_xdomain){
				this._xhr.onload = this._onLoad.bind(this);
				this._xhr.onerror = this._onError.bind(this);
			}
			else{
				this._xhr.onreadystatechange = this._onReadyStateChange.bind(this);
			}

			this._xhr.ontimeout = this._onTimeout.bind(this);
		},

		'_xhrFormat' : function(){
			// set the format
			var key, headers = this._request.getHeaders();

			if(headers && !this._is_xdomain){
				for(key in headers){
					// ignore content-type setting when safe since no data is sent
					if(key == 'content-type' && this._request.isSafe()){
						continue;
					}

					this._xhr.setRequestHeader(key, headers[key]);
				}
			}

			// set the caching
			if(this._policy && !this._is_xdomain){
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
			this._xhr.open(this._request.getMethod(), this._url, this._async);

			if(this._async && !this._is_xdomain){
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

			if(this._is_xdomain){
				var xhr = this._xhr;

				setTimeout(
					function(){
						xhr.send(data);
					},
					0
				);
			}
			else{
				this._xhr.send(data)
			}
		},

		'_onError' : function(){
			if(!this._xhr){
				return;
			}

			// clear the timeout timer
			OJ.destroy(this._timer);

			this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR, this._xhr.statusText, status));
			this.dispatchEvent(new OjEvent(OjEvent.FAIL));
		},

		'_onLoad' : function(){
			if(!this._xhr){
				return;
			}

			// clear the timeout timer
			OJ.destroy(this._timer);

			if(this._is_xdomain){
				this._contentType = this._xhr.contentType;
			}

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
		},

		'_onReadyStateChange' : function(){
			if(!this._xhr){
				return;
			}

			var status = this._xhr.status,
				state = this._xhr.readyState;

			// add header processing
			this.dispatchEvent(new OjHttpStatusEvent(OjHttpStatusEvent.HTTP_STATUS, status));

			if(status > 199 && status < 300 && state == 4){
				// detect the content type from the response
				this._contentType = this._xhr.getResponseHeader('Content-Type');

				this._onLoad();
			}
			else if((!status && state == 4) || status > 399){
				this._onError();
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
			var args = arguments,
				ln = args.length;

			if(ln){
				this.setRequest(args[0]);
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
	},
	{
		'USE_ACTIVEX' : (window.XDomainRequest || window.ActiveXObject),

		'CSS'          : OjUrlRequest.CSS,
		'QUERY_STRING' : OjUrlRequest.QUERY_STRING,
		'HTML'         : OjUrlRequest.HTML,
		'JS'           : OjUrlRequest.JS,
		'JSON'         : OjUrlRequest.JSON,
		'TEXT'         : OjUrlRequest.TEXT,
		'XML'          : OjUrlRequest.XML
	}
);