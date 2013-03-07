OJ.importJs('oj.list.List');
OJ.importJs('oj.list.ListItem');


'use strict';

OJ.compileClass(
	'OjFormError',
	oj.form.FormError = function(){
		return new oj.list.ListItem(
			arguments, 'OjFormError',
			{
				'_template' : 'oj.form.FormError',


//			'_constructor' : function(){
//				this._super('OjFormError', '_constructor', arguments);
//			},

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
	}
);