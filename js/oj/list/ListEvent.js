OJ.importJs('oj.events.Event');


'use strict';

OJ.compileClass(
	'OjListEvent',
	oj.list.ListEvent = function(){
		return new oj.events.Event(
			arguments, 'OjListEvent',
			{
				'_get_properties_' : {
					'item'  : null,
					'index' : null
				},


				'_constructor' : function(type, item, index/*, bubbles, cancelable*/){
					var args = [type];

					this._item = item;

					this._index = index;

					if(arguments.length > 2){
						args = args.slice.call(arguments, 2);
						args.splice(0, 0, type);
					}

					this._super('OjListEvent', '_constructor', args);
				}
			}
		)
	},
	{
		'ITEM_ADD'     : 'listItemAdd',
		'ITEM_MOVE'    : 'listItemMove',
		'ITEM_REMOVE'  : 'listItemRemove',
		'ITEM_REPLACE' : 'listItemReplace',

		'ITEM_CLICK' : 'listItemClick',
		'ITEM_OVER'  : 'listItemOver',
		'ITEM_OUT'   : 'listItemOut'
	}
);