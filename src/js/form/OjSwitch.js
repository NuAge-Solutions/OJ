OJ.importJs('oj.components.OjButton');
OJ.importJs('oj.form.OjInput');


OJ.importCss('oj.form.OjSwitch');


OJ.extendComponent(
	'OjSwitch', [OjInput],
	{
		'_props_' : {

		},

		'_template' : 'oj.form.OjSwitch',

        '_onClick' : function(evt){
            this._super(OjInput, '_onClick', arguments);

            this.value = !this._value;
        },

        '_redrawValue' : function(){
            this._super(OjInput, '_redrawValue', arguments);

            if(this._value){
                this.addCss('on');
                this.removeCss('off');
            }
            else{
                this.addCss('off');
                this.removeCss('on');
            }
        }
	},
	{
		'_TAGS' : ['switch']
	}
);