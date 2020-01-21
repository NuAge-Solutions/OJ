importJs("oj.data.OjObject");


OJ.extendClass(
    "OjUrl", [OjObject],
    {
        "_props_" : {
            "protocol"     : null,
            "host"         : null,
            "port"         : null,
            "path"         : null,
            "query"        : null,
            "query_params" : null,
            "hash"         : null,
            "hashbang"     : null,
            "source"       : null
        },


        "_constructor" : function(url){
            this._super(OjObject, "_constructor", []);

            this._dirty = {};

            this.source = url || "";
        },


        "_updateQuery" : function(){
            if(this._dirty.query){
                this._query = Object.toQueryString(this._query_params);

                this._dirty.query = undefined;
            }

            return this._query;
        },


        "clone" : function() {
            return new OjUrl(this.toString());
        },

        "getQueryParam" : function(key){
            return this._query_params[key];
        },

        "setQueryParam" : function(key, value){
            const params = this._query_params;

            if(isSet(value)){
                params[key] = value;
            }
            else{
                delete params[key];
            }

            this._dirty.query = true;
        },

        "toString" : function() {
            const str = String.string,
                hash = this.hash,
                port = this.port,
                protocol = this.protocol,
                query = this._updateQuery();

            return (protocol ? protocol + ":" : "") + "//" + str(this.host) + (port ? ":" + port : "") +
                   str(this.path) + (isEmpty(query) ? "" : "?" + query) + (isEmpty(hash) ? "" : "#" + hash);
        },


        "=protocol" : function(protocol){
            this._protocol = (protocol || "http").replaceAll([":", "/"], "");
        },

        "=path" : function(path){
            if(path && path.charAt(0) != "/"){
                path = "/" + path;
            }

            this._path = path;
        },

        ".query" : function(){
            return this._updateQuery();
        },
        "=query" : function(query){
            if(isString(query) && query.charAt(0) == "?"){
                query = query.substr(1);
            }

            if(this._query == query && !this._dirty.query){
                return
            }

            this._query_params = (this._query = query || "").parseQueryString();
        },

        ".query_params" : function(){
            return Object.clone(this._query_params);
        },
        "=query_params" : function(params){
            this._query_params = params ? params.clone() : {};

            this._dirty.query = true;
        },

        ".hash" : function(){
            return this._hash;
        },
        "=hash" : function(hash){
            if(isString(hash) && hash.charAt(0) == "#"){
                hash = hash.substr(1);
            }

            this._hash = hash;
        },

        ".hashbang" : function(){
            const hash = this.hash;

            return hash && hash[0] == "!" ? hash.substr(1) : null;
        },

        "=hashbang" : function(val){
            this.hash = "!" + val;
        },

        ".source" : function(){
            return this.toString();
        },
        "=source" : function(val){
            const a = document.createElement("a");

            if(isObjective(val)){
                val = val.toString();
            }

            // create an anchor and let the dom do the url parsing
            a.href = val;

            // get the parsed url info from the a element
            this.protocol = a.protocol;

            this.host = a.hostname;

            this.port = a.port;

            this.path = a.pathname;

            this.query = a.search;

            this.hash = a.hash;

            this._dirty = {};
        }
    },
    {
        "url" : function(obj){
            if(obj){
                if(isString(obj)){
                    return new OjUrl(obj)
                }

                if(isObjective(obj, OjUrl)){
                    return obj;
                }

                return new OjUrl();
            }

            return null;
        }
    }
);