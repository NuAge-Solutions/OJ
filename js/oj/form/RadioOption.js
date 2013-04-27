OJ.importJs('oj.form.Option');


'use strict';

OJ.extendClass(
	OjOption, 'OjRadioOption',
	{
		'_constructor' : function(){
			this._super('OjRadioOption', '_constructor', arguments);

			this.input.setAttr('type', 'radio');
		}
	}
);