OJ.importJs('oj.nav.NavController');
OJ.importJs('oj.components.Label');
OJ.importJs('oj.dom.StyleElement');
OJ.importJs('oj.events.Event');
OJ.importJs('oj.events.StackEvent');
OJ.importJs('oj.fx.Fade');
OJ.importJs('oj.fx.Move');
OJ.importJs('oj.fx.TweenSet');

OJ.importCss('oj.nav.FlowNavController');


'use strict';

oj.nav.IFlowNavController = {
	'_properties_' : {
		'cancelLabel' : 'Cancel',
		'title'       : null
	},


	'_back_btn' : null,  '_cancel_btn' : null,  '_show_cancel' : false,

	'_template' : 'oj.nav.FlowNavController',  '_tween' : null,

	'bottom' : null,  'btmLeft' : null,  'btmRight' : null,  'btmTitle' : null,

	'title' : null,  'top' : null,  'topLeft' : null,  'topRight' : null,  'topTitle' : null,


	// helper functions
	'_makeBackButton' : function(view){
		var btn = new OjButton(view.getShortTitle());
		btn.addClasses('back-button');

		return btn;
	},

	'_makeTitle' : function(title){
		var elm = new OjLabel(title);
		elm.addClasses('valign-middle');

		return elm;
	},


	'_update' : function(view, index, old_index){
		// setup the transition
		this.addClasses('animating');

		this._unset('tween');

		this._tween = new OjTweenSet();

		// figure out the direction and then update
		var direction = 0,
			duration = 250,
			width = this.getWidth();

		if(old_index != -1){
			if(old_index > index){
				direction = width * -.5;
			}
			else if(old_index < index){
				direction = width * .5;
			}
		}

		if(direction){
			// update the display of the controller bar
			// setup the display
			this.bottom.setX(0);

			this.top.setX(direction);
			this.top.setAlpha(0);

			this._tween.addTween(new OjMove(this.bottom, OjMove.X, -1 * direction * .5, duration *.5));
			this._tween.addTween(new OjMove(this.top, OjMove.X, 0, duration));
		}
		else{
			this.top.setX(0);
			this.top.setAlpha(0);
		}

		this._tween.addTween(new OjFade(this.bottom, OjFade.OUT, duration * .5));
		this._tween.addTween(new OjFade(this.top, OjFade.IN, duration));

		// setup the vars
		var left = this.topLeft.numChildren() ? this.topLeft.getChildAt(0) : null,
			center = this.topTitle.numChildren() ? this.topTitle.getChildAt(0) : null,
			right = this.topRight.numChildren() ? this.topRight.getChildAt(0) : null;

		var action_view = view.getActionView(),
			cancel_view  = view.getCancelView(),
			title_view = view.getTitleView(),
			title;

		// if there is no title view than try to make one from the title
		if(!title_view && (title = view.getTitle())){
			title_view = this._makeTitle(title);
		}

		// figure out default values
		if(!cancel_view){
			if(index > 0){
				if(this._back_btn){
					this._back_btn.removeEventListener(OjMouseEvent.CLICK, this, '_onBackClick');
				}

				cancel_view = this._back_btn = this._makeBackButton(this._stack.getElmAt(index - 1));

				cancel_view.addEventListener(OjMouseEvent.CLICK, this, '_onBackClick');
			}
			else if(this._show_cancel){
				if(this._cancel_btn){
					this._cancel_btn.removeEventListener(OjMouseEvent.CLICK, this, '_onCancelClick');
				}

				cancel_view = this._cancel_btn = new OjButton(this._cancelLabel);
				cancel_view.addEventListener(OjMouseEvent.CLICK, this, '_onCancelClick');
			}
		}

		// figure out the transition
		if(left != cancel_view){
			if(left){
				this.btmLeft.addChild(left);
			}

			if(cancel_view){
				this.topLeft.addChild(cancel_view);
			}
		}

		if(right != action_view){
			if(right){
				this.btmRight.addChild(right);
			}

			if(action_view){
				this.topRight.addChild(action_view);
			}
		}

		if(center != title_view){
			if(center){
				this.btmTitle.addChild(center);
			}

			if(title_view){
				this.topTitle.addChild(title_view);
			}
		}

		// start the transition
		this._tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTweenComplete');

		this._tween.start();
	},


	// event handler functions
	'_onBackClick' : function(evt){
		this.back();
	},

	'_onCancelClick' : function(evt){
		this.dispatchEvent(new OjEvent(OjEvent.CANCEL, false));
	},

	'_onBackComplete' : function(evt){
		this._stack.removeItemAt(this._stack.numItems() - 1);

		this._stack.removeEventListener(OjStackEvent.CHANGE_COMPLETE, this, '_onBackComplete');
	},

	'_onStackChange' : function(evt){
		this._update(evt.getView(), evt.getIndex(), evt.getOldIndex());
	},

	'_onTweenComplete' : function(evt){
		this._unset('_tween');

		this.btmLeft.removeAllChildren();
		this.btmTitle.removeAllChildren();
		this.btmRight.removeAllChildren();

		this.removeClasses('animating');
	},


	'showCancel' : function(){
		if(arguments.length){
			this._show_cancel = arguments[0];
		}

		return this._show_cancel;
	},

	'back' : function(){
		this._stack.removeElm(this._stack.getActive());
	},


	'setTitle' : function(title){
		if(this._title == title){
			return;
		}

		if(!this.title){
			this.title = this._makeTitle();

			this.topTitle.addChild(this.title);
		}

		this.title.setText(this._title = title);
	}
};


OJ.compileComponent(
	'OjFlowNavController',
	oj.nav.FlowNavController = function(){
		return new oj.nav.NavController(
			arguments, 'OjFlowNavController',
			OJ.implementsClass(
				{
					'_constructor' : function(/*stack*/){
						this._super('OjFlowNavController', '_constructor', []);

						// process the arguments
						if(arguments.length){
							this.setStack(arguments[0]);
						}
					},


					'_setupStack' : function(){
						this._super('OjFlowNavController', '_setupStack', arguments);

						this._stack.addEventListener(OjStackEvent.ADD, this, '_onStackAdd');
					},

					'_cleanupStack' : function(){
						this._super('OjFlowNavController', '_cleanupStack', arguments);

						if(this._stack){
							this._stack.removeEventListener(OjStackEvent.ADD, this, '_onStackAdd');
						}
					},


					'_onStackAdd' : function(evt){
						this._stack.setActive(evt.getView());
					}
				},
				oj.nav.IFlowNavController
			)
		);
	},
	{
		'SUPPORTED_TAGS' : ['flownav']
	}
);