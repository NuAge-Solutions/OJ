OJ.importJs('oj.renderers.OjTextRenderer');


OJ.extendClass(
	'OjDateRenderer', [OjTextRenderer],
	{
		'_redrawData' : function(){
            var self = this,
                data = self.data;

			if(self._super(OjTextRenderer, '_redrawData', arguments)){
                self.lbl.text = data ? data.toLocaleString() : '';

				return true;
			}

			return false;
		}
	}
);