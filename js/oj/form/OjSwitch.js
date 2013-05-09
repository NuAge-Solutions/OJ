OJ.importJs('oj.components.OjButton');
OJ.importJs('oj.form.OjInput');


OJ.importCss('oj.form.OjSwitch');


'use strict';

OJ.extendComponent(
	OjInput, 'OjSwitch',
	{
		'_props_' : {

		},

		'_template' : 'oj.form.OjSwitch'
	},
	{
		'_TAGS' : ['switch']
	}
);