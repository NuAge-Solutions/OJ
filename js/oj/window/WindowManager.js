OJ.importJs('oj.nav.Iframe');
OJ.importJs('oj.dom.StyleElement');
OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.fx.Fade');
OJ.importJs('oj.window.Modal');
OJ.importJs('oj.window.Alert');

OJ.importCss('oj.window.Modal');


'use strict';

OJ.extendManager(
	'WindowManager', OjActionable, 'OjWindowManager',
	{
		'_props_' : {
			'alertClass' : OjAlert,
			'modalClass' : OjModal
		},

		'_modal_holder' : null,  '_modals' : null,


		'_constructor' : function(manager){
			this._s('OjWindowManager', '_constructor', []);

			if(manager){
				this._modals = manager._modals;
				this._modal_holder = manager._modal_holder;

				if(!OJ.isReady()){
					OJ.removeEventListener(OjEvent.READY, manager, '_onOjReady');
					OJ.addEventListener(OjEvent.READY, this, '_onOjReady');
				}

				OJ.destroy(manager);
			}
			else{
				this._modals = [];

				this._modal_holder = new OjStyleElement();
				this._modal_holder.addClasses('WindowManager');

				this._modal_holder.hide();

				if(OJ.isReady()){
					this._onOjReady(null);
				}
				else{
					OJ.addEventListener(OjEvent.READY, this, '_onOjReady');
				}
			}
		},


		'_alert' : function(title, message/*, buttons, cancel_label*/){
			var ln = arguments.length,
				buttons = ln > 2 ? arguments[2] : [],
				cancel_label = 'Ok';

			if(ln > 3){
				cancel_label = arguments[3];
			}
			else if(ln > 2){
				cancel_label = 'Cancel';
			}

			var alrt = this.makeAlert(title, message, buttons, cancel_label);

			if(!buttons && !cancel_label){
				alrt.hideButtons();
			}

			alrt.addEventListener(OjEvent.HIDE, this, function(){
				OJ.destroy(alrt);
			});

			return alrt;
		},

		'_calcBrowserWidth' : function(){
			var vp = OJ.getViewport();

			if(OJ.isMobile()){
				return vp.width;
			}

			if(OJ.isTablet() && vp.width > 540){
				return 540;
			}

			return Math.round(vp.width * .75);
		},

		'_calcBrowserHeight' : function(){
			var vp = OJ.getViewport();

			if(OJ.isMobile()){
				return vp.height;
			}

			if(OJ.isTablet() && vp.height > 620){
				return 620;
			}

			return Math.round(vp.height * .75);
		},


		'_onOjReady' : function(evt){
			this.removeEventListener(OjEvent.READY, this, '_onOjReady');

			document.body.appendChild(this._modal_holder._dom);

			this._modal_holder._setIsDisplayed(true);
		},


		'alert' : function(title, message/*, buttons, cancel_label*/){
			var alrt = this._alert.apply(this, arguments);

			this.show(alrt);

			return alrt;
		},

		'browser' : function(url, title/*, width, height */){
			var args = arguments,
				ln = args.length,
				iframe = new OjIframe(url);

			iframe.setWidth(100, '%');
			iframe.setHeight(100, '%');

			var modal = this.makeModal(title, iframe);
			modal.setPaneWidth(ln > 2 ? args[2] : this._calcBrowserWidth());
			modal.setPaneHeight(ln > 3 ? args[3] : this._calcBrowserHeight());

			return this.show(modal);
		},

		'show' : function(modal){
			// store the modal
			this._modals.push(modal);

			// make sure the holder is visible
			if(!this._modal_holder.isVisible()){
				this._modal_holder.show();
			}

			// prep the modal
			modal.setAlpha(0);
			modal.show();

			// add the modal
			this._modal_holder.addChild(modal);

			// position the modal
			var w = modal.getWidth(), h = modal.getHeight();
			var w2 = modal.pane.getWidth(), h2 = modal.pane.getHeight();

			modal.pane.setX((w - w2) / 2);
			modal.pane.setY(((h - h2) / 2) * .75);

			// transition the modal
			var fade = new OjFade(modal, OjFade.IN);

			fade.addEventListener(OjTweenEvent.COMPLETE, this, function(evt){
				fade = OJ.destroy(fade);

				modal.dispatchEvent(new OjEvent(OjEvent.SHOW));
			});

			fade.start();
		},

		'hide' : function(modal){
			var index;

			if((index = this._modals.indexOf(modal)) == -1){
				return;
			}

			var fade = new OjFade(modal, OjFade.NONE);

			fade.addEventListener(OjTweenEvent.COMPLETE, this, function(evt){
				this._modal_holder.removeChild(modal);

				OJ.destroy(evt.getCurrentTarget());

				if(!this._modal_holder.numChildren()){
					this._modal_holder.hide();
				}

				modal.dispatchEvent(new OjEvent(OjEvent.HIDE));
			});

			fade.start();

			this._modals.splice(index, 1);
		},

		'makeAlert' : function(/*title, content*/){
			var c = this._alertClass;

			var alrt = new c();
			alrt._constructor.apply(alrt, arguments);

			return alrt;
		},

		'makeModal' : function(/*title, content*/){
			var c = this._modalClass;

			var modal = new c();
			modal._constructor.apply(modal, arguments);

			return modal;
		},

		'moveToTop' : function(modal){
			this._modal_holder.moveChild(modal, this._modal_holder.numChildren() - 1);
		},


		'getHolder' : function(){
			return this._modal_holder;
		}
	}
);