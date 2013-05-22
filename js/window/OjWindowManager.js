OJ.importJs('oj.dom.OjStyleElement');
OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.fx.OjFade');
OJ.importJs('oj.nav.OjIframe');
OJ.importJs('oj.media.OjImageViewer');
OJ.importJs('oj.window.OjModal');
OJ.importJs('oj.window.OjAlert');

OJ.importCss('oj.window.OjModal');


'use strict';

OJ.extendManager(
	'WindowManager', OjActionable, 'OjWindowManager',
	{
		'NEW'    : '_blank',
		'PARENT' : '_parent',
		'SELF'   : '_self',
		'TOP'    : '_top',

		'HIDE' : 'onWindowHide',
		'SHOW' : 'onWindowShow',

		'_props_' : {
			'alertClass' : OjAlert,
			'modalClass' : OjModal
		},

		'_modal_holder' : null,  '_modals' : null,


		'_constructor' : function(manager){
			this._super('OjWindowManager', '_constructor', []);

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

			return Math.round(vp.width * .85);
		},

		'_calcBrowserHeight' : function(){
			var vp = OJ.getViewport();

			if(OJ.isMobile()){
				return vp.height;
			}

			if(OJ.isTablet() && vp.height > 620){
				return 620;
			}

			return Math.round(vp.height * .85);
		},

		'_onShow' : function(evt){
			var tween = evt.getCurrentTarget(),
				modal = tween.getTarget();

			// destroy tween
			tween = OJ.destroy(tween);

			// dispatch show event
			modal.dispatchEvent(new OjEvent(this.SHOW));
		},


		'_onHide' : function(evt){
			var tween = evt.getCurrentTarget(),
				modal = tween.getTarget();

			// remove the modal from the holder
			this._modal_holder.removeChild(modal);

			// destroy the tween
			tween = OJ.destroy(tween);

			// check to see if the modal holder is empty
			// if it is empty then hide it since there is nothing more to show
			if(!this._modal_holder.numChildren()){
				this._modal_holder.hide();
			}

			// dispatch hide event
			modal.dispatchEvent(new OjEvent(this.HIDE));

			// check to see if this modal is self destructing
			if(modal.getSelfDestruct()){
				OJ.destroy(modal, modal.getSelfDestruct());
			}
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
			modal.setSelfDestruct(OjAlert.DEEP);
			modal.setPaneWidth(ln > 2 ? args[2] : this._calcBrowserWidth());
			modal.setPaneHeight(ln > 3 ? args[3] : this._calcBrowserHeight());

			return this.show(modal);
		},

		'center' : function(modal){
			// position the modal
			var w = modal.getWidth(),
				h = modal.getHeight(),
				w2 = modal.getPaneWidth(),
				h2 = modal.getPaneHeight();

			modal.pane.setX((w - w2) / 2);
			modal.pane.setY(((h - h2) / 2) * .75);
		},

		'image' : function(url, title/*, width, height*/){
			var args = arguments,
				ln = args.length,
				viewer = new OjImageViewer(url);

			viewer.setWidth(100, '%');
			viewer.setHeight(100, '%');

			var modal = this.makeModal(title, viewer);
			modal.setSelfDestruct(OjAlert.DEEP);
			modal.setPaneWidth(ln > 2 ? args[2] : this._calcBrowserWidth());
			modal.setPaneHeight(ln > 3 ? args[3] : this._calcBrowserHeight());

			return this.show(modal);
		},

		'open' : function(url/*, target*/){
			if(arguments.length > 1){
				var target = arguments[1];

				if(target != this.NEW){
					// do something here not sure what
				}

				window.open(String.string(url), target);
			}
			else{
				// the toString in case it is a url object and not a string
				url = url.toString();

				// if the url is the same minus the hash and their is no hash
				// then we force a hash to prevent a reload
				if(window.location.href.indexOf(url) != -1 && url.indexOf('#') == -1){
					url += '#';
				}

				window.location.href = url;
			}
		},

		'show' : function(modal){
			// store the modal
			this._modals.push(modal);

			// make sure the holder is visible
			if(!this._modal_holder.isVisible()){
				this._modal_holder.show();
			}

			// prep the modal
			modal.show();
			modal.setAlpha(0);

			// add the modal
			this._modal_holder.addChild(modal);

			this.center(modal);

			// transition the modal
			var fade = new OjFade(modal, OjFade.IN);
			fade.addEventListener(OjTweenEvent.COMPLETE, this, '_onShow');
			fade.start();
		},

		'hide' : function(modal){
			var index;

			if((index = this._modals.indexOf(modal)) == -1){
				return;
			}

			this._modals.splice(index, 1);

			var fade = new OjFade(modal, OjFade.OUT);
			fade.addEventListener(OjTweenEvent.COMPLETE, this, '_onHide');
			fade.start();
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