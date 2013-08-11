OJ.importJs('oj.events.OjErrorEvent');


'use strict';

OJ.extendClass(
	'OjIoErrorEvent', [OjErrorEvent],
	{},
	{
		'IO_ERROR'   : 'onIoError',
		'IO_TIMEOUT' : 'onIoTimeout'
	}
);