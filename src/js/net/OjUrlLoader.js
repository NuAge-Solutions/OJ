importJs("oj.data.OjXml");
importJs("oj.events.OjActionable");
importJs("oj.events.OjEvent");
importJs("oj.events.OjHttpStatusEvent");
importJs("oj.events.OjIoError");
importJs("oj.events.OjProgressEvent");
importJs("oj.net.OjUrlRequest");
importJs("oj.utils.OjCacheManager");


OJ.extendClass(
    "OjUrlLoader", [OjActionable],
    {
        "_props_" : {
            "async"       : true,
            "content_type" : OjUrlRequest.QUERY_STRING,
            "request"     : null,
            "timeout"     : 60000
        },

        "_get_props_" : {
            "error" : null,
            "data" : null,
            "is_failure" : false,
            "is_loaded" : false,
            "is_loading" : false,
            "is_success" : false,
            "policy" : null,
            "response_headers" : {},
            "status_code" : 0
        },

        "_constructor" : function(request, async){
            this._super(OjActionable, "_constructor", []);

            this._set("request", request);
            this._set("async", async);
        },

        "_destructor" : function(){
            this.cancel();

            this._unset("_request");

            return this._super(OjActionable, "_destructor", arguments);
        },


        "_calc_form_namespace" : function(ns, key){
            return isEmpty(ns) ? key : ns + "[" + key + "]";
        },

        "_cleanupXhr" : function(){
            const xhr = this._xhr;

            if(xhr){
                xhr.onabort = xhr.onerror = xhr.onload = xhr.onloadend = xhr.onloadstart = xhr.onprogress = xhr.onreadystatechange = xhr.ontimeout = null;

                this._unset("_xhr");
            }
        },

        "_load" : function(){
            // cancel current load
            this.cancel();

            const req = this._request,
                method = req.method;

            let data;

            this._data = null;
            this._error = null;
            this._is_loaded = false;
            this._is_loading = true;
            this._response_headers = {};
            this._url = req.clone();
            this._status_code = 0;

            if(method == OjUrlRequest.GET && (data = req.data)){
                for(let key in data){
                    this._url.setQueryParam(key, data[key]);
                }
            }

            // check to see if we have this cached
            if(!req.ignoresCache()){
                const url = this._url.toString(),
                    policy = CacheManager.getCacheUrlRequestPolicy(url);

                this._policy = policy;

                if(
                    policy && policy.action == OjCachePolicy.ALWAYS &&
                    (this._data = CacheManager.getCacheUrlRequestData(url, policy))
                ){
                    this._error = null
                    this._status_code = 301;

                    return this._onCompletion(new OjEvent(OjEvent.COMPLETE));
                }
            }

            // if not cached or ignored send the request as usual
            this._xhr = new window.XMLHttpRequest();

            this._xhrOpen();

            this._xhrFormat();

            this._xhrEvents();

            this._xhrSend();
        },

        "_process_data" : function(data){
            return data;
        },

        "_process_form_data" : function(form, data, ns){
            if(isArray(data) || data instanceof FileList){
                for(let ln = data.length; ln--;){
                    this._process_form_data(form, data[ln], this._calc_form_namespace(ns, ln));
                }
            }
            else if(!(data instanceof File) && isObject(data)){
                for(let key in data){
                    this._process_form_data(form, data[key], this._calc_form_namespace(ns, key));
                }
            }
            else{
                form.append(ns, data);
            }

            return form;
        },

        "_process_json_data" : function(data){
            return toJson(OjObject.exportData(data));
        },

        "_process_multipart_data" : function(data){
            if(data instanceof FormData){
                return data;
            }

            return this._process_form_data(new FormData(), data);
        },

        "_process_query_data" : function(data){
            return toQueryString(data);
        },

        "_process_xml_data" : function(data){
            return toXml(data);
        },

        "_setData": function(xhr){
            try{
                let data = xhr.response;

                if(data && isString(data)){
                    const ct = (this.getResponseHeader("Content-Type") || OjUrlRequest.TEXT).toLowerCase();

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

                this._data = data;
            }
            catch(e){
                this._data = null;
            }
        },

        "_setError" : function(error){
            this._error = error;
        },


        "_xhrEvents" : function(){
            const xhr = this._xhr;

            this.dispatchEvent(new OjEvent(OjEvent.OPEN));

            xhr.onabort =  () => {
                print("ABORT", this);
            };

            xhr.onreadystatechange = () => {
                try{
                    const xhr = this._xhr;

                    if(xhr.readyState == xhr.HEADERS_RECEIVED){
                        try{
                            const all_headers = xhr.getAllResponseHeaders(),
                                headers = {};

                            all_headers.trim().split(/[\r\n]+/).forEach((line) => {
                                const parts = line.split(': '),
                                    header = parts.shift(),
                                    value = parts.join(': ');

                                headers[header.toLowerCase()] = value;
                            });

                            this._response_headers = headers;
                        }
                        catch(e){
                            this._response_headers = {};
                        }
                    }
                }
                catch (e) {
                    // do nothing
                }
            };

            xhr.onloadend = () => {
                const xhr = this._xhr,
                    status = xhr.status;

                this._status_code = status;
                this._static.dequeueLoader(this);

                if(status > 199 && status < 400){
                    this._onLoad();
                }
                else{
                    this._onError(new OjIoError(OjIoError.IO_ERROR, xhr.statusText, status));
                }
            };

            xhr.onprogress = () => {
                this.dispatchEvent(new OjProgressEvent(OjProgressEvent.PROGRESS));
            };

            xhr.ontimeout = () => {
                this._onError(new OjIoError(OjIoError.IO_TIMEOUT, "Request Timeout", 408));
            };
        },

        "_xhrFormat" : function(){
            // set the format
            const headers = this._request.headers,
                req = this._request,
                policy = this._policy,
                xhr = this._xhr;

            if(xhr){
                if(headers){
                    for(let key in headers){
                        // ignore content-type setting when safe since no data is sent
                        if(key.toLowerCase() == "content-type" && (req.isSafe() || req.isMultiPart())){
                            continue;
                        }

                        xhr.setRequestHeader(key, headers[key]);
                    }
                }

                // set the caching
                if(policy){
                    if(policy.action == OjCachePolicy.ALWAYS){
                        let lifespan = policy.lifespan;

                        if(!lifespan){
                            lifespan = CacheManager.YEAR;
                        }

                        xhr.setRequestHeader("cache-control", "max-age=" + lifespan);
                    }
                    else{
                        xhr.setRequestHeader("cache-control", "no-cache");
                    }
                }
            }
        },

        "_xhrOpen" : function(){
            const xhr = this._xhr;

            if(xhr){
                const async = this._async;

                xhr.open(this._request.method, this._url, async);

                if(async){
                    xhr.timeout = this.timeout;
                }
                else{
                    const timer = new OjTimer(this.timeout, 0);
                    timer.on_complete = () => {
                        try{
                            this._xhr.ontimeout();
                        }
                        catch(e){
                            // do nothing
                        }
                    };
                    timer.start();

                    this._timer = timer;
                }
            }
        },

        "_xhrSend" : function(){
            const xhr = this._xhr,
                req = this._request;

            if(xhr) {
                let data;

                if (req.method != OjUrlRequest.GET) {
                    if (data = req.data) {
                        const type = req.content_type;

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

                xhr.send(data)
            }
        },


        "_onCompletion" : function(){
            this._cleanupXhr();

            // clear the timeout timer
            OJ.destroy(this._timer);

            this._is_loading = false;
            this._is_loaded = !this._error || this._error.type == OjIoError.IO_ERROR;  // loaded only if successful request (no timeouts or cancels)

            Array.array(arguments).forEach((evt) => {
                this.dispatchEvent(evt);
            });

            if(this._error){
                this._reject(this._error);
            }
            else{
                this._resolve(this._data);
            }
        },

        "_onError" : function(error){
            const xhr = this._xhr;

            // if the error is already set no need to send another
            if(this._error){
                return;
            }

            // set the data and error
            this._setData(xhr);
            this._setError(error);

            // dispatch events
            this._onCompletion(error, new OjEvent(OjEvent.FAIL));
        },

        "_onLoad" : function(){
            const xhr = this._xhr;

            if(!xhr){
                return this._onError(new OjIoError(OjIoError.IO_CANCEL, "Request Failed", 499));
            }

            // set the data and error
            this._setData(xhr);
            this._setError(null);

            // update cache
            const policy = this.policy;

            if(policy && policy.action != OjCachePolicy.NEVER){
                CacheManager.setCacheUrlRequestData(this.request, this.data, policy);
            }

            // dispatch events
            this._onCompletion(new OjEvent(OjEvent.COMPLETE));
        },


        "cancel" : function(){
            // check if we even need to do anything
            if(!this._is_loading){
                return;
            }

            // check for xhr abort support
            const xhr = this._xhr;

            if(xhr && xhr.abort){
                xhr.abort();
            }
            else{
                this._onError(null, new OjIoError(OjIoError.IO_CANCEL, "Request Cancelled", 499))
            }
        },

        "load" : function(completion){
            const promise = new Promise((resolve, reject) => {
                this._resolve = resolve;
                this._reject = reject;

                this._static.queueLoader(this);
            });

            if(completion){
                return promise.then((data) => {
                    completion(data);
                }).catch((error) => {
                    completion(null, error);
                });
            }

            return promise;
        },

        "getResponseHeader" : function(header){
            if(isEmpty(header)){
                return null;
            }

            return this._response_headers[header.toLowerCase()];
        },

        ".is_failure" : function(){
            return isDefined(this._error);
        },

        ".is_success" : function(){
            return !this.is_failure;
        }
    },
    {
        "_HOST_REQUEST_COUNT" : {},
        "_HOST_REQUEST_MAX" : 5,
        "_QUEUE" : [],

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


        "_loadLoader" : function(ldr){
            const self = this,
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

        "dequeueLoader" : function(ldr){
            const self = this,
                counts = self._HOST_REQUEST_COUNT,
                queue = self._QUEUE,
                host = ldr.request.host;

            // update domain request count
            counts[host]--;

            // check to see if we have any queued request for that domain
            queue.forEach((item, i) => {
                if(item.request.host == host){
                    self._loadLoader(item);

                    return false;
                }
            });
        },

        "queueLoader" : function(ldr){
            const self = this,
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


        "USE_ACTIVEX" : (window.XDomainRequest || window.ActiveXObject)
    }
);
