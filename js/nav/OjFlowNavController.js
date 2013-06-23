OJ.importJs('oj.nav.OjNavController');
OJ.importJs('oj.components.OjLabel');
OJ.importJs('oj.dom.OjStyleElement');
OJ.importJs('oj.events.OjEvent');
OJ.importJs('oj.events.OjStackEvent');
OJ.importJs('oj.fx.OjFade');
OJ.importJs('oj.fx.OjMove');
OJ.importJs('oj.fx.OjTweenSet');

OJ.importCss('oj.nav.OjFlowNavController');


'use strict';

window.OjIFlowNavController = {
	'_props_' : {
		'cancelLabel' : 'Cancel',
		'title'       : null
	},


	'_back_btn' : null,  '_cancel_btn' : null,  '_show_cancel' : false,

	'_template' : 'oj.nav.OjFlowNavController',  '_tween' : null,

	'bottom' : null,  'btmLeft' : null,  'btmRight' : null,  'btmTitle' : null,

	'title' : null,  'top' : null,  'topLeft' : null,  'topRight' : null,  'topTitle' : null,


	// helper functions
	'_makeBackButton' : function(view){
		var btn = new OjButton(view.getShortTitle());
		btn.addCss('back-button');

		return btn;
	},

	'_makeTitle' : function(title){
		var elm = new OjLabel(title);
		elm.setVAlign(OjStyleElement.MIDDLE);

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
		if(this._back_btn){
			this._back_btn.removeEventListener(OjMouseEvent.CLICK, this, '_onBackClick');
		}
		else if(this._cancel_btn){
			this._cancel_btn.removeEventListener(OjMouseEvent.CLICK, this, '_onCancelClick');
		}

		if(!cancel_view){
			if(index > 0){
				cancel_view =  this._makeBackButton(this._stack.getElmAt(index - 1));
			}
			else if(this._show_cancel){
				cancel_view = this._cancel_btn = new OjButton(this._cancelLabel);
			}
		}

		if(index > 0){
			this._back_btn = cancel_view;

			cancel_view.addEventListener(OjMouseEvent.CLICK, this, '_onBackClick');
		}
		else if(this._show_cancel){
			this._cancel_btn = cancel_view;

			cancel_view.addEventListener(OjMouseEvent.CLICK, this, '_onCancelClick');
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
			this.removeCss(['animating']);

			// make the necessary changes to the left, title & right bottom components components
			t.show();

			b.hide();

			bl.removeAllChildren();
			bt.removeAllChildren();
			br.removeAllChildren();

			return;
		}

		// setup the transition
		this.addCss('animating');

		this._tween = new OjTweenSet();

		// figure out the direction and then update
		var direction = 0,
			duration = transition.getDuration(),
			easing = transition.getEasing(),
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

			this._tween.addTween(new OjMove(b, OjMove.X, -1 * direction * .5, duration *.5), easing[1]);
			this._tween.addTween(new OjMove(t, OjMove.X, 0, duration, easing[1]));
		}
		else{
			t.setAlpha(0);
		}

		this._tween.addTween(new OjFade(b, OjFade.OUT, duration, easing[1]));
		this._tween.addTween(new OjFade(t, OjFade.IN, duration, easing[0]));


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

		this.removeCss(['animating']);
	},


	'showCancel' : function(){
		if(arguments.length){
			this._show_cancel = arguments[0];
		}

		return this._show_cancel;
	},

	'back' : function(){
		this._stack.removeElm(this._stack.getActive());

		this.dispatchEvent(new OjEvent(OjFlowNavController.BACK));
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
	},

	'setCancelLabel' : function(val){
		if(this._cancelLabel == val){
			return;
		}

		this._cancelLabel = val;

		if(this._cancel_btn){
			this._cancel_btn.setLabel(val);
		}
	}
};


OJ.extendComponent(
	OjNavController, 'OjFlowNavController',
	OJ.implementInterface(
		OjIFlowNavController,
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

				this._stack.setTransition(new OjTransition(OjTransition.SLIDE_HORZ, 250, [OjEasing.IN, OjEasing.OUT]));

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
		}
	),
	{
		'_TAGS' : ['flownav'],

		'BACK'     : 'onFlowNavBack'
	}
);