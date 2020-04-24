window.OJ = function Oj(){
    const obj = {
        "_events" : [], "_guid" : 8, "_loaded" : {},

        "_is_landscape" : true, "_is_mobile" : false, "_is_ready" : false,

        "_is_supported" : true, "_is_tablet" : false, "_is_touch_capable" : false, "_is_webview" : false,

        "_protocol" : "http", "_os_version" : "",

        "_settings" : {
            "css_ext" : ".css", "css_path" : null, "dim_unit" : "px", "font_unit" : "px",

            "init" : null, "js_ext" : ".js", "js_path" : null, "mode" : "loading",

            "support_message" : importHtml("oj.support_message"),

            "target" : "#OJ", "theme" : null, "tpl_ext" : "html", "tpl_path" : null,

            "version" : "0.0.0", "wait_for_css" : true
        },

        "_viewport" : null,


        // modes
        "DEV" : "development",
        "LOADING" : "loading",
        "LOCAL" : "local",
        "PROD" : "production",

        // protocols
        "FILE" : "file",
        "HTTP" : "http",
        "HTTPS" : "https",

        // browsers
        "CHROME" : "Chrome",
        "FIREFOX" : "Firefox",
        "IE" : "Internet Explorer",
        "IN_APP" : "in-app",
        "MOZILLA" : "Mozilla",
        "OPERA" : "Opera",
        "SAFARI" : "Safari",

        // Engines
        "GECKO" : "Gecko",
        "KHTML" : "KHTML",
        "TRIDENT" : "Trident",
        "WEBKIT" : "WebKit",

        // OSs
        "CHROME_OS" : "Chromium OS",
        "LINUX" : "Linux",
        "MAC" : "macOS",
        "WINDOWS" : "Windows",

        // mobile OSs
        "ANDROID" : "Android",
        "BADA" : "Bada",
        "BLACKBERRY" : "BlackBerry OS",
        "BREW" : "Brew",
        "GRID" : "Grid OS",
        "IOS" : "iOS",
        "MEEGO" : "MeeGo",
        "PALM" : "Palm",
        "QNX" : "QNX",
        "SYMBIAN" : "Symbian",
        "WEBOS" : "Web OS",
        "WIN_MOBILE" : "Windows Mobile",
        "WIN_PHONE" : "Windows Phone",

        // size classes
        "HEIGHT_COMPACT" : "hc",
        "HEIGHT_REGULAR" : "hr",
        "HEIGHT_LARGE"   : "hl",

        "WIDTH_COMPACT" : "wc",
        "WIDTH_REGULAR" : "wr",
        "WIDTH_LARGE"   : "wl",

        // protected functions
        "_getClassPath" : function(type, cls, ext){
            var parts = cls.split(".");

            return parts.shift() + "/" + (type ? type + "/" : "") + parts.join("/") + ext;
        },

        "_getCssImportPath" : function(path){
            var self = this;

            if(path.indexOf("/") != -1){
                return path;
            }

            return self.root + self._getClassPath(self.css_path, path, self.css_ext) + self.version_query;
        },

        "_getJsImportPath" : function(path){
            var self = this;

            if(path.indexOf("/") != -1){
                return path;
            }

            return self.root + self._getClassPath(self.js_path, path, self.js_ext) + self.version_query;
        },

        "_getModeSuffix" : function(){
            return this.mode == this.DEV ? "-dev" : "";
        },

        "_getTemplateImportPath" : function(path){
            var self = this;

            if(path.indexOf("/") != -1){
                return path;
            }

            return self.root + self._getClassPath(self.tpl_path, path, this.tpl_ext) + this.version_query;
        },

        "_getThemePath" : function(path){
            if(!path || path.indexOf("/") != -1){
                return path;
            }

            var self = this,
                parts = path.split(".");

            if(parts.length == 1){
                parts.push(path);
            }

            parts.splice(1, 0, "themes");

            return self.root + parts.join("/") + self._getModeSuffix() + self.css_ext + self.version_query;
        },

        "_onOjResize" : function(){
            if(isFunction(OJ.dispatchEvent) && isFunction(OJ.addCss)){
                // process resize event
                var prev = OJ.copy(OJ._viewport),
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
                var old_h = OJ.size_height,
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
        },

        "_onOjScroll" : function(evt){
            var vp = OJ.viewport.clone();
            vp.top = isSet(window.pageYOffset) ? window.pageYOffset : document.body.scrollTop;
            vp.left = isSet(window.pageXOffset) ? window.pageXOffset : document.body.scrollLeft;

            // TODO: figure out on page scroll functionality

            return vp;
        },

        "_onOjOrientationChange" : function(evt){
            if(isFunction(OJ.dispatchEvent)){
                OJ.dispatchEvent(OjOrientationEvent.convertDomEvent(evt));
            }
        },


        // public functions
        "addEventListener" : function(type, context, func){
            this._events.push(arguments);
        },

        "assetPath" : function(path, file){
            // search for package
            const pkg = path.replace(".", "/packages/");

            return new OjUrl(this.root + pkg + "/assets/" + (file ? file + this.version_query : ""));
        },

        "load" : function(url){
            const loc = window.location;

            if(loc.href != (url = String.string(url))){
                loc.href = url;
            }
        },

        "loadCss" : function(css/*, is_path=false, async=true*/){
            var self = this,
                elm, head;

            // check to see if the value is a path
            if(arguments.length > 1 && arguments[1]){
                elm = document.createElement("link");
                elm.setAttribute("rel", "stylesheet");
                elm.setAttribute("type", "text/css");
                elm.setAttribute("href", css);
            }
            // check to see if we have any css data
            else if(css){
                elm = document.createElement("style");
                elm.type = "text/css";

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
            head = document.getElementsByTagName("head")[0];

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
        "loadJs" : function(js, is_path, is_async_or_callback){
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
        },

        "async" : function(context, func/*, ...args*/){
            setTimeout(function(){ func.apply(context, Array.array(arguments).slice(2)); }, 1);
        },

        "attributeToProp" : function(attr){
            var str = "";

            attr.split("-").forEach(function(item, i){
                str += i ? item.ucFirst() : item;
            });

            return str;
        },

        "propToAttribute" : function(prop, sep){
            let str = "";

            sep = sep || "-";

            prop.split(/(?=[A-Z])/).forEach((item, i) => {
                str += (i ? sep : "") + item.toLowerCase();
            });

            return str;
        },

        "byId" : function(id){
            if(id.charAt(0) == "#"){
                id = id.substr(1);
            }

            return document.getElementById(id);
        },

        /* Returns the class name of the argument or undefined if
         it's not a valid JavaScript object.
         */
        "classToString" : function(obj){
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
        },

        "copy" : function(val){
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
        },

        "destroy" : function(obj/*, depth = 0*/){
            if(obj && isFunction(obj._destructor)){
                if(!obj._destroyed_){
                    try{
                        obj._destructor(arguments.length > 1 ? arguments[1] : 0);
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
        },

        "elm" : function(elm){
            return OjElement.element(elm);
        },


        "defineClass" : function(ns, def, static_def){
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
        },

        "definePackage" : function(ns, def, parents/*=[OjPackage]*/){
            var cls = this.extendClass(ns, parents || [OjPackage], def),
                pkg = new cls();

            window[ns.toUpperCase()] = pkg;

            OJ.addEventListener(OjEvent.LOAD, pkg, "_onOjLoad");
            OJ.addEventListener(OjEvent.READY, pkg, "_onOjReady");
        },

        "extendClass" : function(ns, parents, def, static_def){
            // setup our vars & prototype
            var key, parent, ln2, names, name, supers, spr,
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
                    cls[key] = static_def[key];
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
                    else if(name == "_post_compile_"){
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

            // if there is a compile function use it
            if(isFunction(def._compile_)){
                def._compile_.call(proto, def);
            }

            // var post_compile = proto._post_compile_;
            //
            // if(post_compile){
            //     var def_post = def._post_compile_;
            //
            //     // run the post compile functions
            //     if(isFunction(def_post)){
            //         proto._post_compile_ = post_compile = post_compile.slice(0);
            //
            //         post_compile.unshift(def_post);
            //     }
            //
            //     for(ln = post_compile.length; ln--;){
            //         post_compile[ln](cls, proto);
            //     }
            // }

            const post_compile = cls._post_compile_.slice(0);  // clone
            const def_post = def._post_compile_;

            // run the post compile functions
            if(isFunction(def_post)){
                post_compile.push(def_post);
            }

            cls._post_compile_ = post_compile;

            post_compile.forEach(func =>  func(cls, proto));

            // setup the prototype and constructor for the class
            return cls.prototype.constructor = cls;
        },

        "extendComponent" : function(ns, parents, def, static_def){
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

        "extendManager" : function(manager_ns/*, cls_ns, parents, def, static_def*/){
            var prev_manager = window[manager_ns],
                cls = OJ.extendClass.apply(this, Array.slice(arguments, 1));

            return window[manager_ns] = new cls(prev_manager);
        },


        "guid" : function(){
            return (arguments.length ? "OJ" : "func") + "_" + this._guid++;
        },

        "implementInterface" : function(/*intrfc1, intrfc2, ..., def*/){
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
                    else if(key == "_props_" || key == "_get_props_" || key == "_set_props_"){
                        OJ.implementInterface(intrfc[key], def[key]);
                    }
                }
            }

            return def;
        },

        "importCss" : function(path){
            return this.loadCss(this._getCssImportPath(path), true, false);
        },

        "importJs" : function(path){
            return this.loadJs(this._getJsImportPath(path), true, false);
        },

        "includeJs" : function(path){
            // TODO: actually make the include file function do something... or not
        },

        "merge" : function(/*obj, obj2, ...objs*/){
            return Object.concat.apply(Object, arguments);
        },

        "meta" : function(/*property, value*/){
            var ln, meta, name;

            // make sure we have the metadata obj populated
            if(!this._metadata){
                var metas = document.getElementsByTagName("meta");

                this._metadata = {};
                this._metas = {};

                for(ln = metas.length; ln--;){
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
            var ln = arguments.length;

            if(ln){
                name = arguments[0].toLowerCase();

                if(ln > 1){
                    if(meta = this._metas[name]){
                        meta.setAttribute("content", this._metadata[name] = arguments[1]);
                    }
                    else{
                        this._metas[name] = meta = document.createElement("meta");
                        meta.setAttribute("name", arguments[0]);
                        meta.setAttribute("content", this._metadata[name] = arguments[1]);

                        document.head.appendChild(meta);
                    }
                }

                return this._metadata[name];
            }

            // else return the whole thing
            return OJ.merge({}, this._metadata);
        },

        "pageTitle" : function(){
            var d = document;

            return d ? d.title : null;
        },

        "pageDescription" : function(){
            return this.meta("description");
        },

        "registerClass" : function(cls, static_def = {}, mixins = []){
            // setup our vars & prototype
            const proto = cls.prototype;

            // add the namespace back
            const cls_name = cls.name;

            proto._class_name_ = cls.oj_id = cls_name;

            // setup static
            proto._static = cls;

            // if there is a compile function find it and remove it
            const compileFunc = static_def._compile_;

            // run compile func
            if(isFunction(compileFunc)){
                compileFunc.call(cls, static_def, proto);
            }

            delete static_def._compile_;

            // if there is a post compile function find it and remove it
            const postCompileFunc = static_def._post_compile_;

            delete static_def._post_compile_;

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

            return window[cls_name] = cls;
        },

        "registerComponent" : function(...params){
            const cls = this.registerClass(...params),
                ns = cls.name,
                tags = (cls._TAGS || []).concat([OJ.propToAttribute(ns)]);

            // register special tags + class name as tag
            tags.forEach(
                tag => OjStyleElement.registerComponentTag(tag, ns)
            );

            return cls;
        },

        "registerManager" : function(manager_ns, ...params){
            const prev_manager = window[manager_ns],
                cls = this.registerClass(...params);

            return window[manager_ns] = new cls(prev_manager);
        },

        "registerPackage" : function(cls, ...params){
            this.registerClass(cls, ...params);

            const pkg = new cls();

            OJ.addEventListener(OjEvent.LOAD, pkg, "_onOjLoad");
            OJ.addEventListener(OjEvent.READY, pkg, "_onOjReady");

            return window[cls.name.toUpperCase()] = pkg;
        },

        "removeEventListener" : function(type, context, func){
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

        "settings" : function(settings){
            var key;

            for(key in settings){
                this[key] =  settings[key];
            }
        },

        "stringToClass" : function(str){
            return window[str];
        },

        "stringToVar" : function(obj){
            var parts = isArray(obj) ? obj : obj.split("."), ln = parts.length, i;

            obj = window;

            for(i = 0; i < ln; i++){
                if(!obj[parts[i]]){
                    obj[parts[i]] = {};
                }

                obj = obj[parts[i]];
            }

            return obj;
        },

        "toClass" : function(obj){
            return isString(obj) ? this.stringToClass(obj) : obj;
        },

        "unset" : function(context, args){
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
        "browser" : null,

        "browser_version" : null,

        "css_prefix" : null,

        "engine" : null,

        "is_computer" : function(){
            return !this.is_mobile && !this.is_tablet;
        },

        "is_dev" : function(){
            return this.mode == this.DEV;
        },

        "is_landscape" : null,

        "is_loading" : function(){
            return this.mode == this.LOADING;
        },

        "is_local" : function(){
            return this.mode == this.LOCAL;
        },

        "is_mobile" : null,

        "is_portrait" : function(){
            return !this.is_landscape;
        },

        "is_prod" : function(){
            return this.mode == this.PROD;
        },

        "is_ready" : null,

        "is_supported" : null,

        "is_tablet" : null,

        "is_touch_capable" : null,

        "is_webview" : null,

        "os" : null,

        "os_version" : null,

        "pixel_ratio" : function(){
            return window.devicePixelRatio || 1;
        },

        "protocol" : null,

        "root" : null,

        "screen" : function(){
            var rect = {
                "top" : isSet(window.screenY) ? window.screenY : window.screenTop,
                "left" : isSet(window.screenX) ? window.screenX : window.screenLeft,
                "width" : window.screen.availWidth,
                "height" : window.screen.availHeight
            };

            rect.bottom = rect.top + rect.height;
            rect.right = rect.left + rect.width;

            return rect;
        },

        "scroll_left" : function(){
            return document.body.scrollLeft;
        },

        "scroll_top" : function(){
            return document.body.scrollTop;
        },

        "size_width" : null,
        "size_height" : null,

        "version_query" : function(){
            var self = this,
                v;

            if(self.mode == self.LOADING || self.protocol == self.FILE || isEmpty(v = self.version)){
                return "";
            }

            return "?v=" + v;
        },

        "viewport" : function(){
            return new OjRect(
                isSet(window.pageYOffset) ? window.pageYOffset : document.body.scrollTop,
                isSet(window.pageXOffset) ? window.pageXOffset : document.body.scrollLeft,
                isSet(window.innerWidth) ? window.innerWidth : document.body.clientWidth,
                isSet(window.innerHeight) ? window.innerHeight : document.body.clientHeight
            );
        }
    },
    set_props = {
        "root" : function(val){
            var self = this;

            self._root = isEmpty(val) && self.protocol == self.FILE ? "" : (val + "/");
        },

        "scroll_left" : function(val){
            document.body.scrollLeft = val;
        },

        "scroll_top" : function(val){
            document.body.scrollTop = val;
        },

        "theme" : function(val){
            var self = this,
                old_path = self._compiled_theme_path,
                path = self._getThemePath(val),
                ln, elms;

                // check for change
                if(!path || path.indexOf(old_path) > -1){
                    return;
                }

                elms = document.getElementsByTagName("link");

                self._compiled_theme_path = path;

                for(ln = elms.length; ln--;){
                    if(elms[ln].getAttribute("href").indexOf(old_path) > -1){
                        elms[ln].setAttribute("href", path);

                        return;
                    }
                }

                self._settings.theme = val;

                self._theme_elm = self.loadCss(path, true);
        },

        "viewport" : function(val){

        }
    };

    let key;


    function makeProperty(key, is_setting){
        var get_func = is_setting ? function(){ return this._settings[key]; } : function(){ return this["_" + key]; },
            set_func = is_setting ? function(val){ return this._settings[key] = val; } : function(val){ return this["_" + key] = val; };

        Object.defineProperty(
            obj, key,
            {
                "get" : get_props[key] || get_func,
                "set" : set_props[key] || (is_setting ? set_func : function(){ throw "Property '" + key + "' cannot be set." }),
                "enumerable" : true,
                "configurable" : false
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