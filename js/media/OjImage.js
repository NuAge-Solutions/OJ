OJ.importJs('oj.events.OjEvent');
OJ.importJs('oj.media.OjMedia');


'use strict';

OJ.extendComponent(
	OjMedia, 'OjImage',
	{
		'_source_is_css' : false,

		// todo: OjImage handle upscaling....

		'_destructor' : function(){
			if(this._img){
				this._img.removeEventListener('load', this._callback);
			}

			this._callback = this._img = null;

			return this._super('OjImage', '_destructor', arguments);
		},


		'_load' : function(){
			if(!this._source_is_css && this._img){
				this._loaded = false;

				this._img.src = this._source;
			}
		},

		'_makeMedia' : function(){


			return this._super('OjImage', '_makeMedia', arguments);
		},

		'_resize' : function(){
			this.removeCss(this._resize_vals);

			if(this._resizeBy == this._static.NONE){
				return;
			}

			this.addCss([this._resizeBy]);
		},


		'_onMediaLoad' : function(evt){
			var rtrn = this._super('OjImage', '_onMediaLoad', arguments);

			if(this._source_is_css){
				this._media.addCss([this._source.substring(1)]);

				this._original_w = this._media.getWidth();
				this._original_h = this._media.getHeight();
			}
			else{
				this._original_w = this._img.width;
				this._original_h = this._img.height;

				if(!this.getWidth()){
					this.setWidth(this._original_w);
				}

				if(!this.getHeight()){
					this.setHeight(this._original_h);
				}

				this._setStyle('backgroundImage', 'url(' + this._source + ')');
			}

			return rtrn;
		},


		'_setSource' : function(url){
			// cleanup old source
			if(this._source_is_css){
				// remove old source css class
				this._media.removeCss([this._source.substring(1)]);
			}
			else{
				// remove old source background image
				this._setStyle('backgroundImage', null);
			}

			this._super('OjImage', '_setSource', arguments);

			if(url){
				// check to see if this is a css class
				if(this._source_is_css = (this._source.charAt(0) == '@')){
					// if the media holder doesn't exist then create it
					if(!this._media){
						this.addChild(this._media = this._makeMedia());
					}

					// trigger the image load since its already loaded
					this._onMediaLoad(null);
				}
				else{
					// if previous source was a css image then remove the media holder
					if(this._media){
						this._unset('_media');
					}

					// make sure we have an image loader object
					if(!this._img){
						this._img = new Image();
						this._img.addEventListener('load', this._callback = this._onMediaLoad.bind(this));
					}
				}
			}
		}
	},
	{
		'_TAGS' : ['img', 'image'],

		'image' : function(img){
			if(isString(img)){
				return new OjImage(img);
			}

			if(img.is('OjImage')){
				return img;
			}

			return null;
		}
	}
);