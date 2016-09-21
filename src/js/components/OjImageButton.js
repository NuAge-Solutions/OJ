importJs('oj.components.OjButton');




OJ.extendComponent(
    'OjImageButton', [OjButton],
    {
        '_constructor' : function(/*image*/){
            this._super(OjButton, '_constructor', []);

            this._processArguments(arguments, {
                'icon' : null
            });

            this.removeChild(this.label);
        },

        '_processDomSourceChildren' : function(dom_elm, component){
            var txt = dom_elm.innerHTML;

            if(!isEmpty(txt)){
                this.icon = new OjImage(txt.trim());

                return null;
            }

            return this._super(OjButton, '_processDomSourceChildren', arguments);
        },


        '_makeLabel' : function(){
            // don't do anything since we don't need a label
        },


        '.image' : function(){
            return this.icon;
        },
        '=image' : function(img){
            this.icon = img;
        }
    },
    {
        '_TAGS' : ['oj-i-button', 'i-button', 'image-button']
    }
);