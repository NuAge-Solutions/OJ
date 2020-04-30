importJs("oj.window.OjAlertEvent");
importJs("oj.window.OjModal");
importJs("oj.components.OjButton");
importJs("oj.components.OjLabel");


OJ.extendClass(
    "OjAlert", [OjComponent],
    {
        "_props_" : {
            "buttons" : null,
            "callback" : null,
            "cancel_callback" : null,
            "cancel_label" : null,
            "content" : null,
            "pane_height" : null,
            "pane_width" : null,
            "self_destruct" : 0, // OjAlert.NONE
            "title" : null
        },


        "_constructor" : function(content, title, buttons, cancel_label, callback){
            this._super(OjComponent, "_constructor", []);

            this._set("content", content);
            this._set("title", title);
            this._set("buttons", buttons);
            this._set("cancel_label", cancel_label, OjAlert.CANCEL);
            this._set("callback", callback);
        },

        "_redrawButtons" : function(){
            if(this.btns.num_children == 1 && isEmpty(this.cancel_label)){
                this.hideButtons();
            }
            else{
                this.showButtons();
            }
        },

        "_destructor" : function(/*depth = 1*/){
            var args = arguments,
                depth = args.length ? args[0] : 0;

            if(!depth){
                // remove all the content so it doesn"t get destroyed
                this.container.removeAllChildren();
            }

            return this._super(OjComponent, "_destructor", arguments);
        },


        "_onButtonClick" : function(evt){
            const index = this.btns.indexOfChild(evt.current_target) - 1; // offset for cancel

            this.dispatchEvent( new OjAlertEvent(OjAlertEvent.BUTTON_PRESS, index) );

            this.complete(index);
        },

        "_onCancelPress" : function(evt){
            this.cancel();
        },

        "cancel" : function(){
            let callback = this.cancel_callback;

            if(callback){
                callback();
            }

            if(callback = this.callback){
                callback(this._static.CANCEL_INDEX);
            }

            const evt = new OjEvent(OjEvent.CANCEL);

            this.dispatchEvent(evt);

            WindowManager.hide(this);
        },
        
        "complete" : function(button_index){
            const callback = this.callback;

            if(callback){
                if(callback(button_index) === false){
                    return;
                }
            }

            WindowManager.hide(this);
        },

        "hideButtons" : function(){
            this.addCss("no-buttons");

            this.btns.hide();
        },

        "present" : function(){
            WindowManager.show(this);
        },

        "showButtons" : function(){
            this.removeCss("no-buttons");

            this.btns.show();
        },


        ".buttons" : function(){
            return this._buttons ? this._buttons.clone() : [];
        },
        "=buttons" : function(buttons){
            this._buttons = buttons = buttons ? buttons.clone() : [];

            // remove old buttons
            for(let ln = this.btns.num_children; ln-- > 1;){
                const btn = this.btns.removeChildAt(ln);

                btn.removeEventListener(OjUiEvent.PRESS, this, "_onButtonClick")
            }

            // add new buttons
            const self = this;

            buttons.forEach((btn) => {
                btn = OjButton.button(btn);

                btn.addEventListener(OjUiEvent.PRESS, self, "_onButtonClick");

                self.btns.appendChild(btn);
            });

            this._redrawButtons();
        },

        ".cancel_label" : function(){
            return this.cancel_btn.label;
        },
        "=cancel_label" : function(label){
            var btn = this.cancel_btn;

            btn.label = label;

            btn.hide(isEmpty(label));

            this._redrawButtons();
        },

        "=content" : function(content){
            var self = this,
                container = self.container;

            if(self._content == content){
                return;
            }

            container.removeAllChildren();

            self._content = content;

            if(isString(content)){
                content = new OjStyleElement("<p>" + content.replaceAll("\n", "<br />") + "</p>");
            }

            container.appendChild(content);

            if(isObjective(content, OjView)){
                content.load();
            }
        },

        "=title" : function(title){
            if(this._title == title){
                return;
            }

            this.bar.text = this._title = title;
        },

        ".pane_height" : function(){
            return this.pane.height;
        },
        "=pane_height" : function(val/*, unit*/){
            this.pane.height = Array.array(arguments);
        },

        ".pane_width" : function(){
            return this.pane.width;
        },
        "=pane_width" : function(val/*, unit*/){
            this.pane.width = Array.array(arguments);
        }
    },
    {
        "_TEMPLATE" : "oj.window.OjAlert",

        "NONE" : 0,
        "SHALLOW" : 1,
        "DEEP" : 2,

        "OK" : "Ok",
        "CANCEL" : "Cancel",
        "CANCEL_INDEX" : -1
    }
);