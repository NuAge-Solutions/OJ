

OJ.extendClass(
    "OjCacheObject", [OjObject],
    {
        "_props_" : {
            "created"    : null,
            "data"       : null,
            "expiration" : null,
            "key" : null
        },

        "_get_props_" : {
            "is_expired" : null,
            "is_valid": null
        },


        "_constructor" : function(key, data, expiration){
            this._super(OjObject, "_constructor", []);

            this.key = key;
            this.created = new Date();

            if(data){
                this.data = data;
            }

            if(expiration){
                this.expiration = expiration;
            }
        },

        "exportData" : function(mode, processed){
            const obj = this._super(OjObject, "exportData", [
                mode,
                processed = processed || []
            ]);

            obj.created    = this.created;
            obj.data       = this.data ? OjObject.exportData(this.data, mode, processed) : null;
            obj.expiration = this.expiration;
            obj.key        = this.key;

            return obj;
        },

        "importData" : function(obj, mode){
            if(!obj){
                obj = {
                    "created"    : null,
                    "data"       : null,
                    "expiration" : null,
                    "key"        : null
                }
            }

            this.created = obj.created;
            this.data = OjObject.importData(obj.data, mode);
            this.expiration = obj.expiration;
            this.key = obj.key;
        },


        "=expiration" : function(exp/*date|milliseconds from now*/){
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
        },

        ".is_expired" : function(){
            let exp = this.expiration;

            return exp && exp < new Date();
        },

        ".is_valid" : function(){
            return !this.is_expired;
        }
    }
);