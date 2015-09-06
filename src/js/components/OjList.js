OJ.importJs('oj.components.OjCollectionComponent');
OJ.importJs('oj.renderers.OjItemRenderer');

OJ.importCss('oj.components.OjList');


OJ.extendComponent(
    'OjList', [OjCollectionComponent],
    {
        '_default_direction' : 'vert',  // OjList.VERTICAL
        '_default_renderer' : OjItemRenderer,

        '_props_' : {
            'direction' : null
        },

        '_constructor' : function(elms, item_renderer, direction){
            this._super(OjCollectionComponent, '_constructor', []);

            if(item_renderer){
                this.item_renderer = item_renderer;
            }

            this._processArguments(arguments, {
                'elms' : undefined,
                'item_renderer' : this._default_renderer,
                'direction' : this._default_direction
            });
        },

        '_updateListCss' : function(){
            if(this.container.numChildren){
                this.removeCss('is-empty');
            }
            else{
                this.addCss('is-empty');
            }
        },


        '_onItemAdd' : function(evt){
            this.container.insertChildAt(this.renderItem(evt.item, evt.index), evt.index);

            this._updateListCss();

            this._super(OjCollectionComponent, '_onItemAdd', arguments);
        },

        '_onItemMove' : function(evt){
            var i = evt.index;

            this.container.moveChild(this.renderItem(evt.item, i), i);

            this._super(OjCollectionComponent, '_onItemMove', arguments);
        },

        '_onItemRemove' : function(evt){
            var item = this.container.removeChildAt(evt.index);

            this._updateListCss();

            this._super(OjCollectionComponent, '_onItemRemove', arguments);

            this._releaseItem(item);
        },

        '_onItemReplace' : function(evt){
            var i = evt.index,
                item = this.container.replaceChildAt(this.renderItem(evt.item, i), i);

            this._super(OjCollectionComponent, '_onItemReplace', arguments);

            this._releaseItem(item);
        },


        '_onItemPress' : function(evt){
            this._super(OjCollectionComponent, '_onItemPress', arguments);
        },

        '_onItemOver' : function(evt){
            this._super(OjCollectionComponent, '_onItemOver', arguments);
        },

        '_onItemOut' : function(evt){
            this._super(OjCollectionComponent, '_onItemOut', arguments);
        },


        '=direction' : function(val){
            if(this._direction == val){
                return;
            }

            if(this._direction){
                this.removeCss(this._direction);
            }

            this.addCss(this._direction = val);

            return true;
        },

        '=elms' : function(val){
            var self = this;

            if(self._elms == val){
                return;
            }

            self._super(OjCollectionComponent, '=elms', arguments);

            // remove all the old rendered items
            var key,
                container = self.container,
                rendered = self._rendered;

            container.removeAllChildren();

            for(key in rendered){
                OJ.destroy(rendered[key]);
            }

            self._rendered = {};

            // render the new items
            self._elms.forEachReverse(function(item, i){
                container.prependChild(self.renderItem(item, i));
            });

            self._updateListCss();
        }
    },
    {
        'HORIZONTAL' : 'horz',
        'VERTICAL' : 'vert',

        '_TAGS' : ['list']
    }
);