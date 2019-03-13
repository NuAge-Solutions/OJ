/*
 * Note: Stack requires defined dimensions for transitions to work properly
 */
importJs('oj.components.OjCollectionComponent');
importJs('oj.events.OjCollectionEvent');
importJs('oj.events.OjStackEvent');
importJs('oj.fx.OjEasing');
importJs('oj.fx.OjFade');
importJs('oj.fx.OjMove');
importJs('oj.fx.OjResize');
importJs('oj.fx.OjTransition');
importJs('oj.fx.OjTweenSet');


OJ.extendComponent(
    'OjStack', [OjCollectionComponent],
    {
        // Properties & Vars
        '_props_' : {
            'active' : null,
            'active_index' : 0,
            'allow_looping' : true, // todo: OjStack - add support for looping
            'always_trans' : false,
            'auto_size_height' : false, // todo: OjStack - add support for auto size height
            'auto_size_width' : false, // todo: OjStack - add support for auto size width

            'transition' : null
        },

        '_get_props_' : {
            'has_deferred' : null
        },

//            '_active_elm' : null,  '_deferred_active' : null,  '_prev_active' : null,
//
//            '_trans_in' : null,  '_trans_out' : null,

        '_current_index' : 0,  '_prev_index' : 0,  '_transitioning' : false,


        // Construction & Destruction Functions
        '_constructor' : function(items, transition, item_renderer){
            var self = this;

            self.transition = transition || OjTransition.NONE;

            self._super(OjCollectionComponent, '_constructor', [items, item_renderer]);
        },

        '_destructor' : function(){
            var ln,
                args = arguments,
                depth = args.length && args[0];

            // unset transitions
            this._unset('_trans_in', true);
            this._unset('_trans_out', true);

            // unset previous active
            if(this._prev_active){
                this._removeActive(this._prev_active);

                this._prev_active = null;
            }

            // unset current active
            if(this._active){
                this._removeActive();

                this._active = null;
            }

            // unset views
            if(depth > 1){
                ln = this.num_elms;

                for(; ln--;){
                    OJ.destroy(this.renderItemAt(ln), depth);
                }
            }

            // remove object references
            this._controller = this._transition = null;

            return this._super(OjCollectionComponent, '_destructor', args);
        },


        // Element Management Functions
        '_callElmFunc' : function(func, args){
            var self = this,
                trans = self.transition,
                index = -1;

            args = Array.array(args);

            // detect transition flag
            switch(func){
                case 'removeAllElms':
                    index = 0;
                break;

                case 'removeElmAt':
                case 'appendElm':
                case 'removeElm':
                    index = 1;
                break;

                case 'insertElmAt':
                case 'replaceElmAt':
                case 'moveElm':
                case 'replaceElm':
                    index = 2;
                break;
            }

            // handle transition flag
            if(index > -1){
                if(args.length > index){
                    this.transition = this._processTransParam(args[index]);

                    args.removeLast();
                }
            }

            // call the elm func
            var rtrn = self._callElmProp(func).apply(self.elms, args);

            // return transition to previous state
            if(index > -1){
                this.transition = trans;
            }

            return rtrn
        },

        '_processDomSourceChild' : function(dom_elm, context){
            if(OjElement.isTextNode(dom_elm)){
                return false;
            }

            return this._super(OjCollectionComponent, '_processDomSourceChild', arguments);
        },

        '_processDomSourceChildren' : function(dom_elm, context){
            var children = dom_elm.childNodes,
                ln = children.length,
                i = 0, child;

            for(; i < ln; i++){
                if(child = this._processDomSourceChild(children[i], context)){
                    // remove the child from the dom source
                    child.parent = null;

                    // add the child to our stack
                    this.appendElm(child);

                    // if we add then we need to decrement the counter and length since
                    // a child will have been removed from the child nodes array
                    i += children.length - ln;
                    ln = children.length;
                }
            }
        },

        // Helper Functions
        '_addActive' : function(item, index){
            this._active = item;
            this._active_index = index;

            this._addActiveElm(this.renderItem(item));
        },

        '_addActiveElm' : function(elm){
            elm.is_active = true;

            this.container.appendChild(elm);
        },

        '_animationDirection' : function(start, finish){
            return start < finish ? -1 : 1;
        },

        '_dispatchChangeComplete' : function(){
            const self = this,
                container = self.container;

            container.width = OjStyleElement.AUTO;
            container.height = OjStyleElement.AUTO;

            self._transitioning = false;

            self.dispatchEvent(new OjStackEvent(OjStackEvent.CHANGE_COMPLETE, self._active, self._transition, self._active_index, self._prev_index));

            // show/hide methods
            self._active.didShow();

            if(self._prev_active){
                self._prev_active.didHide();
            }

            // process any deferred
            if(!isNull(self._deferred_active)){
                self.active_index = self._deferred_active;
            }
        },

        '_makeTransIn' : function(direction){
            var amount = 0, elm,
                container = this.container,
                w = container.width,
                h = container.height;

            this._unset('_trans_in');

            if(!direction){
                return null;
            }

            elm = container.getChildAt(
                Math.bounds(container.num_children - 1, 0, 1)
            );

            // force container dims
            container.width = w;
            container.height = h;

            // TODO: add in height transition

            switch(this._transition.effect){
                case OjTransition.FADE:
                    if(this._trans_out){
                        return null;
                    }

                    amount = 1;
                    break;

                case OjTransition.SLIDE_HORZ:
                    elm.x = -1 * direction * w;
                    break;

                case OjTransition.SLIDE_VERT:
                    elm.y = -1 * direction * h;
                    break;
            }

            if(this._trans_in = this._transition.make(elm, OjTransition.IN, amount)){
                this._trans_in.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransIn');
                this._trans_in.start();

                this._setIsAnimating(true);
            }
            else if(!this._trans_out){
                // dispatch the change is complete
                this._dispatchChangeComplete();
            }

            return this._trans_in;
        },

        '_makeTransOut' : function(direction){
            var amount = 0,
                container = this.container,
                w = container.width,
                h = container.height,
                elm = container.getChildAt(0);

            this._unset('_trans_out');

            // force container dims
            container.width = w;
            container.height = h;

            if(elm){
                switch(this._transition.effect){
                    case OjTransition.SLIDE_HORZ:
                        amount = elm.x + (direction * w);
                        break;

                    case OjTransition.SLIDE_VERT:
                        amount = elm.y + (direction * h);
                        break;
                }

                if(this._trans_out = this._transition.make(elm, OjTransition.OUT, amount)){
                    elm.addCss('prev-active');

                    this._trans_out.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransOut');
                    this._trans_out.start();

                    this._setIsAnimating(true);
                }
                else{
                    this._removeActive(this._prev_active);
                }
            }

            return this._trans_out;
        },

        '_processIndex' : function(index){
            var ln = this.num_elms;

            if(this.allow_looping){
                index = index % ln;

                // set the active
                if(index < 0){
                    return ln + index;
                }

                return index;
            }

            return Math.bounds(index, 0, ln - 1);
        },

        '_processTransParam' : function(param){
            if(!param){
                return OjStack.NONE;
            }

            if(param === true){
                return this._transition;
            }

            return param;
        },

        '_removeActive' : function(item){
            var self = this,
                elm = item || self.getElmAt(self._active_index);

            if(elm){
                if(self._item_renderer){
                    // find the matching elm
                    // NOTE: this will not function properly if it can't find a match since it sets the elm on each pass
                    self.container.children.forEachReverse(function(x){
                        if(x.data == item){
                            return false;
                        }
                    });
                }

                self._removeActiveElm(elm);
            }
        },

        "_removeActiveElm" : function(elm){
            // remove the elm from the display
            this.container.removeChild(elm);

            elm.removeCss("prev-active");
            elm.width = OjStyleElement.AUTO;
            elm.height = OjStyleElement.AUTO;
            elm.x = null;
            elm.y = null;
            elm.alpha = 1;

            elm.is_active = false;
        },


        // Event Handler Functions
        '_onItemAdd' : function(evt){
            this._super(OjCollectionComponent, '_onItemAdd', arguments);

            // since we are using a collection to keep track of things the parent won't get properly changes
            // so we need to do it here
            var index = evt.index,
                item = evt.items.first;

            this.dispatchEvent(new OjStackEvent(OjStackEvent.ADD, item, this._transition, index));

            if(!this._active){
                this.active_index = index;
            }
            else{
                this._active_index = this._current_index = this.indexOfElm(this._active);
            }
        },

        '_onItemMove' : function(evt){
            this._super(OjCollectionComponent, '_onItemMove', arguments);

            this.dispatchEvent(new OjStackEvent(OjStackEvent.MOVE, evt.item, this._transition, evt.index));

            if(this._active == evt.item){
                this._active_index = this._current_index = evt.index;
                // todo: add logic for stack item move current_index
            }
        },

        '_onItemRemove' : function(evt){
            this._super(OjCollectionComponent, '_onItemRemove', arguments);

            var ln,
                item = evt.items.first,
                index = evt.index;

            this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, item, this._transition, index));

            if(this._active == item){
                if(this._current_index){
                    this.active_index = this._current_index - 1;
                }
                else if(ln = this.num_elms){
                    this.active_index = ln - 1;
                }
                else{
                    this._active = null;
                    this._active_index = this._current_index = 0;
                }
            }
            else{
                if(this._prev_active == item){
                    this._prev_active = null;
                }

                this._active_index = this._current_index = this.indexOfElm(this._active);
            }
        },

        '_onItemReplace' : function(evt){
            var self = this,
                item = evt.items.first,
                index = evt.index,
                active_index = self._active_index;

            self._super(OjCollectionComponent, '_onItemReplace', arguments);

            self.dispatchEvent(new OjStackEvent(OjStackEvent.REPLACE, item, self._transition, index));

            if(active_index == index){
                self._current_index = -1;

                self.active_index = index;
            }
        },

        '_onTransIn' : function(evt){
            // cleanup the transition
            this._unset('_trans_in');

            // if there are no more transitions get us out of animating mode
            if(!this._trans_out){
                this._setIsAnimating(false);

                // dispatch the change is complete
                this._dispatchChangeComplete();
            }
        },

        '_onTransOut' : function(evt){
            var self = this;

            // cleanup the transition
            self._unset('_trans_out');

            // remove the previously active item/elm
            self._removeActive(self._prev_active);

            // if there are no more transitions get us out of animating mode
            if(!self._trans_in){
                self._setIsAnimating(false);

                // dispatch the change is complete
                self._dispatchChangeComplete();
            }

            // unset prev vars since they are no longer needed
            self._prev_active = null;
            self._prev_index = null;
        },


        // Utility Functions
        'next' : function(){
            this.active_index = this._current_index + 1;
        },

        'prev' : function(){
            this.active_index = this._current_index - 1;
        },

        'renderItemAt' : function(index){
            return this._super(OjCollectionComponent, 'renderItemAt', [this._processIndex(index)]);
        },


        // Getter & Setter Functions
        '=active' : function(val/*, transition*/){
            if(!isArray(val)){
                val = [val];
            }

            if((val[0] = this.indexOfElm(val[0])) > -1){
                this.active_index = val;
            }
        },


        // Getter & Setter Functions
        '=active_index' : function(val/*, transition*/){
            var self = this,
                active = self.active,
                always_trans = self.always_trans,
                trans = self.transition, tmp_trans = trans,
                trans_diff, item, direction, evt;

            // handle tuple
            if(isArray(val)){
                trans_diff = val.length > 1 ? val[1] : true;
                val = val[0];
            }

            // check for change
            if(self._current_index == val && active){
                return;
            }

            // if we are in the middle of an animation then deffer the change until afterward
            if(self._transitioning){
                self._deferred_active = [val, trans_diff];

                return;
            }

            // update transitioning flag
            self._transitioning = true;

            // handle custom transition if it exists
            if(trans_diff){
                self.transition = self._processTransParam(trans_diff);

                tmp_trans = self.transition;
            }

            // reset deferred active
            self._deferred_active = null;

            // transition out the old active container
            if(active){
                // get the old element
                self._prev_active = active;

                // let active know we are going to hide it
                active.willHide();

                // update the direction
                // create the transition out animation

                self._makeTransOut(direction = self._animationDirection(self._prev_index = self._active_index, val));
            }
            else{
                direction = always_trans ? 1 : 0;

                self._prev_index = 0;
            }

            // update current index
            self._current_index = val = self._processIndex(val);

            // make sure we have something to set active
            if(!self.num_elms){
                self._active_index = 0;
                self._current_index = 0;
                self._active = null;

                self.dispatchEvent(
                    new OjStackEvent(OjStackEvent.CHANGE, null, tmp_trans, 0, self._prev_index)
                );

                self._transitioning = false;

                return;
            }

            // create the change event
            evt = new OjStackEvent(
                OjStackEvent.CHANGE, item = self.getElmAt(val),
                self._trans_out || always_trans ? tmp_trans : OjTransition.DEFAULT,
                val, self._prev_index
            );

            self._addActive(item, val);

            item.willShow();

            // transition in the new active container
            // but only if we are transitioning out an old active
            if(self._trans_out || always_trans){
                self._makeTransIn(direction);
            }

            if(trans_diff){
                self.transition = trans;
            }

            // dispatch the change event
            self.dispatchEvent(evt);

            // dispatch the change is complete
            // if no animation
            if(!self._trans_out && !always_trans){
                self._dispatchChangeComplete();
            }
        },

        '=allow_looping' : function(allow_looping){
            if(this._allow_looping == allow_looping){
                return;
            }

            // check to see if current index is out of bounds
            if(!(this._allow_looping = allow_looping)){
                var ln = this.num_elms;

                if(this._current_index < 0){
                    this.active_index = (ln - this._current_index) % ln;
                }
                else if(this._current_index >= ln){
                    this.active_index = this._current_index % ln;
                }
            }
        },

        '=elms' : function(){
            this._super(OjCollectionComponent, '=elms', arguments);

            this._current_index = 0;

            this.active_index = this.active_index;
        },

        '.has_deferred' : function(){
            return !isEmpty(this._deferred_active);
        },

        '=transition' : function(val){
            var self = this;

            if(self._transition == val){
                return;
            }

            self._transition = OjTransition.transition(val, self._transition);
        }
    },
    {
        '_TAGS' : ['stack']
    }
);