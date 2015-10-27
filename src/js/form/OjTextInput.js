OJ.importJs('oj.form.OjInput');


OJ.extendComponent(
	'OjTextInput', [OjInput],
	{
		'_props_' : {
			'min_length' : 0,
			'max_length' : 255
		},

        '_get_props_' : {
            'type' : 'text'
        },


		'_constructor' : function(/*name, label, value, validators*/){
			this._super(OjInput, '_constructor', arguments);

			this.input.addEventListener(OjKeyboardEvent.UP, this, '_onInputChange');
		},


		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);

			this.input.setAttr('type', this._type);
		},

        '_formatErrorTokens' : function(){
            var tokens = this._super(OjInput, '_formatErrorTokens', arguments);
            tokens.MAX = this.max_length;
            tokens.MIN = this.min_length;

            return tokens;
        },


		'isValid' : function(){
            var self = this,
                valid = self._super(OjInput, 'isValid', arguments),
                ln = self._value ? self._value.length : 0;

			if(self.min_length && ln < self.min_length){
                self._errors.append(self._formatError(OjTextInput.MIN_LENGTH_ERROR));

				valid = false;
			}

			if(self.max_length && ln > self.max_length){
				self._errors.append(self._formatError(OjTextInput.MAX_LENGTH_ERROR));

				valid = false;
			}

			return valid;
		},

        '=max_length' : function(val){
            var self = this;

            if(self._max_length == val){
                return;
            }

            self.input.setAttr('maxlength', self._max_length = val);
        },

		'=value' : function(value){
            var self = this;

            if(isSet(value)){
                value = String.string(value);

                if(value.length > self.max_length){
                    value = value.slice(0, self.max_length);
                }
            }

			return self._super(OjInput, '=value', [value]);
		}
	},
	{
        'EMAIL' : 'email',
        'TEXT' : 'text',
        'NUMBER' : 'number',
        'SECURE' : 'password',

		'MIN_LENGTH_ERROR' : '[%INPUT] must be at least [%MIN] characters.',
		'MAX_LENGTH_ERROR' : '[%INPUT] must be no more than [%MAX] characters.',

		'_TAGS' : ['text-input']
	}
);


OJ.extendComponent(
    'OjEmailInput', [OjTextInput],
    {
        '_props_' : {
            'max_length' : 254,
            'min_length' : 3
        },

        '_type' : OjTextInput.EMAIL,


        'isValid' : function(){
            var valid = this._super(OjTextInput, 'isValid', arguments);

            if(!isEmpty(this._value) && !this._static.isValidEmail(this._value)){
                this._errors.append(this._formatError(OjEmailInput.INVALID_ERROR));

                valid = false;
            }

            return valid;
        },


        '=max_length' : function(val){
            throw new Error('Cannot set the max length of an email. This is a fixed value.');
        },

        '=min_length' : function(val){
            throw new Error('Cannot set the min length of an email. This is a fixed value.');
        }
    },
    {
        'INVALID_ERROR' : '[%INPUT] requires a valid email address.',

        'SUPPORTS_EMAIL_TYPE' : OjInput.supportsInputType('email'),

        'isValidEmail' : function(val){
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
        },

        '_TAGS' : ['email-input']
    }
);


OJ.extendComponent(
    'OjNumberInput', [OjTextInput],
    {
        '_type' : OjTextInput.NUMBER,

        '.value' : function(){
            var val = this._value;

            if(isEmpty(val)){
                return 0;
            }

            return parseFloat(val);
        }
    },
    {
        '_TAGS' : ['num-input', 'number-input']
    }
);


OJ.extendComponent(
    'OjSecureInput', [OjTextInput],
    {
        '_min_length' : 6,  '_max_length' : 30,

        '_type' : OjTextInput.SECURE
    },
    {
        '_TAGS' : ['secure-input']
    }
);