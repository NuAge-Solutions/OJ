OJ.importJs('oj.form.TextValue');


'use strict';

OJ.extendClass(
	OjTextValue, 'OjDateValue',
	{
		'_redrawValue' : function(){
			this.value.setText(this._value.toLocaleDateString());
		}
	}
);