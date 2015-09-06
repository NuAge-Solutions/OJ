OJ.importJs('oj.renderers.OjItemRenderer');




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

					input.text = data.input.label;
				}
				else{
					input.hide();
				}

				if(data.errors){
					errors.show();

					errors.dataProvider.source = data.errors;
				}
				else{
					errors.hide();
				}
			}
		}
	}
);