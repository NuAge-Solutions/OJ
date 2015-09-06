/**
 * JSON Prototype Functions
 */
Date.prototype.toJson = function(key){
	return isFinite(this.valueOf()) ?
		this.getUTCFullYear().toFormattedString(2, 0) + '-' +
			(this.getUTCMonth() + 1).toFormattedString(2, 0) + '-' +
			this.getUTCDate().toFormattedString(2, 0) + 'T' +
			this.getUTCHours().toFormattedString(2, 0) + ':' +
			this.getUTCMinutes().toFormattedString(2, 0) + ':' +
			this.getUTCSeconds().toFormattedString(2, 0) + 'Z'
		: null;
};

Array.prototype.toJson = function(){
	return JSON.stringify(this);
};

String.prototype.toJson = Number.prototype.toJson = Boolean.prototype.toJson = function(key){
	return this.valueOf();
};

String.prototype.parseJson = function(){
	return JSON.parse(this, function(key, value){
		// date revival
		if(isString(value) && value.substr(-1) == 'Z'){
			var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);

			if(a){
				return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
			}
		}

		return value;


	});
};

window.toJson = function(obj){
    return JSON.stringify(obj);
};