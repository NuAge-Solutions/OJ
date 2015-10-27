// date functions
if(!Date.time){
    Date.time = function(){
        return (new Date()).getTime();
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