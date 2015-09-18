OJ.importJs('oj.form.OjInput');


OJ.extendComponent(
	'OjFileInput', [OjInput],
	{
		'_props_' : {
            'minSize' : 0,
			'maxSize' : 0,
            'selectionMax': 1
		},


		'_constructor' : function(name, label, maxSize, minSize){
			this._super(OjInput, '_constructor', [name, label]);

            if(maxSize){
                this.maxSize = maxSize;
            }

            if(minSize){
                this.minSize = minSize;
            }
		},


		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);

			this.input.setAttr('type', 'file');
		},

        '_formatErrorTokens' : function(){
            var tokens = this._super(OjInput, '_formatErrorTokens', arguments);
            tokens.MAX = this._maxSize;
            tokens.MIN = this._minSize;

            return tokens;
        },

        '_onInputChange' : function(evt){
            var val = this.input.dom.files,
                ln = val.length;

            if(this.allowMultiple){
                // check the length

                // remove the overflow

                // notify of the removal
            }
            else if(ln){
                val = val[0];
            }

            this.value = val;
        },

        '_redrawValue' : function(){
            // file input cannot be redrawn
            // TODO: figure out how to redraw file input (make sure to support multiple files)
        },


		'isValid' : function(){
			var valid = this._super(OjInput, 'isValid', arguments);

			var size = this._value ? this._value.size / 1000000 : 0;

			if(this._minSize && size < this._minSize){
                this._errors.append(this._formatError(OjFileInput.MIN_SIZE_ERROR));

				valid = false;
			}
            else if(this._maxSize && size > this._maxSize){
				this._errors.append(this._formatError(OjFileInput.MAX_SIZE_ERROR));

				valid = false;
			}

			return valid;
		},


        '=selectionMax' : function(val){
            if(this._selectionMax == val){
                return;
            }

            this.input.setAttr('multiple', (this._selectionMax = val) == 1 ? null : '');
        }
	},
	{
		'MIN_SIZE_ERROR' : '[%INPUT] must be at least [%MIN] MB.',
		'MAX_SIZE_ERROR' : '[%INPUT] must be no more than [%MAX] MB.',


		'_TAGS' : ['file-input']
	}
);