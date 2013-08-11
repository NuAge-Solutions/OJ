OJ.importJs('oj.media.OjMedia');


'use strict';

OJ.extendComponent(
	'OjVideo', [OjMedia],
	{
		'_tag' : '<video></video>'
	},
	{
		'supportedVideo' : function(){
			return ['video'];
		}
	}
);