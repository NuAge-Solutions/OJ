OJ.importJs('oj.data.OjArray');


OJ.extendClass(
    'OjElmArray', [OjArray],
    {
        'push' : function(){
            throw "OjElmArray is immutable.";
        },

        'splice' : function(){
            throw "OjElmArray is immutable.";
        },

        'getItemAt' : function(index){
            return OjElement.element(this._items[index]);
        },

        'indexOf' : function(item){
            if(isObjective(item) && item.is('OjElement')){
                item = item.dom;
            }

            for(var key in this._items){
                if(this._items[key] == item){
                    return parseInt(key);
                }
            }

            return -1;
        },

        'move' : function(item, index){
            throw "OjElmArray is immutable.";
        },

        'removeAt' : function(index){
            throw "OjElmArray is immutable.";
        },

        'replaceAt' : function(index, newItem){
            throw "OjElmArray is immutable.";
        },

        'reverse' : function(){
            // TODO: add OjElmArray reverse method
        },

        'setItemAt' : function(item, index){
            throw "OjElmArray is immutable.";
        },

        'sort' : function(/*sort_func*/){
            // TODO: add OjElmArray sort method
        },


        '=items' : function(items){
            this._items = items ? items : [];
        }
    }
);


