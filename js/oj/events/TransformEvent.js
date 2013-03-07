OJ.importJs('oj.events.Event');


'use strict';

OJ.compileClass(
	'OjTransformEvent',
	oj.events.TransformEvent = function(){
		return new oj.events.Event(
			arguments, 'OjTransformEvent',
			{
				'_get_properties_' : {
					'deltaX'   : 0,
					'deltaY'   : 0,
					'pageX'    : 0,
					'pageY'    : 0
				},


				'_constructor' : function(type, pageX, pageY, deltaX, deltaY/*, bubbles, cancelable*/){
					var args = [].slice.call(arguments, 4);

					args.splice(0, 0, type);

					this._super('OjTransformEvent', '_constructor', args);

					this._deltaX = deltaX;
					this._deltaY = deltaY;

					this._pageX = pageX;
					this._pageY = pageY;
				},


				'clone' : function(){
					var clone = this._super('OjTransformEvent', 'clone', arguments);

					clone._deltaX = this._deltaX;
					clone._deltaY = this._deltaY;
					clone._pageX = this._pageX;
					clone._pageY = this._pageY;

					return clone;
				}
			}
		)
	},
	{
		'isTransformEvent' : function(type){
			return type == OjTransformEvent.MOVE || type == OjTransformEvent.RESIZE;
		},

		'MOVE'   : 'move',
		'RESIZE' : 'resize'
	}
);