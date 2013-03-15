OJ.importJs('oj.components.Button');
OJ.importJs('oj.form.Input');
OJ.importJs('oj.data.Collection');
OJ.importJs('oj.list.List');

OJ.importCss('oj.form.ComboBox');


'use strict';

OJ.extendClass(
	OjInput, 'OjComboBox',
	{
		'_options' : null,  '_options_dp' : null,  '_options_index' : null,

		'_selected' : null,  '_selected_index' : null,  '_trigger_evt' : null,  '_tween' : null,

		'_list' : null,  '_list_visible' : false,  '_ignore_click' : false,  '_allow_none' : false,  '_none_lbl' : '-- Select -- ',


		'_constructor' : function(/*name, label, value, options*/){
			var ln = arguments.length;

			this._options_index = [];

			this._s('OjComboBox', '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);

			this._list = new OjList();
			this._list.addEventListener(OjListEvent.ITEM_CLICK, this, '_onItemClick');

			this._options_dp = this._list.getDataProvider();

			if(ln > 2){
				if(ln > 3){
					this.setOptions(arguments[3]);
				}

				this.setValue(arguments[2]);
			}

			// setup event listeners
			this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');

			this.psuedoInput.addEventListener(OjMouseEvent.CLICK, this, '_onClick');
		},


		'_showList' : function(){
			// check to see if the list is already shown
			if(this._list_visible){
				return;
			}

			// prepare the list so we can extract the height and animate it in
			this._list.setAlpha(0);
			this._list.show();

			// get the actual height of the list
			var h = this._list.getHeight();

			// now set it back to 0 so we can animate it to its full height
			this._list.setHeight(0);

			// make sure to destroy an current animations for this combobox
			OJ.destroy(this._tween, true);

			// setup the animation
			this._tween = new OjTweenSet(
				new OjPropTween(this._list, { 'height' : h }, 250),
				new OjFade(this._list, OjFade.IN, 250)
			);

			// listen for when the animation is over so we can cleanup after ourselves
			this._tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTween');

			// start the animation
			this._tween.start();

			// listen for page clicks to know when to close the list
			OJ.addEventListener(OjMouseEvent.CLICK, this, '_onPageClick');

			this._list_visible = true;
		},

		'_hideList' : function(){
			// check to see if the list is already hidden
			if(!this._list_visible){
				return;
			}

			// make sure to destroy an current animations for this combobox
			OJ.destroy(this._tween, true);

			// setup the animation
			this._tween = new OjTweenSet(
				new OjPropTween(this._list, { 'height' : 0 }, 250),
				new OjFade(this._list, OjFade.NONE, 250)
			);

			// listen for when the animation is over so we can cleanup after ourselves
			this._tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTween');

			// start the animation
			this._tween.start();

			OJ.removeEventListener(OjMouseEvent.CLICK, this, '_onPageClick');

			this._trigger_evt = null;

			this._list_visible = this._ignore_click = false;
		},


		'_redrawList' : function(){
			var old_ln  = this._options_dp.numItems(), new_ln = 0, key;

			this._options_index = [];

			for(key in this._options){
				if(old_ln > new_ln){
					if(this._options_dp.getItemAt(new_ln) != this._options[key]){
						this._options_dp.setItemAt(this._options[key], new_ln);
					}
				}
				else{
					this._options_dp.addItem(this._options[key]);
				}

				this._options_index.push(key);

				new_ln++;
			}

			while(old_ln-- > new_ln){
				this._options_dp.removeItemAt(old_ln);
			}

			if(this._allow_none){
				if(this._options_dp.getItemAt(0) != this._none_lbl){
					this._options_dp.addItemAt(this._none_lbl, 0);
				}
			}
			else if(this._options_dp.getItemAt(0) == this._none_lbl){
				this._options_dp.removeItemAt(0);
			}
		},

		'_redrawValue' : function(){
			var value, item_renderer = this.getItemRenderer();

			if(
				!this.valueHldr.numChildren() ||
					!(value = this.valueHldr.getChildAt(0)).is(item_renderer)
				){
				this.valueHldr.removeAllChildren();

				this.valueHldr.addChild(new item_renderer(this._selected));
			}
			else{
				value.setData(this._selected);
			}
		},


		'_onClick' : function(evt){
			if(!this._trigger_evt){
				this._showList();
			}

			if(!this._ignore_click){
				this._trigger_evt = evt;

				this._ignore_click = false;
			}
		},

		'_onItemClick' : function(evt){
			this.setSelected(evt.getItem());

			this._ignore_click = true;
		},

		'_onPageClick' : function(evt){
			if(this._trigger_evt == evt){
				return;
			}

			this._hideList();
		},

		'_onTween' : function(evt){
			this._list.setHeight(OjStyleElement.AUTO);

			OJ.destroy(this._tween, true);
		},


		'getAllowNone' : function(){
			return this._allow_none;
		},
		'setAllowNone' : function(allow_none){
			this._allow_none = allow_none;
		},

		'getItemRenderer' : function(){
			return this._list.getItemRenderer();
		},
		'setItemRenderer' : function(item_renderer){
			this._list.setItemRenderer(item_renderer);

			this._redrawValue();
		},

		'getOptions' : function(){
			return this._options;
		},
		'setOptions' : function(options){
			this._options = options;

			this._redrawList();

			this._redrawValue();

			this.setValue(this._value);
		},

		'getSelected' : function(){
			return this._selected;
		},
		'setSelected' : function(selected){
			if(this._selected != selected){
				if(this._options){
					var key;

					for(key in this._options){
						if(this._options[key] == selected){
							this.setValue(key);

							return;
						}
					}

					if(this._allow_none){
						this.setValue(null);
					}
					else{
						this.setSelectedIndex(0);
					}
				}
				else{
					this._selected = selected;
				}
			}
		},

		'getSelectedIndex' : function(){
			return this._selected_index;
		},
		'setSelectedIndex' : function(index){
			if(this._selected_index != index){
				if(this._options){
					this.setValue(this._options_index[index]);
				}
				else{
					this._selected_index = index;
				}
			}
		},

		'setValue' : function(value){
			if(isEmpty(value)){
				value = null;
			}

			if(this._value != value || (isNull(this._selected_index) && this._options)){
				if(this._options){
					var cnt, ln = cnt = this._options_index.length;

					while(ln-- > 0){
						if(this._options_index[ln] == value){
							break;
						}
					}

					if(cnt){
						if(ln == -1){
							if(this._allow_none){
								this._selected_index = null;
								this._selected = this._none_lbl;

								value = null
							}
							else{
								this._selected_index = 0;

								value = this._options_index[0];

								this._selected = this._options[value];
							}
						}
						else{
							this._selected_index = ln;

							this._selected = this._options[value];
						}
					}
					else{
						this._selected_index = null;
						this._selected = this._allow_none ? this._none_lbl : null;

						value = null;
					}

					ln = cnt = null;
				}
				else{
					this._selected_index = null;
					this._selected = this._none_lbl;
					this._value = null;
				}

				this._redrawValue();

				this._s('OjComboBox', 'setValue', [value]);
			}
		}
	}
);