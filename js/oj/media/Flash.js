OJ.importJs('oj.media.Media');


'use strict';

OJ.compileComponent(
	'OjFlash',
	oj.media.Flash = function(){
		return new oj.media.Media(
			arguments, 'OjFlash',
			{
				'_tag' : '<object></object>'
			}
		);
	},
	{
		'SUPPORTED_TAGS' : ['flash']
	}
);