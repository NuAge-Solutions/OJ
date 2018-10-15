
OJ.extendClass(
    "OjWorker", [OjActionable],
    {
        "_props_" : {
            "on_message": null,
            "on_error": null
        },


        "_constructor" : function(path_or_func){
            var self = this;

            self._super(OjActionable, "_constructor", []);

            if(isFunction(path_or_func)){
                var blob = new Blob(
                        ["onmessage = " + path_or_func.toString()],
                        { type: "text/javascript"}
                    ),
                    url = window.URL.createObjectURL(blob);

                self._worker = new Worker(url);

                URL.revokeObjectURL(url);
            }
            else{
                self._worker = new Worker(path_or_func);
            }
        },


        "postMessage" : function(){
            var worker = this._worker;

            return worker.postMessage.apply(worker, arguments);
        },

        "terminate" : function(){
            var worker = this._worker;

            return worker.terminate.apply(worker, arguments);
        },


        ".on_error" : function(){
            return this._worker.onerror;
        },
        "=on_error" : function(func){
            return this._worker.onerror = func;
        },

        ".on_message" : function(){
            return this._worker.onmessage;
        },
        "=on_message" : function(func){
            return this._worker.onmessage = func;
        }
    }
);

