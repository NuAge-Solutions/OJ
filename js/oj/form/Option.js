OJ.importJs('oj.components.Component');
OJ.importJs('oj.events.MouseEvent');


'use strict';

OJ.compileClass(
	'OjOption',
	oj.form.Option = function(){
		return new oj.components.Component(
			arguments, 'OjOption',
			{
				'_properties_' : {
					'data'       : null,
					'isSelected' : false,
					'selector'   : null
				},

				'_template' : 'oj.form.Option',

				'option' : null,  'indicator' : null,


				'_constructor' : function(selector, data){
					this._super('OjOption', '_constructor', arguments);

					// set the selector and the data
					this.setData(data);
					this.setSelector(selector);

					// setup the event listeners
					this.addEventListener(OjMouseEvent.CLICK, this, '_onClick');
				},


				'_onClick' : function(evt){
					this._selector.toggleSelection(this);
				},


				'setData' : function(data){
					if(this._data == data){
						return;
					}

					this._data = data;

					if(this.option){
						this.option.setData(data);
					}
				},

				'setIsSelected' : function(val){
					if(this._isSelected == val){
						return;
					}

					if(this._isSelected = val){
						this.addClasses('selected');

						this.input.setAttr('checked', 'checked');
					}
					else{
						this.removeClasses('selected')

						this.input.setAttr('checked', null);
					}
				},

				'setSelector' : function(slctr){
					if(this._selector == slctr){
						return;
					}

					this.removeAllElms();

					if(this._selector = slctr){
						var Cls = slctr.getItemRenderer();

						this.addElm(this.option = new Cls(slctr, this._data));
					}
					else{
						this.option = null;
					}
				}
			}
		);
	}
);