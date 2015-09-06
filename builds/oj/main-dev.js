"use strict";
/**
 * Type & Value Detection Functions
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
function isDefined(obj){
    return !isUndefined(obj);
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
function isObjective(obj, cls){
    return isObject(obj) && isSet(obj.oj_id) && isFunction(obj._constructor) && (!cls || obj.is(cls));
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
           (isObjective(obj) && obj.is('OjArray') && !obj.length);
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
function print(obj/*, ...objs*/){
    if(OJ.mode == OJ.PROD){
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
function printGroup(obj, group){
    if(OJ.mode == OJ.PROD){
        return;
    }
    if(arguments.length){
        if(group && !isUndefined(console.groupCollapsed)){
            console.groupCollapsed(obj);
        }
        else{
            console.group(obj);
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


/**
 * OJ Class
 */
window.OJ = function Oj(){
    var obj = {
            '_events' : [], '_guid' : 8, '_loaded' : {},
            '_is_landscape' : true, '_is_mobile' : false, '_is_ready' : false,
            '_is_supported' : true, '_is_tablet' : false, '_is_touch_capable' : false, '_is_webview' : false,
            '_protocol' : 'http', '_os_version' : '',
            '_settings' : {
                'css_ext' : '.css', 'css_path' : null, 'dim_unit' : 'px', 'font_unit' : 'px',
                'init' : null, 'js_ext' : '.js', 'js_path' : null, 'mode' : 'loading',
                'support_message' : 'Your browser is currently not supported. Please try again with a more recent version of ' +
                    '<a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a>, ' +
                    '<a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, ' +
                    '<a href="http://www.apple.com/safari/">Safari</a> ' +
                    'or <a href="http://windows.microsoft.com/en-us/internet-explorer/downloads/ie-10/worldwide-languages">Internet Explorer</a>. ' +
                    'You can easily download the latest version by clicking on the name of the browser you wish to use.',
                'target' : '#OJ', 'theme' : null, 'tpl_ext' : 'html', 'tpl_path' : null,
                'version' : '0.0.0', 'wait_for_css' : true
            },
            '_viewport' : {
                'top' : 0,
                'left' : 0,
                'bottom' : 0,
                'right' : 0,
                'width' : 0,
                'height' : 0
            },

            // modes
            'DEV' : 'development',
            'LOADING' : 'loading',
            'PROD' : 'production',
            // protocols
            'FILE' : 'file',
            'HTTP' : 'http',
            'HTTPS' : 'https',
            // browsers
            'CHROME' : 'Chrome',
            'FIREFOX' : 'Firefox',
            'IE' : 'Internet Explorer',
            'IN_APP' : 'in-app',
            'MOZILLA' : 'Mozilla',
            'OPERA' : 'Opera',
            'SAFARI' : 'Safari',
            // Engines
            'GECKO' : 'Gecko',
            'KHTML' : 'KHTML',
            'TRIDENT' : 'Trident',
            'WEBKIT' : 'WebKit',
            // OSs
            'CHROME_OS' : 'Chrome OS',
            'LINUX' : 'Linux',
            'OSX' : 'OS X',
            'WINDOWS' : 'Windows',
            // mobile OSs
            'ANDROID' : 'Android',
            'BADA' : 'Bada',
            'BLACKBERRY' : 'BlackBerry OS',
            'BREW' : 'Brew',
            'GRID' : 'Grid OS',
            'IOS' : 'iOS',
            'MEEGO' : 'MeeGo',
            'PALM' : 'Palm',
            'QNX' : 'QNX',
            'SYMBIAN' : 'Symbian',
            'WEBOS' : 'Web OS',
            'WIN_MOBILE' : 'Windows Mobile',
            'WIN_PHONE' : 'Windows Phone',

            // protected functions
            '_getClassPath' : function(type, cls, ext){
                var parts = cls.split('.');
                return parts.shift() + '/' + (type ? type + '/' : '') + parts.join('/') + ext;
            },
            '_getCssImportPath' : function(path){
                var self = this;
                
                if(path.indexOf('/') != -1){
                    return path;
                }
                return self.root + self._getClassPath(self.css_path, path, self.css_ext) + self.version_query;
            },
            '_getJsImportPath' : function(path){
                var self = this;
                if(path.indexOf('/') != -1){
                    return path;
                }
                return self.root + self._getClassPath(self.js_path, path, self.js_ext) + self.version_query;
            },
            '_getModeSuffix' : function(){
                return this.mode == this.DEV ? '-dev' : '';
            },
            '_getTemplateImportPath' : function(path){
                var self = this;
                if(path.indexOf('/') != -1){
                    return path;
                }
                return self.root + self._getClassPath(self.tpl_path, path, this.tpl_ext) + this.version_query;
            },
            '_getThemePath' : function(path){
                if(!path || path.indexOf('/') != -1){
                    return path;
                }
                var self = this,
                    parts = path.split('.');
                if(parts.length == 1){
                    parts.push(path);
                }
                parts.splice(1, 0, 'themes');
                return self.root + parts.join('/') + self._getModeSuffix() + self.css_ext + self.version_query;
            },
            // public functions
            'addEventListener' : function(type, context, func){
                this._events.push(arguments);
            },
            'assetPath' : function(path, file){
                // search for package
                var self = this,
                    parts = path.split('.'),
                    pkg = parts[0];
                return self.root + pkg + '/assets/' + (file ? file + self.version_query : '');
            },
            'loadCss' : function(css/*, is_path=false, async=true*/){
                var self = this,
                    elm, head;
                // check to see if the value is a path
                if(arguments.length > 1 && arguments[1]){
                    elm = document.createElement('link');
                    elm.setAttribute('rel', 'stylesheet');
                    elm.setAttribute('type', 'text/css');
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
                if(self._theme_elm){
                    head.insertBefore(elm, self._theme_elm);
                }
                // otherwise just add it to the end of the head
                else{
                    head.appendChild(elm);
                }
                return elm;
            },
            // dynamically add js to page
            'loadJs' : function(js, is_path/*=true*/, is_async/*=true*/){
                var ln = arguments.length;
                if(ln < 3){
                    is_async = true;
                    if(ln < 2){
                        is_path = true;
                    }
                }
                if(this.mode != this.LOADING || is_async){
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
                if(is_path){
                    document.write(
                        '<scri' + 'pt type="text/javascript" language="javascript" src="' + js + '"></scr' + 'ipt>'
                    );
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
            'attributeToProp' : function(attr){
                return attr.replace('-', '_');
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
                if(obj && obj.prototype){
                    if(obj.prototype._class_name_){
                       return obj.prototype._class_name_;
                    }
                    if(obj.prototype.constructor && obj.prototype.constructor.toString){
                        var arr = obj.prototype.constructor.toString().match(/function\s*(\w+)/);
                        if(arr && arr.length == 2){
                            return arr[1];
                        }
                    }
                }
                return undefined;
            },
            'copy' : function(val){
                if(isArray(val) || isObjective(val)){
                    return val.clone();
                }
                if(isObject(val)){
                    return Object.clone(val);
                }
                return val;
            },
            'destroy' : function(obj/*, depth = 0*/){
                if(obj && isFunction(obj._destructor)){
                    if(!obj._destroyed_){
                        var args = arguments;
                        obj._destructor(args.length > 1 ? args[1] : 0);
                    }
                    else{
                        print('Called destroy multiple times on: ' + obj.oj_id);
                    }
                }
                return obj = null;
            },
            'elm' : function(elm){
                return OjElement.element(elm);
            },

            'defineClass' : function(ns, def, static_def){
                eval('window[ns] = function ' + ns + '(){' + (def['_constructor'] ? 'this._constructor.apply(this, arguments);' : '') + '};');
                def._class_name_ = ns;
                if(def._supers){
                    def._supers = def._supers.slice(0);
                }
                else{
                    def._supers = [];
                }
                window[ns].prototype = def;
                if(static_def){
                    var key;
                    for(key in static_def){
                        window[ns][key] = static_def[key];
                    }
                }
                return window[ns];
            },
            'definePackage' : function(ns, def, parents/*=[OjPackage]*/){
                var cls = this.extendClass(ns, parents || [OjPackage], def),
                    pkg = new cls();
                window[ns.toUpperCase()] = pkg;
                OJ.addEventListener(OjEvent.LOAD, pkg, '_onOjLoad');
                OJ.addEventListener(OjEvent.READY, pkg, '_onOjReady');
            },
            'extendClass' : function(ns, parents, def, static_def){
                // setup our vars & prototype
                var key, parent, ln2, names, name, supers, spr,
                    props = { '_get_props_' : null, '_set_props_' : null, '_props_' : null },
                    ln = parents.length,
                    proto = Object.create(parents[0].prototype),
                    c = OJ.defineClass(ns, proto);
                proto._supers.push(parents[0]);
                // copy the base class statics
                for(; ln--;){
                    parent = parents[ln];
                    for(key in parent){
                        c[key] = parent[key];
                    }
                }
                // add new statics
                if(static_def){
                    for(key in static_def){
                        c[key] = static_def[key];
                    }
                }
                // copy the other parent's prototype
                for(ln = parents.length; ln-- > 1;){
                    parent = parents[ln].prototype;
                    // copy object
                    names = Object.getOwnPropertyNames(parent);
                    for(ln2 = names.length; ln2--;){
                        name = names[ln2];
                        if(name == '_class_name_'){
                            continue;
                        }
                        if(name == '_supers'){
                            supers = proto[name];
                            for(var ln3 = parent[name].length; ln3--;){
                                spr = parent[name][ln3];
                                // we use indexOf here because contains may not be defined yet.
                                if(supers.indexOf(spr) == -1){
                                    supers.push(spr);
                                }
                            }
                            proto[name].push(parents[ln]);
                        }
                        else if(name == '_post_compile_'){
                            proto[name] = parent[name].slice(0).concat(proto[name] || []);
                        }
                        else if(name in props){
                            // merge them straight into the def
                            def[name] = Object.concat({}, parent[name], def[name] || {});
                        }
                        else if(!(name in proto)){
                            try{
                                Object.defineProperty(proto, name, Object.getOwnPropertyDescriptor(parent, name));
                            }
                            catch(e){
                                debugger;
                            }
                        }
                    }
                }
                // add the namespace back
                proto._class_name_ = ns;
                // add the props
                for(key in props){
                    // if no def props then finish exit process
                    if(!def[key]){
                        continue;
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
                var post_compile = proto._post_compile_;
                if(post_compile){
                    var def_post = def._post_compile_;
                    // run the post compile functions
                    if(isFunction(def_post)){
                        proto._post_compile_ = post_compile = post_compile.slice(0);
                        post_compile.unshift(def_post);
                    }
                    for(ln = post_compile.length; ln--;){
                        post_compile[ln](c, proto);
                    }
                }
                // setup the prototype and constructor for the class
                return c.prototype.constructor = c;
            },
            'extendComponent' : function(ns, parents, def/*, static_def*/){
                var args = arguments,
                    tags = arguments.length > 3 ? args[3]._TAGS : null,
                    ln = tags ? tags.length : 0,
                    cls = this.extendClass.apply(this, args);
                // register class name as tag
                OjStyleElement.registerComponentTag(ns.toLowerCase(), ns);
                // register special tags
                for(; ln--;){
                    OjStyleElement.registerComponentTag(tags[ln], ns);
                }
                return cls;
            },
            'extendManager' : function(manager_ns/*, cls_ns, parents, def, static_def*/){
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
                        else if(key == '_props_' || key == '_get_props_' || key == '_set_props_'){
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
            'merge' : function(obj, obj2/*, ...objs*/){
                var args = Array.array(arguments);
                args.unshift({});
                return Object.concat.apply(Object, args);
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
                var ln = this._events.length,
                    evt;
                for(; ln--;){
                    evt = this._events[ln];
                    if(evt[0] == type && evt[1] == context && evt[2] == func){
                        this._events.splice(ln, 1);
                        break;
                    }
                }
            },
            'render' : function(elm){
                if(this.renderer){
                    this.renderer.dom.appendChild(elm = isObjective(elm) ? elm.dom : elm);
                }
            },
            'settings' : function(settings){
                var key;
                for(key in settings){
                    this[key] =  settings[key];
                }
            },
            'stringToClass' : function(str){
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
            }
        },
        get_props = {
            'browser' : null,
            'browser_version' : null,
            'css_prefix' : null,
            'engine' : null,
            'is_computer' : function(){
                return !this.is_mobile && !this.is_tablet;
            },
            'is_landscape' : null,
            'is_mobile' : null,
            'is_portrait' : function(){
                return !this.is_landscape;
            },
            'is_ready' : null,
            'is_supported' : null,
            'is_tablet' : null,
            'is_touch_capable' : null,
            'is_webview' : null,
            'os' : null,
            'os_version' : null,
            'pixel_ratio' : function(){
                return window.devicePixelRatio || 1;
            },
            'protocol' : null,
            'root' : null,
            'screen' : function(){
                var rect = {
                    'top' : isSet(window.screenY) ? window.screenY : window.screenTop,
                    'left' : isSet(window.screenX) ? window.screenX : window.screenLeft,
                    'width' : window.screen.availWidth,
                    'height' : window.screen.availHeight
                };
                rect.bottom = rect.top + rect.height;
                rect.right = rect.left + rect.width;
                return rect;
            },
            'scroll_left' : function(){
                return document.body.scrollLeft;
            },
            'scroll_top' : function(){
                return document.body.scrollTop;
            },
            'version_query' : function(){
                var self = this,
                    v;
                if(self.mode == self.LOADING || self.protocol == self.FILE || isEmpty(v = self.version)){
                    return '';
                }
                return '?v=' + v;
            },
            'viewport' : function(){
                var rect = {
                    'top' : window.pageYOffset ? window.pageYOffset : document.body.scrollTop,
                    'left' : window.pageXOffset ? window.pageXOffset : document.body.scrollLeft,
                    'bottom' : 0,
                    'right' : 0,
                    'width' : window.innerWidth ? window.innerWidth : document.body.clientWidth,
                    'height' : window.innerHeight ? window.innerHeight : document.body.clientHeight
                };
                rect.bottom = rect.top + rect.height;
                rect.right = rect.left + rect.width;
                return rect;
            }
        },
        set_props = {
            'root' : function(val){
                var self = this;
                self._root = isEmpty(val) && self.protocol == self.FILE ? '' : (val + '/');
            },
            'scroll_left' : function(val){
                document.body.scrollLeft = val;
            },
            'scroll_top' : function(val){
                document.body.scrollTop = val;
            },
            'theme' : function(val){
                var self = this,
                    old_path = self._compiled_theme_path,
                    path = self._getThemePath(val),
                    ln, elms;
                    // check for change
                    if(!path || path.indexOf(old_path) > -1){
                        return;
                    }
                    elms = document.getElementsByTagName('link');
                    self._compiled_theme_path = path;
                    for(ln = elms.length; ln--;){
                        if(elms[ln].getAttribute('href').indexOf(old_path) > -1){
                            elms[ln].setAttribute('href', path);
                            return;
                        }
                    }
                    self._settings.theme = val;
                    self._theme_elm = self.loadCss(path, true);
            },
            'viewport' : function(val){
            }
        },
        key;

    function makeProperty(key, is_setting){
        var get_func = is_setting ? function(){ return this._settings[key]; } : function(){ return this['_' + key]; },
            set_func = is_setting ? function(val){ return this._settings[key] = val; } : function(val){ return this['_' + key] = val; };
        Object.defineProperty(
            obj, key,
            {
                'get' : get_props[key] || get_func,
                'set' : set_props[key] || (is_setting ? set_func : function(){ throw 'Property "' + key + '" cannot be set.' }),
                'enumerable' : true,
                'configurable' : false
            }
        );
    }
    // add settings properties
    for(key in obj._settings){
        makeProperty(key, true);
    }
    // add other properties
    for(key in get_props){
        makeProperty(key);
    }
    return obj
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
            path.push('');  // fix for no prefix slash on src
        }
        path = path.join('/') + src;
        OJ._protocol = window.location.protocol.substring(-1);
    }
    path = path.split('/');
    path.pop(); // remove the file name
    path.pop(); // move up a directory
    // detect the root
    OJ.root = path.join('/');
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
            var index = str ? str.indexOf(this.v) : -1;
            if(index == -1){
                return;
            }
            return str.substring(index + this.v.length + 1).split(' ')[0];
        }
    };
    OJ._browser = detector.search(
        [
            {
              // for older Netscapes (4-)
              's' : navigator.userAgent,
              'sub' : 'Mozilla',
              'id' : 'Netscape',
              'v' : 'Mozilla'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'OmniWeb',
              'v' : 'OmniWeb/',
              'id' : 'OmniWeb'
            },
            {
              'p' : window.opera,
              'id' : 'Opera',
              'v' : 'Version'
            },
            {
              's' : navigator.vendor,
              'sub' : 'iCab',
              'id' : 'iCab'
            },
            {
              's' : navigator.vendor,
              'sub' : 'KDE',
              'id' : 'Konqueror'
            },
            {
              's' : navigator.vendor,
              'sub' : 'Camino',
              'id' : 'Camino'
            },
            {
              // for newer Netscapes (6+)
              's' : navigator.userAgent,
              'sub' : 'Netscape',
              'id' : 'Netscape'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'Gecko',
              'id' : 'Mozilla',
              'v' : 'rv'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'MSIE',
              'id' : 'Internet Explorer',
              'v' : 'MSIE'
            },
            {
              's' : navigator.vendor,
              'sub' : 'Apple',
              'id' : 'Safari',
              'v' : 'Version'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'Firefox',
              'id' : 'Firefox'
            },
            {
              's' : navigator.userAgent,
              'sub' : 'Chrome',
              'id' : 'Chrome'
            }
        ]
    ) || null;
    OJ._browser_version = detector.version(navigator.userAgent) || detector.version(navigator.appVersion) ||
        detector.version(navigator.user_agent);
    // detect OS
    var user_agent = navigator.userAgent.toLowerCase();
    if(user_agent.indexOf('android') > -1){
        OJ._os = OJ.ANDROID;
        OJ._is_tablet = !(OJ._is_mobile = (user_agent.indexOf('mobile') > -1));
        OJ._is_touch_capable = true;
    }
    else if(/(iphone|ipod|ipad)/i.test(user_agent)){
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        OJ._os = OJ.IOS;
        OJ._is_tablet = !(OJ._is_mobile = (user_agent.indexOf('ipad') == -1));
        OJ._is_webview = /(iphone|ipod|ipad).*applewebkit(?!.*safari)/i.test(user_agent);
        OJ._os_version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)].join('.');
        // check for in app
        if(!OJ._browser_version){
            OJ._browser_version = OJ.IN_APP;
        }
    }
    else{
        OJ._os = detector.search(
            [
                {
                 's' : navigator.platform,
                 'sub' : 'Win',
                 'id' : 'Windows'
                },
                {
                 's' : navigator.platform,
                 'sub' : 'Mac',
                 'id' : 'OS X'
                },
                {
                 's' : navigator.platform,
                 'sub' : 'Linux',
                 'id' : 'Linux'
                }
            ]
        ) || null;
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
                OJ.addCss('is-landscape');
                OJ.removeCss('is-portrait');
            }
            else{
                OJ._is_landscape = false;
                OJ.addCss('is-portrait');
                OJ.removeCss('is-landscape');
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




/*
 * Framework Load
 */
printGroup('Picking the oranges.', true);



// on dom ready event handler
function onDomReady(){
    var key,
        target = OJ.byId(OJ.target);  // process the target and it's attributes for any additional settings
    if(target){
        // process the target attributes
        // as settings
        var attrs = target.attributes, attr,
            special = ['mode', 'version'],
            ln = special.length;
        // process order sensitive settings first
        for(; ln--;){
            if((attr = special[ln]) && attrs[attr]){
                OJ[attr] = attrs[attr].value;
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
            OJ[OJ.attributeToProp(attr)] = attrs[ln].value;
            target.removeAttribute(attr);
        }
        OJ._target = target;
    }
    // make sure the theme got loaded
    if(!OJ._theme_elm){
        OJ.theme = OJ.theme;
    }
    // process the mode
    // if no mode has been specified then push us into production mode by default
    if(OJ.mode == OJ.LOADING){
        OJ.mode = OJ.PROD;
    }
    // updated the loaded assets with the appropriate query string
    for(key in OJ._loaded){
        OJ._loaded[key + OJ.version_query] = true;
    }
    // import the required classes
                            
    // import the required css
    
    // create the OJ component
    var tmp = new OjView();
    tmp.alpha = 0;
    // add the rendering div
    tmp.appendChild(tmp.renderer = new OjStyleElement('<div class="renderer"></div>'));
    // handle events added before we could do anything with them
    var evt,
        i = 0,
        ln = OJ._events.length;
    for(; i < ln; i++){
        evt = OJ._events[i];
        tmp.addEventListener.apply(tmp, evt);
    }
    delete OJ._events;
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
    var os = OJ.os,
        scale = OJ.pixel_ratio;
    if(os == OJ.IOS){
        tmp.dom.onclick = function(){};
    }
    // setup the css classes for special displays
    OJ._onOjResize(null);
    OJ._onOjScroll(null);
    if(OJ.is_mobile){
        OJ.addCss('is-mobile');
        if(os == OJ.IOS){
            OJ.addCss('is-ios');
        }
        else if(os == OJ.ANDROID){
            OJ.addCss('is-android');
        }
    }
    if(OJ.is_tablet){
        OJ.addCss('is-tablet');
    }
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
        var browser = OJ.browser,
            version = OJ.browser_version;
        OJ._is_supported =
            !OJ.is_computer || version == OJ.IN_APP ||
            (browser == OJ.IE && version.compareVersion('9.0') >= 0) ||
            (browser == OJ.FIREFOX && version.compareVersion('2.0') >= 0) ||
            (browser == OJ.CHROME && version.compareVersion('4.0') >= 0) ||
            (browser == OJ.SAFARI && version.compareVersion('5.0') >= 0) ||
            (browser == OJ.OPERA && version.compareVersion('10.5') >= 0);
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
    // this is so we know all the css has been applied
    if(isEmpty(OjStyleElement.getStyle(document.body, 'minWidth'))){
        return;
    }
    clearInterval(OJ._interval);
    // close up the loading group logs
    printGroup();
    // run this init function if any
    printGroup('Juicing the oranges.', true);
    // place OJ component in the DOM
    if(OJ._target){
        OJ._setDomSource(OJ._target, OJ);
        OJ._target = null;
    }
    else{
        document.body.appendChild(OJ.dom);
    }
    var init = OJ.init;
    if(init){
        init();
    }
    printGroup();
    // dispatch the ready event
    printGroup('Your OJ is ready. Enjoy!', true);
    OJ._is_ready = true;
    OJ.fadeIn();
    OJ.dispatchEvent(new OjEvent(OjEvent.READY));
    // detect if the browser is not supported
    if(!OJ.is_supported){
        var alrt = WindowManager.makeAlert(OJsupport_message, 'Unsupported Browser');
        alrt.hideButtons();
        alrt.paneWidth = 425;
        WindowManager.show(alrt);
        return;
    }
    printGroup();
}
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
var proto = Function.prototype;
if(!proto.bind){
    proto.bind = function(oThis){
        if(!isFunction(this)){
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var aArgs = Array.array(arguments).slice(1),
            fToBind = this,
            fNOP = function(){
            },
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
var proto = Number.prototype;
proto.oldToString = proto.toString();
if(!proto.toFormattedString){
    proto.toFormattedString = function(num_digits, num_decimals){
        var str = '',
            parts = this.valueOf().split('.');
        if(num_digits){
            for(; parts[0].length < num_digits;){
                parts[0] = '0' + parts[0];
            }
            str = parts[0];
        }
        if(num_decimals){
            str += '.';
            for(; parts[1].length < num_decimals;){
                parts[1] += '0';
            }
            str += parts[1];
        }
        return str;
    };
}
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
        'bulkSet' : function(props){
            var key;
            for(key in props){
                this[key] = props[key]
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


OJ.extendClass(
	'OjActionable', [OjObject],
	{
		// Internal Vars
		'_prevent_dispatch' : false,

        // Internal Methods
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
			var func = action == 'add' ? 'addEventListener' : 'removeEventListener',
				settings = this._listeners(type),
				ln = settings ? settings.length : 0,
				obj;
			if(ln){
				if((obj = settings[0]) && obj[func]){
                    type = type.ucFirst()
					if(ln > 1){
						obj[func](settings[1], this, '_on' + type + 'Success');
					}
					if(ln > 2){
						obj[func](settings[2], this, '_on' + type + 'Fail');
					}
				}
			}
		},

        // Public Methods
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
			if(this._prevent_dispatch || evt.isCanceled){
				return;
			}
            if(this._actionable){
                EventManager.dispatchEvent(this._actionable, evt);
            }
		}
	},
  {
    'ADD' : 'add',
    'REMOVE' : 'remove'
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
String.string = function(val){
    if(isSet(val)){
        return isObject(val) ? val.toString() : String(val);
    }
    return '';
};

var proto = String.prototype;
if(!proto.chunk){
    proto.chunk = function(size, callback){
        var num = Math.ceil(this.length / size), // | 0,
            chunks = new Array(num),
            i = 0,
            o = 0;
        for(; i < num; ++i, o += size) {
            chunks[i] = this.substr(o, size);
            if(callback){
                callback(chunks[i])
            }
        }
        return chunks;
    };
}
if(!proto.lcFirst){
    proto.lcFirst = function(){
        return this.charAt(0).toLowerCase() + this.slice(1);
    };
}

if(!proto.ucFirst){
    proto.ucFirst = function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
}

if(!proto.capitalize){
    proto.capitalize = function(){
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
}
if(!proto.compareVersion){
    proto.compareVersion = function(v){
        var i = 0,
            res = 0,
            p1 = this.split('.'),
            p2 = v.split('.'),
            ln = Math.max(p1.length, p2.length);
        for(; i < ln; i++){
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
}
if(!proto.count){
    proto.count = function(needle){
        return (this.match(new RegExp(needle.regexEscape(), 'g')) || []).length;
    };
}
if(!proto.decodeUri){
    proto.decodeUri = function(){
        return decodeURIComponent(this);
    };
}
if(!proto.encodeUri){
    proto.encodeUri = function(){
        return encodeURIComponent(this);
    };
}
if(!proto.html){
    proto.html = function(){
        return this.replaceAll(['\n', '\t'], ['<br />', '&nbsp;&nbsp;&nbsp;&nbsp;']);
    };
}
if(!proto.isEmpty){
    proto.isEmpty = function(){
        return this.trim() != '';
    };
}
if(!proto.trim){
    proto.trim = function(){
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
}
if(!proto.ltrim){
    proto.ltrim = function(){
        return this.replace(/^\s+/, '');
    };
}
if(!proto.rtrim){
    proto.rtrim = function(){
        return this.replace(/\s+$/, '');
    };
}
if(!proto.fulltrim){
    proto.fulltrim = function(){
        return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    };
}
if(!proto.clean){
    proto.clean = function(obj){
        return obj.replace(/\r/g, '');
    };
}
if(!proto.regexSpecialChars){
    proto.regexSpecialChars = new RegExp('[.*+?|()\\[\\]{}\\\\]', 'g'); // .*+?|()[]{}\
}
if(!proto.regexEscape){
    proto.regexEscape = function(){
        return this.replace(String.prototype.regexSpecialChars, '\\$&');
    };
}
if(!proto.replaceAll){
    proto.replaceAll = function(needle, replace){
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
}

OJ.extendClass(
    'OjArray', [OjActionable],
    {
        '_props_' : {
            'allowDuplicate' : true,
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
            if(!this.allowDuplicates && this.contains(item)){
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
                items = self._items;
            // check for change
            if(items[index] == item){
                return
            }
            this._checkDuplicate(item)
			items[index] = item;
			self.dispatchEvent(new col_evt(col_evt.ITEM_REPLACE, [item], index));
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
            obj.allowDuplicates = self.allowDuplicates;
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
                self.dispatchEvent(new col_evt(col_evt.ITEM_CHANGE, evt.items, evt.index, evt.oldItems));
            }
        },
        'equalize' : function(){
            return this._callArrayFunc('equalize', arguments);
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
                col_evt = OjCollectionEvent;
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
            args.forEachReverse(function(item, i){
                if(isUnset(index) || i < index){
                    index = i;
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
            return this._callArrayFunc('replace', arguments);
        },
        'replaceAll' : function(){
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
        return obj;
    }
    else if((isObject(obj) || isFunction(obj)) && !isUndefined(obj.length)){
        return [].slice.call(obj, 0);
    }
    return [obj];
};
if(!Array.isArray){
    Array.isArray = function(obj){
        return Object.prototype.toString.call(obj) === "[object Array]" || (window['OjArray'] && isObjective(obj, OjArray));
    };
}
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
        var needle, i,
            a = arguments,
            ln = a.length,
            removed = [];
        for(; ln-- && this.length;){
            needle = a[ln];
            for(; (i = this.indexOf(needle)) > -1;){
                removed.append(this.splice(i, 1));
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

OJ.extendClass(
    'OjEvent', [OjObject],
    {
        '_get_props_' : {
            'bubbles' : null,
            'cancelable' : null,
            'currentTarget' : null,
            'isCanceled' : false,
            'phase' : 0,
            'target' : null,
            'type' : null
        },

        '_constructor' : function(type/*, bubbles = false, cancelable = false*/){
            this._super(OjObject, '_constructor', []);
            this._processArguments(arguments, {
                '_type' : type,
                '_bubbles' : false,
                '_cancelable' : false
            });
        },
        'cancel' : function(){
            if(this._cancelable){
                this._isCanceled = true;
            }
        },
        'clone' : function(){
            var evt = this._super(OjObject, 'clone', arguments);
            evt._bubbles = this.bubbles;
            evt._cancelable = this.cancelable;
            evt._type = this.type;
            return evt;
        },
        'cloneWithChanges' : function(delta){
            var clone = this.clone(), key;
            for(key in delta){
                if(key != 'currentTarget' || key != 'phase' || key != 'target'){
                    clone['_' + key] = delta[key];
                }
            }
            return clone;
        }
    },
    {
        'ADDED' : 'onAdded',
        'OPEN' : 'onOpen',
        'CANCEL' : 'onCancel',
        'CHANGE' : 'onChange',
        'CLOSE' : 'onClose',
        'COMPLETE' : 'onComplete',
        'DESTROY' : 'onDestroy',
        'FAIL' : 'onFail',
        'HIDE' : 'onHide',
        'INIT' : 'onInit',
        'LOAD' : 'onLoad',
        'OK' : 'onOk',
        'READY' : 'onReady',
        'REMOVED' : 'onRemoved',
        'SHOW' : 'onShow',
        'SUBMIT' : 'onSubmit',
        'UNLOAD' : 'onUnload',
        'ADDED_TO_DISPLAY' : 'onAddToDisplay',
        'REMOVED_FROM_DISPLAY' : 'onRemovedFromDisplay'
    }
);

OJ.extendManager(
    'EventManager', 'OjEventManager', [OjObject],
    {
        '_events' : {},
        '_index' : {},

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
            if(evt.isCanceled){
                return;
            }
            if(target == window){
                target = OJ;
            }
            var events = this._events,
                target_id = target.oj_id,
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
                target_id = target.oj_id,
                context_id = context == window ? 'window' : context.oj_id,
                guid = context_id + ':' + (callback.guid ? callback.guid : callback.guid = OJ.guid());
            // make sure we have a holder for this type of event
            if(!events[type]){
                events[type] = {};
            }
            // make sure we have a holder for this target on this type of event
            if(!events[type][target_id]){
                events[type][target.oj_id] = {};
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
            var type = evt.type,
                parent;
            evt._target = evt._target ? evt._target : target;
            evt._currentTarget = target;
            this._dispatchEvents(evt, type, target);
            if(evt._bubbles){
                parent = target;
                while(parent && (parent = parent.parent)){
                    this._dispatchEvents(evt, type, parent);
                }
                if(parent && parent != OJ){
                    this._dispatchEvents(evt, type, OJ);
                }
            }
        },
        'hasEventListener' : function(target, type){
            var events = this._events[type];
            return events && events[target.oj_id];
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
            var target_id = target.oj_id,
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
                target_id = target.oj_id,
                context_id = context.oj_id,
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
				args.removeAt(2);
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
			'protocol'    : null,
            'hashParams'  : null,
			'host'        : null,
			'port'        : null,
			'path'        : null,
			'query'       : null,
            'queryParams' : null,
			'hash'        : null,
            'source'      : null
		},

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
		'_refresh' : function(force){
			if(force === false){
				this._dirty.query = true;
				this._dirty.hash = true;
			}
			this.query;
			this.hash;
		},

		'_constructor' : function(url){
            this._super(OjObject, '_constructor', []);
            this._dirty = {};
            this._cache = {};
			this.source = url ? url : '';
		},

		'clone' : function() {
			return new OjUrl(this.toString());
		},
		'toString' : function() {
			this._refresh();
			return this._cache.protocol + this._cache.host + this._cache.port + this._cache.path +
                   this._cache.query + this._cache.hash;
		},

		'=protocol' : function(protocol){
			this._setter('protocol', '', protocol.replaceAll([':', '/'], ''), '://', 'http');
		},
		'=host' : function(host){
			this._setter('host', '', host, '');
		},
		'=port' : function(port){
			this._setter('port', ':', port, '');
		},
		'=path' : function(path){
			if(path && path.charAt(0) != '/'){
				path = '/' + path;
			}
			this._setter('path', '', path, '', '/');
		},
		'.query' : function(){
			if(this._dirty.query){
				this._query = Object.toQueryString(this._queryParams);
				delete this._dirty.query;
				delete this._dirty.queryParams;
			}
			return this._query;
		},
		'=query' : function(query){
			if(isString(query) && query.charAt(0) == '?'){
				query = query.substr(1);
			}
			this._setter('query', '?', query, '');
			this._dirty.queryParams = true;
			this.queryParams;
		},
		'.queryParams' : function(){
			if(this._dirty.queryParams){
				this._queryParams = this._query ? this._query.parseQueryString() : {};
				delete this._dirty.queryParams;
			}
			return this._queryParams;
		},
		'=queryParams' : function(params){
			this._queryParams = params;
			this._dirty.query = true;
		},
		'getQueryParam' : function(key){
			this.queryParams;
			return this._queryParams[key];
		},
		'setQueryParam' : function(key, value){
			this.queryParams;
			if(isSet(value)){
				this._queryParams[key] = value;
			}
			else{
				delete this._queryParams[key];
			}
			this._dirty.query = true;
		},
		'.hash' : function(){
			if(this._dirty.hash){
				this._hash = Object.toQueryString(this.hashParams);
				delete this._dirty.hash;
			}
			return this._hash;
		},
		'=hash' : function(hash){
			if(hash && hash.charAt(0) == '#'){
				hash = hash.substr(1);
			}
			this._setter('hash', '#', hash, '');
			delete this._dirty.hash;
			this._dirty.hashParams = true;
			this.hashParams;
		},
		'.hashParams' : function(){
			if(this._dirty.hashParams){
				this._hashParams = {};
				if(this._hash){
					this._hashParams = this._hash.parseQueryString();
				}
				delete this._dirty.hashParams;
			}
			return this._hashParams;
		},
		'=hashParams' : function(params){
			this._hashParams = params;
			this._dirty.hash = true;
			delete this._dirty.hash_params;
		},
		'getHashParam' : function(key){
			this.hashParams;
			return this._hashParams[key];
		},
		'setHashParam' : function(key, value){
			this.hashParams;
			if(isSet(value)){
				this._hashParams[key] = value;
			}
			else{
				delete this._hashParams[key];
			}
			this._dirty.hash = true;
		},
		'.source' : function(){
			return this.toString();
		},
		'=source' : function(val){
			if(isObjective(val)){
				val = val.toString();
			}
			this._queryParams = {};
			this._hashParams = {};
			this._cache = {};
			this._dirty = {};
			// create an anchor and let the dom do the url parsing
			var a = document.createElement('a');
			a.href = val;
			// get the parsed url info from the a element
			this.protocol = a.protocol;
			this.host = a.hostname;
			this.port = a.port;
			this.path = a.pathname;
			this.query = a.search;
			this.hash = a.hash;
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
            'contentType' : null,
			'data'        : null,
			'headers'     : null,
			'method'      : 'get'
		},
		'_ignores_cache' : false,  '_is_multipart' : false,

		'_constructor' : function(){
			this._super(OjUrl, '_constructor', []);
			this._headers = {};
            this._processArguments(arguments, {
                'source': undefined,
                'data' : undefined,
                'contentType' : undefined,
                'method' : undefined
            });
		},

        '_search_for_files' : function(obj){
            var i;
            if(isObject(obj)){
                // add check for file object
                if(obj instanceof File){
                    this._is_multipart = true;
                }
                else{
                    for(i in obj){
                        if(this._search_for_files(obj[i])){
                            break;
                        }
                    }
                }
            }
            else if(isArray(obj)){
                for(i = obj.length; i--;){
                    if(this._search_for_files(obj[i])){
                        break;
                    }
                }
            }
            return this._is_multipart;
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
			return this._is_multipart || this.contentType.indexOf(OjUrlRequest.MULTIPART) > -1;
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
			return this._headers[key];
		},
		'setHeader' : function(key, value){
            if(key.toLowerCase() == 'content-type'){
                this.contentType = value;
            }
			else{
                this._headers[key] = value;
            }
		},
		'unsetHeader' : function(key){
			if(this._headers){
				delete this._headers[key];
			}
		},

		'.contentType' : function(){
			return this._headers['Content-Type'] ? this._headers['Content-Type'] : OjUrlRequest.TEXT;
		},
		'=contentType' : function(val){
            if(this._is_multipart || val == OjUrlRequest.MULTIPART){
                val = OjUrlRequest.MULTIPART;
                // reset the method if we are multipart, because only post and put are now valid
                this.setMethod(this.method);
            }
            this._headers['Content-Type'] = val;
		},
        '.headers' : function(){
            return Object.clone(this._headers);
        },
        '=headers' : function(val){
            this._headers = {};
            if(val){
                var key;
                for(key in val){
                    this.setHeader(key, val[key]);
                }
            }
        },
		'=data' : function(val){
			this._data = val;
			if(!this._headers['Content-Type']){
				this.contentType = OjUrlRequest.QUERY_STRING;
			}
            this._is_multipart = false;
            // search for files
            if(val && this._search_for_files(val)){
                // reset the content type, because only multipart content type is valid now
                // this will in turn update the method
                this.contentType = this.contentType;
            }
		},
        '=Method' : function(val){
            if(
                this.isMultiPart() && !(val == OjUrlRequest.POST || val == OjUrlRequest.PUT)
            ){
                val = OjUrlRequest.POST;
            }
            this._method = val;
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
			this.xml = xml;
		},

		'attr' : function(attr /*, val*/){
			var args = arguments;
			if(args.length > 1){
				this.xml.setAttribute(attr, args[1]);
				return val;
			}
			return this.xml.getAttribute(attr);
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
					results.append(new OjXml(result));
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

		'=xml' : function(xml){
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

		'_constructor' : function(/*data, expiration*/){
			this._super(OjObject, '_constructor', []);
			this.created = new Date();
			var args = arguments,
				ln = args.length;
			if(ln){
				this.data = args[0];
				if(ln > 1){
					this.expiration = args[1];
				}
			}
		},
		'exportData' : function(){
			var obj = this._super(OjObject, 'exportData', arguments);
			obj.created    = this.created;
			obj.data       = this.data ? OjObject.exportData(this.data) : null;
			obj.expiration = this.expiration;
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
			this.created = obj.created;
			this.data = OjObject.importData(obj.data);
			this.expiration = obj.expiration;
		},

		'=expiration' : function(exp/*date|milliseconds from now*/){
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
				isObjective(data) && data.is(OjCacheObject) &&
				(exp = data.expiration) && exp < new Date()
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
			CacheManager.setData(url, data, policy ? policy.lifespan : null);
		},
		'setCacheUrlRequestPolicy' : function(policy){
			this._policies[policy.url.replace(/\*/g, '[^ ]*')] = policy;
		},
		'unsetCacheUrlRequestPolicy' : function(policy/*|url*/){
			var url;
			if(isObjective(policy) && policy.is('OjCachePolicy')){
				url = policy.url.toString();
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
			return data ? data.data : this._processDefault(arguments);
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
			return data ? data.data : this._processDefault(arguments);
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
            'callback'    : null,
			'contentType' : OjUrlRequest.QUERY_STRING,
			'request'     : null,
			'timeout'     : 30000
		},
		'_is_xdomain' : false,  '_policy' : null,  '_url' : null,  '_xhr' : null,

		'_constructor' : function(/*request, async,*/){
			this._super(OjActionable, '_constructor', []);
            this._processArguments(arguments, {
                'request': undefined,
                'async': undefined
            });
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

        '_calc_form_namespace' : function(ns, key){
            return isEmpty(ns) ? key : ns + '[' + key + ']';
        },
		'_load' : function(){
            var data,
				method = this._request.method;
			this._url = this._request.clone();
            if(method == OjUrlRequest.GET && (data = this._request.data)){
				var key;
				for(key in data){
					this._url.setQueryParam(key, data[key]);
				}
			}
			this._request.source = this._url;
			// check to see if we have this cached
			if(!this._request.ignoresCache()){
				var url = this._url.toString();
				this._policy = CacheManager.getCacheUrlRequestPolicy(url);
				if(
					this._policy && this._policy.action == OjCachePolicy.ALWAYS &&
					(this._data = CacheManager.getCacheUrlRequestData(url, this._policy))
				){
					this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
					return;
				}
			}
			// if not cached or ignored send the request as usual
			if(this._static.USE_ACTIVEX && this._request.host != HistoryManager.get().host){
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

        '_process_data' : function(data){
            return data;
        },
        '_process_form_data' : function(form, data, ns){
            if(isArray(data) || data instanceof FileList){
                for(var ln = data.length; ln--;){
                    this._process_form_data(form, data[ln], this._calc_form_namespace(ns, ln));
                }
            }
            else if(!(data instanceof File) && isObject(data)){
                var key;
                for(key in data){
                    this._process_form_data(form, data[key], this._calc_form_namespace(ns, key));
                }
            }
            else{
                form.append(ns, data);
            }
            return form;
        },
        '_process_json_data' : function(data){
            return toJson(data);
        },
		'_process_multipart_data' : function(data){
            if(data instanceof FormData){
                return data;
            }
            return this._process_form_data(new FormData(), data);
		},
        '_process_query_data' : function(data){
            return toQueryString(data);
        },
        '_process_xml_data' : function(data){
            return toXml(data);
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
			var key, headers = this._request.headers;
			if(headers && !this._is_xdomain){
				for(key in headers){
					// ignore content-type setting when safe since no data is sent
					if(key.toLowerCase() == 'content-type' && (this._request.isSafe() || this._request.isMultiPart())){
                        continue;
					}
					this._xhr.setRequestHeader(key, headers[key]);
				}
			}
			// set the caching
			if(this._policy && !this._is_xdomain){
				if(this._policy.action == OjCachePolicy.ALWAYS){
					var lifespan = this._policy.lifespan;
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
			this._xhr.open(this._request.method, this._url, this._async);
			if(this._async && !this._is_xdomain){
				this._xhr.timeout = this._timeout;
			}
			else{
				//todo: look into adding sync timeout capability if at all possible
			}
		},
		'_xhrSend' : function(){
			var data;
			if(this._request.method != OjUrlRequest.GET){
				if(data = this._request.data){
					var type = this._request.contentType;
					if(type == OjUrlRequest.JSON){
						data = this._process_json_data(data);
					}
					else if(type == OjUrlRequest.XML){
						data = this._process_xml_data(data);
					}
					else if(type == OjUrlRequest.QUERY_STRING){
						data = this._process_query_data(data);
					}
                    else if(type == OjUrlRequest.MULTIPART){
                        data = this._process_multipart_data(data);
                    }
                    else{
                        data = this._process_data(data);
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
            var error = new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR, this._xhr.statusText, status);
			this.dispatchEvent(error);
			this.dispatchEvent(new OjEvent(OjEvent.FAIL));
            if(this._callback){
                this._callback(null, error);
            }
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
				this._contentType = OjUrlRequest.TEXT;
			}
			if(this._contentType.indexOf('/xml') != -1){
				this._contentType = OjUrlRequest.XML;
				this.data = this._xhr.responseXML;
			}
			else{
				if(this._contentType.indexOf('/json') != -1){
					this._contentType = OjUrlRequest.JSON;
				}
				else if(this._contentType == OjUrlRequest.QUERY_STRING){
					this._contentType = OjUrlRequest.QUERY_STRING;
				}
				else{
					this._contentType = OjUrlRequest.TEXT;
				}
				this.data = this._xhr.responseText;
			}
			this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
            if(this._callback){
                this._callback(this.data, null);
            }
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
				this._contentType = this.getResponseHeader('Content-Type');
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
            if(this._xhr){
                this._xhr.abort();
                this._xhr = null;
            }
		},
		'load' : function(callback){
			if(callback){
				this.callback = callback;
			}
            this._load();
			return this._data;
		},

		'=data' : function(data){
			this._data = null;
			if(data){
				if(this._contentType.indexOf('/json') > -1){
					this._data = data.parseJson();
				}
				else if(this._contentType.indexOf('/xml') > -1){
					this._data = OjXml.xml(data);
				}
				else if(this._contentType == OjUrlRequest.QUERY_STRING){
					this._data = data.parseQueryString();
				}
				else{
					this._data = data;
				}
			}
			if(this.policy && this.policy.action != OjCachePolicy.NEVER){
				CacheManager.setCacheUrlRequestData(this.request, this.data, this.policy);
			}
		},
        'getResponseHeader' : function(header){
            return this._xhr.getResponseHeader(header);
        }
	},
	{
		'USE_ACTIVEX' : (window.XDomainRequest || window.ActiveXObject)
	}
);

OJ.extendClass(
    'OjElmArray', [OjArray],
    {
        'push' : function(){
            throw "OjElmArray is immutable.";
        },
        'splice' : function(){
            throw "OjElmArray is immutable.";
        },
        'getItemAt' : function(index){
            return OjElement.element(this._items[index]);
        },
        'indexOf' : function(item){
            if(isObjective(item) && item.is('OjElement')){
                item = item.dom;
            }
            for(var key in this._items){
                if(this._items[key] == item){
                    return parseInt(key);
                }
            }
            return -1;
        },
        'move' : function(item, index){
            throw "OjElmArray is immutable.";
        },
        'removeAt' : function(index){
            throw "OjElmArray is immutable.";
        },
        'replaceAt' : function(index, newItem){
            throw "OjElmArray is immutable.";
        },
        'reverse' : function(){
            // TODO: add OjElmArray reverse method
        },
        'setItemAt' : function(item, index){
            throw "OjElmArray is immutable.";
        },
        'sort' : function(/*sort_func*/){
            // TODO: add OjElmArray sort method
        },

        '=items' : function(items){
            this._items = items ? items : [];
        }
    }
);



OJ.extendClass(
    'OjElement', [OjActionable],
    {
        // Internal Vars
        '_props_' : {
            'parent' : null
        },
        '_get_props' : {
            'dom' : null,
            'inDom' : false
        },
        '_draggable' : false, '_dragX' : 0, '_dragY' : 0, '_did_drag' : false,

        // Internal Methods
        '_constructor' : function(source, context){
            this._super(OjActionable, '_constructor', []);
            // set the dom
            // if no source present then create one
            this._setDom(source ? source : OjElement.elm('div'), context);
            OjElement.register(this);
        },
        '_destructor' : function(/*depth = 0*/){
            OjElement.unregister(this);
            // remove from parent
            this.parent = null;
            if(this._dom){
                delete this._dom.ojProxy;
                // release the vars
                this._dom = this._proxy = null;
            }
            // continue on with the destruction
            return this._super(OjActionable, '_destructor', arguments);
        },

        // Internal Properties
        '_setDom' : function(dom_elm){
            this._setProxy(this._dom = dom_elm);
            this._dom.id = this.id;
        },
        '_setProxy' : function(dom_elm){
            if(this._proxy){
                this._proxy.ojProxy = null;
            }
            (this._proxy = dom_elm).ojProxy = this.id;
        },
        '_getEventProxy' : function(){
            if(this._proxy == document.body){
                return window;
            }
            return this._proxy;
        },

        '_setIsDisplayed' : function(displayed){
            var self = this,
                dispatch = self.dispatchEvent,
                evt = OjEvent;
            if(self._is_displayed == displayed){
                return;
            }
            if(self._is_displayed = displayed){
                self.dispatchEvent(new evt(evt.ADDED_TO_DISPLAY));
            }
            else{
                self.dispatchEvent(new evt(evt.REMOVED_FROM_DISPLAY));
            }
        },

        // Public Methods
        'hasDomElement' : function(dom_elm){
            return OjElement.hasDomElement(this._dom, dom_elm);
        },
        'query' : function(query){
            return new OjElmArray(this._dom.querySelectorAll(query));
        },

        // Public Properties
        '.dom' : function(){
            return this._dom;
        },
        '.inDom' : function(){
            var dom = this._dom;
            return dom.ownerDocument && isObject(dom.ownerDocument) && dom.parentNode ? true : false;
        },
        '.parent' : function(){
            return this._dom ? OjElement.element(this._dom.parentNode) : null;
        },
        '=parent' : function(parent){
            if(parent){
                parent.appendChild(this);
            }
            else if(parent = this.parent){
                parent.removeChild(this);
            }
        },
        '.parentComponent' : function(){
            if(!this._parentComponent){
                this._parentComponent = OjElement.parentComponent(this._dom.parentNode);
            }
            return this._parentComponent;
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
        'byPoint' : function(x, y){
            var obj = document.elementFromPoint(x, y);
            return obj ? this.element(obj) : null;
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
        // todo: look into this it doesn't seem efficient
        'register' : function(elm){
            this._elms[elm.id] = elm;
        },
        'unregister' : function(elm){
            delete this._elms[elm.id];
//			print(Object.keys(this._elms).length);
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
            this._processArguments(arguments, {
                'left' : 0,
                'top' : 0,
                'width' : 0,
                'height' : 0
            });
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

		'=top' : function(val){
			this._bottom = (this._top = val) + this._height;
		},
		'=left' : function(val){
			this._right = (this._left = val) + this._width;
		},
		'=width' : function(val){
			this._right = (this._width = val) + this._left;
		},
		'=height' : function(val){
			this._bottom = (this._height = val) + this._top;
		}
	}
);

OJ.extendClass(
	'OjCssTranslate', [OjObject],
	{
		'_props_' : {
			'x'     : 0,
			'unitX' : OJ.dim_unit,
			'unitY' : OJ.dim_unit,
			'y'     : 0
		},

		'_constructor' : function(/*x, y, unitX, unitY*/){
			var args = arguments,
				ln = args.length;
			this._super(OjObject, '_constructor', []);
			if(ln){
				this.x = args[0];
				if(ln > 1){
					this.y = args[1];
					if(ln > 2){
						this.unitX = args[2];
						if(ln > 3){
							this.unitY = args[3];
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
		'PRESS'        : 'click',
		'DOUBLE_PRESS' : 'dblclick',
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
	'OjUiEvent', [OjDomEvent],
	{
		'_get_props_' : {
			'pageX' : NaN,
			'pageY' : NaN
		},

		'_constructor' : function(type/*, pageX = NaN, pageY = NaN, bubbles, cancelable*/){
			var args = Array.array(arguments),
				ln = args.length;
			if(ln > 1){
				this._pageX = args.removeAt(1)[0];
				if(ln > 2){
					this._pageY = args.removeAt(1)[0];
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
			'click'        : 'onPress',
			'dblclick'     : 'onDoublePress',
			'mousedown'    : 'onDown',
			'mousemove'    : 'onMove',
			'mouseover'    : 'onOver',
			'mouseout'     : 'onOut',
			'mouseup'      : 'onUp',
			'mousewheel'   : 'onWheel'
		},
		'convertDomEvent' : function(evt){
			evt = OjDomEvent.normalizeDomEvent(evt);
			var type = this._evt_map[evt.type];
			if(type == OjUiEvent.PRESS){
				// todo: OjUiEvent - add middle and right click event detection
			}
			var new_evt = new OjUiEvent(type, evt.pageX, evt.pageY, evt.bubbles, evt.cancelable);
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
		'PRESS'        : 'onPress',
		'DOUBLE_PRESS' : 'onDoublePress',
		'DOWN'         : 'onDown',
		'MIDDLE_PRESS' : 'onMiddlePress',
		'MOVE'         : 'onMove',
		'OVER'         : 'onOver',
		'OUT'          : 'onOut',
		'RIGHT_PRESS'  : 'onRightPress',
		'RIGHT_UP'     : 'onRightUp',
		'RIGHT_DOWN'   : 'onRightDown',
		'UP'           : 'onUp',
    	'UP_OUTSIDE'   : 'onUpOutside',
		'WHEEL'        : 'onWheel'
	}
);


OJ.extendClass(
	'OjDragEvent', [OjUiEvent],
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
			this._super(OjUiEvent, '_constructor', args);
			this._deltaX = deltaX;
			this._deltaY = deltaY;
			this._pageX = mouseEvent._pageX;
			this._pageY = mouseEvent._pageY;
		},

		'clone' : function(){
			var clone = this._super(OjUiEvent, 'clone', arguments);
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
		'DRAG'  : 'onDrag',
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
				this._pageX = args.removeAt(1)[0];
				if(ln > 2){
					this._pageY = args.removeAt(1)[0];
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
            'alpha' : null,
            'backgroundColor' : null,
            'children' : null,
            'css' : null,
            'cssList' : null,
            'depth' : null,
            'hAlign' : 'l', // OjStyleElement.LEFT
            'height' : null,
            'id' : null,
            'innerHeight' : null,
            'innerWidth' : null,
            'name' : null,
            'origin' : null,
            'outerHeight' : null,
            'outerWidth' : null,
            'overflow' : null,
            'owner' : null,
            'pageRect' : null,
            'pageX' : null,
            'pageY' : null,
            'rect' : null,
            'rotation' : null,
            'scrollHeight' : null,
            'scrollWidth' : null,
            'scrollX' : null,
            'scrollY' : null,
            'text' : null,
            'translate' : null,
            'vAlign' : 't', // OjStyleElement.TOP
            'width' : null,
            'x' : null,
            'y' : null
        },
        '_get_props_' : {
            'dom' : null,
            'isVisible' : null,
            'numChildren' : null
        },
        '_alpha' : 1,
        '_depth' : 0,
        '_scrollable' : false,
        '_origin' : '0px, 0px',
        '_rotation' : 0,
        '_translate' : '0px, 0px',

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

        '_constructor' : function(source, context){
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
                            tag2 = tag.substr(0, 3),
                            tmp;
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
                        // tmp = OJ.query(source);
                    }
                }
            }
            this._super(OjElement, '_constructor', [source, context]);
            this.hAlign = this._hAlign;
            this.vAlign = this._vAlign;
        },
        '_destructor' : function(/*depth = 0*/){
            // remove the timers
            this._unset('_move_timer', '_scroll_timer');
            // remove the children
            var args = arguments,
                depth = args.length ? args[0] : 0,
                ln = this.numChildren;
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
                if(!isEmpty(val) && val != 'null'){
                    this.id = val;
                }
            }
            else if(nm == 'var'){
                if(!isEmpty(val) && context){
                    (context[val] = this).addCss(val);
                    this.owner = context;
                }
                return true;
            }
            else if(nm != 'class'){
                setter = OJ.attributeToProp(nm);
                if(setter in this){
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
                        this[setter] = val;
                    }
                    catch(e){
                        // setup holder for template reference values for deferred processing
                        if(!context._template_vars_){
                            context._template_vars_ = [];
                        }
                        context._template_vars_.unshift({
                                                            'context' : this,
                                                            'func' : this[setter],
                                                            'value' : val
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
                this.id = this._id_;
            }
        },
        '_setIsDisplayed' : function(displayed){
            var ln, child,
                self = this;
            if(self._is_displayed == displayed){
                return;
            }
            self._super(OjElement, '_setIsDisplayed', arguments);
            for(ln = self.numChildren; ln--;){
                if(child = self.getChildAt(ln)){
                    child._setIsDisplayed(displayed);
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
        '_onDomOjUiEvent' : function(evt){
            var proxy = OjElement.element(this);
            if(proxy && proxy._processEvent(evt)){
                evt = OjUiEvent.convertDomEvent(evt);
                proxy._onEvent(evt);
                if(evt.type == OjUiEvent.DOWN && proxy.hasEventListener(OjUiEvent.UP_OUTSIDE)){
                    OJ.addEventListener(OjUiEvent.UP, proxy, '_onOjMouseUp');
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
            var new_x = evt.pageX,
                new_y = evt.pageY;
            this.dispatchEvent(
                new OjDragEvent(
                    OjDragEvent.DRAG,
                    new_x - this._dragX,
                    new_y - this._dragY,
                    evt, false, false
                )
            );
            this._dragX = new_x;
            this._dragY = new_y;
        },
        '_onDragEnd' : function(evt){
            OJ.removeEventListener(OjUiEvent.MOVE, this, '_onDrag');
            OJ.removeEventListener(OjUiEvent.UP, this, '_onDragEnd');
            this.dispatchEvent(
                new OjDragEvent(
                    OjDragEvent.END,
                    evt.pageX - this._dragX,
                    evt.pageY - this._dragY,
                    evt, false, false
                )
            );
            this._dragX = this._dragY = null;
        },
        '_onDragStart' : function(evt){
            this._dragX = evt.pageX;
            this._dragY = evt.pageY;
            if(this.hasEventListener(OjDragEvent.DRAG)){
                OJ.addEventListener(OjUiEvent.MOVE, this, '_onDrag');
            }
            OJ.addEventListener(OjUiEvent.UP, this, '_onDragEnd');
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
////			if(type == OjUiEvent.UP && (!this._draggable || (this._dragX == x && this._dragY == y))){
////				print(this._draggable, this._dragX == x, this._dragY == y);
////				this._onEvent(new OjUiEvent(OjUiEvent.PRESS, evt.getBubbles(), evt.getCancelable(), x, y));
////			}
//
//			return response;
//		},
        '_onMoveTick' : function(evt){
            var page_x = this.pageX,
                page_y = this.pageY,
                delta_x = this._page_x - page_x,
                delta_y = this._page_y - page_y;
            if(delta_x || delta_y){
                this.dispatchEvent(new OjTransformEvent(OjTransformEvent.MOVE, page_x, page_y, delta_x, delta_y));
            }
            this._page_x = page_x;
            this._page_y = page_y;
        },
        '_onOjMouseUp' : function(evt){
            OJ.removeEventListener(OjUiEvent.UP, this, '_onOjMouseUp');
            if(this.hitTestPoint(evt.pageX, evt.pageY)){
                return;
            }
            this.dispatchEvent(evt);
        },
        '_onScroll' : function(evt){
            var x, y;
            // for native scroll events
            if(evt.is('OjScrollEvent')){
                if(this._prev_x == (x = evt.scrollX) && this._prev_y == (y = evt.scrollY)){
                    return;
                }
                this._prev_x = x;
                this._prev_y = y;
                return this._onEvent(evt);
            }
            // for touch scroll events
            if(this._prev_x == (x = this.scrollX) && this._prev_y == (y = this.scrollY)){
                return;
            }
            return this._onEvent(
                new OjScrollEvent(OjScrollEvent.SCROLL, this._prev_x = x, this._prev_y = y)
            );
        },
        '_onTouch' : function(evt){
            var type = evt.type,
                x = evt.pageX,
                y = evt.pageY;
            if(type == OjTouchEvent.END){
                type = OjUiEvent.UP;
            }
            else if(type == OjTouchEvent.START){
                type = OjUiEvent.DOWN;
                this._dragX = x;
                this._dragY = y;
            }
            else if(type == OjTouchEvent.MOVE){
                type = OjUiEvent.MOVE;
            }
            if(type){
                this._onEvent(new OjUiEvent(type, x, y, true, true));
                // if the touch hasn't moved then issue a click event
                if(type == OjUiEvent.UP && !this.hasEventListener(OjDragEvent.START) && this.hitTestPoint(x, y)){
                    this._onEvent(new OjUiEvent(OjUiEvent.PRESS, x, y, true, true));
                    this._dragX = this._dragY = null;
                }
            }
            return true;
        },

        // event listener overrides
        // customize this functionality for dom events so that they work
        '_updateTouchStartListeners' : function(){
            if(!this.hasEventListeners(OjUiEvent.DOWN, OjUiEvent.PRESS, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){
                this._getEventProxy().ontouchstart = null;
            }
        },
        '_updateTouchMoveListeners' : function(){
            if(!this.hasEventListeners(OjUiEvent.MOVE, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){//}, OjScrollEvent.SCROLL)){
                this._getEventProxy().ontouchmove = null;
            }
        },
        '_updateTouchEndListeners' : function(){
            if(!this.hasEventListeners(OjUiEvent.UP, OjUiEvent.UP_OUTSIDE, OjUiEvent.PRESS, OjDragEvent.END)){
                var proxy = this._getEventProxy();
                proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = null;
            }
        },
        'addEventListener' : function(type){
            var is_touch = OJ.is_touch_capable,
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
            else if(type == OjUiEvent.PRESS){
                if(is_touch){
                    proxy.ontouchstart = proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
                }
                else{
                    proxy.onclick = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.DOUBLE_PRESS){
                proxy.ondblclick = this._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.DOWN){
                if(is_touch){
                    proxy.ontouchstart = this._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.MOVE){
                if(is_touch){
                    proxy.ontouchmove = this._onDomTouchEvent;
                }
                else{
                    proxy.onmousemove = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.OUT){
                proxy.onmouseout = this._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.OVER){
                proxy.onmouseover = this._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.UP){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
                }
                else{
                    proxy.onmouseup = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.UP_OUTSIDE){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = this._onDomOjUiEvent;
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
//					proxy.onmousedown = this._onDomOjUiEvent;
//				}
                this.addEventListener(OjUiEvent.DOWN, this, '_onDragStart');
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
                    this._page_x = this.pageX;
                    this._page_y = this.pageY;
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
            else if(type == OjUiEvent.PRESS){
                if(!this.hasEventListener(OjUiEvent.PRESS)){
                    proxy.onclick = null;
                    this._updateTouchStartListeners();
                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.DOUBLE_PRESS){
                if(!this.hasEventListener(OjUiEvent.DOUBLE_PRESS)){
                    proxy.ondblclick = null;
                    this._updateTouchStartListeners();
                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.DOWN){
                if(!this.hasEventListeners(OjUiEvent.DOWN, OjUiEvent.UP_OUTSIDE, OjDragEvent.DRAG)){
                    proxy.onmousedown = null;
                    this._updateTouchStartListeners();
                }
            }
            else if(type == OjUiEvent.MOVE){
                if(!this.hasEventListener(OjUiEvent.MOVE)){
                    proxy.onmousemove = null;
                    this._updateTouchMoveListeners();
                }
            }
            else if(type == OjUiEvent.OUT){
                if(!this.hasEventListener(OjUiEvent.OUT)){
                    proxy.onmouseout = null;
                }
            }
            else if(type == OjUiEvent.OVER){
                if(!this.hasEventListener(OjUiEvent.OVER)){
                    proxy.onmouseover = null;
                }
            }
            else if(type == OjUiEvent.UP){
                if(!this.hasEventListener(OjUiEvent.UP)){
                    proxy.onmouseup = null;
                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.UP_OUTSIDE){
                if(!this.hasEventListener(OjUiEvent.DOWN)){
                    proxy.onmousedown = null;
                    OJ.removeEventListener(OjUiEvent.UP, proxy, '_onOjMouseUp');
                    this._updateTouchEndListeners();
                }
            }
            // drag events
            else if(OjDragEvent.isDragEvent(type)){
                if(!this.hasEventListeners(OjDragEvent.DRAG, OjDragEvent.END, OjDragEvent.START)){
                    this._draggable = false;
                    this.removeEventListener(OjUiEvent.DOWN, this, '_onDragStart');
                    OJ.removeEventListener(OjUiEvent.MOVE, this, '_onDrag');
                    OJ.removeEventListener(OjUiEvent.UP, this, '_onDragEnd');
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
        'appendChild' : function(child){
            return this.insertChildAt(child, this.numChildren);
        },
        'insertChildAt' : function(child, index){
            var dom = this.dom;
            if(!child){
                return child;
            }
            if(index >= this.numChildren){
                dom.appendChild(child.dom);
            }
            else{
                dom.insertBefore(child.dom, dom.childNodes[index]);
            }
            // update the display state
            child._setIsDisplayed(this._is_displayed);
            return child;
        },
        'forChild' : function(callback, complete, context){
            var self = this,
                ln = self.numChildren,
                i = 0;
            context = context || self;
            for(; i < ln; i++){
                callback.call(context, i, self.getChildAt(i));
            }
            if(complete){
                complete.call(context);
            }
        },
        'forChildReverse' : function(callback, complete, context){
            var self = this,
                ln = self.numChildren;
            context = context || self;
            for(; ln--;){
                callback.call(context, ln, self.getChildAt(ln));
            }
            if(complete){
                complete.call(context);
            }
        },
        'getChildAt' : function(index){
            return OjElement.element(this.dom.childNodes[index]);
        },
        'indexOfChild' : function(child){
            return Array.array(this.dom.childNodes).indexOf(child.dom);
        },
        'hasChild' : function(child){
            return child.parent == this;
        },
        'moveChild' : function(child, index){
            if(this.hasChild(child)){
                this.dom.insertBefore(child.dom, this.getChildAt(index).dom);
                return child;
            }
            // throw an error here
        },
        'prependChild' : function(child){
            return this.insertChildAt(child, 0);
        },
        'removeAllChildren' : function(){
            var ln = this.numChildren,
                ary = [];
            for(; ln--;){
                ary.unshift(this.removeChildAt(ln));
            }
            return ary;
        },
        'removeChild' : function(child){
            if(child){
                // this will help exclude text elements
                if(child.is(OjStyleElement)){
                    this.dom.removeChild(child.dom);
                }
                child._setIsDisplayed(false);
            }
            return child;
        },
        'removeChildAt' : function(index){
            if(index < 0 || index >= this.numChildren){
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
            if(index >= this.numChildren){
                this.appendChild(child);
            }
            else{
                rtrn = this.removeChildAt(index);
                this.insertChildAt(child, index);
            }
            return rtrn;
        },

        '.children' : function(){
            var ary = [],
                ln = this.numChildren;
            for(; ln--;){
                ary.unshift(this.getChildAt(ln));
            }
            return ary;
        },
        '=children' : function(children){
            this.removeAllChildren();
            var i = 0,
                ln = children.length;
            for(; i < ln; i++){
                this.appendChild(children[i]);
            }
        },
        '.numChildren' : function(){
            return this.dom.childNodes.length;
        },

        // misc functions
        'blur' : function(){
            if(isFunction(this._dom.blur)){
                this._dom.blur();
            }
        },
        'find' : function(query){
            if(isElement(query)){
                query = '#' + query.id;
            }
            return OJ.query(query, this._dom);
        },
        'focus' : function(){
            if(isFunction(this._dom.focus)){
                this._dom.focus();
            }
        },
        'hide' : function(should){
            if(should === false){
                this.show();
            }
            else{
                this.addCss(['hidden']);
                this.dispatchEvent(new OjEvent(OjEvent.HIDE));
            }
        },
        '.isVisible' : function(){
            var self = this;
            return self._getStyle('display') != OjStyleElement.NONE &&
                   self._getStyle('visibility') != 'hidden' &&
                   self.alpha > 0 && self.width > 0 && self.height > 0;
        },
        'show' : function(should){
            if(should === false){
                this.hide();
            }
            else{
                this.removeCss('hidden');
                this.dispatchEvent(new OjEvent(OjEvent.SHOW));
            }
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
            this._setStyle(
                prop,
                isSet(val) ? val + (args.length > 2 ? args[2] : this._getStyleUnit(prop)) : null
            );
        },
        // Bulk Style Getter & Setter Functions
        '_getStyler' : function(prop, args){
            var unit = prop == 'font' || prop == 'line' ? OJ.font_unit : OJ.dim_unit;
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
                return OJ.font_unit;
            }
            return OJ.dim_unit;
        },

        // Attribute Getter & Setter Functions
        'getAttr' : function(key){
            // process the key incase its an attribute object
            if(isObject(key)){
                key = key.nodeName;
            }
            // read the attribute value
            return this._proxy.getAttribute(key);
        },
        'setAttr' : function(key, value){
            // process the key incase its an attribute object
            if(isObject(key)){
                key = key.nodeName;
            }
            // if no value was set then default to empty string
            if(isUndefined(value)){
                value = '';
            }
            // if the value is set (not null) then update attribute value
            if(isSet(value)){
                this._proxy.setAttribute(key, value);
            }
            // otherwise remove
            else{
                this._proxy.removeAttribute(key);
            }
        },
        '.id' : function(){
            return this._id || this.oj_id;
        },
        '=id' : function(val){
            if(this._id == val){
                return
            }
            // unregister the old id
            OjElement.unregister(this);
            this._proxy.ojProxy = this.dom.id = this._id = val;
            // register the new id
            OjElement.register(this);
        },
        '=name' : function(val){
            if(this._name == val){
                return;
            }
            this.setAttr('name', this._name = val);
        },
        // Content Getter & Setter Functions
        '.text' : function(){
            return this.dom.innerHTML;
        },
        '=text' : function(str){
            this.removeAllChildren();
            this.dom.innerHTML = String.string(str).html();
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
            var css = this.cssList,
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
                            css.append(cls);
                    }
                }
                else{
                    switch(action){
                        case 'remove':
                        case 'toggle':
                            css.removeAt(index);
                    }
                }
            }
            if(action == 'has'){
                return true;
            }
            return this.css = css;
        },
        'addCss' : function(css/*...css | array*/){
            return this._processCssList(arguments, 'add');
        },
        '.css' : function(){
            return this._proxy.className.trim();
        },
        '.cssList' : function(){
            return this.css.split(' ');
        },
        'hasCss' : function(css/*...css | array*/){
            return this._processCssList(arguments, 'has');
        },
        'removeCss' : function(css/*... css | array*/){
            return this._processCssList(arguments, 'remove');
        },
        '=css' : function(css){
            return this._proxy.className = (isArray(css) ? css.join(' ') : css).trim();
        },
        'swapCss' : function(target, replacement){
            this.removeCss(target);
            this.addCss(replacement);
        },
        'toggleCss' : function(css/*...css | array*/){
            return this._processCssList(arguments, 'toggle');
        },
        // Focus Functions
        'hasFocus' : function(){
            return this._dom.hasFocus;
        },
        'hitTest' : function(elm, local){
            return this.hitTestRect(elm.rect);
        },
        'hitTestRect' : function(rect, local){
            return (local ? this.rect : this.pageRect).hitTestRect(rect);
        },
        'hitTestPoint' : function(x, y, local){
            return (local ? this.rect : this.pageRect).hitTestPoint(x, y);
        },
        'localPoint' : function(global_point){
            // todo: add localPoint functionality
        },
        'localX' : function(global_x){
            return global_x - this.pageX;
        },
        'localY' : function(global_y){
            return global_y - this.pageY;
        },

        // Dimensional Getter & Setter Functions
        // TODO:
        // 1) factor in border into sizing
        // 2) handle non-metric values such as auto and %
        '.innerWidth' : function(){
            return this.width - this.getPaddingLeft() - this.getPaddingRight();
        },
        '=innerWidth' : function(w){
            this._setWidth(Math.round(w) + OJ.dim_unit);
        },
        '.outerWidth' : function(){
            return this.width + this.getMarginLeft() + Math.abs(this.getMarginRight());
        },
        '=outerWidth' : function(w){
            this.innerWidth = w - this.getPaddingLeft() - this.getPaddingRight() - this.getMarginLeft() - Math.abs(this.getMarginRight());
        },
        '.width' : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;
            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;
                return (this._proxy.offsetWidth / parent.offsetWidth) * 100;
            }
            return this._proxy.offsetWidth || this._getStyleNumber('width');
        },
        '_setWidth' : function(val){
            this._setStyle('width', val);
        },
        '=width' : function(val){
            var args = isArray(val) ? val : [val],
                w = args[0];
            if(w == OjStyleElement.AUTO || !isSet(w)){
                this._setWidth(null);
            }
            else if(args.length > 1){
                this._setWidth(args.join(''));
            }
            else{
                this.innerWidth = w - this.getPaddingLeft() - this.getPaddingRight();
            }
        },
        //'.minWidth' : function(){
        //    return isNull(this._min_width) ? this._min_width = this._getStyleNumber('minWidth') : this._min_width;
        //},
        //'=minWidth' : function(min){
        //    this._setStyleNumber('minWidth', this._min_width = min);
        //},
        //
        //'.maxWidth' : function(){
        //    return isNull(this._max_width) ? this._max_width = this._getStyleNumber('maxWidth') : this._max_width;
        //},
        //'=maxWidth' : function(max){
        //    this._setStyleNumber('maxWidth', this._max_width = max);
        //},
        '.innerHeight' : function(){
            return this.height - this.getPaddingTop() - this.getPaddingBottom();
        },
        '=innerHeight' : function(h){
            this._setHeight(Math.round(h) + OJ.dim_unit);
        },
        '.outerHeight' : function(){
            return this.height + this.getMarginTop() + Math.abs(this.getMarginBottom());
        },
        '=outerHeight' : function(h){
            this.innerHeight = h - this.getPaddingTop() - this.getPaddingBottom() - this.getMarginTop() - Math.abs(this.getMarginBottom());
        },
        '.height' : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;
            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;
                return (this._proxy.offsetHeight / parent.offsetHeight) * 100;
            }
            return this._proxy.offsetHeight || this._getStyleNumber('height');
        },
        '_setHeight' : function(val){
            this._setStyle('height', val);
        },
        '=height' : function(val){
            var args = isArray(val) ? val : [val],
                h = args[0];
            if(h == OjStyleElement.AUTO || !isSet(h)){
                this._setHeight(null);
            }
            else if(args.length > 1){
                this._setHeight(args.join(''));
            }
            else{
                this.innerHeight = h - this.getPaddingTop() - this.getPaddingBottom();
            }
        },
        //'.minHeight' : function(){
        //    return isNull(this._min_height) ? this._min_height = this._getStyleNumber('minHeight') : this._min_height;
        //},
        //'=minHeight' : function(min){
        //    this._min_height = min;
        //
        //    this._setStyleNumber('minHeight', min);
        //},
        //
        //'.maxHeight' : function(){
        //    return isNull(this._max_height) ? this._max_height = this._getStyleNumber('maxHeight') : this._max_height;
        //},
        //'=maxHeight' : function(max){
        //    this._max_height = max;
        //
        //    this._setStyleNumber('maxHeight', max);
        //},
        // Style Getter & Setter Functions
        '.x' : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;
            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;
                return (this._proxy.offsetLeft / parent.offsetWidth) * 100;
            }
            return this._proxy.offsetLeft;
        },
        '.pageX' : function(){
            if(this._proxy.getBoundingClientRect){
                return this._proxy.getBoundingClientRect().left;
            }
            // add backup solution
        },
        '=x' : function(val/*[val, unit=px]*/){
            var args = isArray(val) ? val : [val];
            this._setStyleNumber('left', args[0], args.length > 1 ? args[1] : OJ.dim_unit);
        },
        '=pageX' : function(val){
            this.x = this.parent.localX(val);
        },
        '.y' : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;
            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;
                return (this._proxy.offsetTop / parent.offsetHeight) * 100;
            }
            return this._proxy.offsetTop;
        },
        '.pageY' : function(){
            if(this._proxy.getBoundingClientRect){
                return this._proxy.getBoundingClientRect().top;
            }
            // add backup solution
        },
        '=y' : function(val/*[val, unit=px]*/){
            var args = isArray(val) ? val : [val];
            this._setStyleNumber('top', args[0], args.length > 1 ? args[1] : OJ.dim_unit);
        },
        '=pageY' : function(val){
            this.y = this.parent.localY(val);
        },
        '.alpha' : function(){
            return this._alpha;
        },
        '=alpha' : function(alpha){
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
        '.backgroundColor' : function(){
            return this._getStyle('background-color');
        },
        '=backgroundColor' : function(color){
            this._setStyle('background-color', color);
        },
        '.depth' : function(){
            return this._depth;
        },
        '=depth' : function(depth){
            this._depth = this._setStyle('zIndex', depth);
        },
        '.overflow' : function(){
            return this._overflow;
        },
        '=overflow' : function(overflow){
            this._overflow = this._setStyle('overflow', overflow);
        },
        '.rect' : function(){
            return new OjRect(this.x, this.y, this.width, this.height);
        },
        '=rect' : function(rect){
            // add this later
        },
        '.pageRect' : function(){
            return new OjRect(this.pageX, this.pageY, this.width, this.height);
        },
        '=pageRect' : function(rect){
            // add this later
        },
        '.scrollHeight' : function(){
            return this._proxy.scrollHeight;
        },
        '=scrollHeight' : function(val){
            this._proxy.scrollHeight = val;
        },
        '.scrollWidth' : function(){
            return this._proxy.scrollWidth;
        },
        '=scrollWidth' : function(val){
            this._proxy.scrollWidth = val;
        },
        '.scrollX' : function(){
            return this._proxy.scrollLeft;
        },
        '=scrollX' : function(val){
            this._proxy.scrollLeft = val;
        },
        '.scrollY' : function(){
            return this._proxy.scrollTop;
        },
        '=scrollY' : function(val){
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
        '.hAlign' : function(){
            return this._getAlign('h', OjStyleElement.LEFT);
        },
        '=hAlign' : function(val){
            return this._setAlign('h', val, OjStyleElement.LEFT);
        },
        '.vAlign' : function(){
            return this._getAlign('v', OjStyleElement.TOP);
        },
        '=vAlign' : function(val){
            return this._setAlign('v', val, OjStyleElement.TOP);
        },

        // Transform Setter & Getters
        '_updateTransform' : function(){
            var rotate = this._rotation ? 'rotate(' + this._rotation + 'deg) ' : '',
                translate = this._translate ? this._translate.toString() : '',
                transform = rotate + (isEmpty(translate) ? '' : 'translate(' + translate + ')'),
                prefix = OJ.css_prefix;
            if(prefix == '-moz-'){
                this._setStyle('MozTransform', transform);
            }
            else{
                this._setStyle(prefix + 'transform', transform);
            }
            this._setStyle('transform', transform);
        },
        '.origin' : function(){
            return this._origin;
        },
        '=origin' : function(val){
            this._setStyle(OJ.css_prefix + 'transform-origin', val);
            this._setStyle('transform-origin', this._origin = val);
        },
        '.rotation' : function(){
            return this._rotation;
        },
        '=rotation' : function(val){
            if(this._rotation == val){
                return;
            }
            this._rotation = val;
            this._updateTransform();
        },
        '.translate' : function(){
            return this._translate;
        },
        '=translate' : function(val){
            if(val.isEqualTo(this._translate)){
                return;
            }
            this._translate = val;
            this._updateTransform();
        }
    },
    {
        'COMPONENT_TAGS' : {},
        'STYLE_BACKUP' : 'styleBackup',
        'STYLE_DEFAULT' : 'styleDefault',
        'STYLE_IE' : 'styleIE',
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
        'AUTO' : 'auto',
        'BLOCK' : 'block',
        'HIDDEN' : 'hidden',
        'NONE' : 'none',
        'SCROLL' : 'scroll',
        'VISIBLE' : 'visible',
        'LEFT' : 'l',
        'CENTER' : 'c',
        'RIGHT' : 'r',
        'TOP' : 't',
        'MIDDLE' : 'm',
        'BOTTOM' : 'b',
        'PERCENT' : '%',
        'PX' : 'px',
        'EM' : 'em',

        'getTagComponent' : function(tag){
            return this.COMPONENT_TAGS[tag];
        },
        'isComponentTag' : function(tag){
            return isSet(this.COMPONENT_TAGS[tag]);
        },
        'registerComponentTag' : function(tag, component){
            this.COMPONENT_TAGS[tag] = component;
            if(OJ.browser == OJ.IE && OJ.browser_version.compareVersion('9.0.0') < 0){
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
				this.text = args[0];
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
			this.dom.nodeValue += str.toString();
		},
		'prependText' : function(str){
			this.dom.nodeValue = str.toString() + this.dom.nodeValue;
		},

		'.text' : function(){
			return this.dom.nodeValue;
		},
		'=text' : function(str){
            this.dom.nodeValue = String.string(str);
		}
	}
);

OJ.extendClass(
	'OjTimer', [OjActionable],
	{
		'_props_' : {
			'duration'    : null,
			'repeat_count' : null // run n additional times, negative value means run forever
		},
		'_get_props_' : {
			'count' : 0,
            'paused' : null,
            'running' : null,
			'state' : null,
            'stopped' : null
		},
        '_elapsed' : 0,

		'_constructor' : function(/*duration, repeat_count*/){
            var self = this;
			self._super(OjActionable, '_constructor', []);
            self._state = OjTimer.STOPPED;
            self._processArguments(arguments, {
                'duration' : 0,
                'repeat_count' : 1
            });
		},

        '_setupInterval' : function(){
            var self = this,
                intrvl = self._interval;
            if(intrvl){
                clearInterval(intrvl);
            }
            self._interval = setInterval(function(){ self._tick(); }, self.duration);
            self._updateLastTick();
        },
		'_tick' : function(){
            var self = this,
                repeat = self.repeat_count;
            self._updateLastTick();
			self.dispatchEvent(new OjEvent(OjTimer.TICK));
			if(repeat > 0 && self._count++ == repeat){
				self.stop();
				self.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
			}
		},
        '_updateLastTick' : function(){
            self._last_tick = new Date();
            self._elapsed = 0;
        },

		'pause' : function(){
            var self = this,
                last_tick = self._last_tick,
                intrvl = self._interval;
            self._elapsed = last_tick ? (new Date()).getTime() - last_tick.getTime() : 0;
			self._state = OjTimer.PAUSED;
            if(intrvl){
                // todo: there is an edge case where this could be a timeout from a partial resume. not sure what to do.
                clearInterval(intrvl);
            }
		},
		'restart' : function(){
			this.stop();
			this.start();
		},
		'start' : function(){
            var self = this,
                elapsed = self._elapsed;
			if(!self._interval){
                self._elapsed = 0;
				self._state = OjTimer.RUNNING;
                // check to see if we have a partial we need to complete
                if(elapsed && elapsed < self.duration){
                    self._last_tick = new Date((new Date().getTime() - elapsed)); // post date the last tick
                    // run the last little bit of the tick
                    self._interval = setTimeout(
                        function(){
                            self._tick();
                            self._setupInterval();
                        },
                        self.duration - elapsed
                    );
                }
                else{
                    self._setupInterval();
                }
			}
		},
		'stop' : function(){
            var self = this;
			self.pause();
			self._count = 0;
            self._elapsed = 0;
			self._state = OjTimer.STOPPED;
		},

		'=duration' : function(duration){
            var self = this,
                intrvl;
			if(self._duration != duration){
				self._duration = Math.abs(duration);
                self._elapsed = 0;
                if(intrvl){
                    self._setupInterval();
                }
			}
		},
        '.paused' : function(){
			return this._state == OjTimer.PAUSED;
		},
		'=repeat_count' : function(repeat_count){
            var self = this;
			self._repeat_count = repeat_count = Math.max(repeat_count, 0);
			if(repeat_count >= self.count && self.running){
				self.stop();
				self.dispatchEvent(new OjEvent(OjTimer.COMPLETE));
			}
		},
        '.running' : function(){
			return this._state == OjTimer.RUNNING;
		},
		'.stopped' : function(){
			return this._state == OjTimer.STOPPED;
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

// TODO: make History Manager an extension of OjArray
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
				if(OJ.depth < 0){
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
					this._list.append(new_url);
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
            'easing' : null,
            'from' : null,
            'quality' : 60,  // frame rate
            'to' : null
        },
//	  '_animationFrame': null,  '_onAnimationFrame': null,  '_start': null,  '_timer': null,
        '_delta' : 0, '_progress' : 0,

        '_constructor' : function(/*from = null, to = null, duration = 500, easing = NONE*/){
            this._super(OjActionable, '_constructor', []);
            this._processArguments(arguments, {
                'from' : undefined,
                'to' : undefined,
                'duration' : 250,
                'easing' : OjEasing.NONE
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
        'USE_RAF' : (OJ.os != OJ.IOS || OJ.os_version.compareVersion('6.9') == 1 || !OJ.is_webview()) && window.requestAnimationFrame
    }
);


OJ.extendClass(
    'OjPropTween', [OjTween],
    {
        '_props_' : {
            'mode' : 'Javascript',
            'target' : null,
            'units' : null
        },
        //'_callback' : null, '_delta' : null, '_from_cache' : null,

        '_constructor' : function(/*target = null, to = null, duration = 500, easing = NONE, units = null*/){
            this._super(OjTween, '_constructor', []);
            this._processArguments(arguments, {
                'target' : undefined,
                'to' : undefined,
                'duration' : 250,
                'easing' : OjEasing.NONE,
                'units' : undefined
            });
//			var engine = OJ.getEngine();
//
//			if(engine == OJ.WEBKIT && !OJ.isMobile()){
//						this._mode = OjPropTween.WEBKIT;
//			}
        },
        '_destructor' : function(){
            this._callback = null;
            return this._super(OjTween, '_destructor', arguments);
        },

        '_calculateDelta' : function(){
            var self = this,
                target = self.target;
            self._from_cache = {};
            self._delta = {};
            var has_from = !isEmptyObject(self._from), key, transition_properties = '';
            for(key in self._to){
                if(!has_from){
                    self._from[key] = target[key];
                }
                self._from_cache[key] = parseFloat(self._from[key]);
                self._delta[key] = parseFloat(self._to[key]) - self._from_cache[key];
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
            var key,
                self = this,
                duration = self.duration,
                delta = self._delta,
                easing = self.easing,
                target = self.target,
                units = self.units;
            for(key in delta){
                var args = [
                    Math.round(
                        easing(time, self._from_cache[key], delta[key], duration, 0, 0) * 1000
                    ) / 1000
                ];
                if(units){
                    args.append(units);
                }
                target[key] = args;
            }
        },

        '_onComplete' : function(evt){
            this._isAnimating(false);
            this._super(OjTween, '_onComplete', arguments);
        },
        '_onTargetDestroy' : function(evt){
            this._super(OjTween, 'stop', arguments);
            this.target = null;
        },
        '_onWebKitComplete' : function(evt){
            var self = this,
                target = self.target,
                prop = OjPropTween.CSS_PROPERTY_MAP[evt.propertyName];
            if(isUndefined(self._from[prop])){
                return;
            }
            // cleanup the webkit transition settings
            target._setStyle('-webkit-transition-duration', null);
            target._setStyle('-webkit-transition-property', null);
            target.dom.removeEventListener('webkitTransitionEnd', self._callback, false);
            self._onComplete(evt);
            self._callback = null;
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
                this._target.dom.addEventListener('webkitTransitionEnd', this._callback = this._onWebKitComplete.bind(this), false);
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

        '=mode' : function(val){
            if(this._mode == val){
                return;
            }
            this._mode = val;
            if(this._timer){
                OJ.destroy(this._timer);
            }
        },
        '=target' : function(target){
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
            'alpha' : 'opacity',
            'x' : 'left',
            'y' : 'top',
            'width' : 'width',
            'height' : 'height'
        },
        'CSS_PROPERTY_MAP' : {
            'opacity' : 'alpha',
            'left' : 'x',
            'right' : 'y',
            'width' : 'width',
            'height' : 'height'
        },
        'JS' : 'Javascript',
        'WEBKIT' : 'WebKit'
    }
);

OJ.extendClass(
	'OjFade', [OjPropTween],
	{
		'_props_' : {
			'direction' : null,
			'duration'  : null
		},
		'_force' : false,

		'_constructor' : function(/*target = null, direction = IN, duration = 250, easing = NONE*/){
			this._super(OjPropTween, '_constructor', []);
			this._processArguments(arguments, {
				'target' : undefined,
                'direction' : OjFade.IN,
                'duration' : undefined,
                'easing' : undefined
			});
		},

		'_onComplete' : function(evt){
			if(this.direction == OjFade.NONE){
				this.target.alpha = 1;
				this.target.hide();
			}
			this._super(OjPropTween, '_onComplete', arguments);
		},

		'start' : function(){
            // for some reason this happens every once and awhile
            var target = this.target;
			if(!target){
				return;
			}
			if(!this._to){
				this._to = {};
			}
			if(this.direction == OjFade.IN){
				if(this._force || target.alpha == 1){
					target.alpha = 0;
				}
				this._to.alpha = 1;
			}
			else{
				if(this._force || target.alpha == 0){
					target.alpha = 1;
				}
				this._to.alpha = 0;
			}
			target.show();
			this._super(OjPropTween, 'start', arguments);
		}
	},
	{
		'IN'   : 'fadeIn',
		'NONE' : 'fadeNone',
		'OUT'  : 'fadeOut'
	}
);


OJ.extendClass(
    'OjComponent', [OjStyleElement],
    {
        '_props_' : {
            'enabled' : null,
            'disabled' : false,
            'elms' : null,
            'isActive' : false,
            'isDisabled' : false,
            'numElms' : 0
        },
        '_get_props_' : {
            'controller' : null,
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
                    // TODO: this will throw an error until OJ.importTemplate is replaced
                    //args[0] = OJ.importTemplate(this._template);
                }
            }
            // call super constructor
            this._super(OjStyleElement, '_constructor', args);
            // add the class name inheritance as css classes
            var css = [this.oj_class_name],
                ln = this._supers.length,
                cls;
            for(; ln--;){
                cls = this._supers[ln];
                css.append(OJ.classToString(cls));
                if(cls == OjComponent){
                    break;
                }
            }
            this.addCss(css);
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
                    this.appendElm(child);
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
            if(this.container == container){
                return;
            }
            if(this.container){
                this.container.removeCss('container');
            }
            if((this.container = container) != this){
                this.container.addCss('container');
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
            this._super(OjStyleElement, '_setIsDisplayed', arguments);
            this.redraw();
        },

        '_processEvent' : function(evt){
            if(this._isDisabled){
                return false;
            }
            return this._super(OjStyleElement, '_processEvent', arguments);
        },

        // Component Management Functions
        '_callElmFunc' : function(func, args){
            return this._callElmProp(func).apply(this.container, args);
        },
        '_callElmProp' : function(prop, val){
            var cls = this._static,
                container = this.container,
                translated;
            if(container != this && container.is(OjComponent)) {
                translated = prop;
            }
            else {
                translated = cls.ELM_FUNCS[prop];
            }
            if(arguments.length > 1){
                container[translated] = val;
            }
            return container[translated]
        },
        'appendElm' : function(){
            return this._callElmFunc('appendElm', arguments);
        },
        '.elms' : function(){
            return this._callElmProp('elms');
        },
        '=elms' : function(elms){
            return this._callElmProp('elms', elms);
        },
        'forElm' : function(){
            return this._callElmFunc('forElm', arguments);
        },
        'forElmReverse' : function(){
            return this._callElmFunc('forElmReverse', arguments);
        },
        'getElmAt' : function(){
            return this._callElmFunc('getElmAt', arguments);
        },
        'hasElm' : function(){
            return this._callElmFunc('hasElm', arguments);
        },
        'indexOfElm' : function(){
            return this._callElmFunc('indexOfElm', arguments);
        },
        'insertElmAt' : function(){
            return this._callElmFunc('insertElmAt', arguments);
        },
        'moveElm' : function(){
            return this._callElmFunc('moveElm', arguments);
        },
        '.numElms' : function(){
            return this._callElmProp('numElms');
        },
        'prependElm' : function(){
            return this._callElmFunc('prependElm', arguments);
        },
        'removeAllElms' : function(){
            return this._callElmFunc('removeAllElms', arguments);
        },
        'removeElm' : function(){
            return this._callElmFunc('removeElm', arguments);
        },
        'removeElmAt' : function(){
            return this._callElmFunc('removeElmAt', arguments);
        },
        'replaceElm' : function(){
            return this._callElmFunc('replaceElm', arguments);
        },
        'replaceElmAt' : function(){
            return this._callElmFunc('replaceElmAt', arguments);
        },

        // event handling functions
        '_onFadeComplete' : function(evt){
            this.alpha = 1;
            if(this._fader.direction == OjFade.OUT){
                this.hide();
            }
            else{
                this.show();
            }
            this._setIsAnimating(false);
            this._unset('_fader');
        },

        'fadeIn' : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.IN){
                    return;
                }
                this._unset('_fader');
            }
            else if(this.isVisible){
                return;
            }
            this.show();
            var ln = arguments.length;
            this._fader = new OjFade(this, OjFade.IN, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
            this._fader.start();
            this._setIsAnimating(true);
        },
        'fadeOut' : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.OUT){
                    return;
                }
                this._unset('_fader');
            }
            else if(!this.isVisible){
                return;
            }
            var ln = arguments.length;
            this._fader = new OjFade(this, OjFade.OUT, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
            this._fader.start();
            this._setIsAnimating(true);
        },
        'redraw' : function(force){
            return this._is_displayed || force;
        },
        // Getter/Setter Methods
        '.controller' : function(){
            if(!this._controller){
                var p = this.parentComponent;
                if(p){
                    this._controller = p.controller;
                }
            }
            return this._controller;
        },
        '=isActive' : function(val){
            if(this._isActive != val){
                if(this._isActive = val){
                    this.addCss('active');
                }
                else{
                    this.removeCss('active');
                }
            }
        },
        '=isDisabled' : function(val){
            if(this._isDisabled != val){
                if(this._isDisabled = val){
                    this.addCss('disabled');
                }
                else{
                    this.removeCss('disabled');
                }
            }
        },
        '.isEnabled' : function(){
            return !this.isDisabled;
        },
        '=isEnabled' : function(val){
            return this.isDisabled = !val;
        }
    },
    {
        '_TAGS' : [],
        'ELM_FUNCS' : {
            'appendElm' : 'appendChild',
            'elms' : 'children',
            'forElm' : 'forChild',
            'forElmReverse' : 'forChildReverse',
            'getElmAt' : 'getChildAt',
            'hasElm' : 'hasChild',
            'indexOfElm' : 'indexOfChild',
            'insertElmAt' : 'insertChildAt',
            'moveElm' : 'moveChild',
            'numElms' : 'numChildren',
            'prependElm' : 'prependChild',
            'removeAllElms' : 'removeAllChildren',
            'removeElm' : 'removeChild',
            'removeElmAt' : 'removeChildAt',
            'replaceElm' : 'replaceChild',
            'replaceElmAt' : 'replaceChildAt'
        },
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
				this.tint = args[0];
				if(ln > 1){
					this.period = args[1];
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
			this.numBlades = num_blades;
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
			this._timer.duration = (this._period * 1000) / this._numBlades;
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
					elm.alpha = Math.max(1 - (pos / this._numBlades), .2);
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

		'=alpha' : function(val){
			if(this._running){
				if(val == 0){
					this._timer.pause();
				}
				else{
					this._timer.start();
				}
			}
			this._super(OjComponent, '=alpha', arguments);
		},
		'=numBlades' : function(val){
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
				elm.rotation = section * ln;
				elm.translate = this._translate;
				elm.backgroundColor = this._tint;
				this.wrapper.appendChild(elm);
			}
			// redraw the tint
			this.redraw();
			// update the timer
			this._updateTimer();
		},
		'=period' : function(val){
			if(this._period == val){
				return;
			}
			this._period = val;
			// update the timer
			this._updateTimer();
		},
		'=tint' : function(val){
			var ln;
			if(this._tint == val){
				return;
			}
			this._tint = val;
			ln = this._numBlades;
			for(; ln--;){
				this.wrapper.getChildAt(ln).backgroundColor = this._tint;
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
        '_props_': {
            'preload': false,
            'resizeBy': 'none', // OjMedia.NONE
            'source': null,
            'showSpinner': false,
            'spinnerTint': '#333'
        },
        '_height': 0, '_loaded': false, '_resize_vals': ['none', 'fill', 'fit', 'hFill', 'wFill'], '_width': 0,
        //'_template': '<div><div var=container></div></div>',
        '_h_align': OjStyleElement.CENTER,
        '_v_align': OjStyleElement.MIDDLE,

        '_constructor': function (/*source*/) {
            this._super(OjComponent, '_constructor', []);
            if (arguments.length) {
                this.source = arguments[0];
            }
        },
        '_destructor': function () {
            this._unset('media');
            this._unset('loading');
            return this._super(OjComponent, '_destructor', arguments);
        },

        // NOTE: this should never be called directly
        '_load' : function(){
        },
        '_makeMedia' : function(){
            return new OjStyleElement('<div class="media"></div>');
        },
        '_resize' : function(){
            if(!this._media){
                return;
            }
            if(this._source_is_css){
                this._media.width = OjStyleElement.AUTO;
                this._media.height = OjStyleElement.AUTO;
                return;
            }
            var w = this._getStyleBackup('width'),
                h = this._getStyleBackup('height');
            if(!isEmpty(w)){
                this._media.width = ['100', '%'];
                if (h) {
                    this._media.height = ['100', '%'];
                }
                else {
                    this._media.height = OjStyleElement.AUTO;
                }
            }
            else if(!isEmpty(h)){
                this._media.height = ['100', '%'];
                this._media.width = OjStyleElement.AUTO;
            }
            else if(this._resizeBy == this._static.WIDTH){
                this._media.width = ['100', '%'];
                this._media.height = OjStyleElement.AUTO;
            }
            else{
                this._media.height = ['100', '%'];
                this._media.width = OjStyleElement.AUTO;
                var w2 = this.width;
                if(w > w2){
                    this._media.marginLeft = (w2 - w) / 2;
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
        '_unload': function(){
            this._source = null;
            this._loaded = false;
            if (this.loading) {
                this._unset('loading');
            }
            if (this._media) {
                this._media.maxWidth = OjStyleElement.AUTO;
                this._media.maxHeight = OjStyleElement.AUTO;
            }
            this.removeCss('is-loaded');
            this.dispatchEvent(new OjEvent(OjEvent.UNLOAD));
        },

        '_onMediaLoad': function (evt) {
            this._unset('loading');
            this._loaded = true;
            if (this._media) {
                // make sure we don't allow up-scaling
                if (this._original_w) {
                    this._media.maxWidth = this._original_w;
                }
                if (this._original_h) {
                    this._media.maxHeight = this._original_h;
                }
            }
            this._resize();
            this.addCss('is-loaded');
            this.dispatchEvent(new OjEvent(OjEvent.LOAD));
        },

        'clone': function () {
            var media = this._super(OjComponent, 'clone', arguments);
            media.source = this._source;
            return media;
        },
        'isLoaded': function () {
            return this._loaded;
        },
        'load': function () {
            if (!this._loaded && this._source) {
                this._load();
            }
        },
        'unload': function () {
            if (this._loaded && this._source) {
                this._unload();
            }
        },

        // Getter & Setter Functions
        '.originalHeight': function () {
            return this._original_h;
        },
        '.originalWidth': function () {
            return this._original_w;
        },
        '=source': function (url) {
            if (Array.isArray(url)) {
                url = url.join(', ');
            }
            else if (url) {
                url = url.toString();
            }
            // make sure we don't do extra work with loading the same media twice
            if (this._source == url) {
                return;
            }
            this.unload();
            if (!this.loading && this._showSpinner) {
                this.appendElm(this.loading = new OjSpinner(this._spinnerTint));
            }
            this._setSource(url);
            if (this._preload || this._is_displayed) {
                this._load();
            }
        },
        '=resizeBy': function (val) {
            if (this._resizeBy == val) {
                return;
            }
            this._resizeBy = this._resize_vals.indexOf(val) > -1 ? val : this._static.NONE;
            this._resize();
        },
        '_setHeight': function (val) {
            this._super(OjComponent, '_setHeight', arguments);
            this._height = val
//			this._resize();
        },
        '_setWidth': function (val) {
            this._super(OjComponent, '_setWidth', arguments);
            this._width = val;
//			this._resize();
        }
    },
    {
        'NONE': 'none',
        'FILL': 'fill',
        'FIT': 'fit',
        'HEIGHT': 'hFill',
        'WIDTH': 'wFill'
    }
);

OJ.extendComponent(
    'OjImage', [OjMedia],
    {
        '_source_is_css': false,
        // todo: OjImage handle upscaling....
        '_destructor': function () {
            if (this._img) {
                this._img.removeEventListener('load', this._callback);
            }
            this._callback = this._img = null;
            return this._super(OjMedia, '_destructor', arguments);
        },

        '_load': function () {
            if (!this._source_is_css && this._img) {
                this._loaded = false;
                this._img.src = this._source;
            }
        },
        '_makeMedia': function () {

            return this._super(OjMedia, '_makeMedia', arguments);
        },
        '_resize': function () {
            this.removeCss(this._resize_vals);
            if (this._resizeBy == this._static.NONE) {
                return;
            }
            this.addCss(this._resizeBy);
        },

        '_onMediaLoad': function (evt) {
            if(this._source_is_css){
                this._media.addCss(this._source.substring(1));
                this._original_w = this._media.width;
                this._original_h = this._media.height;
            }
            else{
                this._original_w = this._img.width;
                this._original_h = this._img.height;
                if(!this.width){
                    this.width = this._original_w;
                }
                if(!this.height){
                    this.height = this._original_h;
                }
                this._setStyle('backgroundImage', 'url(' + this.source + ')');
            }
            return this._super(OjMedia, '_onMediaLoad', arguments);
        },

        '_setSource': function (url) {
            this._super(OjMedia, '_setSource', arguments);
            if (url) {
                // check to see if this is a css class
                if (this._source_is_css = (this._source.charAt(0) == '@')) {
                    // if the media holder doesn't exist then create it
                    this.appendElm(this._media = this._makeMedia());
                    // trigger the image load since its already loaded
                    this._onMediaLoad(null);
                }
                else {
                    // make sure we have an image loader object
                    if (!this._img) {
                        this._img = new Image();
                        this._img.addEventListener('load', this._callback = this._onMediaLoad.bind(this));
                    }
                }
            }
        },
        '_unload': function () {
            // cleanup old source
            if (!this._source_is_css) {
                // remove old source background image
                this._setStyle('backgroundImage', null);
            }
            this._unset('_media');
            this._source_is_css = false;
            this._super(OjMedia, '_unload', arguments);
        }
    },
    {
        '_TAGS': ['img', 'image'],
        'image': function (img/*, clone=false*/) {
            if (img) {
                if (isString(img)) {
                    return new OjImage(img);
                }
                if (img.is('OjImage')) {
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
		'_template' : '<div><div class=box><div var=icn></div><label var=msg></label></div></div>',

		'_constructor' : function(/*message, icon*/){
			var args = arguments,
				ln = arguments.length,
				icon;
			this._super(OjComponent, '_constructor', []);
			if(ln){
				this.message = args[0];
				if(ln > 1){
					icon = args[1];
				}
			}
			this.icon = icon;
		},

		'_onFadeComplete' : function(evt){
			if(this._fader.direction == OjFade.OUT && this.parent){
				this.parent.removeChild(this);
			}
			this._super(OjComponent, '_onFadeComplete', arguments);
		},

		'hide' : function(){
			if(!this.parent){
				return;
			}
			this.fadeOut();
		},
		'show' : function(target){
			if(!target || this.parent == target){
				return;
			}
			this.alpha = 0;
			target.appendChild(this);
			this.fadeIn();
		},

		'=message' : function(msg){
			if(!msg && this._forceMessage){
				msg = 'Loading';
			}
			if(isEmpty(msg)){
				this.addCss('no-message');
			}
			else{
				this.removeCss('no-message');
			}
			this.msg.text = this._message = msg;
		},
		'=icon' : function(icon){
			this.icn.removeAllChildren();
			if(icon || this._forceIcon){
				if(!icon){
					icon = new OjSpinner();
					icon.width = 40;
					icon.height = 40;
				}
				this.removeCss('no-icon');
				this.icn.appendChild(icon);
			}
			else{
				this.addCss('no-icon');
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
            'controller' : null,
            'footer' : null,
            'header' : null,
            'icon' : null,
            'shortTitle' : null,
            'stack' : null,
            'title' : null
        },
        '_get_props_' : {
            'actionView' : null,
            'cancelView' : null,
            'titleView' : null
        },
//		'_elm_funcs' : null,  '_load_checkpoints' : null,  '_loading_icon' : null,
//
//		'_overlay' : null,  '_unload_checkpoints' : null,  '_unloading_icon' : null,
        '_loading_msg' : 'Loading', '_template' : '<div><div var=container></div></div>', '_loaded' : false,
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
                this.content = args[0];
                if(ln > 1){
                    title = args[1];
                    if(ln > 2){
                        short_title = args[2];
                    }
                }
            }
            this.title = title;
            if(short_title){
                this.shortTitle = short_title;
            }
            if(this._static.ICON){
                this.icon = this._static.ICON;
            }
        },
        '_destructor' : function(){
            this.unload();
            this._unset(['_actionView', '_cancelView', '_titleView', '_overlay']);
            return this._super(OjComponent, '_destructor', arguments);
        },

        '_checkpointsCompleted' : function(checkpoints){
            for(var key in checkpoints){
                if(!checkpoints[key]){
                    return false;
                }
            }
            return true;
        },
        '_hideOverlay' : function(overlay){
            if((overlay = overlay || this._overlay)){
                overlay.addEventListener(OjEvent.HIDE, this, '_onOverlayHide');
                overlay.hide();
            }
        },
        '_load' : function(){
            this._loaded = true;
            this.removeCss('loading');
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
            var args = arguments,
                ln = args.length,
                msg = ln ? args[0] : null,
                icon = ln > 1 ? args[1] : null,
                overlay = this._overlay;
            if(overlay){
                overlay.message = msg;
                overlay.icon = icon;
            }
            else{
                overlay = this._overlay = new OjOverlay(msg, icon);
            }
            overlay.show(this);
            return overlay;
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

        'load' : function(/*reload=false*/){
            if((!arguments.length || !arguments[0]) && this._loaded){
                return false;
            }
            this.addCss('loading');
            this._resetCheckpoints(this._load_checkpoints);
            this._loadCheckpoint();
            return true;
        },
        'unload' : function(){
            if(this._loaded){
                this._resetCheckpoints(this._unload_checkpoints);
                this._unloadCheckpoint();
            }
        },

        // getter & Setter functions
        '.content' : function(){
            return this.elms;
        },
        '=content' : function(content){
            this.removeAllElms();
            if(content){
                content = Array.array(content);
                var ln = content.length;
                for(; ln--;){
                    this.insertElmAt(content[ln], 0);
                }
            }
        },
        '=footer' : function(val){
            if(this._footer == val){
                return;
            }
            if(this._footer = val){
                this.removeCss('no-footer');
                if(!this.ftr){
                    var ftr = new OjStyleElement();
                    ftr.addCss('footer');
                    this.container.parent.insertChildAt(this.ftr = ftr, 0);
                }
                this.ftr.removeAllChildren();
                this.ftr.appendChild(val);
            }
            else{
                this._unset('ftr');
                this.addCss('no-footer');
            }
        },
        '=header' : function(val){
            if(this._header == val){
                return;
            }
            if(this._header = val){
                this.removeCss('no-header');
                if(!this.hdr){
                    var hdr = new OjStyleElement();
                    hdr.addCss('header');
                    this.container.parent.insertChildAt(this.hdr = hdr, 0);
                }
                this.hdr.removeAllChildren();
                this.hdr.appendChild(val);
            }
            else{
                this._unset('hdr');
                this.addCss('no-header');
            }
        },
        '.icon' : function(){
            return OjImage.image(this._icon, true); // this will clone the icon so that we don't run into the icon accidentally getting messed up
        },
        '=icon' : function(icon){
            if(this._icon == icon){
                return;
            }
            this._icon = icon;
            this.dispatchEvent(new OjEvent(OjView.ICON_CHANGE, false));
        },
        '=title' : function(title){
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
        'TITLE' : null,
        'HORIZONTAL' : 'horizontal',
        'VERTICAL' : 'vertical',
        'TOP' : 'top',
        'BOTTOM' : 'bottom',
        'LEFT' : 'left',
        'RIGHT' : 'right',
        'ICON_CHANGE' : 'onTitleChange',
        'LOAD' : 'onViewLoad',
        'TITLE_CHANGE' : 'onTitleChange',
        'UNLOAD' : 'onViewUnload',
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
				this.source = arguments[0];
				if(ln > 1){
					this.target = arguments[1];
				}
			}
			this.setAttr('name', this.id);
		},

		'_onLoad' : function(){
			clearInterval(this._interval);
			this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
		},
		'_onTimeout' : function(){
			clearInterval(this._interval);
			this.dispatchEvent(new OjIoErrorEvent(OjIoErrorEvent.IO_ERROR));
		},

		'.source' : function(){
			return this._source;
		},
		'=source' : function(source){
			var iframe = this.dom;
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

		'.content' : function(){
			return this._images.clone();
		},
		'=content' : function(content){
			this.removeAllElms();
			if(content){
				this._images = Array.array(content);
				var ln = this._images.length;
				for(; ln--;){
					this.insertElmAt(new OjImage(this._images[ln]), 0);
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
            'stack' : null
        },

        '_setupStack' : function(){
            debugger;
            this._stack.addEventListener(OjStackEvent.CHANGE, this, '_onStackChange');
            // if we already have stuff in the stack then trigger a change event so the display gets updated properly
            var ln = this._stack.numElms;
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
            return s.appendElm.apply(s, arguments);
        },
        'addViewAt' : function(view, index/*, animated = true*/){
            var s = this._stack;
            return s.insertElmAt.apply(s, arguments);
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
            if(index = this.activeIndex){
                this.replaceViewAt(0, view);
                return this.gotoViewAt(0);
            }
            this.replaceActive(view, animated);
        },
        'gotoViewAt' : function(index/*, animated = true*/){
            return this._stack.activeIndex = arguments;
        },
        'hasView' : function(view){
            return this._stack.hasElm(view);
        },
        'indexOfView' : function(view){
            return this._stack.indexOfElm(view);
        },
        'removeActive' : function(/*animated = true*/){
            return this.removeViewAt(this._stack.activeIndex, arguments.length ? arguments[0] : true);
        },
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
            return s.replaceElmAt(this.activeIndex, view, args.length > 1 ? args[0] : true);
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
        '.activeView' : function(){
            return this._stack.active;
        },
        '=activeView' : function(val){
            this._stack.active = val;
        },
        '.activeIndex' : function(){
            return this._stack.activeIndex;
        },
        '=activeIndex' : function(val){
            this._stack.activeIndex = val;
        },
        '=stack' : function(stack){
            if(this._stack){
                if(this._stack == stack){
                    return;
                }
                this._cleanupStack();
            }
            this._stack = stack;
            stack.controller = this;
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
                this.stack = arguments[0];
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
            'suffix' : null
        },
        '_template' : '<label></label>',

        '_constructor' : function(text){
            this._super(OjComponent, '_constructor', []);
            this.text = text;
        },

        '_processDomSourceChildren' : function(dom_elm, component){
            var txt = dom_elm.innerHTML;
            if(!isEmpty(txt)){
                this.text = String.string(this.text) + String.string(txt);
                return;
            }
            return this._super(OjComponent, '_processDomSourceChildren', arguments);
        },
        '_redrawText' : function(){
            var self = this;
            self.dom.innerHTML = String.string(self.prefix).html() + String.string(self.text).html() + String.string(self.suffix).html();
        },

        'appendText' : function(str){
            this.text = String.string(this.text) + String.string(str);
        },
        'prependText' : function(str){
            this.text = String.string(str) + String.string(this.text);
        },
        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){
                this._redrawText();
                return true;
            }
            return false;
        },

        '=prefix' : function(val){
            if(this._prefix == val){
                return;
            }
            this._prefix = val;
            this.redraw();
        },
        '=suffix' : function(val){
            if(this._suffix == val){
                return;
            }
            this._suffix = val;
            this.redraw();
        },
        // these are needed to override the OjStyleElement text getter/setter
        '.text' : function(){
            return this._text;
        },
        '=text' : function(val){
            if(this._text == val){
                return;
            }
            this._text = val;
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
			'direction' : null
		},

		'_constructor' : function(/*target, direction, amount, duration, easing, units*/){
            var self = this;
			self._super(OjPropTween, '_constructor', []);
			self._to = {};
            self._processArguments(arguments, {
                'target' : undefined,
                'direction' : self._static.BOTH,
                'amount': undefined,
                'duration' : 250,
                'easing' : OjEasing.NONE,
                'units' : OJ._('dimUnit')
            });
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
		'=amount' : function(amount){
            var self = this,
                dir = self.direction,
                cls = OjMove,
                to = self._to;
			if(self._amount == amount){
                return;
            }
            self._amount = amount;
			if(dir == cls.BOTH){
				to.x = amount[0];
				to.y = amount[1];
			}
			else if(dir == cls.X){
				to.x = amount;
			}
			else{
				to.y = amount;
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
        '_props_' : {
            'tweens' : null
        },
        '_get_props_' : {
            'numTweens' : null,
            'isFinished' : false
        },

		'_constructor' : function(/*tweens|tween, tween, tween...*/){
            var self = this,
                args = arguments;
			self._completed = [];
            self._tweens = [];
			self._super(OjActionable, '_constructor', []);
			if(args.length){
				if(isArray(args[0])){
					this.tweens = args[0];
				}
				else{
					this.tweens = Array.array(arguments);
				}
			}
		},
		'_destructor' : function(depth){
			var self = this,
                tweens = self._tweens;
			this.stop();
			if(depth){
                tweens.forEachReverse(function(item){
                    OJ.destroy(item, depth);
                });
			}
			else{
                tweens.forEachReverse(function(item){
                    self.removeTween(item);
                });
			}
			return self._super(OjActionable, '_destructor', arguments);
		},

		'_checkCompleted' : function(){
            var self = this,
                evt = OjTweenEvent;
			if(self._tweens.length == self._completed.length && !self.isFinished){
				self.dispatchEvent(new evt(evt.COMPLETE));
			}
		},

		'_onTweenComplete'  : function(evt){
			var self = this,
                completed = self._completed,
                tween = evt.target;
			if(!completed.contains(tween)){
				completed.append(tween);
			}
//				this.dispatchEvent(new OjTweenEvent(OjTweenEvent.TICK));
			self._checkCompleted();
		},

		'_controlTweens' : function(command, args){
            this._tweens.forEachReverse(function(item){
                item[command].apply(item, args);
            });
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
            var self = this;
			if(self.hasTween(tween)){
				return;
			}
			self._isFinished = false;
			tween.addEventListener(OjTweenEvent.COMPLETE, self, '_onTweenComplete');
			return self._tweens.append(tween);
		},
		'removeTween' : function(tween){
			var self = this,
                tweens = self._tweens,
                index = tweens.indexOf(tween);
			if(index == -1){
				return;
			}
			tween.removeEventListener(OjTweenEvent.COMPLETE, self, '_onTweenComplete');
			tweens.removeAt(index);
			self._checkCompleted();
			return tween;
		},
		'hasTween' : function(tween){
			return this._tweens.contains(tween);
		},

		'.numTweens' : function(){
			return this._tweens.length;
		},
		'.tweens' : function(){
			return this._tweens.clone();
		},
		'=tweens' : function(tweens){
			var self = this;
            self._tweens.forEachReverse(function(item){
                self.removeTween(item);
            });
			if(tweens){
                tweens.forEachReverse(function(item){
                    self.addTween(item);
                });
			}
		}
	}
);


OJ.defineClass(
    'OjIFlowNavController', {
        '_props_' : {
            'cancelLabel' : 'Cancel',
            'cancelVisible' : false,
            'title' : null
        },
        '_template' : '<div class=flow-nav-controller><div var=bottom><div var=btmLeft class=left v-align=m></div><div var=btmTitle class=title v-align=m></div><div var=btmRight class=right v-align=m></div></div><div var=top><div var=topLeft class=left v-align=m></div><div var=topTitle class=title v-align=m></div><div var=topRight class=right v-align=m></div></div></div>',

        // helper functions
        '_makeBackButton' : function(view){
            var btn = new OjButton(view.shortTitle);
            btn.addCss('back-button');
            return btn;
        },
        '_makeCancelButton' : function(title){
            var btn = new OjButton(title);
            btn.addCss('cancel-button');
            return btn;
        },
        '_makeTitle' : function(title){
            var elm = new OjLabel(title);
            elm.vAlign = OjStyleElement.MIDDLE;
            return elm;
        },
        '_update' : function(view, transition, index, old_index){
            // remove any old animations
            this._unset('_tween');
            debugger;
            if(!view){
                return; // todo: re-evalute this to properly handle transition to on view
            }
            // process the left, title & right components
            // setup the vars
            var t = this.top, tl = this.topLeft, tt = this.topTitle, tr = this.topRight,
                b = this.bottom, bl = this.btmLeft, bt = this.btmTitle, br = this.btmRight,
                left = tl.numChildren ? this.topLeft.getChildAt(0) : null,
                center = tt.numChildren ? tt.getChildAt(0) : null,
                right = tr.numChildren ? tr.getChildAt(0) : null,
                action_view = view.actionView,
                cancel_view = view.cancelView,
                title_view = view.titleView,
                title;
            // if there is no title view than try to make one from the title
            if(!title_view && (title = view.title)){
                title_view = this._makeTitle(title);
            }
            // figure out default values
            if(this._back_btn){
                this._back_btn.removeEventListener(OjUiEvent.PRESS, this, '_onBackClick');
            }
            else if(this._cancel_btn){
                this._cancel_btn.removeEventListener(OjUiEvent.PRESS, this, '_onCancelClick');
            }
            if(!cancel_view){
                if(index > 0){
                    cancel_view = this._makeBackButton(this._stack.getElmAt(index - 1));
                }
                else if(this._cancelVisible){
                    cancel_view = this._cancel_btn = this._makeCancelButton(this._cancelLabel);
                }
            }
            if(index > 0){
                this._back_btn = cancel_view;
                cancel_view.addEventListener(OjUiEvent.PRESS, this, '_onBackClick');
            }
            else if(this._cancelVisible){
                this._cancel_btn = cancel_view;
                cancel_view.addEventListener(OjUiEvent.PRESS, this, '_onCancelClick');
            }
            // figure out the transition
            if(left != cancel_view){
                if(left){
                    bl.appendChild(left);
                }
                if(cancel_view){
                    tl.appendChild(cancel_view);
                }
            }
            if(right != action_view){
                if(right){
                    br.appendChild(right);
                }
                if(action_view){
                    tr.appendChild(action_view);
                }
            }
            if(center != title_view){
                if(center){
                    bt.appendChild(center);
                }
                if(title_view){
                    tt.appendChild(title_view);
                }
            }
            // setup the top
            t.x = 0;
            t.alpha = 1;
            b.x = 0;
            b.alpha = 1;
            // check to see if we should animate or not
            var e = transition && transition.effect ? transition.effect : OjTransition.DEFAULT;
            if(e == OjTransition.NONE){
                // remove the animating css class since we aren't anymore
                this.removeCss('animating');
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
                duration = transition.duration,
                easing = transition.easing,
                width = this.width;
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
                b.x = 0;
                t.x = direction;
                t.alpha = 0;
                this._tween.addTween(new OjMove(b, OjMove.X, -1 * direction * .5, duration * .5), easing[1]);
                this._tween.addTween(new OjMove(t, OjMove.X, 0, duration, easing[1]));
            }
            else{
                t.alpha = 0;
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
            this._stack.removeItemAt(this._stack.length - 1);
            this._stack.removeEventListener(OjStackEvent.CHANGE_COMPLETE, this, '_onBackComplete');
        },
        '_onStackChange' : function(evt){
            this._update(evt.view, evt.transition, evt.index, evt.oldIndex);
        },
        '_onTweenComplete' : function(evt){
            this._unset('_tween');
            this.btmLeft.removeAllChildren();
            this.btmTitle.removeAllChildren();
            this.btmRight.removeAllChildren();
            this.removeCss('animating');
        },

        'back' : function(){
            this._stack.removeElm(this._stack.active);
            this.dispatchEvent(new OjEvent(OjFlowNavController.BACK));
        },

        '=title' : function(title){
            var self = this;
            if(self._title == title){
                return;
            }
            if(!self.titleLbl){
                self.titleLbl = self._makeTitle();
                self.topTitle.appendChild(self.titleLbl);
            }
            self.titleLbl.text = self._title = title;
        },
        '=cancelLabel' : function(val){
            if(this._cancelLabel == val){
                return;
            }
            this._cancelLabel = val;
            if(this._cancel_btn){
                this._cancel_btn.label = val;
            }
        },
        '=cancelVisible' : function(val){
            if(!(this._cancelVisible = val) && this._cancel_btn){
                this._unset('_cancel_btn');
            }
        }
    }
);

OJ.extendComponent(
    'OjFlowNavController', [OjNavController, OjIFlowNavController],
    //OJ.implementInterface(
    //    OjIFlowNavController,
        {
            '_constructor' : function(/*stack*/){
                this._super(OjNavController, '_constructor', []);
                // process the arguments
                if(arguments.length){
                    this.stack = arguments[0];
                }
            },

            '_setupStack' : function(){
                this._super(OjNavController, '_setupStack', arguments);
                this._stack.transition = new OjTransition(OjTransition.SLIDE_HORZ, 250, [OjEasing.IN, OjEasing.OUT]);
                this._stack.addEventListener(OjStackEvent.ADD, this, '_onStackAdd');
            },
            '_cleanupStack' : function(){
                this._super(OjNavController, '_cleanupStack', arguments);
                if(this._stack){
                    this._stack.removeEventListener(OjStackEvent.ADD, this, '_onStackAdd');
                }
            },

            '_onStackAdd' : function(evt){
                this._stack.active = evt.view;
            }
        }
    //)
    ,
    {
        '_TAGS' : ['flownav'],
        'BACK' : 'onFlowNavBack'
    }
);

OJ.extendClass(
	'OjCollectionEvent', [OjEvent],
	{
		'_get_props_' : {
            'items'    : null,
			'index'  : null,
			'oldItems' : null
		},

		'_constructor' : function(type, items, index, old_items, bubbles, cancelable){
			var self = this,
                params = [type];
			self._items = items;
			self._index = index;
            self._oldItems = old_items;
            if(isSet(bubbles)){
                params.append(bubbles);
                if(isSet(cancelable)){
                    params.append(cancelable);
                }
            }
			self._super(OjEvent, '_constructor', params);
		},
        'clone' : function(){
            var self = this,
                evt = self._super(OjEvent, 'clone', arguments);
            evt._items = self._items;
            evt._index = self._index;
            evt._oldItems = self._oldItems;
            return evt;
        }
	},
	{
        'ITEM_ADD'     : 'onItemAdd',
        'ITEM_CHANGE'  : 'onItemChange',
		'ITEM_PRESS'   : 'onItemPress',
		'ITEM_OVER'    : 'onItemOver',
		'ITEM_OUT'     : 'onItemOut',
		'ITEM_MOVE'    : 'onItemMove',
		'ITEM_REMOVE'  : 'onItemRemove',
		'ITEM_REPLACE' : 'onItemReplace',

        'isChangeEvent' : function(evt){
            if(!evt){
                return false;
            }
            var self = this,
                type = evt.type;
            return evt.is(OjCollectionEvent) && (
                type == self.ITEM_ADD || type == self.ITEM_MOVE || type == self.ITEM_REMOVE || type == self.ITEM_REPLACE
            );
        }
	}
);

OJ.extendComponent(
    'OjCollectionComponent', [OjComponent],
    {
        // Internal Properties
        '_props_' : {
            'itemRenderer' : null
        },
        // Internal Methods
        '_constructor' : function(elms, item_renderer){
            this._super(OjComponent, '_constructor', arguments);
            this._item_events = {};
            this._rendered = {};
            if(item_renderer){
                this.itemRenderer = item_renderer;
            }
            this.elms = elms ? elms : new OjArray();
        },
        '_destructor' : function(){
            // remove all rendered items
            var rendered = this._rendered,
                key;
            for(key in rendered){
                OJ.destroy(rendered[key]);
            }
            // clear out the helper vars
            this._rendered = this._item_events = null;
            this._super(OjComponent, '_destructor', arguments);
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
            var col_evt = OjCollectionEvent,
                ui_evt = OjUiEvent;
            // convert the item event into a mouse event
            if(type == col_evt.ITEM_PRESS){
                return [ui_evt.PRESS, '_onItemPress'];
            }
            if(type == col_evt.ITEM_OVER){
                return [ui_evt.OVER, '_onItemOver'];
            }
            if(type == col_evt.ITEM_OUT){
                return [ui_evt.OUT, '_onItemOut'];
            }
            return null;
        },
        '_dispatchItemEvent' : function(type, evt){
            var item = evt.currentTarget;
            if(this._itemRenderer){
                item = item.data;
            }
            this.dispatchEvent(new OjCollectionEvent(type, item, this._items.indexOf(item)));
        },
        '_releaseItem' : function(item){
            if(item){
                OJ.destroy(item);
                delete this._rendered[item.id];
            }
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
        '_onItemAdd' : function(evt){
            this.dispatchEvent(evt.clone());
        },
        '_onItemChange' : function(evt){
            this.dispatchEvent(evt.clone());
        },
        '_onItemPress' : function(evt){
            this._dispatchItemEvent(OjCollectionEvent.ITEM_PRESS, evt);
        },
        '_onItemOut' : function(evt){
            this._dispatchItemEvent(OjCollectionEvent.ITEM_OUT, evt);
        },
        '_onItemOver' : function(evt){
            this._dispatchItemEvent(OjCollectionEvent.ITEM_OVER, evt);
        },
        '_onItemMove' : function(evt){
            this.dispatchEvent(evt.clone());
        },
        '_onItemRemove' : function(evt){
            this.dispatchEvent(evt.clone());
        },
        '_onItemReplace' : function(evt){
            this.dispatchEvent(evt.clone());
        },
        // elm methods
        '_callElmFunc' : function(func, args){
            return this._callElmProp(func).apply(this.elms, args);
        },
        '_callElmProp' : function(prop, val){
            var cls = this._static,
                container = this.elms,
                translated;
            translated = cls.ELM_FUNCS[prop];
            if(arguments.length > 1){
                container[translated] = val;
            }
            return container[translated]
        },

        // Public Methods
        'addEventListener' : function(type){
            this._super(OjComponent, 'addEventListener', arguments);
            this._addItemListener(type);
        },
        'removeEventListener' : function(type){
            this._super(OjComponent, 'removeEventListener', arguments);
            this._removeItemListener(type);
        },
        //'redraw' : function(){
        //    if(this._super(OjComponent, 'redraw', arguments)){
        //        //this.container.forChildReverse(
        //        //    function(i, child){
        //        //        if(child.is(OjComponent)){
        //        //            child.redraw();
        //        //        }
        //        //    }
        //        //);
        //
        //        return true;
        //    }
        //
        //    return false;
        //},
        'renderItem' : function(item, index){
            if(!item){
                return null;
            }
            var key, evt,
                id = isObjective(item) ? item.id : (isUnset(index) ? item.toString() : index);
            // if we have already rendered the item then just return the cached value
            if(this._rendered[id]){
                return this._rendered[id];
            }
            var cls = this.itemRenderer;
            item = cls ? new cls(this, item) : item;
            for(key in this._item_events){
                evt = this._convertItemEventType(key);
                item.addEventListener(evt[0], this, evt[1]);
            }
            return this._rendered[id] = item;
        },
        'renderItemAt' : function(index){
            return this.renderItem(this._items[index]);
        },

        // Public Properties
        '.elms' : function(){
            return this._elms;
        },
        '=elms' : function(val){
            var self = this,
                elms = self._elms;
            val = OjArray.array(val);
            if(elms == val){
                return;
            }
            var col_evt = OjCollectionEvent,
                add_evt = col_evt.ITEM_ADD, add_func = '_onItemAdd',
                change_evt = col_evt.ITEM_CHANGE, change_func = '_onItemChange',
                move_evt = col_evt.ITEM_MOVE, move_func = '_onItemMove',
                out_evt = col_evt.ITEM_OUT, out_func = '_onItemOut',
                over_evt = col_evt.ITEM_OVER, over_func = '_onItemOver',
                press_evt = col_evt.ITEM_PRESS, press_func = '_onItemPress',
                remove_evt = col_evt.ITEM_REMOVE, remove_func = '_onItemRemove',
                replace_evt = col_evt.ITEM_REPLACE, replace_func = '_onItemReplace';
            // cleanup the old items if it existed
            if(elms){
                elms.removeEventListener(add_evt, self, add_func);
                elms.removeEventListener(change_evt, self, change_func);
                elms.removeEventListener(move_evt, self, move_func);
                elms.removeEventListener(out_evt, self, out_func);
                elms.removeEventListener(over_evt, self, over_func);
                elms.removeEventListener(press_evt, self, press_func);
                elms.removeEventListener(remove_evt, self, remove_func);
                elms.removeEventListener(replace_evt, self, replace_func);
            }
            // setup the new items
            this._elms = val;
            val.addEventListener(add_evt, self, add_func);
            val.addEventListener(change_evt, self, change_func);
            val.addEventListener(move_evt, self, move_func);
            val.addEventListener(remove_evt, self, remove_func);
            val.addEventListener(replace_evt, self, replace_func);
            return true;
        },
        '=itemRenderer' : function(val){
            val = isString(val) ? OJ.stringToClass(val) : val;
            if(val == this._itemRenderer){
                return;
            }
            this._itemRenderer = val;
        }
    },
    {
        '_TAGS' : ['collection'],
        'ELM_FUNCS' : {
            'appendElm' : 'append',
            'elms' : 'items',
            'forElm' : 'for',
            'forReverseElm' : 'forReverse',
            'getElmAt' : 'getAt',
            'hasElm' : 'contains',
            'indexOfElm' : 'indexOf',
            'insertElmAt' : 'insertAt',
            'moveElm' : 'move',
            'prependElm': 'prepend',
            'numElms' : 'length',
            'removeAllElms' : 'removeAll',
            'removeElm' : 'remove',
            'removeElmAt' : 'removeAt',
            'replaceElm' : 'replace',
            'replaceElmAt' : 'setAt'
        }
    }
);


OJ.extendClass(
	'OjResize', [OjDimTween],
	{
		'=amount' : function(amount){
			this._super(OjDimTween, '=amount', arguments);
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
			'effect'   : null,
			'duration' : null
		},

		'_constructor' : function(/*effect, duration, easing*/){
			this._super(OjObject, '_constructor', []);
			// default the easing property
			this._processArguments(arguments, {
                'effect' : OjTransition.FADE,
                'duration' : 250,
                'easing' : [OjEasing.NONE, OjEasing.NONE]
            });
		},

		'_getEasing' : function(direction){
			var easing = this.easing,
                ln = easing.length;
			if(ln){
				if(ln > 1 && direction == OjTransition.OUT){
					return easing[1];
				}
				return easing[0];
			}
			return null;
		},
		'_makeNone' : function(elm, amount){
			return null;
		},
		'_makeFade' : function(elm, direction, amount){
			return new OjFade(elm, amount ? OjFade.IN : OjFade.OUT, this.duration, this._getEasing(direction))
		},
        '_makeFlip' : function(elm, direction, amount){
            return new OjFlip(elm, amount, this.duration, this._getEasing(direction))
        },
		'_makeSlideHorz' : function(elm, direction, amount){
			return new OjMove(elm, OjMove.X, amount, this.duration, this._getEasing(direction));
		},
		'_makeSlideVert' : function(elm, direction, amount){
			return new OjMove(elm, OjMove.Y, amount, this.duration, this._getEasing(direction));
		},
		'_makeZoom' : function(elm, direction, amount){
			return null;
		},

		'make' : function(elm, direction, amount){
			return this['_make' + this.effect.ucFirst()].apply(this, arguments);
		},

		'.easing' : function(){
			var e = this._easing;
			return e ? e.clone() : null;
		},
		'=easing' : function(val){
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
        'FLIP'       : 'flip',
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
				var dflt = ln > 1 && args[1] ? args[1] : OjTransition.DEFAULT,
                    easing = dflt.easing;
				args = trans.fulltrim(' ').split(',');
				ln = args.length;
				return new OjTransition(
					ln ? args[0] : dflt.effect,
					ln > 1 ? args[1] : dflt.duration,
					[
						ln > 2 ? OjEasing[args[2]] : easing[0],
						ln > 3 ? OjEasing[args[3]] : easing[1]
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
            'active' : null,
            'activeIndex' : -1,
            'allowLooping' : false, // todo: OjStack - add support for looping
            'alwaysTrans' : false,
            'autoSizeHeight' : false, // todo: OjStack - add support for auto size height
            'autoSizeWidth' : false, // todo: OjStack - add support for auto size width
            'transition' : null
        },
//			'_active_elm' : null,  '_deferred_active' : null,  '_prev_active' : null,
//
//			'_trans_in' : null,  '_trans_out' : null,
        '_current_index' : 0, '_prev_index' : -1,

        // Construction & Destruction Functions
        '_constructor' : function(items, transition, item_renderer){
            var self = this;
            self._super(OjCollectionComponent, '_constructor', []);
            // set the default transition mode
            if(item_renderer){
                self.itemRenderer = item_renderer;
            }
            self.transition = transition || OjTransition.NONE;
            self._items = OjArray.array(items || []);
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
                ln = this.numElms;
                for(; ln--;){
                    OJ.destroy(this.renderItemAt(ln), depth);
                }
            }
            // remove object references
            this._controller = this._transition = null;
            return this._super(OjCollectionComponent, '_destructor', args);
        },

        // Element Management Functions
        //'_callElmFunc' : function(func, args){
        //    var trans = this._transition,
        //        ln = args.length,
        //        index = -1;
        //
        //
        //    // detect transition flag
        //    switch(func){
        //        case 'removeAllElms':
        //            index = 0;
        //            break;
        //
        //        case 'removeElmAt':
        //            if(ln){
        //                args[0] = this._processIndex(args[0]);
        //            }
        //        case 'appendElm':
        //        case 'removeElm':
        //            index = 1;
        //            break;
        //
        //        case 'insertElmAt':
        //        case 'replaceElmAt':
        //            if(ln > 1){
        //                args[1] = this._processIndex(args[1]);
        //            }
        //
        //        case 'moveElm':
        //        case 'replaceElm':
        //            index = 2;
        //            break;
        //
        //        case 'getElmAt':
        //            if(ln){
        //                this[0] = this._processIndex(args[0]);
        //            }
        //            break;
        //    }
        //
        //    // handle transition flag
        //    if(index > -1){
        //        if(ln > index){
        //            this.transition = this._processTransParam(args[index]);
        //
        //            args.pop();
        //        }
        //    }
        //
        //    // call the elm func
        //    var rtrn = this._getContainer()[this._elm_funcs[func]].apply(this._items, args)
        //
        //    // return transition to previous state
        //    if(index > -1){
        //        this.transition = trans;
        //    }
        //
        //    return rtrn;
        //},
        '_callElmFunc' : function(func, args){
            var self = this,
                trans = self.transition,
                index = -1;
            // detect transition flag
            switch(func){
                case 'removeAllElms':
                    index = 0;
                break;
                case 'removeElmAt':
                case 'appendElm':
                case 'removeElm':
                    index = 1;
                break;
                case 'insertElmAt':
                case 'replaceElmAt':
                case 'moveElm':
                case 'replaceElm':
                    index = 2;
                break;
            }
            // handle transition flag
            if(index > -1){
                if(args.length > index){
                    this.transition = this._processTransParam(args[index]);
                    args.removeLast();
                }
            }
            // call the elm func
            var rtrn = self._callElmProp(func).apply(self.elms, args);
            // return transition to previous state
            if(index > -1){
                this.transition = trans;
            }
            return rtrn
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
                    child.parent = null;
                    // add the child to our stack
                    this.appendElm(child);
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
            elm.isActive = true;
            this.container.appendChild(elm);
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
                Math.bounds(container.numChildren - 1, 0, 1)
            );
            switch(this._transition.effect){
                case OjTransition.FADE:
                    if(this._trans_out){
                        return null;
                    }
                    amount = 1;
                    break;
                case OjTransition.SLIDE_HORZ:
                    elm.x = -1 * direction * container.width;
                    break;
                case OjTransition.SLIDE_VERT:
                    elm.y = -1 * direction * container.height;
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
                switch(this._transition.effect){
                    case OjTransition.SLIDE_HORZ:
                        amount = elm.x + (direction * container.width);
                        break;
                    case OjTransition.SLIDE_VERT:
                        amount = elm.y + (direction * container.height);
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
            var ln = this.numElms;
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
                    ln = this.container.numChildren;
                    // NOTE: this will not function properly if it can't find a match since it sets the elm on each pass
                    for(; ln--;){
                        elm = this.container.getChildAt(ln);
                        if(elm.data == item){
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
            elm.removeCss('prev-active');
            elm.width = OjStyleElement.AUTO;
            elm.height = OjStyleElement.AUTO;
            elm.alpha = 1;
            elm.isActive = false;
        },

        // Event Handler Functions
        '_onItemAdd' : function(evt){
            this._super(OjCollectionComponent, '_onItemAdd', arguments);
            // since we are using a collection to keep track of things the parent won't get properly changes
            // so we need to do it here
            var index = evt.index,
                item = evt.item;
            this.dispatchEvent(new OjStackEvent(OjStackEvent.ADD, item, this._transition, index));
            if(!this._active){
                this.activeIndex = index;
            }
            else{
                this._activeIndex = this._current_index = this.indexOfElm(this._active);
            }
        },
        '_onItemMove' : function(evt){
            this._super(OjCollectionComponent, '_onItemMove', arguments);
            this.dispatchEvent(new OjStackEvent(OjStackEvent.MOVE, evt.item, this._transition, evt.index));
            if(this._active == evt.item){
                this._activeIndex = this._current_index = evt.index;
                // todo: add logic for stack item move current_index
            }
        },
        '_onItemRemove' : function(evt){
            this._super(OjCollectionComponent, '_onItemRemove', arguments);
            var ln,
                item = evt.item,
                index = evt.index;
            this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, item, this._transition, index));
            if(this._active == item){
                if(this._current_index){
                    this.activeIndex = this._current_index - 1;
                }
                else if(ln = this.numElms){
                    this.activeIndex = ln - 1;
                }
                else{
                    this._active = null;
                    this._activeIndex = this._current_index = -1;
                }
            }
            else{
                if(this._prev_active == item){
                    this._prev_active = null;
                }
                this._activeIndex = this._current_index = this.indexOfElm(this._active);
            }
        },
        '_onItemReplace' : function(evt){
            this._super(OjCollectionComponent, '_onItemReplace', arguments);
            var item = evt.item,
                index = evt.index;
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
                this.activeIndex = this._deferred_active;
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
            this.activeIndex = this._current_index + 1;
        },
        'prev' : function(){
            this.activeIndex = this._current_index - 1;
        },
        'renderItemAt' : function(index){
            return this._super(OjCollectionComponent, 'renderItemAt', [this._processIndex(index)]);
        },

        // Getter & Setter Functions
        '=active' : function(val/*, transition = true*/){
            if((arguments[0] = this.indexOfElm(val)) > -1){
                this.activeIndex = arguments;
            }
        },

        // Getter & Setter Functions
        '=activeIndex' : function(val/*, [val, transition = true]*/){
            var trans, trans_diff, item, direction, evt;
            // handle tuple
            if(isArray(val)){
                trans_diff = val[1];
                val = val[0];
            }
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
            if(trans_diff){
                this.transition = this._processTransParam(arguments[1]);
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
            if(!this.numElms){
                this._activeIndex = -1;
                this._current_index = -1;
                this._active = null;
                this.dispatchEvent(new OjStackEvent(OjStackEvent.CHANGE, null, this._transition, -1, this._prev_index));
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
                this.transition = trans;
            }
            // dispatch the change event
            this.dispatchEvent(evt);
            // dispatch the change is complete
            // if no animation
            if(!this._trans_out && !this._alwaysTrans){
                this._dispatchChangeComplete();
            }
        },
        '=allowLooping' : function(allow_looping){
            if(this._allowLooping == allow_looping){
                return;
            }
            // check to see if current index is out of bounds
            if(!(this._allowLooping = allow_looping)){
                var ln = this.numElms;
                if(this._current_index < 0){
                    this.activeIndex = (ln - this._current_index) % ln;
                }
                else if(this._current_index >= ln){
                    this.activeIndex = this._current_index % ln;
                }
            }
        },
        '=transition' : function(val){
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
            elm.controller = this.controller;
            elm.stack = this;
            elm.load();
            this._super(OjStack, '_addActiveElm', arguments);
        },
        '_removeActiveElm' : function(elm){
            elm.unload();
            elm.controller = null;
            elm.stack = null;
            this._super(OjStack, '_removeActiveElm', arguments)
        },

        '_onItemRemove' : function(evt){
            var item = evt.item,
                index = evt.index;
//				this._updateItemParent(index, null);
            this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, item, this._transition, index));
            if(this._active == item){
                var ln;
                if(this._current_index){
                    this.activeIndex = this._current_index - 1;
                }
                else if(ln = this.numElms){
                    this.activeIndex = ln - 1;
                }
                else{
                    this.activeIndex = [-1, false];
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
            var item = evt.item,
                index = evt.index;
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

        '=controller' : function(val){
            if(this._controller == val){
                return;
            }
            this._controller = val;
            this._controller.stack = this;
            // update the items in this stack with the latest
            if(this._active){
                this._active.controller = val;
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
		'BUTTON_PRESS' : 'onAlertButtonClick'
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
		'_template' : '<a><span var=icn v-align=m></span><span var=lbl v-align=m></span></a>',

		'_constructor' : function(/*label, url, target*/){
			this._super(OjLabel, '_constructor', []);
			this._processArguments(arguments, {
				'text' : undefined,
				'url' : undefined,
				'target' : undefined
			});
		},
		'_destructor' : function(){
			// just to make sure that the document mouse move event listener gets removed
			OJ.removeEventListener(OjUiEvent.MOVE, this, '_onMouseMove');
			this._super(OjLabel, '_destructor', arguments);
		},

		'_processAttribute' : function(dom, attr, context){
			if(attr.nodeName == 'href'){
				this.url = attr.value;
				return true;
			}
			return this._super(OjLabel, '_processAttribute', arguments);
		},
		'_redrawText' : function(){
            var self = this;
			self.lbl.text = (self.prefix || '') + (self.text || '') + (self.suffix || '');
		},
		'_updateIcon' : function(val){
            this.icn.removeAllChildren();
			if(val){
				this.icn.appendChild(val);
			}
		},

		'_onClick' : function(evt){
            var url = this.url;
			if(url){
                WindowManager.open(url, this.target, {
                    'width' : this.targetWidth,
                    'height' : this.targetHeight
                });
			}
		},
		'_onMouseOver' : function(evt){
			if(this._overIcon){
				OJ.addEventListener(OjUiEvent.MOVE, this, '_onMouseMove');
				this._updateIcon(this._overIcon);
			}
		},
		'_onMouseMove' : function(evt){
			if(!this.hitTestPoint(evt.pageX, evt.pageY)){
				OJ.removeEventListener(OjUiEvent.MOVE, this, '_onMouseMove');
				this._updateIcon(this._icon);
			}
		},
		'_onMouseDown' : function(evt){
			if(this._downIcon){
				this._updateIcon(this._downIcon);
				this.addEventListener(OjUiEvent.UP, this, '_onMouseUp');
			}
		},
		'_onMouseUp' : function(evt){
			this.removeEventListener(OjUiEvent.UP, this, '_onMouseUp');
			this._updateIcon(this._icon);
		},

		// GETTER & SETTER FUNCTIONS
		'=downIcon' : function(icon){
			if(this._downIcon == (icon = OjImage.image(icon))){
				return;
			}
			if(this._downIcon = icon){
				this.addEventListener(OjUiEvent.DOWN, this, '_onMouseDown');
			}
			else{
				this.removeEventListener(OjUiEvent.DOWN, this, '_onMouseDown');
				this.removeEventListener(OjUiEvent.UP, this, '_onMouseUp');
			}
		},
		'=icon' : function(icon){
            if(this._icon == (icon = OjImage.image(icon))){
				return;
			}
			this._updateIcon(this._icon = icon);
		},
		'=overIcon' : function(icon){
			if(this._overIcon == (icon = OjImage.image(icon))){
				return;
			}
			if(this._overIcon = icon){
				this.addEventListener(OjUiEvent.OVER, this, '_onMouseOver');
			}
			else{
				this.removeEventListener(OjUiEvent.OVER, this, '_onMouseOver');
				OJ.removeEventListener(OjUiEvent.MOVE, this, '_onMouseMove');
			}
		},
		'=url' : function(url){
			if(this._url = OjUrl.url(url)){
				this.addEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
			else{
				this.removeEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
		},
		'=target' : function(target){
			if(isComponent(target)){
				target = target.id;
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
        '_props_' : {
            'label' : null
        },
		'_default_h_align' : OjStyleElement.CENTER,

		'_constructor' : function(/*label, icon*/){
			this._super(OjLink, '_constructor', []);
			this._processArguments(arguments, {
				'text' : undefined,
				'icon' : undefined
			});
		},

		'redraw' : function(){
            if(this._super(OjLink, 'redraw', arguments)){
				// note: hack for webkit render bug
				if(OJ.engine == OJ.WEBKIT){
					this._setStyle('font-size', '1px');
					this._setStyle('font-size', null);
				}
				return true;
			}
			return false;
		},

		'.label' : function(){
      		return this.text;
		},
		'=label' : function(label){
            this.text = label;
		},
		'=isActive' : function(active){
			this._super(OjLink, '=isActive', arguments);
			if(this._icon){
				this._icon.isActive = active;
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
            'buttons' : null,
            'content' : null,
            'paneHeight' : null,
            'paneWidth' : null,
            'selfDestruct' : 0, // OjAlert.NONE
            'title' : null
        },
        '_template' : '<div class=flexbox><div var=underlay></div><div var=pane><div var=bar v-align=m></div><div class=content v-align=m><label var=container></label></div><div var=btns></div></div></div>',

        '_constructor' : function(/*content, title, buttons, cancel_label*/){
            this._super(OjComponent, '_constructor', []);
            // setup the display
            if(this.oj_class_name.indexOf('Alert') > -1){
                this.btns.appendChild(this.cancelBtn = new OjButton(OjAlert.OK));
                this.cancelBtn.addEventListener(OjUiEvent.PRESS, this, '_onCancelPress');
            }
            this._processArguments(arguments, {
                'content' : undefined,
                'title' : undefined,
                'buttons' : undefined,
                'cancelBtn.label' : OjAlert.CANCEL
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
                    OjAlertEvent.BUTTON_PRESS,
                    this.btns.indexOfChild(evt.currentTarget)
                )
            );
            WindowManager.hide(this);
        },
        '_onCancelPress' : function(evt){
            this.cancel();
        },
        'cancel' : function(){
            this.dispatchEvent(new OjEvent(OjEvent.CANCEL));
            WindowManager.hide(this);
        },
        'hideButtons' : function(){
            this.addCss('no-buttons');
            this.btns.hide();
        },
        'present' : function(){
            WindowManager.show(this);
        },
        'showButtons' : function(){
            this.removeCss('no-buttons');
            this.btns.show();
        },

        '.buttons' : function(){
            return this._buttons ? this._buttons.clone() : [];
        },
        '=buttons' : function(buttons){
            this._buttons = buttons = buttons ? buttons.clone() : [];
            var num_btns = buttons.length,
                ln = this.btns.numChildren - 1,
                diff = num_btns - ln, btn;
            if(diff > 0){
                for(; diff > 0; ){
                    this.btns.insertChildAt(btn = new OjButton(buttons[num_btns - (diff--)]), ln + 1);
                    btn.addEventListener(OjUiEvent.PRESS, this, '_onButtonClick');
                }
            }
            else if(diff < 0){
                for(; diff++ < 0; ){
                    OJ.destroy(this.btns.getChildAt(--ln - 1));
                }
            }
            for(; ln-- > 1;){
                btn = this.btns.getChildAt(ln);
                btn.label = buttons[ln];
            }
        },
        '.cancelLabel' : function(){
            return this.cancelBtn.label;
        },
        '=cancelLabel' : function(label){
            return this.cancelBtn.label = label;
        },
        '=content' : function(content){
            if(this._content == content){
                return;
            }
            this.container.removeAllChildren();
            this._content = content;
            if(isString(content)){
                this.container.text = content.replaceAll('\n', '<br />');
            }
            else{
                this.container.appendChild(content);
            }
        },
        '=title' : function(title){
            if(this._title == title){
                return;
            }
            this.bar.text = this._title = title;
        },
        '.paneHeight' : function(){
            return this.pane.height;
        },
        '=paneHeight' : function(val/*, unit*/){
            this.pane.height = Array.array(arguments);
        },
        '.paneWidth' : function(){
            return this.pane.width;
        },
        '=paneWidth' : function(val/*, unit*/){
            this.pane.width = Array.array(arguments);
        }
    },
    {
        'NONE' : 0,
        'SHALLOW' : 1,
        'DEEP' : 2,
        'OK' : 'Ok',
        'Cancel' : 'Cancel'
    }
);

OJ.extendClass(
    'OjModal', [OjAlert, OjINavController],
    {
        '_props_' : {
            'barVisible' : true,
            'buttonsVisible' : null,
            'closeVisible' : null,
            'isFullscreen' : false,
            'underlayVisible' : true
        },
        '_template' : '<div><div var=underlay></div><div var=pane><flownav var=bar v-align=m cancel-label=Close></flownav><navstack var=container class=content></navstack><div var=btns v-align=m></div></div></div>',

        '_constructor' : function(/*view, title*/){
            this._super(OjAlert, '_constructor', []);
            // setup controller stack relationship
            this.bar.stack = this.stack = this.container;
            this.closeVisible = true;
            this.buttonsVisible = false;
            // process arguments
            var args = arguments,
                ln = args.length;
            if(ln){
                this.addView(args[0]);
                if(ln > 1){
                    this.title = args[1];
                }
            }
            if(OJ.is_mobile){
                // TODO: Update this to use FontAwesome
                this.bar.cancelLabel = '&times;';
            }
        },
        '_destructor' : function(depth){
            this._unset('bar', depth || 0);
            this._unset('stack', depth || 0);
            return this._super(OjAlert, '_destructor', arguments);
        },

        '_onDrag' : function(evt){
            this.pane.x += evt.deltaX;
            this.pane.y += evt.deltaY;
        },
        '_onStackChange' : function(evt){
            // todo: OjModal - rethink how to autosize the modal to content
//				if(!this.getPaneWidth()){
//					print(evt.getView().getWidth());
//					this.setPaneWidth(evt.getView().getWidth());
//				}
//
//				if(!this.getPaneHeight()){
//					this.setPaneWidth(evt.getView().getWidth());
//				}
//            if(!this._stack.numElms()){
//                this.close();
//            }
        },

        '=barVisible' : function(val){
            if(this._barVisible = val){
                this.bar.show();
                //this.bar.addEventListener(OjDragEvent.DRAG, this, '_onDrag');
            }
            else{
                this.bar.hide();
                //this.bar.removeEventListener(OjDragEvent.DRAG, this, '_onDrag');
            }
        },
        '=buttonsVisible' : function(val){
            if(this._buttonsVisible = val){
                this.removeCss('no-buttons');
            }
            else{
                this.addCss('no-buttons');
            }
        },
        '.closeVisible' : function(){
            return this.bar.cancelVisible;
        },
        '=closeVisible' : function(val){
            this.bar.cancelVisible = val;
            if(val){
                this.bar.addEventListener(OjEvent.CANCEL, this, '_onCancelPress');
            }
            else{
                this.bar.removeEventListener(OjEvent.CANCEL, this, '_onCancelPress');
            }
        },
        '=isFullscreen' : function(val){
            if(this._isFullscreen = val){
                this.addCss('fullscreen');
            }
            else{
                this.removeCss('fullscreen');
            }
        },
        '=underlayVisible' : function(val){
            if(this._underlayVisible = val){
                this.underlay.show();
            }
            else{
                this.underlay.hide();
            }
        },

        '=buttons' : function(val){
            this._super(OjAlert, '=buttons', arguments);
            if(this.btns.numChildren){
                this.btns.show();
            }
            else{
                this.btns.hide();
            }
        },
        '=title' : function(title){
            this.bar.title = this._title = title;
        }
    }
);


OJ.extendManager(
    'WindowManager', 'OjWindowManager', [OjActionable],
    {
        'BLANK' : '_blank',
        'SELF' : '_self',
        'PARENT' : '_parent',
        'TOP' : '_top',
        'WINDOW' : '_window',
        'HIDE' : 'onWindowHide',
        'SHOW' : 'onWindowShow',
        '_props_' : {
            'alertClass' : OjAlert,
            'modalClass' : OjModal
        },
        '_get_props_' : {
            'holder' : null
        },
        '_constructor' : function(manager){
            this._super(OjActionable, '_constructor', []);
            if(manager){
                this._modals = manager._modals;
                this._modal_holder = manager._modal_holder;
                this._overlay = manager._overlay;
                if(!OJ.is_ready){
                    OJ.removeEventListener(OjEvent.READY, manager, '_onOjReady');
                    OJ.addEventListener(OjEvent.READY, this, '_onOjReady');
                }
                OJ.destroy(manager);
            }
            else{
                this._modals = [];
                this._modal_holder = new OjStyleElement();
                this._modal_holder.addCss('WindowManager');
                this._modal_holder.hide();
                if(OJ.is_ready){
                    this._onOjReady(null);
                }
                else{
                    OJ.addEventListener(OjEvent.READY, this, '_onOjReady');
                }
            }
        },

        '_calcWindowWidth' : function(width, fullscreen){
            var vp = OJ.viewport;
            if(fullscreen){
                return vp.width;
            }
            if(width){
                return width;
            }
            if(OJ.is_tablet && vp.width > 540){
                return 540;
            }
            return Math.round(vp.width * .85);
        },
        '_calcWindowHeight' : function(height, fullscreen){
            var vp = OJ.viewport;
            if(fullscreen){
                return vp.height;
            }
            if(height){
                return height;
            }
            if(OJ.is_tablet && vp.height > 620){
                return 620;
            }
            return Math.round(vp.height * .85);
        },
        '_isMobileModal' : function(modal){
            return modal.is(OjModal) && OJ.is_mobile
        },
        '_transIn' : function(modal){
            var anim = new OjFade(modal, OjFade.IN, 250),
                pane = modal.pane,
                h, y;
            // transition the alert/modal
            anim.addEventListener(OjTweenEvent.COMPLETE, this, '_onShow');
            anim.start();
            if(this._isMobileModal(modal)){
                h = pane.height;
                y = pane.y;
                pane.y += h;
                // transition the modal
                anim = new OjMove(pane, OjMove.Y, y, anim.duration, OjEasing.OUT);
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
                h = pane.height;
                y = pane.y;
                // transition the modal
                anim = new OjMove(modal.pane, OjMove.Y, y + h, anim.duration, OjEasing.OUT);
                anim.start();
            }
        },
        '_onShow' : function(evt){
            var modal = evt.currentTarget.target;
            // destroy tween
            evt = OJ.destroy(evt);
            // dispatch show event
            modal.dispatchEvent(new OjEvent(this.SHOW));
        },

        '_onHide' : function(evt){
            var holder = this._modal_holder,
                modal = evt.currentTarget.target;
            // remove the modal from the holder
            holder.removeChild(modal);
            // destroy the tween
            evt = OJ.destroy(evt);
            // check to see if the modal holder is empty
            // if it is empty then hide it since there is nothing more to show
            if(!holder.numChildren){
                holder.hide();
            }
            // dispatch hide event
            modal.dispatchEvent(new OjEvent(this.HIDE));
            // check to see if this modal is self destructing
            var destruct = modal.selfDestruct;
            if(destruct){
                OJ.destroy(modal, destruct);
            }
        },
        '_onOjReady' : function(evt){
            OJ.removeEventListener(OjEvent.READY, this, '_onOjReady');
            document.body.appendChild(this._modal_holder.dom);
            this._modal_holder._setIsDisplayed(true);
        },

        'alert' : function(/*message, title, buttons, cancel_label*/){
            var alrt = this.makeAlert.apply(this, arguments);
            this.show(alrt);
            return alrt;
        },
        'call' : function(phone){
            window.location.href = 'tel:' + phone.path.substring(1);
        },
        'close' : function(){
            window.close();
        },
        'email' : function(email){
            window.location.href = 'mailto:' + email.path.substring(1);
        },
        'browser' : function(url, title, width, height, fullscreen){
            var iframe = new OjIframe(url),
                modal = this.makeModal(iframe, title);
            if(isUnset(fullscreen)){
                fullscreen = this._isMobileModal(modal)
            }
            // update iframe dims
            iframe.width = [100, '%'];
            iframe.height = [100, '%'];
            // update the modal
            modal.addCss('browser');
            modal.selfDestruct = OjAlert.DEEP;
            modal.paneWidth = this._calcWindowWidth(width, fullscreen);
            modal.paneHeight = this._calcWindowHeight(height, fullscreen);
            return this.show(modal);
        },
        'modal' : function(content, title, width, height, fullscreen){
            var args = arguments,
                modal = this.makeModal.apply(this, args);
            if(isUnset(fullscreen)){
                fullscreen = this._isMobileModal(modal);
            }
            modal.selfDestruct = OjAlert.DEEP;
            modal.isFullscreen = fullscreen;
            modal.paneWidth = this._calcWindowWidth(width, fullscreen);
            modal.paneHeight = this._calcWindowHeight(height, fullscreen);
            this.show(modal);
            return modal;
        },
        'hide' : function(modal){
            var modals = this._modals,
                index;
            if((index = modals.indexOf(modal)) == -1){
                return;
            }
            modals.removeAt(index);
            this._transOut(modal);
        },
        'hideLoading' : function(/*overlay*/){
            var args = arguments,
                overlay = args.length ? args[0] : this._overlay;
            if(overlay){
                overlay.hide();
            }
        },
        'image' : function(url, title, width, height, fullscreen){
            var args = arguments,
                ln = args.length,
                viewer = new OjImageViewer(url),
                modal = this.makeModal(viewer, title);
            viewer.width = [100, '%'];
            viewer.height = [100, '%'];
            modal.selfDestruct = OjAlert.DEEP;
            modal.paneWidth = this._calcWindowWidth(width, fullscreen);
            modal.paneHeight = ln > 3 ? args[3] : this._calcWindowHeight(height, fullscreen);
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
            alrt.paneWidth = ln > 4 ? args[4] : 400;
            if(ln > 5){
                alrt.paneHeight = args[5];
            }
            return alrt;
        },
        'makeModal' : function(/*content, title*/){
            return this._modalClass.makeNew(arguments);
        },
        'moveToTop' : function(modal){
            this._modal_holder.moveChild(modal, this._modal_holder.numChildren - 1);
        },
        'open' : function(url/*, target, params*/){
            // check for email
            if(url.protocol == 'mailto'){
                return this.email(url);
            }
            // check for phone call
            if(url.protocol == 'tel'){
                return this.call(url);
            }
            var args = arguments,
                ln = args.length,
                target = ln > 1 ? args[1] : this.BLANK,
                params = ln > 2 ? args[2] : {},
                specs = [], key,
                vp = OJ.viewport, scrn = OJ.screen;
            // check for text message
            if(url.protocol == 'sms' || url.protocol == 'mms'){
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
                    specs.append(key + '=' + params[key]);
                }
                if(target == this.WINDOW){
                    // create a new target id
                    target = OJ.guid();
                }
            }
            args = [url.toString()];
            if(target != this.BLANK){
                args.append(target);
                args.append(specs.join(','));
            }
            window.open.apply(window, args);
            return target;
        },
        'show' : function(modal){
            var holder = this._modal_holder;
            // store the modal
            this._modals.append(modal);
            // make sure the holder is visible
            if(!holder.isVisible){
                holder.show();
            }
            // prep the modal
            modal.show();
            modal.alpha = 0;
            // add the modal
            holder.appendChild(modal);
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
            overlay.message = msg;
            overlay.icon = icon;
            overlay.show(this._modal_holder);
            return overlay;
        }
    }
);

OJ.extendComponent(
    'OjItemRenderer', [OjComponent],
    {
        '_props_' : {
            'data' : null,
            'group' : null
        },

        '_constructor' : function(/*group, data*/){
            this._super(OjComponent, '_constructor', []);
            this._processArguments(arguments, {
                'group' : null,
                'data' : null
            });
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

        '=data' : function(data){
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
    'OjList', [OjCollectionComponent],
    {
        '_default_direction' : 'vert',  // OjList.VERTICAL
        '_default_renderer' : OjItemRenderer,
        '_props_' : {
            'direction' : null
        },
        '_constructor' : function(elms, item_renderer, direction){
            this._super(OjCollectionComponent, '_constructor', []);
            if(item_renderer){
                this.itemRenderer = item_renderer;
            }
            this._processArguments(arguments, {
                'elms' : undefined,
                'itemRenderer' : this._default_renderer,
                'direction' : this._default_direction
            });
        },
        '_updateListCss' : function(){
            if(this.container.numChildren){
                this.removeCss('is-empty');
            }
            else{
                this.addCss('is-empty');
            }
        },

        '_onItemAdd' : function(evt){
            this.container.insertChildAt(this.renderItem(evt.item, evt.index), evt.index);
            this._updateListCss();
            this._super(OjCollectionComponent, '_onItemAdd', arguments);
        },
        '_onItemMove' : function(evt){
            var i = evt.index;
            this.container.moveChild(this.renderItem(evt.item, i), i);
            this._super(OjCollectionComponent, '_onItemMove', arguments);
        },
        '_onItemRemove' : function(evt){
            var item = this.container.removeChildAt(evt.index);
            this._updateListCss();
            this._super(OjCollectionComponent, '_onItemRemove', arguments);
            this._releaseItem(item);
        },
        '_onItemReplace' : function(evt){
            var i = evt.index,
                item = this.container.replaceChildAt(this.renderItem(evt.item, i), i);
            this._super(OjCollectionComponent, '_onItemReplace', arguments);
            this._releaseItem(item);
        },

        '_onItemPress' : function(evt){
            this._super(OjCollectionComponent, '_onItemPress', arguments);
        },
        '_onItemOver' : function(evt){
            this._super(OjCollectionComponent, '_onItemOver', arguments);
        },
        '_onItemOut' : function(evt){
            this._super(OjCollectionComponent, '_onItemOut', arguments);
        },

        '=direction' : function(val){
            if(this._direction == val){
                return;
            }
            if(this._direction){
                this.removeCss(this._direction);
            }
            this.addCss(this._direction = val);
            return true;
        },
        '=elms' : function(val){
            var self = this;
            if(self._elms == val){
                return;
            }
            self._super(OjCollectionComponent, '=elms', arguments);
            // remove all the old rendered items
            var key,
                container = self.container,
                rendered = self._rendered;
            container.removeAllChildren();
            for(key in rendered){
                OJ.destroy(rendered[key]);
            }
            self._rendered = {};
            // render the new items
            self._elms.forEachReverse(function(item, i){
                container.prependChild(self.renderItem(item, i));
            });
            self._updateListCss();
        }
    },
    {
        'HORIZONTAL' : 'horz',
        'VERTICAL' : 'vert',
        '_TAGS' : ['list']
    }
);

OJ.extendClass(
	'OjLabelItemRenderer', [OjItemRenderer],
	{
		'_template' : '<div><label var=lbl></label></div>',

		'_redrawData' : function(){
			if(this._super(OjItemRenderer, '_redrawData', arguments)){
				this.lbl.text = this._data;
				return true;
			}
			return false;
		}
	}
);

OJ.extendComponent(
	'OjItemEditor', [OjItemRenderer],
	{
        '_props_' : {
            'itemRenderer' : OjLabelItemRenderer
        },
		'_template' : '<div><div var=holder></div><div var=actions v-align=m><button var=delete_btn on-press=_onDeletePress>&times;</button></div></div>',

        '_resetItem' : function(){
            if(this.item){
                this.holder.removeAllChildren();
                this.item = null;
            }
        },
		'_redrawData' : function(){
			if(this._super(OjItemRenderer, '_redrawData', arguments)){
                this._resetItem();
                var data = this.data,
                    cls = itemRenderer;
                if(data){
                    this.holder.appendChild(this.item = new cls(this.group, data));
                }
				return true;
			}
			return false;
		},

        '_onDeletePress' : function(evt){
            this.group.removeElm(this.data);
        },

        '=group' : function(group){
            this._super(OjItemRenderer, '=group', arguments);
            if(group){
                this.itemRenderer = group.itemRenderer;
            }
        }
	}
);

//
OJ.extendComponent(
    'OjEditableList', [OjList],
    {
        '_props_' : {
            'itemEditor' : OjItemEditor
        },

        '_getItemRenderer' : function(){
            return this.itemEditor;
        },
//
//
//        '_onElmDelete' : function(evt){
//
//        },
//
//
//        'renderItem' : function(item){
//            var elm = this._super(OjList, 'renderItem', arguments);
//
//            if(elm){
//                elm.addEventListener(this._static.DELETE, this, '_onElmDelete');
//            }
//
//            return elm;
//        }
        '=itemEditor' : function(val){
            val = isString(val) ? OJ.stringToClass(val) : val;
            if(val == this._itemEditor){
                return;
            }
            this._itemEditor = val;
            return true;
        }
    },
    {
        '_TAGS' : ['elist']
    }
);


// TODO: title property and title elm may be conflicting
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
			this.actuator.addEventListener(OjUiEvent.PRESS, this, '_onActuatorClick');
			this.removeChild(this.actuator);
			// process arguments
			if(ln){
				this.title = args[0];
			}
		},

		'_processDomSourceChild' : function(dom_elm, component){
			var tag = dom_elm.tagName;
			if(tag && tag.toLowerCase() == 'legend'){
				var ln = dom_elm.childNodes.length, child;
				for(; ln--;){
					child = dom_elm.childNodes[ln];
					if(OjElement.isTextNode(child)){
						this.title = child.nodeValue;
					}
				}
				return null;
			}
			return this._processChild(dom_elm, component);
		},
		'_redrawActuator' : function(){
			if(this._is_displayed){
				if(this._collapsable){
					this.actuator.height = this.legend.height;
					if(this._isCollapsed){
						if(this._collapsedIcon || this._collapsedText){
							this.actuator.icon = this._collapsedIcon;
							this.actuator.text = this._collapsedText;
							this.insertChildAt(this.actuator, 1);
						}
						else{
							this.removeChild(this.actuator);
						}
					}
					else{
						if(this._expandedIcon || this._expandedText){
							this.actuator.icon = this._expandedIcon;
							this.actuator.text = this._expandedText;
							this.insertChildAt(this.actuator,  1);
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
					this.legend.appendChild(this.title = new OjLabel(this._title));
				}
				else if(this.title){
					this.title.text = this._title;
				}
				if(!this.icon && this._icon){
					this.legend.appendChild(this.icon = new OjImage(this._icon));
				}
				else if(this.icon){
					this.icon.source = this._icon;
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
			this.height = OjStyleElement.AUTO;
			OJ.destroy(evt);
		},

		'collapse' : function(){
			var tween;
			if(this._isCollapsed){
				return;
			}
			this.isCollapsed = true;
			tween = new OjResize(this, OjResize.HEIGHT, this.legend.height, 250, OjEasing.OUT);
			tween.start();
			this._redrawActuator();
		},
		'expand' : function(){
			var tween;
			if(!this._isCollapsed){
				return;
			}
			this.isCollapsed = false;
			tween = new OjResize(this, OjResize.HEIGHT, this.legend.height + this.container.height, 250, OjEasing.OUT);
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

		'=collapsable' : function(val){
			if(this._collapsable == val){
				return;
			}
			this._collapsable = val;
			this._redrawActuator();
		},
		'=collapsedIcon' : function(val){
			if(this._collapsedIcon == val){
				return;
			}
			this._collapsedIcon = val;
			this._redrawActuator();
		},
		'=collapsedText' : function(val){
			if(this._collapsedText == val){
				return;
			}
			this._collapsedText = val;
			this._redrawActuator();
		},
		'=expandedIcon' : function(val){
			if(this._expandedIcon == val){
				return;
			}
			this._expandedIcon = val;
			this._redrawActuator();
		},
		'=expandedText' : function(val){
			if(this._expandedText == val){
				return;
			}
			this._expandedText = val;
			this._redrawActuator();
		},
		'=icon' : function(val){
			if(this._icon == val){
				return;
			}
			this._icon = val;
			this._redrawLegend();
		},
		'=isCollapsed' : function(val){
			if(this._isCollapsed == val){
				return;
			}
			if(this._isCollapsed = val){
				this.addCss('collapsed');
				this.dispatchEvent(new OjEvent(this._static.COLLAPSE));
			}
			else{
				this.removeCss('collapsed');
				this.dispatchEvent(new OjEvent(this._static.EXPAND));
			}
		},
		'=title' : function(val){
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
                'icon' : null
            });
			this.removeChild(this.label);
		},
		'_processDomSourceChildren' : function(dom_elm, component){
			var txt = dom_elm.innerHTML;
			if(!isEmpty(txt)){
				this.icon = new OjImage(txt.trim());
				return null;
			}
			return this._super(OjButton, '_processDomSourceChildren', arguments);
		},

		'_makeLabel' : function(){
			// don't do anything since we don't need a label
		},

		'.image' : function(){
			return this.icon;
		},
		'=image' : function(img){
			this.icon = img;
		}
	},
	{
		'_TAGS' : ['imagebutton']
	}
);

OJ.extendClass(
    'OjData', [OjActionable],
    {
        '_props_' : {
            'id' : null,
            'label' : null
        },

        '_constructor' : function(/*id, label*/){
            this._super(OjActionable, '_constructor', []);
            this._processArguments(arguments, {
                'id' : undefined,
                'label' : undefined
            });
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
				this._orientation = args.removeAt(1)[0];
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


OJ.extendClass(
	'OjOption', [OjItemRenderer],
	{
		'_props_' : {
			'dataRenderer' : null,
			'isSelected'   : false
		},
//		'_selector' : null,
		'_v_align' : OjStyleElement.MIDDLE,
		'_template' : '<div><div var=indicator v-align=m><input var=input type=checkbox /></div></div>',

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
				this.dataRenderer = renderer;
				this.addEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
		},
		'_destructor' : function(){
			this._selector = this._dataRenderer = null;
			return this._super(OjItemRenderer, '_destructor', arguments);
		},

		'_processDomSourceChild' : function(dom_elm, component){
			if(!isEmpty(dom_elm.nodeValue)){
				this.data = (this._data ? this._data : '') + dom_elm.nodeValue;
				return null;
			}
			return this._super(OjItemRenderer, '_processDomSourceChild', arguments);
		},
		'_redrawData' : function(){
			if(this.option && this._super(OjItemRenderer, '_redrawData', arguments)){
				this.option.data = this._data;
				return true;
			}
			return false;
		},

		'_onClick' : function(evt){
			this.isSelected = !this.isSelected;
		},

		'=dataRenderer' : function(val){
			if(isString(val)){
				val = OJ.stringToClass(val);
			}
			if(this._dataRenderer == val){
				return;
			}
			this._unset('option');
			this._dataRenderer = val;
            this.option = new val(this._group, this._data)
            this.option.addCss('option');
			this.appendElm(this.option);
		},
		'=group' : function(group){
			if(this._group == group){
				return;
			}
			this._super(OjItemRenderer, '=group', arguments);
			var owner;
			if(this._group && (owner = this._group.owner) && owner.is(OjSelector)){
				this._selector = owner;
				this.dataRenderer = owner.itemRenderer;
				this.removeEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
			else{
				this._selector = null;
				this.dataRenderer = OjLabelItemRenderer;
				this.addEventListener(OjUiEvent.PRESS, this, '_onClick');
			}
		},
		'=isSelected' : function(val){
			if(this._isSelected == val){
				return;
			}
			if(this._isSelected = val){
				this.addCss('selected');
				this.input.dom.checked = true;
			}
			else{
				this.removeCss('selected');
				this.input.dom.checked = false;
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
            'name' : null,
            'placeholder' : null,
            'prefix' : null,
            'required' : false,
            'suffix' : null,
            'title' : null,
            'validators' : null,
            'value' : null
        },
        '_ready' : false, '_template' : '<div><div var=wrapper><label var=lbl></label><div var=psuedoInput><span var=prefix_lbl class=prefix></span><span var=stem><input var=input type=hidden /><label var=dflt></label></span><span var=suffix_lbl class=suffix></span></div></div></div>',

        '_constructor' : function(/*name, label, value, validators*/){
            this._super(OjComponent, '_constructor', []);
            this._errors = [];
            this._validators = [];
            // detect default mode
            var has_input = 'input' in this;
            if(has_input && !isUndefined(this.input.dom.placeholder)){
                this._unset('dflt');
            }
            this._processArguments(arguments, {
                'name' : null,
                'label' : null,
                'value' : null,
                'validators' : []
            });
            if(has_input){
                if(!this._value){
                    this.value = this.input.dom.value;
                }
                this.input.addEventListener(OjFocusEvent.IN, this, '_onInputFocusIn');
                this.input.addEventListener(OjFocusEvent.OUT, this, '_onInputFocusOut');
                this.input.addEventListener(OjDomEvent.CHANGE, this, '_onInputChange');
            }
            if(this.oj_class_name == 'OjInput'){
                this.hide();
            }
            else{
                var ln = this._supers.length,
                    cls;
                for(; ln--;){
                    cls = this._supers[ln];
                    this.addCss(OJ.classToString(cls));
                    if(cls == OjInput){
                        break;
                    }
                }
            }
            this.addEventListener(OjUiEvent.PRESS, this, '_onClick');
            this._ready = true;
        },

        '_formatError' : function(error){
            return  OJ.tokensReplace(error, this._formatErrorTokens());
        },
        '_formatErrorTokens' : function(){
            return {
                'INPUT' : this.title || this.label || this.placeholder || this.name,
                'VALUE' : this.value
            };
        },
        '_redrawDefault' : function(){
            if(!this.dflt || isEmpty(this.placeholder) || !isEmpty(this.value)){
                this.addCss('no-default');
            }
            else{
                this.removeCss('no-default');
            }
            return true;
        },
        '_redrawValue' : function(){
            if(this.input){
                var dom = this.input._dom,
                    val = this._value;
                if(dom.value != val){
                    dom.value = val;
                }
            }
        },
        '_onDefaultClick' : function(evt){
            if(this.input){
                this.input.focus();
            }
        },
        '_onInputFocusIn' : function(evt){
            this.addCss('focus');
        },
        '_onInputFocusOut' : function(evt){
            this.removeCss('focus');
        },
        '_onInputChange' : function(evt){
            this.value = this.input.dom.value;
        },
        '_onClick' : function(evt){
            if(this.input && !this.input.hasFocus()){
                this.focus();
            }
        },

        'blur' : function(){
            if(this.input){
                this.input.blur();
            }
        },
        'focus' : function(){
            if(this.input){
                this.input.focus();
            }
        },
        'isValid' : function(){
            this._errors = [];
            if(this._required && isEmpty(this._value)){
                this._errors.append(this._formatError(OjInput.REQUIRED_ERROR));
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

        '=placeholder' : function(val){
            if(this._placeholder == val){
                return;
            }
            this._placeholder = val;
            if(this.dflt){
                if(val){
                    this.dflt.addEventListener(OjUiEvent.PRESS, this, '_onDefaultClick');
                }
                else{
                    this.dflt.removeEventListener(OjUiEvent.PRESS, this, '_onDefaultClick');
                }
                this.dflt.text = val;
                this._redrawDefault();
            }
            else if(this.input){
                this.input.setAttr('placeholder', val);
            }
        },
        '.error' : function(){
            return this._errors && this._errors.length ? this._errors[0] : null;
        },
        '.errors' : function(){
            return this._errors ? this._errors.clone() : [];
        },
        '.form' : function(){
            if(!this._form){
                var p = this.parentComponent;
                while(p && p != OJ){
                    if(p.is(OjForm)){
                        this._form = p;
                        break;
                    }
                    p = p.parentComponent;
                }
            }
            return this._form;
        },
        '=label' : function(lbl){
            this.lbl.text = this._label = lbl;
            if(isEmpty(this._label)){
                this.addCss('no-label');
            }
            else{
                this.removeCss('no-label');
            }
        },
        '=name' : function(nm){
            if(this._name == nm){
                return;
            }
            if(this._name){
                this.removeCss(this._name.toLowerCase() + '-input');
            }
            if(this._name = nm){
                this.addCss(nm.toLowerCase() + '-input');
            }
        },
        '.notes' : function(){
            return this.notes ? this.notes.text : null;
        },
        '=notes' : function(val){
            if(!val){
                this._unset('notes_lbl');
                return;
            }
            if(!this.notes_lbl){
                this.notes_lbl = new OjLabel();
                this.notes_lbl.css = 'notes';
                this.psuedoInput.appendChild(this.notes_lbl);
            }
            this.notes_lbl.text = val;
        },
        '=prefix' : function(prefix){
            if(isString(prefix)){
                this.prefix_lbl.text = this._prefix = prefix;
            }
            else{
                if(this._prefix){
                    if(isString(this._prefix)){
                        this.prefix_lbl.removeAllChildren();
                    }
                    else{
                        this.prefix_lbl.removeChild(this._prefix);
                    }
                }
                this.prefix_lbl.appendChild(this._prefix = prefix);
            }
        },
        '=suffix' : function(suffix){
            if(isString(suffix)){
                this.suffix_lbl.text = this._suffix = suffix;
            }
            else{
                if(this._suffix){
                    if(isString(this._suffix)){
                        this.suffix_lbl.removeAllChildren();
                    }
                    else{
                        this.suffix_lbl.removeChild(this._suffix);
                    }
                }
                this.suffix_lbl.appendChild(this._suffix = suffix);
            }
        },
        '=validators' : function(validators){
            this._validators = Array.array(validators);
        },
        '.value' : function(){
            return this._value;
        },
        '=value' : function(value){
            if(value == this._value){
                return;
            }
            this._value = value;
            this._redrawValue();
            this._redrawDefault();
            if(this._ready){
                this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
            }
            return true;
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
//		'_options' : null,  '_options_dp' : null,  '_options_index' : null,  '_selected' : null,
//
//    '_selected_index' : null,  '_trigger_evt' : null,  '_tween' : null,  '_list' : null,
        '_list_visible' : false, '_ignore_click' : false, '_allow_none' : false, '_none_lbl' : '-- Select -- ',

        '_constructor' : function(/*name, label, value, options*/){
            var ln = arguments.length;
            this._options_index = [];
            this._super(OjInput, '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);
            this._list = new OjList();
            this._list.addEventListener(OjCollectionEvent.ITEM_PRESS, this, '_onItemClick');
            this._options_dp = this._list.dataProvider;
            if(ln > 2){
                if(ln > 3){
                    this.options = arguments[3];
                }
                this.value = arguments[2];
            }
            // setup event listeners
//			this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');
//
//			this.psuedoInput.addEventListener(OjUiEvent.PRESS, this, '_onClick');
        },
        '_setDom' : function(dom_elm){
            this._super(OjInput, '_setDom', arguments);
            var select = new OjStyleElement('<select class="input"></select>');
            this.stem.replaceChild(this.input, select);
            this.input = select;
            this.dflt.hide();
        },
        '_showList' : function(){
            // check to see if the list is already shown
            if(this._list_visible){
                return;
            }
            // prepare the list so we can extract the height and animate it in
            this._list.alpha = 0;
            this._list.show();
            // get the actual height of the list
            var h = this._list.height;
            // now set it back to 0 so we can animate it to its full height
            this._list.height = 0;
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
            OJ.addEventListener(OjUiEvent.PRESS, this, '_onPageClick');
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
            OJ.removeEventListener(OjUiEvent.PRESS, this, '_onPageClick');
            this._trigger_evt = null;
            this._list_visible = this._ignore_click = false;
        },

        '_redrawList' : function(){
            this.input.removeAllChildren();
            var ln = this._options.length;
            for(; ln--;){
                this.input.insertChildAt(
                    new OjStyleElement(
                        OJ.tokensReplace(
                            '<option value="[%value]">[%label]</option>',
                            {
                                'value' : this._options[ln].id,
                                'label' : this._options[ln].label
                            }
                        )
                    ),
                    0
                );
            }
            return;
//			var old_ln  = this._options_dp.numItems(),
//          new_ln = 0, key;
//
//			this._options_index = [];
//
//			for(key in this._options){
//				if(old_ln > new_ln){
//					if(this._options_dp.getItemAt(new_ln) != this._options[key]){
//						this._options_dp.setItemAt(this._options[key], new_ln);
//					}
//				}
//				else{
//					this._options_dp.addItem(this._options[key]);
//				}
//
//				this._options_index.push(key);
//
//				new_ln++;
//			}
//
//			for(; old_ln-- > new_ln; ){
//				this._options_dp.removeItemAt(old_ln);
//			}
//
//			if(this._allow_none){
//				if(this._options_dp.getItemAt(0) != this._none_lbl){
//					this._options_dp.addItemAt(this._none_lbl, 0);
//				}
//			}
//			else if(this._options_dp.getItemAt(0) == this._none_lbl){
//				this._options_dp.removeItemAt(0);
//			}
        },
        '_redrawValue' : function(){
//      this.input.dom.value = this._value;
            return;
//			var value,
//          item_renderer = this.getItemRenderer();
//
//			if(
//				!this.valueHldr.numChildren ||
//					!(value = this.valueHldr.getChildAt(0)).is(item_renderer)
//				){
//				this.valueHldr.removeAllChildren();
//
//				this.valueHldr.appendChild(new item_renderer(this._selected));
//			}
//			else{
//				value.setData(this._selected);
//			}
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
            this.selected = evt.item;
            this._ignore_click = true;
        },
        '_onPageClick' : function(evt){
            if(this._trigger_evt == evt){
                return;
            }
            this._hideList();
        },
        '_onTween' : function(evt){
            this._list.height = OjStyleElement.AUTO;
            OJ.destroy(this._tween, true);
        },

        '.allowNone' : function(){
            return this._allow_none;
        },
        '=allowNone' : function(allow_none){
            this._allow_none = allow_none;
        },
        '.itemRenderer' : function(){
            return this._list.itemRenderer;
        },
        '=itemRenderer' : function(item_renderer){
            this._list.itemRenderer = item_renderer;
            this._redrawValue();
        },
        '.options' : function(){
            return this._options;
        },
        '=options' : function(options){
            if(options == this._options){
                return;
            }
            var i;
            this._options = [];
            if(isObject(options)){
                for(i in options){
                    this._options.append(new OjData(i, options[i]));
                }
            }
            else if(isArray(options) && (i = options.length) && !isObject(options[0])){
                for(; i--;){
                    this._options.prepend(new OjData(options[i], options[i]));
                }
            }
            this._redrawList();
            this._redrawValue();
            this.value = this._value;
            return this._options;
        },
        '.selected' : function(){
            return this._selected;
        },
        '=selected' : function(selected){
            if(this._selected != selected){
                if(this._options){
                    var key;
                    for(key in this._options){
                        if(this._options[key] == selected){
                            this.value = key;
                            return;
                        }
                    }
                    if(this._allow_none){
                        this.value = null;
                    }
                    else{
                        this.selectedIndex = 0;
                    }
                }
                else{
                    this._selected = selected;
                }
            }
        },
        '.selectedIndex' : function(){
            return this._selected_index;
        },
        '=selectedIndex' : function(index){
            if(this._selected_index != index){
                if(this._options){
                    this.value = this._options_index[index];
                }
                else{
                    this._selected_index = index;
                }
            }
        },
        '.value' : function(){
            var ln = this._options.length,
                id = this.input.dom.value,
                option, option_id;
            for(; ln--;){
                option = this._options[ln];
                option_id = option.id;
                if(option_id == id){
                    return option.is(OjData) ? option_id : option;
                }
            }
            return null;
        },
        '=value' : function(value){
            if(isEmpty(value)){
                value = null;
            }
            else if(!isObject(value)){
                var ln = this._options.length;
                for(; ln--;){
                    if(this._options[ln].id == value){
                        value = this._options[ln];
                        break;
                    }
                }
                if(!isObject(value)){
                    value = null;
                }
            }
//			if(this._value != value || (isNull(this._selected_index) && this._options)){
//				if(this._options){
//					var cnt, ln = cnt = this._options_index.length;
//
//					for(; ln--;){
//						if(this._options_index[ln] == value){
//							break;
//						}
//					}
//
//					if(cnt){
//						if(ln == -1){
//							if(this._allow_none){
//								this._selected_index = null;
//								this._selected = this._none_lbl;
//
//								value = null
//							}
//							else{
//								this._selected_index = 0;
//
//								value = this._options_index[0];
//
//								this._selected = this._options[value];
//							}
//						}
//						else{
//							this._selected_index = ln;
//
//							this._selected = this._options[value];
//						}
//					}
//					else{
//						this._selected_index = null;
//						this._selected = this._allow_none ? this._none_lbl : null;
//
//						value = null;
//					}
//
//					ln = cnt = null;
//				}
//				else{
//					this._selected_index = null;
//					this._selected = this._none_lbl;
//					this._value = null;
//				}
//
//				this._redrawValue();
            if(this._super(OjInput, '=value', [value])){
                this.input.dom.value = value ? value.id : null;
            }
//			}
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
        '_get_props_' : {
            'type' : 'text'
        },

		'_constructor' : function(/*name, label, value, validators*/){
			this._super(OjInput, '_constructor', arguments);
			this.input.addEventListener(OjKeyboardEvent.UP, this, '_onInputChange');
		},

		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);
			this.input.setAttr('type', this._type);
		},
        '_formatErrorTokens' : function(){
            var tokens = this._super(OjInput, '_formatErrorTokens', arguments);
            tokens.MAX = this._maxLength;
            tokens.MIN = this._minLength;
            return tokens;
        },

		'isValid' : function(){
			var valid = this._super(OjInput, 'isValid', arguments);
			var ln = this._value ? this._value.length : 0;
			if(this._minLength && ln < this._minLength){
                this._errors.append(this._formatError(OjTextInput.MIN_LENGTH_ERROR));
				valid = false;
			}
			if(this._maxLength && ln > this._maxLength){
				this._errors.append(this._formatError(OjTextInput.MAX_LENGTH_ERROR));
				valid = false;
			}
			return valid;
		},
		'=value' : function(value){
            if(isSet(value)){
                value = String.string(value);
                if(value.length > this._maxLength){
    //				this.input._dom.value = value.slice(0, this._maxLength);
    //
    //				return;
                    value = value.slice(0, this._maxLength);
                }
            }
			return this._super(OjInput, '=value', [value]);
		}
	},
	{
        'EMAIL' : 'email',
        'TEXT' : 'text',
        'NUMBER' : 'number',
        'SECURE' : 'password',
		'MIN_LENGTH_ERROR' : '[%INPUT] must be at least [%MIN] characters long.',
		'MAX_LENGTH_ERROR' : '[%INPUT] must be no more than [%MAX] characters long.',
		'_TAGS' : ['textinput']
	}
);

OJ.extendComponent(
    'OjEmailInput', [OjTextInput],
    {
        '_props_' : {
            'maxLength' : 254,
            'minLength' : 3
        },
        '_type' : OjTextInput.EMAIL,

        'isValid' : function(){
            var valid = this._super(OjTextInput, 'isValid', arguments);
            if(!isEmpty(this._value) && !this._static.isValidEmail(this._value)){
                this._errors.append(this._formatError(OjEmailInput.INVALID_ERROR));
                valid = false;
            }
            return valid;
        },

        '=maxLength' : function(val){
            throw new Error('Cannot set the max length of an email. This is a fixed value.');
        },
        '=minLength' : function(val){
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

OJ.extendComponent(
    'OjNumberInput', [OjTextInput],
    {
        '_type' : OjTextInput.NUMBER,
        '.value' : function(){
            var val = this._super(OjTextInput, '.value', []);
            if(isEmpty(val)){
                return 0;
            }
            return parseFloat(val);
        }
    },
    {
        '_TAGS' : ['numinput']
    }
);

OJ.extendComponent(
    'OjSecureInput', [OjTextInput],
    {
        '_type' : OjTextInput.SECURE
    },
    {
        '_TAGS' : ['secureinput']
    }
);


OJ.extendClass(
	'OjDateInput', [OjTextInput],
	{
		'_onFocusIn' : function(evt){
			this._super(OjTextInput, '_onFocusIn', arguments);
			//showCalendarControl(this.dom);
		}
	}
);


OJ.extendClass(
	'OjValue', [OjComponent],
	{
        '_props_' : {
            'itemRenderer' : OjLabelItemRenderer,
            'label' : null,
            'name' : null,
            'value' : null
        },
		'_template' : '<div><div var=wrapper><label var=label></label><div var=value></div></div></div>',
//		'_label' : null, '_name': null,  '_value' : null,

		'_constructor' : function(/*name, label, value*/){
			this._super(OjComponent, '_constructor', []);
			this._processArguments(arguments, {
                'name' : null,
                'label' : null,
                'value' : null
            });
		},

		'_redrawLabel' : function(){
			this.label.text = this._label;
		},
		'_redrawValue' : function(){
            this.value.removeAllChildren();
            if(isArray(this._value) || (isObjective(this._value) && this._value.is(OjArray))){
                this.value.appendChild(new OjList(this._value, this._itemRenderer))
            }
            else{
                this.value.appendChild(new this._itemRenderer(null, this._value));
            }
		},
		'=label' : function(label){
            if(this._label == label){
                return;
            }
			this._label = label;
			this._redrawLabel();
		},
        '=name' : function(nm){
            if(this._name == nm){
                return;
            }
            if(this._name){
                this.removeCss(nm + '-value');
            }
            this.addCss((this._name = nm) + '-value');
        },
		'=value' : function(value){
            if(this._value == value){
                return;
            }
			this._value = value;
			this._redrawValue();
		}
	}
);

OJ.extendClass(
	'OjDateValue', [OjValue],
	{
		'_redrawValue' : function(){
			this.value.text = this._value.toLocaleDateString();
		}
	}
);


OJ.extendComponent(
	'OjFileInput', [OjInput],
	{
		'_props_' : {
            'minSize' : 0,
			'maxSize' : 0,
            'selectionMax': 1
		},

		'_constructor' : function(name, label, maxSize, minSize){
			this._super(OjInput, '_constructor', [name, label]);
            if(maxSize){
                this.maxSize = maxSize;
            }
            if(minSize){
                this.minSize = minSize;
            }
		},

		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);
			this.input.setAttr('type', 'file');
		},
        '_formatErrorTokens' : function(){
            var tokens = this._super(OjInput, '_formatErrorTokens', arguments);
            tokens.MAX = this._maxSize;
            tokens.MIN = this._minSize;
            return tokens;
        },
        '_onInputChange' : function(evt){
            var val = this.input.dom.files,
                ln = val.length;
            if(this.allowMultiple){
                // check the length
                // remove the overflow
                // notify of the removal
            }
            else if(ln){
                val = val[0];
            }
            this.value = val;
        },
        '_redrawValue' : function(){
            // file input cannot be redrawn
            // TODO: figure out how to redraw file input (make sure to support multiple files)
        },

		'isValid' : function(){
			var valid = this._super(OjInput, 'isValid', arguments);
			var size = this._value ? this._value.size / 1000000 : 0;
			if(this._minSize && size < this._minSize){
                this._errors.append(this._formatError(OjFileInput.MIN_SIZE_ERROR));
				valid = false;
			}
            else if(this._maxSize && size > this._maxSize){
				this._errors.append(this._formatError(OjFileInput.MAX_SIZE_ERROR));
				valid = false;
			}
			return valid;
		},

        '=selectionMax' : function(val){
            if(this._selectionMax == val){
                return;
            }
            this.input.setAttr('multiple', (this._selectionMax = val) == 1 ? null : '');
        }
	},
	{
		'MIN_SIZE_ERROR' : '[%INPUT] must be at least [%MIN] MB.',
		'MAX_SIZE_ERROR' : '[%INPUT] must be no more than [%MAX] MB.',

		'_TAGS' : ['fileinput']
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
			var prnt = this.valueHldr.parent;
			var new_value = new OjTextInput();
			new_value.addCss('value');
			new_value.addEventListener(OjFocusEvent.IN, this, '_onValueFocus');
			prnt.replaceChild(this.valueHldr, new_value);
			this.valueHldr = new_value;
		},

		'_redrawList' : function(/*search = null*/){
			var search = arguments.length && arguments[0] ? arguments[0] : null;
			var old_ln  = this._options_dp.length, new_ln = 0, key;
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
					this._options_index.append(key);
					if(search && this._options[key] && this._item_index[key] && this._item_index[key].indexOf(search) == -1){
						continue;
					}
					if(old_ln > new_ln){
						if(this._options_dp[new_ln] != this._options[key]){
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
			this.valueHldr.value = value;
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
			this._redrawList(this.valueHldr.value);
		},
		'_onFocusIn' : function(evt){
			this._showList();
		},
		'_onFocusOut' : function(evt){
			var is_child = this.find(evt.target);
			if(!is_child.length){
				this._hideList();
			}
		},
		'_onValueFocus' : function(evt){
			if(this.valueHldr.value == this._none_lbl){
				this.valueHldr.value = null;
			}
		},

		'=options' : function(options){
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
			this.value = this._value;
		}
	}
);

OJ.extendComponent(
	'OjForm', [OjView], 
	{
        '_props_' : {
            'cancelLabel' : 'Cancel',
            'resetLabel' : 'Reset',
            'submitLabel' : 'Submit'
        },
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
        '_onSubmitClick' : function(evt){
            if(this.submit() && this._controller){
                this._controller.removeView(this);
            }
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
				inputs[ln].value = null;
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
						'error' : input.error
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
		},

        '.actionView' : function(){
            if(!this._actionView){
                this._actionView = new OjButton(this._submitLabel);
                this._actionView.addEventListener(OjUiEvent.PRESS, this, '_onSubmitClick');
            }
            return this._actionView;
        },
        '.data' : function(){
            var inputs = this._getInputs(),
                ln = inputs.length,
                data = {};
            for(; ln--;){
                data[inputs[ln].name] = inputs[ln].value;
            }
            return data;
        },
        '=submitLabel' : function(val){
            if(this._submitLabel == val){
                return;
            }
            this._submitLabel = val;
            if(this._actionView){
                this._actionView.label = val;
            }
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
					input.text = data.input.label;
				}
				else{
					input.hide();
				}
				if(data.errors){
					errors.show();
					errors.dataProvider.source = data.errors;
				}
				else{
					errors.hide();
				}
			}
		}
	}
);

OJ.extendComponent(
	'OjPasswordInput', [OjTextInput],
	{
		'_minLength' : 6,  '_maxLength' : 30,

		'_setDom' : function(dom_elm){
			this._super(OjTextInput, '_setDom', arguments);
			this.input.setAttr('type', 'password');
		},
        '=minLength' : function(){
        },
        '=maxLength' : function(){
        }
	},
    {
        '_TAGS' : ['passwordinput']
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
            'itemRenderer' : OjLabelItemRenderer,
            'selectionMin' : 0,
            'selectionMax' : 1
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
            this.input.addEventListener(OjCollectionEvent.ITEM_PRESS, this, '_onItemClick');
            this.input.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
            this.input.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
            this.input.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');
            this.input.removeEventListener(OjDomEvent.CHANGE, this, '_onChange');
            // set options if available
            if(ln > 3){
                this.options = args[3];
            }
        },
        '_setDom' : function(dom_elm){
            this._super(OjInput, '_setDom', arguments);
//
//      var list = new OjList();
//      list.setItemRenderer(OjOption);
//      list.addCss('input');
//
//      this.stem.replaceChild(this.input, list);
//
//      this.input = list;
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
                this.input.renderItem(this._value.shift()).isSelected = false;
            }
            option.isSelected = true;
            this._value.append(data);
            this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
        },
        '_toggleOptionAt' : function(index){
            var option = this.input.renderItemAt(index),
                data = this.input.getElmAt(index);
            if(option.isSelected){
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
            option.isSelected = false;
            this._value.removeAt(index);
            this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
        },
        '_updateSelection' : function(){
            // make sure we remove any stale values and replace with fresh if possible
            var ln = this._value.length;
            for(; ln--;){
                if(this.input.indexOfElm(this._value[ln]) == -1){
                    this._value.removeAt(ln);
                }
            }
            // make sure we have the at least the min amount selected
            var i = 0,
                ln2 = this.input.numElms;
            for(; (ln = this._value.length) < this._selectionMin && i < ln2; i++){
                this._selectOption(this.input.renderItemAt(i), this.input.getElmAt(i));
            }
        },
        '_onInputChange' : function(evt){
            // pass since options will take care of the update
        },
        '_onItemAdd' : function(evt){
            this._updateSelection();
        },
        '_onItemClick' : function(evt){
            this._toggleOptionAt(evt.index);
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
            var index, old_data = this._options[evt.index];
            if((index = this._value.indexOf(old_data)) > -1){
                this._value[index] = evt.item;
            }
            this.options.getChildAt(evt.index).data = evt.item;
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

        '=itemRenderer' : function(val){
            if(isString(val)){
                val = OJ.stringToClass(val);
            }
            if(this._itemRenderer == val){
                return;
            }
            this._itemRenderer = val;
            this.redraw();
        },

        '.options' : function(){
            return this.input.dataProvider;
        },
        '=options' : function(val){
            // check to make sure we don't do extra work
            if(val == this.options){
                return;
            }
            // get the old selected indices
            var indices = [],
                ln = this._value.length,
                options, index, ln2;
            for(; ln--;){
                indices.unshift(this.input.indexOfElm(this._value[ln]));
            }
            this._value = [];
            // set the new options
            this.input.dataProvider = val;
            // get the new options
            ln = (options = this.options).length;
            // try to select previous selected indices
            ln2 = indices.length;
            for(; ln2--;){
                if((index = indices[ln2]) < ln){
                    this._selectOption(this.input.renderItemAt(index), options.getItemAt(index));
                }
            }
            this.redraw();
        },
        '=value' : function(val){
            val = Array.array(val);
            if(this._value != val){
                if(this._value = val){
                    var options = this.options,
                        ln = options.length;
                    for(; ln--;){
                        this.input.renderItemAt(ln).isSelected = val.indexOf(options[ln]) > -1;
                    }
                }
                this.dispatchEvent(new OjEvent(OjEvent.CHANGE));
            }
        },
        '.selectionRenderer' : function(){
            return this.input.itemRenderer;
        },
        '=selectionRenderer' : function(val){
            this.input.itemRenderer = val;
            if(this.selectionRenderer == OjRadioOption){
                this.selectionMin = 1;
                this.selectionMax = 1;
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
		'_template' : '<div class=off><div var=wrapper><label var=label></label><div var=psuedoInput><div var=slider><label var=prefix></label><label var=suffix></label><div class=highlight></div><span var=stem><input var=input type=hidden /></span></div></div></div></div>',
        '_onClick' : function(evt){
            this._super(OjInput, '_onClick', arguments);
            this.value = !this._value;
        },
        '_redrawValue' : function(){
            this._super(OjInput, '_redrawValue', arguments);
            if(this._value){
                this.addCss('on');
                this.removeCss('off');
            }
            else{
                this.addCss('off');
                this.removeCss('on');
            }
        }
	},
	{
		'_TAGS' : ['switch']
	}
);



OJ.extendComponent(
	'OjTextArea', [OjInput],
	{
        '_props_' : {
			'minLength' : 0,
			'maxLength' : 0
		},
		'_setDom' : function(dom_elm){
			this._super(OjInput, '_setDom', arguments);
			var prnt = this.input.parent,
				new_input = new OjStyleElement(OjElement.elm('textarea'));
			new_input.addCss('input');
			prnt.replaceChild(this.input, new_input);
			this.input = new_input;
            this.wrapper.vAlign = OjStyleElement.TOP;
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
			this.removeBtn.addEventListener(OjUiEvent.PRESS, this, '_onRemoveClick');
		},

		'_redrawData' : function(){
			this.item.text = this.data.toString();
		},

		'_onRemoveClick' : function(evt){
			this._list.removeItem(this.data);
		}
	}
);


OJ.extendComponent(
	'OjTokenInput', [OjInput],
	{
        '_props_' : {
            'allowNone' : true,
            'allowDuplicate' : false,
            'options' : null,
            'selected' : null
        },
//        '_available' : null,  'filterBox' : null,

		'_constructor' : function(/*name, label, value, list = Object*/){
			var ln = arguments.length;
			// setup the value and options
			this._selected = [];
			this._value = [];
			this._super(OjInput, '_constructor', ln > 2 ? [].slice.call(arguments, 0, 2) : arguments);
			if(ln > 2){
				if(ln > 3){
					this.options = arguments[3];
				}
				this.value = arguments[2];
			}
			// setup event listeners
			this.valueHldr.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onListItemRemove');
			this.filterBox.addEventListener(OjEvent.CHANGE, this, '_onFilterChange');
		},

//		'_setDom' : function(dom_elm){
//			this._super(OjInput, '_setDom', arguments);
//
//			var prnt = this.input.parent();
//
//			// customize the input holder
//			this.filterBox = new OjFilterBox();
//			this.filterBox.setAllowNone(true);
//			this.filterBox.setValue(null);
//			this.filterBox.addCss('filter', 'grey');
//
//			prnt.insertChildAt(this.filterBox, prnt.indexOfChild(this.input) + 1);
//
//			// customize the value holder
//			this.valueHldr = new OjList();
//			this.valueHldr.setItemRenderer(OjToken);
//			this.valueHldr.addCss('value');
//
//			this.inputWrpr.appendChild(this.valueHldr);
//		},

		'_addValue' : function(value/*, suppress_event = false*/){
			return this._addValueAt(value, this._value.length, arguments.length > 2 ? arguments[2] : false);
		},
		'_addValueAt' : function(value, index/*, suppress_event = false*/){
			// update the values list
			this._value.insertAt(value, index);
			if(!this._options){
				return;
			}
			// update the selected list
			this._selected.insertAt(this._options[value], index);
			// update value display
			this.valueHldr.addItemAt(this._options[value], index);
			// update filter list
			if(!this._allow_duplicate){
				delete this._available[value];
				this.filterBox.options = this._available;
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
				this._values.removeAt(index);
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
			if(evt.target == this.filterBox && this.filterBox.value != null){
				this._addValue(this.filterBox.value);
				this.filterBox.value = null;
			}
		},
		'_onListItemRemove' : function(evt){
			// update values
			var removed = this._value.removeAt(evt.index);
			this._selected.removeAt(evt.index);
			// update filter list
			if(!this._allow_duplicate){
				this._available[removed] = this._options[removed];
				this.filterBox.options = this._available;
				this.filterBox.show();
			}
		},

		'.options' : function(options){
			this._options = options;
			this._available = OJ.merge({}, options);
			this.filterBox.options = this._available;
			this.value = this._value.clone();
		},
		'.tokenRenderer' : function(){
            return this.valueHldr.itemRenderer;
        },
		'=tokenRenderer' : function(renderer){
            this.valueHldr.itemRenderer = renderer;
        },
		'_onChange' : function(){},
		'=value' : function(value){
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
	},
    {
        '_TAGS' : ['tokeninput']
    }
);

OJ.extendClass(
    'OjFlip', [OjPropTween],
    {
        '_props_' : {
            'direction' : 'flipLeft', // OjFlip.LEFT
            'duration'  : 250
        },
        '_force' : false,

        '_constructor' : function(/*target = null, direction = IN, duration = 250, easing = NONE*/){
            this._super(OjPropTween, '_constructor', []);
            var args = arguments,
                ln = args.length;
            if(ln){
                this.target = args[0];
                if(ln > 1){
                    this.direction = args[1];
                    if(ln > 2){
                        this.duration = args[2];
                        if(ln > 3){
                            this.easing = args[3];
                        }
                    }
                }
            }
        },

        '_onComplete' : function(evt){
            if(this._direction == OjFade.NONE){
                this._target.alpha = 1;
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
            if(this._direction == OjFlip.DOWN){
                if(this._force || this._target.alpha == 1){
                    this._target.alpha = 0;
                }
                this._to.alpha = 1;
            }
            else if(this._direction == OjFlip.RIGHT){
                if(this._force || this._target.alpha == 1){
                    this._target.alpha = 0;
                }
                this._to.alpha = 1;
            }
            else if(this._direction == OjFlip.UP){
                if(this._force || this._target.alpha == 1){
                    this._target.alpha = 0;
                }
                this._to.alpha = 1;
            }
            else{
                if(this._force || this._target.alpha == 0){
                    this._target.alpha = 1;
                }
                this._to.alpha = 0;
            }
            this._target.show();
            this._super(OjPropTween, 'start', arguments);
        }
    },
    {
        'DOWN'  : 'flipDown',
        'LEFT'  : 'flipLeft',
        'RIGHT' : 'flipRight',
        'UP'    : 'flipUp'
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
				this.media.dom.pause();
			}
		},
		'play' : function(){
			if(this.media){
				this.media.dom.play();
			}
		},
		'stop' : function(){
			if(this.media){
				if(this.media.load){
					this.media.dom.load();
				}
				else{
					this.media.setAttr('src', null);
					this.media.setAttr('src', this._source);
				}
			}
		},

		'.sources' : function(){
			if(this._sources){
				return this._sources.clone();
			}
			return [];
		},
		'=sources' : function(sources){
			this._sources = sources ? sources.clone() : [];
			var ln = this._sources.length;
			if(this.media){
				for(var i = 0; i < ln; i++){
					if(this.media.canPlayType(OjAudio.audioType(this._sources[i])) == ''){
					}
				}
			}
			else if(ln){
				this.source = this._sources[ln];
			}
		}
	},
	{
		'MP3' : 'audio/mpeg',
		'MP4' : 'audio/mp4',
		'OGG' : 'audio/ogg',
		'WAV' : 'audio/x-wav',
		'audioType' : function(url){
			var parts = OjUrl.url(url).path.split('.'),
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
            'content' : null,
            'horzOffset' : null,
            'positioning' : null,
            'parentMenu' : null,
            'vertOffset' : 0
        },

        '_constructor' : function(/*content, positioning, parent_menu*/){
            this._super(OjComponent, '_constructor', []);
            this._processArguments(arguments, {
                'content' : null,
                'positioning' : [
                    OjMenu.RIGHT_MIDDLE, OjMenu.RIGHT_TOP, OjMenu.RIGHT_BOTTOM,
                    OjMenu.LEFT_MIDDLE, OjMenu.LEFT_TOP, OjMenu.LEFT_BOTTOM,
                    OjMenu.BOTTOM_LEFT, OjMenu.BOTTOM_CENTER, OjMenu.BOTTOM_RIGHT,
                    OjMenu.TOP_LEFT, OjMenu.TOP_CENTER, OjMenu.TOP_RIGHT
                ],
                'parentMenu' : null
            });
        },
        '_destructor' : function(){
            this._content = null;
            return this._super(OjComponent, '_destructor', arguments);
        },

        'hasSubMenu' : function(menu){
            while(menu){
                if((menu = menu.parentMenu) == this){
                    return true;
                }
            }
            return false;
        },
        '=content' : function(content){
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
                this.appendChild(this._content = content);
            }
        }
    },
    {
        'TOP_LEFT' : 'positionTopLeft',
        'TOP_CENTER' : 'positionTopCenter',
        'TOP_RIGHT' : 'positionTopRight',
        'BOTTOM_LEFT' : 'positionBottomLeft',
        'BOTTOM_CENTER' : 'positionBottomCenter',
        'BOTTOM_RIGHT' : 'positionBottomRight',
        'LEFT_TOP' : 'positionLeftTop',
        'LEFT_MIDDLE' : 'positionLeftMiddle',
        'LEFT_BOTTOM' : 'positionLeftBottom',
        'RIGHT_TOP' : 'positionRightTop',
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
            var viewport = OJ.viewport;
            var x = {
                'top' : rect.top > 0 && rect.top >= viewport.top ? rect.top : viewport.top,
                'left' : rect.left > 0 && rect.left >= viewport.left ? rect.left : viewport.left,
                'bottom' : viewport.bottom >= rect.bottom ? rect.bottom : viewport.bottom,
                'right' : viewport.right >= rect.right ? rect.right : viewport.right
            };
            return ((rect.bottom - rect.top) * (rect.right - rect.left)) /
                   ((x.bottom - x.top) * (x.right - x.left));
        },
        '_positionMenu' : function(menu, target){
            var pos = menu.positioning;
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
            menu.x = rect.left;
            menu.y = rect.top;
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
            var key, active, target, page_x, page_y;
            // check to see if we should cancel
            for(key in this._active){
                active = this._active[key];
                page_x = evt.pageX;
                page_y = evt.pageY;
                if(active && active.hitTestPoint(page_x, page_y)){
                    return;
                }
                target = OjElement.byId(key);
                if(target && target.hitTestPoint(page_x, page_y)){
                    return;
                }
            }
            // if not shut it down for all actives
            this._removeMenus(this._active);
            // remove the event listener
            OJ.removeEventListener(OjUiEvent.PRESS, this, '_onPageClick');
        },
        '_onTargetClick' : function(evt){
            var target = evt.currentTarget;
            var menu = this._menus[target.id];
            if(menu && !this._active[target.id]){
                this.show(menu, target)
            }
        },
        '_onTargetMove' : function(evt){
            var target = evt.currentTarget;
            var menu = this._menus[target.id];
            if(menu){
                this._positionMenu(menu, target);
            }
        },
        '_onTransOut' : function(evt){
            OJ.destroy(evt.currentTarget);
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
                    OJ.removeEventListener(OjUiEvent.PRESS, this, '_onPageClick');
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
            target.addEventListener(OjUiEvent.PRESS, this, '_onTargetClick');
            this._menus[target.id] = menu;
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
            menu.alpha = 0;
            OJ.appendChild(menu);
            // position the menu based on preferences
            if(menu){
                this._positionMenu(menu, target);
                var tween = new OjFade(menu);
                tween.start();
                this._active[target.id] = menu;
                this._tweens[target.id] = tween;
                OJ.addEventListener(OjUiEvent.PRESS, this, '_onPageClick');
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
                target.removeEventListener(OjUiEvent.PRESS, this, '_onTargetClick');
                delete this._menus[target.id];
            }
        },

        'positionTopLeft' : function(target, menu){
            return new OjRect(
                    target.pageX - menu.horzOffset,
                    target.pageY - menu.height - menu.vertOffset,
                    menu.width,
                    menu.height
            );
        },
        'positionTopCenter' : function(target, menu){
            return new OjRect(
                    target.pageX + ((target.width - menu.width) / 2),
                    target.pageY - menu.height,
                    menu.width,
                    menu.height
            );
        },
        'positionTopRight' : function(target, menu){
            return new OjRect(
                    target.pageX + target.width - menu.width,
                    target.pageY - menu.height,
                    menu.width,
                    menu.height
            );
        },

        'positionBottomLeft' : function(target, menu){
            return new OjRect(
                target.pageX,
                target.pageY + target.height,
                menu.width,
                menu.height
            );
        },
        'positionBottomCenter' : function(target, menu){
            return new OjRect(
                    target.pageX + ((target.width - menu.width) / 2),
                    target.pageY + target.height,
                    menu.width,
                    menu.height
            );
        },
        'positionBottomRight' : function(target, menu){
            return new OjRect(
                    target.pageX + target.width - menu.width,
                    target.pageY + target.height,
                    menu.width,
                    menu.height
            );
        },

        'positionLeftTop' : function(target, menu){
            return new OjRect(
                    target.pageX - menu.width,
                    target.pageY,
                    menu.width,
                    menu.height
            );
        },
        'positionLeftMiddle' : function(target, menu){
            return new OjRect(
                    target.pageX - menu.width,
                    target.pageY + ((target.height - menu.height) / 2),
                    menu.width,
                    menu.height
            );
        },
        'positionLeftBottom' : function(target, menu){
            return new OjRect(
                    target.pageX - menu.width,
                    target.pageY + target.height - menu.height,
                    menu.width,
                    menu.height
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
                    target.pageX + target.width,
                    target.pageY + ((target.height - menu.height) / 2),
                    menu.width,
                    menu.height
            );
        },
        'positionRightBottom' : function(target, menu){
            return new OjRect(
                    target.pageX + target.width,
                    target.pageY + target.height - menu.height,
                    menu.width,
                    menu.height
            );
        }
    }
);


OJ.extendComponent(
    'OjTabNavController', [OjNavController],
    {
        '_prev_active' : null,

        '_addViewButton' : function(view, index){
            var btn = new OjButton(view.shortTitle, view.icon);
            btn.vAlign = OjStyleElement.TOP;
            btn.addEventListener(OjUiEvent.PRESS, this, '_onTabClick');
            view.addEventListener(OjView.ICON_CHANGE, this, '_onViewIconChange');
            view.addEventListener(OjView.TITLE_CHANGE, this, '_onViewTitleChange');
            this.insertChildAt(btn, index);
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
                this._prev_active.isActive = false;
            }
            if(this._prev_active = this.getChildAt(this._stack.activeIndex)){
                this._prev_active.isActive = true;
            }
        },
        // event listener callbacks
        '_onStackChange' : function(evt){
            this._updateActiveBtn();
        },
        '_onStackViewAdd' : function(evt){
            this._addViewButton(evt.view, evt.index);
        },
        '_onStackViewMove' : function(evt){
        },
        '_onStackViewRemove' : function(evt){
            this._removeViewButton(evt.view, evt.index);
        },
        '_onStackViewReplace' : function(evt){
        },
        '_onTabClick' : function(evt){
            this._stack.activeIndex = this.indexOfChild(evt.currentTarget);
            this._updateActiveBtn();
        },
        '_onViewIconChange' : function(evt){
            var view = evt.currentTarget;
            this.getChildAt(this._stack.indexOfElm(view)).icon = view.icon;
        },
        '_onViewTitleChange' : function(evt){
            var view = evt.currentTarget;
            this.getChildAt(this._stack.indexOfElm(view)).label = view.shortTitle;
        },

        // getter & setters
        '=stack' : function(stack){
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
                ln = this.numElms;
                for(; ln--;){
                    this._removeViewButton(this._stack.getElmAt(ln), ln);
                }
            }
            this._super(OjNavController, '=stack', arguments);
            if(stack){
                stack.addEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
                stack.addEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
                stack.addEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
                stack.addEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');
                // process the stack
                ln = stack.numElms;
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
			this.contentType = ln > 3 ? args[3] : OjUrlRequest.JSON;
			this.request = new OjUrlRequest(
                url,
                {
                    'id'        : this._id = OjRpc.guid(),
                    'method'    : method,
                    'params'    : Array.array(params)
                },
                this._contentType,
                OjUrlRequest.POST
            );
			if(ln > 4){
				this.async = args[4];
			}
		},
		'load' : function(){
			return this._super(OjUrlLoader, 'load', []);
		},

		'.request' : function(){
			// todo: add clone request for getRequest() func
			return this._request;
		},
		'=method' : function(val){
			if(this._method == val){
				return;
			}
			this._request.data.method = (this._method = val);
		},
		'=params' : function(val){
			if(this._params == val){
				return;
			}
			this._request.data.params = (this._params = val);
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
            'showIcon' : false
        },
        '_template' : '<div valign=m><div var=accessory></div><img var=icon /><span var=content></span></div>',

        '_destructor' : function(/*depth = 0*/){
            var data = this._data;
            if(isObjective(data, OjActionable)){
                data.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
            }
            this._list = this._data = null;
            return this._super(OjItemRenderer, '_destructor', arguments);
        },

        '_redrawAccessory' : function(){
            if(this.showAccessory){
                this.removeCss('no-accessory');
            }
            else{
                this.addCss('no-accessory');
            }
        },
        '_redrawData' : function(){
            if(this._super(OjItemRenderer, '_redrawData', arguments)){
                this.content.text = this.data;
                return true;
            }
            return false;
        },
        '_redrawIcon' : function(){
            if(this.showIcon){
                this.removeCss('no-icon');
            }
            else{
                this.addCss('no-icon');
            }
        },

        'redraw' : function(){
            if(this._super(OjItemRenderer, 'redraw', arguments)){
                this._redrawAccessory();
                this._redrawIcon();
                return true;
            }
            return false;
        },

        '_onDataChange' : function(evt){
            this._redrawData();
        },

        '=data' : function(data){
            var old = this._data;
            if(isObjective(old, OjActionable)){
                old.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
            }
            this._data = data;
            if(isObjective(data, OjActionable)){
                data.addEventListener(OjEvent.CHANGE, this, '_onDataChange');
            }
            this.redraw();
        },
        '=showAccessory' : function(val){
            if(this._showAccessory == val){
                return;
            }
            this._showAccessory = val;
            this.redraw();
        },
        '=showIcon' : function(val){
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
					min_interval = Math.min(min_interval, this._timers[key].duration);
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
			var id = timer.id;
			if(this._timers[id] != timer){
				this._timers[id] = timer;
				timer._last_tick = Date.time();
				this._timer_count++;
				this._updateInterval();
			}
		},
		'updateTimer' : function(timer){
			if(this._timers[timer.id]){
				this._updateInterval();
			}
		},
		'unregisterTimer' : function(timer){
			var id = timer.id;
			if(this._timers[id]){
				delete this._timers[id];
				this._timer_count--;
				this._updateInterval();
			}
		}
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
