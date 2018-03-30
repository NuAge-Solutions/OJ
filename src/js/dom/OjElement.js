importJs('oj.data.OjElmArray');
importJs('oj.events.OjActionable');


OJ.extendClass(
    'OjElement', [OjActionable],
    {
        // Internal Vars
        '_props_' : {
            'parent' : null
        },

        '_get_props_' : {
            'dom' : null,
            'id' : null,
            'inDom' : false
        },

        '_draggable' : false, '_dragX' : 0, '_dragY' : 0, '_did_drag' : false,


        // Internal Methods
        '_constructor' : function(source, context){
            this._super(OjActionable, '_constructor', []);

            // set the dom
            // if no source present then create one
            this._setDom(source ? source : OjElement.elm('div'), context);

            OjElement.register(this);
        },

        '_destructor' : function(/*depth = 0*/){
            OjElement.unregister(this);

            // remove from parent
            this.parent = null;

            if(this._dom){
                delete this._dom.ojProxy;

                // release the vars
                this._dom = this._proxy = null;
            }

            // continue on with the destruction
            return this._super(OjActionable, '_destructor', arguments);
        },


        // Internal Properties
        '_setDom' : function(dom_elm){
            this._setProxy(this._dom = dom_elm);

            this._dom.id = this.id;
        },

        '_setProxy' : function(dom_elm){
            if(this._proxy){
                this._proxy.ojProxy = null;
            }

            (this._proxy = dom_elm).ojProxy = this.id;
        },

        '_getEventProxy' : function(){
            if(this._proxy == document.body){
                return window;
            }

            return this._proxy;
        },


        '_setIsDisplayed' : function(displayed){
            var self = this,
                dispatch = self.dispatchEvent,
                evt = OjEvent;

            if(self._is_displayed == displayed){
                return;
            }

            if(self._is_displayed = displayed){
                self.dispatchEvent(new evt(evt.ADDED_TO_DISPLAY));
            }
            else{
                self.dispatchEvent(new evt(evt.REMOVED_FROM_DISPLAY));
            }
        },


        // Public Methods
        'hasDomElement' : function(dom_elm){
            return OjElement.hasDomElement(this._dom, dom_elm);
        },

        'query' : function(query){
            return new OjElmArray(this._dom.querySelectorAll(query));
        },


        // Public Properties
        '.dom' : function(){
            return this._dom;
        },

        '.id' : function(){
            return this.oj_id;
        },

        '.inDom' : function(){
            var dom = this._dom;

            return dom.ownerDocument && isObject(dom.ownerDocument) && dom.parentNode ? true : false;
        },

        '.parent' : function(){
            return this._dom ? OjElement.element(this._dom.parentNode) : null;
        },
        '=parent' : function(parent){
            if(parent){
                parent.appendChild(this);
            }
            else if(parent = this.parent){
                parent.removeChild(this);
            }
        },

        '.parentComponent' : function(){
            if(!this._parentComponent){
                this._parentComponent = OjElement.parentComponent(this._dom.parentNode);
            }

            return this._parentComponent;
        }
    },
    {
        '_elms' : {},

        'byId' : function(id){
            var elms = this._elms,
                elm;

            if(elms[id]){
                return elms[id];
            }

            return (elm = document.getElementById(id)) ? elms[elm.id] : null;
        },

        'byPoint' : function(x, y){
            var obj = document.elementFromPoint(x, y);

            return obj ? this.element(obj) : null;
        },

        'elm' : function(tag){
            return document.createElement(tag);
        },

        'element' : function(obj){
            var self = this;

            if(!obj){
                return null;
            }

            if(isDomElement(obj)){
                if(self.isCommentNode(obj)){
                    return new OjCommentElement(obj);
                }

                if(self.isTextNode(obj)){
                    return new OjTextElement(obj);
                }

                if(obj.id){
                    var elm = self.byId(obj.id);

                    // check to make sure dom is a match
                    if(elm.dom != obj){
                        elm.dom = obj;
                    }

                    return elm;
                }

                return null;
            }

            if(isObjective(obj)){
                return obj;
            }

            return obj == window ? OJ : new OjStyleElement(obj);
        },

        'hasDomElement' : function(haystack, needle){
            if(haystack == needle){
                return true;
            }

            while((needle = needle.parentNode)){
                if(needle == haystack){
                    return true;
                }
            }

            return false;
        },

        'isCommentNode' : function(dom_elm){
            return dom_elm.nodeName.toLowerCase() == '#comment';
        },

        'isTextNode' : function(dom_elm){
            return dom_elm.nodeName.toLowerCase() == '#text';
        },

        'parentComponent' : function(elm){
            if(isElement(elm)){
                elm = elm._dom;
            }

            var parent;

            while(elm){
                parent = elm.parentNode;

                if(parent && (elm = this.element(parent)) && isComponent(elm)){
                    return elm;
                }

                elm = parent;
            }

            return null;
        },

        // todo: look into this it doesn't seem efficient
        'register' : function(elm){
            this._elms[elm.id] = elm;
        },

        'unregister' : function(elm){
            delete this._elms[elm.id];
//            print(Object.keys(this._elms).length);
        }
    }
);


importJs('oj.dom.OjStyleElement');
importJs('oj.dom.OjTextElement');