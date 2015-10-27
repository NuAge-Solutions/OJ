OJ.importJs('oj.components.OjComponent');
OJ.importJs('oj.components.OjOverlay');

OJ.importCss('oj.views.OjView');


OJ.extendComponent(
    'OjView', [OjComponent],
    {
        '_props_' : {
            'controller' : null,
            'footer' : null,
            'header' : null,
            'icon' : null,
            'short_title' : null,
            'stack' : null,
            'title' : null
        },

        '_get_props_' : {
            'action_view' : null,
            'cancel_view' : null,
            'title_view' : null
        },

//		'_elm_funcs' : null,  '_load_checkpoints' : null,  '_loading_icon' : null,
//
//		'_overlay' : null,  '_unload_checkpoints' : null,  '_unloading_icon' : null,

        '_loading_msg' : 'Loading', '_template' : 'oj.views.OjView', '_loaded' : false,

        '_unloading_msg' : 'UnLoading',


        '_constructor' : function(/*content, title, short_title*/){
            this._super(OjComponent, '_constructor', []);

            // setup vars
            this._load_checkpoints = {};
            this._unload_checkpoints = {};

            // process arguments
            var args = arguments,
                ln = args.length,
                short_title = this._static.SHORT_TITLE,
                title = this._static.TITLE;

            if(ln){
                this.content = args[0];

                if(ln > 1){
                    title = args[1];

                    if(ln > 2){
                        short_title = args[2];
                    }
                }
            }

            this.title = title;

            if(short_title){
                this.short_title = short_title;
            }

            if(this._static.ICON){
                this.icon = this._static.ICON;
            }
        },

        '_destructor' : function(){
            this.unload();

            this._unset(['_action_view', '_cancel_view', '_title_view', '_overlay']);

            return this._super(OjComponent, '_destructor', arguments);
        },


        '_checkpointsCompleted' : function(checkpoints){
            for(var key in checkpoints){
                if(!checkpoints[key]){
                    return false;
                }
            }

            return true;
        },

        '_hideOverlay' : function(overlay){
            if((overlay = overlay || this._overlay)){
                overlay.addEventListener(OjEvent.HIDE, this, '_onOverlayHide');
                overlay.hide();
            }
        },

        '_load' : function(){
            this._loaded = true;

            this.removeCss('loading');

            this.redraw();

            this._hideOverlay();

            this.dispatchEvent(new OjEvent(OjView.LOAD));
        },

        '_loadCheckpoint' : function(checkpoint){
            var self = this,
                checkpoints = self._load_checkpoints;

            if(checkpoint){
                checkpoints[checkpoint] = true;
            }

            if(self._checkpointsCompleted(checkpoints)){
                self._load();
            }
            else{
                self._showOverlay(self._loading_msg, self._loading_icon);
            }
        },

        '_resetCheckpoints' : function(checkpoints){
            var key;

            for(key in checkpoints){
                checkpoints[key] = false;
            }
        },

        '_showOverlay' : function(/*msg, icon*/){
            var args = arguments,
                ln = args.length,
                msg = ln ? args[0] : null,
                icon = ln > 1 ? args[1] : null,
                overlay = this._overlay;

            if(overlay){
                overlay.message = msg;
                overlay.icon = icon;
            }
            else{
                overlay = this._overlay = new OjOverlay(msg, icon);
            }

            overlay.show(this);

            return overlay;
        },

        '_unload' : function(){
            this._loaded = true;

            this._hideOverlay();

            // dispatch the event
            this.dispatchEvent(new OjEvent(OjView.UNLOAD));
        },

        '_unloadCheckpoint' : function(/*checkpoint*/){
            var args = arguments;

            if(args.length){
                this._unload_checkpoints[args[0]] = true;
            }

            if(this._checkpointsCompleted(this._unload_checkpoints)){
                this._unload();
            }
            else{
                this._showOverlay(this._unloading_msg, this._unloading_icon);
            }
        },


        '_onOverlayHide' : function(evt){
            this._unset('_overlay');
        },


        'load' : function(/*reload=false*/){
            if((!arguments.length || !arguments[0]) && this._loaded){
                return false;
            }

            this.addCss('loading');

            this._resetCheckpoints(this._load_checkpoints);

            this._loadCheckpoint();

            return true;
        },

        'unload' : function(){
            if(this._loaded){
                this._resetCheckpoints(this._unload_checkpoints);

                this._unloadCheckpoint();
            }
        },


        // getter & Setter functions
        '.content' : function(){
            return this.elms;
        },
        '=content' : function(content){
            this.removeAllElms();

            if(content){
                content = Array.array(content);

                var ln = content.length;

                for(; ln--;){
                    this.insertElmAt(content[ln], 0);
                }
            }
        },

        '=footer' : function(val){
            if(this._footer == val){
                return;
            }

            if(this._footer = val){
                this.removeCss('no-footer');

                if(!this.ftr){
                    var ftr = new OjStyleElement();
                    ftr.addCss('footer');

                    this.container.parent.insertChildAt(this.ftr = ftr, 0);
                }

                this.ftr.removeAllChildren();

                this.ftr.appendChild(val);
            }
            else{
                this._unset('ftr');

                this.addCss('no-footer');
            }
        },

        '=header' : function(val){
            if(this._header == val){
                return;
            }

            if(this._header = val){
                this.removeCss('no-header');

                if(!this.hdr){
                    var hdr = new OjStyleElement();
                    hdr.addCss('header');

                    this.container.parent.insertChildAt(this.hdr = hdr, 0);
                }

                this.hdr.removeAllChildren();

                this.hdr.appendChild(val);
            }
            else{
                this._unset('hdr');

                this.addCss('no-header');
            }
        },

        '.icon' : function(){
            return OjImage.image(this._icon, true); // this will clone the icon so that we don't run into the icon accidentally getting messed up
        },
        '=icon' : function(icon){
            if(this._icon == icon){
                return;
            }

            this._icon = icon;

            this.dispatchEvent(new OjEvent(OjView.ICON_CHANGE, false));
        },

        '=title' : function(title){
            if(this._title == title){
                return;
            }

            this._title = title;

            if(!this._short_title){
                this._short_title = title;
            }

            this.dispatchEvent(new OjEvent(OjView.TITLE_CHANGE, false));
        }
    },
    {
        'SHORT_TITLE' : null,
        'TITLE' : null,

        'HORIZONTAL' : 'horizontal',
        'VERTICAL' : 'vertical',
        'TOP' : 'top',
        'BOTTOM' : 'bottom',
        'LEFT' : 'left',
        'RIGHT' : 'right',

        'ICON_CHANGE' : 'onTitleChange',
        'LOAD' : 'onViewLoad',
        'TITLE_CHANGE' : 'onTitleChange',
        'UNLOAD' : 'onViewUnload',

        '_TAGS' : ['view']
    }
);