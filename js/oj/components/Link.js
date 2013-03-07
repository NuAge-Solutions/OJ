OJ.importJs('oj.components.Label');
OJ.importJs('oj.media.Image');


'use strict';

OJ.compileComponent(
	'OjLink',
	oj.components.Link = function(){
		return new oj.components.Label(
			arguments, 'OjLink',
			{
				'_properties_' : {
					'url'      : null,
					'icon'     : null,
					'target'   : null
				},

				'_template' : 'oj.components.Link',


				'_constructor' : function(/*url, label, target*/){
					this._super('OjLink', '_constructor', []);

					// setup structure
					this.addClasses('valign-middle');

					// process arguments
					var ln = arguments.length;

					if(ln){
						this.setUrl(arguments[0]);

						if(ln > 1){
							this.setText(arguments[1]);

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
					if(isString(icon) && icon.charAt(0) == '@'){
						icon = new OjImage(icon);
					}

					if(this._icon == icon){
						return;
					}

					this.icon.removeAllChildren();

					this.icon.addChild(this._icon = icon);
				},

				'setUrl' : function(url){
					this._url = OjUrl.url(url);

					this.setAttr('href', this._url.toString());
				},

				'setTarget' : function(target){
					if(isComponent(target)){
						target = target.getTargetId();
					}

					this.setAttr('target', this._target = target);
				}
			}
		);
	},
	{
		'BLANK'  : '_blank',
		'SELF'   : '_self',
		'PARENT' : '_parent',
		'TOP'    : '_top',

		'SUPPORTED_TAGS' : ['a']
	}
);