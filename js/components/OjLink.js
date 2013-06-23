OJ.importJs('oj.components.OjLabel');
OJ.importJs('oj.media.OjImage');

OJ.importCss('oj.components.OjLink');

'use strict';

OJ.extendComponent(
	OjLabel, 'OjLink',
	{
		'_props_' : {
			'url'      : null,
			'icon'     : null,
			'target'   : null
		},

		'_v_align' : OjStyleElement.MIDDLE,

		'_template' : 'oj.components.OjLink',


		'_constructor' : function(/*label, url, target*/){
			var args = arguments,
				ln = args.length;

			this._super('OjLink', '_constructor', []);

			// process arguments
			if(ln){
				this.setText(args[0]);

				if(ln > 1){
					this.setUrl(args[1]);

					if(ln > 2){
						this.setTarget(args[2]);
					}
				}
			}
		},

		'setCss' : function(val){
			if(val.indexOf('ssl') > -1){
//				debugger;
			}

			this._super('OjLink', 'setCss', arguments);
		},

		'_redrawText' : function(){
			this.label.setText(
				(this._prefix ? this._prefix : '') +
				(this._text ? this._text : '') +
				(this._suffix ? this._suffix : '')
			);
		},


		'_onMouseOver' : function(evt){
			this.addCss(['mouse-hover']);
		},

		'_onMouseOut' : function(evt){
			this.removeCss(['mouse-hover']);
		},

		'_onMouseDown' : function(evt){
			this.addCss(['mouse-press']);
		},

		'_onMouseUp' : function(evt){
			this.removeCss(['mouse-press']);
		},


		// GETTER & SETTER FUNCTIONS
		'setIcon' : function(icon){
			if(isString(icon)){
				icon = new OjImage(icon);
			}

			if(this._icon == icon){
				return;
			}

			this.icon.removeAllChildren();

			if(this._icon = icon){
				this.icon.addChild(this._icon);
			}
		},

		'setUrl' : function(url){
			this._url = OjUrl.url(url);

			this.setAttr('href', this._url.toString());
		},

		'setTarget' : function(target){
			if(isComponent(target)){
				target = target.getTargetId();
			}

			if(this._target == target){
				return;
			}

			this.setAttr('target', this._target = target);
		}
	},
	{
		'BLANK'  : '_blank',
		'SELF'   : '_self',
		'PARENT' : '_parent',
		'TOP'    : '_top',

		'_TAGS' : ['a']
	}
);