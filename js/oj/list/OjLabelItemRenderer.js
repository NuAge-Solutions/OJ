OJ.importJs('oj.components.OjItemRenderer');
OJ.importJs('oj.components.OjLabel');


OJ.extendClass(
	OjItemRenderer, 'OjLabelItemRenderer',
	{
		'_template' : 'oj.list.OjLabelItemRenderer',


		'_redrawData' : function(){
			if(this._super('OjLabelItemRenderer', '_redrawData', arguments)){
				this.lbl.setText(this._data);

				return true;
			}

			return false;
		}
	}
);