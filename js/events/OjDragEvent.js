OJ.importJs('oj.events.OjMouseEvent');


'use strict';

OJ.extendClass(
	'OjDragEvent', [OjMouseEvent],
	{
		'_get_props_' : {
			'deltaX'   : 0,
			'deltaY'   : 0,
			'originX'  : 0,
			'originY'  : 0
		},


		'_constructor' : function(type, deltaX, deltaY, mouseEvent/*, bubbles, cancelable*/){
			var args = [].slice.call(arguments, 4);

			args.unshift(type);

			this._super(OjMouseEvent, '_constructor', args);

			this._deltaX = deltaX;
			this._deltaY = deltaY;

			this._pageX = mouseEvent._pageX;
			this._pageY = mouseEvent._pageY;
		},


		'clone' : function(){
			var clone = this._super(OjMouseEvent, 'clone', arguments);

			clone._deltaX = this._deltaX;
			clone._deltaY = this._deltaY

			return clone;
		}
	},
	{
		'isDragEvent' : function(type){
			return type == OjDragEvent.DRAG || type == OjDragEvent.END || type == OjDragEvent.START;
		},

		'END'   : 'onDragEnd',
		'MOVE'  : 'onDrag',
		'START' : 'onDragStart'
	}
);