'use strict';


/**
 * OJ Core Package
 */
window.OJ = function Oj(){
	return {
		'_analytics' : null,  '_browser' : null,  '_browser_version' : null,  '_compiled_theme_path' : null,  '_css_prefix'  : null,

		'_engine' : null,  '_events' : [],  '_guid' : 85,  '_is_landscape' : true,  '_is_mobile' : false,  '_is_ready' : false,

		'_is_supported' : true,  '_is_tablet' : false,  '_is_touch_capable' : false,  '_library' : null,  '_loaded' : {},

		'_metadata' : null,  '_metas' : null,  '_os' : null,  '_protocol' : 'http', '_root' : null,

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

		'_theme_elm' : null,    '_tween' : null,

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

		'addCss' : function(css/*, is_path*/){
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
		'addJs' : function(js/*, is_path*/){
			var is_path = arguments.length > 1 ? arguments[1] : false;

			try{
				if(this._('mode') != this.LOADING){
					var elm = document.createElement('script');
					elm.setAttribute('type', 'text/javascript');
					elm.setAttribute('language', 'javascript');

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
						elm = this.addCss(this._library.load(css_path));
					}
					else if(isFunction(document.createStyleSheet)){
						elm = document.createStyleSheet(css_path);
					}
					else{
						elm = this.addCss(css_path, true);
					}

					this._library.setAsset(css_path, true);
				}

				return elm;
			}

			if(!this._loaded[css_path]){
				this._loaded[css_path] = true;

				return this.addCss(css_path, true);
			}

			return null;
		},

		'importJs' : function(path/*, data*/){
			var js_path = this._getJsImportPath(path);

			if(this._library){
				var was_loaded = this._library.isLoaded(js_path);

				if(!was_loaded){
					if(this._('lazyLoad') && this._protocol != this.FILE){
						this.addJs(arguments.length > 1 ? arguments[1] : this._library.load(js_path));
					}
					else{
						this.addJs(js_path, true);
					}

					this._library.setAsset(js_path, true);
				}

				return arguments.length > 1 ? arguments[1] : this._library.load(js_path);
			}

			if(!this._loaded[js_path]){
				this._loaded[js_path] = true;

				this.addJs(js_path, true);
			}
		},

		'importTemplate' : function(path/*, data*/){
			var template_path = this._getTemplateImportPath(path);
			var was_loaded = this._library.isLoaded(template_path);
			var template_data = arguments.length > 1 ? arguments[1] : this._library.load(template_path);

			this._library.setAsset(template_path, template_data);

			return template_data;
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

		'makeRect' : function(x, y, width, height){
			var rect = {
				'top'       : y,
				'left'      : x,
				'width'     : width,
				'height'    : height
			};

			rect.bottom = rect.top + rect.height;
			rect.right = rect.left + rect.width;

			return rect;
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
				this.renderer.dom().appendChild(isObjective(elm) ? elm.dom() : elm);
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
			if(this._('mode') == this.LOADING || this._protocol == this.FILE){
				return '';
			}

			return '?v=' + this._('version');
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
			for(var i = 0; i < data.length; i++){
				var dataString = data[i].string;
				var dataProp = data[i].prop;

				this.versionSearchString = data[i].versionSearch || data[i].identity;

				if(dataString){
					if(dataString.indexOf(data[i].subString) != -1){
						return data[i].identity;
					}
				}
				else if(dataProp){
					return data[i].identity;
				}
			}
		},

		'version' : function(str){
			var index = str.indexOf(this.versionSearchString);

			if(index == -1){
				return;
			}

			return str.substring(index + this.versionSearchString.length + 1).split(' ')[0];
		}
	};

	OJ._browser = detector.search([
		{
			'string' : navigator.userAgent,
			'subString' : 'Chrome',
			'identity' : 'Chrome'
		},
		{
			'string' : navigator.userAgent,
			'subString' : 'OmniWeb',
			'versionSearch' : 'OmniWeb/',
			'identity' : 'OmniWeb'
		},
		{
			'string' : navigator.vendor,
			'subString' : 'Apple',
			'identity' : 'Safari',
			'versionSearch' : 'Version'
		},
		{
			'prop' : window.opera,
			'identity' : 'Opera',
			'versionSearch' : 'Version'
		},
		{
			'string' : navigator.vendor,
			'subString' : 'iCab',
			'identity' : 'iCab'
		},
		{
			'string' : navigator.vendor,
			'subString' : 'KDE',
			'identity' : 'Konqueror'
		},
		{
			'string' : navigator.userAgent,
			'subString' : 'Firefox',
			'identity' : 'Firefox'
		},
		{
			'string' : navigator.vendor,
			'subString' : 'Camino',
			'identity' : 'Camino'
		},
		{
			// for newer Netscapes (6+)
			'string' : navigator.userAgent,
			'subString' : 'Netscape',
			'identity' : 'Netscape'
		},
		{
			'string' : navigator.userAgent,
			'subString' : 'MSIE',
			'identity' : 'Internet Explorer',
			'versionSearch' : 'MSIE'
		},
		{
			'string' : navigator.userAgent,
			'subString' : 'Gecko',
			'identity' : 'Mozilla',
			'versionSearch' : 'rv'
		},
		{
			// for older Netscapes (4-)
			'string' : navigator.userAgent,
			'subString' : 'Mozilla',
			'identity' : 'Netscape',
			'versionSearch' : 'Mozilla'
		}
	]) || null;

	OJ._browser_version = detector.version(navigator.userAgent) || detector.version(navigator.appVersion);

	// detect OS
	var platform = navigator.platform.substring(0, 3).toLowerCase();

	if(platform == 'and'){
		OJ._os = OJ.ANDROID;
		OJ._is_mobile = (navigator.userAgent.indexOf('Mobile') > -1);
		OJ._is_tablet = !OJ._is_mobile;
		OJ._is_touch_capable = true;
	}
	else if(platform == 'iph' || platform == 'ipa' || platform == 'ipo'){
		OJ._os = OJ.IOS;
		OJ._is_mobile = (platform != 'ipa');
		OJ._is_tablet = !OJ._is_mobile;
	}
	else{
		OJ._os = detector.search([
			{
				'string' : navigator.platform,
				'subString' : 'Win',
				'identity' : 'Windows'
			},
			{
				'string' : navigator.platform,
				'subString' : 'Mac',
				'identity' : 'OS X'
			},
			{
				'string' : navigator.platform,
				'subString' : 'Linux',
				'identity' : 'Linux'
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
			OJ._engine = OJ.WEBKIT;
			OJ._css_prefix = '-webkit-';
		break;

		case OJ.SAFARI:
			OJ._engine = OJ.WEBKIT;
			OJ._css_prefix = '-webkit-';
		break;
	}

	// setup browser event listeners
	window.onresize = function(){
		if(isFunction(OJ.addClasses)){
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

				OJ.addClasses('is-landscape');
				OJ.removeClasses('is-portrait');
			}
			else{
				OJ._is_landscape = false;

				OJ.addClasses('is-portrait');
				OJ.removeClasses('is-landscape');
			}

			OJ.dispatchEvent(new OjTransformEvent(OjTransformEvent.RESIZE, vp.top, vp.left, delta_x, delta_y));
		}
	};

	window.onscroll = function(evt){
		if(OJ){
			var vp = OJ._viewport;
			vp.top = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
			vp.left = window.pageXOffset ? window.pageXOffset : document.body.scrollLeft;
			vp.bottom = vp.top + vp.height;
			vp.right = vp.left + vp.width;
		}
	};
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
	else if(isObject(obj) && !isUndefined(obj.length)){
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
	return isSet(obj) && typeof obj === 'object' && !isArray(obj);
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
	return !isSet(obj) || obj == false || (isString(obj) && obj.trim() == '') || (isArray(obj) && obj.length == 0) || (isObject(obj) && isEmptyObject(obj));
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
	return !isNull(obj) && !isUndefined(obj);
}

function isTrue(obj){
	return !isFalse(obj);
}



/**
 * Framework Logging Functions
 */
function trace(obj/*, ...objs*/){
	if(OJ._('mode') != OJ.DEV){
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

OJ.importJs('oj.data.OjObject');

OJ.importJs('oj.utils.OjQueryString');
OJ.importJs('oj.utils.OjJson');

OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.events.OjEventManager');
OJ.importJs('oj.events.OjTextEvent');
OJ.importJs('oj.events.OjErrorEvent');

OJ.importJs('oj.net.OjUrl');
OJ.importJs('oj.net.OjUrlRequest');
OJ.importJs('oj.net.OjUrlLoader');

OJ.importJs('oj.utils.OjLibrary');


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
			ln = attrs.length;

		for(; ln--;){
			attr = attrs[ln].nodeName;

			// disregard the id or events
			if(attr == 'id' || attr.substr(0, 3) == 'on-'){
				continue;
			}

			// all other attrs are settings
			OJ.setting(OJ.attributeToFunc(attr), attrs[ln].nodeValue);

			target.removeAttribute(attr);
		}
	}

	// process the mode
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
	OJ.importJs('oj.dom.OjElement');
	OJ.importJs('oj.timer.OjTimerManager');
	OJ.importJs('oj.utils.OjHistoryManager');
	OJ.importJs('oj.window.OjWindowManager');
	OJ.importJs('oj.nav.OjView');
	OJ.importJs('oj.events.OjTransformEvent');
	OJ.importJs('oj.fx.OjFade');
	OJ.importJs('oj.fx.OjTweenSet');
	OJ.importJs('oj.components.OjSpinner');

	// create the OJ component
	var tmp = new OjView();

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

	tmp.addClasses('OJ');

	window.OJ = tmp;

	// dispatch load event
	OJ.dispatchEvent(new OjEvent(OjEvent.LOAD));

	// place OJ component in the DOM
	if(target){
		OJ._setDomSource(target, tmp);
	}
	else{
		document.body.appendChild(OJ.dom());
	}

	// setup the dom event proxy
	OJ._setProxy(document.body);

	// hack so that we can capture taps in iOS
	if(OJ._os == OJ.IOS){
		tmp.dom().onclick = function(){};
	}

	// setup the css classes for special displays
	window.onresize();
	window.onscroll();

	if(OJ.isMobile()){
		OJ.addClasses('is-mobile');
	}

	if(OJ.isTablet()){
		OJ.addClasses('is-tablet');
	}

	var scale = OJ.getPixelRatio();

	if(scale <= .75){
		OJ.addClasses('ld'); // low-density
	}
	else if(scale >= 1.5){
		OJ.addClasses('hd'); // high-density
	}
	else{
		OJ.addClasses('sd'); // standard-density
	}

	// set all the content as displayed
	OJ._setIsDisplayed(true);

	// check if browser is supported
	OJ._is_supported = !(
		(OJ.getBrowser() == OJ.IE && OJ.getBrowserVersion().compareVersion('9.0') < 0) ||
		(OJ.getBrowser() == OJ.FIREFOX && OJ.getBrowserVersion().compareVersion('2.0') < 0) ||
		(OJ.getBrowser() == OJ.CHROME && OJ.getBrowserVersion().compareVersion('4.0') < 0) ||
		(OJ.getBrowser() == OJ.SAFARI && OJ.getBrowserVersion().compareVersion('5.0') < 0) ||
		(OJ.getBrowser() == OJ.OPERA && OJ.getBrowserVersion().compareVersion('10.5') < 0)
	);

	// timeout offset to allow for css and stuff to settle
	// this is clearly a hack so deal with it
	setTimeout(window.onOjReady, 100);
}

// on oj ready event handler
function onOjReady(){
	// close up the loading group logs
	traceGroup();

	// run this init function if any
	traceGroup('Juicing the oranges.', true);

	var init = OJ._('init');

	if(init){
		init();
	}

	traceGroup();

	// dispatch the ready event
	traceGroup('Your OJ is ready. Enjoy!', true);

	OJ._is_ready = true;

	OJ.dispatchEvent(new OjEvent(OjEvent.READY));

	traceGroup();

	// detect if the browser is not supported
	if(!OJ.isSupported()){
		var alrt = WindowManager.makeAlert('UnSupported Browser', OJ._('supportMessage'));
		alrt.hideButtons();
		alrt.setPaneWidth(500);

		WindowManager.show(alrt);
	}
}