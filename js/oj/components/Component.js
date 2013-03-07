OJ.importJs('oj.fx.Fade');

OJ.importCss('oj.components.Component');


'use strict';

OJ.compileComponent(
	'OjComponent',
	oj.components.Component = function(){
		return new oj.dom.StyleElement(
			arguments, 'OjComponent',
			{
				'__SUPPORTED_TAGS' : [],


				'_properties_' : {
					'isActive'   : false,
					'isDisabled' : false
				},

				'_fader' : null,  '_is_animated' : false ,  '_template' : null,  '_trans' : null,


				'_constructor' : function(){
					var args = [];

					// process the template if any
					if(this._template){
						if(this._template.charAt(0) == '<'){
							args.push(this._template);
						}
						else{
							args.push(OJ.importTemplate(this._template));
						}
					}
					else{
						args.push('<div></div>');
					}

					// call super constructor
					this._super('OjComponent', '_constructor', args);

					// add the class name inheritance as css classes
					this.addClasses.apply(this, this._class_names.slice(this._class_names.indexOf('OjComponent')));

					// setup the container
					this._setContainer(this.container ? this.container : this);
				},


				// override this so that the component gets properly set
				'_processChild' : function(dom_elm, component){
					return this._super('OjComponent', '_processChild', [dom_elm, this]);
				},

				'_processDomSourceChild' : function(dom_elm, component){
					return this._processChild(dom_elm, component);
				},


				'_setContainer' : function(container){
					this._setElmFuncs(container);

					if(this.container == container){
						return;
					}

					if(this.container){
						this.container.removeClasses('container');
					}

					if((this.container = container) != this){
						this.container.addClasses('container');
					}
				},

				'_setElmFuncs' : function(container){
					if(container != this && container.is('OjComponent')){
						this._elm_funcs = {
							'addElm'        : 'addElm',
							'addElmAt'      : 'addElmAt',
							'getElmAt'      : 'getElmAt',
							'getElms'       : 'getElms',
							'hasElm'        : 'hasElm',
							'indexOfElm'    : 'indexOfElm',
							'moveElm'       : 'moveElm',
							'numElms'       : 'numElms',
							'removeAllElms' : 'removeAllElms',
							'removeElm'     : 'removeElm',
							'removeElmAt'   : 'removeElmAt',
							'replaceElm'    : 'replaceElm',
							'replaceElmAt'  : 'replaceElmAt'
						};
					}
					else{
						this._elm_funcs = {
							'addElm'        : 'addChild',
							'addElmAt'      : 'addChildAt',
							'getElmAt'      : 'getChildAt',
							'getElms'       : 'getChildren',
							'hasElm'        : 'hasChild',
							'indexOfElm'    : 'indexOfChild',
							'moveElm'       : 'moveChild',
							'numElms'       : 'numChildren',
							'removeAllElms' : 'removeAllChildren',
							'removeElm'     : 'removeChild',
							'removeElmAt'   : 'removeChildAt',
							'replaceElm'    : 'replaceChild',
							'replaceElmAt'  : 'replaceChildAt'
						}
					}
				},

				'_setIsDisplayed' : function(displayed){
					if(this._is_displayed == displayed){
						return;
					}

					this._super('OjComponent', '_setIsDisplayed', arguments);

					if(displayed){
						this.redraw();
					}
				},

				'_setParent' : function(parent){
					var prev_parent = this._parent;

					this._super('OjComponent', '_setParent', arguments);

					if(prev_parent){
						if(!this._parent){
							this.dispatchEvent(new OjEvent(OjEvent.REMOVED));
						}
						else if(prev_parent != this._parent){
							this.dispatchEvent(new OjEvent(OjEvent.ADDED));
						}
					}
					else if(this._parent){
						this.dispatchEvent(new OjEvent(OjEvent.ADDED));
					}
				},

				'_setDomSource' : function(dom_elm){
					this._super('OjComponent', '_setDomSource', arguments);

					// fill it up
					var children = dom_elm.childNodes, ln = children.length, child;

					for(; ln--;){
						if(child = this._processDomSourceChild(children[ln], null)){
							this.addElmAt(child, 0);
						}
					}
				},


				'_processEvent' : function(evt){
					if(this._isDisabled){
						return false;
					}

					return this._super('OjComponent', '_processEvent', arguments);
				},

				// Component Management Functions
				'_callElmFunc' : function(func, args){
					if(!this._elm_funcs[func]){
						return;
					}

					if(func == 'addElm'){
						this._addElm(args[0], this.numElms());
					}
					else if(func == 'addElmAt'){
						this._addElm(args[0], args[1]);
					}
					else if(func == 'removeElm'){
						this._removeElm(args[0], this.indexOfElm(args[0]));
					}
					else if(func == 'removeElmAt'){
						this._removeElm(this.getElmAt(args[0]), args[0]);
					}
					else if(func == 'moveElm'){
						this._moveElm(args[0], args[1]);
					}
					else if(func == 'replaceElm'){
						this._replaceElm(args[0], this.indexOfElm(args[0]), args[1]);
					}
					else if(func == 'replaceElmAt'){
						this._replaceElm(this.getElmAt(args[0]), args[0], args[1]);
					}
					else if(func == 'removeAllElms'){
						this._removeAllElms();
					}

					return this.container[this._elm_funcs[func]].apply(this.container, args);
				},

				'_addElm' : function(elm, index){ },

				'_moveElm' : function(elm, index){ },

				'_removeAllElms' : function(){ },

				'_removeElm' : function(elm, index){ },

				'_replaceElm' : function(elm, index, new_elm){ },

				'addElm' : function(elm){
					return this._callElmFunc('addElm', arguments);
				},

				'addElmAt' : function(elm, index){
					return this._callElmFunc('addElmAt', arguments);
				},

				'getElmAt' : function(index){
					return this._callElmFunc('getElmAt', arguments);
				},

				'getElms' : function(){
					return this._callElmFunc('getElms', arguments);
				},

				'hasElm' : function(elm){
					return this._callElmFunc('hasElm', arguments);
				},

				'indexOfElm' : function(elm){
					return this._callElmFunc('indexOfElm', arguments);
				},

				'moveElm' : function(){
					return this._callElmFunc('moveElm', arguments);
				},

				'numElms' : function(){
					return this._callElmFunc('numElms', arguments);
				},

				'removeAllElms' : function(){
					return this._callElmFunc('removeAllElms', arguments);
				},

				'removeElm' : function(elm){
					return this._callElmFunc('removeElm', arguments);
				},

				'removeElmAt' : function(index){
					return this._callElmFunc('removeElmAt', arguments);
				},

				'replaceElm' : function(target, replacement){
					return this._callElmFunc('replaceElm', arguments);
				},

				'replaceElmAt' : function(elm, index){
					return this._callElmFunc('replaceElmAt', arguments);
				},


				// event handling functions
				'_onFadeComplete' : function(evt){
					this.setAlpha(1);

					if(this._fader.getDirection() == OjFade.OUT){
						this.addClasses('hidden');
					}

					this._unset('_fader');
				},


				'fadeIn' : function(/*duration, easing*/){
					if(this._fader){
						if(this._fader.getDirection() == OjFade.IN){
							return;
						}

						this._fader.stop();

						this._unset('_fader');
					}

					this.removeClasses('hidden');

					var ln = arguments.length;

					this._fader = new OjFade(this, OjFade.IN, ln ? arguments[0] : 250, ln > 1 ? arguments[1] : OjEasing.NONE);
					this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
					this._fader.start();
				},

				'fadeOut' : function(){
					if(this._fader){
						if(this._fader.getDirection() == OjFade.OUT){
							return;
						}

						this._fader.stop();

						this._unset('_fader');
					}
					else if(this.hasClasses('hidden')){
						return;
					}

					var ln = arguments.length;

					this._fader = new OjFade(this, OjFade.OUT, ln ? arguments[0] : 250, ln > 1 ? arguments[1] : OjEasing.NONE);
					this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
					this._fader.start();
				},

				'isAnimated' : function(/*val*/){
					if(arguments.length){
						if(this._is_animated = arguments[0]){
							this.addClasses('animated');
						}
						else{
							this.removeClasses('animated');

							OJ.destroy(this._trans, true);
						}
					}

					return this._is_animated;
				},

				'redraw' : function (){
					return this._is_displayed;
				},

				'getTargetId' : function(){
					return this.id();
				},

				'setIsActive' : function(val){
					if(this._isActive != val){
						if(this._isActive = val){
							this.addClasses('active');
						}
						else{
							this.removeClasses('active');
						}
					}
				},

				'setIsDisabled' : function(val){
					if(this._isDisabled != val){
						if(this._isDisabled = val){
							this.addClasses('disabled');
						}
						else{
							this.removeClasses('disabled');
						}
					}
				}
			}
		);
	},
	{
		'load' : function(source){
			// determine what action to take based on the extension of the src
			// default action is to request the uri and then load the contents into the widgets
			// however we can also display flash, videos, audio and images
			var widget, type = OJ.getFileType(source);

			this.empty();

			if(type == OJ.HTML){
				// load the file and put the html into the container
			}
			else{
				var w, h;

				if(type == OJ.IMAGE){
					OJ.importJs('oj.media.Image');

					widget = new OjImage();
				}
				else if(type == OJ.FLASH){
					OJ.importJs('oj.media.Flash');

					widget = new OjFlash();

					w = '100%';
					h = 300;
				}
				else if(type == OJ.VIDEO || type == OJ.AUDIO || type == OJ.STREAMING){
					OJ.importJs('oj.media.MediaPlayer');

					widget = new OjMediaPlayer();

					w = '100%';
					h = '100%';
				}
				else{
					importJs('oj.widgets.Container');

					widget = new OjView();
				}

				widget.source(_source);

				if(isNull(w)){
					w = widget.width();
				}

				if(isNull(h)){
					h = widget.height();
				}

				if((isEmpty(this.css('width')) || this.css('width') == 'auto') && w){
					this.width(w);
				}

				if((isEmpty(this.css('height')) || this.css('height') == 'auto') && h){
					this.height(h);
				}

				this.add(widget);
			}

			return source;
		}
	}
);