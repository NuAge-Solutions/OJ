OJ.importJs('oj.data.Collection');
OJ.importJs('oj.components.Component');
OJ.importJs('oj.events.CollectionEvent');
OJ.importJs('oj.events.StackEvent');
OJ.importJs('oj.fx.Easing');
OJ.importJs('oj.fx.Fade');
OJ.importJs('oj.fx.Move');
OJ.importJs('oj.fx.Resize');
OJ.importJs('oj.fx.TweenSet');

OJ.importCss('oj.components.Stack');


'use strict';

OJ.extendComponent(
	OjComponent, 'OjStack',
	OJ.implementsClass(
		OjICollection,
		{
			// Properties & Vars
			'_props_' : {
				'active'         : null,
				'activeIndex'    : -1,
				'allowLooping'   : true,
				'autoSizeHeight' : false,
				'autoSizeWidth'  : false,
				'transition'     : null,
				'transDuration'  : 250,
				'transEasing'    : OjEasing.NONE,
				'views'          : null
			},

			'_current_index' : 0,  '_prev_active' : null,  '_prev_index' : -1,  '_trans_in' : null,  '_trans_out' : null,


			// Construction & Destruction Functions
			'_constructor' : function(/*transition, duration, easing*/){
				this._s('OjStack', '_constructor', arguments);

				// setup the elm function overrides
				this._elm_funcs = {
					'addElm'        : 'addItem',
					'addElmAt'      : 'addItemAt',
					'getElmAt'      : 'getItemAt',
					'getElms'       : 'getItems',
					'hasElm'        : 'hasItem',
					'indexOfElm'    : 'indexOfItem',
					'moveElm'       : 'moveItem',
					'numElms'       : 'numItems',
					'removeAllElms' : 'removeAllItems',
					'removeElm'     : 'removeItem',
					'removeElmAt'   : 'removeItemAt',
					'replaceElm'    : 'replaceItem',
					'replaceElmAt'  : 'replaceItemAt'
				};

				this._views = new OjCollection();
				this._views.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
				this._views.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
				this._views.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
				this._views.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');

				// set the default transition mode
				var ln = arguments.length;

				this.setTransition(ln ? arguments[0] : OjStack.NONE);

				if(ln > 1){
					this.setTransDuration(arguments[1]);

					if(ln > 2){
						this.setTransEasing(arguments[2]);
					}
				}
			},

			'_destructor' : function(){
				this._unset('_views');
				this._unset('_trans_in');
				this._unset('_trans_out');

				this._s('OjStack', '_destructor', arguments);
			},


			// Element Management Functions
			'_setElmFuncs' : function(container){ },

			'_callElmFunc' : function(func, args){
				if(!this._elm_funcs[func]){
					return;
				}

				return this._views[this._elm_funcs[func]].apply(this._views, args);
			},

			// Helper Functions
			'_addActive' : function(/*elm*/){
				var elm = arguments.length ? arguments[0] : this.getElmAt(this._activeIndex);
				elm.setIsActive(true);

				this.container.addChild(elm);
			},

			'_animationDirection' : function(start, finish){
				return start < finish ? -1 : 1;
			},

			'_createTrans' : function(elm, amount, duration, easing){
				if(this._transition == OjStack.NONE){
					return ;
				}

				if(this._transition == OjStack.FADE){
					return new OjFade(elm, amount ? OjFade.IN : OjFade.OUT, duration, easing);
				}

				if(this._transition == OjStack.SLIDE_HORZ){
					return new OjMove(elm, OjMove.X, amount, duration, easing);
				}

				if(this._transition == OjStack.SLIDE_VERT){
					return new OjMove(elm, OjMove.Y, amount, duration, easing);
				}
			},

			'_createTransIn' : function(elm, direction){
				var amount = 0,
					duration = this._transDuration,
					easing = this._transEasing;

				if(this._transition == OjStack.FADE){
					amount = 1; // force amount to 1 to mean fade in
				}
				else if(this._transition == OjStack.SLIDE_HORZ){
					elm.setX(-1 * direction * this.container.getWidth());
				}
				else if(this._transition == OjStack.SLIDE_VERT){
					elm.setY(-1 * direction * this.container.getHeight());
				}

				return this._createTrans(elm, amount, duration, easing);
			},

			'_createTransOut' : function(elm, direction){
				var amount = 0,
					duration = this._transDuration,
					easing = this._transEasing;

				if(this._transition == OjStack.SLIDE_HORZ){
					amount = elm.getX() + (direction * this.container.getWidth());
				}
				else if(this._transition == OjStack.SLIDE_VERT){
					amount = elm.getY() + (direction * this.container.getHeight());
				}

				return this._createTrans(elm, amount, duration, easing);
			},

			'_removeActive' : function(/*elm*/){
				var elm = arguments.length ? arguments[0] : this.getElmAt(this._activeIndex);
				elm.setIsActive(false);

				this.container.removeChild(elm);
			},


			// Event Handler Functions
			'_onItemAdd' : function(evt){
				this.dispatchEvent(new OjStackEvent(OjStackEvent.ADD, evt.getItem(), evt.getIndex()));

				if(!this._active){
					this.setActiveIndex(evt.getIndex());
				}
			},

			'_onItemMove' : function(evt){
				this.dispatchEvent(new OjStackEvent(OjStackEvent.MOVE, evt.getItem(), evt.getIndex()));

				if(this._active == evt.getItem()){
					this._activeIndex = evt.getIndex();
					// todo: add logic for stack item move current_index
				}
			},

			'_onItemRemove' : function(evt){
				this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, evt.getItem(), evt.getIndex()));

				if(this._active == evt.getItem()){
					if(this._activeIndex){
						this.setActiveIndex(this._activeIndex - 1);
					}
					else{
						this.setActiveIndex(this.numElms() - 1);
					}
				}
			},

			'_onItemReplace' : function(evt){
				this.dispatchEvent(new OjStackEvent(OjStackEvent.REPLACE, evt.getItem(), evt.getIndex()));

				if(this._activeIndex == evt.getIndex()){
					// remove the old active
					this._removeActive();

					// add the new active
					this._addActive(this._active = evt.getItem());
				}
			},

			'_onTransIn' : function(evt){
				this._unset('_trans_in');

				this.container.removeClasses('animating');

				this.dispatchEvent(new OjStackEvent(OjStackEvent.CHANGE_COMPLETE, this._activeIndex, this._prev_index));
			},

			'_onTransOut' : function(evt){
				this._prev_active.removeClasses('prev-active');

				this._removeActive(this._prev_active);

				this._prev_active.setWidth(OjStyleElement.AUTO);
				this._prev_active.setHeight(OjStyleElement.AUTO);

				this._unset('_trans_out');
				this._prev_active = null;
			},


			// Utility Functions
			'next' : function(){
				this.setActiveIndex(this._current_index + 1);
			},

			'prev' : function(){
				this.setActiveIndex(this._current_index - 1);
			},


			// Getter & Setter Functions
			'setActive' : function(val){
				var index = this.indexOfElm(val);

				if(index > -1){
					this.setActiveIndex(index);
				}
			},


			// Getter & Setter Functions
			'setActiveIndex' : function(val){
				if(this._current_index == val && this._active){
					return;
				}

				var elm, w = null, h = null, direction = null;

				this._current_index = val;
				this._prev_index = -1;

				// transition out the old active container
				if(this._active){
					// get the old element
					this._prev_index = this._activeIndex;
					this._prev_active = this._active;

					// update the direction
					direction = this._animationDirection(this._prev_index, val);

					this._prev_active.addClasses('prev-active');

					// create the transition out animation
					if(this._trans_out = this._createTransOut(this._prev_active, direction)){
						this._trans_out.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransOut');
						this._trans_out.start();
					}

					this.container.addClasses('animating');
				}
				else{
					this._trans_out = this._unset('_trans_out');
				}

				// make sure we have something to set active
				if(!this.numElms()){
					this._activeIndex = 0;
					this._current_index = 0;
					this._active = null;

					return;
				}

				// create the change event
				var evt = new OjStackEvent(OjStackEvent.CHANGE, elm = this.getElmAt(this._activeIndex = val), val, this._prev_index);

				this._addActive(this._active = elm);

				// transition in the new active container
				// but only if we are transitioning out an old active
				if(
					this._trans_out && direction &&
					(this._trans_in = this._createTransIn(elm, direction))
				){
					this._trans_in.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransIn');
					this._trans_in.start();
				}

				// dispatch the change event
				this.dispatchEvent(evt);
			},

			'setAllowLooping' : function(allow_looping){
				if(this._allowLooping == allow_looping){
					return;
				}

				// check to see if current index is out of bounds
				if(!(this._allowLooping = allow_looping)){
					var ln = this.numElms();

					if(this._current_index < 0){
						this.setActiveIndex((ln - this._current_index) % ln);
					}
					else if(this._current_index >= ln){
						this.setActiveIndex(this._current_index % ln);
					}
				}
			}
		}
	),
	{
		'NONE'       : 'none',
		'FADE'       : 'fade',
		'SLIDE_HORZ' : 'slide-horizontal',
		'SLIDE_VERT' : 'slide-vertical',
		'ZOOM'       : 'zoom',

		'_TAGS' : ['stack']
	}
);