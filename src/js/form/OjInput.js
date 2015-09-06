OJ.importJs('oj.components.OjComponent');

OJ.importCss('oj.form.OjInput');


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


        '_constructor' : function(/*name, label, value, validators*/){
            this._super(OjComponent, '_constructor', []);

            this._errors = [];
            this._validators = [];

            // detect default mode
            var has_input = 'input' in this;

            if(has_input && !isUndefined(this.input.dom.placeholder)){
                this._unset('dflt');
            }

            this._processArguments(arguments, {
                'name' : null,
                'label' : null,
                'value' : null,
                'validators' : []
            });

            if(has_input){
                if(!this._value){
                    this.value = this.input.dom.value;
                }

                this.input.addEventListener(OjFocusEvent.IN, this, '_onInputFocusIn');
                this.input.addEventListener(OjFocusEvent.OUT, this, '_onInputFocusOut');
                this.input.addEventListener(OjDomEvent.CHANGE, this, '_onInputChange');
            }

            if(this.oj_class_name == 'OjInput'){
                this.hide();
            }
            else{
                var ln = this._supers.length,
                    cls;

                for(; ln--;){
                    cls = this._supers[ln];

                    this.addCss(OJ.classToString(cls));

                    if(cls == OjInput){
                        break;
                    }
                }
            }

            this.addEventListener(OjUiEvent.PRESS, this, '_onClick');

            this._ready = true;
        },


        '_formatError' : function(error){
            return  OJ.tokensReplace(error, this._formatErrorTokens());
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
            if(this.input){
                var dom = this.input.dom,
                    val = this._value;

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
        },

        '_onInputChange' : function(evt){
            this.value = this.input.dom.value;
        },

        '_onClick' : function(evt){
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
            this._errors = [];

            if(this._required && isEmpty(this._value)){
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
            else if(this.input){
                this.input.setAttr('placeholder', val);
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

        '=label' : function(lbl){
            this.lbl.text = this._label = lbl;

            if(isEmpty(this._label)){
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

        '.value' : function(){
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

            return true;
        }
    },
    {
        'REQUIRED_ERROR' : '[%INPUT] is required.',


        'supportsInputType' : function(type){
            var i = document.createElement('input');
            i.setAttribute('type', type);

            return i.type == type;
        }
    }
);