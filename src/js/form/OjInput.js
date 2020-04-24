importJs("oj.components.OjComponent");


OJ.extendClass(
    "OjInput", [OjComponent],
    {
        "_props_" : {
            "label" : null,
            "name" : null,
            "placeholder" : null,
            "prefix" : null,
            "required" : false,
            "submit_on_enter" : false,
            "suffix" : null,
            "title" : null,
            "validators" : null,
            "value" : null
        },

        "_get_props_" : {
            "error" : null,
            "errors" : null,
            "is_valid": null
        },

        "_ready" : false, "_template" : "oj.form.OjInput",


        "_constructor" : function(name, label, value, validators){
            this._super(OjComponent, "_constructor", []);

            this._errors = [];
            this._validators = [];

            // detect default mode
            const input = this.input;

            if(input && !isUndefined(input.dom.placeholder)){
                this._unset("dflt");
            }

            this._set("name", name, this.oj_id);
            this._set("label", label);
            this._set("value", value);
            this._set("validators", validators, []);

            if(input){
                if(!this._value){
                    this.value = input.dom.value;
                }

                this._addInputListeners(input);
            }

            if(this.oj_class_name == "OjInput"){
                this.hide();
            }
            else{
                let ln = this._supers.length,
                    cls;

                for(; ln--;){
                    cls = this._supers[ln];

                    this.addCss(OJ.classToString(cls));

                    if(cls == OjInput){
                        break;
                    }
                }
            }

            this.addEventListener(OjUiEvent.PRESS, this, "_onPress");

            this._ready = true;
        },

        "_destructor" : function(){
            this._removeInputListeners(this.input);

            this._updatePlaceholder(this.input, "_placeholder", null, this.dflt);

            return this._super(OjComponent, "_destructor", arguments);
        },


        "_addInputListeners": function(input){
            input.addEventListener(OjFocusEvent.IN, this, "_onInputFocusIn");
            input.addEventListener(OjFocusEvent.OUT, this, "_onInputFocusOut");
            input.addEventListener(OjDomEvent.CHANGE, this, "_onInputChange");
        },

        "_removeInputListeners": function(input){
            input.removeEventListener(OjFocusEvent.IN, this, "_onInputFocusIn");
            input.removeEventListener(OjFocusEvent.OUT, this, "_onInputFocusOut");
            input.removeEventListener(OjDomEvent.CHANGE, this, "_onInputChange");
        },

        "_formatError" : function(error){
            return  error.format(this._formatErrorTokens());
        },

        "_formatErrorTokens" : function(){
            return {
                "INPUT" : this.title || this.label || this.placeholder || this.name,
                "VALUE" : this.value
            };
        },

        "_redrawDefault" : function(){
            if(!this.dflt || isEmpty(this.placeholder) || !isEmpty(this.value)){
                this.addCss("no-default");
            }
            else{
                this.removeCss("no-default");
            }

            return true;
        },

        "_redrawValue" : function(){
            var self = this,
                input = self.input;

            if(input){
                var dom = input.dom,
                    val = self._value;

                if(dom.value != val){
                    dom.value = String.string(val);
                }
            }
        },

        "_updatePlaceholder" : function(input, key, val, dflt){
	        const placeholder = this[key];

            if(placeholder == val){
                return;
            }

            // cleanup on change
            if(isObjective(placeholder, OjTextElement)){
                placeholder.on_change = null;
            }

            this[key] = val;

            if(dflt){
                const press_evt = OjUiEvent.PRESS;

                if(val){
                    dflt.addEventListener(press_evt, this, "_onDefaultClick");
                }
                else{
                    dflt.removeEventListener(press_evt, this, "_onDefaultClick");
                }

                dflt.text = val;

                this._redrawDefault();
            }
            else if(input){
                input.attr("placeholder", String.string(val));

                // set on change so we get updates if/when it changes
                if(isObjective(val, OjTextElement)){
                    val.on_change = (txt) => {
                        input.attr("placeholder", String.string(txt));
                    };
                }
            }
        },

        "_onDefaultClick" : function(evt){
            if(this.input){
                this.input.focus();
            }
        },

        "_onInputFocusIn" : function(evt){
            this.addCss("focus");
        },

        "_onInputFocusOut" : function(evt){
            this.removeCss("focus");

            this._onInputChange(evt);
        },

        "_onInputChange" : function(evt){
            this.value = this.input.dom.value;
        },

        "_onPress" : function(evt){
            if(this.input && !this.input.has_focus){
                this.focus();
            }
        },


        "blur" : function(){
            if(this.input){
                this.input.blur();
            }
        },

        "focus" : function(){
            if(this.input){
                this.input.focus();
            }
        },

        "redraw" : function(){
            if(this._super(OjComponent, "redraw", arguments)){
                this._redrawDefault();

                return true;
            }

            return false;
        },

        "validate" : function(){
            if(this.is_valid){
                this.removeCss(["error"]);

                return true;
            }

            this.addCss(["error"]);

            return false;
        },


        ".is_valid" : function(){
            const val = this.value,
                errors = [];

            this._errors = errors;

            if(this._required && isEmpty(val)){
                errors.append(this._formatError(OjInput.REQUIRED_ERROR));

                return false;
            }

            const self = this,
                validators = this.validators;

            if(validators && validators.length){
                let is_valid = true;

                validators.forEach((validator) => {
                    const result = validator(val, self);

                    if(result === true){
                        return;
                    }

                    errors.append(self._formatError(result));

                    return is_valid = false;
                });

                return is_valid;
            }

            return true;
        },

        "=placeholder" : function(val){
            this._updatePlaceholder(this.input, "_placeholder", val, this.dflt);
        },

        ".error" : function(){
            return this.errors.first;
        },

        ".errors" : function(){
            var errors = this._errors;

            return errors ? errors.clone() : [];
        },

        ".form" : function(){
            if(!this._form){
                var p = this.parent_component;

                while(p && p != OJ){
                    if(p.is(OjForm)){
                        this._form = p;

                        break;
                    }

                    p = p.parent_component;
                }
            }

            return this._form;
        },

        ".has_focus" : function(){
            return this.hasCss("focus");
        },

        "=is_disabled" : function(val){
            this._super(OjComponent, "=is_disabled", arguments);

            this.input.attr("disabled", this._is_disabled ? "1" : null);
        },

        "=label" : function(lbl){
            this.lbl.text = this._label = lbl;

            if(isEmpty(lbl)){
                this.addCss("no-label");
            }
            else{
                this.removeCss("no-label");
            }
        },

        "=name" : function(nm){
            if(this._name == nm){
                return;
            }

            if(this._name){
                this.removeCss(this._name.toLowerCase() + "-input");
            }

            if(this._name = nm){
                this.addCss(nm.toLowerCase() + "-input");
            }

            const input = this.input;

            if(input){
                this.input.attr("name", this._name);
            }
        },

        ".notes" : function(){
            return this.notes ? this.notes.text : null;
        },
        "=notes" : function(val){
            if(!val){
                this._unset("notes_lbl");

                return;
            }

            if(!this.notes_lbl){
                this.notes_lbl = new OjLabel();
                this.notes_lbl.css = "notes";

                this.psuedoInput.appendChild(this.notes_lbl);
            }

            this.notes_lbl.text = val;
        },

        "=prefix" : function(prefix){
            if(isString(prefix)){
                this.prefix_lbl.text = this._prefix = prefix;
            }
            else{
                if(this._prefix){
                    if(isString(this._prefix)){
                        this.prefix_lbl.removeAllChildren();
                    }
                    else{
                        this.prefix_lbl.removeChild(this._prefix);
                    }
                }

                this.prefix_lbl.appendChild(this._prefix = prefix);
            }
        },

        "=suffix" : function(suffix){
            if(isString(suffix)){
                this.suffix_lbl.text = this._suffix = suffix;
            }
            else{
                if(this._suffix){
                    if(isString(this._suffix)){
                        this.suffix_lbl.removeAllChildren();
                    }
                    else{
                        this.suffix_lbl.removeChild(this._suffix);
                    }
                }

                if(this._suffix = suffix){
                    this.suffix_lbl.appendChild(suffix);
                }
            }
        },

        "=validators" : function(validators){
            this._validators = Array.array(validators);
        },

        ".value" : function(){
            if(isEmpty(this._value)){
                this._onInputChange(null);
            }

            return this._value;
        },

        "=value" : function(value){
            if(value == this._value){
                return;
            }

            this._value = value;

            this._redrawValue();

            this._redrawDefault();

            if(this._ready){
                this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
            }
        }
    },
    {
        "REQUIRED_ERROR" : "{INPUT} is required.",


        "supportsInputType" : function(type){
            var i = document.createElement("input");
            i.setAttribute("type", type);

            return i.type == type;
        },

        "triggerKeyboardShow" : function(target){
            clearTimeout(this._keyboard_timeout);

            target.dispatchEvent(new OjKeyboardEvent(OjKeyboardEvent.SHOW, null, null, true));
        },

        "triggerKeyboardHide" : function(target){
            var self = this;

            self._keyboard_target = target;

            if(self._keyboard_timeout){
                return;
            }

            self._keyboard_timeout = setTimeout(function(){
                self._keyboard_target.dispatchEvent(new OjKeyboardEvent(OjKeyboardEvent.HIDE, null, null, true));

                self._keyboard_timeout = null;
                self._keyboard_target = null;
            }, 10);
        }
    }
);
