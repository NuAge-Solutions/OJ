'use strict';

OJ.compileClass(
	'OjEventPhase',
	oj.events.EventPhase = function(){},
	{
		'BUBBLING'  : 3,
		'CAPTURING' : 1,
		'TARGETING' : 2
	}
);