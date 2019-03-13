importJs("oj.components.OjComponent");


OJ.extendComponent(
    "OjIcon", [OjComponent], {
        "_props_" : {
            "source" : null
        },

        "_template" : "<i></i>",


        "_constructor" : function(icon_class){
            this._super(OjComponent, "_constructor", []);

            if(icon_class){
                this.source = arguments.length == 1 ? icon_class : Array.array(arguments).join(" ");
            }
        },

        "_processDomSourceChild" : function(){
            const child = this._super(OjComponent, "_processDomSourceChild", arguments);

            if(child && child.is(OjTextElement)){
                this.source = child.text;

                return;
            }

            return child;
        },

        "clone" : function(){
            const obj = this._super(OjComponent, "clone", arguments);
            obj.source = this.source;

            return obj;
        },

        // "_setCss" : function(){
        //     // don"t do anything here
        // },

        "=source" : function(val){
            const old = this._source;

            if(old == val){
                return;
            }

            if(old){
                this.removeCss(old);
            }

            if(this._source = val){
                this.addCss(val);
            }
        }
    },
    {
        "_TAGS" : ["i", "icon"]
    }
);