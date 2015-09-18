OJ.importJs('oj.nav.OjNavController');

OJ.importCss('oj.nav.OjTabNavController');


OJ.extendComponent(
    'OjTabNavController', [OjNavController],
    {
        '_prev_active' : null,


        '_addViewButton' : function(view, index){
            var btn = new OjButton(view.shortTitle, view.icon);
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
                this._prev_active.isActive = false;
            }

            if(this._prev_active = this.getChildAt(this._stack.activeIndex)){
                this._prev_active.isActive = true;
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
            this._stack.activeIndex = this.indexOfChild(evt.currentTarget);

            this._updateActiveBtn();
        },

        '_onViewIconChange' : function(evt){
            var view = evt.currentTarget;

            this.getChildAt(this._stack.indexOfElm(view)).icon = view.icon;
        },

        '_onViewTitleChange' : function(evt){
            var view = evt.currentTarget;

            this.getChildAt(this._stack.indexOfElm(view)).label = view.shortTitle;
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
                ln = this.numElms;

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
                ln = stack.numElms;

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