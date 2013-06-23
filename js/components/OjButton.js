OJ.importJs('oj.components.OjLink');

OJ.importCss('oj.components.OjButton');


'use strict';

OJ.extendComponent(
	OjLink, 'OjButton',
	{
		'_default_h_align' : OjStyleElement.CENTER,


		'_constructor' : function(/*label, icon*/){
			var args = arguments,
				ln = args.length;

			this._super('OjButton', '_constructor', []);

			if(ln){
				this.setText(args[0]);

				if(ln > 1){
					this.setIcon(args[1]);
				}
			}

			// force to always listen for click
			this._proxy.onclick = this._onDomMouseEvent;
		},


		'removeEventListener' : function(type, context, callback){
			this._super('OjButton', 'removeEventListener', arguments);

			// force to always listen for click
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