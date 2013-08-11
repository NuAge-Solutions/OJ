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
	'WindowManager', 'OjWindowManager', [OjActionable],
	{
		'BLANK'  : '_blank',
		'SELF'   : '_self',
		'PARENT' : '_parent',
		'TOP'    : '_top',
		'WINDOW' : '_window',

		'HIDE' : 'onWindowHide',
		'SHOW' : 'onWindowShow',

		'_props_' : {
			'alertClass' : OjAlert,
			'modalClass' : OjModal
		},

		'_constructor' : function(manager){
			this._super(OjActionable, '_constructor', []);

			if(manager){
				this._modals = manager._modals;
				this._modal_holder = manager._modal_holder;
				this._overlay = manager._overlay;

				if(!OJ.isReady()){
					OJ.removeEventListener(OjEvent.READY, manager, '_onOjReady');
					OJ.addEventListener(OjEvent.READY, this, '_onOjReady');
				}

				OJ.destroy(manager);
			}
			else{
				this._modals = [];

				this._modal_holder = new OjStyleElement();
				this._modal_holder.addCss(['WindowManager']);

				this._modal_holder.hide();

				if(OJ.isReady()){
					this._onOjReady(null);
				}
				else{
					OJ.addEventListener(OjEvent.READY, this, '_onOjReady');
				}
			}
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

		'_isMobileModal' : function(modal){
			return modal.is('OjModal') && OJ.isMobile()
		},

		'_transIn' : function(modal){
			var anim  = new OjFade(modal, OjFade.IN),
				pane = modal.pane,
				h, y;

			// transition the alert/modal
			anim.addEventListener(OjTweenEvent.COMPLETE, this, '_onShow');
			anim.start();

			if(this._isMobileModal(modal)){
				h = pane.getHeight();
				y = pane.getY();

				pane.setY(y + h);

				// transition the modal
				anim = new OjMove(pane, OjMove.Y, y, 250, OjEasing.OUT);
				anim.start();
			}
		},

		'_transOut' : function(modal){
			var anim = new OjFade(modal, OjFade.OUT),
				pane = modal.pane,
				h, y;

			// transition the alert/modal
			anim.addEventListener(OjTweenEvent.COMPLETE, this, '_onHide');
			anim.start();

			if(this._isMobileModal(modal)){
				h = pane.getHeight();
				y = pane.getY();

				// transition the modal
				anim = new OjMove(modal.pane, OjMove.Y, y + h, 250, OjEasing.OUT);
				anim.start();
			}
		},

		'_onShow' : function(evt){
			var modal = evt.getCurrentTarget().getTarget();

			// destroy tween
			evt = OJ.destroy(evt);

			// dispatch show event
			modal.dispatchEvent(new OjEvent(this.SHOW));
		},


		'_onHide' : function(evt){
			var holder = this._modal_holder,
				modal = evt.getCurrentTarget().getTarget();

			// remove the modal from the holder
			holder.removeChild(modal);

			// destroy the tween
			evt = OJ.destroy(evt);

			// check to see if the modal holder is empty
			// if it is empty then hide it since there is nothing more to show
			if(!holder.numChildren()){
				holder.hide();
			}

			// dispatch hide event
			modal.dispatchEvent(new OjEvent(this.HIDE));

			// check to see if this modal is self destructing
			if(modal.getSelfDestruct()){
				OJ.destroy(modal, modal.getSelfDestruct());
			}
		},

		'_onOjReady' : function(evt){
			OJ.removeEventListener(OjEvent.READY, this, '_onOjReady');

			document.body.appendChild(this._modal_holder.dom());

			this._modal_holder._setIsDisplayed(true);
		},


		'alert' : function(message/*, title, buttons, cancel_label*/){
			var alrt = this.makeAlert.apply(this, arguments);

			this.show(alrt);

			return alrt;
		},

		'call' : function(phone){
			window.location.href = 'tel:' + phone.getPath().substring(1);
		},

		'email' : function(email){
			window.location.href = 'mailto:' + email.getPath().substring(1);
		},

		'browser' : function(url, title/*, width, height */){
			var args = arguments,
				ln = args.length,
				iframe = new OjIframe(url),
				modal = this.makeModal(iframe, title);

			iframe.setWidth(100, '%');
			iframe.setHeight(100, '%');

			modal.addCss(['browser']);
			modal.setSelfDestruct(OjAlert.DEEP);
			modal.setPaneWidth(ln > 2 ? args[2] : this._calcBrowserWidth());
			modal.setPaneHeight(ln > 3 ? args[3] : this._calcBrowserHeight());

			return this.show(modal);
		},

		'modal' : function(/*content, title, width, height*/){
			var args = arguments,
				ln = args.length,
				modal = this.makeModal.apply(this, args);

			modal.setSelfDestruct(OjAlert.DEEP);
			modal.setPaneWidth(ln > 2 ? args[2] : this._calcBrowserWidth());
			modal.setPaneHeight(ln > 3 ? args[3] : this._calcBrowserHeight());

			this.show(modal);

			return modal;
		},

		'position' : function(modal){
			// position the modal
			var w = modal.getWidth(),
				h = modal.getHeight(),
				w2 = modal.getPaneWidth(),
				h2 = modal.getPaneHeight();

			modal.pane.setX((w - w2) / 2);
			modal.pane.setY(((h - h2) / 2) * .75);
		},

		'hide' : function(modal){
			var modals = this._modals,
				index;

			if((index = modals.indexOf(modal)) == -1){
				return;
			}

			modals.splice(index, 1);

			this._transOut(modal);
		},

		'hideLoading' : function(/*overlay*/){
			var args = arguments,
				overlay = args.length ? args[0] : this._overlay;

			if(overlay){
				overlay.hide();
			}
		},

		'image' : function(url, title/*, width, height*/){
			var args = arguments,
				ln = args.length,
				viewer = new OjImageViewer(url),
				modal = this.makeModal(viewer, title);

			viewer.setWidth(100, '%');
			viewer.setHeight(100, '%');

			modal.setSelfDestruct(OjAlert.DEEP);
			modal.setPaneWidth(ln > 2 ? args[2] : this._calcBrowserWidth());
			modal.setPaneHeight(ln > 3 ? args[3] : this._calcBrowserHeight());

			return this.show(modal);
		},

		'makeAlert' : function(/*message, title, buttons = [], cancel_label = 'OK', width = 400, height = auto*/){
			var args = arguments,
				ln = args.length,
				params = [
					ln ? args[0] : null,
					ln > 1 ? args[1] : null,
					ln > 2 ? args[2] : [],
					OjAlert.OK
				],
				alrt;

			// load in the passed buttons array
			if(ln > 3){
				params[3] = args[3];
			}
			// default the cancel label
			else if(ln > 2){
				params[3] = OjAlert.CANCEL;
			}

			// make the new alert
			alrt = this._alertClass.makeNew(params);

			// hide the buttons if we have no buttons and no cancel label
			if(!params[2] && !params[3]){
				alrt.hideButtons();
			}

			// set the pane height and width
			alrt.setPaneWidth(ln > 4 ? args[4] : 400);

			if(ln > 5){
				alrt.setPaneHeight(args[5]);
			}

			return alrt;
		},

		'makeModal' : function(/*content, title*/){
			return this._modalClass.makeNew(arguments);
		},

		'moveToTop' : function(modal){
			this._modal_holder.moveChild(modal, this._modal_holder.numChildren() - 1);
		},

		'open' : function(url/*, target, params*/){
			// check for email
			if(url.getProtocol() == 'mailto'){
				return this.email(url);
			}

			// check for phone call
			if(url.getProtocol() == 'tel'){
				return this.call(url);
			}

			var args = arguments,
				ln = args.length,
				target = ln > 1 ? args[1] : this.BLANK,
				params = ln > 2 ? args[2] : {},
				specs = [], key,
				vp = OJ.getViewport(), scrn = OJ.getScreen();

			// check for text message
			if(url.getProtocol() == 'sms' || url.getProtocol() == 'mms'){
				return this.txt(url, params);
			}

			if(target != this.SELF && target != this.TOP && target != this.PARENT){
				if(isUnset(params.toolbar)){
					params.toolbar = 0;
				}

				if(!params.width){
					params.width = vp.width * .75;
				}

				if(!params.height){
					params.height = vp.height * .75;
				}

				if(isUnset(params.top)){
					params.top = scrn.top + Math.round((vp.height - params.height) / 2);
				}

				if(isUnset(params.left)){
					params.left = scrn.left + Math.round((vp.width - params.width) / 2);
				}

				// merge the params into the specs string
				for(key in params){
					specs.push(key + '=' + params[key]);
				}

				if(target == this.WINDOW){
					// create a new target id
					target = OJ.guid();
				}
			}

			args = [url.toString()];

			if(target != this.BLANK){
				args.push(target);
				args.push(specs.join(','));
			}

			window.open.apply(window, args);

			return target;
		},

		'show' : function(modal){
			var holder = this._modal_holder;

			// store the modal
			this._modals.push(modal);

			// make sure the holder is visible
			if(!holder.isVisible()){
				holder.show();
			}

			// prep the modal
			modal.show();
			modal.setAlpha(0);

			// add the modal
			holder.addChild(modal);

			this.position(modal);

			this._transIn(modal);
		},

		'showLoading' : function(/*message, icon*/){
			var args = arguments,
				ln = args.length,
				msg = ln ? args[0] : null,
				icon = ln > 1 ? args[1] : null,
				overlay = this._overlay;

			if(!overlay){
				overlay = this._overlay = new OjOverlay();
			}

			overlay.setMessage(msg);
			overlay.setIcon(icon);

			overlay.show(this._modal_holder);

			return overlay;
		},


		'getHolder' : function(){
			return this._modal_holder;
		}
	}
);