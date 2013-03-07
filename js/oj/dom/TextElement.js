'use strict';

OJ.compileClass(
	'OjTextElement',
	oj.dom.TextElement = function(){
		return new oj.dom.Element(
			arguments, 'OjTextElement',
			{
				'_constructor' : function(/*text*/){
					this._super('OjTextElement', '_constructor', []);

					if(arguments.length){
						this.setText(arguments[0]);
					}
				},


				'appendText' : function(str){
					this._dom.innerHTML += str.toString();
				},
				'prependText' : function(str){
					this._dom.innerHTML = str.toString() + this._dom.innerHTML;
				},


				'getText' : function(){
					return this._dom.nodeValue;
				},
				'setText' : function(str){
					this._dom.innerHTML = str ? str.toString() : null;
				}
			}
		);
	}
);