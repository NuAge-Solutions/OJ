importJs('oj.components.OjCollectionComponent');
importJs('oj.renderers.OjItemRenderer');

OJ.extendComponent(
    'OjList', [OjCollectionComponent],
    {
        '_default_direction' : 'vert',  // OjList.VERTICAL
        '_default_renderer' : OjItemRenderer,

        '_props_' : {
            'direction' : null
        },

        "_constructor" : function(elms, item_renderer, direction){
            this._super(OjCollectionComponent, "_constructor", []);

            this._set("item_renderer", item_renderer, this._default_renderer);
            this._set("direction", direction, this._default_direction);

            if(elms){
                this.elms = elms;
            }
        },

        '_updateListCss' : function(){
            if(this.container.num_children){
                this.removeCss('is-empty');
            }
            else{
                this.addCss('is-empty');
            }
        },


        '_onItemAdd' : function(evt){
            var self = this,
                container = self.container;
            
            evt.items.forEach(function(item, i){
                container.insertChildAt(
                    self.renderItem(item, evt.index + i),
                    evt.index + i
                );
            });


            this._updateListCss();

            this._super(OjCollectionComponent, '_onItemAdd', arguments);
        },

        '_onItemMove' : function(evt){
            var self = this,
                container = self.container;

            evt.items.forEach(function(item, i){
                container.moveChild(
                    self.renderItem(item, evt.index + i),
                    evt.index
                );
            });

            self._super(OjCollectionComponent, '_onItemMove', arguments);
        },

        '_onItemRemove' : function(evt){
            var self = this,
                container = self.container;

            evt.items.forEachReverse(function(item, i){
                container.removeChildAt(evt.index + i);
            });

            self._updateListCss();

            self._super(OjCollectionComponent, '_onItemRemove', arguments);

        },

        '_onItemReplace' : function(evt){
            var self = this,
                container = self.container;

            evt.items.forEachReverse(function(item, i){
                container.replaceChildAt(self.renderItem(item, evt.index + i), evt.index + i)
            });

            self._super(OjCollectionComponent, '_onItemReplace', arguments);
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
            var self = this,
                container = self.container,
                elms = self._elms;

            if(elms == val){
                return;
            }

            self._super(OjCollectionComponent, '=elms', arguments);

            // reset rendered object
            self._rendered = {};

            // render the new items
            self._elms.forEach(function(item, i){
                container.appendChild(self.renderItem(item, i));
            });

            // update the css
            self._updateListCss();
        }
    },
    {
        'HORIZONTAL' : 'horz',
        'VERTICAL' : 'vert',

        '_TAGS' : ['list']
    }
);