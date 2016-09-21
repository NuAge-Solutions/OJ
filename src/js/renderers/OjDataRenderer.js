importJs('oj.data.OjData');
importJs('oj.renderers.OjTextRenderer');


OJ.extendClass(
    'OjDataRenderer', [OjTextRenderer],
    {
        '_redrawData' : function(){
            var self = this,
                data = self.data;

            if(self._super(OjTextRenderer, '_redrawData', arguments)){
                self.lbl.text = data ? data.label : '';

                return true;
            }

            return false;
        }
    }
);