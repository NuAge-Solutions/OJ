importJs('oj.data.OjXml');
importJs('oj.events.OjActionable');
importJs('oj.events.OjEvent');
importJs('oj.events.OjHttpStatusEvent');
importJs('oj.events.OjIoErrorEvent');
importJs('oj.events.OjProgressEvent');
importJs('oj.net.OjUrlRequest');
importJs('oj.utils.OjCacheManager');


OJ.extendClass(
    "OjUrlLoader", [OjActionable],
    {
        "_props_" : {
            'async'       : true,
            'data'        : null,
            'callback'    : null,
            'content_type' : OjUrlRequest.QUERY_STRING,
            'request'     : null,
            'timeout'     : 30000
        },

        "_get_props_" : {
            "policy" : null,
            "response_headers" : null,
            "status_code" : null
        },

        //"_error_thrown" : false,
        //
        //"_url" : null,  "_xhr" : null,


        "_constructor" : function(/*request, async,*/){
            this._super(OjActionable, "_constructor", []);

            this._processArguments(arguments, {
                "request": undefined,
                "async": undefined
            });
        },

        "_destructor" : function(){
            var self = this;

            if(self._xhr){
                self._cleanupXhr();
            }

            self._unset("_request");

            return self._super(OjActionable, "_destructor", arguments);
        },


        '_calc_form_namespace' : function(ns, key){
            return isEmpty(ns) ? key : ns + '[' + key + ']';
        },

        "_cleanupXhr" : function(){
            var self = this,
                xhr = self._xhr;

            xhr.onprogress = xhr.onloadend = xhr.ontimeout = null;

            self._unset("_xhr");
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

            // this._request.source = this._url;

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
            this._xhr = new window.XMLHttpRequest();

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
            var self = this,
                xhr = self._xhr;

            self.dispatchEvent(new OjEvent(OjEvent.OPEN));

            xhr.onloadend = function(){
                var status = this.status;

                self._status_code = status;
                self._static.dequeueLoader(self);

                if(status > 199 && status < 400){
                    // detect the content type from the response
                    self._content_type = xhr.getResponseHeader("Content-Type");

                    self._onLoad();
                }
                else{
                    self._onError();
                }
            };

            xhr.onprogress = function(){
                self.dispatchEvent(new OjProgressEvent(OjProgressEvent.PROGRESS));
            };

            //xhr.ontimeout = function(){
            //    self.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_TIMEOUT));
            //    self.dispatchEvent(new OjEvent(OjEvent.FAIL));
            //};
        },

        '_xhrFormat' : function(){
            // set the format
            var key, headers = this._request.headers;

            if(headers){
                for(key in headers){
                    // ignore content-type setting when safe since no data is sent
                    if(key.toLowerCase() == 'content-type' && (this._request.isSafe() || this._request.isMultiPart())){
                        continue;
                    }

                    this._xhr.setRequestHeader(key, headers[key]);
                }
            }

            // set the caching
            if(this._policy){
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

            if(this._async){
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
                    var type = this._request.content_type;

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

            this._xhr.send(data)
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
            var self = this,
                ct = self._content_type,
                xhr = self._xhr;

            if(!xhr){
                return;
            }

            // clear the timeout timer
            OJ.destroy(self._timer);

            if(ct){
                self._content_type = ct = ct.toLowerCase();
            }
            else{
                self._content_type = ct = OjUrlRequest.TEXT;
            }

            var data = xhr.response;

            if(data && isString(data)){
                if(ct.contains("/json")){
                    data = data.parseJson();
                }
                else if(ct.contains("/xml") || ct.contains("/html")){
                    data = OjXml.xml(data);
                }
                else if(ct == OjUrlRequest.QUERY_STRING){
                    data = data.parseQueryString();
                }
            }

            self.data = data;

            self.dispatchEvent(new OjEvent(OjEvent.COMPLETE));

            if(self._callback){
                self._callback(self.data, null);
            }
        },


        'cancel' : function(){
            if(this._xhr){
                this._xhr.abort();

                this._xhr = null;
            }
        },

        'load' : function(callback){
            var self = this;

            if(callback){
                self.callback = callback;
            }

            self._static.queueLoader(self);

            return self._data;
        },


        "=data" : function(data){
            var self = this,
                policy = self.policy;

            self._data = data;

            if(policy && policy.action != OjCachePolicy.NEVER){
                CacheManager.setCacheUrlRequestData(self.request, data, policy);
            }
        },

        '.response_headers' : function(){
            var xhr = this._xhr;

            return xhr && xhr.getAllResponseHeaders ? xhr.getAllResponseHeaders() : {};
        },

        'getResponseHeader' : function(header){
            return this._xhr.getResponseHeader(header);
        }
    },
    {
        '_HOST_REQUEST_COUNT' : {},
        '_HOST_REQUEST_MAX' : 5,
        '_QUEUE' : [],

        "OK": 200,
        "CREATED": 201,
        "ACCEPTED": 202,

        "NOT_MODIFIED": 304,

        "BAD_REQUEST": 400,
        "UNAUTHORIZED": 401,
        "PAYMENT_REQUIRED": 402,
        "FORBIDDEN": 403,
        "NOT_FOUND": 404,
        "METHOD_NOT_ALLOWED": 405,
        "NOT_ACCEPTABLE": 406,
        "TIMEOUT": 408,
        "CONFLICT": 409,
        "GONE": 410,
        "DUPLICATE": 412,  // Formally known as "Precondition Failed"
        "UNSUPPORTED_TYPE": 415,

        "INTERNAL_ERROR": 500,
        "NOT_IMPLEMENTED": 501,
        "BAD_GATEWAY": 502,
        "UNAVAILABLE": 503,
        "GATEWAY_TIMEOUT": 504,
        "UNKNOWN": 520,


        '_loadLoader' : function(ldr){
            var self = this,
                counts = self._HOST_REQUEST_COUNT,
                queue = self._QUEUE,
                host = ldr.request.host;

            // update the host request count
            if(counts[host]){
                counts[host]++;
            }
            else{
                counts[host] = 1;
            }

            // try to remove req from queue
            queue.remove(ldr);

            // load it up
            ldr._load();
        },

        'dequeueLoader' : function(ldr){
            var self = this,
                counts = self._HOST_REQUEST_COUNT,
                queue = self._QUEUE,
                host = ldr.request.host;

            // update domain request count
            counts[host]--;

            // check to see if we have any queued request for that domain
            queue.forEach(function(item, i){
                if(item.request.host == host){
                    self._loadLoader(item);

                    return false;
                }
            });
        },

        'queueLoader' : function(ldr){
            var self = this,
                counts = self._HOST_REQUEST_COUNT,
                queue = self._QUEUE,
                host = ldr.request.host,
                cnt = counts[host] || 0;

            // check to make sure we aren't already queued
            if(queue.contains(ldr)){
                return;
            }

            // check to see if are under the threshold to allow load
            if(cnt < self._HOST_REQUEST_MAX){
                self._loadLoader(ldr);
            }
            else{
                queue.append(ldr);
            }
        },


        'USE_ACTIVEX' : (window.XDomainRequest || window.ActiveXObject)
    }
);
