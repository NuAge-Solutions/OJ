OJ.importJs('oj.components.OjComponent');
OJ.importJs('oj.data.OjCollection');
OJ.importJs('oj.list.OjListItem');
OJ.importJs('oj.list.OjListEvent');

OJ.importCss('oj.list.OjList');


'use strict';

OJ.extendComponent(
	'OjList', [OjView],
	{
		'_props_' : {
			'dataProvider' : null,
			'direction'    : 'vertical', // OjList.VERTICAL,
			'itemRenderer' : OjListItem
		},

//		'_item_events' : null,


		'_constructor' : function(/*data_provider, item_renderer, direction*/){
			var args = arguments,
				ln = arguments.length;

			this._super(OjView, '_constructor', []);

			// setup the display
			this.addCss(['vertical']);
			this.container.addCss(['items', 'cf']);

			// process arguments
			this._item_events = {};

			if(ln){
				if(ln > 1){
					this.setItemRenderer(args[1]);

					if(ln > 2){
						this.setDirection(args[2]);
					}
				}

				this.setDataProvider(args[0]);
			}
			else{
				this.setDataProvider(new OjCollection());
			}
		},


		'_createItem' : function(data, index){
			var key,
				item = new this._itemRenderer(this, data);

			this.addElmAt(item, index);

			// add event listeners that have been added to the others
			for(key in this._item_events){
				item.addEventListener(key, this, this._item_events[key]);
			}

			return this._redrawItem(item, data, index);
		},

		'_destroyItem' : function(index){
			OJ.destroy(this.removeElmAt(index), true);
		},

		'_redrawItem' : function(item, data, index){
			if(!item){
				return;
			}

			this._updateClasses(item, index);

			item.setData(data);

			return item;
		},

		'_redrawItems' : function(){
			var new_ln = this.numItems(),
				old_ln = this.numElms(),
				delta = new_ln - old_ln,
				i;

			if(delta > 0){
				for(i = 0; i < delta; i++){
					this._createItem(this.getItemAt(old_ln + i), old_ln + i);
				}
			}
			else if(delta < 0){
				for(; old_ln-- > new_ln;){
					this._destroyItem(old_ln);
				}

				old_ln = new_ln;
			}

			for(; old_ln--;){
				this._redrawItem(this.getElmAt(old_ln), this.getItemAt(old_ln), old_ln);
			}
		},

		'_updateClasses' : function(item, index){
			var class_add = [];
			var class_remove = [];
			var ln = this.numItems();

			if(index == 0){
				class_add.push('first');
			}
			else{
				class_remove.push('first');
			}

			if(index + 1 == ln || ln == 1){
				class_add.push('last');
			}
			else{
				class_remove.push('last');
			}

			if(index == 0 || index % 2 == 0){
				class_add.push('even');

				class_remove.push('odd');
			}
			else{
				class_add.push('odd');

				class_remove.push('even');
			}

			item.addCss(class_add);
			item.removeCss(class_remove);
		},


		// render functions
		'redraw' : function(){
			if(this._super(OjView, 'redraw', arguments)){
				this._redrawItems();

				return true;
			}

			return false;
		},

		'redrawItem' : function(item){
			var index = this.indexOfItem(item);

			this._redrawItem(this.getElmAt(index), item, index);
		},

		'redrawItemAt' : function(index){
			this._redrawItem(this.getElmAt(index), this.getItemAt(index), index);
		},


		// item management functions
		'addItem' : function(item){
			return this._dataProvider.addItem(item);
		},

		'addItemAt' : function(item, index){
			return this._dataProvider.addItemAt(item, index);
		},

		'getItemAt' : function(index){
			return this._dataProvider.getItemAt(index);
		},

		'indexOfItem' : function(item){
			return this._dataProvider.indexOfItem(item);
		},

		'hasItem' : function(item){
			return this._dataProvider.hasItem(item);
		},

		'numItems' : function(){
			return this._dataProvider.numItems();
		},

		'removeItem' : function(item){
			return this._dataProvider.removeItem(item);
		},

		'removeItemAt' : function(index) {
			return this._dataProvider.removeItemAt(index);
		},


		// event listener functions
		'addEventListener' : function(type, target, func){
			var ln,
				item_evt, item_callback;

			if(type == OjListEvent.ITEM_CLICK){
				item_evt = OjMouseEvent.CLICK;
				item_callback = '_onItemClick';
			}
			else if(type == OjListEvent.ITEM_OVER){
				item_evt = OjMouseEvent.OVER;
				item_callback = '_onItemOver';
			}
			else if(type == OjListEvent.ITEM_OUT){
				item_evt = OjMouseEvent.OUT;
				item_callback = '_onItemOut';
			}

			if(item_evt && !this._item_events[item_evt]){
				ln = this.numItems();

				for(; ln--;){
					this.getElmAt(ln).addEventListener(item_evt, this, item_callback);
				}

				this._item_events[item_evt] = item_callback;
			}

			return this._super(OjView, 'addEventListener', arguments);
		},

		'removeEventListener' : function(type, target, func){
			var rtrn = this._super(OjView, 'removeEventListener', arguments);

			if(!this.hasEventListener(type)){
				var item_evt, item_callback;

				if(type == OjListEvent.ITEM_CLICK){
					item_evt = OjMouseEvent.CLICK;
					item_callback = '_onItemClick';
				}
				else if(type == OjListEvent.ITEM_OVER){
					item_evt = OjMouseEvent.OVER;
					item_callback = '_onItemOver';
				}
				else if(type == OjListEvent.ITEM_OUT){
					item_evt = OjMouseEvent.OUT;
					item_callback = '_onItemOut';
				}

				var ln = this.numItems();

				while(ln-- > 0){
					this.getElmAt(ln).removeEventListener(item_evt, this, item_callback);
				}

				delete this._item_events[item_evt];
			}

			return rtrn;
		},

		'_onItemAdd' : function(evt){
			var item = this._createItem(evt.getItem(), evt.getIndex()),
				// update the classes on the other items now that there is a new guy in town
				ln = this.numItems(),
				i = Math.max(evt.getIndex() - 1, 0);

			for(i; i < ln; i++){
				this._updateClasses(this.getElmAt(i), i);
			}

			item = ln = i = null;

			// let everyone else know that we just added an item
			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_ADD, evt.getItem(), evt.getIndex()));
		},

		'_onItemMove' : function(evt){
			var ln = this.numItems(),
				i, item;

			for(; ln--;){
				item = this.getElmAt(ln);

				if(item.getData() == evt.getItem()){
					this.moveElm(item, evt.getIndex());

					if(ln > evt.getIndex()){
						i = evt.getIndex();
					}
					else{
						i = ln;

						ln = evt.getIndex();
					}

					for(; ln-- > i;){
						this._updateClasses(this.getElmAt(ln), ln);
					}

					break;
				}
			}

			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_MOVE, evt.getItem(), evt.getIndex()));
		},

		'_onItemRemove' : function(evt){
			this._destroyItem(evt.getIndex());

			var ln = this.numItems(), i = Math.max(evt.getIndex() - 1, 0);

			for(i; i < ln; i++){
				this._updateClasses(this.getElmAt(i), i);
			}

			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_REMOVE, evt.getItem(), evt.getIndex()));
		},

		'_onItemReplace' : function(evt){
			this._redrawItem(this.getElmAt(evt.getIndex()), evt.getItem(), evt.getIndex());

			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_REPLACE, evt.getItem(), evt.getIndex()));
		},


		'_onItemClick' : function(evt){
			var index = this.indexOfElm(evt.getCurrentTarget());

			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_CLICK, this._dataProvider.getItemAt(index), index));
		},

		'_onItemOver' : function(evt){
			var index = this.indexOfElm(evt.getCurrentTarget());

			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_OVER, this._dataProvider.getItemAt(index), index));
		},

		'_onItemOut' : function(evt){
			var index = this.indexOfElm(evt.getCurrentTarget());

			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_OUT, this._dataProvider.getItemAt(index), index));
		},


		'setDataProvider' : function(dp){
			if(this._dataProvider == dp){
				return ;
			}

			// remove previous dp event listeners
			if(this._dataProvider){
				this._dataProvider.removeEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
				this._dataProvider.removeEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
				this._dataProvider.removeEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
				this._dataProvider.removeEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');
			}

			this._dataProvider = OjCollection.collection(dp);

			// make sure that we always have a valid dp object
			if(!this._dataProvider){
				this._dataProvider = new OjCollection();
			}

			// add event listeners for item changes
			this._dataProvider.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
			this._dataProvider.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
			this._dataProvider.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
			this._dataProvider.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');

			this.redraw(true);
		},


		'setDirection' : function(direction){
			if(this._direction != direction){
				if(this._direction){
					this.container.removeCss([this._direction]);
				}

				this.container.addCss([this._direction = direction]);
			}
		},

		'setItemRenderer' : function(renderer){
			this._itemRenderer = isString(renderer) ? window[renderer] : renderer;

			// todo: OjList - make change in item renderer force a redraw of all items
		}
	},
	{
		'HORIZONTAL' : 'horizontal',
		'VERTICAL'   : 'vertical',

		'_TAGS' : ['list']
	}
);