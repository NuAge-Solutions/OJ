importJs('oj.events.OjActionable');


OJ.extendClass(
    'OjArray', [OjActionable],
    {
        '_props_' : {
            'allow_duplicates' : true,
            'first' : null,
            'last' : null,
            'length' : null
        },


        // internal methods
        '_constructor' : function(items){
            var self = this;

            self._super(OjActionable, '_constructor', []);

            self._items = [];

            if(items){
                if(isObject(items)){
                    var ary = [],
                        key;

                    for(key in items){
                        ary.append(items[key]);
                    }

                    items = ary;
                }

                self._updateIndexProperties(items.length);

                self._items = items;
            }
        },

        '_addIndexProperty' : function(index){
            Object.defineProperty(this, index, {
                'configurable': true,
                'enumerable': true,
                'get': function(){ return this._getIndex.call(this, index); },
                'set' : function(newValue){ return this._setIndex.call(this, index, newValue); }
            });
        },

        '_callArrayFunc' : function(func, args){
            var items = this._items;

            return items[func].apply(items, args);
        },

        '_checkDuplicate' : function(item){
            if(!this.allow_duplicates && this.contains(item)){
                throw 'Duplicate value not allowed.';
            }
        },

        '_checkDuplicates' : function(items){
            var self = this;

            items.forEachReverse(
                function(item){
                    self._checkDuplicate(item);
                }
            );
        },

        '_dispatchAdd' : function(items, index){
            var col_evt = OjCollectionEvent;

            this.dispatchEvent(new col_evt(col_evt.ITEM_ADD, items, index));
        },

        '_getIndex' : function(index){
            return this._items[index];
        },

        '_processIndex' : function(index){
            return index >= 0 ? index : this.length + index;
        },

        '_removeIndexProperty' : function(index){
            delete this[index];
        },

        '_setIndex' : function(index, item){
            var self = this,
                col_evt = OjCollectionEvent,
                items = self._items,
                old_item = items[index];

            // check for change
            if(old_item == item){
                return
            }

            self._checkDuplicate(item)

            items[index] = item;

            self.dispatchEvent(new col_evt(col_evt.ITEM_REPLACE, [item], index, [old_item]));

            return item;
        },

        '_updateIndexProperties' : function(newLength){
            var ln = this.length,
                diff = newLength - ln;

            if(diff > 0){
                for(; diff--;){
                    this._addIndexProperty(ln + diff);
                }
            }
            else if(diff < 0){
                for(; diff++ < 0;){
                    this._removeIndexProperty(ln + diff);
                }
            }
        },


        // public methods
        'append' : function(){
            var self = this,
                args = Array.array(arguments),
                check = self._checkDuplicates(args),
                ln = self.length,
                index = self._updateIndexProperties(ln + args.length),
                rtrn = self._callArrayFunc('append', args);

            self._dispatchAdd(args, ln);

            return rtrn;
        },

        'clone' : function(){
            var self = this,
                obj = new self._static(self._items.clone());

            obj.allow_duplicates = self.allow_duplicates;

            return obj;
        },

        'contains' : function(){
            return this._callArrayFunc('contains', arguments);
        },

        'dispatchEvent' : function(evt){
            var col_evt = OjCollectionEvent,
                self = this;

            self._super(OjActionable, 'dispatchEvent', arguments);

            if(col_evt.isChangeEvent(evt)){
                self.dispatchEvent(new col_evt(col_evt.ITEM_CHANGE, evt.items, evt.index, evt.old_items));
            }
        },

        'equalize' : function(){
            return this._callArrayFunc('equalize', arguments);
        },

        "exportData" : function(){
            return this._items;
        },

        'forEach' : function(){
            return this._callArrayFunc('forEach', arguments);
        },

        'forEachReverse' : function(){
            return this._callArrayFunc('forEachReverse', arguments);
        },

        'getAt' : function(index){
            return this[index];
        },

        'indexOf' : function(){
            return this._callArrayFunc('indexOf', arguments);
        },

        'insertAt' : function(){
            var self = this,
                args = Array.array(arguments),
                check = self._checkDuplicates(args),
                index = self._updateIndexProperties(self.length + args.length - 1),
                rtrn = self._callArrayFunc('insertAt', args);

            self._dispatchAdd(args.slice(0, -1), args.last);

            return rtrn;
        },

        'join' : function() {
            return this._callArrayFunc('join', arguments);
        },

        "map" : function(){
            return this._callArrayFunc("map", arguments);
        },

        'move' : function(item, index){
            var self = this,
                check = self._checkDuplicate(item),
                col_evt = OjCollectionEvent,
                rtrn = this._callArrayFunc('move', arguments);

            self.dispatchEvent(new col_evt(col_evt.ITEM_MOVE, [item], index));

            return rtrn;
        },

        'prepend' : function(){
            var self = this,
                args = Array.array(arguments),
                check = self._checkDuplicates(args),
                index = self._updateIndexProperties(self.length + args.length),
                rtrn = self._callArrayFunc('prepend', args);

            self._dispatchAdd(args, 0);

            return rtrn;
        },

        'remove' : function(){
            var self = this,
                args = Array.array(arguments),
                index = self._updateIndexProperties(self.length - args.length),
                col_evt = OjCollectionEvent;

            // find the lowest index
            args.forEachReverse(function(item, i){
                i = self.indexOf(item);

                if(isUnset(index) || i < index){
                    index = i > -1 ? i : index;
                }
            });

            // process the request
            var rtrn = self._callArrayFunc('remove', args)

            // dispatch the event
            self.dispatchEvent(new col_evt(col_evt.ITEM_REMOVE, args, index));

            return rtrn;
        },

        'removeAll' : function(){
            var self = this,
                items = self._items,
                col_evt = OjCollectionEvent;;

            self._items = [];

            self._updateIndexProperties(0);

            self.dispatchEvent(new col_evt(col_evt.ITEM_REMOVE, items, 0));

            return items;
        },

        'removeAt' : function(){
            var self = this,
                args = Array.array(arguments),
                index = self._updateIndexProperties(self.length - args.length),
                col_evt = OjCollectionEvent;

            // find the lowest index
            args.forEachReverse(function(item){
                if(isUnset(index) || item < index){
                    index = item;
                }
            });

            // process the request
            var rtrn = self._callArrayFunc('removeAt', args)

            // dispatch the event
            self.dispatchEvent(new col_evt(col_evt.ITEM_REMOVE, rtrn, index));

            return rtrn;
        },

        'removeFirst' : function(){
            var self = this,
                col_evt = OjCollectionEvent;

            self._updateIndexProperties(self.length - 1);

            var rtrn = self._callArrayFunc('removeFirst', arguments);

            self.dispatchEvent(new col_evt(col_evt.ITEM_REMOVE, [rtrn], 0));

            return rtrn;
        },

        'removeLast' : function(){
            var self = this;

            self._updateIndexProperties(self.length - 1);

            return self._callArrayFunc('removeLast', arguments);
        },

        'replace' : function(){
            // todo: add dispatch replace event
            return this._callArrayFunc('replace', arguments);
        },

        'replaceAll' : function(){
            // todo: add dispatch replace event

            return this._callArrayFunc('replaceAll', arguments);
        },

        'reverse' : function(){
            return this._callArrayFunc('reverse', arguments);
        },

        'setAt' : function(index, value){
            return this[index] = value;
        },

        'sort' : function(){
            var self = this,
                cls = self._static;

            return new cls(self._callArrayFunc('sort', arguments));
        },

        'unique' : function(){
            return this._callArrayFunc('unique', arguments);
        },


        // public properties
        '.first' : function(){
            return this._items.first;
        },
        '=first' : function(val){
            this._items.first = val;
        },

        '.last' : function(){
            return this._items.last;
        },
        '=last' : function(val){
            this._items.last = val;
        },

        '.length' : function(){
            return this._items.length;
        },
        '=length' : function(val){
            return this._items.length = val;
        }
    },
    {
        'array' : function(obj){
            if(isObjective(obj, OjArray)){
                return obj;
            }

            if(!isArray(obj)){
                obj = [obj];
            }

            return new OjArray(obj);
        }
    }
);




