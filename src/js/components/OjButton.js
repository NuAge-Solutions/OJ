importJs("oj.components.OjLink");


OJ.extendComponent(
    "OjButton", [OjLink],
    {
        "_props_" : {
            "callback" : null,
            "label" : null
        },


        "_constructor" : function(/*label, icon, callback*/){
            this._super(OjLink, "_constructor", []);

            this.addCss("no-select");

            this._processArguments(arguments, {
                "text" : undefined,
                "icon" : undefined,
                "callback" : undefined
            });
        },


        "_onUiPress" : function(evt){
            this._super(OjLink, "_onUiPress", arguments);

            if(this.callback){
                this.callback(evt);
            }
        },


        'redraw' : function(){
            if(this._super(OjLink, 'redraw', arguments)){
                // note: hack for webkit render bug
                if(OJ.engine == OJ.WEBKIT){
                    this._setStyle('font-size', '1px');

                    this._setStyle('font-size', null);
                }

                return true;
            }

            return false;
        },


        '.label' : function(){
              return this.text;
        },
        '=label' : function(label){
            this.text = label;
        },

        '=is_active' : function(active){
            this._super(OjLink, '=is_active', arguments);

            if(this._icon){
                this._icon.is_active = active;
            }
        }
    },
    {
        '_TAGS' : ['button'],

        "button" : function(params, cls){
            cls = cls || OjButton;

            if(isObjective(params, cls)){
                return params;
            }

            if(isArray(params)){
                return new cls(params[0], params[1], params[2]);
			}

			if(isObject(params)){
			    return new cls(params.label, params.icon, params.callback);
			}

			return new cls(params);
        }
    }
);