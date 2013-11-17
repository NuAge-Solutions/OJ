OJ.importJs('oj.data.OjObject');


'use strict';

OJ.extendClass(
	'OjUrl', [OjObject],
	{
		'_props_' : {
			'protocol' : null,
			'host'     : null,
			'port'     : null,
			'path'     : null,
			'query'    : null,
			'hash'     : null
		},

		'_cache' : null,  '_dirty' : null, '_hash_vars' : null,  '_query_vars' : null,


		'_setter' : function(prop, prefix, value, suffix/*, default */){
			var args = arguments;

			if(!this._cache[prop] || this['_' + prop] != value){
				this['_' + prop] = value;

				this._cache[prop] = '';

				if(isEmpty(value)){
					this['_' + prop] = args.length > 4 ? args[4] : null;
				}
				else{
					this._cache[prop] = prefix + value + suffix;
				}
			}
		},

		'_refresh' : function(/*force*/){
			if(arguments.length && !arguments[0]){
				this._dirty['query'] = true;
				this._dirty['hash'] = true;
			}

			this.getQuery();

			this.getHash();
		},


		'_constructor' : function(/*url*/){
			this._super(OjObject, '_constructor', []);

			var args = arguments;

			this.setSource(args.length ? args[0] : '');
		},


		'clone' : function() {
			return new OjUrl(this.toString());
		},

		'toString' : function() {
			this._refresh();

			return this._cache['protocol'] + this._cache['host'] + this._cache['port'] + this._cache['path'] + this._cache['query'] + this._cache['hash'];
		},


		'setProtocol' : function(protocol){
			this._setter('protocol', '', protocol.replaceAll([':', '/'], ''), '://', 'http');
		},

		'setHost' : function(host){
			this._setter('host', '', host, '');
		},

		'setPort' : function(port){
			this._setter('port', ':', port, '');
		},

		'setPath' : function(path){
			if(path && path.charAt(0) != '/'){
				path = '/' + path;
			}

			this._setter('path', '', path, '', '/');
		},

		'getQuery' : function(){
			if(this._dirty['query']){
				this.setQuery(Object.toQueryString(this._query_vars));

				delete this._dirty['query'];
				delete this._dirty['query_vars'];
			}

			return this._query;
		},
		'setQuery' : function(query){
			if(isString(query) && query.charAt(0) == '?'){
				query = query.substr(1);
			}

			this._setter('query', '?', query, '');

			this._dirty['query_vars'] = true;

			this.getQueryParams();
		},

		'getQueryParams' : function(){
			if(this._dirty['query_vars']){
				this._query_vars = this._query ? this._query.parseQueryString() : {};

				delete this._dirty['query_vars'];
			}

			return this._query_vars;
		},
		'setQueryParams' : function(params){
			this._query_vars = params;

			this._dirty['query'] = true;
		},

		'getQueryParam' : function(key){
			this._query_vars = this.getQueryParams();

			return this._query_vars[key];
		},
		'setQueryParam' : function(key, value){
			this._query_vars = this.getQueryParams();

			if(isSet(value)){
				this._query_vars[key] = value;
			}
			else{
				delete this._query_vars[key];
			}

			this._dirty['query'] = true;
		},

		'getHash' : function(){
			if(this._dirty['hash']){
				this.setHash(Object.toQueryString(this.getHashParams()));

				delete this._dirty['hash'];
			}

			return this._hash;
		},
		'setHash' : function(hash){
			if(hash && hash.charAt(0) == '#'){
				hash = hash.substr(1);
			}

			this._setter('hash', '#', hash, '');

			delete this._dirty['hash'];

			this._dirty['hash_vars'] = true;

			this.getHashParams();
		},

		'getHashParams' : function(){
			if(this._dirty['hash_vars']){
				this._hash_vars = {};

				if(this._hash){
					this._hash_vars = this._hash.parseQueryString();
				}

				delete this._dirty['hash_vars'];
			}

			return this._hash_vars;
		},
		'setHashParams' : function(params){
			this._hash_vars = params;

			this._dirty['hash'] = true;

			delete this._dirty['hash_params'];
		},

		'getHashParam' : function(key){
			this._hash_vars = this.getHashParams();

			return this._hash_vars[key];
		},
		'setHashParam' : function(key, value){
			this._hash_vars = this.getHashParams();

			if(isSet(value)){
				this._hash_vars[key] = value;
			}
			else{
				delete this._hash_vars[key];
			}

			this._dirty['hash'] = true;
		},

		'getSource' : function(){
			return this.toString();
		},
		'setSource' : function(val){
			if(isObjective(val)){
				val = val.toString();
			}

			this._query_vars = {};
			this._hash_vars = {};
			this._cache = {};
			this._dirty = {};

			// create an anchor and let the dom do the url parsing
			var a = document.createElement('a');
			a.href = val;

			// get the parsed url info from the a element
			this.setProtocol(a.protocol);

			this.setHost(a.hostname);

			this.setPort(a.port);

			this.setPath(a.pathname);

			this.setQuery(a.search);

			this.setHash(a.hash);

			// reset the dirty flags
			this._refresh();
		}
	},
	{
		'url' : function(obj){
      if(obj){
        if(isString(obj)){
          return new OjUrl(obj)
        }

        if(isObject(obj) && obj.is('OjUrl')){
          return obj;
        }

        return new OjUrl();
      }

      return null;
		}
	}
);