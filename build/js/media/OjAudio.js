OJ.importJs("oj.media.OjMedia");"use strict";OJ.extendComponent("OjAudio",[OjMedia],{_sources:null,_makeMedia:function(){var a=new OjStyleElement("<audio></audio>");return a},_setSource:function(a){this._super(OjMedia,"_setSource",arguments);if(this.media){this.media.setAttr("src",this._source)}},_onMediaLoad:function(a){},pause:function(){if(this.media){this.media.dom().pause()}},play:function(){if(this.media){this.media.dom().play()}},stop:function(){if(this.media){if(this.media.load){this.media.dom().load()}else{this.media.setAttr("src",null);this.media.setAttr("src",this._source)}}},getSources:function(){if(this._sources){return this._sources.clone()}return[]},setSources:function(a){this._sources=a?a.clone():[];var c=this._sources.length;if(this.media){for(var b=0;b<c;b++){if(this.media.canPlayType(OjAudio.audioType(this._sources[b]))==""){}}}else{if(c){this.setSource(this._sources[c])}}}},{MP3:"audio/mpeg",MP4:"audio/mp4",OGG:"audio/ogg",WAV:"audio/x-wav",audioType:function(a){var c=OjUrl.url(a).getPath().split("."),b=c.pop();if(!b){return null}b=b.toLowerCase();if(b=="mp3"||b=="mpeg"||b=="mpeg1"||b=="mpeg2"||b=="mpeg3"){return this.MP3}if(b=="mp4"||b=="m4a"||b=="m4p"||b=="m4b"||b=="m4r"||b=="m4v"){return this.MP4}if(b=="ogg"){return this.OGG}if(b=="wav"){return this.WAV}return null},_TAGS:["audio"]});