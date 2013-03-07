OJ.importJs('oj.components.Button');


'use strict';

OJ.compileComponent(
	'OjImageButton',
	oj.components.ImageButton = function(){
		return new oj.components.Button(
			arguments, 'OjImageButton',
			{
				'_label' : null,


				'_constructor' : function(/*image*/){
					this._super('OjImageButton', '_constructor', []);

					if(arguments.length){
						this.setIcon(arguments[0]);
					}
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
			}
		);
	},
	{
		'SUPPORTED_TAGS' : ['imagebutton']
	}
);