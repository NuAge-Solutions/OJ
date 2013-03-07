OJ.importJs('oj.media.Media');


'use strict';

OJ.compileComponent(
	'OjVideo',
	oj.media.Video = function(){
		return new oj.media.Media(
			arguments, 'OjVideo',
			{
				'_tag' : '<video></video>'
			}
		);
	},
	{
		'supportedVideo' : function(){
			return ['video'];
		}
	}
);