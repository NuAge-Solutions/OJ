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