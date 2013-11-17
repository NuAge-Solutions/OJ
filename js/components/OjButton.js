OJ.importJs('oj.components.OjLink');

OJ.importCss('oj.components.OjButton');


'use strict';

OJ.extendComponent(
	'OjButton', [OjLink],
	{
		'_default_h_align' : OjStyleElement.CENTER,


		'_constructor' : function(/*label, icon*/){
			this._super(OjLink, '_constructor', []);

      this._processArguments(arguments, {
        'setText' : null,
        'setIcon' : null
      });
		},


		'redraw' : function(){
			if(this._super(OjLink, 'redraw', arguments)){
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
			this._super(OjLink, 'setIsActive', arguments);

			if(this._icon){
				this._icon.setIsActive(active);
			}
		}
	},
	{
		'_TAGS' : ['button']
	}
);