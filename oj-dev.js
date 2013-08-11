'use strict';


/**
 * OJ Core Package
 */
window.OJ = function Oj(){
	return {
//		'_analytics' : null,  '_browser' : null,  '_browser_version' : null,  '_compiled_theme_path' : null,  '_css_prefix'  : null,
//
//		'_engine' : null,  '_library' : null,  '_metadata' : null,  '_metas' : null,  '_os' : null,  '_root' : null,
//
//		'_theme_elm' : null,    '_tween' : null,

		'_events' : [],  '_guid' : 85,  '_is_landscape' : true,  '_is_mobile' : false,  '_is_ready' : false,

		'_is_supported' : true,  '_is_tablet' : false,  '_is_touch_capable' : false,  '_loaded' : {},

		'_protocol' : 'http',

		'_settings' : {
			'assetsPath' : 'assets',

			'cssExt' : '.css',  'cssPath' : 'css',

			'dimUnit' : 'px',  'fontUnit' : 'px',  'init' : null,

			'jsPath' : 'js',  'jsExt' : '.js',  'lazyLoad' : true,  'mode' : 'loading',

			'target' : '#OJ',  'theme' : 'oj',  'themePath' : 'themes',

			'tplPath' : 'templates',  'tplExt' : '.html',  'version' : '0.0.0',

			'waitForCss' : true,

			'supportMessage' : 'Our apologies. Your browser is currently not supported. ' +
				'Please try again with a more recent version of <a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a>, ' +
				'<a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, ' +
				'<a href="http://windows.microsoft.com/en-us/internet-explorer/downloads/ie-10/worldwide-languages">Internet Explorer</a> ' +
				'or <a href="http://www.apple.com/safari/">Safari</a>. ' +
				'You can easily download the latest version by clicking on the name of the browser you wish to use.'
		},

		'_viewport' : {
			'top'    : 0,
				'left'   : 0,
				'bottom' : 0,
				'right'  : 0,
				'width'  : 0,
				'height' : 0
		},


		// modes
		'DEV'           : 'development',
		'LOADING'       : 'loading',
		'PROD'          : 'production',

		// protocols
		'FILE'          : 'file',
		'HTTP'          : 'http',
		'HTTPS'         : 'https',

		// browsers
		'CHROME'    : 'Chrome',
		'FIREFOX'   : 'Firefox',
		'IE'        : 'Internet Explorer',
		'IN_APP'    : 'in-app',
		'MOZILLA'   : 'Mozilla',
		'OPERA'     : 'Opera',
		'SAFARI'    : 'Safari',

		// Engines
		'GECKO'     : 'Gecko',
		'KHTML'     : 'KHTML',
		'TRIDENT'   : 'Trident',
		'WEBKIT'    : 'WebKit',

		// OSs
		'CHROME_OS' : 'Chrome OS',
		'LINUX'     : 'Linux',
		'OSX'       : 'OS X',
		'WINDOWS'   : 'Windows',

		// mobile OSs
		'ANDROID'       : 'Android',
		'BADA'          : 'Bada',
		'BLACKBERRY'    : 'BlackBerry OS',
		'BREW'          : 'Brew',
		'GRID'          : 'Grid OS',
		'IOS'           : 'iOS',
		'MEEGO'         : 'MeeGo',
		'PALM'          : 'Palm',
		'QNX'           : 'QNX',
		'SYMBIAN'       : 'Symbian',
		'WEBOS'         : 'Web OS',
		'WIN_MOBILE'    : 'Windows Mobile',
		'WIN_PHONE'     : 'Windows Phone',


		// protected functions
		'_' : function(key){
			return this._settings[key];
		},

		'_getClassPath' : function(type, cls, ext){
			var parts = cls.split('.');

			return parts.shift() + '/' + (type ? type + '/' : '') + parts.join('/') + ext;
		},

		'_getCssImportPath' : function(path){
			if(path.indexOf('/') != -1){
				return path;
			}

			return this._root + this._getClassPath(this._('cssPath'), path, this._('cssExt')) + this.getVersionQuery();
		},

		'_getJsImportPath' : function(path){
			if(path.indexOf('/') != -1){
				return path;
			}

			return this._root + this._getClassPath(this._('jsPath'), path, this._('jsExt')) + this.getVersionQuery();
		},

		'_getTemplateImportPath' : function(path){
			if(path.indexOf('/') != -1){
				return path;
			}

			return this._root + this._getClassPath(this._('tplPath'), path, this._('tplExt')) + this.getVersionQuery();
		},

		'_getThemePath' : function(path){
			if(path.indexOf('/') != -1){
				return path;
			}

			var parts = path.split('.'),
				prefix = parts.length == 1 ? path + '.' : '',
				type = this._('themePath');

			if(this._('mode') != this.DEV){
				path += '-theme';

				type = null;
			}

			return this._root + this._getClassPath(type, prefix + path, this._('cssExt')) + this.getVersionQuery();
		},

		'_handleEvent' : function(action, type, context, func){
			this._events.push({
				'action'  : action,
				'type'    : type,
				'context' : context,
				'func'    : func
			});
		},


		// event handling functions
		'_onTouchEvent' : function(evt){
			var touches = evt.changedTouches, first = touches[0], type = '';

			switch(evt.type){
				case 'touchstart':
					type = 'mousedown';
					break;

				case 'touchmove':
					type = 'mousemove';
					break;

				case 'touchend':
					type = 'mouseup';
					break;

				default: return;
			}

			var simulatedEvent = document.createEvent('MouseEvent');
			simulatedEvent.initMouseEvent(
				type, true, true, window, 1,
				first.screenX, first.screenY,
				first.clientX, first.clientY, false,
				false, false, false, 0, null
			);

			first.target.dispatchEvent(simulatedEvent);

			evt.preventDefault();
		},


		// public functions
		'addEventListener' : function(type, context, func){
				this._handleEvent('add', type, context, func);
			},

		'addCssFile' : function(css/*, is_path*/){
			var elm;

			if(arguments.length > 1 && arguments[1]){
				elm = document.createElement('link');
				elm.setAttribute('rel', 'stylesheet');
				elm.setAttribute('type','text/css');
				elm.setAttribute('href', css);
			}
			else if(css){
				elm = document.createElement('style');
				elm.type = 'text/css';

				if(elm.styleSheet){
					elm.styleSheet.cssText = css;
				}
				else{
					elm.appendChild(document.createTextNode(css));
				}
			}
			else{
				return null;
			}

			var head = document.getElementsByTagName('head')[0];

			if(this._theme_elm){
				head.insertBefore(elm, this._theme_elm);
			}
			else{
				head.appendChild(elm);
			}

			return elm;
		},

		// dynamically add js to page
		'addJsFile' : function(js/*, is_path=false, async=false*/){
			var args = arguments,
				ln = args.length,
				is_path = ln > 1 ? args[1] : false,
				is_async = ln > 2 ? args[2] : false;

			try{
				if(this._('mode') != this.LOADING || is_async){
					var elm = document.createElement('script');
					elm.setAttribute('type', 'text/javascript');
					elm.setAttribute('language', 'javascript');

					if(is_async){
						elm.setAttribute('async', 'true');
					}

					if(is_path){
						elm.setAttribute('src', js);
					}
					else{
						elm.appendChild(document.createTextNode(js));
					}

					document.getElementsByTagName('head')[0].appendChild(elm);

					return elm;
				}
			}
			catch(e){}

			if(is_path){
				document.write('<scri' + 'pt type="text/javascript" language="javascript" src="' + js + '"></scr' + 'ipt>');
			}
			else{
				eval(js);
			}
		},

		'async' : function(context, func/*, ...args*/){
			setTimeout(func.apply(context, Array.array(arguments).slice(2)), 1);
		},

		'attributeToFunc' : function(attr){
			var parts = attr.split('-'), ln = parts.length;

			for(; ln--;){
				if(ln){
					parts[ln] = parts[ln].ucFirst();
				}
			}

			return parts.join('');
		},

		'byId' : function(id){
			if(id.charAt(0) == '#'){
				id = id.substr(1);
			}

			return document.getElementById(id);
		},

		/* Returns the class name of the argument or undefined if
		 it's not a valid JavaScript object.
		 */
		'classToString' : function(obj){
			if(obj && obj.prototype && obj.prototype.constructor && obj.prototype.constructor.toString){
				var arr = obj.prototype.constructor.toString().match(/function\s*(\w+)/);

				if(arr && arr.length == 2){
					return arr[1];
				}
			}

			return undefined;
		},

		'destroy' : function(obj/*, depth = 0*/){
			if(obj && isFunction(obj._destructor)){
				if(!obj._destroyed_){
					var args = arguments;

					obj._destructor(args.length > 1 ? args[1] : 0);
				}
				else{
					trace('Called destroy multiple times on: ' + obj.id());
				}
			}

			return obj = null;
		},

		'elm' : function(elm){
			return OjElement.element(elm);
		},

		'extendComponent' : function(base, ns, def/*, static_def*/){
			var cls = this.extendClass.apply(this, arguments);

			var tags = cls._TAGS,
				ln = tags.length;

			// register class name as tag
			OjStyleElement.registerComponentTag(ns.toLowerCase(), ns);

			// register special tags
			for(; ln--;){
				OjStyleElement.registerComponentTag(tags[ln], ns);
			}

			return cls;
		},

		'extendClass' : function(base, ns, def/*, static_def*/){
			// setup our vars & prototype
			var key, c,
				proto = {
					'_class_name' : ns
				};

			// setup the constructor
			eval(
				'c = window[ns] = function ' + ns +
					'(){ this._constructor.apply(this, arguments); };'
			);

			// copy the base class statics
			for(key in base){
				c[key] = base[key];
			}

			// add new statics
			if(arguments.length > 3){
				var statics = arguments[3];

				for(key in statics){
					c[key] = statics[key];
				}
			}

			// copy the prototype as our starting point of inheritance
			base = base.prototype;

			for(key in base){
				if(key == '_class_name'){
					continue
				}

				if(key == '_class_names' || key == '_post_compile_'){
					proto[key] = base[key].clone();
				}
				else{
					proto[key] = base[key];
				}
			}

			// add our class name to the class names array
			proto._class_names.push(ns);

			// setup the static var
			proto._static = c;

			// setup the supers array
			proto._supers_[ns] = {};

			// process properties if they exist
			if(isObject(def['_props_'])){
				proto._propCompile_(def, '_props_');
			}

			if(isObject(def['_get_props_'])){
				proto._propCompile_(def, '_get_props_');
			}

			if(isObject(def['_set_props_'])){
				proto._propCompile_(def, '_set_props_');
			}

			// process other functions and properties accordingly
			for(key in def){
				// skip private funcs
				if(key.charAt(0) == '_' && key.slice(-1) == '_'){
					if(key == '_interface_'){
						proto._class_names.splice(-1, 0, def[key]);
					}

					continue;
				}

				if(isFunction(proto[key])){
					proto._supers_[ns][key] = proto[key];
				}

				proto[key] = def[key];
			}

			// if there is a compile function use it
			if(isFunction(def._compile_)){
				def._compile_.call(proto, def);
			}

			// run the post compile functions
			if(isFunction(def._post_compile_)){
				proto._post_compile_.unshift(def._post_compile_);
			}

			var ln = proto._post_compile_.length;

			for(; ln--;){
				proto._post_compile_[ln].call(proto);
			}

			// setup the prototype and constructor for the class
			(c.prototype = proto).constructor = c;

			// return the constructor
			return c;
		},

		'extendManager' : function(manager, base, ns, def/*, static_def*/){
			var prev_manager = window[manager],
				cls = OJ.extendClass.apply(this, Array.slice(arguments, 1));

			return window[manager] = new cls(prev_manager);
		},

		'guid' : function(){
			return (arguments.length ? arguments[0]._class_name : 'func') + '_' + this._guid++;
		},

		'implementInterface' : function(/*intrfc1, intrfc2, ..., def*/){
			var key, intrfc,
				i = 0,
				ln = arguments.length - 1,
				def = arguments[ln];

			for(; i < ln; i++){
				intrfc = arguments[i];

				// process strings as potential interfaces
				// then automatically setup the private interface var for css purposes
				if(isString(intrfc)){
					var cls = OJ.stringToClass(intrfc)
					cls._interface_ = intrfc;

					intrfc = cls;
				}

				for(key in intrfc){
					if(isUndefined(def[key])){
						def[key] = intrfc[key];
					}
					// if this is properties and they are already defined then we handle them differently
					else if(key == '_props_' || key =='_get_props_' || key == '_set_props_'){
						OJ.implementInterface(intrfc[key], def[key]);
					}
				}
			}

			return def;
		},

		'importCss' : function(path/*, data, wait_for_css*/){
			var css_path = this._getCssImportPath(path);

			if(this._library){
				var was_loaded = this._library.isLoaded(css_path);
				var ln = arguments.length, css_data = ln > 1 ? arguments[1] : null, elm;

				if(!was_loaded){
					if(
						this._('lazyLoad') && this._protocol != this.FILE &&
							(this._('waitForCss') || (ln > 2 && arguments[2]))
						){
						elm = this.addCssFile(this._library.load(css_path));
					}
					else if(isFunction(document.createStyleSheet)){
						elm = document.createStyleSheet(css_path);
					}
					else{
						elm = this.addCssFile(css_path, true);
					}

					this._library.setAsset(css_path, true);
				}

				return elm;
			}

			if(!this._loaded[css_path]){
				this._loaded[css_path] = true;

				return this.addCssFile(css_path, true);
			}

			return null;
		},

		'importJs' : function(path/*, data*/){
			var js_path = this._getJsImportPath(path);

			if(this._library){
				var was_loaded = this._library.isLoaded(js_path);

				if(!was_loaded){
					if(this._('lazyLoad') && this._protocol != this.FILE){
						this.addJsFile(arguments.length > 1 ? arguments[1] : this._library.load(js_path));
					}
					else{
						this.addJsFile(js_path, true);
					}

					this._library.setAsset(js_path, true);
				}

				return arguments.length > 1 ? arguments[1] : this._library.load(js_path);
			}

			if(!this._loaded[js_path]){
				this._loaded[js_path] = true;

				this.addJsFile(js_path, true);
			}
		},

		'importTemplate' : function(path/*, data*/){
			var template_path = this._getTemplateImportPath(path),
			was_loaded = this._library.isLoaded(template_path),
			template_data = arguments.length > 1 ? arguments[1] : this._library.load(template_path);

			this._library.setAsset(template_path, template_data);

			return template_data;
		},

		'isComputer' : function(){
			return !this._is_mobile && !this._is_tablet;
		},

		'isLandscape' : function(){
			return this._is_landscape;
		},

		'isMobile' : function(){
			return this._is_mobile;
		},

		'isPortrait' : function(){
			return !this._is_landscape;
		},

		'isReady' : function(){
			return this._is_ready;
		},

		'isSupported' : function(){
			return this._is_supported;
		},

		'isTablet' : function(){
			return this._is_tablet;
		},

		'isTouchCapable' : function(){
			return this._is_touch_capable;
		},

		'merge' : function(obj, obj2/*, ...objs*/){
			var key, i, ln = arguments.length;

			for(i = 1; i < ln; i++){
				for(key in arguments[i]){
					obj[key] = arguments[i][key];
				}
			}

			return obj;
		},

		'meta' : function(/*property, value*/){
			var ln, meta, name;

			// make sure we have the metadata obj populated
			if(!this._metadata){
				var metas = document.getElementsByTagName('meta');

				this._metadata = {};
				this._metas = {};

				for(ln = metas.length; ln--;){
					meta = metas[ln];

					if(meta.parentNode != document.head){
						continue;
					}

					name = meta.getAttribute('name');

					if(!name){
						name = meta.getAttribute('http-equiv');
					}

					if(name){
						name = name.toLowerCase();

						this._metadata[name] = meta.getAttribute('content');
						this._metas[name] = meta;
					}
				}
			}

			// check to see if we are getting or setting a specific metadata item
			var ln = arguments.length;

			if(ln){
				name = arguments[0].toLowerCase();

				if(ln > 1){
					if(meta = this._metas[name]){
						meta.setAttribute('content', this._metadata[name] = arguments[1]);
					}
					else{
						this._metas[name] = meta = document.createElement('meta');
						meta.setAttribute('name', arguments[0]);
						meta.setAttribute('content', this._metadata[name] = arguments[1]);

						document.head.appendChild(meta);
					}
				}

				return this._metadata[name];
			}

			// else return the whole thing
			return OJ.merge({}, this._metadata);
		},

		'pageTitle' : function(){
			var d = document;

			return d ? d.title : null;
		},

		'pageDescription' : function(){
			return this.meta('description');
		},

		'pluralize' : function(str){
			var c = str.slice(-1),
				c2 = str.slice(-2),
				c3 = str.slice(-3);

			if(c == 's'){
				return str + '\'';
			}
			else if(c2 == 'ey'){
				return str.slice(0, -2) + 'ies';
			}
			else if(c3 == 'elf'){
				return str.slice(0, -3) + 'elvs'
			}

			return str + 's';
		},

		'removeEventListener' : function(type, context, func){
			this._handleEvent('remove', type, context, func);
		},

		'render' : function(elm){
			if(this.renderer){
				this.renderer.dom().appendChild(elm = isObjective(elm) ? elm.dom() : elm);
			}
		},

		'setting' : function(key/*, val*/){
			if(arguments.length == 1){
				return this._settings[key];
			}

			var val = arguments[1];

			if(key == 'theme'){
				var sep = '/',
					old_path = this._compiled_theme_path,
					path = this._getThemePath(val);

				// check for change
				if(path.indexOf(old_path) > -1){
					return;
				}

				var elms = document.getElementsByTagName('link'),
					ln = elms.length;

				this._compiled_theme_path = this._path;

				for(; ln--;){
					if(elms[ln].getAttribute('href').indexOf(old_path)> -1){
						elms[ln].setAttribute('href', path);

						return;
					}
				}

				this._theme_elm = this.importCss(path);
			}

			this._settings[key] = val;
		},

		'settings' : function(settings){
			var key;

			for(key in settings){
				this.setting(key, settings[key]);
			}
		},

		'stringToClass' : function(str) {
			return window[str];
		},

		'stringToVar' : function(obj){
			var parts = isArray(obj) ? obj : obj.split('.'), ln = parts.length, i;

			obj = window;

			for(i = 0; i < ln; i++){
				if(!obj[parts[i]]){
					obj[parts[i]] = {};
				}

				obj = obj[parts[i]];
			}

			return obj;
		},

		'toClass' : function(obj){
			return isString(obj) ? this.stringToClass(obj) : obj;
		},

		'tokenReplace' : function(source, token, value){
			return source.replace(new RegExp('\\[%' + token + '\\]', 'g'), value);
		},

		'tokensReplace' : function(source, key_vals){
			var key;

			for(key in key_vals){
				source = this.tokenReplace(source, key, key_vals[key]);
			}

			return source;
		},

		// getter & setters
		'getAssetPath' : function(pkg, path){
			return this._root + pkg + '/' + this._('assetsPath') + '/' + path + this.getVersionQuery();
		},

		'getBrowser' : function(){
			return this._browser;
		},

		'getBrowserVersion' : function(){
			return this._browser_version;
		},

		'getCssPrefix' : function(){
			return this._css_prefix;
		},

		'getEngine' : function(){
			return this._engine;
		},

		'getMode' : function(){
			return this._('mode');
		},

		'getOs' : function(){
			return this._os;
		},

		'getPixelRatio' : function(){
			return window.devicePixelRatio || 1;
		},

		'getProtocol' : function(){
			return this._protocol;
		},

		'getRoot' : function(){
			return this._root;
		},
		'setRoot' : function(root){
			this._root = isEmpty(root) && this._protocol == this.FILE ? '' : (root + '/');
		},

		'getScreen' : function(){
			var rect = {
				'top'       : isSet(window.screenY) ? window.screenY : window.screenTop,
				'left'      : isSet(window.screenX) ? window.screenX : window.screenLeft,
				'width'     : window.screen.availWidth,
				'height'    : window.screen.availHeight
			};

			rect.bottom = rect.top + rect.height;
			rect.right = rect.left + rect.width;

			return rect;
		},

		'getScrollLeft' : function(){
			return document.body.scrollLeft;
		},
		'setScrollLeft' : function(pos){
			document.body.scrollLeft = pos;
		},

		'getScrollTop' : function(){
			return document.body.scrollTop;
		},
		'setScrollTop' : function(pos){
			document.body.scrollTop = pos;
		},

		'getVersionQuery' : function(){
			var v;

			if(this._('mode') == this.LOADING || this._protocol == this.FILE || isEmpty(v = this._('version'))){
				return '';
			}

			return '?v=' + v;
		},

		'getViewport' : function(){
			var rect = {
				'top'       : window.pageYOffset ? window.pageYOffset : document.body.scrollTop,
				'left'      : window.pageXOffset ? window.pageXOffset : document.body.scrollLeft,
				'bottom'    : 0,
				'right'     : 0,
				'width'     : window.innerWidth ? window.innerWidth : document.body.clientWidth,
				'height'    : window.innerHeight ? window.innerHeight : document.body.clientHeight
			};

			rect.bottom = rect.top + rect.height;
			rect.right = rect.left + rect.width;

			return rect;

			return Object.clone(this._viewport);
		},
		'setViewport' : function(rect){
			// todo : add set viewport functionality (aka scrolling and window size)
		}
	}
}();




/**
 * Framework Setup
 */
(function(){
	// detect script element
	var script_elms = document.getElementsByTagName('script'),
		ln = script_elms.length,
		src, index;

	for(; ln--;){
		src = script_elms[ln].getAttribute('src');

		if((index = src.indexOf('/oj/')) != -1){
			src = src.substr(0, index);

			// detect file mode
			var protocol_index = src.indexOf('//');

			if(protocol_index > 0){
				OJ._protocol = src.substring(0, protocol_index - 1);
			}
			else{
				OJ._protocol = window.location.protocol.substring(-1);
			}

			// detect the root
			OJ.setRoot(src);

			break;
		}
	}

	// detect the broswer, os and version
	var detector = {
		'search' : function(data){
			var ln = data.length;

			for(; ln--;){
				var dataString = data[ln].s,
					dataProp = data[ln].p;

				this.v = data[ln].v || data[ln].id;

				if(dataString){
					if(dataString.indexOf(data[ln].sub) != -1){
						return data[ln].id;
					}
				}
				else if(dataProp){
					return data[ln].id;
				}
			}
		},

		'version' : function(str){
			var index = str.indexOf(this.v);

			if(index == -1){
				return;
			}

			return str.substring(index + this.v.length + 1).split(' ')[0];
		}
	};

	OJ._browser = detector.search([
		{
			// for older Netscapes (4-)
			's'   : navigator.userAgent,
			'sub' : 'Mozilla',
			'id'  : 'Netscape',
			'v'   : 'Mozilla'
		},
		{
			's'   : navigator.userAgent,
			'sub' : 'OmniWeb',
			'v'   : 'OmniWeb/',
			'id'  : 'OmniWeb'
		},
		{
			'p'  : window.opera,
			'id' : 'Opera',
			'v'  : 'Version'
		},
		{
			's'   : navigator.vendor,
			'sub' : 'iCab',
			'id'  : 'iCab'
		},
		{
			's'   : navigator.vendor,
			'sub' : 'KDE',
			'id'  : 'Konqueror'
		},
		{
			's'   : navigator.vendor,
			'sub' : 'Camino',
			'id'  : 'Camino'
		},
		{
			// for newer Netscapes (6+)
			's'   : navigator.userAgent,
			'sub' : 'Netscape',
			'id'  : 'Netscape'
		},
		{
			's'   : navigator.userAgent,
			'sub' : 'Gecko',
			'id'  : 'Mozilla',
			'v'   : 'rv'
		},
		{
			's'   : navigator.userAgent,
			'sub' : 'MSIE',
			'id'  : 'Internet Explorer',
			'v'   : 'MSIE'
		},
		{
			's'   : navigator.vendor,
			'sub' : 'Apple',
			'id'  : 'Safari',
			'v'   : 'Version'
		},
		{
			's'   : navigator.userAgent,
			'sub' : 'Firefox',
			'id'  : 'Firefox'
		},
		{
			's'   : navigator.userAgent,
			'sub' : 'Chrome',
			'id'  : 'Chrome'
		}
	]) || null;

	OJ._browser_version = detector.version(navigator.userAgent) || detector.version(navigator.appVersion);

	// detect OS
	var platform = navigator.platform.substring(0, 3).toLowerCase(),
		user_agent =  navigator.userAgent.toLowerCase();

	if(user_agent.indexOf('android') > -1){
		OJ._os = OJ.ANDROID;
		OJ._is_tablet = !(OJ._is_mobile = (user_agent.indexOf('mobile') > -1));
		OJ._is_touch_capable = true;
	}
	else if(platform == 'iph' || platform == 'ipa' || platform == 'ipo'){
		OJ._os = OJ.IOS;
		OJ._is_tablet = !(OJ._is_mobile = (platform != 'ipa'));

		// check for in app
		if(!OJ._browser_version){
			OJ._browser_version = OJ.IN_APP;
		}
	}
	else{
		OJ._os = detector.search([
			{
				's'   : navigator.platform,
				'sub' : 'Win',
				'id'  : 'Windows'
			},
			{
				's'   : navigator.platform,
				'sub' : 'Mac',
				'id'  : 'OS X'
			},
			{
				's'   : navigator.platform,
				'sub' : 'Linux',
				'id'  : 'Linux'
			}
		]) || null;
	}

	if(!OJ._is_touch_capable){
		OJ._is_touch_capable = 'ontouchstart' in window;
	}

	// detect
	switch(OJ._browser){
		case OJ.FIREFOX:
			OJ._engine = OJ.GECKO;
			OJ._css_prefix = '-moz-';
		break;

		case OJ.IE:
			OJ._engine = OJ.TRIDENT;
			OJ._css_prefix = '-ms-';
		break;

		case OJ.CHROME:
		case OJ.SAFARI:
			OJ._engine = OJ.WEBKIT;
			OJ._css_prefix = '-webkit-';
	}

	OJ._onOjResize = function(){
		if(isFunction(OJ.addCss)){
			var vp = OJ._viewport,
				w = window.innerWidth ? window.innerWidth : document.body.clientWidth,
				h = window.innerHeight ? window.innerHeight : document.body.clientHeight,
				delta_x = w - vp.width,
				delta_y = h - vp.height;

			vp.width = w;
			vp.height = h;
			vp.bottom = vp.top + vp.height;
			vp.right = vp.left + vp.width;

			if(vp.width > vp.height){
				OJ._is_landscape = true;

				OJ.addCss(['is-landscape']);
				OJ.removeCss(['is-portrait']);
			}
			else{
				OJ._is_landscape = false;

				OJ.addCss(['is-portrait']);
				OJ.removeCss(['is-landscape']);
			}

			OJ.dispatchEvent(new OjTransformEvent(OjTransformEvent.RESIZE, vp.top, vp.left, delta_x, delta_y));
		}
	};

	OJ._onOjScroll = function(evt){
		var vp = OJ._viewport;
		vp.top = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
		vp.left = window.pageXOffset ? window.pageXOffset : document.body.scrollLeft;
		vp.bottom = vp.top + vp.height;
		vp.right = vp.left + vp.width;
	};

	OJ._onOjOrientationChange = function(evt){
		OJ.dispatchEvent(OjOrientationEvent.convertDomEvent(evt));
	};

	// setup browser event listeners
	if(window.addEventListener){
		window.addEventListener('resize', OJ._onOjResize, false);
		window.addEventListener('scroll', OJ._onOjScroll, false);
		window.addEventListener('orientationchange', OJ._onOjOrientationChange, false);
	}
	else{
		window.attachEvent('onresize', OJ._onOjResize, false);
		window.attachEvent('onscroll', OJ._onOjScroll, false);
		window.attachEvent('onorientationchange', OJ._onOjOrientationChange, false);
	}
})();




