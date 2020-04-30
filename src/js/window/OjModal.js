importJs("oj.events.OjDragEvent");
importJs("oj.fx.OjTransition");
importJs("oj.nav.OjFlowNavController");
importJs("oj.nav.OjNavStack");
importJs("oj.views.OjView");
importJs("oj.window.OjAlert");


OJ.extendClass(
    "OjModal", [OjAlert],
    {
        "_props_" : {
            "bar_visible" : true,
            "buttons_visible" : null,
            "cancel_icon" : null,
            "cancel_visible" : null,
            "is_fullscreen" : false,
            "underlay_visible" : true
        },


        "_constructor" : function(view, title){
            const self = this;

            self._super(OjAlert, "_constructor", []);

            // setup controller stack relationship
            self.bar.stack = self.container;
            self.bar.addEventListener(OjEvent.CANCEL, self, "_onCancelPress");
            self.bar.addEventListener(OjEvent.COMPLETE, self, "_onComplete");

            self.cancel_visible = true;
            self.buttons_visible = false;

            // process arguments
            if(view){
                self.container.appendElm(view);
            }

            if(title){
                self.title = title;
            }
        },

        "_destructor" : function(depth){
            this._unset("bar", depth || 0);
            this._unset("stack", depth || 0);

            return this._super(OjAlert, "_destructor", arguments);
        },


        "_onComplete" : function(){
            this.complete(-1);
        },

        "_onDrag" : function(evt){
            this.pane.x += evt.deltaX;
            this.pane.y += evt.deltaY;
        },


        "=bar_visible" : function(val){
            if(this._bar_visible = val){
                this.bar.show();

                //this.bar.addEventListener(OjDragEvent.DRAG, this, "_onDrag");
            }
            else{
                this.bar.hide();

                //this.bar.removeEventListener(OjDragEvent.DRAG, this, "_onDrag");
            }
        },

        "=buttons_visible" : function(val){
            if(this._buttons_visible = val){
                this.removeCss("no-buttons");
            }
            else{
                this.addCss("no-buttons");
            }
        },

        ".cancel_icon" : function(){
            return this.bar.cancel_icon;
        },
        "=cancel_icon" : function(icon){
            this.bar.cancel_icon = icon;
        },

        ".cancel_label" : function(){
            return this.bar.cancel_label;
        },
        "=cancel_label" : function(label){
            this.bar.cancel_label = label;
        },

        ".cancel_visible" : function(){
            return this.bar.cancel_visible;
        },

        "=cancel_visible" : function(val){
            this.bar.cancel_visible = val;
        },

        "=is_fullscreen" : function(val){
            if(this._is_fullscreen = val){
                this.addCss("fullscreen");
            }
            else{
                this.removeCss("fullscreen");
            }
        },

        "=underlay_visible" : function(val){
            if(this._underlay_visible = val){
                this.underlay.show();
            }
            else{
                this.underlay.hide();
            }
        },


        "=buttons" : function(val){
            this._super(OjAlert, "=buttons", arguments);

            if(this.btns.num_children){
                this.btns.show();
            }
            else{
                this.btns.hide();
            }
        },

        "=title" : function(title){
            this.bar.title = this._title = title;
        }
    },
    {
        "_TEMPLATE" : "oj.window.OjModal"
    }
);