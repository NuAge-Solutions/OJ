function hexToRgb(hex){
    var bigint = parseInt(hex, 16);

    return [
        (bigint >> 16) & 255,
        (bigint >> 8) & 255,
        bigint & 255
    ];
}

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


// true if the obj is a oj class
function isObjective(obj, cls){
    return obj && isSet(obj.oj_id) && isFunction(obj._constructor) && (!cls || obj.is(cls));
}
function isObjectiveClass(cls){
    return isFunction(cls) && isSet(cls.TYPE_KEY);
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
    return isUnset(obj) || obj === false || obj === 0 || (isString(obj) && (obj.toLowerCase() == "false" || obj == "0"));
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




/*
 * DOM Ready Event Handler
 */
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

    // create the OJ component
    var tmp = new OjView();
    tmp.alpha = 0;

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

    // setup css
    var os = OJ.os,
        scale = OJ.pixel_ratio,
        css = [];

    //if(os == OJ.IOS){
    //    tmp.dom.onclick = function(){};
    //}
    // setup dev
    if(OJ.mode == OJ.DEV){
        css.append('is-dev');
    }

    // setup the css classes for special displays
    OJ._onOjResize(null);
    OJ._onOjScroll(null);

    if(OJ.is_mobile){
        css.append('is-mobile');
    }
    else if(OJ.is_tablet){
        css.append('is-tablet');
    }

    if(os == OJ.ANDROID){
        css.append('is-android');
    }
    else if(os == OJ.IOS){
        css.append('is-ios');
    }
    else if(os == OJ.LINUX){
        css.append('is-linux');
    }
    else if(os == OJ.MAC){
        css.append('is-mac');
    }
    else if(os == OJ.WINDOWS){
        css.append('is-windows');
    }

    // setup resolution css
    if(scale >= 1.5){
        css.append('2x'); // 2x resolution
    }
    else if(scale >= 2.5){
        css.append('3x'); // 3x resolution
    }
    else{
        css.append('1x'); // 1x resolution
    }

    // add the css
    OJ.addCss(css);

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
    var on_ready = setInterval(
        // on oj ready event handler
        function(){
            // this is so we know all the css has been applied
            if(isEmpty(OjStyleElement.getStyle(document.body, "minWidth"))){
                return;
            }

            clearInterval(on_ready);

            // close up the loading group logs
            printCloseGroup();

            // run this init function if any
            printGroup("Juicing the oranges.", true);

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
            printGroup("Your OJ is ready. Enjoy!", true);

            OJ._is_ready = true;

            // show it
            OJ.alpha = 1.0;

            OJ.dispatchEvent(new OjEvent(OjEvent.READY));

            // detect if the browser is not supported
            if(!OJ.is_supported){
                var alrt = WindowManager.makeAlert(OJ.support_message, "Unsupported Browser");
                alrt.hideButtons();
                alrt.pane_width = 425;

                WindowManager.show(alrt);

                return;
            }

            printCloseGroup();
        },
        1
    );
}
