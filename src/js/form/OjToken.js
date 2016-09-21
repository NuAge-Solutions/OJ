importJs('oj.renderers.OjItemRenderer');
importJs('oj.events.OjUiEvent');




OJ.extendClass(
    'OjToken', [OjItemRenderer],
    {
        '_template' : 'oj.form.OjToken',


        '_constructor' : function(/*data*/){
            this._super(OjItemRenderer, '_constructor', arguments);

            this.removeBtn.addEventListener(OjUiEvent.PRESS, this, '_onRemoveClick');
        },


        '_redrawData' : function(){
            this.item.text = this.data.toString();
        },


        '_onRemoveClick' : function(evt){
            this._list.removeItem(this.data);
        }
    }
);