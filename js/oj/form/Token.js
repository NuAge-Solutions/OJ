OJ.importJs('oj.events.MouseEvent');
OJ.importJs('oj.list.ListItem');


'use strict';

OJ.compileClass(
	'OjToken',
	oj.form.Token = function(){
		return new oj.list.ListItem(
			arguments, 'OjToken',
			{
				'_template' : 'oj.form.Token',


				'_constructor' : function(/*data*/){
					this._super('OjToken', '_constructor', arguments);

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
	}
);