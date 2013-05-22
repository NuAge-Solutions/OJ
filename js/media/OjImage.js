OJ.importJs('oj.events.OjEvent');
OJ.importJs('oj.media.OjMedia');


'use strict';

OJ.extendComponent(
	OjMedia, 'OjImage',
	{
		'_callback' : null,


		'_destructor' : function(){
			this.media.dom().removeEventListener('load', this._callback);

			this._callback = null;

			return this._super('OjImage', '_destructor', arguments);
		},

		'_makeMedia' : function(){
			var media = new OjStyleElement('<img />');

			media.hide();

			media.dom().addEventListener('load', this._callback = this._onMediaLoad.bind(this));

			return media;
		},


		'_onMediaLoad' : function(evt){
			var rtrn = this._super('OjImage', '_onMediaLoad', arguments);

			this.media.show();

			return rtrn;
		},


		'_setSource' : function(url){
			// remove any old source css classes
			if(this._source_is_css){
				this.media.removeClasses(this._source.substring(1));
			}

			this._super('OjImage', '_setSource', arguments);

			this._loaded = false;

			if(url){
				// hide while loading
				this.media.hide();

				this.addChild(this.media);

				// check to see if this is a css class
				if(this._source_is_css){
					this.media.addClasses(url.substring(1));

					this.media.setAttr('src', OJ.getAssetPath('oj', 'empty.png'));

					this._onMediaLoad(null);
				}
				else{
					this.media.setAttr('src', url);
				}
			}
			else{
				this.removeChild(this.media);

				this.media.setAttr('src', null);
			}
		}
	},
	{
		'_TAGS' : ['img', 'image']
	}
);