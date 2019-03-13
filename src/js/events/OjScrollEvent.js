importJs('oj.events.OjDomEvent');




OJ.extendClass(
    'OjScrollEvent', [OjDomEvent],
    {
        '_get_props_' : {
            'scroll_x' : NaN,
            'scroll_y' : NaN
        },


        '_constructor' : function(type, scroll_x, scroll_y/*, bubbles, cancelable*/){
            var args = Array.array(arguments).slice(3);
            args.unshift(type);

            this._super(OjDomEvent, '_constructor', args);

            this._scroll_x = scroll_x;
            this._scroll_y = scroll_y;
        },


        'clone' : function(){
            var clone = this._super(OjDomEvent, 'clone', arguments);

            clone._scroll_x = this._scroll_x;
            clone._scroll_y = this._scroll_y;

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