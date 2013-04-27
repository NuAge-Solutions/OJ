OJ.importJs('oj.net.UrlLoader');

'use strict';

OJ.extendClass(
	OjUrlLoader, 'OjRpc',
	{
		'_props_' : {
			'method' : null,
			'params' : null
		},

		'_get_props_' : {
			'id' : null
		},


		'_constructor' : function(url, method, params/*, content_type, async*/){
			this._super('OjRpc', '_constructor', []);

			var ln = arguments.length;

			this.setContentType(ln > 3 ? arguments[3] : OjRpc.JSON);

			this.setRequest(
				new OjUrlRequest(
					url,
					{
						'id'        : this._id = OjRpc.guid(),
						'method'    : method,
						'params'    : params
					},
					this._contentType,
					OjUrlRequest.POST
				)
			);

			if(ln > 4){
				this.setAsync(arguments[4]);
			}
		},

		'load' : function(){
			return this._super('OjRpc', 'load', []);
		},


		'getRequest' : function(){
			// todo: add clone request for getRequest() func
			return this._request;
		},

		'setMethod' : function(val){
			if(this._method == val){
				return;
			}

			this._request.getData().method = (this._method = val);
		},

		'setParams' : function(val){
			if(this._params == val){
				return;
			}

			this._request.getData().params = (this._params = val);
		}
	},
	{
		'guid' : function(){
			return OJ._guid++;
		}
	}
);