OJ.importJs('oj.form.OjValue');


OJ.extendClass(
	'OjDateValue', [OjValue],
	{
		'_redrawValue' : function(){
			this.value.text = this._value.toLocaleDateString();
		}
	}
);