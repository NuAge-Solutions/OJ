OJ.importJs('oj.components.OjComponent');


'use strict';

OJ.extendComponent(
	'OjItemRenderer', [OjComponent],
	{
		'_props_' : {
			'data'  : null,
			'group' : null
		},


		'_constructor' : function(/*group, data*/){
			this._super(OjComponent, '_constructor', []);

			var args = arguments,
				ln = args.length;

			if(ln){
				this.setGroup(args[0]);

				if(ln > 1){
					this.setData(args[1]);
				}
			}
		},


		'_redrawData' : function(){
			return this._is_displayed;
		},


		'redraw' : function(){
			if(this._super(OjComponent, 'redraw', arguments)){
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