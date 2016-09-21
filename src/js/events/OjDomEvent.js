importJs('oj.events.OjEvent');




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