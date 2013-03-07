OJ.importJs('oj.components.Spinner');
OJ.importJs('oj.events.Event');

OJ.importCss('oj.media.Media');


'use strict';

OJ.compileClass(
	'OjMedia',
	oj.media.Media = function(){
		return new oj.components.Component(
			arguments, 'OjMedia',
			{
				'__HEIGHT' : 'height',
				'__WIDTH'  : 'width',


				'_properties_' : {
					'resizeBy' : 'width',
					'source'   : null
				},

				'_loaded' : false, '_original_w' : null,  '_original_h' : null,  '_source_is_css' : false,


				'_constructor' : function(/*source*/){
					this._super('OjMedia', '_constructor', []);

					if((this.media = this._makeMedia()) && isObjective(this.media)){
						this.addChild(this.media);
						this.media.addClasses('media');
					}

					if(arguments.length){
						this.setSource(arguments[0]);
					}
				},

				'_destructor' : function(){
					this._unset('media');
					this._unset('loading');

					return this._super('OjMedia', '_destructor', arguments);
				},

//				'_setDomSource' : function(dom_elm){
//					var rtrn = this._super('OjMedia', '_setDomSource', arguments);
//
//					if(this._source){
//						this.addChild(this.media);
//					}
//
//					return rtrn;
//				},

				'_makeMedia' : function(){ },

				'_resize' : function(){
					if(this._source_is_css){
						this.media.setWidth(OjStyleElement.AUTO);
						this.media.setHeight(OjStyleElement.AUTO);

						return;
					}

					var w = this._getStyleBackup('width'),
						h = this._getStyleBackup('height');

					if(!isEmpty(w)){
						this.media.setWidth('100', '%');

						if(h){
							this.media.setHeight('100', '%');
						}
						else{
							this.media.setHeight(OjStyleElement.AUTO);
						}
					}
					else if(!isEmpty(h)){
						this.media.setHeight('100', '%');

						this.media.setWidth(OjStyleElement.AUTO);
					}
					else if(this._resizeBy == this._static('WIDTH')){
						this.media.setWidth('100', '%');
						this.media.setHeight(OjStyleElement.AUTO);
					}
					else{
						this.media.setHeight('100', '%');
						this.media.setWidth(OjStyleElement.AUTO);
					}
				},

				'_setSource' : function(url){
					this._source_is_css = (this._source = url).charAt(0) == '@'

					// reset the sizing
					this.media.setWidth(OjStyleElement.AUTO);
					this.media.setHeight(OjStyleElement.AUTO);

					this.media.setMaxWidth(OjStyleElement.AUTO);
					this.media.setMaxHeight(OjStyleElement.AUTO);
				},


				'_onMediaLoad' : function(evt){
					this._unset('loading');

					this._loaded = true;

					if(this._source_is_css){
						this._original_w = this.media.getWidth();
						this._original_h = this.media.getHeight();
					}
					else{
						this._original_w = this.media.dom().width;
						this._original_h = this.media.dom().height;
					}

					// make sure we don't allow up-scaling
					if(this._original_w){
						this.media.setMaxWidth(this._original_w);
					}

					if(this._original_h){
						this.media.setMaxHeight(this._original_h);
					}

					this._resize();
				},


				'isLoaded' : function(){
					return this._loaded;
				},


				// Getter & Setter Functions
				'setHeight' : function(val){
					this._super('OjMedia', 'setHeight', arguments);

					if(val == OjStyleElement.AUTO || arguments.length > 1){
						this._resize();
					}
				},

				'setInnerHeight' : function(val){
					this._super('OjMedia', 'setInnerHeight', arguments);

					this._resize();
				},
				'setInnerWidth' : function(val){
					this._super('OjMedia', 'setInnerWidth', arguments);

					this._resize();
				},

				'getOriginalHeight' : function(){
					return this._original_h;
				},

				'getOriginalWidth' : function(){
					return this._original_w;
				},

				'setSource' : function(url){
					if(Array.isArray(url)){
						url = url.join(', ');
					}
					else if(url){
						url = url.toString();
					}

					// make sure we don't do extra work with loading the same media twice
					if(this._source == url){
						return;
					}

					if(!this.loading){
						this.addChild(this.loading = new OjSpinner());
					}

					this._setSource(url);
				},

				'setResizeBy' : function(val){
					if(this._resizeBy == val){
						return;
					}

					this._resizeBy = val;

					this._resize();
				},
				
				'setWidth' : function(val){
					this._super('OjMedia', 'setWidth', arguments);

					if(val == OjStyleElement.AUTO || arguments.length > 1){
						this._resize();
					}
				}
			}
		);
	}
);