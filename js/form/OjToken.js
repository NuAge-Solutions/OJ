OJ.importJs('oj.components.OjItemRenderer');
OJ.importJs('oj.events.OjMouseEvent');


'use strict';

OJ.extendClass(
	'OjToken', [OjItemRenderer],
	{
		'_template' : 'oj.form.OjToken',


		'_constructor' : function(/*data*/){
			this._super(OjItemRenderer, '_constructor', arguments);

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