'use strict';

// setup the base object
window.OjObject = function OjObject(){
	this._constructor.apply(this, arguments);
};


// setup the prototype
OjObject.prototype = {
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

	'_post_compile_' : [],

	'_propCompile_' : function(context, props){
		var key;
		var is_getter = props == '_props_' || props == '_get_props_' ? true : false;
		var is_setter = props == '_props_' || props == '_set_props_' ? true : false;

		if(isFunction(context['_processProp_'])){
			this._processProp_ = context['_processProp_'];
		}

		for(key in context[props]){
			var u_key = key.ucFirst();
			var get_func = 'get' + u_key;
			var set_func = 'set' + u_key;

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
	'_s' : function(context, func, args){
		return this._supers_[context] && this._supers_[context][func] ? this._supers_[context][func].apply(this, args) : null;
	},

	'_static' : function(key/*, value*/){
		var context = OJ.stringToClass(this._class_name);

		if(arguments.length > 1){
			return context[key] = arguments[1];
		}

		return context[key];
	},

	'_staticCall' : function(func/*, ...args*/){
		return this._staticApply(func, Array.prototype.slice.call(arguments, 1));
	},

	'_staticApply' : function(func/*, args*/){
		var context = OJ.stringToClass(this._class_name);

		return context[func].apply(context, arguments.length > 1 ? arguments[1] : []);
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
		if(arguments.length && isObject(arguments[0])){
			this.bulkSet(arguments[0]);
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
	'_destructor' : function(/*recursive = false*/){
		return null;
	},

	'_unset' : function(prop){
		this[prop] = OJ.destroy(this[prop]);
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
		var key;

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

			var setter_func = 'set' + key.charAt(0).toUpperCase() + key.substr(1);

			if(this[setter_func] && isFunction(this[setter_func])){
				this[setter_func](props[key]);
			}
		}
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
		var key;

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

			var setter_func = 'set' + key.ucFirst();

			if(this[setter_func] && isFunction(this[setter_func])){
				this[setter_func](props[key]);

				continue;
			}

			this[key] = props[key];
		}
	},

	'classObject' : function(){
		return OJ.stringToClass(this._class_name);
	},

	'className' : function(){
		return this._class_name;
	},

	'clone' : function(){
		var cls = this.classObject();

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

	'importData' : function(data){},

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

		return val == this.className || this._class_names.indexOf(val) != -1;
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
	if(isArray(data)){
		for(var i = data.length; i--;){
			data[i] = OjObject.importData(data[i]);
		}
	}
	else if(isObject(data)){
		if(data._class_name){
			var c = OJ.stringToClass(data._class_name);

			if(!c && data._class_path){
				OJ.importJs(data._class_path);

				c = OJ.stringToClass(data._class_name)
			}

			if(c){
				var obj = new c();

				obj.importData(data);

				return obj;
			}
		}

		var key;

		for(key in data){
			data[key] = OjObject.importData(data[key]);
		}
	}

	return data;
};

OjObject.exportData = function(obj){
	if(isArray(obj)){
		for(var i = obj.length; i--;){
			obj[i] = OjObject.exportData(obj[i]);
		}
	}
	else if(isObject(obj)){
		if(isFunction(obj.exportData)){
			return obj.exportData();
		}

		var key;

		for(key in obj){
			obj[key] = OjObject.exportData(obj[key]);
		}
	}

	return obj;
};