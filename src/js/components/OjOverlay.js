OJ.importJs('oj.components.OjComponent');
OJ.importJs('oj.components.OjSpinner');

OJ.importCss('oj.components.OjOverlay');




OJ.extendComponent(
	'OjOverlay', [OjComponent],
	{
		'_props_' : {
			'forceIcon'    : true,
			'forceMessage' : false,
			'message'      : null,
			'icon'         : null
		},

		'_v_align' : OjStyleElement.MIDDLE,

		'_template' : 'oj.components.OjOverlay',


		'_constructor' : function(/*message, icon*/){
			var args = arguments,
				ln = arguments.length,
				icon;

			this._super(OjComponent, '_constructor', []);

			if(ln){
				this.message = args[0];

				if(ln > 1){
					icon = args[1];
				}
			}

			this.icon = icon;
		},


		'_onFadeComplete' : function(evt){
			if(this._fader.direction == OjFade.OUT && this.parent){
				this.parent.removeChild(this);
			}

			this._super(OjComponent, '_onFadeComplete', arguments);
		},


		'hide' : function(){
			if(!this.parent){
				return;
			}

			this.fadeOut();
		},

		'show' : function(target){
			if(!target || this.parent == target){
				return;
			}

			this.alpha = 0;

			target.appendChild(this);

			this.fadeIn();
		},


		'=message' : function(msg){
			if(!msg && this._forceMessage){
				msg = 'Loading';
			}

			if(isEmpty(msg)){
				this.addCss('no-message');
			}
			else{
				this.removeCss('no-message');
			}

			this.msg.text = this._message = msg;
		},

		'=icon' : function(icon){
			this.icn.removeAllChildren();

			if(icon || this._forceIcon){
				if(!icon){
					icon = new OjSpinner();
					icon.width = 40;
					icon.height = 40;
				}

				this.removeCss('no-icon');

				this.icn.appendChild(icon);
			}
			else{
				this.addCss('no-icon');
			}
		}
	},
	{
		'_TAGS' : ['overlay']
	}
);