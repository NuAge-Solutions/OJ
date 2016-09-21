importJs('oj.media.OjMedia');




OJ.extendComponent(
    'OjAudio', [OjMedia],
    {
        '_sources' : null,


        '_makeMedia' : function(){
            var elm = new OjStyleElement('<audio></audio>');

//            elm.addEventListener('load', this._callback = this._onMediaLoad.bind(this));

            return elm;
        },

        '_setSource' : function(url){
            this._super(OjMedia, '_setSource', arguments);

            if(this.media){
                this.media.attr('src', this._source);
            }
        },


        '_onMediaLoad' : function(evt){

        },


        'pause' : function(){
            if(this.media){
                this.media.dom.pause();
            }
        },

        'play' : function(){
            if(this.media){
                this.media.dom.play();
            }
        },

        'stop' : function(){
            if(this.media){
                if(this.media.load){
                    this.media.dom.load();
                }
                else{
                    this.media.attr('src', null);
                    this.media.attr('src', this._source);
                }
            }
        },


        '.sources' : function(){
            if(this._sources){
                return this._sources.clone();
            }

            return [];
        },
        '=sources' : function(sources){
            this._sources = sources ? sources.clone() : [];

            var ln = this._sources.length;

            if(this.media){
                for(var i = 0; i < ln; i++){
                    if(this.media.canPlayType(OjAudio.audioType(this._sources[i])) == ''){

                    }
                }
            }
            else if(ln){
                this.source = this._sources[ln];
            }
        }
    },
    {
        'MP3' : 'audio/mpeg',
        'MP4' : 'audio/mp4',
        'OGG' : 'audio/ogg',
        'WAV' : 'audio/x-wav',

        'audioType' : function(url){
            var parts = OjUrl.url(url).path.split('.'),
                ext = parts.pop();

            if(!ext){
                return null;
            }

            ext = ext.toLowerCase();

            if(ext == 'mp3' || ext == 'mpeg' || ext == 'mpeg1' || ext == 'mpeg2' || ext == 'mpeg3'){
                return this.MP3;
            }

            if(ext == 'mp4' || ext == 'm4a' || ext == 'm4p' || ext == 'm4b' || ext == 'm4r' || ext == 'm4v'){
                return this.MP4;
            }

            if(ext == 'ogg'){
                return this.OGG;
            }

            if(ext == 'wav'){
                return this.WAV
            }

            return null;
        },

        '_TAGS' : ['audio']
    }
);