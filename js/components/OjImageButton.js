OJ.importJs('oj.components.OjButton');


'use strict';

OJ.extendComponent(
	OjButton, 'OjImageButton',
	{
		'_v_align' : OjStyleElement.TOP,


		'_constructor' : function(/*image*/){
			this._super('OjImageButton', '_constructor', []);

			var args = arguments;

			if(args.length){
				this.setIcon(args[0]);
			}

			this.removeChild(this.label);
		},

		'_processDomSourceChildren' : function(dom_elm, component){
			var txt = dom_elm.innerHTML;

			if(!isEmpty(txt)){
				this.setIcon(new OjImage(txt.trim()));

				return null;
			}

			return this._super('OjImageButton', '_processDomSourceChildren', arguments);
		},


		'_makeLabel' : function(){
			// don't do anything since we don't need a label
		},


		'getLabel' : function(){
			return this._label;
		},
		'setLabel' : function(label){
			this._label = label;
		},

		'getImage' : function(){
			return this.getIcon();
		},
		'setImage' : function(img){
			this.setIcon(img);
		}
	},
	{
		'_TAGS' : ['imagebutton']
	}
);