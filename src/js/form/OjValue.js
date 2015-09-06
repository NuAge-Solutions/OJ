OJ.importJs('oj.components.OjList');
OJ.importJs('oj.renderers.OjLabelItemRenderer');

OJ.importCss('oj.form.OjValue');



OJ.extendClass(
	'OjValue', [OjComponent],
	{
        '_props_' : {
            'item_renderer' : OjLabelItemRenderer,
            'label' : null,
            'name' : null,
            'value' : null
        },

		'_template' : 'oj.form.OjValue',

//		'_label' : null, '_name': null,  '_value' : null,


		'_constructor' : function(/*name, label, value*/){
			this._super(OjComponent, '_constructor', []);

			this._processArguments(arguments, {
                'name' : null,
                'label' : null,
                'value' : null
            });
		},


		'_redrawLabel' : function(){
			this.label.text = this._label;
		},

		'_redrawValue' : function(){
            this.value.removeAllChildren();

            if(isArray(this._value) || (isObjective(this._value) && this._value.is(OjArray))){
                this.value.appendChild(new OjList(this._value, this._item_renderer))
            }
            else{
                this.value.appendChild(new this._item_renderer(null, this._value));
            }
		},

		'=label' : function(label){
            if(this._label == label){
                return;
            }

			this._label = label;

			this._redrawLabel();
		},

        '=name' : function(nm){
            if(this._name == nm){
                return;
            }

            if(this._name){
                this.removeCss(nm + '-value');
            }

            this.addCss((this._name = nm) + '-value');
        },

		'=value' : function(value){
            if(this._value == value){
                return;
            }

			this._value = value;

			this._redrawValue();
		}
	}
);