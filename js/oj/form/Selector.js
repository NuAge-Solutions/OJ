OJ.importJs('oj.data.Collection');
OJ.importJs('oj.form.RadioOption');
OJ.importJs('oj.form.Input');
OJ.importJs('oj.list.LabelItemRenderer');
OJ.importJs('oj.list.List');
OJ.importJs('oj.list.ListEvent');


OJ.importCss('oj.form.Selector');


'use strict';

OJ.extendComponent(
	OjInput, 'OjSelector',
	{
		'_props_' : {
			'itemRenderer'      : OjLabelItemRenderer,
			'selectionMin'      : 0,
			'selectionMax'      : 1
		},

		'_template' : 'oj.form.Selector',

		'options' : null,


		'_constructor' : function(/*name, label, value, options*/){
			var args = arguments,
				ln = args.length;

			// default the value
			this._value = [];

			this._super('OjSelector', '_constructor', ln > 2 ? Array.array(args).slice(0, 2) : args);

			// setup the list listeners
			this.input.addEventListener(OjListEvent.ITEM_ADD, this, '_onItemAdd');
			this.input.addEventListener(OjListEvent.ITEM_CLICK, this, '_onItemClick');
			this.input.addEventListener(OjListEvent.ITEM_MOVE, this, '_onItemMove');
			this.input.addEventListener(OjListEvent.ITEM_REMOVE, this, '_onItemRemove');
			this.input.addEventListener(OjListEvent.ITEM_REPLACE, this, '_onItemReplace');
			this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');

			// set options if available
			if(ln > 3){
				this.setOptions(args[3]);
			}
		},


		'_processDomSourceChild' : function(dom_elm, component){
			if(OjElement.isTextNode(dom_elm)){
				return;
			}

			var txt = dom_elm.innerText;

			if(txt){
				this.input.addItem(OjObject.importData(txt.parseJson()));
			}
		},

		'_selectOption' : function(option, data){
			if(this._value.indexOf(data) > -1){
				return;
			}

			if(this._selectionMax && this._selectionMax == this._value.length){
				this.input.getElmAt(
					this.input.indexOfItem(this._value.shift())
				).setIsSelected(false);
			}

			option.setIsSelected(true);

			this._value.push(data);

			this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
		},

		'_toggleOptionAt' : function(index){
			var option = this.input.getElmAt(index),
				data = this.input.getItemAt(index);

			if(option.getIsSelected()){
				this._unselectOption(option, data);
			}
			else{
				this._selectOption(option, data);
			}
		},

		'_unselectOption' : function(option, data){
			var index = this._value.indexOf(data);

			if(index == -1 || this._value.length <= this._selectionMin){
				return;
			}

			option.setIsSelected(false);

			this._value.splice(index, 1);

			this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
		},

		'_updateSelection' : function(){
			// make sure we remove any stale values and replace with fresh if possible
			var ln = this._value.length;

			for(; ln--;){
				if(this.input.indexOfItem(this._value[ln]) == -1){
					this._value.splice(ln, 1);
				}
			}

			// make sure we have the at least the min amount selected
			var i = 0,
				ln2 = this.input.numItems();

			for(; (ln = this._value.length) < this._selectionMin && i < ln2; i++){
				this._selectOption(this.input.getElmAt(i), this.input.getItemAt(i));
			}
		},

		'_onItemAdd' : function(evt){
			this._updateSelection();
		},

		'_onItemClick' : function(evt){
			this._toggleOptionAt(evt.getIndex());
		},

		'_onItemMove' : function(evt){
			// todo: implement onItemMove in OjSelector
		},

		'_onItemRemove' : function(evt){
			// todo: implement onItemRemove in OjSelector
			this._updateSelection();
		},

		'_onItemReplace' : function(evt){
			// todo: implement onItemReplace in OjSelector
			return;
			var index, old_data = this._options.getItemAt(evt.getIndex());

			if((index = this._value.indexOf(old_data)) > -1){
				this._value.splice(index, 1, evt.getItem());
			}

			this.options.getChildAt(evt.getIndex()).setData(evt.getItem());
		},


		'redraw' : function(){
			if(this._super('OjSelector', 'redraw', arguments)){
				this.input.redraw();

				// update the selection
				this._updateSelection();

				return true;
			}

			return false;
		},


		'setItemRenderer' : function(val){
			if(isString(val)){
				val = OJ.stringToClass(val);
			}

			if(this._itemRenderer == val){
				return;
			}

			this._itemRenderer = val;

			this.redraw();
		},


		'getOptions' : function(){
			return this.input.getDataProvider();
		},
		'setOptions' : function(val){
			// check to make sure we don't do extra work
			if(val == this.getOptions()){
				return;
			}

			// get the old selected indices
			var indices = [];

			var ln = this._value.length;

			for(; ln--;){
				indices.unshift(this.input.indexOfItem(this._value[ln]));
			}

			this._value = [];

			// set the new options
			this.input.setDataProvider(val);

			// get the new options
			var options = this.getOptions();

			ln = options.numItems()

			// try to select previous selected indices
			var index,
				ln2 = indices.length;

			for(; ln2--;){
				if((index = indices[ln2]) < ln){
					this._selectOption(this.input.getElmAt(index), this.input.getItemAt(index));
				}
			}

			this.redraw();
		},

		'setValue' : function(val){
			val = Array.array(val);

			if(this._value != val){
				if((this._value = val) && this._options){
					var ln = this._options.length;

					for(; ln--;){
						this.options.getChildAt(ln).setIsSelected(val.indexOf(this._options[ln]) > -1);
					}
				}

				this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
			}
		},

		'getSelectionRenderer' : function(){
			return this.input.getItemRenderer();
		},
		'setSelectionRenderer' : function(val){
			this.input.setItemRenderer(val);

			if(this.getSelectionRenderer() == OjRadioOption){
				this.setSelectionMin(1);
				this.setSelectionMax(1);
			}
		}
	},
	{
		'_TAGS' : ['selector']
	}
);