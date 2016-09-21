importJs('oj.events.OjEvent');


OJ.extendClass(
    'OjCollectionEvent', [OjEvent],
    {
        '_get_props_' : {
            'items'    : null,
            'index'  : null,
            'old_items' : null
        },


        '_constructor' : function(type, items, index, old_items, bubbles, cancelable){
            var self = this,
                params = [type];

            self._items = items;
            self._index = index;
            self._old_items = old_items;

            if(isSet(bubbles)){
                params.append(bubbles);

                if(isSet(cancelable)){
                    params.append(cancelable);
                }
            }

            self._super(OjEvent, '_constructor', params);
        },

        'clone' : function(){
            var self = this,
                evt = self._super(OjEvent, 'clone', arguments);

            evt._items = self._items;
            evt._index = self._index;
            evt._old_items = self._old_items;

            return evt;
        }
    },
    {
        'ITEM_ADD'     : 'onItemAdd',
        'ITEM_CHANGE'  : 'onItemChange',
        'ITEM_PRESS'   : 'onItemPress',
        'ITEM_OVER'    : 'onItemOver',
        'ITEM_OUT'     : 'onItemOut',
        'ITEM_MOVE'    : 'onItemMove',
        'ITEM_REMOVE'  : 'onItemRemove',
        'ITEM_REPLACE' : 'onItemReplace',


        'isChangeEvent' : function(evt){
            if(!evt){
                return false;
            }

            var self = this,
                type = evt.type;

            return evt.is(OjCollectionEvent) && (
                type == self.ITEM_ADD || type == self.ITEM_MOVE || type == self.ITEM_REMOVE || type == self.ITEM_REPLACE
            );
        }
    }
);