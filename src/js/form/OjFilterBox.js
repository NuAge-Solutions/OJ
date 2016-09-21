importJs('oj.events.OjFocusEvent');
importJs('oj.form.OjComboBox');


OJ.extendClass(
    'OjFilterBox', [OjComboBox],
    {
        '_item_index' : null,  '_previous_search' : null,


        '_constructor' : function(){
            this._super(OjComboBox, '_constructor', arguments);

            // setup event listeners
            this.valueHldr.addEventListener(OjEvent.CHANGE, this, '_onSearch');
            this.valueHldr.addEventListener(OjFocusEvent.IN, this, '_onFocusIn');
            this.valueHldr.addEventListener(OjFocusEvent.OUT, this, '_onFocusOut');

            this._item_index = {};
        },


        '_setDom' : function(dom_elm){
            this._super(OjComboBox, '_setDom', arguments);

            var prnt = this.valueHldr.parent;
            var new_value = new OjTextInput();
            new_value.addCss('value');
            new_value.addEventListener(OjFocusEvent.IN, this, '_onValueFocus');

            prnt.replaceChild(this.valueHldr, new_value);

            this.valueHldr = new_value;
        },


        '_redrawList' : function(/*search = null*/){
            var search = arguments.length && arguments[0] ? arguments[0] : null;
            var old_ln  = this._options_dp.length, new_ln = 0, key;

            if(this._options){
                if(isEmpty(search) || search == this._none_lbl){
                    search = null;
                }
                else{
                    search = search.toLowerCase();
                }

                if(this._previous_search == search){
                    return;
                }

                this._options_index = [];

                this._previous_search = search;

                for(key in this._options){
                    this._options_index.append(key);

                    if(search && this._options[key] && this._item_index[key] && this._item_index[key].indexOf(search) == -1){
                        continue;
                    }

                    if(old_ln > new_ln){
                        if(this._options_dp[new_ln] != this._options[key]){
                            this._options_dp.setItemAt(this._options[key], new_ln);
                        }
                    }
                    else{
                        this._options_dp.addItem(this._options[key]);
                    }

                    new_ln++;
                }
            }
            else{
                this._options_index = [];
            }

            while(old_ln-- > new_ln){
                this._options_dp.removeItemAt(old_ln);
            }
        },

        '_redrawValue' : function(){
            var value = null;

            if(isObject(this._selected)){
                if(isFunction(this._selected.toString)){
                    value = this._selected.toString();
                }
                else{
                    value = this._value;
                }
            }
            else if(this._selected){
                value = this._selected.toString();
            }

            this.valueHldr.value = value;
        },

        '_showList' : function(){
            this._redrawList();

            this._super(OjComboBox, '_showList', arguments);
        },

        '_hideList' : function(){
            this._super(OjComboBox, '_hideList', arguments);

            this._redrawValue();
        },


        '_onSearch' : function(evt){
            this._redrawList(this.valueHldr.value);
        },

        '_onFocusIn' : function(evt){
            this._showList();
        },

        '_onFocusOut' : function(evt){
            var is_child = this.find(evt.target);

            if(!is_child.length){
                this._hideList();
            }
        },

        '_onValueFocus' : function(evt){
            if(this.valueHldr.value == this._none_lbl){
                this.valueHldr.value = null;
            }
        },


        '=options' : function(options){
            var key, key2;

            this._item_index = {};

            for(key in options){
                if(isString(options[key])){
                    this._item_index[key] = options[key].toLowerCase();
                }
                else if(isNumber(options[key])){
                    this._item_index[key] = options[key].toString();
                }
                else if(isObject(options[key])){
                    if(isFunction(options[key].toString)){
                        this._item_index[key] = options[key].toString().toLowerCase();
                    }
                    else{
                        this._item_index[key] = '';

                        for(key2 in options[key]){
                            if(isString(options[key][key2])){
                                this._item_index[key] += ' ' + options[key][key2].toLowerCase();
                            }
                            else if(isNumber(options[key][key2])){
                                this._item_index[key] += ' ' + options[key][key2].toString();
                            }
                        }

                        this._item_index[key] = this._item_index[key].trim();
                    }
                }
            }

            this._options = options;

            this._previous_search = -1;

            this._redrawValue();

            this.value = this._value;
        }
    }
);