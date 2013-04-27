'use strict';

OJ.extendClass(
	OjObject, 'OjCacheObject',
	{
		'_props_' : {
			'created'    : null,
			'data'       : null,
			'expiration' : null
		},

		'_class_path' : 'oj.utils.CacheObject',


		'_constructor' : function(/*data, expiration*/){
			this._super('OjCacheObject', '_constructor', []);

			this.setCreated(new Date());

			var ln = arguments.length;

			if(ln){
				this.setData(arguments[0]);

				if(ln > 1){
					this.setExpiration(arguments[1]);
				}
			}
		},

		'exportData' : function(){
			var obj = this._super('OjCacheObject', 'exportData', arguments);

			obj.created    = this._created;
			obj.data       = this._data ? OjObject.exportData(this._data) : null;
			obj.expiration = this._expiration;

			return obj;
		},

		'importData' : function(obj){
			if(!obj){
				obj = {
					'created'    : null,
					'data'       : null,
					'expiration' : null
				}
			}

			this._created = obj.created;

			this._data = OjObject.importData(obj.data);

			this._expiration = obj.expiration;
		},


		'setExpiration' : function(exp/*date|milliseconds from now*/){
			if(this._expiration == exp){
				return;
			}

			if(!isDate(exp)){
				this._expiration = new Date();
				this._expiration.setSeconds(this._expiration.getSeconds() + exp);
			}
			else{
				this._expiration = exp;
			}
		}
	}
);