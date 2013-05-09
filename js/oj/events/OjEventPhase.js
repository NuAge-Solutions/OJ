'use strict';

OJ.extendClass(
	OjObject, 'OjEventPhase',
	{},
	{
		'BUBBLING'  : 3,
		'CAPTURING' : 1,
		'TARGETING' : 2
	}
);