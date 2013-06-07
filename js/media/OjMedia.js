OJ.importJs('oj.components.OjSpinner');
OJ.importJs('oj.events.OjEvent');

OJ.importCss('oj.media.OjMedia');


'use strict';

OJ.extendClass(
	OjComponent, 'OjMedia',
	{
		'_props_' : {
			'resizeBy'    : 'width',
			'source'      : null,
			'showSpinner' : false,
			'spinnerTint' : '#333'
		},

		'_loaded' : false,  '_source_is_css' : false,

		'_h_align' : OjStyleElement.CENTER,
		'_v_align' : OjStyleElement.MIDDLE,


		'_constructor' : function(/*source*/){
			this._super('OjMedia', '_constructor', []);

			if((this.media = this._makeMedia()) && isObjective(this.media)){
				this.media.addCss('media');

				this.addChild(this.media);
			}

			if(arguments.length){
				this.setSource(arguments[0]);
			}
		},

		'_destructor' : function(){
			this._unset('media');
			this._unset('loading');

			return this._super('OjMedia', '_destructor', arguments);
		},

		'_makeMedia' : function(){ },

		'_resize' : function(){
			if(this._source_is_css){
				this.media.setWidth(OjStyleElement.AUTO);
				this.media.setHeight(OjStyleElement.AUTO);

				return;
			}

			var w = this._getStyleBackup('width'),
				h = this._getStyleBackup('height');

			if(!isEmpty(w)){
				this.media.setWidth('100', '%');

				if(h){
					this.media.setHeight('100', '%');
				}
				else{
					this.media.setHeight(OjStyleElement.AUTO);
				}
			}
			else if(!isEmpty(h)){
				this.media.setHeight('100', '%');

				this.media.setWidth(OjStyleElement.AUTO);
			}
			else if(this._resizeBy == this._static.WIDTH){
				this.media.setWidth('100', '%');
				this.media.setHeight(OjStyleElement.AUTO);
			}
			else{
				this.media.setHeight('100', '%');
				this.media.setWidth(OjStyleElement.AUTO);

				var w2 = this.getWidth();

				if(w > w2){
					this.media.setMarginLeft((w2 - w) / 2);
				}
			}
		},

		'_setSource' : function(url){
			this._source_is_css = (this._source = url).charAt(0) == '@'

			// reset the sizing
			this.media.setWidth(OjStyleElement.AUTO);
			this.media.setHeight(OjStyleElement.AUTO);

			this.media.setMaxWidth(OjStyleElement.AUTO);
			this.media.setMaxHeight(OjStyleElement.AUTO);
		},


		'_onMediaLoad' : function(evt){
			this._unset('loading');

			this._loaded = true;

			if(this._source_is_css){
				this._original_w = this.media.getWidth();
				this._original_h = this.media.getHeight();
			}
			else{
				this._original_w = this.media.dom().width;
				this._original_h = this.media.dom().height;
			}

			// make sure we don't allow up-scaling
			if(this._original_w){
				this.media.setMaxWidth(this._original_w);
			}

			if(this._original_h){
				this.media.setMaxHeight(this._original_h);
			}

			this._resize();

			this.dispatchEvent(new OjEvent(OjEvent.LOAD));
		},


		'isLoaded' : function(){
			return this._loaded;
		},


		// Getter & Setter Functions
		'setHeight' : function(val){
			this._super('OjMedia', 'setHeight', arguments);

			if(val == OjStyleElement.AUTO || arguments.length > 1){
				this._resize();
			}
		},

		'setInnerHeight' : function(val){
			this._super('OjMedia', 'setInnerHeight', arguments);

			this._resize();
		},
		'setInnerWidth' : function(val){
			this._super('OjMedia', 'setInnerWidth', arguments);

			this._resize();
		},

		'getOriginalHeight' : function(){
			return this._original_h;
		},

		'getOriginalWidth' : function(){
			return this._original_w;
		},

		'setSource' : function(url){
			if(Array.isArray(url)){
				url = url.join(', ');
			}
			else if(url){
				url = url.toString();
			}

			// make sure we don't do extra work with loading the same media twice
			if(this._source == url){
				return;
			}

			if(!this.loading && this._showSpinner){
				this.addChild(this.loading = new OjSpinner(this._spinnerTint));
			}

			this._setSource(url);
		},

		'setResizeBy' : function(val){
			if(this._resizeBy == val){
				return;
			}

			this._resizeBy = val;

			this._resize();
		},

		'setWidth' : function(val){
			this._super('OjMedia', 'setWidth', arguments);

			if(val == OjStyleElement.AUTO || arguments.length > 1){
				this._resize();
			}
		}
	},
	{
		'HEIGHT' : 'height',
		'WIDTH'  : 'width'
	}
);