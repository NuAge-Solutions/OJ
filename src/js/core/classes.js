class RegisterPromise {
    constructor(cls) {
        this.cls = cls;
    }

    then(onResolve) {
        return onResolve(this.cls);
    }

    static resolve(cls_name, cls) {
        return new RegisterPromise(window[cls_name] = cls);
    }
}


class Oj {
    static get browser() { return this._browser; }
    static get browser_version() { return this._browser_version; }
    static get css_prefix() { return this._css_prefix; }
    static get engine() { return this._engine; }
    static get is_computer() { return !this.is_mobile && !this.is_tablet; }
    static get is_dev() { return this.mode == this.DEV; }
    static get is_landscape() { return this._is_landscape; }
    static get is_loading() { return this.mode == this.LOADING; }
    static get is_local() { return this.mode == this.LOCAL; }
    static get is_mobile() { return this._is_mobile; }
    static get is_portrait() { return !this.is_landscape; }
    static get is_prod() { return this.mode == this.PROD; }
    static get is_ready() { return this._is_ready; }
    static get is_supported() { return this._is_supported; }
    static get is_tablet() { return this._is_tablet; }
    static get is_touch_capable() { return this._is_touch_capable; }
    static get is_webview() { return this._is_webview; }
    static get os() { return this._os; }
    static get os_version() { return this._os_version; }
    static get pixel_ratio() { return window.devicePixelRatio || 1; }
    static get protocol() { return this._protocol; }

    static get root() { return this._root; }
    static set root(val) {
        this._root = isEmpty(val) && this.protocol == this.FILE ? "" : (val + "/");
    }

    static get screen() {
        const rect = {
            "top" : isSet(window.screenY) ? window.screenY : window.screenTop,
            "left" : isSet(window.screenX) ? window.screenX : window.screenLeft,
            "width" : window.screen.availWidth,
            "height" : window.screen.availHeight
        };

        rect.bottom = rect.top + rect.height;
        rect.right = rect.left + rect.width;

        return rect;
    }

    static get scroll_left() { return document.body.scrollLeft; }
    static set scroll_left(val) {
        document.body.scrollLeft = val;
    }

    static get scroll_top() { return document.body.scrollTop; }
    static set scroll_top(val) {
        document.body.scrollTop = val;
    }

    static get size_width() { return this._size_width; }
    static get size_height() { return this._size_height; }

    static get theme() { return this._theme; }
    static set theme(val) {
        const old_path = this._compiled_theme_path,
            path = this._getThemePath(val);

        // check for change
        if(!path || path.indexOf(old_path) > -1){
            return;
        }

        this._compiled_theme_path = path;

        for(let elms = document.getElementsByTagName("link"), ln = elms.length; ln--;){
            if(elms[ln].getAttribute("href").indexOf(old_path) > -1){
                elms[ln].setAttribute("href", path);

                return;
            }
        }

        this._theme = val;
        this._theme_elm = this.loadCss(path, true);
    }

    static get version_query() {
        let v;

        if(this.mode == this.LOADING || this.protocol == this.FILE || isEmpty(v = this.version)){
            return "";
        }

        return "?v=" + v;
    }

    static get viewport() {
        return new OjRect(
            isSet(window.pageYOffset) ? window.pageYOffset : document.body.scrollTop,
            isSet(window.pageXOffset) ? window.pageXOffset : document.body.scrollLeft,
            isSet(window.innerWidth) ? window.innerWidth : document.body.clientWidth,
            isSet(window.innerHeight) ? window.innerHeight : document.body.clientHeight
        );
    }
    static set viewport(val) {
        // todo: add
    }

    // modes
    static get DEV() { return "development"; }
    static get LOADING() { return "loading"; }
    static get LOCAL() { return "local"; }
    static get PROD() { return "production"; }

    // protocols
    static get FILE() { return "file"; }
    static get HTTP() { return "http"; }
    static get HTTPS() { return "https"; }

