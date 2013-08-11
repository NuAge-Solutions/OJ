OJ.importJs('oj.media.OjMedia');


'use strict';

OJ.extendComponent(
	'OjFlash', [OjMedia],
	{
		'_tag' : '<object></object>'
	},
	{
		'_TAGS' : ['flash']
	}
);