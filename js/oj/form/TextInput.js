OJ.importJs('oj.form.Input');


'use strict';

OJ.compileComponent(
	'OjTextInput',
	oj.form.TextInput = function(){
		return new oj.form.Input(
			arguments, 'OjTextInput',
			{
				'_min' : 0,  '_max' : 255,


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

					if(this._min && ln < this._min){
						this._errors.push(OJ.tokenReplace(OjTextInput.MIN_LENGTH_ERROR, 'MIN', this._min));

						valid = false;
					}

					if(this._max && ln > this._max){
						this._errors.push(OJ.tokenReplace(OjTextInput.MAX_LENGTH_ERROR, 'MAX', this._max));

						valid = false;
					}

					return valid;
				},


				'getMaxLength' : function(){
					return this._max;
				},
				'setMaxLength' : function(val){
					this._max = val;
				},

				'getMinLength' : function(){
					return this._min;
				},
				'setMinLength' : function(val){
					this._min = val;
				}

			}
		);
	},
	{
		'MIN_LENGTH_ERROR' : 'Entry must be at least [%MIN] characters long.',
		'MAX_LENGTH_ERROR' : 'Entry must be no more than [%MAX] characters long.',

		'SUPPORTED_TAGS' : ['textinput']
	}
);