    // browsers
    static get CHROME() { return "Chrome"; }
    static get FIREFOX() { return "Firefox"; }
    static get IE() { return "Internet Explorer"; }
    static get IN_APP() { return "in-app"; }
    static get MOZILLA() { return "Mozilla"; }
    static get OPERA() { return "Opera"; }
    static get SAFARI() { return "Safari"; }

    // Engines
    static get GECKO() { return "Gecko"; }
    static get KHTML() { return "KHTML"; }
    static get TRIDENT() { return "Trident"; }
    static get WEBKIT() { return "WebKit"; }

    // OSs
    static get CHROME_OS() { return "Chromium OS"; }
    static get LINUX() { return "Linux"; }
    static get MAC() { return "macOS"; }
    static get WINDOWS() { return "Windows"; }

    // mobile OSs
    static get ANDROID() { return "Android"; }
    static get BADA() { return "Bada"; }
    static get BLACKBERRY() { return "BlackBerry OS"; }
    static get BREW() { return "Brew"; }
    static get GRID() { return "Grid OS"; }
    static get IOS() { return "iOS"; }
    static get MEEGO() { return "MeeGo"; }
    static get PALM() { return "Palm"; }
    static get QNX() { return "QNX"; }
    static get SYMBIAN() { return "Symbian"; }
    static get WEBOS() { return "Web OS"; }
    static get WIN_MOBILE() { return "Windows Mobile"; }
    static get WIN_PHONE() { return "Windows Phone"; }

    // size classes
    static get HEIGHT_COMPACT() { return "hc"; }
    static get HEIGHT_REGULAR() { return "hr"; }
    static get HEIGHT_LARGE() { return "hl"; }

    static get WIDTH_COMPACT() { return "wc"; }
    static get WIDTH_REGULAR() { return "wr"; }
    static get WIDTH_LARGE() { return "wl"; }


    static initialize() {
        this._events = [];
        this._guid = 8;
        this._is_landscape = true;
        this._is_mobile = false;
        this._is_ready = false;
        this._is_supported = true;
        this._is_tablet = false;
        this._is_touch_capable = false;
        this._is_webview = false;
        this._loaded = {};
        this._os_version = "";
        this._protocol = "http";
        this._theme = null;

        this.css_ext = ".css";
        this.css_path = null;
        this.dim_unit = "px";
        this.font_unit = "px";
        this.init = null;
        this.js_ext = ".js";
        this.js_path = null;
        this.mode = "loading";
        this.support_message = importHtml("oj.support_message");
        this.target = "#OJ";
        this.tpl_ext = "html";
        this.version = "0.0.0";
        this.wait_for_css = true;

        return this;
    }


    static _getClassPath(type, cls, ext) {
        const parts = cls.split(".");

        return parts.shift() + "/" + (type ? type + "/" : "") + parts.join("/") + ext;
    }

    static _getCssImportPath(path) {
        if(path.indexOf("/") != -1){
            return path;
        }

        return this.root + this._getClassPath(this.css_path, path, this.css_ext) + this.version_query;
    }

    static _getJsImportPath(path) {
        if(path.indexOf("/") != -1){
            return path;
        }

        return this.root + this._getClassPath(this.js_path, path, this.js_ext) + this.version_query;
    }

    static _getModeSuffix(mode) {
        return (mode || this.mode) == this.DEV ? "-dev" : "";
    }

    static _getTemplateImportPath(path) {
        if(path.indexOf("/") != -1){
            return path;
        }

        return this.root + this._getClassPath(this.tpl_path, path, this.tpl_ext) + this.version_query;
    }

    static _getThemePath(path) {
        if(!path || path.indexOf("/") != -1){
            return path;
        }

        const parts = path.split(".");

        if(parts.length == 1){
            parts.push(path);
        }

        parts.splice(1, 0, "themes");

        return this.root + parts.join("/") + this._getModeSuffix() + this.css_ext + this.version_query;
    }

