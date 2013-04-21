OJ.importJs('oj.components.ItemRenderer');
OJ.importJs('oj.components.Label');


OJ.extendClass(
	OjItemRenderer, 'OjLabelItemRenderer',
	{
		'_template' : 'oj.list.LabelItemRenderer',


		'_redrawData' : function(){
			if(this._s('OjLabelItemRenderer', '_redrawData', arguments)){
				this.lbl.setText(this._data);

				return true;
			}

			return false;
		}
	}
);