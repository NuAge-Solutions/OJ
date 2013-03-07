OJ.importJs('oj.form.FilterBox');
OJ.importJs('oj.form.Token');
OJ.importJs('oj.list.OrderedList');

OJ.importCss('oj.form.TokenInput');


'use strict';

OJ.compileClass(
	'OjTokenInput',
	oj.form.TokenInput = function(){
		return new oj.form.Input(
			arguments, 'OjTokenInput',
			{
				'_allow_none' : false,  '_allow_duplicate' : false,

				'_options' : null,  '_available' : null,  '_selected' : null,

				'filterBox' : null,


				'_constructor' : function(/*name, label, value, list = Object*/){
					var ln = arguments.length;

					// setup the value and options
					this._selected = [];
					this._value = [];

					this._super('OjTokenInput', '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);

					if(ln > 2){
						if(ln > 3){
							this.setOptions(arguments[3]);
						}

						this.setValue(arguments[2]);
					}

					// setup event listeners
					this.valueHldr.addEventListener(OjListEvent.ITEM_REMOVE, this, '_onListItemRemove');

					this.filterBox.addEventListener(OjEvent.CHANGE, this, '_onFilterChange');
				},


				'_setDom' : function(dom_elm){
					this._super('OjTokenInput', '_setDom', arguments);

					var prnt = this.input.parent();

					// customize the input holder
					this.filterBox = new OjFilterBox();
					this.filterBox.setAllowNone(true);
					this.filterBox.setValue(null);
					this.filterBox.addClasses('filter', 'grey');

					prnt.addChildAt(this.filterBox, prnt.indexOfChild(this.input) + 1);

					// customize the value holder
					this.valueHldr = new OjList();
					this.valueHldr.setItemRenderer(OjToken);
					this.valueHldr.addClasses('value');

					this.inputWrpr.addChild(this.valueHldr);
				},


				'_addValue' : function(value/*, suppress_event = false*/){
					return this._addValueAt(value, this._value.length, arguments.length > 2 ? arguments[2] : false);
				},

				'_addValueAt' : function(value, index/*, suppress_event = false*/){
					// update the values list
					this._value.splice(index, 0, value);

					if(!this._options){
						return;
					}

					// update the selected list
					this._selected.splice(index, 0, this._options[value]);

					// update value display
					this.valueHldr.addItemAt(this._options[value], index);

					// update filter list
					if(!this._allow_duplicate){
						delete this._available[value];

						this.filterBox.setOptions(this._available);

						if(!Object.keys(this._available).length){
							this.filterBox.hide();
						}
					}

					// dispatch that we have a value change
					if(arguments.length < 3 || !arguments[2]){
						this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
					}

					return value;
				},

				'_removeValue' : function(value/*, suppress_event = false*/){
					var ln = this._value.length;

					while(ln-- > 0){
						if(this._value[ln] == value){
							return this._removeValueAt(ln, arguments.length > 2 ? arguments[2] : false);
						}
					}

					return null;
				},

				'_removeValueAt' : function(index/*, suppress_event = false*/){
					var rtrn = this._value[index];

					if(!this._options){
						this._values.splice(index, 1);

						return rtrn;
					}

					// update value display
					this.valueHldr.removeItemAt(index);

					// dispatch that we have a value change
					if(arguments.length < 3 || !arguments[2]){
						this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
					}

					return rtrn;
				},

				'_moveValueTo' : function(value, index){
					// add the move value logic

					this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
				},


				'_onFilterChange' : function(evt){
					if(evt.getTarget() == this.filterBox && this.filterBox.getValue() != null){
						this._addValue(this.filterBox.getValue());

						this.filterBox.setValue(null);
					}
				},

				'_onListItemRemove' : function(evt){
					// update values
					var removed = this._value.splice(evt.getIndex(), 1);
					this._selected.splice(evt.getIndex(), 1);

					// update filter list
					if(!this._allow_duplicate){
						this._available[removed] = this._options[removed];

						this.filterBox.setOptions(this._available);

						this.filterBox.show();
					}
				},


				'getAllowNone' : function(){ return this._allow_none; },
				'setAllowNone' : function(allow){ this._allow_none = allow; },

				'getAllowDuplicate' : function(){ return this._allow_duplicate; },
				'setAllowDuplicate' : function(allow){ this._allow_duplicate = allow; },

				'getOptions' : function(){ return this._options; },
				'setOptions' : function(options){
					this._options = options;

					this._available = OJ.merge({}, options);

					this.filterBox.setOptions(this._available);

					this.setValue(this._value.clone());
				},

				'getSelected' : function(){ return this._selected; },
				'setSelected' : function(selected){
					this._selected = selected;
				},

				'getTokenRenderer' : function(){ return this.valueHldr.getItemRenderer(); },
				'setTokenRenderer' : function(renderer){ this.valueHldr.setItemRenderer(renderer); },

				'_onChange' : function(){},

				'setValue' : function(value){
					var val = [], ln = this._value.length;

					while(ln-- > 0){
						this._removeValueAt(ln, true);
					}

					if(value){
						ln = value.length;

						for(var i = 0; i < ln; i++){
							this._addValueAt(value[i], i, true);
						}
					}

					this.dispatchEvent(new OjEvent(OjEvent.CHANGE, true, true));
				}
			}
		);
	}
);