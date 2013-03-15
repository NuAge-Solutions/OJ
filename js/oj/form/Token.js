OJ.importJs('oj.components.ItemRenderer');
OJ.importJs('oj.events.MouseEvent');


'use strict';

OJ.extendClass(
	OjItemRenderer, 'OjToken',
	{
		'_template' : 'oj.form.Token',


		'_constructor' : function(/*data*/){
			this._s('OjToken', '_constructor', arguments);

			this.removeBtn.addEventListener(OjMouseEvent.CLICK, this, '_onRemoveClick');
		},


		'_redrawData' : function(){
			this.item.setText(this._data.toString());
		},


		'_onRemoveClick' : function(evt){
			this._list.removeItem(this._data);
		}
	}
);