importJs('oj.data.OjArray');
importJs('oj.components.OjComponent');
importJs('oj.events.OjCollectionEvent');


OJ.extendComponent(
    'OjCollectionComponent', [OjComponent],
    {
        // Internal Properties
        '_props_' : {
            'item_renderer' : null
        },

        // Internal Methods
        '_constructor' : function(elms, item_renderer){
            this._super(OjComponent, '_constructor', arguments);

            this._item_events = {};
            this._rendered = {};

            if(item_renderer){
                this.item_renderer = item_renderer;
            }

            this.elms = elms ? elms : new OjArray();
        },

        '_destructor' : function(){
            // remove all rendered items
            var rendered = this._rendered,
                key;

            for(key in rendered){
                OJ.destroy(rendered[key]);
            }

            // clear out the helper vars
            this._rendered = this._item_events = null;

            this._super(OjComponent, '_destructor', arguments);
        },


        // event functions
        '_addItemListener' : function(type){
            // apply the event listener to all the rendered items if it hasn't already been
            if(!this._item_events[type]){
                var evt = this._convertItemEventType(type),
                    key;

                if(evt){
                    for(key in this._rendered){
                        this._rendered[key].addEventListener(evt[0], this, evt[1]);
                    }

                    this._item_events[type] = evt[0];
                }
            }
        },

        '_convertItemEventType' : function(type){
            var col_evt = OjCollectionEvent,
                ui_evt = OjUiEvent;

            // convert the item event into a mouse event
            if(type == col_evt.ITEM_PRESS){
                return [ui_evt.PRESS, '_onItemPress'];
            }

            if(type == col_evt.ITEM_OVER){
                return [ui_evt.OVER, '_onItemOver'];
            }

            if(type == col_evt.ITEM_OUT){
                return [ui_evt.OUT, '_onItemOut'];
            }

            return null;
        },

        '_dispatchItemEvent' : function(type, evt){
            var self = this,
                item = evt.current_target;

            if(self.item_renderer){
                item = item.data;
            }

            self.dispatchEvent(new OjCollectionEvent(type, [item], self.elms.indexOf(item)));
        },

        '_removeItemListener' : function(type){
            // make sure that no other listeners for this type exist
            if(!this.hasEventListener(type)){
                var evt = this._convertItemEventType(type),
                    key;

                if(evt){
                    // un-apply the event listener to all the rendered items
                    for(key in this._rendered){
                        this._rendered[key].removeEventListener(evt[0], this, evt[1]);
                    }

                    // remove the record fo this item event
                    delete this._item_events[type];
                }
            }
        },


        // event listeners
        '_onItemAdd' : function(evt){
            this.dispatchEvent(evt.clone());
        },

        '_onItemChange' : function(evt){
            this.dispatchEvent(evt.clone());
        },

        '_onItemPress' : function(evt){
            this._dispatchItemEvent(OjCollectionEvent.ITEM_PRESS, evt);
        },

        '_onItemOut' : function(evt){
            this._dispatchItemEvent(OjCollectionEvent.ITEM_OUT, evt);
        },

        '_onItemOver' : function(evt){
            this._dispatchItemEvent(OjCollectionEvent.ITEM_OVER, evt);
        },

        '_onItemMove' : function(evt){
            this.dispatchEvent(evt.clone());
        },

        '_onItemRemove' : function(evt){
            var self = this;

            self.dispatchEvent(evt.clone());

            evt.items.forEachReverse(function(item, index){
                self.unrenderItem(item, index)
            });
        },

        '_onItemReplace' : function(evt){
            var self = this;

            self.dispatchEvent(evt.clone());

            evt.old_items.forEachReverse(function(item, index){
                self.unrenderItem(item, index)
            });
        },


        // elm methods
        '_callElmFunc' : function(func, args){
            return this._callElmProp(func).apply(this.elms, args);
        },

        '_callElmProp' : function(prop, val){
            var cls = this._static,
                container = this.elms,
                translated;

            translated = cls.ELM_FUNCS[prop];

            if(arguments.length > 1){
                container[translated] = val;
            }

            return container[translated]
        },


        // Public Methods
        'addEventListener' : function(type){
            this._super(OjComponent, 'addEventListener', arguments);

            this._addItemListener(type);
        },

        'removeEventListener' : function(type){
            this._super(OjComponent, 'removeEventListener', arguments);

            this._removeItemListener(type);
        },

        //'redraw' : function(){
        //    if(this._super(OjComponent, 'redraw', arguments)){
        //        //this.container.forChildReverse(
        //        //    function(i, child){
        //        //        if(child.is(OjComponent)){
        //        //            child.redraw();
        //        //        }
        //        //    }
        //        //);
        //
        //        return true;
        //    }
        //
        //    return false;
        //},

        'renderItem' : function(item, index){
            if(!item){
                return null;
            }

            var self = this,
                cls = self.item_renderer,
                key, evt,
                id = isObjective(item) ? item.oj_id : (isUnset(index) ? item.toString() : index);

            // if we have already rendered the item then just return the cached value
            if(self._rendered[id]){
                return self._rendered[id];
            }

            item = cls ? new cls(self, item) : item;

            for(key in self._item_events){
                evt = self._convertItemEventType(key);

                item.addEventListener(evt[0], this, evt[1]);
            }

            return self._rendered[id] = item;
        },

        'renderItemAt' : function(index){
            return this.renderItem(this.elms[index]);
        },

        'unrenderItem' : function(item){
            var self = this,
                id = item.oj_id,
                elm = self._rendered[id];

            if(elm){
                delete self._rendered[id];

                // only destroy it if we made it.
                if(item != elm){
                    OJ.destroy(elm);
                }
            }
        },

        'unrenderItemAt' : function(index){
            this.unrenderItem(this.elms[index]);
        },


        // Public Properties
        '.elms' : function(){
            return this._elms;
        },

        '=elms' : function(val){
            var self = this,
                elms = self._elms;

            val = OjArray.array(val);

            if(elms == val){
                return;
            }

            var col_evt = OjCollectionEvent,
                add_evt = col_evt.ITEM_ADD, add_func = '_onItemAdd',
                change_evt = col_evt.ITEM_CHANGE, change_func = '_onItemChange',
                move_evt = col_evt.ITEM_MOVE, move_func = '_onItemMove',
                out_evt = col_evt.ITEM_OUT, out_func = '_onItemOut',
                over_evt = col_evt.ITEM_OVER, over_func = '_onItemOver',
                press_evt = col_evt.ITEM_PRESS, press_func = '_onItemPress',
                remove_evt = col_evt.ITEM_REMOVE, remove_func = '_onItemRemove',
                replace_evt = col_evt.ITEM_REPLACE, replace_func = '_onItemReplace';

            // cleanup the old items if it existed
            if(elms){
                elms.removeEventListener(add_evt, self, add_func);
                elms.removeEventListener(change_evt, self, change_func);
                elms.removeEventListener(move_evt, self, move_func);
                elms.removeEventListener(out_evt, self, out_func);
                elms.removeEventListener(over_evt, self, over_func);
                elms.removeEventListener(press_evt, self, press_func);
                elms.removeEventListener(remove_evt, self, remove_func);
                elms.removeEventListener(replace_evt, self, replace_func);

                if(elms){
                    elms.forEachReverse(function(item){
                        self.unrenderItem(item);
                    });
                }
            }

            // setup the new items
            self._elms = val;

            val.addEventListener(add_evt, self, add_func);
            val.addEventListener(change_evt, self, change_func);
            val.addEventListener(move_evt, self, move_func);
            val.addEventListener(remove_evt, self, remove_func);
            val.addEventListener(replace_evt, self, replace_func);

            return true;
        },

        '=item_renderer' : function(val){
            val = isString(val) ? OJ.stringToClass(val) : val;

            if(val == this._item_renderer){
                return;
            }

            this._item_renderer = val;
        }
    },
    {
        '_TAGS' : ['collection'],

        'ELM_FUNCS' : {
            'appendElm' : 'append',
            'elms' : 'items',
            'forElm' : 'for',
            'forReverseElm' : 'forReverse',
            'getElmAt' : 'getAt',
            'hasElm' : 'contains',
            'indexOfElm' : 'indexOf',
            'insertElmAt' : 'insertAt',
            'moveElm' : 'move',
            'prependElm': 'prepend',
            'num_elms' : 'length',
            'removeAllElms' : 'removeAll',
            'removeElm' : 'remove',
            'removeElmAt' : 'removeAt',
            'replaceElm' : 'replace',
            'replaceElmAt' : 'setAt'
        }
    }
);