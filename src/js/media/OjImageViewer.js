OJ.importJs('oj.views.OjView');
OJ.importJs('oj.media.OjImage');

OJ.importCss('oj.media.OjImageViewer');




OJ.extendComponent(
	'OjImageViewer', [OjView],
	{
		'_images' : null,


		'_constructor' : function(/*content, title, short_title*/){
			this._images = [];

			this._super(OjView, '_constructor', arguments);
		},


		'.content' : function(){
			return this._images.clone();
		},
		'=content' : function(content){
			this.removeAllElms();

			if(content){
				this._images = Array.array(content);

				var ln = this._images.length;

				for(; ln--;){
					this.insertElmAt(new OjImage(this._images[ln]), 0);
				}
			}
		}
	},
	{
		'_TAGS' : ['imageviewer']
	}
);