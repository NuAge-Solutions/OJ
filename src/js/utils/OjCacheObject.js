

OJ.extendClass(
    "OjCacheObject", [OjObject],
    {
        "_props_" : {
            "created"    : null,
            "data"       : null,
            "expiration" : null
        },


        "_constructor" : function(/*data, expiration*/){
            this._super(OjObject, "_constructor", []);

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

        "exportData" : function(mode, processed){
            processed = processed || [];

            var self = this,
                obj = self._super(OjObject, "exportData", arguments);

            obj.created    = self.created;
            obj.data       = self.data ? OjObject.exportData(self.data, mode, processed) : null;
            obj.expiration = self.expiration;

            return obj;
        },

        "importData" : function(obj, mode){
            var self = this;

            if(!obj){
                obj = {
                    "created"    : null,
                    "data"       : null,
                    "expiration" : null
                }
            }

            self.created = obj.created;

            self.data = OjObject.importData(obj.data, mode);

            self.expiration = obj.expiration;
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
        }
    }
);