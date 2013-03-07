'use strict';

/**
 * Query String Prototype Functions
 */
Array.prototype.toQueryString = function(/*prefix*/){
	var str = '', i, p, ln = this.length, prefix = arguments.length ? arguments[0] : null;

	for(i = 0; i < ln; i++){
		if(isFunction(this[i])){
			continue;
		}

		if(str != ''){
			str += '&';
		}

		p = prefix ? prefix + '[' + i + ']' : i + '';

		if(isObject(this[i])){
			str += this[i].toQueryString ? this[i].toQueryString(p) : Object.toQueryString(this[i], p);
		}
		else{
			str += p + '=' + encodeURI(this[i]);
		}
	}

	return str;
};

Object.toQueryString = function(obj/*, prefix*/){
	var key, str = '', p, prefix = arguments.length > 1 ? arguments[1] : null;

	for(key in obj){
		if(isFunction(obj[key]) || obj[key] == obj){
			continue;
		}

		if(str != ''){
			str += '&';
		}

		p = prefix ? prefix + '[' + encodeURI(key) + ']' : encodeURI(key);

		if(obj[key]){
			if(isFunction(obj[key].toQueryString)){
				str += obj[key].toQueryString(p);
			}
			else{
				str += Object.toQueryString(obj[key], p);
			}
		}
		else{
			str += p + '=';
		}
	}

	return str;
};

String.prototype.toQueryString = Number.prototype.toQueryString = Boolean.prototype.toQueryString = function(key){
	return key + '=' + encodeURI(this.valueOf());
};

String.prototype.parseQueryString = function(){
	var str = this, obj = {}, vars, ln, parts, i, ln2, tmp;

	if(str[0] == '?'){
		str = str.substring(1);
	}

	vars = str.split('&');
	ln = vars.length;

	while(ln-- > 0){
		parts = vars[ln].split('=');

		parts[0] = parts[0].replaceAll(']', '').split('[');

		ln2 = parts[0].length;

		if(ln2 > 1){
			if(!obj[parts[0][0]]){
				obj[parts[0][0]] = {};
			}

			obj[parts[0][0]][parts[0][1]] = parts[1];
		}
		else{
			obj[parts[0][0]] = parts[1];
		}
	}

	return obj;
};

window['toQueryString'] = function(obj){
	if(obj){
		if(obj.toQueryString){
			return obj.toQueryString();
		}
		else if(isObject(obj)){
			return Object.toQueryString(obj);
		}
	}

	return '';
};