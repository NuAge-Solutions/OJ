OJ.importJs('oj.events.OjDragEvent');
OJ.importJs('oj.fx.OjTransition');
OJ.importJs('oj.nav.OjFlowNavController');
OJ.importJs('oj.nav.OjNavStack');
OJ.importJs('oj.views.OjView');
OJ.importJs('oj.window.OjAlert');


OJ.extendClass(
    'OjModal', [OjAlert],
    {
        '_props_' : {
            'barVisible' : true,
            'buttonsVisible' : null,
            'closeVisible' : null,
            'isFullscreen' : false,
            'underlayVisible' : true
        },

        '_template' : 'oj.window.OjModal',


        '_constructor' : function(view, title){
            var self = this,
                bar;

            self._super(OjAlert, '_constructor', []);

            // setup controller stack relationship
            (bar = self.bar).stack = self.container;

            self.closeVisible = true;
            self.buttonsVisible = false;

            // process arguments
            if(view){
                self.container.appendElm(view);
            }

            if(title){
                self.title = title;
            }

            if(OJ.is_mobile){
                // TODO: Update this to use FontAwesome
                bar.cancel_label = '&times;';
            }
        },

        '_destructor' : function(depth){
            this._unset('bar', depth || 0);
            this._unset('stack', depth || 0);

            return this._super(OjAlert, '_destructor', arguments);
        },


        '_onDrag' : function(evt){
            this.pane.x += evt.deltaX;
            this.pane.y += evt.deltaY;
        },


        '=barVisible' : function(val){
            if(this._barVisible = val){
                this.bar.show();

                //this.bar.addEventListener(OjDragEvent.DRAG, this, '_onDrag');
            }
            else{
                this.bar.hide();

                //this.bar.removeEventListener(OjDragEvent.DRAG, this, '_onDrag');
            }
        },

        '=buttonsVisible' : function(val){
            if(this._buttonsVisible = val){
                this.removeCss('no-buttons');
            }
            else{
                this.addCss('no-buttons');
            }
        },

        '.closeVisible' : function(){
            return this.bar.cancel_visible;
        },

        '=closeVisible' : function(val){
            var self = this,
                bar = self.bar,
                evt = OjEvent.CANCEL;

            bar.cancel_visible = val;

            if(val){
                bar.addEventListener(evt, self, '_onCancelPress');
            }
            else{
                bar.removeEventListener(evt, self, '_onCancelPress');
            }
        },

        '=isFullscreen' : function(val){
            if(this._isFullscreen = val){
                this.addCss('fullscreen');
            }
            else{
                this.removeCss('fullscreen');
            }
        },

        '=underlayVisible' : function(val){
            if(this._underlayVisible = val){
                this.underlay.show();
            }
            else{
                this.underlay.hide();
            }
        },


        '=buttons' : function(val){
            this._super(OjAlert, '=buttons', arguments);

            if(this.btns.numChildren){
                this.btns.show();
            }
            else{
                this.btns.hide();
            }
        },

        '=title' : function(title){
            this.bar.title = this._title = title;
        }
    }
);