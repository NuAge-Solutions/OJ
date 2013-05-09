OJ.importJs('oj.media.OjMedia');


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