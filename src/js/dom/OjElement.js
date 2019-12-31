importJs("oj.data.OjElmArray");
importJs("oj.events.OjActionable");


OJ.extendClass(
    "OjElement", [OjActionable],
    {
        // Internal Vars
        "_props_" : {
            "parent" : null
        },

        "_get_props_" : {
            "dom" : null,
            "id" : null,
            "in_dom" : false,
            "parent_component" : null
        },

        "_draggable" : false, "_drag_x" : 0, "_drag_y" : 0, "_did_drag" : false,


        // Internal Methods
        "_constructor" : function(source, context){
            this._super(OjActionable, "_constructor", []);

            this._id_ = {"id": this._id_};

            // set the dom
            // if no source present then create one
            this._setDom(source ? source : OjElement.elm("div"), context);
        },

        "_destructor" : function(/*depth = 0*/){
            // cleanup dom
            const dom = this._dom;

            if(dom){
                this.parent = null;

                delete dom.__oj__;

                // release the vars
                this._dom = this._proxy = null;
            }

            // unregister element
            OjElement.unregister(this);

            // continue on with the destruction
            return this._super(OjActionable, "_destructor", arguments);
        },


        // Internal Properties
        "_setDom" : function(dom_elm){
            dom_elm.id = this.id;
            dom_elm.__oj__ = this._id_;

            this._dom = dom_elm;
            this._proxy = null;

            OjElement.register(this);
        },

        "_getProxy" : function(){
            return this._proxy || this._dom;
        },

        "_setProxy" : function(dom_elm){
            this._proxy = dom_elm;
        },

        "_getEventProxy" : function(){
            const proxy = this._getProxy();

            if(proxy == document.body){
                return window;
            }

            return proxy;
        },


        "_setIsDisplayed" : function(displayed){
            const evt = OjEvent;

            if(this._is_displayed == displayed){
                return;
            }

            if(this._is_displayed = displayed){
                this.dispatchEvent(new evt(evt.ADDED_TO_DISPLAY));
            }
            else{
                this.dispatchEvent(new evt(evt.REMOVED_FROM_DISPLAY));
            }
        },


        // Public Methods
        "hasDomElement" : function(dom_elm){
            return OjElement.hasDomElement(this._dom, dom_elm);
        },

        "query" : function(query){
            return new OjElmArray(this._dom.querySelectorAll(query));
        },

        "scrollIntoView" : function(){
            try{
                this._dom.scrollIntoView();
            }
            catch(e){}
        },


        // Public Properties
        ".id" : function(){
            return this.oj_id;
        },

        ".in_dom" : function(){
            const dom = this._dom;

            return dom.ownerDocument && isObject(dom.ownerDocument) && dom.parentNode ? true : false;
        },

        ".oj_id" : function(){
            return this._id_.id;
        },

        ".parent" : function(){
            return OjElement.element((this._dom || {}).parentNode);
        },
        "=parent" : function(parent){
            if(parent){
                parent.appendChild(this);
            }
            else if(parent = this.parent){
                parent.removeChild(this);
            }
        },

        ".parent_component" : function(){
            return OjElement.parentComponent((this._dom || {}).parentNode);
        }
    },
    {
        // "_elms" : {},
        "_doms": new WeakMap(),
        "_elms": new WeakMap(),

        "byId" : function(id){
            // print(id);
            return this.element(document.getElementById(id));

            // const elms = this._elms;
            //
            // if(elms[id]){
            //     return elms[id];
            // }
            //
            // let elm = document.getElementById(id);
            //
            // return elm ? elms[elm.id] : null;
        },

        "byPoint" : function(x, y){
            return this.element(
                document.elementFromPoint(x, y)
            );
        },

        "elm" : function(tag){
            return document.createElement(tag);
        },

        "element" : function(obj){
            if(!obj){
                return null;
            }

            if(isDomElement(obj)){
                const oj_id = obj.__oj__;

                if(oj_id){
                    return this._elms.get(oj_id);
                }

                if(this.isCommentNode(obj)){
                    return new OjCommentElement(obj);
                }

                if(this.isTextNode(obj)){
                    return new OjTextElement(obj);
                }

                return this._doms.get(obj);
            }

            if(isObjective(obj)){
                return obj;
            }

            return obj == window ? OJ : new OjStyleElement(obj);
        },

        "hasDomElement" : function(haystack, needle){
            if(haystack == needle){
                return true;
            }

            while(needle = needle.parentNode){
                if(needle == haystack){
                    return true;
                }
            }

            return false;
        },

        "isCommentNode" : function(dom_elm){
            return dom_elm.nodeName.toLowerCase() == "#comment";
        },

        "isTextNode" : function(dom_elm){
            return dom_elm.nodeName.toLowerCase() == "#text";
        },

        "parentComponent" : function(elm, cls){
            if(isElement(elm)){
                elm = elm._dom;
            }

            let parent;

            while(elm){
                parent = elm.parentNode;

                if(parent && (elm = this.element(parent)) && isComponent(elm, cls)){
                    return elm;
                }

                elm = parent;
            }

            return null;
        },

        // todo: look into this it doesn't seem efficient
        "register" : function(elm){
            const dom = elm._dom;

            if(dom){
                this._doms.set(dom, elm);
            }

            this._elms.set(elm._id_, elm);

            // this._elms[elm.id] = elm;
        },

        "unregister" : function(elm){
            const dom = elm._dom;

            if(dom){
                this._doms.delete(dom);
            }

            this._elms.delete(elm._id_);

            // delete this._elms[elm.id];
        }
    }
);


importJs("oj.dom.OjStyleElement");
importJs("oj.dom.OjTextElement");