OJ.importJs('oj.data.OjCollection');
OJ.importJs('oj.components.OjComponent');
OJ.importJs('oj.events.OjCollectionEvent');


OJ.defineClass(
  'OjICollectionComponent', {
    // properties
    '_props_' : {
      'itemRenderer' : null
    },

  //  '_item_events' : null,  '_items' : null,  '_rendered' : null,  '_renderer' : null,


    // helper functions
    '_getContainer' : function(){
      return this._items;
    },

    '_setElmFuncs' : function(container){
      return this._elm_funcs = {
        'addElm'        : 'addItem',
        'addElmAt'      : 'addItemAt',
        'getElmAt'      : 'getItemAt',
        'getElms'       : 'getItems',
        'hasElm'        : 'hasItem',
        'indexOfElm'    : 'indexOfItem',
        'moveElm'       : 'moveItem',
        'numElms'       : 'numItems',
        'removeAllElms' : 'removeAllItems',
        'removeElm'     : 'removeItem',
        'removeElmAt'   : 'removeItemAt',
        'replaceElm'    : 'replaceItem',
        'replaceElmAt'  : 'replaceItemAt',
        'setElms'       : 'setItems'
      };
    },

    '_setup' : function(){
      var items = (this._items = new OjCollection());

      items.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
      items.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
      items.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
      items.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');

      this._rendered = {};

      this._item_events = {};
    },

    '_teardown' : function(){
      // remove any item listeners
      var key;

      for(key in this._item_events){
        this._removeItemListener(this._item_events[key]);
      }

      // remove the items collection
      this._unset('_items');

      // clear out the helper vars
      this._rendered = this._item_events = null;
    },


    // event functions
    '_addItemListener' : function(type){
      // apply the event listener to all the rendered items if it hasn't already been
      if(!this._item_events[type]){
        var evt = this._convertItemEventType(type),
            key;

        if(evt){
          for(key in this._rendered){
            this._rendered[key].addEventListener(evt[0], this, evt[1]);
          }

          this._item_events[type] = evt[0];
        }
      }
    },

    '_convertItemEventType' : function(type){
      // convert the item event into a mouse event
      if(type == OjCollectionEvent.ITEM_CLICK){
        return [OjMouseEvent.CLICK, '_onItemClick'];
      }

      if(type == OjCollectionEvent.ITEM_OVER){
        return [OjMouseEvent.OVER, '_onItemOver'];
      }

      if(type == OjCollectionEvent.ITEM_OUT){
        return [OjMouseEvent.OUT, '_onItemOut'];
      }

      return null;
    },

    '_dispatchItemEvent' : function(type, evt){
      var item = evt.getCurrentTarget();

      if(this._itemRenderer){
        item = item.getData();
      }

      this.dispatchEvent(new OjCollectionEvent(type, item, this._items.indexOfItem(item)));
    },

    '_releaseItem' : function(item){
      var id = item.id();

      OJ.destroy(item);

      delete this._rendered[id];
    },

    '_removeItemListener' : function(type){
      // make sure that no other listeners for this type exist
      if(!this.hasEventListener(type)){
        var evt = this._convertItemEventType(type),
          key;

        if(evt){
          // un-apply the event listener to all the rendered items
          for(key in this._rendered){
            this._rendered[key].removeEventListener(evt[0], this, evt[1]);
          }

          // remove the record fo this item event
          delete this._item_events[type];
        }
      }
    },


    // event listeners
    '_onItemAdd' : function(evt){},

    '_onItemClick' : function(evt){
      this._dispatchItemEvent(OjCollectionEvent.ITEM_CLICK, evt);
    },

    '_onItemOut' : function(evt){
      this._dispatchItemEvent(OjCollectionEvent.ITEM_OUT, evt);
    },

    '_onItemOver' : function(evt){
      this._dispatchItemEvent(OjCollectionEvent.ITEM_OVER, evt);
    },

    '_onItemMove' : function(evt){},

    '_onItemRemove' : function(evt){
      delete this._rendered[evt.getItem().id()];
    },

    '_onItemReplace' : function(evt){
      delete this._rendered[evt.getOldItem().id()];
    },


    'renderItem' : function(item){
      if(!item){
        return null;
      }

      var key, evt,
          id = item.id();

      // if we have already rendered the item then just return the cached value
      if(this._rendered[id]){
        return this._rendered[id];
      }

      item = this._itemRenderer ? new this._itemRenderer(this, item) : item;

      for(key in this._item_events){
        evt = this._convertItemEventType(key);

        item.addEventListener(evt[0], this, evt[1]);
      }

      return this._rendered[id] = item;
    },

    'renderItemAt' : function(index){
      return this.renderItem(this._items.getItemAt(index));
    },


    'setItemRenderer' : function(val){
      val = isString(val) ? OJ.stringToClass(val) : val;

      if(val == this._itemRenderer){
        return;
      }

      this._itemRenderer = val;
    }
  }
);


OJ.extendComponent(
	'OjCollectionComponent', [OjICollectionComponent, OjComponent],
	{
    '_constructor' : function(){
      this._super(OjComponent, '_constructor', arguments);

      // run the collection component setup
      this._setup();
    },

    '_destructor' : function(){
      // run the collection component teardown
      this._teardown();

      this._super(OjComponent, '_destructor', arguments);
    },


    'addEventListener' : function(type, target, func){
      this._super(OjComponent, 'addEventListener', arguments);

      this._addItemListener(type);
    },

    'removeEventListener' : function(type, target, func){
      this._super(OjComponent, 'removeEventListener', arguments);

      this._removeItemListener(type);
    }
  },
  {
    '_TAGS' : ['collection']
  }
);