OJ.importCss('oj.components.OjLabel');


OJ.extendComponent(
    'OjLabel', [OjComponent],
    {
        '_props_' : {
            'prefix' : null,
            'suffix' : null
        },

        '_template' : '<label></label>',


        '_constructor' : function(text){
            this._super(OjComponent, '_constructor', []);

            this.text = text;
        },

        '_processDomSourceChild' : function(){
            var self = this,
                child = self._super(OjComponent, '_processDomSourceChild', arguments);

            if(child && (child.is(OjTextElement) || child.is(OjLabel))){
                self.text = child.text;

                return;
            }

            return child;
        },

        //'_processDomSourceChildren' : function(dom_elm, component){
        //    var txt = dom_elm.innerHTML;
        //
        //    if(!isEmpty(txt)){
        //        this.text = String.string(this.text) + String.string(txt);
        //
        //        return;
        //    }
        //
        //    return this._super(OjComponent, '_processDomSourceChildren', arguments);
        //},

        '_redrawText' : function(){
            var self = this;

            self.dom.innerHTML = String.string(self.prefix).html() + String.string(self.text).html() + String.string(self.suffix).html();
        },


        'appendText' : function(str){
            this.text = String.string(this.text) + String.string(str);
        },

        'prependText' : function(str){
            this.text = String.string(str) + String.string(this.text);
        },

        'redraw' : function(){
            if(this._super(OjComponent, 'redraw', arguments)){
                this._redrawText();

                return true;
            }

            return false;
        },


        '=prefix' : function(val){
            if(this._prefix == val){
                return;
            }

            this._prefix = val;

            this.redraw();
        },

        '=suffix' : function(val){
            if(this._suffix == val){
                return;
            }

            this._suffix = val;

            this.redraw();
        },

        // these are needed to override the OjStyleElement text getter/setter
        '.text' : function(){
            return this._text;
        },

        '=text' : function(val){
            if(this._text == val){
                return;
            }

            this._text = val;

            this.redraw();
        }
    },
    {
        '_TAGS' : ['label']
    }
);