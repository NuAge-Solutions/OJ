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

OJ.importCss('oj.components.OjStack');


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
				'alwaysTrans'    : false,
				'autoSizeHeight' : false, // todo: OjStack - add support for auto size height
				'autoSizeWidth'  : false, // todo: OjStack - add support for auto size width
				'itemRenderer'   : null,
				'items'          : null,
				'transition'     : null
			},

			'_active_elm' : null,  '_current_index' : 0,  '_deferred_active' : null,

			'_prev_active' : null,  '_prev_index' : -1,  '_trans_in' : null,  '_trans_out' : null,


			// Construction & Destruction Functions
			'_constructor' : function(/*items, transition, item_renderer*/){
				this._super('OjStack', '_constructor', []);

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

				if(ln > 2){
					this.setItemRenderer(args[2]);
				}

				this.setTransition(ln > 1 ? args[1] : OjTransition.NONE);

				this.setItems(ln ? args[0] : []);
			},

			'_destructor' : function(){
				var args = arguments,
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
					var ln = this.numElms();

					for(; ln--;){
						OJ.destroy(this.getElmAt(ln), depth);
					}
				}

				this._unset('_items');

				// remove object references
				this._controller = this._transition = this._items = null;

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
					ln = args.length,
					index = -1;

				switch(func){
					case 'removeAllElms':
						index = 0;
					break;

					case 'removeElmAt':
						if(ln){
							args[0] = this._processIndex(args[0]);
						}
					case 'addElm':
					case 'removeElm':
						index = 1;
					break;

					case 'addElmAt':
					case 'replaceElmAt':
						if(ln > 1){
							args[1] = this._processIndex(args[1]);
						}
					case 'moveElm':
					case 'replaceElm':

						index = 2;
					break;

					case 'getElmAt':
						if(ln){
							args[0] = this._processIndex(args[0]);
						}
					break;
				}

				// handle transition flag
				if(index > -1){
					if(ln > index){
						this.setTransition(this._processTransParam(args[index]));

						args.pop();
					}
				}

				// call the elm func
				var rtrn = this._items[this._elm_funcs[func]].apply(this._items, args)

				// return transition to previous state
				if(index > -1){
					this.setTransition(trans);
				}

				return rtrn;
			},

			'_processDomSourceChild' : function(dom_elm, context){
				if(OjElement.isTextNode(dom_elm)){
					return false;
				}

				return this._super('OjStack', '_processDomSourceChild', arguments);
			},

			'_processDomSourceChildren' : function(dom_elm, context){
				var child, parent,
					children = dom_elm.childNodes,
					i = 0,
					ln = children.length;

				for(; i < ln; i++){
					if(child = this._processDomSourceChild(children[i], context)){
						// remove the child from the dom
						if(parent = child.parent()){
							parent.removeChild(child);
						}
						// force no parent
						else{
							child.setParent(null);
						}

						// add the child to our stack
						this.addElm(child);

						// if we add then we need to decrement the counter and length since
						// a child will have been removed from the child nodes array
						i--;
						ln--;
					}
				}
			},

			// Helper Functions
			'_addActive' : function(item, index){
				var renderer = this._itemRenderer;

				this._active = item;
				this._activeIndex = index;

				this._addActiveElm(this.renderItem(item));
			},

			'_addActiveElm' : function(elm){
				elm.setIsActive(true);

				this.container.addChild(elm);
			},

			'_animationDirection' : function(start, finish){
				return start < finish ? -1 : 1;
			},

			'_dispatchChangeComplete' : function(){
				this.dispatchEvent(new OjStackEvent(OjStackEvent.CHANGE_COMPLETE, this._active, this._transition, this._activeIndex, this._prev_index));
			},

			'_makeTransIn' : function(direction){
				this._unset('_trans_in');

				if(!direction){
					return null;
				}

				var amount = 0,
					elm = this.container.getChildAt(
						Math.bounds(this.container.numChildren() - 1, 0, 1)
					);

				switch(this._transition.getEffect()){
					case OjTransition.FADE:
						if(this._trans_out){
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
				this._unset('_trans_out');

				var amount = 0,
					elm = this.container.getChildAt(0);

				switch(this._transition.getEffect()){
					case OjTransition.SLIDE_HORZ:
						amount = elm.getX() + (direction * this.container.getWidth());
					break;

					case OjTransition.SLIDE_VERT:
						amount = elm.getY() + (direction * this.container.getHeight());
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

				return this._trans_out;
			},

			'_processIndex' : function(index){
				var ln = this.numItems();

				if(this._allowLooping){
					index = index % ln;

					// set the active
					if(index < 0){
						return ln + index;
					}

					return index;
				}

				return Math.bounds(index, 0, ln - 1);
			},

			'_prepareItems' : function(){
				if(this._items){
					return;
				}

				var items = (this._items = new OjCollection());

				items.addEventListener(OjCollectionEvent.ITEM_ADD, this, '_onItemAdd');
				items.addEventListener(OjCollectionEvent.ITEM_MOVE, this, '_onItemMove');
				items.addEventListener(OjCollectionEvent.ITEM_REMOVE, this, '_onItemRemove');
				items.addEventListener(OjCollectionEvent.ITEM_REPLACE, this, '_onItemReplace');

				return items;
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

			'_removeActive' : function(/*item*/){
				var args = arguments,
					item = args.length ? args[0] : this.getItemAt(this._activeIndex);

				if(item){
					var renderer = this._itemRenderer,
						elm = item;

					// find the matching elm
					if(renderer){
						var ln = this.container.numChildren();

						// NOTE: this will not function properly if it can't find a match since it sets the elm on each pass
						for(; ln--;){
							elm = this.container.getChildAt(ln);

							if(elm.getData() == item){
								break;
							}
						}
					}

					this._removeActiveElm(elm);
				}
			},

			'_removeActiveElm' : function(elm){
				// remove the elm from the display
				this.container.removeChild(elm);

				elm.removeCss(['prev-active']);
				elm.setWidth(OjStyleElement.AUTO);
				elm.setHeight(OjStyleElement.AUTO);

				// if this was a generated element then we can dispose of it
				if(this._itemRenderer){
					OJ.destroy(elm);
				}
				// otherwise update this elm as not active
				else{
					elm.setIsActive(false);
				}
			},


			// Event Handler Functions
			'_onItemAdd' : function(evt){
				// since we are using a collection to keep track of things the parent won't get properly changes
				// so we need to do it here
				var index = evt.getIndex(),
					item = evt.getItem();

				this.dispatchEvent(new OjStackEvent(OjStackEvent.ADD, item, this._transition, index));

				if(!this._active){
					this.setActiveIndex(index);
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
				var item = evt.getItem(),
					index = evt.getIndex();

				this.dispatchEvent(new OjStackEvent(OjStackEvent.REMOVE, item, this._transition, index));

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
				var item = evt.getItem(),
					index = evt.getIndex();

				this.dispatchEvent(new OjStackEvent(OjStackEvent.REPLACE, item, this._transition, index));

				if(this._activeIndex == index){
					// remove the old active
					this._removeActive(this._active);

					// add the new active
					this._addActive(item, this._activeIndex);
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

				// process any deferred
				if(!isNull(this._deferred_active)){
					this.setActiveIndex.apply(this, this._deferred_active);
				}
			},

			'_onTransOut' : function(evt){
				// cleanup the transition
				this._unset('_trans_out');

				// remove the previously active item/elm
				this._removeActive(this._prev_active);

				// if there are no more transitions get us out of animating mode
				if(!this._trans_in){
					this._setIsAnimating(false);

					// dispatch the change is complete
					this._dispatchChangeComplete();
				}

				// unset prev vars since they are no longer needed
				this._prev_active = null;
				this._prev_index = null;
			},


			// Utility Functions
			'next' : function(){
				this.setActiveIndex(this._current_index + 1);
			},

			'prev' : function(){
				this.setActiveIndex(this._current_index - 1);
			},

			'renderItem' : function(item){
				return this._itemRenderer ? new this._itemRenderer(this, item) : item;
			},


			// Getter & Setter Functions
			'setActive' : function(val/*, transition = true*/){
				if((arguments[0] = this.indexOfElm(val)) > -1){
					this.setActiveIndex.apply(this, arguments);
				}
			},


			// Getter & Setter Functions
			'setActiveIndex' : function(val/*, transition = true*/){
				// check for change
				if(this._current_index == val && this._active){
					return;
				}

				// if we are in the middle of an animation then deffer the change until afterward
				if(this._trans_in){
					this._deferred_active = arguments;

					return;
				}

				// handle custom transition if it exists
				var trans = this._transition,
					trans_diff = arguments.length > 1;

				if(trans_diff){
					this.setTransition(this._processTransParam(arguments[1]));
				}

				this._deferred_active = null;

				var item,
					direction = this._alwaysTrans ? 1 : 0;

				this._current_index = val;
				this._prev_index = -1;

				// transition out the old active container
				if(this._active){
					// get the old element
					this._prev_active = this._active;

					// update the direction
					// create the transition out animation
					this._makeTransOut(direction = this._animationDirection(this._prev_index = this._activeIndex, val));
				}

				// make sure we have something to set active
				if(!this.numElms()){
					this._activeIndex = 0;
					this._current_index = 0;
					this._active = null;

					return;
				}

				val = this._processIndex(val);

				// create the change event
				var evt = new OjStackEvent(OjStackEvent.CHANGE, item = this.getItemAt(val), this._transition, val, this._prev_index);

				this._addActive(item, val);

				// transition in the new active container
				// but only if we are transitioning out an old active
				if(this._trans_out || this._alwaysTrans){
					this._makeTransIn(direction);
				}

				if(trans_diff){
					this.setTransition(trans);
				}

				// dispatch the change event
				this.dispatchEvent(evt);

				// dispatch the change is complete
				// if no animation
				if(!this._trans_out && !this._alwaysTrans){
					this._dispatchChangeComplete();
				}
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

			'setTransition' : function(val){
				if(this._transition == val){
					return;
				}

				this._transition = OjTransition.transition(val, this._transition);
			}
		}
	),
	{
		'_TAGS' : ['stack']
	}
);