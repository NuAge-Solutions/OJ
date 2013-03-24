OJ.importJs('oj.events.ErrorEvent');


'use strict';

OJ.extendClass(
	OjErrorEvent, 'OjIoErrorEvent',
	{},
	{
		'IO_ERROR'   : 'onIoError',
		'IO_TIMEOUT' : 'onIoTimeout'
	}
);