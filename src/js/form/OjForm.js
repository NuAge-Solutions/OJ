importJs('oj.views.OjView');


OJ.extendComponent(
    'OjForm', [OjView], 
    {
        '_props_' : {
            'cancelLabel' : 'Cancel',
            'data' : null,
            'resetLabel' : 'Reset',
            'submit_label' : 'Submit'
        },

        '_get_props_' : {
            'errors' : null,
            'inputs' : null,
            'is_valid' : null
        },

        "_constructor" : function(){
            var self = this;

            self._super(OjView, "_constructor", arguments);

            (self._action_view = new OjButton(self._submit_label)).addEventListener(OjUiEvent.PRESS, self, "_onSubmitClick");
        },


        '_showFormError' : function(){
            var self = this,
                msg = '';

            self._errors.forEachReverse(function(item){
                msg = '\n' + item.error + msg;
            });

            WindowManager.alert(
                'Please fix the following issues and re-submit:<span style="font-weight: bold;">' + msg + '</span>\nThank you.',
                'Form Error'
            );
        },

        '_onSubmitClick' : function(evt){
            var self = this,
                controller = self.controller;

            if(self.submit() && controller){
                controller.removeView(self);
            }
        },

        'blur' : function(){
            var self = this,
                rtrn = self._super(OjView, 'blur', arguments),
                inputs = self.inputs,
                key;

            for(key in inputs){
                inputs[key].blur();
            }

            return rtrn;
        },

        'focus' : function(){
            var self = this,
                rtrn = self._super(OjView, 'focus', arguments),
                inputs = self.inputs,
                key = Object.keys(inputs).first;

            if(key){
                inputs[key].focus();
            }

            return rtrn;
        },

        'reset' : function(){
            var inputs = this.inputs,
                nm;

            for(nm in inputs){
                inputs[nm].value = null;
            }
        },

        'submit' : function(){
            var self = this,
                evt = OjEvent;

            if(self.validate()){
                // todo: OjForm - add submit code logic/functionality
                self.dispatchEvent(new evt(evt.SUBMIT, false, false));

                return true;
            }

            return false;
        },

        'validate' : function(){
            var self = this,
                is_valid = self.is_valid,
                msg = '';

            if(is_valid){
               return true;
            }

            this._showFormError();

            return false;
        },

        '.data' : function(){
            var data = this.inputs,
                nm;

            for(nm in data){
                data[nm] = data[nm].value;
            }

            return data;
        },

        '=data' : function(data){
            var inputs = this.inputs,
                key, input;

            for(key in data){
                if(input = inputs[key]){
                    input.value = data[key];
                }
            }
        },

        '.errors' : function(){
            var errors = this._errors;

            return errors ? errors.clone() : [];
        },

        '.inputs' : function(){
            var inputs = this.dom.getElementsByClassName('OjInput'),
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

        '.is_valid' : function(){
            var self = this,
                inputs = self.inputs,
                errors = self._errors = [],
                nm, input;

            for(nm in inputs){
                input = inputs[nm];

                if(!input.validate()){
                    errors.append({
                        'input' : input,
                        'error' : input.error
                    });
                }
            }

            return !errors.length;
        },

        '=submit_label' : function(val){
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
        '_TAGS' : ['form']
    }
);