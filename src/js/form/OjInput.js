importJs('oj.components.OjComponent');


OJ.extendClass(
    'OjInput', [OjComponent],
    {
        '_props_' : {
            'label' : null,
            'name' : null,
            'placeholder' : null,
            'prefix' : null,
            'required' : false,
            'suffix' : null,
            'title' : null,
            'validators' : null,
            'value' : null
        },

        '_get_props_' : {
            'error' : null,
            'errors' : null
        },

        '_ready' : false, '_template' : 'oj.form.OjInput',


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

                input.addEventListener(OjFocusEvent.IN, this, "_onInputFocusIn");
                input.addEventListener(OjFocusEvent.OUT, this, "_onInputFocusOut");
                input.addEventListener(OjDomEvent.CHANGE, this, "_onInputChange");
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
            // unset placeholder for cleanup purposes
            try {
                this._placeholder.on_change = null;
            }
            catch(e){
                // do nothing
            }

            return this._super(OjComponent, "_destructor", arguments);
        },


        '_formatError' : function(error){
            return  error.format(this._formatErrorTokens());
        },

        '_formatErrorTokens' : function(){
            return {
                'INPUT' : this.title || this.label || this.placeholder || this.name,
                'VALUE' : this.value
            };
        },

        '_redrawDefault' : function(){
            if(!this.dflt || isEmpty(this.placeholder) || !isEmpty(this.value)){
                this.addCss('no-default');
            }
            else{
                this.removeCss('no-default');
            }

            return true;
        },

        '_redrawValue' : function(){
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

        '_onDefaultClick' : function(evt){
            if(this.input){
                this.input.focus();
            }
        },

        '_onInputFocusIn' : function(evt){
            this.addCss('focus');
        },

        '_onInputFocusOut' : function(evt){
            this.removeCss('focus');

            this._onInputChange(evt);
        },

        '_onInputChange' : function(evt){
            this.value = this.input.dom.value;
        },

        '_onPress' : function(evt){
            if(this.input && !this.input.hasFocus()){
                this.focus();
            }
        },


        'blur' : function(){
            if(this.input){
                this.input.blur();
            }
        },

        'focus' : function(){
            if(this.input){
                this.input.focus();
            }
        },

        'isValid' : function(){
            const val = this.value;

            this._errors = [];

            if(this._required && isEmpty(val)){
                this._errors.append(this._formatError(OjInput.REQUIRED_ERROR));

                return false;
            }

            return true;
        },

        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){
                this._redrawDefault();

                return true;
            }

            return false;
        },

        'validate' : function(){
            if(this.isValid()){
                this.removeCss(['error']);

                return true;
            }

            this.addCss(['error']);

            return false;
        },


        '=placeholder' : function(val){
            if(this._placeholder == val){
                return;
            }

            const input = this.input,
                placeholder = this._placeholder;

            // cleanup on change
            if(isObjective(placeholder, OjTextElement)){
                placeholder.on_change = null;
            }

            this._placeholder = val;

            if(this.dflt){
                if(val){
                    this.dflt.addEventListener(OjUiEvent.PRESS, this, '_onDefaultClick');
                }
                else{
                    this.dflt.removeEventListener(OjUiEvent.PRESS, this, '_onDefaultClick');
                }

                this.dflt.text = val;

                this._redrawDefault();
            }
            else if(input){
                input.attr("placeholder", String.string(val));

                // set on change so we get updates if/when it changes
                if(isObjective(val, OjTextElement)){
                    val.on_change = function(txt){
                        input.attr("placeholder", String.string(txt));
                    };
                }
            }
        },

        '.error' : function(){
            return this.errors.first;
        },

        '.errors' : function(){
            var errors = this._errors;

            return errors ? errors.clone() : [];
        },

        '.form' : function(){
            if(!this._form){
                var p = this.parentComponent;

                while(p && p != OJ){
                    if(p.is(OjForm)){
                        this._form = p;

                        break;
                    }

                    p = p.parentComponent;
                }
            }

            return this._form;
        },

        "=is_disabled" : function(val){
            this._super(OjComponent, "=is_disabled", arguments);

            this.input.attr("disabled", this._is_disabled ? "1" : null);
        },

        '=label' : function(lbl){
            this.lbl.text = this._label = lbl;

            if(isEmpty(lbl)){
                this.addCss('no-label');
            }
            else{
                this.removeCss('no-label');
            }
        },

        '=name' : function(nm){
            if(this._name == nm){
                return;
            }

            if(this._name){
                this.removeCss(this._name.toLowerCase() + '-input');
            }

            if(this._name = nm){
                this.addCss(nm.toLowerCase() + '-input');
            }

            const input = this.input;

            if(input){
                this.input.attr("name", this._name);
            }
        },

        '.notes' : function(){
            return this.notes ? this.notes.text : null;
        },
        '=notes' : function(val){
            if(!val){
                this._unset('notes_lbl');

                return;
            }

            if(!this.notes_lbl){
                this.notes_lbl = new OjLabel();
                this.notes_lbl.css = 'notes';

                this.psuedoInput.appendChild(this.notes_lbl);
            }

            this.notes_lbl.text = val;
        },

        '=prefix' : function(prefix){
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

        '=suffix' : function(suffix){
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

        '=validators' : function(validators){
            this._validators = Array.array(validators);
        },

        ".value" : function(){
            if(isEmpty(this._value)){
                this._onInputChange(null);
            }

            return this._value;
        },

        '=value' : function(value){
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
        'REQUIRED_ERROR' : '{INPUT} is required.',


        'supportsInputType' : function(type){
            var i = document.createElement('input');
            i.setAttribute('type', type);

            return i.type == type;
        },

        'triggerKeyboardShow' : function(target){
            clearTimeout(this._keyboard_timeout);

            target.dispatchEvent(new OjKeyboardEvent(OjKeyboardEvent.SHOW, true));
        },

        'triggerKeyboardHide' : function(target){
            var self = this;

            self._keyboard_target = target;

            if(self._keyboard_timeout){
                return;
            }

            self._keyboard_timeout = setTimeout(function(){
                self._keyboard_target.dispatchEvent(new OjKeyboardEvent(OjKeyboardEvent.HIDE, true));

                self._keyboard_timeout = null;
                self._keyboard_target = null;
            }, 10);
        }
    }
);