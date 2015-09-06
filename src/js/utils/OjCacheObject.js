

OJ.extendClass(
	'OjCacheObject', [OjObject],
	{
		'_props_' : {
			'created'    : null,
			'data'       : null,
			'expiration' : null
		},


		'_constructor' : function(/*data, expiration*/){
			this._super(OjObject, '_constructor', []);

			this.created = new Date();

			var args = arguments,
				ln = args.length;

			if(ln){
				this.data = args[0];

				if(ln > 1){
					this.expiration = args[1];
				}
			}
		},

		'exportData' : function(){
			var obj = this._super(OjObject, 'exportData', arguments);

			obj.created    = this.created;
			obj.data       = this.data ? OjObject.exportData(this.data) : null;
			obj.expiration = this.expiration;

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

			this.created = obj.created;

			this.data = OjObject.importData(obj.data);

			this.expiration = obj.expiration;
		},


		'=expiration' : function(exp/*date|milliseconds from now*/){
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