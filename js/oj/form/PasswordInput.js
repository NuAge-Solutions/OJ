OJ.importJs('oj.form.TextInput');


'use strict';

OJ.extendClass(
	OjTextInput, 'OjPasswordInput',
	{
		'_min' : 6,  '_max' : 30,


		'_setDom' : function(dom_elm){
			this._super('OjPasswordInput', '_setDom', arguments);

			this.input.setAttr('type', 'password');
		}
	}
);