

// t = time, o = origin, d = delta, l = length
window.OjEasing = {
    'NONE' : function(t, o, d, l){
        return ((d * t) / l) + o;
    },

    'IN' : function(t, o, d, l){
        return (-d * Math.cos((t / l) * (Math.PI / 2))) + d + o;
    },

    'OUT' : function(t, o, d, l){
        return (d * Math.sin((t / l) * (Math.PI / 2))) + o;
    },

    'IN_OUT' : function(t, o, d, l){
        return ((-d / 2) * (Math.cos((Math.PI * t) / l) - 1)) + o;
    },

    'STRONG_IN' : function(t, o, d, l){
        return (t == 0) ? o : d * Math.pow(2, 10 * ((t / l) - 1)) + o;
    },

    'STRONG_OUT' : function(t, o, d, l){
        return (t == l) ? o + d : d * (-Math.pow(2, -10 * (t / l)) + 1) + o;
    },

    'STRONG_IN_OUT' : function(t, o, d, l){
        if(t == 0){ return o; }

        if(t == l){ return o + d; }

        t = t / (l / 2);

        if(t < 1){ return (d / 2) * Math.pow(2, 10 * (t - 1)) + o; }

        return (d / 2) * (-Math.pow(2, -10 * --t) + 2) + o;
    },

    'ELASTIC_IN' : function(t, o, d, l, a, p){
        if(t == 0){ return o; }

        t = t / l;

        if(t == 1){ return o + d; }

        if(!p){ p = l * .3; }

        var s;

        if(!a || a < Math.abs(d)){
            a = d;

            s = p / 4;
        }
        else{
            s = (p / (2 * Math.PI)) * Math.asin(d / a);
        }

        return (-(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * l) - s) * (2 * Math.PI) / p))) + d;
    },

    'ELASTIC_OUT' : function(t, o, d, l, a, p){
        if(t == 0){ return o; }

        t = t / l;

        if(t == 1){ return o + d; }

        if(!p){ p = l * .3; }

        var s;

        if(!a || a < Math.abs(d)){
            a = d;

            s = p / 4;
        }
        else{
            s = (p / (2 * Math.PI)) * Math.asin(d / a);
        }

        return (a * Math.pow(2, -10 * t) * Math.sin((t * l - s) * (2 * Math.PI) / p) + d + o);
    },

    'ELASTIC_IN_OUT' : function(t, o, d, l, a, p){
        if(t == 0){ return o; }

        t = t / (l / 2);

        if(t == 2){ return o + d; }

        if(!p){ p = l * (.3 * 1.5); }

        var s;

        if(!a || a < Math.abs(d)){
            a = d;

            s = p / 4;
        }
        else{
            s = (p / (2 * Math.PI)) * Math.asin(d / a);
        }

        if(t < 1){ return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * l - s) * (2 * Math.PI) / p)) + o; }

        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * l - s) * (2 * Math.PI) / p) * .5 + d + o;
    }
};