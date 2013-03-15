OJ.importJs('oj.media.Media');


'use strict';

OJ.extendComponent(
	OjMedia, 'OjVideo',
	{
		'_tag' : '<video></video>'
	},
	{
		'supportedVideo' : function(){
			return ['video'];
		}
	}
);