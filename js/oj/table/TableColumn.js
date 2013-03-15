OJ.importJs('oj.component.ItemRenderer');
OJ.importJs('oj.data.Object');


'use strict';

OJ.extendClass(
	OjObject, 'OjTableColumn',
	{
		'_props_' : {
			'header'         : null,
			'headerRenderer' : OjItemRenderer,
			'bodyRenderer'   : OjItemRenderer,
			'footer'         : null,
			'footerRenderer' : OjItemRenderer,
			'key'            : null
		},

		'_get_props_' : {
			'_table' : null
		},

		'_key_func' : null,  '_primary' : false,


		'_constructor' : function(/*header, body_renderer, key, footer, primary*/){
			this._s('OjTableColumn', '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setHeader(arguments[0]);

				if(ln > 1){
					this.setBodyRenderer(arguments[1]);

					if(ln > 2){
						this.setKey(arguments[2]);

						if(ln > 3){
							this.setFooter(arguments[3]);

							if(ln > 4){
								this.isPrimary(arguments[4]);
							}
						}
					}
				}
			}
		},


		'isPrimary' : function(/*primary*/){
			if(arguments.length && arguments[0] != this._primary){
				this._primary = isTrue(arguments[0]);

				if(this._table){
					this._table.redraw();
				}
			}

			return this._primary;
		},


		'getHeaderCell' : function(){
			return new this._headerRenderer(this._header);
		},

		'setHeaderRenderer' : function(renderer){
			if(isString(renderer)){
				renderer = window[renderer];
			}

			this._headerRenderer = renderer;
		},

		'getBodyCell' : function(data){
			return new this._bodyRenderer(this.getBodyCellData(data));
		},

		'getBodyCellData' : function(data){
			if(this._key){
				if(isFunction(data[this._key_func])){
					return data[this._key_func]();
				}

				return data[this._key];
			}

			return data;
		},

		'setBodyRenderer' : function(renderer){
			if(isString(renderer)){
				renderer = window[renderer];
			}

			this._bodyRenderer = renderer;
		},


		'getFooterCell' : function(){
			return new this._footerRenderer(this._footer);
		},

		'setFooterRenderer' : function(renderer){
			if(isString(renderer)){
				renderer = window[renderer];
			}

			this._footerRenderer = renderer;
		},

		'setKey' : function(key){
			this._key = key;

			this._key_func = key ? OjElement.attributeToGetter(key) : null;
		},

		'_setTable' : function(table){
			this._table = table;
		}
	}
);