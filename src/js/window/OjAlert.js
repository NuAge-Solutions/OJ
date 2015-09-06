OJ.importJs('oj.window.OjAlertEvent');
OJ.importJs('oj.window.OjModal');
OJ.importJs('oj.components.OjButton');
OJ.importJs('oj.components.OjLabel');

OJ.importCss('oj.window.OjAlert');


OJ.extendClass(
    'OjAlert', [OjComponent],
    {
        '_props_' : {
            'buttons' : null,
            'content' : null,
            'paneHeight' : null,
            'paneWidth' : null,
            'selfDestruct' : 0, // OjAlert.NONE
            'title' : null
        },

        '_template' : 'oj.window.OjAlert',


        '_constructor' : function(/*content, title, buttons, cancel_label*/){
            this._super(OjComponent, '_constructor', []);

            // setup the display
            if(this.oj_class_name.indexOf('Alert') > -1){
                this.btns.appendChild(this.cancelBtn = new OjButton(OjAlert.OK));

                this.cancelBtn.addEventListener(OjUiEvent.PRESS, this, '_onCancelPress');
            }

            this._processArguments(arguments, {
                'content' : undefined,
                'title' : undefined,
                'buttons' : undefined,
                'cancelBtn.label' : OjAlert.CANCEL
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
            this.dispatchEvent(
                new OjAlertEvent(
                    OjAlertEvent.BUTTON_PRESS,
                    this.btns.indexOfChild(evt.currentTarget)
                )
            );

            WindowManager.hide(this);
        },

        '_onCancelPress' : function(evt){
            this.cancel();
        },

        'cancel' : function(){
            this.dispatchEvent(new OjEvent(OjEvent.CANCEL));

            WindowManager.hide(this);
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
                ln = this.btns.numChildren - 1,
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

        '.cancelLabel' : function(){
            return this.cancelBtn.label;
        },
        '=cancelLabel' : function(label){
            return this.cancelBtn.label = label;
        },

        '=content' : function(content){
            if(this._content == content){
                return;
            }

            this.container.removeAllChildren();

            this._content = content;

            if(isString(content)){
                this.container.text = content.replaceAll('\n', '<br />');
            }
            else{
                this.container.appendChild(content);
            }
        },

        '=title' : function(title){
            if(this._title == title){
                return;
            }

            this.bar.text = this._title = title;
        },

        '.paneHeight' : function(){
            return this.pane.height;
        },
        '=paneHeight' : function(val/*, unit*/){
            this.pane.height = Array.array(arguments);
        },

        '.paneWidth' : function(){
            return this.pane.width;
        },
        '=paneWidth' : function(val/*, unit*/){
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