importJs("oj.form.OjInput");


OJ.extendComponent(
    "OjTextArea", [OjInput],
    {
        "_props_" : {
            "min_length" : 0,
            "max_length" : 0
        },

        "_setDom" : function(dom_elm){
            var self = this;
            
            self._super(OjInput, "_setDom", arguments);

            var prnt = self.input.parent,
                new_input = new OjStyleElement(OjElement.elm("textarea"));

            new_input.addCss("input");

            prnt.replaceChild(self.input, new_input);

            self.input = new_input;

            self.psuedoInput.attr("flex-v", "");
            self.wrapper.attr("flex-v", "");
        }
    },
    {
        "_TAGS" : ["textarea", "text-area"]
    }
);