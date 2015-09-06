OJ.importJs('oj.components.OjButton');
OJ.importJs('oj.form.OjInput');
OJ.importJs('oj.data.OjArray');
OJ.importJs('oj.data.OjData');
OJ.importJs('oj.components.OjList');

OJ.importCss('oj.form.OjComboBox');


OJ.extendClass(
    'OjComboBox', [OjInput],
    {
//		'_options' : null,  '_options_dp' : null,  '_options_index' : null,  '_selected' : null,
//
//    '_selected_index' : null,  '_trigger_evt' : null,  '_tween' : null,  '_list' : null,

        '_list_visible' : false, '_ignore_click' : false, '_allow_none' : false, '_none_lbl' : '-- Select -- ',


        '_constructor' : function(/*name, label, value, options*/){
            var ln = arguments.length;

            this._options_index = [];

            this._super(OjInput, '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);

            this._list = new OjList();
            this._list.addEventListener(OjCollectionEvent.ITEM_PRESS, this, '_onItemClick');

            this._options_dp = this._list.dataProvider;

            if(ln > 2){
                if(ln > 3){
                    this.options = arguments[3];
                }

                this.value = arguments[2];
            }

            // setup event listeners
//			this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');
//
//			this.psuedoInput.addEventListener(OjUiEvent.PRESS, this, '_onClick');
        },

        '_setDom' : function(dom_elm){
            this._super(OjInput, '_setDom', arguments);

            var select = new OjStyleElement('<select class="input"></select>');

            this.stem.replaceChild(this.input, select);

            this.input = select;

            this.dflt.hide();
        },

        '_showList' : function(){
            // check to see if the list is already shown
            if(this._list_visible){
                return;
            }

            // prepare the list so we can extract the height and animate it in
            this._list.alpha = 0;
            this._list.show();

            // get the actual height of the list
            var h = this._list.height;

            // now set it back to 0 so we can animate it to its full height
            this._list.height = 0;

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
            OJ.addEventListener(OjUiEvent.PRESS, this, '_onPageClick');

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

            OJ.removeEventListener(OjUiEvent.PRESS, this, '_onPageClick');

            this._trigger_evt = null;

            this._list_visible = this._ignore_click = false;
        },


        '_redrawList' : function(){
            this.input.removeAllChildren();

            var ln = this._options.length;

            for(; ln--;){
                this.input.insertChildAt(
                    new OjStyleElement(
                        OJ.tokensReplace(
                            '<option value="[%value]">[%label]</option>',
                            {
                                'value' : this._options[ln].id,
                                'label' : this._options[ln].label
                            }
                        )
                    ),
                    0
                );
            }

            return;

//			var old_ln  = this._options_dp.numItems(),
//          new_ln = 0, key;
//
//			this._options_index = [];
//
//			for(key in this._options){
//				if(old_ln > new_ln){
//					if(this._options_dp.getItemAt(new_ln) != this._options[key]){
//						this._options_dp.setItemAt(this._options[key], new_ln);
//					}
//				}
//				else{
//					this._options_dp.addItem(this._options[key]);
//				}
//
//				this._options_index.push(key);
//
//				new_ln++;
//			}
//
//			for(; old_ln-- > new_ln; ){
//				this._options_dp.removeItemAt(old_ln);
//			}
//
//			if(this._allow_none){
//				if(this._options_dp.getItemAt(0) != this._none_lbl){
//					this._options_dp.addItemAt(this._none_lbl, 0);
//				}
//			}
//			else if(this._options_dp.getItemAt(0) == this._none_lbl){
//				this._options_dp.removeItemAt(0);
//			}
        },

        '_redrawValue' : function(){
//      this.input.dom.value = this._value;

            return;

//			var value,
//          item_renderer = this.getItemRenderer();
//
//			if(
//				!this.valueHldr.numChildren ||
//					!(value = this.valueHldr.getChildAt(0)).is(item_renderer)
//				){
//				this.valueHldr.removeAllChildren();
//
//				this.valueHldr.appendChild(new item_renderer(this._selected));
//			}
//			else{
//				value.setData(this._selected);
//			}
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
            this.selected = evt.item;

            this._ignore_click = true;
        },

        '_onPageClick' : function(evt){
            if(this._trigger_evt == evt){
                return;
            }

            this._hideList();
        },

        '_onTween' : function(evt){
            this._list.height = OjStyleElement.AUTO;

            OJ.destroy(this._tween, true);
        },


        '.allowNone' : function(){
            return this._allow_none;
        },
        '=allowNone' : function(allow_none){
            this._allow_none = allow_none;
        },

        '.item_renderer' : function(){
            return this._list.item_renderer;
        },
        '=item_renderer' : function(item_renderer){
            this._list.item_renderer = item_renderer;

            this._redrawValue();
        },

        '.options' : function(){
            return this._options;
        },
        '=options' : function(options){
            if(options == this._options){
                return;
            }

            var i;

            this._options = [];

            if(isObject(options)){
                for(i in options){
                    this._options.append(new OjData(i, options[i]));
                }
            }
            else if(isArray(options) && (i = options.length) && !isObject(options[0])){
                for(; i--;){
                    this._options.prepend(new OjData(options[i], options[i]));
                }
            }

            this._redrawList();

            this._redrawValue();

            this.value = this._value;

            return this._options;
        },

        '.selected' : function(){
            return this._selected;
        },
        '=selected' : function(selected){
            if(this._selected != selected){
                if(this._options){
                    var key;

                    for(key in this._options){
                        if(this._options[key] == selected){
                            this.value = key;

                            return;
                        }
                    }

                    if(this._allow_none){
                        this.value = null;
                    }
                    else{
                        this.selectedIndex = 0;
                    }
                }
                else{
                    this._selected = selected;
                }
            }
        },

        '.selectedIndex' : function(){
            return this._selected_index;
        },
        '=selectedIndex' : function(index){
            if(this._selected_index != index){
                if(this._options){
                    this.value = this._options_index[index];
                }
                else{
                    this._selected_index = index;
                }
            }
        },

        '.value' : function(){
            var ln = this._options.length,
                id = this.input.dom.value,
                option, option_id;

            for(; ln--;){
                option = this._options[ln];
                option_id = option.id;

                if(option_id == id){
                    return option.is(OjData) ? option_id : option;
                }
            }

            return null;
        },
        '=value' : function(value){
            if(isEmpty(value)){
                value = null;
            }
            else if(!isObject(value)){
                var ln = this._options.length;

                for(; ln--;){
                    if(this._options[ln].id == value){
                        value = this._options[ln];

                        break;
                    }
                }

                if(!isObject(value)){
                    value = null;
                }
            }

//			if(this._value != value || (isNull(this._selected_index) && this._options)){
//				if(this._options){
//					var cnt, ln = cnt = this._options_index.length;
//
//					for(; ln--;){
//						if(this._options_index[ln] == value){
//							break;
//						}
//					}
//
//					if(cnt){
//						if(ln == -1){
//							if(this._allow_none){
//								this._selected_index = null;
//								this._selected = this._none_lbl;
//
//								value = null
//							}
//							else{
//								this._selected_index = 0;
//
//								value = this._options_index[0];
//
//								this._selected = this._options[value];
//							}
//						}
//						else{
//							this._selected_index = ln;
//
//							this._selected = this._options[value];
//						}
//					}
//					else{
//						this._selected_index = null;
//						this._selected = this._allow_none ? this._none_lbl : null;
//
//						value = null;
//					}
//
//					ln = cnt = null;
//				}
//				else{
//					this._selected_index = null;
//					this._selected = this._none_lbl;
//					this._value = null;
//				}
//
//				this._redrawValue();

            if(this._super(OjInput, '=value', [value])){
                this.input.dom.value = value ? value.id : null;
            }
//			}
        }
    }
);