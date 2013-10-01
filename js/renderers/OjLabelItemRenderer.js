OJ.importJs('oj.renderers.OjItemRenderer');
OJ.importJs('oj.components.OjLabel');


OJ.extendClass(
	'OjLabelItemRenderer', [OjItemRenderer],
	{
		'_template' : 'oj.renderers.OjLabelItemRenderer',


		'_redrawData' : function(){
			if(this._super(OjItemRenderer, '_redrawData', arguments)){
				this.lbl.setText(this._data);

				return true;
			}

			return false;
		}
	}
);