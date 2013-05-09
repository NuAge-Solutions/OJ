OJ.importJs('oj.form.OjInput');


'use strict';

OJ.extendComponent(
	OjInput, 'OjTextInput',
	{
		'_props_' : {
			'minLength' : 0,
			'maxLength' : 255
		},


		'_constructor' : function(/*name, label, value, validators*/){
			this._super('OjTextInput', '_constructor', arguments);

			this.input.addEventListener(OjKeyboardEvent.UP, this, '_onChange');
		},


		'_setDom' : function(dom_elm){
			this._super('OjTextInput', '_setDom', arguments);

			this.input.setAttr('type', 'text');
		},


		'isValid' : function(){
			var valid = this._super('OjTextInput', 'isValid', arguments);

			var ln = this._value.length;

			if(this._minLength && ln < this._minLength){
				this._errors.push(OJ.tokenReplace(OjTextInput.MIN_LENGTH_ERROR, 'MIN', this._minLength));

				valid = false;
			}

			if(this._maxLength && ln > this._maxLength){
				this._errors.push(OJ.tokenReplace(OjTextInput.MAX_LENGTH_ERROR, 'MAX', this._maxLength));

				valid = false;
			}

			return valid;
		},

		'setValue' : function(value){
			if(value && value.length > this._maxLength){
				this.input._dom.value = value.slice(0, this._maxLength);

				return;
			}

			return this._super('OjTextInput', 'setValue', arguments);
		}
	},
	{
		'MIN_LENGTH_ERROR' : 'Entry must be at least [%MIN] characters long.',
		'MAX_LENGTH_ERROR' : 'Entry must be no more than [%MAX] characters long.',

		'_TAGS' : ['textinput']
	}
);