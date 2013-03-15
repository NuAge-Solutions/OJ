OJ.importJs('oj.events.MouseEvent');


'use strict';

OJ.extendClass(
	OjMouseEvent, 'OjDragEvent',
	{
		'_get_props_' : {
			'deltaX'   : 0,
			'deltaY'   : 0
		},


		'_constructor' : function(type, deltaX, deltaY, mouseEvent/*, bubbles, cancelable*/){
			var args = [].slice.call(arguments, 4);

			args.unshift(type);

			this._s('OjDragEvent', '_constructor', args);

			this._deltaX = deltaX;
			this._deltaY = deltaY;

			this._pageX = mouseEvent._pageX;
			this._pageY = mouseEvent._pageY;
		},


		'clone' : function(){
			var clone = this._s('OjDragEvent', 'clone', arguments);

			clone._deltaX = this._deltaX;
			clone._deltaY = this._deltaY

			return clone;
		}
	},
	{
		'isDragEvent' : function(type){
			return type == OjDragEvent.DRAG || type == OjDragEvent.DRAG_END || type == OjDragEvent.DRAG_INIT;
		},

		'DRAG'      : 'onDrag',
		'DRAG_END'  : 'onDragEnd',
		'DRAG_INIT' : 'onDragInit'
	}
);