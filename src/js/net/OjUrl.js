OJ.importJs('oj.data.OjObject');


OJ.extendClass(
	'OjUrl', [OjObject],
	{
		'_props_' : {
			'protocol'    : null,
            'hash_params'  : null,
			'host'        : null,
			'port'        : null,
			'path'        : null,
			'query'       : null,
            'query_params' : null,
			'hash'        : null,
            'source'      : null
		},


		'_constructor' : function(url){
            var self = this;

            self._super(OjObject, '_constructor', []);

            self._dirty = {};

			self.source = url || '';
		},


        '_updateHash' : function(){
            var self = this;

            if(self._dirty.hash){
				self._hash = Object.toQueryString(self._hash_params)

				delete self._dirty.hash;
			}

            return self._hash;
        },

        '_updateQuery' : function(){
            var self = this;

            if(self._dirty.query){
				self._query = Object.toQueryString(self._query_params)

				delete self._dirty.query;
			}

            return self._query;
        },


		'clone' : function() {
			return new OjUrl(this.toString());
		},

        'getHashParam' : function(key){
			return this._hash_params[key];
		},

        'getQueryParam' : function(key){
			return this._query_params[key];
		},

        'setHashParam' : function(key, value){
			var self = this,
                params = self._hash_params;

			if(isSet(value)){
				params[key] = value;
			}
			else{
				delete params[key];
			}

			self._dirty.hash = true;
		},

		'setQueryParam' : function(key, value){
            var self = this,
                params = self._query_params;

			if(isSet(value)){
				params[key] = value;
			}
			else{
				delete params[key];
			}

			self._dirty.query = true;
		},

		'toString' : function() {
            var self = this,
                str = String.string,
                hash = self._updateHash(),
                port = self.port,
                protocol = self.protocol,
                query = self._updateQuery();

			return (protocol ? protocol + ':' : '') + '//' + str(self.host) + (port ? ':' + port : '') +
                   str(self.path) + (isEmpty(query) ? '' : '?' + query) + (isEmpty(hash) ? '' : '#' + hash);
		},


		'=protocol' : function(protocol){
            this._protocol = (protocol || 'http').replaceAll([':', '/'], '');
		},

		'=path' : function(path){
			if(path && path.charAt(0) != '/'){
				path = '/' + path;
			}

			this._path = path;
		},

		'.query' : function(){
            return this._updateQuery();
		},
		'=query' : function(query){
			if(isString(query) && query.charAt(0) == '?'){
				query = query.substr(1);
			}

            var self = this;

            if(self._query == query && !self._dirty.query){
                return
            }

            self._query_params = (self._query = query || '').parseQueryString();
		},

		'.query_params' : function(){
            return Object.clone(this._query_params);
		},
		'=query_params' : function(params){
			this._query_params = params ? params.clone() : {};

			this._dirty.query = true;
		},

		'.hash' : function(){
            return this._updateHash();
		},
		'=hash' : function(hash){
			if(isString(hash) && hash.charAt(0) == '#'){
				hash = hash.substr(1);
			}

            var self = this;

            if(self._hash == hash && !self._dirty.hash){
                return
            }

            self._hash_params = (self._hash = hash || '').parseQueryString();

            delete self._dirty.hash;
		},

		'.hash_params' : function(){
			return Object.clone(this._hash_params);
		},
		'=hash_params' : function(params){
            var self =this;

			self._hash_params = params ? params.clone() : {};

			self._dirty.hash = true;
		},

		'.source' : function(){
			return this.toString();
		},
		'=source' : function(val){
            var self = this,
                a = document.createElement('a');

			if(isObjective(val)){
				val = val.toString();
			}

			// create an anchor and let the dom do the url parsing
			a.href = val;

			// get the parsed url info from the a element
			self.protocol = a.protocol;

			self.host = a.hostname;

			self.port = a.port;

			self.path = a.pathname;

			self.query = a.search;

			self.hash = a.hash;

            self._dirty = {};
		}
	},
	{
		'url' : function(obj){
            if(obj){
                if(isString(obj)){
                    return new OjUrl(obj)
                }

                if(isObjective(obj, OjUrl)){
                    return obj;
                }

                return new OjUrl();
            }

            return null;
		}
	}
);