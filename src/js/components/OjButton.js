importJs('oj.components.OjLink');


OJ.extendComponent(
    'OjButton', [OjLink],
    {
        '_props_' : {
            'label' : null
        },


        '_constructor' : function(/*label, icon*/){
            var self = this;

            self._super(OjLink, '_constructor', []);

            self.addCss('no-select');

            self._processArguments(arguments, {
                'text' : undefined,
                'icon' : undefined
            });
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
        '_TAGS' : ['button']
    }
);