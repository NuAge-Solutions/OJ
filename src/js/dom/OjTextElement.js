

OJ.extendClass(
	'OjTextElement', [OjElement],
	{
        '_props_' : {
            'text' : null
        },

		'_constructor' : function(/*text*/){
			var self = this,
                args = arguments,
				ln = args.length,
				is_dom = ln && isDomElement(args[0]);

			self._super(OjElement, '_constructor', is_dom ? [args[0]] : []);

			if(ln && !is_dom){
				self.text = args[0];
			}
		},

		'_setDom' : function(dom_elm){
			// force text dom elm
			if(dom_elm.nodeName != "#text"){
				dom_elm = document.createTextNode(dom_elm.innerText);
			}

			this._super(OjElement, '_setDom', [dom_elm]);
		},


		'appendText' : function(str){
			this.dom.nodeValue += str.toString();
		},

		'prependText' : function(str){
			this.dom.nodeValue = str.toString() + this.dom.nodeValue;
		},


		'.text' : function(){
            return this.dom.nodeValue;
		},
		'=text' : function(str){
            this.dom.nodeValue = String.string(str);
		}
	}
);