/**
 * Framework Data Type Functions
 */
// array functions
if(!Array.isArray){
	Array.isArray = function(obj){
		return Object.prototype.toString.call(obj) === "[object Array]";
	};
}

if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function(needle/*, from*/){
		var ln = this.length;

		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from) : Math.floor(from);

		if(from < 0){
			from += ln;
		}

		for(; from < ln; from++){
			if(from in this && this[from] === needle){
				return from;
			}
		}

		return -1;
	};
}

Array.array = function(obj){
	if(isNull(obj)){
		return [];
	}
	else if(Array.isArray(obj)){
		return obj;
	}
	else if((isObject(obj) || isFunction(obj)) && !isUndefined(obj.length)){
		return [].slice.call(obj, 0);
	}

	return [obj];
};

Array.prototype.clone = function(){
	return this.slice(0);
};

Array.prototype.equalize = function(obj){
	var ln = this.length, ln2, v = null;

	if(!Array.isArray(obj)){
		v = obj;

		obj = [obj];
	}

	ln2 = obj.length;

	while(ln2-- > ln){
		obj.push(v);
	}

	return obj;
};

Array.slice = function(ary, start/*, end*/){
	var args = Array.array(arguments);

	ary = Array.array(ary);

	return ary.slice.apply(ary, args.slice(1));
};

// TODO:
Array.prototype.origReplace = Array.prototype.replace;

