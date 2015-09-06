OJ.importJs('oj.form.OjOption');


OJ.extendClass(
	'OjRadioOption', [OjOption],
	{
		'_constructor' : function(){
			this._super(OjOption, '_constructor', arguments);

			this.input.setAttr('type', 'radio');
		}
	}
);