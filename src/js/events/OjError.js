importJs("oj.events.OjTextEvent");


OJ.extendClass(
    "OjError", [OjTextEvent],
    {
        "_get_props_" : {
            "code"    : 0
        },


        '_constructor' : function(type, text, code, bubbles, cancelable){
            var self = this;

            self._super(OjTextEvent, "_constructor", [type, text, bubbles, cancelable]);

            self._code = code;
        },


        "exportData" : function(mode){
            var self = this,
                data = self._super(OjTextEvent, "exportData", arguments);

            data.code = self.code;

            return data;
        },

		"importData" : function(data, mode){
			var self = this;

			if(isSet(data.code)){
				self._code = data.code;
			}

			return self._super(OjTextEvent, "importData", arguments);
		}
    },
    {
        "ERROR" : "onError"
    }
);