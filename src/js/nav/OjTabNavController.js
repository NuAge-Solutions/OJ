importJs('oj.nav.OjNavController');


OJ.extendComponent(
    'OjTabNavController', [OjNavController],
    {
        '_prev_active' : null,


        '_addViewButton' : function(view, index){
            var btn = new OjButton(view.short_title, view.icon);
            btn.vAlign = OjStyleElement.TOP;
            btn.addEventListener(OjUiEvent.PRESS, this, '_onTabClick');

            view.addEventListener(OjView.ICON_CHANGE, this, '_onViewIconChange');
            view.addEventListener(OjView.TITLE_CHANGE, this, '_onViewTitleChange');

            this.insertChildAt(btn, index);
        },

        '_processDomSourceChildren' : function(dom, context){
            return;
        },

        '_removeViewButton' : function(view, index){
            OJ.destroy(this.removeElmAt(index));

            view.removeEventListener(OjView.ICON_CHANGE, this, '_onViewIconChange');
            view.removeEventListener(OjView.TITLE_CHANGE, this, '_onViewTitleChange');
        },

        '_updateActiveBtn' : function(){
            if(this._prev_active){
                this._prev_active.is_active = false;
            }

            if(this._prev_active = this.getChildAt(this._stack.active_index)){
                this._prev_active.is_active = true;
            }
        },

        // event listener callbacks
        '_onStackChange' : function(evt){
            this._updateActiveBtn();
        },

        '_onStackViewAdd' : function(evt){
            this._addViewButton(evt.view, evt.index);
        },

        '_onStackViewMove' : function(evt){

        },

        '_onStackViewRemove' : function(evt){
            this._removeViewButton(evt.view, evt.index);
        },

        '_onStackViewReplace' : function(evt){

        },

        '_onTabClick' : function(evt){
            this._stack.active_index = this.indexOfChild(evt.current_target);

            this._updateActiveBtn();
        },

        '_onViewIconChange' : function(evt){
            var view = evt.current_target;

            this.getChildAt(this._stack.indexOfElm(view)).icon = view.icon;
        },

        '_onViewTitleChange' : function(evt){
            var view = evt.current_target;

            this.getChildAt(this._stack.indexOfElm(view)).label = view.short_title;
        },


        // getter & setters
        '=stack' : function(stack){
            if(this._stack == stack){
                return;
            }

            var ln;

            if(this._stack){
                this._stack.removeEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
                this._stack.removeEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
                this._stack.removeEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
                this._stack.removeEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');

                // remove all the tabs
                ln = this.num_elms;

                for(; ln--;){
                    this._removeViewButton(this._stack.getElmAt(ln), ln);
                }
            }

            this._super(OjNavController, '=stack', arguments);

            if(stack){
                stack.addEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
                stack.addEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
                stack.addEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
                stack.addEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');

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
        '_TAGS' : ['tab-nav', 'tab-nav-controller']
    }
);