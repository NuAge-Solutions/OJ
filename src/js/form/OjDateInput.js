importJs("oj.form.OjTextInput");


OJ.extendComponent(
    "OjDateInput", [OjTextInput],
    {
        "_get_props_" : {
            "type" : "date"
        },

        // todo: add min and max date support

        "_onFocusIn" : function(evt){
            this._super(OjTextInput, "_onFocusIn", arguments);

            //showCalendarControl(this.dom);

        },

        "select" : function(){
            if(OJ.is_mobile){
                return;
            }

            this._super(OjTextInput, "select", arguments);
        },

        ".value" : function(){
            var val = this._value;

            if(isEmpty(val)){
                return null;
            }

            return moment(val).toDate();
        },

        "=value" : function(val){
            val = moment(val);

            return this._super(OjTextInput, "=value", [val.isValid() ? moment(val).format("YYYY-MM-DD") : null]);
        }
    },
    {
        "_TAGS" : ["date-input"]
    }
);


OJ.extendComponent(
    "OjTimeInput", [OjTextInput],
    {
        "_get_props_" : {
            "type" : "time"
        },

        "select" : function(){
            if(OJ.is_mobile){
                return;
            }

            this._super(OjTextInput, "select", arguments);
        },

        "=value" : function(val){
            if(isNumber(val)){
                val = String(val).split(".");

                while(val < 2){
                    val.append(0);
                }

                val = val[0] + ":" + Math.round(val[1] / 60);
            }

            return this._super(OjTextInput, "=value", [val]);
        }
    },
    {
        "_TAGS" : ["time-input"]
    }
);