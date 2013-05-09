OJ.importCss('oj.form.OjTextValue');


'use strict';

OJ.extendClass(
	OjComponent, 'OjTextValue',
	{
		'_template' : 'oj.form.OjTextValue',  '_label' : null,  '_value' : null,


		'_constructor' : function(/*label, value*/){
			this._super('OjTextValue', '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setLabel(arguments[0]);

				if(ln > 1){
					this.setValue(arguments[1]);
				}
			}
		},


		'_redrawLabel' : function(){ this.label.setText(this._label); },

		'_redrawValue' : function(){ this.value.setText(this._value); },

		'getLabel' : function(){ return this._label; },
		'setLabel' : function(label){ this._label = label; this._redrawLabel(); },

		'getValue' : function(){ return this._value; },
		'setValue' : function(value){ this._value = value; this._redrawValue(); }
	}
);