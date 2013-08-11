OJ.importJs('oj.form.OjTextInput');


'use strict';

OJ.extendComponent(
	'OjEmailInput', [OjTextInput],
	{
		'_props_' : {
			'maxLength' : 254,
			'minLength' : 3
		},


		'_setDom' : function(dom_elm){
			this._super(OjTextInput, '_setDom', arguments);

			if(this._static.SUPPORTS_EMAIL_TYPE){
				this.input.setAttr('type', 'email');
			}
		},


		'isValid' : function(){
			if(
				this._super(OjTextInput, 'isValid', arguments) &&
				!isEmpty(this._value) && !this._static.isValidEmail(this._value)
			){
				this._error = this._formatError(OjEmailInput.INVALID_ERROR);

				return false;
			}

			return true;
		},


		'setMaxLength' : function(val){
			throw new Error('Cannot set the max length of an email. This is a fixed value.');
		},

		'setMinLength' : function(val){
			throw new Error('Cannot set the min length of an email. This is a fixed value.');
		}
	},
	{
		'INVALID_ERROR' : '[%INPUT] requires a valid email address.',

		'SUPPORTS_EMAIL_TYPE' : OjInput.supportsInputType('email'),

		'isValidEmail' : function(val){
			return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
		},

		'_TAGS' : ['emailinput']
	}
);