OJ.importJs('oj.events.MouseEvent');


'use strict';

OJ.compileClass(
	'OjDragEvent',
	oj.events.DragEvent = function(){
		return new oj.events.MouseEvent(
			arguments, 'OjDragEvent',
			{
				'_get_properties_' : {
					'deltaX'   : 0,
					'deltaY'   : 0
				},


				'_constructor' : function(type, deltaX, deltaY, mouseEvent/*, bubbles, cancelable*/){
					var args = [].slice.call(arguments, 4);

					args.splice(0, 0, type);

					this._super('OjDragEvent', '_constructor', args);

					this._deltaX = deltaX;
					this._deltaY = deltaY;

					this._pageX = mouseEvent._pageX;
					this._pageY = mouseEvent._pageY;
				},


				'clone' : function(){
					var clone = this._super('OjDragEvent', 'clone', arguments);

					clone._deltaX = this._deltaX;
					clone._deltaY = this._deltaY

					return clone;
				}
			}
		)
	},
	{
		'isDragEvent' : function(type){
			return type == OjDragEvent.DRAG || type == OjDragEvent.DRAG_END || type == OjDragEvent.DRAG_INIT;
		},

		'DRAG'      : 'mouseDrag',
		'DRAG_END'  : 'mouseDragEnd',
		'DRAG_INIT' : 'mouseDragInit'
	}
);