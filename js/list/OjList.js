OJ.importJs('oj.components.OjCollectionComponent');
OJ.importJs('oj.list.OjListItem');
OJ.importJs('oj.list.OjListEvent');

OJ.importCss('oj.list.OjList');


OJ.extendComponent(
	'OjList', [OjICollectionComponent, OjView],
	{
		'_props_' : {
			'direction'    : null, // OjList.VERTICAL,
			'itemRenderer' : null
		},

    '_constructor' : function(/*data_provider, item_renderer, direction*/){
      this._super(OjView, '_constructor', arguments);

      // run the collection component setup
      this._setup();

      // setup the display
			this.addCss(['vertical']);
			this.container.addCss(['items', 'cf']);

      // process arguments
      this._processArguments(arguments, {
        'elms' : [],
        'itemRenderer' : OjListItem,
        'direction' : 'vertical'
      });
    },

    '_destructor' : function(){
      // run the collection component teardown
      this._teardown();

      this._super(OjView, '_destructor', arguments);
    },


    'addEventListener' : function(type, target, func){
      this._super(OjView, 'addEventListener', arguments);

      this._addItemListener(type);
    },

    'removeEventListener' : function(type, target, func){
      this._super(OjView, 'removeEventListener', arguments);

      this._removeItemListener(type);
    },


//		'_createItem' : function(data, index){
//			var key,
//				item = new this._itemRenderer(this, data);
//
//			this.addElmAt(item, index);
//
//			// add event listeners that have been added to the others
//			for(key in this._item_events){
//				item.addEventListener(key, this, this._item_events[key]);
//			}
//
//			return this._redrawItem(item, data, index);
//		},
//
//		'_destroyItem' : function(index){
//			OJ.destroy(this.removeElmAt(index), true);
//		},
//
//		'_redrawItem' : function(item, data, index){
//			if(!item){
//				return;
//			}
//
//			this._updateClasses(item, index);
//
//			item.setData(data);
//
//			return item;
//		},
//
//		'_redrawItems' : function(){
//			var new_ln = this.numItems(),
//				old_ln = this.numElms(),
//				delta = new_ln - old_ln,
//				i;
//
//			if(delta > 0){
//				for(i = 0; i < delta; i++){
//					this._createItem(this.getItemAt(old_ln + i), old_ln + i);
//				}
//			}
//			else if(delta < 0){
//				for(; old_ln-- > new_ln;){
//					this._destroyItem(old_ln);
//				}
//
//				old_ln = new_ln;
//			}
//
//			for(; old_ln--;){
//				this._redrawItem(this.getElmAt(old_ln), this.getItemAt(old_ln), old_ln);
//			}
//		},
//
		'_updateClasses' : function(item, index){
			var class_add = [],
        class_remove = [],
        ln = this.container.numChildren();

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
//		'redraw' : function(){
//			if(this._super(OjView, 'redraw', arguments)){
//				this._redrawItems();
//
//				return true;
//			}
//
//			return false;
//		},
//
//		'redrawItem' : function(item){
//			var index = this.indexOfItem(item);
//
//			this._redrawItem(this.getElmAt(index), item, index);
//		},
//
//		'redrawItemAt' : function(index){
//			this._redrawItem(this.getElmAt(index), this.getItemAt(index), index);
//		},
//
//
//		// event listener functions
//		'addEventListener' : function(type, target, func){
//			var ln,
//				item_evt, item_callback;
//
//			if(type == OjListEvent.ITEM_CLICK){
//				item_evt = OjMouseEvent.CLICK;
//				item_callback = '_onItemClick';
//			}
//			else if(type == OjListEvent.ITEM_OVER){
//				item_evt = OjMouseEvent.OVER;
//				item_callback = '_onItemOver';
//			}
//			else if(type == OjListEvent.ITEM_OUT){
//				item_evt = OjMouseEvent.OUT;
//				item_callback = '_onItemOut';
//			}
//
//			if(item_evt && !this._item_events[item_evt]){
//				ln = this.numItems();
//
//				for(; ln--;){
//					this.getElmAt(ln).addEventListener(item_evt, this, item_callback);
//				}
//
//				this._item_events[item_evt] = item_callback;
//			}
//
//			return this._super(OjView, 'addEventListener', arguments);
//		},
//
//		'removeEventListener' : function(type, target, func){
//			var rtrn = this._super(OjView, 'removeEventListener', arguments);
//
//			if(!this.hasEventListener(type)){
//				var item_evt, item_callback;
//
//				if(type == OjListEvent.ITEM_CLICK){
//					item_evt = OjMouseEvent.CLICK;
//					item_callback = '_onItemClick';
//				}
//				else if(type == OjListEvent.ITEM_OVER){
//					item_evt = OjMouseEvent.OVER;
//					item_callback = '_onItemOver';
//				}
//				else if(type == OjListEvent.ITEM_OUT){
//					item_evt = OjMouseEvent.OUT;
//					item_callback = '_onItemOut';
//				}
//
//				var ln = this.numItems();
//
//				while(ln-- > 0){
//					this.getElmAt(ln).removeEventListener(item_evt, this, item_callback);
//				}
//
//				delete this._item_events[item_evt];
//			}
//
//			return rtrn;
//		},

		'_onItemAdd' : function(evt){
      var item = this.renderItem(evt.getItem()),
          // update the classes on the other items now that there is a new guy in town
          ln = this.container.numChildren(),
          i = Math.max(evt.getIndex() - 1, 0);

      this.container.addChildAt(item, evt.getIndex());

      for(; ln-- > i;){
				this._updateClasses(this.container.getChildAt(ln), ln);
			}

      this._super(OjICollectionComponent, '_onItemAdd', arguments);
		},

		'_onItemMove' : function(evt){
      this._super(OjICollectionComponent, '_onItemMove', arguments);
//			var ln = this.numItems(),
//				i, item;
//
//			for(; ln--;){
//				item = this.getElmAt(ln);
//
//				if(item.getData() == evt.getItem()){
//					this.moveElm(item, evt.getIndex());
//
//					if(ln > evt.getIndex()){
//						i = evt.getIndex();
//					}
//					else{
//						i = ln;
//
//						ln = evt.getIndex();
//					}
//
//					for(; ln-- > i;){
//						this._updateClasses(this.getElmAt(ln), ln);
//					}
//
//					break;
//				}
//			}
//
//			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_MOVE, evt.getItem(), evt.getIndex()));
		},

		'_onItemRemove' : function(evt){
//		  this._destroyItem(evt.getIndex());
      var ln = this.container.numChildren() - 1,
          i = evt.getIndex();

      OJ.destroy(this.container.removeChildAt(i));

			for(i = Math.max(i - 1, 0); ln-- > i;){
				this._updateClasses(this.container.getChildAt(ln), ln);
			}

      this._super(OjICollectionComponent, '_onItemRemove', arguments);
		},

		'_onItemReplace' : function(evt){
      this._super(OjICollectionComponent, '_onItemReplace', arguments);
//			this._redrawItem(this.getElmAt(evt.getIndex()), evt.getItem(), evt.getIndex());
//
//			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_REPLACE, evt.getItem(), evt.getIndex()));
		},


		'_onItemClick' : function(evt){
      this._super(OjICollectionComponent, '_onItemClick', arguments);
//			var index = this.indexOfElm(evt.getCurrentTarget());
//
//			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_CLICK, this._dataProvider.getItemAt(index), index));
		},

		'_onItemOver' : function(evt){
      this._super(OjICollectionComponent, '_onItemOver', arguments);
//			var index = this.indexOfElm(evt.getCurrentTarget());
//
//			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_OVER, this._dataProvider.getItemAt(index), index));
		},

		'_onItemOut' : function(evt){
      this._super(OjICollectionComponent, '_onItemOut', arguments);
//			var index = this.indexOfElm(evt.getCurrentTarget());
//
//			this.dispatchEvent(new OjListEvent(OjListEvent.ITEM_OUT, this._dataProvider.getItemAt(index), index));
		},


		'setDirection' : function(direction){
			if(this._direction != direction){
				if(this._direction){
					this.container.removeCss([this._direction]);
				}

				this.container.addCss([this._direction = direction]);
			}
		}
	},
	{
		'HORIZONTAL' : 'horizontal',
		'VERTICAL'   : 'vertical',

		'_TAGS' : ['list']
	}
);