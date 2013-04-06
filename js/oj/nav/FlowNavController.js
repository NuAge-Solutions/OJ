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

window.OjIFlowNavController = {
	'_props_' : {
		'cancelLabel' : 'Cancel',
		'title'       : null
	},


	'_back_btn' : null,  '_cancel_btn' : null,  '_show_cancel' : false,

	'_template' : 'oj.nav.FlowNavController',  '_tween' : null,

	'bottom' : null,  'btmLeft' : null,  'btmRight' : null,  'btmTitle' : null,

	'title' : null,  'top' : null,  'topLeft' : null,  'topRight' : null,  'topTitle' : null,


	// helper functions
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

	'_update' : function(view, transition, index, old_index){
		// remove any old animations
		this._unset('_tween');

		// process the left, title & right components
		// setup the vars
		var t = this.top, tl = this.topLeft, tt = this.topTitle, tr = this.topRight,
			b = this.bottom, bl = this.btmLeft, bt = this.btmTitle, br = this.btmRight,
			left = tl.numChildren() ? this.topLeft.getChildAt(0) : null,
			center = tt.numChildren() ? tt.getChildAt(0) : null,
			right = tr.numChildren() ? tr.getChildAt(0) : null,
			action_view = view.getActionView(),
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
				bl.addChild(left);
			}

			if(cancel_view){
				tl.addChild(cancel_view);
			}
		}

		if(right != action_view){
			if(right){
				br.addChild(right);
			}

			if(action_view){
				tr.addChild(action_view);
			}
		}

		if(center != title_view){
			if(center){
				bt.addChild(center);
			}

			if(title_view){
				tt.addChild(title_view);
			}
		}

		// setup the top
		t.setX(0);
		t.setAlpha(1);

		b.setX(0);
		b.setAlpha(1);

		// check to see if we should animate or not
		var e = transition && transition.getEffect() ? transition.getEffect() : OjTransition.DEFAULT;

		if(e == OjTransition.NONE){
			// remove the animating css class since we aren't anymore
			this.removeClasses('animating');

			// make the necessary changes to the left, title & right bottom components components
			t.show();

			b.hide();

			bl.removeAllChildren();
			bt.removeAllChildren();
			br.removeAllChildren();

			return;
		}

		// setup the transition
		this.addClasses('animating');

		this._tween = new OjTweenSet();

		// figure out the direction and then update
		var direction = 0,
			duration = transition.getDuration(),
			width = this.getWidth();

		if(old_index != -1){
			if(old_index > index){
				direction = width * -.5;
			}
			else if(old_index < index){
				direction = width * .5;
			}
		}

		if(direction && e != OjTransition.FADE){
			// todo: OjFlowNavController - add support for multiple transition effects
			// update the display of the controller bar
			// setup the display
			b.setX(0);

			t.setX(direction);
			t.setAlpha(0);

			this._tween.addTween(new OjMove(b, OjMove.X, -1 * direction * .5, duration *.5));
			this._tween.addTween(new OjMove(t, OjMove.X, 0, duration));
		}
		else{

			t.setAlpha(0);
		}

		this._tween.addTween(new OjFade(b, OjFade.OUT, duration));
		this._tween.addTween(new OjFade(t, OjFade.IN, duration));


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
		this._update(evt.getView(), evt.getTransition(), evt.getIndex(), evt.getOldIndex());
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


OJ.extendComponent(
	OjNavController, 'OjFlowNavController',
	OJ.implementInterface(
		OjIFlowNavController,
		{
			'_constructor' : function(/*stack*/){
				this._s('OjFlowNavController', '_constructor', []);

				// process the arguments
				if(arguments.length){
					this.setStack(arguments[0]);
				}
			},


			'_setupStack' : function(){
				this._s('OjFlowNavController', '_setupStack', arguments);

				this._stack.addEventListener(OjStackEvent.ADD, this, '_onStackAdd');
			},

			'_cleanupStack' : function(){
				this._s('OjFlowNavController', '_cleanupStack', arguments);

				if(this._stack){
					this._stack.removeEventListener(OjStackEvent.ADD, this, '_onStackAdd');
				}
			},


			'_onStackAdd' : function(evt){
				this._stack.setActive(evt.getView());
			}
		}
	),
	{
		'_TAGS' : ['flownav']
	}
);