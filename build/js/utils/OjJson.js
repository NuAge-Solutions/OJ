Date.prototype.toJson=function(a){return isFinite(this.valueOf())?this.getUTCFullYear().toFormattedString(2,0)+"-"+(this.getUTCMonth()+1).toFormattedString(2,0)+"-"+this.getUTCDate().toFormattedString(2,0)+"T"+this.getUTCHours().toFormattedString(2,0)+":"+this.getUTCMinutes().toFormattedString(2,0)+":"+this.getUTCSeconds().toFormattedString(2,0)+"Z":null};Array.prototype.toJson=function(){return JSON.stringify(this)};String.prototype.toJson=Number.prototype.toJson=Boolean.prototype.toJson=function(a){return this.valueOf()};String.prototype.parseJson=function(){return JSON.parse(this,function(c,d){if(isString(d)&&d.substr(-1)=="Z"){var b=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(d);if(b){return new Date(Date.UTC(+b[1],+b[2]-1,+b[3],+b[4],+b[5],+b[6]))}}return d})};window.toJson=function(a){return JSON.stringify(a)};