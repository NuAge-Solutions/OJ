OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.events.CollectionEvent');


'use strict';

OJ.extendClass(
	OjActionable, 'OjCollection',
	{
		'_props_' : {
			'allowDuplicate' : true,
			'items' : null
		},


		'_constructor' : function(/*items*/){
			this._s('OjCollection', '_constructor', []);

			this._items = [];

			if(arguments.length){
				this.setItems(arguments[0]);
			}
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

			while(ln-- > 0){
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

		'reverse' : function(){
			//
		},

		'sort' : function(/*sort_func*/){
			var orig = this._items.clone();

			if(arguments.length){
				this._items.sort(arguments[0]);
			}
			else{
				this._items.sort();
			}

			var ln = this._items.length;

			while(ln-- > 0){
				if(this._items[ln] != orig[ln]){
					this.dispatchEvent(new OjCollectionEvent(OjCollectionEvent.ITEM_MOVE, this._items[ln], ln));
				}
			}
		},

		'setItemAt' : function(item, index){
			if(!this._allowDuplicate && this.hasItem(item)){
				// throw warning of duplicate
				return;
			}

			var old_item = this._items.splice(index, 1, item)[0];

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
			var ln, old_ln = this._items.length, diff;

			if(isObject(items)){
				if(isObjective(items) && items.is('OjCollection')){
					items = items.getItems();
				}
				else{
					var ary = [];

					for(var key in items){
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

				while(diff-- > 0){
					this.removeItemAt(--old_ln);
				}
			}

			while(ln-- > 0){
				if(ln >= old_ln){
					this.addItemAt(items[ln], 0);
				}
				else{
					this.setItemAt(items[ln], ln);
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

		this._items = new OjCollection();
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
		return this._items ? this._items.getItemAt(index) : null;
	},

	'getItems' : function(){
		return this._items ? this._items.getItems() : [];
	},

	'hasItem' : function(item){
		return this._items ? this._items.hasItem(item) : false;
	},

	'indexOfItem' : function(item){
		return this._items ? this._items.indexOfItem(item) : -1;
	},

	'numItems' : function(){
		return this._items ? this._items.numItems() : 0;
	},

	'removeAllItems' : function(){
		if(this._items){
			this._items.removeAll();
		}
	},

	'removeItem' : function(item){
		if(this._items){
			this._items.removeItem(item);
		}
	},

	'removeItemAt' : function(index){
		if(this._items){
			this._items.removeItemAt(index);
		}
	},

	'reverse' : function(){
		if(this._items){
			this._items.reverse();
		}
	},

	'sort' : function(/*sort_func*/){
		if(this._items){
			this._items.sort.apply(this._items, arguments);
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