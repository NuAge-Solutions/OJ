OJ.importJs('oj.components.OjComponent');


OJ.extendComponent(
    'OjIcon', [OjComponent], {
        '_props_' : {
            'source' : null
        },

        '_template' : '<i></i>',


        '_constructor' : function(icon_class){
            var self = this,
                args = arguments;

            self._super(OjComponent, '_constructor', []);

            if(icon_class){
                self.source = args.length == 1 ? icon_class : Array.array(args).join(' ');
            }
        },

        '_processDomSourceChild' : function(){
            var self = this,
                child = self._super(OjComponent, '_processDomSourceChild', arguments);

            if(child && child.is(OjTextElement)){
                self.source = child.text;

                return;
            }

            return child;
        },

        '_setCss' : function(){
            // don't do anything here
        },

        '=source' : function(val){
            var self = this,
                old = self._source;

            if(old == val){
                return;
            }

            if(old){
                self.removeCss(old);
            }

            if(self._source = val){
                self.addCss(val);
            }
        }
    },
    {
        '_TAGS' : ['i', 'icon']
    }
);