importJs('oj.components.OjButton');
importJs('oj.form.OjInput');
importJs('oj.data.OjArray');
importJs('oj.data.OjData');
importJs('oj.components.OjList');


OJ.extendComponent(
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


        "_constructor" : function(name, label, value, options){
            var self = this,
                list = new OjList();

            self._options_index = [];
            self._options = [];

            self._super(OjInput, "_constructor", [name, label || null]);

            self._list = list;
            list.addEventListener(OjCollectionEvent.ITEM_PRESS, self, "_onItemClick");

            self._options_dp = list.dataProvider;

            if(isSet(options)){
                self.options = options;
            }

            if(isSet(value)){
                self.value = value;
            }

            // setup event listeners
//            this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');
//
//            this.psuedoInput.addEventListener(OjUiEvent.PRESS, this, '_onPress');
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
            var self = this,
                input = self.input,
                slctd_i = self._selected_index;

            input.removeAllChildren();

            self._options.forEachReverse((item, i) => {
                const option = new OjStyleElement(
                    "<option value='{0}'{1}></option>".format(
                        item.id,
                        i == slctd_i ? " selected='selected'" : ""
                    )
                );
                option.text = item.label;

                input.insertChildAt(option, 0);
            });
        },

        '_redrawValue' : function(){
            return;
        },


        '_onPress' : function(evt){
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
                options.forEachReverse((option, i) => {
                    option = isObjective(option, OjData) ? option : new OjData(String.string(option), option)

                    if(option.id == self._value){
                        self._selected = option;
                        self._selected_index = i;
                    }

                    opts.prepend(option);
                });
            }
            else if(isObject(options)){
                var i = 0;

                for(key in options){
                    option = options[key];

                    option = isObjective(option, OjData) ? option : new OjData(key, option)

                    if(option.id == self._value){
                        self._selected = option;
                        self._selected_index = i;
                    }

                    opts.append(option);

                    i++;
                }
            }
            else{
                self._selected_index = null;
                self._selected = null;
                self._value = null;
            }

            self._redrawList();

            self._redrawValue();
        },

        '=selected' : function(selected){
            var self = this;

            if(self._selected != selected){
                self._selected = selected;

                self.options.forEachReverse((option, i) => {
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
            const self = this;

            if(self._value == value){
                return;
            }

            self.options.forEachReverse((option, i) => {
                if(option.id == value){
                    self._selected = option;
                    self._selected_index = i;

                    return false;
                }
            });

            self.input.dom.selectedIndex = self._selected_index;

            self._super(OjInput, '=value', arguments);
        }
    },
    {
        "_TAGS" : ["select-input"]
    }
);