"use strict";window.OJ=function Oj(){return{_events:[],_guid:85,_is_landscape:true,_is_mobile:false,_is_ready:false,_is_supported:true,_is_tablet:false,_is_touch_capable:false,_loaded:{},_protocol:"http",_settings:{assetsPath:"assets",cssExt:".css",cssPath:"css",dimUnit:"px",fontUnit:"px",init:null,jsPath:"js",jsExt:".js",lazyLoad:true,mode:"loading",target:"#OJ",theme:"oj",themePath:"themes",tplPath:"templates",tplExt:".html",version:"0.0.0",waitForCss:true,supportMessage:'Our apologies. Your browser is currently not supported. Please try again with a more recent version of <a href="https://www.google.com/intl/en/chrome/browser/">Chrome</a>, <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, <a href="http://windows.microsoft.com/en-us/internet-explorer/downloads/ie-10/worldwide-languages">Internet Explorer</a> or <a href="http://www.apple.com/safari/">Safari</a>. You can easily download the latest version by clicking on the name of the browser you wish to use.'},_viewport:{top:0,left:0,bottom:0,right:0,width:0,height:0},DEV:"development",LOADING:"loading",PROD:"production",FILE:"file",HTTP:"http",HTTPS:"https",CHROME:"Chrome",FIREFOX:"Firefox",IE:"Internet Explorer",IN_APP:"in-app",MOZILLA:"Mozilla",OPERA:"Opera",SAFARI:"Safari",GECKO:"Gecko",KHTML:"KHTML",TRIDENT:"Trident",WEBKIT:"WebKit",CHROME_OS:"Chrome OS",LINUX:"Linux",OSX:"OS X",WINDOWS:"Windows",ANDROID:"Android",BADA:"Bada",BLACKBERRY:"BlackBerry OS",BREW:"Brew",GRID:"Grid OS",IOS:"iOS",MEEGO:"MeeGo",PALM:"Palm",QNX:"QNX",SYMBIAN:"Symbian",WEBOS:"Web OS",WIN_MOBILE:"Windows Mobile",WIN_PHONE:"Windows Phone",_:function(key){return this._settings[key]},_getClassPath:function(type,cls,ext){var parts=cls.split(".");return parts.shift()+"/"+(type?type+"/":"")+parts.join("/")+ext},_getCssImportPath:function(path){if(path.indexOf("/")!=-1){return path}return this._root+this._getClassPath(this._("cssPath"),path,this._("cssExt"))+this.getVersionQuery()},_getJsImportPath:function(path){if(path.indexOf("/")!=-1){return path}return this._root+this._getClassPath(this._("jsPath"),path,this._("jsExt"))+this.getVersionQuery()},_getTemplateImportPath:function(path){if(path.indexOf("/")!=-1){return path}return this._root+this._getClassPath(this._("tplPath"),path,this._("tplExt"))+this.getVersionQuery()},_getThemePath:function(path){if(path.indexOf("/")!=-1){return path}var parts=path.split("."),prefix=parts.length==1?path+".":"",type=this._("themePath");if(this._("mode")!=this.DEV){path+="-theme";type=null}return this._root+this._getClassPath(type,prefix+path,this._("cssExt"))+this.getVersionQuery()},_handleEvent:function(action,type,context,func){this._events.push({action:action,type:type,context:context,func:func})},_onTouchEvent:function(evt){var touches=evt.changedTouches,first=touches[0],type="";switch(evt.type){case"touchstart":type="mousedown";break;case"touchmove":type="mousemove";break;case"touchend":type="mouseup";break;default:return}var simulatedEvent=document.createEvent("MouseEvent");simulatedEvent.initMouseEvent(type,true,true,window,1,first.screenX,first.screenY,first.clientX,first.clientY,false,false,false,false,0,null);first.target.dispatchEvent(simulatedEvent);evt.preventDefault()},addEventListener:function(type,context,func){this._handleEvent("add",type,context,func)},addCssFile:function(css){var elm;if(arguments.length>1&&arguments[1]){elm=document.createElement("link");elm.setAttribute("rel","stylesheet");elm.setAttribute("type","text/css");elm.setAttribute("href",css)}else{if(css){elm=document.createElement("style");elm.type="text/css";if(elm.styleSheet){elm.styleSheet.cssText=css}else{elm.appendChild(document.createTextNode(css))}}else{return null}}var head=document.getElementsByTagName("head")[0];if(this._theme_elm){head.insertBefore(elm,this._theme_elm)}else{head.appendChild(elm)}return elm},addJsFile:function(js){var args=arguments,ln=args.length,is_path=ln>1?args[1]:false,is_async=ln>2?args[2]:false;try{if(this._("mode")!=this.LOADING||is_async){var elm=document.createElement("script");elm.setAttribute("type","text/javascript");elm.setAttribute("language","javascript");if(is_async){elm.setAttribute("async","true")}if(is_path){elm.setAttribute("src",js)}else{elm.appendChild(document.createTextNode(js))}document.getElementsByTagName("head")[0].appendChild(elm);return elm}}catch(e){}if(is_path){document.write('<script type="text/javascript" language="javascript" src="'+js+'"><\/script>')}else{eval(js)}},async:function(context,func){setTimeout(func.apply(context,Array.array(arguments).slice(2)),1)},attributeToFunc:function(attr){var parts=attr.split("-"),ln=parts.length;for(;ln--;){if(ln){parts[ln]=parts[ln].ucFirst()}}return parts.join("")},byId:function(id){if(id.charAt(0)=="#"){id=id.substr(1)}return document.getElementById(id)},classToString:function(obj){if(obj&&obj.prototype&&obj.prototype.constructor&&obj.prototype.constructor.toString){var arr=obj.prototype.constructor.toString().match(/function\s*(\w+)/);if(arr&&arr.length==2){return arr[1]}}return undefined},destroy:function(obj){if(obj&&isFunction(obj._destructor)){if(!obj._destroyed_){var args=arguments;obj._destructor(args.length>1?args[1]:0)}else{trace("Called destroy multiple times on: "+obj.id())}}return obj=null},elm:function(elm){return OjElement.element(elm)},extendComponent:function(ns,parents,def){var cls=this.extendClass.apply(this,arguments);var tags=cls._TAGS,ln=tags.length;OjStyleElement.registerComponentTag(ns.toLowerCase(),ns);for(;ln--;){OjStyleElement.registerComponentTag(tags[ln],ns)}return cls},extendClass:function(ns,parents,def){var key,c,parent,ln=parents.length,proto={_class_name:ns};eval("c = window[ns] = function "+ns+"(){ this._constructor.apply(this, arguments); };");for(;ln--;){parent=parents[ln];for(key in parent){c[key]=parent[key]}}if(arguments.length>3){var statics=arguments[3];for(key in statics){c[key]=statics[key]}}for(ln=parents.length;ln--;){parent=parents[ln].prototype;for(key in parent){if(key=="_class_name"){continue}if(key=="_class_names"||key=="_post_compile_"){proto[key]=parent[key].clone()}else{proto[key]=parent[key]}}}proto._class_names.push(ns);proto._static=c;if(isObject(def._props_)){proto._propCompile_(def,"_props_")}if(isObject(def._get_props_)){proto._propCompile_(def,"_get_props_")}if(isObject(def._set_props_)){proto._propCompile_(def,"_set_props_")}for(key in def){if(key.charAt(0)=="_"&&key.slice(-1)=="_"){if(key=="_interface_"){proto._class_names.splice(-1,0,def[key])}continue}proto[key]=def[key]}if(isFunction(def._compile_)){def._compile_.call(proto,def)}if(isFunction(def._post_compile_)){proto._post_compile_.unshift(def._post_compile_)}for(ln=proto._post_compile_.length;ln--;){proto._post_compile_[ln].call(proto)}return(c.prototype=proto).constructor=c},extendManager:function(manager_ns,cls_ns,parents,def){var prev_manager=window[manager_ns],cls=OJ.extendClass.apply(this,Array.slice(arguments,1));return window[manager_ns]=new cls(prev_manager)},guid:function(){return(arguments.length?arguments[0]._class_name:"func")+"_"+this._guid++},implementInterface:function(){var key,intrfc,i=0,ln=arguments.length-1,def=arguments[ln];for(;i<ln;i++){intrfc=arguments[i];if(isString(intrfc)){var cls=OJ.stringToClass(intrfc);cls._interface_=intrfc;intrfc=cls}for(key in intrfc){if(isUndefined(def[key])){def[key]=intrfc[key]}else{if(key=="_props_"||key=="_get_props_"||key=="_set_props_"){OJ.implementInterface(intrfc[key],def[key])}}}}return def},importCss:function(path){var css_path=this._getCssImportPath(path);if(this._library){var was_loaded=this._library.isLoaded(css_path);var ln=arguments.length,css_data=ln>1?arguments[1]:null,elm;if(!was_loaded){if(this._("lazyLoad")&&this._protocol!=this.FILE&&(this._("waitForCss")||(ln>2&&arguments[2]))){elm=this.addCssFile(this._library.load(css_path))}else{if(isFunction(document.createStyleSheet)){elm=document.createStyleSheet(css_path)}else{elm=this.addCssFile(css_path,true)}}this._library.setAsset(css_path,true)}return elm}if(!this._loaded[css_path]){this._loaded[css_path]=true;return this.addCssFile(css_path,true)}return null},importJs:function(path){var js_path=this._getJsImportPath(path);if(this._library){var was_loaded=this._library.isLoaded(js_path);if(!was_loaded){if(this._("lazyLoad")&&this._protocol!=this.FILE){this.addJsFile(arguments.length>1?arguments[1]:this._library.load(js_path))}else{this.addJsFile(js_path,true)}this._library.setAsset(js_path,true)}return arguments.length>1?arguments[1]:this._library.load(js_path)}if(!this._loaded[js_path]){this._loaded[js_path]=true;this.addJsFile(js_path,true)}},importTemplate:function(path){var template_path=this._getTemplateImportPath(path),was_loaded=this._library.isLoaded(template_path),template_data=arguments.length>1?arguments[1]:this._library.load(template_path);this._library.setAsset(template_path,template_data);return template_data},isComputer:function(){return !this._is_mobile&&!this._is_tablet},isLandscape:function(){return this._is_landscape},isMobile:function(){return this._is_mobile},isPortrait:function(){return !this._is_landscape},isReady:function(){return this._is_ready},isSupported:function(){return this._is_supported},isTablet:function(){return this._is_tablet},isTouchCapable:function(){return this._is_touch_capable},merge:function(obj,obj2){var key,i,ln=arguments.length;for(i=1;i<ln;i++){for(key in arguments[i]){obj[key]=arguments[i][key]}}return obj},meta:function(){var ln,meta,name;if(!this._metadata){var metas=document.getElementsByTagName("meta");this._metadata={};this._metas={};for(ln=metas.length;ln--;){meta=metas[ln];if(meta.parentNode!=document.head){continue}name=meta.getAttribute("name");if(!name){name=meta.getAttribute("http-equiv")}if(name){name=name.toLowerCase();this._metadata[name]=meta.getAttribute("content");this._metas[name]=meta}}}var ln=arguments.length;if(ln){name=arguments[0].toLowerCase();if(ln>1){if(meta=this._metas[name]){meta.setAttribute("content",this._metadata[name]=arguments[1])}else{this._metas[name]=meta=document.createElement("meta");meta.setAttribute("name",arguments[0]);meta.setAttribute("content",this._metadata[name]=arguments[1]);document.head.appendChild(meta)}}return this._metadata[name]}return OJ.merge({},this._metadata)},pageTitle:function(){var d=document;return d?d.title:null},pageDescription:function(){return this.meta("description")},pluralize:function(str){var c=str.slice(-1),c2=str.slice(-2),c3=str.slice(-3);if(c=="s"){return str+"'"}else{if(c2=="ey"){return str.slice(0,-2)+"ies"}else{if(c3=="elf"){return str.slice(0,-3)+"elvs"}}}return str+"s"},removeEventListener:function(type,context,func){this._handleEvent("remove",type,context,func)},render:function(elm){if(this.renderer){this.renderer.dom().appendChild(elm=isObjective(elm)?elm.dom():elm)}},setting:function(key){if(arguments.length==1){return this._settings[key]}var val=arguments[1];if(key=="theme"){var sep="/",old_path=this._compiled_theme_path,path=this._getThemePath(val);if(path.indexOf(old_path)>-1){return}var elms=document.getElementsByTagName("link"),ln=elms.length;this._compiled_theme_path=this._path;for(;ln--;){if(elms[ln].getAttribute("href").indexOf(old_path)>-1){elms[ln].setAttribute("href",path);return}}this._theme_elm=this.importCss(path)}this._settings[key]=val},settings:function(settings){var key;for(key in settings){this.setting(key,settings[key])}},stringToClass:function(str){return window[str]},stringToVar:function(obj){var parts=isArray(obj)?obj:obj.split("."),ln=parts.length,i;obj=window;for(i=0;i<ln;i++){if(!obj[parts[i]]){obj[parts[i]]={}}obj=obj[parts[i]]}return obj},toClass:function(obj){return isString(obj)?this.stringToClass(obj):obj},tokenReplace:function(source,token,value){return source.replace(new RegExp("\\[%"+token+"\\]","g"),value)},tokensReplace:function(source,key_vals){var key;for(key in key_vals){source=this.tokenReplace(source,key,key_vals[key])}return source},getAssetPath:function(pkg,path){return this._root+pkg+"/"+this._("assetsPath")+"/"+path+this.getVersionQuery()},getBrowser:function(){return this._browser},getBrowserVersion:function(){return this._browser_version},getCssPrefix:function(){return this._css_prefix},getEngine:function(){return this._engine},getMode:function(){return this._("mode")},getOs:function(){return this._os},getPixelRatio:function(){return window.devicePixelRatio||1},getProtocol:function(){return this._protocol},getRoot:function(){return this._root},setRoot:function(root){this._root=isEmpty(root)&&this._protocol==this.FILE?"":(root+"/")},getScreen:function(){var rect={top:isSet(window.screenY)?window.screenY:window.screenTop,left:isSet(window.screenX)?window.screenX:window.screenLeft,width:window.screen.availWidth,height:window.screen.availHeight};rect.bottom=rect.top+rect.height;rect.right=rect.left+rect.width;return rect},getScrollLeft:function(){return document.body.scrollLeft},setScrollLeft:function(pos){document.body.scrollLeft=pos},getScrollTop:function(){return document.body.scrollTop},setScrollTop:function(pos){document.body.scrollTop=pos},getVersionQuery:function(){var v;if(this._("mode")==this.LOADING||this._protocol==this.FILE||isEmpty(v=this._("version"))){return""}return"?v="+v},getViewport:function(){var rect={top:window.pageYOffset?window.pageYOffset:document.body.scrollTop,left:window.pageXOffset?window.pageXOffset:document.body.scrollLeft,bottom:0,right:0,width:window.innerWidth?window.innerWidth:document.body.clientWidth,height:window.innerHeight?window.innerHeight:document.body.clientHeight};rect.bottom=rect.top+rect.height;rect.right=rect.left+rect.width;return rect;return Object.clone(this._viewport)},setViewport:function(rect){}}}();(function(){var d=document.getElementsByTagName("script"),a=d[d.length-1].getAttribute("src"),g=a.indexOf("//"),e=0,k,h,c;if(g>0){k=a;OJ._protocol=a.substring(0,g-1)}else{k=window.location.href;OJ._protocol=window.location.protocol.substring(-1)}k=k.split("/");k.pop();if((c=a.charAt(0))=="/"){k=k.slice(0,3)}else{a=a.split("/");if(c=="."){for(h=a.length-1;e<h;e++){if((c=a[e])==".."){k.pop()}else{k.push(c)}}}else{}}trace(k);OJ.setRoot(k.join("/"));var f={search:function(n){var l=n.length;for(;l--;){var i=n[l].s,m=n[l].p;this.v=n[l].v||n[l].id;if(i){if(i.indexOf(n[l].sub)!=-1){return n[l].id}}else{if(m){return n[l].id}}}},version:function(l){var i=l.indexOf(this.v);if(i==-1){return}return l.substring(i+this.v.length+1).split(" ")[0]}};OJ._browser=f.search([{s:navigator.userAgent,sub:"Mozilla",id:"Netscape",v:"Mozilla"},{s:navigator.userAgent,sub:"OmniWeb",v:"OmniWeb/",id:"OmniWeb"},{p:window.opera,id:"Opera",v:"Version"},{s:navigator.vendor,sub:"iCab",id:"iCab"},{s:navigator.vendor,sub:"KDE",id:"Konqueror"},{s:navigator.vendor,sub:"Camino",id:"Camino"},{s:navigator.userAgent,sub:"Netscape",id:"Netscape"},{s:navigator.userAgent,sub:"Gecko",id:"Mozilla",v:"rv"},{s:navigator.userAgent,sub:"MSIE",id:"Internet Explorer",v:"MSIE"},{s:navigator.vendor,sub:"Apple",id:"Safari",v:"Version"},{s:navigator.userAgent,sub:"Firefox",id:"Firefox"},{s:navigator.userAgent,sub:"Chrome",id:"Chrome"}])||null;OJ._browser_version=f.version(navigator.userAgent)||f.version(navigator.appVersion);var b=navigator.platform.substring(0,3).toLowerCase(),j=navigator.userAgent.toLowerCase();if(j.indexOf("android")>-1){OJ._os=OJ.ANDROID;OJ._is_tablet=!(OJ._is_mobile=(j.indexOf("mobile")>-1));OJ._is_touch_capable=true}else{if(b=="iph"||b=="ipa"||b=="ipo"){OJ._os=OJ.IOS;OJ._is_tablet=!(OJ._is_mobile=(b!="ipa"));if(!OJ._browser_version){OJ._browser_version=OJ.IN_APP}}else{OJ._os=f.search([{s:navigator.platform,sub:"Win",id:"Windows"},{s:navigator.platform,sub:"Mac",id:"OS X"},{s:navigator.platform,sub:"Linux",id:"Linux"}])||null}}if(!OJ._is_touch_capable){OJ._is_touch_capable="ontouchstart" in window}switch(OJ._browser){case OJ.FIREFOX:OJ._engine=OJ.GECKO;OJ._css_prefix="-moz-";break;case OJ.IE:OJ._engine=OJ.TRIDENT;OJ._css_prefix="-ms-";break;case OJ.CHROME:case OJ.SAFARI:OJ._engine=OJ.WEBKIT;OJ._css_prefix="-webkit-"}OJ._onOjResize=function(){if(isFunction(OJ.addCss)){var l=OJ._viewport,i=window.innerWidth?window.innerWidth:document.body.clientWidth,m=window.innerHeight?window.innerHeight:document.body.clientHeight,o=i-l.width,n=m-l.height;l.width=i;l.height=m;l.bottom=l.top+l.height;l.right=l.left+l.width;if(l.width>l.height){OJ._is_landscape=true;OJ.addCss(["is-landscape"]);OJ.removeCss(["is-portrait"])}else{OJ._is_landscape=false;OJ.addCss(["is-portrait"]);OJ.removeCss(["is-landscape"])}OJ.dispatchEvent(new OjTransformEvent(OjTransformEvent.RESIZE,l.top,l.left,o,n))}};OJ._onOjScroll=function(i){var l=OJ._viewport;l.top=window.pageYOffset?window.pageYOffset:document.body.scrollTop;l.left=window.pageXOffset?window.pageXOffset:document.body.scrollLeft;l.bottom=l.top+l.height;l.right=l.left+l.width};OJ._onOjOrientationChange=function(i){OJ.dispatchEvent(OjOrientationEvent.convertDomEvent(i))};if(window.addEventListener){window.addEventListener("resize",OJ._onOjResize,false);window.addEventListener("scroll",OJ._onOjScroll,false);window.addEventListener("orientationchange",OJ._onOjOrientationChange,false)}else{window.attachEvent("onresize",OJ._onOjResize,false);window.attachEvent("onscroll",OJ._onOjScroll,false);window.attachEvent("onorientationchange",OJ._onOjOrientationChange,false)}})();if(!Array.isArray){Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"}}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(b){var a=this.length;var c=Number(arguments[1])||0;c=(c<0)?Math.ceil(c):Math.floor(c);if(c<0){c+=a}for(;c<a;c++){if(c in this&&this[c]===b){return c}}return -1}}Array.array=function(a){if(isNull(a)){return[]}else{if(Array.isArray(a)){return a}else{if((isObject(a)||isFunction(a))&&!isUndefined(a.length)){return[].slice.call(a,0)}}}return[a]};Array.prototype.clone=function(){return this.slice(0)};Array.prototype.equalize=function(d){var c=this.length,a,b=null;if(!Array.isArray(d)){b=d;d=[d]}a=d.length;while(a-->c){d.push(b)}return d};Array.slice=function(b,c){var a=Array.array(arguments);b=Array.array(b);return b.slice.apply(b,a.slice(1))};Array.prototype.origReplace=Array.prototype.replace;Array.prototype.replace=function(e,c){var a,b,d;if(Array.isArray(e)){a=this.clone();d=e.length;c=e.equalize(c);for(b=0;b<d;b++){a=a.origReplace(e[b],c[b])}return a}else{return this.origReplace(e,c)}};Array.prototype.replaceAll=function(d,b){var c=arguments.length>2&&arguments[2];var l=[],f=0,h=this.length,e,a,k,g;if(Array.isArray(d)){a=d.length;b=d.equalize(b);for(f;f<h;f++){g=this[f];for(e=0;e<a;e++){if(d[e]==g){l.push(b[e])}else{if(c&&Array.isArray(g)){l.push(g.replaceAll(d[e],b[e],true))}else{l.push(g)}}}}}else{for(f;f<h;f++){g=this[f];if(d==g){l.push(b)}else{if(c&&Array.isArray(g)){l.push(g.replaceAll(d,b,true))}else{l.push(g)}}}}return l};if(!Date.time){Date.time=function(){return(new Date()).getTime()}}if(!Date.prototype.isEqual){Date.prototype.isEqual=function(a){return isDate(a)&&this.getTime()==a.getTime()}}if(!Function.prototype.bind){Function.prototype.bind=function(b){if(!isFunction(this)){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var f=Array.array(arguments).slice(1),e=this,c=function(){},d=function a(){return e.apply(this instanceof c&&b?this:b,f.concat(Array.array(arguments)))};c.prototype=this.prototype;d.prototype=new c();return d}}if(!Math.signedCeil){Math.signedCeil=function(a){if(a<0){return Math.floor(a)}return Math.ceil(a)}}if(!Math.signedFloor){Math.signedFloor=function(a){if(a<0){return Math.ceil(a)}return Math.floor(a)}}if(!Math.bounds){Math.bounds=function(b,c,a){return Math.min(Math.max(c,b),a)}}Number.prototype.oldToString=Number.prototype.toString();Number.prototype.toFormattedString=function(a,d){var c="",b=this.valueOf().split(".");if(a){while(b[0].length<a){b[0]="0"+b[0]}c=b[0]}if(d){c+=".";while(b[1].length<d){b[1]+="0"}c+=b[1]}return c};if(!Object.create){Object.create=function(b){if(arguments.length>1){throw new Error("Object.create implementation only accepts the first parameter.")}function a(){}a.prototype=b;return new a()}}if(!Object.keys){Object.keys=function(c){if(c!==Object(c)){throw new TypeError("Object.keys called on non-object")}if(c.__count__){return c.__count__}var b,a=[];for(b in c){if(Object.prototype.hasOwnProperty.call(c,b)){a.push(b)}}b=null;return a}}Object.numKeys=function(a){return Object.keys(a).length};Object.toJson=function(a){};Object.clone=function(c){var a={},b;for(b in c){a[b]=c[b]}return a};String.string=function(a){if(!a){return""}return isObject(a)?a.toString():String(a)};String.prototype.lcFirst=function(){return this.charAt(0).toLowerCase()+this.slice(1)};String.prototype.ucFirst=function(){return this.charAt(0).toUpperCase()+this.slice(1)};String.prototype.capitalize=function(){var c=this.split(" ");var b="",a=c.length;while(a-->0){if(b!=""){b=" "+b}b=c[a].ucFirst()+b}return b};String.prototype.compareVersion=function(a){var c=0,b=0,h=this.split("."),g=a.split("."),f=Math.max(h.length,g.length);for(;c<f;c++){var e=(c<h.length)?parseInt(h[c],10):0,d=(c<g.length)?parseInt(g[c],10):0;if(isNaN(e)){e=0}if(isNaN(d)){d=0}if(e!=d){b=(e>d)?1:-1;break}}return b};String.prototype.count=function(a){return(this.match(new RegExp(a.regexEscape(),"g"))||[]).length};String.prototype.decodeUri=function(){return decodeURIComponent(this)};String.prototype.encodeUri=function(){return encodeURIComponent(this)};String.prototype.html=function(){return this.replaceAll(["\n","\t"],["<br />","&nbsp;&nbsp;&nbsp;&nbsp;"])};String.prototype.isEmpty=function(){return this.trim()!=""};String.prototype.trim=function(){return this.replace(/^\s\s*/,"").replace(/\s\s*$/,"")};String.prototype.ltrim=function(){return this.replace(/^\s+/,"")};String.prototype.rtrim=function(){return this.replace(/\s+$/,"")};String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ")};String.prototype.clean=function(a){return a.replace(/\r/g,"")};String.prototype.regexSpecialChars=new RegExp("[.*+?|()\\[\\]{}\\\\]","g");String.prototype.regexEscape=function(){return this.replace(String.prototype.regexSpecialChars,"\\$&")};String.prototype.replaceAll=function(e,b){if(Array.isArray(e)){var d=this,a,c=e.length;b=e.equalize(b);for(a=0;a<c;a++){d=d.replace(new RegExp(e[a].regexEscape(),"g"),b[a])}return d}else{return this.replace(new RegExp(e.regexEscape(),"g"),b)}};function isAlien(a){return isObject(a)&&!isFunction(a.constructor)}function isArray(a){return Array.isArray(a)}function isBoolean(a){return typeof a==="boolean"}function isDate(a){return isObject(a)&&a.getMonth}function isDomElement(a){return a&&(!isUndefined(a.childNodes)||a.nodeType)}function isEvent(a){return a&&typeof Event!="undefined"&&a.eventPhase}function isHash(a){return isObject(a)&&isUndefined(a.prototype)}function isInt(b){var a=parseInt(b);if(isNaN(a)){return false}return b==a&&b.toString()==b.toString()}function isNull(a){return a===null}function isFunction(a){return isSet(a)&&typeof a==="function"}function isNumber(a){return isSet(a)&&typeof a==="number"&&isFinite(a)}function isObject(a){return isSet(a)&&a instanceof Object&&!isArray(a)}function isString(a){return isSet(a)&&(typeof a==="string"||a.constructor.toString()==="string")}function isUndefined(a){return typeof a==="undefined"}function isObjective(a){return isObject(a)&&isSet(a._id_)&&isFunction(a._constructor)}function isElement(a){return isObjective(a)&&isSet(a._dom)}function isComponent(a){return isElement(a)&&isSet(a._template)}function isXml(b){var a=(b?b.ownerDocument||b:0).documentElement;return a?a.nodeName!=="HTML":false}function toXml(b){if(isString(b)){if(window.DOMParser){return(new DOMParser()).parseFromString(b,"text/xml")}var a=new ActiveXObject("Microsoft.XMLDOM");a.async=false;a.loadXML(b);return a}return isXml(b)?b:null}function isEmpty(a){return isUnset(a)||a==false||(isString(a)&&a.trim()=="")||(isArray(a)&&a.length==0)||(isObject(a)&&isEmptyObject(a))||(isObjective(a)&&a.is("OjCollection")&&!a.numItems())}function isEmptyObject(b){var a,c;if(isArray(b)){return b.length==0}else{if(isObject(b)){for(a in b){c=b[a];if(!isUndefined(c)&&!isFunction(c)){return false}}}}return true}function isFalse(a){return isNull(a)||a===false||a===0||(isString(a)&&(a.toLowerCase()=="false"||a=="0"))}function isNumeric(a){return isSet(a)&&isFinite(parseFloat(a))}function isSet(a){return !isUnset(a)}function isTrue(a){return !isFalse(a)}function isUnset(a){return isNull(a)||isUndefined(a)}function trace(d){if(OJ._("mode")==OJ.PROD){return}var c=arguments.length,b;if(c<2){console.log(d)}else{var a=[];for(b=0;b<c;b++){a.push(arguments[b])}console.log(a)}}function traceGroup(){var a=arguments.length;if(a){if(a>1&&arguments[1]&&!isUndefined(console.groupCollapsed)){console.groupCollapsed(arguments[0])}else{console.group(arguments[0])}}else{console.groupEnd()}}if(!isSet(window.console)||!isObject(window.console)){window.console={}}if(!isSet(console.log)||!isFunction(console.log)){console.log=function(){}}if(!isSet(console.group)||!isFunction(console.group)){console.group=console.groupCollapsed=console.groupEnd=console.log}traceGroup("Picking the oranges.",true);OJ.importJs("oj.data.OjObject");OJ.importJs("oj.utils.OjQueryString");OJ.importJs("oj.utils.OjJson");OJ.importJs("oj.events.OjActionable");OJ.importJs("oj.events.OjEventManager");OJ.importJs("oj.events.OjTextEvent");OJ.importJs("oj.events.OjErrorEvent");OJ.importJs("oj.net.OjUrl");OJ.importJs("oj.net.OjUrlRequest");OJ.importJs("oj.net.OjUrlLoader");OJ.importJs("oj.utils.OjLibrary");function onDomReady(){var m;if(!document.head){document.head=document.getElementsByTagName("head");if(document.head.length){document.head=document.head[0]}else{document.head=null}}var h=OJ.byId(OJ._("target"));if(h){var n=h.attributes,j,l=["mode","version"],k=l.length;for(;k--;){if((j=l[k])&&n[j]){OJ.setting(j,n[j].value);h.removeAttribute(j)}}k=n.length;for(;k--;){j=n[k].nodeName;if(j=="id"||j=="class"||j.substr(0,3)=="on-"){continue}OJ.setting(OJ.attributeToFunc(j),n[k].value);h.removeAttribute(j)}OJ._target=h}if(!OJ._theme_elm){OJ.setting("theme",OJ.setting("theme"))}if(OJ._("mode")==OJ.LOADING){OJ.setting("mode",OJ.PROD)}for(m in OJ._loaded){OJ._loaded[m+OJ.getVersionQuery()]=true}OJ._library=new OjLibrary(OJ._loaded);OJ.importJs("oj.dom.OjElement");OJ.importJs("oj.timer.OjTimerManager");OJ.importJs("oj.utils.OjHistoryManager");OJ.importJs("oj.window.OjWindowManager");OJ.importJs("oj.nav.OjView");OJ.importJs("oj.events.OjTransformEvent");OJ.importJs("oj.fx.OjFade");OJ.importJs("oj.fx.OjTweenSet");var c=new OjView();c.setAlpha(0);c.addChild(c.renderer=new OjStyleElement('<div class="renderer"></div>'));var o,b=0,k=OJ._events.length;for(;b<k;b++){o=OJ._events[b];if(o.action=="add"){c.addEventListener(o.type,o.context,o.func)}else{c.removeEventListener(o.type,o.context,o.func)}}delete OJ._events;delete OJ._handleEvent;delete OJ.addEventListener;delete OJ.removeEventListener;c.bulkSet(OJ);c.addCss("OJ");window.OJ=c;OJ.dispatchEvent(new OjEvent(OjEvent.LOAD));OJ._setProxy(document.body);if(OJ._os==OJ.IOS){c.dom().onclick=function(){}}OJ._onOjResize(null);OJ._onOjScroll(null);if(OJ.isMobile()){OJ.addCss("is-mobile")}if(OJ.isTablet()){OJ.addCss("is-tablet")}var a=OJ.getPixelRatio();if(a<=0.75){OJ.addCss("ld")}else{if(a>=1.5){OJ.addCss("hd")}else{OJ.addCss("sd")}}OJ._setIsDisplayed(true);try{var d=OJ.getBrowser(),g=OJ.getBrowserVersion();OJ._is_supported=!(OJ.isComputer()&&((d==OJ.IE&&g.compareVersion("9.0")<0)||(d==OJ.FIREFOX&&g.compareVersion("2.0")<0)||(d==OJ.CHROME&&g.compareVersion("4.0")<0)||(d==OJ.SAFARI&&g.compareVersion("5.0")<0)||(d==OJ.OPERA&&g.compareVersion("10.5")<0)))}catch(f){OJ._is_supported=false}OJ._interval=setInterval(window.onOjReady,100)}function onOjReady(){if(isEmpty(OjStyleElement.getStyle(document.body,"minWidth"))){return}clearInterval(OJ._interval);traceGroup();traceGroup("Juicing the oranges.",true);if(OJ._target){OJ._setDomSource(OJ._target,OJ);OJ._target=null}else{document.body.appendChild(OJ.dom())}var b=OJ._("init");if(b){b()}traceGroup();traceGroup("Your OJ is ready. Enjoy!",true);OJ._is_ready=true;OJ.fadeIn();if(!OJ.isSupported()){var a=WindowManager.makeAlert("UnSupported Browser",OJ._("supportMessage"));a.hideButtons();a.setPaneWidth(425);WindowManager.show(a);return}OJ.dispatchEvent(new OjEvent(OjEvent.READY));traceGroup()};