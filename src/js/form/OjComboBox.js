OJ.importJs('oj.components.OjButton');
OJ.importJs('oj.form.OjInput');
OJ.importJs('oj.data.OjArray');
OJ.importJs('oj.data.OjData');
OJ.importJs('oj.components.OjList');

OJ.importCss('oj.form.OjComboBox');


OJ.extendClass(
    'OjComboBox', [OjInput],
    {
        '_props_' : {
            'allow_none' : null,
            'item_renderer' : null,
            'options' : null,
            'selected' : null,
            'selected_index' : null
        },

        '_list_visible' : false, '_ignore_click' : false, '_none_lbl' : '-- Select -- ',


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
        },

        '_redrawValue' : function(){
            return;
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


        // Public Properties
        '.item_renderer' : function(){
            return this._list.item_renderer;
        },
        '=item_renderer' : function(item_renderer){
            this._list.item_renderer = item_renderer;

            this._redrawValue();
        },

        '=options' : function(options){
            var self = this,
                opts = self._options,
                key, option;

            if(options == opts){
                return;
            }

            self._options = opts = [];

            if(isArray(options)){
                options.forEachReverse(function(option, i){
                    option = options[i];

                    opts.prepend(
                        isObjective(option, OjData) ? option : new OjData(String.string(option), option)
                    );
                });
            }
            else if(isObject(options)){
                for(key in options){
                    option = options[key];

                    opts.append(
                        isObjective(option, OjData) ? option : new OjData(key, option)
                    );
                }
            }

            self._redrawList();

            self._redrawValue();

            self.value = self._value;
        },

        '=selected' : function(selected){
            var self = this;

            if(self._selected != selected){
                self._selected = selected;

                self.options.forEachReverse(function(option, i){
                    if(option == selected){
                        self._selected_index = i;
                        self._value = option.id;

                        return false;
                    }
                });
            }
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

        '=value' : function(value){
            var self = this;

            if(self._value == value){
                return;
            }

            self._super(OjInput, '=value', arguments);

            self.options.forEachReverse(function(option, i){
                if(option.id == value){
                    self._selected = option;
                    self._selected_index = i;

                    return false;
                }
            });

            self.input.selectedIndex = self._selected_index;
        }
    }
);