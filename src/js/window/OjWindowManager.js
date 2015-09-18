OJ.importJs('oj.dom.OjStyleElement');
OJ.importJs('oj.events.OjActionable');
OJ.importJs('oj.fx.OjFade');
OJ.importJs('oj.nav.OjIframe');
OJ.importJs('oj.media.OjImageViewer');
OJ.importJs('oj.window.OjModal');
OJ.importJs('oj.window.OjAlert');

OJ.importCss('oj.window.OjModal');


OJ.extendManager(
    'WindowManager', 'OjWindowManager', [OjActionable],
    {
        'BLANK' : '_blank',
        'SELF' : '_self',
        'PARENT' : '_parent',
        'TOP' : '_top',
        'WINDOW' : '_window',

        'HIDE' : 'onWindowHide',
        'SHOW' : 'onWindowShow',

        '_props_' : {
            'alertClass' : OjAlert,
            'modalClass' : OjModal
        },

        '_get_props_' : {
            'holder' : null
        },

        '_constructor' : function(manager){
            var self = this;

            self._super(OjActionable, '_constructor', []);

            if(manager){
                self._modals = manager._modals;
                self._modal_holder = manager._modal_holder;
                self._overlay = manager._overlay;

                if(!OJ.is_ready){
                    OJ.removeEventListener(OjEvent.READY, manager, '_onOjReady');
                    OJ.addEventListener(OjEvent.READY, self, '_onOjReady');
                }

                OJ.destroy(manager);
            }
            else{
                self._modals = [];

                self._modal_holder = new OjStyleElement();
                self._modal_holder.addCss('WindowManager');

                if(OJ.is_ready){
                    self._onOjReady(null);
                }
                else{
                    OJ.addEventListener(OjEvent.READY, self, '_onOjReady');
                }
            }
        },


        '_calcWindowWidth' : function(width, fullscreen){
            var vp = OJ.viewport;

            if(fullscreen){
                return vp.width;
            }

            if(width){
                return width;
            }

            if(OJ.is_tablet && vp.width > 540){
                return 540;
            }

            return Math.round(vp.width * .85);
        },

        '_calcWindowHeight' : function(height, fullscreen){
            var vp = OJ.viewport;

            if(fullscreen){
                return vp.height;
            }

            if(height){
                return height;
            }

            if(OJ.is_tablet && vp.height > 620){
                return 620;
            }

            return Math.round(vp.height * .85);
        },

        '_isMobileModal' : function(modal){
            return modal.is(OjModal) && OJ.is_mobile
        },

        '_transIn' : function(modal){
            var anim = new OjFade(modal, OjFade.IN, 250),
                pane = modal.pane,
                h, y;

            // transition the alert/modal
            anim.addEventListener(OjTweenEvent.COMPLETE, this, '_onShow');
            anim.start();

            if(this._isMobileModal(modal)){
                h = pane.height;
                y = pane.y;

                pane.y += h;

                // transition the modal
                anim = new OjMove(pane, OjMove.Y, y, anim.duration, OjEasing.OUT);
                anim.start();
            }
        },

        '_transOut' : function(modal){
            var anim = new OjFade(modal, OjFade.OUT, 250),
                pane = modal.pane,
                h, y;

            // transition the alert/modal
            anim.addEventListener(OjTweenEvent.COMPLETE, this, '_onHide');
            anim.start();

            if(this._isMobileModal(modal)){
                h = pane.height;
                y = pane.y;

                // transition the modal
                anim = new OjMove(modal.pane, OjMove.Y, y + h, anim.duration, OjEasing.OUT);
                anim.start();
            }
        },

        '_onShow' : function(evt){
            var modal = evt.currentTarget.target;

            // destroy tween
            evt = OJ.destroy(evt);

            // dispatch show event
            modal.dispatchEvent(new OjEvent(this.SHOW));
        },


        '_onHide' : function(evt){
            var holder = this._modal_holder,
                modal = evt.currentTarget.target;

            // remove the modal from the holder
            holder.removeChild(modal);

            // destroy the tween
            evt = OJ.destroy(evt);

            // check to see if the modal holder is empty
            // if it is empty then hide it since there is nothing more to show
            if(!holder.numChildren){
                holder.removeCss('active');
                holder.hide();
            }

            // dispatch hide event
            modal.dispatchEvent(new OjEvent(this.HIDE));

            // check to see if this modal is self destructing
            var destruct = modal.selfDestruct;

            if(destruct){
                OJ.destroy(modal, destruct);
            }
        },

        '_onOjReady' : function(evt){
            var self = this,
                holder = self._modal_holder;

            OJ.removeEventListener(OjEvent.READY, self, '_onOjReady');

            document.body.appendChild(holder.dom);

            holder._setIsDisplayed(true);

            setTimeout(
                function(){
                    holder.hide();
                },
                250
            );
        },


        'alert' : function(/*message, title, buttons, cancel_label*/){
            var alrt = this.makeAlert.apply(this, arguments);

            this.show(alrt);

            return alrt;
        },

        'call' : function(phone){
            window.location.href = 'tel:' + phone.path.substring(1);
        },

        'close' : function(){
            window.close();
        },

        'email' : function(email){
            window.location.href = 'mailto:' + email.path.substring(1);
        },

        'browser' : function(url, title, width, height, fullscreen){
            var iframe = new OjIframe(url),
                modal = this.makeModal(iframe, title);

            if(isUnset(fullscreen)){
                fullscreen = this._isMobileModal(modal)
            }

            // update iframe dims
            iframe.width = [100, '%'];
            iframe.height = [100, '%'];

            // update the modal
            modal.addCss('browser');
            modal.selfDestruct = OjAlert.DEEP;
            modal.paneWidth = this._calcWindowWidth(width, fullscreen);
            modal.paneHeight = this._calcWindowHeight(height, fullscreen);

            return this.show(modal);
        },

        'modal' : function(content, title, width, height, fullscreen){
            var args = arguments,
                modal = this.makeModal.apply(this, args);

            if(isUnset(fullscreen)){
                fullscreen = this._isMobileModal(modal);
            }

            modal.selfDestruct = OjAlert.DEEP;
            modal.isFullscreen = fullscreen;
            modal.paneWidth = this._calcWindowWidth(width, fullscreen);
            modal.paneHeight = this._calcWindowHeight(height, fullscreen);

            this.show(modal);

            return modal;
        },

        'hide' : function(modal){
            var modals = this._modals,
                index;

            if((index = modals.indexOf(modal)) == -1){
                return;
            }

            modals.removeAt(index);

            this._transOut(modal);
        },

        'hideLoading' : function(/*overlay*/){
            var args = arguments,
                overlay = args.length ? args[0] : this._overlay;

            if(overlay){
                overlay.hide();
            }
        },

        'image' : function(url, title, width, height, fullscreen){
            var args = arguments,
                ln = args.length,
                viewer = new OjImageViewer(url),
                modal = this.makeModal(viewer, title);

            viewer.width = [100, '%'];
            viewer.height = [100, '%'];

            modal.selfDestruct = OjAlert.DEEP;
            modal.paneWidth = this._calcWindowWidth(width, fullscreen);
            modal.paneHeight = ln > 3 ? args[3] : this._calcWindowHeight(height, fullscreen);

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
            alrt.paneWidth = ln > 4 ? args[4] : 400;

            if(ln > 5){
                alrt.paneHeight = args[5];
            }

            return alrt;
        },

        'makeModal' : function(/*content, title*/){
            return this._modalClass.makeNew(arguments);
        },

        'moveToTop' : function(modal){
            this._modal_holder.moveChild(modal, this._modal_holder.numChildren - 1);
        },

        'open' : function(url/*, target, params*/){
            // check for email
            if(url.protocol == 'mailto'){
                return this.email(url);
            }

            // check for phone call
            if(url.protocol == 'tel'){
                return this.call(url);
            }

            var args = arguments,
                ln = args.length,
                target = ln > 1 ? args[1] : this.BLANK,
                params = ln > 2 ? args[2] : {},
                specs = [], key,
                vp = OJ.viewport, scrn = OJ.screen;

            // check for text message
            if(url.protocol == 'sms' || url.protocol == 'mms'){
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
                    specs.append(key + '=' + params[key]);
                }

                if(target == this.WINDOW){
                    // create a new target id
                    target = OJ.guid();
                }
            }

            args = [url.toString()];

            if(target != this.BLANK){
                args.append(target);
                args.append(specs.join(','));
            }

            window.open.apply(window, args);

            return target;
        },

        'show' : function(modal, depth){
            var holder = this._modal_holder;

            // store the modal
            this._modals.append(modal);

            // make sure the holder is visible
            if(!holder.isVisible){
                holder.addCss('active');
                holder.show();
            }

            // prep the modal
            modal.show();
            modal.alpha = 0;

            // add the modal
            if(isSet(depth)){
                holder.insertChildAt(modal, depth);
            }
            else{
                holder.appendChild(modal);
            }

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

            overlay.message = msg;
            overlay.icon = icon;

            overlay.show(this._modal_holder);

            return overlay;
        }
    }
);