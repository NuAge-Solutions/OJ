OJ.importJs('oj.events.OjActionable');


'use strict';

OJ.extendClass(
	OjActionable, 'OjElement',
	{
//		'_dom' : null,  '_proxy' : null,
//
//		'_move_timer' : null,  '_page_x' : null,  '_page_y' : null,

		'_draggable' : false,  '_dragX' : 0,  '_dragY' : 0,  '_did_drag' : false,


		'_constructor' : function(/*source, context*/){
			var args = arguments,
				ln = args.length,
				source = ln && args[0] ? args[0] : OjElement.elm('div'),
				context = ln > 1 ? args[1] : null;

			this._super('OjElement', '_constructor', []);

			// set the dom
			// if no source present then create one
			this._setDom(source, context);
		},

		'_destructor' : function(/*depth = 0*/){
			OjElement.unregister(this);

			// remove from parent
			this.setParent(null);

			if(this._dom){
				delete this._dom.ojElm;
				delete this._dom.ojProxy;

				// release the vars
				this._dom = this._proxy = null;
			}

			// continue on with the destruction
			return this._super('OjElement', '_destructor', arguments);
		},


		'_setDom' : function(dom_elm){
			this._setProxy(this._dom = dom_elm);

			this._dom.ojElm = this.id();
		},

		'_setProxy' : function(dom_elm){
			if(this._proxy){
				this._proxy.ojProxy = null;
			}

			this._proxy = dom_elm;

			dom_elm.ojProxy = this.id();
		},

		'_isDisplayed' : function(){ },

		'_isNotDisplayed' : function(){ },


		// Non-Stlye Getter & Setter Functions
		'dom' : function(){
			return this._dom;
		},

		'inDom' : function(){
			var dom = this._dom;

			return dom.ownerDocument && isObject(dom.ownerDocument) && dom.parentNode ? true : false;
		},

		'hasDomElement' : function(dom_elm){
			return OjElement.hasDomElement(this._dom, dom_elm);
		},

		'parent' : function(){
			return OjElement.element(this._dom.parentNode);
		},

		'getParent' : function(){
			return OjElement.element(this._dom.parentNode);
		},
		'setParent' : function(parent){
			if(parent){
				parent.addChild(this);
			}
			else if(parent = this.parent()){
				parent.removeChild(this);
			}
		},

		'_setIsDisplayed' : function(displayed){
			if(this._is_displayed == displayed){
				return;
			}

			if(this._is_displayed = displayed){
				this._isDisplayed();

				this.dispatchEvent(new OjEvent(OjEvent.ADDED_TO_DISPLAY));
			}
			else{
				this._isNotDisplayed();

				this.dispatchEvent(new OjEvent(OjEvent.REMOVED_FROM_DISPLAY));
			}
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

			return (elm = document.getElementById(id)) && elm.ojProxy ? elms[elm.ojProxy] : null;
		},

		'elm' : function(tag){
			return document.createElement(tag);
		},

		'element' : function(obj){
			if(!obj){
				return null;
			}

			if(isDomElement(obj)){
				return this.isTextNode(obj) ? new OjTextElement(obj) : this.byId(obj.ojProxy);
			}

			if(isObjective(obj)){
				return obj;
			}

			return new OjStyleElement(obj);
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

		'register' : function(elm){
			this._elms[elm.id()] = elm;
//			trace(Object.keys(this._elms).length);
		},

		'unregister' : function(elm){
			delete this._elms[elm.id()];
//			trace(Object.keys(this._elms).length);
		}
	}
);


OJ.importJs('oj.dom.OjStyleElement');
OJ.importJs('oj.dom.OjTextElement');