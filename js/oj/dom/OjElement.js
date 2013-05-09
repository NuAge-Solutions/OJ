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
		'_children' : null,  '_dom' : null,  '_parent' : null, '_proxy' : null,

		'_move_timer' : null,  '_page_x' : null,  '_page_y' : null,

		'_draggable' : false,  '_dragX' : 0,  '_dragY' : 0,


		'_constructor' : function(/*source, context*/){
			this._super('OjElement', '_constructor', []);

			var args = arguments,
				ln = args.length,
				source = ln && args[0] ? args[0] : OjElement.elm('div'),
				context = ln > 1 ? args[1] : null;

			// set the dom
			// if no source present then create one
			this._setDom(source, context);

			OjElement.register(this);
		},

		'_destructor' : function(/*depth = 0*/){
			OjElement.unregister(this);

			// remove from parent
			if(this._parent){
				this._parent.removeChild(this);
			}

			if(this._dom){
				delete this._dom.ojElm;

				// release the vars
				this._dom = this._parent = this._proxy = null;
			}

			// continue on with the destruction
			return this._super('OjElement', '_destructor', arguments);
		},


		'_setDom' : function(dom_elm, context){
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
			this.dispatchEvent(
				new OjDragEvent(
					OjDragEvent.DRAG,
					evt.getPageX() - this._dragX,
					evt.getPageY() - this._dragY,
					evt, false, false
				)
			);

			this._dragX = evt.getPageX();
			this._dragY = evt.getPageY();
		},

		'_onDragEnd' : function(evt){
			OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onDrag');
			OJ.removeEventListener(OjMouseEvent.UP, this, '_onDragEnd');

			this.dispatchEvent(
				new OjDragEvent(
					OjDragEvent.DRAG_END,
					evt.getPageX() - this._dragX,
					evt.getPageY() - this._dragY,
					evt, false, false
				)
			);
		},

		'_onEvent' : function(evt){
			this.dispatchEvent(evt);

			return false;
		},

		'_onMouse' : function(evt){
			if(evt.getType() == OjMouseEvent.DOWN && this._draggable){
				this._dragX = evt.getPageX();
				this._dragY = evt.getPageY();

				if(this.hasEventListener(OjDragEvent.DRAG)){
					OJ.addEventListener(OjMouseEvent.MOVE, this, '_onDrag');
				}

				OJ.addEventListener(OjMouseEvent.UP, this, '_onDragEnd');

				this.dispatchEvent(new OjDragEvent(OjDragEvent.DRAG_INIT, 0, 0, evt, false, false));
			}

			return this._onEvent(evt);
		},

		'_onMoveTick' : function(evt){
			var page_x = this.getPageX(), page_y = this.getPageY();
			var delta_x = this._page_x - page_x, delta_y = this._page_y - page_y;

			if(delta_x || delta_y){
				this.dispatchEvent(new OjTransformEvent(OjTransformEvent.MOVE, page_x, page_y, delta_x, delta_y));
			}

			this._page_x = page_x;
			this._page_y = page_y;
		},

		'_onTouch' : function(evt){
			if(evt.getType() == OjTouchEvent.END){
				var dom_elm = document.elementFromPoint(evt.getPageX(), evt.getPageY());

				if(dom_elm && OjElement.hasDomElement(this._proxy, dom_elm)){
					if(this.hasEventListener(OjMouseEvent.UP)){
						this._onMouse(new OjMouseEvent(OjMouseEvent.UP, evt.getBubbles(), evt.getCancelable(), evt.getPageX(), evt.getPageY()));
					}

					if(
						this.hasEventListener(OjMouseEvent.CLICK) &&
							evt.getPageX() == this._dragX && evt.getPageY() == this._dragY
						){
						this._onMouse(new OjMouseEvent(OjMouseEvent.CLICK, evt.getBubbles(), evt.getCancelable(), evt.getPageX(), evt.getPageY()));
					}
				}
			}
			else if(evt.getType() == OjTouchEvent.START){
				// store the start so we know on the end if its a move or click
				this._dragX = evt.getPageX();
				this._dragY = evt.getPageY();

				// allow this event to go through
				return true;
			}
//				if(evt.getType() == OjMouseEvent.DOWN && this._draggable){
//					this._dragX = evt.getPageX();
//					this._dragY = evt.getPageY();
//
//					if(this.hasEventListener(OjDragEvent.DRAG)){
//						OJ.addEventListener(OjMouseEvent.MOVE, this, '_onDrag');
//					}
//
//					OJ.addEventListener(OjMouseEvent.UP, this, '_onDragEnd');
//
//					this.dispatchEvent(new OjDragEvent(OjDragEvent.DRAG_INIT, 0, 0, evt, false, false));
//				}
//
			return this._onEvent(evt);
		},


		// event listener overrides
		// customize this functionality for dom events so that they work
		'addEventListener' : function(type){
			this._super('OjElement', 'addEventListener', arguments);

			// mouse events
			if(type == OjMouseEvent.CLICK){
				this._proxy.onclick = this._onDomMouseEvent;

				if(OJ.isTouchCapable()){
					this._proxy.ontouchstart = this._onDomTouchEvent;
					this._proxy.ontouchend = this._onDomTouchEvent;
				}
			}
			else if(type == OjMouseEvent.DOUBLE_CLICK){
				this._proxy.ondblclick = this._onDomMouseEvent;
			}
			else if(type == OjMouseEvent.DOWN){
				this._proxy.onmousedown = this._onDomMouseEvent;

				if(OJ.isTouchCapable()){
					this._proxy.ontouchstart = this._onDomTouchEvent;
				}
			}
			else if(type == OjMouseEvent.MOVE){
				this._proxy.onmousemove = this._onDomMouseEvent;

				if(OJ.isTouchCapable()){
					this._proxy.ontouchmove = this._onDomTouchEvent;
				}
			}
			else if(type == OjMouseEvent.OUT){
				this._proxy.onmouseout = this._onDomMouseEvent;
			}
			else if(type == OjMouseEvent.OVER){
				this._proxy.onmouseover = this._onDomMouseEvent;
			}
			else if(type == OjMouseEvent.UP){
				this._proxy.onmouseup = this._onDomMouseEvent;

				if(OJ.isTouchCapable()){
					this._proxy.ontouchend = this._onDomTouchEvent;
				}
			}

			else if(OjDragEvent.isDragEvent(type)){
				this._draggable = true;

				this._proxy.onmousedown = this._onDomMouseEvent;

				if(OJ.isTouchCapable()){
					this._proxy.ontouchstart = this._onDomTouchEvent;
				}
			}

			// keyboard events
			else if(type == OjKeyboardEvent.DOWN){
				this._proxy.onkeydown = this._onDomKeyboardEvent;
			}
			else if(type == OjKeyboardEvent.PRESS){
				this._proxy.onkeypress = this._onDomKeyboardEvent;
			}
			else if(type == OjKeyboardEvent.UP){
				this._proxy.onkeyup = this._onDomKeyboardEvent;
			}

			// focus events
			else if(type == OjFocusEvent.IN){
				this._proxy.onfocus = this._onDomFocusEvent;
			}
			else if(type == OjFocusEvent.OUT){
				this._proxy.onblur = this._onDomFocusEvent;
			}

			// transform events
			else if(type == OjTransformEvent.MOVE){
				if(!this._move_timer){
					this._move_timer = new OjTimer(250, 0);
					this._move_timer.addEventListener(OjTimer.TICK, this, '_onMoveTick');

					this._page_x = this.getPageX();
					this._page_y = this.getPageY();

					this._move_timer.start();
				}
			}
			else if(type == OjTransformEvent.RESIZE && this._proxy != document.body){
				this._proxy.onresize = this._onDomEvent;
			}

			// misc dom events
			else if(type == OjDomEvent.CHANGE){
				this._proxy.onchange = this._onDomEvent;
			}
		},

		'removeEventListener' : function(type, context, callback){
			this._super('OjElement', 'removeEventListener', arguments);

			// mouse events
			if(type == OjMouseEvent.CLICK){
				if(!this.hasEventListener(OjMouseEvent.CLICK)){
					this._proxy.onclick = null;

					if(OJ.isTouchCapable() && !this.hasEventListener(OjMouseEvent.UP)){
						this._proxy.ontouchend = null;
					}
				}
			}
			else if(type == OjMouseEvent.DOUBLE_CLICK){
				if(!this.hasEventListener(OjMouseEvent.DOUBLE_CLICK)){
					this._proxy.ondblclick = null;
				}
			}
			else if(type == OjMouseEvent.DOWN){
				if(!this.hasEventListener(OjMouseEvent.DOWN) && !this.hasEventListener(OjDragEvent.DRAG)){
					this._proxy.onmousedown = null;

					if(OJ.isTouchCapable()){
						this._proxy.ontouchstart = null;
					}
				}
			}
			else if(type == OjMouseEvent.MOVE){
				if(!this.hasEventListener(OjMouseEvent.MOVE)){
					this._proxy.onmousemove = null;

					if(OJ.isTouchCapable()){
						this._proxy.ontouchmove = null;
					}
				}
			}
			else if(type == OjMouseEvent.OUT){
				if(!this.hasEventListener(OjMouseEvent.OUT)){
					this._proxy.onmouseout = null;
				}
			}
			else if(type == OjMouseEvent.OVER){
				if(!this.hasEventListener(OjMouseEvent.OVER)){
					this._proxy.onmouseover = null;
				}
			}
			else if(type == OjMouseEvent.UP){
				if(!this.hasEventListener(OjMouseEvent.UP)){
					this._proxy.onmouseup = null;

					if(OJ.isTouchCapable() && !this.hasEventListener(OjMouseEvent.CLICK)){
						this._proxy.ontouchend = null;
					}
				}
			}

			else if(OjDragEvent.isDragEvent(type)){
				if(
					!this.hasEventListener(OjDragEvent.DRAG) &&
						!this.hasEventListener(OjDragEvent.DRAG_END) &&
						!this.hasEventListener(OjDragEvent.DRAG_INIT)
					){
					this._draggable = false;

					if(!this.hasEventListener(OjMouseEvent.DOWN)){
						this._proxy.onmousedown = null;
					}
				}
			}

			// keyboard events
			else if(type == OjKeyboardEvent.DOWN){
				if(!this.hasEventListener(OjKeyboardEvent.DOWN)){
					this._proxy.onkeydown = null;
				}
			}
			else if(type == OjKeyboardEvent.PRESS){
				if(!this.hasEventListener(OjKeyboardEvent.PRESS)){
					this._proxy.onkeypress = null;
				}
			}
			else if(type == OjKeyboardEvent.UP){
				if(!this.hasEventListener(OjKeyboardEvent.UP)){
					this._proxy.onkeyup = null;
				}
			}

			// focus events
			else if(type == OjFocusEvent.IN){
				if(!this.hasEventListener(OjFocusEvent.IN)){
					this._proxy.onfocus = null;
				}
			}
			else if(type == OjFocusEvent.OUT){
				if(!this.hasEventListener(OjFocusEvent.OUT)){
					this._proxy.onblur = null;
				}
			}

			// transform event
			else if(type == OjTransformEvent.MOVE){
				if(!this.hasEventListener(OjTransformEvent.MOVE)){
					OJ.destroy(this._move_timer);
				}
			}
			else if(type == OjTransformEvent.RESIZE){
				if(!this.hasEventListener(OjTransformEvent.RESIZE)){
					this._proxy.onresize = null;
				}
			}

			// misc dom events
			else if(type == OjDomEvent.CHANGE){
				if(!this.hasEventListener(OjDomEvent.CHANGE)){
					this._proxy.onchange = null;
				}
			}
		},


		// Non-Stlye Getter & Setter Functions
		'dom' : function(){
			return this._dom;
		},

		'inDom' : function(){
			return this._dom.ownerDocument && isObject(this._dom.ownerDocument) && this._dom.parentNode ? true : false;
		},

		'hasDomElement' : function(dom_elm){
			return OjElement.hasDomElement(this._dom, dom_elm);
		},

		'parent' : function(){
			return this._parent;
		},

		'_setParent' : function(parent){
			this._parent = parent;

			this._setIsDisplayed(parent ? parent._is_displayed : false);
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
			if(this._elms[id]){
				return this._elms[id];
			}

			var elm = document.getElementById(id);

			return elm && elm.ojElm ? this._elms[elm.ojElm] : null;
		},

		'elm' : function(tag){
			return document.createElement(tag);
		},

		'element' : function(obj){
			if(!obj){
				return null;
			}

			if(isDomElement(obj)){
				return this.byId(obj.ojElm);
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