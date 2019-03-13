importJs('oj.events.OjActionable');


OJ.extendClass(
    'OjData', [OjActionable],
    {

        '_props_' : {
            'id' : null,
            'label' : null
        },


        '_constructor' : function(id, label){
            this._super(OjActionable, '_constructor', []);

            this._set("id", id);
            this._set("label", label);
        },

        "exportData" : function(){
            const obj = this._super(OjActionable, 'exportData', arguments);

            obj.id = this.id;
            obj.label = this.label;

            return obj;
        },

        "toString" : function(){
            return this.label;
        }
    }
);