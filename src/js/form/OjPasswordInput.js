OJ.importJs('oj.form.OjTextInput');


OJ.extendComponent(
	'OjPasswordInput', [OjTextInput],
	{
		'_minLength' : 6,  '_maxLength' : 30,



		'_setDom' : function(dom_elm){
			this._super(OjTextInput, '_setDom', arguments);

			this.input.setAttr('type', 'password');
		},

        '=minLength' : function(){

        },

        '=maxLength' : function(){

        }

	},
    {
        '_TAGS' : ['passwordinput']
    }
);