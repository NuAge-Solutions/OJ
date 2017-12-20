importJs("oj.libs.Moment");


// date functions
if(!Date.prototype.add){
    Date.prototype.add = function(milliseconds){
        return new Date(this.getTime() + milliseconds);
    };
}

if(!Date.prototype.clone){
    Date.prototype.clone = function(){
        return new Date(this.getTime());
    };
}

if(!Date.prototype.isEqual){
    Date.prototype.isEqual = function(date){
        return isDate(date) && this.getTime() == date.getTime();
    };
}

if(!Date.prototype.getTotalMinutes){
    Date.prototype.getTotalMinutes = function(no_partial){
        return (this.getHours() * 60) + this.getMinutes() + (no_partial ? 0 : this.getSeconds() / 60);
    };
}

if(!Date.prototype.exportData){
    Date.prototype.exportData = function(mode){
        return this.toISOString();
    }
}

if(!Date.prototype.getUTCTimezoneOffset){
    Date.prototype.getUTCTimezoneOffset = function(){
        return this.getTimezoneOffset() * -60;
    }
}

if(!Date.prototype.subtract){
    Date.prototype.subtract = function(milliseconds){
        return this.add(-1 * milliseconds);
    };
}

if(!Date.date){
    Date.date = function(val){
        if(val){
            return new Date(val);
        }

        return new Date();
    }
}

if(!Date.utcTimezoneOffset){
    Date.utcTimezoneOffset = function(){
        return (new Date()).getUTCTimezoneOffset();
    };
}