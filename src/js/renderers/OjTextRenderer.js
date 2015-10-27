OJ.importJs('oj.renderers.OjItemRenderer');
OJ.importJs('oj.components.OjLabel');


OJ.extendClass(
	'OjTextRenderer', [OjItemRenderer],
	{
		'_template' : 'oj.renderers.OjTextRenderer',


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
	}
);