OJ.importJs('oj.components.ItemRenderer');
OJ.importJs('oj.events.MouseEvent');


'use strict';

OJ.extendClass(
	OjItemRenderer, 'OjOption',
	{
		'_props_' : {
			'data'       : null,
			'isSelected' : false,
			'selector'   : null
		},

		'_template' : 'oj.form.Option',

		'option' : null,  'indicator' : null,


//		'_constructor' : function(/*selector, data*/){
//			this._s('OjOption', '_constructor', arguments);
//
//			// set the selector and the data
//			var args = arguments,
//				ln = args.length;
//
//			if(ln){
//				this.setSelector(args[0]);
//
//				if(ln > 1){
//					this.setData(args[1]);
//				}
//			}
//
//			// setup the event listeners
//			this.addEventListener(OjMouseEvent.CLICK, this, '_onClick');
//		},


		'_redrawData' : function(){
			if(this.option && this._s('OjOption', '_redrawData', arguments)){
				this.option.setData(this._data);

				return true;
			}

			return false;
		},


//		'_onClick' : function(evt){
//			this._selector.toggleSelection(this);
//		},

		'setIsSelected' : function(val){
			if(this._isSelected == val){
				return;
			}

			if(this._isSelected = val){
				this.addClasses('selected');

				this.input.dom().checked = true;
			}
			else{
				this.removeClasses('selected')

				this.input.dom().checked = false;
			}
		},

		'setSelector' : function(slctr){
			if(this._selector == slctr){
				return;
			}

			this.removeAllElms();

			if(this._selector = slctr){
				var Cls = slctr.getItemRenderer();

				this.addElm(this.option = new Cls(this._group, this._data));
			}
			else{
				this.option = null;
			}
		}
	}
);