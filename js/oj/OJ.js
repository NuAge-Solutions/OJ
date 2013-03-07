'use strict';


/**
 * OJ Core Package
 */
if(!window.oj){
	window.oj = {};
}

window.oj.OJ = {
	'_browser' : null,  '_browser_version' : null,  '_compiled_theme_path' : null,  '_css_prefix'  : null,

	'_engine' : null,  '_events' : [],  '_is_landscape' : true,  '_is_mobile' : false,  '_is_ready' : false,

	'_is_tablet' : false,  '_is_touch_capable' : false,  '_library' : null,  '_loaded' : {},  '_metadata' : null,

	'_metas' : null,  '_os' : null,  '_protocol' : 'http', '_root' : null,

	'_settings' : {
		'assetsPath' : 'assets',

		'cssExt' : '.css',  'cssPath' : 'css',

		'dimUnit' : 'px',  'fontUnit' : 'px',  'init' : null,

		'jsPath' : 'js',  'jsExt' : '.js',  'lazyLoad' : true,  'mode' : 'loading',

		'separator' : '/',  'target' : null,  'theme' : 'oj',  'themePath' : 'themes',

		'tplPath' : 'templates',  'tplExt' : '.html',  'version' : '0.0.0',

		'waitForCss' : true
	},

	'_script_elm' : null,  '_theme_elm' : null,    '_tween' : null,

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
	'PRODUCTION'    : 'production',

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
	'UNIX'      : 'UNIX',
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
	'_getClassPath' : function(css){
		return css.replace(/\./g, this._s('separator'));
	},

	'_getCssImportPath' : function(path){
		if(path.indexOf('/') != -1){
			return path;
		}

		return this._root + this._s('cssPath') + this._s('separator') +
			this._getClassPath(path) + this._s('cssExt') + this.getVersionQuery();
	},

	'_getJsImportPath' : function(path){
		if(path.indexOf('/') != -1){
			return path;
		}

		return this._root + this._s('jsPath') + this._s('separator') +
			this._getClassPath(path) + this._s('jsExt') + this.getVersionQuery();
	},

	'_getTemplateImportPath' : function(path){
		if(path.indexOf('/') != -1){
			return path;
		}

		return this._root + this._s('tplPath') + this._s('separator') +
			this._getClassPath(path) + this._s('tplExt') + this.getVersionQuery();
	},

	'_handleEvent' : function(action, type, context, func){
		this._events.push({
			'action'  : action,
			'type'    : type,
			'context' : context,
			'func'    : func
		});
	},

	'_s' : function(key){
		return this._settings[key];
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
			if(this._s('mode') != this.LOADING){
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

				return;
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

	'compileComponent' : function(class_name, proto/*, statics*/){
		var cls = this.compileClass.apply(this, arguments);

		var tags = cls.SUPPORTED_TAGS,
			ln = tags.length;

		// register class name as tag
		OjElement.registerComponentTag(class_name.toLowerCase(), class_name);

		// register special tags
		for(; ln--;){
			OjElement.registerComponentTag(tags[ln], class_name);
		}

		return cls;
	},

	'compileClass' : function(class_name, proto/*, statics*/){
		var key, constructor, statics;

		eval(
			'constructor = window[class_name] = function ' + class_name +
				'(){ this._constructor.apply(this, arguments); };'
		);

		// process static functions and variables
		if(arguments.length > 2 && (statics = arguments[2])){
			for(key in statics){
				constructor[key] = statics[key];
			}
		}

		// setup the prototype and constructor for the class
		(constructor.prototype = new proto()).constructor = constructor

		if(statics){
			for(key in statics){
				constructor[key] = statics[key];
			}
		}

		return constructor;
	},

	'compileManager' : function(manager, proto){
		var prev_manager = window[manager];

		return (window[manager] = new proto())._constructor(prev_manager);
	},

	'destroy' : function(obj/*, recursive = false*/){
		if(obj && isFunction(obj._destructor)){
			obj._destructor(arguments.length > 1 ? arguments[1] : false);
		}

		return obj = null;
	},

	'elm' : function(elm){
		return OjElement.element(elm);
	},

	'guid' : function(){
		return oj.utils.guid.apply(oj.utils, arguments);
	},

	'implementsClass' : function(def/*, intrfc1, intrfc2, ...*/){
		var i, key, intrfc, ln = arguments.length;

		for(i = 1; i < ln; i++){
			intrfc = arguments[i];

			for(key in intrfc){
				if(isUndefined(def[key])){
					def[key] = intrfc[key];
				}
				// if this is properties and they are already defined then we handle them differently
				else if(key == '_properties_' || key =='_get_properties_' || key == '_set_properties_'){
					OJ.implementsClass(def[key], intrfc[key]);
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
					this._s('lazyLoad') && this._protocol != this.FILE &&
					(this._s('waitForCss') || (ln > 2 && arguments[2]))
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
				this.stringToVar(path);

				if(this._s('lazyLoad') && this._protocol != this.FILE){
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
			this.stringToVar(path);

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

	'open' : function(url/*, target*/){
		if(arguments.length > 1){
			var target = arguments[1];

			if(target != '_blank'){
				// do something here not sure what
			}

			window.open(url.toString(), target);
		}
		else{
			// the toString in case it is a url object and not a string
			url = url.toString();

			// if the url is the same minus the hash and their is no hash
			// then we force a hash to prevent a reload
			if(window.location.href.indexOf(url) != -1 && url.indexOf('#') == -1){
				url += '#';
			}

			window.location.href = url;
		}
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

	'render' : function(dom_elm){
		if(this.renderer){
			this.renderer.dom().appendChild(dom_elm);
		}
	},

	'setting' : function(key/*, val*/){
		if(arguments.length == 1){
			return this._settings[key];
		}

		var val = arguments[1];

		if(key == 'theme'){
			var sep = this._s('separator'),
				old_path = this._compiled_theme_path,
				path = this._root + this._s('themePath') + sep + val + this._s('cssExt') + this.getVersionQuery();

			// check for change
			if(path.indexOf(old_path) > -1){
				return;
			}

			var elms = document.getElementsByTagName('link'), ln = elms.length;

			this._compiled_theme_path = this._root + this._s('themePath') + sep + val + sep;

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
	'getAssetPath' : function(path){
		return this._root + this._s('assetsPath') + this._s('separator') + path + this.getVersionQuery();
	},

	'getBrowser' : function(){
		return this._browser;
	},

	'getCssPrefix' : function(){
		return this._css_prefix;
	},

	'getEngine' : function(){
		return this._engine;
	},

	'getOs' : function(){
		return this._os;
	},

	'getProtocol' : function(){
		return this._protocol;
	},

	'getRoot' : function(){
		return this._root;
	},
	'setRoot' : function(root){
		this._root = isEmpty(root) && this._protocol == this.FILE ? '' : (root + this._s('separator'));
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
		if(this._s('mode') == this.LOADING || this._protocol == this.FILE){
			return '';
		}

		return '?v=' + this._s('version');
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
};

window.oj.utils = {
	'_guid' : 85,

	'guid' : function(){
		return (arguments.length ? arguments[0]._class_name : 'func') + '_' + oj.utils._guid++;
	}
};




/**
 * Framework Setup
 */
(function(){
	// init functionality
	window.OJ = window.oj.OJ;

	// detect script element
	var script_elms = document.getElementsByTagName('script');
	var ln = script_elms.length;

	for(; ln--;){
		if(script_elms[ln].src.toLowerCase().indexOf('/oj.js') != -1){
			OJ._script_elm = script_elms[ln];

			break;
		}
	}

	// detect the root
	var path = OJ._script_elm.getAttribute('src').split('?')[0];

	OJ.setRoot(path.split('/').slice(0, -3).join('/'));

	// detect file mode
	var protocol_index = OJ._script_elm.src.indexOf('://');

	if(protocol_index > -1){
		OJ._protocol = OJ._script_elm.src.substring(0, protocol_index);
	}
	else{
		OJ._protocol = window.location.protocol.substring(-1);
	}

	// detect OS
	var platform = navigator.platform.substring(0, 3).toLowerCase();

	if(platform == 'and'){
		OJ._os = OJ.ANDROID;
		OJ._is_mobile = true;
		OJ._is_touch_capable = true;
	}
	else if(platform == 'iph' || platform == 'ipa' || platform == 'ipo'){
		OJ._os = OJ.IOS;
		OJ._is_mobile = (platform != 'ipa');
		OJ._is_tablet = !OJ._is_mobile;
	}
	else if(platform == 'mac'){
		OJ._os = OJ.OSX;
	}
	else if(platform == 'win'){
		OJ._os = OJ.WINDOWS;
	}

	if(!OJ._is_touch_capable){
		OJ._is_touch_capable = 'ontouchstart' in window;
	}

	var agent = navigator.userAgent.toLowerCase();

	if(agent.indexOf('firefox') > -1){
		OJ._browser = OJ.FIREFOX;
		OJ._engine = OJ.GECKO;
		OJ._css_prefix = '-moz-';
	}
	else if(agent.indexOf('msie') > -1){
		OJ._browser = OJ.IE;
		OJ._browser_version = parseFloat(navigator.appVersion.match(/MSIE ([\d.]+)/)[1]);
		OJ._engine = OJ.TRIDENT;
		OJ._css_prefix = '-ms-';
	}
	else if(agent.indexOf('chrome') > -1){
		OJ._browser = OJ.CHROME;
		OJ._engine = OJ.WEBKIT;
		OJ._css_prefix = '-webkit-';
	}
	else if(agent.indexOf('safari') > -1 || agent.indexOf('applewebkit') > -1){
		OJ._browser = OJ.SAFARI;
		OJ._engine = OJ.WEBKIT;
		OJ._css_prefix = '-webkit-';
	}

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
		return toString.call(obj) === '[object Array]';
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

		for(; from < len; from++){
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

String.prototype.count = function(needle){
	return (this.match(new RegExp(needle.regexEscape(), 'g')) || []).length;
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
	if(OJ._s('mode') == OJ.PRODUCTION){
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

if(!isSet(console.groupLog) || !isFunction(console.groupLog)){
	console.groupLog = function(){
		// do something not sure what
	};
}




/*
 * Framework Load
 */
traceGroup('Picking the oranges.', true);

OJ.importJs('oj.data.Object');

OJ.importJs('oj.utils.QueryString');
OJ.importJs('oj.utils.Json');

OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.events.EventManager');
OJ.importJs('oj.events.TextEvent');
OJ.importJs('oj.events.ErrorEvent');

OJ.importJs('oj.net.Url');
OJ.importJs('oj.net.UrlRequest');
OJ.importJs('oj.net.UrlLoader');

OJ.importJs('oj.utils.Library');


// on dom ready event handler
function onDomReady(){
	var key, lib = {};

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

	if(OJ._s('mode') == OJ.LOADING){
		OJ.setting('mode', OJ.PRODUCTION);
	}

	for(key in OJ._loaded){
		lib[key + OJ.getVersionQuery()] = true;
	}

	OJ._library = new OjLibrary(OJ._loaded = lib);

	OJ.importJs('oj.dom.Element');
	OJ.importJs('oj.timer.TimerManager');
	OJ.importJs('oj.utils.HistoryManager');
	OJ.importJs('oj.modal.ModalManager');
	OJ.importJs('oj.components.View');
	OJ.importJs('oj.events.TransformEvent');
	OJ.importJs('oj.fx.Fade');
	OJ.importJs('oj.fx.TweenSet');
	OJ.importJs('oj.components.Spinner');

	var tmp = new OjView();

	// add the loading spinner
	tmp.addChildAt(tmp.loading = new OjSpinner(), 0);
	tmp.loading.addClasses('loading');

	// add the rendering div
	tmp.addChildAt(tmp.renderer = new OjStyleElement('<div class="renderer"></div>'), 0);

	if(OJ._os == OJ.IOS){
		tmp.dom().onclick = function(){};
	}

	if(OJ._target){
		var target = OJ.byId(OJ._target);

		if(target == document.body){
			document.body.appendChild(tmp.dom());
		}
		else{
			target.parentNode.replaceChild(tmp.dom(), target);
		}
	}
	else{
		document.body.appendChild(tmp.dom());
	}

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

	// merge oj with new style element
	tmp.bulkSet(OJ);

	tmp.addClasses('OJ');

	window.OJ = tmp;

	// setup the dom event proxy
	OJ._setProxy(document.body);

	// setup the css classes for special displays
	window.onresize();
	window.onscroll();

	if(OJ.isMobile()){
		OJ.addClasses('is-mobile');
	}

	if(OJ.isTablet()){
		OJ.addClasses('is-tablet');
	}

	OJ.container.setAlpha(0);
	OJ._setIsDisplayed(true);

	// for touch devices do something special
	if(OJ._is_touch_capable){
//		document.addEventListener('touchstart', OJ._onTouchEvent, true);
//		document.addEventListener('touchmove', OJ._onTouchEvent, true);
//		document.addEventListener('touchend', OJ._onTouchEvent, true);
//		document.addEventListener('touchcancel', OJ._onTouchEvent, true);
	}

	// timeout offset to allow for css and stuff to settle
	// this is clearly a hack so deal with it
	setTimeout(window.onOjReady, 100);

	tmp = target = null;
}

// on oj ready event handler
function onOjReady(){
	OJ._is_ready = true;

	traceGroup();

	traceGroup('Juicing the oranges.', true);

	var init = OJ._s('init');

	if(init){
		init();
	}

	traceGroup();

	traceGroup('Your OJ is ready. Enjoy!', true);

	// remove the loading spinner
	OJ._unset('loading');

	// show the content
	OJ.container.setAlpha(1);
	OJ.container.show();

	traceGroup();

	OJ.dispatchEvent(new OjEvent(OjEvent.READY));
}