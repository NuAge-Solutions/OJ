OJ.importJs('oj.form.OjInput');

OJ.importCss('oj.form.OjTextArea');




OJ.extendComponent(
	'OjTextArea', [OjInput],
	{
        '_props_' : {
			'min_length' : 0,
			'max_length' : 0
		},

		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);

			var prnt = this.input.parent,
				new_input = new OjStyleElement(OjElement.elm('textarea'));

			new_input.addCss('input');

			prnt.replaceChild(this.input, new_input);

			this.input = new_input;

            this.wrapper.vAlign = OjStyleElement.TOP;
		}
	},
	{
		'_TAGS' : ['textarea', 'text-area']
	}
);