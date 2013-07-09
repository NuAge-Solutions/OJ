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
		},


		'redraw' : function(){
			if(this._super('OjButton', 'redraw', arguments)){
				// note: hack for webkit render bug
				if(OJ.getEngine() == OJ.WEBKIT){
					this._setStyle('font-size', '1px');

					this._setStyle('font-size', null);
				}

				return true;
			}

			return false;
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