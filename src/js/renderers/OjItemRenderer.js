importJs("oj.components.OjComponent");


OJ.extendComponent(
    "OjItemRenderer", [OjComponent],
    {
        "_props_" : {
            "index": -1,
            "data" : null,
            "group" : null
        },


        "_constructor" : function(group, data, index){
            this._super(OjComponent, '_constructor', []);

            this.group = group;
            this.data = data;
            this.index = index;
        },

        "_destructor" : function(){
            this.group = null;
            this.data = null;
            this.index = null;

            return this._super(OjComponent, "_destructor", arguments);
        },


        "_redrawData" : function(){
            return this._is_displayed;
        },


        "redraw" : function(){
            if(this._super(OjComponent, "redraw", arguments)){
                this._redrawData();

                return true;
            }

            return false;
        },


        "=data" : function(data){
            var self = this;

            if(self._data == data){
                return;
            }

            self._data = data;

            self._redrawData();
        }
    },
    {
        "_TAGS" : ["item", "item-renderer"]
    }
);