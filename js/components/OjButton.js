OJ.importJs('oj.components.OjLink');

OJ.importCss('oj.components.OjButton');


'use strict';

OJ.extendComponent(
	OjLink, 'OjButton',
	{
		'_default_h_align' : OjStyleElement.CENTER,


		'_constructor' : function(/*label, icon*/){
			this._super('OjButton', '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setText(arguments[0]);

				if(ln > 1){
					this.setIcon(arguments[1]);
				}
			}

			this._proxy.onclick = this._onDomMouseEvent;
		},


		'removeEventListener' : function(type, context, callback){
			this._super('OjButton', 'removeEventListener', arguments);

			this._proxy.onclick = this._onDomMouseEvent;
		},


		'getLabel' : function(){
			return this.getText();
		},
		'setLabel' : function(label){
			this.setText(label);
		},

		'setIsActive' : function(active){
			this._super('OjButton', 'setIsActive', arguments);

			if(this._icon){
				this._icon.setIsActive(active);
			}
		}
	},
	{
		'_TAGS' : ['button']
	}
);