importJs("oj.events.OjActionable");
importJs("oj.utils.OjCacheObject");
importJs("oj.utils.OjCachePolicy");


OJ.extendManager(
    "CacheManager", "OjCacheManager", [OjActionable],
    {
        // lifespans
        "MINUTE"  : 60,
        "HOUR"    : 3600,
        "DAY"     : 86400,
        "WEEK"    : 604800,
        "MONTH"   : 2419200,
        "YEAR"    : 29030400,
        "FOREVER" : 0,


        "_cache_size" : 0, "_cache_cls" : OjCacheObject,


        "_constructor" : function(){
            this._super(OjActionable, '_constructor', []);

            // check to see if local storage is supported
            try{
                this._localStorage = "localStorage" in window && !isNull(window.localStorage) ? window.localStorage : null;
            }
            catch(exception){
                // we don't need to do anything here since this was just to check for local storage support
            }

            // determine which set of functions to use based on the systems capabilities
            if(this._localStorage){
                this.getCachedData   = this.getLocalStorage;
                this.setCachedData   = this.setLocalStorage;
                this.unsetData       = this.unsetLocalStorage;
            }
            else{
                this.getCachedData   = this.getCookie;
                this.setCachedData   = this.setCookie;
                this.unsetData       = this.unsetCookie;
            }

            // setup vars
            this._policies = {};
        },


        // Caching Method Functions
        "_getCachedData" : function(raw_data){
            let data;

            try{
                if(!raw_data || !(data = raw_data.parseJson())){
                    return null;
                }
            }
            catch(e){
                return null;
            }

            if(isObject(data)){
                const type = data[OjObject.TYPE_KEY];

                if(isUndefined(type) || (
                    !isNull(type) && type != "undefined" && type != "boolean" && type != "number" && type != "string"
                )){
                    return OjObject.importData(data, OjObject.CACHE);
                }

                if(!type){
                    return null;
                }

                if(type == "undefined"){
                    return undefined;
                }

                return data.value;
            }

            return data;
        },

        "_getCookie" : function(key){
            const cookies = ';' + document.cookie;
            const index = cookies.indexOf(';' + key + '=');

            if(index == -1 || isEmpty(key)){
                return undefined;
            }

            let index2 = cookies.indexOf(';', index + 1);

            if(index2 == -1){
                index2 = theCookie.length;
            }

            return decodeURIComponent(cookies.substring(index + key.length + 2, index2));
        },

        "_getLocalStorage" : function(key){
            return this._localStorage.getItem(key);
        },

        "_isCachedExpired" : function(data){
            // if this is a cache object and then make sure it hasn't expired
            return isObjective(data, this._cache_cls) && data.is_expired;
        },

        "_processDefault" : function(args){
            return args.length > 1 ? args[1] : null;
        },

        "_setCachedData" : function(data){
            if(isObject(data)){
                data = OjObject.exportData(data, OjObject.CACHE);
            }
            else{
                data = {
                    "value" : data
                };

                data[OjObject.TYPE_KEY] = typeof data
            }

            return toJson(data);
        },

        "_setCookie" : function(key, data, lifespan){
            const expires = new Date();

            lifespan = lifespan || this.FOREVER;

            if(isNull(lifespan) || lifespan == 0){
                lifespan = this.YEAR; // 1 year = forever
            }

            expires.setTime((new Date()).getTime() + lifespan);

            document.cookie = key + '=' + encodeURIComponent(data) + ';expires=' + expires.toGMTString();

            return data;
        },

        "_setLocalStorage" : function(key, data){
            this._localStorage[key] = data;

            return data;
        },

        "_unsetCookie" : function(key){
            document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        },

        "_unsetLocalStorage" : function(key){
            delete this._localStorage[key];
        },


        // UrlRequest Caching Functions
        "getCacheUrlRequestData" : function(url){
            if(isEmpty(url = url.toString())){
                return null;
            }

            return this.getData(url);
        },

        "getCacheUrlRequestPolicy" : function(url){
            if(isEmpty(url = url.toString())){
                return null;
            }

            for(let key in this._policies){
                if(url.match(key)){
                    return this._policies[key];
                }
            }

            return null;
        },

        "setCacheUrlRequestData" : function(url, data, policy){
            if(isEmpty(url = url.toString())){
                return null;
            }

            policy = policy || this.getCacheUrlRequestPolicy(url);

            CacheManager.setData(url, data, policy ? policy.lifespan : null);
        },

        "setCacheUrlRequestPolicy" : function(policy){
            this._policies[policy.url.replace(/\*/g, '[^ ]*')] = policy;
        },

        "unsetCacheUrlRequestPolicy" : function(policy/*|url*/){
            let url;

            if(isObjective(policy) && policy.is('OjCachePolicy')){
                url = policy.url.toString();
            }
            else{
                url = policy.toString();
            }

            try{
                delete this._policies[url.replace(/\*/g, '[^ ]*')];
            }
            catch(e){}
        },

        "unsetCacheUrlRequestData" : function(url){
            CacheManager.unsetData(url);
        },


        // Regular Data Caching Functions
        "getCachedData" : function(key){
            throw new Error('No getCachedData() defined.');

            return;
        },

        "getData" : function(key, dflt){
            const cached = this.getCachedData(key);

            dflt = dflt || null;

            if(this._isCachedExpired(cached)){
                this.unsetCachedData(cached);

                return dflt;
            }

            return (cached ? cached.data : null) || dflt;
        },

        "setCachedData" : function(cached){
            throw new Error('No setCachedData() defined.');

            return cached;
        },

        "setData" : function(key, value, lifespan){
            const cls = this._cache_cls;

            return this.setCachedData(new cls(key, value, lifespan))
        },

        "unsetCachedData" : function(cached){
            return this.unsetData(cached.key);
        },

        "unsetData" : function(key){
            throw new Error('No unsetData() defined.');
        },


        // Cookie Caching Functions
        "getCookie" : function(key){
            return this._getCachedData(this._getCookie(key));
        },

        "setCookie" : function(cached){
            this._setCookie(
                cached.key,
                this._setCachedData(cached),
                cached.lifespan
            );

            return cached;
        },

        "unsetCookie" : function(key){
            this._unsetCookie(key);
        },


        // LocalData Caching Functions
        "getLocalStorage" : function(key){
            return this._getCachedData(this._getLocalStorage(key));
        },

        "setLocalStorage" : function(cached){
            this._setLocalStorage(
                cached.key,
                this._setCachedData(cached)
            );

            return cached;
        },

        "unsetLocalStorage" : function(key){
            this._unsetLocalStorage(key);
        }
    }
);