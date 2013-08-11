OJ.importJs('oj.form.OjTextValue');


'use strict';

OJ.extendClass(
	'OjDateValue', [OjTextValue],
	{
		'_redrawValue' : function(){
			this.value.setText(this._value.toLocaleDateString());
		}
	}
);