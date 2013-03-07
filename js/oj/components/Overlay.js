OJ.importJs('oj.components.Component');
OJ.importJs('oj.components.Spinner');

OJ.importCss('oj.components.Overlay');


'use strict';

OJ.compileComponent(
	'OjOverlay',
	oj.components.Overlay = function(){
		return new oj.components.Component(
			arguments, 'OjOverlay',
			{
				'_properties_' : {
					'forceIcon'    : true,
					'forceMessage' : true,
					'message'      : null,
					'icon'         : null
				},

				'_template' : 'oj.components.Overlay',


				'_constructor' : function(/*message, icon*/){
					this._super('OjOverlay', '_constructor', []);

					var ln = arguments.length, icon;

					if(ln){
						this.setMessage(arguments[0]);

						if(ln > 1){
							icon = arguments[1];
						}
					}

					this.setVertAlign(OjStyleElement.MIDDLE);

					this.setIcon(icon);
				},


				'_onFadeComplete' : function(evt){
					if(this._fader.getDirection() == OjFade.OUT && this._parent){
						this._parent.removeChild(this);
					}

					this._unset('_fader');
				},


				'hide' : function(){
					if(!this._parent){
						return;
					}

					this.fadeOut();
				},

				'show' : function(target){
					if(!target || this._parent == target){
						return;
					}

					this.setAlpha(0);

					target.addChild(this);

					this.fadeIn();
				},


				'setMessage' : function(msg){
					if(!msg && this._forceMessage){
						msg = 'Loading';
					}

					if(isEmpty(msg)){
						this.addClasses('no-message');
					}
					else{
						this.removeClasses('no-message');
					}

					this.message.setText(msg);
				},

				'setIcon' : function(icon){
					this.icon.removeAllChildren();

					if(icon || this._forceIcon){
						if(!icon){
							icon = new OjSpinner();
							icon.setWidth(40);
							icon.setHeight(40);
						}

						this.removeClasses('no-icon');

						this.icon.addChild(icon);
					}
					else{
						this.addClasses('no-icon');
					}
				}
			},
			{
				'SUPPORTED_TAGS' : ['overlay']
			}
		);
	}
);