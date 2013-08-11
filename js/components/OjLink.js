OJ.importJs('oj.components.OjLabel');
OJ.importJs('oj.media.OjImage');

OJ.importCss('oj.components.OjLink');

'use strict';

OJ.extendComponent(
	'OjLink', [OjLabel],
	{
		'_props_' : {
			'downIcon'     : null,
			'icon'         : null,
			'overIcon'     : null,
			'target'       : '_self', // WindowManager.SELF,
			'targetHeight' : null,
			'targetWidth'  : null,
			'url'          : null
		},

		'_v_align' : OjStyleElement.MIDDLE,

		'_template' : 'oj.components.OjLink',


		'_constructor' : function(/*label, url, target*/){
			var args = arguments,
				ln = args.length;

			this._super(OjLabel, '_constructor', []);

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

		'_destructor' : function(){
			// just to make sure that the document mouse move event listener gets removed
			OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onMouseMove');

			this._super(OjLabel, '_destructor', arguments);
		},


		'_processAttribute' : function(dom, attr, context){
			if(attr.nodeName == 'href'){
				this.setUrl(attr.value);

				return true;
			}

			return this._super(OjLabel, '_processAttribute', arguments);
		},


		'_redrawText' : function(){
			this.label.setText(
				(this._prefix ? this._prefix : '') +
				(this._text ? this._text : '') +
				(this._suffix ? this._suffix : '')
			);
		},

		'_updateIcon' : function(val){
			this.icon.removeAllChildren();

			if(val){
				this.icon.addChild(val);
			}
		},


		'_onClick' : function(evt){
			if(this._url){
				WindowManager.open(this._url, this._target, {'width' : this._targetWidth, 'height' : this._targetHeight});
			}
		},

		'_onMouseOver' : function(evt){
			if(this._overIcon){
				OJ.addEventListener(OjMouseEvent.MOVE, this, '_onMouseMove');

				this._updateIcon(this._overIcon);
			}
		},

		'_onMouseMove' : function(evt){
			if(!this.hitTestPoint(evt.getPageX(), evt.getPageY())){
				OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onMouseMove');

				this._updateIcon(this._icon);
			}
		},

		'_onMouseDown' : function(evt){
			if(this._downIcon){
				this._updateIcon(this._downIcon);

				this.addEventListener(OjMouseEvent.UP, this, '_onMouseUp');
			}
		},

		'_onMouseUp' : function(evt){
			this.removeEventListener(OjMouseEvent.UP, this, '_onMouseUp');

			this._updateIcon(this._icon);
		},


		// GETTER & SETTER FUNCTIONS
		'setDownIcon' : function(icon){
			if(this._downIcon == (icon = OjImage.image(icon))){
				return;
			}

			if(this._downIcon = icon){
				this.addEventListener(OjMouseEvent.DOWN, this, '_onMouseDown');
			}
			else{
				this.removeEventListener(OjMouseEvent.DOWN, this, '_onMouseDown');
				this.removeEventListener(OjMouseEvent.UP, this, '_onMouseUp');
			}
		},

		'setIcon' : function(icon){
			if(this._icon == (icon = OjImage.image(icon))){
				return;
			}

			this._updateIcon(this._icon = icon);
		},

		'setOverIcon' : function(icon){
			if(this._overIcon == (icon = OjImage.image(icon))){
				return;
			}

			if(this._overIcon = icon){
				this.addEventListener(OjMouseEvent.OVER, this, '_onMouseOver');
			}
			else{
				this.removeEventListener(OjMouseEvent.OVER, this, '_onMouseOver');
				OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onMouseMove');
			}
		},

		'setUrl' : function(url){
			if(this._url = OjUrl.url(url)){
				this.addEventListener(OjMouseEvent.CLICK, this, '_onClick');
			}
			else{
				this.removeEventListener(OjMouseEvent.CLICK, this, '_onClick');
			}
		},

		'setTarget' : function(target){
			if(isComponent(target)){
				target = target.getTargetId();
			}

			this._target = target;
		}
	},
	{
		'_TAGS' : ['a']
	}
);