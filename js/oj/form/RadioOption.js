OJ.importJs('oj.form.Option');


'use strict';

OJ.extendClass(
	OjOption, 'OjRadioOption',
	{
		'_constructor' : function(){
			this._s('OjRadioOption', '_constructor', arguments);

			this.input.setAttr('type', 'radio');
		}
	}
);