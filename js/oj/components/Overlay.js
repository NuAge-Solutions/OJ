OJ.importJs('oj.components.Component');
OJ.importJs('oj.components.Spinner');

OJ.importCss('oj.components.Overlay');


'use strict';

OJ.extendComponent(
	OjComponent, 'OjOverlay',
	{
		'_props_' : {
			'forceIcon'    : true,
			'forceMessage' : false,
			'message'      : null,
			'icon'         : null
		},

		'_template' : 'oj.components.Overlay',


		'_constructor' : function(/*message, icon*/){
			this._super('OjOverlay', '_constructor', []);

			var ln = arguments.length,
				icon;

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

			this._super('OjOverlay', '_onFadeComplete', arguments);
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
		'_TAGS' : ['overlay']
	}
);