importJs('oj.views.OjView');


OJ.extendComponent(
    'OjIframe', [OjView],
    {
        '_props_' : {
            "on_load" : null,
            'source' : null,
            'timeout' : 60
        },


        '_interval' : null,


        '_constructor' : function(source, target, on_load){
            var self = this;

            self._super(OjView, '_constructor', []);

            if(source){
                self.source = source;
            }

            if(target){
                self.target = target;
            }

            self.on_load = on_load;

            self.attr('name', self.id);
        },


        '_onLoad' : function(){
            clearInterval(this._interval);

            var on_load = this.on_load;

            if(on_load){
                on_load(true);
            }

            this.dispatchEvent(new OjEvent(OjEvent.COMPLETE));
        },

        '_onTimeout' : function(){
            clearInterval(this._interval);

            var on_load = this.on_load;

            if(on_load){
                on_load(false);
            }

            this.dispatchEvent(new OjIoError(OjIoError.IO_ERROR));
        },


        '.source' : function(){
            return this._source;
        },
        '=source' : function(source){
            var iframe = this.dom;

            this._source = source.toString();

            this.attr('src', this._source);

            if(!isEmpty(this._source)){
                clearInterval(this._interval);

                this._interval = setInterval(this._onTimeout.bind(this), this._timeout * 1000);

                var on_load_func = this._onLoad.bind(this);

                if(iframe.attachEvent){
                    iframe.attachEvent('onload', on_load_func);
                }
                else{
                    iframe.onload = on_load_func;
                }
            }
        }
    },
    {
        '_TAGS' : ['iframe'],
        '_TEMPLATE' : '<iframe></iframe>'
    }
);