// Modify Built-In Array Class
Array.array = function(obj){
    if(isNull(obj)){
        return [];
    }
    else if(isArray(obj)){
        return obj.clone();
    }
    else if((isObject(obj) || isFunction(obj)) && !isUndefined(obj.length)){
        return [].slice.call(obj, 0);
    }

    return [obj];
};

Array._isArray = Array.isArray;

Array.isArray = function(obj){
    return (Array._isArray ? Array._isArray(obj) : Object.prototype.toString.call(obj) === "[object Array]") ||
           (window["OjArray"] && isObjective(obj, OjArray));
};

if(!Array.slice){
    Array.slice = function(ary, start/*, end*/){
        var args = Array.array(arguments);

        ary = Array.array(ary);

        return ary.slice.apply(ary, args.slice(1));
    };
}


var proto = Array.prototype

if(!proto.append){
    proto.append = proto.push;
}

if(!proto.clone){
    proto.clone = function(){
        return this.slice(0);
    };
}

if(!proto.contains){
    proto.contains = function(obj){
        return this.indexOf(obj) != -1;
    };
}

if(!proto.equalize){
    proto.equalize = function(obj){
        var ln = this.length,
            ln2,
            v = null;

        if(!Array.isArray(obj)){
            v = obj;

            obj = [obj];
        }

        ln2 = obj.length;

        for(; ln2-- > ln;){
            obj.push(v);
        }

        return obj;
    };
}

if(!proto.first){
    Object.defineProperty(proto, 'first', {
        'configurable' : false,
        'enumerable' : false,
        'get' : function(){
            var self = this;

            return self.length ? self[0] : null;
        },
        'set' : function(newValue){
            var self = this;

            if(self.length){
                self[0] = val;
            }
            else{
                self.append(newValue);
            }
        }
    });
}

