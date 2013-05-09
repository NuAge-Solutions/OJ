OJ.importJs('oj.nav.OjView');
OJ.importJs('oj.media.OjImage');

OJ.importCss('oj.media.OjImageViewer');


'use strict';

OJ.extendComponent(
	OjView, 'OjImageViewer',
	{
		'_images' : null,


		'_constructor' : function(/*content, title, short_title*/){
			this._images = [];

			this._super('OjImageViewer', '_constructor', arguments);
		},


		'getContent' : function(){
			return this._images.clone();
		},
		'setContent' : function(content){
			this.removeAllElms();

			if(content){
				this._images = Array.array(content);

				var ln = this._images.length;

				for(; ln--;){
					this.addElmAt(new OjImage(this._images[ln]), 0);
				}
			}
		}
	},
	{
		'_TAGS' : ['imageviewer']
	}
);