(function(){
    String.string = function(val){
        if(isSet(val)){
            try{
                return isObject(val) && val.toString ? val.toString() : String(val);
            }
            catch(e){}
        }

        return "";
    };

    const proto = String.prototype;

    if(!proto.append){
        proto.append = function(str){
            return this + str;
        }
    }

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

    if(!proto.contains){
        proto.contains = function(obj){
            return this.indexOf(obj) != -1;
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

    if(!proto.format){
        proto.format = function(value_or_tokens){
            var self = this,
                args = Array.array(arguments),
                tokens = {},
                token;


            if(args.length == 1 && isObject(value_or_tokens)){
                tokens = value_or_tokens;
            }
            else{
                args.forEachReverse(function(item, i){
                    tokens[i] = item;
                });
            }

            for(token in tokens){
                self = self.replace(new RegExp('\\{' + token + '\\}', 'g'), tokens[token]);
            }

            return self;
        };
    }

    if(!proto.html){
        proto.html = function(){
            return this.replace(
                /[\u00A0-\u9999<>\&]/gim,
                function(i) {
                    return '&#'+i.charCodeAt(0)+';';
                }
            ).replaceAll(['\n', '\t'], ['<br />', '&nbsp;&nbsp;&nbsp;&nbsp;']);
        };
    }

    if(!proto.isEmpty){
        proto.isEmpty = function(){
            return this.trim() != '';
        };
    }

    if(!proto.pluralize){
        proto.pluralize = function(){
            var self = this,
                c = self.slice(-1),
                c2 = self.slice(-2),
                c3 = self.slice(-3);

            if(c == "s"){
                return self + "es";
            }

            if(c2 == "ey"){
                return self.slice(0, -2) + "ies";
            }

            if(c3 == "elf"){
                return self.slice(0, -3) + "elvs";
            }

            return self + "s";
        };
    }

    if(!proto.possessive){
        proto.possessive = function(){
            var self = this,
                c = self.slice(-1);

            if(c == "s"){
                return self + "'";
            }

            return self + "'s";
        };
    }

    if(!proto.prepend){
        proto.prepend = function(str){
            return str + this;
        }
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

    if(SVGAnimatedString){
        SVGAnimatedString.prototype.trim = function(){ return ""; }
    }
})();
