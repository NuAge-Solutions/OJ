OJ.importJs('oj.components.OjComponent');


OJ.extendComponent(
    'OjItemRenderer', [OjComponent],
    {
        '_props_' : {
            'data' : null,
            'group' : null
        },


        '_constructor' : function(/*group, data*/){
            this._super(OjComponent, '_constructor', []);

            this._processArguments(arguments, {
                'group' : null,
                'data' : null
            });
        },


        '_redrawData' : function(){
            return this._is_displayed;
        },


        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){
                this._redrawData();

                return true;
            }

            return false;
        },


        '=data' : function(data){
            if(this._data == data){
                return;
            }

            this._data = data;

            this._redrawData();
        }
    },
    {
        '_TAGS' : ['item', 'item-renderer']
    }
);