importJs('oj.fx.OjFade');


OJ.extendClass(
    'OjComponent', [OjStyleElement],
    {
        '_props_' : {
            'active' : false,
            'enabled' : null,
            'disabled' : false,
            'elms' : null,
            'is_active' : null,
            'isEnabled' : null,
            'isDisabled' : null,
            'num_elms' : 0
        },

        '_get_props_' : {
            'controller' : null,
            'is_animating' : false
        },


        '_constructor' : function(){
            var self = this,
                args = [null, self],
                template = self._template;

            // process the template if any
            if(template){
                if(template.charAt(0) == '<'){
                    args[0] = template;
                }
                else{
                    // TODO: this will throw an error until importTemplate is replaced
                    //args[0] = importTemplate(this._template);
                }
            }

            // call super constructor
            self._super(OjStyleElement, '_constructor', args);

            // add the class name inheritance as css classes
            self._setCss();

            // setup the container
            self._setContainer(self.container || self);
        },

        "_destructor" : function(){
            this._disableUiEvents();

            return this._super(OjStyleElement, "_destructor", arguments);
        },


        "_disableUiEvents" : function(){
            var self = this;

            self.removeEventListener(OjUiEvent.DOWN, self, "_onUiDown");
            self.removeEventListener(OjUiEvent.PRESS, self, "_onUiPress");
            self.removeEventListener(OjUiEvent.OVER, self, "_onUiOver");
            self.removeEventListener(OjUiEvent.OUT, self, "_onUiOut");

            OJ.removeEventListener(OjUiEvent.MOVE, self, "_onUiMove");
            OJ.removeEventListener(OjUiEvent.UP, self, "_onUiUp");
        },

        "_enableUiEvents" : function(){
            var self = this;

            self.addEventListener(OjUiEvent.DOWN, self, "_onUiDown");
            self.addEventListener(OjUiEvent.PRESS, self, "_onUiPress");
            self.addEventListener(OjUiEvent.OVER, self, "_onUiOver");
        },


        "_onUiDown" : function(evt){
            var self = this;

            OJ.addEventListener(OjUiEvent.UP, self, "_onUiUp");
            self.addEventListener(OjUiEvent.UP, self, "_onUiUp");

            self.addCss("ui-down");
        },

        "_onUiMove" : function(evt){
            var self = this;

            if(!self.hitTestPoint(evt.pageX, evt.pageY)){
                OJ.removeEventListener(OjUiEvent.MOVE, self, "_onUiMove");

                self._onUiOut(evt);
            }
        },

        "_onUiOut" : function(evt){
            var self = this;

            self.removeCss("ui-over");

            self._updateIcon(self._icon);
        },

        "_onUiOver" : function(evt){
            var self = this;

            OJ.addEventListener(OjUiEvent.MOVE, self, "_onUiMove");

            self.addCss("ui-over");
        },

        "_onUiPress" : function(evt){
            var url = this.url;

            if(url){
                WindowManager.open(url, this.target, {
                    'width' : this.target_width,
                    'height' : this.target_height
                });
            }
        },

        "_onUiUp" : function(evt){
            var self = this;

            OJ.removeEventListener(OjUiEvent.UP, self, "_onUiUp");
            self.removeEventListener(OjUiEvent.UP, self, "_onUiUp");

            self.removeCss("ui-down");
        },

        // override this so that the component gets properly set
        '_processChild' : function(dom, context){
            return this._super(OjStyleElement, '_processChild', [dom, context ? context : this]);
        },

        '_processDomSourceAttributes' : function(dom, context){
            this._processAttributes(dom, context);
        },

        '_processDomSourceChild' : function(dom_elm, context){
            if(!dom_elm || OjElement.isCommentNode(dom_elm)){
                return ;
            }

            return this._processChild(dom_elm, context);
        },

        '_processDomSourceChildren' : function(dom, context){
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


        '_setCss' : function(){
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

        '_setContainer' : function(container){
            if(this.container == container){
                return;
            }

            if(this.container){
                this.container.removeCss('container');
            }

            if((this.container = container) != this){
                this.container.addCss('container');
            }
        },

        '_setDomSource' : function(dom, context){
            // setup our vars
            var ary, prev, nm, val, ln, i,
                is_body = (dom == document.body),
                source = is_body ? this._dom : dom,
                target = is_body ? dom : this._dom;

            // prevent events from dispatching while we are setting everything up
//            this._prevent_dispatch = true;

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
//            this._prevent_dispatch = false;

            // update our dom var to the target
            this._dom = target;

            // process any template vars
            this._processTemplateVars();
        },

        '_setIsAnimating' : function(val){
            if(this._is_animating == val){
                return;
            }

            if(this._is_animating = val){
                this.addCss('animating');
            }
            else{
                this.removeCss('animating');
            }
        },

        '_setIsDisplayed' : function(displayed){
            this._super(OjStyleElement, '_setIsDisplayed', arguments);

            this.redraw();
        },


        '_processEvent' : function(evt){
            if(this._isDisabled){
                return false;
            }

            return this._super(OjStyleElement, '_processEvent', arguments);
        },


        // Component Management Functions
        '_callElmFunc' : function(func, args){
            return this._callElmProp(func).apply(this.container, args);
        },

        '_callElmProp' : function(prop, val){
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

        'appendElm' : function(){
            return this._callElmFunc('appendElm', arguments);
        },

        '.elms' : function(){
            return this._callElmProp('elms');
        },

        '=elms' : function(elms){
            return this._callElmProp('elms', elms);
        },

        'forElm' : function(){
            return this._callElmFunc('forElm', arguments);
        },

        'forElmReverse' : function(){
            return this._callElmFunc('forElmReverse', arguments);
        },

        'getElmAt' : function(){
            return this._callElmFunc('getElmAt', arguments);
        },

        'hasElm' : function(){
            return this._callElmFunc('hasElm', arguments);
        },

        'indexOfElm' : function(){
            return this._callElmFunc('indexOfElm', arguments);
        },

        'insertElmAt' : function(){
            return this._callElmFunc('insertElmAt', arguments);
        },

        'moveElm' : function(){
            return this._callElmFunc('moveElm', arguments);
        },

        '.num_elms' : function(){
            return this._callElmProp('num_elms');
        },

        'prependElm' : function(){
            return this._callElmFunc('prependElm', arguments);
        },

        'removeAllElms' : function(){
            return this._callElmFunc('removeAllElms', arguments);
        },

        'removeElm' : function(){
            return this._callElmFunc('removeElm', arguments);
        },

        'removeElmAt' : function(){
            return this._callElmFunc('removeElmAt', arguments);
        },

        'replaceElm' : function(){
            return this._callElmFunc('replaceElm', arguments);
        },

        'replaceElmAt' : function(){
            return this._callElmFunc('replaceElmAt', arguments);
        },


        // event handling functions
        '_onFadeComplete' : function(evt){
            this.alpha = 1;

            if(this._fader.direction == OjFade.OUT){
                this.hide();
            }
            else{
                this.show();
            }

            this._setIsAnimating(false);

            this._unset('_fader');
        },


        'fadeIn' : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.IN){
                    return;
                }

                this._unset('_fader');
            }
            else if(this.isVisible){
                return;
            }

            this.show();

            var ln = arguments.length;

            this._fader = new OjFade(this, OjFade.IN, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
            this._fader.start();

            this._setIsAnimating(true);
        },

        'fadeOut' : function(duration, easing){
            if(this._fader){
                if(this._fader.direction == OjFade.OUT){
                    return;
                }

                this._unset('_fader');
            }
            else if(!this.isVisible){
                return;
            }

            var ln = arguments.length;

            this._fader = new OjFade(this, OjFade.OUT, ln ? duration : 250, ln > 1 ? easing : OjEasing.NONE);
            this._fader.addEventListener(OjTweenEvent.COMPLETE, this, '_onFadeComplete');
            this._fader.start();

            this._setIsAnimating(true);
        },

        'redraw' : function(force){
            return this._is_displayed || force;
        },

        // Getter/Setter Methods
        '.controller' : function(){
            if(!this._controller){
                var p = this.parentComponent;

                if(p){
                    this._controller = p.controller;
                }
            }

            return this._controller;
        },

        // active
        '.is_active' : function(){
            return this.active;
        },

        '=is_active' : function(val){
            this.active = val;
        },

        '=active' : function(val){
            var self = this;

            if(self._active != val){
                if(self._active = val){
                    self.addCss('active');
                }
                else{
                    self.removeCss('active');
                }
            }
        },

        // disabled
        '.isDisabled' : function(){
            return this.disabled;
        },

        '=isDisabled' : function(val){
            return this.disabled = val;
        },

        '=disabled' : function(val){
            var self = this;

            if(self._disabled != val){
                if(self._disabled = val){
                    self.addCss('disabled');
                }
                else{
                    self.removeCss('disabled');
                }
            }
        },

        // enabled
        '.isEnabled' : function(){
            return this.enabled;
        },

        '=isEnabled' : function(val){
            return this.enabled = val;
        },

        '.enabled' : function(){
            return !this.disabled;
        },

        '=enabled' : function(val){
            this.disabled = !val;
        }
    },
    {
        '_TAGS' : [],

        'ELM_FUNCS' : {
            'appendElm' : 'appendChild',
            'elms' : 'children',
            'forElm' : 'forChild',
            'forElmReverse' : 'forChildReverse',
            'getElmAt' : 'getChildAt',
            'hasElm' : 'hasChild',
            'indexOfElm' : 'indexOfChild',
            'insertElmAt' : 'insertChildAt',
            'moveElm' : 'moveChild',
            'num_elms' : 'num_children',
            'prependElm' : 'prependChild',
            'removeAllElms' : 'removeAllChildren',
            'removeElm' : 'removeChild',
            'removeElmAt' : 'removeChildAt',
            'replaceElm' : 'replaceChild',
            'replaceElmAt' : 'replaceChildAt'
        },

        'load' : function(source){

        }
    }
);