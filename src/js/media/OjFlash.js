importJs('oj.media.OjMedia');




OJ.extendComponent(
    'OjFlash', [OjMedia],
    {
        '_tag' : '<object></object>'
    },
    {
        '_TAGS' : ['flash']
    }
);