OJ.importJs('oj.components.Component');


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


	'getActive' : function(){
		return this._stack.getActive();
	},

	'getActiveIndex' : function(){
		return this._stack.getActiveIndex();
	},

	'setStack' : function(stack){
		if(this._stack){
			if(this._stack == stack){
				return;
			}

			this._cleanupStack();
		}

		this._stack = stack;

		this._setupStack();
	}
};


OJ.extendComponent(
	OjComponent, 'OjNavController',
	OJ.implementInterface(
		OjINavController,
		{
			'_constructor' : function(/*stack*/){
				this._s('OjNavController', '_constructor', []);

				// process the arguments
				if(arguments.length){
					this.setStack(arguments[0]);
				}
			},

			'_destructor' : function(){
				this._cleanupStack();

				return this._s('OjNavController', '_destructor', arguments);
			},



			// stack view functions
			'addView' : function(view/*, replace_current*/){
				if(this._stack){
					if(arguments.length > 1 && arguments[1]){
						return this._stack.replaceElmAt();
					}

					return this._stack.addElm(view);
				}

				throw new Error('No Stack');
			},

			'addViewAt' : function(view, index){
				if(this._stack){
					return this._stack.addElmAt(view, index);
				}

				throw new Error('No Stack');
			},

			'gotoView' : function(/*view = root*/){
				// if no view is specified we go all the way back to the root
				var view = arguments.length ? arguments[0] : null;

				this.gotoViewAt(view ? this.indexOfView(view) : 0);
			},

			'gotoViewAt' : function(index){
				if(this._stack){
					return this._stack.hasElm(view);
				}

				throw new Error('No Stack');
			},

			'hasView' : function(view){
				if(this._stack){
					return this._stack.hasElm(view);
				}

				throw new Error('No Stack');
			},

			'indexOfView' : function(view){
				if(this._stack){
					return this._stack.indexOfElm(view);
				}

				throw new Error('No Stack');
			},

			'removeView' : function(view){
				if(this._stack){
					return this._stack.removeElm(view);
				}

				throw new Error('No Stack');
			},

			'removeViewAt' : function(view, index){
				if(this._stack){
					return this._stack.removeElmAt(view, index);
				}

				throw new Error('No Stack');
			}
		}
	),
	{
		'_TAGS' : ['nav', 'navcontroller']
	}
);