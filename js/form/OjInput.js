OJ.importJs('oj.components.OjComponent');

OJ.importCss('oj.form.OjInput');


'use strict';

OJ.extendClass(
	'OjInput', [OjComponent],
	{
		'_props_' : {
			'default'    : null,
			'name'       : null,
			'prefix'     : null,
			'required'   : false,
			'suffix'     : null,
			'title'      : null,
			'validators' : null,
			'value'      : null
		},

		'_get_props_' : {
			'error' : null
		},

		'_ready' : false,  '_template' : 'oj.form.OjInput',


		'_constructor' : function(/*name, label, value, validators*/){
			this._super(OjComponent, '_constructor', []);

			this._errors = [];
			this._validators = [];

			// detect default mode
			if(!isUndefined(this.input.dom().placeholder)){
				this._unset('dflt');
			}

      this._processArguments(arguments, {
        'setName' : null,
        'setLabel' : null,
        'setValue' : null,
        'setValidators' : []
      });

			if(this.input){
				if(!this._value){
					this.setValue(this.input._dom.value);
				}

				this.input.addEventListener(OjFocusEvent.IN, this, '_onFocusIn');
				this.input.addEventListener(OjFocusEvent.OUT, this, '_onFocusOut');
				this.input.addEventListener(OjDomEvent.CHANGE, this, '_onChange');
			}

			if(this.className() == 'OjInput'){
				this.hide();
			}
			else{
				var ln = this._class_names.length;

				for(; ln--;){
					this.addCss(this._class_names[ln]);

					if(this._class_names[ln] == 'OjInput'){
						break;
					}
				}
			}

			this.addEventListener(OjMouseEvent.CLICK, this, '_onClick');

			this._ready = true;
		},


		'_formatError' : function(error){
			return  OJ.tokensReplace(error, this._formatErrorTokens());
		},

		'_formatErrorTokens' : function(){
			return {
				'INPUT' : this._title || this._label || this._default || this._name,
				'VALUE' : this._value
			};
		},

		'_redrawDefault' : function(){
			if(!this.dflt || isEmpty(this._default) || !isEmpty(this._value)){
				this.addCss(['no-default']);
			}
			else{
				this.removeCss(['no-default']);
			}

			return true;
		},

		'_onDefaultClick' : function(evt){
			this.input.focus();
		},

		'_onFocusIn' : function(evt){
			this.addCss(['focus']);
		},

		'_onFocusOut' : function(evt){
			this.removeCss(['focus']);
		},

		'_onChange' : function(evt){
			this.setValue(this.input._dom.value);
		},

		'_onClick' : function(evt){
			if(!this.input.hasFocus()){
				this.focus();
			}
		},

		'blur' : function(){
			this.input.blur();
		},

		'focus' : function(){
			this.input.focus();
		},

		'isValid' : function(){
			this._error = null;

			if(this._required && isEmpty(this._value)){
				this._error = this._formatError(OjInput.REQUIRED_ERROR);

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


		'setDefault' : function(val){
			if(this._default == val){
				return;
			}

			this._default = val;

			if(this.dflt){
				if(val){
					this.dflt.addEventListener(OjMouseEvent.CLICK, this, '_onDefaultClick');
				}
				else{
					this.dflt.removeEventListener(OjMouseEvent.CLICK, this, '_onDefaultClick');
				}

				this.dflt.setText(val);

				this._redrawDefault();
			}
			else{
				this.input.setAttr('placeholder', val);
			}
		},

		'getErrors' : function(){
			return this._errors;
		},

		'setLabel' : function(lbl){
			this.label.setText(this._label = lbl);

			if(isEmpty(this._label)){
				this.addCss(['no-label']);
			}
			else{
				this.removeCss(['no-label']);
			}
		},

		'setPrefix' : function(prefix){
			if(isString(prefix)){
				this.prefix.setText(this._prefix = prefix);
			}
			else{
				if(this._prefix){
					if(isString(this._prefix)){
						this.removeAllChildren();
					}
					else{
						this.prefix.removeChild(this._prefix);
					}
				}

				this.prefix.addChild(this._prefix = prefix);
			}
		},

		'setSuffix' : function(suffix){
			if(isString(suffix)){
				this.suffix.setText(this._suffix = suffix);
			}
			else{
				if(this._suffix){
					if(isString(this._suffix)){
						this.removeAllChildren();
					}
					else{
						this.suffix.removeChild(this._suffix);
					}
				}

				this.suffix.addChild(this._suffix = suffix);
			}
		},

		'setValidators' : function(validators){
			this._validators = Array.array(validators);
		},

		'getValue' : function(){
			return this._value;
		},
		'setValue' : function(value){
			if(value == this._value){
        return;
			}

      this._value = value;

      if(this.input._dom.value != value){
        this.input._dom.value = String.string(value);
      }

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