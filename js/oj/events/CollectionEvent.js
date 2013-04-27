OJ.importJs('oj.events.Event');


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
			var args = [type], ln = arguments.length;

			this._item = item;

			this._index = index;

			if(ln > 3){
				this._oldItem = arguments[3];

				if(ln > 4){
					args = Array.array(arguments);
					args.splice(1, 3);
				}
			}

			this._super('OjCollectionEvent', '_constructor', args);
		}
	},
	{
		'ITEM_ADD'     : 'onItemAdd',
		'ITEM_MOVE'    : 'onItemMove',
		'ITEM_REMOVE'  : 'onItemRemove',
		'ITEM_REPLACE' : 'onItemReplace'
	}
);