importJs("oj.components.OjComponent");


OJ.extendComponent(
    "OjItemRenderer", [OjComponent],
    {
        "_props_" : {
            "data" : null,
            "group" : null
        },


        "_constructor" : function(group, data){
            var self = this;

            self._super(OjComponent, '_constructor', []);

            self.group = group;
            self.data = data;
        },

        "_destructor" : function(){
            var self = this;

            self.group = null;
            self.data = null;

            return self._super(OjComponent, "_destructor", arguments);
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