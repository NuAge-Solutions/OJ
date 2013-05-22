OJ.importJs('oj.components.OjComponent');


'use strict';


window.OjINavController = {
	'_props_' : {
		'stack'   : null
	},


	'_setupStack' : function(){
		this._stack.addEventListener(OjStackEvent.CHANGE, this, '_onStackChange');
	},

	'_cleanupStack' : function(){
		if(this._stack){
			this._stack.removeEventListener(OjStackEvent.CHANGE, this, '_onStackChange');
		}
	},


	// event listener callbacks
	'_onStackChange' : function(evt){},



	// stack view functions
	// todo: enable animated flag option for nav stack view functions
	'addView' : function(view/*, animated = true*/){
		var s = this._stack;

		return s.addElm.apply(s, arguments);
	},

	'addViewAt' : function(view, index/*, animated = true*/){
		var s = this._stack;

		return s.addElmAt.apply(s, arguments);
	},

	'gotoView' : function(/*view = root, animated = true*/){
		var args = arguments,
			ln = args.length, index,
			view = ln ? args[0] : null,
			animated = ln > 1 ? args[1] : true;

		// if no view is specified we go all the way back to the root
		// if a new view is specified we go all the way back to root and replace with new view
		if(!view || (index = this.indexOfView(view)) > -1){
			return this.gotoViewAt(index, animated);
		}

		if(index = this.getActiveIndex()){
			this.replaceViewAt(0, view);

			return this.gotoViewAt(0);
		}

		this.replaceActive(view, animated);
	},

	'gotoViewAt' : function(index/*, animated = true*/){
		var s = this._stack;

		return s.setActiveIndex.apply(s, arguments);
	},

	'hasView' : function(view){
		return this._stack.hasElm(view);
	},

	'indexOfView' : function(view){
		return this._stack.indexOfElm(view);
	},

	'removeActive' : function(/*animated = true*/){
		return this.removeViewAt(this._stack.getActiveIndex(), arguments.length ? arguments[0] : true);
	} ,

	'removeView' : function(view/*, animated = true*/){
		var s = this._stack;

		return s.removeElm.apply(s, arguments);
	},

	'removeViewAt' : function(view, index/*, animated = true*/){
		var s = this._stack;

		return s.removeElmAt.apply(s, arguments);
	},

	'replaceActive' : function(view/*, animated = true*/){
		var s = this._stack,
			args = arguments;

		return s.replaceElmAt(this.getActiveIndex(), view, args.length > 1 ? args[0] : true);
	},

	'replaceView' : function(oldView, newView/*, animated = true*/){
		var s = this._stack;

		return s.replaceElm.apply(s, arguments);
	},

	'replaceViewAt' : function(index, newView/*, animated = true*/){
		var s = this._stack;

		return s.replaceElmAt.apply(s, arguments);
	},


	// getter & setter functions
	'getActiveView' : function(){
		return this._stack.getActive();
	},
	'setActiveView' : function(val){
		this._stack.setActive(val);
	},

	'getActiveIndex' : function(){
		return this._stack.getActiveIndex();
	},
	'setActiveIndex' : function(val){
		this._stack.setActiveIndex(val);
	},

	'setStack' : function(stack){
		if(this._stack){
			if(this._stack == stack){
				return;
			}

			this._cleanupStack();
		}

		this._stack = stack;

		stack.setController(this);

		this._setupStack();
	}
};


OJ.extendComponent(
	OjComponent, 'OjNavController',
	OJ.implementInterface(
		OjINavController,
		{
			'_constructor' : function(/*stack*/){
				this._super('OjNavController', '_constructor', []);

				// process the arguments
				if(arguments.length){
					this.setStack(arguments[0]);
				}
			},

			'_destructor' : function(){
				this._cleanupStack();

				return this._super('OjNavController', '_destructor', arguments);
			}
		}
	),
	{
		'_TAGS' : ['nav', 'navcontroller']
	}
);