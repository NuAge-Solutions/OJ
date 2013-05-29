OJ.importJs('oj.components.OjComponent');

OJ.importCss('oj.form.OjInput');


'use strict';

OJ.extendClass(
	OjComponent, 'OjInput',
	{
		'_props_' : {
			'default'    : null,
			'name'       : null,
			'prefix'     : null,
			'required'   : false,
			'suffix'     : null,
			'validators' : null,
			'value'      : null
		},

		'_errors' : null,  '_ready' : false,  '_template' : 'oj.form.OjInput',


		'_constructor' : function(/*name, label, value, validators*/){
			this._super('OjInput', '_constructor', []);

			var ln = arguments.length;

			this._errors = [];
			this._validators = [];

			if(ln){
				this.setName(arguments[0]);

				if(ln > 1){
					this.setLabel(arguments[1]);

					if(ln > 2){
						this.setValue(arguments[2]);

						if(ln > 3){
							this.setValidators(arguments[3]);
						}
					}
				}
			}

			if(!this._label){
				this.setLabel(this._label);
			}

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
				ln = this._class_names.length;

				while(ln-- > 0){
					this.addCss(this._class_names[ln]);

					if(this._class_names[ln] == 'OjInput'){
						break;
					}
				}
			}

			this.addEventListener(OjMouseEvent.CLICK, this, '_onClick');

			this._ready = true;
		},


		'_redrawDefault' : function(){
			if(isEmpty(this._default) || !isEmpty(this._value)){
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
//			var classes = ['focus'];
//
//			if(isEmpty(this._value) && this._default){
//				classes.push('no-default');
//			}
//
//			this.removeCss(classes);

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
			this._errors = [];

			return true;
		},

		'redraw' : function(){
			if(this._super('OjInput', 'redraw', arguments)){
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

			if(val){
				this.dflt.addEventListener(OjMouseEvent.CLICK, this, '_onDefaultClick');
			}
			else{
				this.dflt.removeEventListener(OjMouseEvent.CLICK, this, '_onDefaultClick');
			}

			this.dflt.setText(this._default = val);

			this._redrawDefault();
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
			if(value != this._value){
				this._value = value;

				if(this.input._dom.value != value){
					this.input._dom.value = String.string(value);
				}

				this._redrawDefault();

				if(this._ready){
					this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
				}
			}
		}
	},
	{
		'supportsInputType' : function(type){
			var i = document.createElement('input');
			i.setAttribute('type', type);

			return i.type == type;
		}
	}
);