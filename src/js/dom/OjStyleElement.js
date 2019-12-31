importJs("oj.data.OjRect");
importJs("oj.dom.OJCommentElement");
importJs("oj.dom.OjCssTranslate");
importJs("oj.dom.OjTextElement");
importJs("oj.events.OjDragEvent");
importJs("oj.events.OjEvent");
importJs("oj.events.OjFocusEvent");
importJs("oj.events.OjGestureRecognizer");
importJs("oj.events.OjKeyboardEvent");
importJs("oj.events.OjUiEvent");
importJs("oj.events.OjScrollEvent");
importJs("oj.events.OjTouchEvent");
importJs("oj.events.OjTransformEvent");


OJ.extendClass(
    "OjStyleElement", [OjElement],
    {
        "_props_" : {
            "alpha" : null,
            "background_color" : null,
            "bottom" : null,
            "children" : null,
            "css" : null,
            "css_list" : null,
            "depth" : null,
            "font_color": null,
            "font_size": null,
            "hAlign" : "left", // OjStyleElement.LEFT
            "height" : null,
            "id" : null,
            "innerHeight" : null,
            "innerWidth" : null,
            "left" : null,
            "origin" : null,
            "outerHeight" : null,
            "outerWidth" : null,
            "overflow" : null,
            "owner" : null,
            "page_rect" : null,
            "pageX" : null,
            "pageY" : null,
            "rect" : null,
            "right" : null,
            "rotation" : null,
            "scroll_height" : null,
            "scroll_width" : null,
            "scroll_x" : null,
            "scroll_y" : null,
            "top" : null,
            "text" : null,
            "translate" : null,
            "vAlign" : "top", // OjStyleElement.TOP
            "width" : null,
            "x" : null,
            "y" : null
        },

        "_get_props_" : {
            "dom" : null,
            "first_child" : null,
            "has_focus": null,
            "is_visible" : null,
            "last_child" : null,
            "num_children" : null,
            "tag" : null
        },

        "_alpha" : 1,
        "_depth" : 0,
        "_scrollable" : false,

        "_origin" : "0px, 0px",
        "_rotation" : 0,
        "_translate" : "0px, 0px",


        "_compile_" : function(def){
            var cls = OjStyleElement;

            if(cls.STYLE_MODE == cls.STYLE_IE){
                this._getStyle = this._getStyleIe;
            }
            else if(cls.STYLE_MODE == cls.STYLE_BACKUP){
                this._getStyle = this._getStyleBackup;
            }

            // build functions for style getter and setters
            def._style_funcs_.call(this, "margin", "Margin");
            def._style_funcs_.call(this, "padding", "Padding");
        },

        "_style_funcs_" : function(style, u_style){
            var g = "get",
                s = "set",
                bottom = "Bottom",
                left = "Left",
                right = "Right",
                top = "Top";

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


        "_constructor" : function(source, context){
            var self = this;

            // set the source
            // if dom element then we are done
            if(source && !source.nodeType){
                // if its the document or body do something special
                if(source === "body" || source == document || source == document.body){
                    source = document.body;
                }
                // if its a string then we need to make sure its html and handle it accordingly
                else if(isString(source)){
                    source = source.trim();

                    if(source.charAt(0) == "<" && source.slice(-1) == ">" && source.length >= 5){
                        var tag = source.substr(0, 6).toLowerCase(),
                            tag2 = tag.substr(0, 3),
                            tmp;

                        if(tag == "<thead" || tag == "<tbody" || tag == "<tfoot"){
                            tmp = OjElement.elm("table");
                        }
                        else if(tag2 == "<tr"){
                            tmp = OjElement.elm("tbody");
                        }
                        else if(tag2 == "<td" || tag2 == "<th"){
                            tmp = OjElement.elm("tr")
                        }
                        else{
                            tmp = OjElement.elm("div");
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

            self._super(OjElement, "_constructor", [source, context]);

            self.hAlign = this._hAlign;
            self.vAlign = this._vAlign;
        },

        "_destructor" : function(/*depth = 0*/){
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
            self._unset("_move_timer", "_scroll_timer");

            // continue on with the destruction
            return self._super(OjElement, "_destructor", args);
        },


        "_processAttribute" : function(dom, attr, context){
            const self = this,
                nm = attr.nodeName;

            let val = attr.value,
                setter, solo, target, lower;

            if(nm == "id"){
                if(!isEmpty(val) && val != "null"){
                    self.id = val;
                }

                return false;
            }

            if(context && !context._template_vars_){
                context._template_vars_ = [];
            }

            if(nm == "var"){
                if(!isEmpty(val) && context){
                    const parts = val.split(".");

                    if(parts.length > 1){
                        // we want these last
                        context._template_vars_.append(
                            {
                                "context" : context,
                                "property" : parts,
                                "value" : self
                            }
                        );

                        self.addCss(parts.last);
                    }
                    else{
                        (context[val] = self).addCss(val);
                    }

                    self.owner = context;
                }

                return true;
            }

            if(nm.substr(0, 3) == "on-"){
                // todo: add support for multiple event listeners
                // todo? add support for nested event listener functions in templates
                setter = val.split(".", 1);
                solo = setter.length == 1;
                target = context;

                if(!solo){
                    switch(setter[0]){
                        case "this":
                            target = self;
                        break;

                        case "window":
                            target = window;
                        break;
                    }
                }

                const func_str = solo ? setter[0] : setter[1];
                let func = target[func_str];

                if(!func){
                    func = function(evt){
                        return (function(evt){
                            const $ = self;

                            try{
                                if(func_str[0] == "$" && func_str[1] == "."){
                                    throw "error";
                                }

                                return eval("this." + func_str);
                            }
                            catch(e){
                                return eval(func_str);
                            }
                        }).call(target, evt);
                    };
                }

                self.addEventListener(OJ.attributeToProp(nm), target, func);

                return true;
            }

            if(nm != "class"){
                setter = OJ.attributeToProp(nm);

                if(setter in self){
                    try{
                        if(val == ""){
                            val = null;
                        }
                        else if(isNumeric(val)){
                            val = parseFloat(val);
                        }
                        else if((lower = val.toLowerCase()) == "true"){
                            val = true;
                        }
                        else if(lower == "false"){
                            val = false;
                        }
                        else{
                            val = self._processReferenceValue(val, context, self);
                        }

                        self[setter] = val;
                    }
                    catch(e){
                        if(context){
                            // setup holder for template reference values for deferred processing
                            context._template_vars_.prepend(
                                {
                                    "context" : self,
                                    "property" : setter,
                                    "value" : val
                                }
                            );
                        }
                    }

                    // if the nm is v-align or h-align we want to return false so that the attribute isn"t destroyed
                    return nm.indexOf("-align") == -1;
                }
            }

            return false;
        },

        "_processAttributes" : function(dom, context){
            var attrs = dom.attributes,
                priority = ["var", "id"],
                ln = priority.length,
                attr;

            // process priority attributes first reference
            for(; ln--;){
                if((attr = dom.attributes[priority[ln]]) && this._processAttribute(dom, attr, context)){
                    dom.removeAttribute(priority[ln]);
                }
            }

            // class name
            dom.removeAttribute("class-name");

            // class path
            dom.removeAttribute("class-path");

            // process the other attributes
            for(ln = attrs.length; ln--;){
                attr = attrs[ln];

                if(this._processAttribute(dom, attr, context)){
                    dom.removeAttribute(attr.nodeName);
                }
            }
        },

        "_processChildren" : function(dom, context){
            // make sure we have something to process
            if(!dom){
                return;
            }

            const children = dom.childNodes;
            let ln = children.length;

            for(; ln--;){
                if(!this._processChild(children[ln], context) && children[ln]){
                    dom.removeChild(children[ln]);
                }
            }
        },

        "_processChild" : function(dom, context){
            // make sure we have something to process
            if(!dom){
                return;
            }

            let tag = dom.tagName;

            if(!tag || OjElement.isTextNode(dom)){
                return isEmpty(dom.nodeValue) ? null : new OjTextElement(dom);
            }

            let cls = dom.getAttribute("class-name"),
                cls_path;

            tag = tag.toLowerCase();

            // if this is a script or link tag ignore it
            if(tag == "script" || tag == "link"){
                return false;
            }

            // load the class if we need to
            if(!window[cls] && (cls_path = dom.getAttribute("class-path"))){
                importJs(cls_path);
            }

            // process the class
            if(cls = OjStyleElement.getTagComponent(tag)){
                if(isFunction(cls)){
                    return cls(dom, context);
                }

                const child = new window[cls]();

                child._setDomSource(dom, context);

                return child;
            }

            return new OjStyleElement(dom, context);
        },

        "_processReferenceValue" : function(val, context, src){
            const $ = this;

            if(val && String.string(val).contains("$") && $ != context){
                throw "Template Reference Value Processing Deferred"
            }

            try{
                return (function(str){ return eval(str); }).call(src || $, val);
            }
            catch(e){}

            return val;
        },

        "_processTemplateVars" : function(){
            const self = this;
            let context, prop;

            if(self._template_vars_){
                self._template_vars_.forEachReverse((tvar) => {
                    context = tvar.context;
                    prop = tvar.property;

                    if(isArray(prop)){
                        const key = prop.pop();

                        try {
                            prop.forEach((p) => {
                                context = context[p];
                            });

                            context[key] = tvar.value;
                        }
                        catch(e) {
                            // do nothing
                        }
                    }
                    else{
                        context[prop] = self._processReferenceValue(tvar.value, self, context);
                    }
                });

                self._unset("_template_vars_");
            }
        },

        "_setDom" : function(dom, context){
            // todo: re-evaluate the pre-render functionality of dom
            this._super(OjElement, "_setDom", [dom]);

            // process the attributes
            this._processAttributes(dom, context);

            // process the children
            this._processChildren(dom, context);

            // process any template vars
            this._processTemplateVars();

            // setup the dom id if there isn"t one already
            if(!this._id){
                this.id = this.oj_id;
            }
        },

        "_setIsDisplayed" : function(displayed){
            var ln, child,
                self = this;

            if(self._is_displayed == displayed){
                return;
            }

            self._super(OjElement, "_setIsDisplayed", arguments);

            for(ln = self.num_children; ln--;){
                if(child = self.getChildAt(ln)){
                    child._setIsDisplayed(displayed);
                }
            }
        },

        // Event Listeners
        "_processEvent" : function(evt){
            // because js natively calls the event functions on the context of the dom element
            // we just get the attached oj element from it to get into the proper context to dispatch
            // the event
            if(OjElement.element(evt.currentTarget) != this || evt.dispatched){
                return false;
            }

            evt.dispatched = true;

            return true;
        },

        "_onOjDomEvent" : function(evt){
            const proxy = OjElement.element(this);

            if(proxy && proxy._processEvent(evt)){
                proxy._onEvent(OjDomEvent.convertDomEvent(evt));
            }
        },

        "_onDomOjUiEvent" : function(evt){
            const proxy = OjElement.element(this);

            if(proxy && proxy._processEvent(evt)){
                evt = OjUiEvent.convertDomEvent(evt);

                proxy._onEvent(evt);

                //if(evt.type == OjUiEvent.DOWN && proxy.hasEventListener(OjUiEvent.UP_OUTSIDE)){
                //    OJ.addEventListener(OjUiEvent.UP, proxy, "_onOjMouseUp");
                //}
            }
        },

        "_onDomOjKeyboardEvent" : function(evt){
            const proxy = OjElement.element(this);

            if(proxy && proxy._processEvent(evt)){
                proxy._onEvent(OjKeyboardEvent.convertDomEvent(evt));
            }
        },

        "_onDomOjFocusEvent" : function(evt){
            const proxy = OjElement.element(this);

            if(proxy && proxy._processEvent(evt)){
                proxy._onEvent(OjFocusEvent.convertDomEvent(evt));
            }
        },

        "_onDomScrollEvent" : function(evt){
            const proxy = OjElement.element(this);

            if(proxy && proxy._processEvent(evt)){
                proxy._onScroll(OjScrollEvent.convertDomEvent(evt));
            }
        },

        "_onDomTouchEvent" : function(evt){
            const proxy = OjElement.element(this);

            if(proxy && proxy._processEvent(evt)){
                return proxy._onTouch(OjTouchEvent.convertDomEvent(evt));
            }

            return true;
        },

        "_onDrag" : function(evt){
            var new_x = evt.pageX,
                new_y = evt.pageY;

            this.dispatchEvent(
                new OjDragEvent(
                    OjDragEvent.DRAG,
                    new_x - this._drag_x,
                    new_y - this._drag_y,
                    evt, false, false
                )
            );

            this._drag_x = new_x;
            this._drag_y = new_y;
        },

        "_onDragEnd" : function(evt){
            OJ.removeEventListener(OjUiEvent.MOVE, this, "_onDrag");
            OJ.removeEventListener(OjUiEvent.UP, this, "_onDragEnd");

            this.dispatchEvent(
                new OjDragEvent(
                    OjDragEvent.END,
                    evt.pageX - this._drag_x,
                    evt.pageY - this._drag_y,
                    evt, false, false
                )
            );

            this._drag_x = this._drag_y = null;
        },

        "_onDragStart" : function(evt){
            this._drag_x = evt.pageX;
            this._drag_y = evt.pageY;

            if(this.hasEventListener(OjDragEvent.DRAG)){
                OJ.addEventListener(OjUiEvent.MOVE, this, "_onDrag");
            }

            OJ.addEventListener(OjUiEvent.UP, this, "_onDragEnd");

            this.dispatchEvent(
                new OjDragEvent(OjDragEvent.START, 0, 0, evt, false, false)
            );
        },

        "_onEvent" : function(evt){
            this.dispatchEvent(evt);

            return false;
        },

//        "_onMouse" : function(evt){
//            var type = evt.getType(),
//                x = evt.getPageX(),
//                y = evt.getPageY(),
//                response = this._onEvent(evt);
//
//
////            if(type == OjUiEvent.UP && (!this._draggable || (this._drag_x == x && this._drag_y == y))){
////                print(this._draggable, this._drag_x == x, this._drag_y == y);
////                this._onEvent(new OjUiEvent(OjUiEvent.PRESS, evt.getBubbles(), evt.getCancelable(), x, y));
////            }
//
//            return response;
//        },

        "_onMoveTick" : function(evt){
            var self = this,
                cls = OjTransformEvent,
                prev = self._prev_rect,
                rect = self.rect;

            if(prev.top != rect.top || prev.left != rect.left){
                self._prev_rect = rect;

                self.dispatchEvent(new cls(cls.MOVE, rect, prev));
            }
        },

        "_onOjMouseUp" : function(evt){
            OJ.removeEventListener(OjUiEvent.UP, this, "_onOjMouseUp");

            if(this.hitTestPoint(evt.pageX, evt.pageY)){
                return;
            }

            this.dispatchEvent(evt);
        },

        "_onScroll" : function(evt){
            var x, y;

            // for native scroll events
            if(evt.is("OjScrollEvent")){
                if(this._prev_x == (x = evt.scroll_x) && this._prev_y == (y = evt.scroll_y)){
                    return;
                }

                this._prev_x = x;
                this._prev_y = y;

                return this._onEvent(evt);
            }

            // for touch scroll events
            if(this._prev_x == (x = this.scroll_x) && this._prev_y == (y = this.scroll_y)){
                return;
            }

            return this._onEvent(
                new OjScrollEvent(OjScrollEvent.SCROLL, this._prev_x = x, this._prev_y = y)
            );
        },

        "_onTouch" : function(evt){
            var type = evt.type,
                x = evt.pageX,
                y = evt.pageY;

            if(type == OjTouchEvent.END){
                type = OjUiEvent.UP;
            }
            else if(type == OjTouchEvent.START){
                type = OjUiEvent.DOWN;

                this._drag_x = x;
                this._drag_y = y;
            }
            else if(type == OjTouchEvent.MOVE){
                type = OjUiEvent.MOVE;
            }

            if(type){
                this._onEvent(new OjUiEvent(type, x, y, true, true));

                // if the touch hasn"t moved then issue a click event
                if(type == OjUiEvent.UP && !this.hasEventListener(OjDragEvent.START) && this.hitTestPoint(x, y)){
                    this._drag_x = this._drag_y = null;
                }
            }

            return true;
        },


        // event listener overrides
        // customize this functionality for dom events so that they work
        "_cleanupHammer" : function(){
            var self = this,
                hammer = self._hammer;

            if(hammer){
                hammer.destroy();

                self._hammer = null;
            }
        },

        "_newHammer" : function(settings){
            settings = settings || {};

            settings.preset = [];

            return propagating(new Hammer(this._getEventProxy(), settings));
        },

        "_setupHammer" : function(){
            var self = this,
                ui = OjUiEvent,
                map = {
                    "doubletap" : ui.DOUBLE_PRESS,
                    "pressup" : ui.PRESS,
                    "tap" : ui.PRESS
                },
                settings = {
                    "recognizers": [
                        [Hammer.Press],
                        [Hammer.Tap],
                        [Hammer.Tap, {
                            "event": "doubletap", "taps": 2, "interval": 300, "pointers": 1, "posThreshold": 10,
                            "threshold": 2, "time": 250
                        }, "tap" ]
                    ]
                };

            if(!self._hammer){
                if(["input", "textarea"].indexOf(self.dom.tagName.toLowerCase()) > -1){
                    settings["cssProps"] = {};
                }

                self._hammer = self._newHammer(settings);

                self._hammer.on(
                    "tap doubletap pressup",
                    function(evt){
                        var type = evt.type,
                            prev_tap = self._hammer.prev_tap,
                            og_evt = evt.srcEvent,
                            new_evt = ui.convertDomEvent(og_evt);

                        new_evt._type = map[type];

                        // og_evt.preventDefault();
                        // og_evt.stopPropagation();
                        evt.stopPropagation();

                        if(type == "tap"){
                            self._hammer.prev_tap = new Date();
                        }
                        else if(type == "pressup" && prev_tap){
                            self._hammer.prev_tap = null;

                            return;
                        }

                        self._onEvent(new_evt);
                    }
                );
            }

            return self._hammer;
        },

        "_updateTouchStartListeners" : function(){
            if(!this.hasEventListeners(OjUiEvent.DOWN, OjUiEvent.PRESS, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){
                this._getEventProxy().ontouchstart = null;
            }
        },

        "_updateTouchMoveListeners" : function(){
            if(!this.hasEventListeners(OjUiEvent.MOVE, OjDragEvent.START, OjDragEvent.DRAG, OjDragEvent.END)){//}, OjScrollEvent.SCROLL)){
                this._getEventProxy().ontouchmove = null;
            }
        },

        "_updateTouchEndListeners" : function(){
            if(!this.hasEventListeners(OjUiEvent.UP, OjUiEvent.UP_OUTSIDE, OjUiEvent.PRESS, OjDragEvent.END)){
                const proxy = this._getEventProxy();

                proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = null;
            }
        },

        "addEventListener" : function(type){
            const is_touch = OJ.is_touch_capable,
                proxy = this._getEventProxy(),
                hammer = this._setupHammer();

            this._super(OjElement, "addEventListener", arguments);

            if(type == OjScrollEvent.SCROLL){
                this._scrollable = true;

                proxy.onscroll = this._onDomScrollEvent;

//                if(is_touch){
//                    proxy.ontouchmove = this._onDomTouchEvent;
//                }
            }

            // mouse events
            else if(type == OjUiEvent.PRESS){
                if(!hammer.get("tap")){
                    hammer.add( new Hammer.Tap({ event: "tap" }) );
                }
            }
            else if(type == OjUiEvent.DOUBLE_PRESS){
                if(!hammer.get("doubletap")){
                    hammer.add( new Hammer.Tap({ event: "doubletap" }) );
                }
            }
            else if(type == OjUiEvent.DOWN){
                if(is_touch){
                    proxy.ontouchstart = this._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.LONG_PRESS){
                if(!hammer.get("press")){
                    hammer.add( new Hammer.Tap({ event: "press" }) );
                }
            }
            else if(type == OjUiEvent.MOVE){
                if(is_touch){
                    proxy.ontouchmove = this._onDomTouchEvent;
                }
                else{
                    proxy.onmousemove = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.OUT){
                proxy.onmouseout = this._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.OVER){
                proxy.onmouseover = this._onDomOjUiEvent;
            }
            else if(type == OjUiEvent.UP){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
                }
                else{
                    proxy.onmouseup = this._onDomOjUiEvent;
                    proxy.oncontextmenu = this._onDomOjUiEvent;
                }
            }
            else if(type == OjUiEvent.UP_OUTSIDE){
                if(is_touch){
                    proxy.ontouchcancel = proxy.ontouchend = proxy.ontouchleave = this._onDomTouchEvent;
                }
                else{
                    proxy.onmousedown = this._onDomOjUiEvent;
                }
            }

            // drag events
            else if(OjDragEvent.isDragEvent(type)){
                this._draggable = true;
//
//                if(is_touch){
//                    proxy.ontouchstart = proxy.ontouchmove = proxy.ontouchend = this._onDomTouchEvent;
//                }
//                else{
//                    proxy.onmousedown = this._onDomOjUiEvent;
//                }

                this.addEventListener(OjUiEvent.DOWN, this, "_onDragStart");
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
                //proxy.onfocusin = self._onDomOjFocusEvent;
            }
            else if(type == OjFocusEvent.OUT){
                proxy.onblur = this._onDomOjFocusEvent;
            }

            // transform events
            else if(type == OjTransformEvent.MOVE){
                if(!this._move_timer){
                    this._move_timer = new OjTimer(250, 0);
                    this._move_timer.addEventListener(OjTimer.TICK, this, "_onMoveTick");

                    this._prev_rect = this.rect;

                    this._move_timer.start();
                }
            }
            else if(type == OjTransformEvent.RESIZE && proxy != document.body){
                this._prev_rect = this.rect;

                OjStyleElement._resize_observer.observe(proxy);
            }

            // misc dom events
            else if(type == OjDomEvent.CHANGE){
                proxy.onchange = this._onOjDomEvent;
                proxy.onanimationstart = this._onOjDomEvent;  // hack for autofill issues with some browsers
            }
        },

        "addGestureRecognizer" : function(recognizer){
            if(!recognizer || this.hasGestureRecognizer(recognizer)){
                return;
            }

            recognizer._add(this._setupHammer());
        },

        "hasGestureRecognizer" : function(recognizer){
            return recognizer._has(this._setupHammer());
        },

        "removeEventListener" : function(type, context, callback){
            const proxy = this._getEventProxy();

            this._super(OjElement, "removeEventListener", arguments);

            // scroll events
            if(type == OjScrollEvent.SCROLL){
                if(!this.hasEventListener(OjScrollEvent.SCROLL)){
                    this._scrollable = false;

                    proxy.onscroll = null;

//                    this._updateTouchMoveListeners();
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
                    proxy.oncontextmenu = null;

                    this._updateTouchEndListeners();
                }
            }
            else if(type == OjUiEvent.UP_OUTSIDE){
                if(!this.hasEventListener(OjUiEvent.DOWN)){
                    proxy.onmousedown = null;

                    OJ.removeEventListener(OjUiEvent.UP, proxy, "_onOjMouseUp");

                    this._updateTouchEndListeners();
                }
            }

            // drag events
            else if(OjDragEvent.isDragEvent(type)){
                if(!this.hasEventListeners(OjDragEvent.DRAG, OjDragEvent.END, OjDragEvent.START)){
                    this._draggable = false;

                    this.removeEventListener(OjUiEvent.DOWN, this, "_onDragStart");

                    OJ.removeEventListener(OjUiEvent.MOVE, this, "_onDrag");
                    OJ.removeEventListener(OjUiEvent.UP, this, "_onDragEnd");
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
                    this._unset("_move_timer");
                }
            }
            else if(type == OjTransformEvent.RESIZE){
                if(!this.hasEventListener(OjTransformEvent.RESIZE)){
                    OjStyleElement._resize_observer.unobserve(proxy);
                }
            }

            // misc dom events
            else if(type == OjDomEvent.CHANGE){
                if(!this.hasEventListener(OjDomEvent.CHANGE)){
                    proxy.onchange = null;
                    proxy.onanimationstart = null;  // hack for autofill issues with some browsers
                }
            }
        },

        "removeGestureRecognizer" : function(recognizer){
            recognizer._remove(this._setupHammer())
        },


        // Child Management Functions
        "appendChild" : function(child){
            return this.insertChildAt(child, this.num_children);
        },

        "insertChildAt" : function(child, index){
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

        "forChild" : function(callback, complete, context){
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

        "forChildReverse" : function(callback, complete, context){
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

        "getChildAt" : function(index){
            return OjElement.element(this.dom.childNodes[index]);
        },

        "indexOfChild" : function(child){
            return Array.array(this.dom.childNodes).indexOf(child.dom);
        },

        "hasChild" : function(child){
            return child.parent == this;
        },

        "moveChild" : function(child, index){
            if(this.hasChild(child)){
                this.dom.insertBefore(child.dom, this.getChildAt(index).dom);

                return child;
            }

            // throw an error here
        },

        "prependChild" : function(child){
            return this.insertChildAt(child, 0);
        },

        "removeAllChildren" : function(){
            let ln = this.num_children,
                ary = [];

            for(; ln--;){
                ary.unshift(this.removeChildAt(ln));
            }

            return ary;
        },

        "removeChild" : function(child){
            if(child){
                // this will help exclude text elements
                if(child.is(OjElement)){
                    try{
                        this.dom.removeChild(child.dom);
                    }
                    catch(e){
                        // we don't really care if the child couldn't be removed. it"s cheaper than checking every time
                    }
                }

                child._setIsDisplayed(false);
            }

            return child;
        },

        "removeChildAt" : function(index){
            if(index < 0 || index >= this.num_children){
                return null;
            }

            return this.removeChild(this.getChildAt(index));
        },

        "removeChildren" : function(children){
            var ln = children.length;

            for(; ln--;){
                this.removeChild(children[ln]);
            }
        },

        "replaceChild" : function(target, replacement){
            return this.replaceChildAt(replacement, this.indexOfChild(target));
        },

        "replaceChildAt" : function(child, index){
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


        ".children" : function(){
            var ary = [],
                ln = this.num_children;

            for(; ln--;){
                ary.unshift(this.getChildAt(ln));
            }

            return ary;
        },
        "=children" : function(children){
            this.removeAllChildren();

            var i = 0,
                ln = children.length;

            for(; i < ln; i++){
                this.appendChild(children[i]);
            }
        },

        ".num_children" : function(){
            var dom = this.dom;

            if(!dom || !dom.childNodes){
                return 0;
            }

            return dom.childNodes.length;
        },


        // misc functions
        "blur" : function(){
            try{
                this.dom.blur();
            }
            catch(e){
                // do nothing
            }
        },

        "find" : function(query){
            if(isElement(query)){
                query = "#" + query.id;
            }

            return OJ.query(query, this.dom);
        },

        "focus" : function(){
            try{
                this.dom.focus();
            }
            catch(e){
                // do nothing
            }
        },

        "hide" : function(should){
            if(should == false){
                this.show();
            }
            else{
                this.addCss(["hidden"]);

                this.dispatchEvent(new OjEvent(OjEvent.HIDE));
            }
        },

        ".is_visible" : function(){
            return this._getStyle("display") != OjStyleElement.NONE &&
                   this._getStyle("visibility") != "hidden" &&
                   this.alpha > 0 && this.width > 0 && this.height > 0;
        },

        "show" : function(should){
            if(should == false){
                this.hide();
            }
            else{
                this.removeCss("hidden");

                this.dispatchEvent(new OjEvent(OjEvent.SHOW));
            }
        },


        // single style getter & setter functions
        "_getStyleBackup" : function(style){
            return this._getProxy().style.getPropertyValue(style);
        },

        "_getStyleIe" : function(style){
            return this._getProxy().currentStyle.getPropertyValue(style);
        },

        "_getStyle" : function(style){
            return document.defaultView.getComputedStyle(this._getProxy(), null).getPropertyValue(style);
        },
        "_setStyle" : function(style, value){
            if(isSet(value)){
                this._getProxy().style.setProperty(style, value);

                return value;
            }

            this._getProxy().style.removeProperty(style);

            return null;
        },

        "_setStyleColor" : function(style, value){
            if(value){
                if(isString(value) && value.charAt(0) == "#"){
                    value = hexToRgb(value).rgb;
                }

                if(isArray(value)){
                    value = "rgb" + (value.length > 3 ? "a(" : "(") + value.join(",") + ")";
                }
            }

            return this._setStyle(style, value);
        },


        "_getStyleNum" : function(prop){
            var val = this._getStyle(prop);

            if(!val || val == OjStyleElement.NONE){
                return 0;
            }

            return parseFloat(val.replaceAll(["px", "%", "pt", "em"], ""));
        },

        "_setStyleNum" : function(prop, val, unit){
            var args = arguments;

            this._setStyle(
                prop,
                isSet(val) ? val + (isUndefined(unit) ? this._getStyleUnit(prop) : unit) : null
            );

            return val;
        },

        "styleNum" : function (prop, val, unit) {
            if(isUndefined(val)){
                return this._getStyleNum(prop);
            }

            return this._setStyleNum(prop, val, unit);
        },

        // Bulk Style Getter & Setter Functions
        "_getStyler" : function(prop, args){
            var unit = prop == "font" || prop == "line" ? OJ.font_unit : OJ.dim_unit;

            if(!this["_" + prop]){
                this["_" + prop] = [
                    this._getStyle(prop + "Top").replaceAll(unit, ""),
                    this._getStyle(prop + "Right").replaceAll(unit, ""),
                    this._getStyle(prop + "Bottom").replaceAll(unit, ""),
                    this._getStyle(prop + "Left").replaceAll(unit, "")
                ];
            }

            return args && args.length ? this["_" + prop][args[0]] : this["_" + prop];
        },

        "_setStyler" : function(prop, vals){
            var str = "",
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
                    val = this["_" + prop][ln];
                }

                str = (ln ? " " : "") + val + unit + str;
            }

            this._setStyle(prop, str);
        },

        "_getStyleUnit" : function(prop){
            prop = prop.substr(0, 4);

            if(prop == "font" || prop == "line"){
                return OJ.font_unit;
            }

            return OJ.dim_unit;
        },


        // Attribute Getter & Setter Functions
        "attr" : function(key, val){
            const proxy = this._getProxy();

            // process the key incase its an attribute object
            if(isObject(key)){
                key = key.nodeName;
            }

            if(!isUndefined(val)){
                // if the value is set (not null) then update attribute value
                if(isSet(val)){
                    proxy.setAttribute(key, val);
                }
                // otherwise remove
                else{
                    proxy.removeAttribute(key);
                }
            }

            // read the attribute value
            return proxy.getAttribute(key);
        },

        "style" : function(key, val){
            var self = this;

            if(isUndefined(val)){
                return self._getStyle(key);
            }

            return self._setStyle(key, val);
        },
        
        ".id" : function(){
            return this._id || this.oj_id;
        },

        "=id" : function(val){
            if(this._id == val){
                return
            }

            (this.dom || {}).id = this._id = val;
        },

        // Content Getter & Setter Functions
        ".text" : function(){
            return this.dom.innerHTML;
        },
        "=text" : function(str){
            this.removeAllChildren();

            if(!isObjective(str, OjTextElement)){
                str = new OjTextElement(str);
            }

            this.dom.appendChild(str.dom);
        },

        // Css Functions
        "_makeCssList" : function(args){
            if(isArray(args[0])){
                return args[0];
            }

            var ln = args.length,
                list = [];

            for(; ln--;){
                list = list.concat(args[ln].trim().split(" "));
            }

            return list;
        },

        "_processCssList" : function(args, action){
            var css = this.css_list,
                list = this._makeCssList(args),
                ln = list.length,
                cls, index;

            for(; ln--;){
                index = css.indexOf(cls = list[ln]);

                if(index == -1){
                    switch(action){
                        case "has":
                            return false;

                        case "add":
                        case "toggle":
                            css.append(cls);
                    }
                }
                else{
                    switch(action){
                        case "remove":
                        case "toggle":
                            css.removeAt(index);
                    }
                }
            }

            if(action == "has"){
                return true;
            }

            return this.css = css;
        },

        "addCss" : function(css/*...css | array*/){
            return this._processCssList(arguments, "add");
        },

        ".css" : function(){
            return this._getProxy().className.trim();
        },

        ".css_list" : function(){
            return this.css.split(" ");
        },

        "hasCss" : function(css/*...css | array*/){
            return this._processCssList(arguments, "has");
        },

        "removeCss" : function(css/*... css | array*/){
            return this._processCssList(arguments, "remove");
        },

        "=css" : function(css){
            return this._getProxy().className = (isArray(css) ? css.join(" ") : css).trim();
        },

        "swapCss" : function(target, replacement){
            this.removeCss(target);
            this.addCss(replacement);
        },

        "toggleCss" : function(css/*...css | array*/){
            return this._processCssList(arguments, "toggle");
        },

        // Focus Functions
        "hitTest" : function(elm, local){
            return this.hitTestRect(elm.rect);
        },

        "hitTestRect" : function(rect, local){
            return (local ? this.rect : this.page_rect).hitTestRect(rect);
        },

        "hitTestPoint" : function(x, y, local){
            return (local ? this.rect : this.page_rect).hitTestPoint(x, y);
        },

        "localPoint" : function(global_point){
            // todo: add localPoint functionality
        },

        "localX" : function(global_x){
            return global_x - this.pageX;
        },

        "localY" : function(global_y){
            return global_y - this.pageY;
        },


        // Dimensional Getter & Setter Functions
        // TODO:
        // 1) factor in border into sizing
        // 2) handle non-metric values such as auto and %
        ".innerWidth" : function(){
            return this.width - this.getPaddingLeft() - this.getPaddingRight();
        },
        "=innerWidth" : function(w){
            this._setWidth(Math.round(w) + OJ.dim_unit);
        },

        ".outerWidth" : function(){
            return this.width + this.getMarginLeft() + Math.abs(this.getMarginRight());
        },
        "=outerWidth" : function(w){
            this.innerWidth = w - this.getPaddingLeft() - this.getPaddingRight() - this.getMarginLeft() - Math.abs(this.getMarginRight());
        },

        ".width" : function(){
            // const proxy = this._getProxy();

            // if(arguments[0] == OjStyleElement.PERCENT){
            //     const parent = proxy.offsetParent || proxy;
            //
            //     return (proxy.offsetWidth / parent.offsetWidth) * 100;
            // }

            return this._getProxy().offsetWidth || this._getStyleNum("width");
        },
        "_setWidth" : function(val){
            this._setStyle("width", val);
        },
        "=width" : function(val){
            var args = isArray(val) ? val : [val],
                w = args[0];

            if(w == OjStyleElement.AUTO || !isSet(w)){
                this._setWidth(null);
            }
            else if(args.length > 1){
                this._setWidth(args.join(""));
            }
            else{
                this.innerWidth = w - this.getPaddingLeft() - this.getPaddingRight();
            }
        },

        ".innerHeight" : function(){
            return this.height - this.getPaddingTop() - this.getPaddingBottom();
        },
        "=innerHeight" : function(h){
            this._setHeight(Math.round(h) + OJ.dim_unit);
        },

        ".outerHeight" : function(){
            return this.height + this.getMarginTop() + Math.abs(this.getMarginBottom());
        },
        "=outerHeight" : function(h){
            this.innerHeight = h - this.getPaddingTop() - this.getPaddingBottom() - this.getMarginTop() - Math.abs(this.getMarginBottom());
        },

        ".height" : function(/*unit=px*/){
            return this._getProxy().offsetHeight || this._getStyleNum("height");
        },
        "_setHeight" : function(val){
            this._setStyle("height", val);
        },
        "=height" : function(val){
            var args = isArray(val) ? val : [val],
                h = args[0];

            if(h == OjStyleElement.AUTO || !isSet(h)){
                this._setHeight(null);
            }
            else if(args.length > 1){
                this._setHeight(args.join(""));
            }
            else{
                this.innerHeight = h - this.getPaddingTop() - this.getPaddingBottom();
            }
        },

        // Style Getter & Setter Functions
        ".x" : function(/*unit=px*/){
            return this._getProxy().offsetLeft;
        },
        ".pageX" : function(){
            const proxy = this._getProxy();

            if(proxy.getBoundingClientRect){
                return proxy.getBoundingClientRect().left;
            }

            // todo: add backup solution
        },
        "=x" : function(val_or_tuple){
            this.left = val_or_tuple;
        },
        "=pageX" : function(val){
            this.left = this.parent.localX(val);
        },

        ".y" : function(){
            return this._getProxy().offsetTop;
        },
        ".pageY" : function(){
            const proxy = this._getProxy();

            if(proxy.getBoundingClientRect){
                return proxy.getBoundingClientRect().top;
            }

            // add backup solution
        },
        "=y" : function(val_or_tuple){
            this.top = val_or_tuple;
        },
        "=pageY" : function(val){
            this.top = this.parent.localY(val);
        },


        ".alpha" : function(){
            return this._alpha;
        },
        "=alpha" : function(alpha){
            var old_alpha = this._alpha;

            if(old_alpha == alpha){
                return;
            }

            if((alpha = this._alpha = this._setStyle("opacity", alpha)) && old_alpha === 0){
//                this.dispatchEvent(new OjEvent(OjEvent.SHOW));
            }
            else if(!alpha){
//                this.dispatchEvent(new OjEvent(OjEvent.HIDE));
            }
        },

        ".background_color" : function(){
            return this._getStyle("background-color");
        },
        "=background_color" : function(color){
            this._setStyleColor("background-color", color);
        },

        ".bottom" : function(){
            return this._getStyleNum("bottom");
        },
        "=bottom" : function(val_or_tuple){
            const is_tuple = isArray(val_or_tuple),
                val = is_tuple ? val_or_tuple[0] : val_or_tuple,
                units = is_tuple ? val_or_tuple[1] : OJ.dim_unit;

            this._setStyleNum("bottom", val, units);
        },

        ".depth" : function(){
            return this._depth;
        },
        "=depth" : function(depth){
            this._depth = this._setStyle("zIndex", depth);
        },

        ".first_child" : function(){
            return this.getChildAt(0);
        },

        ".font_color" : function(){
            return this._getStyle("color");
        },
        "=font_color" : function(color){
            this._setStyleColor("color", color);
        },

        ".font_size" : function(){
            this._getStyleNum("font-size");
        },
        "=font_size" : function(size){
            this._setStyleNum("font-size", size, OJ.font_unit);
        },

        ".has_focus" : function(){
            return this.dom.hasFocus;
        },

        ".last_child" : function(){
            return this.getChildAt(this.num_children - 1);
        },

        ".left" : function(){
            return this._getStyleNum("left");
        },
        "=left" : function(val_or_tuple){
            const is_tuple = isArray(val_or_tuple),
                val = is_tuple ? val_or_tuple[0] : val_or_tuple,
                units = is_tuple ? val_or_tuple[1] : OJ.dim_unit;

            this._setStyleNum("left", val, units);
        },

        ".overflow" : function(){
            return this._overflow;
        },
        "=overflow" : function(overflow){
            this._overflow = this._setStyle("overflow", overflow);
        },

        ".page_rect" : function(){
            var self = this;

            return new OjRect(self.pageX, self.pageY, self.width, self.height);
        },
        "=page_rect" : function(rect){
            // todo: =page_rect
        },

        ".rect" : function(){
            return new OjRect(this.x, this.y, this.width, this.height);
        },
        "=rect" : function(rect){
            // add this later
        },

        ".right" : function(){
            return this._getStyleNum("right");
        },
        "=right" : function(val_or_tuple){
            const is_tuple = isArray(val_or_tuple),
                val = is_tuple ? val_or_tuple[0] : val_or_tuple,
                units = is_tuple ? val_or_tuple[1] : OJ.dim_unit;

            this._setStyleNum("right", val, units);
        },

        ".scroll_height" : function(){
            return this._getProxy().scrollHeight;
        },
        "=scroll_height" : function(val){
            this._getProxy().scrollHeight = val;
        },

        ".scroll_width" : function(){
            return this._getProxy().scrollWidth;
        },
        "=scroll_width" : function(val){
            this._getProxy().scrollWidth = val;
        },

        ".scroll_x" : function(){
            return this._getProxy().scrollLeft;
        },

        "=scroll_x" : function(val){
            this._getProxy().scrollLeft = val;
        },

        ".scroll_y" : function(){
            return this._getProxy().scrollTop;
        },

        "=scroll_y" : function(val){
            this._getProxy().scrollTop = val;
        },

        ".top" : function(){
            return this._getStyleNum("top");
        },
        "=top" : function(val_or_tuple){
            const is_tuple = isArray(val_or_tuple),
                val = is_tuple ? val_or_tuple[0] : val_or_tuple,
                units = is_tuple ? val_or_tuple[1] : OJ.dim_unit;

            this._setStyleNum("top", val, units);
        },


        // alignment getter & setters
        "_getAlign" : function(type, dflt){
            var align = this.attr(type + "-align");

            return align ? align : dflt;
        },

        "_setAlign" : function(type, val, dflt){
            if(val == dflt){
                val = null;
            }

            this.attr(type + "-align", this["_" + type + "_align"] = val);
        },

        ".hAlign" : function(){
            return this._getAlign("h", OjStyleElement.LEFT);
        },
        "=hAlign" : function(val){
            return this._setAlign("h", val, OjStyleElement.LEFT);
        },

        ".vAlign" : function(){
            return this._getAlign("v", OjStyleElement.TOP);
        },
        "=vAlign" : function(val){
            return this._setAlign("v", val, OjStyleElement.TOP);
        },


        // Transform Setter & Getters
        "_updateTransform" : function(){
            var rotate = this._rotation ? "rotate(" + this._rotation + "deg) " : "",
                translate = this._translate ? this._translate.toString() : "",
                transform = rotate + (isEmpty(translate) ? "" : "translate(" + translate + ")"),
                prefix = OJ.css_prefix;

            if(prefix == "-moz-"){
                this._setStyle("MozTransform", transform);
            }
            else{
                this._setStyle(prefix + "transform", transform);
            }

            this._setStyle("transform", transform);
        },

        ".origin" : function(){
            return this._origin;
        },
        "=origin" : function(val){
            this._setStyle(OJ.css_prefix + "transform-origin", val);

            this._setStyle("transform-origin", this._origin = val);
        },

        ".rotation" : function(){
            return this._rotation;
        },
        "=rotation" : function(val){
            if(this._rotation == val){
                return;
            }

            this._rotation = val;

            this._updateTransform();
        },

        ".tag" : function(){
            return this.dom.tagName;
        },

        ".translate" : function(){
            return this._translate;
        },
        "=translate" : function(val){
            if(val.isEqualTo(this._translate)){
                return;
            }

            this._translate = val;

            this._updateTransform();
        }
    },
    {
        "COMPONENT_TAGS" : {},

        "STYLE_BACKUP" : "styleBackup",
        "STYLE_DEFAULT" : "styleDefault",
        "STYLE_IE" : "styleIE",

        "STYLE_MODE" : (function(){
            const elm = OjElement.elm("div");

            if(elm.currentStyle){
                return "styleIE";
            }

            if(!document.defaultView || !document.defaultView.getComputedStyle){
                return "styleBackup";
            }

            return "styleDefault";
        })(),

        "AUTO" : "auto",
        "BLOCK" : "block",
        "HIDDEN" : "hidden",
        "NONE" : "none",
        "SCROLL" : "scroll",
        "VISIBLE" : "visible",

        "LEFT" : "left",
        "CENTER" : "center",
        "RIGHT" : "right",

        "TOP" : "top",
        "MIDDLE" : "middle",
        "BOTTOM" : "bottom",

        "PERCENT" : "%",
        "PX" : "px",
        "EM" : "em",

        "_resize_observer" : new ResizeObserver((entries, observer) => {
            const cls = OjTransformEvent;

            for(const entry of entries){
                const self = OjElement.element(entry.target),
                    prev = self._prev_rect;

                self.dispatchEvent(new cls(cls.RESIZE, self._prev_rect = self.rect, prev));
            }
        }),


        "getTagComponent" : function(tag){
            return this.COMPONENT_TAGS[tag];
        },

        "isComponentTag" : function(tag){
            return isSet(this.COMPONENT_TAGS[tag]);
        },

        "registerComponentTag" : function(tag, component){
            this.COMPONENT_TAGS[tag] = component;

            if(OJ.browser == OJ.IE && OJ.browser_version.compareVersion("9.0.0") < 0){
                document.createElement(tag);
            }
        },

        "getStyle" : function(dom, style){
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