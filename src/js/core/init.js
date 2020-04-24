(function(){
    // detect script element
    var script_elms = document.getElementsByTagName("script"),
        ln = script_elms.length,
        src, index, path;

    for(; ln--;){
        src = script_elms[ln].getAttribute("src");
        index = src.indexOf('//'); // detect protocol mode

        // search for oj file
        if(src.indexOf("oj/main") > -1){
            break;
        }
    }

    // process the protocol and setup the path
    if(index > -1){
        path = src;

        OJ._protocol = (!index ? window.location.protocol : src.substring(0, index)).replace(':', '');
    }
    else{
        path = window.location.href.split("#")[0].split('/');

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

    // detect the browser, os and version
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
    try{
        const user_agent = navigator.userAgent.toLowerCase();

        if(/(android)/i.test(user_agent)){
            const v = navigator.appVersion.match(/(.*)Android\ (.*);\ (.*)/);

            OJ._os = OJ.ANDROID;
            OJ._os_version = v[2];

            OJ._is_tablet = !(OJ._is_mobile = /(mobile)/i.test(user_agent));
            OJ._is_touch_capable = true;
            OJ._is_webview = /(.*);\ wv/g.test(navigator.appVersion);

            // check for in app
            if(!OJ._browser_version){
                OJ._browser_version = OJ.IN_APP;
            }
        }
        else if(/(iphone|ipod|ipad)/i.test(user_agent)){
            const v = navigator.appVersion.match(/OS\ (\d+)_(\d+)_?(\d+)?/);

            OJ._os = OJ.IOS;
            OJ._is_tablet = !(OJ._is_mobile = (user_agent.indexOf("ipad") == -1));
            OJ._is_touch_capable = true;
            OJ._is_webview = !(/safari/i.test(user_agent)) || (/crios/i.test(user_agent));

            OJ._os_version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)].join(".");

            // check for in app
            if(!OJ._browser_version){
                OJ._browser_version = OJ.IN_APP;
            }
        }
        else if(/(Macintosh;)/i.test(user_agent)){
            let v = navigator.appVersion.match(/Mac\ OS\ X\ (\d+)_(\d+)_?(\d+)?/);

            OJ._os = OJ.MAC;
            OJ._is_tablet = false;
            OJ._is_touch_capable = false;
            OJ._is_webview = !(/safari/i.test(user_agent));

            if(v){
                OJ._os_version = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)].join(".");
            }
            else{
                v = navigator.userAgent.match(/Mac\ OS\ X\ (\d+).(\d+)?/);

                OJ._os_version = [parseInt(v[1], 10), parseInt(v[2], 10)].join(".");
            }

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
                     'id' : 'macOS'
                    },
                    {
                     's' : navigator.platform,
                     'sub' : 'Linux',
                     'id' : 'Linux'
                    },
                    {
                     's' : navigator.platform,
                     'sub' : 'CrOS',
                     'id' : 'Chromium OS'
                    }
                ]
            ) || null;
        }
    }
    catch(e){
        // do nothing
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

    // setup browser event listeners
    if(window.addEventListener){
        window.addEventListener("resize", OJ._onOjResize, false);
        window.addEventListener("scroll", OJ._onOjScroll, false);
        window.addEventListener("orientationchange", OJ._onOjOrientationChange, false);
    }
    else{
        window.attachEvent("onresize", OJ._onOjResize, false);
        window.attachEvent("onscroll", OJ._onOjScroll, false);
        window.attachEvent("onorientationchange", OJ._onOjOrientationChange, false);
    }

    printGroup("Picking the oranges.", true);
})();