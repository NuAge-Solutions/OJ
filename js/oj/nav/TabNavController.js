OJ.importJs('oj.nav.NavController');


'use strict';

OJ.extendClass(
	OjNavController, 'OjTabNavController',
	{
		// event listener callbacks
		'_onStackChange' : function(evt){

		},

		'_onStackViewAdd' : function(evt){
			var btn = new OjButton(evt.getView().getShortTitle());
			btn.addEventListener(OjMouseEvent.CLICK, this, '_onTabClick');

			this.addChildAt(btn, evt.getIndex());
		},

		'_onStackViewMove' : function(evt){

		},

		'_onStackViewRemove' : function(evt){
			this.removeElmAt(evt.getIndex());
		},

		'_onStackViewReplace' : function(evt){

		},

		'_onTabClick' : function(evt){
			this._stack.setActiveIndex(this.indexOfChild(evt.getTarget()));
		},

		// getter & setters
		'setStack' : function(stack){
			if(this._stack){
				this._stack.removeEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
				this._stack.removeEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
				this._stack.removeEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
				this._stack.removeEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');
			}

			this._super('OjTabNavController', 'setStack', arguments);

			if(stack){
				stack.addEventListener(OjStackEvent.ADD, this, '_onStackViewAdd');
				stack.addEventListener(OjStackEvent.MOVE, this, '_onStackViewMove');
				stack.addEventListener(OjStackEvent.REMOVE, this, '_onStackViewRemove');
				stack.addEventListener(OjStackEvent.REPLACE, this, '_onStackViewReplace');
			}
		}
	}
);