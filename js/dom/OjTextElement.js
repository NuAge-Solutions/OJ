'use strict';

OJ.extendClass(
	'OjTextElement', [OjElement],
	{
		'_constructor' : function(/*text*/){
			var args = arguments,
				ln = args.length,
				is_dom = ln && isDomElement(args[0]);

			this._super(OjElement, '_constructor', is_dom ? [args[0]] : []);

			if(ln && !is_dom){
				this.setText(args[0]);
			}
		},

		'_setDom' : function(dom_elm, context){
			// force text dom elm
			if(dom_elm.nodeName != "#text"){
				dom_elm = document.createTextNode(dom_elm.innerText);
			}

			this._super(OjElement, '_setDom', [dom_elm]);
		},


		'appendText' : function(str){
			this._dom.nodeValue += str.toString();
		},
		'prependText' : function(str){
			this._dom.nodeValue = str.toString() + this._dom.nodeValue;
		},


		'getText' : function(){
			return this._dom.nodeValue;
		},
		'setText' : function(str){
      this._dom.nodeValue = String.string(str);
		}
	}
);