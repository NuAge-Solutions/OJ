OJ.importJs('oj.data.Object');


'use strict';

OJ.extendClass(
	OjObject, 'OjXml',
	{
		'_props_' : {
			'xml'  : null
		},


		'_constructor' : function(xml){
			this._super('OjXml', '_constructor', []);

			this.setXml(xml);
		},


		'attr' : function(attr /*, val*/){
			if(arguments.length > 1){
				this._xml.setAttribute(attr, arguments[1]);

				return val;
			}

			return this._xml.getAttribute(attr);
		},

		'query' : function(xpath /*, limit=0*/){
			var i = 0, limit = arguments.length > 1 ? arguments[1] : 0;
			var result, results = [];

			// ie implementation
			if(!window.DOMParser){
				results = this._xml.selectNodes(xpath);

				var ln = results.length;

				for(; i < ln && (!limit || i < limit); i++){
					results[i] = new OjXml(results[i]);
				}

				return limit == 1 ? (ln ? results[0] : null) : results.slice(0, limit);
			}

			// all other browser implementations
			var xresult = (this._xml.ownerDocument ? this._xml.ownerDocument : this._xml).evaluate('.' + xpath, this._xml, null, XPathResult.ANY_TYPE, null);

			if(
				xresult.resultType == XPathResult.ORDERED_NODE_ITERATOR_TYPE ||
				xresult.resultType == XPathResult.UNORDERED_NODE_ITERATOR_TYPE
			){
				while((result = xresult.iterateNext()) && (!limit || i++ < limit)){
					results.push(new OjXml(result));
				}

				return limit == 1 ? (results.length ? results[0] : null) : results;
			}

			if(xresult.resultType == XPathResult.STRING_TYPE){
				return xresult.stringValue;
			}

			if(xresult.resultType == XPathResult.NUMBER_TYPE){
				return xresult.numberValue;
			}

			if(xresult.resultType == XPathResult.BOOLEAN_TYPE){
				return xresult.booleanValue;
			}

			return null;
		},

		'value' : function(/*xpath, value*/){
			if(arguments.length){
				var xpath = arguments[0];

				var result = this.query('/' + xpath, 1);

				return result ? result.value() : null;
			}

			return this._xml.textContent;
		},


		'setXml' : function(xml){
			this._xml = toXml(xml);
		}
	},
	{
		'xml' : function(xml){
			if(isXml(xml)){
				return new OjXml(xml);
			}

			if(isString(xml)){
				return new OjXml(toXml(xml));
			}

			return isObjective(xml) && xml.is('OjXml') ? xml : null;
		}
	}
);