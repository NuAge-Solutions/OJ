importJs("oj.components.OjLabel");
importJs("oj.media.OjIcon");
importJs("oj.media.OjImage");

OJ.extendComponent(
    "OjLink", [OjLabel],
    {
        "_props_" : {
            "direction": OjComponent.HORIZONTAL,
            "down_icon"     : null,
            "icon"         : null,
            "over_icon"     : null,
            "form_reset" : null,
            "form_submit" : null,
            "target"       : null,
            "target_height" : null,
            "target_width"  : null,
            "url"          : null
        },


        "_constructor" : function(label, url, target){
            this._super(OjLabel, "_constructor", []);

            if(label){
                this.text = label;
            }

            if(url){
                this.url = url;
            }

            this.target = target || WindowManager.SELF;

            this._enableUiEvents();
        },

        "_destructor" : function(){
            // just to make sure that the document mouse move event listener gets removed
            OJ.removeEventListener(OjUiEvent.MOVE, this, "_onMouseMove");

            this._super(OjLabel, "_destructor", arguments);
        },


        "_processAttribute" : function(dom, attr, context){
            if(attr.nodeName == "href"){
                this.url = attr.value;

                return true;
            }

            return this._super(OjLabel, "_processAttribute", arguments);
        },

        "_processDomSourceChild" : function(){
            const child = this._super(OjLabel, "_processDomSourceChild", arguments);

            if(child && (child.is(OjIcon) || child.is(OjImage))){
                this.icon = child;

                return;
            }

            return child;
        },


        "_redrawText" : function(){
            this._super(OjLabel, "_redrawText", [this.lbl]);

            // update link label css flag
            if(isEmpty(this.lbl.text)){
                this.addCss("no-label");
            }
            else{
                this.removeCss("no-label");
            }
        },

        "_updateIcon" : function(val){
            const icn = this.icn;

            icn.removeAllChildren();

            if(val){
                icn.appendChild(val);

                this.removeCss("no-icon");
            }
            else{
                this.addCss("no-icon");
            }
        },


        "_onUiDown" : function(evt){
            this._super(OjLabel, "_onUiDown", arguments);

            if(this._down_icon){
                this._updateIcon(this._down_icon);
            }
        },

        "_onUiOut" : function(evt){
            this._super(OjLabel, "_onUiOut", arguments);

            this._updateIcon(this._icon);
        },

        "_onUiOver" : function(evt){
            this._super(OjLabel, "_onUiOver", arguments);

            if(this._over_icon){
                this._updateIcon(this._over_icon);
            }
        },

        "_onUiPress" : function(evt){
            const url = this.url,
                form_reset = this.form_reset,
                form_submit = this.form_submit;

            this._super(OjLabel, "_onUiPress", arguments);

            if(url){
                WindowManager.open(
                    url,
                    this.target,
                    {
                        "width" : this.target_width,
                        "height" : this.target_height
                    }
                );
            }

            if(form_reset){
                form_reset.reset();
            }

            if(form_submit){
                form_submit.submit();
            }
        },

        "_onUiUp" : function(evt){
            this._super(OjLabel, "_onUiUp", arguments);

            this._updateIcon(this._icon);
        },


        // GETTER & SETTER FUNCTIONS
        "=direction": function(val){
            var self = this,
                cls = self._static,
                is_horz = val == cls.HORIZONTAL || val == cls.HORIZONTAL_REVERSE;

            // check for change
            if(self.direction == val){
                return;
            }

            self._direction = val;

            self.attr(is_horz ? "flex-v" : "flex-h", null);
            self.attr(is_horz ? "flex-h": "flex-v", "");

            if(val == cls.HORIZONTAL_REVERSE || val == cls.VERTICAL_REVERSE){
                self.addCss("reverse");
            }
            else{
                self.removeCss("reverse");
            }
        },

        "=down_icon" : function(icon){
            if(this._down_icon == (icon = OjImage.image(icon))){
                return;
            }

            this._down_icon = icon;
        },

        "=icon" : function(icon){
            var self = this;

            if(!isObjective(icon, OjIcon)){
                icon = OjImage.image(icon);  // todo: revisit this to process as icon if css based and not image
            }

            if(self._icon == icon){
                return;
            }

            self._updateIcon(self._icon = icon);
        },

        "=over_icon" : function(icon){
            if(this._over_icon == (icon = OjImage.image(icon))){
                return;
            }

            this._over_icon = icon;
        },

        "=url" : function(url){
            this._url = OjUrl.url(url)
        },

        "=target" : function(target){
            if(isComponent(target)){
                target = target.id;
            }

            this._target = target;
        }
    },
    {
        "_TAGS" : ["a", "link"],
        "_TEMPLATE" : "oj.components.OjLink"
    }
);