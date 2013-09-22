OJ.importJs('oj.data.OjRect');
OJ.importJs('oj.dom.OjCssTranslate');
OJ.importJs('oj.events.OjDragEvent');
OJ.importJs('oj.events.OjEvent');
OJ.importJs('oj.events.OjFocusEvent');
OJ.importJs('oj.events.OjKeyboardEvent');
OJ.importJs('oj.events.OjMouseEvent');
OJ.importJs('oj.events.OjScrollEvent');
OJ.importJs('oj.events.OjTouchEvent');
OJ.importJs('oj.events.OjTransformEvent');


'use strict';

OJ.extendClass(
	'OjStyleElement', [OjElement],
	{
		'_props_' : {
			'id'    : null,
			'name'  : null,
			'owner' : null
		},

		'_alpha' : 1,  '_depth' : 0,  '_scrollable' : false,

		'_origin' : '0px, 0px',  '_rotation' : 0,  '_translate' : '0px, 0px',

		'_h_align' : 'l', // OjStyleElement.LEFT
		'_v_align' : 't', // OjStyleElement.TOP

//		'_prev_x' : null,
//		'_prev_y' : null,


		'_compile_' : function(def){
			var cls = OjStyleElement;

			if(cls.STYLE_MODE == cls.STYLE_IE){
				this._getStyle = this._getStyleIe;
			}
			else if(cls.STYLE_MODE == cls.STYLE_BACKUP){
				this._getStyle = this._getStyleBackup;
			}

			// build functions for style getter and setters
			def._style_funcs_.call(this, 'margin', 'Margin');
			def._style_funcs_.call(this, 'padding', 'Padding');
		},

		'_style_funcs_' : function(style, u_style){
			var g = 'get',
				s = 'set',
				bottom = 'Bottom',
				left = 'Left',
				right = 'Right',
				top = 'Top';

			this[g + u_style] = function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
				return this._getStyler(style, arguments);
			};

			this[s + u_style] = function(val/* | top/bottom, right/left | top, right/left, bottom | top, right, bottom, left*/){
				this._setStyler(style, arguments);
			};

			this[g + u_style + bottom] = function(){
				return this[g + u_style](2);
			};

			this[s + u_style + bottom] = function(val){
				this[s + u_style](null, null, val, null);
			};

			this[g + u_style + left] = function(){
				return this[g + u_style](3);
			};

			this[s + u_style + left] = function(val){
				this[s + u_style](null, null, null, val);
			};

			this[g + u_style + right] = function(){
				return this[g + u_style](1);
			};

			this[s + u_style + right] = function(val){
				this[s + u_style](null, val, null, null);
			};

			this[g + u_style + top] = function(){
				return this[g + u_style](0);
			};

			this[s + u_style + top] = function(val){
				this[s + u_style](val, null, null, null);
			};
		},


		'_constructor' : function(/*source, context*/){
			// default the context and source
			var args = arguments,
				ln = args.length,
				source, context, tmp;

			if(ln && (source = args[0])){
				// set the context if any
				if(ln > 1){
					context = args[1];
				}

				// set the source
				// if dom element then we are done
				if(source && !source.nodeType){
					// if its the document or body do something special
					if(source === 'body' || source == document || source == document.body){
						source = document.body;
					}
					// if its a string then we need to make sure its html and handle it accordingly
					else if(isString(source)){
						source = source.trim();

						if(source.charAt(0) == '<' && source.slice(-1) == '>' && source.length >= 5){
							var tag = source.substr(0, 6).toLowerCase(),
								tag2 = tag.substr(0, 3);

							if(tag == '<thead' || tag == '<tbody' || tag == '<tfoot'){
								tmp = OjElement.elm('table');
							}
							else if(tag2 == '<tr'){
								tmp = OjElement.elm('tbody');
							}
							else if(tag2 == '<td' || tag2 == '<th'){
								tmp = OjElement.elm('tr')
							}
							else{
								tmp = OjElement.elm('div');
							}

							tmp.innerHTML = source;

							if(tmp.childNodes.length){
								tmp.removeChild(source = tmp.childNodes[0]);
							}
							else{
								source = null
							}
						}
						else{
							// todo: re-evaluate the use query, maybe just allow ids...
//							tmp = OJ.query(source);
						}
					}
				}
			}

			this._super(OjElement, '_constructor', [source, context]);

			this.setHAlign(this._h_align);
			this.setVAlign(this._v_align);
		},

		'_destructor' : function(/*depth = 0*/){
			// remove the timers
			this._unset('_move_timer', '_scroll_timer');

			// remove the children
			var args = arguments,
				depth = args.length ? args[0] : 0,
				ln = this.numChildren();

			// remove the children
			for(; ln--;){
				OJ.destroy(this.getChildAt(ln), depth);
			}

			// release the vars
			this._owner = null;

			// continue on with the destruction
			return this._super(OjElement, '_destructor', arguments);
		},


		'_processAttribute' : function(dom, attr, context){
			var setter, solo, target, lower,
				nm = attr.nodeName,
				val = attr.value;

			if(nm.substr(0, 3) == 'on-'){
				// todo: add support for multiple event listeners
				// todo? add support for nested event listener functions in templates
				setter = val.split('.');
				solo = setter.length == 1;
				target = context;

				if(!solo){
					switch(setter[0]){
						case 'this':
							target = this;
						break;

						case 'window':
							target = window;
						break;
					}
				}

				this.addEventListener(OJ.attributeToFunc(nm), target, solo ? setter[0] : setter[1]);

				return true;
			}
			else if(nm == 'id'){
				this.setId(val);
			}
			else if(nm == 'var'){
				if(!isEmpty(val) && context){
					(context[val] = this).addCss(val);

					this.setOwner(context);
				}

				return true;
			}
			else if(nm != 'class'){
				setter = OjStyleElement.attributeToSetter(nm);

				if(isFunction(this[setter])){
          try{
            if(val == ''){
              val = null;
            }
            else if(isNumeric(val)){
              val = parseFloat(val);
            }
            else if((lower = val.toLowerCase()) == 'true'){
              val = true;
            }
            else if(lower == 'false'){
              val = false;
            }
            else{
              val = this._processReferenceValue(val, context);
            }

            this[setter](val);
          }
					catch(e){
            // setup holder for template reference values for deferred processing
            if(!context._template_vars_){
              context._template_vars_ = [];
            }

            context._template_vars_.unshift({
              'context' : this,
              'func'    : this[setter],
              'value'   : val
            });
          }

					// if the nm is v-align or h-align we want to return false so that the attribute isn't destroyed
					return nm.indexOf('-align') == -1;
				}
			}

			return false;
		},

		'_processAttributes' : function(dom, context){
			var attrs = dom.attributes,
          priority = ['var', 'id'],
          ln = priority.length,
				  attr;

      // process priority attributes first reference
      for(; ln--;){
        if((attr = dom.attributes[priority[ln]]) && this._processAttribute(dom, attr, context)){
          dom.removeAttribute(priority[ln]);
        }
      }

			// class name
			dom.removeAttribute('class-name');

			// class path
			dom.removeAttribute('class-path');

			// process the other attributes
			for(ln = attrs.length; ln--;){
				attr = attrs[ln];

				if(this._processAttribute(dom, attr, context)){
					dom.removeAttribute(attr.nodeName);
				}
			}
		},

		'_processChildren' : function(dom, context){
			// make sure we have something to process
			if(!dom){
				return;
			}

			var children = dom.childNodes,
				ln = children.length;

			for(; ln--;){
				if(!this._processChild(children[ln], context) && children[ln]){
					dom.removeChild(children[ln]);
				}
			}
		},

		'_processChild' : function(dom, context){
			// make sure we have something to process
			if(!dom){
				return;
			}

			var tag = dom.tagName;

			if(!tag || OjElement.isTextNode(dom)){
				return isEmpty(dom.nodeValue) ? null : new OjTextElement(dom);
			}

			var child, cls_path,
				  cls = dom.getAttribute('class-name');

			tag = tag.toLowerCase();

			// if this is a script or link tag ignore it
			if(tag == 'script' || tag == 'link'){
				return false;
			}

			// load the class if we need to
			if(!window[cls] && (cls_path = dom.getAttribute('class-path'))){
				OJ.importJs(cls_path);
			}

			// get the component tag class
			if(OjStyleElement.isComponentTag(tag)){
				cls = OjStyleElement.getTagComponent(tag);
			}

			// process the class
			if(cls){
				if(isFunction(cls)){
					child = cls(dom);
				}
				else{
					child = new window[cls]();
				}

				child._setDomSource(dom, context);
			}
			else{
				child = new OjStyleElement(dom, context);
			}

			return child;
		},

    '_processReferenceValue' : function(val, context){
      var ary = val.split('.'),
          target = null,
          ln = ary.length,
          i = 1, item;

      if(ln > 1){
        switch(ary[0]){
          case 'this':
            target = this;
          break;

          case 'window':
            target = window;
          break;

          case '$':
            target = context;

            // if we are not at the top level defer processing template reference values
            if(this != context){
              throw "Template Reference Value Processing Deferred"
            }
          break;
				}

        if(target){
          val = target;

          for(; i < ln; i++){
            item = ary[i];

            if(item.length > 2 && item.slice(-2) == '()'){
              val = val[item.slice(0, -2)]();
            }
            else{
              val = val[item];
            }
          }
        }
      }

      return val;
    },

    '_processTemplateVars' : function(){
      if(this._template_vars_){
        var ln = this._template_vars_.length,
            item, context;

        for(; ln--;){
          item = this._template_vars_[ln];
          context = item.context;

          item.func.call(context, this._processReferenceValue(item.value, this));
        }

        this._unset('_template_vars_');
      }
    },

		'_setDom' : function(dom, context){
			// todo: re-evaluate the pre-render functionality of dom
			this._super(OjElement, '_setDom', [dom]);

			// process the attributes
			this._processAttributes(dom, context);

			// process the children
			this._processChildren(dom, context);

      // process any template vars
      this._processTemplateVars();

			// setup the dom id if there isn't one already
			if(!this._id){
				this.setId(this._id_);
			}
		},

		'_setIsDisplayed' : function(displayed){
			var ln, child;

			if(this._is_displayed == displayed){
				return;
			}

			this._super(OjElement, '_setIsDisplayed', arguments);

			for(ln = this.numChildren(); ln--;){
				if(child = this.getChildAt(ln)){
					child._setIsDisplayed(this._is_displayed);
				}
			}
		},

		// Event Listeners
		'_processEvent' : function(evt){
			// because js natively calls the event functions on the context of the dom element
			// we just get the attached oj element from it to get into the proper context to dispatch
			// the event
			if(OjElement.element(evt.currentTarget) != this || evt.dispatched){
				return false;
			}

			evt.dispatched = true;

			return true;
		},

		'_onOjDomEvent' : function(evt){
			var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjDomEvent.convertDomEvent(evt));
			}
		},

		'_onDomOjMouseEvent' : function(evt){
      var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
        evt = OjMouseEvent.convertDomEvent(evt);

        proxy._onEvent(evt);

        if(evt.getType() == OjMouseEvent.DOWN && proxy.hasEventListener(OjMouseEvent.UP_OUTSIDE)){
          OJ.addEventListener(OjMouseEvent.UP, proxy, '_onOjMouseUp');
        }
			}
		},

		'_onDomOjKeyboardEvent' : function(evt){
			var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjKeyboardEvent.convertDomEvent(evt));
			}
		},

		'_onDomOjFocusEvent' : function(evt){
			var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
				proxy._onEvent(OjFocusEvent.convertDomEvent(evt));
			}
		},

		'_onDomScrollEvent' : function(evt){
			var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
				proxy._onScroll(OjScrollEvent.convertDomEvent(evt));
			}
		},

		'_onDomTouchEvent' : function(evt){
			var proxy = OjElement.element(this);

			if(proxy && proxy._processEvent(evt)){
        return proxy._onTouch(OjTouchEvent.convertDomEvent(evt));
			}

			return true;
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
		},

		'_onDragEnd' : function(evt){
			OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onDrag');
			OJ.removeEventListener(OjMouseEvent.UP, this, '_onDragEnd');

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

			if(this.hasEventListener(OjDragEvent.DRAG)){
				OJ.addEventListener(OjMouseEvent.MOVE, this, '_onDrag');
			}

			OJ.addEventListener(OjMouseEvent.UP, this, '_onDragEnd');

			this.dispatchEvent(
				new OjDragEvent(OjDragEvent.START, 0, 0, evt, false, false)
			);
		},

		'_onEvent' : function(evt){
			this.dispatchEvent(evt);

			return false;
		},

