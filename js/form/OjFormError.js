OJ.importJs('oj.renderers.OjItemRenderer');


'use strict';

OJ.extendClass(
	'OjFormError', [OjItemRenderer],
	{
		'_template' : 'oj.form.OjFormError',


		'_redrawData' : function(){
			var data = this._data,
				input = this.input,
				errors = this.errors;

			if(data){
				if(data.input){
					input.show();

					input.setText(data.input.getLabel());
				}
				else{
					input.hide();
				}

				if(data.errors){
					errors.show();

					errors.getDataProvider().setSource(data.errors);
				}
				else{
					errors.hide();
				}
			}
		}
	}
);