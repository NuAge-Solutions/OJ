OJ.importJs('oj.components.OjLabel');
OJ.importJs('oj.media.OjIcon');
OJ.importJs('oj.media.OjImage');

OJ.importCss('oj.components.OjLink');


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
			this._super(OjLabel, '_constructor', []);

			this._processArguments(arguments, {
				'text' : undefined,
				'url' : undefined,
				'target' : undefined
			});
		},

		'_destructor' : function(){
			// just to make sure that the document mouse move event listener gets removed
			OJ.removeEventListener(OjUiEvent.MOVE, this, '_onMouseMove');

			this._super(OjLabel, '_destructor', arguments);
		},


		'_processAttribute' : function(dom, attr, context){
			if(attr.nodeName == 'href'){
				this.url = attr.value;

				return true;
			}

			return this._super(OjLabel, '_processAttribute', arguments);
		},

        '_processDomSourceChild' : function(){
            var self = this,
                child = self._super(OjLabel, '_processDomSourceChild', arguments);

            if(child && (child.is(OjIcon) || child.is(OjImage))){
                self.icon = child;

                return;
            }

            return child;
        },


		'_redrawText' : function(){
            var self = this;

			self.lbl.text = (self.prefix || '') + (self.text || '') + (self.suffix || '');
		},

		'_updateIcon' : function(val){
            this.icn.removeAllChildren();

			if(val){
				this.icn.appendChild(val);
			}
		},


		'_onClick' : function(evt){
            var url = this.url;

			if(url){
                WindowManager.open(url, this.target, {
                    'width' : this.targetWidth,
                    'height' : this.targetHeight
                });
			}
		},

		'_onMouseOver' : function(evt){
			if(this._overIcon){
				OJ.addEventListener(OjUiEvent.MOVE, this, '_onMouseMove');

				this._updateIcon(this._overIcon);
			}
		},

		'_onMouseMove' : function(evt){
			if(!this.hitTestPoint(evt.pageX, evt.pageY)){
				OJ.removeEventListener(OjUiEvent.MOVE, this, '_onMouseMove');

				this._updateIcon(this._icon);
			}
		},

		'_onMouseDown' : function(evt){
			if(this._downIcon){
				this._updateIcon(this._downIcon);

				this.addEventListener(OjUiEvent.UP, this, '_onMouseUp');
			}
		},

		'_onMouseUp' : function(evt){
			this.removeEventListener(OjUiEvent.UP, this, '_onMouseUp');

			this._updateIcon(this._icon);
		},


		// GETTER & SETTER FUNCTIONS
		'=downIcon' : function(icon){
			if(this._downIcon == (icon = OjImage.image(icon))){
				return;
			}

			if(this._downIcon = icon){
				this.addEventListener(OjUiEvent.DOWN, this, '_onMouseDown');
			}
			else{
				this.removeEventListener(OjUiEvent.DOWN, this, '_onMouseDown');
				this.removeEventListener(OjUiEvent.UP, this, '_onMouseUp');
			}
		},

		'=icon' : function(icon){
            var self = this;

            if(!isObjective(icon, OjIcon)){
                icon = OjImage.image(icon);  // todo: revisit this to process as icon if css based and not image
            }

            if(self._icon == icon){
				return;
			}

			self._updateIcon(self._icon = icon);
		},

		'=overIcon' : function(icon){
			if(this._overIcon == (icon = OjImage.image(icon))){
				return;
			}

			if(this._overIcon = icon){
				this.addEventListener(OjUiEvent.OVER, this, '_onMouseOver');
			}
			else{
				this.removeEventListener(OjUiEvent.OVER, this, '_onMouseOver');

				OJ.removeEventListener(OjUiEvent.MOVE, this, '_onMouseMove');
			}
		},

		'=url' : function(url){
			if(this._url = OjUrl.url(url)){
				this.addEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
			else{
				this.removeEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
		},

		'=target' : function(target){
			if(isComponent(target)){
				target = target.id;
			}

			this._target = target;
        }
	},
	{
		'_TAGS' : ['a']
	}
);