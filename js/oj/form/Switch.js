OJ.importJs('oj.components.Button');
OJ.importJs('oj.form.Input');


OJ.importCss('oj.form.Switch');


'use strict';

OJ.extendComponent(
	OjInput, 'OjSwitch',
	{
		'_props_' : {

		},

		'_template' : 'oj.form.Switch'
	},
	{
		'_TAGS' : ['switch']
	}
);