'use strict';


// Compile OjObject
OJ.compileClass(
	'OjObject',
	oj.data.Object = function OjClass(){
		/**
		 * Parents Object
		 *
		 * @description An object used by the compile function to store overridden functions in order to
		 * simulate inheritance
		 *
		 * @private
		 */
		this._supers_ = {};

		/**
		 * Class Names Array
		 *
		 * @description An array of class names in the order of inheritance
		 *
		 * @protected
		 */
		this._class_names = ['OjObject'];

		/**
		 *
		 * Class Name
		 *
		 * @protected
		 */
		this._class_name = 'OjObject';

		this._class_path = 'oj.data.Object';


		this._preCompile_ = function(args){
			var top = args, ln;

			while(ln = top.length){
				if(ln > 1){
					this._class_names.push(top[1]);

					this._supers_[top[1]] = {};
				}

				top = top[0];
			}

			this._class_name = this._class_names.slice(-1)[0];
		};

		this._propCompile_ = function(context, props){
			var key;
			var is_getter = props == '_properties_' || props == '_get_properties_' ? true : false;
			var is_setter = props == '_properties_' || props == '_set_properties_' ? true : false;

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

			// remove the properties array
			delete context[props];
		};

		this._processProp_ = function(key, val, getter, setter){
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
		};

		/**
		 * Class Compiler
		 *
		 * @description This function recursively calls itself in order to snapshot the inheritance chain
		 * and store the overridden functions
		 *
		 * @private
		 * @this {OjObj}
		 * @param {arguments|array} args - The arguments passed into the true js object constructor
		 * @return {null}
		 */
		this._compile_funcs_ = [];

		this._compile_ = function(args){
			var ln = args.length;

			if(ln){
				if(ln > 2){
					var key, c = args[1];

					// process compile function if it exists
					if(isFunction(args[2]['_compile_'])){
						this._compile_funcs_.splice(0, 0, args[2]['_compile_']);

						delete args[2]['_compile_'];
					}

					// process properties if they exist
					if(isObject(args[2]['_properties_'])){
						this._propCompile_(args[2], '_properties_');
					}

					if(isObject(args[2]['_get_properties_'])){
						this._propCompile_(args[2], '_get_properties_');
					}

					if(isObject(args[2]['_set_properties_'])){
						this._propCompile_(args[2], '_set_properties_');
					}

					delete args[2]['_processProp_'];

					// process other functions and properties accordingly
					for(key in args[2]){
						if(key.charAt(0) == '_'){
							if(key.charAt(1) == '_'){
								var static_key = key.slice(2);

//								if(!window[this._class_name][static_key]){
									window[this._class_name][static_key] = args[2][key];
//								}
//								else{
//									trace(this._class_name, 'passing on', static_key)
//								}

								continue;
							}
						}

						if(isFunction(this[key])){
							this._supers_[c][key] = this[key];
						}

						this[key] = args[2][key];
					}
				}

				this._compile_(args[0]);
			}
		};

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
		this._super = function(context, func, args){
			return this._supers_[context] && this._supers_[context][func] ? this._supers_[context][func].apply(this, args) : null;
		};

		this._static = function(key/*, value*/){
			var context = OJ.stringToClass(this._class_name);

			if(arguments.length > 1){
				return context[key] = arguments[1];
			}

			return context[key];
		};

		this._staticCall = function(func/*, ...args*/){
			return this._staticApply(func, Array.prototype.slice.call(arguments, 1));
		};

		this._staticApply = function(func/*, args*/){
			var context = OJ.stringToClass(this._class_name);

			return context[func].apply(context, arguments.length > 1 ? arguments[1] : []);
		};


		/**
		 * Constructor
		 *
		 * @constructor
		 * @protected
		 * @this {OjObj}
		 * @return {OjObj} return the this object to allow for chaining
		 */
		this._constructor = function(/*obj*/){
			if(arguments.length && isObject(arguments[0])){
				this.bulkSet(arguments[0]);
			}

			this._id_ = oj.utils.guid(this);

			return this;
		};

		/**
		 * Destructor
		 *
		 * @destructor
		 * @protected
		 * @this {OjObj}
		 * @return {null} return null since the object "no longer exists"
		 */
		this._destructor = function(/*recursive = false*/){
			return null;
		};

		this._unset = function(prop){
			this[prop] = OJ.destroy(this[prop]);
		};


		/**
		 * Bulk Getter
		 *
		 * @public
		 * @this {OjObj}
		 * @param {array} props - An array of property names
		 * @return {object} A key:value pair object of the requested properties and their values
		 */
		this.bulkGet = function(props){
			var key, ln = props.length;

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
		};

		/**
		 * Bulk Setter
		 *
		 * @public
		 * @this {OjObj}
		 * @param {array} props - A key:value pair object of properties and their values
		 * @return {undefined}
		 */
		this.bulkSet = function(props){
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
		};

		this.classObject = function(){
			return OJ.stringToClass(this._class_name);
		};

		this.className = function(){
			return this._class_name;
		};

		this.classPath = function(){
			return this._class_name;
		};

		this.clone = function(){
			var clss = this.classObject();

			return new clss();
		};

		this.exportData = function(){
			return {
				'_class_name' : this._class_name,
				'_class_path' : this._class_path
			}
		};

		this.id = function(){
			return this._id_;
		};

		this.importData = function(data){};


		/**
		 * Inheritance Checker
		 *
		 * @public
		 * @this {OjObj}
		 * @param {string|class} val - Either the string name of a class or the class itself
		 * @return {boolean} True when this is the referenced class or a child of that class
		 */
		this.is = function(val){
			if(isObject(val) || isFunction(val)){
				val = OJ.classToString(val);
			}

			return val == this.className || this._class_names.indexOf(val) != -1;
		};

		this.toJson = function(){
			JSON.stringify(this);
		};

		this.toQueryString = function(){
			Object.toQueryString(this);
		};


		// call the class compiler to create a "true" oop object
		this._preCompile_(arguments);

		this._compile_(arguments);

		// call compile funcs
		var ln = this._compile_funcs_.length;

		while(ln-- > 0){
			this._compile_funcs_[ln].call(this);
		}

		// remove compile vars/functions since we don't need them anymore
		this._compile_ = this._preCompile_ = this._compile_funcs_ = null;

		delete this._compile_;
		delete this._compile_funcs_;
		delete this._preCompile_;
		delete this._propCompile_;
		delete this._processProp_;
	},
	{
		'importData' : function(data){
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
		},

		'exportData' : function(obj){
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
		}
	}
);