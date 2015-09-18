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

    if(isNaN(tmp) || isObject(obj) || isArray(obj)){
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

function printCloseGroup(){
    console.groupEnd();
}

function printGroup(obj, force){
    if(OJ.mode == OJ.PROD && !force){
        return;
    }

    if(isSet(console.groupCollapsed)){
        console.groupCollapsed(obj);
    }
    else{
        console.group(obj);
    }


    // close the group
    if(!arguments.length){
        printCloseGroup();
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
                    pkg = path.replace('.', '/packages/');

                return new OjUrl(self.root + pkg + '/assets/' + (file ? file + self.version_query : ''));
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

            'attributeToProp' : function(attr){
                var str = '';

                parts = attr.split('-').forEach(function(item, i){
                    str += i ? item.ucFirst() : item;
                });

                return str;
            },

            'propToAttribute' : function(prop){
                var str = '';

                prop.split(/(?=[A-Z])/).forEach(function(item, i){
                    str += (i ? '-' : '') + item.toLowerCase();
                });

                return str;
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
                    ln = parents.length, i = 1,
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
                for(ln = parents.length; i < ln; i++){
                    parent = parents[i].prototype;

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
                        else{
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

            'extendComponent' : function(ns, parents, def, static_def){
                var self = this,
                    tags = static_def ? static_def._TAGS : null,
                    ln = tags ? tags.length : 0,
                    cls = self.extendClass.apply(self, arguments);

                // register class name as tag
                OjStyleElement.registerComponentTag(OJ.propToAttribute(ns), ns);

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
        index = src.indexOf('//'), // detect protocol mode,
        path;

    // process the protocol and setup the path
    if(index > -1){
        path = src;

        OJ._protocol = (!index ? window.location.protocol : src.substring(0, index)).replace(':', '');
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
              's' : navigator.appVersion,
              'sub' : 'Edge',
              'id' : 'Internet Explorer',
              'v' : 'rv'
            },
            {
              's' : navigator.appVersion,
              'sub' : 'Trident',
              'id' : 'Internet Explorer',
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
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/),
            standalone = navigator.standalone;

        OJ._os = OJ.IOS;
        OJ._is_tablet = !(OJ._is_mobile = (user_agent.indexOf('ipad') == -1));
        OJ._is_webview = !(/safari/i.test(user_agent)) || /crios/i.test(user_agent);

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
            var vp = OJ.viewport,
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

OJ.importJs('oj.data.OjDate');
OJ.importJs('oj.data.OjFunction');
OJ.importJs('oj.data.OjJson');
OJ.importJs('oj.data.OjNumber');
OJ.importJs('oj.data.OjPackage');
OJ.importJs('oj.data.OjString');

OJ.importJs('oj.data.OjObject');
OJ.importJs('oj.data.OjArray');

OJ.importJs('oj.utils.OjQueryString');

OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.events.OjEventManager');
OJ.importJs('oj.events.OjTextEvent');
OJ.importJs('oj.events.OjErrorEvent');

OJ.importJs('oj.net.OjUrl');
OJ.importJs('oj.net.OjUrlRequest');
OJ.importJs('oj.net.OjUrlLoader');


// on dom ready event handler
function onDomReady(){
    var key,
        target = OJ.byId(OJ.target) || document.body;  // process the target and it's attributes for any additional settings

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
    OJ.importJs('oj.dom.OjElement');
    OJ.importJs('oj.utils.OjHistoryManager');
    OJ.importJs('oj.window.OjWindowManager');
    OJ.importJs('oj.views.OjView');
    OJ.importJs('oj.events.OjTransformEvent');
    OJ.importJs('oj.fx.OjFade');
    OJ.importJs('oj.fx.OjTweenSet');

    // import the required css
    OJ.importCss('oj.OJ');

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
            (browser == OJ.IE && version.compareVersion('10.0') >= 0) ||
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
    printCloseGroup();

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

    printCloseGroup();

    // dispatch the ready event
    printGroup('Your OJ is ready. Enjoy!', true);

    OJ._is_ready = true;

    OJ.fadeIn();

    OJ.dispatchEvent(new OjEvent(OjEvent.READY));

    // detect if the browser is not supported
    if(!OJ.is_supported){
        var alrt = WindowManager.makeAlert(OJ.support_message, 'Unsupported Browser');
        alrt.hideButtons();
        alrt.paneWidth = 425;

        WindowManager.show(alrt);

        return;
    }

    printCloseGroup();
}