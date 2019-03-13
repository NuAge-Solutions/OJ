importJs("oj.data.OjObject");


OJ.extendClass(
    "OjActionable", [OjObject],
    {

        // Internal Vars
        "_prevent_dispatch" : false,


        // Internal Methods
        "_constructor" : function(){
            this._actionable = this;

            this._super(OjObject, "_constructor", arguments);
        },

        "_destructor" : function(){
            // dispatch a destroy event and then destroy all active listeners
            if(this._actionable){

                this.dispatchEvent(new OjEvent(OjEvent.DESTROY));

                this.removeAllListeners();

                this._actionable = null;
            }

            return this._super(OjObject, "_destructor", arguments);
        },


        // Public Methods
        "addEventListener" : function(type, context, callback){
            EventManager.addEventListener(this._actionable, type, context, callback);
        },

        "hasEventListener" : function(type){
            return EventManager.hasEventListener(this._actionable, type);
        },

        "hasEventListeners" : function(type/*|types, type*/){
            let args = arguments,
                  ln = args.length;

            if(ln == 1){
                if(isArray(args[0])){
                    args = args[0];

                    ln = args.length;
                }
                else{
                    args = [args[0]];

                    ln = 1;
                }
            }

            for(; ln--;){
                if(!EventManager.hasEventListener(this._actionable, args[ln])){
                    return false;
                }
            }

            return true;
        },

        "removeAllListeners" : function(){
            return EventManager.removeAllListeners(this._actionable);
        },

        "removeEventListener" : function(type, context, callback){
            EventManager.removeEventListener(this._actionable, type, context, callback);
        },

        "dispatchEvent" : function(evt){
            if(this._prevent_dispatch || evt.canceled){
                return;
            }

            if(this._actionable){
                EventManager.dispatchEvent(this._actionable, evt);
            }
        }
    },
  {
    "ADD" : "add",
    "REMOVE" : "remove"
  }
);