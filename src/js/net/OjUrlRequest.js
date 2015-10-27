OJ.importJs('oj.net.OjUrl');


OJ.extendClass(
	'OjUrlRequest', [OjUrl],
	{
		'_props_' : {
            'contentType' : null,
			'data'        : null,
			'headers'     : null,
			'method'      : 'get'
		},

		'_ignores_cache' : false,  '_is_multipart' : false,


		'_constructor' : function(){
			this._super(OjUrl, '_constructor', []);

			this._headers = {};

            this._processArguments(arguments, {
                'source': undefined,
                'data' : undefined,
                'contentType' : undefined,
                'method' : undefined
            });
		},


        '_search_for_files' : function(obj){
            var i;

            if(isObject(obj)){
                // add check for file object
                if(obj instanceof File){
                    this._is_multipart = true;
                }
                else{
                    for(i in obj){
                        if(this._search_for_files(obj[i])){
                            break;
                        }
                    }
                }
            }
            else if(isArray(obj)){
                for(i = obj.length; i--;){
                    if(this._search_for_files(obj[i])){
                        break;
                    }
                }
            }

            return this._is_multipart;
        },


		'ignoresCache' : function(/*val*/){
			if(arguments.length){
				this._ignores_cache = arguments[0];
			}

			return this._ignores_cache && !this._headers['cache-control'];
		},

		'isDelete' : function(){
			return this._method == OjUrlRequest.DELETE;
		},

		'isGet' : function(){
			return this._method == OjUrlRequest.GET;
		},

		'isHead' : function(){
			return this._method == OjUrlRequest.HEAD;
		},

		'isMultiPart' : function(){
			return this._is_multipart || this.contentType.indexOf(OjUrlRequest.MULTIPART) > -1;
		},

		'isOptions' : function(){
			return this._method == OjUrlRequest.OPTIONS;
		},

		'isPost' : function(){
			return this._method == OjUrlRequest.POST;
		},

		'isPut' : function(){
			return this._method == OjUrlRequest.PUT;
		},

		'isSafe' : function(){
			return this.isGet() || this.isHead() || this.isOptions();
		},

		'isUnsafe' : function(){
			return !this.isSafe();
		},


		'getHeader' : function(key){
			return this._headers[key];
		},

		'setHeader' : function(key, value){
            if(key.toLowerCase() == 'content-type'){
                this.contentType = value;
            }
			else{
                this._headers[key] = value;
            }
		},

		'unsetHeader' : function(key){
			if(this._headers){
				delete this._headers[key];
			}
		},


		'.contentType' : function(){
			return this._headers['Content-Type'] ? this._headers['Content-Type'] : OjUrlRequest.TEXT;
		},
		'=contentType' : function(val){
            if(this._is_multipart || val == OjUrlRequest.MULTIPART){
                val = OjUrlRequest.MULTIPART;

                // reset the method if we are multipart, because only post and put are now valid
                this.setMethod(this.method);
            }

            this._headers['Content-Type'] = val;
		},

        '.headers' : function(){
            return Object.clone(this._headers);
        },

        '=headers' : function(val){
            this._headers = {};

            if(val){
                var key;

                for(key in val){
                    this.setHeader(key, val[key]);
                }
            }
        },

		'=data' : function(val){
			this._data = val;

			if(!this._headers['Content-Type']){
				this.contentType = OjUrlRequest.QUERY_STRING;
			}

            this._is_multipart = false;

            // search for files
            if(val && this._search_for_files(val)){
                // reset the content type, because only multipart content type is valid now
                // this will in turn update the method
                this.contentType = this.contentType;
            }
		},

        '=method' : function(val){
            if(
                this.isMultiPart() && !(val == OjUrlRequest.POST || val == OjUrlRequest.PUT)
            ){
                val = OjUrlRequest.POST;
            }

            this._method = val;
        }
	},
	{
		'urlRequest' : function(obj){
			if(isString(obj)){
				return new OjUrlRequest(obj)
			}

			if(isObject(obj) && obj.is('OjUrlRequest')){
				return obj;
			}

			return new OjUrlRequest();
		},


		'DELETE'  : 'delete',
		'GET'     : 'get',
		'HEAD'    : 'head',
		'OPTIONS' : 'options',
		'POST'    : 'post',
		'PUT'     : 'put',

		'CSS'          : 'text/css',
		'QUERY_STRING' : 'application/x-www-form-urlencoded',
		'HTML'         : 'text/html',
		'JS'           : 'text/javascript',
		'JSON'         : 'application/json',
		'MULTIPART'    : 'multipart/form-data',
		'TEXT'         : 'text/plain',
		'XML'          : 'text/xml'
	}
);