String.string = function(val){
    if(isSet(val)){
        return isObject(val) ? val.toString() : String(val);
    }

    return '';
};


var proto = String.prototype;

if(!proto.chunk){
    proto.chunk = function(size, callback){
        var num = Math.ceil(this.length / size), // | 0,
            chunks = new Array(num),
            i = 0,
            o = 0;

        for(; i < num; ++i, o += size) {
            chunks[i] = this.substr(o, size);

            if(callback){
                callback(chunks[i])
            }
        }

        return chunks;
    };
}

if(!proto.lcFirst){
    proto.lcFirst = function(){
        return this.charAt(0).toLowerCase() + this.slice(1);
    };
}


if(!proto.ucFirst){
    proto.ucFirst = function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
}


if(!proto.capitalize){
    proto.capitalize = function(){
        var str = '',
            words = this.split(' '),
            ln = words.length;

        for(; ln--;){
            if(str != ''){
                str = ' ' + str;
            }

            str = words[ln].ucFirst() + str;
        }

        return str;
    };
}

if(!proto.compareVersion){
    proto.compareVersion = function(v){
        var i = 0,
            res = 0,
            p1 = this.split('.'),
            p2 = v.split('.'),
            ln = Math.max(p1.length, p2.length);

        for(; i < ln; i++){
            var t1 = (i < p1.length) ? parseInt(p1[i], 10) : 0,
                t2 = (i < p2.length) ? parseInt(p2[i], 10) : 0;

            if(isNaN(t1)){
                t1 = 0;
            }

            if(isNaN(t2)){
                t2 = 0;
            }

            if(t1 != t2){
                res = (t1 > t2) ? 1 : -1;

                break;
            }
        }

        return res;
    };
}

if(!proto.count){
    proto.count = function(needle){
        return (this.match(new RegExp(needle.regexEscape(), 'g')) || []).length;
    };
}

if(!proto.decodeUri){
    proto.decodeUri = function(){
        return decodeURIComponent(this);
    };
}

if(!proto.encodeUri){
    proto.encodeUri = function(){
        return encodeURIComponent(this);
    };
}

if(!proto.html){
    proto.html = function(){
        return this.replaceAll(['\n', '\t'], ['<br />', '&nbsp;&nbsp;&nbsp;&nbsp;']);
    };
}

if(!proto.isEmpty){
    proto.isEmpty = function(){
        return this.trim() != '';
    };
}

if(!proto.trim){
    proto.trim = function(){
        return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    };
}

if(!proto.ltrim){
    proto.ltrim = function(){
        return this.replace(/^\s+/, '');
    };
}

if(!proto.rtrim){
    proto.rtrim = function(){
        return this.replace(/\s+$/, '');
    };
}

if(!proto.fulltrim){
    proto.fulltrim = function(){
        return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
    };
}

if(!proto.clean){
    proto.clean = function(obj){
        return obj.replace(/\r/g, '');
    };
}

if(!proto.regexSpecialChars){
    proto.regexSpecialChars = new RegExp('[.*+?$|()\\[\\]{}\\\\]', 'g'); // .*+?$|()[]{}\
}

if(!proto.regexEscape){
    proto.regexEscape = function(){
        return this.replace(String.prototype.regexSpecialChars, '\\$&');
    };
}

if(!proto.replaceAll){
    proto.replaceAll = function(needle, replace){
        if(Array.isArray(needle)){
            var haystack = this, i, ln = needle.length;

            replace = needle.equalize(replace);

            for(i = 0; i < ln; i++){
                haystack = haystack.replace(new RegExp(needle[i].regexEscape(), 'g'), replace[i]);
            }

            return haystack;
        }
        else{
            return this.replace(new RegExp(needle.regexEscape(), 'g'), replace);
        }
    };
}