    static _onOjResize() {
        if(isFunction(OJ.dispatchEvent) && isFunction(OJ.addCss)){
            // process resize event
            const prev = OJ.copy(OJ._viewport),
                vp = OJ.viewport || new OjRect(),
                w = (OJ.is_mobile ? window.screen : {}).width || window.innerWidth || document.body.clientWidth,
                h = (OJ.is_mobile ? window.screen : {}).height || window.innerHeight || document.body.clientHeight;

            vp.width = w;
            vp.height = h;

            if(OJ._is_landscape = (vp.width > vp.height)){
                OJ.addCss("is-landscape");
                OJ.removeCss("is-portrait");
            }
            else{
                OJ.addCss("is-portrait");
                OJ.removeCss("is-landscape");
            }

            OJ.dispatchEvent(new OjTransformEvent(OjTransformEvent.RESIZE, vp, prev));

            OJ._viewport = vp;

            // process potential size class change event
            const old_h = OJ.size_height,
                old_w = OJ.size_width,
                new_h = h <  500 ? OJ.HEIGHT_COMPACT : (h < 1400 ? OJ.HEIGHT_REGULAR : OJ.HEIGHT_LARGE),
                new_w = w <  500 ? OJ.WIDTH_COMPACT : (w < 1400 ? OJ.WIDTH_REGULAR : OJ.WIDTH_LARGE),
                delta_h = old_h != new_h,
                delta_w = old_w != new_w;

            if(delta_h){
                if(old_h){
                    OJ.removeCss(old_h);
                }

                OJ.addCss(OJ._size_height = new_h);
            }

            if(delta_w){
                if(old_w){
                    OJ.removeCss(old_w);
                }

                OJ.addCss(OJ._size_width = new_w);
            }

            if(delta_h || delta_w){
                OJ.dispatchEvent(new OjSizeClassEvent(OjSizeClassEvent.CHANGE, [new_w, new_h], [old_w, old_h]));
            }
        }
    }

    static _onOjScroll(evt) {
        const vp = OJ.viewport.clone();
        vp.top = isSet(window.pageYOffset) ? window.pageYOffset : document.body.scrollTop;
        vp.left = isSet(window.pageXOffset) ? window.pageXOffset : document.body.scrollLeft;

        // TODO: figure out on page scroll functionality

        return vp;
    }

    static _onOjOrientationChange(evt) {
        if(isFunction(OJ.dispatchEvent)){
            OJ.dispatchEvent(OjOrientationEvent.convertDomEvent(evt));
        }
    }


    // public functions
    static addEventListener(type, context, func) {
        this._events.push(arguments);
    }

    static assetPath(path, file) {
        // search for package
        const pkg = path.replace(".", "/packages/");

        return new OjUrl(this.root + pkg + "/assets/" + (file ? file + this.version_query : ""));
    }

    static load(url) {
        const loc = window.location;

        if(loc.href != (url = String.string(url))){
            loc.href = url;
        }
    }

    static loadCss(css, is_path= false, async= true) {
        let elm, head;

        // check to see if the value is a path
        if(is_path){
            elm = document.createElement("link");
            elm.setAttribute("rel", "stylesheet");
            elm.setAttribute("type", "text/css");
            elm.setAttribute("href", css);
        }
        // check to see if we have any css data
        else if(css){
            elm = document.createElement("style");
            elm.setAttribute("type", "text/css");

            elm.appendChild(document.createTextNode(css));
        }
        else{
            return null;
        }

        // add the css element to the head
        head = document.getElementsByTagName("head")[0];

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
    }

    // dynamically add js to page
    static loadJs(js, is_path, is_async_or_callback) {
        if(isUndefined(is_path)){
            is_path = true;
        }

        if(isUndefined(is_async_or_callback)){
            is_async_or_callback = true;
        }

        if(this.mode != this.LOADING || is_async_or_callback){
            const elm = document.createElement("script");
            elm.setAttribute("type", "text/javascript");
            elm.setAttribute("language", "javascript");

            if(is_async_or_callback){
                elm.setAttribute("async", "true");

                if(isFunction(is_async_or_callback)){
                    is_async_or_callback = is_async_or_callback.name;
                }

                if(isString(is_async_or_callback)){
                    elm.setAttribute("onload", is_async_or_callback + "()");
                }
            }

            if(is_path){
                elm.setAttribute("src", js);
            }
            else{
                elm.appendChild(document.createTextNode(js));
            }

            document.getElementsByTagName("head")[0].appendChild(elm);

            return elm;
        }

        if(is_path){
            document.write(
                "<scri" + "pt type=\"text/javascript\" language=\"javascript\" src=\"" + js + "\"></scr" + "ipt>"
            );
        }
        else{
            eval(js);
        }
    }

