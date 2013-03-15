OJ.importJs('oj.components.Component');


'use strict';

OJ.extendComponent(
	OjComponent, 'OjItemRenderer',
	{
		'_props_' : {
			'data'  : null,
			'group' : null
		},


		'_constructor' : function(group/*, data*/){
			this._s('OjItemRenderer', '_constructor', []);

			this.setGroup(group);

			if(arguments.length > 1){
				this.setData(arguments[1]);
			}
		},


		'_redrawData' : function(){
			return this._is_displayed;
		},


		'redraw' : function(){
			if(this._s('OjItemRenderer', 'redraw', arguments)){
				this._redrawData();

				return true;
			}

			return false;
		},


		'setData' : function(data){
			if(this._data == data){
				return;
			}

			this._data = data;

			this._redrawData();
		}
	},
	{
		'_TAGS' : ['item']
	}
);