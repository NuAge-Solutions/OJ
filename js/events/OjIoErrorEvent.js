OJ.importJs('oj.events.OjErrorEvent');


'use strict';

OJ.extendClass(
	OjErrorEvent, 'OjIoErrorEvent',
	{},
	{
		'IO_ERROR'   : 'onIoError',
		'IO_TIMEOUT' : 'onIoTimeout'
	}
);