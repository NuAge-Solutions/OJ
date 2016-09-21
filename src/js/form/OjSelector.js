importJs('oj.data.OjArray');
importJs('oj.form.OjOption');
importJs('oj.form.OjInput');
importJs('oj.renderers.OjTextRenderer');
importJs('oj.components.OjList');
importJs('oj.events.OjCollectionEvent');


OJ.extendComponent(
    'OjSelector', [OjInput],
    {
        '_props_' : {
            'item_renderer' : OjTextRenderer,
            'selectionMin' : 0,
            'selectionMax' : 1
        },

        '_template' : 'oj.form.OjSelector',


        '_constructor' : function(/*name, label, value, options*/){
            var args = arguments,
                ln = args.length;

            // default the value
            this._value = [];

            this._super(OjInput, '_constructor', ln > 2 ? Array.array(args).slice(0, 2) : args);

            // setup the list listeners
            this.input.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
            this.input.addEventListener(OjCollectionEvent.ITEM_PRESS, this, '_onItemClick');
            this.input.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
            this.input.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
            this.input.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');
            this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');

            // set options if available
            if(ln > 3){
                this.options = args[3];
            }
        },

        '_setDom' : function(dom_elm){
            this._super(OjInput, '_setDom', arguments);
//
//      var list = new OjList();
//      list.setItemRenderer(OjOption);
//      list.addCss('input');
//
//      this.stem.replaceChild(this.input, list);
//
//      this.input = list;
        },


        '_processDomSourceChild' : function(dom_elm, component){
            if(OjElement.isTextNode(dom_elm)){
                return;
            }

            var txt = dom_elm.innerHTML;

            if(txt){
                this.input.addItem(OjObject.importData(txt.parseJson()));
            }
        },

        '_selectOption' : function(option, data){
            if(this._value.indexOf(data) > -1){
                return;
            }

            if(this._selectionMax && this._selectionMax == this._value.length){
                this.input.renderItem(this._value.shift()).isSelected = false;
            }

            option.isSelected = true;

            this._value.append(data);

            this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
        },

        '_toggleOptionAt' : function(index){
            var option = this.input.renderItemAt(index),
                data = this.input.getElmAt(index);

            if(option.isSelected){
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

            option.isSelected = false;

            this._value.removeAt(index);

            this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
        },

        '_updateSelection' : function(){
            // make sure we remove any stale values and replace with fresh if possible
            var ln = this._value.length;

            for(; ln--;){
                if(this.input.indexOfElm(this._value[ln]) == -1){
                    this._value.removeAt(ln);
                }
            }

            // make sure we have the at least the min amount selected
            var i = 0,
                ln2 = this.input.num_elms;

            for(; (ln = this._value.length) < this._selectionMin && i < ln2; i++){
                this._selectOption(this.input.renderItemAt(i), this.input.getElmAt(i));
            }
        },

        '_onInputChange' : function(evt){
            // pass since options will take care of the update
        },

        '_onItemAdd' : function(evt){
            this._updateSelection();
        },

        '_onItemClick' : function(evt){
            this._toggleOptionAt(evt.index);
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
            var index, old_data = this._options[evt.index];

            if((index = this._value.indexOf(old_data)) > -1){
                this._value[index] = evt.item;
            }

            this.options.getChildAt(evt.index).data = evt.item;
        },


        'redraw' : function(){
            if(this._super(OjInput, 'redraw', arguments)){
                this.input.redraw();

                // update the selection
                this._updateSelection();

                return true;
            }

            return false;
        },


        '=item_renderer' : function(val){
            if(isString(val)){
                val = OJ.stringToClass(val);
            }

            if(this._item_renderer == val){
                return;
            }

            this._item_renderer = val;

            this.redraw();
        },


        '.options' : function(){
            return this.input.dataProvider;
        },
        '=options' : function(val){
            // check to make sure we don't do extra work
            if(val == this.options){
                return;
            }

            // get the old selected indices
            var indices = [],
                ln = this._value.length,
                options, index, ln2;

            for(; ln--;){
                indices.unshift(this.input.indexOfElm(this._value[ln]));
            }

            this._value = [];

            // set the new options
            this.input.dataProvider = val;

            // get the new options
            ln = (options = this.options).length;

            // try to select previous selected indices
            ln2 = indices.length;

            for(; ln2--;){
                if((index = indices[ln2]) < ln){
                    this._selectOption(this.input.renderItemAt(index), options.getItemAt(index));
                }
            }

            this.redraw();
        },

        '=value' : function(val){
            val = Array.array(val);

            if(this._value != val){
                if(this._value = val){
                    var options = this.options,
                        ln = options.length;

                    for(; ln--;){
                        this.input.renderItemAt(ln).isSelected = val.indexOf(options[ln]) > -1;
                    }
                }

                this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
            }
        },

        '.selectionRenderer' : function(){
            return this.input.item_renderer;
        },
        '=selectionRenderer' : function(val){
            this.input.item_renderer = val;

            if(this.selectionRenderer == OjRadioOption){
                this.selectionMin = 1;
                this.selectionMax = 1;
            }
        }
    },
    {
        '_TAGS' : ['selector']
    }
);