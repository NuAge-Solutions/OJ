importJs('oj.media.OjMedia');




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