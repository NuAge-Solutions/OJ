OJ.importJs('oj.components.OjSpinner');
OJ.importJs('oj.events.OjEvent');

OJ.importCss('oj.media.OjMedia');


'use strict';

OJ.extendClass(
	'OjMedia', [OjComponent],
	{
		'_props_' : {
			'preload'     : false,
			'resizeBy'    : 'none', // OjMedia.NONE
			'source'      : null,
			'showSpinner' : false,
			'spinnerTint' : '#333'
		},

		'_height' : 0,  '_loaded' : false,  '_resize_vals' : ['none', 'fill', 'fit', 'hFill', 'wFill'],  '_width' : 0,

		'_h_align' : OjStyleElement.CENTER,
		'_v_align' : OjStyleElement.MIDDLE,


		'_constructor' : function(/*source*/){
			this._super(OjComponent, '_constructor', []);

			if(arguments.length){
				this.setSource(arguments[0]);
			}
		},

		'_destructor' : function(){
			this._unset('media');
			this._unset('loading');

			return this._super(OjComponent, '_destructor', arguments);
		},


		'_load' : function(){

		},

		'_makeMedia' : function(){
			return new OjStyleElement('<div class="media"></div>');
		},

		'_resize' : function(){
			if(!this._media){
				return;
			}

			if(this._source_is_css){
				this._media.setWidth(OjStyleElement.AUTO);
				this._media.setHeight(OjStyleElement.AUTO);

				return;
			}

			var w = this._getStyleBackup('width'),
				h = this._getStyleBackup('height');

			if(!isEmpty(w)){
				this._media.setWidth('100', '%');

				if(h){
					this._media.setHeight('100', '%');
				}
				else{
					this._media.setHeight(OjStyleElement.AUTO);
				}
			}
			else if(!isEmpty(h)){
				this._media.setHeight('100', '%');

				this._media.setWidth(OjStyleElement.AUTO);
			}
			else if(this._resizeBy == this._static.WIDTH){
				this._media.setWidth('100', '%');
				this._media.setHeight(OjStyleElement.AUTO);
			}
			else{
				this._media.setHeight('100', '%');
				this._media.setWidth(OjStyleElement.AUTO);

				var w2 = this.getWidth();

				if(w > w2){
					this._media.setMarginLeft((w2 - w) / 2);
				}
			}
		},

		'_setIsDisplayed' : function(displayed){
			this._super(OjComponent, '_setIsDisplayed', arguments);

			if(displayed && !this._loaded){
				this._load();
			}
		},

		'_setSource' : function(url){
			this._source = url;
		},


		'_onMediaLoad' : function(evt){
			this._unset('loading');

			this._loaded = true;

			if(this._media){
				// make sure we don't allow up-scaling
				if(this._original_w){
					this._media.setMaxWidth(this._original_w);
				}

				if(this._original_h){
					this._media.setMaxHeight(this._original_h);
				}
			}

			this._resize();

			this.dispatchEvent(new OjEvent(OjEvent.LOAD));
		},


		'isLoaded' : function(){
			return this._loaded;
		},

		'load' : function(){
			if(!this._loaded){
				this._load();
			}
		},


		// Getter & Setter Functions
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

			this._loaded = false;

			if(!this.loading && this._showSpinner){
				this.addChild(this.loading = new OjSpinner(this._spinnerTint));
			}

			this._setSource(url);

			if(this._preload || this._is_displayed){
				this._load();
			}
		},

		'setResizeBy' : function(val){
			if(this._resizeBy == val){
				return;
			}

			this._resizeBy = this._resize_vals.indexOf(val) > -1 ? val : this._static.NONE;

			this._resize();
		},

		'_setHeight' : function(val){
			this._super(OjComponent, '_setHeight', arguments);

			this._height = val

//			this._resize();
		},

		'_setWidth' : function(val){
			this._super(OjComponent, '_setWidth', arguments);

			this._width = val;

//			this._resize();
		}
	},
	{
		'NONE'   : 'none',
		'FILL'   : 'fill',
		'FIT'    : 'fit',
		'HEIGHT' : 'hFill',
		'WIDTH'  : 'wFill'
	}
);