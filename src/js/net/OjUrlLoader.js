OJ.importJs('oj.data.OjXml');
OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.events.OjEvent');
OJ.importJs('oj.events.OjHttpStatusEvent');
OJ.importJs('oj.events.OjIoErrorEvent');
OJ.importJs('oj.events.OjProgressEvent');
OJ.importJs('oj.net.OjUrlRequest');
OJ.importJs('oj.utils.OjCacheManager');


OJ.extendClass(
	'OjUrlLoader', [OjActionable],
	{
		'_props_' : {
			'async'       : false,
			'data'        : null,
            'callback'    : null,
			'contentType' : OjUrlRequest.QUERY_STRING,
			'request'     : null,
			'timeout'     : 30000
		},

        '_get_props_' : {
            'response_headers' : null
        },

        '_error_thrown' : false,

		'_is_xdomain' : false,  '_policy' : null,  '_url' : null,  '_xhr' : null,


		'_constructor' : function(/*request, async,*/){
			this._super(OjActionable, '_constructor', []);

            this._processArguments(arguments, {
                'request': undefined,
                'async': undefined
            });
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


        '_calc_form_namespace' : function(ns, key){
            return isEmpty(ns) ? key : ns + '[' + key + ']';
        },

		'_load' : function(){
            var data,
				method = this._request.method;

            this._error_thrown = false;
			this._url = this._request.clone();

            if(method == OjUrlRequest.GET && (data = this._request.data)){
				var key;

				for(key in data){
                    this._url.setQueryParam(key, data[key]);
				}
			}

			this._request.source = this._url;

			// check to see if we have this cached
			if(!this._request.ignoresCache()){
				var url = this._url.toString();

				this._policy = CacheManager.getCacheUrlRequestPolicy(url);

				if(
					this._policy && this._policy.action == OjCachePolicy.ALWAYS &&
					(this._data = CacheManager.getCacheUrlRequestData(url, this._policy))
				){
					this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));

					return;
				}
			}

			// if not cached or ignored send the request as usual
			if(this._static.USE_ACTIVEX && this._request.host != HistoryManager.get().host){
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


        '_process_data' : function(data){
            return data;
        },

        '_process_form_data' : function(form, data, ns){
            if(isArray(data) || data instanceof FileList){
                for(var ln = data.length; ln--;){
                    this._process_form_data(form, data[ln], this._calc_form_namespace(ns, ln));
                }
            }
            else if(!(data instanceof File) && isObject(data)){
                var key;

                for(key in data){
                    this._process_form_data(form, data[key], this._calc_form_namespace(ns, key));
                }
            }
            else{
                form.append(ns, data);
            }

            return form;
        },

        '_process_json_data' : function(data){
            return toJson(data);
        },

		'_process_multipart_data' : function(data){
            if(data instanceof FormData){
                return data;
            }

            return this._process_form_data(new FormData(), data);
		},

        '_process_query_data' : function(data){
            return toQueryString(data);
        },

        '_process_xml_data' : function(data){
            return toXml(data);
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
			var key, headers = this._request.headers;

			if(headers && !this._is_xdomain){
				for(key in headers){
					// ignore content-type setting when safe since no data is sent
					if(key.toLowerCase() == 'content-type' && (this._request.isSafe() || this._request.isMultiPart())){
                        continue;
					}

					this._xhr.setRequestHeader(key, headers[key]);
				}
			}

			// set the caching
			if(this._policy && !this._is_xdomain){
				if(this._policy.action == OjCachePolicy.ALWAYS){
					var lifespan = this._policy.lifespan;

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
			this._xhr.open(this._request.method, this._url, this._async);

			if(this._async && !this._is_xdomain){
				this._xhr.timeout = this._timeout;
			}
			else{
				//todo: look into adding sync timeout capability if at all possible
			}
		},

		'_xhrSend' : function(){
			var data;

			if(this._request.method != OjUrlRequest.GET){
				if(data = this._request.data){
					var type = this._request.contentType;

					if(type == OjUrlRequest.JSON){
						data = this._process_json_data(data);
					}
					else if(type == OjUrlRequest.XML){
						data = this._process_xml_data(data);
					}
					else if(type == OjUrlRequest.QUERY_STRING){
						data = this._process_query_data(data);
					}
                    else if(type == OjUrlRequest.MULTIPART){
                        data = this._process_multipart_data(data);
                    }
                    else{
                        data = this._process_data(data);
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
            var self = this,
                callback = self._callback,
                xhr = self._xhr;

			if(!xhr || self._error_thrown){
				return;
			}

			// clear the timeout timer
			OJ.destroy(self._timer);

            var error = new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR, xhr.statusText, xhr.status);

			self.dispatchEvent(error);
			self.dispatchEvent(new OjEvent(OjEvent.FAIL));

            if(callback){
                callback(null, error);
            }

            self._error_thrown = true;
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
				this._contentType = OjUrlRequest.TEXT;
			}

			if(this._contentType.indexOf('/xml') != -1){
				this._contentType = OjUrlRequest.XML;

				this.data = this._xhr.responseXML;
			}
			else{
				if(this._contentType.indexOf('/json') != -1){
					this._contentType = OjUrlRequest.JSON;
				}
				else if(this._contentType == OjUrlRequest.QUERY_STRING){
					this._contentType = OjUrlRequest.QUERY_STRING;
				}
				else{
					this._contentType = OjUrlRequest.TEXT;
				}

				this.data = this._xhr.responseText;
			}

			this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));

            if(this._callback){
                this._callback(this.data, null);
            }
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
				this._contentType = this.getResponseHeader('Content-Type');

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
            if(this._xhr){
                this._xhr.abort();

                this._xhr = null;
            }
		},

		'load' : function(callback){
			if(callback){
				this.callback = callback;
			}

            this._load();

			return this._data;
		},


		'=data' : function(data){
			this._data = null;

			if(data){
				if(this._contentType.indexOf('/json') > -1){
					this._data = data.parseJson();
				}
				else if(this._contentType.indexOf('/xml') > -1){
					this._data = OjXml.xml(data);
				}
				else if(this._contentType == OjUrlRequest.QUERY_STRING){
					this._data = data.parseQueryString();
				}
				else{
					this._data = data;
				}
			}

			if(this.policy && this.policy.action != OjCachePolicy.NEVER){
				CacheManager.setCacheUrlRequestData(this.request, this.data, this.policy);
			}
		},

        '.response_headers' : function(){
            return this._xhr ? this._xhr.getAllResponseHeaders() : {};
        },

        'getResponseHeader' : function(header){
            return this._xhr.getResponseHeader(header);
        }
	},
	{
		'USE_ACTIVEX' : (window.XDomainRequest || window.ActiveXObject)
	}
);