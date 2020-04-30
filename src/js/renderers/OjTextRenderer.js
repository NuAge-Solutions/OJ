importJs('oj.renderers.OjItemRenderer');
importJs('oj.components.OjLabel');


OJ.extendComponent(
    'OjTextRenderer', [OjItemRenderer],
    {
        '_redrawData' : function(){
            var self = this,
                data = self._data;

            if(self._super(OjItemRenderer, '_redrawData', arguments)){
                if(isBoolean(data)){
                    data = data ? 'True' : 'False';
                }

                self.lbl.text = String.string(data);

                return true;
            }

            return false;
        }
    },
    {
        '_TEMPLATE' : 'oj.renderers.OjTextRenderer'
    }
);