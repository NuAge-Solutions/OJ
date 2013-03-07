OJ.importJs('oj.events.ErrorEvent');


'use strict';

OJ.compileClass(
	'OjIoErrorEvent',
	oj.events.IoErrorEvent = function(){
		return new oj.events.ErrorEvent(arguments, 'OjIoErrorEvent');
	},
	{
		'IO_ERROR'   : 'ioError',
		'IO_TIMEOUT' : 'ioTimeout'
	}
);