importJs('oj.components.OjLabel');
importJs('oj.media.OjIcon');
importJs('oj.media.OjImage');

OJ.extendComponent(
    'OjLink', [OjLabel],
    {
        '_props_' : {
            "direction": OjComponent.HORIZONTAL,
            'down_icon'     : null,
            'icon'         : null,
            'over_icon'     : null,
            'target'       : null,
            'target_height' : null,
            'target_width'  : null,
            'url'          : null
        },

        '_template' : 'oj.components.OjLink',


        '_constructor' : function(/*label, url, target*/){
            var self = this;

            self._super(OjLabel, '_constructor', []);

            self._processArguments(arguments, {
                'text' : undefined,
                'url' : undefined,
                'target' : WindowManager.SELF
            });

            self._enableUiEvents();
        },

        '_destructor' : function(){
            // just to make sure that the document mouse move event listener gets removed
            OJ.removeEventListener(OjUiEvent.MOVE, this, '_onMouseMove');

            this._super(OjLabel, '_destructor', arguments);
        },


        '_processAttribute' : function(dom, attr, context){
            if(attr.nodeName == 'href'){
                this.url = attr.value;

                return true;
            }

            return this._super(OjLabel, '_processAttribute', arguments);
        },

        '_processDomSourceChild' : function(){
            var self = this,
                child = self._super(OjLabel, '_processDomSourceChild', arguments);

            if(child && (child.is(OjIcon) || child.is(OjImage))){
                self.icon = child;

                return;
            }

            return child;
        },


        '_redrawText' : function(){
            var self = this,
                txt = (self.prefix || '') + (self.text || '') + (self.suffix || '').trim();

            self.lbl.text = txt;

            if(isEmpty(txt)){
                self.addCss("no-label");
            }
            else{
                self.removeCss("no-label");
            }
        },

        '_updateIcon' : function(val){
            var self = this,
                icn = self.icn;

            icn.removeAllChildren();

            if(val){
                icn.appendChild(val);

                self.removeCss("no-icon");
            }
            else{
                self.addCss("no-icon");
            }
        },


        "_onUiDown" : function(evt){
            var self = this;

            self._super(OjLabel, "_onUiDown", arguments);

            if(self._down_icon){
                self._updateIcon(self._down_icon);
            }
        },

        "_onUiOut" : function(evt){
            var self = this;

            self._super(OjLabel, "_onUiOut", arguments);

            self._updateIcon(self._icon);
        },

        "_onUiOver" : function(evt){
            var self = this;

            self._super(OjLabel, "_onUiOver", arguments);

            if(self._over_icon){
                self._updateIcon(self._over_icon);
            }
        },

        "_onUiPress" : function(evt){
            var self = this,
                url = self.url;

            self._super(OjLabel, "_onUiPress", arguments);

            if(url){
                WindowManager.open(
                    url,
                    self.target,
                    {
                        "width" : self.target_width,
                        "height" : self.target_height
                    }
                );
            }
        },

        "_onUiUp" : function(evt){
            var self = this;

            self._super(OjLabel, "_onUiUp", arguments);

            self._updateIcon(self._icon);
        },


        // GETTER & SETTER FUNCTIONS
        "=direction": function(val){
            var self = this,
                is_horz = val == self._static.HORIZONTAL;

            // check for change
            if(self.direction == val){
                return;
            }

            self._direction = val;

            self.attr(is_horz ? "flex-v" : "flex-h", null);
            self.attr(is_horz ? "flex-h": "flex-v", "");
        },

        '=down_icon' : function(icon){
            if(this._down_icon == (icon = OjImage.image(icon))){
                return;
            }

            this._down_icon = icon;
        },

        '=icon' : function(icon){
            var self = this;

            if(!isObjective(icon, OjIcon)){
                icon = OjImage.image(icon);  // todo: revisit this to process as icon if css based and not image
            }

            if(self._icon == icon){
                return;
            }

            self._updateIcon(self._icon = icon);
        },

        '=over_icon' : function(icon){
            if(this._over_icon == (icon = OjImage.image(icon))){
                return;
            }

            this._over_icon = icon;
        },

        '=url' : function(url){
            this._url = OjUrl.url(url)
        },

        '=target' : function(target){
            if(isComponent(target)){
                target = target.id;
            }

            this._target = target;
        }
    },
    {
        '_TAGS' : ['a', 'link']
    }
);