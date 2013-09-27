OJ.importJs('oj.components.OjCollectionComponent');

OJ.extendComponent(
  'OjList', [OjCollectionComponent],
  {
    '_props_' : {
			'direction' : null // OjList.VERTICAL,
    },

    '_constructor' : function(/*data_provider, item_renderer, direction*/){
      this._super(OjList, '_constructor', []);

      this._processArguments(arguments, {
        'items' : undefined,
        'itemRenderer' : OjItemRenderer,
        'direction' : OjList.VERTICAL
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
    }
  },
  {
    'HORIZONTAL' : 'horz',
		'VERTICAL'   : 'vert',

    '_TAGS' : ['list']
  }
);