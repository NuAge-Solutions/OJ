importJs("oj.events.OjEvent");


OJ.extendClass(
    "OjTextEvent", [OjEvent],
    {
        "_get_props_" : {
            "text" : ""
        },


        '_constructor' : function(type, text, bubbles, cancelable){
            var self = this;

            self._super(OjEvent, "_constructor", [type, bubbles, cancelable]);

            if(isSet(text)){
                self._text = text;
            }
        },

        "exportData" : function(mode){
            var self = this,
                data = self._super(OjEvent, "exportData", arguments);

            data.text = self.text;

            return data;
        },

		"importData" : function(data, mode){
			const self = this;

			if(isSet(data.text)){
				self._text = data.text;
			}

			return self._super(OjEvent, "importData", arguments);
		}
    },
    {
        "TEXT" : "onText"
    }
);