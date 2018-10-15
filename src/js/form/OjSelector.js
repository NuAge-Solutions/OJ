importJs("oj.data.OjArray");
importJs("oj.form.OjOption");
importJs("oj.form.OjInput");
importJs("oj.renderers.OjTextRenderer");
importJs("oj.components.OjList");
importJs("oj.events.OjCollectionEvent");


OJ.extendComponent(
    "OjSelector", [OjInput],
    {
        "_props_" : {
            "item_renderer" : OjTextRenderer,
            "options": null,
            "selected": null,
            "selection_min" : 1,
            "selection_max" : 1,
            "selection_renderer" : OjRadioOption
        },

        "_template" : "oj.form.OjSelector",


        "_constructor" : function(name, label, value, options){
            const self = this;

            // default vars
            self._selected = [];
            self._value = [];
            self._values_map = {};

            self._super(OjInput, "_constructor", [name, label, value]);

            // setup the list listeners
            const input = self.input,
                evt = OjCollectionEvent;

            input.addEventListener(evt.ITEM_ADD, self, "_onItemAdd");
            input.addEventListener(evt.ITEM_PRESS, self, "_onItemPress");
            input.addEventListener(evt.ITEM_MOVE, self, "_onItemMove");
            input.addEventListener(evt.ITEM_REMOVE, self, "_onItemRemove");
            input.addEventListener(evt.ITEM_REPLACE, self, "_onItemReplace");
            input.removeEventListener(OjDomEvent.CHANGE, self, "_onChange");

            // set options if available
            if(options){
                self.options = options;
            }
        },


        "_processDomSourceChild" : function(dom_elm, component){
            if(OjElement.isTextNode(dom_elm)){
                return;
            }

            const txt = dom_elm.innerHTML;

            if(txt){
                this.input.addItem(OjObject.importData(txt.parseJson()));
            }
        },

        "_selectOption" : function(option, data){
            const self = this,
                evt = OjEvent,
                max = self._selection_max,
                value = self._value,
                id = data.id;

            if(value.contains(id)){
                return;
            }

            if(max && max == value.length){
                return option.is_selected = false;
            }

            option.is_selected = true;

            value.append(id);

            if(!self._silent){
                self.dispatchEvent(new evt(evt.CHANGE));
            }
        },

        "_unselectOption" : function(option, data){
            const self = this,
                evt = OjEvent,
                min = self._selection_min,
                value = self._value,
                id = data.id,
                index = value.indexOf(id);

            // if not present nothing more to do
            if(index == -1) {
                return;
            }

            if(min && value.length == min){
                return option.is_selected = true;
            }

            option.is_selected = false;

            value.removeAt(index);

            if(!self._silent){
                self.dispatchEvent(new evt(evt.CHANGE));
            }
        },

        "_onInputChange" : function(evt){
            // pass since options will take care of the update
        },

        "_onItemAdd" : function(evt){
            // todo: implement onItemAdd in OjSelector
        },

        "_onItemPress" : function(evt){
            const self = this,
                index = evt.index,
                input = self.input,
                option = input.renderItemAt(index),
                data = input.getElmAt(index);

            if(option.is_selected){
                self._selectOption(option, data);
            }
            else{
                self._unselectOption(option, data);
            }
        },

        "_onItemMove" : function(evt){
            // todo: implement onItemMove in OjSelector
        },

        "_onItemRemove" : function(evt){
            // todo: implement onItemRemove in OjSelector
        },

        "_onItemReplace" : function(evt){
            // todo: implement onItemReplace in OjSelector
        },


        "redraw" : function(){
            const self = this;

            if(self._super(OjInput, "redraw", arguments)){
                self.input.redraw();

                // update the selection
                // this._updateSelection();

                return true;
            }

            return false;
        },


        "=item_renderer" : function(val){
            const self = this;

            if(isString(val)){
                val = OJ.stringToClass(val);
            }

            if(self._item_renderer == val){
                return;
            }

            self._item_renderer = val;

            self.redraw();
        },


        ".options" : function(){
            return this.input.elms;
        },
        "=options" : function(val){
            const self = this,
                evt = OjEvent,
                input = self.input,
                old_value = self._value;

            // check to make sure we don"t do extra work
            if(val == self.options){
                return;
            }

            // enter silent mode
            self._silent = true;

            // reset value & map
            self._value = [];
            self._values_map = {};

            // set the new options
            input.elms = val;

            let id;

            self.options.forEach(function(item, i){
                self._values_map[id = item.id] = item;

                if(old_value.contains(id)){
                    self._selectOption(input.renderItemAt(i), item);
                }
            });

            self.redraw();

            self.dispatchEvent(new evt(evt.CHANGE));

            self._silent = false;
        },

        ".selected" : function(){
            var self = this,
                slctd = [];

            // translate the ids to the data objects
            self.value.forEach(function(val){
                if(val = self._values_map[val]){
                    slctd.append(val);
                }
            });

            return slctd;
        },
        "=selected" : function(val){
            this.value = Array.array(val).map(x => x.id);
        },

        "=selection_max" : function(val){
            var self = this;

            self._selection_max = val;

            if(val != 1 && self.selection_renderer == OjRadioOption){
                self.selection_renderer = OjCheckedOption;
            }
        },

        "=selection_min" : function(val){
            var self = this;

            self._selection_min = val;

            if(val != 1 && self.selection_renderer == OjRadioOption){
                self.selection_renderer = OjCheckedOption;
            }
        },

        ".selection_renderer" : function(){
            return this.input.item_renderer;
        },
        "=selection_renderer" : function(val){
            var self = this;

            self.input.item_renderer = val;

            if(self.selection_renderer == OjRadioOption){
                self.selection_min = 1;
                self.selection_max = 1;
            }
        },

        ".value" : function(){
            var val = this._value;

            // return a copy
            return val ? val : val.clone();
        },

        "=value" : function(val){
            const self = this,
                evt = OjEvent;

            if(self._value != val){
                // store a copy
                self._value = val = Array.array(val);

                // update options selection state
                self.options.forEachReverse(function(item, i){
                    self.input.renderItemAt(i).is_selected = val.contains(item.id);
                });

                // dispatch change event
                self.dispatchEvent(new evt(evt.CHANGE));
            }
        }
    },
    {
        "_TAGS" : ["selector"]
    }
);