    static async(context, func, ...params) {
        setTimeout(() => { func.call(context, ...params); }, 1);
    }

    static attributeToProp(attr) {
        let str = "";

        attr.split("-").forEach((item, i) => {
            str += i ? item.ucFirst() : item;
        });

        return str;
    }

    static propToAttribute(prop, sep) {
        let str = "";

        sep = sep || "-";

        prop.split(/(?=[A-Z])/).forEach((item, i) => {
            str += (i ? sep : "") + item.toLowerCase();
        });

        return str;
    }

    static byId(id) {
        if(id.charAt(0) == "#"){
            id = id.substr(1);
        }

        return document.getElementById(id);
    }

    // Returns the class name of the argument or undefined if it's not a valid JavaScript object.
    static classToString(obj) {
        if(obj && obj.prototype){
            if(obj.prototype._class_name_){
               return obj.prototype._class_name_;
            }

            if(obj.prototype.constructor && obj.prototype.constructor.toString){
                const arr = obj.prototype.constructor.toString().match(/function\s*(\w+)/);

                if(arr && arr.length == 2){
                    return arr[1];
                }
            }
        }

        return undefined;
    }

    static copy(val) {
        if(!val){
            return val;
        }

        if(isArray(val) || isObjective(val)){
            return val.clone();
        }

        if(isDate(val)){
            return new Date(val);
        }

        if(isObject(val)){
            return Object.clone(val);
        }

        return val;
    }

    static destroy(obj, depth = 0) {
        if(obj && isFunction(obj._destructor)){
            if(!obj._destroyed_){
                try{
                    obj._destructor(depth);
                }
                catch(e){
                    // ignore errors that occur during destroy
                }
            }
            else{
                print("Called destroy multiple times on: " + obj.oj_id);
            }
        }

        return obj = null;
    }

    static elm(elm) {
        return OjElement.element(elm);
    }


    static defineClass(ns, def, static_def) {
        eval("window[ns] = function " + ns + "(){" + (def["_constructor"] ? "this._constructor.apply(this, arguments);" : "") + "};");

        const cls = window[ns];

        def._class_name_ = ns;
        def._supers = (def._supers || []).slice(0);

        cls.oj_id = ns;
        cls.prototype = def;

        if(static_def){
            for(const key in static_def){
                cls[key] = static_def[key];
            }
        }

        return cls;
    }

    static definePackage(ns, def, parents) {
        const cls = this.extendClass(ns, parents || [OjPackage], def),
            pkg = new cls();

        window[ns.toUpperCase()] = pkg;

        OJ.addEventListener(OjEvent.LOAD, pkg, "_onOjLoad");
        OJ.addEventListener(OjEvent.READY, pkg, "_onOjReady");
    }

