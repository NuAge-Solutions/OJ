importJs("oj.components.OjButton");
importJs("oj.form.OjInput");


OJ.extendComponent(
    "OjSwitch", [OjInput],
    {
        "_props_" : {

        },


        "_onPress" : function(evt){
            this._super(OjInput, "_onPress", arguments);

            this.value = !this._value;
        },

        "_redrawValue" : function(){
            this._super(OjInput, "_redrawValue", arguments);

            if(this._value){
                this.addCss("on");
                this.removeCss("off");
            }
            else{
                this.addCss("off");
                this.removeCss("on");
            }
        },

        "=value" : function(value){
            value = isTrue(value);

            return this._super(OjInput, "=value", [value]);
        }
    },
    {
        "_TAGS" : ["switch"],
        "_TEMPLATE" : "oj.form.OjSwitch"
    }
);