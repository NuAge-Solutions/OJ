OJ.importJs('oj.components.Link');

OJ.importCss('oj.components.Button');


'use strict';

OJ.compileComponent(
	'OjButton',
	oj.components.Button = function(){
		return new oj.components.Link(
			arguments, 'OjButton',
			{
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

					this.setHorzAlign(OjStyleElement.CENTER);
					this.setVertAlign(OjStyleElement.MIDDLE);
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
			}
		);
	},
	{
		'SUPPORTED_TAGS' : ['button']
	}
);