'use strict';

/**
 * OJ Core Package
 */
window.OJ = function Oj(){
	return {
//		'_analytics' : null,  '_browser' : null,  '_browser_version' : null,  '_compiled_theme_path' : null,  '_css_prefix'  : null,
//
//		'_engine' : null,  '_library' : null,  '_metadata' : null,  '_metas' : null,  '_os' : null,
//    '_root' : null,  '_theme_elm' : null,    '_tween' : null,
		'_events' : [],  '_guid' : 85,  '_is_landscape' : true,  '_is_mobile' : false,  '_is_ready' : false,
		'_is_supported' : true,  '_is_tablet' : false,  '_is_touch_capable' : false,  '_is_webview' : false,  '_loaded' : {},
		'_packages' : {},  '_protocol' : 'http',  '_os_version' : '',
		'_settings' : {
			'cssExt' : '.css',  'dimUnit' : 'px',  'fontUnit' : 'px',
			'init' : null,  'jsExt' : '.js',  'mode' : 'loading',  'target' : '#OJ',
      'theme' : null,  'version' : '0.0.0',  'waitForCss' : true,
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
    '_getModeSuffix' : function(){
      return this._('mode') == this.DEV ? '-dev' : '';
    },
		'_getTemplateImportPath' : function(path){
			if(path.indexOf('/') != -1){
				return path;
			}
			return this._root + this._getClassPath(this._('tplPath'), path, this._('tplExt')) + this.getVersionQuery();
		},
		'_getThemePath' : function(path){
			if(!path || path.indexOf('/') != -1){
				return path;
			}
			var parts = path.split('.');
      if(parts.length == 1){
        parts.push(path);
      }
      parts.splice(1, 0, 'themes');
			return this._root + parts.join('/') + this._getModeSuffix() + this._('cssExt') + this.getVersionQuery();
		},
		'_handleEvent' : function(action, type, context, func){
			this._events.push({
				'action'  : action,
				'type'    : type,
				'context' : context,
				'func'    : func
			});
		},

		// public functions
		'addEventListener' : function(type, context, func){
      this._handleEvent('add', type, context, func);
    },
		'loadCss' : function(css/*, is_path=false, async=true*/){
			var elm, head;
      // check to see if the value is a path
			if(arguments.length > 1 && arguments[1]){
        elm = document.createElement('link');
        elm.setAttribute('rel', 'stylesheet');
        elm.setAttribute('type','text/css');
        elm.setAttribute('href', css);
			}
      // check to see if we have any css data
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
      // add the css element to the head
			head = document.getElementsByTagName('head')[0];
      // if we have a theme elm then we want to insert the css before the theme elm
      // so that it doesn't override the theme css
			if(this._theme_elm){
				head.insertBefore(elm, this._theme_elm);
			}
      // otherwise just add it to the end of the head
			else{
				head.appendChild(elm);
			}
			return elm;
		},
		// dynamically add js to page
		'loadJs' : function(js/*, is_path=true, async=true*/){
			var args = arguments,
				ln = args.length,
				is_path = ln > 1 ? args[1] : true,
				is_async = ln > 2 ? args[2] : true;
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
			catch(e){
        // ignore the error and load the js the old fashion way
      }
			if(is_path){
				document.write('<scri' + 'pt type="text/javascript" language="javascript" src="' + js + '"></scr' + 'ipt>');
			}
			else{
				eval(js);
			}
		},
    'loadPackage' : function(pkg){
      // check to see if this package is already loaded
      if(this._packages[pkg]){
        return;
      }
      // calculate what to load
      var pkg_path = pkg.split('.');
      if(pkg_path.length > 1){
        pkg_path.splice(1, 0, 'packages');
      }
      // create an empty record so we know not to load this package again
      var data = this._packages[pkg] = {
        'loaded' : false,
        'path' : this._root + '/' + pkg_path.join('/')
      };
      this.loadCss(data.path + '/main' + this._getModeSuffix() + this._('cssExt') + this.getVersionQuery(), true);
      this.loadJs(data.path + '/main' + this._getModeSuffix() + this._('jsExt') + this.getVersionQuery(), true);
    },
    'registerPackage' : function(pkg, ns){
      var data = this._packages[pkg];
      data.namespace = ns;
      data.loaded = true;
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

    'defineClass' : function(ns, def/*, static_def*/){
      eval('window[ns] = function ' + ns + '(){' + (def['_constructor'] ? 'this._constructor.apply(this, arguments);' : '') + '};');
      def._class_names = [def._class_name = ns];
      window[ns].prototype = def;
      if(arguments.length > 2){
        var statics = arguments[2],
            key;
        for(key in statics){
					window[ns][key] = statics[key];
				}
      }
      return window[ns];
    },
    'definePackage' : function(ns, def/*, parents=[OjPackage]*/){
      var cls = this.extendClass(ns, arguments.length > 2 ? arguments[2] : [OjPackage], def),
          pkg = new cls();
      window[ns.toUpperCase()] = pkg;
      OJ.addEventListener(OjEvent.LOAD, pkg, '_onOjLoad');
      OJ.addEventListener(OjEvent.READY, pkg, '_onOjReady');
    },
		'extendClass' : function(ns, parents, def/*, static_def*/){
			// setup our vars & prototype
			var key, parent,
        props = {'_props_' : null, '_get_props_' : null, '_set_props_' : null},
        ln = parents.length,
				proto = {
          '_constructor' : true
        },
        c = OJ.defineClass(ns, proto);
			// copy the base class statics
			for(; ln--;){
				parent = parents[ln];
				for(key in parent){
					c[key] = parent[key];
				}
			}
			// add new statics
			if(arguments.length > 3){
				var statics = arguments[3];
				for(key in statics){
					c[key] = statics[key];
				}
			}
			// copy the prototype as our starting point of inheritance
      proto['_class_names'] = []; // zero out the class names so that the order ends up correct
      for(ln = parents.length; ln--;){
        parent = parents[ln].prototype;
				for(key in parent){
          if(key == '_class_name'){
            continue;
          }
					if(key == '_class_names'){
            var ary = parent[key].clone(),
                ln2 = ary.length;
            for(; ln2--;){
              if(proto[key].indexOf(ary[ln2]) > -1){
                ary.splice(ln2, 1);
              }
            }
            proto[key] = proto[key].concat(ary);
          }
          else if(key == '_post_compile_'){
            proto[key] = parent[key].clone().concat(proto[key] || []);
          }
          else if(key == '_props_' || key == '_get_props_' || key == '_set_props_'){
            props[key] = Object.concat(props[key] ? props[key] : {}, parent[key]);
          }
					else{
						proto[key] = parent[key];
					}
				}
			}
      // add the namespace back into the classnames
      proto._class_names.push(ns);
      // concat the props
      for(key in props){
        // if no proto props then begin exit process
        if(!props[key]){
          // if no def props then finish exit process
          if(!def[key]){
            continue;
          }
          // otherwise carry on
        }
        // else we have proto props that need to be merged with def props
        else{
          // update def props
          if(def[key]){
            def[key] = Object.concat(def[key] ? def[key] : {}, proto[key]);
          }
          else{
            def[key] = props[key];
          }
        }
        // if we have def props then compile
        proto._propCompile_(def, key);
      }
			// setup the static var
			proto._static = c;
			// process other functions and properties accordingly
			for(key in def){
				// skip private funcs
				if(key.charAt(0) == '_' && key.slice(-1) == '_'){
					continue;
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
			for(ln = proto._post_compile_.length; ln--;){
				proto._post_compile_[ln].call(proto);
			}
			// setup the prototype and constructor for the class
			return c.prototype.constructor = c;
		},
    'extendComponent' : function(ns, parents, def/*, static_def*/){
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
		'extendManager' : function(manager_ns, cls_ns, parents, def/*, static_def*/){
			var prev_manager = window[manager_ns],
				cls = OJ.extendClass.apply(this, Array.slice(arguments, 1));
			return window[manager_ns] = new cls(prev_manager);
		},

		'guid' : function(){
			return (arguments.length ? 'OJ' : 'func') + '_' + this._guid++;
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
		'importCss' : function(path){
      return this.loadCss(this._getCssImportPath(path), true, false);
		},
		'importJs' : function(path){
      return this.loadJs(this._getJsImportPath(path), true, false);
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
      return Object.concat.apply(Object, arguments);
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
      this._settings[key] = val;
			if(key == 'theme'){
        var ln, elms,
            old_path = this._compiled_theme_path,
					  path = this._getThemePath(val);
				// check for change
				if(!path || path.indexOf(old_path) > -1){
					return;
				}
				elms = document.getElementsByTagName('link');
				this._compiled_theme_path = path;
				for(ln = elms.length; ln--;){
					if(elms[ln].getAttribute('href').indexOf(old_path) > -1){
						elms[ln].setAttribute('href', path);
						return;
					}
				}
				this._theme_elm = this.loadCss(path, true);
			}
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
    'unset' : function(context, args){
      var ln = args.length,
          prop = args[0],
          props;
      if(isArray(args[0])){
        for(ln = (props = args[0]).length; ln--;){
          args[0] = props[ln];
          context._unset.apply(context, args);
        }
        return;
      }
      context[prop] = OJ.destroy(context[prop], ln > 1 ? args[1] : 0);
    },
		// getter & setters
		'getAssetPath' : function(path/*, file*/){
      // search for package
      var parts = path.split('.'),
          ln = parts.length,
          pkg = parts[0],
          file = arguments.length > 1 ? arguments[1] : null;
//      if(ln > 1){
//        pkg = this._packages[path.]
//      }
			return this._root + pkg + '/assets/' + (file ? file + this.getVersionQuery() : '');
		},
		'getBrowser' : function(){
			return this._browser;
		},
    'getBrowserIsWebView' : function(){
      return this._is_webview;
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
    'getOsVersion' : function(){
      return this._os_version;
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
		  src = script_elms[script_elms.length - 1].getAttribute('src'),
		  index = src.indexOf('://'), // detect protocol mode
		  i = 0,
		  path, ln, part;
	// process the protocol and setup the path
	if(index > 0){
		path = src;
		OJ._protocol = src.substring(0, index);
	}
	else{
    path = window.location.href.split('/');
    // detect root
    if(src.charAt(0) == '/'){
      path = path.slice(0, 3);
    }
    else{
      path.pop();
    }
    path = path.join('/') + src;
		OJ._protocol = window.location.protocol.substring(-1);
	}
	path = path.split('/');
	path.pop(); // remove the file name
  path.pop(); // move up a directory
	// detect the root
	OJ.setRoot(path.join('/'));
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
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		OJ._os = OJ.IOS;
		OJ._is_tablet = !(OJ._is_mobile = (platform != 'ipa'));
    OJ._is_webview = /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(user_agent);
    OJ._os_version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)].join('.');
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
		if(isFunction(OJ.dispatchEvent) && isFunction(OJ.addCss)){
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
    if(isFunction(OJ.dispatchEvent)){
      OJ.dispatchEvent(OjOrientationEvent.convertDomEvent(evt));
    }
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
Array.prototype.unique = function(){
  var ary = [],
      ln = this.length,
      item;
  for(; ln--;){
    item = this[ln];
    if(ary.indexOf(item) < 0){
      ary.unshift(item);
    }
  }
  return ary;
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

// string functions
String.string = function(val){
  if(isSet(val)){
		return isObject(val) ? val.toString() : String(val);
	}
  return '';
};
String.prototype.lcFirst = function(){
	return this.charAt(0).toLowerCase() + this.slice(1);
};
String.prototype.ucFirst = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
};
String.prototype.capitalize = function(){
	var str = '',
      words = this.split(' '),
      ln = words.length;
	for(; ln--;){
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
	return isUnset(obj) || obj === false ||
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
	// make sure the theme got loaded
	if(!OJ._theme_elm){
		OJ.setting('theme', OJ.setting('theme'));
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
								
  // import the required css
  
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
	// setup the dom event proxy
	OJ._setProxy(document.body);
  // dispatch load event
	OJ.dispatchEvent(new OjEvent(OjEvent.LOAD));
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

OJ.defineClass(
  'OjObject',
  {
    '_destroyed_' : false,
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
      return context.prototype[func].apply(this, args);
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

    '_processArguments' : function(args, def){
      var ln = args.length,
          count = 0,
          key, val, ctx, ary, ln2, i, func;
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
  },
  {
    '_unset' : function(prop/*|props, depth*/){
      OJ.unset(this, arguments);
    },
    'importData' : function(data){
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
      function F() {
        return constructor.apply(this, args);
      }
      F.prototype = constructor.prototype;
      return new F();
    }
  }
);

/**
 * Query String Prototype Functions
 */
Array.prototype.toQueryString = function(/*prefix*/){
	var str = '', i, p, ln = this.length, prefix = arguments.length ? arguments[0] : null;
	for(i = 0; i < ln; i++){
		if(isFunction(this[i])){
			continue;
		}
		if(str != ''){
			str += '&';
		}
		p = prefix ? prefix + '[' + i + ']' : i + '';
		if(isObject(this[i])){
			str += this[i].toQueryString ? this[i].toQueryString(p) : Object.toQueryString(this[i], p);
		}
		else{
			str += p + '=' + encodeURI(this[i]);
		}
	}
	return str;
};
Object.toQueryString = function(obj/*, prefix*/){
	var key, str = '', p, prefix = arguments.length > 1 ? arguments[1] : null;
	for(key in obj){
		if(isFunction(obj[key]) || obj[key] == obj){
			continue;
		}
		if(str != ''){
			str += '&';
		}
		p = prefix ? prefix + '[' + encodeURI(key) + ']' : encodeURI(key);
		if(obj[key]){
			if(isFunction(obj[key].toQueryString)){
				str += obj[key].toQueryString(p);
			}
			else{
				str += Object.toQueryString(obj[key], p);
			}
		}
		else{
			str += p + '=';
		}
	}
	return str;
};
String.prototype.toQueryString = Number.prototype.toQueryString = Boolean.prototype.toQueryString = function(key){
	return key + '=' + encodeURI(this.valueOf());
};
String.prototype.parseQueryString = function(){
	var str = this, obj = {}, vars, ln, parts, i, ln2, tmp;
	if(str[0] == '?'){
		str = str.substring(1);
	}
	vars = str.split('&');
	ln = vars.length;
	while(ln-- > 0){
		parts = vars[ln].split('=');
		parts[0] = parts[0].replaceAll(']', '').split('[');
		ln2 = parts[0].length;
		if(ln2 > 1){
			if(!obj[parts[0][0]]){
				obj[parts[0][0]] = {};
			}
			obj[parts[0][0]][parts[0][1]] = parts[1];
		}
		else{
			obj[parts[0][0]] = parts[1];
		}
	}
	return obj;
};
window.toQueryString = function(obj){
	if(obj){
		if(obj.toQueryString){
			return obj.toQueryString();
		}
		else if(isObject(obj)){
			return Object.toQueryString(obj);
		}
	}
	return '';
};
/**
 * JSON Prototype Functions
 */
Date.prototype.toJson = function(key){
	return isFinite(this.valueOf()) ?
		this.getUTCFullYear().toFormattedString(2, 0) + '-' +
			(this.getUTCMonth() + 1).toFormattedString(2, 0) + '-' +
			this.getUTCDate().toFormattedString(2, 0) + 'T' +
			this.getUTCHours().toFormattedString(2, 0) + ':' +
			this.getUTCMinutes().toFormattedString(2, 0) + ':' +
			this.getUTCSeconds().toFormattedString(2, 0) + 'Z'
		: null;
};
Array.prototype.toJson = function(){
	return JSON.stringify(this);
};
String.prototype.toJson = Number.prototype.toJson = Boolean.prototype.toJson = function(key){
	return this.valueOf();
};
String.prototype.parseJson = function(){
	return JSON.parse(this, function(key, value){
		// date revival
		if(isString(value) && value.substr(-1) == 'Z'){
			var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
			if(a){
				return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
			}
		}
		return value;

	});
};
window.toJson = function(obj){
	return JSON.stringify(obj);
};


OJ.extendClass(
	'OjActionable', [OjObject],
	{
		'_prevent_dispatch' : false,
//    '_actionable' : null,

		'_constructor' : function(){
			this._actionable = this;
			this._super(OjObject, '_constructor', arguments);
		},
		'_destructor' : function(){
			// dispatch a destroy event and then destroy all active listeners
			if(this._actionable){
				this.dispatchEvent(new OjEvent(OjEvent.DESTROY));
				this.removeAllListeners();
				this._actionable = null;
			}
			return this._super(OjObject, '_destructor', arguments);
		},

		'_listeners' : function(type) {
			return null;
		},
		'_updateListeners' : function(action, type){
			var type = type.ucFirst(),
				func = action == 'add' ? 'addEventListener' : 'removeEventListener',
				settings = this._listeners(type),
				ln = settings ? settings.length : 0,
				obj;
			if(ln){
				if((obj = settings[0]) && obj[func]){
					if(ln > 1){
						obj[func](settings[1], this, '_on' + type);
					}
					if(ln > 2){
						obj[func](settings[2], this, '_on' + type + 'Fail');
					}
				}
			}
		},

		'addEventListener' : function(type, context, callback){
			EventManager.addEventListener(this._actionable, type, context, callback);
		},
		'hasEventListener' : function(type){
			return EventManager.hasEventListener(this._actionable, type);
		},
		'hasEventListeners' : function(type/*|types, type*/){
			var args = arguments,
				  ln = args.length;
			if(ln == 1){
				if(isArray(args[0])){
					args = args[0];
					ln = args.length;
				}
				else{
					args = [args[0]];
					ln = 1;
				}
			}
			for(; ln--;){
				if(!EventManager.hasEventListener(this._actionable, args[ln])){
					return false;
				}
			}
			return true;
		},
		'removeAllListeners' : function(){
			return EventManager.removeAllListeners(this._actionable);
		},
		'removeEventListener' : function(type, context, callback){
			EventManager.removeEventListener(this._actionable, type, context, callback);
		},
		'dispatchEvent' : function(evt){
			if(this._prevent_dispatch || evt.isCanceled()){
				return;
			}
			EventManager.dispatchEvent(this._actionable, evt);
		}
	},
  {
    'ADD' : 'add',
    'REMOVE' : 'remove'
  }
);


OJ.extendClass(
	'OjEvent', [OjObject],
	{
		'_get_props_' : {
			'bubbles'       : false,
			'cancelable'    : false,
			'currentTarget' : null,
			'phase'         : 0,
			'target'        : null,
			'type'          : null
		},
		'_canceled' : false,

		'_constructor' : function(type/*, bubbles = false, cancelable = false*/){
			var args = arguments,
				ln = args.length;
			this._super(OjObject, '_constructor', []);
			this._type = type;
			if(ln > 1){
				this._bubbles = args[1];
				if(ln > 2){
					this._cancelable = args[2];
				}
			}
		},
		'cancel' : function(){
			if(this._cancelable){
				this._canceled = true;
			}
		},
		'clone' : function(){
			var clone = new window[this._class_name](this._type);
			clone._bubbles = this._bubbles;
			clone._cancelable = this._cancelable;
			return clone;
		},
		'cloneWithChanges' : function(delta){
			var clone = this.clone(), key;
			for(key in delta){
				if(key != 'currentTarget' || key != 'phase' || key != 'target'){
					clone['_' + key] = delta[key];
				}
			}
			return clone;
		},
		'isCanceled' : function(){
			return this._canceled;
		}
	},
	{
		'ADDED'    : 'onAdded',
		'OPEN'     : 'onOpen',
		'CANCEL'   : 'onCancel',
		'CHANGE'   : 'onChange',
		'CLOSE'    : 'onClose',
		'COMPLETE' : 'onComplete',
		'DESTROY'  : 'onDestroy',
		'FAIL'     : 'onFail',
		'HIDE'     : 'onHide',
		'INIT'     : 'onInit',
		'LOAD'     : 'onLoad',
		'OK'       : 'onOk',
		'READY'    : 'onReady',
		'REMOVED'  : 'onRemoved',
		'SHOW'     : 'onShow',
		'SUBMIT'   : 'onSubmit',
    'UNLOAD'   : 'onUnload',
		'ADDED_TO_DISPLAY'      : 'onAddToDisplay',
		'REMOVED_FROM_DISPLAY'  : 'onRemovedFromDisplay'
	}
);


OJ.extendManager(
	'EventManager', 'OjEventManager', [OjObject],
	{
		'_events' : {},  '_index' : {},

		'_constructor' : function(){
      this._super(OjObject, '_constructor', []);
			var ready,
				timer,
				onChange = function(e){
					if(e && e.type == 'DOMContentLoaded'){
						fireDOMReady();
					}
					else if(e && e.type == 'load'){
						fireDOMReady();
					}
					else if(document.readyState){
						if((/loaded|complete/).test(document.readyState)){
							fireDOMReady();
						}
						else if(!!document.documentElement.doScroll){
							try{
								ready || document.documentElement.doScroll('left');
							}
							catch(e){
								return;
							}
							fireDOMReady();
						}
					}
				},
				fireDOMReady = function(){
					if(!ready){
            ready = true;
						if(document.removeEventListener){
							document.removeEventListener('DOMContentLoaded', onChange, false);
						}
            clearInterval(timer);
						document.onreadystatechange = window.onload = timer = null;
						window.onDomReady();
					}
				};
			// add the listener to the document
			if(document.addEventListener){
				document.addEventListener('DOMContentLoaded', onChange, false);
			}
			document.onreadystatechange = onChange;
			timer = setInterval(onChange, 5);
			window.onload = onChange;
			return this;
		},

		'_dispatchEvents' : function(evt, type, target){
			if(evt.isCanceled()){
				return;
			}
      if(target == window){
        target = OJ;
      }
			var events = this._events,
				target_id = target.id(),
				listener, listeners, key;
			evt._currentTarget = target;
			if(events[type] && events[type][target_id]){
				listeners = events[type][target_id];
				for(key in listeners){
					listener = listeners[key];
					if(listener && isFunction(listener.callback)){
						listener.callback.call(listener.context, evt);
					}
				}
			}
		},
		'_getIndex' : function(target_id, params){
			var index = this._index;
			if(!index[target_id]){
				index[target_id] = {};
			}
			index[target_id][params[0] + ':' + params[1] + ':' + params[3]] = params;
		},

		'addEventListener' : function(target, type, context, callback){
			// make sure the callback is a function
			callback = isString(callback) ? context[callback] : callback;
      // get the unique ids needed to qualify listeners
			var events = this._events,
				target_id = target.id(),
				context_id = context == window ? 'window' : context.id(),
				guid = context_id + ':' + (callback.guid ? callback.guid : callback.guid = OJ.guid());
			// make sure we have a holder for this type of event
			if(!events[type]){
				events[type] = {};
			}
			// make sure we have a holder for this target on this type of event
			if(!events[type][target_id]){
				events[type][target.id()] = {};
			}
			// only make changes if we haven't already recorded this listener
			if(!events[type][target_id][guid]){
				events[type][target_id][guid] = {
					'callback' : callback,
					'context' : context
				};
				// track the listener by the target for cleanup purposes
				this._getIndex(target_id, [target_id, type, context_id, guid]);
				this._getIndex(context_id, [target_id, type, context_id, guid]);
			}
		},
		'dispatchEvent' : function(target, evt){
			var type = evt.getType(),
				  parent;
			evt._target = evt._target ? evt._target : target;
			evt._currentTarget = target;
			this._dispatchEvents(evt, type, target);
			if(evt._bubbles){
				parent = target;
				while(parent && isFunction(parent.parent) && (parent = parent.parent())){
					this._dispatchEvents(evt, type, parent);
				}
				if(parent && parent != OJ){
					this._dispatchEvents(evt, type, OJ);
				}
			}
		},
		'hasEventListener' : function(target, type){
      var events = this._events[type];
			return events && events[target.id()];
		},
    'hasEventListeners' : function(type){
      return this._events[type] ? true : false;
    },
		'_removeEventListener' : function(target_id, type, context_id, guid){
			var events = this._events,
				index = this._index,
				i = target_id + ':' + type + ':' + guid;
			// cleanup the events
			if(events[type] && events[type][target_id] && events[type][target_id][guid]){
				delete events[type][target_id][guid];
				if(isEmptyObject(events[type][target_id])){
					delete events[type][target_id];
					if(isEmptyObject(events[type])){
						delete events[type];
					}
				}
			}
			// cleanup the index
			if(index[target_id] && index[target_id][i]){
				delete index[target_id][i];
				if(isEmptyObject(index[target_id])){
					delete index[target_id];
				}
			}
			if(index[context_id] && index[context_id][i]){
				delete index[context_id][index];
				if(isEmptyObject(index[context_id])){
					delete index[context_id];
				}
			}
		},
		'removeAllListeners' : function(target){
      var target_id = target.id(),
				events, evt;
			if(events = this._index[target_id]){
				for(evt in events){
					this._removeEventListener.apply(this, events[evt]);
				}
				delete this._index[target_id];
			}
		},
		'removeEventListener' : function(target, type, context, callback){
      var events = this._events,
				target_id = target.id(),
				context_id = context.id(),
				guid;
			if(events[type]){
				if(events[type][target_id]){
					if(callback = isString(callback) ? context[callback] : callback){
						guid = context_id + ':' + callback.guid;
						if(events[type][target_id][guid]){
							this._removeEventListener(target_id, type, context_id, guid);
						}
					}
				}
			}
		}
	}
);


OJ.extendClass(
	'OjTextEvent', [OjEvent],
	{
		'_get_props_' : {
			'text' : ''
		},

		'_constructor' : function(type/*, text = "", bubbles = false, cancelable = false*/){
			var cancelable, bubbles = cancelable = false, ln = arguments.length;
			if(ln > 1){
				this._text = arguments[1];
				if(ln > 2){
					bubbles = arguments[2];
					if(ln > 3){
						cancelable = arguments[3];
					}
				}
			}
			this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'TEXT' : 'onText'
	}
);


OJ.extendClass(
	'OjErrorEvent', [OjTextEvent],
	{
		'_get_props_' : {
			'code'    : 0
		},

		'_constructor' : function(type/*, text = null, code = 0, bubbles = false, cancelable = false*/){
			var args = Array.array(arguments),
				ln = args.length;
			if(ln > 2){
				this._code = args[2];
				args.splice(2, 1);
			}
			this._super(OjTextEvent, '_constructor', args);
		}
	},
	{
		'ERROR' : 'onError'
	}
);


OJ.extendClass(
	'OjUrl', [OjObject],
	{
		'_props_' : {
			'protocol' : null,
			'host'     : null,
			'port'     : null,
			'path'     : null,
			'query'    : null,
			'hash'     : null
		},
		'_cache' : null,  '_dirty' : null, '_hash_vars' : null,  '_query_vars' : null,

		'_setter' : function(prop, prefix, value, suffix/*, default */){
			var args = arguments;
			if(!this._cache[prop] || this['_' + prop] != value){
				this['_' + prop] = value;
				this._cache[prop] = '';
				if(isEmpty(value)){
					this['_' + prop] = args.length > 4 ? args[4] : null;
				}
				else{
					this._cache[prop] = prefix + value + suffix;
				}
			}
		},
		'_refresh' : function(/*force*/){
			if(arguments.length && !arguments[0]){
				this._dirty['query'] = true;
				this._dirty['hash'] = true;
			}
			this.getQuery();
			this.getHash();
		},

		'_constructor' : function(/*url*/){
			this._super(OjObject, '_constructor', []);
			var args = arguments;
			this.setSource(args.length ? args[0] : '');
		},

		'clone' : function() {
			return new OjUrl(this.toString());
		},
		'toString' : function() {
			this._refresh();
			return this._cache['protocol'] + this._cache['host'] + this._cache['port'] + this._cache['path'] + this._cache['query'] + this._cache['hash'];
		},

		'setProtocol' : function(protocol){
			this._setter('protocol', '', protocol.replaceAll([':', '/'], ''), '://', 'http');
		},
		'setHost' : function(host){
			this._setter('host', '', host, '');
		},
		'setPort' : function(port){
			this._setter('port', ':', port, '');
		},
		'setPath' : function(path){
			if(path && path.charAt(0) != '/'){
				path = '/' + path;
			}
			this._setter('path', '', path, '', '/');
		},
		'getQuery' : function(){
			if(this._dirty['query']){
				this.setQuery(Object.toQueryString(this._query_vars));
				delete this._dirty['query'];
				delete this._dirty['query_vars'];
			}
			return this._query;
		},
		'setQuery' : function(query){
			if(isString(query) && query.charAt(0) == '?'){
				query = query.substr(1);
			}
			this._setter('query', '?', query, '');
			this._dirty['query_vars'] = true;
			this.getQueryParams();
		},
		'getQueryParams' : function(){
			if(this._dirty['query_vars']){
				this._query_vars = this._query ? this._query.parseQueryString() : {};
				delete this._dirty['query_vars'];
			}
			return this._query_vars;
		},
		'setQueryParams' : function(params){
			this._query_vars = params;
			this._dirty['query'] = true;
		},
		'getQueryParam' : function(key){
			this._query_vars = this.getQueryParams();
			return this._query_vars[key];
		},
		'setQueryParam' : function(key, value){
			this._query_vars = this.getQueryParams();
			if(isSet(value)){
				this._query_vars[key] = value;
			}
			else{
				delete this._query_vars[key];
			}
			this._dirty['query'] = true;
		},
		'getHash' : function(){
			if(this._dirty['hash']){
				this.setHash(Object.toQueryString(this.getHashParams()));
				delete this._dirty['hash'];
			}
			return this._hash;
		},
		'setHash' : function(hash){
			if(hash && hash.charAt(0) == '#'){
				hash = hash.substr(1);
			}
			this._setter('hash', '#', hash, '');
			delete this._dirty['hash'];
			this._dirty['hash_vars'] = true;
			this.getHashParams();
		},
		'getHashParams' : function(){
			if(this._dirty['hash_vars']){
				this._hash_vars = {};
				if(this._hash){
					this._hash_vars = this._hash.parseQueryString();
				}
				delete this._dirty['hash_vars'];
			}
			return this._hash_vars;
		},
		'setHashParams' : function(params){
			this._hash_vars = params;
			this._dirty['hash'] = true;
			delete this._dirty['hash_params'];
		},
		'getHashParam' : function(key){
			this._hash_vars = this.getHashParams();
			return this._hash_vars[key];
		},
		'setHashParam' : function(key, value){
			this._hash_vars = this.getHashParams();
			if(isSet(value)){
				this._hash_vars[key] = value;
			}
			else{
				delete this._hash_vars[key];
			}
			this._dirty['hash'] = true;
		},
		'getSource' : function(){
			return this.toString();
		},
		'setSource' : function(val){
			if(isObjective(val)){
				val = val.toString();
			}
			this._query_vars = {};
			this._hash_vars = {};
			this._cache = {};
			this._dirty = {};
			// create an anchor and let the dom do the url parsing
			var a = document.createElement('a');
			a.href = val;
			// get the parsed url info from the a element
			this.setProtocol(a.protocol);
			this.setHost(a.hostname);
			this.setPort(a.port);
			this.setPath(a.pathname);
			this.setQuery(a.search);
			this.setHash(a.hash);
			// reset the dirty flags
			this._refresh();
		}
	},
	{
		'url' : function(obj){
      if(obj){
        if(isString(obj)){
          return new OjUrl(obj)
        }
        if(isObject(obj) && obj.is('OjUrl')){
          return obj;
        }
        return new OjUrl();
      }
      return null;
		}
	}
);


OJ.extendClass(
	'OjUrlRequest', [OjUrl],
	{
		'_props_' : {
			'data'        : null,
			'files'       : null,
			'headers'     : null,
			'method'      : 'get'
		},
		'_ignores_cache' : false,

		'_constructor' : function(/*url, data, content_type, method*/){
			var ln = arguments.length;
			this._super(OjUrl, '_constructor', ln ? [arguments[0]] : []);
			this._headers = {};
			if(ln > 1){
				this.setData(arguments[1]);
				if(ln > 2){
					this.setContentType(arguments[2]);
					if(ln > 3){
						this.setMethod(arguments[3]);
					}
				}
			}
		},

		'ignoresCache' : function(/*val*/){
			if(arguments.length){
				this._ignores_cache = arguments[0];
			}
			return this._ignores_cache && !this._headers['cache-control'];
		},
		'isDelete' : function(){
			return this._method == OjUrlRequest.DELETE;
		},
		'isGet' : function(){
			return this._method == OjUrlRequest.GET;
		},
		'isHead' : function(){
			return this._method == OjUrlRequest.HEAD;
		},
		'isMultiPart' : function(){
			return this.getContentType() == OjUrlRequest.MULTIPART || !isEmpty(this._files);
		},
		'isOptions' : function(){
			return this._method == OjUrlRequest.OPTIONS;
		},
		'isPost' : function(){
			return this._method == OjUrlRequest.POST;
		},
		'isPut' : function(){
			return this._method == OjUrlRequest.PUT;
		},
		'isSafe' : function(){
			return this.isGet() || this.isHead() || this.isOptions();
		},
		'isUnsafe' : function(){
			return !this.isSafe();
		},

		'getHeader' : function(key){
			return this._headers[key.toLowerCase()];
		},
		'setHeader' : function(key, value){
			this._headers[key.toLowerCase()] = value;
		},
		'unsetHeader' : function(key){
			if(this._headers){
				delete this._headers[key.toLowerCase()];
			}
		},

		'getContentType' : function(){
			return this._headers['content-type'] ? this._headers['content-type'] : OjUrlRequest.TEXT;
		},
		'setContentType' : function(val){
			this._headers['content-type'] = val;
		},
		'setData' : function(val){
			this._data = val;
			if(!this._headers['content-type']){
				this.setContentType(OjUrlRequest.QUERY_STRING);
			}
		}
	},
	{
		'urlRequest' : function(obj){
			if(isString(obj)){
				return new OjUrlRequest(obj)
			}
			if(isObject(obj) && obj.is('OjUrlRequest')){
				return obj;
			}
			return new OjUrlRequest();
		},

		'DELETE'  : 'delete',
		'GET'     : 'get',
		'HEAD'    : 'head',
		'OPTIONS' : 'options',
		'POST'    : 'post',
		'PUT'     : 'put',
		'CSS'          : 'text/css',
		'QUERY_STRING' : 'application/x-www-form-urlencoded',
		'HTML'         : 'text/html',
		'JS'           : 'text/javascript',
		'JSON'         : 'application/json',
		'MULTIPART'    : 'multipart/form-data',
		'TEXT'         : 'text/plain',
		'XML'          : 'text/xml'
	}
);


OJ.extendClass(
	'OjXml', [OjObject],
	{
		'_props_' : {
			'xml'  : null
		},

		'_constructor' : function(xml){
			this._super(OjObject, '_constructor', []);
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
	'OjHttpStatusEvent', [OjEvent],
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
			this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'HTTP_STATUS' : 'onHttpStatus'
	}
);


OJ.extendClass(
	'OjIoErrorEvent', [OjErrorEvent],
	{},
	{
		'IO_ERROR'   : 'onIoError',
		'IO_TIMEOUT' : 'onIoTimeout'
	}
);


OJ.extendClass(
	'OjProgressEvent', [OjEvent],
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
			this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'PROGRESS' : 'onProgress'
	}
);

OJ.extendClass(
	'OjCacheObject', [OjObject],
	{
		'_props_' : {
			'created'    : null,
			'data'       : null,
			'expiration' : null
		},
		'_class_path' : 'oj.utils.OjCacheObject',

		'_constructor' : function(/*data, expiration*/){
			this._super(OjObject, '_constructor', []);
			this.setCreated(new Date());
			var args = arguments,
				ln = args.length;
			if(ln){
				this.setData(args[0]);
				if(ln > 1){
					this.setExpiration(args[1]);
				}
			}
		},
		'exportData' : function(){
			var obj = this._super(OjObject, 'exportData', arguments);
			obj.created    = this._created;
			obj.data       = this._data ? OjObject.exportData(this._data) : null;
			obj.expiration = this._expiration;
			return obj;
		},
		'importData' : function(obj){
			if(!obj){
				obj = {
					'created'    : null,
					'data'       : null,
					'expiration' : null
				}
			}
			this._created = obj.created;
			this._data = OjObject.importData(obj.data);
			this._expiration = obj.expiration;
		},

		'setExpiration' : function(exp/*date|milliseconds from now*/){
			if(this._expiration == exp){
				return;
			}
			if(!isDate(exp)){
				this._expiration = new Date();
				this._expiration.setSeconds(this._expiration.getSeconds() + exp);
			}
			else{
				this._expiration = exp;
			}
		}
	}
);

OJ.extendClass(
	'OjCachePolicy', [OjObject],
	{
		'_get_props_' : {
			'action'     : 1,
			'lifespan'   : null,
			'url'        : null
		},

		'_constructor' : function(url/*, action, lifespan*/){
			this._super(OjObject, '_constructor', arguments);
			var args = arguments,
				ln = args.length;
			this._url = url;
			if(ln > 1){
				this._action = args[1];
				if(ln > 2){
					this._lifespan = args[2];
				}
			}
		}
	},
	{
		// actions
		'ALWAYS'  : 1,
		'NEVER'   : 0,
		'OFFLINE' : 2
	}
);


OJ.extendManager(
	'CacheManager', 'OjCacheManager', [OjActionable],
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
			this._super(OjActionable, '_constructor', []);
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
    '_processDefault' : function(args){
      return args.length > 1 ? args[1] : null;
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
		'getData' : function(key/*, default*/){
			throw new Error('No getData() defined.');
			return;
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
		'getCookie' : function(key/*, default*/){
			var data = this._getCookie(key);
			return data ? data.getData() : this._processDefault(arguments);
		},
		'setCookie' : function(key, value/*, lifespan*/){
			var ln = arguments.length;
			this._setCookie(key, new OjCacheObject(value, ln > 2 ? arguments[2] : null));
		},
		'unsetCookie' : function(key){
			document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		},

		// LocalData Caching Functions
		'getLocalData' : function(key/*, default*/){
			var data = this._getLocalData(key);
			if(this._isDataExpired(data)){
				this.unsetLocalData(key);
				return null;
			}
			return data ? data.getData() : this._processDefault(arguments);
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
	'OjUrlLoader', [OjActionable],
	{
		'_props_' : {
			'async'       : false,
			'data'        : null,
			'contentType' : OjUrlRequest.QUERY_STRING,
			'request'     : null,
			'timeout'     : 10000
		},
		'_is_xdomain' : false,  '_policy' : null,  '_url' : null,  '_xhr' : null,

		'_constructor' : function(/*request, async,*/){
			this._super(OjActionable, '_constructor', []);
			var ln = arguments.length;
			if(ln){
				this.setRequest(arguments[0]);
				if(ln > 1){
					this.setAsync(arguments[1]);
				}
			}
		},
		'_destructor' : function(){
			if(this._xhr){
				if(this._is_xdomain){
					this._xhr.onload = null;
					this._xhr.onerror = null;
				}
				else{
					this._xhr.onreadystatechange = null;
				}
				this._xhr.ontimeout = null;
			}
			this._xhr = null;
			this._request = null;
			return this._super(OjActionable, '_destructor', arguments);
		},

		'_load' : function(){
			var data,
				method = this._request.getMethod();
			this._url = this._request.clone();
			if(method != OjUrlRequest.POST && (data = this._request.getData())){
				var key;
				for(key in data){
					this._url.setQueryParam(key, data[key]);
				}
			}
			this._request.setSource(this._url);
			// check to see if we have this cached
			if(!this._request.ignoresCache()){
				var url = this._url.toString();
				this._policy = CacheManager.getCacheUrlRequestPolicy(url);
				if(
					this._policy && this._policy.getAction() == OjCachePolicy.ALWAYS &&
					(this._data = CacheManager.getCacheUrlRequestData(url, this._policy))
				){
					this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
					return;
				}
			}
			// if not cached or ignored send the request as usual
			if(this._static.USE_ACTIVEX && this._request.getHost() != HistoryManager.get().getHost()){
				this._xhr = new window.XDomainRequest();
				this._is_xdomain = true;
			}
			else{
				this._xhr = new window.XMLHttpRequest();
				this._is_xdomain = false;
			}
			this._xhrOpen();
			this._xhrFormat();
			this._xhrEvents();
			this._xhrSend();
		},
		'_loadMultiPart' : function(){
			// add in form data handling here
		},
		'_xhrEvents' : function(){
			this.dispatchEvent(new OjEvent(OjEvent.OPEN));
			if(this._is_xdomain){
				this._xhr.onload = this._onLoad.bind(this);
				this._xhr.onerror = this._onError.bind(this);
			}
			else{
				this._xhr.onreadystatechange = this._onReadyStateChange.bind(this);
			}
			this._xhr.ontimeout = this._onTimeout.bind(this);
		},
		'_xhrFormat' : function(){
			// set the format
			var key, headers = this._request.getHeaders();
			if(headers && !this._is_xdomain){
				for(key in headers){
					// ignore content-type setting when safe since no data is sent
					if(key == 'content-type' && this._request.isSafe()){
						continue;
					}
					this._xhr.setRequestHeader(key, headers[key]);
				}
			}
			// set the caching
			if(this._policy && !this._is_xdomain){
				if(this._policy.getAction() == OjCachePolicy.ALWAYS){
					var lifespan = this._policy.getLifespan();
					if(!lifespan){
						lifespan = CacheManager.YEAR;
					}
					this._xhr.setRequestHeader('cache-control', 'max-age=' + lifespan);
				}
				else{
					this._xhr.setRequestHeader('cache-control', 'no-cache');
				}
			}
		},
		'_xhrOpen' : function(){
			this._xhr.open(this._request.getMethod(), this._url, this._async);
			if(this._async && !this._is_xdomain){
				this._xhr.timeout = this._timeout;
			}
			else{
				//todo: look into adding sync timeout capability if at all possible
			}
		},
		'_xhrSend' : function(){
			var data;
			if(this._request.getMethod() == OjUrlRequest.POST){
				if(data = this._request.getData()){
					var type = this._request.getContentType();
					if(type == OjUrlLoader.JSON){
						data = toJson(data);
					}
					else if(type == OjUrlLoader.XML){
						data = toXml(data);
					}
					else if(type == OjUrlLoader.QUERY_STRING){
						data = toQueryString(data);
					}
				}
			}
			if(this._is_xdomain){
				var xhr = this._xhr;
				setTimeout(
					function(){
						xhr.send(data);
					},
					0
				);
			}
			else{
				this._xhr.send(data)
			}
		},
		'_onError' : function(){
			if(!this._xhr){
				return;
			}
			// clear the timeout timer
			OJ.destroy(this._timer);
			this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR, this._xhr.statusText, status));
			this.dispatchEvent(new OjEvent(OjEvent.FAIL));
		},
		'_onLoad' : function(){
			if(!this._xhr){
				return;
			}
			// clear the timeout timer
			OJ.destroy(this._timer);
			if(this._is_xdomain){
				this._contentType = this._xhr.contentType;
			}
			if(this._contentType){
				this._contentType = this._contentType.toLowerCase();
			}
			else{
				this._contentType = OjUrlLoader.TEXT;
			}
			if(this._contentType.indexOf('/xml') != -1){
				this._contentType = OjUrlLoader.XML;
				this.setData(this._xhr.responseXML);
			}
			else{
				if(this._contentType.indexOf('/json') != -1){
					this._contentType = OjUrlLoader.JSON;
				}
				else if(this._contentType == OjUrlLoader.QUERY_STRING){
					this._contentType = OjUrlLoader.QUERY_STRING;
				}
				else{
					this._contentType = OjUrlLoader.TEXT;
				}
				this.setData(this._xhr.responseText);
			}
			this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
		},
		'_onReadyStateChange' : function(){
			if(!this._xhr){
				return;
			}
			var status = this._xhr.status,
				state = this._xhr.readyState;
			// add header processing
			this.dispatchEvent(new OjHttpStatusEvent(OjHttpStatusEvent.HTTP_STATUS, status));
			if(status > 199 && status < 300 && state == 4){
				// detect the content type from the response
				this._contentType = this._xhr.getResponseHeader('Content-Type');
				this._onLoad();
			}
			else if((!status && state == 4) || status > 399){
				this._onError();
			}
			else{
				this.dispatchEvent(new OjProgressEvent(OjProgressEvent.PROGRESS));
			}
		},
		'_onTimeout' : function(evt){
			if(this._xhr){
				this._xhr.abort();
			}
			this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_TIMEOUT));
			this.dispatchEvent(new OjEvent(OjEvent.FAIL));
		},

		'cancel' : function(){
			this._xhr.abort();
			this._xhr = null;
		},
		'load' : function(/*request*/){
			var args = arguments,
				ln = args.length;
			if(ln){
				this.setRequest(args[0]);
			}
			if(this._request.isMultiPart()){
				this._loadMultiPart();
			}
			else{
				this._load();
			}
			return this._data;
		},

		'setData' : function(data){
			this._data = null;
			if(data){
				if(this._contentType.indexOf('/json') > -1){
					this._data = data.parseJson();
				}
				else if(this._contentType.indexOf('/xml') > -1){
					this._data = OjXml.xml(data);
				}
				else if(this._contentType == OjUrlLoader.QUERY_STRING){
					this._data = data.parseQueryString();
				}
				else{
					this._data = data;
				}
			}
			if(this._policy && this._policy.getAction() != OjCachePolicy.NEVER){
				CacheManager.setCacheUrlRequestData(this._request, this._data, this._policy);
			}
		}
	},
	{
		'USE_ACTIVEX' : (window.XDomainRequest || window.ActiveXObject),
		'CSS'          : OjUrlRequest.CSS,
		'QUERY_STRING' : OjUrlRequest.QUERY_STRING,
		'HTML'         : OjUrlRequest.HTML,
		'JS'           : OjUrlRequest.JS,
		'JSON'         : OjUrlRequest.JSON,
		'TEXT'         : OjUrlRequest.TEXT,
		'XML'          : OjUrlRequest.XML
	}
);


OJ.extendClass(
	'OjLibrary', [OjActionable],
	{
		'_props_' : {
			'assets' : null,
			'async'  : false
		},
		'_queue' : null,

		'_constructor' : function(/*assets*/){
			this._super(OjActionable, '_constructor', []);
			this.setAssets(arguments.length ? arguments[0] : {});
			this._queue = {};
		},

		'_onSuccess' : function(evt){
			var loader_id = evt.getTarget().id(), queued = this._queue[loader_id];
			if(queued){
				this._assets[queued.asset] = evt.getTarget().getData();
				delete this._queue[loader_id];
			}
			OJ.destroy(evt.getTarget());
		},
		'_onFail' : function(evt){
			var loader_id = evt.getTarget().id(), queued = this._queue[loader_id];
			if(queued){
				this.dispatchEvent(new OjErrorEvent(OjErrorEvent.ERROR));
				delete this._queue[loader_id];
			}
			OJ.destroy(evt.getTarget());
		},

		'load' : function(asset/*, force*/){
			var asset_str = asset.toString(), force = arguments.length > 1 && arguments[1];
			if(!this.isLoaded(asset_str) || force){
				asset = new OjUrlRequest.urlRequest(asset);
				if(force){
					asset.getQueryParam('force', Date.time());
				}
				var loader = new OjUrlLoader(asset, this._async);
				this._queue[loader.id()] = {
					'loader'    : loader,
					'asset'     : asset_str
				};
				loader.addEventListener(OjEvent.COMPLETE, this, '_onSuccess');
				loader.addEventListener(OjIoErrorEvent.IO_ERROR, this, '_onFail');
				loader.load();
			}
			return this._assets[asset_str];
		},
		'isLoaded' : function(asset){
			return this._assets[asset.toString()] ? true : false;
		},

		'getAsset' : function(asset){
			return this._assets[asset.toString()];
		},
		'setAsset' : function(asset, value){
			asset = asset.toString();
			if(isNull(value)){
				return delete this._assets[asset];
			}
			this._assets[asset] = value;
		}
	}
);


OJ.extendClass(
	'OjElement', [OjActionable],
	{
//		'_dom' : null,  '_proxy' : null,
//
//		'_move_timer' : null,  '_page_x' : null,  '_page_y' : null,
		'_draggable' : false,  '_dragX' : 0,  '_dragY' : 0,  '_did_drag' : false,

		'_constructor' : function(/*source, context*/){
			var args = arguments,
				ln = args.length,
				source = ln && args[0] ? args[0] : OjElement.elm('div'),
				context = ln > 1 ? args[1] : null;
			this._super(OjActionable, '_constructor', []);
			// set the dom
			// if no source present then create one
			this._setDom(source, context);
      OjElement.register(this);
		},
		'_destructor' : function(/*depth = 0*/){
			OjElement.unregister(this);
			// remove from parent
			this.setParent(null);
			if(this._dom){
				delete this._dom.ojProxy;
				// release the vars
				this._dom = this._proxy = null;
			}
			// continue on with the destruction
			return this._super(OjActionable, '_destructor', arguments);
		},

		'_setDom' : function(dom_elm){
			this._setProxy(this._dom = dom_elm);
			this._dom.id = this.getId();
		},
		'_setProxy' : function(dom_elm){
			if(this._proxy){
				this._proxy.ojProxy = null;
			}
			(this._proxy = dom_elm).ojProxy = this.getId();
		},
    '_getEventProxy' : function(){
      if(this._proxy == document.body){
        return window;
      }
      return this._proxy;
    },
		'_isDisplayed' : function(){ },
		'_isNotDisplayed' : function(){ },

		'_setIsDisplayed' : function(displayed){
			if(this._is_displayed == displayed){
				return;
			}
			if(this._is_displayed = displayed){
				this._isDisplayed();
				this.dispatchEvent(new OjEvent(OjEvent.ADDED_TO_DISPLAY));
			}
			else{
				this._isNotDisplayed();
				this.dispatchEvent(new OjEvent(OjEvent.REMOVED_FROM_DISPLAY));
			}
		},

		// Non-Style Getter & Setter Functions
		'dom' : function(){
			return this._dom;
		},
		'inDom' : function(){
			var dom = this._dom;
			return dom.ownerDocument && isObject(dom.ownerDocument) && dom.parentNode ? true : false;
		},
		'hasDomElement' : function(dom_elm){
			return OjElement.hasDomElement(this._dom, dom_elm);
		},
		'parent' : function(){
			return OjElement.element(this._dom.parentNode);
		},

    'getId' : function(){
      return this.id();
    },
		'getParent' : function(){
			return OjElement.element(this._dom.parentNode);
		},
		'setParent' : function(parent){
			if(parent){
				parent.addChild(this);
			}
			else if(parent = this.parent()){
				parent.removeChild(this);
			}
		}
	},
	{
		'_elms' : {},
		'byId' : function(id){
			var elms = this._elms,
				  elm;
			if(elms[id]){
				return elms[id];
			}
			return (elm = document.getElementById(id)) ? elms[elm.id] : null;
		},
		'elm' : function(tag){
			return document.createElement(tag);
		},
		'element' : function(obj){
			if(!obj){
				return null;
			}
			if(isDomElement(obj)){
        return this.isTextNode(obj) ? new OjTextElement(obj) : this.byId(obj.id);
			}
			if(isObjective(obj)){
				return obj;
			}
			return obj == window ? OJ : new OjStyleElement(obj);
		},
		'hasDomElement' : function(haystack, needle){
			if(haystack == needle){
				return true;
			}
			while((needle = needle.parentNode)){
				if(needle == haystack){
					return true;
				}
			}
			return false;
		},
		'isCommentNode' : function(dom_elm){
			return dom_elm.nodeName.toLowerCase() == '#comment';
		},
		'isTextNode' : function(dom_elm){
			return dom_elm.nodeName.toLowerCase() == '#text';
		},
		'parentComponent' : function(elm){
			if(isElement(elm)){
				elm = elm._dom;
			}
			var parent;
			while(elm){
				parent = elm.parentNode;
				if(parent && (elm = this.element(parent)) && isComponent(elm)){
					return elm;
				}
				elm = parent;
			}
			return null;
		},
		'register' : function(elm){
			this._elms[elm.getId()] = elm;
//			trace(Object.keys(this._elms).length);
		},
		'unregister' : function(elm){
			delete this._elms[elm.getId()];
//			trace(Object.keys(this._elms).length);
		}
	}
);



OJ.extendClass(
	'OjRect', [OjObject],
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
			this._super(OjObject, '_constructor', []);
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
	'OjCssTranslate', [OjObject],
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
			this._super(OjObject, '_constructor', []);
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
			var obj = this._super(OjObject, 'clone', arguments);
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
	'OjDomEvent', [OjEvent],
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
		'TOUCH_CANCEL' : 'touchcancel',
    'TOUCH_END'    : 'touchend',
		'TOUCH_LEAVE'  : 'touchleave',
    'TOUCH_MOVE'   : 'touchmove',
		'TOUCH_START'  : 'touchstart',
		// orientation events
		'ORIENTATION_CHANGE' : 'orientationchange'
	}
);


OJ.extendClass(
	'OjMouseEvent', [OjDomEvent],
	{
		'_get_props_' : {
			'pageX' : NaN,
			'pageY' : NaN
		},

		'_constructor' : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
			var args = Array.array(arguments),
				ln = args.length;
			if(ln > 1){
				this._pageX = args.splice(1, 1)[0];
				if(ln > 2){
					this._pageY = args.splice(1, 1)[0];
				}
			}
			this._super(OjDomEvent, '_constructor', args);
		},

		'clone' : function(){
			var clone = this._super(OjDomEvent, 'clone', arguments);
			clone._pageX = this._pageX;
			clone._pageY = this._pageY;
			return clone;
		}
	},
	{
		'_evt_map' : {
			'click'        : 'onClick',
			'dblclick'     : 'onDoubleClick',
			'mousedown'    : 'onMouseDown',
			'mousemove'    : 'onMouseMove',
			'mouseover'    : 'onMouseOver',
			'mouseout'     : 'onMouseOut',
			'mouseup'      : 'onMouseUp',
			'mousewheel'   : 'onMouseWheel'
		},
		'convertDomEvent' : function(evt){
			evt = OjDomEvent.normalizeDomEvent(evt);
			var type = this._evt_map[evt.type];
			if(type == OjMouseEvent.CLICK){
				// todo: OjMouseEvent - add middle and right click event detection
			}
			var new_evt = new OjMouseEvent(type, evt.pageX, evt.pageY, evt.bubbles, evt.cancelable);
			new_evt._target = OjElement.element(evt.target);
			new_evt._currentTarget = OjElement.element(evt.currentTarget);
			return new_evt;
		},
		'isMouseEvent' : function(type){
			var k;
			for(k in this._evt_map){
				if(type == this._evt_map[k]){
					return true;
				}
			}
			return false;
		},
		'isMouseDomEvent' : function(type){
			var k;
			for(k in this._evt_map){
				if(type == k){
					return true;
				}
			}
			return false;
		},
		'CLICK'        : 'onClick',
		'DOUBLE_CLICK' : 'onDoubleClick',
		'DOWN'         : 'onMouseDown',
		'MIDDLE_CLICK' : 'onMiddleClick',
		'MOVE'         : 'onMouseMove',
		'OVER'         : 'onMouseOver',
		'OUT'          : 'onMouseOut',
		'RIGHT_CLICK'  : 'onRightClick',
		'RIGHT_UP'     : 'onMouseRightUp',
		'RIGHT_DOWN'   : 'onMouseRightDown',
		'UP'           : 'onMouseUp',
    'UP_OUTSIDE'   : 'onMouseUpOutside',
		'WHEEL'        : 'onMouseWheel'
	}
);


OJ.extendClass(
	'OjDragEvent', [OjMouseEvent],
	{
		'_get_props_' : {
			'deltaX'   : 0,
			'deltaY'   : 0,
			'originX'  : 0,
			'originY'  : 0
		},

		'_constructor' : function(type, deltaX, deltaY, mouseEvent/*, bubbles, cancelable*/){
			var args = [].slice.call(arguments, 4);
			args.unshift(type);
			this._super(OjMouseEvent, '_constructor', args);
			this._deltaX = deltaX;
			this._deltaY = deltaY;
			this._pageX = mouseEvent._pageX;
			this._pageY = mouseEvent._pageY;
		},

		'clone' : function(){
			var clone = this._super(OjMouseEvent, 'clone', arguments);
			clone._deltaX = this._deltaX;
			clone._deltaY = this._deltaY
			return clone;
		}
	},
	{
		'isDragEvent' : function(type){
			return type == OjDragEvent.DRAG || type == OjDragEvent.END || type == OjDragEvent.START;
		},
		'END'   : 'onDragEnd',
		'MOVE'  : 'onDrag',
		'START' : 'onDragStart'
	}
);


OJ.extendClass(
	'OjFocusEvent', [OjDomEvent],
	{},
	{
		'convertDomEvent' : function(evt){
			var type;
			evt = OjDomEvent.normalizeDomEvent(evt);
			if(evt.type == OjDomEvent.FOCUS_IN){
				type = OjFocusEvent.IN;
			}
			else if(evt.type == OjDomEvent.FOCUS_OUT){
				type = OjFocusEvent.OUT;
			}
			return new OjFocusEvent(type, true, true);
		},
		'isFocusEvent' : function(type){
			return type == OjFocusEvent.IN || type == OjFocusEvent.OUT;
		},
		'isFocusDomEvent' : function(type){
			return type == OjDomEvent.FOCUS_IN || type == OjDomEvent.FOCUS_OUT;
		},

		'IN'  : 'onFocusIn',
		'OUT' : 'onFocusOut'
	}
);


OJ.extendClass(
	'OjKeyboardEvent', [OjDomEvent],
	{},
	{
		'convertDomEvent' : function(evt){
			var type;
			evt = OjDomEvent.normalizeDomEvent(evt);
			if(evt.type == OjDomEvent.KEY_DOWN){
				type = OjKeyboardEvent.DOWN;
			}
			else if(evt.type == OjDomEvent.KEY_PRESS){
				type = OjKeyboardEvent.PRESS;
			}
			else if(evt.type == OjDomEvent.KEY_UP){
				type = OjKeyboardEvent.UP;
			}
			return new OjKeyboardEvent(type, true, true);
		},
		'isKeyboardEvent' : function(type){
			return type == OjKeyboardEvent.DOWN || type == OjKeyboardEvent.PRESS || type == OjKeyboardEvent.UP;
		},
		'isKeyboardDomEvent' : function(type){
			return type == OjDomEvent.KEY_DOWN || type == OjDomEvent.KEY_PRESS || type == OjDomEvent.KEY_UP;
		},
		'DOWN'  : 'onKeyDown',
		'PRESS' : 'onKeyPress',
		'UP'    : 'onKeyUp'
	}
);


OJ.extendClass(
	'OjScrollEvent', [OjDomEvent],
	{
		'_get_props_' : {
			'scrollX' : NaN,
			'scrollY' : NaN
		},

		'_constructor' : function(type, scrollX, scrollY/*, bubbles, cancelable*/){
			var args = Array.array(arguments).slice(3);
			args.unshift(type);
			this._super(OjDomEvent, '_constructor', args);
			this._scrollX = scrollX;
			this._scrollY = scrollY;
		},

		'clone' : function(){
			var clone = this._super(OjDomEvent, 'clone', arguments);
			clone._scrollX = this._scrollX;
			clone._scrollY = this._scrollY;
			return clone;
		}
	},
	{
		'convertDomEvent' : function(evt){
			var type;
			evt = OjDomEvent.normalizeDomEvent(evt);
			if(evt.type == 'scroll'){
				type = 'onScroll';
			}
			return new OjScrollEvent(type, evt.target.scrollLeft, evt.target.scrollTop, false, false);
		},
		'isScrollEvent' : function(type){
			return type == 'onScroll';
		},
		'isScrollDomEvent' : function(type){
			return type == 'scroll';
		},

		'SCROLL' : 'onScroll'
	}
);


OJ.extendClass(
	'OjTouchEvent', [OjDomEvent],
	{
		'_get_props_' : {
			'pageX'   : NaN,
			'pageY'   : NaN
		},

		'_constructor' : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
			var args = Array.array(arguments),
				ln = args.length;
			if(ln > 1){
				this._pageX = args.splice(1, 1)[0];
				if(ln > 2){
					this._pageY = args.splice(1, 1)[0];
				}
			}
			this._super(OjDomEvent, '_constructor', args);
		},

		'clone' : function(){
			var clone = this._super(OjDomEvent, 'clone', arguments);
			clone._pageX = this._pageX;
			clone._pageY = this._pageY;
			return clone;
		}
	},
	{
		'convertDomEvent' : function(evt){
			var type;
			evt = OjDomEvent.normalizeDomEvent(evt);
			if(evt.type == OjDomEvent.TOUCH_MOVE){
				type = OjTouchEvent.MOVE;
			}
			else if(evt.type == OjDomEvent.TOUCH_START){
				type = OjTouchEvent.START;
			}
      else if(
        evt.type == OjDomEvent.TOUCH_END || evt.type == OjDomEvent.TOUCH_CANCEL || evt.type == OjDomEvent.TOUCH_LEAVE
      ){
				type = OjTouchEvent.END;
			}
			var new_evt = new OjTouchEvent(type, evt.changedTouches[0].pageX, evt.changedTouches[0].pageY, evt.bubbles, evt.cancelable);
			new_evt._target = OjElement.element(evt.target)
			new_evt._currentTarget = OjElement.element(evt.currentTarget);
			return new_evt;
		},
		'isTouchEvent' : function(type){
			return type == OjTouchEvent.END || type == OjTouchEvent.MOVE || type == OjTouchEvent.START;
		},
		'isTouchDomEvent' : function(type){
			return type == OjDomEvent.TOUCH_END || type == OjDomEvent.TOUCH_MOVE || type == OjDomEvent.TOUCH_START;
		},
		'START' : 'onTouchStart',
		'MOVE'  : 'onTouchMove',
		'END'   : 'onTouchEnd'
	}
);


OJ.extendClass(
	'OjTransformEvent', [OjEvent],
	{
		'_get_props_' : {
			'deltaX'   : 0,
			'deltaY'   : 0,
			'pageX'    : 0,
			'pageY'    : 0
		},

		'_constructor' : function(type, pageX, pageY, deltaX, deltaY/*, bubbles, cancelable*/){
			var args = [].slice.call(arguments, 4);
			args.unshift(type);
			this._super(OjEvent, '_constructor', args);
			this._deltaX = deltaX;
			this._deltaY = deltaY;
			this._pageX = pageX;
			this._pageY = pageY;
		},

		'clone' : function(){
			var clone = this._super(OjEvent, 'clone', arguments);
			clone._deltaX = this._deltaX;
			clone._deltaY = this._deltaY;
			clone._pageX = this._pageX;
			clone._pageY = this._pageY;
			return clone;
		}
	},
	{
		'isTransformEvent' : function(type){
			return type == OjTransformEvent.MOVE || type == OjTransformEvent.RESIZE;
		},
		'MOVE'   : 'onMove',
		'RESIZE' : 'onResize'
	}
);


OJ.extendClass(
	'OjStyleElement', [OjElement],
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
			this._super(OjElement, '_constructor', [source, context]);
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
			return this._super(OjElement, '_destructor', arguments);
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
          try{
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
            else{
              val = this._processReferenceValue(val, context);
            }
            this[setter](val);
          }
					catch(e){
            // setup holder for template reference values for deferred processing
            if(!context._template_vars_){
              context._template_vars_ = [];
            }
            context._template_vars_.unshift({
              'context' : this,
              'func'    : this[setter],
              'value'   : val
            });
          }
					// if the nm is v-align or h-align we want to return false so that the attribute isn't destroyed
					return nm.indexOf('-align') == -1;
				}
			}
			return false;
		},
		'_processAttributes' : function(dom, context){
			var attrs = dom.attributes,
          priority = ['var', 'id'],
          ln = priority.length,
				  attr;
      // process priority attributes first reference
      for(; ln--;){
        if((attr = dom.attributes[priority[ln]]) && this._processAttribute(dom, attr, context)){
          dom.removeAttribute(priority[ln]);
        }
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
    '_processReferenceValue' : function(val, context){
      var ary = val.split('.'),
          target = null,
          ln = ary.length,
          i = 1, item;
      if(ln > 1){
        switch(ary[0]){
          case 'this':
            target = this;
          break;
          case 'window':
            target = window;
          break;
          case '$':
            target = context;
            // if we are not at the top level defer processing template reference values
            if(this != context){
              throw "Template Reference Value Processing Deferred"
            }
          break;
				}
        if(target){
          val = target;
          for(; i < ln; i++){
            item = ary[i];
            if(item.length > 2 && item.slice(-2) == '()'){
              val = val[item.slice(0, -2)]();
            }
            else{
              val = val[item];
            }
          }
        }
      }
      return val;
    },
    '_processTemplateVars' : function(){
      if(this._template_vars_){
        var ln = this._template_vars_.length,
            item, context;
        for(; ln--;){
          item = this._template_vars_[ln];
          context = item.context;
          item.func.call(context, this._processReferenceValue(item.value, this));
        }
        this._unset('_template_vars_');
      }
    },
		'_setDom' : function(dom, context){
			// todo: re-evaluate the pre-render functionality of dom
			this._super(OjElement, '_setDom', [dom]);
			// process the attributes
			this._processAttributes(dom, context);
			// process the children
			this._processChildren(dom, context);
      // process any template vars
      this._processTemplateVars();
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
			this._super(OjElement, '_setIsDisplayed', arguments);
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
        evt = OjMouseEvent.convertDomEvent(evt);
        proxy._onEvent(evt);
        if(evt.getType() == OjMouseEvent.DOWN && proxy.hasEventListener(OjMouseEvent.UP_OUTSIDE)){
          OJ.addEventListener(OjMouseEvent.UP, proxy, '_onOjMouseUp');
        }
			}
		},
		'_onDomOjKeyboardEvent' : function(evt){
			var proxy = OjElement.element(this);
			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjKeyboardEvent.convertDomEvent(evt));
			}
		},
		'_onDomOjFocusEvent' : function(evt){
			var proxy = OjElement.element(this);
			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjFocusEvent.convertDomEvent(evt));
			}
		},
		'_onDomScrollEvent' : function(evt){
			var proxy = OjElement.element(this);
			if(proxy && proxy._processEvent(evt)){
				proxy._onScroll(OjScrollEvent.convertDomEvent(evt));
			}
		},
		'_onDomTouchEvent' : function(evt){
			var proxy = OjElement.element(this);
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
    '_onOjMouseUp' : function(evt){
      OJ.removeEventListener(OjMouseEvent.UP, this, '_onOjMouseUp');
      if(this.hitTestPoint(evt.getPageX(), evt.getPageY())){
        return;
      }
      this.dispatchEvent(evt);
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
        this._onEvent(new OjMouseEvent(type, x, y, true, true));
				// if the touch hasn't moved then issue a click event
        if(type == OjMouseEvent.UP && !this.hasEventListener(OjDragEvent.START)){
					this._onEvent(new OjMouseEvent(OjMouseEvent.CLICK, x, y, true, true));
				}
			}
			return true;
		},

		// event listener overrides
		// customize this functionality for dom events so that they work
		'_updateTouchStartListeners' : function(){
			if(!this.hasEventListeners(OjMouseEvent.DOWN, OjMouseEvent.CLICK, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){
				this._getEventProxy().ontouchstart = null;
			}
		},
		'_updateTouchMoveListeners' : function(){
			if(!this.hasEventListeners(OjMouseEvent.MOVE, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){//}, OjScrollEvent.SCROLL)){
				this._getEventProxy().ontouchmove = null;
			}
		},
		'_updateTouchEndListeners' : function(){
			if(!this.hasEventListeners(OjMouseEvent.UP, OjMouseEvent.UP_OUTSIDE, OjMouseEvent.CLICK, OjDragEvent.END)){
        var proxy = this._getEventProxy();
				proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = null;
			}
		},
		'addEventListener' : function(type){
			var is_touch = OJ.isTouchCapable(),
				  proxy = this._getEventProxy();
      this._super(OjElement, 'addEventListener', arguments);
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
					proxy.ontouchstart = proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
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
          proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
				}
				else{
					proxy.onmouseup = this._onDomOjMouseEvent;
				}
			}
      else if(type == OjMouseEvent.UP_OUTSIDE){
        if(is_touch){
          proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
				}
				else{
					proxy.onmousedown = this._onDomOjMouseEvent;
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
			var proxy = this._getEventProxy();
			this._super(OjElement, 'removeEventListener', arguments);
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
				if(!this.hasEventListeners(OjMouseEvent.DOWN, OjMouseEvent.UP_OUTSIDE, OjDragEvent.DRAG)){
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
      else if(type == OjMouseEvent.UP_OUTSIDE){
        if(!this.hasEventListener(OjMouseEvent.DOWN)){
          proxy.onmousedown = null;
          OJ.removeEventListener(OjMouseEvent.UP, proxy, '_onOjMouseUp');
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
    'getId' : function(){
      return this._id;
    },
		'setId' : function(val){
			if(this._id == val){
				return
			}
      // unregister the old id
      OjElement.unregister(this);
			this._proxy.ojProxy = this._dom.id = this._id = val;
      // register the new id
      OjElement.register(this);
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
			this._dom.innerHTML = String.string(str).html();
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
			if(this._proxy.getBoundingClientRect){
				return this._proxy.getBoundingClientRect().left;
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
			if(this._proxy.getBoundingClientRect){
				return this._proxy.getBoundingClientRect().top;
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
	'OjTextElement', [OjElement],
	{
		'_constructor' : function(/*text*/){
			var args = arguments,
				ln = args.length,
				is_dom = ln && isDomElement(args[0]);
			this._super(OjElement, '_constructor', is_dom ? [args[0]] : []);
			if(ln && !is_dom){
				this.setText(args[0]);
			}
		},
		'_setDom' : function(dom_elm, context){
			// force text dom elm
			if(dom_elm.nodeName != "#text"){
				dom_elm = document.createTextNode(dom_elm.innerText);
			}
			this._super(OjElement, '_setDom', [dom_elm]);
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
      this._dom.nodeValue = String.string(str);
		}
	}
);


OJ.extendClass(
	'OjTimer', [OjActionable],
	{
		'_props_' : {
			'duration'    : 0,
			'repeatCount' : 0 // run n additional times, negative value means run forever
		},
		'_get_props_' : {
			'count' : 0,
			'state' : 'stopped' // OjTimer.STOPPED
		},
		'_last_tick' : 0,

		'_constructor' : function(/*duration, repeat_count*/){
			this._super(OjActionable, '_constructor', []);
			var args = arguments,
				ln = args.length;
			if(ln){
				this.setDuration(args[0]);
				if(ln > 1){
					this.setRepeatCount(args[1]);
				}
			}
		},
		'_destructor' : function(){
			TimerManager.unregisterTimer(this);
			return this._super(OjActionable, '_destructor', arguments);
		},

		'_tick' : function(){
			this.dispatchEvent(new OjEvent(OjTimer.TICK));
			if(this._repeatCount > 0 && this._count++ == this._repeatCount){
				this.stop();
				this.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
			}
		},

		'isPaused' : function(){
			return this._state == OjTimer.PAUSED;
		},
		'isRunning' : function(){
			return this._state == OjTimer.RUNNING;
		},
		'isStopped' : function(){
			return this._state == OjTimer.STOPPED;
		},

		'pause' : function(){
			this._state = OjTimer.PAUSED;
			TimerManager.unregisterTimer(this);
		},
		'restart' : function(){
			this.stop();
			this.start();
		},
		'start' : function(){
			if(!this.isRunning()){
				this._state = OjTimer.RUNNING;
				TimerManager.registerTimer(this);
			}
		},
		'stop' : function(){
			this.pause();
			this._count = 0;
			this._state = OjTimer.STOPPED;
		},

		'setDuration' : function(duration){
			if(this._duration != duration){
				this._duration = Math.abs(duration);
				TimerManager.updateTimer(this);
			}
		},
		'setRepeatCount' : function(repeat_count){
			this._repeatCount = Math.max(repeat_count, 0);
			if(repeat_count >= this._count && this.isRunning()){
				this.stop();
				this.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
			}
		}
	},
	{
		'TICK'     : 'onTimerTick',
		'COMPLETE' : 'onTimerComplete',
		'PAUSED'   : 'paused',
		'RUNNING'  : 'running',
		'STOPPED'  : 'stopped',

		'SECOND'   : 1000,
		'MINUTE'   : 60000,
		'HOUR'     : 3600000,
		'DAY'      : 86400000
	}
);


OJ.extendManager(
	'TimerManager', 'OjTimerManager', [OjActionable],
	{
		'_callback' : null,  '_timers' : {},  '_timer_count' : 0,  '_min_interval' : 999999,  '_interval' : null,

		'_constructor' : function(){
            this._super(OjActionable, '_constructor', []);
			this._callback = this._tick.bind(this);
		},
		'_destructor' : function(){
			this._callback = null;
			return this._super(OjActionable, '_destructor', arguments);
		},

		'_updateInterval' : function(){
			if(this._timer_count){
				var key, min_interval = this._min_interval;
				for(key in this._timers){
					min_interval = Math.min(min_interval, this._timers[key].getDuration());
				}
				if(this._min_interval != min_interval){
					this._min_interval = min_interval;
					clearInterval(this._interval);
					this._interval = setInterval(this._callback, Math.max(this._min_interval / 3, 10));
					this._tick();
				}
			}
			else{
				clearInterval(this._interval);
				this._min_interval = 999999;
			}
		},
		'_tick' : function(){
			var key, tick = Date.time(), timer;
			for(key in this._timers){
				timer = this._timers[key];
				if(timer._duration < tick - timer._last_tick){
					timer._last_tick = tick;
					setTimeout('TimerManager._timerTick("' + key + '")', 0);
//          TimerManager._timerTick(key);
				}
			}
		},
		'_timerTick' : function(timer_id){
			if(TimerManager._timers[timer_id]){
				TimerManager._timers[timer_id]._tick();
			}
		},

		'timer' : function(/*interval, repeat_count*/){
			var ln = arguments.length;
			if(!ln){
				return new OjTimer();
			}
			if(ln == 1){
				return new OjTimer(arguments[0]);
			}
			return new OjTimer(arguments[0], arguments[1]);
		},

		'registerTimer' : function(timer){
			var id = timer.id();
			if(this._timers[id] != timer){
				this._timers[id] = timer;
				timer._last_tick = Date.time();
				this._timer_count++;
				this._updateInterval();
			}
		},
		'updateTimer' : function(timer){
			if(this._timers[timer.id()]){
				this._updateInterval();
			}
		},
		'unregisterTimer' : function(timer){
			var id = timer.id();
			if(this._timers[id]){
				delete this._timers[id];
				this._timer_count--;
				this._updateInterval();
			}
		}
	}
);


OJ.extendManager(
	'HistoryManager', 'OjHistoryManager', [OjActionable],
	{
		'_previous' : null,  '_next' : null,  '_current' : 0,  '_native' : false,  '_timer' : 0,
		'_ignore_next' : false,  '_list' : null,

		'PREVIOUS'  : 'previous',
		'NEXT'      : 'next',
		'FORWARD'   : 'historyForward',
		'BACK'      : 'historyBack',
		'CHANGE'    : 'historyChange',

		'_constructor' : function(){
			this._super(OjActionable, '_constructor', []);
			this._list = [new OjUrl(window.location.href)];
			try{
				var prev = window.history.previous;
				this._native = true;
				prev = null;
			}
			catch(e){}
			if('onhashchange' in window){
				// Add listener for url change
				window.onhashchange = function(evt){
					HistoryManager._onChange(evt)
				};
			}
			else{
				// Add timer to listener for url change
				this._timer = new OjTimer(1000, 0);
				this._timer.addEventListener(OjTimer.TICK, HistoryManager, '_onChange');
				this._timer.start();
			}
		},
		'_destructor' : function(){
			OJ.destroy(this._timer);
			return this._super(OjActionable, '_destructor', arguments);
		},

		'_onChange' : function(){
			var old_url = HistoryManager.get();
			// check to see if the url has changed
			if(old_url.toString() != window.location.href){
				var new_url = new OjUrl(window.location.href);
				// check to see if the url change was page driven or browser driven
				// < 0 browser driven
				// > -1 page driven
				if(OJ.getDepth() < 0){
					// check for a back button click
					if(new_url.toString() == this.get(-1).toString()){
						this._current--;
					}
					// check for a forward button click
					else if(new_url.toString() == this.get(this._current + 1).toString()){
						this._current++;
					}
					// we assume that if it wasn't a forward or a back button click that we know of then it is a back button click we did not know about
					// therefore we make an adjustment to our history list and current positioning
					else{
						this._current = 0;
						this._list.unshift(new_url);
					}
				}
				else{
					if(this._current == 0){
						this._list = [this._list[0]];
					}
					else{
						this._list = this._list.slice(0, this._current + 1);
					}
					this._list.push(new_url);
					this._current = this._list.length - 1;
				}
				this._previous = this.get(-1);
				this._next = this.get(this._current + 1);
				this._dispatchChange(old_url, new_url);
			}
		},
		'_dispatchChange' : function(old_url, new_url){
			this.dispatchEvent(new OjEvent(HistoryManager.CHANGE, true));
		},

		'get' : function(){
			var url, index = arguments.length ? arguments[0] : this._current;
			if(this._native){
				if(window.history[index]){
					return new OjUrl(window.history[index]);
				}
				url = this._list[index];
			}
			else if(index < 0){
				url = this._list[Math.max(this._current + index, 0)];
			}
			else if(index >= this._list.length){
				url = this._list[this._list.length - 1];
			}
			else {
				url = this._list[index];
			}
			return url ? url.clone() : null;
		},
		'previous' : function(){
			return this._previous;
		},
		'next' : function(){
			return this._next;
		},
		'go' : function(val){
			if(this._native){
				window.history.go(val);
				return;
			}
			var url;
			if(isNaN(index)){
				var ln = this._list.length;
				while(ln-- > 0){
					if(this._list[ln].toString() == val){
						url = val;
						break;
					}
				}
				this._current = ln;
			}
			else{
				url = this.get(val);
				this._current = val;
			}
			OJ.open(url);
		},
		'forward' : function(){
			if(this._native){
				window.history.forward();
				return;
			}
			OJ.open(this.get(this._current + 1));
		},
		'back' : function(){
			if(this._native){
				window.history.back();
				return;
			}
			OJ.go(this.get(this._current - 1));
		},
		'length' : function(){
			return this._list.length;
		}
	}
);

// t = time, o = origin, d = delta, l = length
window.OjEasing = {
	'NONE' : function(t, o, d, l){
		return ((d * t) / l) + o;
	},
	'IN' : function(t, o, d, l){
		return (-d * Math.cos((t / l) * (Math.PI / 2))) + d + o;
	},
	'OUT' : function(t, o, d, l){
		return (d * Math.sin((t / l) * (Math.PI / 2))) + o;
	},
	'IN_OUT' : function(t, o, d, l){
		return ((-d / 2) * (Math.cos((Math.PI * t) / l) - 1)) + o;
	},
	'STRONG_IN' : function(t, o, d, l){
		return (t == 0) ? o : d * Math.pow(2, 10 * ((t / l) - 1)) + o;
	},
	'STRONG_OUT' : function(t, o, d, l){
		return (t == l) ? o + d : d * (-Math.pow(2, -10 * (t / l)) + 1) + o;
	},
	'STRONG_IN_OUT' : function(t, o, d, l){
		if(t == 0){ return o; }
		if(t == l){ return o + d; }
		t = t / (l / 2);
		if(t < 1){ return (d / 2) * Math.pow(2, 10 * (t - 1)) + o; }
		return (d / 2) * (-Math.pow(2, -10 * --t) + 2) + o;
	},
	'ELASTIC_IN' : function(t, o, d, l, a, p){
		if(t == 0){ return o; }
		t = t / l;
		if(t == 1){ return o + d; }
		if(!p){ p = l * .3; }
		var s;
		if(!a || a < Math.abs(d)){
			a = d;
			s = p / 4;
		}
		else{
			s = (p / (2 * Math.PI)) * Math.asin(d / a);
		}
		return (-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * l) - s) * (2 * Math.PI) / p))) + d;
	},
	'ELASTIC_OUT' : function(t, o, d, l, a, p){
		if(t == 0){ return o; }
		t = t / l;
		if(t == 1){ return o + d; }
		if(!p){ p = l * .3; }
		var s;
		if(!a || a < Math.abs(d)){
			a = d;
			s = p / 4;
		}
		else{
			s = (p / (2 * Math.PI)) * Math.asin(d / a);
		}
		return (a * Math.pow(2, -10 * t) * Math.sin((t * l - s) * (2 * Math.PI) / p) + d + o);
	},
	'ELASTIC_IN_OUT' : function(t, o, d, l, a, p){
		if(t == 0){ return o; }
		t = t / (l / 2);
		if(t == 2){ return o + d; }
		if(!p){ p = l * (.3 * 1.5); }
		var s;
		if(!a || a < Math.abs(d)){
			a = d;
			s = p / 4;
		}
		else{
			s = (p / (2 * Math.PI)) * Math.asin(d / a);
		}
		if(t < 1){ return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * l - s) * (2 * Math.PI) / p)) + o; }
		return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * l - s) * (2 * Math.PI) / p) * .5 + d + o;
	}
};


OJ.extendClass(
	'OjTweenEvent', [OjEvent],
	{
		'_get_props_' : {
			'progress' : 0,
			'value'    : 0
		},

		'_constructor' : function(type, value, progress/*, bubbles = false, cancelable = false*/){
			var progress = 0,
				bubbles = false,
				cancelable = false,
				args = arguments,
				ln = args.length;
			this._value = value;
			this._progress = progress;
			if(ln > 3){
				bubbles = args[3];
				if(ln > 4){
					cancelable = args[4];
				}
			}
			this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'TICK'     : 'onTweenTick',
		'COMPLETE' : 'onTweenComplete'
	}
);

// normalize browser diff on requestAnimationFrame function
(function(){
  var vendors = ['o', 'ms', 'webkit', 'moz'],
      ln = vendors.length,
      vendor;
  for(; ln-- && !window.requestAnimationFrame;){
    vendor = vendors[ln];
    window.requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
  }
})();

OJ.extendClass(
	'OjTween', [OjActionable],
	{
		'_props_' : {
			'duration' : null,
			'easing'   : null,
			'from'     : null,
			'quality'  : 60,  // frame rate
			'to'       : null
		},
//	  '_animationFrame': null,  '_onAnimationFrame': null,  '_start': null,  '_timer': null,
		'_delta' : 0,  '_progress' : 0,

		'_constructor' : function(/*from = null, to = null, duration = 500, easing = NONE*/){
			this._super(OjActionable, '_constructor', []);
      this._processArguments(arguments, {
        'setFrom'     : null,
        'setTo'       : null,
        'setDuration' : 250,
        'setEasing'   : OjEasing.NONE
      });
      this._onAnimationFrame = this._onTick.bind(this);
		},

		'_destructor' : function(){
      this.stop();
			this._unset(['_timer', '_onAnimationFrame']);
			return this._super(OjActionable, '_destructor', arguments);
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
			var time = Math.min(Date.time() - this._start, this._duration);
      this._tick(time);
			if(time == this._duration){
				this.stop();
        this._onComplete(evt);
			}
      else if(this._animationFrame){
        this._animationFrame = window.requestAnimationFrame(this._onAnimationFrame);
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
			this._calculateDelta();
      this._start = Date.time() - this._progress;
      // only create the time once
      if(OjTween.USE_RAF){
        this._animationFrame = window.requestAnimationFrame(this._onAnimationFrame);
      }
      else{
        this._interval = setInterval(this._onAnimationFrame, 1000 / this._quality);
      }
		},
		'pause' : function(){
      if(this._animationFrame){
        window.cancelAnimationFrame(this._animationFrame);
        return this._animationFrame = null;
      }
      this._interval = clearInterval(this._interval);
      this._progress = Date.time() - this._start;
		},
		'stop' : function(){
      this.pause();
      this._progress = this._start = 0;
		},
		'restart' : function(){
      this.stop();
      this.start();
		},
		'reverse' : function(){
			// todo: implement tween reverse
		}
	},
  {
    'USE_RAF' : (OJ.getOs() != OJ.IOS || OJ.getOsVersion().compareVersion('6.9') == 1 || !OJ.getBrowserIsWebView()) && window.requestAnimationFrame
  }
);


OJ.extendClass(
	'OjPropTween', [OjTween],
	{
		'_props_' : {
			'mode'     : 'Javascript',
			'target'   : null
		},
		'_callback' : null,  '_delta' : null,  '_from_cache' : null,

		'_constructor' : function(/*target = null, to = null, duration = 500, easing = NONE*/){
			this._super(OjTween, '_constructor', []);
			var ln = arguments.length;
			if(ln){
				this.setTarget(arguments[0]);
				if(ln > 1){
					this.setTo(arguments[1]);
					if(ln > 2){
						this.setDuration(arguments[2]);
						if(ln > 3){
							this.setEasing(arguments[3]);
						}
					}
				}
			}
			var engine = OJ.getEngine();
			if(engine == OJ.WEBKIT && !OJ.isMobile()){
//						this._mode = OjPropTween.WEBKIT;
			}
		},
		'_destructor' : function(){
			this._callback = null;
			return this._super(OjTween, '_destructor', arguments);
		},

		'_calculateDelta' : function(){
			this._from_cache = {};
			this._delta = {};
			var has_from = !isEmptyObject(this._from), key, new_key, transition_properties = '';
			for(key in this._to){
				new_key = 'set' + key.ucFirst();
				if(!has_from){
					this._from[key] = this._target['get' + key.ucFirst()]();
				}
				this._from_cache[new_key] = parseFloat(this._from[key]);
				this._delta[new_key] = parseFloat(this._to[key]) - this._from_cache[new_key];
				if(transition_properties != ''){
					transition_properties += ', ';
				}
				transition_properties += OjPropTween.PROPERTY_CSS_MAP[key];
			}
		},
		'_isAnimating' : function(val){
			if(this._target && this._target.is('OjComponent')){
				this._target._setIsAnimating(val);
			}
		},
		'_tick' : function(time){
			var key;
			for(key in this._delta){
        this._target[key](
          Math.round(
            this._easing(time, this._from_cache[key], this._delta[key], this._duration, 0, 0)
            * 1000
          ) / 1000
        );
			}
		},

		'_onComplete' : function(evt){
			this._isAnimating(false);
			this._super(OjTween, '_onComplete', arguments);
		},
		'_onTargetDestroy' : function(evt){
			this._super(OjTween, 'stop', arguments);
			this.setTarget(null);
		},
		'_onWebKitComplete' : function(evt){
			var prop = OjPropTween.CSS_PROPERTY_MAP[evt.propertyName];
			if(isUndefined(this._from[prop])){
				return;
			}
			// cleanup the webkit transition settings
			this._target._setStyle('-webkit-transition-duration', null);
			this._target._setStyle('-webkit-transition-property', null);
			this._target.dom().removeEventListener('webkitTransitionEnd', this._callback, false);
			this._onComplete(evt);
			this._callback = null;
		},

		'pause' : function(){
			this._isAnimating(false);
			this._super(OjTween, 'pause', arguments);
		},
		'start' : function(){
			if(!isSet(this._target) || !isSet(this._to)){
				return;
			}
			if(!isSet(this._from)){
				this._from = {};
			}
			this._isAnimating(true);
			if(this._mode == OjPropTween.WEBKIT){
				var key;
				this._calculateDelta();
				this._target._setStyle('-webkit-transition-duration', this._duration + 'ms');
				this._target._setStyle('-webkit-transition-property', transition_properties);
				// add in easing setting later
				this._target.dom().addEventListener('webkitTransitionEnd', this._callback = this._onWebKitComplete.bind(this), false);
				for(key in this._delta){
					this._target[key](this._from_cache[key] + this._delta[key]);
				}
				// maybe add fallback timer to trigger event in case something goes wrong...
			}
			else{
				this._super(OjTween, 'start', arguments);
			}
		},
		'stop' : function(){
			this._isAnimating(false);
			this._super(OjTween, 'stop', arguments);
		},

		'setMode' : function(val){
			if(this._mode == val){
				return;
			}
			this._mode = val;
			if(this._timer){
				OJ.destroy(this._timer);
			}
		},
		'setTarget' : function(target){
			if(this._target == target){
				return;
			}
			if(this._target){
				this._target.removeEventListener(OjEvent.DESTROY, this, '_onTargetDestroy');
			}
			if(this._target = target){
				this._target.addEventListener(OjEvent.DESTROY, this, '_onTargetDestroy');
			}
		}
	},
	{
		'PROPERTY_CSS_MAP' : {
			'alpha'     : 'opacity',
			'x'         : 'left',
			'y'         : 'top',
			'width'     : 'width',
			'height'    : 'height'
		},
		'CSS_PROPERTY_MAP' : {
			'opacity'   : 'alpha',
			'left'      : 'x',
			'right'     : 'y',
			'width'     : 'width',
			'height'    : 'height'
		},
		'JS'     : 'Javascript',
		'WEBKIT' : 'WebKit'
	}
);


OJ.extendClass(
	'OjFade', [OjPropTween],
	{
		'_props_' : {
			'direction' : 'fadeIn', // OjFade.IN
			'duration'  : 250
		},
		'_force' : false,

		'_constructor' : function(/*target = null, direction = IN, duration = 250, easing = NONE*/){
			this._super(OjPropTween, '_constructor', []);
			var args = arguments,
				ln = args.length;
			if(ln){
				this.setTarget(args[0]);
				if(ln > 1){
					this.setDirection(args[1]);
					if(ln > 2){
						this.setDuration(args[2]);
						if(ln > 3){
							this.setEasing(args[3]);
						}
					}
				}
			}
		},

		'_onComplete' : function(evt){
			if(this._direction == OjFade.NONE){
				this._target.setAlpha(1);
				this._target.hide();
			}
			this._super(OjPropTween, '_onComplete', arguments);
		},

		'start' : function(){
      // for some reason this happens every once and awhile
			if(!this._target){
				return;
			}
			if(!this._to){
				this._to = {};
			}
			if(this._direction == OjFade.IN){
				if(this._force || this._target.getAlpha() == 1){
					this._target.setAlpha(0);
				}
				this._to['alpha'] = 1;
			}
			else{
				if(this._force || this._target.getAlpha() == 0){
					this._target.setAlpha(1);
				}
				this._to['alpha'] = 0;
			}
			this._target.show();
			this._super(OjPropTween, 'start', arguments);
		}
	},
	{
		'IN'   : 'onFadeIn',
		'NONE' : 'onFadeNone',
		'OUT'  : 'onFadeOut'
	}
);


OJ.extendClass(
	'OjComponent', [OjStyleElement],
	{
		'_props_' : {
			'isActive'    : false,
			'isDisabled'  : false
		},
		'_get_props_' : {
			'isAnimating' : false
		},

		'_constructor' : function(){
			var args = [null, this];
			// process the template if any
			if(this._template){
				if(this._template.charAt(0) == '<'){
					args[0] = this._template;
				}
				else{
					args[0] = OJ.importTemplate(this._template);
				}
			}
			// call super constructor
			this._super(OjStyleElement, '_constructor', args);
			// add the class name inheritance as css classes
			this.addCss(this._class_names.slice(this._class_names.indexOf('OjComponent')));
			// setup the container
			this._setContainer(this.container ? this.container : this);
		},
		// override this so that the component gets properly set
		'_processChild' : function(dom, context){
			return this._super(OjStyleElement, '_processChild', [dom, context ? context : this]);
		},
		'_processDomSourceAttributes' : function(dom, context){
			this._processAttributes(dom, context);
		},
		'_processDomSourceChild' : function(dom_elm, context){
			if(OjElement.isCommentNode(dom_elm)){
				return null;
			}
			return this._processChild(dom_elm, context);
		},
		'_processDomSourceChildren' : function(dom, context){
			var child,
				children = dom.childNodes,
				i = 0,
				ln = children.length;
			for(; i < ln; i++){
				if(child = this._processDomSourceChild(children[i], context)){
					this.addElm(child);
				}
				else{
					dom.removeChild(children[i]);
				}
				// if we add then we need to decrement the counter and length since
				// a child will have been removed from the child nodes array
				i--;
				ln--;
			}
		},

		'_setContainer' : function(container){
			this._setElmFuncs(container);
			if(this.container == container){
				return;
			}
			if(this.container){
				this.container.removeCss(['container']);
			}
			if((this.container = container) != this){
				this.container.addCss(['container']);
			}
		},
		'_setDomSource' : function(dom, context){
			// setup our vars
			var ary, prev, nm, val, ln, i,
				is_body = (dom == document.body),
				source = is_body ? this._dom : dom,
				target = is_body ? dom : this._dom;
			// prevent events from dispatching while we are setting everything up
//			this._prevent_dispatch = true;
			// process dom attributes
			this._processDomSourceAttributes(dom, context);
			// copy over attributes
			ln = (ary = source.attributes).length;
			for(; ln--;){
				i = ary[ln];
				nm = i.nodeName;
				val = i.value;
				if(nm == 'class'){
					prev = target.getAttribute(nm);
					target.className = (String.string(prev) + ' ' + val).trim();
				}
				else if(nm == 'id'){
					target.id = val;
				}
				else{
					target.setAttribute(nm, val);
				}
			}
			// process the dom children
			this._processDomSourceChildren(dom, context);
			// copy over the children
			if(dom.parentNode){
				if(is_body){
					ln = (ary = source.children).length;
					i = 0;
					for(; i < ln; i++){
						target.appendChild(ary[0]);
					}
				}
				else{
					source.parentNode.replaceChild(target, source);
				}
			}
			// reengage event dispatching now that everything is setup
//			this._prevent_dispatch = false;
			// update our dom var to the target
			this._dom = target;
      // process any template vars
      this._processTemplateVars();
		},
		'_setElmFuncs' : function(container){
			this._elm_funcs = container != this && container.is('OjComponent') ?
				{
					'addElm'        : 'addElm',
					'addElmAt'      : 'addElmAt',
					'getElmAt'      : 'getElmAt',
					'getElms'       : 'getElms',
					'hasElm'        : 'hasElm',
					'indexOfElm'    : 'indexOfElm',
					'moveElm'       : 'moveElm',
					'numElms'       : 'numElms',
					'removeAllElms' : 'removeAllElms',
					'removeElm'     : 'removeElm',
					'removeElmAt'   : 'removeElmAt',
					'replaceElm'    : 'replaceElm',
					'replaceElmAt'  : 'replaceElmAt',
					'setElms'       : 'setElms'
				} :
				{
					'addElm'        : 'addChild',
					'addElmAt'      : 'addChildAt',
					'getElmAt'      : 'getChildAt',
					'getElms'       : 'getChildren',
					'hasElm'        : 'hasChild',
					'indexOfElm'    : 'indexOfChild',
					'moveElm'       : 'moveChild',
					'numElms'       : 'numChildren',
					'removeAllElms' : 'removeAllChildren',
					'removeElm'     : 'removeChild',
					'removeElmAt'   : 'removeChildAt',
					'replaceElm'    : 'replaceChild',
					'replaceElmAt'  : 'replaceChildAt',
					'setElms'       : 'setChildren'
				};
		},
		'_setIsAnimating' : function(val){
			if(this._isAnimating == val){
				return;
			}
			if(this._isAnimating = val){
				this.addCss(['animating']);
			}
			else{
				this.removeCss(['animating']);
			}
		},
		'_setIsDisplayed' : function(displayed){
			if(this._is_displayed == displayed){
				return;
			}
			this._super(OjStyleElement, '_setIsDisplayed', arguments);
			if(displayed){
				this.redraw();
			}
		},

		'_processEvent' : function(evt){
			if(this._isDisabled){
				return false;
			}
			return this._super(OjStyleElement, '_processEvent', arguments);
		},

		// Component Management Functions
		'_getContainer' : function(){
			return this.container;
		},
		'_callElmFunc' : function(func, args){
			var container = this._getContainer();
			if(!this._elm_funcs[func]){
				return;
			}
			if(func == 'addElm'){
				this._addElm(args[0], this.numElms());
			}
			else if(func == 'addElmAt'){
				this._addElm(args[0], args[1]);
			}
			else if(func == 'removeElm'){
				this._removeElm(args[0], this.indexOfElm(args[0]));
			}
			else if(func == 'removeElmAt'){
				this._removeElm(this.getElmAt(args[0]), args[0]);
			}
			else if(func == 'moveElm'){
				this._moveElm(args[0], args[1]);
			}
			else if(func == 'replaceElm'){
				this._replaceElm(args[0], this.indexOfElm(args[0]), args[1]);
			}
			else if(func == 'replaceElmAt'){
				this._replaceElm(this.getElmAt(args[0]), args[0], args[1]);
			}
			else if(func == 'removeAllElms'){
				this._removeAllElms();
			}
			return container[this._elm_funcs[func]].apply(container, args);
		},
		'_addElm' : function(elm, index){ },
		'_moveElm' : function(elm, index){ },
		'_removeAllElms' : function(){ },
		'_removeElm' : function(elm, index){ },
		'_replaceElm' : function(elm, index, new_elm){ },
		'addElm' : function(elm){
			return this._callElmFunc('addElm', Array.array(arguments));
		},
		'addElmAt' : function(elm, index){
			return this._callElmFunc('addElmAt', Array.array(arguments));
		},
		'getElmAt' : function(index){
			return this._callElmFunc('getElmAt', Array.array(arguments));
		},
		'getElms' : function(){
			return this._callElmFunc('getElms', Array.array(arguments));
		},
		'hasElm' : function(elm){
			return this._callElmFunc('hasElm', Array.array(arguments));
		},
		'indexOfElm' : function(elm){
			return this._callElmFunc('indexOfElm', Array.array(arguments));
		},
		'moveElm' : function(){
			return this._callElmFunc('moveElm', Array.array(arguments));
		},
		'numElms' : function(){
			return this._callElmFunc('numElms', Array.array(arguments));
		},
		'removeAllElms' : function(){
			return this._callElmFunc('removeAllElms', Array.array(arguments));
		},
		'removeElm' : function(elm){
			return this._callElmFunc('removeElm', Array.array(arguments));
		},
		'removeElmAt' : function(index){
			return this._callElmFunc('removeElmAt', Array.array(arguments));
		},
		'replaceElm' : function(target, replacement){
			return this._callElmFunc('replaceElm', Array.array(arguments));
		},
		'replaceElmAt' : function(elm, index){
			return this._callElmFunc('replaceElmAt', Array.array(arguments));
		},
		'setElms' : function(elms){
			return this._callElmFunc('setElms', Array.array(arguments));
		},

		// event handling functions
		'_onFadeComplete' : function(evt){
			this.setAlpha(1);
			if(this._fader.getDirection() == OjFade.OUT){
				this.hide();
			}
			else{
				this.show();
			}
			this._setIsAnimating(false);
			this._unset('_fader');
		},

		'fadeIn' : function(/*duration, easing*/){
			var args = arguments,
				ln = args.length;
			if(this._fader){
				if(this._fader.getDirection() == OjFade.IN){
					return;
				}
				this._fader.stop();
				this._unset('_fader');
			}
			else if(this.isVisible()){
				return;
			}
			this.show();
			this._fader = new OjFade(this, OjFade.IN, ln ? args[0] : 250, ln > 1 ? args[1] : OjEasing.NONE);
			this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
			this._fader.start();
			this._setIsAnimating(true);
		},
		'fadeOut' : function(){
			var args = arguments,
				ln = args.length;
			if(this._fader){
				if(this._fader.getDirection() == OjFade.OUT){
					return;
				}
				this._fader.stop();
				this._unset('_fader');
			}
			else if(!this.isVisible()){
				return;
			}
			this._fader = new OjFade(this, OjFade.OUT, ln ? args[0] : 250, ln > 1 ? args[1] : OjEasing.NONE);
			this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
			this._fader.start();
			this._setIsAnimating(true);
		},
		'redraw' : function (/*force=false*/){
			var args = arguments;
			return this._is_displayed || (args.length && args[0]);
		},
		'getTargetId' : function(){
			return this.id();
		},
		'setIsActive' : function(val){
			if(this._isActive != val){
				if(this._isActive = val){
					this.addCss(['active']);
				}
				else{
					this.removeCss(['active']);
				}
			}
		},
		'setIsDisabled' : function(val){
			if(this._isDisabled != val){
				if(this._isDisabled = val){
					this.addCss(['disabled']);
				}
				else{
					this.removeCss(['disabled']);
				}
			}
		}
	},
	{
		'_TAGS' : [],
		'load' : function(source){
// todo: refactor load media function
//			// determine what action to take based on the extension of the src
//			// default action is to request the uri and then load the contents into the widgets
//			// however we can also display flash, videos, audio and images
//			var widget,
//				type = OJ.getFileType(source);
//
//			this.empty();
//
//			if(type == OJ.HTML){
//				// load the file and put the html into the container
//			}
//			else{
//				var w, h;
//
//				if(type == OJ.IMAGE){
//					//
//					widget = new OjImage();
//				}
//				else if(type == OJ.FLASH){
//					//
//					widget = new OjFlash();
//
//					w = '100%';
//					h = 300;
//				}
//				else if(type == OJ.VIDEO || type == OJ.AUDIO || type == OJ.STREAMING){
//					OJ.importJs('oj.media.OjMediaPlayer');
//
//					widget = new OjMediaPlayer();
//
//					w = '100%';
//					h = '100%';
//				}
//				else{
//					importJs('oj.widgets.Container');
//
//					widget = new OjView();
//				}
//
//				widget.source(_source);
//
//				if(isNull(w)){
//					w = widget.width();
//				}
//
//				if(isNull(h)){
//					h = widget.height();
//				}
//
//				if((isEmpty(this.css('width')) || this.css('width') == 'auto') && w){
//					this.width(w);
//				}
//
//				if((isEmpty(this.css('height')) || this.css('height') == 'auto') && h){
//					this.height(h);
//				}
//
//				this.add(widget);
//			}
//
//			return source;
		}
	}
);


OJ.extendComponent(
	'OjSpinner', [OjComponent],
	{
		'_props_' : {
			'numBlades' : null,
			'period'    : 1,
			'tint'      : '#FFFFFF'
		},
		'_position' : 0,  '_template' : '<div><div var=wrapper></div></div>',

		'_constructor' : function(/*tint, period, num_blades*/){
			var args = arguments,
				ln = args.length,
				num_blades = 13;
			this._super(OjComponent, '_constructor', []);
			if(ln){
				this.setTint(args[0]);
				if(ln > 1){
					this.setPeriod(args[1]);
					if(ln > 2){
						num_blades = args[2];
					}
				}
			}
			this._translate = new OjCssTranslate(70, 0, '%');
			// setup the timer
			this._timer = new OjTimer(1000, 0);
			this._timer.addEventListener(OjTimer.TICK, this, '_onTimer');
			// setup the blades
			this.setNumBlades(num_blades);
			// start the timer/animation
			this.start();
		},
		'_destructor' : function(){
			this._unset('_timer');
			return this._super(OjComponent, '_destructor', arguments);
		},

		'_setIsDisplayed' : function(){
			var timer = this._timer;
			this._super(OjComponent, '_setIsDisplayed', arguments);
			if(timer){
				timer[this._is_displayed ? 'start' : 'stop']();
			}
		},
		'_updateTimer' : function(){
			this._timer.setDuration((this._period * 1000) / this._numBlades);
		},
		'_onTimer' : function(){
			if(this._position == 0){
				this._position = this._numBlades;
			}
			this._position--;
			this.redraw();
		},

		'hide' : function(){
			this._timer.pause();
			this._super(OjComponent, 'hide', arguments);
		},
		'redraw' : function(){
			if(this._super(OjComponent, 'redraw', arguments)){
				var ln = this._numBlades, elm, pos;
				for(; ln--;){
					elm = this.wrapper.getChildAt(ln);
					// calculate the translated position
					pos = (ln - this._position) % this._numBlades;
					if(pos < 0){
						pos = pos + this._numBlades;
					}
					elm.setAlpha(Math.max(1 - (pos / this._numBlades), .2));
				}
				return true;
			}
			return false;
		},
		'show' : function(){
			if(this._running){
				this._timer.start();
			}
			this._super(OjComponent, 'show', arguments);
		},
		'start' : function(){
			this._timer.start();
			this._running = true;
		},
		'stop' : function(){
			this._timer.pause();
			this._running = false;
		},

		'setAlpha' : function(val){
			if(this._running){
				if(val == 0){
					this._timer.pause();
				}
				else{
					this._timer.start();
				}
			}
			this._super(OjComponent, 'setAlpha', arguments);
		},
		'setNumBlades' : function(val){
			var ln, elm, section;
			if(this._numBlades == val){
				return;
			}
			this._numBlades = val;
			// redraw the blades
			ln = this._numBlades;
			section = 360 / ln;
			this.wrapper.removeAllChildren();
			for(; ln--;){
				elm = new OjStyleElement();
				elm.addCss('blade');
				elm.setRotation(section * ln);
				elm.setTranslate(this._translate);
				elm.setBackgroundColor(this._tint);
				this.wrapper.addChild(elm);
			}
			// redraw the tint
			this.redraw();
			// update the timer
			this._updateTimer();
		},
		'setPeriod' : function(val){
			if(this._period == val){
				return;
			}
			this._period = val;
			// update the timer
			this._updateTimer();
		},
		'setTint' : function(val){
			var ln;
			if(this._tint == val){
				return;
			}
			this._tint = val;
			ln = this._numBlades;
			for(; ln--;){
				this.wrapper.getChildAt(ln).setBackgroundColor(this._tint);
			}
		}
	},
	{
		'_TAGS' : ['spinner']
	}
);


OJ.extendClass(
	'OjMedia', [OjComponent],
	{
		'_props_' : {
			'preload'     : false,
			'resizeBy'    : 'none', // OjMedia.NONE
			'source'      : null,
			'showSpinner' : false,
			'spinnerTint' : '#333'
		},
		'_height' : 0,  '_loaded' : false,  '_resize_vals' : ['none', 'fill', 'fit', 'hFill', 'wFill'],  '_width' : 0,
		'_h_align' : OjStyleElement.CENTER,
		'_v_align' : OjStyleElement.MIDDLE,

		'_constructor' : function(/*source*/){
			this._super(OjComponent, '_constructor', []);
			if(arguments.length){
				this.setSource(arguments[0]);
			}
		},
		'_destructor' : function(){
			this._unset('media');
			this._unset('loading');
			return this._super(OjComponent, '_destructor', arguments);
		},

    // NOTE: this should never be called directly
		'_load' : function(){},
		'_makeMedia' : function(){
			return new OjStyleElement('<div class="media"></div>');
		},
		'_resize' : function(){
			if(!this._media){
				return;
			}
			if(this._source_is_css){
				this._media.setWidth(OjStyleElement.AUTO);
				this._media.setHeight(OjStyleElement.AUTO);
				return;
			}
			var w = this._getStyleBackup('width'),
				h = this._getStyleBackup('height');
			if(!isEmpty(w)){
				this._media.setWidth('100', '%');
				if(h){
					this._media.setHeight('100', '%');
				}
				else{
					this._media.setHeight(OjStyleElement.AUTO);
				}
			}
			else if(!isEmpty(h)){
				this._media.setHeight('100', '%');
				this._media.setWidth(OjStyleElement.AUTO);
			}
			else if(this._resizeBy == this._static.WIDTH){
				this._media.setWidth('100', '%');
				this._media.setHeight(OjStyleElement.AUTO);
			}
			else{
				this._media.setHeight('100', '%');
				this._media.setWidth(OjStyleElement.AUTO);
				var w2 = this.getWidth();
				if(w > w2){
					this._media.setMarginLeft((w2 - w) / 2);
				}
			}
		},
		'_setIsDisplayed' : function(displayed){
			this._super(OjComponent, '_setIsDisplayed', arguments);
			if(displayed && !this._loaded){
				this._load();
			}
		},
    // NOTE: this should never be called directly
		'_setSource' : function(url){
			this._source = url;
		},
    // NOTE: this should never be called directly
    '_unload' : function(){
      this._source = null;
      this._loaded = false;
      if(this.loading){
        this._unset('loading');
      }
      if(this._media){
        this._media.setMaxWidth(OjStyleElement.AUTO);
        this._media.setMaxHeight(OjStyleElement.AUTO);
      }
      this.removeCss(['is-loaded']);
      this.dispatchEvent(new OjEvent(OjEvent.UNLOAD));
    },

		'_onMediaLoad' : function(evt){
			this._unset('loading');
      this._loaded = true;
			if(this._media){
				// make sure we don't allow up-scaling
				if(this._original_w){
					this._media.setMaxWidth(this._original_w);
				}
				if(this._original_h){
					this._media.setMaxHeight(this._original_h);
				}
			}
			this._resize();
      this.addCss(['is-loaded']);
			this.dispatchEvent(new OjEvent(OjEvent.LOAD));
		},

    'clone' : function(){
      var media = this._super(OjComponent, 'clone', arguments);
      media.setSource(this._source);
      return media;
    },
		'isLoaded' : function(){
			return this._loaded;
		},
		'load' : function(){
			if(!this._loaded && this._source){
				this._load();
			}
		},
    'unload' : function(){
      if(this._loaded && this._source){
        this._unload();
      }
    },

		// Getter & Setter Functions
		'getOriginalHeight' : function(){
			return this._original_h;
		},
		'getOriginalWidth' : function(){
			return this._original_w;
		},
		'setSource' : function(url){
			if(Array.isArray(url)){
				url = url.join(', ');
			}
			else if(url){
				url = url.toString();
			}
			// make sure we don't do extra work with loading the same media twice
      if(this._source == url){
				return;
			}
      this.unload();
			if(!this.loading && this._showSpinner){
				this.addChild(this.loading = new OjSpinner(this._spinnerTint));
			}
      this._setSource(url);
			if(this._preload || this._is_displayed){
				this._load();
			}
		},
		'setResizeBy' : function(val){
			if(this._resizeBy == val){
				return;
			}
			this._resizeBy = this._resize_vals.indexOf(val) > -1 ? val : this._static.NONE;
			this._resize();
		},
		'_setHeight' : function(val){
			this._super(OjComponent, '_setHeight', arguments);
			this._height = val
//			this._resize();
		},
		'_setWidth' : function(val){
			this._super(OjComponent, '_setWidth', arguments);
			this._width = val;
//			this._resize();
		}
	},
	{
		'NONE'   : 'none',
		'FILL'   : 'fill',
		'FIT'    : 'fit',
		'HEIGHT' : 'hFill',
		'WIDTH'  : 'wFill'
	}
);


OJ.extendComponent(
	'OjImage', [OjMedia],
	{
		'_source_is_css' : false,
		// todo: OjImage handle upscaling....
		'_destructor' : function(){
			if(this._img){
				this._img.removeEventListener('load', this._callback);
			}
			this._callback = this._img = null;
			return this._super(OjMedia, '_destructor', arguments);
		},

		'_load' : function(){
			if(!this._source_is_css && this._img){
				this._loaded = false;
				this._img.src = this._source;
			}
		},
		'_makeMedia' : function(){

			return this._super(OjMedia, '_makeMedia', arguments);
		},
		'_resize' : function(){
			this.removeCss(this._resize_vals);
			if(this._resizeBy == this._static.NONE){
				return;
			}
			this.addCss([this._resizeBy]);
		},

		'_onMediaLoad' : function(evt){
			if(this._source_is_css){
        this._media.addCss([this._source.substring(1)]);
				this._original_w = this._media.getWidth();
				this._original_h = this._media.getHeight();
			}
			else{
        this._original_w = this._img.width;
				this._original_h = this._img.height;
				if(!this.getWidth()){
					this.setWidth(this._original_w);
				}
				if(!this.getHeight()){
					this.setHeight(this._original_h);
				}
				this._setStyle('backgroundImage', 'url(' + this._source + ')');
			}
			return this._super(OjMedia, '_onMediaLoad', arguments);
		},

		'_setSource' : function(url){
			this._super(OjMedia, '_setSource', arguments);
			if(url){
				// check to see if this is a css class
				if(this._source_is_css = (this._source.charAt(0) == '@')){
					// if the media holder doesn't exist then create it
					this.addChild(this._media = this._makeMedia());
					// trigger the image load since its already loaded
					this._onMediaLoad(null);
				}
				else{
					// make sure we have an image loader object
					if(!this._img){
						this._img = new Image();
						this._img.addEventListener('load', this._callback = this._onMediaLoad.bind(this));
					}
				}
			}
		},
    '_unload' : function(){
      // cleanup old source
			if(!this._source_is_css){
        // remove old source background image
				this._setStyle('backgroundImage', null);
			}
      this._unset('_media');
      this._source_is_css = false;
      this._super(OjMedia, '_unload', arguments);
    }
	},
	{
		'_TAGS' : ['img', 'image'],
		'image' : function(img/*, clone=false*/){
      if(img){
        if(isString(img)){
          return new OjImage(img);
        }
        if(img.is('OjImage')){
          return arguments.length > 1 && arguments[1] ? img.clone() : img;
        }
      }
			return null;
		}
	}
);


OJ.extendComponent(
	'OjFlash', [OjMedia],
	{
		'_tag' : '<object></object>'
	},
	{
		'_TAGS' : ['flash']
	}
);


OJ.extendComponent(
	'OjOverlay', [OjComponent],
	{
		'_props_' : {
			'forceIcon'    : true,
			'forceMessage' : false,
			'message'      : null,
			'icon'         : null
		},
		'_v_align' : OjStyleElement.MIDDLE,
		'_template' : '<div><div class=box><div var=icon></div><label var=message></label></div></div>',

		'_constructor' : function(/*message, icon*/){
			var args = arguments,
				ln = arguments.length,
				icon;
			this._super(OjComponent, '_constructor', []);
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
			this._super(OjComponent, '_onFadeComplete', arguments);
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
);


OJ.extendComponent(
	'OjView', [OjComponent],
	{
		'_props_' : {
			'controller'  : null,
			'footer'      : null,
			'header'      : null,
			'icon'        : null,
			'shortTitle'  : null,
			'stack'       : null,
			'title'       : null
		},
		'_get_props_' : {
			'actionView' : null,
			'cancelView' : null,
			'titleView'  : null
		},
//		'_elm_funcs' : null,  '_load_checkpoints' : null,  '_loading_icon' : null,
//
//		'_overlay' : null,  '_unload_checkpoints' : null,  '_unloading_icon' : null,
		'_loading_msg' : 'Loading',  '_template' : '<div><div var=container></div></div>',  '_loaded' : false,
		'_unloading_msg' : 'UnLoading',

		'_constructor' : function(/*content, title, short_title*/){
      this._super(OjComponent, '_constructor', []);
			// setup vars
			this._load_checkpoints = {};
			this._unload_checkpoints = {};
			// process arguments
			var args = arguments,
				ln = args.length,
				short_title = this._static.SHORT_TITLE,
				title = this._static.TITLE;
			if(ln){
				this.setContent(args[0]);
				if(ln > 1){
					title = args[1];
					if(ln > 2){
						short_title = args[2];
					}
				}
			}
			this.setTitle(title);
			if(short_title){
				this.setShortTitle(short_title);
			}
      if(this._static.ICON){
        this.setIcon(this._static.ICON);
      }
		},
		'_destructor' : function(){
			this.unload();
			this._unset(['_actionView', '_cancelView', '_titleView', '_overlay']);
			return this._super(OjComponent, '_destructor', arguments);
		},

		'_checkpointsCompleted' : function(checkpoints){
			var key;
			for(key in checkpoints){
				if(!checkpoints[key]){
					return false;
				}
			}
			return true;
		},
		'_hideOverlay' : function(){
			var overlay = this._overlay;
			if(overlay){
				overlay.addEventListener(OjEvent.HIDE, this, '_onOverlayHide');
				overlay.hide();
			}
		},
		'_load' : function(){
			this._loaded = true;
			this.removeCss(['loading']);
			this.redraw();
			this._hideOverlay();
			this.dispatchEvent(new OjEvent(OjView.LOAD));
		},
		'_loadCheckpoint' : function(/*checkpoint*/){
			var args = arguments;
			if(args.length){
				this._load_checkpoints[args[0]] = true;
			}
			if(this._checkpointsCompleted(this._load_checkpoints)){
				this._load();
			}
			else{
				this._showOverlay(this._loading_msg, this._loading_icon);
			}
		},
		'_resetCheckpoints' : function(checkpoints){
			var key;
			for(key in checkpoints){
				checkpoints[key] = false;
			}
		},
		'_showOverlay' : function(/*msg, icon*/){
//			var args = arguments,
//				ln = args.length,
//				msg = ln ? args[0] : null,
//				icon = ln > 1 ? args[1] : null,
//				overlay = this._overlay;
//
//			if(overlay){
//				overlay.setMessage(msg);
//				overlay.setIcon(icon);
//			}
//			else{
//				overlay = this._overlay = new OjOverlay(msg, icon);
//			}
//
//			overlay.show(this);
		},
		'_unload' : function(){
			this._loaded = true;
			this._hideOverlay();
			// dispatch the event
			this.dispatchEvent(new OjEvent(OjView.UNLOAD));
		},
		'_unloadCheckpoint' : function(/*checkpoint*/){
			var args = arguments;
			if(args.length){
				this._unload_checkpoints[args[0]] = true;
			}
			if(this._checkpointsCompleted(this._unload_checkpoints)){
				this._unload();
			}
			else{
				this._showOverlay(this._unloading_msg, this._unloading_icon);
			}
		},

		'_onOverlayHide' : function(evt){
			this._unset('_overlay');
		},

		'load' : function(){
			this.addCss(['loading']);
			this._resetCheckpoints(this._load_checkpoints);
			this._loadCheckpoint();
		},
		'unload' : function(){
			this._resetCheckpoints(this._unload_checkpoints);
			this._unloadCheckpoint();
		},

		// getter & Setter functions
		'getContent' : function(){
			return this.getElms();
		},
		'setContent' : function(content){
			this.removeAllElms();
			if(content){
				content = Array.array(content);
				var ln = content.length;
				for(; ln--;){
					this.addElmAt(content[ln], 0);
				}
			}
		},
		'setFooter' : function(val){
			if(this._footer = val){
				this.removeCss(['no-footer']);
				if(!this.footer){
					this.footer = new OjStyleElement();
					this.footer.addCss('footer');
					this.container.parent().addChildAt(this.footer, 0);
				}
				this.footer.removeAllChildren();
				this.footer.addChild(val);
			}
			else{
				this._unset('footer');
				this.addCss(['no-footer']);
			}
		},
		'setHeader' : function(val){
			if(this._header = val){
				this.removeCss(['no-header']);
				if(!this.header){
					this.header = new OjStyleElement();
					this.header.addCss(['header']);
					this.container.parent().addChildAt(this.header, 0);
				}
				this.header.removeAllChildren();
				this.header.addChild(val);
			}
			else{
				this._unset('header');
				this.addCss(['no-header']);
			}
		},
    'getIcon' : function(){
      return OjImage.image(this._icon, true); // this will clone the icon so that we don't run into the icon accidentally getting messed up
    },
    'setIcon' : function(icon){
      if(this._icon == icon){
        return;
      }
      this._icon = icon;
      this.dispatchEvent(new OjEvent(OjView.ICON_CHANGE, false));
    },
		'setTitle' : function(title){
      if(this._title == title){
        return;
      }
			this._title = title;
			if(!this._shortTitle){
				this._shortTitle = title;
			}
      this.dispatchEvent(new OjEvent(OjView.TITLE_CHANGE, false));
		}
	},
	{
		'SHORT_TITLE' : null,
		'TITLE'       : null,
		'HORIZONTAL' : 'horizontal',
		'VERTICAL'   : 'vertical',
		'TOP'        : 'top',
		'BOTTOM'     : 'bottom',
		'LEFT'       : 'left',
		'RIGHT'      : 'right',
    'ICON_CHANGE'  : 'onTitleChange',
		'LOAD'         : 'onViewLoad',
    'TITLE_CHANGE' : 'onTitleChange',
		'UNLOAD'       : 'onViewUnload',
		'_TAGS' : ['view']
	}
);


OJ.extendComponent(
	'OjIframe', [OjView],
	{
		'_source' : null,  '_interval' : null,  '_timeout' : 60,
		'_template' : '<iframe></iframe>',

		'_constructor' : function(/*source, target*/){
			this._super(OjView, '_constructor', []);
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
	'OjImageViewer', [OjView],
	{
		'_images' : null,

		'_constructor' : function(/*content, title, short_title*/){
			this._images = [];
			this._super(OjView, '_constructor', arguments);
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

OJ.defineClass(
  'OjINavController',
  {
    '_props_' : {
      'stack'   : null
    },

    '_setupStack' : function(){
      this._stack.addEventListener(OjStackEvent.CHANGE, this, '_onStackChange');
      // if we already have stuff in the stack then trigger a change event so the display gets updated properly
      var ln = this._stack.numElms();
      if(ln){
        this._onStackChange(new OjStackEvent(OjStackEvent.CHANGE, this._stack.getElmAt(ln - 1), OjTransition.DEFAULT, ln - 1, 0));
      }
    },
    '_cleanupStack' : function(){
      if(this._stack){
        this._stack.removeEventListener(OjStackEvent.CHANGE, this, '_onStackChange');
      }
    },

    // event listener callbacks
    '_onStackChange' : function(evt){},

    // stack view functions
    // todo: enable animated flag option for nav stack view functions
    'addView' : function(view/*, animated = true*/){
      var s = this._stack;
      return s.addElm.apply(s, arguments);
    },
    'addViewAt' : function(view, index/*, animated = true*/){
      var s = this._stack;
      return s.addElmAt.apply(s, arguments);
    },
    'gotoView' : function(/*view = root, animated = true*/){
      var args = arguments,
        ln = args.length, index,
        view = ln ? args[0] : null,
        animated = ln > 1 ? args[1] : true;
      // if no view is specified we go all the way back to the root
      // if a new view is specified we go all the way back to root and replace with new view
      if(!view || (index = this.indexOfView(view)) > -1){
              return this.gotoViewAt(index, animated);
      }
      if(index = this.getActiveIndex()){
        this.replaceViewAt(0, view);
        return this.gotoViewAt(0);
      }
      this.replaceActive(view, animated);
    },
    'gotoViewAt' : function(index/*, animated = true*/){
      return this._stack.setActiveIndex.apply(this._stack, arguments);
    },
    'hasView' : function(view){
      return this._stack.hasElm(view);
    },
    'indexOfView' : function(view){
      return this._stack.indexOfElm(view);
    },
    'removeActive' : function(/*animated = true*/){
      return this.removeViewAt(this._stack.getActiveIndex(), arguments.length ? arguments[0] : true);
    } ,
    'removeView' : function(view/*, animated = true*/){
      var s = this._stack;
      return s.removeElm.apply(s, arguments);
    },
    'removeViewAt' : function(view, index/*, animated = true*/){
      var s = this._stack;
      return s.removeElmAt.apply(s, arguments);
    },
    'replaceActive' : function(view/*, animated = true*/){
      var s = this._stack,
        args = arguments;
      return s.replaceElmAt(this.getActiveIndex(), view, args.length > 1 ? args[0] : true);
    },
    'replaceView' : function(oldView, newView/*, animated = true*/){
      var s = this._stack;
      return s.replaceElm.apply(s, arguments);
    },
    'replaceViewAt' : function(index, newView/*, animated = true*/){
      var s = this._stack;
      return s.replaceElmAt.apply(s, arguments);
    },

    // getter & setter functions
    'getActiveView' : function(){
      return this._stack.getActive();
    },
    'setActiveView' : function(val){
      this._stack.setActive(val);
    },
    'getActiveIndex' : function(){
      return this._stack.getActiveIndex();
    },
    'setActiveIndex' : function(val){
      this._stack.setActiveIndex(val);
    },
    'setStack' : function(stack){
      if(this._stack){
        if(this._stack == stack){
          return;
        }
        this._cleanupStack();
      }
      this._stack = stack;
      stack.setController(this);
      this._setupStack();
    }
  }
);

OJ.extendComponent(
	'OjNavController', [OjComponent, OjINavController],
	{
    '_constructor' : function(/*stack*/){
      this._super(OjComponent, '_constructor', []);
      // process the arguments
      if(arguments.length){
        this.setStack(arguments[0]);
      }
    },
    '_destructor' : function(){
      this._cleanupStack();
      return this._super(OjComponent, '_destructor', arguments);
    }
	},
	{
		'_TAGS' : ['nav', 'navcontroller']
	}
);


OJ.extendComponent(
	'OjLabel', [OjComponent],
	{
		'_props_' : {
			'prefix' : null,
			'suffix' : null,
			'text'   : null
		},
		'_template' : '<label></label>',

		'_constructor' : function(){
			var args = arguments;
			this._super(OjComponent, '_constructor', []);
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
			return this._super(OjComponent, '_processDomSourceChildren', arguments);
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
			if(this._super(OjComponent, 'redraw', arguments)){
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
    'getText' : function(){
      return this._text;
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


OJ.extendClass(
	'OjStackEvent', [OjEvent],
	{
		'_get_props_' : {
			'index'      : null,
			'oldIndex'   : null,
			'transition' : null,
			'view'       : null
		},

		'_constructor' : function(type, view, transition, index/*, old_index, bubbles = false, cancelable = false*/){
			var args = [type, false, false], ln = arguments.length;
			this._view = view;
			this._transition = transition;
			this._index = index;
			if(ln > 4){
				this._oldIndex = arguments[4];
				if(ln > 5){
					args[1] = arguments[5];
					if(ln > 6){
						args[2] = arguments[6];
					}
				}
			}
			this._super(OjEvent, '_constructor', args);
		}
	},
	{
		'ACTIVE'          : 'onStackViewActive',
		'ADD'             : 'onStackViewAdd',
		'CHANGE'          : 'onStackChange',
		'CHANGE_COMPLETE' : 'onStackChangeComplete',
		'INACTIVE'        : 'onStackViewInactive',
		'MOVE'            : 'onStackViewMove',
		'REMOVE'          : 'onStackViewRemove',
		'REPLACE'         : 'onStackViewReplace'
	}
);


OJ.extendClass(
	'OjDimTween', [OjPropTween],
	{
		'_props_' : {
			'amount'    : null,
			'direction' : 'dimTweenBoth'
		},

		'_constructor' : function(/*target, direction, amount, duration, easing*/){
			this._super(OjPropTween, '_constructor', []);
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
	'OjMove', [OjDimTween],
	{
		'setAmount' : function(amount){
			this._super(OjDimTween, 'setAmount', arguments);
			if(this._direction == OjMove.BOTH){
				this._to.x = amount[0];
				this._to.y = amount[1];
			}
			else if(this._direction == OjMove.X){
				this._to.x = amount;
			}
			else{
				this._to.y = amount;
			}
		}
	},
	{
		'X'    : OjDimTween.HORIZONTAL,
		'Y'    : OjDimTween.VERTICAL,
		'BOTH' : OjDimTween.BOTH
	}
);


OJ.extendClass(
	'OjTweenSet', [OjActionable],
	{
		'_tweens' : null,  '_completed' : null,  '_is_finished' : false,

		'_constructor' : function(/*tweens|tween, tween, tween...*/){
			this._tweens = [];
			this._completed = [];
			this._super(OjActionable, '_constructor', []);
			if(arguments.length){
				if(isArray(arguments[0])){
					this.setTweens(arguments[0]);
				}
				else{
					this.setTweens(arguments);
				}
			}
		},
		'_destructor' : function(/*depth = 0*/){
			var ln = this._tweens.length,
				args = arguments,
				depth = args.length ? args[0] : 0;
			this.stop();
			if(depth){
				while(ln-- > 0){
					OJ.destroy(this._tweens[ln], depth);
				}
			}
			else{
				while(ln-- > 0){
					this.removeTween(this._tweens[ln]);
				}
			}
			return this._super(OjActionable, '_destructor', arguments);
		},

		'_checkCompleted' : function(){
			if(this._tweens.length == this._completed.length && !this._is_finished){
				this.dispatchEvent(new OjTweenEvent(OjTweenEvent.COMPLETE));
			}
		},

		'_onTweenComplete'  : function(evt){
			var tween = evt.getTarget();
			if(this._completed.indexOf(tween) == -1){
				this._completed.push(tween);
			}
//				this.dispatchEvent(new OjTweenEvent(OjTweenEvent.TICK));
			this._checkCompleted();
		},

		'_controlTweens' : function(command, args){
			var ln = this._tweens.length;
			while(ln-- > 0){
				this._tweens[ln][command].apply(this._tweens[ln], args);
			}
		},
		'start' : function(){
			this._controlTweens('start', arguments);
		},
		'pause' : function(){
			this._controlTweens('pause', arguments);
		},
		'stop' : function(){
			this._controlTweens('stop', arguments);
		},
		'reverse' : function(){
			this._controlTweens('reverse', arguments);
		},

		// tween management functions
		'addTween' : function(tween){
			if(this.hasTween(tween)){
				return;
			}
			this._is_finished = false;
			tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTweenComplete');
			return this._tweens.push(tween);
		},
		'removeTween' : function(tween){
			var index = this._tweens.indexOf(tween);
			if(index == -1){
				return;
			}
			tween.removeEventListener(OjTweenEvent.COMPLETE, this, '_onTweenComplete');
			this._tweens.splice(index, 1);
			this._checkCompleted();
			return tween;
		},
		'hasTween' : function(tween){
			return this._tweens.indexOf(tween) != -1;
		},
		'numTweens' : function(){
			return this._tweens.length;
		},

		'getTweens' : function(){
			return this._tweens.clone();
		},
		'setTweens' : function(tweens){
			var ln;
			if(this._tweens){
				ln = this._tweens.length;
				while(ln-- > 0){
					this.removeTween(this._tweens[ln]);
				}
			}
			this._tweens = [];
			if(tweens){
				ln = tweens.length;
				while(ln-- > 0){
					this.addTween(tweens[ln]);
				}
			}
		},
		'isFinished' : function(){
			return this._is_finished;
		}
	}
);


window.OjIFlowNavController = {
	'_props_' : {
		'cancelLabel' : 'Cancel',
		'title'       : null
	},

	'_back_btn' : null,  '_cancel_btn' : null,  '_show_cancel' : false,
	'_template' : '<div class=flow-nav-controller><div var=bottom><div var=btmLeft class=left v-align=m></div><div var=btmTitle class=title v-align=m></div><div var=btmRight class=right v-align=m></div></div><div var=top><div var=topLeft class=left v-align=m></div><div var=topTitle class=title v-align=m></div><div var=topRight class=right v-align=m></div></div></div>',  '_tween' : null,
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
			if(!(this._show_cancel = arguments[0]) && this._cancel_btn){
        this._unset('_cancel_btn');
      }
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
	'OjFlowNavController', [OjNavController],
	OJ.implementInterface(
		OjIFlowNavController,
		{
			'_constructor' : function(/*stack*/){
				this._super(OjNavController, '_constructor', []);
				// process the arguments
				if(arguments.length){
					this.setStack(arguments[0]);
				}
			},

			'_setupStack' : function(){
				this._super(OjNavController, '_setupStack', arguments);
				this._stack.setTransition(new OjTransition(OjTransition.SLIDE_HORZ, 250, [OjEasing.IN, OjEasing.OUT]));
				this._stack.addEventListener(OjStackEvent.ADD, this, '_onStackAdd');
			},
			'_cleanupStack' : function(){
				this._super(OjNavController, '_cleanupStack', arguments);
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


OJ.extendClass(
	'OjCollectionEvent', [OjEvent],
	{
		'_get_props_' : {
			'item'    : null,
			'index'   : null,
			'oldItem' : null
		},

		'_constructor' : function(type, item, index/*, old_item, bubbles, cancelable*/){
			var params = [type],
				args = arguments,
				ln = args.length;
			this._item = item;
			this._index = index;
			if(ln > 3){
				this._oldItem = args[3];
				if(ln > 4){
					params = Array.array(args);
					params.splice(1, 3);
				}
			}
			this._super(OjEvent, '_constructor', params);
		}
	},
	{
		'ITEM_ADD'     : 'onItemAdd',
		'ITEM_CLICK'   : 'onItemClick',
		'ITEM_OVER'    : 'onItemOver',
		'ITEM_OUT'     : 'onItemOut',
		'ITEM_MOVE'    : 'onItemMove',
		'ITEM_REMOVE'  : 'onItemRemove',
		'ITEM_REPLACE' : 'onItemReplace'
	}
);


OJ.extendClass(
	'OjCollection', [OjActionable],
	{
		'_props_' : {
			'allowDuplicate' : true,
			'items' : null
		},

		'_constructor' : function(/*items*/){
			var args = arguments;
			this._super(OjActionable, '_constructor', []);
			this._items = [];
			if(args.length){
				this.setItems(args[0]);
			}
		},
		'_destructor' : function(){
			this._items = null;
			return this._super(OjActionable, '_destructor', arguments);
		},

		'addItem' : function(item){
			return this.addItemAt(item, this.numItems());
		},
		'addItemAt' : function(item, index){
			if(!this._allowDuplicate && this.hasItem(item)){
				// throw warning of duplicate
				return;
			}
			this._items.splice(index, 0, item);
			this.dispatchEvent(new OjCollectionEvent(OjCollectionEvent.ITEM_ADD, item, index));
			return item;
		},
		'getItemAt' : function(index){
			return this._items[index];
		},
		'hasItem' : function(item){
			return this.indexOfItem(item) != -1;
		},
		'indexOfItem' : function(item){
			return this._items.indexOf(item);
		},
		'numItems' : function(){
			return this._items.length;
		},
		'removeAllItems' : function(){
			var ln = this.numItems();
			for(; ln--;){
				this.removeItemAt(ln);
			}
		},
		'removeItem' : function(item){
			return this.removeItemAt(this.indexOfItem(item));
		},
		'removeItemAt' : function(index){
			if(index < 0){
				return;
			}
			var item = this._items.splice(index, 1)[0];
			this.dispatchEvent(new OjCollectionEvent(OjCollectionEvent.ITEM_REMOVE, item, index));
			return item;
		},
		'replaceItem' : function(oldItem, newItem){
			return this.replaceItemAt(this.indexOfItem(oldItem), newItem);
		},
		'replaceItemAt' : function(index, newItem){
			if(index > -1 && index < this.numItems()){
				return this._items.splice(index, 1, newItem)[0];
			}
			return null;
		},
		'reverse' : function(){
			//
		},
		'sort' : function(/*sort_func*/){
			var args = arguments, ln,
				orig = this._items.clone();
			if(args.length){
				this._items.sort(args[0]);
			}
			else{
				this._items.sort();
			}
			ln = this._items.length;
			for(; ln--;){
				if(this._items[ln] != orig[ln]){
					this.dispatchEvent(new OjCollectionEvent(OjCollectionEvent.ITEM_MOVE, this._items[ln], ln));
				}
			}
		},
		'setItemAt' : function(item, index){
			var old_item;
			if(!this._allowDuplicate && this.hasItem(item)){
				// throw warning of duplicate
				return;
			}
			old_item = this._items.splice(index, 1, item)[0];
			// if no change don't do anything
			if(old_item == item){
				return;
			}
			this.dispatchEvent(new OjCollectionEvent(OjCollectionEvent.ITEM_REPLACE, item, index));
			return old_item;
		},

		'getItems' : function(){
			return this._items.clone();
		},
		'setItems' : function(items){
			var key, ary, diff,
				i = 0,
				ln,
				old_ln = this._items.length;
			if(isObject(items)){
				if(isObjective(items) && items.is('OjCollection')){
					items = items.getItems();
				}
				else{
					ary = [];
					for(key in items){
						ary.push(items[key]);
					}
					items = ary;
				}
			}
			else if(!isArray(items)){
				items = [];
			}
			ln = items.length;
			if(old_ln > ln){
				diff = old_ln - ln;
				for(; diff--;){
					this.removeItemAt(--old_ln);
				}
			}
			for(; i < ln; i++){
				if(i < old_ln){
					this.setItemAt(items[i], i);
				}
				else{
					this.addItem(items[i]);
				}
			}
		}
	},
	{
		'collection' : function(obj){
			return isArray(obj) || !isObjective(obj) ? new OjCollection(obj) : obj;
		}
	}
);
// setup collection interface
window.OjICollection = {
	'_prepareItems' : function(){
		if(this._items){
			return;
		}
		return this._items = new OjCollection();
	},
	'addItem' : function(item){
		this._prepareItems();
		this._items.addItem(item);
	},
	'addItemAt' : function(item, index){
		this._prepareItems();
		this._items.addItemAt(item);
	},
	'getItemAt' : function(index){
		var items = this._items;
		return items ? items.getItemAt(index) : null;
	},
	'getItems' : function(){
		var items = this._items;
		return items ? items.getItems() : [];
	},
	'hasItem' : function(item){
		var items = this._items;
		return items ? items.hasItem(item) : false;
	},
	'indexOfItem' : function(item){
		var items = this._items;
		return items ? items.indexOfItem(item) : -1;
	},
	'numItems' : function(){
		var items = this._items;
		return items ? items.numItems() : 0;
	},
	'removeAllItems' : function(){
		var items = this._items;
		if(items){
			items.removeAll();
		}
	},
	'removeItem' : function(item){
		if(this._items){
			this._items.removeItem(item);
		}
	},
	'removeItemAt' : function(index){
		var items = this._items;
		if(items){
			items.removeItemAt(index);
		}
	},
	'reverse' : function(){
		var items = this._items;
		if(items){
			items.reverse();
		}
	},
	'sort' : function(/*sort_func*/){
		var items = this._items;
		if(items){
			items.sort.apply(items, arguments);
		}
	},
	'setItemAt' : function(item, index){
		this._prepareItems();
		this._items.setItemAt(item, index);
	},
	'setItems' : function(items){
		this._prepareItems();
		this._items.setItems(items);
	}
};

OJ.defineClass(
  'OjICollectionComponent', {
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
      this._rendered = this._item_events = null;
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
    '_releaseItem' : function(item){
      var id = item.id();
      OJ.destroy(item);
      delete this._rendered[id];
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
  }
);

OJ.extendComponent(
	'OjCollectionComponent', [OjICollectionComponent, OjComponent],
	{
    '_constructor' : function(){
      this._super(OjComponent, '_constructor', arguments);
      // run the collection component setup
      this._setup();
    },
    '_destructor' : function(){
      // run the collection component teardown
      this._teardown();
      this._super(OjComponent, '_destructor', arguments);
    },

    'addEventListener' : function(type, target, func){
      this._super(OjComponent, 'addEventListener', arguments);
      this._addItemListener(type);
    },
    'removeEventListener' : function(type, target, func){
      this._super(OjComponent, 'removeEventListener', arguments);
      this._removeItemListener(type);
    }
  },
  {
    '_TAGS' : ['collection']
  }
);


OJ.extendClass(
	'OjResize', [OjDimTween],
	{
		'setAmount' : function(amount){
			this._super(OjDimTween, 'setAmount', arguments);
			if(this._direction == OjResize.BOTH){
				this._to.width = amount[0];
				this._to.height = amount[1];
			}
			else if(this._direction == OjResize.WIDTH){
				this._to.width = amount;
			}
			else{
				this._to.height = amount;
			}
		}
	},
	{
		'WIDTH'  : OjDimTween.HORIZONTAL,
		'HEIGHT' : OjDimTween.VERTICAL,
		'BOTH'   : OjDimTween.BOTH
	}
);


OJ.extendClass(
	'OjTransition', [OjObject],
	{
		'_props_' : {
			'easing'   : null,
			'effect'   : 'fade', // OjTransition.FADE
			'duration' : 250
		},

		'_constructor' : function(/*effect, duration, easing*/){
			this._super(OjObject, '_constructor', []);
			// default the easing property
			this._easing = [OjEasing.NONE, OjEasing.NONE];
			// process the constructor params
			var args = arguments,
				ln = args.length;
			if(ln){
				this.setEffect(args[0]);
				if(ln > 1){
					this.setDuration(args[1]);
					if(ln > 2){
						this.setEasing(args[2]);
					}
				}
			}
		},

		'_getEasing' : function(direction){
			var ln = this._easing.length;
			if(ln){
				if(ln > 1 && direction == OjTransition.OUT){
					return this._easing[1];
				}
				return this._easing[0];
			}
			return null;
		},
		'_makeNone' : function(elm, amount){
			return null;
		},
		'_makeFade' : function(elm, direction, amount){
			return new OjFade(elm, amount ? OjFade.IN : OjFade.OUT, this._duration, this._getEasing(direction))
		},
		'_makeSlideHorz' : function(elm, direction, amount){
			return new OjMove(elm, OjMove.X, amount, this._duration, this._getEasing(direction));
		},
		'_makeSlideVert' : function(elm, direction, amount){
			return new OjMove(elm, OjMove.Y, amount, this._duration, this._getEasing(direction));
		},
		'_makeZoom' : function(elm, direction, amount){
			return null;
		},

		'make' : function(elm, direction, amount){
			return this['_make' + this._effect.ucFirst()].apply(this, arguments);
		},

		'getEasing' : function(){
			var e = this._easing;
			return e ? e.clone() : null;
		},
		'setEasing' : function(val){
			if(!isArray(val)){
				val = [val, val];
			}
			this._easing = val;
		}
	},
	{
		// Transition Constants
		'DEFAULT'    : null,
		'NONE'       : 'none',
		'FADE'       : 'fade',
		'SLIDE_HORZ' : 'slideHorz',
		'SLIDE_VERT' : 'slideVert',
		'ZOOM'       : 'zoom',

		// transition make function
		'transition' : function(trans/*, default*/){
			if(isObjective(trans) && trans.is('OjTransition')){
				return trans
			}
			var args = arguments,
				ln = args.length;
			if(isString(trans)){
				var dflt = ln > 1 && args[1] ? args[1] : OjTransition.DEFAULT;
				args = trans.fulltrim(' ').split(',');
				ln = args.length;
				return new OjTransition(
					ln ? args[0] : dflt.getEffect(),
					ln > 1 ? args[1] : dflt.getDuration(),
					[
						ln > 2 ? OjEasing[args[2]] : dflt.getEasing()[0],
						ln > 3 ? OjEasing[args[3]] : dflt.getEasing()[1]
					]
				);
			}
			return new OjTransition(OjTransition.NONE, 250);
		}
	}
);
// setup the default transition
OjTransition.DEFAULT = new OjTransition(OjTransition.NONE, 250);
/*
 * Note: Stack requires defined dimensions for transitions to work properly
 */

OJ.extendComponent(
	'OjStack', [OjCollectionComponent],
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
			this._super(OjCollectionComponent, '_constructor', []);
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
			return this._super(OjCollectionComponent, '_destructor', args);
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
			return this._super(OjCollectionComponent, '_processDomSourceChild', arguments);
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
			this._super(OjCollectionComponent, '_onItemAdd', arguments);
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
			this._super(OjCollectionComponent, '_onItemMove', arguments);
			this.dispatchEvent(new OjStackEvent(OjStackEvent.MOVE, evt.getItem(), this._transition, evt.getIndex()));
			if(this._active == evt.getItem()){
				this._current_index = evt.getIndex();
				// todo: add logic for stack item move current_index
			}
		},
		'_onItemRemove' : function(evt){
			this._super(OjCollectionComponent, '_onItemRemove', arguments);
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
			this._super(OjCollectionComponent, '_onItemReplace', arguments);
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
			return this._super(OjCollectionComponent, 'renderItemAt', [this._processIndex(index)]);
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
			evt = new OjStackEvent(
        OjStackEvent.CHANGE, item = this.getElmAt(val),
        this._trans_out || this._alwaysTrans ? this._transition : OjTransition.DEFAULT,
        val, this._prev_index
      );
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

OJ.extendComponent(
	'OjNavStack', [OjStack],
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
			this._super(OjStack, '_destructor', arguments);
		},

		'_addActiveElm' : function(elm){
      elm.setController(this._controller);
			elm.setStack(this);
			elm.load();
			this._super(OjStack, '_addActiveElm', arguments);
		},
		'_removeActiveElm' : function(elm){
			elm.unload();
			elm.setController(null);
			elm.setStack(null);
			this._super(OjStack, '_removeActiveElm', arguments)
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
      this._controller.setStack(this);
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


OJ.extendClass(
	'OjAlertEvent', [OjEvent],
	{
		'_get_props_' : {
			'buttonIndex' : -1
		},

		'_constructor' : function(type/*, button_index = -1, bubbles = false, cancelable = false*/){
			var cancelable, bubbles = cancelable = false, ln = arguments.length;
			if(ln > 1){
				this._buttonIndex = arguments[1];
				if(ln > 2){
					bubbles = arguments[2];
					if(ln > 3){
						cancelable = arguments[3];
					}
				}
			}
			this._super(OjEvent, '_constructor', [type, bubbles, cancelable]);
		}
	},
	{
		'BUTTON_CLICK' : 'onAlertButtonClick'
	}
);


OJ.extendComponent(
	'OjLink', [OjLabel],
	{
		'_props_' : {
			'downIcon'     : null,
			'icon'         : null,
			'overIcon'     : null,
			'target'       : '_self', // WindowManager.SELF,
			'targetHeight' : null,
			'targetWidth'  : null,
			'url'          : null
		},
		'_v_align' : OjStyleElement.MIDDLE,
		'_template' : '<a><span var=icon v-align=m></span><span var=label v-align=m></span></a>',

		'_constructor' : function(/*label, url, target*/){
			this._super(OjLabel, '_constructor', []);
      this._processArguments(arguments, {
        'setText' : null,
        'setUrl' : null,
        'setTarget' : null
      });
		},
		'_destructor' : function(){
			// just to make sure that the document mouse move event listener gets removed
			OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onMouseMove');
			this._super(OjLabel, '_destructor', arguments);
		},

		'_processAttribute' : function(dom, attr, context){
			if(attr.nodeName == 'href'){
				this.setUrl(attr.value);
				return true;
			}
			return this._super(OjLabel, '_processAttribute', arguments);
		},

		'_redrawText' : function(){
			this.label.setText(
				(this._prefix ? this._prefix : '') +
				(this._text ? this._text : '') +
				(this._suffix ? this._suffix : '')
			);
		},
		'_updateIcon' : function(val){
      this.icon.removeAllChildren();
			if(val){
				this.icon.addChild(val);
			}
		},

		'_onClick' : function(evt){
			if(this._url){
        WindowManager.open(this._url, this._target, {'width' : this._targetWidth, 'height' : this._targetHeight});
			}
		},
		'_onMouseOver' : function(evt){
			if(this._overIcon){
				OJ.addEventListener(OjMouseEvent.MOVE, this, '_onMouseMove');
				this._updateIcon(this._overIcon);
			}
		},
		'_onMouseMove' : function(evt){
			if(!this.hitTestPoint(evt.getPageX(), evt.getPageY())){
				OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onMouseMove');
				this._updateIcon(this._icon);
			}
		},
		'_onMouseDown' : function(evt){
			if(this._downIcon){
				this._updateIcon(this._downIcon);
				this.addEventListener(OjMouseEvent.UP, this, '_onMouseUp');
			}
		},
		'_onMouseUp' : function(evt){
			this.removeEventListener(OjMouseEvent.UP, this, '_onMouseUp');
			this._updateIcon(this._icon);
		},

		// GETTER & SETTER FUNCTIONS
		'setDownIcon' : function(icon){
			if(this._downIcon == (icon = OjImage.image(icon))){
				return;
			}
			if(this._downIcon = icon){
				this.addEventListener(OjMouseEvent.DOWN, this, '_onMouseDown');
			}
			else{
				this.removeEventListener(OjMouseEvent.DOWN, this, '_onMouseDown');
				this.removeEventListener(OjMouseEvent.UP, this, '_onMouseUp');
			}
		},
		'setIcon' : function(icon){
      if(this._icon == (icon = OjImage.image(icon))){
				return;
			}
			this._updateIcon(this._icon = icon);
		},
		'setOverIcon' : function(icon){
			if(this._overIcon == (icon = OjImage.image(icon))){
				return;
			}
			if(this._overIcon = icon){
				this.addEventListener(OjMouseEvent.OVER, this, '_onMouseOver');
			}
			else{
				this.removeEventListener(OjMouseEvent.OVER, this, '_onMouseOver');
				OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onMouseMove');
			}
		},
		'setUrl' : function(url){
			if(this._url = OjUrl.url(url)){
				this.addEventListener(OjMouseEvent.CLICK, this, '_onClick');
			}
			else{
				this.removeEventListener(OjMouseEvent.CLICK, this, '_onClick');
			}
		},
		'setTarget' : function(target){
			if(isComponent(target)){
				target = target.getTargetId();
			}
			this._target = target;
    }
	},
	{
		'_TAGS' : ['a']
	}
);


OJ.extendComponent(
	'OjButton', [OjLink],
	{
		'_default_h_align' : OjStyleElement.CENTER,

		'_constructor' : function(/*label, icon*/){
			this._super(OjLink, '_constructor', []);
      this._processArguments(arguments, {
        'setText' : null,
        'setIcon' : null
      });
		},

		'redraw' : function(){
			if(this._super(OjLink, 'redraw', arguments)){
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
			this._super(OjLink, 'setIsActive', arguments);
			if(this._icon){
				this._icon.setIsActive(active);
			}
		}
	},
	{
		'_TAGS' : ['button']
	}
);


OJ.extendClass(
	'OjAlert', [OjComponent],
	{
		'_props_' : {
			'buttons'      : null,
			'content'      : null,
			'selfDestruct' : 0, // OjAlert.NONE
			'title'        : null
		},
		'_template' : '<div><div var=underlay></div><div var=pane><div var=bar v-align=m></div><div class=content v-align=m><label var=container></label></div><div var=buttons></div></div></div>',

		'_constructor' : function(/*content, title, buttons, cancel_label*/){
			this._super(OjComponent, '_constructor', []);
			// setup the display
			if(this.className().indexOf('Alert') > -1){
				this.buttons.addChild(this.cancelBtn = new OjButton(OjAlert.OK));
				this.cancelBtn.addEventListener(OjMouseEvent.CLICK, this, '_onCancelClick');
			}
      this._processArguments(arguments, {
        'setContent': null,
        'setTitle' : null,
        'setButtons' : null,
        'cancelBtn.setLabel' : OjAlert.CANCEL
      });
		},
		'_destructor' : function(/*depth = 1*/){
			var args = arguments,
				  depth = args.length ? args[0] : 0;
			if(!depth){
				// remove all the content so it doesn't get destroyed
				this.container.removeAllChildren();
			}
			return this._super(OjComponent, '_destructor', arguments);
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
		'NONE'    : 0,
		'SHALLOW' : 1,
		'DEEP'    : 2,
		'OK'     : 'Ok',
		'Cancel' : 'Cancel'
	}
);


OJ.extendClass(
	'OjModal', [OjAlert, OjINavController],
	{
    '_show_bar' : true,  '_show_close' : true,  '_show_underlay' : true,  '_show_buttons' : false,
    '_stack' : null, '_template' : '<div><div var=underlay></div><div var=pane><flownav var=bar v-align=m cancel-label=Close></flownav><navstack var=container class=content></navstack><div var=buttons v-align=m></div></div></div>',

    '_constructor' : function(/*view, title*/){
      var args = arguments,
        ln = args.length;
      this._super(OjAlert, '_constructor', []);
      // setup controller stack relationship
      this.stack = this.container;
      this.bar.setStack(this.stack);
      this.setStack(this.stack);

      // default the show settings
      this.showBar(this._show_bar);
      this.showClose(this._show_close);
      this.showUnderlay(this._show_underlay);
      this.showButtons(this._show_buttons);
      // process arguments
      if(ln){
        this.addView(args[0]);
        if(ln > 1){
          this.setTitle(args[1]);
        }
      }
      if(OJ.isMobile()){
        this.bar.setCancelLabel('&#10006');
      }
    },
    '_destructor' : function(/*depth = 0*/){
      var args = arguments,
        depth = args.length ? args[0] : 0;
      this._unset('bar', depth);
      this._unset('stack', depth);
      this._stack = null;
      return this._super(OjAlert, '_destructor', arguments);
    },

    '_onDrag' : function(evt){
      this.pane.setX(this.pane.getX() + evt.getDeltaX());
      this.pane.setY(this.pane.getY() + evt.getDeltaY());
    },
    '_onStackChange' : function(evt){
      // todo: OjModal - rethink how to autosize the modal to content
//				if(!this.getPaneWidth()){
//					trace(evt.getView().getWidth());
//					this.setPaneWidth(evt.getView().getWidth());
//				}
//
//				if(!this.getPaneHeight()){
//					this.setPaneWidth(evt.getView().getWidth());
//				}
    },

    'showBar' : function(){
      if(arguments.length){
        if(this._show_bar = arguments[0]){
          this.bar.show();
//						this.bar.addEventListener(OjDragEvent.DRAG, this, '_onDrag');
        }
        else{
          this.bar.hide();
//						this.bar.removeEventListener(OjDragEvent.DRAG, this, '_onDrag');
        }
      }
      return this._show_bar;
    },
    'showButtons' : function(){
      var args = arguments;
      if(args.length){
        if(this._show_buttons = args[0]){
          this.removeCss(['no-buttons']);
        }
        else{
          this.addCss(['no-buttons']);
        }
      }
      return this._show_buttons;
    },
    'showClose' : function(){
      var args = arguments;
      if(args.length){
        this.bar.showCancel(args[0]);
        if(args[0]){
          this.bar.addEventListener(OjEvent.CANCEL, this, '_onCancelClick');
        }
        else{
          this.bar.removeEventListener(OjEvent.CANCEL, this, '_onCancelClick');
        }
      }
      return this.bar.showCancel();
    },
    'showUnderlay' : function(){
      if(arguments.length){
        if(this._show_underlay = arguments[0]){
          this.underlay.show();
        }
        else{
          this.underlay.hide();
        }
      }
      return this._show_underlay;
    },

    'setButtons' : function(val){
      this._super(OjAlert, 'setButtons', arguments);
      if(this.buttons.numChildren()){
        this.buttons.show();
      }
      else{
        this.buttons.hide();
      }
    },
    'setTitle' : function(title){
      this.bar.setTitle(this._title = title);
    }
  }
);


OJ.extendManager(
	'WindowManager', 'OjWindowManager', [OjActionable],
	{
		'BLANK'  : '_blank',
		'SELF'   : '_self',
		'PARENT' : '_parent',
		'TOP'    : '_top',
		'WINDOW' : '_window',
		'HIDE' : 'onWindowHide',
		'SHOW' : 'onWindowShow',
		'_props_' : {
			'alertClass' : OjAlert,
			'modalClass' : OjModal
		},
		'_constructor' : function(manager){
			this._super(OjActionable, '_constructor', []);
			if(manager){
				this._modals = manager._modals;
				this._modal_holder = manager._modal_holder;
				this._overlay = manager._overlay;
				if(!OJ.isReady()){
					OJ.removeEventListener(OjEvent.READY, manager, '_onOjReady');
					OJ.addEventListener(OjEvent.READY, this, '_onOjReady');
				}
				OJ.destroy(manager);
			}
			else{
				this._modals = [];
				this._modal_holder = new OjStyleElement();
				this._modal_holder.addCss(['WindowManager']);
				this._modal_holder.hide();
				if(OJ.isReady()){
					this._onOjReady(null);
				}
				else{
					OJ.addEventListener(OjEvent.READY, this, '_onOjReady');
				}
			}
		},

		'_calcBrowserWidth' : function(){
			var vp = OJ.getViewport();
			if(OJ.isMobile()){
				return vp.width;
			}
			if(OJ.isTablet() && vp.width > 540){
				return 540;
			}
			return Math.round(vp.width * .85);
		},
		'_calcBrowserHeight' : function(){
			var vp = OJ.getViewport();
			if(OJ.isMobile()){
				return vp.height;
			}
			if(OJ.isTablet() && vp.height > 620){
				return 620;
			}
			return Math.round(vp.height * .85);
		},
		'_isMobileModal' : function(modal){
			return modal.is('OjModal') && OJ.isMobile()
		},
		'_transIn' : function(modal){
			var anim  = new OjFade(modal, OjFade.IN, 250),
				  pane = modal.pane,
				  h, y;
			// transition the alert/modal
			anim.addEventListener(OjTweenEvent.COMPLETE, this, '_onShow');
			anim.start();
			if(this._isMobileModal(modal)){
				h = pane.getHeight();
				y = pane.getY();
				pane.setY(y + h);
				// transition the modal
				anim = new OjMove(pane, OjMove.Y, y, anim.getDuration(), OjEasing.OUT);
				anim.start();
			}
		},
		'_transOut' : function(modal){
			var anim = new OjFade(modal, OjFade.OUT, 250),
				pane = modal.pane,
				h, y;
			// transition the alert/modal
			anim.addEventListener(OjTweenEvent.COMPLETE, this, '_onHide');
			anim.start();
			if(this._isMobileModal(modal)){
				h = pane.getHeight();
				y = pane.getY();
				// transition the modal
				anim = new OjMove(modal.pane, OjMove.Y, y + h, anim.getDuration(), OjEasing.OUT);
				anim.start();
			}
		},
		'_onShow' : function(evt){
			var modal = evt.getCurrentTarget().getTarget();
			// destroy tween
			evt = OJ.destroy(evt);
			// dispatch show event
			modal.dispatchEvent(new OjEvent(this.SHOW));
		},

		'_onHide' : function(evt){
			var holder = this._modal_holder,
				modal = evt.getCurrentTarget().getTarget();
			// remove the modal from the holder
			holder.removeChild(modal);
			// destroy the tween
			evt = OJ.destroy(evt);
			// check to see if the modal holder is empty
			// if it is empty then hide it since there is nothing more to show
			if(!holder.numChildren()){
				holder.hide();
			}
			// dispatch hide event
			modal.dispatchEvent(new OjEvent(this.HIDE));
			// check to see if this modal is self destructing
			if(modal.getSelfDestruct()){
				OJ.destroy(modal, modal.getSelfDestruct());
			}
		},
		'_onOjReady' : function(evt){
			OJ.removeEventListener(OjEvent.READY, this, '_onOjReady');
			document.body.appendChild(this._modal_holder.dom());
			this._modal_holder._setIsDisplayed(true);
		},

		'alert' : function(message/*, title, buttons, cancel_label*/){
			var alrt = this.makeAlert.apply(this, arguments);
			this.show(alrt);
			return alrt;
		},
		'call' : function(phone){
			window.location.href = 'tel:' + phone.getPath().substring(1);
		},
    'close' : function(){
      window.close();
    },
		'email' : function(email){
			window.location.href = 'mailto:' + email.getPath().substring(1);
		},
		'browser' : function(url, title/*, width, height */){
			var args = arguments,
				ln = args.length,
				iframe = new OjIframe(url),
				modal = this.makeModal(iframe, title);
			iframe.setWidth(100, '%');
			iframe.setHeight(100, '%');
			modal.addCss(['browser']);
			modal.setSelfDestruct(OjAlert.DEEP);
			modal.setPaneWidth(ln > 2 ? args[2] : this._calcBrowserWidth());
			modal.setPaneHeight(ln > 3 ? args[3] : this._calcBrowserHeight());
			return this.show(modal);
		},
		'modal' : function(/*content, title, width, height*/){
			var args = arguments,
				ln = args.length,
				modal = this.makeModal.apply(this, args);
			modal.setSelfDestruct(OjAlert.DEEP);
			modal.setPaneWidth(ln > 2 ? args[2] : this._calcBrowserWidth());
			modal.setPaneHeight(ln > 3 ? args[3] : this._calcBrowserHeight());
			this.show(modal);
			return modal;
		},
		'position' : function(modal){
      // position the modal
			var w = modal.getWidth(),
				h = modal.getHeight(),
				w2 = modal.getPaneWidth(),
				h2 = modal.getPaneHeight();
			modal.pane.setX((w - w2) / 2);
			modal.pane.setY(((h - h2) / 2) * .75);
		},
		'hide' : function(modal){
			var modals = this._modals,
				index;
			if((index = modals.indexOf(modal)) == -1){
				return;
			}
			modals.splice(index, 1);
			this._transOut(modal);
		},
		'hideLoading' : function(/*overlay*/){
			var args = arguments,
				overlay = args.length ? args[0] : this._overlay;
			if(overlay){
				overlay.hide();
			}
		},
		'image' : function(url, title/*, width, height*/){
			var args = arguments,
				ln = args.length,
				viewer = new OjImageViewer(url),
				modal = this.makeModal(viewer, title);
			viewer.setWidth(100, '%');
			viewer.setHeight(100, '%');
			modal.setSelfDestruct(OjAlert.DEEP);
			modal.setPaneWidth(ln > 2 ? args[2] : this._calcBrowserWidth());
			modal.setPaneHeight(ln > 3 ? args[3] : this._calcBrowserHeight());
			return this.show(modal);
		},
		'makeAlert' : function(/*message, title, buttons = [], cancel_label = 'OK', width = 400, height = auto*/){
			var args = arguments,
				ln = args.length,
				params = [
					ln ? args[0] : null,
					ln > 1 ? args[1] : null,
					ln > 2 ? args[2] : [],
					OjAlert.OK
				],
				alrt;
			// load in the passed buttons array
			if(ln > 3){
				params[3] = args[3];
			}
			// default the cancel label
			else if(ln > 2){
				params[3] = OjAlert.CANCEL;
			}
			// make the new alert
			alrt = this._alertClass.makeNew(params);
			// hide the buttons if we have no buttons and no cancel label
			if(!params[2] && !params[3]){
				alrt.hideButtons();
			}
			// set the pane height and width
			alrt.setPaneWidth(ln > 4 ? args[4] : 400);
			if(ln > 5){
				alrt.setPaneHeight(args[5]);
			}
			return alrt;
		},
		'makeModal' : function(/*content, title*/){
			return this._modalClass.makeNew(arguments);
		},
		'moveToTop' : function(modal){
			this._modal_holder.moveChild(modal, this._modal_holder.numChildren() - 1);
		},
		'open' : function(url/*, target, params*/){
			// check for email
			if(url.getProtocol() == 'mailto'){
				return this.email(url);
			}
			// check for phone call
			if(url.getProtocol() == 'tel'){
				return this.call(url);
			}
			var args = arguments,
				ln = args.length,
				target = ln > 1 ? args[1] : this.BLANK,
				params = ln > 2 ? args[2] : {},
				specs = [], key,
				vp = OJ.getViewport(), scrn = OJ.getScreen();
			// check for text message
			if(url.getProtocol() == 'sms' || url.getProtocol() == 'mms'){
				return this.txt(url, params);
			}
			if(target != this.SELF && target != this.TOP && target != this.PARENT){
				if(isUnset(params.toolbar)){
					params.toolbar = 0;
				}
				if(!params.width){
					params.width = vp.width * .75;
				}
				if(!params.height){
					params.height = vp.height * .75;
				}
				if(isUnset(params.top)){
					params.top = scrn.top + Math.round((vp.height - params.height) / 2);
				}
				if(isUnset(params.left)){
					params.left = scrn.left + Math.round((vp.width - params.width) / 2);
				}
				// merge the params into the specs string
				for(key in params){
					specs.push(key + '=' + params[key]);
				}
				if(target == this.WINDOW){
					// create a new target id
					target = OJ.guid();
				}
			}
			args = [url.toString()];
			if(target != this.BLANK){
				args.push(target);
				args.push(specs.join(','));
			}
			window.open.apply(window, args);
			return target;
		},
		'show' : function(modal){
			var holder = this._modal_holder;
			// store the modal
			this._modals.push(modal);
			// make sure the holder is visible
			if(!holder.isVisible()){
				holder.show();
			}
			// prep the modal
			modal.show();
			modal.setAlpha(0);
			// add the modal
			holder.addChild(modal);
			this.position(modal);
			this._transIn(modal);
		},
		'showLoading' : function(/*message, icon*/){
			var args = arguments,
				ln = args.length,
				msg = ln ? args[0] : null,
				icon = ln > 1 ? args[1] : null,
				overlay = this._overlay;
			if(!overlay){
				overlay = this._overlay = new OjOverlay();
			}
			overlay.setMessage(msg);
			overlay.setIcon(icon);
			overlay.show(this._modal_holder);
			return overlay;
		},

		'getHolder' : function(){
			return this._modal_holder;
		}
	}
);


OJ.extendComponent(
	'OjFieldset', [OjComponent],
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
		'_template' : '<fieldset><legend var=legend></legend><a var=actuator></a><div var=container></div></fieldset>',

		'_constructor' : function(/*title*/){
			var args = arguments,
				ln = args.length;
			this._super(OjComponent, '_constructor', []);
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
			if(this._super(OjComponent, 'redraw', arguments)){
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
	'OjImageButton', [OjButton],
	{
		'_v_align' : OjStyleElement.TOP,

		'_constructor' : function(/*image*/){
			this._super(OjButton, '_constructor', []);
      this._processArguments(arguments, {
        'setIcon' : null
      })
			this.removeChild(this.label);
		},
		'_processDomSourceChildren' : function(dom_elm, component){
			var txt = dom_elm.innerHTML;
			if(!isEmpty(txt)){
				this.setIcon(new OjImage(txt.trim()));
				return null;
			}
			return this._super(OjButton, '_processDomSourceChildren', arguments);
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
  'OjList', [OjCollectionComponent],
  {
    '_props_' : {
			'direction' : null // OjList.VERTICAL,
    },
    '_constructor' : function(/*data_provider, item_renderer, direction*/){
      this._super(OjCollectionComponent, '_constructor', []);
      this._processArguments(arguments, {
        'items' : undefined,
        'itemRenderer' : OjItemRenderer,
        'direction' : OjList.VERTICAL
      });
    },

    '_onItemAdd' : function(evt){
      this.container.addChildAt(this.renderItem(evt.getItem()), evt.getIndex());
      this._super(OjICollectionComponent, '_onItemAdd', arguments);
		},
		'_onItemMove' : function(evt){
      this.container.moveChild(this.renderItem(evt.getItem()), evt.getIndex());
      this._super(OjICollectionComponent, '_onItemMove', arguments);
		},
		'_onItemRemove' : function(evt){
      var item = evt.getItem();
      this.container.removeChild(item);
      this._super(OjICollectionComponent, '_onItemRemove', arguments);
      this._releaseItem(item);
		},
		'_onItemReplace' : function(evt){
      this.container.replaceChildAt(evt.getIndex(), this._renderItem(evt.getItem()));
      this._super(OjICollectionComponent, '_onItemReplace', arguments);
      this._releaseItem(evt.getOldItem());
		},

		'_onItemClick' : function(evt){
      this._super(OjICollectionComponent, '_onItemClick', arguments);
		},
		'_onItemOver' : function(evt){
      this._super(OjICollectionComponent, '_onItemOver', arguments);
		},
		'_onItemOut' : function(evt){
      this._super(OjICollectionComponent, '_onItemOut', arguments);
		},

    'setDirection' : function(val){
      if(this._direction == val){
        return;
      }
      if(this._direction){
        this.removeCss([this._direction]);
      }
      this.addCss([this._direction = val]);
      return true;
    }
  },
  {
    'HORIZONTAL' : 'horz',
		'VERTICAL'   : 'vert',
    '_TAGS' : ['list']
  }
);

OJ.extendClass(
  'OjPackage', [OjActionable],
  {
    '_onOjLoad' : function(evt){
      OJ.removeEventListener(OjEvent.LOAD, this, '_onOjLoad');
    },
    '_onOjReady' : function(evt){
      OJ.removeEventListener(OjEvent.READY, this, '_onOjReady');
    }
  }
);

OJ.extendClass(
	'OjEventPhase', [OjObject],
	{},
	{
		'BUBBLING'  : 3,
		'CAPTURING' : 1,
		'TARGETING' : 2
	}
);


OJ.extendClass(
	'OjOrientationEvent', [OjDomEvent],
	{
		'_get_props_' : {
			'orientation' : null
		},

		'_constructor' : function(type/*, orientation = NULL, bubbles, cancelable*/){
			var args = Array.array(arguments),
				ln = args.length;
			if(ln > 1){
				this._orientation = args.splice(1, 1)[0];
			}
			this._super(OjDomEvent, '_constructor', args);
		},

		'clone' : function(){
			var clone = this._super(OjDomEvent, 'clone', arguments);
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
			return new OjOrientationEvent(type, window.orientation, false, false);
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


OJ.extendComponent(
	'OjItemRenderer', [OjComponent],
	{
		'_props_' : {
			'data'  : null,
			'group' : null
		},

		'_constructor' : function(/*group, data*/){
			this._super(OjComponent, '_constructor', []);
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
			if(this._super(OjComponent, 'redraw', arguments)){
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

OJ.extendClass(
	'OjLabelItemRenderer', [OjItemRenderer],
	{
		'_template' : '<div><label var=lbl></label></div>',

		'_redrawData' : function(){
			if(this._super(OjItemRenderer, '_redrawData', arguments)){
				this.lbl.setText(this._data);
				return true;
			}
			return false;
		}
	}
);


OJ.extendClass(
	'OjOption', [OjItemRenderer],
	{
		'_props_' : {
			'dataRenderer' : null,
			'isSelected'   : false
		},
//		'_selector' : null,
		'_v_align' : OjStyleElement.MIDDLE,
		'_template' : '<div><div var=indicator><input var=input type=checkbox /></div></div>',

		'_constructor' : function(/*group|dataRenderer, data*/){
			// process the arguments
			var args = arguments,
				ln = args.length,
				renderer = OjLabelItemRenderer;
			if(ln > 1){
				var tmp = args[1];
				if(isString(tmp) || tmp.is('OjItemRenderer')){
					renderer = tmp;
					args[1] = null;
				}
			}
			this._super(OjItemRenderer, '_constructor', arguments);
			if(!this._selector){
				this.setDataRenderer(renderer);
				this.addEventListener(OjMouseEvent.CLICK, this, '_onClick');
			}
		},
		'_destructor' : function(){
			this._selector = this._dataRenderer = null;
			return this._super(OjItemRenderer, '_destructor', arguments);
		},

		'_processDomSourceChild' : function(dom_elm, component){
			if(!isEmpty(dom_elm.nodeValue)){
				this.setData((this._data ? this._data : '') + dom_elm.nodeValue);
				return null;
			}
			return this._super(OjItemRenderer, '_processDomSourceChild', arguments);
		},
		'_redrawData' : function(){
			if(this.option && this._super(OjItemRenderer, '_redrawData', arguments)){
				this.option.setData(this._data);
				return true;
			}
			return false;
		},

		'_onClick' : function(evt){
			this.setIsSelected(!this.getIsSelected());
		},

		'setDataRenderer' : function(val){
			if(isString(val)){
				val = OJ.stringToClass(val);
			}
			if(this._dataRenderer == val){
				return;
			}
			this._unset('option');
			this._dataRenderer = val;
			this.addElm(this.option = new val(this._group, this._data));
		},
		'setGroup' : function(group){
			if(this._group == group){
				return;
			}
			this._super(OjItemRenderer, 'setGroup', arguments);
			var owner;
			if(this._group && (owner = this._group.getOwner()) && owner.is('OjSelector')){
				this._selector = owner;
				this.setDataRenderer(owner.getItemRenderer());
				this.removeEventListener(OjMouseEvent.CLICK, this, '_onClick');
			}
			else{
				this._selector = null;
				this.setDataRenderer(OjLabelItemRenderer);
				this.addEventListener(OjMouseEvent.CLICK, this, '_onClick');
			}
		},
		'setIsSelected' : function(val){
			if(this._isSelected == val){
				return;
			}
			if(this._isSelected = val){
				this.addCss(['selected']);
				this.input.dom().checked = true;
			}
			else{
				this.removeCss(['selected'])
				this.input.dom().checked = false;
			}
			this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
		}
	}
);


OJ.extendComponent(
	'OjCheckedOption', [OjOption],
	{},
	{
		'_TAGS' : ['checkbox']
	}
);


OJ.extendClass(
	'OjInput', [OjComponent],
	{
		'_props_' : {
			'default'    : null,
			'name'       : null,
			'prefix'     : null,
			'required'   : false,
			'suffix'     : null,
			'title'      : null,
			'validators' : null,
			'value'      : null
		},
		'_get_props_' : {
			'error' : null
		},
		'_ready' : false,  '_template' : '<div><div var=wrapper><label var=label></label><div var=psuedoInput><span var=prefix class=prefix></span><span var=stem><input var=input type=hidden /><label var=dflt></label></span><span var=suffix class=suffix></span></div></div></div>',

		'_constructor' : function(/*name, label, value, validators*/){
			this._super(OjComponent, '_constructor', []);
			var args = arguments,
				ln = args.length;
			this._errors = [];
			this._validators = [];
			// detect default mode
			if(!isUndefined(this.input.dom().placeholder)){
				this._unset('dflt');
			}
			if(ln){
				this.setName(args[0]);
				if(ln > 1){
					this.setLabel(args[1]);
					if(ln > 2){
						this.setValue(args[2]);
						if(ln > 3){
							this.setValidators(args[3]);
						}
					}
				}
			}
			if(!this._label){
				this.setLabel(this._label);
			}
			if(this.input){
				if(!this._value){
					this.setValue(this.input._dom.value);
				}
				this.input.addEventListener(OjFocusEvent.IN, this, '_onFocusIn');
				this.input.addEventListener(OjFocusEvent.OUT, this, '_onFocusOut');
				this.input.addEventListener(OjDomEvent.CHANGE, this, '_onChange');
			}
			if(this.className() == 'OjInput'){
				this.hide();
			}
			else{
				ln = this._class_names.length;
				for(; ln--;){
					this.addCss(this._class_names[ln]);
					if(this._class_names[ln] == 'OjInput'){
						break;
					}
				}
			}
			this.addEventListener(OjMouseEvent.CLICK, this, '_onClick');
			this._ready = true;
		},

		'_formatError' : function(error){
			return  OJ.tokensReplace(error, this._formatErrorTokens());
		},
		'_formatErrorTokens' : function(){
			return {
				'INPUT' : this._title || this._label || this._default || this._name,
				'VALUE' : this._value
			};
		},
		'_redrawDefault' : function(){
			if(!this.dflt || isEmpty(this._default) || !isEmpty(this._value)){
				this.addCss(['no-default']);
			}
			else{
				this.removeCss(['no-default']);
			}
			return true;
		},
		'_onDefaultClick' : function(evt){
			this.input.focus();
		},
		'_onFocusIn' : function(evt){
			this.addCss(['focus']);
		},
		'_onFocusOut' : function(evt){
			this.removeCss(['focus']);
		},
		'_onChange' : function(evt){
			this.setValue(this.input._dom.value);
		},
		'_onClick' : function(evt){
			if(!this.input.hasFocus()){
				this.focus();
			}
		},
		'blur' : function(){
			this.input.blur();
		},
		'focus' : function(){
			this.input.focus();
		},
		'isValid' : function(){
			this._error = null;
			if(this._required && isEmpty(this._value)){
				this._error = this._formatError(OjInput.REQUIRED_ERROR);
				return false;
			}
			return true;
		},
		'redraw' : function(){
			if(this._super(OjComponent, 'redraw', arguments)){
				this._redrawDefault();
				return true;
			}
			return false;
		},
		'validate' : function(){
			if(this.isValid()){
				this.removeCss(['error']);
				return true;
			}
			this.addCss(['error']);
			return false;
		},

		'setDefault' : function(val){
			if(this._default == val){
				return;
			}
			this._default = val;
			if(this.dflt){
				if(val){
					this.dflt.addEventListener(OjMouseEvent.CLICK, this, '_onDefaultClick');
				}
				else{
					this.dflt.removeEventListener(OjMouseEvent.CLICK, this, '_onDefaultClick');
				}
				this.dflt.setText(val);
				this._redrawDefault();
			}
			else{
				this.input.setAttr('placeholder', val);
			}
		},
		'getErrors' : function(){
			return this._errors;
		},
		'setLabel' : function(lbl){
			this.label.setText(this._label = lbl);
			if(isEmpty(this._label)){
				this.addCss(['no-label']);
			}
			else{
				this.removeCss(['no-label']);
			}
		},
		'setPrefix' : function(prefix){
			if(isString(prefix)){
				this.prefix.setText(this._prefix = prefix);
			}
			else{
				if(this._prefix){
					if(isString(this._prefix)){
						this.removeAllChildren();
					}
					else{
						this.prefix.removeChild(this._prefix);
					}
				}
				this.prefix.addChild(this._prefix = prefix);
			}
		},
		'setSuffix' : function(suffix){
			if(isString(suffix)){
				this.suffix.setText(this._suffix = suffix);
			}
			else{
				if(this._suffix){
					if(isString(this._suffix)){
						this.removeAllChildren();
					}
					else{
						this.suffix.removeChild(this._suffix);
					}
				}
				this.suffix.addChild(this._suffix = suffix);
			}
		},
		'setValidators' : function(validators){
			this._validators = Array.array(validators);
		},
		'getValue' : function(){
			return this._value;
		},
		'setValue' : function(value){
			if(value != this._value){
				this._value = value;
				if(this.input._dom.value != value){
					this.input._dom.value = String.string(value);
				}
				this._redrawDefault();
				if(this._ready){
					this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
				}
			}
		}
	},
	{
		'REQUIRED_ERROR' : '[%INPUT] is required.',

		'supportsInputType' : function(type){
			var i = document.createElement('input');
			i.setAttribute('type', type);
			return i.type == type;
		}
	}
);


OJ.extendClass(
	'OjComboBox', [OjInput],
	{
		'_options' : null,  '_options_dp' : null,  '_options_index' : null,
		'_selected' : null,  '_selected_index' : null,  '_trigger_evt' : null,  '_tween' : null,
		'_list' : null,  '_list_visible' : false,  '_ignore_click' : false,  '_allow_none' : false,  '_none_lbl' : '-- Select -- ',

		'_constructor' : function(/*name, label, value, options*/){
			var ln = arguments.length;
			this._options_index = [];
			this._super(OjInput, '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);
			this._list = new OjList();
			this._list.addEventListener(OjCollectionEvent.ITEM_CLICK, this, '_onItemClick');
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
				this._super(OjInput, 'setValue', [value]);
			}
		}
	}
);


OJ.extendComponent(
	'OjTextInput', [OjInput],
	{
		'_props_' : {
			'minLength' : 0,
			'maxLength' : 255
		},

		'_constructor' : function(/*name, label, value, validators*/){
			this._super(OjInput, '_constructor', arguments);
			this.input.addEventListener(OjKeyboardEvent.UP, this, '_onChange');
		},

		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);
			this.input.setAttr('type', 'text');
		},

		'isValid' : function(){
			var valid = this._super(OjInput, 'isValid', arguments);
			var ln = this._value ? this._value.length : 0;
			if(this._minLength && ln < this._minLength){
				this._errors.push(OJ.tokenReplace(OjTextInput.MIN_LENGTH_ERROR, 'MIN', this._minLength));
				valid = false;
			}
			if(this._maxLength && ln > this._maxLength){
				this._errors.push(OJ.tokenReplace(OjTextInput.MAX_LENGTH_ERROR, 'MAX', this._maxLength));
				valid = false;
			}
			return valid;
		},
		'setValue' : function(value){
			if(value && value.length > this._maxLength){
				this.input._dom.value = value.slice(0, this._maxLength);
				return;
			}
			return this._super(OjInput, 'setValue', arguments);
		}
	},
	{
		'MIN_LENGTH_ERROR' : 'Entry must be at least [%MIN] characters long.',
		'MAX_LENGTH_ERROR' : 'Entry must be no more than [%MAX] characters long.',
		'_TAGS' : ['textinput']
	}
);
//OJ.importJs('oj.date.CalendarControl');


OJ.extendClass(
	'OjDateInput', [OjTextInput],
	{
		'_onFocusIn' : function(evt){
			this._super(OjTextInput, '_onFocusIn', arguments);
			//showCalendarControl(this.dom());
		}
	}
);


OJ.extendClass(
	'OjTextValue', [OjComponent],
	{
		'_template' : '<div><label var=label></label><span var=value></span></div>',
//		'_label' : null,  '_value' : null,

		'_constructor' : function(/*label, value*/){
			this._super(OjComponent, '_constructor', []);
			var ln = arguments.length;
			if(ln){
				this.setLabel(arguments[0]);
				if(ln > 1){
					this.setValue(arguments[1]);
				}
			}
		},

		'_redrawLabel' : function(){
			this.label.setText(this._label);
		},
		'_redrawValue' : function(){
			this.value.setText(this._value);
		},
		'getLabel' : function(){
			return this._label;
		},
		'setLabel' : function(label){
			this._label = label;
			this._redrawLabel();
		},
		'getValue' : function(){
			return this._value;
		},
		'setValue' : function(value){
			this._value = value;
			this._redrawValue();
		}
	}
);


OJ.extendClass(
	'OjDateValue', [OjTextValue],
	{
		'_redrawValue' : function(){
			this.value.setText(this._value.toLocaleDateString());
		}
	}
);


OJ.extendComponent(
	'OjEmailInput', [OjTextInput],
	{
		'_props_' : {
			'maxLength' : 254,
			'minLength' : 3
		},

		'_setDom' : function(dom_elm){
			this._super(OjTextInput, '_setDom', arguments);
			if(this._static.SUPPORTS_EMAIL_TYPE){
				this.input.setAttr('type', 'email');
			}
		},

		'isValid' : function(){
			if(
				this._super(OjTextInput, 'isValid', arguments) &&
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
	'OjFilterBox', [OjComboBox],
	{
		'_item_index' : null,  '_previous_search' : null,

		'_constructor' : function(){
			this._super(OjComboBox, '_constructor', arguments);
			// setup event listeners
			this.valueHldr.addEventListener(OjEvent.CHANGE, this, '_onSearch');
			this.valueHldr.addEventListener(OjFocusEvent.IN, this, '_onFocusIn');
			this.valueHldr.addEventListener(OjFocusEvent.OUT, this, '_onFocusOut');
			this._item_index = {};
		},

		'_setDom' : function(dom_elm){
			this._super(OjComboBox, '_setDom', arguments);
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
			this._super(OjComboBox, '_showList', arguments);
		},
		'_hideList' : function(){
			this._super(OjComboBox, '_hideList', arguments);
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
	'OjForm', [OjView], 
	{
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
			this._super(OjView, 'focus', arguments);
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


OJ.extendClass(
	'OjFormError', [OjItemRenderer],
	{
		'_template' : '<div><div var=input></div><list var=errors></list></div>',

		'_redrawData' : function(){
			var data = this._data,
				input = this.input,
				errors = this.errors;
			if(data){
				if(data.input){
					input.show();
					input.setText(data.input.getLabel());
				}
				else{
					input.hide();
				}
				if(data.errors){
					errors.show();
					errors.getDataProvider().setSource(data.errors);
				}
				else{
					errors.hide();
				}
			}
		}
	}
);


OJ.extendClass(
	'OjPasswordInput', [OjTextInput],
	{
		'_min' : 6,  '_max' : 30,

		'_setDom' : function(dom_elm){
			this._super(OjTextInput, '_setDom', arguments);
			this.input.setAttr('type', 'password');
		}
	}
);


OJ.extendClass(
	'OjRadioOption', [OjOption],
	{
		'_constructor' : function(){
			this._super(OjOption, '_constructor', arguments);
			this.input.setAttr('type', 'radio');
		}
	}
);


OJ.extendComponent(
	'OjSelector', [OjInput],
	{
		'_props_' : {
			'itemRenderer'      : OjLabelItemRenderer,
			'selectionMin'      : 0,
			'selectionMax'      : 1
		},
		'_template' : '<div><div var=wrapper><label var=label></label><div var=psuedoInput><span var=prefix class=prefix></span><span var=stem><list var=input item-renderer=OjOption></list><label var=dflt></label></span><span var=suffix class=suffix></span></div></div></div>',

		'_constructor' : function(/*name, label, value, options*/){
			var args = arguments,
				ln = args.length;
			// default the value
			this._value = [];
			this._super(OjInput, '_constructor', ln > 2 ? Array.array(args).slice(0, 2) : args);
			// setup the list listeners
			this.input.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
			this.input.addEventListener(OjCollectionEvent.ITEM_CLICK, this, '_onItemClick');
			this.input.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
			this.input.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
			this.input.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');
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
			if(this._super(OjInput, 'redraw', arguments)){
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
	'OjSwitch', [OjInput],
	{
		'_props_' : {
		},
		'_template' : '<div><div var=wrapper><label var=label></label><div var=psuedoInput><div var=slider><label var=prefix></label><label var=suffix></label><div class=highlight></div><span var=stem><input var=input type=hidden /></span></div></div></div></div>'
	},
	{
		'_TAGS' : ['switch']
	}
);


OJ.extendComponent(
	'OjTextArea', [OjInput],
	{
		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);
			var prnt = this.input.parent(),
				new_input = new OjStyleElement(OjElement.elm('textarea'));
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
	'OjToken', [OjItemRenderer],
	{
		'_template' : '<div><div var=item></div><button var=removeBtn>X</button></div>',

		'_constructor' : function(/*data*/){
			this._super(OjItemRenderer, '_constructor', arguments);
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
	'OjTokenInput', [OjInput],
	{
		'_allow_none' : false,  '_allow_duplicate' : false,
		'_options' : null,  '_available' : null,  '_selected' : null,
		'filterBox' : null,

		'_constructor' : function(/*name, label, value, list = Object*/){
			var ln = arguments.length;
			// setup the value and options
			this._selected = [];
			this._value = [];
			this._super(OjInput, '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);
			if(ln > 2){
				if(ln > 3){
					this.setOptions(arguments[3]);
				}
				this.setValue(arguments[2]);
			}
			// setup event listeners
			this.valueHldr.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onListItemRemove');
			this.filterBox.addEventListener(OjEvent.CHANGE, this, '_onFilterChange');
		},

		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);
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


OJ.extendComponent(
	'OjAudio', [OjMedia],
	{
		'_sources' : null,

		'_makeMedia' : function(){
			var elm = new OjStyleElement('<audio></audio>');
//			elm.addEventListener('load', this._callback = this._onMediaLoad.bind(this));
			return elm;
		},
		'_setSource' : function(url){
			this._super(OjMedia, '_setSource', arguments);
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
	'OjVideo', [OjMedia],
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
	'OjMenu', [OjComponent],
	{
		'_props_' : {
			'content'     : null,
			'horzOffset'  : null,
			'positioning' : null,
			'parentMenu'  : null,
			'vertOffset'  : 0
		},

		'_constructor' : function(/*content, positioning, parent_menu*/){
			this._super(OjComponent, '_constructor', []);
      this._processArguments(arguments, {
        'setContent'     : null,
        'setPositioning' : [
					OjMenu.RIGHT_MIDDLE, OjMenu.RIGHT_TOP, OjMenu.RIGHT_BOTTOM,
					OjMenu.LEFT_MIDDLE, OjMenu.LEFT_TOP, OjMenu.LEFT_BOTTOM,
					OjMenu.BOTTOM_LEFT, OjMenu.BOTTOM_CENTER, OjMenu.BOTTOM_RIGHT,
					OjMenu.TOP_LEFT, OjMenu.TOP_CENTER, OjMenu.TOP_RIGHT
				],
        'setParentMenu'  : null
      });
		},
		'_destructor' : function(){
			this._content = null;
			return this._super(OjComponent, '_destructor', arguments);
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
	'MenuManager', 'OjMenuManager', [OjActionable],
	{
    '_props_' : {
      'menuClass' : OjMenu
    },

//		'_active': null,  '_menus': null,  '_tweens': null,

		'_constructor' : function(){
			this._super(OjActionable, '_constructor', arguments);
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
        if(backup){
          rect = null;
        }
			}
			if(!rect){
				rect = backup;
			}
			menu.setX(rect.getLeft());
			menu.setY(rect.getTop());
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
    'makeMenu' : function(){
      return this._menuClass.makeNew(arguments);
    },
    'menu' : function(target, content/*, positioning, parent_menu*/){
      // build the menu
      var menu = this.makeMenu.apply(this, Array.slice(arguments, 1));
      this.register(target, menu);
      this.show(menu, target);
			return menu;
    },
		'register' : function(target, menu){
      // setup the target click listener
      target.addEventListener(OjMouseEvent.CLICK, this, '_onTargetClick');
      this._menus[target.id()] = menu;
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


OJ.extendComponent(
	'OjTabNavController', [OjNavController],
	{
		'_prev_active' : null,

		'_addViewButton' : function(view, index){
      var btn = new OjButton(view.getShortTitle(), view.getIcon());
			btn.setVAlign(OjStyleElement.TOP);
			btn.addEventListener(OjMouseEvent.CLICK, this, '_onTabClick');
      view.addEventListener(OjView.ICON_CHANGE, this, '_onViewIconChange');
      view.addEventListener(OjView.TITLE_CHANGE, this, '_onViewTitleChange');
			this.addChildAt(btn, index);
		},
		'_processDomSourceChildren' : function(dom, context){
			return;
		},
		'_removeViewButton' : function(view, index){
			OJ.destroy(this.removeElmAt(index));
      view.removeEventListener(OjView.ICON_CHANGE, this, '_onViewIconChange');
      view.removeEventListener(OjView.TITLE_CHANGE, this, '_onViewTitleChange');
		},
		'_updateActiveBtn' : function(){
			if(this._prev_active){
				this._prev_active.setIsActive(false);
			}
			(this._prev_active = this.getChildAt(this._stack.getActiveIndex())).setIsActive(true);
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
    '_onViewIconChange' : function(evt){
      var view = evt.getCurrentTarget();
      this.getChildAt(this._stack.indexOfElm(view)).setIcon(view.getIcon());
      trace('icon change');
    },
    '_onViewTitleChange' : function(evt){
      var view = evt.getCurrentTarget();
      this.getChildAt(this._stack.indexOfElm(view)).setLabel(view.getShortTitle());
      trace('title change');
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
			this._super(OjNavController, 'setStack', arguments);
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
	'OjRpc', [OjUrlLoader],
	{
		'_props_' : {
			'method' : null,
			'params' : null
		},
		'_get_props_' : {
			'id' : null
		},

		'_constructor' : function(url, method, params/*, content_type, async*/){
			this._super(OjUrlLoader, '_constructor', []);
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
			return this._super(OjUrlLoader, 'load', []);
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


OJ.extendComponent(
	'OjListItem', [OjItemRenderer],
	{
		'_props_' : {
			'showAccessory' : false,
			'showIcon'      : false
		},
		'accessory' : null,  'content' : null,  'icon' : null,

		'_constructor' : function(/*group, data*/){
			this._super(OjItemRenderer, '_constructor', arguments);
      this.addChild(this.accessory = new OjStyleElement('<div class="accessory" valign="m"></div>'));
			this.addChild(this.icon = new OjImage());
			this.addChild(this.content = new OjStyleElement('<div class="content" valign="m"></div>'));
			this.icon.addCss('-icon');
		},
		'_destructor' : function(/*depth = 0*/){
			if(this._data && this._data.is && this._data.is('OjActionable')){
				this._data.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
			}
			this._list = this._data = null;
			return this._super(OjItemRenderer, '_destructor', arguments);
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
			if(this._super(OjItemRenderer, 'redraw', arguments)){
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
  'OjListViewItemRenderer', [OjItemRenderer],
  {
  }
);

OJ.extendComponent(
  'OjListView', [OjView, OjList],
  {
    '_itemRenderer' : OjListViewItemRenderer,

    '_constructor' : function(){
      this._super(OjView, '_constructor', arguments);

    }
  },
  {
    '_TAGS' : ['listview']
  }
);
