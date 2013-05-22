OJ.importJs('oj.list.OjList');
OJ.importJs('oj.table.OjTableColumn');
OJ.importJs('oj.table.OjTableCell');
OJ.importJs('oj.table.OjTableRow');

OJ.importCss('oj.table.OjTable');


'use strict';

OJ.extendClass(
	OjList, 'OjTable',
	{
		'_template' : 'oj.table.OjTable',

		'_column_renderer' : OjTableColumn,  '_item_renderer' : OjTableRow, '_cell_renderer' : OjTableCell,


		'_constructor' : function(/*columns, data_provider*/){
			this._cols = [];

			this._super('OjTable', '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setColumns(arguments[0]);

				if(ln > 1){
					this.setDataProvider(data_provider);
				}
			}

			this.addClasses('OjTable');

			this.removeClasses('OjList');
		},


		'_setDomSource' : function(dom_elm, context){
			this._super('OjTable', '_setDomSource', arguments);

			var children = OJ.query('> *', dom_elm), ln = children.length, i, child, tag, columns, cols, ln2;

			for(i = 0; i < ln; i++){
				child = children[i];
				tag = child.tagName.toLowerCase();

				if(tag == 'columns'){
					columns = [];
					cols = OJ.query('column', child);
					ln2 = cols.length;

					while(ln2-- > 0){
						columns.unshift(this._createColumn(cols[ln2]));
					}

					this.setColumns(columns);
				}
			}
		},


		'_createColumn' : function(dom_elm){
			var column = new this._column_renderer(), attrs = dom_elm.attributes, ln = attrs.length, setter;

			while(ln-- > 0){
				setter = OjElement.attributeToSetter(attrs[ln].nodeName);

				if(isFunction(column[setter])){
					column[setter](attrs[ln].value);
				}
			}

			dom_elm = attrs = ln = setter = null;

			return column;
		},


		'_createRow' : function(content){
			return new this._item_renderer(content);
		},

		'_createCell' : function(content){
			return new this._cell_renderer(content);
		},

		'_createItem' : function(data, index){
			var item = this._super('OjTable', '_createItem', arguments), ln = this.numColumns();

			while(ln-- > 0){
				item.addChildAt(this._createCell(this.getColumnAt(ln).getBodyCell(data)), 0)
			}

			return this._redrawItem(item, data, index);
		},


		'addColumn' : function(column){
			return this.addColumnAt(column, this.numColumns());
		},

		'addColumnAt' : function(column, index){
			if(!this.hasColumn(column)){
				this._cols.splice(index, 0, column);

				column._setTable(this);

				this.header.addChildAt(this._createCell(column.getHeaderCell()), index);

				this.footer.addChildAt(this._createCell(column.getFooterCell()), index);

				if(column.isPrimary()){
					this.header.getChildAt(index).setAttr('width', '100%');
				}

				var ln = this.numItems();

				while(ln-- > 0){
					this.items.getChildAt(ln).addChildAt(
						new OjTableCell(
							this._cols[index].getBodyCell(
								this._data_provider[ln]
							)
						),
						index
					);
				}

				this.redraw();
			}
		},

		'getColumnAt' : function(index){
			return this._cols[index];
		},

		'getColumnIndex' : function(column){
			return this._cols.indexOf(column);
		},

		'hasColumn' : function(column){
			return this.getColumnIndex(column) != -1;
		},

		'numColumns' : function(){
			return this._cols.length;
		},

		'removeColumn' : function(column){
			return this.removeColumnAt(this.getColumnIndex(column));
		},

		'removeColumnAt' : function(index) {
			var column = this._cols.splice(index, 1);

			if(this.header && !(this.header.numChildren() < index)){
				this.header.removeChildAt(index);
			}

			if(this.footer && !(this.footer.numChildren() < index)){
				this.footer.removeChildAt(index);
			}

			var ln = this.numItems(), child;

			while(ln-- > 0){
				child = this.items.getChildAt(ln);

				if(child && !(child.numChildren() < index)){
					OJ.destroy(child.removeChildAt(index));
				}
			}

			this.redraw();

			return column;
		},

		'getColumns' : function(){
			var columns = [], ln = this.numColumns();

			while(ln-- > 0){
				columns.unshift(this.getColumnAt(ln));
			}

			return columns;
		},
		'setColumns' : function(columns){
			var ln = columns.length, i;

			for(i = 0; i < ln; i++){
				this.addColumn(columns[i]);
			}
		}
	}
);