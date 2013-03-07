OJ.importJs('oj.form.Option');


'use strict';

OJ.compileClass(
	'OjCheckedOption',
	oj.form.CheckedOption = function(){
		return new oj.form.Option(
			arguments, 'OjCheckedOption',
			{

			}
		);
	}
);