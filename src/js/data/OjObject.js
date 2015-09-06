// Modify Built-In Object Class
if(!Object.create){
    Object.create = function(o){
        if(arguments.length > 1){
            throw new Error('Object.create implementation only accepts the first parameter.');
        }

        function F(){
        }

        F.prototype = o;

        return new F();
    };
}

if(!Object.keys){
    Object.keys = function(obj){
        if(obj !== Object(obj)){
            throw new TypeError('Object.keys called on non-object');
        }

        if(obj.__count__){
            return obj.__count__;
        }

        var key, rtrn = [];

        for(key in obj){
            if(Object.prototype.hasOwnProperty.call(obj, key)){
                rtrn.append(key);
            }
        }

        key = null;

        return rtrn;
    };
}

Object.numKeys = function(obj){
    return isSet(obj) ? Object.keys(obj).length : 0;
};

Object.toJson = function(obj){

};

Object.clone = function(obj){
    var cloned = {}, key;

    for(key in obj){
        cloned[key] = obj[key];
    }

    return cloned;
};

Object.concat = function(obj, obj2/*, ...objs*/){
    var key, i,
        ln = arguments.length;

    for(i = 1; i < ln; i++){
        for(key in arguments[i]){
            obj[key] = arguments[i][key];
        }
    }

    return obj;
};




// Setup OjObject Class
window.OjObject = function(){ };

OjObject.prototype = {
    '_post_compile_' : [],

    '_propCompile_' : function(context, props){
        var key, prop, val,
            props = context[props],
            is_getter = props != '_set_props_',
            is_setter = props != '_get_props_';

        if(isFunction(context['_processProp_'])){
            this._processProp_ = context['_processProp_'];
        }

        for(key in props){
            prop = '_' + key;
            val = props[key];

            // store the default value of the property
            if(isSet(val)){
                this[prop] = val;
            }

            this._processProp_(key, prop, is_getter ? '.' + key : null, is_setter ? '=' + key : null);
        }
    },

    '_processProp_' : function(key, prop, getter, setter){
        // define property
        Object.defineProperty(this, key, {
            'configurable': true,
            'enumerable': false,
            'get' : function(){
                if(!getter){
                    throw 'Property "' + key + '" get not allowed.'
                }

                var get_func = this[getter];

                if(get_func){
                    return get_func.call(this);
                }

                return this[prop];
            },
            'set' : function(newValue){
                if(!setter){
                    throw 'Property "' + key + '" set not allowed.'
                }

                var set_func = this[setter];

                if(set_func){
                    set_func.call(this, newValue);
                }
                else{
                    this[prop] = newValue;
                }

                return newValue;
            }
        });
    },


    '_constructor' : function(obj){
        this._id_ = OJ.guid(this);

        if(obj){
            this.bulkSet(obj);
        }

        return this;
    },

    // Internal Methods
    '_super' : function(context, func, args){
        if(!context || !context.prototype || !context.prototype[func]){
            print(arguments);
            debugger;
        }

        return context.prototype[func].apply(this, args || []);
    },

    '_destructor' : function(/*depth = 0*/){
        var key;

        for(key in this){
            delete this[key];
        }

        this._destroyed_ = true;
    },


    '_processArguments' : function(args, def){
        var ln = args.length,
            count = 0,
            key, val, ctx, ary, ln2, i;

        for(key in def){
            val = def[key];

            if(ln > count){
                val = args[count];
            }

            if(!isUndefined(val)){
                ctx = this;
                ary = key.split('.');

                if((ln2 = ary.length) > 1){
                    for(i = 0; i < ln2; i++){
                        if(i){
                            ctx = ctx[key];
                        }

                        key = ary[i];
                    }
                }

                if(isFunction(ctx[key])){
                    ctx[key](val);
                }
                else{
                    ctx[key] = val;
                }
            }

            count++;
        }
    },

    '_unset' : function(prop/*|props, depth*/){
        OJ.unset(this, arguments);
    }
};


OJ.extendClass(
    'OjObject', [OjObject],
    {
        // Private Vars
        '_destroyed_' : false,

        '_get_props_' : {
            'oj_class_name' : null,
            'oj_class' : null,
            'oj_id' : null
        },

        // Public Methods
        'bulkGet' : function(props){
            var key, getter_func, obj = {};

            for(key in props){
                if(isFunction(this[key])){
                    obj[key] = this[key]();
                }
                else{
                    obj[key] = props[key];
                }
            }

            return obj;
        },

        'bulkSet' : function(obj){
            var props = Object.getOwnPropertyNames(obj),
                ln = props.length,
                prop;

            for(;ln--;){
                prop = props[ln];

                Object.defineProperty(this, prop, Object.getOwnPropertyDescriptor(obj, prop));
            }
        },

        'clone' : function(){
            var cls = this._static;

            return new cls();
        },

        'exportData' : function(){
            return {
                '_class' : this.oj_class_name
            }
        },

        'importData' : function(data){
            return data;
        },

        'is' : function(val){
            if(isString(val)){
                val = OJ.stringToClass(val);
            }

            return val == this._static || this._supers.contains(val);
        },

        'isEqualTo' : function(obj){
            return this == obj;
        },

        'toJson' : function(){
            return JSON.stringify(this);
        },

        'toQueryString' : function(){
            return Object.toQueryString(this);
        },

        'toString' : function(){
            var self = this;

            return self.oj_class_name + ' : ' + self.oj_id;
        },


        // Public Properties
        '.oj_class' : function(){
            return this._static;
        },

        '.oj_class_name' : function(){
            return this._class_name_
        },

        '.oj_id' : function(){
            return this._id_;
        }
    },
    {
        '_unset' : function(prop/*|props, depth*/){
            OJ.unset(this, arguments);
        },

        'importData' : function(data){
            var i, c, obj, key, cls;

            if(isArray(data)){
                for(i = data.length; i--;){
                    data[i] = OjObject.importData(data[i]);
                }
            }
            else if(isObject(data)){
                cls = data._class;

                if(cls){
                    c = OJ.stringToClass(cls);

                    if(!c && cls.indexPath('.') > -1){
                        OJ.importJs(cls);

                        c = OJ.stringToClass(cls.split('.').last)
                    }

                    if(c){
                        obj = new c();

                        obj.importData(data);

                        return obj;
                    }
                }

                for(key in data){
                    data[key] = OjObject.importData(data[key]);
                }
            }

            return data;
        },

        'exportData' : function(obj){
            var i, key;

            if(isArray(obj)){
                for(i = obj.length; i--;){
                    obj[i] = OjObject.exportData(obj[i]);
                }
            }
            else if(isObject(obj)){
                if(isFunction(obj.exportData)){
                    return obj.exportData();
                }

                for(key in obj){
                    obj[key] = OjObject.exportData(obj[key]);
                }
            }

            return obj;
        },

        'makeNew' : function(args){
            var constructor = this;

            function F(){
                return constructor.apply(this, args);
            }

            F.prototype = constructor.prototype;

            return new F();
        }
    }
);


// force supers to empty array since we spoofed the super when extending the class
OjObject.prototype._supers = [];
