OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.utils.OjCacheObject');
OJ.importJs('oj.utils.OjCachePolicy');


'use strict';

OJ.extendManager(
	'CacheManager', 'OjCacheManager', [OjActionable],
	{
		// lifespans
		'MINUTE'  : 60,
		'HOUR'    : 3600,
		'DAY'     : 86400,
		'WEEK'    : 604800,
		'MONTH'   : 2419200,
		'YEAR'    : 29030400,
		'FOREVER' : 0,


		'_cache_size' : 0,  '_localStorage' : null,  '_policies' : null,

		'_getCached' : null,  '_setCached' : null,  '_unsetCached' : null,


		'_constructor' : function(){
			this._super(OjActionable, '_constructor', arguments);

			// check to see if local storage is supported
			try{
				this._localStorage = 'localStorage' in window && !isNull(window['localStorage']) ? window.localStorage : null;
			}
			catch(exception){
				// we don't need to do anything here since this was just to check for local storage support
			}

			// determine which set of functions to use based on the systems capabilities
			if(this._localStorage){
				this.getData   = this.getLocalData;
				this.setData   = this.setLocalData;
				this.unsetData = this.unsetLocalData;
			}
			else{
				this.getData   = this.getCookie;
				this.setData   = this.setCookie;
				this.unsetData = this.unsetCookie;
			}

			// setup vars
			this._policies = {};
		},


		// Caching Method Functions
		'_getCookie' : function(key){
			var cookies = ';' + document.cookie;
			var index = cookies.indexOf(';' + key + '=');

			if(index == -1 || isEmpty(key)){
				return undefined;
			}

			var index2 = cookies.indexOf(';', index + 1);

			if(index2 == -1){
				index2 = theCookie.length;
			}

			return this._getData(decodeURIComponent(cookies.substring(index + key.length + 2, index2)));
		},

		'_getData' : function(raw_data){
			var data;

			if(!raw_data || !(data = raw_data.parseJson())){
				return null;
			}

			if(isObject(data)){
				var type = data['_class_name'];

				if(
					isUndefined(type) ||
						(!isNull(type) && type != 'undefined' && type != 'boolean' && type != 'number' && type != 'string')
				){
					return OjObject.importData(data);
				}

				if(!type){
					return null;
				}

				if(type == 'undefined'){
					return undefined;
				}

				return data['value'];
			}

			return data;
		},

		'_getLocalData' : function(key){
			return this._getData(this._localStorage.getItem(key));
		},

		'_isDataExpired' : function(data){
			var exp;

			// if this is a cache object and then make sure it hasn't expired
			if(
				isObjective(data) && data.is('OjCacheObject') &&
				(exp = data.getExpiration()) && exp < new Date()
			){
				return true;
			}

			return false;
		},

		'_setCookie' : function(key, data){
			var expires = new Date();
			var lifespan = arguments.length > 2 ? arguments[2] : this.FOREVER;

			if(isNull(lifespan) || lifespan == 0){
				lifespan = this.YEAR; // 1 year = forever
			}

			expires.setTime((new Date()).getTime() + lifespan);

			document.cookie = key + '=' + encodeURIComponent(this._setData(data)) + ';expires=' + expires.toGMTString();
		},

		'_setData' : function(data){
			if(isObject(data)){
				data = isObjective(data) ? data.exportData() : OjObject.exportData(data);
			}
			else{
				data = {
					'_class_name' : typeof data,
					'value'       : data
				};
			}

			return toJson(data);
		},

		'_setLocalData' : function(key, data){
			this._localStorage[key] = this._setData(data);
		},


		// UrlRequest Caching Functions
		'getCacheUrlRequestData' : function(url){
			if(isEmpty(url = url.toString())){
				return null;
			}

			return this.getData(url);
		},

		'getCacheUrlRequestPolicy' : function(url){
			if(isEmpty(url = url.toString())){
				return null;
			}

			var key;

			for(key in this._policies){
				if(url.match(key)){
					return this._policies[key];
				}
			}

			return null;
		},

		'setCacheUrlRequestData' : function(url, data/*, policy*/){
			if(isEmpty(url = url.toString())){
				return null;
			}

			var policy = arguments.length > 2 ? arguments[2] : this.getCacheUrlRequestPolicy(url);

			CacheManager.setData(url, data, policy ? policy.getLifespan() : null);
		},

		'setCacheUrlRequestPolicy' : function(policy){
			this._policies[policy.getUrl().replace(/\*/g, '[^ ]*')] = policy;
		},

		'unsetCacheUrlRequestPolicy' : function(policy/*|url*/){
			var url;

			if(isObjective(policy) && policy.is('OjCachePolicy')){
				url = policy.getUrl().toString();
			}
			else{
				url = policy.toString();
			}

			try{
				delete this._policies[url.replace(/\*/g, '[^ ]*')];
			}
			catch(e){}
		},

		'unsetCacheUrlRequestData' : function(url){
			CacheManager.unsetData(url);
		},


		// Regular Data Caching Functions
		'getData' : function(key){
			throw new Error('No getData() defined.');

			return;

//					var data = ;
//
//					if(!data){
//						return null;
//					}
//
//					if(isObject(data)){
//						data = OjObject.importData(data);
//
//						return data.getData();
//					}

			var data = this._getCachedData(key);

			return data ? data.getData() : null;
		},

		'setData' : function(key, value/*, lifespan*/){
			throw new Error('No setData() defined.');

			return;

			this._setCachedData(key, this._setData.apply(this, [].slice.call(arguments, 1)));
		},

		'unsetData' : function(key){
			throw new Error('No unsetData() defined.');
		},


		// Cookie Caching Functions
		'getCookie' : function(key){
			var data = this._getCookie(key);

			return data ? data.getData() : null;
		},

		'setCookie' : function(key, value/*, lifespan*/){
			var ln = arguments.length;

			this._setCookie(key, new OjCacheObject(value, ln > 2 ? arguments[2] : null));
		},

		'unsetCookie' : function(key){
			document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		},


		// LocalData Caching Functions
		'getLocalData' : function(key){
			var data = this._getLocalData(key);

			if(this._isDataExpired(data)){
				this.unsetLocalData(key);

				return null;
			}

			return data ? data.getData() : null;
		},

		'setLocalData' : function(key, value/*, lifespan*/){
			var args = arguments,
				ln = args.length;

			this._setLocalData(key, new OjCacheObject(value, ln > 2 ? args[2] : null));
		},

		'unsetLocalData' : function(key){
			delete this._localStorage[key];
		}
	}
);