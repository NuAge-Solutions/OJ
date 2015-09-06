var proto = Function.prototype;

if(!proto.bind){
    proto.bind = function(oThis){
        if(!isFunction(this)){
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.array(arguments).slice(1),
            fToBind = this,
            fNOP = function(){
            },
            fBound = function OjCallback(){
                return fToBind.apply(
                        this instanceof fNOP && oThis ? this : oThis,
                        aArgs.concat(Array.array(arguments))
                );
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}