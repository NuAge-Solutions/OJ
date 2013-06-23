OJ.importJs('oj.events.OjEvent');


'use strict';

OJ.extendClass(
	OjEvent, 'OjCollectionEvent',
	{
		'_get_props_' : {
			'item'    : null,
			'index'   : null,
			'oldItem' : null
		},


		'_constructor' : function(type, item, index/*, old_item, bubbles, cancelable*/){
			var params = [type],
				args = arguments,
				ln = args.length;

			this._item = item;

			this._index = index;

			if(ln > 3){
				this._oldItem = args[3];

				if(ln > 4){
					params = Array.array(args);
					params.splice(1, 3);
				}
			}

			this._super('OjCollectionEvent', '_constructor', params);
		}
	},
	{
		'ITEM_ADD'     : 'onItemAdd',
		'ITEM_MOVE'    : 'onItemMove',
		'ITEM_REMOVE'  : 'onItemRemove',
		'ITEM_REPLACE' : 'onItemReplace'
	}
);