Array.prototype.replace = function(needle, replace){
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

Array.prototype.replaceAll = function(needle, replace/*, recursive*/){
	var recursive = arguments.length > 2 && arguments[2];
	var result = [], i = 0, ln = this.length, j, ln2, ln3, hay;

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


// date functions
if(!Date.time){
	Date.time = function(){
		return (new Date()).getTime();
	};
}

if(!Date.prototype.isEqual){
	Date.prototype.isEqual = function(date){
		return isDate(date) && this.getTime() == date.getTime();
	};
}


// function functions
if(!Function.prototype.bind){
	Function.prototype.bind = function(oThis){
		if(!isFunction(this)){
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs = Array.array(arguments).slice(1),
			fToBind = this,
			fNOP = function(){},
			fBound = function OjCallback(){
				return fToBind.apply(
					this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.array(arguments))
				);
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}


// math functions
if(!Math.signedCeil){
	Math.signedCeil = function(num){
		if(num < 0){
			return Math.floor(num);
		}

		return Math.ceil(num);
	};
}

if(!Math.signedFloor){
	Math.signedFloor = function(num){
		if(num < 0){
			return Math.ceil(num);
		}

		return Math.floor(num);
	}
}

if(!Math.bounds){
	Math.bounds = function(num, min, max){
		return Math.min(Math.max(min, num), max)
	}
}


// number functions
Number.prototype.oldToString = Number.prototype.toString();

Number.prototype.toFormattedString = function(num_digits, num_decimals){
	var str = '', parts = this.valueOf().split('.');

	if(num_digits){
		while(parts[0].length < num_digits){
			parts[0] = '0' + parts[0];
		}

		str = parts[0];
	}

	if(num_decimals){
		str += '.';

		while(parts[1].length < num_decimals){
			parts[1] += '0';
		}

		str += parts[1];
	}

	return str;
};


// object functions
if(!Object.create){
	Object.create = function(o){
		if(arguments.length > 1){
			throw new Error('Object.create implementation only accepts the first parameter.');
		}

		function F() {}

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
				rtrn.push(key);
			}
		}

		key = null;

		return rtrn;
	};
}

Object.numKeys = function(obj){
	return Object.keys(obj).length;
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


// string functions
String.string = function(val){
	if(!val){
		return '';
	}

	return isObject(val) ? val.toString() : String(val);
};

String.prototype.lcFirst = function(){
	return this.charAt(0).toLowerCase() + this.slice(1);
};

String.prototype.ucFirst = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.capitalize = function(){
	var words = this.split(' ');
	var str = '', ln = words.length;

	while(ln-- > 0){
		if(str != ''){
			str = ' ' + str;
		}

		str = words[ln].ucFirst() + str;
	}

	return str;
};

String.prototype.compareVersion = function(v){
	var i = 0,
		res = 0,
		p1 = this.split('.'),
		p2 = v.split('.'),
		ln = Math.max(p1.length, p2.length);

	for(; i < ln; i++) {
		var t1 = (i < p1.length) ? parseInt(p1[i], 10) : 0,
			t2 = (i < p2.length) ? parseInt(p2[i], 10) : 0;

		if(isNaN(t1)){
			t1 = 0;
		}

		if(isNaN(t2)){
			t2 = 0;
		}

		if(t1 != t2){
			res = (t1 > t2) ? 1 : -1;

			break;
		}
	}

	return res;
};

String.prototype.count = function(needle){
	return (this.match(new RegExp(needle.regexEscape(), 'g')) || []).length;
};

String.prototype.decodeUri = function(){
	return decodeURIComponent(this);
};

String.prototype.encodeUri = function(){
	return encodeURIComponent(this);
};

String.prototype.html = function(){
	return this.replaceAll(['\n', '\t'], ['<br />', '&nbsp;&nbsp;&nbsp;&nbsp;']);
};

String.prototype.isEmpty = function(){
	return this.trim() != '';
};

String.prototype.trim = function(){
	return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

String.prototype.ltrim = function(){
	return this.replace(/^\s+/,'');
};

String.prototype.rtrim = function(){
	return this.replace(/\s+$/,'');
};

String.prototype.fulltrim = function(){
	return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
};

String.prototype.clean = function(obj){
	return obj.replace(/\r/g, '');
};

String.prototype.regexSpecialChars = new RegExp('[.*+?|()\\[\\]{}\\\\]', 'g'); // .*+?|()[]{}\

String.prototype.regexEscape = function(){
	return this.replace(String.prototype.regexSpecialChars, '\\$&');
};

String.prototype.replaceAll = function(needle, replace){
	if(Array.isArray(needle)){
		var haystack = this, i, ln = needle.length;

		replace = needle.equalize(replace);

		for(i = 0; i < ln; i++){
			haystack = haystack.replace(new RegExp(needle[i].regexEscape(), 'g'), replace[i]);
		}

		return haystack;
	}
	else{
		return this.replace(new RegExp(needle.regexEscape(), 'g'), replace);
	}
};




/**
 * Framework Type & Value Detection Functions
 */
// true when obj is not a member of a function
function isAlien(obj){
	return isObject(obj) && !isFunction(obj.constructor);
}

// true when obj is a native javascript array
function isArray(obj){
	return Array.isArray(obj);
}

// true when obj is the meta-type boolean
function isBoolean(obj){
	return typeof obj === 'boolean';
}

// true when obj is an object having the getMonth method
function isDate(obj){
	return isObject(obj) && obj.getMonth;
}

// true when obj is set and has children nodes or a node type
function isDomElement(obj){
	return obj && (!isUndefined(obj.childNodes) || obj.nodeType);
}

// true when obj is set, the native javascript events is defined, and obj has an events phase
function isEvent(obj){
	return obj && typeof Event != 'undefined' && obj.eventPhase;
}

function isHash(obj){
	return isObject(obj) && isUndefined(obj.prototype);
}

// true when the object is an integer
function isInt(obj){
	var tmp = parseInt(obj);

	if(isNaN(tmp)){
		return false;
	}

	return obj == tmp && obj.toString() == obj.toString();
};

// true when obj is exactly equal to null
function isNull(obj){
	return obj === null;
}

// true when obj is the meta-type function
function isFunction(obj){
	return isSet(obj) && typeof obj === 'function';
}

// true when obj is the meta-type number and is finite
function isNumber(obj){
	return isSet(obj) && typeof obj === 'number' && isFinite(obj);
}

// true when obj is the meta-type object
function isObject(obj){
	return isSet(obj) && obj instanceof Object && !isArray(obj);
}

// true when obj is of the meta-type string
function isString(obj){
	return isSet(obj) && (typeof obj === 'string' || obj.constructor.toString() === 'string');
}

// true when obj is of the meta-type undefined
function isUndefined(obj){
	return typeof obj === 'undefined';
}


// true if the obj is a oj widget
function isObjective(obj){
	return isObject(obj) && isSet(obj._id_) && isFunction(obj._constructor);
}
function isElement(obj){
	return isObjective(obj) && isSet(obj._dom);
}
function isComponent(obj){
	return isElement(obj) && isSet(obj._template);
}

function isXml(obj){
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var doc_elm = (obj ? obj.ownerDocument || obj : 0).documentElement;

	return doc_elm ? doc_elm.nodeName !== 'HTML' : false;
}

function toXml(obj){
	if(isString(obj)){
		if(window.DOMParser){
			return (new DOMParser()).parseFromString(obj, 'text/xml');
		}

		// Internet Explorer
		var xml = new ActiveXObject('Microsoft.XMLDOM');
		xml.async = false;

		xml.loadXML(obj);

		return xml;
	}

	return isXml(obj) ? obj : null;
}

// value detection functions
function isEmpty(obj){
	return isUnset(obj) || obj == false ||
		(isString(obj) && obj.trim() == '') ||
		(isArray(obj) && obj.length == 0) ||
		(isObject(obj) && isEmptyObject(obj)) ||
		(isObjective(obj) && obj.is('OjCollection') && !obj.numItems());
}

function isEmptyObject(obj){
	var key, val;

	if(isArray(obj)){
		return obj.length == 0;
	}
	else if(isObject(obj)){
		for(key in obj){
			val = obj[key];

			if(!isUndefined(val) && !isFunction(val)){
				return false;
			}
		}
	}

	return true;
}

function isFalse(obj){
	return isNull(obj) || obj === false || obj === 0 || (isString(obj) && (obj.toLowerCase() == 'false' || obj == '0'));
}

function isNumeric(obj){
	return isSet(obj) && isFinite(parseFloat(obj));
}

// true when obj has any value, including 0 and false, both of which are normally false
function isSet(obj){
	return !isUnset(obj);
}

function isTrue(obj){
	return !isFalse(obj);
}

function isUnset(obj){
	return isNull(obj) || isUndefined(obj);
}



/**
 * Framework Logging Functions
 */
function trace(obj/*, ...objs*/){
	if(OJ._('mode') == OJ.PROD){
		return;
	}

	var ln = arguments.length, i;

	if(ln < 2){
		console.log(obj);
	}
	else{
		var ary = [];

		for(i = 0; i < ln; i++){
			ary.push(arguments[i]);
		}

		console.log(ary);
	}
}

function traceGroup(/*obj, group*/){
	var ln = arguments.length;

	if(ln){
		if(ln > 1 && arguments[1] && !isUndefined(console.groupCollapsed)){
			console.groupCollapsed(arguments[0]);
		}
		else{
			console.group(arguments[0]);
		}
	}
	else{
		console.groupEnd();
	}
}

if(!isSet(window.console) || !isObject(window.console)){
	window.console = {};
}

if(!isSet(console.log) || !isFunction(console.log)){
	console.log = function(){
		// do something not sure what
	};
}

if(!isSet(console.group) || !isFunction(console.group)){
	console.group = console.groupCollapsed = console.groupEnd = console.log;
}




/*
 * Framework Load
 */
traceGroup('Picking the oranges.', true);







// on dom ready event handler
function onDomReady(){
	var key;

	// make sure the document has a head var
	if(!document.head){
		document.head = document.getElementsByTagName('head');

		if(document.head.length){
			document.head = document.head[0];
		}
		else{
			document.head = null;
		}
	}

	// process the target and it's attributes for any additional settings
	var target = OJ.byId(OJ._('target'));

	if(target){
		// process the target attributes
		// as settings
		var attrs = target.attributes, attr,
			special = ['mode', 'version'],
			ln = special.length;

		// process order sensitive settings first
		for(; ln--;){
			if((attr = special[ln]) && attrs[attr]){
				OJ.setting(attr, attrs[attr].value)

				target.removeAttribute(attr);
			}
		}

		// process the rest of the settings
		ln = attrs.length;

		for(; ln--;){
			attr = attrs[ln].nodeName;

			// disregard the id, class and event attributes since they are not settings
			if(attr == 'id' || attr == 'class' || attr.substr(0, 3) == 'on-'){
				continue;
			}

			// all other attributes are settings
			OJ.setting(OJ.attributeToFunc(attr), attrs[ln].value);

			target.removeAttribute(attr);
		}

		OJ._target = target;
	}

	// process the mode
	// if no mode has been specified then push us into production mode by default
	if(OJ._('mode') == OJ.LOADING){
		OJ.setting('mode', OJ.PROD);
	}

	// updated the loaded assets with the appropriate query string
	for(key in OJ._loaded){
		OJ._loaded[key + OJ.getVersionQuery()] = true;
	}

	// setup a library for the loaded assets
	OJ._library = new OjLibrary(OJ._loaded);

	// import the required classes
								
	// create the OJ component
	var tmp = new OjView();
	tmp.setAlpha(0);

	// add the rendering div
	tmp.addChild(tmp.renderer = new OjStyleElement('<div class="renderer"></div>'));

	// handle events added before we could do anything with them
	var evt,
		i = 0,
		ln = OJ._events.length;

	for(; i < ln; i++){
		evt = OJ._events[i];

		if(evt.action == 'add'){
			tmp.addEventListener(evt.type, evt.context, evt.func);
		}
		else{
			tmp.removeEventListener(evt.type, evt.context, evt.func);
		}
	}

	delete OJ._events;
	delete OJ._handleEvent;
	delete OJ.addEventListener;
	delete OJ.removeEventListener;

	// merge OJ with component
	tmp.bulkSet(OJ);

	tmp.addCss('OJ');

	window.OJ = tmp;

	// dispatch load event
	OJ.dispatchEvent(new OjEvent(OjEvent.LOAD));



	// setup the dom event proxy
	OJ._setProxy(document.body);

	// hack so that we can capture taps in iOS
	if(OJ._os == OJ.IOS){
		tmp.dom().onclick = function(){};
	}

	// setup the css classes for special displays
	OJ._onOjResize(null);
	OJ._onOjScroll(null);

	if(OJ.isMobile()){
		OJ.addCss('is-mobile');
	}

	if(OJ.isTablet()){
		OJ.addCss('is-tablet');
	}

	var scale = OJ.getPixelRatio();

	if(scale <= .75){
		OJ.addCss('ld'); // low-density
	}
	else if(scale >= 1.5){
		OJ.addCss('hd'); // high-density
	}
	else{
		OJ.addCss('sd'); // standard-density
	}

	// set all the content as displayed
	OJ._setIsDisplayed(true);

	// check if browser is supported
	try{
		var browser = OJ.getBrowser(),
			version = OJ.getBrowserVersion();

		OJ._is_supported = !(OJ.isComputer() && (
			(browser == OJ.IE && version.compareVersion('9.0') < 0) ||
			(browser == OJ.FIREFOX && version.compareVersion('2.0') < 0) ||
			(browser == OJ.CHROME && version.compareVersion('4.0') < 0) ||
			(browser == OJ.SAFARI && version.compareVersion('5.0') < 0) ||
			(browser == OJ.OPERA && version.compareVersion('10.5') < 0)
		));
	}
	catch(e){
		OJ._is_supported = false;
	}

	// timeout offset to allow for css and stuff to settle
	// this is clearly a hack so deal with it
	OJ._interval = setInterval(window.onOjReady, 100);
}

// on oj ready event handler
function onOjReady(){
	if(isEmpty(OjStyleElement.getStyle(document.body, 'minWidth'))){
		return;
	}

	clearInterval(OJ._interval);

	// close up the loading group logs
	traceGroup();

	// run this init function if any
	traceGroup('Juicing the oranges.', true);

	// place OJ component in the DOM
	if(OJ._target){
		OJ._setDomSource(OJ._target, OJ);

		OJ._target = null;
	}
	else{
		document.body.appendChild(OJ.dom());
	}

	var init = OJ._('init');

	if(init){
		init();
	}

	traceGroup();

	// dispatch the ready event
	traceGroup('Your OJ is ready. Enjoy!', true);

	OJ._is_ready = true;

	OJ.fadeIn();

	// detect if the browser is not supported
	if(!OJ.isSupported()){
		var alrt = WindowManager.makeAlert('UnSupported Browser', OJ._('supportMessage'));
		alrt.hideButtons();
		alrt.setPaneWidth(425);

		WindowManager.show(alrt);

		return;
	}

	OJ.dispatchEvent(new OjEvent(OjEvent.READY));

	traceGroup();
}



OJ.extendComponent(
	OjLink, 'OjButton',
	{
		'_default_h_align' : OjStyleElement.CENTER,


		'_constructor' : function(/*label, icon*/){
			var args = arguments,
				ln = args.length;

			this._super('OjButton', '_constructor', []);

			if(ln){
				this.setText(args[0]);

				if(ln > 1){
					this.setIcon(args[1]);
				}
			}
		},


		'redraw' : function(){
			if(this._super('OjButton', 'redraw', arguments)){
				// note: hack for webkit render bug
				if(OJ.getEngine() == OJ.WEBKIT){
					this._setStyle('font-size', '1px');

					this._setStyle('font-size', null);
				}

				return true;
			}

			return false;
		},


		'getLabel' : function(){
			return this.getText();
		},
		'setLabel' : function(label){
			this.setText(label);
		},

		'setIsActive' : function(active){
			this._super('OjButton', 'setIsActive', arguments);

			if(this._icon){
				this._icon.setIsActive(active);
			}
		}
	},
	{
		'_TAGS' : ['button']
	}
);


window.OjICollectionComponent = {
	// properties
	'_props_' : {
		'itemRenderer' : null
	},

//  '_item_events' : null,  '_items' : null,  '_rendered' : null,  '_renderer' : null,


	// helper functions
	'_getContainer' : function(){
		return this._items;
	},

	'_setElmFuncs' : function(container){
		return this._elm_funcs = {
			'addElm'        : 'addItem',
			'addElmAt'      : 'addItemAt',
			'getElmAt'      : 'getItemAt',
			'getElms'       : 'getItems',
			'hasElm'        : 'hasItem',
			'indexOfElm'    : 'indexOfItem',
			'moveElm'       : 'moveItem',
			'numElms'       : 'numItems',
			'removeAllElms' : 'removeAllItems',
			'removeElm'     : 'removeItem',
			'removeElmAt'   : 'removeItemAt',
			'replaceElm'    : 'replaceItem',
			'replaceElmAt'  : 'replaceItemAt',
			'setElms'       : 'setItems'
		};
	},

	'_setup' : function(){
		var items = (this._items = new OjCollection());

		items.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
		items.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
		items.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
		items.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');

		this._rendered = {};

		this._item_events = {};
	},

	'_teardown' : function(){
		// remove any item listeners
		var key;

		for(key in this._item_events){
			this._removeItemListener(this._item_events[key]);
		}

		// remove the items collection
		this._unset('_items');

		// clear out the helper vars
		this._rendered = null;
		this._item_events = null;
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
		// convert the item event into a mouse event
		if(type == OjCollectionEvent.ITEM_CLICK){
			return [OjMouseEvent.CLICK, '_onItemClick'];
		}

		if(type == OjCollectionEvent.ITEM_OVER){
			return [OjMouseEvent.OVER, '_onItemOver'];
		}

		if(type == OjCollectionEvent.ITEM_OUT){
			return [OjMouseEvent.OUT, '_onItemOut'];
		}

		return null;
	},

	'_dispatchItemEvent' : function(type, evt){
		var item = evt.getCurrentTarget();

		if(this._itemRenderer){
			item = item.getData();
		}

		this.dispatchEvent(new OjCollectionEvent(type, item, this._items.indexOfItem(item)));
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
	'_onItemAdd' : function(evt){},

	'_onItemClick' : function(evt){
		this._dispatchItemEvent(OjCollectionEvent.ITEM_CLICK, evt);
	},

	'_onItemOut' : function(evt){
		this._dispatchItemEvent(OjCollectionEvent.ITEM_OUT, evt);
	},

	'_onItemOver' : function(evt){
		this._dispatchItemEvent(OjCollectionEvent.ITEM_OVER, evt);
	},

	'_onItemMove' : function(evt){},

	'_onItemRemove' : function(evt){
		delete this._rendered[evt.getItem().id()];
	},

	'_onItemReplace' : function(evt){
		delete this._rendered[evt.getOldItem().id()];
	},


	'renderItem' : function(item){
		if(!item){
			return null;
		}

		var key, evt,
			id = item.id();

		// if we have already rendered the item then just return the cached value
		if(this._rendered[id]){
			return this._rendered[id];
		}

		item = this._itemRenderer ? new this._itemRenderer(this, item) : item;

		for(key in this._item_events){
			evt = this._convertItemEventType(key);

			item.addEventListener(evt[0], this, evt[1]);
		}

		return this._rendered[id] = item;
	},

	'renderItemAt' : function(index){
		return this.renderItem(this._items.getItemAt(index));
	},


	'setItemRenderer' : function(val){
		val = isString(val) ? OJ.stringToClass(val) : val;

		if(val == this._itemRenderer){
			return;
		}

		this._itemRenderer = val;
	}
};


OJ.extendComponent(
	OjComponent, 'OjCollectionComponent',
	OJ.implementInterface(
		OjICollectionComponent,
		{
			'_constructor' : function(){
				this._super('OjCollectionComponent', '_constructor', arguments);

				// run the collection component setup
				this._setup();
			},

			'_destructor' : function(){
				// run the collection component teardown
				this._teardown();

				this._super('OjCollectionComponent', '_destructor', arguments);
			},


			'addEventListener' : function(type, target, func){
				this._super('OjCollectionComponent', 'addEventListener', arguments);

				this._addItemListener(type);
			},

			'removeEventListener' : function(type, target, func){
				this._super('OjCollectionComponent', 'removeEventListener', arguments);

				this._removeItemListener(type);
			}
		}
	)
);



OJ.extendComponent(
	OjComponent, 'OjFieldset',
	{
		'_props_' : {
			'collapsedIcon' : null,
			'collapsedText' : 'show',
			'collapsable'   : false,
			'expandedIcon'  : null,
			'expandedText'  : 'hide',
			'isCollapsed'   : false,
			'icon'          : null,
			'title'         : null
		},

		'_template' : 'oj.components.OjFieldset',


		'_constructor' : function(/*title*/){
			var args = arguments,
				ln = args.length;

			this._super('OjFieldset', '_constructor', []);

			// remove the actuator
			this.actuator.addEventListener(OjMouseEvent.CLICK, this, '_onActuatorClick');

			this.removeChild(this.actuator);

			// process arguments
			if(ln){
				this.setTitle(args[0]);
			}
		},


		'_processDomSourceChild' : function(dom_elm, component){
			var tag = dom_elm.tagName;

			if(tag && tag.toLowerCase() == 'legend'){
				var ln = dom_elm.childNodes.length, child;

				for(; ln--;){
					child = dom_elm.childNodes[ln];

					if(OjElement.isTextNode(child)){
						this.setTitle(child.nodeValue);
					}
				}

				return null;
			}

			return this._processChild(dom_elm, component);
		},

		'_redrawActuator' : function(){
			if(this._is_displayed){
				if(this._collapsable){
					this.actuator.setHeight(this.legend.getHeight());

					if(this._isCollapsed){
						if(this._collapsedIcon || this._collapsedText){
							this.actuator.setIcon(this._collapsedIcon);
							this.actuator.setText(this._collapsedText);

							this.addChildAt(this.actuator,  1);
						}
						else{
							this.removeChild(this.actuator);
						}
					}
					else{
						if(this._expandedIcon || this._expandedText){
							this.actuator.setIcon(this._expandedIcon);
							this.actuator.setText(this._expandedText);

							this.addChildAt(this.actuator,  1);
						}
						else{
							this.removeChild(this.actuator);
						}
					}
				}
				else{
					this.removeChild(this.actuator);
				}

				return true;
			}

			return false;
		},

		'_redrawLegend' : function(){
			if(this._is_displayed){
				if(!this.title && this._title){
					this.legend.addChild(this.title = new OjLabel(this._title));
				}
				else if(this.title){
					this.title.setText(this._title);
				}

				if(!this.icon && this._icon){
					this.legend.addChild(this.icon = new OjImage(this._icon));
				}
				else if(this.icon){
					this.icon.setSource(this._icon);
				}

				return true;
			}

			return false;
		},


		'_onActuatorClick' : function(evt){
			if(this._isCollapsed){
				this.expand();
			}
			else{
				this.collapse();
			}
		},

		'_onExpand' : function(evt){
			this.removeCss(['collapsed']);

			this.setHeight(OjStyleElement.AUTO);

			OJ.destroy(evt);
		},


		'collapse' : function(){
			var tween;

			if(this._isCollapsed){
				return;
			}

			this.setIsCollapsed(true);

			tween = new OjResize(this, OjResize.HEIGHT, this.legend.getHeight(), 250, OjEasing.OUT);
			tween.start();

			this._redrawActuator();
		},

		'expand' : function(){
			var tween;

			if(!this._isCollapsed){
				return;
			}

			this.setIsCollapsed(false);

			tween = new OjResize(this, OjResize.HEIGHT, this.legend.getHeight() + this.container.getHeight(), 250, OjEasing.OUT);
			tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onExpand');
			tween.start();

			this._redrawActuator();
		},

		'redraw' : function(){
			if(this._super('OjFieldset', 'redraw', arguments)){
				this._redrawActuator();

				this._redrawLegend();

				return true;
			}

			return false;
		},


		'setCollapsable' : function(val){
			if(this._collapsable == val){
				return;
			}

			this._collapsable = val;

			this._redrawActuator();
		},

		'setCollapsedIcon' : function(val){
			if(this._collapsedIcon == val){
				return;
			}

			this._collapsedIcon = val;

			this._redrawActuator();
		},

		'setCollapsedText' : function(val){
			if(this._collapsedText == val){
				return;
			}

			this._collapsedText = val;

			this._redrawActuator();
		},

		'setExpandedIcon' : function(val){
			if(this._expandedIcon == val){
				return;
			}

			this._expandedIcon = val;

			this._redrawActuator();
		},

		'setExpandedText' : function(val){
			if(this._expandedText == val){
				return;
			}

			this._expandedText = val;

			this._redrawActuator();
		},

		'setIcon' : function(val){
			if(this._icon == val){
				return;
			}

			this._icon = val;

			this._redrawLegend();
		},

		'setIsCollapsed' : function(val){
			if(this._isCollapsed == val){
				return;
			}

			if(this._isCollapsed = val){
				this.addCss(['collapsed']);

				this.dispatchEvent(new OjEvent(this._static.COLLAPSE));
			}
			else{
				this.removeCss(['collapsed']);

				this.dispatchEvent(new OjEvent(this._static.EXPAND));
			}
		},

		'setTitle' : function(val){
			if(this._title == val){
				return;
			}

			this._title = val;

			this._redrawLegend();
		}
	},
	{
		'_TAGS' : ['fieldset'],

		'COLLAPSE' : 'onCollapse',
		'EXPAND'   : 'onExpand'
	}
);


OJ.extendComponent(
	OjButton, 'OjImageButton',
	{
		'_v_align' : OjStyleElement.TOP,


		'_constructor' : function(/*image*/){
			var args = arguments;

			this._super('OjImageButton', '_constructor', []);

			if(args.length){
				this.setIcon(args[0]);
			}

			this.removeChild(this.label);
		},

		'_processDomSourceChildren' : function(dom_elm, component){
			var txt = dom_elm.innerHTML;

			if(!isEmpty(txt)){
				this.setIcon(new OjImage(txt.trim()));

				return null;
			}

			return this._super('OjImageButton', '_processDomSourceChildren', arguments);
		},


		'_makeLabel' : function(){
			// don't do anything since we don't need a label
		},


		'getLabel' : function(){
			return this._label;
		},
		'setLabel' : function(label){
			this._label = label;
		},

		'getImage' : function(){
			return this.getIcon();
		},
		'setImage' : function(img){
			this.setIcon(img);
		}
	},
	{
		'_TAGS' : ['imagebutton']
	}
);


OJ.extendComponent(
	OjComponent, 'OjItemRenderer',
	{
		'_props_' : {
			'data'  : null,
			'group' : null
		},


		'_constructor' : function(/*group, data*/){
			this._super('OjItemRenderer', '_constructor', []);

			var args = arguments,
				ln = args.length;

			if(ln){
				this.setGroup(args[0]);

				if(ln > 1){
					this.setData(args[1]);
				}
			}
		},


		'_redrawData' : function(){
			return this._is_displayed;
		},


		'redraw' : function(){
			if(this._super('OjItemRenderer', 'redraw', arguments)){
				this._redrawData();

				return true;
			}

			return false;
		},


		'setData' : function(data){
			if(this._data == data){
				return;
			}

			this._data = data;

			this._redrawData();
		}
	},
	{
		'_TAGS' : ['item']
	}
);


OJ.extendComponent(
	OjComponent, 'OjLabel',
	{
		'_props_' : {
			'prefix' : null,
			'suffix' : null,
			'text'   : null
		},

		'_template' : '<label></label>',


		'_constructor' : function(){
			var args = arguments;

			this._super('OjLabel', '_constructor', []);

			if(args.length){
				this.setText(args[0]);
			}
		},


		'_processDomSourceChildren' : function(dom_elm, component){
			var txt = dom_elm.innerHTML;

			if(!isEmpty(txt)){
				this.setText(String.string(this._text) + String.string(txt));

				return;
			}

			return this._super('OjLabel', '_processDomSourceChildren', arguments);
		},

		'_redrawText' : function(){
			this._dom.innerHTML = String.string(this._prefix) + String.string(this._text) + String.string(this._suffix).replaceAll('\n', '<br />');
		},


		'appendText' : function(str){
			if(str){
				return;
			}

			this.setText(String.string(this._text).html() + str);
		},

		'prependText' : function(str){
			if(str){
				return;
			}

			this.setText(str + String.string(this._text).html());
		},

		'redraw' : function(){
			if(this._super('OjLabel', 'redraw', arguments)){
				this._redrawText();

				return true;
			}

			return false;
		},


		'setPrefix' : function(val){
			if(this._prefix == val){
				return;
			}

			this._prefix = val ? val.toString() : null;

			this.redraw();
		},

		'setSuffix' : function(val){
			if(this._suffix == val){
				return;
			}

			this._suffix = val ? val.toString() : null;

			this.redraw();
		},

		'setText' : function(val){
			if(this._text == val){
				return;
			}

			this._text = String.string(val).html();

			this.redraw();
		}
	},
	{
		'_TAGS' : ['label']
	}
);



OJ.extendComponent(
	OjComponent, 'OjOverlay',
	{
		'_props_' : {
			'forceIcon'    : true,
			'forceMessage' : false,
			'message'      : null,
			'icon'         : null
		},

		'_v_align' : OjStyleElement.MIDDLE,

		'_template' : 'oj.components.OjOverlay',


		'_constructor' : function(/*message, icon*/){
			var args = arguments,
				ln = arguments.length,
				icon;

			this._super('OjOverlay', '_constructor', []);

			if(ln){
				this.setMessage(args[0]);

				if(ln > 1){
					icon = args[1];
				}
			}

			this.setIcon(icon);
		},


		'_onFadeComplete' : function(evt){
			if(this._fader.getDirection() == OjFade.OUT && this.getParent()){
				this.getParent().removeChild(this);
			}

			this._super('OjOverlay', '_onFadeComplete', arguments);
		},


		'hide' : function(){
			if(!this.getParent()){
				return;
			}

			this.fadeOut();
		},

		'show' : function(target){
			if(!target || this.getParent() == target){
				return;
			}

			this.setAlpha(0);

			target.addChild(this);

			this.fadeIn();
		},


		'setMessage' : function(msg){
			if(!msg && this._forceMessage){
				msg = 'Loading';
			}

			if(isEmpty(msg)){
				this.addCss(['no-message']);
			}
			else{
				this.removeCss(['no-message']);
			}

			this.message.setText(msg);
		},

		'setIcon' : function(icon){
			this.icon.removeAllChildren();

			if(icon || this._forceIcon){
				if(!icon){
					icon = new OjSpinner();
					icon.setWidth(40);
					icon.setHeight(40);
				}

				this.removeCss(['no-icon']);

				this.icon.addChild(icon);
			}
			else{
				this.addCss(['no-icon']);
			}
		}
	},
	{
		'_TAGS' : ['overlay']
	}
);/*
 * Note: Stack requires defined dimensions for transitions to work properly
 */




OJ.extendComponent(
	OjCollectionComponent, 'OjStack',
	{
		// Properties & Vars
		'_props_' : {
			'active'         : null,
			'activeIndex'    : -1,
			'allowLooping'   : false, // todo: OjStack - add support for looping
			'alwaysTrans'    : false,
			'autoSizeHeight' : false, // todo: OjStack - add support for auto size height
			'autoSizeWidth'  : false, // todo: OjStack - add support for auto size width
			'transition'     : null
		},

//			'_active_elm' : null,  '_deferred_active' : null,  '_prev_active' : null,
//
//			'_trans_in' : null,  '_trans_out' : null,

		'_current_index' : 0,  '_prev_index' : -1,


		// Construction & Destruction Functions
		'_constructor' : function(/*items, transition, item_renderer*/){
			var args = arguments,
				ln = args.length;

			this._super('OjStack', '_constructor', []);

			// set the default transition mode
			if(ln > 2){
				this.setItemRenderer(args[2]);
			}

			this.setTransition(ln > 1 ? args[1] : OjTransition.NONE);

			this._items.setItems(ln ? args[0] : []);
		},

		'_destructor' : function(){
			var ln,
				args = arguments,
				depth = args.length && args[0];

			// unset transitions
			this._unset('_trans_in', true);
			this._unset('_trans_out', true);

			// unset previous active
			if(this._prev_active){
				this._removeActive(this._prev_active);

				this._prev_active = null;
			}

			// unset current active
			if(this._active){
				this._removeActive();

				this._active = null;
			}

			// unset views
			if(depth > 1){
				ln = this.numElms();

				for(; ln--;){
					OJ.destroy(this.renderItemAt(ln), depth);
				}
			}

			// remove object references
			this._controller = this._transition = null;

			return this._super('OjStack', '_destructor', args);
		},


		// Element Management Functions
		'_callElmFunc' : function(func, args){
			var trans = this._transition,
				ln = args.length,
				index = -1;

			if(!this._elm_funcs[func]){
				return;
			}

			// detect transition flag
			switch(func){
				case 'removeAllElms':
					index = 0;
				break;

				case 'removeElmAt':
					if(ln){
						args[0] = this._processIndex(args[0]);
					}
				case 'addElm':
				case 'removeElm':
					index = 1;
				break;

				case 'addElmAt':
				case 'replaceElmAt':
					if(ln > 1){
						args[1] = this._processIndex(args[1]);
					}

				case 'moveElm':
				case 'replaceElm':
					index = 2;
				break;

				case 'getElmAt':
					if(ln){
						this[0] = this._processIndex(args[0]);
					}
				break;
			}

			// handle transition flag
			if(index > -1){
				if(ln > index){
					this.setTransition(this._processTransParam(args[index]));

					args.pop();
				}
			}

			// call the elm func
			var rtrn = this._getContainer()[this._elm_funcs[func]].apply(this._items, args)

			// return transition to previous state
			if(index > -1){
				this.setTransition(trans);
			}

			return rtrn;
		},

		'_processDomSourceChild' : function(dom_elm, context){
			if(OjElement.isTextNode(dom_elm)){
				return false;
			}

			return this._super('OjStack', '_processDomSourceChild', arguments);
		},

		'_processDomSourceChildren' : function(dom_elm, context){
			var children = dom_elm.childNodes,
				ln = children.length,
				i = 0, child;

			for(; i < ln; i++){
				if(child = this._processDomSourceChild(children[i], context)){
					// remove the child from the dom source
					child.setParent(null);

					// add the child to our stack
					this.addElm(child);

					// if we add then we need to decrement the counter and length since
					// a child will have been removed from the child nodes array
					i += children.length - ln;
					ln = children.length;
				}
			}
		},

		// Helper Functions
		'_addActive' : function(item, index){
			this._active = item;
			this._activeIndex = index;

			this._addActiveElm(this.renderItem(item));
		},

		'_addActiveElm' : function(elm){
			elm.setIsActive(true);

			this.container.addChild(elm);
		},

		'_animationDirection' : function(start, finish){
			return start < finish ? -1 : 1;
		},

		'_dispatchChangeComplete' : function(){
			this.dispatchEvent(new OjStackEvent(OjStackEvent.CHANGE_COMPLETE, this._active, this._transition, this._activeIndex, this._prev_index));
		},

		'_makeTransIn' : function(direction){
			var amount = 0, elm,
				container = this.container;

			this._unset('_trans_in');

			if(!direction){
				return null;
			}

			elm = container.getChildAt(
				Math.bounds(container.numChildren() - 1, 0, 1)
			);

			switch(this._transition.getEffect()){
				case OjTransition.FADE:
					if(this._trans_out){
						return null;
					}

					amount = 1;
				break;

				case OjTransition.SLIDE_HORZ:
					elm.setX(-1 * direction * container.getWidth());
				break;

				case OjTransition.SLIDE_VERT:
					elm.setY(-1 * direction * container.getHeight());
				break;
			}

			if(this._trans_in = this._transition.make(elm, OjTransition.IN, amount)){
				this._trans_in.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransIn');
				this._trans_in.start();

				this._setIsAnimating(true);
			}
			else if(!this._trans_out){
				// dispatch the change is complete
				this._dispatchChangeComplete();
			}

			return this._trans_in;
		},

		'_makeTransOut' : function(direction){
			var amount = 0,
				container = this.container,
				elm = container.getChildAt(0);

			this._unset('_trans_out');

			if(elm){
				switch(this._transition.getEffect()){
					case OjTransition.SLIDE_HORZ:
						amount = elm.getX() + (direction * container.getWidth());
						break;

					case OjTransition.SLIDE_VERT:
						amount = elm.getY() + (direction * container.getHeight());
						break;
				}


				if(this._trans_out = this._transition.make(elm, OjTransition.OUT, amount)){
					elm.addCss('prev-active');

					this._trans_out.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransOut');
					this._trans_out.start();

					this._setIsAnimating(true);
				}
				else{
					this._removeActive(this._prev_active);
				}
			}

			return this._trans_out;
		},

		'_processIndex' : function(index){
			var ln = this.numElms();

			if(this._allowLooping){
				index = index % ln;

				// set the active
				if(index < 0){
					return ln + index;
				}

				return index;
			}

			return Math.bounds(index, 0, ln - 1);
		},

		'_processTransParam' : function(param){
			if(!param){
				return OjStack.NONE;
			}

			if(param === true){
				return this._transition;
			}

			return param;
		},

		'_removeActive' : function(/*item*/){
			var args = arguments,
				ln, elm,
				item = args.length ? args[0] : this.getElmAt(this._activeIndex);

			if(item){
				elm = item;

				// find the matching elm
				if(this._itemRenderer){
					ln = this.container.numChildren();

					// NOTE: this will not function properly if it can't find a match since it sets the elm on each pass
					for(; ln--;){
						elm = this.container.getChildAt(ln);

						if(elm.getData() == item){
							break;
						}
					}
				}

				this._removeActiveElm(elm);
			}
		},

		'_removeActiveElm' : function(elm){
			// remove the elm from the display
			this.container.removeChild(elm);

			elm.removeCss(['prev-active']);
			elm.setWidth(OjStyleElement.AUTO);
			elm.setHeight(OjStyleElement.AUTO);
			elm.setAlpha(1);

			elm.setIsActive(false);
		},


		// Event Handler Functions
		'_onItemAdd' : function(evt){
			this._super('OjStack', '_onItemAdd', arguments);

			// since we are using a collection to keep track of things the parent won't get properly changes
			// so we need to do it here
			var index = evt.getIndex(),
				item = evt.getItem();

			this.dispatchEvent(new OjStackEvent(OjStackEvent.ADD, item, this._transition, index));

			if(!this._active){
				this.setActiveIndex(index);
			}
			else{
				this._current_index = this.indexOfElm(this._active);
			}
		},

		'_onItemMove' : function(evt){
			this._super('OjStack', '_onItemMove', arguments);

			this.dispatchEvent(new OjStackEvent(OjStackEvent.MOVE, evt.getItem(), this._transition, evt.getIndex()));

			if(this._active == evt.getItem()){
				this._current_index = evt.getIndex();
				// todo: add logic for stack item move current_index
			}
		},

		'_onItemRemove' : function(evt){
			this._super('OjStack', '_onItemRemove', arguments);

			var ln,
				item = evt.getItem(),
				index = evt.getIndex();

			this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, item, this._transition, index));

			if(this._active == item){
				if(this._current_index){
					this.setActiveIndex(this._current_index - 1);
				}
				else if(ln = this.numElms()){
					this.setActiveIndex(ln - 1);
				}
				else{
					this._active = null;
					this._current_index = -1;
				}
			}
			else{
				if(this._prev_active == item){
					this._prev_active = null;
				}

				this._current_index = this.indexOfElm(this._active);
			}
		},

		'_onItemReplace' : function(evt){
			this._super('OjStack', '_onItemReplace', arguments);

			var item = evt.getItem(),
				index = evt.getIndex();

			this.dispatchEvent(new OjStackEvent(OjStackEvent.REPLACE, item, this._transition, index));

			if(this._activeIndex == index){
				// remove the old active
				this._removeActive(this._active);

				// add the new active
				this._addActive(item, this._activeIndex);
			}
		},

		'_onTransIn' : function(evt){
			// cleanup the transition
			this._unset('_trans_in');

			// if there are no more transitions get us out of animating mode
			if(!this._trans_out){
				this._setIsAnimating(false);

				// dispatch the change is complete
				this._dispatchChangeComplete();
			}

			// process any deferred
			if(!isNull(this._deferred_active)){
				this.setActiveIndex.apply(this, this._deferred_active);
			}
		},

		'_onTransOut' : function(evt){
			// cleanup the transition
			this._unset('_trans_out');

			// remove the previously active item/elm
			this._removeActive(this._prev_active);

			// if there are no more transitions get us out of animating mode
			if(!this._trans_in){
				this._setIsAnimating(false);

				// dispatch the change is complete
				this._dispatchChangeComplete();
			}

			// unset prev vars since they are no longer needed
			this._prev_active = null;
			this._prev_index = null;
		},


		// Utility Functions
		'next' : function(){
			this.setActiveIndex(this._current_index + 1);
		},

		'prev' : function(){
			this.setActiveIndex(this._current_index - 1);
		},

		'renderItemAt' : function(index){
			return this._super('OjStack', 'renderItemAt', [this._processIndex(index)]);
		},


		// Getter & Setter Functions
		'setActive' : function(val/*, transition = true*/){
			if((arguments[0] = this.indexOfElm(val)) > -1){
				this.setActiveIndex.apply(this, arguments);
			}
		},


		// Getter & Setter Functions
		'setActiveIndex' : function(val/*, transition = true*/){
			var trans, trans_diff, item, direction, evt;

			// check for change
			if(this._current_index == val && this._active){
				return;
			}

			// if we are in the middle of an animation then deffer the change until afterward
			if(this._trans_in){
				this._deferred_active = arguments;

				return;
			}

			// handle custom transition if it exists
			trans = this._transition;
			trans_diff = arguments.length > 1;

			if(trans_diff){
				this.setTransition(this._processTransParam(arguments[1]));
			}

			this._deferred_active = null;

			direction = this._alwaysTrans ? 1 : 0;

			this._current_index = val;
			this._prev_index = -1;

			// transition out the old active container
			if(this._active){
				// get the old element
				this._prev_active = this._active;

				// update the direction
				// create the transition out animation
				this._makeTransOut(direction = this._animationDirection(this._prev_index = this._activeIndex, val));
			}

			// make sure we have something to set active
			if(!this.numElms()){
				this._activeIndex = -1;
				this._current_index = -1;
				this._active = null;

				return;
			}

			val = this._processIndex(val);

			// create the change event
			evt = new OjStackEvent(OjStackEvent.CHANGE, item = this.getElmAt(val), this._transition, val, this._prev_index);

			this._addActive(item, val);

			// transition in the new active container
			// but only if we are transitioning out an old active
			if(this._trans_out || this._alwaysTrans){
				this._makeTransIn(direction);
			}

			if(trans_diff){
				this.setTransition(trans);
			}

			// dispatch the change event
			this.dispatchEvent(evt);

			// dispatch the change is complete
			// if no animation
			if(!this._trans_out && !this._alwaysTrans){
				this._dispatchChangeComplete();
			}
		},

		'setAllowLooping' : function(allow_looping){
			if(this._allowLooping == allow_looping){
				return;
			}

			// check to see if current index is out of bounds
			if(!(this._allowLooping = allow_looping)){
				var ln = this.numElms();

				if(this._current_index < 0){
					this.setActiveIndex((ln - this._current_index) % ln);
				}
				else if(this._current_index >= ln){
					this.setActiveIndex(this._current_index % ln);
				}
			}
		},

		'setTransition' : function(val){
			if(this._transition == val){
				return;
			}

			this._transition = OjTransition.transition(val, this._transition);
		}
	},
	{
		'_TAGS' : ['stack']
	}
);


OJ.extendClass(
	OjObject, 'OjRect',
	{
		'_props_' : {
			'top'    : 0,
			'left'   : 0,
			'width'  : 0,
			'height' : 0
		},

		'_get_props_' : {
			'bottom' : 0,
			'right'  : 0
		},


		'_constructor' : function(/*left, top, width, height*/){
			this._super('OjRect', '_constructor', []);

			var args = arguments,
				ln = args.length;

			if(ln){
				this.setLeft(args[0]);

				if(ln > 1){
					this.setTop(args[1]);

					if(ln > 2){
						this.setWidth(args[2]);

						if(ln > 3){
							this.setHeight(args[3]);
						}
					}
				}
			}
		},

		'hitTestPoint' : function(x, y){
			return x >= this._left && x <= this._right && y >= this._top && y <= this._bottom;
		},

		'hitTestRect' : function(rect){
			return (rect._top >= this._top && rect._top <= this._bottom && rect._left >= this._left && rect._left <= this._right) ||
				(rect._top >= this._top && rect._top <= this._bottom && rect._right >= this._left && rect._right <= this._right) ||
				(rect._bottom >= this._top && rect._bottom <= this._bottom && rect._left >= this._left && rect._left <= this._right) ||
				(rect._bottom >= this._top && rect._bottom <= this._bottom && rect._right >= this._left && rect._right <= this._right);
		},


		'setTop' : function(val){
			this._bottom = (this._top = val) + this._height;
		},

		'setLeft' : function(val){
			this._right = (this._left = val) + this._width;
		},

		'setWidth' : function(val){
			this._right = (this._width = val) + this._left;
		},

		'setHeight' : function(val){
			this._bottom = (this._height = val) + this._top;
		}
	}
);


OJ.extendClass(
	OjObject, 'OjXml',
	{
		'_props_' : {
			'xml'  : null
		},


		'_constructor' : function(xml){
			this._super('OjXml', '_constructor', []);

			this.setXml(xml);
		},


		'attr' : function(attr /*, val*/){
			var args = arguments;

			if(args.length > 1){
				this._xml.setAttribute(attr, args[1]);

				return val;
			}

			return this._xml.getAttribute(attr);
		},

		'query' : function(xpath /*, limit=0*/){
			var args = arguments,
				i = 0, ln, xresult,
				limit = args.length > 1 ? args[1] : 0,
				result, results = [];

			// ie implementation
			if(!window.DOMParser){
				results = this._xml.selectNodes(xpath);

				ln = results.length;

				for(; i < ln && (!limit || i < limit); i++){
					results[i] = new OjXml(results[i]);
				}

				return limit == 1 ? (ln ? results[0] : null) : results.slice(0, limit);
			}

			// all other browser implementations
			xresult = (this._xml.ownerDocument ? this._xml.ownerDocument : this._xml).evaluate('.' + xpath, this._xml, null, XPathResult.ANY_TYPE, null);

			if(
				xresult.resultType == XPathResult.ORDERED_NODE_ITERATOR_TYPE ||
				xresult.resultType == XPathResult.UNORDERED_NODE_ITERATOR_TYPE
			){
				for(; (result = xresult.iterateNext()) && (!limit || i++ < limit);){
					results.push(new OjXml(result));
				}

				return limit == 1 ? (results.length ? results[0] : null) : results;
			}

			if(xresult.resultType == XPathResult.STRING_TYPE){
				return xresult.stringValue;
			}

			if(xresult.resultType == XPathResult.NUMBER_TYPE){
				return xresult.numberValue;
			}

			if(xresult.resultType == XPathResult.BOOLEAN_TYPE){
				return xresult.booleanValue;
			}

			return null;
		},

		'value' : function(/*xpath, value*/){
			var args = arguments,
				result;

			if(args.length){
				result = this.query('/' + args[0], 1);

				return result ? result.value() : null;
			}

			return this._xml.textContent;
		},


		'setXml' : function(xml){
			this._xml = toXml(xml);
		}
	},
	{
		'xml' : function(xml){
			if(isXml(xml)){
				return new OjXml(xml);
			}

			if(isString(xml)){
				return new OjXml(toXml(xml));
			}

			return isObjective(xml) && xml.is('OjXml') ? xml : null;
		}
	}
);

OJ.extendClass(
	OjObject, 'OjCssTranslate',
	{
		'_props_' : {
			'x'     : 0,
			'unitX' : OJ.setting('dimUnit'),
			'unitY' : OJ.setting('dimUnit'),
			'y'     : 0
		},


		'_constructor' : function(/*x, y, unitX, unitY*/){
			var args = arguments,
				ln = args.length;

			this._super('OjCssTranslate', '_constructor', []);

			if(ln){
				this.setX(args[0]);

				if(ln > 1){
					this.setY(args[1]);

					if(ln > 2){
						this.setUnitX(args[2]);

						if(ln > 3){
							this.setUnitY(args[3]);
						}
					}
				}
			}
		},


		'clone' : function(){
			var obj = this._super('OjCssTranslate', 'clone', arguments);

			obj._x     = this._x;
			obj._unitX = this._unitX;
			obj._unitY = this._unitY;
			obj._y     = this._y;

			return obj;
		},

		'isEqualTo' : function(obj){
			return obj && obj._x == this._x && obj._unitX == this._unitX && obj._unitY == this._unitY && obj._y == this._y;
		},

		'toString' : function(){
			return !this._x && !this._y ? '' : String(this._x) + this._unitX + ', ' + String(this._y) + this._unitY;
		}
	}
);


OJ.extendClass(
	OjElement, 'OjStyleElement',
	{
		'_props_' : {
			'id'    : null,
			'name'  : null,
			'owner' : null
		},

		'_alpha' : 1,  '_depth' : 0,  '_scrollable' : false,

		'_origin' : '0px, 0px',  '_rotation' : 0,  '_translate' : '0px, 0px',

		'_h_align' : 'l', // OjStyleElement.LEFT
		'_v_align' : 't', // OjStyleElement.TOP

//		'_prev_x' : null,
//		'_prev_y' : null,


		'_compile_' : function(def){
			var cls = OjStyleElement;

			if(cls.STYLE_MODE == cls.STYLE_IE){
				this._getStyle = this._getStyleIe;
			}
			else if(cls.STYLE_MODE == cls.STYLE_BACKUP){
				this._getStyle = this._getStyleBackup;
			}

			// build functions for style getter and setters
			def._style_funcs_.call(this, 'margin', 'Margin');
			def._style_funcs_.call(this, 'padding', 'Padding');
		},

		'_style_funcs_' : function(style, u_style){
			var g = 'get',
				s = 'set',
				bottom = 'Bottom',
				left = 'Left',
				right = 'Right',
				top = 'Top';

			this[g + u_style] = function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
				return this._getStyler(style, arguments);
			};

			this[s + u_style] = function(val/* | top/bottom, right/left | top, right/left, bottom | top, right, bottom, left*/){
				this._setStyler(style, arguments);
			};

			this[g + u_style + bottom] = function(){
				return this[g + u_style](2);
			};

			this[s + u_style + bottom] = function(val){
				this[s + u_style](null, null, val, null);
			};

			this[g + u_style + left] = function(){
				return this[g + u_style](3);
			};

			this[s + u_style + left] = function(val){
				this[s + u_style](null, null, null, val);
			};

			this[g + u_style + right] = function(){
				return this[g + u_style](1);
			};

			this[s + u_style + right] = function(val){
				this[s + u_style](null, val, null, null);
			};

			this[g + u_style + top] = function(){
				return this[g + u_style](0);
			};

			this[s + u_style + top] = function(val){
				this[s + u_style](val, null, null, null);
			};
		},


		'_constructor' : function(/*source, context*/){
			// default the context and source
			var args = arguments,
				ln = args.length,
				source, context, tmp;

			if(ln && (source = args[0])){
				// set the context if any
				if(ln > 1){
					context = args[1];
				}

				// set the source
				// if dom element then we are done
				if(source && !source.nodeType){
					// if its the document or body do something special
					if(source === 'body' || source == document || source == document.body){
						source = document.body;
					}
					// if its a string then we need to make sure its html and handle it accordingly
					else if(isString(source)){
						source = source.trim();

						if(source.charAt(0) == '<' && source.slice(-1) == '>' && source.length >= 5){
							var tag = source.substr(0, 6).toLowerCase(),
								tag2 = tag.substr(0, 3);

							if(tag == '<thead' || tag == '<tbody' || tag == '<tfoot'){
								tmp = OjElement.elm('table');
							}
							else if(tag2 == '<tr'){
								tmp = OjElement.elm('tbody');
							}
							else if(tag2 == '<td' || tag2 == '<th'){
								tmp = OjElement.elm('tr')
							}
							else{
								tmp = OjElement.elm('div');
							}

							tmp.innerHTML = source;

							if(tmp.childNodes.length){
								tmp.removeChild(source = tmp.childNodes[0]);
							}
							else{
								source = null
							}
						}
						else{
							// todo: re-evaluate the use query, maybe just allow ids...
//							tmp = OJ.query(source);
						}
					}
				}
			}

			this._super('OjStyleElement', '_constructor', [source, context]);

			OjElement.register(this);

			this.setHAlign(this._h_align);
			this.setVAlign(this._v_align);
		},

		'_destructor' : function(/*depth = 0*/){
			// remove the timers
			this._unset('_move_timer', '_scroll_timer');

			// remove the children
			var args = arguments,
				depth = args.length ? args[0] : 0,
				ln = this.numChildren();

			// remove the children
			for(; ln--;){
				OJ.destroy(this.getChildAt(ln), depth);
			}

			// release the vars
			this._owner = null;

			// continue on with the destruction
			return this._super('OjStyleElement', '_destructor', arguments);
		},


		'_processAttribute' : function(dom, attr, context){
			var setter, solo, target, lower,
				nm = attr.nodeName,
				val = attr.value;

			if(nm.substr(0, 3) == 'on-'){
				// todo: add support for multiple event listeners
				// todo? add support for nested event listener functions in templates
				setter = val.split('.');
				solo = setter.length == 1;
				target = context;

				if(!solo){
					switch(setter[0]){
						case 'this':
							target = this;
						break;

						case 'window':
							target = window;
						break;
					}
				}

				this.addEventListener(OJ.attributeToFunc(nm), target, solo ? setter[0] : setter[1]);

				return true;
			}
			else if(nm == 'id'){
				this.setId(val);
			}
			else if(nm == 'var'){
				if(!isEmpty(val) && context){
					(context[val] = this).addCss(val);

					this.setOwner(context);
				}

				return true;
			}
			else if(nm != 'class'){
				setter = OjStyleElement.attributeToSetter(nm);

				if(isFunction(this[setter])){
					if(val == ''){
						val = null;
					}
					else if(isNumeric(val)){
						val = parseFloat(val);
					}
					else if((lower = val.toLowerCase()) == 'true'){
						val = true;
					}
					else if(lower == 'false'){
						val = false;
					}

					this[setter](val);

					// if the nm is v-align or h-align we want to return false so that the attribute isn't destroyed
					return nm.indexOf('-align') == -1;
				}
			}

			return false;
		},

		'_processAttributes' : function(dom, context){
			var attrs = dom.attributes,
				ln, attr;

			// variable reference
			if((attr = dom.attributes['var']) && this._processAttribute(dom, attr, context)){
				dom.removeAttribute('var');
			}

			// class name
			dom.removeAttribute('class-name');

			// class path
			dom.removeAttribute('class-path');

			// process the other attributes
			for(ln = attrs.length; ln--;){
				attr = attrs[ln];

				if(this._processAttribute(dom, attr, context)){
					dom.removeAttribute(attr.nodeName);
				}
			}
		},

		'_processChildren' : function(dom, context){
			// make sure we have something to process
			if(!dom){
				return;
			}

			var children = dom.childNodes,
				ln = children.length;

			for(; ln--;){
				if(!this._processChild(children[ln], context) && children[ln]){
					dom.removeChild(children[ln]);
				}
			}
		},

		'_processChild' : function(dom, context){
			// make sure we have something to process
			if(!dom){
				return;
			}

			var tag = dom.tagName;

			if(!tag || OjElement.isTextNode(dom)){
				return isEmpty(dom.nodeValue) ? null : new OjTextElement(dom);
			}

			var child, cls_path,
				cls = dom.getAttribute('class-name');

			tag = tag.toLowerCase();

			// if this is a script or link tag ignore it
			if(tag == 'script' || tag == 'link'){
				return false;
			}

			// load the class if we need to
			if(!window[cls] && (cls_path = dom.getAttribute('class-path'))){
							}

			// get the component tag class
			if(OjStyleElement.isComponentTag(tag)){
				cls = OjStyleElement.getTagComponent(tag);
			}

			// process the class
			if(cls){
				if(isFunction(cls)){
					child = cls(dom);
				}
				else{
					child = new window[cls]();
				}

				child._setDomSource(dom, context);
			}
			else{
				child = new OjStyleElement(dom, context);
			}

			return child;
		},

		'_setDom' : function(dom, context){
			// todo: re-evaluate the pre-render functionality of dom
			this._super('OjStyleElement', '_setDom', [dom]);

			// process the attributes
			this._processAttributes(dom, context);

			// process the children
			this._processChildren(dom, context);

			// setup the dom id if there isn't one already
			if(!this._id){
				this.setId(this._id_);
			}
		},

		'_setIsDisplayed' : function(displayed){
			var ln, child;

			if(this._is_displayed == displayed){
				return;
			}

			this._super('OjStyleElement', '_setIsDisplayed', arguments);

			for(ln = this.numChildren(); ln--;){
				if(child = this.getChildAt(ln)){
					child._setIsDisplayed(this._is_displayed);
				}
			}
		},

		// Event Listeners
		'_processEvent' : function(evt){
			// because js natively calls the event functions on the context of the dom element
			// we just get the attached oj element from it to get into the proper context to dispatch
			// the event
			if(OjElement.element(evt.currentTarget) != this || evt.dispatched){
				return false;
			}

			evt.dispatched = true;

			return true;
		},

		'_onOjDomEvent' : function(evt){
			var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjDomEvent.convertDomEvent(evt));
			}
		},

		'_onDomOjMouseEvent' : function(evt){
			var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjMouseEvent.convertDomEvent(evt));
			}
		},

		'_onDomOjKeyboardEvent' : function(evt){
			var proxy = OjElement.byId(this.ojProxy);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjKeyboardEvent.convertDomEvent(evt));
			}
		},

		'_onDomOjFocusEvent' : function(evt){
			var proxy = OjElement.byId(this.ojProxy);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjFocusEvent.convertDomEvent(evt));
			}
		},

		'_onDomScrollEvent' : function(evt){
			var proxy = OjElement.byId(this.ojProxy);

			if(proxy && proxy._processEvent(evt)){
				proxy._onScroll(OjScrollEvent.convertDomEvent(evt));
			}
		},

		'_onDomTouchEvent' : function(evt){
			var proxy = OjElement.byId(this.ojProxy);

			if(proxy && proxy._processEvent(evt)){
				return proxy._onTouch(OjTouchEvent.convertDomEvent(evt));
			}

			return true;
		},

		'_onDrag' : function(evt){
			this.dispatchEvent(
				new OjDragEvent(
					OjDragEvent.DRAG,
					evt.getPageX() - this._dragX,
					evt.getPageY() - this._dragY,
					evt, false, false
				)
			);
		},

		'_onDragEnd' : function(evt){
			OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onDrag');
			OJ.removeEventListener(OjMouseEvent.UP, this, '_onDragEnd');

			this.dispatchEvent(
				new OjDragEvent(
					OjDragEvent.END,
					evt.getPageX() - this._dragX,
					evt.getPageY() - this._dragY,
					evt, false, false
				)
			);
		},

		'_onDragStart' : function(evt){
			this._dragX = evt.getPageX();
			this._dragY = evt.getPageY();

			if(this.hasEventListener(OjDragEvent.DRAG)){
				OJ.addEventListener(OjMouseEvent.MOVE, this, '_onDrag');
			}

			OJ.addEventListener(OjMouseEvent.UP, this, '_onDragEnd');

			this.dispatchEvent(
				new OjDragEvent(OjDragEvent.START, 0, 0, evt, false, false)
			);
		},

		'_onEvent' : function(evt){
			this.dispatchEvent(evt);

			return false;
		},

