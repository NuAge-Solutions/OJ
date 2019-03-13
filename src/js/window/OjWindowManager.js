importJs('oj.dom.OjStyleElement');
importJs('oj.events.OjActionable');
importJs('oj.events.OjKeyboardEvent');
importJs('oj.fx.OjFade');
importJs('oj.nav.OjIframe');
importJs('oj.media.OjImageViewer');
importJs('oj.window.OjModal');
importJs('oj.window.OjAlert');


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

        "_constructor" : function(manager){
            var self = this;

            self._super(OjActionable, "_constructor", []);

            if(manager){
                self._modals = manager._modals;
                self._modal_holder = manager._modal_holder;
                self._overlay = manager._overlay;

                if(!OJ.is_ready){
                    OJ.addEventListener(OjEvent.READY, self, "_onOjReady");
                }

                OJ.destroy(manager);
            }
            else{
                self._modals = [];

                self._modal_holder = new OjStyleElement();
                self._modal_holder.addCss("WindowManager");

                if(OJ.is_ready){
                    self._onOjReady(null);
                }
                else{
                    OJ.addEventListener(OjEvent.READY, self, "_onOjReady");
                }
            }

            OJ.addEventListener(OjKeyboardEvent.SHOW, self, "_onKeyboardUpdate");
            OJ.addEventListener(OjKeyboardEvent.HIDE, self, "_onKeyboardUpdate");
        },

        "_destructor" : function(){
            var self = this;

            OJ.removeEventListener(OjEvent.READY, self, "_onOjReady");
            OJ.removeEventListener(OjKeyboardEvent.SHOW, self, "_onKeyboardUpdate");
            OJ.removeEventListener(OjKeyboardEvent.HIDE, self, "_onKeyboardUpdate");

            self._super(OjActionable, "_destructor", arguments);
        },


        '_calcWindowWidth' : function(width, fullscreen){
            const vp = OJ.viewport;

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

        "_processSpecialProtocols" : function(url){
            var self = this;

            if(url) {
                // check for email
                if (url.protocol == "mailto") {
                    return self.email(url);
                }

                // check for phone call
                if (url.protocol == "tel") {
                    return self.call(url);
                }

                if(url.protocol == "sms" || url.protocol == "mms") {
                    return self.txt(url, params);
                }

                // TODO: handle map protocols
            }

            return false;
        },

        '_transIn' : function(modal, transition){
            if(transition === false){
                modal.dispatchEvent(new OjEvent(this.SHOW));
            }
            else{
                let anim = new OjFade(modal, OjFade.IN, 250),
                    pane = modal.pane,
                    h, y;

                modal._setIsAnimating(true);

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
            }
        },

        '_transOut' : function(modal){
            let anim = new OjFade(modal, OjFade.OUT, 250),
                pane = modal.pane,
                h, y;

            modal._setIsAnimating(true);

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


        '_onKeyboardUpdate' : function(evt){
            var self = this;

            if(self.keyboard_frame){
                self._modal_holder.height = self.keyboard_frame.height ? self.keyboard_frame.top : OjStyleElement.AUTO;
            }
        },

        '_onShow' : function(evt){
            const modal = evt.current_target.target;

            modal._setIsAnimating(false);

            // destroy tween
            evt = OJ.destroy(evt);

            // dispatch show event
            modal.dispatchEvent(new OjEvent(this.SHOW));
        },


        '_onHide' : function(evt){
            const holder = this._modal_holder,
                modal = evt.current_target.target;

            modal._setIsAnimating(false);

            // remove the modal from the holder
            holder.removeChild(modal);

            // destroy the tween
            evt = OJ.destroy(evt);

            // check to see if the modal holder is empty
            // if it is empty then hide it since there is nothing more to show
            if(!holder.num_children){
                holder.removeCss('active');
                holder.hide();
            }

            // dispatch hide event
            modal.dispatchEvent(new OjEvent(this.HIDE));

            // check to see if this modal is self destructing
            const destruct = modal.self_destruct;

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

            if(isEmpty(self._modals)){
                holder.hide();
            }


            // not sure why we had a timeout here... seems to be working fine without it
            //setTimeout(
            //    function(){
            //
            //    },
            //    250
            //);
        },


        'alert' : function(/*message, title, buttons, cancel_label, callback*/){
            var self = this,
                alrt = self.makeAlert.apply(self, arguments);

            self.show(alrt);

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
            var self = this,
                result;

            if(result = self._processSpecialProtocols(url)){
                return result;
            }

            var iframe = new OjIframe(url),
                modal = self.makeModal(iframe, title);

            if(isUnset(fullscreen)){
                fullscreen = self._isMobileModal(modal)
            }

            // update iframe dims
            iframe.width = [100, "%"];
            iframe.height = [100, "%"];

            // update the modal
            modal.addCss("browser");
            modal.self_destruct = OjAlert.DEEP;
            modal.pane_width = self._calcWindowWidth(width, fullscreen);
            modal.pane_height = self._calcWindowHeight(height, fullscreen);

            return self.show(modal);
        },

        'modal' : function(content, title, width, height, fullscreen, transition){
            var self = this,
                args = arguments,
                modal = self.makeModal.apply(self, args);

            if(isUnset(fullscreen)){
                fullscreen = self._isMobileModal(modal);
            }

            modal.self_destruct = OjAlert.DEEP;
            modal.is_fullscreen = fullscreen;
            modal.pane_width = self._calcWindowWidth(width, fullscreen);
            modal.pane_height = self._calcWindowHeight(height, fullscreen);

            self.show(modal, null, transition);

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

            modal.self_destruct = OjAlert.DEEP;
            modal.pane_width = this._calcWindowWidth(width, fullscreen);
            modal.pane_height = ln > 3 ? args[3] : this._calcWindowHeight(height, fullscreen);

            return this.show(modal);
        },

        'makeAlert' : function(content, title, buttons, cancel_label, callback){
            // make the new alert
            return this._alertClass.makeNew([
                content, title, buttons || [], cancel_label || OjAlert.CANCEL, callback
            ]);
        },

        'makeModal' : function(/*content, title*/){
            return this._modalClass.makeNew(arguments);
        },

        'moveToTop' : function(modal){
            this._modal_holder.moveChild(modal, this._modal_holder.num_children - 1);
        },

        'open' : function(url/*, target, params*/){
            var self = this,
                args = arguments,
                ln = args.length,
                target = ln > 1 ? args[1] : self.BLANK,
                params = ln > 2 ? args[2] : {},
                specs = [], key,
                vp = OJ.viewport, scrn = OJ.screen,
                result;

            if(result = self._processSpecialProtocols(url)){
                return result;
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

        'show' : function(modal, depth, transition){
            var holder = this._modal_holder;

            // store the modal
            this._modals.append(modal);

            // make sure the holder is visible
            if(!holder.is_visible){
                holder.addCss('active');
                holder.show();
            }

            // prep the modal
            modal.show();

            if(transition !== false){
                modal.alpha = 0;
            }

            // add the modal
            if(isSet(depth)){
                holder.insertChildAt(modal, depth);
            }
            else{
                holder.appendChild(modal);
            }

            this._transIn(modal, transition);
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