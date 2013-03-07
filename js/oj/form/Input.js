OJ.importJs('oj.components.Component');

OJ.importCss('oj.form.Input');


'use strict';

OJ.compileClass(
	'OjInput',
	oj.form.Input = function(){
		return new oj.components.Component(
			arguments, 'OjInput',
			{
				'_properties_' : {
					'default'    : null,
					'name'       : null,
					'prefix'     : null,
					'suffix'     : null,
					'validators' : null,
					'value'      : null
				},

				'_errors' : null,  '_ready' : false,  '_template' : 'oj.form.Input',


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
							this.addClasses(this._class_names[ln]);

							if(this._class_names[ln] == 'OjInput'){
								break;
							}
						}
					}

					this._ready = true;
				},


				'_redrawDefault' : function(){
					if(isEmpty(this._default) || !isEmpty(this._value)){
						this.addClasses('no-default');
					}
					else{
						this.removeClasses('no-default');
					}

					return true;
				},


//				'_onDomMouseEvent' : function(evt){
//					evt.bubbles = false;
//
//					if(evt.stopPropagation){
//						evt.stopPropagation();
//					}
//					else{
//						evt.cancelBubble = true;
//					}
//
//					if(this.ojProxy && this.ojProxy._processEvent(evt)){
//						this.ojProxy._onMouse(OjMouseEvent.convertDomEvent(evt));
//					}
//
//					return false;
//				},

				'_onDefaultClick' : function(evt){
					this.input.focus();
				},

				'_onFocusIn' : function(evt){
					this.addClasses('focus', 'no-default');
				},

				'_onFocusOut' : function(evt){
					var classes = ['focus'];

					if(isEmpty(this._value)){
						classes.push('no-default');
					}

					this.removeClasses.apply(this, classes);
				},

				'_onChange' : function(evt){
					this.setValue(this.input._dom.value);
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
						this.removeClasses('error');

						return true;
					}

					this.addClasses('error');

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
						this.addClasses('no-label');
					}
					else{
						this.removeClasses('no-label');
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
							this.input._dom.value = isSet(value) ? value : '';

							this._redrawDefault();
						}

						if(this._ready){
							this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
						}
					}
				}
			}
		);
	}
);