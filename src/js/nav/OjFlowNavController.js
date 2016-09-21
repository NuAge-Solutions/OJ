importJs("oj.nav.OjNavController");
importJs("oj.components.OjLabel");
importJs("oj.dom.OjStyleElement");
importJs("oj.events.OjEvent");
importJs("oj.events.OjStackEvent");
importJs("oj.fx.OjFade");
importJs("oj.fx.OjMove");
importJs("oj.fx.OjTweenSet");


OJ.extendComponent(
    "OjFlowNavController", [OjNavController],
    {
        "_props_" : {
            "cancel_icon" : null,
            "cancel_label" : "Cancel",
            "cancel_visible" : false,
            "default_title" : null,
            "title" : null
        },

        "_template" : "oj.nav.OjFlowNavController",


        // internal stack methods
        "_setupStack" : function(stack){
            var self = this,
                trans = OjTransition;

            if(self._super(OjNavController, "_setupStack", arguments)){
                stack.transition = new trans(trans.SLIDE_HORZ, 250, [OjEasing.IN, OjEasing.OUT]);
            }

            return stack;
        },

        //"_onStackAdd" : function(evt){
        //    this._stack.active = evt.view;
        //},


        // helper functions
        "_makeBackButton" : function(view){
            var btn = new OjButton(view.short_title);
            btn.addCss("back-button");

            return btn;
        },

        "_makeCancelButton" : function(title, icon){
            var btn = new OjButton(title, icon);
            btn.addCss("cancel-button");

            return btn;
        },

        "_makeTitle" : function(title){
            if(isObjective(title)){
                return title;
            }

            return new OjStyleElement("<div>" + title + "</div>");
        },

        "_update" : function(view, transition, index, old_index){
            var self = this;

            // remove any old animations
            self._unset("_tween");

            if(!view){
                return; // todo: re-evalute this to properly handle transition to on view
            }

            // process the left, title & right components
            // setup the vars
            var t = self.top, tl = self.top_left, tt = self.top_title, tr = self.top_right,
                b = self.bottom, bl = self.btm_left, bt = self.btm_title, br = self.btm_right,
                left = tl.num_children ? tl.getChildAt(0) : null,
                center = tt.num_children ? tt.getChildAt(0) : null,
                right = tr.num_children ? tr.getChildAt(0) : null,
                action_view = view.action_view,
                cancel_view = view.cancel_view,
                title_view = view.title_view,
                evt = OjUiEvent,
                stack = self.stack,
                title;

            // if there is no title view than try to make one from the title
            if( !title_view && ((title = view.title) || (title = self.default_title)) ){
                title_view = self._makeTitle(title);
            }

            // figure out default values
            if(self._back_btn){
                self._back_btn.removeEventListener(evt.PRESS, self, "_onBackClick");
            }
            else if(self._cancel_btn){
                self._cancel_btn.removeEventListener(evt.PRESS, self, "_onCancelClick");
            }

            if(!cancel_view){
                if(index > 0){
                    cancel_view = self._makeBackButton(stack.getElmAt(index - 1));
                }
                else if(self.cancel_visible){
                    cancel_view = self._cancel_btn = self._makeCancelButton(self.cancel_label, self.cancel_icon);
                }
            }

            if(index > 0){
                self._back_btn = cancel_view;

                cancel_view.addEventListener(evt.PRESS, self, "_onBackClick");
            }
            else if(cancel_view){
                self._cancel_btn = cancel_view;

                cancel_view.addEventListener(evt.PRESS, self, "_onCancelClick");
            }

            // figure out the transition
            if(left != cancel_view){
                if(left){
                    bl.appendChild(left);
                }

                if(cancel_view){
                    tl.appendChild(cancel_view);
                }
            }

            if(right != action_view){
                if(right){
                    br.appendChild(right);
                }

                if(action_view){
                    tr.appendChild(action_view);
                }
            }

            if(center != title_view){
                if(center){
                    bt.appendChild(center);
                }

                if(title_view){
                    tt.appendChild(title_view);
                }
            }

            // setup the top
            t.x = 0;
            t.alpha = 1;

            b.x = 0;
            b.alpha = 1;

            // check to see if we should animate or not
            var e = transition && transition.effect ? transition.effect : OjTransition.DEFAULT;

            if(e == OjTransition.NONE){
                // remove the animating css class since we aren"t anymore
                self.removeCss("animating");

                // make the necessary changes to the left, title & right bottom components components
                t.show();

                b.hide();

                bl.removeAllChildren();
                bt.removeAllChildren();
                br.removeAllChildren();

                return;
            }

            // setup the transition
            self.addCss("animating");

            self._tween = new OjTweenSet();

            // figure out the direction and then update
            var direction = 0,
                duration = transition.duration,
                easing = transition.easing,
                width = self.width;

            if(old_index != -1){
                if(old_index > index){
                    direction = width * -.5;
                }
                else if(old_index < index){
                    direction = width * .5;
                }
            }

            if(direction && e != OjTransition.FADE){
                // todo: OjFlowNavController - add support for multiple transition effects
                // update the display of the controller bar
                // setup the display
                b.x = 0;

                t.x = direction;
                t.alpha = 0;

                self._tween.addTween(new OjMove(b, OjMove.X, -1 * direction * .5, duration * .5), easing[1]);
                self._tween.addTween(new OjMove(t, OjMove.X, 0, duration, easing[1]));
            }
            else{
                t.alpha = 0;
            }

            self._tween.addTween(new OjFade(b, OjFade.OUT, duration, easing[1]));
            self._tween.addTween(new OjFade(t, OjFade.IN, duration, easing[0]));


            // start the transition
            self._tween.addEventListener(OjTweenEvent.COMPLETE, self, "_onTweenComplete");

            self._tween.start();
        },


        // event handler functions
        "_onBackClick" : function(evt){
            this.back();
        },

        "_onCancelClick" : function(evt){
            this.cancel();
        },

        "_onStackChange" : function(evt){
            this._update(evt.view, evt.transition, evt.index, evt.oldIndex);
        },

        "_onTweenComplete" : function(evt){
            this._unset("_tween");

            this.btm_left.removeAllChildren();
            this.btm_title.removeAllChildren();
            this.btm_right.removeAllChildren();

            this.removeCss("animating");
        },


        // public methods
        "back" : function(){
            var self = this,
                stack = self.stack;

            stack.active_index = stack.active_index - 1;

            self.dispatchEvent(new OjEvent(OjFlowNavController.BACK));
        },

        "cancel" : function(){
            this.dispatchEvent(new OjEvent(OjEvent.CANCEL, false));
        },


        // stack view functions
        "pushView" : function(view, transition){
            var stack = this.stack;

            stack.appendElm(view);

            stack.active = isSet(transition) ? [view, transition] : view;
        },

        "popToView" : function(view, transition){
            this.popToViewAt(this.stack.indexOfElm(view), transition);
        },

        "popToViewAt" : function(index, transition){
            this.stack.active_index = [index, transition];
        },

        "popView" : function(transition){
            this.popToViewAt(this.stack.num_elms - 2, transition);
        },


        // public properties
        "=title" : function(title){
            var self = this,
                hldr = self.top_title;

            if(self._title == title){
                return;
            }
            
            self._title = title;

            hldr.removeAllChildren();
            
            hldr.appendChild(
                self._makeTitle(title)
            );
        },

        "=cancel_label" : function(val){
            var self = this,
                btn = self._cancel_btn;

            self._cancel_label = val;

            if(btn){
                btn.label = val;
            }
        },

        "=cancel_icon" : function(val){
            var self = this,
                btn = self._cancel_btn;

            self._cancel_icon = val;

            if(btn){
                btn.icon = val;
            }
        },

        "=cancel_visible" : function(val){
            var self = this;

            if(!(self._cancel_visible = val) && self._cancel_btn){
                self._unset("_cancel_btn");
            }
        }
    },
    {
        "_TAGS" : ["flow-nav", "flow-nav-controller"],

        "BACK" : "onFlowNavBack"
    }
);