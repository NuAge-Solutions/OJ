OJ.importJs('oj.components.ItemRenderer');
OJ.importJs('oj.data.Collection');
OJ.importJs('oj.form.Option');
OJ.importJs('oj.form.Input');


OJ.importCss('oj.form.Selector');


'use strict';

OJ.extendComponent(
	OjInput, 'OjSelector',
	{
		'_props_' : {
			'itemRenderer'      : OjItemRenderer,
			'options'           : null,
			'selectionMin'      : 0,
			'selectionMax'      : 1,
			'selectionRenderer' : OjOption
		},

		'options' : null,


		'_constructor' : function(/*name, label, value, options*/){
			var ln = arguments.length;

			this._s('OjSelector', '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);

			this._value = [];

			// setup the options holder
			this.options = new OjStyleElement();
			this.options.addClasses('options');

			this.stem.addChild(this.options);

			// set options if available
			if(ln > 3){
				this.setOptions(arguments[3]);
			}
		},


		'_selectOption' : function(option, data){
			var index = this._value.indexOf(data);

			if(index > -1){
				return;
			}

			if(this._selectionMax && this._selectionMax == this._value.length){
				index = this._options.indexOfItem(this._value.shift());

				this.options.getChildAt(index).setIsSelected(false);
			}

			option.setIsSelected(true);

			this._value.push(data);

			this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
		},

		'_unselectOption' : function(option, data){
			var index = this._value.indexOf(data);

			if(index == -1 || this._value.length <= this._selectionMin){
				return;
			}

			option.setIsSelected(false);

			this._value.splice(index, 1);

			this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
		},


		'_onItemAdd' : function(evt){
			var Cls = this._selectionRenderer;

			this.options.addChild(new Cls(this, evt.getItem()));
		},

		'_onItemMove' : function(evt){
			// todo: implement onItemMove in OjSelector
		},

		'_onItemRemove' : function(evt){
			var index;

			if((index = this._value.indexOf(evt.getItem())) > -1){
				this._value.splice(index, 1);
			}

			this.options.removeChildAt(evt.getIndex());
		},

		'_onItemReplace' : function(evt){
			var index, old_data = this._options.getItemAt(evt.getItemIndex());

			if((index = this._value.indexOf(old_data)) > -1){
				this._value.splice(index, 1, evt.getItem());
			}

			this.options.getChildAt(evt.getIndex()).setData(evt.getItem());
		},


		'toggleSelection' : function(option){
			var data = option.getData(),
				index = this._value.indexOf(data);

			if(index == -1){
				this._selectOption(option, data);
			}
			else{
				this._unselectOption(option, data);
			}
		},


		'setItemRenderer' : function(val){
			if(isString(val)){
				val = OJ.stringToClass(val);
			}

			if(this._itemRenderer == val){
				return;
			}

			this._itemRenderer = val;
		},

		'setOptions' : function(val){
			if(!isObjective(val)){
				val = new OjCollection(val);
			}
			else if(this._options == val){
				return;
			}

			// get all the vars we need to make the necessary updates/changes
			var ln = this._value.length,
				new_ln = val.numItems(),
				old_ln = this.options.numChildren(),
				delta = new_ln - old_ln,
				old_options = this._options,
				Cls = this._selectionRenderer,
				i;

			if(old_options){
				old_options.removeEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
				old_options.removeEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemMove');
				old_options.removeEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemRemove');
				old_options.removeEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemReplace');
			}

			// store the new options
			if(this._options = val){
				// add the event listeners
				val.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
				val.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemMove');
				val.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemRemove');
				val.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemReplace');
			}

			// rejigger the display
			if(delta > 0){
				for(i = 0; i < delta; i++){
					this.options.addChild(new Cls(this, val.getItemAt(old_ln + i)));
				}
			}
			else if(delta < 0){
				while(old_ln-- > new_ln){
					this.options.removeChildAt(old_ln);
				}

				old_ln = new_ln;
			}

			while(old_ln-- > 0){
				this.options.getChildAt(old_ln).setData(val.getItemAt(old_ln));
			}

			// make sure we remove any stale values and replace with fresh if possible
			for(i = 0; i < ln; i++){
				if(this._options.indexOfItem(this._value[i]) == -1){
					delta = old_options.indexOfItem(this._value.splice(i, 1)[0]);

					if(delta > -1 && delta < new_ln){
						this._selectOption(this.options.getChildAt(delta), this._options.getItemAt(delta))
					}
				}
			}

			// make sure we have the at least the min amount selected
			i = 0;

			while(this._value.length < this._selectionMin && i < new_ln){
				this._selectOption(this.options.getChildAt(i), this._options.getItemAt(i));

				i++;
			}
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

		'setSelectionRenderer' : function(val){
			if(isString(val)){
				val = OJ.stringToClass(val);
			}

			if(this._selectionRenderer == val){
				return;
			}

			this._selectionRenderer = val;
		}
	},
	{
		'_TAGS' : ['selector']
	}
);