//		'_onMouse' : function(evt){
//			var type = evt.getType(),
//				x = evt.getPageX(),
//				y = evt.getPageY(),
//				response = this._onEvent(evt);
//
//
////			if(type == OjMouseEvent.UP && (!this._draggable || (this._dragX == x && this._dragY == y))){
////				trace(this._draggable, this._dragX == x, this._dragY == y);
////				this._onEvent(new OjMouseEvent(OjMouseEvent.CLICK, evt.getBubbles(), evt.getCancelable(), x, y));
////			}
//
//			return response;
//		},

		'_onMoveTick' : function(evt){
			var page_x = this.getPageX(),
				page_y = this.getPageY(),
				delta_x = this._page_x - page_x,
				delta_y = this._page_y - page_y;

			if(delta_x || delta_y){
				this.dispatchEvent(new OjTransformEvent(OjTransformEvent.MOVE, page_x, page_y, delta_x, delta_y));
			}

			this._page_x = page_x;
			this._page_y = page_y;
		},

		'_onScroll' : function(evt){
			var x, y;

			// for native scroll events
			if(evt.is('OjScrollEvent')){
				if(this._prev_x == (x = evt.getScrollX()) && this._prev_y == (y = evt.getScrollY())){
					return;
				}

				this._prev_x = x;
				this._prev_y = y;

				return this._onEvent(evt);
			}

			// for touch scroll events
			if(this._prev_x == (x = this.getScrollX()) && this._prev_y == (y = this.getScrollY())){
				return;
			}

			return this._onEvent(
				new OjScrollEvent(OjScrollEvent.SCROLL, this._prev_x = x, this._prev_y = y)
			);
		},

		'_onTouch' : function(evt){
			var type = evt.getType(),
				x = evt.getPageX(),
				y = evt.getPageY();

			if(type == OjTouchEvent.END){
				type = OjMouseEvent.UP;
			}
			else if(type == OjTouchEvent.START){
				type = OjMouseEvent.DOWN;

				this._dragX = x;
				this._dragY = y;
			}
			else if(type == OjTouchEvent.MOVE){
				type = OjMouseEvent.MOVE;
			}

			if(type){
				this._onEvent(new OjMouseEvent(type, true, true, x, y));

				// if the touch hasn't moved then issue a click event
				if(type == OjMouseEvent.UP && x == this._dragX && y == this._dragY){
					this._onEvent(new OjMouseEvent(OjMouseEvent.CLICK, true, true, x, y));
				}
			}

			return true;
		},


		// event listener overrides
		// customize this functionality for dom events so that they work
		'_updateTouchStartListeners' : function(){
			if(!this.hasEventListeners(OjMouseEvent.DOWN, OjMouseEvent.CLICK, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){
				this._proxy.ontouchstart = null;
			}
		},

		'_updateTouchMoveListeners' : function(){
			if(!this.hasEventListeners(OjMouseEvent.MOVE, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){//}, OjScrollEvent.SCROLL)){
				this._proxy.ontouchmove = null;
			}
		},

		'_updateTouchEndListeners' : function(){
			if(!this.hasEventListeners(OjMouseEvent.UP, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){
				this._proxy.ontouchend = null;
			}
		},

		'addEventListener' : function(type){
			var is_touch = OJ.isTouchCapable(),
				proxy = this._proxy;

			this._super('OjStyleElement', 'addEventListener', arguments);

			if(type == OjScrollEvent.SCROLL){
				this._scrollable = true;

				proxy.onscroll = this._onDomScrollEvent;

//				if(is_touch){
//					proxy.ontouchmove = this._onDomTouchEvent;
//				}
			}

			// mouse events
			else if(type == OjMouseEvent.CLICK){
				if(is_touch){
					proxy.ontouchstart = proxy.ontouchend = this._onDomTouchEvent;
				}
				else{
					proxy.onclick = this._onDomOjMouseEvent;
				}
			}
			else if(type == OjMouseEvent.DOUBLE_CLICK){
				proxy.ondblclick = this._onDomOjMouseEvent;
			}
			else if(type == OjMouseEvent.DOWN){
				if(is_touch){
					proxy.ontouchstart = this._onDomTouchEvent;
				}
				else{
					proxy.onmousedown = this._onDomOjMouseEvent;
				}
			}
			else if(type == OjMouseEvent.MOVE){
				if(is_touch){
					proxy.ontouchmove = this._onDomTouchEvent;
				}
				else{
					proxy.onmousemove = this._onDomOjMouseEvent;
				}
			}
			else if(type == OjMouseEvent.OUT){
				proxy.onmouseout = this._onDomOjMouseEvent;
			}
			else if(type == OjMouseEvent.OVER){
				proxy.onmouseover = this._onDomOjMouseEvent;
			}
			else if(type == OjMouseEvent.UP){
				if(is_touch){
					proxy.ontouchend = this._onDomTouchEvent;
				}
				else{
					proxy.onmouseup = this._onDomOjMouseEvent;
				}
			}

			// drag events
			else if(OjDragEvent.isDragEvent(type)){
				this._draggable = true;
//
//				if(is_touch){
//					proxy.ontouchstart = proxy.ontouchmove = proxy.ontouchend = this._onDomTouchEvent;
//				}
//				else{
//					proxy.onmousedown = this._onDomOjMouseEvent;
//				}

				this.addEventListener(OjMouseEvent.DOWN, this, '_onDragStart');
			}

			// keyboard events
			else if(type == OjKeyboardEvent.DOWN){
				proxy.onkeydown = this._onDomOjKeyboardEvent;
			}
			else if(type == OjKeyboardEvent.PRESS){
				proxy.onkeypress = this._onDomOjKeyboardEvent;
			}
			else if(type == OjKeyboardEvent.UP){
				proxy.onkeyup = this._onDomOjKeyboardEvent;
			}

			// focus events
			else if(type == OjFocusEvent.IN){
				proxy.onfocus = this._onDomOjFocusEvent;
			}
			else if(type == OjFocusEvent.OUT){
				proxy.onblur = this._onDomOjFocusEvent;
			}

			// transform events
			else if(type == OjTransformEvent.MOVE){
				if(!this._move_timer){
					this._move_timer = new OjTimer(250, 0);
					this._move_timer.addEventListener(OjTimer.TICK, this, '_onMoveTick');

					this._page_x = this.getPageX();
					this._page_y = this.getPageY();

					this._move_timer.start();
				}
			}
			else if(type == OjTransformEvent.RESIZE && this._proxy != document.body){
				proxy.onresize = this._onOjDomEvent;
			}

			// misc dom events
			else if(type == OjDomEvent.CHANGE){
				proxy.onchange = this._onOjDomEvent;
			}
		},

		'removeEventListener' : function(type, context, callback){
			var proxy = this._proxy;

			this._super('OjStyleElement', 'removeEventListener', arguments);

			// scroll events
			if(type == OjScrollEvent.SCROLL){
				if(!this.hasEventListener(OjScrollEvent.SCROLL)){
					this._scrollable = false;

					proxy.onscroll = null;

//					this._updateTouchMoveListeners();
				}
			}

			// mouse events
			else if(type == OjMouseEvent.CLICK){
				if(!this.hasEventListener(OjMouseEvent.CLICK)){
					proxy.onclick = null;

					this._updateTouchStartListeners();
					this._updateTouchEndListeners();
				}
			}
			else if(type == OjMouseEvent.DOUBLE_CLICK){
				if(!this.hasEventListener(OjMouseEvent.DOUBLE_CLICK)){
					proxy.ondblclick = null;

					this._updateTouchStartListeners();
					this._updateTouchEndListeners();
				}
			}
			else if(type == OjMouseEvent.DOWN){
				if(!this.hasEventListeners(OjMouseEvent.DOWN, OjDragEvent.DRAG)){
					proxy.onmousedown = null;

					this._updateTouchStartListeners();
				}
			}
			else if(type == OjMouseEvent.MOVE){
				if(!this.hasEventListener(OjMouseEvent.MOVE)){
					proxy.onmousemove = null;

					this._updateTouchMoveListeners();
				}
			}
			else if(type == OjMouseEvent.OUT){
				if(!this.hasEventListener(OjMouseEvent.OUT)){
					proxy.onmouseout = null;
				}
			}
			else if(type == OjMouseEvent.OVER){
				if(!this.hasEventListener(OjMouseEvent.OVER)){
					proxy.onmouseover = null;
				}
			}
			else if(type == OjMouseEvent.UP){
				if(!this.hasEventListener(OjMouseEvent.UP)){
					proxy.onmouseup = null;

					this._updateTouchEndListeners();
				}
			}

			// drag events
			else if(OjDragEvent.isDragEvent(type)){
				if(!this.hasEventListeners(OjDragEvent.DRAG, OjDragEvent.END, OjDragEvent.START)){
					this._draggable = false;

					this.removeEventListener(OjMouseEvent.DOWN, this, '_onDragStart');

					OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onDrag');
					OJ.removeEventListener(OjMouseEvent.UP, this, '_onDragEnd');
				}
			}

			// keyboard events
			else if(type == OjKeyboardEvent.DOWN){
				if(!this.hasEventListener(OjKeyboardEvent.DOWN)){
					proxy.onkeydown = null;
				}
			}
			else if(type == OjKeyboardEvent.PRESS){
				if(!this.hasEventListener(OjKeyboardEvent.PRESS)){
					proxy.onkeypress = null;
				}
			}
			else if(type == OjKeyboardEvent.UP){
				if(!this.hasEventListener(OjKeyboardEvent.UP)){
					proxy.onkeyup = null;
				}
			}

			// focus events
			else if(type == OjFocusEvent.IN){
				if(!this.hasEventListener(OjFocusEvent.IN)){
					proxy.onfocus = null;
				}
			}
			else if(type == OjFocusEvent.OUT){
				if(!this.hasEventListener(OjFocusEvent.OUT)){
					proxy.onblur = null;
				}
			}

			// transform event
			else if(type == OjTransformEvent.MOVE){
				if(!this.hasEventListener(OjTransformEvent.MOVE)){
					this._unset('_move_timer');
				}
			}
			else if(type == OjTransformEvent.RESIZE){
				if(!this.hasEventListener(OjTransformEvent.RESIZE)){
					proxy.onresize = null;
				}
			}

			// misc dom events
			else if(type == OjDomEvent.CHANGE){
				if(!this.hasEventListener(OjDomEvent.CHANGE)){
					proxy.onchange = null;
				}
			}
		},


		// Child Management Functions
		'addChild' : function(child){
			return this.addChildAt(child, this.numChildren());
		},

		'addChildAt' : function(child, index){
			var dom = this._dom;

			if(!child || this.hasChild(child)){
				return child;
			}

			if(index >= this.numChildren()){
				dom.appendChild(child._dom);
			}
			else{
				dom.insertBefore(child._dom, dom.childNodes[index]);
			}

			// update the display state
			child._setIsDisplayed(this._is_displayed);

			return child;
		},

		'getChildAt' : function(index){
			return OjElement.element(this._dom.childNodes[index]);
		},

		'getChildren' : function(){
			var ary = [],
				ln = this.numChildren();

			for(; ln--;){
				ary.unshift(this.getChildAt(ln));
			}

			return ary;
		},
		'setChildren' : function(children){
			this.removeAllChildren();

			var i = 0,
				ln = children.length;

			for(; i < ln; i++){
				this.addChild(children[i]);
			}
		},

		'indexOfChild' : function(child){
			return Array.array(this._dom.childNodes).indexOf(child._dom);
		},

		'hasChild' : function(child){
			return child.parent() == this;
		},

		'numChildren' : function(){
			return this._dom.childNodes.length;
		},

		'moveChild' : function(child, index){
			if(this.hasChild(child)){
				this._dom.insertBefore(child._dom, this.getChildAt(index)._dom);

				return child;
			}

			// throw an error here
		},

		'removeAllChildren' : function(){
			var ln = this.numChildren(),
				ary = [];

			for(; ln--;){
				ary.unshift(this.removeChildAt(ln));
			}

			return ary;
		},

		'removeChild' : function(child){
			if(child){
				this._dom.removeChild(child._dom);

				child._setIsDisplayed(false);
			}

			return child;
		},

		'removeChildAt' : function(index){
			if(index < 0 || index >= this.numChildren()){
				return null;
			}

			return this.removeChild(this.getChildAt(index));
		},

		'removeChildren' : function(children){
			var ln = children.length;

			for(; ln--;){
				this.removeChild(children[ln]);
			}
		},

		'replaceChild' : function(target, replacement){
			return this.replaceChildAt(replacement, this.indexOfChild(target));
		},

		'replaceChildAt' : function(child, index){
			var rtrn;

			if(index >= this.numChildren()){
				this.addChild(child);
			}
			else{
				rtrn = this.removeChildAt(index);

				this.addChildAt(child, index);
			}

			return rtrn;
		},


		// misc functions
		'blur' : function(){
			if(isFunction(this._dom.blur)){
				this._dom.blur();
			}
		},

		'find' : function(query){
			if(isElement(query)){
				query = '#' + query.id();
			}

			return OJ.query(query, this._dom);
		},

		'focus' : function(){
			if(isFunction(this._dom.focus)){
				this._dom.focus();
			}
		},

		'hide' : function(){
			this.addCss(['hidden']);

			this.dispatchEvent(new OjEvent(OjEvent.HIDE));
		},

		'isVisible' : function(){
			return this._getStyle('display') != OjStyleElement.NONE &&
				this._getStyle('visibility') != 'hidden' &&
				this._alpha > 0 &&
				this.getWidth() > 0 && this.getHeight() > 0;
		},

		'show' : function(){
			this.removeCss(['hidden']);

			this.dispatchEvent(new OjEvent(OjEvent.SHOW));
		},


		// single style getter & setter functions
		'_getStyleBackup' : function(style){
			return this._proxy.style[style];
		},

		'_getStyleIe' : function(style){
			return this._proxy.currentStyle[style];
		},

		'_getStyle' : function(style){
			return document.defaultView.getComputedStyle(this._proxy, null)[style];
		},
		'_setStyle' : function(style, value){
			return this._proxy.style[style] = value;
		},


		'_getStyleNumber' : function(prop){
			var val = this._getStyle(prop);

			if(!val || val == OjStyleElement.NONE){
				return 0;
			}

			return parseFloat(val.replaceAll(['px', '%', 'pt', 'em'], ''));
		},

		'_setStyleNumber' : function(prop, val/*, unit*/){
			var args = arguments;

			this._setStyle(prop, val + (args.length > 2 ? args[2] : this._getStyleUnit(prop)));
		},

		// Bulk Style Getter & Setter Functions
		'_getStyler' : function(prop, args){
			var unit = prop == 'font' || prop  =='line' ? OJ.setting('fontUnit') : OJ.setting('dimUnit');

			if(!this['_' + prop]){
				this['_' + prop] = [
					this._getStyle(prop + 'Top').replaceAll(unit, ''),
					this._getStyle(prop + 'Right').replaceAll(unit, ''),
					this._getStyle(prop + 'Bottom').replaceAll(unit, ''),
					this._getStyle(prop + 'Left').replaceAll(unit, '')
				];
			}

			return args && args.length ? this['_' + prop][args[0]] : this['_' + prop];
		},

		'_setStyler' : function(prop, vals){
			var str = '',
				ln = vals.length,
				val = vals[0],
				unit = this._getStyleUnit(prop);

			this._getStyler(prop);

			// fill out the vals array so that there is always the 4 values
			if(ln == 1){
				vals = [val, val, val, val];
			}
			else if(ln == 2){
				vals = [val, vals[1], val, vals[1]];
			}
			else if(ln == 3){
				vals = [val, vals[1], vals[2], vals[1]];
			}

			// substitute current values for null values
			for(ln = 4; ln--;){
				val = vals[ln];

				if(isNull(val)){
					val = this['_' + prop][ln];
				}

				str = (ln ? ' ' : '') + val + unit + str;
			}

			this._setStyle(prop, str);
		},

		'_getStyleUnit' : function(prop){
			prop = prop.substr(0, 4);

			if(prop == 'font' || prop == 'line'){
				return OJ.setting('fontUnit');
			}

			return OJ.setting('dimUnit');
		},


		// Attribute Getter & Setter Functions
		'getAttr' : function(key){
			return this._proxy.getAttribute(key);
		},
		'setAttr' : function(key/*||attribute, value*/){
			if(arguments.length == 1){
				if(isEmpty(key.value)){
					this._proxy.removeAttribute(key.nodeName);
				}
				else{
					this._proxy.setAttribute(key.nodeName, key.value);
				}
			}
			else{
				if(isSet(arguments[1])){
					this._proxy.setAttribute(key, arguments[1]);
				}
				else{
					this._proxy.removeAttribute(key);
				}
			}
		},

		'setId' : function(val){
			if(this._id == val){
				return
			}

			this._dom.id = this._id = val;
		},

		'setName' : function(val){
			if(this._name == val){
				return;
			}

			this.setAttr('name', this._name = val);
		},

		// Content Getter & Setter Functions
		'getText' : function(){
			return this._dom.innerHTML;
		},
		'setText' : function(str){
			this.removeAllChildren();

			this._dom.innerHTML = str ? str.toString() : null;

			// we may want to process this html, just a thought
		},

		// Css Functions
		'_makeCssList' : function(args){
			if(isArray(args[0])){
				return args[0];
			}

			var ln = args.length,
				list = [];

			for(; ln--;){
				list = list.concat(args[ln].trim().split(' '));
			}

			return list;
		},

		'_processCssList' : function(args, action){
			var css = this.getCssList(),
				list = this._makeCssList(args),
				ln = list.length,
				cls, index;

			for(; ln--;){
				index = css.indexOf(cls = list[ln]);

				if(index == -1){
					switch(action){
						case 'has':
							return false;

						case 'add':
						case 'toggle':
							css.push(cls);
					}
				}
				else{
					switch(action){
						case 'remove':
						case 'toggle':
							css.splice(index, 1);
					}
				}
			}

			if(action == 'has'){
				return true;
			}

			return this.setCss(css);
		},

		'addCss' : function(css/*...css | array*/){
			return this._processCssList(arguments, 'add');
		},

		'getCss' : function(){
			return this._proxy.className.trim();
		},

		'getCssList' : function(){
			return this.getCss().split(' ');
		},

		'hasCss' : function(css/*...css | array*/){
			return this._processCssList(arguments, 'has');
		},

		'removeCss' : function(css/*... css | array*/){
			return this._processCssList(arguments, 'remove');
		},

		'setCss' : function(css){
			return this._proxy.className = (isArray(css) ? css.join(' ') : css).trim();
		},

		'toggleCss' : function(css/*...css | array*/){
			return this._processCssList(arguments, 'toggle');
		},

		// Focus Functions
		'hasFocus' : function(){
			return this._dom.hasFocus;
		},

		'hitTest' : function(elm){
			return this.hitTestRect(elm.getRect());
		},

		'hitTestRect' : function(rect){
			return this.getRect().hitTestRect(rect);
		},

		'hitTestPoint' : function(x, y){
			return this.getRect().hitTestPoint(x, y);
		},

		'localPoint' : function(global_point){
			// todo: add localPoint functionality
		},

		'localX' : function(global_x){
			return global_x - this.getPageX();
		},

		'localY' : function(global_y){
			return global_y - this.getPageY();
		},




		// Dimensional Getter & Setter Functions
		// TODO:
		// 1) factor in border into sizing
		// 2) handle non-metric values such as auto and %
		'getInnerWidth' : function(){
			return this.getWidth() - this.getPaddingLeft() - this.getPaddingRight();
		},
		'setInnerWidth' : function(w){
			this._setWidth(Math.round(w) + OJ.setting('dimUnit'));
		},

		'getOuterWidth' : function(){
			return this.getWidth() + this.getMarginLeft() + Math.abs(this.getMarginRight());
		},
		'setOuterWidth' : function(w){
			this.setInnerWidth(w - this.getPaddingLeft() - this.getPaddingRight() - this.getMarginLeft() - Math.abs(this.getMarginRight()));
		},

		'getWidth' : function(){
			return this._proxy.offsetWidth || this._getStyleNumber('width');
		},
		'_setWidth' : function(val){
			this._setStyle('width', val);
		},
		'setWidth' : function(w/*, unit*/){
			var args = arguments;

			if(w == OjStyleElement.AUTO){
				this._setWidth(null);
			}
			else if(args.length > 1){
				this._setWidth(w + (isString(args[1]) ? args[1] : '%'));
			}
			else{
				this.setInnerWidth(w - this.getPaddingLeft() - this.getPaddingRight());
			}
		},

		'getMinWidth' : function(){
			return isNull(this._min_width) ? this._min_width = this._getStyleNumber('minWidth') : this._min_width;
		},
		'setMinWidth' : function(min){
			this._setStyleNumber('minWidth', this._min_width = min);
		},

		'getMaxWidth' : function(){
			return isNull(this._max_width) ? this._max_width = this._getStyleNumber('maxWidth') : this._max_width;
		},
		'setMaxWidth' : function(max){
			this._setStyleNumber('maxWidth', this._max_width = max);
		},

		'getInnerHeight' : function(){
			return this.getHeight() - this.getPaddingTop() - this.getPaddingBottom();
		},
		'setInnerHeight' : function(h){
			this._setHeight(Math.round(h) + OJ.setting('dimUnit'));
		},

		'getOuterHeight' : function(){
			return this.getHeight() + this.getMarginTop() + Math.abs(this.getMarginBottom());
		},
		'setOuterHeight' : function(h){
			this.setInnerHeight(h - this.getPaddingTop() - this.getPaddingBottom() - this.getMarginTop() - Math.abs(this.getMarginBottom()));
		},

		'getHeight' : function(){
			return this._proxy.offsetHeight || this._getStyleNumber('height');
		},
		'_setHeight' : function(val){
			this._setStyle('height', val);
		},
		'setHeight' : function(h/*, unit*/){
			var args = arguments;

			if(h == OjStyleElement.AUTO){
				this._setHeight(null);
			}
			else if(args.length > 1){
				this._setHeight(h + (isString(args[1]) ? args[1] : '%'));
			}
			else{
				this.setInnerHeight(h - this.getPaddingTop() - this.getPaddingBottom());
			}
		},

		'getMinHeight' : function(){
			return isNull(this._min_height) ? this._min_height = this._getStyleNumber('minHeight') : this._min_height;
		},
		'setMinHeight' : function(min){
			this._min_height = min;

			this._setStyleNumber('minHeight', min);
		},

		'getMaxHeight' : function(){
			return isNull(this._max_height) ? this._max_height = this._getStyleNumber('maxHeight') : this._max_height;
		},
		'setMaxHeight' : function(max){
			this._max_height = max;

			this._setStyleNumber('maxHeight', max);
		},

		'setPercentWidth' : function(w){
			this._setWidth(w + '%');
		},
		'setPercentHeight' : function(h){
			this._setHeight(h + '%');
		},


		// border size functions
//		'getBorderSize' : function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
//			return this._getStyler('border-size', arguments);
//		},
//		'setBorderSize' : function(size/* | top/bottom, right/left | top, right/left, bottom | top, right, bottom, left*/){
//			this._setStyler('border-size', arguments);
//		},
//
//		'getBorderSizeBottom' : function(){
//			return this.getMargin(2);
//		},
//		'setBorderSizeBottom' : function(margin){
//			this.setMargin(null, null, margin, null);
//		},
//
//		'getBorderSizeLeft' : function(){
//			return this.getMargin(3);
//		},
//		'setBorderSizeLeft' : function(margin){
//			this.setMargin(null, null, null, margin);
//		},
//
//		'getBorderSizeRight' : function(){
//			return this.getMargin(1);
//		},
//		'setBorderSizeRight' : function(margin){
//			this.setMargin(null, margin, null, null);
//		},
//
//		'getBorderSizeTop' : function(){
//			return this.getMargin(0);
//		},
//		'setBorderSizeTop' : function(margin){
//			this.setMargin(margin, null, null, null);
//		},


		// Style Getter & Setter Functions
		'getX' : function(){
			return this._proxy.offsetLeft;
		},
		'getPageX' : function(){
			if(this._dom.getBoundingClientRect){
				return this._dom.getBoundingClientRect().left;
			}

			// add backup solution
		},
		'setX' : function(val/*, unit=px*/){
			var args = arguments;

			this._setStyleNumber('left', val, args.length > 1 ? args[1] : OJ.setting('dimUnit'));
		},

		'getY' : function(){
			return this._proxy.offsetTop;
		},
		'getPageY' : function(){
			if(this._dom.getBoundingClientRect){
				return this._dom.getBoundingClientRect().top;
			}

			// add backup solution
		},
		'setY' : function(val/*, unit=px*/){
			var args = arguments;

			this._setStyleNumber('top', val, args.length > 1 ? args[1] : OJ.setting('dimUnit'));
		},

		'getAlpha' : function(){
			return this._alpha;
		},
		'setAlpha' : function(alpha){
			var old_alpha = this._alpha;

			if(old_alpha == alpha){
				return;
			}

			if((alpha = this._alpha = this._setStyle('opacity', alpha)) && old_alpha === 0){
//				this.dispatchEvent(new OjEvent(OjEvent.SHOW));
			}
			else if(!alpha){
//				this.dispatchEvent(new OjEvent(OjEvent.HIDE));
			}
		},

		'getBackgroundColor' : function(){
			return this._getStyle('background-color');
		},
		'setBackgroundColor' : function(color){
			this._setStyle('background-color', color);
		},

		'getDepth' : function(){
			return this._depth;
		},
		'setDepth' : function(depth){
			this._depth = this._setStyle('zIndex', depth);
		},

		'getOverflow' : function(){
			return this._overflow;
		},
		'setOverflow' : function(overflow){
			this._overflow = this._setStyle('overflow', overflow);
		},

		'getRect' : function(){
			return new OjRect(this.getPageX(), this.getPageY(), this.getWidth(), this.getHeight());
		},
		'setRect' : function(rect){
			// add this later
		},

		'getScrollHeight' : function(){
			return this._proxy.scrollHeight;
		},
		'setScrollHeight' : function(val){
			this._proxy.scrollHeight = val;
		},

		'getScrollWidth' : function(){
			return this._proxy.scrollWidth;
		},
		'setScrollWidth' : function(val){
			this._proxy.scrollWidth = val;
		},

		'getScrollX' : function(){
			return this._proxy.scrollLeft;
		},

		'setScrollX' : function(val){
			this._proxy.scrollLeft = val;
		},

		'getScrollY' : function(){
			return this._proxy.scrollTop;
		},

		'setScrollY' : function(val){
			this._proxy.scrollTop = val;
		},


		// alignment getter & setters
		'_getAlign' : function(type, dflt){
			var align = this.getAttr(type + '-align');

			return align ? align : dflt;
		},

		'_setAlign' : function(type, val, dflt){
			if(val == dflt){
				val = null;
			}

			this.setAttr(type + '-align', this['_' + type + '_align'] = val);
		},

		'getHAlign' : function(){
			return this._getAlign('h', OjStyleElement.LEFT);
		},
		'setHAlign' : function(val){
			return this._setAlign('h', val, OjStyleElement.LEFT);
		},

		'getVAlign' : function(){
			return this._getAlign('v', OjStyleElement.TOP);
		},
		'setVAlign' : function(val){
			return this._setAlign('v', val, OjStyleElement.TOP);
		},


		// Transform Setter & Getters
		'_updateTransform' : function(){
			var rotate = this._rotation ? 'rotate(' + this._rotation + 'deg) ' : '',
				translate = this._translate ? this._translate.toString() : '',
				transform = rotate + (isEmpty(translate) ? '' : 'translate(' + translate + ')'),
				prefix = OJ.getCssPrefix();

			if(prefix == '-moz-'){
				this._setStyle('MozTransform', transform);
			}
			else{
				this._setStyle(prefix + 'transform', transform);
			}

			this._setStyle('transform', transform);
		},

		'getOrigin' : function(){
			return this._origin;
		},
		'setOrigin' : function(val){
			this._setStyle(OJ.getCssPrefix() + 'transform-origin', val);

			this._setStyle('transform-origin', this._origin = val);
		},

		'getRotation' : function(){
			return this._rotation;
		},
		'setRotation' : function(val){
			if(this._rotation == val){
				return ;
			}

			this._rotation = val;

			this._updateTransform();
		},

		'getTranslate' : function(){
			return this._translate;
		},
		'setTranslate' : function(val){
			if(val.isEqualTo(this._translate)){
				return ;
			}

			this._translate = val;

			this._updateTransform();
		}
	},
	{
		'COMPONENT_TAGS' : {},

		'STYLE_BACKUP'  : 'styleBackup',
		'STYLE_DEFAULT' : 'styleDefault',
		'STYLE_IE'      : 'styleIE',

		'STYLE_MODE' : (function(){
			var elm = OjElement.elm('div');

			if(elm.currentStyle){
				return 'styleIE';
			}

			if(!document.defaultView || !document.defaultView.getComputedStyle){
				return 'styleBackup';
			}

			return 'styleDefault';
		})(),

		'AUTO'    : 'auto',
		'BLOCK'   : 'block',
		'HIDDEN'  : 'hidden',
		'NONE'    : 'none',
		'SCROLL'  : 'scroll',
		'VISIBLE' : 'visible',

		'LEFT'   : 'l',
		'CENTER' : 'c',
		'RIGHT'  : 'r',

		'TOP'    : 't',
		'MIDDLE' : 'm',
		'BOTTOM' : 'b',


		'attributeToGetter' : function(attr){
			return 'get' + OJ.attributeToFunc(attr).ucFirst();
		},

		'attributeToSetter' : function(attr){
			return 'set' + OJ.attributeToFunc(attr).ucFirst();
		},

		'getTagComponent' : function(tag){
			return this.COMPONENT_TAGS[tag];
		},

		'isComponentTag' : function(tag){
			return isSet(this.COMPONENT_TAGS[tag]);
		},

		'registerComponentTag' : function(tag, component){
			this.COMPONENT_TAGS[tag] = component;

			if(OJ.getBrowser() == OJ.IE && OJ.getBrowserVersion().compareVersion('9.0.0') < 0){
				document.createElement(tag);
			}
		},

		'getStyle' : function(dom, style){
			if(this.STYLE_MODE == this.STYLE_IE){
				return dom.currentStyle[style];
			}

			if(this.STYLE_MODE == this.STYLE_BACKUP){
				return dom.style[style];
			}

			return document.defaultView.getComputedStyle(dom, null)[style];
		}
	}
);

OJ.extendClass(
	OjElement, 'OjTextElement',
	{
		'_constructor' : function(/*text*/){
			var args = arguments,
				ln = args.length,
				is_dom = ln && isDomElement(args[0]);

			this._super('OjTextElement', '_constructor', is_dom ? [args[0]] : []);

			if(ln && !is_dom){
				this.setText(args[0]);
			}
		},

		'_setDom' : function(dom_elm, context){
			// force text dom elm
			if(dom_elm.nodeName != "#text"){
				dom_elm = document.createTextNode(dom_elm.innerText);
			}

			this._super('OjTextElement', '_setDom', [dom_elm]);
		},


		'appendText' : function(str){
			this._dom.nodeValue += str.toString();
		},
		'prependText' : function(str){
			this._dom.nodeValue = str.toString() + this._dom.nodeValue;
		},


		'getText' : function(){
			return this._dom.nodeValue;
		},
		'setText' : function(str){
			this._dom.nodeValue = str ? str.toString() : null;
		}
	}
);


OJ.extendClass(
	OjEvent, 'OjDomEvent',
	{},
	{
		'normalizeDomEvent' : function(evt){
			if(!evt){
				evt = window.event;
			}

			// todo: figure out a better way to handle FF not liking us changing event properties
			evt = OJ.merge({}, evt); // because FF sucks

			if(evt.clientX || evt.clientY){
				evt.pageX = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				evt.pageY = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}

			if(evt.which){
				evt.rightClick = evt.which == 3;
			}
			else if(evt.button){
				evt.rightClick = evt.button == 2;
			}

			return evt;
		},

		'convertDomEvent' : function(evt){
			evt = OjDomEvent.normalizeDomEvent(evt);

			return new OjDomEvent(evt.type, true, true);
		},

		// mouse events
		'CLICK'        : 'click',
		'DOUBLE_CLICK' : 'dblclick',
		'MOUSE_DOWN'   : 'mousedown',
		'MOUSE_MOVE'   : 'mousemove',
		'MOUSE_OVER'   : 'mouseover',
		'MOUSE_OUT'    : 'mouseout',
		'MOUSE_UP'     : 'mouseup',
		'MOUSE_WHEEL'  : 'mousewheel',

		// keyboard events
		'KEY_DOWN'  : 'keydown',
		'KEY_PRESS' : 'keypress',
		'KEY_UP'    : 'keyup',

		// focus events
		'FOCUS_IN'  : 'focus',
		'FOCUS_OUT' : 'blur',

		// form events
		'CHANGE' : 'change',

		// scroll events
		'SCROLL' : 'scroll',

		// touch events
		'TOUCH_START' : 'touchstart',
		'TOUCH_MOVE'  : 'touchmove',
		'TOUCH_END'   : 'touchend',

		// orientation events
		'ORIENTATION_CHANGE' : 'orientationchange'
	}
);

OJ.extendClass(
	OjObject, 'OjEventPhase',
	{},
	{
		'BUBBLING'  : 3,
		'CAPTURING' : 1,
		'TARGETING' : 2
	}
);


OJ.extendClass(
	OjEvent, 'OjHttpStatusEvent',
	{
		'_get_props_' : {
			'status' : null
		},


		'_constructor' : function(type/*, status = 0, bubbles = false, cancelable = false*/){
			var bubbles = false,
				cancelable = false,
				args = arguments,
				ln = args.length;

			if(ln > 1){
				this._status = args[1];

				if(ln > 2){
					bubbles = args[2];

					if(ln > 3){
						cancelable = args[3];
					}
				}
			}

			this._super('OjHttpStatusEvent', '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'HTTP_STATUS' : 'onHttpStatus'
	}
);


OJ.extendClass(
	OjErrorEvent, 'OjIoErrorEvent',
	{},
	{
		'IO_ERROR'   : 'onIoError',
		'IO_TIMEOUT' : 'onIoTimeout'
	}
);


OJ.extendClass(
	OjDomEvent, 'OjOrientationEvent',
	{
		'_get_props_' : {
			'orientation' : null
		},


		'_constructor' : function(type/*, bubbles, cancelable, orientation = NULL*/){
			var args = arguments,
				ln = args.length;

			this._super('OjOrientationEvent', '_constructor', ln > 3 ? [].slice.call(args, 0, 3) : args);

			if(ln > 3){
				this._orientation = args[3];
			}
		},


		'clone' : function(){
			var clone = this._super('OjOrientationEvent', 'clone', arguments);

			clone._orientation = this._orientation;

			return clone;
		}
	},
	{
		'convertDomEvent' : function(evt){
			var type;

			evt = OjDomEvent.normalizeDomEvent(evt);

			if(evt.type == OjDomEvent.ORIENTATION_CHANGE){
				type = OjOrientationEvent.CHANGE;
			}

			return new OjOrientationEvent(type, true, true, window.orientation);
		},

		'isOrientationEvent' : function(type){
			return type == OjOrientationEvent.CHANGE;
		},

		'isOrientationDomEvent' : function(type){
			return type == OjDomEvent.ORIENTATION_CHANGE;
		},

		'PORTRAIT' : 0,
		'LANDSCAPE_LEFT' : 90,
		'LANDSCAPE_RIGHT' : -90,

		'CHANGE'  : 'onOrienationChange'
	}
);


OJ.extendClass(
	OjEvent, 'OjProgressEvent',
	{
		'_get_props_' : {
			'progress' : 0
		},


		'_constructor' : function(type/*, progress = 0, bubbles = false, cancelable = false*/){
			var cancelable, bubbles = cancelable = false, ln = arguments.length;

			if(ln > 1){
				this._progress = arguments[1];

				if(ln > 2){
					bubbles = arguments[2];

					if(ln > 3){
						cancelable = arguments[3];
					}
				}
			}

			this._super('OjProgressEvent', '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'PROGRESS' : 'onProgress'
	}
);


OJ.extendComponent(
	OjOption, 'OjCheckedOption',
	{},
	{
		'_TAGS' : ['checkbox']
	}
);



OJ.extendClass(
	OjInput, 'OjComboBox',
	{
		'_options' : null,  '_options_dp' : null,  '_options_index' : null,

		'_selected' : null,  '_selected_index' : null,  '_trigger_evt' : null,  '_tween' : null,

		'_list' : null,  '_list_visible' : false,  '_ignore_click' : false,  '_allow_none' : false,  '_none_lbl' : '-- Select -- ',


		'_constructor' : function(/*name, label, value, options*/){
			var ln = arguments.length;

			this._options_index = [];

			this._super('OjComboBox', '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);

			this._list = new OjList();
			this._list.addEventListener(OjListEvent.ITEM_CLICK, this, '_onItemClick');

			this._options_dp = this._list.getDataProvider();

			if(ln > 2){
				if(ln > 3){
					this.setOptions(arguments[3]);
				}

				this.setValue(arguments[2]);
			}

			// setup event listeners
			this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');

			this.psuedoInput.addEventListener(OjMouseEvent.CLICK, this, '_onClick');
		},


		'_showList' : function(){
			// check to see if the list is already shown
			if(this._list_visible){
				return;
			}

			// prepare the list so we can extract the height and animate it in
			this._list.setAlpha(0);
			this._list.show();

			// get the actual height of the list
			var h = this._list.getHeight();

			// now set it back to 0 so we can animate it to its full height
			this._list.setHeight(0);

			// make sure to destroy an current animations for this combobox
			OJ.destroy(this._tween, true);

			// setup the animation
			this._tween = new OjTweenSet(
				new OjPropTween(this._list, { 'height' : h }, 250),
				new OjFade(this._list, OjFade.IN, 250)
			);

			// listen for when the animation is over so we can cleanup after ourselves
			this._tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTween');

			// start the animation
			this._tween.start();

			// listen for page clicks to know when to close the list
			OJ.addEventListener(OjMouseEvent.CLICK, this, '_onPageClick');

			this._list_visible = true;
		},

		'_hideList' : function(){
			// check to see if the list is already hidden
			if(!this._list_visible){
				return;
			}

			// make sure to destroy an current animations for this combobox
			OJ.destroy(this._tween, true);

			// setup the animation
			this._tween = new OjTweenSet(
				new OjPropTween(this._list, { 'height' : 0 }, 250),
				new OjFade(this._list, OjFade.NONE, 250)
			);

			// listen for when the animation is over so we can cleanup after ourselves
			this._tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTween');

			// start the animation
			this._tween.start();

			OJ.removeEventListener(OjMouseEvent.CLICK, this, '_onPageClick');

			this._trigger_evt = null;

			this._list_visible = this._ignore_click = false;
		},


		'_redrawList' : function(){
			var old_ln  = this._options_dp.numItems(), new_ln = 0, key;

			this._options_index = [];

			for(key in this._options){
				if(old_ln > new_ln){
					if(this._options_dp.getItemAt(new_ln) != this._options[key]){
						this._options_dp.setItemAt(this._options[key], new_ln);
					}
				}
				else{
					this._options_dp.addItem(this._options[key]);
				}

				this._options_index.push(key);

				new_ln++;
			}

			while(old_ln-- > new_ln){
				this._options_dp.removeItemAt(old_ln);
			}

			if(this._allow_none){
				if(this._options_dp.getItemAt(0) != this._none_lbl){
					this._options_dp.addItemAt(this._none_lbl, 0);
				}
			}
			else if(this._options_dp.getItemAt(0) == this._none_lbl){
				this._options_dp.removeItemAt(0);
			}
		},

		'_redrawValue' : function(){
			var value, item_renderer = this.getItemRenderer();

			if(
				!this.valueHldr.numChildren() ||
					!(value = this.valueHldr.getChildAt(0)).is(item_renderer)
				){
				this.valueHldr.removeAllChildren();

				this.valueHldr.addChild(new item_renderer(this._selected));
			}
			else{
				value.setData(this._selected);
			}
		},


		'_onClick' : function(evt){
			if(!this._trigger_evt){
				this._showList();
			}

			if(!this._ignore_click){
				this._trigger_evt = evt;

				this._ignore_click = false;
			}
		},

		'_onItemClick' : function(evt){
			this.setSelected(evt.getItem());

			this._ignore_click = true;
		},

		'_onPageClick' : function(evt){
			if(this._trigger_evt == evt){
				return;
			}

			this._hideList();
		},

		'_onTween' : function(evt){
			this._list.setHeight(OjStyleElement.AUTO);

			OJ.destroy(this._tween, true);
		},


		'getAllowNone' : function(){
			return this._allow_none;
		},
		'setAllowNone' : function(allow_none){
			this._allow_none = allow_none;
		},

		'getItemRenderer' : function(){
			return this._list.getItemRenderer();
		},
		'setItemRenderer' : function(item_renderer){
			this._list.setItemRenderer(item_renderer);

			this._redrawValue();
		},

		'getOptions' : function(){
			return this._options;
		},
		'setOptions' : function(options){
			this._options = options;

			this._redrawList();

			this._redrawValue();

			this.setValue(this._value);
		},

		'getSelected' : function(){
			return this._selected;
		},
		'setSelected' : function(selected){
			if(this._selected != selected){
				if(this._options){
					var key;

					for(key in this._options){
						if(this._options[key] == selected){
							this.setValue(key);

							return;
						}
					}

					if(this._allow_none){
						this.setValue(null);
					}
					else{
						this.setSelectedIndex(0);
					}
				}
				else{
					this._selected = selected;
				}
			}
		},

		'getSelectedIndex' : function(){
			return this._selected_index;
		},
		'setSelectedIndex' : function(index){
			if(this._selected_index != index){
				if(this._options){
					this.setValue(this._options_index[index]);
				}
				else{
					this._selected_index = index;
				}
			}
		},

		'setValue' : function(value){
			if(isEmpty(value)){
				value = null;
			}

			if(this._value != value || (isNull(this._selected_index) && this._options)){
				if(this._options){
					var cnt, ln = cnt = this._options_index.length;

					while(ln-- > 0){
						if(this._options_index[ln] == value){
							break;
						}
					}

					if(cnt){
						if(ln == -1){
							if(this._allow_none){
								this._selected_index = null;
								this._selected = this._none_lbl;

								value = null
							}
							else{
								this._selected_index = 0;

								value = this._options_index[0];

								this._selected = this._options[value];
							}
						}
						else{
							this._selected_index = ln;

							this._selected = this._options[value];
						}
					}
					else{
						this._selected_index = null;
						this._selected = this._allow_none ? this._none_lbl : null;

						value = null;
					}

					ln = cnt = null;
				}
				else{
					this._selected_index = null;
					this._selected = this._none_lbl;
					this._value = null;
				}

				this._redrawValue();

				this._super('OjComboBox', 'setValue', [value]);
			}
		}
	}
);//



OJ.extendClass(
	OjTextInput, 'OjDateInput',
	{
		'_onFocusIn' : function(evt){
			this._super('OjDateInput', '_onFocusIn', arguments);

			//showCalendarControl(this.dom());

		}
	}
);


OJ.extendClass(
	OjTextValue, 'OjDateValue',
	{
		'_redrawValue' : function(){
			this.value.setText(this._value.toLocaleDateString());
		}
	}
);


OJ.extendComponent(
	OjTextInput, 'OjEmailInput',
	{
		'_props_' : {
			'maxLength' : 254,
			'minLength' : 3
		},


		'_setDom' : function(dom_elm){
			this._super('OjEmailInput', '_setDom', arguments);

			if(this._static.SUPPORTS_EMAIL_TYPE){
				this.input.setAttr('type', 'email');
			}
		},


		'isValid' : function(){
			if(
				this._super('OjEmailInput', 'isValid', arguments) &&
				!isEmpty(this._value) && !this._static.isValidEmail(this._value)
			){
				this._error = this._formatError(OjEmailInput.INVALID_ERROR);

				return false;
			}

			return true;
		},


		'setMaxLength' : function(val){
			throw new Error('Cannot set the max length of an email. This is a fixed value.');
		},

		'setMinLength' : function(val){
			throw new Error('Cannot set the min length of an email. This is a fixed value.');
		}
	},
	{
		'INVALID_ERROR' : '[%INPUT] requires a valid email address.',

		'SUPPORTS_EMAIL_TYPE' : OjInput.supportsInputType('email'),

		'isValidEmail' : function(val){
			return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
		},

		'_TAGS' : ['emailinput']
	}
);



OJ.extendClass(
	OjComboBox, 'OjFilterBox',
	{
		'_item_index' : null,  '_previous_search' : null,


		'_constructor' : function(){
			this._super('OjFilterBox', '_constructor', arguments);

			// setup event listeners
			this.valueHldr.addEventListener(OjEvent.CHANGE, this, '_onSearch');
			this.valueHldr.addEventListener(OjFocusEvent.IN, this, '_onFocusIn');
			this.valueHldr.addEventListener(OjFocusEvent.OUT, this, '_onFocusOut');

			this._item_index = {};
		},


		'_setDom' : function(dom_elm){
			this._super('OjFilterBox', '_setDom', arguments);

			var prnt = this.valueHldr.parent();
			var new_value = new OjTextInput();
			new_value.addCss('value');
			new_value.addEventListener(OjFocusEvent.IN, this, '_onValueFocus');

			prnt.replaceChild(this.valueHldr, new_value);

			this.valueHldr = new_value;
		},


		'_redrawList' : function(/*search = null*/){
			var search = arguments.length && arguments[0] ? arguments[0] : null;
			var old_ln  = this._options_dp.numItems(), new_ln = 0, key;

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
					this._options_index.push(key);

					if(search && this._options[key] && this._item_index[key] && this._item_index[key].indexOf(search) == -1){
						continue;
					}

					if(old_ln > new_ln){
						if(this._options_dp.getItemAt(new_ln) != this._options[key]){
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

			this.valueHldr.setValue(value);
		},

		'_showList' : function(){
			this._redrawList();

			this._super('OjFilterBox', '_showList', arguments);
		},

		'_hideList' : function(){
			this._super('OjFilterBox', '_hideList', arguments);

			this._redrawValue();
		},


		'_onSearch' : function(evt){
			this._redrawList(this.valueHldr.getValue());
		},

		'_onFocusIn' : function(evt){
			this._showList();
		},

		'_onFocusOut' : function(evt){
			var is_child = this.find(evt.getTarget());

			if(!is_child.length){
				this._hideList();
			}
		},

		'_onValueFocus' : function(evt){
			if(this.valueHldr.getValue() == this._none_lbl){
				this.valueHldr.setValue(null);
			}
		},


		'setOptions' : function(options){
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

			this.setValue(this._value);
		}
	}
);

OJ.extendComponent(
	OjView, 'OjForm', {
		'_getInputs' : function(){
			var inputs = this._dom.getElementsByClassName('OjInput'),
				rtrn = [],
				ln = inputs.length;

			for(; ln--;){
				// todo: OjForm - add checking for compound inputs
				rtrn.unshift(OjElement.element(inputs[ln]));
			}

			return rtrn;
		},


		'focus' : function(){
			this._super('OjForm', 'focus', arguments);

			var inputs = this._getInputs();

			if(inputs.length){
				inputs[0].focus();
			}
		},

		'reset' : function(){
			var inputs = this._getInputs(),
				ln = inputs.length;

			for(; ln--;){
				inputs[ln].setValue(null);
			}
		},

		'submit' : function(){
			if(this.validate()){
				// todo: OjForm - add submit code logic/functionality

				this.dispatchEvent(new OjEvent(OjEvent.SUBMIT, false, false));

				return true;
			}

			return false;
		},

		'validate' : function(){
			var inputs = this._getInputs(),
				ln = inputs.length,
				input, msg = '';

			this._errors = [];

			for(; ln--;){
				input = inputs[ln];

				if(!input.validate()){
					this._errors.unshift({
						'input' : input,
						'error' : input.getError()
					});
				}
			}

			if(!(ln = this._errors.length)){
				return true;
			}

			for(; ln--;){
				msg = '\n' + this._errors[ln].error + msg;
			}

			WindowManager.alert(
				'Please fix the following issues and re-submit:<span style="font-weight: bold;">' + msg + '</span>\nThank you.',
				'Form Error'
			);

			return false;
		}
	},
	{
		'_TAGS' : ['form']
	}
);



OJ.extendComponent(
	OjView, 'OjForm',
	{
		'_template' : 'oj.form.OjForm',

		'header' : null,  'footer' : null,  'title' : null,  '_data' : null,  '_inputs' : null,  '_errors' : null,


		'_compile_' : function(){
			this.getLabel = this.getTitle;
			this.setLabel = this.setTitle;
		},


		'_constructor' : function(){
			this._data = {};

			this._inputs = {};

			this._errors = [];

			this._super('OjForm', '_constructor', arguments);

			this.errors.hide();

			this._processActions();
		},


		'_processActions' : function(){
			if(this.actions){
				var item, ln = this.actions.numChildren();

				while(ln-- > 0){
					item = this.actions.getChildAt(ln);

					if(item.is('OjButton')){
						item.addEventListener(OjMouseEvent.CLICK, this, '_onActionButtonClick');
					}
				}
			}
		},


		'_onActionButtonClick' : function(evt){
			var button = evt.getCurrentTarget();

			if(button.hasCss(['submit-button'])){
				this._onSubmit(evt);
			}
			else if(button.hasCss(['cancel-button'])){
				this._onCancel(evt);
			}
		},

		'_onSubmit' : function(evt){
			this.submit();
		},

		'_onCancel' : function(evt){
			this.dispatchEvent(new OjEvent(OjEvent.CANCEL));
		},


		'_updateInputs' : function(){
			// todo: remove dependency on sizzle find command
			var parent, inputs = this.find('.OjInput'), ln = inputs.length;

			this._inputs = {};

			for(; ln--;){
				parent = OjForm.parentForm(inputs[ln]);

				if(parent && parent == this){
					this._inputs[inputs[ln].id] = OJ.elm(inputs[ln]);
				}
			}
		},

		'_redraw' : function(){

		},

		'_reset' : function(){
			this._updateInputs();

			var key, input;

			for(key in this._inputs){
				input = this._inputs[key];

				input.setValue(this._data[input.getName()]);
			}
		},

		'_submit' : function(){

		},

		'_validate' : function(){
			this._updateInputs();

			var key, input, valid = true;

			for(key in this._inputs){
				input = this._inputs[key];

				if(!input.validate()){
					this._errors.push(
						{
							'input'     : input,
							'errors'    : input.getErrors()
						}
					);

					valid = false;
				}
			}

			return valid;
		},


		'redraw' : function(){
			if(this._super('OjForm', 'redraw', arguments)){
				this._redraw();

				return true;
			}

			return false;
		},

		'reset' : function(){
			this._reset();
		},

		'submit' : function(){
			// do some validation

			// then send some data
			this._submit();

			// then let the world know what you did
			this.dispatchEvent(new OjEvent(OjEvent.SUBMIT));
		},

		'validate' : function(){
			this._errors = [];

			var valid = this._validate();

			this.errors.getDataProvider().setSource(this._errors);

			if(valid){
				this.errors.hide();
			}
			else{
				this.errors.show();
			}

			return valid;
		},


		'_addElm' : function(elm, index){
			if(elm.is('OjInput')){
				this._inputs[elm.id()] = elm;
			}

			this._super('OjForm', '_addElm', arguments);
		},

		'_removeElm' : function(elm){
			delete this._inputs[elm.id()];

			this._super('OjForm', '_removeElm', arguments)
		},


		'getData' : function(){
			return this._data;
		},
		'setData' : function(data){
			this._data = data; this._reset();
		},

		'setError' : function(error){
			this.errors.getDataProvider().addItem(
				{
					'input'     : null,
					'errors'    : [error]
				}
			);

			this.errors.show();
		}
	},
	{
		'_TAGS' : ['form'],

		'COMPLETE' : 'formComplete',

		'parentForm' : function(elm, top){
			elm = OJ.elm(elm);

			var parent, top = arguments.length > 1 ? arguments[0] : OJ;

			top = OJ.elm(top);

			while(elm && elm != top){
				parent = elm.parent();

				if(parent && parent.is('OjForm')){
					return parent;
				}

				elm = parent;
			}

			return null;
		}
	}
);


OJ.extendClass(
	OjTextInput, 'OjPasswordInput',
	{
		'_min' : 6,  '_max' : 30,


		'_setDom' : function(dom_elm){
			this._super('OjPasswordInput', '_setDom', arguments);

			this.input.setAttr('type', 'password');
		}
	}
);


OJ.extendClass(
	OjOption, 'OjRadioOption',
	{
		'_constructor' : function(){
			this._super('OjRadioOption', '_constructor', arguments);

			this.input.setAttr('type', 'radio');
		}
	}
);




OJ.extendComponent(
	OjInput, 'OjSelector',
	{
		'_props_' : {
			'itemRenderer'      : OjLabelItemRenderer,
			'selectionMin'      : 0,
			'selectionMax'      : 1
		},

		'_template' : 'oj.form.OjSelector',


		'_constructor' : function(/*name, label, value, options*/){
			var args = arguments,
				ln = args.length;

			// default the value
			this._value = [];

			this._super('OjSelector', '_constructor', ln > 2 ? Array.array(args).slice(0, 2) : args);

			// setup the list listeners
			this.input.addEventListener(OjListEvent.ITEM_ADD, this, '_onItemAdd');
			this.input.addEventListener(OjListEvent.ITEM_CLICK, this, '_onItemClick');
			this.input.addEventListener(OjListEvent.ITEM_MOVE, this, '_onItemMove');
			this.input.addEventListener(OjListEvent.ITEM_REMOVE, this, '_onItemRemove');
			this.input.addEventListener(OjListEvent.ITEM_REPLACE, this, '_onItemReplace');
			this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');

			// set options if available
			if(ln > 3){
				this.setOptions(args[3]);
			}
		},


		'_processDomSourceChild' : function(dom_elm, component){
			if(OjElement.isTextNode(dom_elm)){
				return;
			}

			var txt = dom_elm.innerHTML;

			if(txt){
				this.input.addItem(OjObject.importData(txt.parseJson()));
			}
		},

		'_selectOption' : function(option, data){
			if(this._value.indexOf(data) > -1){
				return;
			}

			if(this._selectionMax && this._selectionMax == this._value.length){
				this.input.getElmAt(
					this.input.indexOfItem(this._value.shift())
				).setIsSelected(false);
			}

			option.setIsSelected(true);

			this._value.push(data);

			this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
		},

		'_toggleOptionAt' : function(index){
			var option = this.input.getElmAt(index),
				data = this.input.getItemAt(index);

			if(option.getIsSelected()){
				this._unselectOption(option, data);
			}
			else{
				this._selectOption(option, data);
			}
		},

		'_unselectOption' : function(option, data){
			var index = this._value.indexOf(data);

			if(index == -1 || this._value.length <= this._selectionMin){
				return;
			}

			option.setIsSelected(false);

			this._value.splice(index, 1);

			this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
		},

		'_updateSelection' : function(){
			// make sure we remove any stale values and replace with fresh if possible
			var ln = this._value.length;

			for(; ln--;){
				if(this.input.indexOfItem(this._value[ln]) == -1){
					this._value.splice(ln, 1);
				}
			}

			// make sure we have the at least the min amount selected
			var i = 0,
				ln2 = this.input.numItems();

			for(; (ln = this._value.length) < this._selectionMin && i < ln2; i++){
				this._selectOption(this.input.getElmAt(i), this.input.getItemAt(i));
			}
		},

		'_onItemAdd' : function(evt){
			this._updateSelection();
		},

		'_onItemClick' : function(evt){
			this._toggleOptionAt(evt.getIndex());
		},

		'_onItemMove' : function(evt){
			// todo: implement onItemMove in OjSelector
		},

		'_onItemRemove' : function(evt){
			// todo: implement onItemRemove in OjSelector
			this._updateSelection();
		},

		'_onItemReplace' : function(evt){
			// todo: implement onItemReplace in OjSelector
			return;
			var index, old_data = this._options.getItemAt(evt.getIndex());

			if((index = this._value.indexOf(old_data)) > -1){
				this._value.splice(index, 1, evt.getItem());
			}

			this.options.getChildAt(evt.getIndex()).setData(evt.getItem());
		},


		'redraw' : function(){
			if(this._super('OjSelector', 'redraw', arguments)){
				this.input.redraw();

				// update the selection
				this._updateSelection();

				return true;
			}

			return false;
		},


		'setItemRenderer' : function(val){
			if(isString(val)){
				val = OJ.stringToClass(val);
			}

			if(this._itemRenderer == val){
				return;
			}

			this._itemRenderer = val;

			this.redraw();
		},


		'getOptions' : function(){
			return this.input.getDataProvider();
		},
		'setOptions' : function(val){
			// check to make sure we don't do extra work
			if(val == this.getOptions()){
				return;
			}

			// get the old selected indices
			var indices = [];

			var ln = this._value.length;

			for(; ln--;){
				indices.unshift(this.input.indexOfItem(this._value[ln]));
			}

			this._value = [];

			// set the new options
			this.input.setDataProvider(val);

			// get the new options
			var options = this.getOptions();

			ln = options.numItems()

			// try to select previous selected indices
			var index,
				ln2 = indices.length;

			for(; ln2--;){
				if((index = indices[ln2]) < ln){
					this._selectOption(this.input.getElmAt(index), this.input.getItemAt(index));
				}
			}

			this.redraw();
		},

		'setValue' : function(val){
			val = Array.array(val);

			if(this._value != val){
				if(this._value = val){
					var options = this.getOptions(),
						ln = options.numItems();

					for(; ln--;){
						this.input.getElmAt(ln).setIsSelected(val.indexOf(options.getItemAt(ln)) > -1);
					}
				}

				this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
			}
		},

		'getSelectionRenderer' : function(){
			return this.input.getItemRenderer();
		},
		'setSelectionRenderer' : function(val){
			this.input.setItemRenderer(val);

			if(this.getSelectionRenderer() == OjRadioOption){
				this.setSelectionMin(1);
				this.setSelectionMax(1);
			}
		}
	},
	{
		'_TAGS' : ['selector']
	}
);




OJ.extendComponent(
	OjInput, 'OjSwitch',
	{
		'_props_' : {

		},

		'_template' : 'oj.form.OjSwitch'
	},
	{
		'_TAGS' : ['switch']
	}
);



OJ.extendComponent(
	OjInput, 'OjTextArea',
	{
		'_setDom' : function(dom_elm){
			this._super('OjTextArea', '_setDom', arguments);

			var prnt = this.input.parent();
			var new_input = new OjStyleElement(OjElement.elm('textarea'));
			new_input.addCss('input');

			prnt.replaceChild(this.input, new_input);

			this.input = new_input;
		}
	},
	{
		'_TAGS' : ['textarea']
	}
);


OJ.extendClass(
	OjItemRenderer, 'OjToken',
	{
		'_template' : 'oj.form.OjToken',


		'_constructor' : function(/*data*/){
			this._super('OjToken', '_constructor', arguments);

			this.removeBtn.addEventListener(OjMouseEvent.CLICK, this, '_onRemoveClick');
		},


		'_redrawData' : function(){
			this.item.setText(this._data.toString());
		},


		'_onRemoveClick' : function(evt){
			this._list.removeItem(this._data);
		}
	}
);



OJ.extendClass(
	OjInput, 'OjTokenInput',
	{
		'_allow_none' : false,  '_allow_duplicate' : false,

		'_options' : null,  '_available' : null,  '_selected' : null,

		'filterBox' : null,


		'_constructor' : function(/*name, label, value, list = Object*/){
			var ln = arguments.length;

			// setup the value and options
			this._selected = [];
			this._value = [];

			this._super('OjTokenInput', '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);

			if(ln > 2){
				if(ln > 3){
					this.setOptions(arguments[3]);
				}

				this.setValue(arguments[2]);
			}

			// setup event listeners
			this.valueHldr.addEventListener(OjListEvent.ITEM_REMOVE, this, '_onListItemRemove');

			this.filterBox.addEventListener(OjEvent.CHANGE, this, '_onFilterChange');
		},


		'_setDom' : function(dom_elm){
			this._super('OjTokenInput', '_setDom', arguments);

			var prnt = this.input.parent();

			// customize the input holder
			this.filterBox = new OjFilterBox();
			this.filterBox.setAllowNone(true);
			this.filterBox.setValue(null);
			this.filterBox.addCss('filter', 'grey');

			prnt.addChildAt(this.filterBox, prnt.indexOfChild(this.input) + 1);

			// customize the value holder
			this.valueHldr = new OjList();
			this.valueHldr.setItemRenderer(OjToken);
			this.valueHldr.addCss('value');

			this.inputWrpr.addChild(this.valueHldr);
		},


		'_addValue' : function(value/*, suppress_event = false*/){
			return this._addValueAt(value, this._value.length, arguments.length > 2 ? arguments[2] : false);
		},

		'_addValueAt' : function(value, index/*, suppress_event = false*/){
			// update the values list
			this._value.splice(index, 0, value);

			if(!this._options){
				return;
			}

			// update the selected list
			this._selected.splice(index, 0, this._options[value]);

			// update value display
			this.valueHldr.addItemAt(this._options[value], index);

			// update filter list
			if(!this._allow_duplicate){
				delete this._available[value];

				this.filterBox.setOptions(this._available);

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
				this._values.splice(index, 1);

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
			if(evt.getTarget() == this.filterBox && this.filterBox.getValue() != null){
				this._addValue(this.filterBox.getValue());

				this.filterBox.setValue(null);
			}
		},

		'_onListItemRemove' : function(evt){
			// update values
			var removed = this._value.splice(evt.getIndex(), 1);
			this._selected.splice(evt.getIndex(), 1);

			// update filter list
			if(!this._allow_duplicate){
				this._available[removed] = this._options[removed];

				this.filterBox.setOptions(this._available);

				this.filterBox.show();
			}
		},


		'getAllowNone' : function(){ return this._allow_none; },
		'setAllowNone' : function(allow){ this._allow_none = allow; },

		'getAllowDuplicate' : function(){ return this._allow_duplicate; },
		'setAllowDuplicate' : function(allow){ this._allow_duplicate = allow; },

		'getOptions' : function(){ return this._options; },
		'setOptions' : function(options){
			this._options = options;

			this._available = OJ.merge({}, options);

			this.filterBox.setOptions(this._available);

			this.setValue(this._value.clone());
		},

		'getSelected' : function(){ return this._selected; },
		'setSelected' : function(selected){
			this._selected = selected;
		},

		'getTokenRenderer' : function(){ return this.valueHldr.getItemRenderer(); },
		'setTokenRenderer' : function(renderer){ this.valueHldr.setItemRenderer(renderer); },

		'_onChange' : function(){},

		'setValue' : function(value){
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
	}
);


OJ.extendClass(
	OjPropTween, 'OjDimTween',
	{
		'_props_' : {
			'amount'    : null,
			'direction' : 'dimTweenBoth'
		},


		'_constructor' : function(/*target, direction, amount, duration, easing*/){
			this._super('OjDimTween', '_constructor', []);

			var ln = arguments.length;

			this._to = {};

			if(ln){
				this.setTarget(arguments[0]);

				if(ln > 1){
					this.setDirection(arguments[1]);

					if(ln > 2){
						this.setAmount(arguments[2]);

						if(ln > 3){
							this.setDuration(arguments[3]);

							if(ln > 4){
								this.setEasing(arguments[4]);
							}
						}
					}
				}
			}
		}
	},
	{
		'HORIZONTAL' : 'dimTweenHorizontal',
		'VERTICAL'   : 'dimTweenVertical',
		'BOTH'       : 'dimTweenBoth'
	}
);


OJ.extendClass(
	OjActionable, 'OjTween',
	{
		'_props_' : {
			'duration' : 500,
			'easing'   : OjEasing.NONE,
			'from'     : null,
			'quality'  : 60,  // frame rate
			'to'       : null
		},

//		'_callback' : null,  '_start' : null,  '_timer' : null,

		'_delta' : 0,


		'_constructor' : function(/*from = null, to = null, duration = 500, easing = NONE*/){
			this._super('OjTween', '_constructor', []);

			var args = arguments,
				ln = args.length;

			if(ln){
				this.setFrom(args[0]);

				if(ln > 1){
					this.setTo(args[1]);

					if(ln > 2){
						this.setDuration(args[2]);

						if(ln > 3){
							this.setEasing(args[3]);
						}
					}
				}
			}
		},


		'_destructor' : function(){
			this._unset('_timer');

			return this._super('OjTween', '_destructor', arguments);
		},


		'_calculateDelta' : function(){
			this._delta = this._to - this._from;
		},

		'_tick' : function(time){
			this.dispatchEvent(
				new OjTweenEvent(
					OjTweenEvent.TICK, // type
					this._easing(time, this._from, this._delta, this._duration, 0, 0), // value
					time / this._duration // progress
				)
			);
		},


		'_onTick' : function(evt){
			var time = Date.time() - this._start;

			if(time >= this._duration){
				time = this._duration;

				this._timer.stop();
			}

			this._tick(time);

			if(time == this._duration){
				this._onComplete(evt);
			}
		},

		'_onComplete' : function(evt){
			this.dispatchEvent(new OjTweenEvent(OjTweenEvent.COMPLETE, this._to, 1));
		},


		'start' : function(){
			// make sure we have what we need to get started
			if(isUnset(this._from) || isUnset(this._to)){
				return;
			}

			var timer = this._timer;

			this._calculateDelta();

			// only create the time once
			if(!timer){
				timer = this._timer = new OjTimer();

				timer.addEventListener(OjTimer.TICK, this, '_onTick');
			}
			else{
				timer.stop();
			}

			timer.setDuration(1000 / this._quality);

			this._start = Date.time();

			timer.start();
		},

		'pause' : function(){
			this._timer.pause();
		},

		'stop' : function(){
			this._timer.stop();
		},

		'restart' : function(){
			this._timer.restart();
		},

		'reverse' : function(){
			// todo: implement tween reverse
		}
	}
);

OJ.extendManager(
	'LayoutManager', OjActionable, 'OjLayoutManager',
	{

	}
);


OJ.extendComponent(
	OjItemRenderer, 'OjListItem',
	{
		'_props_' : {
			'showAccessory' : false,
			'showIcon'      : false
		},

		'accessory' : null,  'content' : null,  'icon' : null,


		'_constructor' : function(/*data*/){
			this._super('OjListItem', '_constructor', []);

			this.addChild(this.accessory = new OjStyleElement('<div class="-accessory valign-middle"></div>'));
			this.addChild(this.icon = new OjImage());
			this.addChild(this.content = new OjStyleElement('<div class="-content valign-middle"></div>'));

			this.icon.addCss('-icon');

			if(arguments.length){
				this.setData(arguments[0]);
			}
		},

		'_destructor' : function(/*depth = 0*/){
			if(this._data && this._data.is && this._data.is('OjActionable')){
				this._data.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
			}

			this._list = this._data = null;

			return this._super('OjListItem', '_destructor', arguments);
		},


		'_redrawAccessory' : function(){
			if(this._showAccessory){
				this.removeCss(['no-accessory']);
			}
			else{
				this.addCss(['no-accessory']);
			}
		},

		'_redrawData' : function(){
			this.content.setText(this._data);
		},

		'_redrawIcon' : function(){
			if(this._showIcon){
				this.removeCss(['no-icon']);
			}
			else{
				this.addCss(['no-icon']);
			}
		},


		'redraw' : function(){
			if(this._super('OjListItem', 'redraw', arguments)){
				this._redrawData();

				this._redrawAccessory();

				this._redrawIcon();

				return true;
			}

			return false;
		},


		'_onDataChange' : function(evt){
			this._redrawData();
		},


		'setData' : function(data){
			if(this._data && this._data.is && this._data.is('OjActionable')){
				this._data.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
			}

			this._data = data;

			if(this._data && this._data.is && this._data.is('OjActionable')){
				this._data.addEventListener(OjEvent.CHANGE, this, '_onDataChange');
			}

			this.redraw();
		},

		'setShowAccessory' : function(val){
			if(this._showAccessory == val){
				return;
			}

			this._showAccessory = val;

			this.redraw();
		},

		'setShowIcon' : function(val){
			if(this._showIcon == val){
				return;
			}

			this._showIcon = val;

			this.redraw();
		}
	},
	{
		'_TAGS' : ['listitem']
	}
);


OJ.extendComponent(
	OjMedia, 'OjAudio',
	{
		'_sources' : null,


		'_makeMedia' : function(){
			var elm = new OjStyleElement('<audio></audio>');

//			elm.addEventListener('load', this._callback = this._onMediaLoad.bind(this));

			return elm;
		},

		'_setSource' : function(url){
			this._super('OjAudio', '_setSource', arguments);

			if(this.media){
				this.media.setAttr('src', this._source);
			}
		},


		'_onMediaLoad' : function(evt){

		},


		'pause' : function(){
			if(this.media){
				this.media.dom().pause();
			}
		},

		'play' : function(){
			if(this.media){
				this.media.dom().play();
			}
		},

		'stop' : function(){
			if(this.media){
				if(this.media.load){
					this.media.dom().load();
				}
				else{
					this.media.setAttr('src', null);
					this.media.setAttr('src', this._source);
				}
			}
		},


		'getSources' : function(){
			if(this._sources){
				return this._sources.clone();
			}

			return [];
		},
		'setSources' : function(sources){
			this._sources = sources ? sources.clone() : [];

			var ln = this._sources.length;

			if(this.media){
				for(var i = 0; i < ln; i++){
					if(this.media.canPlayType(OjAudio.audioType(this._sources[i])) == ''){

					}
				}
			}
			else if(ln){
				this.setSource(this._sources[ln]);
			}
		}
	},
	{
		'MP3' : 'audio/mpeg',
		'MP4' : 'audio/mp4',
		'OGG' : 'audio/ogg',
		'WAV' : 'audio/x-wav',

		'audioType' : function(url){
			var parts = OjUrl.url(url).getPath().split('.'),
				ext = parts.pop();

			if(!ext){
				return null;
			}

			ext = ext.toLowerCase();

			if(ext == 'mp3' || ext == 'mpeg' || ext == 'mpeg1' || ext == 'mpeg2' || ext == 'mpeg3'){
				return this.MP3;
			}

			if(ext == 'mp4' || ext == 'm4a' || ext == 'm4p' || ext == 'm4b' || ext == 'm4r' || ext == 'm4v'){
				return this.MP4;
			}

			if(ext == 'ogg'){
				return this.OGG;
			}

			if(ext == 'wav'){
				return this.WAV
			}

			return null;
		},

		'_TAGS' : ['audio']
	}
);


OJ.extendComponent(
	OjMedia, 'OjFlash',
	{
		'_tag' : '<object></object>'
	},
	{
		'_TAGS' : ['flash']
	}
);



OJ.extendComponent(
	OjView, 'OjImageViewer',
	{
		'_images' : null,


		'_constructor' : function(/*content, title, short_title*/){
			this._images = [];

			this._super('OjImageViewer', '_constructor', arguments);
		},


		'getContent' : function(){
			return this._images.clone();
		},
		'setContent' : function(content){
			this.removeAllElms();

			if(content){
				this._images = Array.array(content);

				var ln = this._images.length;

				for(; ln--;){
					this.addElmAt(new OjImage(this._images[ln]), 0);
				}
			}
		}
	},
	{
		'_TAGS' : ['imageviewer']
	}
);


OJ.extendComponent(
	OjMedia, 'OjVideo',
	{
		'_tag' : '<video></video>'
	},
	{
		'supportedVideo' : function(){
			return ['video'];
		}
	}
);



OJ.extendClass(
	OjComponent, 'OjMenu',
	{
		'_props_' : {
			'content'     : null,
			'horzOffset'  : null,
			'positioning' : null,
			'parentMenu'  : null,
			'vertOffset'  : 0
		},


		'_constructor' : function(/*content, positioning, parent_menu*/){
			this._super('OjMenu', '_constructor', []);

			// process arguments
			var ln = arguments.length;

			if(ln){
				this.setContent(arguments[0]);

				if(ln > 1){
					this.setPositioning(arguments[1]);

					if(ln > 2){
						this.setParentMenu(arguments[2]);
					}
				}
			}

			if(!this._positioning){
				this.setPositioning([
					OjMenu.RIGHT_MIDDLE, OjMenu.RIGHT_TOP, OjMenu.RIGHT_BOTTOM,
					OjMenu.LEFT_MIDDLE, OjMenu.LEFT_TOP, OjMenu.LEFT_BOTTOM,
					OjMenu.BOTTOM_LEFT, OjMenu.BOTTOM_CENTER, OjMenu.BOTTOM_RIGHT,
					OjMenu.TOP_LEFT, OjMenu.TOP_CENTER, OjMenu.TOP_RIGHT
				]);
			}
		},

		'_destructor' : function(){
			this._content = null;

			return this._super('OjMenu', '_destructor', arguments);
		},


		'hasSubMenu' : function(menu){
			while(menu){
				if(menu.getParentMenu() == this){
					return;
				}

				menu = menu.getParentMenu();
			}

			return false;
		},

		'setContent' : function(content){
			if(this._content == content){
				return;
			}

//				if(content.is('OjForm')){
//					content.addEventListener(OjEvent.CANCEL, this, '_onClose');
//					content.addEventListener(OjEvent.SUBMIT, this, '_onClose');
//				}

			if(this._content){
//					this._content.removeEventListener(OjEvent.CANCEL, this, '_onClose');
//					this._content.removeEventListener(OjEvent.SUBMIT, this, '_onClose');

				this.replaceChild(this._content, this._content = content);
			}
			else{
				this.addChild(this._content = content);
			}
		}
	},
	{
		'TOP_LEFT'   : 'positionTopLeft',
		'TOP_CENTER' : 'positionTopCenter',
		'TOP_RIGHT'  : 'positionTopRight',

		'BOTTOM_LEFT'   : 'positionBottomLeft',
		'BOTTOM_CENTER' : 'positionBottomCenter',
		'BOTTOM_RIGHT'  : 'positionBottomRight',

		'LEFT_TOP'    : 'positionLeftTop',
		'LEFT_MIDDLE' : 'positionLeftMiddle',
		'LEFT_BOTTOM' : 'positionLeftBottom',

		'RIGHT_TOP'    : 'positionRightTop',
		'RIGHT_MIDDLE' : 'positionRightMiddle',
		'RIGHT_BOTTOM' : 'positionRightBottom'
	}
);


OJ.extendManager(
	'MenuManager', OjActionable, 'OjMenuManager',
	{
		'_menus' : null,  '_active' : null,  '_tweens' : null,


		'_constructor' : function(){
			this._super('OjMenuManager', '_constructor', arguments);

			this._menus = {};
			this._active = {};
			this._tweens = {};
		},

		'_percentRectVisible' : function(rect){
			var viewport = OJ.getViewport();

			var x = {
				'top'       : rect.top > 0 && rect.top >= viewport.top ? rect.top : viewport.top,
				'left'      : rect.left > 0 && rect.left >= viewport.left ? rect.left : viewport.left,
				'bottom'    : viewport.bottom >= rect.bottom ? rect.bottom : viewport.bottom,
				'right'     : viewport.right >= rect.right ? rect.right : viewport.right
			};

			return ((rect.bottom - rect.top) * (rect.right - rect.left)) /
				((x.bottom - x.top) * (x.right - x.left));
		},

		'_positionMenu' : function(menu, target){
			var pos = menu.getPositioning();
			var rect, rect_vis;
			var backup, visibility = 0;
			var i, ln = pos.length;

			for(i = 0; i < ln; i++){
				rect = this[pos[i]](target, menu);
				rect_vis = this._percentRectVisible(rect);

				if(rect_vis == 1){
					break;
				}
				else if(rect_vis > visibility){
					visibility = rect_vis;

					backup = rect;
				}

				rect = null;
			}

			if(!rect){
				rect = backup;
			}

			menu.setX(rect.left);
			menu.setY(rect.top);
		},

		'_removeMenus' : function(list){
			var key, tweens = new OjTweenSet();

			for(key in list){
				// stop & remove the old tween/menu
				OJ.destroy(this._tweens[key]);

				// remove old event listeners
				OjElement.byId(key).removeEventListener(OjTransformEvent.MOVE, this, '_onTargetMove');

				// add the fade out
				tweens.addTween(new OjFade(list[key], OjFade.OUT));

				delete this._active[key];
				delete this._tweens[key];
			}

			if(tweens.numTweens()){
				tweens.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransOut');
				tweens.start();
			}
		},


		'_onPageClick' : function(evt){
			var key, active, target;

			// check to see if we should cancel
			for(key in this._active){
				active = this._active[key];

				if(active && active.hitTestPoint(evt.getPageX(), evt.getPageY())){
					return;
				}

				target = OjElement.byId(key);

				if(target && target.hitTestPoint(evt.getPageX(), evt.getPageY())){
					return;
				}
			}

			// if not shut it down for all actives
			this._removeMenus(this._active);

			// remove the event listener
			OJ.removeEventListener(OjMouseEvent.CLICK, this, '_onPageClick');
		},

		'_onTargetClick' : function(evt){
			var target = evt.getCurrentTarget();
			var menu = this._menus[target.id()];

			if(menu && !this._active[target.id()]){
				this.show(menu, target)
			}
		},

		'_onTargetMove' : function(evt){
			var target = evt.getCurrentTarget();
			var menu = this._menus[target.id()];

			if(menu){
				this._positionMenu(menu, target);
			}
		},

		'_onTransOut' : function(evt){
			OJ.destroy(evt.getCurrentTarget());
		},


		'hide' : function(menu){
			var key, id, ln = 0;

			for(key in this._active){
				ln++;

				if(this._active[key] == menu){
					id = key
				}
			}

			if(id){
				var tmp = {};
				tmp[id] = menu;

				delete this._active[id];

				this._removeMenus(tmp);

				// if there are no more active menus then stop listening for page clicks
				if(ln == 1){
					OJ.removeEventListener(OjMouseEvent.CLICK, this, '_onPageClick');
				}
			}
		},

		'register' : function(target, content/*, positioning, parent_menu*/){
			target.addEventListener(OjMouseEvent.CLICK, this, '_onTargetClick');

			var menu = new OjMenu(content);
			var ln = arguments.length;

			if(ln > 2){
				menu.setPositioning(arguments[2]);

				if(ln > 3){
					menu.setParentMenu(arguments[3]);
				}
			}

			this._menus[target.id()] = menu;

			return menu;
		},

		'show' : function(menu/*, target*/){
			var target = arguments.length > 1 ? arguments[1] : null;
			var key, list = {};

			if(!target){
				for(key in this._menus){
					if(this._menus[key] == menu){
						target = OjElement.byId(key);

						break;
					}
				}
			}

			// remove all non-parent active menus
			for(key in this._active){
				if(this._active[key] != menu && !this._active[key].hasSubMenu(menu)){
					list[key] = this._active[key];
				}
			}

			this._removeMenus(list);

			// grab the menu
			menu.setAlpha(0);

			OJ.addChild(menu);

			// position the menu based on preferences
			if(menu){
				this._positionMenu(menu, target);

				var tween = new OjFade(menu);
				tween.start();

				this._active[target.id()] = menu;
				this._tweens[target.id()] = tween;

				OJ.addEventListener(OjMouseEvent.CLICK, this, '_onPageClick');
			}

			target.addEventListener(OjTransformEvent.MOVE, this, '_onTargetMove');
		},

		'unregister' : function(target/*|menu*/){
			if(target.is('OjMenu')){
				var key;

				for(key in this._menus){
					if(this._menus[key] == target){
						target = OjElement.byId(key);

						break;
					}
				}
			}

			if(target){
				target.removeEventListener(OjMouseEvent.CLICK, this, '_onTargetClick');

				delete this._menus[target.id()];
			}
		},


		'positionTopLeft' : function(target, menu){
			return new OjRect(
				target.getPageX() - menu.getHorzOffset(),
				target.getPageY() - menu.getHeight() - menu.getVertOffset(),
				menu.getWidth(),
				menu.getHeight()
			);
		},

		'positionTopCenter' : function(target, menu){
			return new OjRect(
				target.getPageX() + ((target.getWidth() - menu.getWidth()) / 2),
				target.getPageY() - menu.getHeight(),
				menu.getWidth(),
				menu.getHeight()
			);
		},

		'positionTopRight' : function(target, menu){
			return new OjRect(
				target.getPageX() + target.getWidth() - menu.getWidth(),
				target.getPageY() - menu.getHeight(),
				menu.getWidth(),
				menu.getHeight()
			);
		},


		'positionBottomLeft' : function(target, menu){
			return new OjRect(
				target.getPageX(),
				target.getPageY() + target.getHeight(),
				menu.getWidth(),
				menu.getHeight()
			);
		},

		'positionBottomCenter' : function(target, menu){
			return new OjRect(
				target.getPageX() + ((target.getWidth() - menu.getWidth()) / 2),
				target.getPageY() + target.getHeight(),
				menu.getWidth(),
				menu.getHeight()
			);
		},

		'positionBottomRight' : function(target, menu){
			return new OjRect(
				target.getPageX() + target.getWidth() - menu.getWidth(),
				target.getPageY() + target.getHeight(),
				menu.getWidth(),
				menu.getHeight()
			);
		},


		'positionLeftTop' : function(target, menu){
			return new OjRect(
				target.getPageX() - menu.getWidth(),
				target.getPageY(),
				menu.getWidth(),
				menu.getHeight()
			);
		},

		'positionLeftMiddle' : function(target, menu){
			return new OjRect(
				target.getPageX() - menu.getWidth(),
				target.getPageY() + ((target.getHeight() - menu.getHeight()) / 2),
				menu.getWidth(),
				menu.getHeight()
			);
		},

		'positionLeftBottom' : function(target, menu){
			return new OjRect(
				target.getPageX() - menu.getWidth(),
				target.getPageY() + target.getHeight() - menu.getHeight(),
				menu.getWidth(),
				menu.getHeight()
			);
		},


		'positionRightTop' : function(target, menu){
			return new OjRect(
				target.getPageX() + target.getWidth(),
				target.getPageY(),
				menu.getWidth(),
				menu.getHeight()
			);
		},

		'positionRightMiddle' : function(target, menu){
			return new OjRect(
				target.getPageX() + target.getWidth(),
				target.getPageY() + ((target.getHeight() - menu.getHeight()) / 2),
				menu.getWidth(),
				menu.getHeight()
			);
		},

		'positionRightBottom' : function(target, menu){
			return new OjRect(
				target.getPageX() + target.getWidth(),
				target.getPageY() + target.getHeight() - menu.getHeight(),
				menu.getWidth(),
				menu.getHeight()
			);
		}
	}
);



window.OjIFlowNavController = {
	'_props_' : {
		'cancelLabel' : 'Cancel',
		'title'       : null
	},


	'_back_btn' : null,  '_cancel_btn' : null,  '_show_cancel' : false,

	'_template' : 'oj.nav.OjFlowNavController',  '_tween' : null,

	'bottom' : null,  'btmLeft' : null,  'btmRight' : null,  'btmTitle' : null,

	'title' : null,  'top' : null,  'topLeft' : null,  'topRight' : null,  'topTitle' : null,


	// helper functions
	'_makeBackButton' : function(view){
		var btn = new OjButton(view.getShortTitle());
		btn.addCss(['back-button']);

		return btn;
	},

	'_makeCancelButton' : function(title){
		var btn = new OjButton(title);
		btn.addCss(['cancel-button']);

		return btn;
	},

	'_makeTitle' : function(title){
		var elm = new OjLabel(title);
		elm.setVAlign(OjStyleElement.MIDDLE);

		return elm;
	},

	'_update' : function(view, transition, index, old_index){
		// remove any old animations
		this._unset('_tween');

		// process the left, title & right components
		// setup the vars
		var t = this.top, tl = this.topLeft, tt = this.topTitle, tr = this.topRight,
			b = this.bottom, bl = this.btmLeft, bt = this.btmTitle, br = this.btmRight,
			left = tl.numChildren() ? this.topLeft.getChildAt(0) : null,
			center = tt.numChildren() ? tt.getChildAt(0) : null,
			right = tr.numChildren() ? tr.getChildAt(0) : null,
			action_view = view.getActionView(),
			cancel_view  = view.getCancelView(),
			title_view = view.getTitleView(),
			title;

		// if there is no title view than try to make one from the title
		if(!title_view && (title = view.getTitle())){
			title_view = this._makeTitle(title);
		}

		// figure out default values
		if(this._back_btn){
			this._back_btn.removeEventListener(OjMouseEvent.CLICK, this, '_onBackClick');
		}
		else if(this._cancel_btn){
			this._cancel_btn.removeEventListener(OjMouseEvent.CLICK, this, '_onCancelClick');
		}

		if(!cancel_view){
			if(index > 0){
				cancel_view =  this._makeBackButton(this._stack.getElmAt(index - 1));
			}
			else if(this._show_cancel){
				cancel_view = this._cancel_btn = this._makeCancelButton(this._cancelLabel);
			}
		}

		if(index > 0){
			this._back_btn = cancel_view;

			cancel_view.addEventListener(OjMouseEvent.CLICK, this, '_onBackClick');
		}
		else if(this._show_cancel){
			this._cancel_btn = cancel_view;

			cancel_view.addEventListener(OjMouseEvent.CLICK, this, '_onCancelClick');
		}

		// figure out the transition
		if(left != cancel_view){
			if(left){
				bl.addChild(left);
			}

			if(cancel_view){
				tl.addChild(cancel_view);
			}
		}

		if(right != action_view){
			if(right){
				br.addChild(right);
			}

			if(action_view){
				tr.addChild(action_view);
			}
		}

		if(center != title_view){
			if(center){
				bt.addChild(center);
			}

			if(title_view){
				tt.addChild(title_view);
			}
		}

		// setup the top
		t.setX(0);
		t.setAlpha(1);

		b.setX(0);
		b.setAlpha(1);

		// check to see if we should animate or not
		var e = transition && transition.getEffect() ? transition.getEffect() : OjTransition.DEFAULT;

		if(e == OjTransition.NONE){
			// remove the animating css class since we aren't anymore
			this.removeCss(['animating']);

			// make the necessary changes to the left, title & right bottom components components
			t.show();

			b.hide();

			bl.removeAllChildren();
			bt.removeAllChildren();
			br.removeAllChildren();

			return;
		}

		// setup the transition
		this.addCss('animating');

		this._tween = new OjTweenSet();

		// figure out the direction and then update
		var direction = 0,
			duration = transition.getDuration(),
			easing = transition.getEasing(),
			width = this.getWidth();

		if(old_index != -1){
			if(old_index > index){
				direction = width * -.5;
			}
			else if(old_index < index){
				direction = width * .5;
			}
		}

		if(direction && e != OjTransition.FADE){
			// todo: OjFlowNavController - add support for multiple transition effects
			// update the display of the controller bar
			// setup the display
			b.setX(0);

			t.setX(direction);
			t.setAlpha(0);

			this._tween.addTween(new OjMove(b, OjMove.X, -1 * direction * .5, duration *.5), easing[1]);
			this._tween.addTween(new OjMove(t, OjMove.X, 0, duration, easing[1]));
		}
		else{
			t.setAlpha(0);
		}

		this._tween.addTween(new OjFade(b, OjFade.OUT, duration, easing[1]));
		this._tween.addTween(new OjFade(t, OjFade.IN, duration, easing[0]));


		// start the transition
		this._tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTweenComplete');

		this._tween.start();
	},


	// event handler functions
	'_onBackClick' : function(evt){
		this.back();
	},

	'_onCancelClick' : function(evt){
		this.dispatchEvent(new OjEvent(OjEvent.CANCEL, false));
	},

	'_onBackComplete' : function(evt){
		this._stack.removeItemAt(this._stack.numItems() - 1);

		this._stack.removeEventListener(OjStackEvent.CHANGE_COMPLETE, this, '_onBackComplete');
	},

	'_onStackChange' : function(evt){
		this._update(evt.getView(), evt.getTransition(), evt.getIndex(), evt.getOldIndex());
	},

	'_onTweenComplete' : function(evt){
		this._unset('_tween');

		this.btmLeft.removeAllChildren();
		this.btmTitle.removeAllChildren();
		this.btmRight.removeAllChildren();

		this.removeCss(['animating']);
	},


	'showCancel' : function(){
		if(arguments.length){
			this._show_cancel = arguments[0];
		}

		return this._show_cancel;
	},

	'back' : function(){
		this._stack.removeElm(this._stack.getActive());

		this.dispatchEvent(new OjEvent(OjFlowNavController.BACK));
	},


	'setTitle' : function(title){
		if(this._title == title){
			return;
		}

		if(!this.title){
			this.title = this._makeTitle();

			this.topTitle.addChild(this.title);
		}

		this.title.setText(this._title = title);
	},

	'setCancelLabel' : function(val){
		if(this._cancelLabel == val){
			return;
		}

		this._cancelLabel = val;

		if(this._cancel_btn){
			this._cancel_btn.setLabel(val);
		}
	}
};


OJ.extendComponent(
	OjNavController, 'OjFlowNavController',
	OJ.implementInterface(
		OjIFlowNavController,
		{
			'_constructor' : function(/*stack*/){
				this._super('OjFlowNavController', '_constructor', []);

				// process the arguments
				if(arguments.length){
					this.setStack(arguments[0]);
				}
			},


			'_setupStack' : function(){
				this._super('OjFlowNavController', '_setupStack', arguments);

				this._stack.setTransition(new OjTransition(OjTransition.SLIDE_HORZ, 250, [OjEasing.IN, OjEasing.OUT]));

				this._stack.addEventListener(OjStackEvent.ADD, this, '_onStackAdd');
			},

			'_cleanupStack' : function(){
				this._super('OjFlowNavController', '_cleanupStack', arguments);

				if(this._stack){
					this._stack.removeEventListener(OjStackEvent.ADD, this, '_onStackAdd');
				}
			},


			'_onStackAdd' : function(evt){
				this._stack.setActive(evt.getView());
			}
		}
	),
	{
		'_TAGS' : ['flownav'],

		'BACK'     : 'onFlowNavBack'
	}
);



OJ.extendComponent(
	OjView, 'OjIframe',
	{
		'_source' : null,  '_interval' : null,  '_timeout' : 60,

		'_template' : '<iframe></iframe>',


		'_constructor' : function(/*source, target*/){
			this._super('OjIframe', '_constructor', []);

			var ln = arguments.length;

			if(ln){
				this.setSource(arguments[0]);

				if(ln > 1){
					this.setTarget(arguments[1]);
				}
			}

			this.setAttr('name', this.id());
		},


		'_onLoad' : function(){
			clearInterval(this._interval);

			this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
		},

		'_onTimeout' : function(){
			clearInterval(this._interval);

			this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR));
		},


		'getTargetId' : function(){
			return this.id();
		},

		'getSource' : function(){
			return this._source;
		},
		'setSource' : function(source){
			var iframe = this.dom();

			this._source = source.toString();

			if(iframe.src){
				iframe.src = this._source;
			}
			else if(iframe.contentWindow !== null && iframe.contentWindow.location !== null){
//			    	    iframe.contentWindow.location.href = this._source;
			}
			else{
				this.setAttr('src', this._source);
			}

			if(!isEmpty(this._source)){
				clearInterval(this._interval);

				this._interval = setInterval(this._onTimeout.bind(this), this._timeout * 1000);

				var on_load_func = this._onLoad.bind(this);

				if(iframe.attachEvent){
					iframe.attachEvent('onload', on_load_func);
				}
				else{
					iframe.onload = on_load_func;
				}
			}
		}
	},
	{
		'_TAGS' : ['iframe']
	}
);


OJ.extendComponent(
	OjStack, 'OjNavStack',
	{
		'_props_' : {
			'controller' : null
		},


		'_destructor' : function(){
			// make sure to remove stack and controller references
			if(this._active){

			}

			if(this._prev_active){
				this._unload(this._prev_active);
			}

			// continue on
			this._super('OjNavStack', '_destructor', arguments);
		},


		'_addActiveElm' : function(elm){
			elm.setController(this._controller);
			elm.setStack(this);
			elm.load();

			this._super('OjNavStack', '_addActiveElm', arguments);
		},

		'_removeActiveElm' : function(elm){
			elm.unload();
			elm.setController(null);
			elm.setStack(null);

			this._super('OjNavStack', '_removeActiveElm', arguments)
		},


		'_onItemRemove' : function(evt){
			var item = evt.getItem(),
				index = evt.getIndex();

//				this._updateItemParent(index, null);

			this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, item, this._transition, index));

			if(this._active == item){
				var ln;

				if(this._current_index){
					this.setActiveIndex(this._current_index - 1);
				}
				else if(ln = this.numElms()){
					this.setActiveIndex(ln - 1);
				}
				else{
					this._unload(this._active);

					this._active = null;
					this._current_index = -1;
				}
			}
			else{
				if(this._prev_active == item){
					this._prev_active = null;
				}

				this._current_index = this.indexOfElm(this._active);
			}
		},

		'_onItemReplace' : function(evt){
			var item = evt.getItem(),
				index = evt.getIndex();

//				this._updateItemParent(item);
//				this._updateItemParent(evt.getOldItem(), null);

			this.dispatchEvent(new OjStackEvent(OjStackEvent.REPLACE, item, this._transition, index));

			if(this._activeIndex == index){
				// remove the old active
				this._removeActive();

				// add the new active
				this._addActive(this._active = item);
			}
		},


		'setController' : function(val){
			if(this._controller == val){
				return;
			}

			this._controller = val;

			// update the items in this stack with the latest
			if(this._active){
				this._active.setController(val);
			}
		}
	},
	{
		'_TAGS' : ['navstack']
	}
);


OJ.extendComponent(
	OjNavController, 'OjTabNavController',
	{
		'_prev_active' : null,


		'_addViewButton' : function(view, index){
			var btn = new OjButton(view.getShortTitle(), view.getIcon());
			btn.setVAlign(OjStyleElement.TOP);
			btn.addEventListener(OjMouseEvent.CLICK, this, '_onTabClick');

			this.addChildAt(btn, index);
		},

		'_processDomSourceChildren' : function(dom, context){
			return;
		},

		'_removeViewButton' : function(view, index){
			OJ.destroy(this.removeElmAt(index));
		},

		'_updateActiveBtn' : function(){
//			if(this._prev_active){
//				this._prev_active.setIsActive(false);
//			}
//
//			(this._prev_active = this.getChildAt(this._stack.getActiveIndex())).setIsActive(true);
		},

		// event listener callbacks
		'_onStackChange' : function(evt){

		},

		'_onStackViewAdd' : function(evt){
			this._addViewButton(evt.getView(), evt.getIndex());
		},

		'_onStackViewMove' : function(evt){

		},

		'_onStackViewRemove' : function(evt){
			this._removeViewButton(evt.getView(), evt.getIndex());
		},

		'_onStackViewReplace' : function(evt){

		},

		'_onTabClick' : function(evt){
			this._stack.setActiveIndex(this.indexOfChild(evt.getCurrentTarget()));

			this._updateActiveBtn();
		},

		// getter & setters
		'setStack' : function(stack){
			if(this._stack == stack){
				return;
			}

			var ln;

			if(this._stack){
				this._stack.removeEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
				this._stack.removeEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
				this._stack.removeEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
				this._stack.removeEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');

				// remove all the tabs
				ln = this.numElms();

				for(; ln--;){
					this._removeViewButton(this._stack.getElmAt(ln), ln);
				}
			}

			this._super('OjTabNavController', 'setStack', arguments);

			if(stack){
				stack.addEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
				stack.addEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
				stack.addEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
				stack.addEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');

				// process the stack
				ln = stack.numElms();

				for(; ln--;){
					this._addViewButton(stack.getElmAt(ln), 0);
				}

				this._updateActiveBtn();
			}
		}
	},
	{
		'_TAGS' : ['tabnav']
	}
);

OJ.extendClass(
	OjUrlLoader, 'OjRpc',
	{
		'_props_' : {
			'method' : null,
			'params' : null
		},

		'_get_props_' : {
			'id' : null
		},


		'_constructor' : function(url, method, params/*, content_type, async*/){
			this._super('OjRpc', '_constructor', []);

			var args = arguments,
				ln = args.length;

			this.setContentType(ln > 3 ? args[3] : OjRpc.JSON);

			this.setRequest(
				new OjUrlRequest(
					url,
					{
						'id'        : this._id = OjRpc.guid(),
						'method'    : method,
						'params'    : Array.array(params)
					},
					this._contentType,
					OjUrlRequest.POST
				)
			);

			if(ln > 4){
				this.setAsync(args[4]);
			}
		},

		'load' : function(){
			return this._super('OjRpc', 'load', []);
		},


		'getRequest' : function(){
			// todo: add clone request for getRequest() func
			return this._request;
		},

		'setMethod' : function(val){
			if(this._method == val){
				return;
			}

			this._request.getData().method = (this._method = val);
		},

		'setParams' : function(val){
			if(this._params == val){
				return;
			}

			this._request.getData().params = (this._params = val);
		}
	},
	{
		'guid' : function(){
			return OJ._guid++;
		}
	}
);


OJ.extendManager(
	'CacheManager', OjActionable, 'OjCacheManager',
	{
		// lifespans
		'MINUTE'  : 60,
		'HOUR'    : 3600,
		'DAY'     : 86400,
		'WEEK'    : 604800,
		'MONTH'   : 2419200,
		'YEAR'    : 29030400,
		'FOREVER' : 0,


		'_cache_size' : 0,  '_localStorage' : null,  '_policies' : null,

		'_getCached' : null,  '_setCached' : null,  '_unsetCached' : null,


		'_constructor' : function(){
			this._super('OjCacheManager', '_constructor', arguments);

			// check to see if local storage is supported
			try{
				this._localStorage = 'localStorage' in window && !isNull(window['localStorage']) ? window.localStorage : null;
			}
			catch(exception){
				// we don't need to do anything here since this was just to check for local storage support
			}

			// determine which set of functions to use based on the systems capabilities
			if(this._localStorage){
				this.getData   = this.getLocalData;
				this.setData   = this.setLocalData;
				this.unsetData = this.unsetLocalData;
			}
			else{
				this.getData   = this.getCookie;
				this.setData   = this.setCookie;
				this.unsetData = this.unsetCookie;
			}

			// setup vars
			this._policies = {};
		},


		// Caching Method Functions
		'_getCookie' : function(key){
			var cookies = ';' + document.cookie;
			var index = cookies.indexOf(';' + key + '=');

			if(index == -1 || isEmpty(key)){
				return undefined;
			}

			var index2 = cookies.indexOf(';', index + 1);

			if(index2 == -1){
				index2 = theCookie.length;
			}

			return this._getData(decodeURIComponent(cookies.substring(index + key.length + 2, index2)));
		},

		'_getData' : function(raw_data){
			var data;

			if(!raw_data || !(data = raw_data.parseJson())){
				return null;
			}

			if(isObject(data)){
				var type = data['_class_name'];

				if(
					isUndefined(type) ||
						(!isNull(type) && type != 'undefined' && type != 'boolean' && type != 'number' && type != 'string')
				){
					return OjObject.importData(data);
				}

				if(!type){
					return null;
				}

				if(type == 'undefined'){
					return undefined;
				}

				return data['value'];
			}

			return data;
		},

		'_getLocalData' : function(key){
			return this._getData(this._localStorage.getItem(key));
		},

		'_isDataExpired' : function(data){
			var exp;

			// if this is a cache object and then make sure it hasn't expired
			if(
				isObjective(data) && data.is('OjCacheObject') &&
				(exp = data.getExpiration()) && exp < new Date()
			){
				return true;
			}

			return false;
		},

		'_setCookie' : function(key, data){
			var expires = new Date();
			var lifespan = arguments.length > 2 ? arguments[2] : this.FOREVER;

			if(isNull(lifespan) || lifespan == 0){
				lifespan = this.YEAR; // 1 year = forever
			}

			expires.setTime((new Date()).getTime() + lifespan);

			document.cookie = key + '=' + encodeURIComponent(this._setData(data)) + ';expires=' + expires.toGMTString();
		},

		'_setData' : function(data){
			if(isObject(data)){
				data = isObjective(data) ? data.exportData() : OjObject.exportData(data);
			}
			else{
				data = {
					'_class_name' : typeof data,
					'value'       : data
				};
			}

			return toJson(data);
		},

		'_setLocalData' : function(key, data){
			this._localStorage[key] = this._setData(data);
		},


		// UrlRequest Caching Functions
		'getCacheUrlRequestData' : function(url){
			if(isEmpty(url = url.toString())){
				return null;
			}

			return this.getData(url);
		},

		'getCacheUrlRequestPolicy' : function(url){
			if(isEmpty(url = url.toString())){
				return null;
			}

			var key;

			for(key in this._policies){
				if(url.match(key)){
					return this._policies[key];
				}
			}

			return null;
		},

		'setCacheUrlRequestData' : function(url, data/*, policy*/){
			if(isEmpty(url = url.toString())){
				return null;
			}

			var policy = arguments.length > 2 ? arguments[2] : this.getCacheUrlRequestPolicy(url);

			CacheManager.setData(url, data, policy ? policy.getLifespan() : null);
		},

		'setCacheUrlRequestPolicy' : function(policy){
			this._policies[policy.getUrl().replace(/\*/g, '[^ ]*')] = policy;
		},

		'unsetCacheUrlRequestPolicy' : function(policy/*|url*/){
			var url;

			if(isObjective(policy) && policy.is('OjCachePolicy')){
				url = policy.getUrl().toString();
			}
			else{
				url = policy.toString();
			}

			try{
				delete this._policies[url.replace(/\*/g, '[^ ]*')];
			}
			catch(e){}
		},

		'unsetCacheUrlRequestData' : function(url){
			CacheManager.unsetData(url);
		},


		// Regular Data Caching Functions
		'getData' : function(key){
			throw new Error('No getData() defined.');

			return;

//					var data = ;
//
//					if(!data){
//						return null;
//					}
//
//					if(isObject(data)){
//						data = OjObject.importData(data);
//
//						return data.getData();
//					}

			var data = this._getCachedData(key);

			return data ? data.getData() : null;
		},

		'setData' : function(key, value/*, lifespan*/){
			throw new Error('No setData() defined.');

			return;

			this._setCachedData(key, this._setData.apply(this, [].slice.call(arguments, 1)));
		},

		'unsetData' : function(key){
			throw new Error('No unsetData() defined.');
		},


		// Cookie Caching Functions
		'getCookie' : function(key){
			var data = this._getCookie(key);

			return data ? data.getData() : null;
		},

		'setCookie' : function(key, value/*, lifespan*/){
			var ln = arguments.length;

			this._setCookie(key, new OjCacheObject(value, ln > 2 ? arguments[2] : null));
		},

		'unsetCookie' : function(key){
			document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		},


		// LocalData Caching Functions
		'getLocalData' : function(key){
			var data = this._getLocalData(key);

			if(this._isDataExpired(data)){
				this.unsetLocalData(key);

				return null;
			}

			return data ? data.getData() : null;
		},

		'setLocalData' : function(key, value/*, lifespan*/){
			var args = arguments,
				ln = args.length;

			this._setLocalData(key, new OjCacheObject(value, ln > 2 ? args[2] : null));
		},

		'unsetLocalData' : function(key){
			delete this._localStorage[key];
		}
	}
);



OJ.extendClass(
	OjComponent, 'OjAlert',
	{
		'_props_' : {
			'buttons'      : null,
			'content'      : null,
			'selfDestruct' : 0, // OjAlert.NONE
			'title'        : null
		},

		'_template' : 'oj.window.OjAlert',


		'_constructor' : function(/*content, title, buttons, cancel_label*/){
			this._super('OjAlert', '_constructor', []);

			// setup the display
			if(this.className().indexOf('Alert') > -1){
				this.buttons.addChild(this.cancelBtn = new OjButton('Ok'));

				this.cancelBtn.addEventListener(OjMouseEvent.CLICK, this, '_onCancelClick');
			}

			// process the arguments
			var args = arguments,
				ln = args.length;

			if(ln){
				this.setContent(args[0]);

				if(ln > 1){
					this.setTitle(args[1]);

					if(ln > 2){
						this.setButtons(args[2]);

						if(ln > 3){
							this.cancelBtn.setLabel(args[3]);
						}
						else{
							this.cancelBtn.setLabel('Cancel');
						}
					}
				}
			}
		},

		'_destructor' : function(/*depth = 1*/){
			var args = arguments,
				depth = args.length ? args[0] : 0;

			if(!depth){
				// remove all the content so it doesn't get destroyed
				this.container.removeAllChildren();
			}

			return this._super('OjAlert', '_destructor', arguments);
		},


		'_onButtonClick' : function(evt){
			this.dispatchEvent(
				new OjAlertEvent(
					OjAlertEvent.BUTTON_CLICK,
					this.buttons.indexOfChild(evt.getCurrentTarget())
				)
			);

			WindowManager.hide(this);
		},

		'_onCancelClick' : function(evt){
			this.cancel();
		},


		'cancel' : function(){
			this.dispatchEvent(new OjEvent(OjEvent.CANCEL));

			WindowManager.hide(this);
		},

		'hideButtons' : function(){
			this.addCss(['no-buttons']);

			this.buttons.hide();
		},

		'showButtons' : function(){
			this.removeCss(['no-buttons']);

			this.buttons.show();
		},


		'getButtons' : function(){
			return this._buttons.clone();
		},
		'setButtons' : function(buttons){
			this._buttons = buttons ? buttons.clone() : [];

			var num_btns = this._buttons.length;
			var ln = this.buttons.numChildren() - 1;
			var diff = num_btns - ln, btn;

			if(diff > 0){
				while(diff > 0){
					this.buttons.addChildAt(btn = new OjButton(this._buttons[num_btns - (diff--)]), ln + 1);

					btn.addEventListener(OjMouseEvent.CLICK, this, '_onButtonClick');
				}
			}
			else if(diff < 0){
				while(diff++ < 0){
					OJ.destroy(this.buttons.getChildAt(--ln - 1));
				}
			}

			for(; ln-- > 1;){
				btn = this.buttons.getChildAt(ln);

				btn.setLabel(this._buttons[ln]);
			}
		},

		'getCancelLabel' : function(){
			return this.cancelBtn.getLabel();
		},
		'setCancelLabel' : function(label){
			return this.cancelBtn.setLabel(label);
		},

		'setContent' : function(content){
			if(this._content == content){
				return;
			}

			this.container.removeAllChildren();

			this._content = content;

			if(isString(content)){
				this.container.setText(content.replaceAll('\n', '<br />'));
			}
			else{
				this.container.addChild(content);
			}
		},

		'setTitle' : function(title){
			if(this._title == title){
				return;
			}

			this.bar.setText(this._title = title);
		},

		'getPaneHeight' : function(){
			return this.pane.getHeight();
		},
		'setPaneHeight' : function(val/*, unit*/){
			this.pane.setHeight.apply(this.pane, arguments);

			if(this._is_displayed){
				WindowManager.position(this);
			}
		},

		'getPaneWidth' : function(){
			return this.pane.getWidth();
		},
		'setPaneWidth' : function(val/*, unit*/){
			this.pane.setWidth.apply(this.pane, arguments);

			if(this._is_displayed){
				WindowManager.position(this);
			}
		}
	},
	{
		'NONE' : 0,
		'SHALLOW' : 1,
		'DEEP' : 2
	}
);