proto.oldForEach = proto.forEach;

proto.forEach = function(callback, context){
    var self = this,
        ln = self.length,
        i = 0;

    context = context || self;

    for(; i < ln; i++){
        if(callback.call(context, self[i], i, self) === false){
            break
        }
    }

    return i == ln
};

if(!proto.forEachReverse){
    proto.forEachReverse = function(callback, context){
        var self = this,
            ln = self.length;

        context = context || self;

        for(; ln--;){
            if(callback.call(context, self[ln], ln, self) === false){
                break;
            }
        }

        return ln == 0
    };
}

if(!proto.indexOf){
    proto.indexOf = function(needle, from){
        var self = this,
            ln = self.length,
            from = Number(from) || 0;

        from = (from < 0) ? Math.ceil(from) : Math.floor(from);

        if(from < 0){
            from += ln;
        }

        for(; from < ln; from++){
            if(from in self && self[from] === needle){
                return from;
            }
        }

        return -1;
    };
}

if(!proto.insertAt){
    proto.insertAt = function(/*item, item2... n, index*/){
        var args = Array.array(arguments),
            new_args = args.slice(0, -1), // get all the items to insert
            self = this;

        // add the insert start index and delete count
        new_args.splice(0, 0, args.last, 0);

        // call native splice
        return self.splice.apply(self, new_args);
    };
}

if(!proto.last){
    Object.defineProperty(proto, 'last', {
        'configurable' : false,
        'enumerable' : false,
        'get' : function(){
            var ln = this.length;

            return ln ? this[ln - 1] : null;
        },
        'set' : function(newValue){
            var ln = this.length;

            if(ln){
                this[ln - 1] = val;
            }
            else{
                this.append(newValue);
            }
        }
    });
}

if(!proto.move){
    proto.move = function(old_index, new_index){
        var ln = this.length;

        if(new_index >= ln){
            var k = new_index - ln;

            for(; (k--) + 1;){
                this.push(undefined);
            }
        }

        this.splice(new_index, 0, this.splice(old_index, 1)[0]);

        return this;
    };
}

if(!proto.prepend){
    proto.prepend = proto.unshift;
}

if(!proto.remove){
    proto.remove = function(val/*, ...*/){
        var self = this,
            needle, i,
            a = arguments,
            ln = a.length,
            removed = [];

        for(; ln-- && self.length;){
            needle = a[ln];

            for(; (i = self.indexOf(needle)) > -1;){
                removed.append(self.splice(i, 1));
            }
        }

        return removed;
    };
}

if(!proto.removeAll){
    proto.removeAll = function(){
        var removed = this.clone();

        this.length = 0;

        return removed;
    };
}

if(!proto.removeAt){
    proto.removeAt = function(index){
        var removed = [],
            args = arguments,
            ln = args.length;

        for(; ln--;){
            removed.append(this.splice(args[ln], 1));
        }

        return removed;
    }
}

if(!proto.removeFirst){
    proto.removeFirst = proto.shift;
}

if(!proto.removeLast){
    proto.removeLast = proto.pop;
}


proto.origReplace = proto.replace;

proto.replace = function(needle, replace){
    var result, i, ln;

    if(Array.isArray(needle)){
        result = this.clone();

        ln = needle.length;

        replace = needle.equalize(replace);

        for(i = 0; i < ln; i++){
            result = result.origReplace(needle[i], replace[i]);
        }

        return result;
    }
    else{
        return this.origReplace(needle, replace);
    }
};

if(!proto.replaceAll){
    proto.replaceAll = function(needle, replace, recursive){
        var result = [],
            i = 0,
            ln = this.length,
            j, ln2, hay;

        if(Array.isArray(needle)){
            ln2 = needle.length;

            replace = needle.equalize(replace);

            for(i; i < ln; i++){
                hay = this[i];

                for(j = 0; j < ln2; j++){
                    if(needle[j] == hay){
                        result.push(replace[j]);
                    }
                    else if(recursive && Array.isArray(hay)){
                        result.push(hay.replaceAll(needle[j], replace[j], true));
                    }
                    else{
                        result.push(hay);
                    }
                }
            }
        }
        else{
            for(i; i < ln; i++){
                hay = this[i];

                if(needle == hay){
                    result.push(replace);
                }
                else if(recursive && Array.isArray(hay)){
                    result.push(hay.replaceAll(needle, replace, true));
                }
                else{
                    result.push(hay);
                }
            }
        }

        return result;
    };
}

if(!proto.replaceAt){
    proto.replaceAt = function(item, index){
        return this.splice(index, 1, item);
    };
}

if(!proto.unique){
    proto.unique = function(){
        var ary = [],
            self = this,
            ln = self.length,
            item;

        for(; ln--;){
            item = self[ln];

            if(ary.indexOf(item) < 0){
                ary.unshift(item);
            }
        }

        return ary;
    };
}

Array.range = function(start, end){
    const length = end - start;

    return Array.from({ length }, (_, i) => start + i);
};