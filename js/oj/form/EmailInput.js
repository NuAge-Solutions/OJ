OJ.importJs('oj.form.TextInput');


'use strict';

OJ.compileComponent(
	'OjEmailInput',
	oj.form.EmailInput = function(){
		return new oj.form.TextInput(
			arguments, 'OjEmailInput',
			{
				'_min' : 6,


				'isValid' : function(){
					var valid = this._super('OjEmailInput', 'isValid', arguments);

					var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

					if(!isEmpty(this._value) && !regex.test(this.getValue())){
						this._errors.push(OJ.tokenReplace(OjEmailInput.INVALID_ERROR, 'EMAIL', this._value));

						valid = false;
					}

					return valid;
				}

			}
		);
	},
	{
		'INVALID_ERROR' : '[%EMAIL] is not a valid email address.',

		'SUPPORTED_TAGS' : ['emailinput']
	}
);