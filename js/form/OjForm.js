OJ.importJs('oj.views.OjView');


OJ.extendComponent(
	'OjForm', [OjView], 
	{
		'_getInputs' : function(){
			var inputs = this._dom.getElementsByClassName('OjInput'),
				rtrn = [],
				ln = inputs.length;

			for(; ln--;){
				// todo: OjForm - add checking for compound inputs
				rtrn.unshift(OjElement.element(inputs[ln]));
			}

			return rtrn;
		},


		'focus' : function(){
			this._super(OjView, 'focus', arguments);

			var inputs = this._getInputs();

			if(inputs.length){
				inputs[0].focus();
			}
		},

		'reset' : function(){
			var inputs = this._getInputs(),
				ln = inputs.length;

			for(; ln--;){
				inputs[ln].setValue(null);
			}
		},

		'submit' : function(){
			if(this.validate()){
				// todo: OjForm - add submit code logic/functionality

				this.dispatchEvent(new OjEvent(OjEvent.SUBMIT, false, false));

				return true;
			}

			return false;
		},

		'validate' : function(){
			var inputs = this._getInputs(),
				ln = inputs.length,
				input, msg = '';

			this._errors = [];

			for(; ln--;){
				input = inputs[ln];

				if(!input.validate()){
					this._errors.unshift({
						'input' : input,
						'error' : input.getError()
					});
				}
			}

			if(!(ln = this._errors.length)){
				return true;
			}

			for(; ln--;){
				msg = '\n' + this._errors[ln].error + msg;
			}

			WindowManager.alert(
				'Please fix the following issues and re-submit:<span style="font-weight: bold;">' + msg + '</span>\nThank you.',
				'Form Error'
			);

			return false;
		}
	},
	{
		'_TAGS' : ['form']
	}
);