    static extendClass(ns, parents, def, static_def) {
        // setup our vars & prototype
        let key, parent, ln2, names, name, supers, spr,
            props = { "_get_props_" : null, "_set_props_" : null, "_props_" : null },
            ln = parents.length, i = 1,
            proto = Object.create(parents[0].prototype),
            cls = OJ.defineClass(ns, proto);

        proto._supers.push(parents[0]);

        // copy the base class statics
        for(; ln--;){
            parent = parents[ln];

            for(key in parent){
                cls[key] = parent[key];
            }
        }

        // add new statics
        if(static_def){
            for(key in static_def){
                if(key == "_post_compile_"){
                    cls[key] = parent._post_compile_.slice(0).concat([static_def[key]]);
                }
                else{
                    cls[key] = static_def[key];
                }
            }
        }

        // copy the other parent's prototype
        for(ln = parents.length; i < ln; i++){
            parent = parents[i].prototype;

            // copy object
            names = Object.getOwnPropertyNames(parent);

            for(ln2 = names.length; ln2--;){
                name = names[ln2];

                if(name == "_class_name_"){
                    continue;
                }

                if(name == "_supers"){
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
        cls.oj_id = ns;

        proto._static = cls;

        // process other functions and properties accordingly
        for(key in def){
            // skip private funcs
            if(key.charAt(0) == "_" && key.slice(-1) == "_"){
                continue;
            }

            proto[key] = def[key];
        }

        // if there is a compile function find it and remove it
        const compileFunc = cls._compile_;

        // run compile func
        if(isFunction(compileFunc)){
            compileFunc(cls, proto);
        }

        delete cls._compile_;

        // process post compile
        cls._post_compile_.forEach(func =>  func(cls, proto));

        // setup the prototype and constructor for the class
        return cls.prototype.constructor = cls;
    }

    static extendComponent(ns, parents, def, static_def) {
        const tags = static_def ? static_def._TAGS : null,
            cls = this.extendClass.apply(this, arguments);

        // register class name as tag
        OjStyleElement.registerComponentTag(OJ.propToAttribute(ns), ns);

        // register special tags
        for(let ln = tags ? tags.length : 0; ln--;){
            OjStyleElement.registerComponentTag(tags[ln], ns);
        }

        return cls;
    }

    static extendManager(manager_ns/*, cls_ns, parents, def, static_def*/) {
        const prev_manager = window[manager_ns],
            cls = OJ.extendClass.apply(this, Array.slice(arguments, 1));

        return window[manager_ns] = new cls(prev_manager);
    }

    static guid() {
        return (arguments.length ? "OJ" : "func") + "_" + this._guid++;
    }

    static implementInterface(/*intrfc1, intrfc2, ..., def*/) {
        let key, intrfc,
            i = 0,
            ln = arguments.length - 1,
            def = arguments[ln];

        for(; i < ln; i++){
            intrfc = arguments[i];

            // process strings as potential interfaces
            // then automatically setup the private interface var for css purposes
            if(isString(intrfc)){
                const cls = OJ.stringToClass(intrfc)
                cls._interface_ = intrfc;

                intrfc = cls;
            }

            for(key in intrfc){
                if(isUndefined(def[key])){
                    def[key] = intrfc[key];
                }
                // if this is properties and they are already defined then we handle them differently
                else if(key == "_props_" || key == "_get_props_" || key == "_set_props_"){
                    OJ.implementInterface(intrfc[key], def[key]);
                }
            }
        }

        return def;
    }

    static importCss(path) {
        return this.loadCss(this._getCssImportPath(path), true, false);
    }

    // importJs(path) {
    //     return this.loadJs(this._getJsImportPath(path), true, false);
    // }

    static includeJs(path) {
        // TODO: actually make the include file function do something... or not
    }

    static merge(...params) {
        return Object.concat(...params);
    }

    static meta(property, value) {
         let meta, name;

        // make sure we have the metadata obj populated
        if(!this._metadata){
            const metas = document.getElementsByTagName("meta");

            this._metadata = {};
            this._metas = {};

            for(let ln = metas.length; ln--;){
                meta = metas[ln];

                if(meta.parentNode != document.head){
                    continue;
                }

                name = meta.getAttribute("name");

                if(!name){
                    name = meta.getAttribute("http-equiv");
                }

                if(name){
                    name = name.toLowerCase();

                    this._metadata[name] = meta.getAttribute("content");
                    this._metas[name] = meta;
                }
            }
        }

        // check to see if we are getting or setting a specific metadata item
        if(property){
            name = property.toLowerCase();

            if(value){
                if(meta = this._metas[name]){
                    meta.setAttribute("content", this._metadata[name] = value);
                }
                else{
                    this._metas[name] = meta = document.createElement("meta");
                    meta.setAttribute("name", property);
                    meta.setAttribute("content", this._metadata[name] = value);

                    document.head.appendChild(meta);
                }
            }

            return this._metadata[name];
        }

        // else return the whole thing
        return OJ.merge({}, this._metadata);
    }

    static pageTitle() {
        const d = document;

        return d ? d.title : null;
    }

    static pageDescription() {
        return this.meta("description");
    }

    static registerClass(cls, static_def = {}, mixins = []) {
        // setup our vars & prototype
        const proto = cls.prototype;

        // add the namespace back
        const cls_name = cls.name;

        proto._class_name_ = cls.oj_id = cls_name;

        // setup static
        proto._static = cls;

        // setup supers
        proto._supers = proto._supers.concat(cls);

        // if there is a compile function find it and remove it
        const compileFunc = static_def._compile_;

        // run compile func
        if(isFunction(compileFunc)){
            compileFunc(cls, proto);
        }

        delete static_def._compile_;

        // if there is a post compile function find it and remove it
        const postCompileFunc = static_def._post_compile_;

        delete static_def._post_compile_;

        // process debounce directive
        const debounce_params = static_def._DEBOUNCE || [];

        debounce_params.forEach(params => {
            try{
                const [signature, ...args] = params,
                    parts = signature.split(".", 1);

                let context = parts[0],
                    func = parts[1];

                if(context == "proto"){
                    context = proto;
                }
                else if(context == "static"){
                    context = cls;
                }
                else{
                    context = static_def;
                }

                context[func] = debounce(context[func], ...args);
            }
            catch (e) {
                print("debounce failed", cls_name, params);
            }
        });

        delete static_def._DEBOUNCE;

        // add new statics
        // add in the rest of the static def
        for(let key in static_def){
            cls[key] = static_def[key];
        }

        // process post compile functions
        const post_compile = cls._post_compile_.slice(0);  // clone

        // run the post compile functions
        if(isFunction(postCompileFunc)){
            post_compile.push(postCompileFunc);
        }

        cls._post_compile_ = post_compile;

        post_compile.forEach(func =>  func(cls, proto));

        return RegisterPromise.resolve(cls_name, cls);
    }

    static registerComponent(cls, static_def = {}, mixins = []) {
        const cls_name = cls.name,
            tags = (static_def._TAGS || []).concat([OJ.propToAttribute(cls_name)]);

        delete static_def._TAGS;

        return this.registerClass(cls, static_def, mixins).then(cls => {
            // register special tags + class name as tag
            tags.forEach(tag => OjStyleElement.registerComponentTag(tag, cls_name));

            return RegisterPromise.resolve(cls_name, cls);
        });
    }

    static registerManager(manager_ns, ...params) {
        return this.registerClass(...params).then(cls => {
            const prev_manager = window[manager_ns];

            return RegisterPromise.resolve(manager_ns, new cls(prev_manager));
        });
    }

    static registerPackage(...params) {
        return this.registerClass(...params).then(cls => {
            const pkg = new cls();

            OJ.addEventListener(OjEvent.LOAD, pkg, "_onOjLoad");
            OJ.addEventListener(OjEvent.READY, pkg, "_onOjReady");

            return RegisterPromise.resolve(cls.name.toUpperCase(), pkg);
        });
    }

    static removeEventListener(type, context, func) {
        for(let ln = this._events.length, evt; ln--;){
            evt = this._events[ln];

            if(evt[0] == type && evt[1] == context && evt[2] == func){
                this._events.splice(ln, 1);

                break;
            }
        }
    }

    static settings(settings) {
        for(let key in settings){
            this[key] =  settings[key];
        }
    }

    static stringToClass(str) {
        return window[str];
    }

    static stringToVar(obj) {
        const parts = isArray(obj) ? obj : obj.split("."), ln = parts.length;

        obj = window;

        for(let i = 0; i < ln; i++){
            if(!obj[parts[i]]){
                obj[parts[i]] = {};
            }

            obj = obj[parts[i]];
        }

        return obj;
    }

    static toClass(obj) {
        return isString(obj) ? this.stringToClass(obj) : obj;
    }

    static unset(context, args) {
        let ln = args.length,
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
}


window.OJ = Oj.initialize();