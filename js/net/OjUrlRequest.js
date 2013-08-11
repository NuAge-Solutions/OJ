OJ.importJs('oj.net.OjUrl');


'use strict';

OJ.extendClass(
	'OjUrlRequest', [OjUrl],
	{
		'_props_' : {
			'data'        : null,
			'files'       : null,
			'headers'     : null,
			'method'      : 'get'
		},

		'_ignores_cache' : false,


		'_constructor' : function(/*url, data, content_type, method*/){
			var ln = arguments.length;

			this._super(OjUrl, '_constructor', ln ? [arguments[0]] : []);

			this._headers = {};

			if(ln > 1){
				this.setData(arguments[1]);

				if(ln > 2){
					this.setContentType(arguments[2]);

					if(ln > 3){
						this.setMethod(arguments[3]);
					}
				}
			}
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
			return this.getContentType() == OjUrlRequest.MULTIPART || !isEmpty(this._files);
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
			return this._headers[key.toLowerCase()];
		},

		'setHeader' : function(key, value){
			this._headers[key.toLowerCase()] = value;
		},

		'unsetHeader' : function(key){
			if(this._headers){
				delete this._headers[key.toLowerCase()];
			}
		},


		'getContentType' : function(){
			return this._headers['content-type'] ? this._headers['content-type'] : OjUrlRequest.TEXT;
		},
		'setContentType' : function(val){
			this._headers['content-type'] = val;
		},

		'setData' : function(val){
			this._data = val;

			if(!this._headers['content-type']){
				this.setContentType(OjUrlRequest.QUERY_STRING);
			}
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