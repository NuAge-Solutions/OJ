// Modify Built-In Object Class
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
    return JSON.stringify(obj);
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
        merged = {},
        ln = arguments.length;

    for(i = 0; i < ln; i++){
        for(key in arguments[i]){
            merged[key] = arguments[i][key];
        }
    }

    return merged;
};




// Setup OjObject Class
window.OjObject = function(){ };

OjObject.prototype = {
    "_post_compile_" : [],

    "_propCompile_" : function(context, props){
        props = context[props];

        const is_getter = props != "_set_props_",
            is_setter = props != "_get_props_";

        let key, prop, val;

        if(isFunction(context["_processProp_"])){
            this._processProp_ = context["_processProp_"];
        }

        for(key in props){
            prop = "_" + key;
            val = props[key];

            // store the default value of the property
            if(isSet(val)){
                this[prop] = val;
            }

            this._processProp_(key, prop, is_getter ? "." + key : null, is_setter ? "=" + key : null);
        }
    },

    "_processProp_" : function(key, prop, getter, setter){
        // define property
        Object.defineProperty(this, key, {
            "configurable" : true,
            "enumerable" : false,
            "get" : function(){
                if(!getter){
                    throw "Property '" + key + "' get not allowed.";
                }

                const get_func = this[getter];

                return get_func ? get_func.call(this) : this[prop];
            },
            "set" : function(newValue){
                if(!setter){
                    throw "Property '" + key + "' set not allowed.";
                }

                const set_func = this[setter];

                set_func ? set_func.call(this, newValue) : this[prop] = newValue;

                return newValue;
            }
        });
    },


    "_constructor" : function(obj){
        this._id_ = OJ.guid(this);

        if(obj){
            this.bulkSet(obj);
        }

        return this;
    },

    // Internal Methods
    "_super" : function(context, func, args){
        if(!context || !context.prototype || !context.prototype[func]){
            print(arguments);
            debugger;
        }

        return context.prototype[func].apply(this, args || []);
    },

    "_destructor" : function(depth){
        for(const key in this){
            this[key] = undefined;
        }

        this._destroyed_ = true;
    },


    "_set" : function(key, val, dflt){
        // default the value
        if(isUndefined(val)){
            val = dflt;
        }

        // if the value is undefined then we don't need to do anything
        if(!isUndefined(val)){
            let ctx = this,
                ary = key.split("."),
                ln = ary.length;

            if(ln > 1){
                for(let i = 0; i < ln; i++){
                    if(i){
                        ctx = ctx[key];
                    }

                    key = ary[i];
                }
            }

            if(isFunction(ctx[key])){
                return ctx[key](val);
            }

            return ctx[key] = val;
        }
    },

    "_unset" : function(prop_or_props, depth){
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
            const cls = this._static;

            return new cls();
        },

        'exportData' : function(mode){
            const self = this,
                data = {};

            data[self._static.TYPE_KEY] = self.oj_class_name;

            return data;
        },

        'importData' : function(data, mode){
            return this;
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

        "toString" : function(){
            return this.oj_class_name + " : " + this.oj_id;
        },


        // Public Properties
        '.oj_class' : function(){
            return this._static;
        },

        '.oj_class_name' : function(){
            return this._class_name_;
        },

        '.oj_id' : function(){
            return this._id_;
        }
    },
    {
        'TYPE_KEY' : '__type__',

        "CACHE": "cache",
        'CLONE' : 'clone',
        "DEFAULT" : "default",


        '_unset' : function(prop/*|props, depth*/){
            OJ.unset(this, arguments);
        },

        'importData' : function(data, mode){
            var i, c, obj, key, cls;

            if(isArray(data)){
                for(i = data.length; i--;){
                    data[i] = OjObject.importData(data[i], mode);
                }
            }
            else if(isObject(data)){
                cls = data[this.TYPE_KEY];

                if(cls){
                    c = OJ.stringToClass(cls);

                    if(!c && cls.indexOf('.') > -1){
                        importJs(cls);

                        c = OJ.stringToClass(cls.split('.').last)
                    }

                    if(c){
                        obj = new c();

                        obj.importData(data, mode);

                        return obj;
                    }
                }

                for(key in data){
                    data[key] = OjObject.importData(data[key], mode);
                }
            }

            return data;
        },

        'exportData' : function(obj, mode, processed){
            let key;

            processed = processed || [];

            if(isArray(obj)){
                for(key = obj.length; key--;){
                    obj[key] = OjObject.exportData(obj[key], mode, processed);
                }
            }
            else if(isObject(obj)){
                if(isFunction(obj.exportData)){
                    return obj.exportData(mode, processed);
                }

                for(key in obj){
                    obj[key] = OjObject.exportData(obj[key], mode, processed);
                }
            }
            // this checks for NaN since NaN does not equal itself
            else if(obj !== obj){
                return null;
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