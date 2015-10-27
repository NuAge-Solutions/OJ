OJ.importJs('oj.data.OjRect');
OJ.importJs('oj.dom.OjCssTranslate');
OJ.importJs('oj.events.OjDragEvent');
OJ.importJs('oj.events.OjEvent');
OJ.importJs('oj.events.OjFocusEvent');
OJ.importJs('oj.events.OjGestureRecognizer');
OJ.importJs('oj.events.OjKeyboardEvent');
OJ.importJs('oj.events.OjUiEvent');
OJ.importJs('oj.events.OjScrollEvent');
OJ.importJs('oj.events.OjTouchEvent');
OJ.importJs('oj.events.OjTransformEvent');
OJ.importJs('oj.libs.Hammer');
OJ.importJs('oj.libs.Propagating');


OJ.extendClass(
    'OjStyleElement', [OjElement],
    {
        '_props_' : {
            'alpha' : null,
            'backgroundColor' : null,
            'children' : null,
            'css' : null,
            'cssList' : null,
            'depth' : null,
            'hAlign' : 'l', // OjStyleElement.LEFT
            'height' : null,
            'id' : null,
            'innerHeight' : null,
            'innerWidth' : null,
            'origin' : null,
            'outerHeight' : null,
            'outerWidth' : null,
            'overflow' : null,
            'owner' : null,
            'pageRect' : null,
            'pageX' : null,
            'pageY' : null,
            'rect' : null,
            'rotation' : null,
            'scrollHeight' : null,
            'scrollWidth' : null,
            'scrollX' : null,
            'scrollY' : null,
            'text' : null,
            'translate' : null,
            'vAlign' : 't', // OjStyleElement.TOP
            'width' : null,
            'x' : null,
            'y' : null
        },

        '_get_props_' : {
            'dom' : null,
            'isVisible' : null,
            'num_children' : null
        },

        '_alpha' : 1,
        '_depth' : 0,
        '_scrollable' : false,

        '_origin' : '0px, 0px',
        '_rotation' : 0,
        '_translate' : '0px, 0px',


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


        '_constructor' : function(source, context){
            var self = this;

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
                            tag2 = tag.substr(0, 3),
                            tmp;

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
                        // tmp = OJ.query(source);
                    }
                }
            }

            self._super(OjElement, '_constructor', [source, context]);

            self.hAlign = this._hAlign;
            self.vAlign = this._vAlign;
        },

        '_destructor' : function(/*depth = 0*/){
            // remove the children
            var self = this,
                args = arguments,
                depth = args.length ? args[0] : 0,
                ln = self.num_children;

            // remove the children
            for(; ln--;){
                OJ.destroy(self.getChildAt(ln), depth);
            }

            // release the vars
            self._owner = null;

            // cleanup hammer & gesture recognizers
            self._cleanupHammer();

            // remove the timers
            self._unset('_move_timer', '_scroll_timer');

            // continue on with the destruction
            return self._super(OjElement, '_destructor', args);
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

                this.addEventListener(OJ.attributeToProp(nm), target, solo ? setter[0] : setter[1]);

                return true;
            }
            else if(nm == 'id'){
                if(!isEmpty(val) && val != 'null'){
                    this.id = val;
                }
            }
            else if(nm == 'var'){
                if(!isEmpty(val) && context){
                    (context[val] = this).addCss(val);

                    this.owner = context;
                }

                return true;
            }
            else if(nm != 'class'){
                setter = OJ.attributeToProp(nm);

                if(setter in this){
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

                        this[setter] = val;
                    }
                    catch(e){
                        // setup holder for template reference values for deferred processing
                        if(!context._template_vars_){
                            context._template_vars_ = [];
                        }

                        context._template_vars_.unshift({
                                                            'context' : this,
                                                            'property' : setter,
                                                            'value' : val
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

                    context[item.property] = this._processReferenceValue(item.value, this);
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
                this.id = this._id_;
            }
        },

        '_setIsDisplayed' : function(displayed){
            var ln, child,
                self = this;

            if(self._is_displayed == displayed){
                return;
            }

            self._super(OjElement, '_setIsDisplayed', arguments);

            for(ln = self.num_children; ln--;){
                if(child = self.getChildAt(ln)){
                    child._setIsDisplayed(displayed);
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

        '_onDomOjUiEvent' : function(evt){
            var proxy = OjElement.element(this);

            if(proxy && proxy._processEvent(evt)){

                evt = OjUiEvent.convertDomEvent(evt);

                proxy._onEvent(evt);

                //if(evt.type == OjUiEvent.DOWN && proxy.hasEventListener(OjUiEvent.UP_OUTSIDE)){
                //    OJ.addEventListener(OjUiEvent.UP, proxy, '_onOjMouseUp');
                //}
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
            var new_x = evt.pageX,
                new_y = evt.pageY;

            this.dispatchEvent(
                new OjDragEvent(
                    OjDragEvent.DRAG,
                    new_x - this._dragX,
                    new_y - this._dragY,
                    evt, false, false
                )
            );

            this._dragX = new_x;
            this._dragY = new_y;
        },

        '_onDragEnd' : function(evt){
            OJ.removeEventListener(OjUiEvent.MOVE, this, '_onDrag');
            OJ.removeEventListener(OjUiEvent.UP, this, '_onDragEnd');

            this.dispatchEvent(
                new OjDragEvent(
                    OjDragEvent.END,
                    evt.pageX - this._dragX,
                    evt.pageY - this._dragY,
                    evt, false, false
                )
            );

            this._dragX = this._dragY = null;
        },

        '_onDragStart' : function(evt){
            this._dragX = evt.pageX;
            this._dragY = evt.pageY;

            if(this.hasEventListener(OjDragEvent.DRAG)){
                OJ.addEventListener(OjUiEvent.MOVE, this, '_onDrag');
            }

            OJ.addEventListener(OjUiEvent.UP, this, '_onDragEnd');

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
////			if(type == OjUiEvent.UP && (!this._draggable || (this._dragX == x && this._dragY == y))){
////				print(this._draggable, this._dragX == x, this._dragY == y);
////				this._onEvent(new OjUiEvent(OjUiEvent.PRESS, evt.getBubbles(), evt.getCancelable(), x, y));
////			}
//
//			return response;
//		},

        '_onMoveTick' : function(evt){
            var page_x = this.pageX,
                page_y = this.pageY,
                delta_x = this._page_x - page_x,
                delta_y = this._page_y - page_y;

            if(delta_x || delta_y){
                this.dispatchEvent(new OjTransformEvent(OjTransformEvent.MOVE, page_x, page_y, delta_x, delta_y));
            }

            this._page_x = page_x;
            this._page_y = page_y;
        },

        '_onOjMouseUp' : function(evt){
            OJ.removeEventListener(OjUiEvent.UP, this, '_onOjMouseUp');

            if(this.hitTestPoint(evt.pageX, evt.pageY)){
                return;
            }

            this.dispatchEvent(evt);
        },

        '_onScroll' : function(evt){
            var x, y;

            // for native scroll events
            if(evt.is('OjScrollEvent')){
                if(this._prev_x == (x = evt.scrollX) && this._prev_y == (y = evt.scrollY)){
                    return;
                }

                this._prev_x = x;
                this._prev_y = y;

                return this._onEvent(evt);
            }

            // for touch scroll events
            if(this._prev_x == (x = this.scrollX) && this._prev_y == (y = this.scrollY)){
                return;
            }

            return this._onEvent(
                new OjScrollEvent(OjScrollEvent.SCROLL, this._prev_x = x, this._prev_y = y)
            );
        },

        '_onTouch' : function(evt){
            var type = evt.type,
                x = evt.pageX,
                y = evt.pageY;

            if(type == OjTouchEvent.END){
                type = OjUiEvent.UP;
            }
            else if(type == OjTouchEvent.START){
                type = OjUiEvent.DOWN;

                this._dragX = x;
                this._dragY = y;
            }
            else if(type == OjTouchEvent.MOVE){
                type = OjUiEvent.MOVE;
            }

            if(type){
                this._onEvent(new OjUiEvent(type, x, y, true, true));

                // if the touch hasn't moved then issue a click event
                if(type == OjUiEvent.UP && !this.hasEventListener(OjDragEvent.START) && this.hitTestPoint(x, y)){
                    this._onEvent(new OjUiEvent(OjUiEvent.PRESS, x, y, true, true));

                    this._dragX = this._dragY = null;
                }
            }

            return true;
        },


        // event listener overrides
        // customize this functionality for dom events so that they work
        '_cleanupHammer' : function(){
            var self = this,
                hammer = self._hammer;

            if(hammer){
                hammer.destroy();

                self._hammer = null;
            }
        },

        '_newHammer' : function(settings){
            settings = settings || {};

            settings.preset = [];

            return propagating(new Hammer(this._getEventProxy(), settings));
        },

        '_setupHammer' : function(){
            var self = this,
                ui = OjUiEvent,
                map = {
                    'doubletap' : ui.DOUBLE_PRESS,
                    'press' : ui.LONG_PRESS,
                    'tap' : ui.PRESS
                },
                settings = {};

            if(!self._hammer){
                if(['input', 'textarea'].indexOf(self.dom.tagName.toLowerCase()) > -1){
                    settings['cssProps'] = {};
                }

                self._hammer = self._newHammer(settings);

                self._hammer.on(
                    'tap doubletap press',
                    function(evt){
                        var new_evt = ui.convertDomEvent(evt.srcEvent);
                        new_evt._type = map[evt.type];

                        self._onEvent(new_evt);

                        evt.stopPropagation();
                    }
                );
            }

            return self._hammer;
        },

        '_updateTouchStartListeners' : function(){
            if(!this.hasEventListeners(OjUiEvent.DOWN, OjUiEvent.PRESS, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){
                this._getEventProxy().ontouchstart = null;
            }
        },

        '_updateTouchMoveListeners' : function(){
            if(!this.hasEventListeners(OjUiEvent.MOVE, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){//}, OjScrollEvent.SCROLL)){
                this._getEventProxy().ontouchmove = null;
            }
        },

        '_updateTouchEndListeners' : function(){
            if(!this.hasEventListeners(OjUiEvent.UP, OjUiEvent.UP_OUTSIDE, OjUiEvent.PRESS, OjDragEvent.END)){
                var proxy = this._getEventProxy();

                proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = null;
            }
        },

        'addEventListener' : function(type){
            var self = this,
                is_touch = OJ.is_touch_capable,
                proxy = self._getEventProxy(),
                hammer = self._setupHammer();

            self._super(OjElement, 'addEventListener', arguments);

            if(type == OjScrollEvent.SCROLL){
                self._scrollable = true;

                proxy.onscroll = self._onDomScrollEvent;

//				if(is_touch){
//					proxy.ontouchmove = this._onDomTouchEvent;
//				}
            }

            // mouse events
            else if(type == OjUiEvent.PRESS){
                if(!hammer.get('tap')){
                    hammer.add( new Hammer.Tap({ event: 'tap' }) );
                }
            }
            else if(type == OjUiEvent.DOUBLE_PRESS){
                if(!hammer.get('doubletap')){
                    hammer.add( new Hammer.Tap({ event: 'doubletap' }) );
                }
            }
            else if(type == OjUiEvent.DOWN){
                if(is_touch){
                    proxy.ontouchstart = self._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = self._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.LONG_PRESS){
                if(!hammer.get('press')){
                    hammer.add( new Hammer.Tap({ event: 'press' }) );
                }
            }
            else if(type == OjUiEvent.MOVE){
                if(is_touch){
                    proxy.ontouchmove = self._onDomTouchEvent;
                }
                else{
                    proxy.onmousemove = self._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.OUT){
                proxy.onmouseout = self._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.OVER){
                proxy.onmouseover = self._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.UP){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = self._onDomTouchEvent;
                }
                else{
                    proxy.onmouseup = self._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.UP_OUTSIDE){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = self._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = self._onDomOjUiEvent;
                }
            }

            // drag events
            else if(OjDragEvent.isDragEvent(type)){
                self._draggable = true;
//
//				if(is_touch){
//					proxy.ontouchstart = proxy.ontouchmove = proxy.ontouchend = this._onDomTouchEvent;
//				}
//				else{
//					proxy.onmousedown = this._onDomOjUiEvent;
//				}

                self.addEventListener(OjUiEvent.DOWN, self, '_onDragStart');
            }

            // keyboard events
            else if(type == OjKeyboardEvent.DOWN){
                proxy.onkeydown = self._onDomOjKeyboardEvent;
            }
            else if(type == OjKeyboardEvent.PRESS){
                proxy.onkeypress = self._onDomOjKeyboardEvent;
            }
            else if(type == OjKeyboardEvent.UP){
                proxy.onkeyup = self._onDomOjKeyboardEvent;
            }

            // focus events
            else if(type == OjFocusEvent.IN){
                proxy.onfocus = self._onDomOjFocusEvent;
                //proxy.onfocusin = self._onDomOjFocusEvent;
            }
            else if(type == OjFocusEvent.OUT){
                proxy.onblur = self._onDomOjFocusEvent;
            }

            // transform events
            else if(type == OjTransformEvent.MOVE){
                if(!self._move_timer){
                    self._move_timer = new OjTimer(250, 0);
                    self._move_timer.addEventListener(OjTimer.TICK, self, '_onMoveTick');

                    self._page_x = self.pageX;
                    self._page_y = self.pageY;

                    self._move_timer.start();
                }
            }
            else if(type == OjTransformEvent.RESIZE && self._proxy != document.body){
                proxy.onresize = self._onOjDomEvent;
            }

            // misc dom events
            else if(type == OjDomEvent.CHANGE){
                proxy.onchange = self._onOjDomEvent;
            }
        },

        'addGestureRecognizer' : function(recognizer){
            recognizer._add(this._setupHammer());
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
            else if(type == OjUiEvent.PRESS){
                if(!this.hasEventListener(OjUiEvent.PRESS)){
                    proxy.onclick = null;

                    this._updateTouchStartListeners();
                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.DOUBLE_PRESS){
                if(!this.hasEventListener(OjUiEvent.DOUBLE_PRESS)){
                    proxy.ondblclick = null;

                    this._updateTouchStartListeners();
                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.DOWN){
                if(!this.hasEventListeners(OjUiEvent.DOWN, OjUiEvent.UP_OUTSIDE, OjDragEvent.DRAG)){
                    proxy.onmousedown = null;

                    this._updateTouchStartListeners();
                }
            }
            else if(type == OjUiEvent.MOVE){
                if(!this.hasEventListener(OjUiEvent.MOVE)){
                    proxy.onmousemove = null;

                    this._updateTouchMoveListeners();
                }
            }
            else if(type == OjUiEvent.OUT){
                if(!this.hasEventListener(OjUiEvent.OUT)){
                    proxy.onmouseout = null;
                }
            }
            else if(type == OjUiEvent.OVER){
                if(!this.hasEventListener(OjUiEvent.OVER)){
                    proxy.onmouseover = null;
                }
            }
            else if(type == OjUiEvent.UP){
                if(!this.hasEventListener(OjUiEvent.UP)){
                    proxy.onmouseup = null;

                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.UP_OUTSIDE){
                if(!this.hasEventListener(OjUiEvent.DOWN)){
                    proxy.onmousedown = null;

                    OJ.removeEventListener(OjUiEvent.UP, proxy, '_onOjMouseUp');

                    this._updateTouchEndListeners();
                }
            }

            // drag events
            else if(OjDragEvent.isDragEvent(type)){
                if(!this.hasEventListeners(OjDragEvent.DRAG, OjDragEvent.END, OjDragEvent.START)){
                    this._draggable = false;

                    this.removeEventListener(OjUiEvent.DOWN, this, '_onDragStart');

                    OJ.removeEventListener(OjUiEvent.MOVE, this, '_onDrag');
                    OJ.removeEventListener(OjUiEvent.UP, this, '_onDragEnd');
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

        'removeGestureRecognizer' : function(recognizer){
            recognizer._remove(this._setupHammer())
        },


        // Child Management Functions
        'appendChild' : function(child){
            return this.insertChildAt(child, this.num_children);
        },

        'insertChildAt' : function(child, index){
            var dom = this.dom;

            if(!child){
                return child;
            }

            if(index >= this.num_children){
                dom.appendChild(child.dom);
            }
            else{
                dom.insertBefore(child.dom, dom.childNodes[index]);
            }

            // update the display state
            child._setIsDisplayed(this._is_displayed);

            return child;
        },

        'forChild' : function(callback, complete, context){
            var self = this,
                ln = self.num_children,
                i = 0;

            context = context || self;

            for(; i < ln; i++){
                if(callback.call(context, self.getChildAt(i), i) === false){
                    break;
                }
            }

            if(complete){
                complete.call(context);
            }
        },

        'forChildReverse' : function(callback, complete, context){
            var self = this,
                ln = self.num_children;

            context = context || self;

            for(; ln--;){
                if(callback.call(context, self.getChildAt(ln), ln) == false){
                    break;
                }
            }

            if(complete){
                complete.call(context);
            }
        },

        'getChildAt' : function(index){
            return OjElement.element(this.dom.childNodes[index]);
        },

        'indexOfChild' : function(child){
            return Array.array(this.dom.childNodes).indexOf(child.dom);
        },

        'hasChild' : function(child){
            return child.parent == this;
        },

        'moveChild' : function(child, index){
            if(this.hasChild(child)){
                this.dom.insertBefore(child.dom, this.getChildAt(index).dom);

                return child;
            }

            // throw an error here
        },

        'prependChild' : function(child){
            return this.insertChildAt(child, 0);
        },

        'removeAllChildren' : function(){
            var ln = this.num_children,
                ary = [];

            for(; ln--;){
                ary.unshift(this.removeChildAt(ln));
            }

            return ary;
        },

        'removeChild' : function(child){
            if(child){
                // this will help exclude text elements
                if(child.is(OjStyleElement)){
                    try{
                        this.dom.removeChild(child.dom);
                    }
                    catch(e){
                        // we don't really care if the child couldn't be removed. it's cheaper than checking every time
                    }
                }

                child._setIsDisplayed(false);
            }

            return child;
        },

        'removeChildAt' : function(index){
            if(index < 0 || index >= this.num_children){
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

            if(index >= this.num_children){
                this.appendChild(child);
            }
            else{
                rtrn = this.removeChildAt(index);

                this.insertChildAt(child, index);
            }

            return rtrn;
        },


        '.children' : function(){
            var ary = [],
                ln = this.num_children;

            for(; ln--;){
                ary.unshift(this.getChildAt(ln));
            }

            return ary;
        },
        '=children' : function(children){
            this.removeAllChildren();

            var i = 0,
                ln = children.length;

            for(; i < ln; i++){
                this.appendChild(children[i]);
            }
        },

        '.num_children' : function(){
            return this.dom.childNodes.length;
        },


        // misc functions
        'blur' : function(){
            if(isFunction(this._dom.blur)){
                this._dom.blur();
            }
        },

        'find' : function(query){
            if(isElement(query)){
                query = '#' + query.id;
            }

            return OJ.query(query, this._dom);
        },

        'focus' : function(){
            if(isFunction(this._dom.focus)){
                this._dom.focus();
            }
        },

        'hide' : function(should){
            if(should === false){
                this.show();
            }
            else{
                this.addCss(['hidden']);

                this.dispatchEvent(new OjEvent(OjEvent.HIDE));
            }
        },

        '.isVisible' : function(){
            var self = this;

            return self._getStyle('display') != OjStyleElement.NONE &&
                   self._getStyle('visibility') != 'hidden' &&
                   self.alpha > 0 && self.width > 0 && self.height > 0;
        },

        'show' : function(should){
            if(should === false){
                this.hide();
            }
            else{
                this.removeCss('hidden');

                this.dispatchEvent(new OjEvent(OjEvent.SHOW));
            }
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

            this._setStyle(
                prop,
                isSet(val) ? val + (args.length > 2 ? args[2] : this._getStyleUnit(prop)) : null
            );
        },

        // Bulk Style Getter & Setter Functions
        '_getStyler' : function(prop, args){
            var unit = prop == 'font' || prop == 'line' ? OJ.font_unit : OJ.dim_unit;

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
                return OJ.font_unit;
            }

            return OJ.dim_unit;
        },


        // Attribute Getter & Setter Functions
        'getAttr' : function(key){
            // process the key incase its an attribute object
            if(isObject(key)){
                key = key.nodeName;
            }

            // read the attribute value
            return this._proxy.getAttribute(key);
        },
        'setAttr' : function(key, value){
            // process the key incase its an attribute object
            if(isObject(key)){
                key = key.nodeName;
            }

            // if no value was set then default to empty string
            if(isUndefined(value)){
                value = '';
            }

            // if the value is set (not null) then update attribute value
            if(isSet(value)){
                this._proxy.setAttribute(key, value);
            }
            // otherwise remove
            else{
                this._proxy.removeAttribute(key);
            }
        },

        '.id' : function(){
            return this._id || this.oj_id;
        },

        '=id' : function(val){
            if(this._id == val){
                return
            }

            // unregister the old id
            OjElement.unregister(this);

            this._proxy.ojProxy = this.dom.id = this._id = val;

            // register the new id
            OjElement.register(this);
        },

        // Content Getter & Setter Functions
        '.text' : function(){
            return this.dom.innerHTML;
        },
        '=text' : function(str){
            this.removeAllChildren();

            this.dom.innerHTML = String.string(str).html();

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
            var css = this.cssList,
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
                            css.append(cls);
                    }
                }
                else{
                    switch(action){
                        case 'remove':
                        case 'toggle':
                            css.removeAt(index);
                    }
                }
            }

            if(action == 'has'){
                return true;
            }

            return this.css = css;
        },

        'addCss' : function(css/*...css | array*/){
            return this._processCssList(arguments, 'add');
        },

        '.css' : function(){
            return this._proxy.className.trim();
        },

        '.cssList' : function(){
            return this.css.split(' ');
        },

        'hasCss' : function(css/*...css | array*/){
            return this._processCssList(arguments, 'has');
        },

        'removeCss' : function(css/*... css | array*/){
            return this._processCssList(arguments, 'remove');
        },

        '=css' : function(css){
            return this._proxy.className = (isArray(css) ? css.join(' ') : css).trim();
        },

        'swapCss' : function(target, replacement){
            this.removeCss(target);
            this.addCss(replacement);
        },

        'toggleCss' : function(css/*...css | array*/){
            return this._processCssList(arguments, 'toggle');
        },

        // Focus Functions
        'hasFocus' : function(){
            return this._dom.hasFocus;
        },

        'hitTest' : function(elm, local){
            return this.hitTestRect(elm.rect);
        },

        'hitTestRect' : function(rect, local){
            return (local ? this.rect : this.pageRect).hitTestRect(rect);
        },

        'hitTestPoint' : function(x, y, local){
            return (local ? this.rect : this.pageRect).hitTestPoint(x, y);
        },

        'localPoint' : function(global_point){
            // todo: add localPoint functionality
        },

        'localX' : function(global_x){
            return global_x - this.pageX;
        },

        'localY' : function(global_y){
            return global_y - this.pageY;
        },


        // Dimensional Getter & Setter Functions
        // TODO:
        // 1) factor in border into sizing
        // 2) handle non-metric values such as auto and %
        '.innerWidth' : function(){
            return this.width - this.getPaddingLeft() - this.getPaddingRight();
        },
        '=innerWidth' : function(w){
            this._setWidth(Math.round(w) + OJ.dim_unit);
        },

        '.outerWidth' : function(){
            return this.width + this.getMarginLeft() + Math.abs(this.getMarginRight());
        },
        '=outerWidth' : function(w){
            this.innerWidth = w - this.getPaddingLeft() - this.getPaddingRight() - this.getMarginLeft() - Math.abs(this.getMarginRight());
        },

        '.width' : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;

            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;

                return (this._proxy.offsetWidth / parent.offsetWidth) * 100;
            }

            return this._proxy.offsetWidth || this._getStyleNumber('width');
        },
        '_setWidth' : function(val){
            this._setStyle('width', val);
        },
        '=width' : function(val){
            var args = isArray(val) ? val : [val],
                w = args[0];

            if(w == OjStyleElement.AUTO || !isSet(w)){
                this._setWidth(null);
            }
            else if(args.length > 1){
                this._setWidth(args.join(''));
            }
            else{
                this.innerWidth = w - this.getPaddingLeft() - this.getPaddingRight();
            }
        },

        //'.minWidth' : function(){
        //    return isNull(this._min_width) ? this._min_width = this._getStyleNumber('minWidth') : this._min_width;
        //},
        //'=minWidth' : function(min){
        //    this._setStyleNumber('minWidth', this._min_width = min);
        //},
        //
        //'.maxWidth' : function(){
        //    return isNull(this._max_width) ? this._max_width = this._getStyleNumber('maxWidth') : this._max_width;
        //},
        //'=maxWidth' : function(max){
        //    this._setStyleNumber('maxWidth', this._max_width = max);
        //},

        '.innerHeight' : function(){
            return this.height - this.getPaddingTop() - this.getPaddingBottom();
        },
        '=innerHeight' : function(h){
            this._setHeight(Math.round(h) + OJ.dim_unit);
        },

        '.outerHeight' : function(){
            return this.height + this.getMarginTop() + Math.abs(this.getMarginBottom());
        },
        '=outerHeight' : function(h){
            this.innerHeight = h - this.getPaddingTop() - this.getPaddingBottom() - this.getMarginTop() - Math.abs(this.getMarginBottom());
        },

        '.height' : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;

            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;

                return (this._proxy.offsetHeight / parent.offsetHeight) * 100;
            }

            return this._proxy.offsetHeight || this._getStyleNumber('height');
        },
        '_setHeight' : function(val){
            this._setStyle('height', val);
        },
        '=height' : function(val){
            var args = isArray(val) ? val : [val],
                h = args[0];

            if(h == OjStyleElement.AUTO || !isSet(h)){
                this._setHeight(null);
            }
            else if(args.length > 1){
                this._setHeight(args.join(''));
            }
            else{
                this.innerHeight = h - this.getPaddingTop() - this.getPaddingBottom();
            }
        },

        //'.minHeight' : function(){
        //    return isNull(this._min_height) ? this._min_height = this._getStyleNumber('minHeight') : this._min_height;
        //},
        //'=minHeight' : function(min){
        //    this._min_height = min;
        //
        //    this._setStyleNumber('minHeight', min);
        //},
        //
        //'.maxHeight' : function(){
        //    return isNull(this._max_height) ? this._max_height = this._getStyleNumber('maxHeight') : this._max_height;
        //},
        //'=maxHeight' : function(max){
        //    this._max_height = max;
        //
        //    this._setStyleNumber('maxHeight', max);
        //},

        // Style Getter & Setter Functions
        '.x' : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;

            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;

                return (this._proxy.offsetLeft / parent.offsetWidth) * 100;
            }

            return this._proxy.offsetLeft;
        },
        '.pageX' : function(){
            if(this._proxy.getBoundingClientRect){
                return this._proxy.getBoundingClientRect().left;
            }

            // add backup solution
        },
        '=x' : function(val/*[val, unit=px]*/){
            var args = isArray(val) ? val : [val];

            this._setStyleNumber('left', args[0], args.length > 1 ? args[1] : OJ.dim_unit);
        },
        '=pageX' : function(val){
            this.x = this.parent.localX(val);
        },

        '.y' : function(/*unit=px*/){
            var unit = arguments.length ? arguments[0] : null;

            if(unit == OjStyleElement.PERCENT){
                var parent = this._proxy.offsetParent || this._proxy;

                return (this._proxy.offsetTop / parent.offsetHeight) * 100;
            }

            return this._proxy.offsetTop;
        },
        '.pageY' : function(){
            if(this._proxy.getBoundingClientRect){
                return this._proxy.getBoundingClientRect().top;
            }

            // add backup solution
        },
        '=y' : function(val/*[val, unit=px]*/){
            var args = isArray(val) ? val : [val];

            this._setStyleNumber('top', args[0], args.length > 1 ? args[1] : OJ.dim_unit);
        },
        '=pageY' : function(val){
            this.y = this.parent.localY(val);
        },

        '.alpha' : function(){
            return this._alpha;
        },
        '=alpha' : function(alpha){
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

        '.backgroundColor' : function(){
            return this._getStyle('background-color');
        },
        '=backgroundColor' : function(color){
            this._setStyle('background-color', color);
        },

        '.depth' : function(){
            return this._depth;
        },
        '=depth' : function(depth){
            this._depth = this._setStyle('zIndex', depth);
        },

        '.overflow' : function(){
            return this._overflow;
        },
        '=overflow' : function(overflow){
            this._overflow = this._setStyle('overflow', overflow);
        },

        '.rect' : function(){
            return new OjRect(this.x, this.y, this.width, this.height);
        },
        '=rect' : function(rect){
            // add this later
        },

        '.pageRect' : function(){
            return new OjRect(this.pageX, this.pageY, this.width, this.height);
        },
        '=pageRect' : function(rect){
            // add this later
        },

        '.scrollHeight' : function(){
            return this._proxy.scrollHeight;
        },
        '=scrollHeight' : function(val){
            this._proxy.scrollHeight = val;
        },

        '.scrollWidth' : function(){
            return this._proxy.scrollWidth;
        },
        '=scrollWidth' : function(val){
            this._proxy.scrollWidth = val;
        },

        '.scrollX' : function(){
            return this._proxy.scrollLeft;
        },

        '=scrollX' : function(val){
            this._proxy.scrollLeft = val;
        },

        '.scrollY' : function(){
            return this._proxy.scrollTop;
        },

        '=scrollY' : function(val){
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

        '.hAlign' : function(){
            return this._getAlign('h', OjStyleElement.LEFT);
        },
        '=hAlign' : function(val){
            return this._setAlign('h', val, OjStyleElement.LEFT);
        },

        '.vAlign' : function(){
            return this._getAlign('v', OjStyleElement.TOP);
        },
        '=vAlign' : function(val){
            return this._setAlign('v', val, OjStyleElement.TOP);
        },


        // Transform Setter & Getters
        '_updateTransform' : function(){
            var rotate = this._rotation ? 'rotate(' + this._rotation + 'deg) ' : '',
                translate = this._translate ? this._translate.toString() : '',
                transform = rotate + (isEmpty(translate) ? '' : 'translate(' + translate + ')'),
                prefix = OJ.css_prefix;

            if(prefix == '-moz-'){
                this._setStyle('MozTransform', transform);
            }
            else{
                this._setStyle(prefix + 'transform', transform);
            }

            this._setStyle('transform', transform);
        },

        '.origin' : function(){
            return this._origin;
        },
        '=origin' : function(val){
            this._setStyle(OJ.css_prefix + 'transform-origin', val);

            this._setStyle('transform-origin', this._origin = val);
        },

        '.rotation' : function(){
            return this._rotation;
        },
        '=rotation' : function(val){
            if(this._rotation == val){
                return;
            }

            this._rotation = val;

            this._updateTransform();
        },

        '.translate' : function(){
            return this._translate;
        },
        '=translate' : function(val){
            if(val.isEqualTo(this._translate)){
                return;
            }

            this._translate = val;

            this._updateTransform();
        }
    },
    {
        'COMPONENT_TAGS' : {},

        'STYLE_BACKUP' : 'styleBackup',
        'STYLE_DEFAULT' : 'styleDefault',
        'STYLE_IE' : 'styleIE',

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

        'AUTO' : 'auto',
        'BLOCK' : 'block',
        'HIDDEN' : 'hidden',
        'NONE' : 'none',
        'SCROLL' : 'scroll',
        'VISIBLE' : 'visible',

        'LEFT' : 'l',
        'CENTER' : 'c',
        'RIGHT' : 'r',

        'TOP' : 't',
        'MIDDLE' : 'm',
        'BOTTOM' : 'b',

        'PERCENT' : '%',
        'PX' : 'px',
        'EM' : 'em',


        'getTagComponent' : function(tag){
            return this.COMPONENT_TAGS[tag];
        },

        'isComponentTag' : function(tag){
            return isSet(this.COMPONENT_TAGS[tag]);
        },

        'registerComponentTag' : function(tag, component){
            this.COMPONENT_TAGS[tag] = component;

            if(OJ.browser == OJ.IE && OJ.browser_version.compareVersion('9.0.0') < 0){
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