OJ.importJs('oj.form.TextValue');


'use strict';

OJ.compileClass(
	'OjDateValue',
	oj.form.DateValue = function(){
		return new oj.form.TextValue(
			arguments, 'OjDateValue',
			{

				'_redrawValue' : function(){ this.value.setText(this._value.toLocaleDateString()); }


			}
		);
	}
);