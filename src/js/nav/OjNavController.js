importJs('oj.components.OjComponent');


OJ.extendComponent(
    'OjNavController', [OjComponent],
    {
        '_props_' : {
            'active_view' : null,
            'active_index' : null,
            'stack' : null,
        },


        '_constructor' : function(stack){
            this._super(OjComponent, '_constructor', []);

            // process the arguments
            if(stack){
                this.stack = stack;
            }
        },

        '_destructor' : function(){
            this._cleanupStack();

            return this._super(OjComponent, '_destructor', arguments);
        },

        '_setupStack' : function(stack){
            var self = this,
                evt = OjStackEvent;

            if(stack){
                // setup the stack controller reference
                stack.controller = self;

                // setup the stack event listeners
                stack.addEventListener(evt.CHANGE, self, '_onStackChange');
                stack.addEventListener(evt.CHANGE_COMPLETE, self, '_onStackChangeComplete');

                // if we already have stuff in the stack then trigger a change event so the display gets updated properly
                var active = stack.active;

                if(active){
                    self._onStackChange(
                        new OjStackEvent(evt.CHANGE, active, OjTransition.DEFAULT, stack.indexOfElm(active), 0)
                    );
                }
            }

            return stack;
        },

        '_cleanupStack' : function(){
            var self = this,
                stack = self.stack,
                evt = OjStackEvent;

            if(stack){
                stack.removeEventListener(evt.CHANGE, self, '_onStackChange');
                stack.removeEventListener(evt.CHANGE_COMPLETE, self, '_onStackChangeComplete');
            }
        },


        // event listener callbacks
        '_onStackChange' : function(evt){

        },

        '_onStackChangeComplete' : function(evt){
            // remove all views after the active view
            var stack = this.stack,
                ln = stack.num_elms,
                i = stack.active_index;

            if(stack.has_deferred){
                return;
            }

            for(; --ln > i;){
                stack.removeElmAt(ln);
            }
        },


        // stack view functions
        'appendView' : function(view/*, animated = true*/){
            var s = this.stack;

            return s.appendElm.apply(s, arguments);
        },

        'insertViewAt' : function(view, index/*, animated = true*/){
            var s = this.stack;

            return s.insertElmAt.apply(s, arguments);
        },

        'gotoView' : function(/*view = root, animated = true*/){
            var args = arguments,
                ln = args.length, index,
                view = ln ? args[0] : null,
                animated = ln > 1 ? args[1] : true;

            // if no view is specified we go all the way back to the root
            // if a new view is specified we go all the way back to root and replace with new view
            if(!view || (index = this.indexOfView(view)) > -1){
                return this.gotoViewAt(index, animated);
            }

            if(index = this.active_index){
                this.replaceViewAt(0, view);

                return this.gotoViewAt(0);
            }

            this.replaceActive(view, animated);
        },

        'gotoViewAt' : function(index/*, animated = true*/){
            return this.stack.active_index = arguments;
        },

        'hasView' : function(view){
            return this.stack.hasElm(view);
        },

        'indexOfView' : function(view){
            return this.stack.indexOfElm(view);
        },

        'removeActive' : function(/*animated = true*/){
            return this.removeViewAt(this.stack.active_index, arguments.length ? arguments[0] : true);
        },

        'removeView' : function(view/*, animated = true*/){
            var s = this.stack;

            return s.removeElm.apply(s, arguments);
        },

        'removeViewAt' : function(view, index/*, animated = true*/){
            var s = this.stack;

            return s.removeElmAt.apply(s, arguments);
        },

        'replaceActive' : function(view/*, animated = true*/){
            var s = this.stack,
                args = arguments;

            return s.replaceElmAt(this.active_index, view, args.length > 1 ? args[0] : true);
        },

        'replaceView' : function(oldView, newView/*, animated = true*/){
            var s = this.stack;

            return s.replaceElm.apply(s, arguments);
        },

        'replaceViewAt' : function(index, newView/*, animated = true*/){
            var s = this.stack;

            return s.replaceElmAt.apply(s, arguments);
        },


        // getter & setter functions
        '.active_view' : function(){
            return this.stack.active;
        },

        '=active_view' : function(val){
            this.stack.active = val;
        },

        '.active_index' : function(){
            return this.stack.active_index;
        },

        '=active_index' : function(val){
            this.stack.active_index = val;
        },

        '=stack' : function(stack){
            var self = this,
                old = self._stack;

            if(old == stack){
                return;
            }

            if(old){
                self._cleanupStack();
            }

            self._stack = self._setupStack(stack);
        }
    },
    {
        '_TAGS' : ['nav', 'nav-controller']
    }
);