OJ.importJs('oj.events.Event');


'use strict';

OJ.extendClass(
	OjEvent, 'OjListEvent',
	{
		'_get_props_' : {
			'item'  : null,
			'index' : null
		},


		'_constructor' : function(type, item, index/*, bubbles, cancelable*/){
			var args = [type];

			this._item = item;

			this._index = index;

			if(arguments.length > 2){
				args = args.slice.call(arguments, 2);
				args.unshift(type);
			}

			this._s('OjListEvent', '_constructor', args);
		}
	},
	{
		'ITEM_ADD'     : 'onItemAdd',
		'ITEM_MOVE'    : 'onItemMove',
		'ITEM_REMOVE'  : 'onItemRemove',
		'ITEM_REPLACE' : 'onItemReplace',

		'ITEM_CLICK' : 'onItemClick',
		'ITEM_OVER'  : 'onItemOver',
		'ITEM_OUT'   : 'onItemOut'
	}
);