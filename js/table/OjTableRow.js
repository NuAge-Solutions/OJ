OJ.importJs('oj.components.OjItemRenderer');


'use strict';

OJ.extendClass(
	OjItemRenderer, 'OjTableRow',
	{
		'_template' : 'oj.table.OjTableRow',


		'_redrawData' : function(){
			var class_add, class_remove, ln, count = ln = this.numChildren(), child;

			while(ln-- > 0){
				child = this.getChildAt(ln);

				class_add = [];
				class_remove = [];

				if(ln == 0){ class_add.push('first'); }
				else{ class_remove.push('first'); }

				if(ln + 1 == count){ class_add.push('last'); }
				else{ class_remove.push('last') }

				if(ln == 0 || ln % 2 == 0){
					class_add.push('even');

					class_remove.push('odd');
				}
				else{
					class_add.push('odd');

					class_remove.push('even');
				}

				class_add.push('col');
				class_add.push('col-' + ln);

				child.addClasses.apply(child, class_add);
				child.removeClasses.apply(child, class_remove);

				child.getChildAt(0).setData(this._list.getColumnAt(ln).getBodyCellData(this._data));
			}
		}
	}
);