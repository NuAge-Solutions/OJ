importJs("oj.views.OjView");


OJ.extendComponent(
    "OjForm", [OjView], 
    {
        "_props_" : {
            "cancel_icon" : null,
            "cancel_label" : "Cancel",
            "data" : null,
            "dismiss_on_submit": true,
            "on_submit" : null,
            "reset_icon": null,
            "reset_label" : "Reset",
            "submit_icon" : null,
            "submit_label" : "Submit"
        },

        "_get_props_" : {
            "errors" : null,
            "inputs" : null,
            "is_valid" : null
        },

        "_constructor" : function(){
           this._super(OjView, "_constructor", arguments);

           (this._action_view = new OjButton(this.submit_label, this.submit_icon)).addEventListener(OjUiEvent.PRESS, this, "_onSubmitClick");

           this.addEventListener(OjKeyboardEvent.UP, this, "_onKeyPress");
        },

        "_destructor" : function(){
            this.removeEventListener(OjKeyboardEvent.UP, this, "_onKeyPress");

            return this._super(OjView, "_destructor", arguments);
        },


        "_showFormError" : function(){
            let msg = "";

            this._errors.forEachReverse((item) => {
                msg = "\n" + item.error + msg;
            });

            WindowManager.alert(
                "Please fix the following issues and re-submit:<span style='font-weight: bold;'>" + msg + "</span>\nThank you.",
                "Form Error"
            );
        },
        
        "_submit" : function(){
            const controller = this.controller;

            if(controller && this.dismiss_on_submit){
                controller.removeView(this);
            }

            this.dispatchEvent(new OjEvent(OjEvent.SUBMIT, false, false));
        },

        "_onKeyPress" : function(evt){
            if(evt.key_code == 13){
                const active = OjElement.parentComponent(document.activeElement);

                if(active && isObjective(active, OjInput) && active.submit_on_enter){
                    this._onSubmitClick(evt);
                }
            }
        },

        "_onSubmitClick" : function(evt){
            const self = this;

            OjTimer.delay(() => { self.submit(); }, 100);  // this gives the input enough time to blur
        },

        "blur" : function(){
            var self = this,
                rtrn = self._super(OjView, "blur", arguments),
                inputs = self.inputs,
                key;

            for(key in inputs){
                inputs[key].blur();
            }

            return rtrn;
        },

        "focus" : function(){
            var self = this,
                rtrn = self._super(OjView, "focus", arguments),
                inputs = self.inputs,
                key = Object.keys(inputs).first;

            if(key){
                inputs[key].focus();
            }

            return rtrn;
        },

        "reset" : function(){
            var inputs = this.inputs,
                nm;

            for(nm in inputs){
                inputs[nm].value = null;
            }
        },

        "submit" : function(){
            const on_submit = this.on_submit;

            if(on_submit && on_submit(this) === false){
                return;
            }

            if(this.validate()){
                this._submit()
            }
        },

        "validate" : function(){
            let is_valid = this.is_valid;

            if(is_valid){
               return true;
            }

            this._showFormError();

            return false;
        },

        ".data" : function(){
            var data = this.inputs,
                nm;

            for(nm in data){
                data[nm] = data[nm].value;
            }

            return data;
        },

        "=data" : function(data){
            var inputs = this.inputs,
                key, input;

            for(key in data){
                if(input = inputs[key]){
                    input.value = data[key];
                }
            }
        },

        ".errors" : function(){
            const errors = this._errors;

            return errors ? errors.clone() : [];
        },

        ".inputs" : function(){
            var inputs = this.dom.getElementsByClassName("OjInput"),
                ln = inputs.length,
                rtrn = {},
                item;

            for(; ln--;){
                item = OjElement.element(inputs[ln]);

                // todo: OjForm - add checking for compound inputs
                rtrn[item.name] = item;
            }

            return rtrn;
        },

        ".is_valid" : function(){
            var self = this,
                inputs = self.inputs,
                errors = self._errors = [],
                nm, input;

            for(nm in inputs){
                input = inputs[nm];

                if(!input.validate()){
                    errors.append({
                        "input" : input,
                        "error" : input.error
                    });
                }
            }

            return !errors.length;
        },

        "=submit_label" : function(val){
            if(this._submit_label == val){
                return;
            }

            this._submit_label = val;

            if(this._action_view){
                this._action_view.label = val;
            }
        }
    },
    {
        "_TAGS" : ["form"]
    }
);