OJ.importJs('oj.data.OjObject');


'use strict';

OJ.extendClass(
	'OjXml', [OjObject],
	{
		'_props_' : {
			'xml'  : null
		},


		'_constructor' : function(xml){
			this._super(OjObject, '_constructor', []);

			this.setXml(xml);
		},


		'attr' : function(attr /*, val*/){
			var args = arguments;

			if(args.length > 1){
				this._xml.setAttribute(attr, args[1]);

				return val;
			}

			return this._xml.getAttribute(attr);
		},

		'query' : function(xpath /*, limit=0*/){
			var args = arguments,
				i = 0, ln, xresult,
				limit = args.length > 1 ? args[1] : 0,
				result, results = [];

			// ie implementation
			if(!window.DOMParser){
				results = this._xml.selectNodes(xpath);

				ln = results.length;

				for(; i < ln && (!limit || i < limit); i++){
					results[i] = new OjXml(results[i]);
				}

				return limit == 1 ? (ln ? results[0] : null) : results.slice(0, limit);
			}

			// all other browser implementations
			xresult = (this._xml.ownerDocument ? this._xml.ownerDocument : this._xml).evaluate('.' + xpath, this._xml, null, XPathResult.ANY_TYPE, null);

			if(
				xresult.resultType == XPathResult.ORDERED_NODE_ITERATOR_TYPE ||
				xresult.resultType == XPathResult.UNORDERED_NODE_ITERATOR_TYPE
			){
				for(; (result = xresult.iterateNext()) && (!limit || i++ < limit);){
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
			var args = arguments,
				result;

			if(args.length){
				result = this.query('/' + args[0], 1);

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