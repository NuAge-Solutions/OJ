importJs('oj.components.OjList');
importJs('oj.renderers.OjTextRenderer');


OJ.extendComponent(
    'OjValue', [OjComponent],
    {
        '_props_' : {
            'item_renderer' : OjTextRenderer,
            'label' : null,
            'name' : null,
            'value' : null
        },

        '_template' : 'oj.form.OjValue',


        "_constructor" : function(name, label, value){
            this._super(OjComponent, "_constructor", []);

            this._set("name", name);
            this._set("label", label);
            this._set("value", value);
        },


        '_redrawLabel' : function(){
            this.lbl.text = this.label;
        },

        '_redrawValue' : function(){
            var self = this,
                renderer = self.item_renderer,
                val = self.val,
                value = self.value;

            val.removeAllChildren();

            if(isArray(value)){
                val.appendChild(new OjList(value, renderer));
            }
            else{
                val.appendChild(new renderer(null, value));
            }
        },

        '=label' : function(label){
            var self = this;

            if(self._label == label){
                return;
            }

            self._label = label;

            self._redrawLabel();
        },

        '=name' : function(nm){
            var self = this;

            if(self._name == nm){
                return;
            }

            if(self._name){
                self.removeCss(nm + '-value');
            }

            self.addCss((self._name = nm) + '-value');
        },

        '=value' : function(value){
            var self = this;

            if(self._value == value){
                return;
            }

            self._value = value;

            self._redrawValue();
        }
    },
    {
        "_TAGS" : ["value"]
    }
);


OJ.extendComponent(
    'OjOptionsValue', [OjValue], {
        '_props_' : {
            'options' : null
        },

        '_constructor' : function(name, label, options, value){
            this.options = options;

            this._super(OjValue, '_constructor', [name, label, value]);
        },

        '_redrawValue' : function(){
            var self = this,
                options = self.options,
                renderer = self.item_renderer,
                val = self.val,
                value = self.value;

            val.removeAllChildren();

            if(options){
                if(isArray(value)){
                    value = value.clone();

                    value.forEachReverse(function(item, i){
                        value[i] = options[item];
                    });

                    val.appendChild(new OjList(value, renderer));
                }
                else{
                    val.appendChild(new renderer(null, options[value]));
                }
            }
        }
    }
);