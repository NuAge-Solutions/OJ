importJs('oj.form.OjFilterBox');
importJs('oj.form.OjToken');
importJs('oj.components.OjList');


OJ.extendComponent(
    'OjTokenInput', [OjInput],
    {
        '_props_' : {
            'allowNone' : true,
            'allow_duplicates' : false,
            'options' : null,
            'selected' : null
        },

//        '_available' : null,  'filterBox' : null,


        '_constructor' : function(/*name, label, value, list = Object*/){
            var ln = arguments.length;

            // setup the value and options
            this._selected = [];
            this._value = [];

            this._super(OjInput, '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);

            if(ln > 2){
                if(ln > 3){
                    this.options = arguments[3];
                }

                this.value = arguments[2];
            }

            // setup event listeners
            this.valueHldr.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onListItemRemove');

            this.filterBox.addEventListener(OjEvent.CHANGE, this, '_onFilterChange');
        },


//        '_setDom' : function(dom_elm){
//            this._super(OjInput, '_setDom', arguments);
//
//            var prnt = this.input.parent();
//
//            // customize the input holder
//            this.filterBox = new OjFilterBox();
//            this.filterBox.setAllowNone(true);
//            this.filterBox.setValue(null);
//            this.filterBox.addCss('filter', 'grey');
//
//            prnt.insertChildAt(this.filterBox, prnt.indexOfChild(this.input) + 1);
//
//            // customize the value holder
//            this.valueHldr = new OjList();
//            this.valueHldr.setItemRenderer(OjToken);
//            this.valueHldr.addCss('value');
//
//            this.inputWrpr.appendChild(this.valueHldr);
//        },


        '_addValue' : function(value/*, suppress_event = false*/){
            return this._addValueAt(value, this._value.length, arguments.length > 2 ? arguments[2] : false);
        },

        '_addValueAt' : function(value, index/*, suppress_event = false*/){
            // update the values list
            this._value.insertAt(value, index);

            if(!this._options){
                return;
            }

            // update the selected list
            this._selected.insertAt(this._options[value], index);

            // update value display
            this.valueHldr.addItemAt(this._options[value], index);

            // update filter list
            if(!this._allow_duplicate){
                delete this._available[value];

                this.filterBox.options = this._available;

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
                this._values.removeAt(index);

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
            if(evt.target == this.filterBox && this.filterBox.value != null){
                this._addValue(this.filterBox.value);

                this.filterBox.value = null;
            }
        },

        '_onListItemRemove' : function(evt){
            // update values
            var removed = this._value.removeAt(evt.index);
            this._selected.removeAt(evt.index);

            // update filter list
            if(!this._allow_duplicate){
                this._available[removed] = this._options[removed];

                this.filterBox.options = this._available;

                this.filterBox.show();
            }
        },


        '.options' : function(options){
            this._options = options;

            this._available = OJ.merge({}, options);

            this.filterBox.options = this._available;

            this.value = this._value.clone();
        },

        '.tokenRenderer' : function(){
            return this.valueHldr.item_renderer;
        },
        '=tokenRenderer' : function(renderer){
            this.valueHldr.item_renderer = renderer;
        },

        '_onChange' : function(){},

        '=value' : function(value){
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
    },
    {
        '_TAGS' : ['token-input']
    }
);