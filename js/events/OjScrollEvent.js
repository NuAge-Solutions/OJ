OJ.importJs('oj.events.OjDomEvent');


'use strict';

OJ.extendClass(
	OjDomEvent, 'OjScrollEvent',
	{
		'_get_props_' : {
			'scrollX' : NaN,
			'scrollY' : NaN
		},


		'_constructor' : function(type/*, bubbles, cancelable, scrollX = NaN, scrollY = NaN*/){
			var args = Array.array(arguments),
				ln = args.length;

			this._super('OjScrollEvent', '_constructor', ln > 3 ? args.slice(0, 3) : args);

			if(ln > 3){
				this._scrollX = args[3];

				if(ln > 4){
					this._scrollY = args[4];
				}
			}
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