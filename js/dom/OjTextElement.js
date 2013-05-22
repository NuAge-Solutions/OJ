'use strict';

OJ.extendClass(
	OjElement, 'OjTextElement',
	{
		'_constructor' : function(/*text*/){
			this._super('OjTextElement', '_constructor', []);

			if(arguments.length){
				this.setText(arguments[0]);
			}
		},

		'_setDom' : function(dom_elm, context){
			if(dom_elm.nodeName != "#text"){
				dom_elm = document.createTextNode(dom_elm.innerText);
			}

			// force text dom elm
			this._super('OjTextElement', '_setDom', [dom_elm, context]);
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
			this._dom.nodeValue = str ? str.toString() : null;
		}
	}
);