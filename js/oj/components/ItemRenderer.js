OJ.importJs('oj.components.Component');


'use strict';

OJ.compileComponent(
	'OjItemRenderer',
	oj.components.ItemRenderer = function(){
		return new oj.components.Component(
			arguments, 'OjItemRenderer',
			{
				'_properties_' : {
					'data'  : null,
					'group' : null
				},


				'_constructor' : function(group/*, data*/){
					this._super('OjItemRenderer', '_constructor', []);

					this.setGroup(group);

					if(arguments.length > 1){
						this.setData(arguments[1]);
					}
				},


				'_redrawData' : function(){
					return this._is_displayed;
				},


				'redraw' : function(){
					if(this._super('OjItemRenderer', 'redraw', arguments)){
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
				'SUPPORTED_TAGS' : ['item']
			}
		);
	}
);