OJ.importJs('oj.form.OjInput');

OJ.importCss('oj.form.OjTextArea');


'use strict';

OJ.extendClass(
	OjInput, 'OjTextArea',
	{
		'_setDom' : function(dom_elm){
			this._super('OjTextArea', '_setDom', arguments);

			var prnt = this.input.parent();
			var new_input = new OjStyleElement('<textarea></textarea>');
			new_input.addCss('input');

			prnt.replaceChild(this.input, new_input);

			this.input = new_input;
		}
	}
);