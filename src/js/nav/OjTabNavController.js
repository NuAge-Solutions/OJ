importJs("oj.nav.OjNavController");

OJ.extendComponent(
    "OjTabNavButton", [OjButton],
    {
        "_props_" : {
            "view": null
        },

        "_constructor" : function(view){
            this._super(OjButton, "_constructor", []);

            this.attr("flex-h", null);
            this.attr("flex-v", "");

            this.view = view;
        },

        "_onViewIconChange" : function(){
            this.icon = (this._view|| {}).icon;
        },

        "_onViewTitleChange" : function(){
            this.label = (this._view || {}).short_title;
        },

        "=view" : function(val){
            if(this._view == val){
                return;
            }

            const view = this._view;
            let nav_css;

            if(view){
                if(nav_css = view.nav_css){
                    this.removeCss(nav_css);
                }

                view.removeEventListener(OjView.ICON_CHANGE, this, "_onViewIconChange");
                view.removeEventListener(OjView.TITLE_CHANGE, this, "_onViewTitleChange");
            }

            if(this._view = val){
                if(nav_css = val.nav_css){
                    this.addCss(nav_css);
                }

                val.addEventListener(OjView.ICON_CHANGE, this, "_onViewIconChange");
                val.addEventListener(OjView.TITLE_CHANGE, this, "_onViewTitleChange");
            }

            this._onViewIconChange();
            this._onViewTitleChange();
        }
    }
);


OJ.extendComponent(
    "OjTabNavController", [OjNavController],
    {
        "_props_" : {
            "tab_renderer": OjTabNavButton,
	        "on_tab_press" : null
        },

        "_constructor" : function(){
            this._super(OjNavController, "_constructor", arguments);

            this.attr("flex-h", "");
        },

        "_activeButton" : function(){
            return this.getChildAt(this.active_index);
        },

        "_addViewButton" : function(view, index){
            // var btn = new OjButton(view.short_title, view.icon),
            //     nav_css = view.nav_css;
            //
            // // btn.attr("flex-h", null);
            // // btn.attr("flex-v", "");
            //
            // if(nav_css){
            //     btn.addCss(nav_css);
            // }
            const cls = this.tab_renderer,
                btn = new cls(view);

            btn.addEventListener(OjUiEvent.PRESS, this, "_onTabPress");

            this.insertChildAt(btn, index);
        },

        "_processDomSourceChildren" : function(dom, context){
            return;
        },

        "_removeViewButton" : function(view, index){
            var self = this,
                views = isArray(view) ? view : [view];

            OJ.destroy(self.removeChildAt(index));

            views.forEachReverse((view) => {
                view.removeEventListener(OjView.ICON_CHANGE, self, "_onViewIconChange");
                view.removeEventListener(OjView.TITLE_CHANGE, self, "_onViewTitleChange");
            });
        },

        "_updateActiveBtn" : function(){
            var self = this,
                stack = self._stack,
                prev_active = self._prev_active;

            if(prev_active){
                prev_active.is_active = false;
            }

            if(stack && (prev_active = self._activeButton())){
                prev_active.is_active = true;
            }

            self._prev_active = prev_active;
        },

        // event listener callbacks
        "_onStackChange" : function(evt){
            this._updateActiveBtn();
        },

        "_onStackViewAdd" : function(evt){
            this._addViewButton(evt.view, evt.index);
        },

        "_onStackViewMove" : function(evt){
            // TODO: add tab button move
        },

        "_onStackViewRemove" : function(evt){
            this._removeViewButton(evt.view, evt.index);
        },

        "_onStackViewReplace" : function(evt){
            const self = this,
                btn = self._activeButton(),
                view = evt.view,
                active = self._stack.active_view,
                old_css = active ? active.nav_css : null,
                new_css = view.nav_css;

            btn.label = OJ.copy(view.short_title);
            btn.icon = OJ.copy(view.icon);

            if(old_css){
                btn.removeCss(old_css);
            }

            if(new_css){
                btn.addCss(new_css);
            }
        },

        "_onTabPress" : function(evt){
            const stack = this._stack,
                cur_i = stack.active_index;

            let new_i = this.indexOfChild(evt.current_target);

            if(this._on_tab_press){
                this._on_tab_press(this, new_i, cur_i);
            }

            if(cur_i == new_i){
                return;
            }

            stack.active_index = new_i;
        },

        // getter & setters
        "=stack" : function(stack){
            if(this._stack == stack){
                return;
            }

            var ln;

            if(this._stack){
                this._stack.removeEventListener(OjStackEvent.ADD, this, "_onStackViewAdd");
                this._stack.removeEventListener(OjStackEvent.MOVE, this, "_onStackViewMove");
                this._stack.removeEventListener(OjStackEvent.REMOVE, this, "_onStackViewRemove");
                this._stack.removeEventListener(OjStackEvent.REPLACE, this, "_onStackViewReplace");

                // remove all the tabs
                ln = this.num_elms;

                for(; ln--;){
                    this._removeViewButton(this._stack.getElmAt(ln), ln);
                }
            }

            this._super(OjNavController, "=stack", arguments);

            if(stack){
                stack.addEventListener(OjStackEvent.ADD, this, "_onStackViewAdd");
                stack.addEventListener(OjStackEvent.MOVE, this, "_onStackViewMove");
                stack.addEventListener(OjStackEvent.REMOVE, this, "_onStackViewRemove");
                stack.addEventListener(OjStackEvent.REPLACE, this, "_onStackViewReplace");

                // process the stack
                ln = stack.num_elms;

                for(; ln--;){
                    this._addViewButton(stack.getElmAt(ln), 0);
                }

                this._updateActiveBtn();
            }
        }
    },
    {
        "_TAGS" : ["tab-nav", "tab-nav-controller"]
    }
);
