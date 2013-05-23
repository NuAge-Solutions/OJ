OJ.importJs('oj.components.OjItemRenderer');


'use strict';

OJ.extendClass(
	OjItemRenderer, 'OjFormError',
	{
		'_template' : 'oj.form.OjFormError',


		'_redrawData' : function(){
			if(this._data){
				if(this._data.input){
					this.input.show();

					this.input.setText(this._data.input.getLabel());
				}
				else{
					this.input.hide();
				}

				if(this._data.errors){
					this.errors.show();

					this.errors.getDataProvider().setSource(this._data.errors);
				}
				else{
					this.errors.hide();
				}
			}
		}
	}
);