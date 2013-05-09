/*
 * Note: Stack requires defined dimensions for transitions to work properly
 */
OJ.importJs('oj.data.OjCollection');
OJ.importJs('oj.components.OjComponent');
OJ.importJs('oj.events.OjCollectionEvent');
OJ.importJs('oj.events.OjStackEvent');
OJ.importJs('oj.fx.OjEasing');
OJ.importJs('oj.fx.OjFade');
OJ.importJs('oj.fx.OjMove');
OJ.importJs('oj.fx.OjResize');
OJ.importJs('oj.fx.Ojtransition');
OJ.importJs('oj.fx.OjTweenSet');

OJ.importCss('oj.nav.OjStack');


'use strict';

OJ.extendComponent(
	OjComponent, 'OjStack',
	OJ.implementInterface(
		OjICollection,
		{
			// Properties & Vars
			'_props_' : {
				'active'         : null,
				'activeIndex'    : -1,
				'allowLooping'   : false, // todo: OjStack - add support for looping
				'autoSizeHeight' : false, // todo: OjStack - add support for auto size height
				'autoSizeWidth'  : false, // todo: OjStack - add support for auto size width
				'controller'     : null,
				'transition'     : null,
				'views'          : null
			},

			'_current_index' : 0,  '_deferred_index' : null,  '_prev_active' : null,  '_prev_index' : -1,  '_trans_in' : null,  '_trans_out' : null,


			// Construction & Destruction Functions
			'_constructor' : function(/*views, transition*/){
				this._super('OjStack', '_constructor', arguments);

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

				// set the default transition mode
				var args = arguments,
					ln = args.length;

				this.setViews(ln ? args[0] : []);

				this.setTransition(ln > 1 ? args[1] : OjTransition.NONE);
			},

			'_destructor' : function(){
				var args = arguments,
					depth = args.length && args[0];

				// remove the views listeners
				this._removeViewsListeners();

				// unset transitions
				this._unset('_trans_in', true);
				this._unset('_trans_out', true);

				// unset previous active
				if(this._prev_active){
					this._removeActive(this._prev_active);

					this._prev_active.setStack(null);
					this._prev_active.setController(null);

					this._prev_active = null;
				}

				// unset current active
				if(this._active){
					this._removeActive();

					this._active.setStack(null);
					this._active.setController(null);

					this._active = null;
				}

				// unset views
				if(depth > 1){
					var ln = this.numElms();

					for(; ln--;){
						OJ.destroy(this.getElmAt(ln), depth);
					}
				}

				// remove object references
				this._controller = this._transition = this._views = null;

				return this._super('OjStack', '_destructor', arguments);
			},


			// Element Management Functions
			'_setElmFuncs' : function(container){ },

			'_callElmFunc' : function(func, args){
				if(!this._elm_funcs[func]){
					return;
				}

				// detect transition flag
				var trans = this._transition,
					index = -1;

				switch(func){
					case 'removeAllElms':
						index = 0;
					break;

					case 'addElm':
					case 'removeElm':
					case 'removeElmAt':
						index = 1;
					break;

					case 'addElmAt':
					case 'moveElm':
					case 'replaceElm':
					case 'replaceElmAt':
						index = 2;
					break;
				}

				// handle transition flag
				if(index > -1){
					if(args.length > index){
						this.setTransition(this._processTransParam(args[index]));

						args.pop();
					}
				}

				// call the elm func
				var rtrn = this._views[this._elm_funcs[func]].apply(this._views, args)

				// return transition to previous state
				if(index > -1){
					this.setTransition(trans);
				}

				return rtrn;
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

			'_createTransIn' : function(elm, direction){
				var amount = 0;

				switch(this._transition.getEffect()){
					case OjTransition.FADE:
						elm.setX(0);
						elm.setY(0);

						if(this._prev_active){
							return null;
						}

						amount = 1;
					break;

					case OjTransition.SLIDE_HORZ:
						elm.setX(-1 * direction * this.container.getWidth());
					break;

					case OjTransition.SLIDE_VERT:
						elm.setY(-1 * direction * this.container.getHeight());
					break;
				}

				return this._transition.make(elm, OjTransition.IN, amount);
			},

			'_createTransOut' : function(elm, direction){
				var amount = 0;

				switch(this._transition.getEffect()){
					case OjTransition.SLIDE_HORZ:
						amount = elm.getX() + (direction * this.container.getWidth());
					break;

					case OjTransition.SLIDE_VERT:
						amount = elm.getY() + (direction * this.container.getHeight());
					break;
				}

				return this._transition.make(elm, OjTransition.OUT, amount);
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

			'_removeActive' : function(/*elm*/){
				var args = arguments,
					elm = args.length ? args[0] : this.getElmAt(this._activeIndex);

				elm.setIsActive(false);

				this.container.removeChild(elm);
			},

			'_removeViewsListeners' : function(){
				// remove the event listeners
				this._views.removeEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
				this._views.removeEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
				this._views.removeEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
				this._views.removeEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');
			},


			// Event Handler Functions
			'_onItemAdd' : function(evt){
				this.dispatchEvent(new OjStackEvent(OjStackEvent.ADD, evt.getItem(), this._transition, evt.getIndex()));

				if(!this._active){
					this.setActiveIndex(evt.getIndex());
				}
				else{
					this._current_index = this.indexOfElm(this._active);
				}
			},

			'_onItemMove' : function(evt){
				this.dispatchEvent(new OjStackEvent(OjStackEvent.MOVE, evt.getItem(), this._transition, evt.getIndex()));

				if(this._active == evt.getItem()){
					this._current_index = evt.getIndex();
					// todo: add logic for stack item move current_index
				}
			},

			'_onItemRemove' : function(evt){
				this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, evt.getItem(), this._transition, evt.getIndex()));

				var item = evt.getItem();

				if(this._active == item){
					var ln;

					if(this._current_index){
						this.setActiveIndex(this._current_index - 1);
					}
					else if(ln = this.numElms()){
						this.setActiveIndex(ln - 1);
					}
					else{
						this._active = null;
						this._current_index = -1;
					}
				}
				else{
					if(this._prev_active == item){
						this._prev_active = null;
					}

					this._current_index = this.indexOfElm(this._active);
				}
			},

			'_onItemReplace' : function(evt){
				this.dispatchEvent(new OjStackEvent(OjStackEvent.REPLACE, evt.getItem(), this._transition, evt.getIndex()));

				if(this._activeIndex == evt.getIndex()){
					// remove the old active
					this._removeActive();

					// add the new active
					this._addActive(this._active = evt.getItem());
				}
			},

			'_onTransIn' : function(evt){
				this._unset('_trans_in');

				this._setIsAnimating(false);

				this.dispatchEvent(new OjStackEvent(OjStackEvent.CHANGE_COMPLETE, this._active, this._transition, this._activeIndex, this._prev_index));

				if(!isNull(this._deferred_index)){
					this.setActiveIndex(this._deferred_index);
				}
			},

			'_onTransOut' : function(evt){
				this._prev_active.removeClasses('prev-active');

				this._removeActive(this._prev_active);

				this._prev_active.setWidth(OjStyleElement.AUTO);
				this._prev_active.setHeight(OjStyleElement.AUTO);
				this._prev_active.setStack(null);
				this._prev_active.setController(null);

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
			'setActive' : function(val/*, transition = true*/){
				if((arguments[0] = this.indexOfElm(val)) > -1){
					this.setActiveIndex.apply(this, arguments);
				}
			},


			// Getter & Setter Functions
			'setActiveIndex' : function(val/*, transition = true*/){
				// handle custom transition if it exists
				var trans = this._transition,
					trans_diff = arguments.length > 1;

				if(trans_diff){
					this.setTransition(this._processTransParam(arguments[1]));
				}

				// check for change
				if(this._current_index == val && this._active){
					return;
				}

				// if we are in the middle of an animation then deffer the change until afterward
				if(this._trans_in){
					this._deferred_index = val;

					return;
				}

				this._deferred_index = null;

				var elm,
					w = null,
					h = null,
					direction = null;

				this._current_index = val;
				this._prev_index = -1;

				// transition out the old active container
				if(this._active){
					// get the old element
					this._prev_index = this._activeIndex;
					this._prev_active = this._active;

					// update the direction
					direction = this._animationDirection(this._prev_index, val);

					// create the transition out animation
					if(this._trans_out = this._createTransOut(this._prev_active, direction)){
						this._prev_active.addClasses('prev-active');

						this._trans_out.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransOut');
						this._trans_out.start();
					}

					this._active.unload();
				}
				else{
					this._unset('_trans_out');
				}

				// make sure we have something to set active
				if(!this.numElms()){
					this._activeIndex = 0;
					this._current_index = 0;
					this._active = null;

					return;
				}

				// create the change event
				var evt = new OjStackEvent(OjStackEvent.CHANGE, elm = this.getElmAt(this._activeIndex = val), this._transition, val, this._prev_index);

				// set the elm as active and update the stack and controller vars
				(this._active = elm).setStack(this);
				elm.setController(this._controller);

				this._active.load();

				this._addActive(elm);


				// transition in the new active container
				// but only if we are transitioning out an old active
				if(this._trans_out){
					if(direction && (this._trans_in = this._createTransIn(elm, direction))){
						this._trans_in.addEventListener(OjTweenEvent.COMPLETE, this, '_onTransIn');
						this._trans_in.start();
					}

					this._setIsAnimating(true);
				}
				// if no transition then just remove the old active view
				else if(this._prev_active){
					this._removeActive(this._prev_active);
				}

				if(trans_diff){
					this.setTransition(trans);
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
			},

			'setController' : function(val){
				if(this._controller == val){
					return;
				}

				this._controller = val;

				val.setStack(this);

				if(this._active){
					this._active.setController(val);
				}
			},

			'setTransition' : function(val){
				if(this._transition == val){
					return;
				}

				this._transition = OjTransition.transition(val, this._transition);
			},

			'setViews' : function(val){
				if(this._views == val){
					return;
				}

				if(this._views){
					this._removeViewsListeners();
				}

				// set the new views collection
				this._views = OjCollection.collection(val);

				this._views.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
				this._views.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
				this._views.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
				this._views.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');

				// transition to the new views
				this._current_index = -1;

				this.setActiveIndex(this._activeIndex);
			}
		}
	),
	{
		'_TAGS' : ['stack']
	}
);