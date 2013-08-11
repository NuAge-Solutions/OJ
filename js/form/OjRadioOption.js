OJ.importJs('oj.form.OjOption');


'use strict';

OJ.extendClass(
	'OjRadioOption', [OjOption],
	{
		'_constructor' : function(){
			this._super(OjOption, '_constructor', arguments);

			this.input.setAttr('type', 'radio');
		}
	}
);