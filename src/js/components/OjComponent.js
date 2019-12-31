importJs("oj.fx.OjFade");
importJs("oj.events.OjComponentEvent");


OJ.extendClass(
    "OjComponent", [OjStyleElement],
    {
        "_props_" : {
            "enabled" : null,
            "disabled" : false,
            "elms" : null,
            "is_active" : null,
            "is_inactive" : null,
            "is_enabled" : null,
            "is_disabled" : null,
            "num_elms" : 0
        },

        "_get_props_" : {
            "controller" : null,
            "is_animating" : false
        },


        "_constructor" : function(){
            const args = [null, this],
                template = this._template;

            // process the template if any
            if(template){
                if(template.charAt(0) == "<"){
                    args[0] = template;
                }
                else{
                    // TODO: this will throw an error until importTemplate is replaced
                    //args[0] = importTemplate(this._template);
                }
            }

            // call super constructor
            this._super(OjStyleElement, "_constructor", args);

            // add the class name inheritance as css classes
            this._setCss();

            // setup the container
            this._setContainer(this.container || this);
        },

        "_destructor" : function(){
            this._disableUiEvents();

            return this._super(OjStyleElement, "_destructor", arguments);
        },


        "_disableUiEvents" : function(){
            this.removeEventListener(OjUiEvent.DOWN, this, "_onUiDown");
            this.removeEventListener(OjUiEvent.PRESS, this, "_onUiPress");
            this.removeEventListener(OjUiEvent.OVER, this, "_onUiOver");
            this.removeEventListener(OjUiEvent.OUT, this, "_onUiOut");

            OJ.removeEventListener(OjUiEvent.MOVE, this, "_onUiMove");
            OJ.removeEventListener(OjUiEvent.UP, this, "_onUiUp");
        },

        "_enableUiEvents" : function(){
            this.addEventListener(OjUiEvent.DOWN, this, "_onUiDown");
            this.addEventListener(OjUiEvent.PRESS, this, "_onUiPress");
            this.addEventListener(OjUiEvent.OVER, this, "_onUiOver");
        },


        "_onUiDown" : function(evt){
            OJ.addEventListener(OjUiEvent.UP, this, "_onUiUp");

            this.addEventListener(OjUiEvent.UP, this, "_onUiUp");

            this.addCss("ui-down");
        },

        "_onUiMove" : function(evt){
            var self = this;

            if(!self.hitTestPoint(evt.pageX, evt.pageY)){
                OJ.removeEventListener(OjUiEvent.MOVE, self, "_onUiMove");

                self._onUiOut(evt);
            }
        },

        "_onUiOut" : function(evt){
            this.removeCss("ui-over");
        },

        "_onUiOver" : function(evt){
            var self = this;

            OJ.addEventListener(OjUiEvent.MOVE, self, "_onUiMove");

            self.addCss("ui-over");
        },

        "_onUiPress" : function(evt){
            // do nothing
        },

        "_onUiUp" : function(evt){
            var self = this;

            OJ.removeEventListener(OjUiEvent.UP, self, "_onUiUp");
            self.removeEventListener(OjUiEvent.UP, self, "_onUiUp");

            self.removeCss("ui-down");
        },

        // override this so that the component gets properly set
        "_processChild" : function(dom, context){
            return this._super(OjStyleElement, "_processChild", [dom, context ? context : this]);
        },

        "_processDomSourceAttributes" : function(dom, context){
            this._processAttributes(dom, context);
        },

        "_processDomSourceChild" : function(dom_elm, context){
            if(!dom_elm || OjElement.isCommentNode(dom_elm)){
                return ;
            }

            return this._processChild(dom_elm, context);
        },

        "_processDomSourceChildren" : function(dom, context){
            var self = this,
                child,
                children = dom.childNodes,
                ln = children.length;

            for(; ln--;){
                if(child = self._processDomSourceChild(children[ln], context)){
                    self.prependElm(child);
                }
            }
        },


        "_setCss" : function(){
            var self = this,
                css = [self.oj_class_name],
                ln = self._supers.length,
                cls;

            for(; ln--;){
                cls = self._supers[ln];

                css.append(OJ.classToString(cls));

                if(cls == OjComponent){
                    break;
                }
            }

            self.addCss(css);
        },

        "_setContainer" : function(container){
            if(this.container == container){
                return;
            }

            if(this.container){
                this.container.removeCss("container");
            }

            if((this.container = container) != this){
                this.container.addCss("container");
            }
        },

        "_setDomSource" : function(dom, context){
            // setup our vars
            const is_body = (dom == document.body),
                _dom = this.dom,
                source = is_body ? _dom : dom,
                target = is_body ? dom : _dom;

            let ary, prev, nm, val, ln, i;

            // process dom attributes
            this._processDomSourceAttributes(dom, context);

            // copy over attributes
            ln = (ary = source.attributes).length;

            for(; ln--;){
                i = ary[ln];
                nm = i.nodeName;
                val = i.value;

                if(nm == "class"){
                    prev = target.getAttribute(nm);

                    target.className = (String.string(prev) + " " + val).trim();
                }
                else if(nm == "id"){
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

            // update our dom var to the target
            target.__oj__ = this._id_;

            // process any template vars
            this._processTemplateVars();
        },

        "_setIsAnimating" : function(val){
            if(this._is_animating == val){
                return;
            }

            if(this._is_animating = val){
                this.addCss("animating");
            }
            else{
                this.removeCss("animating");
            }
        },

        "_setIsDisplayed" : function(displayed){
            this._super(OjStyleElement, "_setIsDisplayed", arguments);

            this.redraw();
        },


        "_processEvent" : function(evt){
            if(this._is_disabled){
                return false;
            }

            return this._super(OjStyleElement, "_processEvent", arguments);
        },


        // Component Management Functions
        "_callElmFunc" : function(func, args){
            return this._callElmProp(func).apply(this.container, args);
        },

        "_callElmProp" : function(prop, val){
            var cls = this._static,
                container = this.container,
                translated;

            if(container != this && container.is(OjComponent)) {
                translated = prop;
            }
            else {
                translated = cls.ELM_FUNCS[prop];
            }

            if(arguments.length > 1){
                container[translated] = val;
            }

            return container[translated]
        },

        "appendElm" : function(){
            return this._callElmFunc("appendElm", arguments);
        },

        ".elms" : function(){
            return this._callElmProp("elms");
        },

        "=elms" : function(elms){
            return this._callElmProp("elms", elms);
        },

        "forElm" : function(){
            return this._callElmFunc("forElm", arguments);
        },

        "forElmReverse" : function(){
            return this._callElmFunc("forElmReverse", arguments);
        },

        "getElmAt" : function(){
            return this._callElmFunc("getElmAt", arguments);
        },

        "hasElm" : function(){
            return this._callElmFunc("hasElm", arguments);
        },

        "indexOfElm" : function(){
            return this._callElmFunc("indexOfElm", arguments);
        },

        "insertElmAt" : function(){
            return this._callElmFunc("insertElmAt", arguments);
        },

        "moveElm" : function(){
            return this._callElmFunc("moveElm", arguments);
        },

        ".num_elms" : function(){
            return this._callElmProp("num_elms");
        },

        "prependElm" : function(){
            return this._callElmFunc("prependElm", arguments);
        },

        "removeAllElms" : function(){
            return this._callElmFunc("removeAllElms", arguments);
        },

        "removeElm" : function(){
            return this._callElmFunc("removeElm", arguments);
        },

        "removeElmAt" : function(){
            return this._callElmFunc("removeElmAt", arguments);
        },

        "replaceElm" : function(){
            return this._callElmFunc("replaceElm", arguments);
        },

        "replaceElmAt" : function(){
            return this._callElmFunc("replaceElmAt", arguments);
        },


        // event handling functions
        "_onFadeComplete" : function(evt){
            this.alpha = 1;

            if(this._fader.direction == OjFade.OUT){
                this.hide();
            }
            else{
                this.show();
            }

            this._setIsAnimating(false);

            this._unset("_fader");
        },


        "fadeIn" : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.IN){
                    return;
                }

                this._unset("_fader");
            }
            else if(this.is_visible){
                return;
            }

            this.show();

            var ln = arguments.length;

            this._fader = new OjFade(this, OjFade.IN, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, "_onFadeComplete");
            this._fader.start();

            this._setIsAnimating(true);
        },

        "fadeOut" : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.OUT){
                    return;
                }

                this._unset("_fader");
            }
            else if(!this.is_visible){
                return;
            }

            var ln = arguments.length;

            this._fader = new OjFade(this, OjFade.OUT, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, "_onFadeComplete");
            this._fader.start();

            this._setIsAnimating(true);
        },

        "redraw" : function(force){
            return this._is_displayed || force;
        },

        // Getter/Setter Methods
        ".controller" : function(){
            if(!this._controller){
                const p = this.parent_component;

                if(p){
                    this._controller = p.controller;
                }
            }

            return this._controller;
        },

        // is_active
        "=is_active" : function(val){
            var self = this,
                evt = OjComponentEvent;

            if(self._is_active != val){
                if(self._is_active = val){
                    self.addCss("active");

                    self.dispatchEvent(new evt(evt.ACTIVE));
                }
                else{
                    self.removeCss("active");

                    self.dispatchEvent(new evt(evt.INACTIVE));
                }

                self.dispatchEvent(new evt(evt.ACTIVE_CHANGE));
            }
        },

        ".is_inactive" : function(){ return !this.is_active; },
        "=is_inactive" : function(val){ return this.is_active = !val; },

        // is_disabled
        "=is_disabled" : function(val){
            var self = this,
                evt = OjComponentEvent;

            if(self._is_disabled != val){
                if(self._is_disabled = val){
                    self.addCss("disabled");

                    self.dispatchEvent(new evt(evt.DISABLED));
                }
                else{
                    self.removeCss("disabled");

                    self.dispatchEvent(new evt(evt.ENABLED));
                }

                self.dispatchEvent(new evt(evt.ENABLED_CHANGE));
            }
        },

        ".is_enabled" : function(){ return !this.is_disabled; },
        "=is_enabled" : function(val){ return this.is_disabled = !val; }
    },
    {
        "_TAGS" : [],

        "ELM_FUNCS" : {
            "appendElm" : "appendChild",
            "elms" : "children",
            "forElm" : "forChild",
            "forElmReverse" : "forChildReverse",
            "getElmAt" : "getChildAt",
            "hasElm" : "hasChild",
            "indexOfElm" : "indexOfChild",
            "insertElmAt" : "insertChildAt",
            "moveElm" : "moveChild",
            "num_elms" : "num_children",
            "prependElm" : "prependChild",
            "removeAllElms" : "removeAllChildren",
            "removeElm" : "removeChild",
            "removeElmAt" : "removeChildAt",
            "replaceElm" : "replaceChild",
            "replaceElmAt" : "replaceChildAt"
        },

        "HORIZONTAL" : "horz",
        "HORIZONTAL_REVERSE" : "horz-rev",
        "VERTICAL" : "vert",
        "VERTICAL_REVERSE" : "vert-rev",

        "load" : function(source){

        }
    }
);