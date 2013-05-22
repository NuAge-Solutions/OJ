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

		'_template' : 'oj.components.OjLink',


		'_constructor' : function(/*label, url, target*/){
			this._super('OjLink', '_constructor', []);

			// setup structure
			this.addClasses('valign-middle');

			// process arguments
			var ln = arguments.length;

			if(ln){
				this.setText(arguments[0]);

				if(ln > 1){
					this.setUrl(arguments[1]);

					if(ln > 2){
						this.setTarget(arguments[2]);
					}
				}
			}
		},


		'_redrawText' : function(){
			this.label.setText(
				(this._prefix ? this._prefix : '') +
				(this._text ? this._text : '') +
				(this._suffix ? this._suffix : '')
			);
		},


		'_onMouseOver' : function(evt){
			this.addClasses('mouse-hover');
		},

		'_onMouseOut' : function(evt){
			this.removeClasses('mouse-hover');
		},

		'_onMouseDown' : function(evt){
			this.addClasses('mouse-press');
		},

		'_onMouseUp' : function(evt){
			this.removeClasses('mouse-press');
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