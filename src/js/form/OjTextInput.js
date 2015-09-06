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
			var valid = this._super(OjInput, 'isValid', arguments);

			var ln = this._value ? this._value.length : 0;

			if(this.min_length && ln < this.min_length){
                this._errors.append(this._formatError(OjTextInput.MIN_LENGTH_ERROR));

				valid = false;
			}

			if(this.max_length && ln > this.max_length){
				this._errors.append(this._formatError(OjTextInput.MAX_LENGTH_ERROR));

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
            if(isSet(value)){
                value = String.string(value);

                if(value.length > this.max_length){
    //				this.input._dom.value = value.slice(0, this.max_length);
    //
    //				return;
                    value = value.slice(0, this.max_length);
                }
            }

			return this._super(OjInput, '=value', [value]);
		}
	},
	{
        'EMAIL' : 'email',
        'TEXT' : 'text',
        'NUMBER' : 'number',
        'SECURE' : 'password',

		'MIN_LENGTH_ERROR' : '[%INPUT] must be at least [%MIN] characters long.',
		'MAX_LENGTH_ERROR' : '[%INPUT] must be no more than [%MAX] characters long.',

		'_TAGS' : ['textinput']
	}
);


OJ.extendComponent(
    'OjEmailInput', [OjTextInput],
    {
        '_props_' : {
            'maxLength' : 254,
            'minLength' : 3
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


        '=maxLength' : function(val){
            throw new Error('Cannot set the max length of an email. This is a fixed value.');
        },

        '=minLength' : function(val){
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


OJ.extendComponent(
    'OjNumberInput', [OjTextInput],
    {
        '_type' : OjTextInput.NUMBER,

        '.value' : function(){
            var val = this._super(OjTextInput, '.value', []);

            if(isEmpty(val)){
                return 0;
            }

            return parseFloat(val);
        }
    },
    {
        '_TAGS' : ['numinput']
    }
);


OJ.extendComponent(
    'OjSecureInput', [OjTextInput],
    {
        '_type' : OjTextInput.SECURE
    },
    {
        '_TAGS' : ['secureinput']
    }
);