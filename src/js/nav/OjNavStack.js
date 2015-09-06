OJ.importJs('oj.components.OjStack');


OJ.extendComponent(
    'OjNavStack', [OjStack],
    {
        '_props_' : {
            'controller' : null
        },


        '_destructor' : function(){
            // make sure to remove stack and controller references
            if(this._active){

            }

            if(this._prev_active){
                //this._unload(this._prev_active);
            }

            // continue on
            this._super(OjStack, '_destructor', arguments);
        },

        'renderItem' : function(){
            var self = this,
                elm = self._super(OjStack, 'renderItem', arguments);

            elm.controller = self.controller;
            elm.stack = self;

            return elm;
        },

        'unrenderItem' : function(item){
            var self = this,
                elm = self._rendered[item.id];

            if(elm){
                elm.controller = null;
                elm.stack = null;
            }

            return self._super(OjStack, 'unrenderItem', arguments);
        },


        '=controller' : function(val){
            var self = this,
                rendered = self._rendered,
                id;

            if(self._controller == val){
                return;
            }

            (self._controller = val).stack = self;

            // update the items in this stack with the latest
            for(id in rendered){
                rendered[id].controller = val;
            }
        },


        '=activeIndex' : function(val){
            var self = this,
                prev_active = self._active,
                active;

            self._super(OjStack, '=activeIndex', arguments);

            if((active = self._active) != prev_active){
                if(prev_active){
                    prev_active.unload();
                }

                if(active){
                    active.load();
                }
            }
        }
    },
    {
        '_TAGS' : ['navstack']
    }
);