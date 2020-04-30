OJ.extendComponent(
    "OjLabel", [OjComponent],
    {
        "_props_" : {
            "prefix" : null,
            "suffix" : null
        },


        "_constructor" : function(text){
            this._super(OjComponent, "_constructor", []);

            this.text = text;
        },

        "_processDomSourceChild" : function(){
            const child = this._super(OjComponent, "_processDomSourceChild", arguments);

            if(child && child.is(OjTextElement)){
                this.text = child;

                return;
            }

            return child;
        },

        "_addSpan" : function(css, text, target){
            const span = new OjStyleElement("<span class='" + css + "'></span>");
            span.text = text;

            target.appendChild(span);
        },

        "_redrawText" : function(target){
            const prefix = this.prefix,
                suffix = this.suffix,
                text = this.text;

            target = target || this;

            target.removeAllChildren();

            if(prefix){
                this._addSpan("prefix", prefix, target);
            }

            if(prefix || suffix){
                this._addSpan("stem", text, target);
            }
            else if(text){
                target.appendChild(text);
            }

            if(suffix){
                this._addSpan("suffix", suffix, target);
            }
        },

        "redraw" : function(){
            if(this._super(OjComponent, "redraw", arguments)){
                this._redrawText();

                return true;
            }

            return false;
        },


        "=prefix" : function(val){
            if(this._prefix == val){
                return;
            }

            this._prefix = isObjective(val, OjTextElement) ? val : new OjTextElement(val);

            this.redraw();
        },

        "=suffix" : function(val){
            if(this._suffix == val){
                return;
            }

            this._suffix = isObjective(val, OjTextElement) ? val : new OjTextElement(val);

            this.redraw();
        },

        // these are needed to override the OjStyleElement text getter/setter
        ".text" : function(){
            return this._text;
        },

        "=text" : function(val){
            if(this._text == val){
                return;
            }

            this._text = isObjective(val, OjTextElement) ? val : new OjTextElement(val);

            this.redraw();
        }
    },
    {
        "_TAGS" : ["label"],
        "_TEMPLATE" : "<label></label>"
    }
);