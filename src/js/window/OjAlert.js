importJs('oj.window.OjAlertEvent');
importJs('oj.window.OjModal');
importJs('oj.components.OjButton');
importJs('oj.components.OjLabel');


OJ.extendClass(
    'OjAlert', [OjComponent],
    {
        '_props_' : {
            'buttons' : null,
            'callback' : null,
            'cancel_label' : null,
            'content' : null,
            'pane_height' : null,
            'pane_width' : null,
            'self_destruct' : 0, // OjAlert.NONE
            'title' : null
        },

        "_add_cancel_btn" : false,

        '_template' : 'oj.window.OjAlert',


        '_constructor' : function(/*content, title, buttons, cancel_label, callback*/){
            var self = this;

            self._super(OjComponent, '_constructor', []);

            // setup the display
            if(self.oj_class_name.contains('Alert') || self._add_cancel_btn){
                self.btns.appendChild(self.cancel_btn = new OjButton(OjAlert.OK));

                self.cancel_btn.addEventListener(OjUiEvent.PRESS, self, '_onCancelPress');
            }

            self._processArguments(arguments, {
                'content' : undefined,
                'title' : undefined,
                'buttons' : undefined,
                'cancel_label' : OjAlert.CANCEL,
                'callback' : undefined
            });
        },

        '_destructor' : function(/*depth = 1*/){
            var args = arguments,
                depth = args.length ? args[0] : 0;

            if(!depth){
                // remove all the content so it doesn't get destroyed
                this.container.removeAllChildren();
            }

            return this._super(OjComponent, '_destructor', arguments);
        },


        '_onButtonClick' : function(evt){
            var self = this,
                callback = self.callback,
                index = self.btns.indexOfChild(evt.current_target) - 1; // offset for cancel

            self.dispatchEvent( new OjAlertEvent(OjAlertEvent.BUTTON_PRESS, index) );

            if(callback){
                if(callback(index) === false){
                    return;
                }
            }

            WindowManager.hide(self);
        },

        '_onCancelPress' : function(evt){
            this.cancel();
        },

        'cancel' : function(){
            var self = this,
                callback = self.callback;

            self.dispatchEvent( new OjEvent(OjEvent.CANCEL) );

            WindowManager.hide(self);

            if(callback){
                callback(-1);
            }
        },

        'hideButtons' : function(){
            this.addCss('no-buttons');

            this.btns.hide();
        },

        'present' : function(){
            WindowManager.show(this);
        },

        'showButtons' : function(){
            this.removeCss('no-buttons');

            this.btns.show();
        },


        '.buttons' : function(){
            return this._buttons ? this._buttons.clone() : [];
        },
        '=buttons' : function(buttons){
            this._buttons = buttons = buttons ? buttons.clone() : [];

            var num_btns = buttons.length,
                ln = this.btns.num_children - 1,
                diff = num_btns - ln, btn;

            if(diff > 0){
                for(; diff > 0; ){
                    this.btns.insertChildAt(btn = new OjButton(buttons[num_btns - (diff--)]), ln + 1);

                    btn.addEventListener(OjUiEvent.PRESS, this, '_onButtonClick');
                }
            }
            else if(diff < 0){
                for(; diff++ < 0; ){
                    OJ.destroy(this.btns.getChildAt(--ln - 1));
                }
            }

            for(; ln-- > 1;){
                btn = this.btns.getChildAt(ln);

                btn.label = buttons[ln];
            }
        },

        '.cancel_label' : function(){
            return this.cancel_btn.label;
        },
        '=cancel_label' : function(label){
            return (this.cancel_btn || {}).label = label;
        },

        '=content' : function(content){
            var self = this,
                container = self.container;

            if(self._content == content){
                return;
            }

            container.removeAllChildren();

            self._content = content;

            if(isString(content)){
                content = new OjStyleElement('<p>' + content.replaceAll('\n', '<br />') + '</p>');
            }

            container.appendChild(content);
        },

        '=title' : function(title){
            if(this._title == title){
                return;
            }

            this.bar.text = this._title = title;
        },

        '.pane_height' : function(){
            return this.pane.height;
        },
        '=pane_height' : function(val/*, unit*/){
            this.pane.height = Array.array(arguments);
        },

        '.pane_width' : function(){
            return this.pane.width;
        },
        '=pane_width' : function(val/*, unit*/){
            this.pane.width = Array.array(arguments);
        }
    },
    {
        'NONE' : 0,
        'SHALLOW' : 1,
        'DEEP' : 2,

        'OK' : 'Ok',
        'Cancel' : 'Cancel'
    }
);