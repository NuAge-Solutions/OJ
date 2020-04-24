importJs("oj.form.OjInput");


OJ.extendComponent(
    "OjTextInput", [OjInput],
    {
        "_props_" : {
            "min_length" : 0,
            "max_length" : 255,
            "select_on_focus" : false,
            "submit_on_enter" : true
        },

        "_get_props_" : {
            "type" : "text"
        },


        "_constructor" : function(/*name, label, value, validators*/){
            this._super(OjInput, "_constructor", arguments);

            this.input.addEventListener(OjKeyboardEvent.UP, this, "_onInputChange");
        },


        "_setDom" : function(dom_elm){
            this._super(OjInput, "_setDom", arguments);

            this.input.attr("type", this._type);
        },

        "_formatErrorTokens" : function(){
            const tokens = this._super(OjInput, "_formatErrorTokens", arguments);
            tokens.MAX = this.max_length;
            tokens.MIN = this.min_length;

            return tokens;
        },


        "_onInputFocusIn" : function(evt){
            const self = this;

            self._super(OjInput, "_onInputFocusIn", arguments);

            if(OJ.is_mobile){
                self._static.triggerKeyboardShow(self);
            }

            if(self.select_on_focus){
                OjTimer.delay(
                    () => {
                        self.select();
                    },
                    OJ.is_mobile ? 250 : 0
                );
            }
        },

        "_onInputFocusOut" : function(evt){
            this._super(OjInput, "_onInputFocusOut", arguments);

            if(OJ.is_mobile){
                this._static.triggerKeyboardHide(this);
            }
        },

        "select" : function(start, end){
            const input = this.input.dom,
                type = input.type;

            input.type = "text";
            input.setSelectionRange(start || 0, end || 9999999);
            input.type = type;
        },


        ".is_valid" : function(){
            var self = this,
                valid = self._super(OjInput, ".is_valid", arguments),
                value = self.value,
                ln = value ? value.length : 0;

            if(self.min_length && ln < self.min_length){
                self._errors.append(self._formatError(OjTextInput.MIN_LENGTH_ERROR));

                valid = false;
            }

            if(self.max_length && ln > self.max_length){
                self._errors.append(self._formatError(OjTextInput.MAX_LENGTH_ERROR));

                valid = false;
            }

            return valid;
        },

        "=max_length" : function(val){
            var self = this;

            if(self._max_length == val){
                return;
            }

            self.input.attr("maxlength", self._max_length = val);
        },

        "=value" : function(value){
            var self = this;

            if(isSet(value)){
                value = String.string(value);

                if(value.length > self.max_length){
                    value = value.slice(0, self.max_length);
                }
            }

            return self._super(OjInput, "=value", [value]);
        }
    },
    {
        "EMAIL" : "email",
        "TEXT" : "text",
        "NUMBER" : "number",
        "SECURE" : "password",

        "MIN_LENGTH_ERROR" : "{INPUT} must be at least {MIN} characters.",
        "MAX_LENGTH_ERROR" : "{INPUT} must be no more than {MAX} characters.",

        "_TAGS" : ["text-input"]
    }
);


OJ.extendComponent(
    "OjEmailInput", [OjTextInput],
    {
        "_props_" : {
            "max_length" : 254,
            "min_length" : 3
        },

        "_type" : OjTextInput.EMAIL,


        ".is_valid" : function(){
            var self = this,
                valid = self._super(OjTextInput, ".is_valid", arguments),
                value = self.value;

            if(!isEmpty(value) && !self._static.isValidEmail(value)){
                self._errors.append(self._formatError(OjEmailInput.INVALID_ERROR));

                valid = false;
            }

            return valid;
        },

        "=max_length" : function(val){
            throw new Error("Cannot set the max length of an email. This is a fixed value.");
        },

        "=min_length" : function(val){
            throw new Error("Cannot set the min length of an email. This is a fixed value.");
        }
    },
    {
        "INVALID_ERROR" : "{INPUT} requires a valid email address.",

        "SUPPORTS_EMAIL_TYPE" : OjInput.supportsInputType("email"),

        "isValidEmail" : function(val){
            return /.+@.+(\..+)*/.test(val)
        },

        "_TAGS" : ["email-input"]
    }
);


OJ.extendComponent(
    "OjNumberInput", [OjTextInput],
    {
        "_type" : OjTextInput.NUMBER,

        "_props_" : {
            "enforce_bounds": true,
            "max" : null,
            "min" : null
        },


        "_formatErrorTokens" : function(){
            var self = this,
                tokens = self._super(OjTextInput, "_formatErrorTokens", arguments);

            tokens.MAX = self.max;
            tokens.MIN = self.min;

            return tokens;
        },

        "_onInputChange" : function(){
            const value = this.input.dom.value;

            this.value = value;

            const new_value = this.value;

            if(new_value != value){
                this.input.dom.value = new_value;
            }
        },


        ".is_valid" : function(){
            var self = this,
                cls = self._static,
                valid = self._super(OjTextInput, ".is_valid", arguments),
                errors = self._errors,
                val = self.value;
            
            if(isSet(self.min) && val < self.min){
                errors.append(self._formatError(cls.MIN_ERROR));

                valid = false;
            }

            if(isSet(self.max) && val > self.max){
                errors.append(self._formatError(cls.MAX_ERROR));

                valid = false;
            }

            return valid;
        },


        ".value" : function(){
            const val = this._value;

            if(isEmpty(val)){
                return null;
            }

            return parseFloat(val);
        },
        "=value" : function(val){
            // check for change
            if(this._value == val){
                return;
            }

            if(this.enforce_bounds){
                const min = this.min,
                    max = this.max;

                if(isEmpty(val)){
                    val = this.required ? min : null;
                }
                else{
                    val = parseFloat(val);

                    if(isNaN(val)){
                        val = min;
                    }
                    else if(isSet(min)){
                        val = Math.max(val, min);
                    }

                    if(isSet(max)){
                        val = Math.min(val, max);
                    }
                }
            }

            this._super(OjTextInput, "=value", [val]);
        },


        "=max" : function(val){
            var self = this;

            self._max = val;

            self.input.attr("max", val);
        },

        "=min" : function(val){
            var self = this;

            self._min = val;

            self.input.attr("min", val);
        }
    },
    {
        "MIN_ERROR" : "{INPUT} minimum value is {MIN}.",
        "MAX_ERROR" : "{INPUT} maxiumum value is {MAX}.",

        "_TAGS" : ["num-input", "number-input"]
    }
);


OJ.extendComponent(
    "OjSecureInput", [OjTextInput],
    {
        "_min_length" : 6,  "_max_length" : 30,

        "_type" : OjTextInput.SECURE
    },
    {
        "_TAGS" : ["secure-input"]
    }
);