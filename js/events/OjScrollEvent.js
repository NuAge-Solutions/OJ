OJ.importJs('oj.events.OjDomEvent');


'use strict';

OJ.extendClass(
	OjDomEvent, 'OjScrollEvent',
	{
		'_get_props_' : {
			'scrollX' : NaN,
			'scrollY' : NaN
		},


		'_constructor' : function(type, scrollX, scrollY/*, bubbles, cancelable*/){
			var args = Array.array(arguments).slice(3);
			args.unshift(type);

			this._super('OjScrollEvent', '_constructor', args);

			this._scrollX = scrollX;
			this._scrollY = scrollY;
		},


		'clone' : function(){
			var clone = this._super('OjScrollEvent', 'clone', arguments);

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

			return new OjScrollEvent(type, true, true, evt.target.scrollLeft, evt.target.scrollTop);
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