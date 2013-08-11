'use strict';

OJ.extendClass(
	'OjEventPhase', [OjObject],
	{},
	{
		'BUBBLING'  : 3,
		'CAPTURING' : 1,
		'TARGETING' : 2
	}
);