OJ.importJs('oj.form.OjTextInput');


'use strict';

OJ.extendClass(
	'OjPasswordInput', [OjTextInput],
	{
		'_min' : 6,  '_max' : 30,


		'_setDom' : function(dom_elm){
			this._super(OjTextInput, '_setDom', arguments);

			this.input.setAttr('type', 'password');
		}
	}
);