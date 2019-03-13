importJs("oj.components.OjComponent");
importJs("oj.components.OjOverlay");


OJ.extendComponent(
    "OjView", [OjComponent],
    {
        "_props_" : {
            "nav_css": null,
            "controller" : null,
            "footer" : null,
            "header" : null,
            "icon" : null,
            "short_title" : null,
            "stack" : null,
            "title" : null
        },

        "_get_props_" : {
            "action_view" : null,
            "cancel_view" : null,
            "title_view" : null
        },

        "_loading_msg" : "Loading", "_template" : "oj.views.OjView", "_is_loaded" : false,

        "_unloading_msg" : "UnLoading",


        "_constructor" : function(content, title, short_title, icon){
            this._super(OjComponent, "_constructor", []);

            // setup vars
            this._checkpoints = {};

            // process arguments
            const cls = this._static;

            this._set("content", content);
            this._set("title", title, OJ.copy(cls.TITLE));
            this._set("title", short_title, OJ.copy(cls.SHORT_TITLE));
            this._set("icon", icon, OJ.copy(cls.ICON));
        },

        "_destructor" : function(){
            this.unload();

            this._unset(["_action_view", "_cancel_view", "_title_view", "_overlay"]);

            return this._super(OjComponent, "_destructor", arguments);
        },


        "_checkpointsCompleted" : function(){
            for(const key in this._checkpoints){
                if(!this._checkpoints[key]){
                    return false;
                }
            }

            return true;
        },

        "_checkpointComplete" : function(checkpoint){
            this._checkpoints[checkpoint] = true;

            if(this._checkpointsCompleted()){
                this._load();
            }
        },

        "_hideOverlay" : function(overlay){
            if((overlay = overlay || this._overlay)){
                overlay.addEventListener(OjEvent.HIDE, this, "_onOverlayHide");
                overlay.hide();
            }
        },

        "_load" : function(){
            this._is_loaded = true;

            this.removeCss("loading");

            this.redraw();

            this._hideOverlay();

            this.dispatchEvent(new OjEvent(OjView.LOAD));
        },

        "_resetCheckpoints" : function(){
            for(const key in this._checkpoints){
                this._checkpoints[key] = false;
            }
        },

        "_showOverlay" : function(msg, icon){
            let overlay = this._overlay;

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

        "_unload" : function(){
            this._is_loaded = false;

            // dispatch the event
            this.dispatchEvent(new OjEvent(OjView.UNLOAD));
        },


        "_onOverlayHide" : function(evt){
            this._unset("_overlay");
        },


        "didHide" : function(){ },
        "didShow" : function(){ },

        "load" : function(reload){
            // figure out if we need to actually load
            if(!reload && this._is_loaded){
                return false;
            }

            // let the ui know we are loading
            this.addCss("loading");

            // reset the checkpoints
            this._resetCheckpoints();

            const self = this,
                checkpoints = Object.keys(this._checkpoints);

            // only show overlay if we have checkpoints
            if(checkpoints.length){
                this._showOverlay(this._loading_msg, this._loading_icon);

                // call the checkpoints
                checkpoints.forEachReverse( (checkpoint) => {
                    self[checkpoint]();
                });
            }
            // if not checkpoints then we are done
            else{
                this._load();
            }

            return true;
        },

        "unload" : function(){
            // figure out if we need to unload
            if(this._is_loaded){
                this._unload();
            }
        },

        "willHide" : function(){
            const container = this.container;

            if(container){
                this._container_scroll_pos = [container.scroll_x, container.scroll_y];
            }
        },
        "willShow" : function(){
            const pos = this._container_scroll_pos,
                container = this.container;

            if(pos && container){
                container.scroll_x = pos[0];
                container.scroll_y = pos[1];
            }
        },


        // getter & Setter functions
        ".content" : function(){
            return this.elms;
        },
        "=content" : function(content){
            this.removeAllElms();

            if(content){
                content = Array.array(content);

                for(let ln = content.length; ln--;){
                    this.insertElmAt(content[ln], 0);
                }
            }
        },

        "=footer" : function(val){
            if(this._footer == val){
                return;
            }

            if(this._footer = val){
                this.removeCss("no-footer");

                if(!this.ftr){
                    var ftr = new OjStyleElement();
                    ftr.addCss("footer");

                    this.container.parent.insertChildAt(this.ftr = ftr, 0);
                }

                this.ftr.removeAllChildren();

                this.ftr.appendChild(val);
            }
            else{
                this._unset("ftr");

                this.addCss("no-footer");
            }
        },

        "=header" : function(val){
            if(this._header == val){
                return;
            }

            if(this._header = val){
                this.removeCss("no-header");

                if(!this.hdr){
                    var hdr = new OjStyleElement();
                    hdr.addCss("header");

                    this.container.parent.insertChildAt(this.hdr = hdr, 0);
                }

                this.hdr.removeAllChildren();

                this.hdr.appendChild(val);
            }
            else{
                this._unset("hdr");

                this.addCss("no-header");
            }
        },

        ".icon" : function(){
            var icon = this._icon;

            if(isObjective(icon)){
                return icon;
            }

            return OjImage.image(icon, true); // this will clone the icon so that we don"t run into the icon accidentally getting messed up
        },
        "=icon" : function(icon){
            if(this._icon == icon){
                return;
            }

            this._icon = icon;

            this.dispatchEvent(new OjEvent(OjView.ICON_CHANGE, false));
        },

        "=title" : function(title){
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
        "ICON" : null,
        "SHORT_TITLE" : null,
        "TITLE" : null,

        "ICON_CHANGE" : "onTitleChange",
        "LOAD" : "onViewLoad",
        "TITLE_CHANGE" : "onTitleChange",
        "UNLOAD" : "onViewUnload",

        "_TAGS" : ["view"]
    }
);