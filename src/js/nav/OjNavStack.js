 importJs('oj.components.OjStack');


OJ.extendComponent(
    'OjNavStack', [OjStack],
    {
        '_props_' : {
            'controller' : null
        },


        // '_destructor' : function(){
        //     // make sure to remove stack and controller references
        //     if(this._active){
        //
        //     }
        //
        //     if(this._prev_active){
        //         //this._unload(this._prev_active);
        //     }
        //
        //     // continue on
        //     this._super(OjStack, '_destructor', arguments);
        // },


        // '_addActive' : function(item, index){
        //     this._super(OjStack, '_addActive', arguments);
        //
        //     item.load();
        // },

        // '_removeActive' : function(item){
        //     var self = this;
        //
        //     (item || self.getElmAt(self._active_index)).unload();
        //
        //     self._super(OjStack, '_removeActive', [item]);
        // },


        "renderItem" : function(item){
            const loaded = item.oj_id in this._rendered,
                elm = this._super(OjStack, "renderItem", arguments);

            elm.controller = this.controller;
            elm.stack = this;

            if(!loaded){
                item.load();
            }

            return elm;
        },

        "unrenderItem" : function(item){
            const self = this,
                elm = self._rendered[item.oj_id];

            if(elm){
                item.unload();

                elm.controller = null;
                elm.stack = null;
            }

            return self._super(OjStack, "unrenderItem", arguments);
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
        }
        //,
        //
        //
        //'=active_index' : function(val){
        //    var self = this,
        //        prev_active = self._active,
        //        active;
        //
        //    self._super(OjStack, '=active_index', arguments);
        //
        //    if((active = self._active) != prev_active){
        //        //if(prev_active){
        //        //    prev_active.unload();
        //        //}
        //
        //        //if(active){
        //        //    active.load();
        //        //}
        //    }
        //}
    },
    {
        '_TAGS' : ['nav-stack']
    }
);