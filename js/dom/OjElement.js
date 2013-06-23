OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.events.OjDragEvent');
OJ.importJs('oj.events.OjEvent');
OJ.importJs('oj.events.OjFocusEvent');
OJ.importJs('oj.events.OjKeyboardEvent');
OJ.importJs('oj.events.OjMouseEvent');
OJ.importJs('oj.events.OjTouchEvent');
OJ.importJs('oj.events.OjTransformEvent');


'use strict';

OJ.extendClass(
	OjActionable, 'OjElement',
	{
//		'_dom' : null,  '_proxy' : null,
//
//		'_move_timer' : null,  '_page_x' : null,  '_page_y' : null,

		'_draggable' : false,  '_dragX' : 0,  '_dragY' : 0,  '_did_drag' : false,


		'_constructor' : function(/*source, context*/){
			var args = arguments,
				ln = args.length,
				source = ln && args[0] ? args[0] : OjElement.elm('div'),
				context = ln > 1 ? args[1] : null;

			this._super('OjElement', '_constructor', []);

			// set the dom
			// if no source present then create one
			this._setDom(source, context);
		},

		'_destructor' : function(/*depth = 0*/){
			OjElement.unregister(this);

			// remove from parent
			this.setParent(null);

			if(this._dom){
				delete this._dom.ojElm;
				delete this._dom.ojProxy;

				// release the vars
				this._dom = this._proxy = null;
			}

			// continue on with the destruction
			return this._super('OjElement', '_destructor', arguments);
		},


		'_setDom' : function(dom_elm){
			this._setProxy(this._dom = dom_elm);

			this._dom.ojElm = this.id();
		},

		'_setProxy' : function(dom_elm){
			if(this._proxy){
				this._proxy.ojProxy = null;
			}

			this._proxy = dom_elm;

			dom_elm.ojProxy = this.id();
		},

		'_isDisplayed' : function(){ },

		'_isNotDisplayed' : function(){ },

		'_processEvent' : function(evt){
			// because js natively calls the event functions on the context of the dom element
			// we just get the attached oj element from it to get into the proper context to dispatch
			// the event
			if(OjElement.element(evt.currentTarget) != this || evt.dispatched){
				return false;
			}

			evt.dispatched = true;

			return true
		},

		'_onDomEvent' : function(evt){
			var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjDomEvent.convertDomEvent(evt));
			}
		},

		'_onDomMouseEvent' : function(evt){
			var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
				proxy._onMouse(OjMouseEvent.convertDomEvent(evt));
			}
		},

		'_onDomKeyboardEvent' : function(evt){
			var proxy = OjElement.byId(this.ojProxy);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjKeyboardEvent.convertDomEvent(evt));
			}
		},

		'_onDomFocusEvent' : function(evt){
			var proxy = OjElement.byId(this.ojProxy);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjFocusEvent.convertDomEvent(evt));
			}
		},

		'_onDomTouchEvent' : function(evt){
			var proxy = OjElement.byId(this.ojProxy);

			if(proxy && proxy._processEvent(evt)){
				return proxy._onTouch(OjTouchEvent.convertDomEvent(evt));
			}

			return false;
		},

		'_onDrag' : function(evt){
			this._did_drag = true;

			this.dispatchEvent(
				new OjDragEvent(
					OjDragEvent.DRAG,
					evt.getPageX() - this._dragX,
					evt.getPageY() - this._dragY,
					evt, false, false
				)
			);

			if(!OJ.isTouchCapable()){
				this._dragX = evt.getPageX();
				this._dragY = evt.getPageY();
			}
		},

		'_onDragEnd' : function(evt){
			if(!this._did_drag){
				return;
			}

			this._did_drag = false;

			if(!OJ.isTouchCapable()){
				OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onDrag');
				OJ.removeEventListener(OjMouseEvent.UP, this, '_onDragEnd');
			}

			this.dispatchEvent(
				new OjDragEvent(
					OjDragEvent.END,
					evt.getPageX() - this._dragX,
					evt.getPageY() - this._dragY,
					evt, false, false
				)
			);
		},

		'_onDragStart' : function(evt){
			this._dragX = evt.getPageX();
			this._dragY = evt.getPageY();

			if(!OJ.isTouchCapable()){
				if(this.hasEventListener(OjDragEvent.DRAG)){
					OJ.addEventListener(OjMouseEvent.MOVE, this, '_onDrag');
				}

				OJ.addEventListener(OjMouseEvent.UP, this, '_onDragEnd');
			}

			this.dispatchEvent(new OjDragEvent(OjDragEvent.START, 0, 0, evt, false, false));

			this.dispatchEvent(
				new OjDragEvent(OjDragEvent.START, 0, 0, evt, false, false)
			);
		},

		'_onEvent' : function(evt){
			this.dispatchEvent(evt);

			return false;
		},

		'_onMouse' : function(evt){
			if(evt.getType() == OjMouseEvent.DOWN && this._draggable){
				this._onDragStart(evt);
			}

			return this._onEvent(evt);
		},

		'_onMoveTick' : function(evt){
			var page_x = this.getPageX(),
				page_y = this.getPageY(),
				delta_x = this._page_x - page_x,
				delta_y = this._page_y - page_y;

			if(delta_x || delta_y){
				this.dispatchEvent(new OjTransformEvent(OjTransformEvent.MOVE, page_x, page_y, delta_x, delta_y));
			}

			this._page_x = page_x;
			this._page_y = page_y;
		},

		'_onTouch' : function(evt){
			var bubbles = evt.getBubbles(),
				cancelable = evt.getCancelable(),
				x = evt.getPageX(),
				y = evt.getPageY(),
				type = evt.getType(),
				dom_elm = document.elementFromPoint(x, y);

			if(type == OjTouchEvent.END){
				if(dom_elm && OjElement.hasDomElement(this._proxy, dom_elm)){
					if(this.hasEventListener(OjMouseEvent.UP)){
						this._onMouse(new OjMouseEvent(OjMouseEvent.UP, bubbles, cancelable, x, y));
					}

					if(this.hasEventListener(OjMouseEvent.CLICK) && x == this._dragX && y == this._dragY){
						this._onEvent(new OjMouseEvent(OjMouseEvent.CLICK, bubbles, cancelable, x, y));
					}
				}

				if(this._draggable){
					this._onDragEnd(evt);
				}
			}
			else if(type == OjTouchEvent.START){
				// store the start so we know on the end if its a move or click
				this._dragX = x;
				this._dragY = y;

				this._onEvent(new OjMouseEvent(OjMouseEvent.DOWN, bubbles, cancelable, x, y));

				if(this._draggable){
					this._onDragStart(evt);
				}

				// always allow this event to go through
				return true;
			}
			else if(type == OjTouchEvent.MOVE){
				this._onEvent(new OjMouseEvent(OjMouseEvent.MOVE, bubbles, cancelable, x, y));

				if(this._draggable){
					this._onDrag(evt);
				}
			}

			return this._onEvent(evt);
		},


		// event listener overrides
		// customize this functionality for dom events so that they work
		'_updateTouchStartListeners' : function(){
			var dragEvent = OjDragEvent,
				mouseEvent = OjMouseEvent;

			if(!this.hasEventListeners(mouseEvent.DOWN, mouseEvent.CLICK, dragEvent.START, dragEvent.DRAG, dragEvent.END)){
				this._proxy.ontouchstart = null;
			}
		},

		'_updateTouchMoveListeners' : function(){
			var dragEvent = OjDragEvent;

			if(!this.hasEventListeners(OjMouseEvent.MOVE, dragEvent.START, dragEvent.DRAG, dragEvent.END)){
				this._proxy.ontouchmove = null;
			}
		},

		'_updateTouchEndListeners' : function(){
			var dragEvent = OjDragEvent;

			if(!this.hasEventListeners(OjMouseEvent.UP, dragEvent.START, dragEvent.DRAG, dragEvent.END)){
				this._proxy.ontouchend = null;
			}
		},

		'addEventListener' : function(type){
			var domEvent = OjDomEvent,
				dragEvent = OjDragEvent,
				focusEvent = OjFocusEvent,
				is_touch = OJ.isTouchCapable(),
				keyboardEvent = OjKeyboardEvent,
				mouseEvent = OjMouseEvent,
				proxy = this._proxy,
				transformEvent = OjTransformEvent;

			this._super('OjElement', 'addEventListener', arguments);

			// mouse events
			if(type == mouseEvent.CLICK){
				if(is_touch){
					proxy.ontouchstart = this._onDomTouchEvent;
					proxy.ontouchend = this._onDomTouchEvent;
				}
				else{
					proxy.onclick = this._onDomMouseEvent;
				}
			}
			else if(type == mouseEvent.DOUBLE_CLICK){
				proxy.ondblclick = this._onDomMouseEvent;
			}
			else if(type == mouseEvent.DOWN){
				if(is_touch){
					proxy.ontouchstart = this._onDomTouchEvent;
				}
				else{
					proxy.onmousedown = this._onDomMouseEvent;
				}
			}
			else if(type == mouseEvent.MOVE){
				if(is_touch){
					proxy.ontouchmove = this._onDomTouchEvent;
				}
				else{
					proxy.onmousemove = this._onDomMouseEvent;
				}
			}
			else if(type == mouseEvent.OUT){
				proxy.onmouseout = this._onDomMouseEvent;
			}
			else if(type == mouseEvent.OVER){
				proxy.onmouseover = this._onDomMouseEvent;
			}
			else if(type == mouseEvent.UP){
				if(is_touch){
					proxy.ontouchend = this._onDomTouchEvent;
				}
				else{
					proxy.onmouseup = this._onDomMouseEvent;
				}
			}

			// drag events
			else if(dragEvent.isDragEvent(type)){
				this._draggable = true;

				if(is_touch){
					proxy.ontouchstart = this._onDomTouchEvent;
					proxy.ontouchmove = this._onDomTouchEvent;
					proxy.ontouchend = this._onDomTouchEvent;
				}
				else{
					proxy.onmousedown = this._onDomMouseEvent;
				}
			}

			// keyboard events
			else if(type == keyboardEvent.DOWN){
				proxy.onkeydown = this._onDomKeyboardEvent;
			}
			else if(type == keyboardEvent.PRESS){
				proxy.onkeypress = this._onDomKeyboardEvent;
			}
			else if(type == keyboardEvent.UP){
				proxy.onkeyup = this._onDomKeyboardEvent;
			}

			// focus events
			else if(type == focusEvent.IN){
				proxy.onfocus = this._onDomFocusEvent;
			}
			else if(type == focusEvent.OUT){
				proxy.onblur = this._onDomFocusEvent;
			}

			// transform events
			else if(type == transformEvent.MOVE){
				if(!this._move_timer){
					this._move_timer = new OjTimer(250, 0);
					this._move_timer.addEventListener(OjTimer.TICK, this, '_onMoveTick');

					this._page_x = this.getPageX();
					this._page_y = this.getPageY();

					this._move_timer.start();
				}
			}
			else if(type == transformEvent.RESIZE && this._proxy != document.body){
				proxy.onresize = this._onDomEvent;
			}

			// misc dom events
			else if(type == domEvent.CHANGE){
				proxy.onchange = this._onDomEvent;
			}
		},

		'removeEventListener' : function(type, context, callback){
			var domEvent = OjDomEvent,
				dragEvent = OjDragEvent,
				focusEvent = OjFocusEvent,
				keyboardEvent = OjKeyboardEvent,
				mouseEvent = OjMouseEvent,
				proxy = this._proxy,
				transformEvent = OjTransformEvent;

			this._super('OjElement', 'removeEventListener', arguments);

			// mouse events
			if(type == mouseEvent.CLICK){
				if(!this.hasEventListener(mouseEvent.CLICK)){
					proxy.onclick = null;

					this._updateTouchStartListeners();
					this._updateTouchEndListeners();
				}
			}
			else if(type == mouseEvent.DOUBLE_CLICK){
				if(!this.hasEventListener(mouseEvent.DOUBLE_CLICK)){
					proxy.ondblclick = null;

					this._updateTouchStartListeners();
					this._updateTouchEndListeners();
				}
			}
			else if(type == mouseEvent.DOWN){
				if(!this.hasEventListeners(mouseEvent.DOWN, dragEvent.DRAG)){
					proxy.onmousedown = null;

					this._updateTouchStartListeners();
				}
			}
			else if(type == mouseEvent.MOVE){
				if(!this.hasEventListener(mouseEvent.MOVE)){
					proxy.onmousemove = null;

					this._updateTouchListeners();
				}
			}
			else if(type == mouseEvent.OUT){
				if(!this.hasEventListener(mouseEvent.OUT)){
					proxy.onmouseout = null;
				}
			}
			else if(type == mouseEvent.OVER){
				if(!this.hasEventListener(mouseEvent.OVER)){
					proxy.onmouseover = null;
				}
			}
			else if(type == mouseEvent.UP){
				if(!this.hasEventListener(mouseEvent.UP)){
					proxy.onmouseup = null;

					this._updateTouchEndListeners();
				}
			}

			// drag events
			else if(dragEvent.isDragEvent(type)){
				if(!this.hasEventListeners(dragEvent.DRAG, dragEvent.END, dragEvent.START)){
					this._draggable = false;

					if(!this.hasEventListener(mouseEvent.DOWN)){
						proxy.onmousedown = null;
					}

					this._updateTouchStartListeners();
					this._updateTouchMoveListeners();
					this._updateTouchEndListeners();
				}
			}

			// keyboard events
			else if(type == keyboardEvent.DOWN){
				if(!this.hasEventListener(keyboardEvent.DOWN)){
					proxy.onkeydown = null;
				}
			}
			else if(type == keyboardEvent.PRESS){
				if(!this.hasEventListener(keyboardEvent.PRESS)){
					proxy.onkeypress = null;
				}
			}
			else if(type == keyboardEvent.UP){
				if(!this.hasEventListener(keyboardEvent.UP)){
					proxy.onkeyup = null;
				}
			}

			// focus events
			else if(type == focusEvent.IN){
				if(!this.hasEventListener(focusEvent.IN)){
					proxy.onfocus = null;
				}
			}
			else if(type == focusEvent.OUT){
				if(!this.hasEventListener(focusEvent.OUT)){
					proxy.onblur = null;
				}
			}

			// transform event
			else if(type == transformEvent.MOVE){
				if(!this.hasEventListener(transformEvent.MOVE)){
					this._unset('_move_timer');
				}
			}
			else if(type == transformEvent.RESIZE){
				if(!this.hasEventListener(transformEvent.RESIZE)){
					proxy.onresize = null;
				}
			}

			// misc dom events
			else if(type == domEvent.CHANGE){
				if(!this.hasEventListener(domEvent.CHANGE)){
					proxy.onchange = null;
				}
			}
		},


		// Non-Stlye Getter & Setter Functions
		'dom' : function(){
			return this._dom;
		},

		'inDom' : function(){
			var dom = this._dom;

			return dom.ownerDocument && isObject(dom.ownerDocument) && dom.parentNode ? true : false;
		},

		'hasDomElement' : function(dom_elm){
			return OjElement.hasDomElement(this._dom, dom_elm);
		},

		'parent' : function(){
			return OjElement.element(this._dom.parentNode);
		},

		'getParent' : function(){
			return OjElement.element(this._dom.parentNode);
		},
		'setParent' : function(parent){
			if(parent){
				parent.addChild(this);
			}
			else if(parent = this.parent()){
				parent.removeChild(this);
			}
		},

		'_setIsDisplayed' : function(displayed){
			if(this._is_displayed == displayed){
				return;
			}

			if(this._is_displayed = displayed){
				this._isDisplayed();

				this.dispatchEvent(new OjEvent(OjEvent.ADDED_TO_DISPLAY));
			}
			else{
				this._isNotDisplayed();

				this.dispatchEvent(new OjEvent(OjEvent.REMOVED_FROM_DISPLAY));
			}
		}
	},
	{
		'_elms' : {},

		'byId' : function(id){
			var elms = this._elms,
				elm;

			if(elms[id]){
				return elms[id];
			}

			return (elm = document.getElementById(id)) && elm.ojElm ? elms[elm.ojElm] : null;
		},

		'elm' : function(tag){
			return document.createElement(tag);
		},

		'element' : function(obj){
			if(!obj){
				return null;
			}

			if(isDomElement(obj)){
				return this.isTextNode(obj) ? new OjTextElement(obj) : this.byId(obj.ojElm);
			}

			if(isObjective(obj)){
				return obj;
			}

			return new OjStyleElement(obj);
		},

		'hasDomElement' : function(haystack, needle){
			if(haystack == needle){
				return true;
			}

			while((needle = needle.parentNode)){
				if(needle == haystack){
					return true;
				}
			}

			return false;
		},

		'isCommentNode' : function(dom_elm){
			return dom_elm.nodeName.toLowerCase() == '#comment';
		},

		'isTextNode' : function(dom_elm){
			return dom_elm.nodeName.toLowerCase() == '#text';
		},

		'parentComponent' : function(elm){
			if(isElement(elm)){
				elm = elm._dom;
			}

			var parent;

			while(elm){
				parent = elm.parentNode;

				if(parent && (elm = this.element(parent)) && isComponent(elm)){
					return elm;
				}

				elm = parent;
			}

			return null;
		},

		'register' : function(elm){
			this._elms[elm.id()] = elm;
//			trace(Object.keys(this._elms).length);
		},

		'unregister' : function(elm){
			delete this._elms[elm.id()];
//			trace(Object.keys(this._elms).length);
		}
	}
);


OJ.importJs('oj.dom.OjStyleElement');
OJ.importJs('oj.dom.OjTextElement');