importJs('oj.events.OjActionable');


OJ.extendClass(
    'OjData', [OjActionable],
    {

        '_props_' : {
            'id' : null,
            'label' : null
        },


        '_constructor' : function(/*id, label*/){
            this._super(OjActionable, '_constructor', []);

            this._processArguments(arguments, {
                'id' : undefined,
                'label' : undefined
            });
        },

        "toString" : function(){
            return this.label;
        }
    }
);