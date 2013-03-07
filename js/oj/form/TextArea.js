OJ.importJs('oj.form.Input');

OJ.importCss('oj.form.TextArea');


'use strict';

OJ.compileClass(
	'OjTextArea',
	oj.form.TextArea = function(){
		return new oj.form.Input(
			arguments, 'OjTextArea',
			{
				'_setDom' : function(dom_elm){
					this._super('OjTextArea', '_setDom', arguments);

					var prnt = this.input.parent();
					var new_input = new OjStyleElement('<textarea></textarea>');
					new_input.addClasses('input');

					prnt.replaceChild(this.input, new_input);

					this.input = new_input;
				}
			}
		);
	}
);