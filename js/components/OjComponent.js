OJ.importJs('oj.fx.OjFade');

OJ.importCss('oj.components.OjComponent');


'use strict';

OJ.extendClass(
	'OjComponent', [OjStyleElement],
	{
		'_props_' : {
			'isActive'    : false,
			'isDisabled'  : false
		},

		'_get_props_' : {
			'isAnimating' : false
		},


		'_constructor' : function(){
			var args = [null, this];

			// process the template if any
			if(this._template){
				if(this._template.charAt(0) == '<'){
					args[0] = this._template;
				}
				else{
					args[0] = OJ.importTemplate(this._template);
				}
			}

			// call super constructor
			this._super(OjStyleElement, '_constructor', args);

			// add the class name inheritance as css classes
			this.addCss(this._class_names.slice(this._class_names.indexOf('OjComponent')));

			// setup the container
			this._setContainer(this.container ? this.container : this);
		},

		// override this so that the component gets properly set
		'_processChild' : function(dom, context){
			return this._super(OjStyleElement, '_processChild', [dom, context ? context : this]);
		},

		'_processDomSourceAttributes' : function(dom, context){
			this._processAttributes(dom, context);
		},

		'_processDomSourceChild' : function(dom_elm, context){
			if(OjElement.isCommentNode(dom_elm)){
				return null;
			}

			return this._processChild(dom_elm, context);
		},

		'_processDomSourceChildren' : function(dom, context){
			var child,
				children = dom.childNodes,
				i = 0,
				ln = children.length;

			for(; i < ln; i++){
				if(child = this._processDomSourceChild(children[i], context)){
					this.addElm(child);
				}
				else{
					dom.removeChild(children[i]);
				}

				// if we add then we need to decrement the counter and length since
				// a child will have been removed from the child nodes array
				i--;
				ln--;
			}
		},


		'_setContainer' : function(container){
			this._setElmFuncs(container);

			if(this.container == container){
				return;
			}

			if(this.container){
				this.container.removeCss(['container']);
			}

			if((this.container = container) != this){
				this.container.addCss(['container']);
			}
		},

		'_setDomSource' : function(dom, context){
			// setup our vars
			var ary, prev, nm, val, ln, i,
				is_body = (dom == document.body),
				source = is_body ? this._dom : dom,
				target = is_body ? dom : this._dom;

			// prevent events from dispatching while we are setting everything up
			this._prevent_dispatch = true;

			// process dom attributes
			this._processDomSourceAttributes(dom, context);

			// copy over attributes
			ln = (ary = source.attributes).length;

			for(; ln--;){
				i = ary[ln];
				nm = i.nodeName;
				val = i.value;

				if(nm == 'class'){
					prev = target.getAttribute(nm);

					target.className = (String.string(prev) + ' ' + val).trim();
				}
				else if(nm == 'id'){
					target.id = val;
				}
				else{
					target.setAttribute(nm, val);
				}
			}

			// process the dom children
			this._processDomSourceChildren(dom, context);

			// copy over the children
			if(dom.parentNode){
				if(is_body){
					ln = (ary = source.children).length;
					i = 0;

					for(; i < ln; i++){
						target.appendChild(ary[0]);
					}
				}
				else{
					source.parentNode.replaceChild(target, source);
				}
			}

			// reengage event dispatching now that everything is setup
			this._prevent_dispatch = false;

			// update our dom var to the target
			this._dom = target;
		},

		'_setElmFuncs' : function(container){
			this._elm_funcs = container != this && container.is('OjComponent') ?
				{
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
					'replaceElmAt'  : 'replaceElmAt',
					'setElms'       : 'setElms'
				} :
				{
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
					'replaceElmAt'  : 'replaceChildAt',
					'setElms'       : 'setChildren'
				};
		},

		'_setIsAnimating' : function(val){
			if(this._isAnimating == val){
				return;
			}

			if(this._isAnimating = val){
				this.addCss(['animating']);
			}
			else{
				this.removeCss(['animating']);
			}
		},

		'_setIsDisplayed' : function(displayed){
			if(this._is_displayed == displayed){
				return;
			}

			this._super(OjStyleElement, '_setIsDisplayed', arguments);

			if(displayed){
				this.redraw();
			}
		},


		'_processEvent' : function(evt){
			if(this._isDisabled){
				return false;
			}

			return this._super(OjStyleElement, '_processEvent', arguments);
		},


		// Component Management Functions
		'_getContainer' : function(){
			return this.container;
		},

		'_callElmFunc' : function(func, args){
			var container = this._getContainer();

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

			return container[this._elm_funcs[func]].apply(container, args);
		},

		'_addElm' : function(elm, index){ },

		'_moveElm' : function(elm, index){ },

		'_removeAllElms' : function(){ },

		'_removeElm' : function(elm, index){ },

		'_replaceElm' : function(elm, index, new_elm){ },

		'addElm' : function(elm){
			return this._callElmFunc('addElm', Array.array(arguments));
		},

		'addElmAt' : function(elm, index){
			return this._callElmFunc('addElmAt', Array.array(arguments));
		},

		'getElmAt' : function(index){
			return this._callElmFunc('getElmAt', Array.array(arguments));
		},

		'getElms' : function(){
			return this._callElmFunc('getElms', Array.array(arguments));
		},

		'hasElm' : function(elm){
			return this._callElmFunc('hasElm', Array.array(arguments));
		},

		'indexOfElm' : function(elm){
			return this._callElmFunc('indexOfElm', Array.array(arguments));
		},

		'moveElm' : function(){
			return this._callElmFunc('moveElm', Array.array(arguments));
		},

		'numElms' : function(){
			return this._callElmFunc('numElms', Array.array(arguments));
		},

		'removeAllElms' : function(){
			return this._callElmFunc('removeAllElms', Array.array(arguments));
		},

		'removeElm' : function(elm){
			return this._callElmFunc('removeElm', Array.array(arguments));
		},

		'removeElmAt' : function(index){
			return this._callElmFunc('removeElmAt', Array.array(arguments));
		},

		'replaceElm' : function(target, replacement){
			return this._callElmFunc('replaceElm', Array.array(arguments));
		},

		'replaceElmAt' : function(elm, index){
			return this._callElmFunc('replaceElmAt', Array.array(arguments));
		},

		'setElms' : function(elms){
			return this._callElmFunc('setElms', Array.array(arguments));
		},


		// event handling functions
		'_onFadeComplete' : function(evt){
			this.setAlpha(1);

			if(this._fader.getDirection() == OjFade.OUT){
				this.hide();
			}
			else{
				this.show();
			}

			this._setIsAnimating(false);

			this._unset('_fader');
		},


		'fadeIn' : function(/*duration, easing*/){
			var args = arguments,
				ln = args.length;

			if(this._fader){
				if(this._fader.getDirection() == OjFade.IN){
					return;
				}

				this._fader.stop();

				this._unset('_fader');
			}
			else if(this.isVisible()){
				return;
			}

			this.show();

			this._fader = new OjFade(this, OjFade.IN, ln ? args[0] : 250, ln > 1 ? args[1] : OjEasing.NONE);
			this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
			this._fader.start();

			this._setIsAnimating(true);
		},

		'fadeOut' : function(){
			var args = arguments,
				ln = args.length;

			if(this._fader){
				if(this._fader.getDirection() == OjFade.OUT){
					return;
				}

				this._fader.stop();

				this._unset('_fader');
			}
			else if(!this.isVisible()){
				return;
			}

			this._fader = new OjFade(this, OjFade.OUT, ln ? args[0] : 250, ln > 1 ? args[1] : OjEasing.NONE);
			this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
			this._fader.start();

			this._setIsAnimating(true);
		},

		'redraw' : function (/*force=false*/){
			var args = arguments;

			return this._is_displayed || (args.length && args[0]);
		},

		'getTargetId' : function(){
			return this.id();
		},

		'setIsActive' : function(val){
			if(this._isActive != val){
				if(this._isActive = val){
					this.addCss(['active']);
				}
				else{
					this.removeCss(['active']);
				}
			}
		},

		'setIsDisabled' : function(val){
			if(this._isDisabled != val){
				if(this._isDisabled = val){
					this.addCss(['disabled']);
				}
				else{
					this.removeCss(['disabled']);
				}
			}
		}
	},
	{
		'_TAGS' : [],

		'load' : function(source){
// todo: refactor load media function
//			// determine what action to take based on the extension of the src
//			// default action is to request the uri and then load the contents into the widgets
//			// however we can also display flash, videos, audio and images
//			var widget,
//				type = OJ.getFileType(source);
//
//			this.empty();
//
//			if(type == OJ.HTML){
//				// load the file and put the html into the container
//			}
//			else{
//				var w, h;
//
//				if(type == OJ.IMAGE){
//					OJ.importJs('oj.media.OjImage');
//
//					widget = new OjImage();
//				}
//				else if(type == OJ.FLASH){
//					OJ.importJs('oj.media.OjFlash');
//
//					widget = new OjFlash();
//
//					w = '100%';
//					h = 300;
//				}
//				else if(type == OJ.VIDEO || type == OJ.AUDIO || type == OJ.STREAMING){
//					OJ.importJs('oj.media.OjMediaPlayer');
//
//					widget = new OjMediaPlayer();
//
//					w = '100%';
//					h = '100%';
//				}
//				else{
//					importJs('oj.widgets.Container');
//
//					widget = new OjView();
//				}
//
//				widget.source(_source);
//
//				if(isNull(w)){
//					w = widget.width();
//				}
//
//				if(isNull(h)){
//					h = widget.height();
//				}
//
//				if((isEmpty(this.css('width')) || this.css('width') == 'auto') && w){
//					this.width(w);
//				}
//
//				if((isEmpty(this.css('height')) || this.css('height') == 'auto') && h){
//					this.height(h);
//				}
//
//				this.add(widget);
//			}
//
//			return source;
		}
	}
);