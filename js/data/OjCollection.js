OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.events.OjCollectionEvent');


'use strict';

OJ.extendClass(
	'OjCollection', [OjActionable],
	{
		'_props_' : {
			'allowDuplicate' : true,
			'items' : null
		},


		'_constructor' : function(/*items*/){
			var args = arguments;

			this._super(OjActionable, '_constructor', []);

			this._items = [];

			if(args.length){
				this.setItems(args[0]);
			}
		},

		'_destructor' : function(){
			this._items = null;

			return this._super(OjActionable, '_destructor', arguments);
		},


		'addItem' : function(item){
			return this.addItemAt(item, this.numItems());
		},

		'addItemAt' : function(item, index){
			if(!this._allowDuplicate && this.hasItem(item)){
				// throw warning of duplicate
				return;
			}

			this._items.splice(index, 0, item);

			this.dispatchEvent(new OjCollectionEvent(OjCollectionEvent.ITEM_ADD, item, index));

			return item;
		},

		'getItemAt' : function(index){
			return this._items[index];
		},

		'hasItem' : function(item){
			return this.indexOfItem(item) != -1;
		},

		'indexOfItem' : function(item){
			return this._items.indexOf(item);
		},

		'numItems' : function(){
			return this._items.length;
		},

		'removeAllItems' : function(){
			var ln = this.numItems();

			for(; ln--;){
				this.removeItemAt(ln);
			}
		},

		'removeItem' : function(item){
			return this.removeItemAt(this.indexOfItem(item));
		},

		'removeItemAt' : function(index){
			if(index < 0){
				return;
			}

			var item = this._items.splice(index, 1)[0];

			this.dispatchEvent(new OjCollectionEvent(OjCollectionEvent.ITEM_REMOVE, item, index));

			return item;
		},

		'replaceItem' : function(oldItem, newItem){
			return this.replaceItemAt(this.indexOfItem(oldItem), newItem);
		},

		'replaceItemAt' : function(index, newItem){
			if(index > -1 && index < this.numItems()){
				return this._items.splice(index, 1, newItem)[0];
			}

			return null;
		},

		'reverse' : function(){
			//
		},

		'sort' : function(/*sort_func*/){
			var args = arguments, ln,
				orig = this._items.clone();

			if(args.length){
				this._items.sort(args[0]);
			}
			else{
				this._items.sort();
			}

			ln = this._items.length;

			for(; ln--;){
				if(this._items[ln] != orig[ln]){
					this.dispatchEvent(new OjCollectionEvent(OjCollectionEvent.ITEM_MOVE, this._items[ln], ln));
				}
			}
		},

		'setItemAt' : function(item, index){
			var old_item;

			if(!this._allowDuplicate && this.hasItem(item)){
				// throw warning of duplicate
				return;
			}

			old_item = this._items.splice(index, 1, item)[0];

			// if no change don't do anything
			if(old_item == item){
				return;
			}

			this.dispatchEvent(new OjCollectionEvent(OjCollectionEvent.ITEM_REPLACE, item, index));

			return old_item;
		},


		'getItems' : function(){
			return this._items.clone();
		},

		'setItems' : function(items){
			var key, ary, diff,
				i = 0,
				ln,
				old_ln = this._items.length;

			if(isObject(items)){
				if(isObjective(items) && items.is('OjCollection')){
					items = items.getItems();
				}
				else{
					ary = [];

					for(key in items){
						ary.push(items[key]);
					}

					items = ary;
				}
			}
			else if(!isArray(items)){
				items = [];
			}

			ln = items.length;

			if(old_ln > ln){
				diff = old_ln - ln;

				for(; diff--;){
					this.removeItemAt(--old_ln);
				}
			}

			for(; i < ln; i++){
				if(i < old_ln){
					this.setItemAt(items[i], i);
				}
				else{
					this.addItem(items[i]);
				}
			}
		}
	},
	{
		'collection' : function(obj){
			return isArray(obj) || !isObjective(obj) ? new OjCollection(obj) : obj;
		}
	}
);

// setup collection interface
window.OjICollection = {
	'_prepareItems' : function(){
		if(this._items){
			return;
		}

		return this._items = new OjCollection();
	},

	'addItem' : function(item){
		this._prepareItems();

		this._items.addItem(item);
	},

	'addItemAt' : function(item, index){
		this._prepareItems();

		this._items.addItemAt(item);
	},

	'getItemAt' : function(index){
		var items = this._items;

		return items ? items.getItemAt(index) : null;
	},

	'getItems' : function(){
		var items = this._items;

		return items ? items.getItems() : [];
	},

	'hasItem' : function(item){
		var items = this._items;

		return items ? items.hasItem(item) : false;
	},

	'indexOfItem' : function(item){
		var items = this._items;

		return items ? items.indexOfItem(item) : -1;
	},

	'numItems' : function(){
		var items = this._items;

		return items ? items.numItems() : 0;
	},

	'removeAllItems' : function(){
		var items = this._items;

		if(items){
			items.removeAll();
		}
	},

	'removeItem' : function(item){
		if(this._items){
			this._items.removeItem(item);
		}
	},

	'removeItemAt' : function(index){
		var items = this._items;

		if(items){
			items.removeItemAt(index);
		}
	},

	'reverse' : function(){
		var items = this._items;

		if(items){
			items.reverse();
		}
	},

	'sort' : function(/*sort_func*/){
		var items = this._items;

		if(items){
			items.sort.apply(items, arguments);
		}
	},

	'setItemAt' : function(item, index){
		this._prepareItems();

		this._items.setItemAt(item, index);
	},

	'setItems' : function(items){
		this._prepareItems();

		this._items.setItems(items);
	}
};