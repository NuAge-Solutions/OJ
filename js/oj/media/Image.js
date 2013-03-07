OJ.importJs('oj.events.Event');
OJ.importJs('oj.media.Media');


'use strict';

OJ.compileComponent(
	'OjImage',
	oj.media.Image = function(){
		return new oj.media.Media(
			arguments, 'OjImage',
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
					if(this._source && this._source.charAt(0) == '@'){
						this.media.removeClasses(this._source);
					}

					this._super('OjImage', '_setSource', arguments);

					this._loaded = false;

					if(url){
						// hide while loading
						this.media.hide();

						this.addChild(this.media);

						// check to see if this is a css class
						if(url.charAt(0) == '@'){
							this.media.addClasses(url.substring(1));

							this.media.setAttr('src', OJ.getAssetPath('oj/empty.png'));

							this._onMediaLoad(null);
						}
						else{
							this.media.setAttr('src', url);
						}
					}
					else{
						this.removeChild(media);

						this.media.setAttr('src', null);
					}
				}
			}
		);
	},
	{
		'SUPPORTED_TAGS' : ['img', 'image']
	}
);