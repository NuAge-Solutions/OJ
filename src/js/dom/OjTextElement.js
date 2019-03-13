OJ.extendClass(
    "OjTextElement", [OjElement],
    {
        "_props_" : {
            'on_change' : null,
            "text" : null
        },

        "_constructor" : function(text_or_dom){
            const self = this,
                is_dom = isDomElement(text_or_dom);

            self._super(OjElement, "_constructor", is_dom ? [text_or_dom] : []);

            if(!is_dom){
                self.text = text_or_dom;
            }
        },

        "_setDom" : function(dom_elm){
            // force text dom elm
            if(dom_elm.nodeName != "#text"){
                dom_elm = document.createTextNode(dom_elm.innerText);
            }

            return this._super(OjElement, "_setDom", [dom_elm]);
        },

        "clone" : function(){
            const obj = this._super(OjElement, "clone", arguments);
            obj.on_change = this.on_change;
            obj.text = this.text;

            return obj;
        },

        "toString" : function(){
            return this.dom.nodeValue;
        },

        ".text" : function(str){
            return this.dom.nodeValue;
        },

        "=text" : function(str){
            this.dom.nodeValue = String.string(str);

            if(this._on_change){
                this._on_change(this);
            }
        }
    }
);