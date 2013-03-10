OJ.importJs('oj.components.Button');
OJ.importJs('oj.form.Input');


OJ.importCss('oj.form.Switch');


'use strict';

OJ.compileComponent(
	'OjSwitch',
	oj.form.Switch = function(){
		return new oj.form.Input(
			arguments, 'OjSwitch',
			{
				'_properties_' : {

				},

				'_template' : 'oj.form.Switch'
			}
		);
	},
	{
		'SUPPORTED_TAGS' : ['switch']
	}
);