OJ.importJs('oj.components.OjList');
OJ.importJs('oj.renderers.OjItemEditor');

//OJ.importCss('oj.components.OjList');


OJ.extendComponent(
    'OjEditableList', [OjList],
    {
        '_props_' : {
            'item_editor' : OjItemEditor
        },


        '_getItemRenderer' : function(){
            return this.item_editor;
        },
//
//
//        '_onElmDelete' : function(evt){
//
//        },
//
//
//        'renderItem' : function(item){
//            var elm = this._super(OjList, 'renderItem', arguments);
//
//            if(elm){
//                elm.addEventListener(this._static.DELETE, this, '_onElmDelete');
//            }
//
//            return elm;
//        }
        '=item_editor' : function(val){
            val = isString(val) ? OJ.stringToClass(val) : val;

            if(val == this._item_editor){
                return;
            }

            this._item_editor = val;

            return true;
        }
    },
    {
        '_TAGS' : ['e-list', 'edit-list']
    }
);