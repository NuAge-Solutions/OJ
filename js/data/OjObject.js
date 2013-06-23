'use strict';

// setup the base object
window.OjObject = function OjObject(){
	this._constructor.apply(this, arguments);
};


// setup the prototype
OjObject.prototype = {
	'_destroyed_' : false,

	/**
	 * Parents Object
	 *
	 * @description An object used by the compile function to store overridden functions in order to
	 * simulate inheritance
	 *
	 * @private
	 */
	'_supers_' : {},

	/**
	 * Class Names Array
	 *
	 * @description An array of class names in the order of inheritance
	 *
	 * @protected
	 */
	'_class_names' : ['OjObject'],

	/**
	 *
	 * Class Name
	 *
	 * @protected
	 */
	'_class_name' : 'OjObject',

	'_static' : OjObject,

	'_post_compile_' : [],

	'_propCompile_' : function(context, props){
		var key, u_key, get_func, set_func,
			is_getter = props == '_props_' || props == '_get_props_' ? true : false,
			is_setter = props == '_props_' || props == '_set_props_' ? true : false;

		if(isFunction(context['_processProp_'])){
			this._processProp_ = context['_processProp_'];
		}

		for(key in context[props]){
			get_func = 'get' + (u_key = key.ucFirst());
			set_func = 'set' + u_key;

			this._processProp_(
				key, context[props][key],
				is_getter && !isFunction(this[get_func]) && !isFunction(context[get_func]) ? get_func : null,
				is_setter && !isFunction(this[set_func]) && !isFunction(context[set_func]) ? set_func : null
			);
		}
	},

	'_processProp_' : function(key, val, getter, setter){
		var prop = '_' + key;

		// store the default value of the property
		this[prop] = val;

		// setup the getter function
		if(getter){
			this[getter] = function(){
				return this[prop];
			};
		}

		// setup the setter function
		if(setter){
			this[setter] = function(val){
				this[prop] = val;
			};
		}
	},

	/**
	 * Super
	 *
	 * @protected
	 * @this {OjObj}
	 * @param {string) context - The current class name
		* @param {string} func - The method on the super/parent you want to call
	 * @param {arguments|array} args - The parameters to send to the super function
	 * @return {OjObj} return the this object to allow for chaining
	 */
	'_super' : function(context, func, args){
		var supers = this._supers_[context];

		return supers && supers[func] ? supers[func].apply(this, args) : null;
	},

	/**
	 * Constructor
	 *
	 * @constructor
	 * @protected
	 * @this {OjObj}
	 * @return {OjObj} return the this object to allow for chaining
	 */
	'_constructor' : function(/*obj*/){
		var args = arguments;

		if(args.length && isObject(args[0])){
			this.bulkSet(args[0]);
		}

		this._id_ = OJ.guid(this);

		return this;
	},

	/**
	 * Destructor
	 *
	 * @destructor
	 * @protected
	 * @this {OjObj}
	 * @return {null} return null since the object "no longer exists"
	 */
	'_destructor' : function(/*depth = 0*/){
		this._destroyed_ = true;
	},

	'_unset' : function(prop/*|props, depth*/){
		var args = arguments,
			ln = args.length, props;

		if(isArray(args[0])){
			ln = (props = args[0]).length;

			for(; ln--;){
				args[0] = props[ln];

				this._unset.apply(this, args);
			}

			return;
		}

		this[prop] = OJ.destroy(this[prop], ln > 1 ? args[1] : 0);
	},

	/**
	 * Bulk Getter
	 *
	 * @public
	 * @this {OjObj}
	 * @param {array} props - An array of property names
	 * @return {object} A key:value pair object of the requested properties and their values
	 */
	'bulkGet' : function(props){
		var key, getter_func, obj = {};

		for(key in props){
			if(this[key]){
				if(isFunction(this[key])){
					obj[key] = this[key]();
				}
				else{
					obj[key] = props[key];
				}

				continue;
			}

			getter_func = 'set' + key.ucFirst();

			if(this[getter_func] && isFunction(this[getter_func])){
				obj[key] = this[getter_func]();
			}
		}

		return obj;
	},

	/**
	 * Bulk Setter
	 *
	 * @public
	 * @this {OjObj}
	 * @param {array} props - A key:value pair object of properties and their values
	 * @return {undefined}
	 */
	'bulkSet' : function(props){
		var key, setter_func;

		for(key in props){
			if(this[key]){
				if(isFunction(this[key])){
					this[key](props[key]);
				}
				else{
					this[key] = props[key];
				}

				continue;
			}

			setter_func = 'set' + key.ucFirst();

			if(this[setter_func] && isFunction(this[setter_func])){
				this[setter_func](props[key]);

				continue;
			}

			this[key] = props[key];
		}
	},

	'className' : function(){
		return this._class_name;
	},

	'clone' : function(){
		var cls = this._static;

		return new cls();
	},

	'exportData' : function(){
		return {
			'_class_name' : this._class_name
		}
	},

	'id' : function(){
		return this._id_;
	},

	'importData' : function(data){
		return data;
	},

	/**
	 * Inheritance Checker
	 *
	 * @public
	 * @this {OjObj}
	 * @param {string|class} val - Either the string name of a class or the class itself
	 * @return {boolean} True when this is the referenced class or a child of that class
	 */
	'is' : function(val){
		if(isObject(val) || isFunction(val)){
			val = OJ.classToString(val);
		}

		return val == this._class_name || this._class_names.indexOf(val) != -1;
	},

	'isEqualTo' : function(obj){
		return this == obj;
	},

	'toJson' : function(){
		return JSON.stringify(this);
	},

	'toQueryString' : function(){
		return Object.toQueryString(this);
	}
};


// setup static functions
OjObject.importData = function(data){
	var i, c, obj, key;

	if(isArray(data)){
		for(i = data.length; i--;){
			data[i] = OjObject.importData(data[i]);
		}
	}
	else if(isObject(data)){
		if(data._class_name){
			c = OJ.stringToClass(data._class_name);

			if(!c && data._class_path){
				OJ.importJs(data._class_path);

				c = OJ.stringToClass(data._class_name)
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
};

OjObject.exportData = function(obj){
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
};

OjObject.makeNew = function(args){
	var constructor = this;

	function F() {
		return constructor.apply(this, args);
	}

	F.prototype = constructor.prototype;

	return new F();
};