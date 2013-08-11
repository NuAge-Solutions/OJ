OJ.importJs('oj.form.OjInput');

OJ.importCss('oj.form.OjTextArea');


'use strict';

OJ.extendComponent(
	'OjTextArea', [OjInput],
	{
		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);

			var prnt = this.input.parent(),
				new_input = new OjStyleElement(OjElement.elm('textarea'));

			new_input.addCss('input');

			prnt.replaceChild(this.input, new_input);

			this.input = new_input;
		}
	},
	{
		'_TAGS' : ['textarea']
	}
);