//		'_onMouse' : function(evt){
//			var type = evt.getType(),
//				x = evt.getPageX(),
//				y = evt.getPageY(),
//				response = this._onEvent(evt);
//
//
////			if(type == OjMouseEvent.UP && (!this._draggable || (this._dragX == x && this._dragY == y))){
////				trace(this._draggable, this._dragX == x, this._dragY == y);
////				this._onEvent(new OjMouseEvent(OjMouseEvent.CLICK, evt.getBubbles(), evt.getCancelable(), x, y));
////			}
//
//			return response;
//		},

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

    '_onOjMouseUp' : function(evt){
      OJ.removeEventListener(OjMouseEvent.UP, this, '_onOjMouseUp');

      if(this.hitTestPoint(evt.getPageX(), evt.getPageY())){
        return;
      }

      this.dispatchEvent(evt);
    },

		'_onScroll' : function(evt){
			var x, y;

			// for native scroll events
			if(evt.is('OjScrollEvent')){
				if(this._prev_x == (x = evt.getScrollX()) && this._prev_y == (y = evt.getScrollY())){
					return;
				}

				this._prev_x = x;
				this._prev_y = y;

				return this._onEvent(evt);
			}

			// for touch scroll events
			if(this._prev_x == (x = this.getScrollX()) && this._prev_y == (y = this.getScrollY())){
				return;
			}

			return this._onEvent(
				new OjScrollEvent(OjScrollEvent.SCROLL, this._prev_x = x, this._prev_y = y)
			);
		},

		'_onTouch' : function(evt){
			var type = evt.getType(),
				  x = evt.getPageX(),
				  y = evt.getPageY();

			if(type == OjTouchEvent.END){
				type = OjMouseEvent.UP;
			}
			else if(type == OjTouchEvent.START){
				type = OjMouseEvent.DOWN;

				this._dragX = x;
				this._dragY = y;
			}
			else if(type == OjTouchEvent.MOVE){
				type = OjMouseEvent.MOVE;
			}

			if(type){
        this._onEvent(new OjMouseEvent(type, x, y, true, true));

				// if the touch hasn't moved then issue a click event
        if(type == OjMouseEvent.UP && !this.hasEventListener(OjDragEvent.START)){
					this._onEvent(new OjMouseEvent(OjMouseEvent.CLICK, x, y, true, true));
				}
			}

			return true;
		},


		// event listener overrides
		// customize this functionality for dom events so that they work
		'_updateTouchStartListeners' : function(){
			if(!this.hasEventListeners(OjMouseEvent.DOWN, OjMouseEvent.CLICK, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){
				this._getEventProxy().ontouchstart = null;
			}
		},

		'_updateTouchMoveListeners' : function(){
			if(!this.hasEventListeners(OjMouseEvent.MOVE, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){//}, OjScrollEvent.SCROLL)){
				this._getEventProxy().ontouchmove = null;
			}
		},

		'_updateTouchEndListeners' : function(){
			if(!this.hasEventListeners(OjMouseEvent.UP, OjMouseEvent.UP_OUTSIDE, OjMouseEvent.CLICK, OjDragEvent.END)){
        var proxy = this._getEventProxy();

				proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = null;
			}
		},

		'addEventListener' : function(type){
			var is_touch = OJ.isTouchCapable(),
				  proxy = this._getEventProxy();

      this._super(OjElement, 'addEventListener', arguments);

			if(type == OjScrollEvent.SCROLL){
				this._scrollable = true;

				proxy.onscroll = this._onDomScrollEvent;

//				if(is_touch){
//					proxy.ontouchmove = this._onDomTouchEvent;
//				}
			}

			// mouse events
			else if(type == OjMouseEvent.CLICK){
				if(is_touch){
					proxy.ontouchstart = proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
				}
				else{
					proxy.onclick = this._onDomOjMouseEvent;
				}
			}
			else if(type == OjMouseEvent.DOUBLE_CLICK){
				proxy.ondblclick = this._onDomOjMouseEvent;
			}
			else if(type == OjMouseEvent.DOWN){
				if(is_touch){
					proxy.ontouchstart = this._onDomTouchEvent;
				}
				else{
					proxy.onmousedown = this._onDomOjMouseEvent;
				}
			}
			else if(type == OjMouseEvent.MOVE){
				if(is_touch){
					proxy.ontouchmove = this._onDomTouchEvent;
				}
				else{
					proxy.onmousemove = this._onDomOjMouseEvent;
				}
			}
			else if(type == OjMouseEvent.OUT){
				proxy.onmouseout = this._onDomOjMouseEvent;
			}
			else if(type == OjMouseEvent.OVER){
				proxy.onmouseover = this._onDomOjMouseEvent;
			}
			else if(type == OjMouseEvent.UP){
				if(is_touch){
          proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
				}
				else{
					proxy.onmouseup = this._onDomOjMouseEvent;
				}
			}
      else if(type == OjMouseEvent.UP_OUTSIDE){
        if(is_touch){
          proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
				}
				else{
					proxy.onmousedown = this._onDomOjMouseEvent;
				}
      }

			// drag events
			else if(OjDragEvent.isDragEvent(type)){
				this._draggable = true;
//
//				if(is_touch){
//					proxy.ontouchstart = proxy.ontouchmove = proxy.ontouchend = this._onDomTouchEvent;
//				}
//				else{
//					proxy.onmousedown = this._onDomOjMouseEvent;
//				}

				this.addEventListener(OjMouseEvent.DOWN, this, '_onDragStart');
			}

			// keyboard events
			else if(type == OjKeyboardEvent.DOWN){
				proxy.onkeydown = this._onDomOjKeyboardEvent;
			}
			else if(type == OjKeyboardEvent.PRESS){
				proxy.onkeypress = this._onDomOjKeyboardEvent;
			}
			else if(type == OjKeyboardEvent.UP){
				proxy.onkeyup = this._onDomOjKeyboardEvent;
			}

			// focus events
			else if(type == OjFocusEvent.IN){
				proxy.onfocus = this._onDomOjFocusEvent;
			}
			else if(type == OjFocusEvent.OUT){
				proxy.onblur = this._onDomOjFocusEvent;
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
				proxy.onresize = this._onOjDomEvent;
			}

			// misc dom events
			else if(type == OjDomEvent.CHANGE){
				proxy.onchange = this._onOjDomEvent;
			}
		},

		'removeEventListener' : function(type, context, callback){
			var proxy = this._getEventProxy();

			this._super(OjElement, 'removeEventListener', arguments);

			// scroll events
			if(type == OjScrollEvent.SCROLL){
				if(!this.hasEventListener(OjScrollEvent.SCROLL)){
					this._scrollable = false;

					proxy.onscroll = null;

//					this._updateTouchMoveListeners();
				}
			}

			// mouse events
			else if(type == OjMouseEvent.CLICK){
				if(!this.hasEventListener(OjMouseEvent.CLICK)){
					proxy.onclick = null;

					this._updateTouchStartListeners();
					this._updateTouchEndListeners();
				}
			}
			else if(type == OjMouseEvent.DOUBLE_CLICK){
				if(!this.hasEventListener(OjMouseEvent.DOUBLE_CLICK)){
					proxy.ondblclick = null;

					this._updateTouchStartListeners();
					this._updateTouchEndListeners();
				}
			}
			else if(type == OjMouseEvent.DOWN){
				if(!this.hasEventListeners(OjMouseEvent.DOWN, OjMouseEvent.UP_OUTSIDE, OjDragEvent.DRAG)){
					proxy.onmousedown = null;

					this._updateTouchStartListeners();
				}
			}
			else if(type == OjMouseEvent.MOVE){
				if(!this.hasEventListener(OjMouseEvent.MOVE)){
					proxy.onmousemove = null;

					this._updateTouchMoveListeners();
				}
			}
			else if(type == OjMouseEvent.OUT){
				if(!this.hasEventListener(OjMouseEvent.OUT)){
					proxy.onmouseout = null;
				}
			}
			else if(type == OjMouseEvent.OVER){
				if(!this.hasEventListener(OjMouseEvent.OVER)){
					proxy.onmouseover = null;
				}
			}
			else if(type == OjMouseEvent.UP){
				if(!this.hasEventListener(OjMouseEvent.UP)){
					proxy.onmouseup = null;

					this._updateTouchEndListeners();
				}
			}
      else if(type == OjMouseEvent.UP_OUTSIDE){
        if(!this.hasEventListener(OjMouseEvent.DOWN)){
          proxy.onmousedown = null;

          OJ.removeEventListener(OjMouseEvent.UP, proxy, '_onOjMouseUp');

          this._updateTouchEndListeners();
        }
      }

			// drag events
			else if(OjDragEvent.isDragEvent(type)){
				if(!this.hasEventListeners(OjDragEvent.DRAG, OjDragEvent.END, OjDragEvent.START)){
					this._draggable = false;

					this.removeEventListener(OjMouseEvent.DOWN, this, '_onDragStart');

					OJ.removeEventListener(OjMouseEvent.MOVE, this, '_onDrag');
					OJ.removeEventListener(OjMouseEvent.UP, this, '_onDragEnd');
				}
			}

			// keyboard events
			else if(type == OjKeyboardEvent.DOWN){
				if(!this.hasEventListener(OjKeyboardEvent.DOWN)){
					proxy.onkeydown = null;
				}
			}
			else if(type == OjKeyboardEvent.PRESS){
				if(!this.hasEventListener(OjKeyboardEvent.PRESS)){
					proxy.onkeypress = null;
				}
			}
			else if(type == OjKeyboardEvent.UP){
				if(!this.hasEventListener(OjKeyboardEvent.UP)){
					proxy.onkeyup = null;
				}
			}

			// focus events
			else if(type == OjFocusEvent.IN){
				if(!this.hasEventListener(OjFocusEvent.IN)){
					proxy.onfocus = null;
				}
			}
			else if(type == OjFocusEvent.OUT){
				if(!this.hasEventListener(OjFocusEvent.OUT)){
					proxy.onblur = null;
				}
			}

			// transform event
			else if(type == OjTransformEvent.MOVE){
				if(!this.hasEventListener(OjTransformEvent.MOVE)){
					this._unset('_move_timer');
				}
			}
			else if(type == OjTransformEvent.RESIZE){
				if(!this.hasEventListener(OjTransformEvent.RESIZE)){
					proxy.onresize = null;
				}
			}

			// misc dom events
			else if(type == OjDomEvent.CHANGE){
				if(!this.hasEventListener(OjDomEvent.CHANGE)){
					proxy.onchange = null;
				}
			}
		},


		// Child Management Functions
		'addChild' : function(child){
			return this.addChildAt(child, this.numChildren());
		},

		'addChildAt' : function(child, index){
			var dom = this._dom;

			if(!child || this.hasChild(child)){
				return child;
			}

			if(index >= this.numChildren()){
				dom.appendChild(child._dom);
			}
			else{
				dom.insertBefore(child._dom, dom.childNodes[index]);
			}

			// update the display state
			child._setIsDisplayed(this._is_displayed);

			return child;
		},

		'getChildAt' : function(index){
			return OjElement.element(this._dom.childNodes[index]);
		},

		'getChildren' : function(){
			var ary = [],
				ln = this.numChildren();

			for(; ln--;){
				ary.unshift(this.getChildAt(ln));
			}

			return ary;
		},
		'setChildren' : function(children){
			this.removeAllChildren();

			var i = 0,
				ln = children.length;

			for(; i < ln; i++){
				this.addChild(children[i]);
			}
		},

		'indexOfChild' : function(child){
			return Array.array(this._dom.childNodes).indexOf(child._dom);
		},

		'hasChild' : function(child){
			return child.parent() == this;
		},

		'numChildren' : function(){
			return this._dom.childNodes.length;
		},

		'moveChild' : function(child, index){
			if(this.hasChild(child)){
				this._dom.insertBefore(child._dom, this.getChildAt(index)._dom);

				return child;
			}

			// throw an error here
		},

		'removeAllChildren' : function(){
			var ln = this.numChildren(),
				ary = [];

			for(; ln--;){
				ary.unshift(this.removeChildAt(ln));
			}

			return ary;
		},

		'removeChild' : function(child){
			if(child){
				this._dom.removeChild(child._dom);

				child._setIsDisplayed(false);
			}

			return child;
		},

		'removeChildAt' : function(index){
			if(index < 0 || index >= this.numChildren()){
				return null;
			}

			return this.removeChild(this.getChildAt(index));
		},

		'removeChildren' : function(children){
			var ln = children.length;

			for(; ln--;){
				this.removeChild(children[ln]);
			}
		},

		'replaceChild' : function(target, replacement){
			return this.replaceChildAt(replacement, this.indexOfChild(target));
		},

		'replaceChildAt' : function(child, index){
			var rtrn;

			if(index >= this.numChildren()){
				this.addChild(child);
			}
			else{
				rtrn = this.removeChildAt(index);

				this.addChildAt(child, index);
			}

			return rtrn;
		},


		// misc functions
		'blur' : function(){
			if(isFunction(this._dom.blur)){
				this._dom.blur();
			}
		},

		'find' : function(query){
			if(isElement(query)){
				query = '#' + query.id();
			}

			return OJ.query(query, this._dom);
		},

		'focus' : function(){
			if(isFunction(this._dom.focus)){
				this._dom.focus();
			}
		},

		'hide' : function(){
			this.addCss(['hidden']);

			this.dispatchEvent(new OjEvent(OjEvent.HIDE));
		},

		'isVisible' : function(){
			return this._getStyle('display') != OjStyleElement.NONE &&
				this._getStyle('visibility') != 'hidden' &&
				this._alpha > 0 &&
				this.getWidth() > 0 && this.getHeight() > 0;
		},

		'show' : function(){
			this.removeCss(['hidden']);

			this.dispatchEvent(new OjEvent(OjEvent.SHOW));
		},


		// single style getter & setter functions
		'_getStyleBackup' : function(style){
			return this._proxy.style[style];
		},

		'_getStyleIe' : function(style){
			return this._proxy.currentStyle[style];
		},

		'_getStyle' : function(style){
			return document.defaultView.getComputedStyle(this._proxy, null)[style];
		},
		'_setStyle' : function(style, value){
			return this._proxy.style[style] = value;
		},


		'_getStyleNumber' : function(prop){
			var val = this._getStyle(prop);

			if(!val || val == OjStyleElement.NONE){
				return 0;
			}

			return parseFloat(val.replaceAll(['px', '%', 'pt', 'em'], ''));
		},

		'_setStyleNumber' : function(prop, val/*, unit*/){
			var args = arguments;

			this._setStyle(prop, val + (args.length > 2 ? args[2] : this._getStyleUnit(prop)));
		},

		// Bulk Style Getter & Setter Functions
		'_getStyler' : function(prop, args){
			var unit = prop == 'font' || prop  =='line' ? OJ.setting('fontUnit') : OJ.setting('dimUnit');

			if(!this['_' + prop]){
				this['_' + prop] = [
					this._getStyle(prop + 'Top').replaceAll(unit, ''),
					this._getStyle(prop + 'Right').replaceAll(unit, ''),
					this._getStyle(prop + 'Bottom').replaceAll(unit, ''),
					this._getStyle(prop + 'Left').replaceAll(unit, '')
				];
			}

			return args && args.length ? this['_' + prop][args[0]] : this['_' + prop];
		},

		'_setStyler' : function(prop, vals){
			var str = '',
				ln = vals.length,
				val = vals[0],
				unit = this._getStyleUnit(prop);

			this._getStyler(prop);

			// fill out the vals array so that there is always the 4 values
			if(ln == 1){
				vals = [val, val, val, val];
			}
			else if(ln == 2){
				vals = [val, vals[1], val, vals[1]];
			}
			else if(ln == 3){
				vals = [val, vals[1], vals[2], vals[1]];
			}

			// substitute current values for null values
			for(ln = 4; ln--;){
				val = vals[ln];

				if(isNull(val)){
					val = this['_' + prop][ln];
				}

				str = (ln ? ' ' : '') + val + unit + str;
			}

			this._setStyle(prop, str);
		},

		'_getStyleUnit' : function(prop){
			prop = prop.substr(0, 4);

			if(prop == 'font' || prop == 'line'){
				return OJ.setting('fontUnit');
			}

			return OJ.setting('dimUnit');
		},


		// Attribute Getter & Setter Functions
		'getAttr' : function(key){
			return this._proxy.getAttribute(key);
		},
		'setAttr' : function(key/*||attribute, value*/){
			if(arguments.length == 1){
				if(isEmpty(key.value)){
					this._proxy.removeAttribute(key.nodeName);
				}
				else{
					this._proxy.setAttribute(key.nodeName, key.value);
				}
			}
			else{
				if(isSet(arguments[1])){
					this._proxy.setAttribute(key, arguments[1]);
				}
				else{
					this._proxy.removeAttribute(key);
				}
			}
		},

		'setId' : function(val){
			if(this._id == val){
				return
			}

      // unregister the old id
      OjElement.unregister(this);

			this._proxy.ojProxy = this._dom.id = this._id = val;

      // register the new id
      OjElement.register(this);
		},

		'setName' : function(val){
			if(this._name == val){
				return;
			}

			this.setAttr('name', this._name = val);
		},

		// Content Getter & Setter Functions
		'getText' : function(){
			return this._dom.innerHTML;
		},
		'setText' : function(str){
			this.removeAllChildren();

			this._dom.innerHTML = str ? str.toString() : null;

			// we may want to process this html, just a thought
		},

		// Css Functions
		'_makeCssList' : function(args){
			if(isArray(args[0])){
				return args[0];
			}

			var ln = args.length,
				list = [];

			for(; ln--;){
				list = list.concat(args[ln].trim().split(' '));
			}

			return list;
		},

		'_processCssList' : function(args, action){
			var css = this.getCssList(),
				list = this._makeCssList(args),
				ln = list.length,
				cls, index;

			for(; ln--;){
				index = css.indexOf(cls = list[ln]);

				if(index == -1){
					switch(action){
						case 'has':
							return false;

						case 'add':
						case 'toggle':
							css.push(cls);
					}
				}
				else{
					switch(action){
						case 'remove':
						case 'toggle':
							css.splice(index, 1);
					}
				}
			}

			if(action == 'has'){
				return true;
			}

			return this.setCss(css);
		},

		'addCss' : function(css/*...css | array*/){
			return this._processCssList(arguments, 'add');
		},

		'getCss' : function(){
			return this._proxy.className.trim();
		},

		'getCssList' : function(){
			return this.getCss().split(' ');
		},

		'hasCss' : function(css/*...css | array*/){
			return this._processCssList(arguments, 'has');
		},

		'removeCss' : function(css/*... css | array*/){
			return this._processCssList(arguments, 'remove');
		},

		'setCss' : function(css){
			return this._proxy.className = (isArray(css) ? css.join(' ') : css).trim();
		},

		'toggleCss' : function(css/*...css | array*/){
			return this._processCssList(arguments, 'toggle');
		},

		// Focus Functions
		'hasFocus' : function(){
			return this._dom.hasFocus;
		},

		'hitTest' : function(elm){
			return this.hitTestRect(elm.getRect());
		},

		'hitTestRect' : function(rect){
			return this.getRect().hitTestRect(rect);
		},

		'hitTestPoint' : function(x, y){
			return this.getRect().hitTestPoint(x, y);
		},

		'localPoint' : function(global_point){
			// todo: add localPoint functionality
		},

		'localX' : function(global_x){
			return global_x - this.getPageX();
		},

		'localY' : function(global_y){
			return global_y - this.getPageY();
		},




		// Dimensional Getter & Setter Functions
		// TODO:
		// 1) factor in border into sizing
		// 2) handle non-metric values such as auto and %
		'getInnerWidth' : function(){
			return this.getWidth() - this.getPaddingLeft() - this.getPaddingRight();
		},
		'setInnerWidth' : function(w){
			this._setWidth(Math.round(w) + OJ.setting('dimUnit'));
		},

		'getOuterWidth' : function(){
			return this.getWidth() + this.getMarginLeft() + Math.abs(this.getMarginRight());
		},
		'setOuterWidth' : function(w){
			this.setInnerWidth(w - this.getPaddingLeft() - this.getPaddingRight() - this.getMarginLeft() - Math.abs(this.getMarginRight()));
		},

		'getWidth' : function(){
			return this._proxy.offsetWidth || this._getStyleNumber('width');
		},
		'_setWidth' : function(val){
			this._setStyle('width', val);
		},
		'setWidth' : function(w/*, unit*/){
			var args = arguments;

			if(w == OjStyleElement.AUTO){
				this._setWidth(null);
			}
			else if(args.length > 1){
				this._setWidth(w + (isString(args[1]) ? args[1] : '%'));
			}
			else{
				this.setInnerWidth(w - this.getPaddingLeft() - this.getPaddingRight());
			}
		},

		'getMinWidth' : function(){
			return isNull(this._min_width) ? this._min_width = this._getStyleNumber('minWidth') : this._min_width;
		},
		'setMinWidth' : function(min){
			this._setStyleNumber('minWidth', this._min_width = min);
		},

		'getMaxWidth' : function(){
			return isNull(this._max_width) ? this._max_width = this._getStyleNumber('maxWidth') : this._max_width;
		},
		'setMaxWidth' : function(max){
			this._setStyleNumber('maxWidth', this._max_width = max);
		},

		'getInnerHeight' : function(){
			return this.getHeight() - this.getPaddingTop() - this.getPaddingBottom();
		},
		'setInnerHeight' : function(h){
			this._setHeight(Math.round(h) + OJ.setting('dimUnit'));
		},

		'getOuterHeight' : function(){
			return this.getHeight() + this.getMarginTop() + Math.abs(this.getMarginBottom());
		},
		'setOuterHeight' : function(h){
			this.setInnerHeight(h - this.getPaddingTop() - this.getPaddingBottom() - this.getMarginTop() - Math.abs(this.getMarginBottom()));
		},

		'getHeight' : function(){
			return this._proxy.offsetHeight || this._getStyleNumber('height');;
		},
		'_setHeight' : function(val){
			this._setStyle('height', val);
		},
		'setHeight' : function(h/*, unit*/){
			var args = arguments;

			if(h == OjStyleElement.AUTO){
				this._setHeight(null);
			}
			else if(args.length > 1){
				this._setHeight(h + (isString(args[1]) ? args[1] : '%'));
			}
			else{
				this.setInnerHeight(h - this.getPaddingTop() - this.getPaddingBottom());
			}
		},

		'getMinHeight' : function(){
			return isNull(this._min_height) ? this._min_height = this._getStyleNumber('minHeight') : this._min_height;
		},
		'setMinHeight' : function(min){
			this._min_height = min;

			this._setStyleNumber('minHeight', min);
		},

		'getMaxHeight' : function(){
			return isNull(this._max_height) ? this._max_height = this._getStyleNumber('maxHeight') : this._max_height;
		},
		'setMaxHeight' : function(max){
			this._max_height = max;

			this._setStyleNumber('maxHeight', max);
		},

		'setPercentWidth' : function(w){
			this._setWidth(w + '%');
		},
		'setPercentHeight' : function(h){
			this._setHeight(h + '%');
		},


		// border size functions
//		'getBorderSize' : function(/*side_index : top = 0, right = 1, bottom = 2, left = 3*/){
//			return this._getStyler('border-size', arguments);
//		},
//		'setBorderSize' : function(size/* | top/bottom, right/left | top, right/left, bottom | top, right, bottom, left*/){
//			this._setStyler('border-size', arguments);
//		},
//
//		'getBorderSizeBottom' : function(){
//			return this.getMargin(2);
//		},
//		'setBorderSizeBottom' : function(margin){
//			this.setMargin(null, null, margin, null);
//		},
//
//		'getBorderSizeLeft' : function(){
//			return this.getMargin(3);
//		},
//		'setBorderSizeLeft' : function(margin){
//			this.setMargin(null, null, null, margin);
//		},
//
//		'getBorderSizeRight' : function(){
//			return this.getMargin(1);
//		},
//		'setBorderSizeRight' : function(margin){
//			this.setMargin(null, margin, null, null);
//		},
//
//		'getBorderSizeTop' : function(){
//			return this.getMargin(0);
//		},
//		'setBorderSizeTop' : function(margin){
//			this.setMargin(margin, null, null, null);
//		},


		// Style Getter & Setter Functions
		'getX' : function(){
			return this._proxy.offsetLeft;
		},
		'getPageX' : function(){
			if(this._proxy.getBoundingClientRect){
				return this._proxy.getBoundingClientRect().left;
			}

			// add backup solution
		},
		'setX' : function(val/*, unit=px*/){
			var args = arguments;

			this._setStyleNumber('left', val, args.length > 1 ? args[1] : OJ.setting('dimUnit'));
		},

		'getY' : function(){
			return this._proxy.offsetTop;
		},
		'getPageY' : function(){
			if(this._proxy.getBoundingClientRect){
				return this._proxy.getBoundingClientRect().top;
			}

			// add backup solution
		},
		'setY' : function(val/*, unit=px*/){
			var args = arguments;

			this._setStyleNumber('top', val, args.length > 1 ? args[1] : OJ.setting('dimUnit'));
		},

		'getAlpha' : function(){
			return this._alpha;
		},
		'setAlpha' : function(alpha){
			var old_alpha = this._alpha;

			if(old_alpha == alpha){
				return;
			}

			if((alpha = this._alpha = this._setStyle('opacity', alpha)) && old_alpha === 0){
//				this.dispatchEvent(new OjEvent(OjEvent.SHOW));
			}
			else if(!alpha){
//				this.dispatchEvent(new OjEvent(OjEvent.HIDE));
			}
		},

		'getBackgroundColor' : function(){
			return this._getStyle('background-color');
		},
		'setBackgroundColor' : function(color){
			this._setStyle('background-color', color);
		},

		'getDepth' : function(){
			return this._depth;
		},
		'setDepth' : function(depth){
			this._depth = this._setStyle('zIndex', depth);
		},

		'getOverflow' : function(){
			return this._overflow;
		},
		'setOverflow' : function(overflow){
			this._overflow = this._setStyle('overflow', overflow);
		},

		'getRect' : function(){
			return new OjRect(this.getPageX(), this.getPageY(), this.getWidth(), this.getHeight());
		},
		'setRect' : function(rect){
			// add this later
		},

		'getScrollHeight' : function(){
			return this._proxy.scrollHeight;
		},
		'setScrollHeight' : function(val){
			this._proxy.scrollHeight = val;
		},

		'getScrollWidth' : function(){
			return this._proxy.scrollWidth;
		},
		'setScrollWidth' : function(val){
			this._proxy.scrollWidth = val;
		},

		'getScrollX' : function(){
			return this._proxy.scrollLeft;
		},

		'setScrollX' : function(val){
			this._proxy.scrollLeft = val;
		},

		'getScrollY' : function(){
			return this._proxy.scrollTop;
		},

		'setScrollY' : function(val){
			this._proxy.scrollTop = val;
		},


		// alignment getter & setters
		'_getAlign' : function(type, dflt){
			var align = this.getAttr(type + '-align');

			return align ? align : dflt;
		},

		'_setAlign' : function(type, val, dflt){
			if(val == dflt){
				val = null;
			}

			this.setAttr(type + '-align', this['_' + type + '_align'] = val);
		},

		'getHAlign' : function(){
			return this._getAlign('h', OjStyleElement.LEFT);
		},
		'setHAlign' : function(val){
			return this._setAlign('h', val, OjStyleElement.LEFT);
		},

		'getVAlign' : function(){
			return this._getAlign('v', OjStyleElement.TOP);
		},
		'setVAlign' : function(val){
			return this._setAlign('v', val, OjStyleElement.TOP);
		},


		// Transform Setter & Getters
		'_updateTransform' : function(){
			var rotate = this._rotation ? 'rotate(' + this._rotation + 'deg) ' : '',
				translate = this._translate ? this._translate.toString() : '',
				transform = rotate + (isEmpty(translate) ? '' : 'translate(' + translate + ')'),
				prefix = OJ.getCssPrefix();

			if(prefix == '-moz-'){
				this._setStyle('MozTransform', transform);
			}
			else{
				this._setStyle(prefix + 'transform', transform);
			}

			this._setStyle('transform', transform);
		},

		'getOrigin' : function(){
			return this._origin;
		},
		'setOrigin' : function(val){
			this._setStyle(OJ.getCssPrefix() + 'transform-origin', val);

			this._setStyle('transform-origin', this._origin = val);
		},

		'getRotation' : function(){
			return this._rotation;
		},
		'setRotation' : function(val){
			if(this._rotation == val){
				return ;
			}

			this._rotation = val;

			this._updateTransform();
		},

		'getTranslate' : function(){
			return this._translate;
		},
		'setTranslate' : function(val){
			if(val.isEqualTo(this._translate)){
				return ;
			}

			this._translate = val;

			this._updateTransform();
		}
	},
	{
		'COMPONENT_TAGS' : {},

		'STYLE_BACKUP'  : 'styleBackup',
		'STYLE_DEFAULT' : 'styleDefault',
		'STYLE_IE'      : 'styleIE',

		'STYLE_MODE' : (function(){
			var elm = OjElement.elm('div');

			if(elm.currentStyle){
				return 'styleIE';
			}

			if(!document.defaultView || !document.defaultView.getComputedStyle){
				return 'styleBackup';
			}

			return 'styleDefault';
		})(),

		'AUTO'    : 'auto',
		'BLOCK'   : 'block',
		'HIDDEN'  : 'hidden',
		'NONE'    : 'none',
		'SCROLL'  : 'scroll',
		'VISIBLE' : 'visible',

		'LEFT'   : 'l',
		'CENTER' : 'c',
		'RIGHT'  : 'r',

		'TOP'    : 't',
		'MIDDLE' : 'm',
		'BOTTOM' : 'b',


		'attributeToGetter' : function(attr){
			return 'get' + OJ.attributeToFunc(attr).ucFirst();
		},

		'attributeToSetter' : function(attr){
			return 'set' + OJ.attributeToFunc(attr).ucFirst();
		},

		'getTagComponent' : function(tag){
			return this.COMPONENT_TAGS[tag];
		},

		'isComponentTag' : function(tag){
			return isSet(this.COMPONENT_TAGS[tag]);
		},

		'registerComponentTag' : function(tag, component){
			this.COMPONENT_TAGS[tag] = component;

			if(OJ.getBrowser() == OJ.IE && OJ.getBrowserVersion().compareVersion('9.0.0') < 0){
				document.createElement(tag);
			}
		},

		'getStyle' : function(dom, style){
			if(this.STYLE_MODE == this.STYLE_IE){
				return dom.currentStyle[style];
			}

			if(this.STYLE_MODE == this.STYLE_BACKUP){
				return dom.style[style];
			}

			return document.defaultView.getComputedStyle(dom, null)[style];
		}
	}
);