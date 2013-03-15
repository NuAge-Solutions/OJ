OJ.importJs('oj.events.ErrorEvent');


'use strict';

OJ.extendClass(
	OjErrorEvent, 'OjIoErrorEvent',
	{},
	{
		'IO_ERROR'   : 'ioError',
		'IO_TIMEOUT' : 'ioTimeout'
	}
);