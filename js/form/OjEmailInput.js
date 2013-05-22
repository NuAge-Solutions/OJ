OJ.importJs('oj.form.OjTextInput');


'use strict';

OJ.extendComponent(
	OjTextInput, 'OjEmailInput',
	{
		'_props_' : {
			'maxLength' : 254,
			'minLength' : 3
		},


		'_setDom' : function(dom_elm){
			this._super('OjEmailInput', '_setDom', arguments);

			if(this._static.SUPPORTS_EMAIL_TYPE){
				this.input.setAttr('type', 'email');
			}
		},


		'isValid' : function(){
			var valid = this._super('OjEmailInput', 'isValid', arguments);

			var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if(!isEmpty(this._value) && !regex.test(this.getValue())){
				this._errors.push(OJ.tokenReplace(OjEmailInput.INVALID_ERROR, 'EMAIL', this._value));

				valid = false;
			}

			return valid;
		},


		'setMaxLength' : function(val){
			throw new Error('Cannot set the max length of an email. This is a fixed value.');
		},

		'setMinLength' : function(val){
			throw new Error('Cannot set the min length of an email. This is a fixed value.');
		}
	},
	{
		'INVALID_ERROR' : '[%EMAIL] is not a valid email address.',

		'SUPPORTS_EMAIL_TYPE' : OjInput.supportsInputType('email'),

		'_TAGS' : ['emailinput']
	}
);