OJ.importJs('oj.nav.OjNavController');


'use strict';

OJ.extendComponent(
	OjNavController, 'OjTabNavController',
	{
		'_prev_active' : null,


		'_addViewButton' : function(view, index){
			var btn = new OjButton(view.getShortTitle(), view.getIcon());
			btn.setVAlign(OjStyleElement.TOP);
			btn.addEventListener(OjMouseEvent.CLICK, this, '_onTabClick');

			this.addChildAt(btn, index);
		},

		'_processDomSourceChildren' : function(dom, context){
			return;
		},

		'_removeViewButton' : function(view, index){
			OJ.destroy(this.removeElmAt(index));
		},

		'_updateActiveBtn' : function(){
//			if(this._prev_active){
//				this._prev_active.setIsActive(false);
//			}
//
//			(this._prev_active = this.getChildAt(this._stack.getActiveIndex())).setIsActive(true);
		},

		// event listener callbacks
		'_onStackChange' : function(evt){

		},

		'_onStackViewAdd' : function(evt){
			this._addViewButton(evt.getView(), evt.getIndex());
		},

		'_onStackViewMove' : function(evt){

		},

		'_onStackViewRemove' : function(evt){
			this._removeViewButton(evt.getView(), evt.getIndex());
		},

		'_onStackViewReplace' : function(evt){

		},

		'_onTabClick' : function(evt){
			this._stack.setActiveIndex(this.indexOfChild(evt.getCurrentTarget()));

			this._updateActiveBtn();
		},

		// getter & setters
		'setStack' : function(stack){
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
				ln = this.numElms();

				for(; ln--;){
					this._removeViewButton(this._stack.getElmAt(ln), ln);
				}
			}

			this._super('OjTabNavController', 'setStack', arguments);

			if(stack){
				stack.addEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
				stack.addEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
				stack.addEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
				stack.addEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');

				// process the stack
				ln = stack.numElms();

				for(; ln--;){
					this._addViewButton(stack.getElmAt(ln), 0);
				}

				this._updateActiveBtn();
			}
		}
	},
	{
		'_TAGS' : ['tabnav']
	}
);