OJ.importJs('oj.components.OjCollectionComponent');


OJ.extendComponent(
  'OjList', [OjCollectionComponent],
  {
    '_props_' : {
			'direction' : null // OjList.VERTICAL,
    },

    '_constructor' : function(/*data_provider, item_renderer, direction*/){
      this._super(OjCollectionComponent, '_constructor', []);

      this._processArguments(arguments, {
        'setDataProvider' : undefined,
        'setItemRenderer' : OjItemRenderer,
        'setDirection' : OjList.VERTICAL
      });
    },


    '_onItemAdd' : function(evt){
      this.container.addChildAt(this.renderItem(evt.getItem()), evt.getIndex());

      this._super(OjICollectionComponent, '_onItemAdd', arguments);
		},

		'_onItemMove' : function(evt){
      this.container.moveChild(this.renderItem(evt.getItem()), evt.getIndex());

      this._super(OjICollectionComponent, '_onItemMove', arguments);
		},

		'_onItemRemove' : function(evt){
      var item = evt.getItem();

      this.container.removeChild(item);

      this._super(OjICollectionComponent, '_onItemRemove', arguments);

      this._releaseItem(item);
		},

		'_onItemReplace' : function(evt){
      this.container.replaceChildAt(evt.getIndex(), this._renderItem(evt.getItem()));

      this._super(OjICollectionComponent, '_onItemReplace', arguments);

      this._releaseItem(evt.getOldItem());
		},


		'_onItemClick' : function(evt){
      this._super(OjICollectionComponent, '_onItemClick', arguments);
		},

		'_onItemOver' : function(evt){
      this._super(OjICollectionComponent, '_onItemOver', arguments);
		},

		'_onItemOut' : function(evt){
      this._super(OjICollectionComponent, '_onItemOut', arguments);
		},


    'setDirection' : function(val){
      if(this._direction == val){
        return;
      }

      if(this._direction){
        this.removeCss([this._direction]);
      }

      this.addCss([this._direction = val]);

      return true;
    },

    'setDataProvider' : function(provider){
      if(this._super(OjCollectionComponent, 'setDataProvider', arguments)){
        // remove all the old rendered items
        var key,
            ln = this._items.numItems();

        this.container.removeAllChildren();

        for(key in this._rendered){
          OJ.destroy(this._rendered[key]);
        }

        this._rendered = {};

        // render the new items
        for(; ln--;){
          this.container.addChildAt(this.renderItem(this._items.getItemAt(ln)), 0);
        }
      }
    }
  },
  {
    'HORIZONTAL' : 'horz',
		'VERTICAL'   : 'vert',

    '_TAGS' : ['list']
  }
);