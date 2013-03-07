OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.events.DragEvent');
OJ.importJs('oj.events.Event');
OJ.importJs('oj.events.FocusEvent');
OJ.importJs('oj.events.KeyboardEvent');
OJ.importJs('oj.events.MouseEvent');
OJ.importJs('oj.events.TouchEvent');
OJ.importJs('oj.events.TransformEvent');


'use strict';

oj.dom.Element = function(){
	return new oj.events.Actionable(
		arguments, 'OjElement',
		{
			'_children' : null,  '_dom' : null,  '_parent' : null, '_proxy' : null,

			'_move_timer' : null,  '_page_x' : null,  '_page_y' : null,

			'_draggable' : false,  '_dragX' : 0,  '_dragY' : 0,


			'_constructor' : function(/*source*/){
				this._super('OjElement', '_constructor', []);

				var source;

				if(arguments.length && (source = arguments[0])){
					// check for dom elm
					if(source.nodeType){
						// may need context dom
						this._setDom(source);
					}
					else if(source === 'body' || source == document || source == document.body){
						// may need context body
						this._setDom(document.body);
					}
					else if(isString(source)){
						source = source.trim();

						var tmp, ln = source.length;

						if(source.charAt(0) == '<' && source.charAt(ln - 1) == '>' && ln >= 5){
							var tag = source.substr(0, 6).toLowerCase();
							var tag2 = tag.substr(0, 3);

							if(tag == '<thead' || tag == '<tbody' || tag == '<tfoot'){
								tmp = document.createElement('table');
							}
							else if(tag2 == '<tr'){
								tmp = document.createElement('tbody');
							}
							else if(tag2 == '<td' || tag2 == '<th'){
								tmp = document.createElement('tr')
							}
							else{
								tmp = document.createElement('div');
							}

							tmp.innerHTML = source;

							if(tmp.childNodes.length){
								source = tmp.childNodes[0];

								tmp.removeChild(source);

								tmp = [source];
							}
							else{
								tmp = [];
							}
						}
						else{
							// todo: re-evaluate the use query, maybe just allow ids...
							tmp = OJ.query(source);
						}

						if(tmp.length){
							this._setDom(tmp[0]);
						}

						// todo: re-evaluate the pre-render functionality
						// move the solo elm into the dom so things like dimensions will be available
//						OJ.render(this._dom);
					}
				}

				if(!this._dom){
					this._setDom(document.createElement('div'));

					// move the solo elm into the dom so things like dimensions will be available
// re-evaluate		OJ.render(this._dom);
				}
			},


			'_destructor' : function(/*recursive = false*/){
				// remove from parent
				if(this._parent){
					this._parent.removeChild(this);
				}

				// remove the children
				if(this._children){
					var ln = this._children.length;

					while(ln-- > 0){
						OJ.destroy(this._children[ln]);
					}
				}

				delete this._dom.ojElm;

				// release the vars
				this._dom = this._children = this._parent = this._proxy = null;

				// continue on with the destruction
				return this._super('OjElement', '_destructor', arguments);
			},


			'_setDom' : function(dom_elm){
				this._setProxy(this._dom = dom_elm);

				this._dom.ojElm = this;

				if(this._class_name != 'OjTextElement'){
					this._processAttributes();

					this._processChildren();
				}
			},

			'_setProxy' : function(dom_elm){
				if(this._proxy){
					this._proxy.ojProxy = null;
				}

				this._proxy = dom_elm;

				dom_elm.ojProxy = this;
			},

			'_setDomSource' : function(dom_elm){
				if(dom_elm.parentNode){
					dom_elm.parentNode.replaceChild(this._dom, dom_elm);
				}

				// we need to copy over the attributes
				var attrs = dom_elm.attributes, ln = attrs.length;

				while(ln-- > 0){
					if(attrs[ln].nodeName == 'class-name' || attrs[ln].nodeName == 'class-path'){
						continue;
					}

					if(attrs[ln].nodeName == 'class'){
						attrs[ln].value += ' ' + this.getAttr('class');
					}

					this.setAttr(attrs[ln]);
				}

				// then process them
				this._processAttributes();
			},


			'_isDisplayed' : function(){ },

			'_isNotDisplayed' : function(){ },

			'_processAttributes' : function(){
				var ln = this._dom.attributes.length,
					attr, val, setter, ids, ln2;

				while(ln-- > 0){
					attr = this._dom.attributes[ln].nodeName;
					val = this._dom.attributes[ln].value;

					if(attr == 'class-name' || attr == 'class-path' || attr == 'var'){
						this._dom.removeAttribute(attr);
					}
					else if(attr == 'class'){
						this._dom.removeAttribute('class');

						this._classes = [];

						this.addClass(val);
					}
					else{
						setter = OjElement.attributeToSetter(attr);

						if(isFunction(this[setter])){
							this._dom.removeAttribute(attr);

							if(val == ''){
								val = null;
							}
							else if(isNumeric(val)){
								val = parseFloat(val);
							}

							this[setter](val);
						}
					}
				}

				ln = attr = val = setter = ids = ln2 = null;
			},

			'_processChildren' : function(){
				var children = this._dom.childNodes, ln = children.length, child, child_dom;

				this._children = [];

				while(ln-- > 0){
					child = this._processChild(children[ln], null);

					if(child){
						child._setParent(this);

						this._children.splice(0, 0, child);
					}
					else if(children[ln]){
						this._dom.removeChild(children[ln]);
					}
				}

				children = ln = child = null;
			},

			'_processChild' : function(dom_elm, component){
				var tag = dom_elm.tagName;

				if(!tag || OjElement.isTextNode(dom_elm)){
					return isEmpty(dom_elm.nodeValue) ? null : new OjTextElement(dom_elm);
				}

				var child, ids, ln,
					var_val = dom_elm.getAttribute('var'),
					cls = dom_elm.getAttribute('class-name');

				tag = tag.toLowerCase();

				if(OjElement.isComponentTag(tag)){
					cls = OjElement.getTagComponent(tag);
				}

				if(cls){
					var cls_path = dom_elm.getAttribute('class-path');

					if(cls_path){
						OJ.importJs(cls_path);
					}

					child = new window[cls]();
					child._setDomSource(dom_elm);
				}
				else{
					child = new OjStyleElement(dom_elm);
				}

				if(!isEmpty(var_val) && (component = component ? component : OjElement.parentComponent(this))){
					(component[var_val] = child).addClasses(var_val);
				}

				return child;
			},


			'_processEvent' : function(evt){
				// because js natively calls the event functions on the context of the dom element
				// we just get the attached oj element from it to get into the proper context to dispatch
				// the event
				if(evt.currentTarget.ojProxy != this || evt.dispatched){
					return false;
				}

				evt.dispatched = true;

				return true
			},

			'_onDomEvent' : function(evt){
				if(this.ojProxy && this.ojProxy._processEvent(evt)){
					this.ojProxy._onEvent(OjDomEvent.convertDomEvent(evt));
				}

				return false;
			},

			'_onDomMouseEvent' : function(evt){
				if(this.ojProxy && this.ojProxy._processEvent(evt)){
					this.ojProxy._onMouse(OjMouseEvent.convertDomEvent(evt));
				}

				return false;
			},

			'_onDomKeyboardEvent' : function(evt){
				if(this.ojProxy && this.ojProxy._processEvent(evt)){
					this.ojProxy._onEvent(OjKeyboardEvent.convertDomEvent(evt));
				}

				return false;
			},

			'_onDomFocusEvent' : function(evt){
				if(this.ojProxy && this.ojProxy._processEvent(evt)){
					this.ojProxy._onEvent(OjFocusEvent.convertDomEvent(evt));
				}

				return false;
			},

			'_onDomTouchEvent' : function(evt){
				if(this.ojProxy && this.ojProxy._processEvent(evt)){
					this.ojProxy._onTouch(OjTouchEvent.convertDomEvent(evt));
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

				this._onEvent(evt);
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

					if(OjElement.hasDomElement(this._proxy, dom_elm)){
						if(this.hasEventListener(OjMouseEvent.UP)){
							this._onMouse(new OjMouseEvent(OjMouseEvent.UP, evt.getBubbles(), evt.getCancelable(), evt.getPageX(), evt.getPageY()));
						}

						if(this.hasEventListener(OjMouseEvent.CLICK)){
							this._onMouse(new OjMouseEvent(OjMouseEvent.CLICK, evt.getBubbles(), evt.getCancelable(), evt.getPageX(), evt.getPageY()));
						}
					}
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
				this._onEvent(evt);
			},

			'find' : function(query){
				if(isElement(query)){
					query = '#' + query.id();
				}

				return OJ.query(query, this._dom);
			},


			// event listener overrides
			// customize this functionality for dom events so that they work
			'addEventListener' : function(type){
				this._super('OjElement', 'addEventListener', arguments);

				// mouse events
				if(type == OjMouseEvent.CLICK){
					this._proxy.onclick = this._onDomMouseEvent;

					if(OJ.isTouchCapable()){
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
		}
	);
};

/**
 * OjElement Class Wrapper
 */
var OjElement = {
	'attributeToFunc' : function(attr){
		var parts = attr.split('-'), ln = parts.length;

		while(ln-- > 0){
			parts[ln] = parts[ln].ucFirst();
		}

		return parts.join('');
	},

	'attributeToGetter' : function(attr){
		return 'get' + OjElement.attributeToFunc(attr);
	},

	'attributeToSetter' : function(attr){
		return 'set' + OjElement.attributeToFunc(attr);
	},

	'byId' : function(id){
		var elm = document.getElementById(id);

		return elm.ojElm ? elm.ojElm : null;
	},

	'elm' : function(tag){
		return document.createElement(tag);
	},

	'element' : function(obj){
		if(isDomElement(obj)){
			return obj.ojElm ? obj.ojElm : null;
		}
		else if(isObjective(obj)){
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

	'parentComponent' : function(elm){
		if(isElement(elm)){
			elm = elm._dom;
		}

		var parent;

		while(elm){
			parent = elm.parentNode;

			if(parent && isComponent(parent.ojElm)){
				return parent.ojElm;
			}

			elm = parent;
		}

		return null;
	}
};

OjElement.COMPONENT_TAGS = {};

OjElement.getTagComponent = function(tag){
	return this.COMPONENT_TAGS[tag];
};

OjElement.isComponentTag = function(tag){
	return isSet(this.COMPONENT_TAGS[tag]);
};

OjElement.isTextNode = function(dom_elm){
	return dom_elm.nodeName.toLowerCase() == '#text';
};

OjElement.registerComponentTag = function(tag, component){
	this.COMPONENT_TAGS[tag] = component;

	if(this._browser == this.IE && this._browser_version < 9){
		document.createElement(tag);
	}
};

window.OjElement = OjElement;


OJ.importJs('oj.dom.StyleElement');
OJ.importJs('oj.dom.TextElement');