OJ.importJs('oj.media.OjMedia');


'use strict';

OJ.extendComponent(
	OjMedia, 'OjAudio',
	{
		'_sources' : null,


		'_makeMedia' : function(){
			var elm = new OjStyleElement('<audio></audio>');

//			elm.addEventListener('load', this._callback = this._onMediaLoad.bind(this));

			return elm;
		},

		'_setSource' : function(url){
			this._super('OjAudio', '_setSource', arguments);

			if(this.media){
				this.media.setAttr('src', this._source);
			}
		},


		'_onMediaLoad' : function(evt){

		},


		'pause' : function(){
			if(this.media){
				this.media.dom().pause();
			}
		},

		'play' : function(){
			if(this.media){
				this.media.dom().play();
			}
		},

		'stop' : function(){
			if(this.media){
				if(this.media.load){
					this.media.dom().load();
				}
				else{
					this.media.setAttr('src', null);
					this.media.setAttr('src', this._source);
				}
			}
		},


		'getSources' : function(){
			if(this._sources){
				return this._sources.clone();
			}

			return [];
		},
		'setSources' : function(sources){
			this._sources = sources ? sources.clone() : [];

			var ln = this._sources.length;

			if(this.media){
				for(var i = 0; i < ln; i++){
					if(this.media.canPlayType(OjAudio.audioType(this._sources[i])) == ''){

					}
				}
			}
			else if(ln){
				this.setSource(this._sources[ln]);
			}
		}
	},
	{
		'MP3' : 'audio/mpeg',
		'MP4' : 'audio/mp4',
		'OGG' : 'audio/ogg',
		'WAV' : 'audio/x-wav',

		'audioType' : function(url){
			var parts = OjUrl.url(url).getPath().split('.'),
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