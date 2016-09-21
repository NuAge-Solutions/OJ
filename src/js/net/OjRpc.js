importJs('oj.net.OjUrlLoader');
importJs('oj.net.OjUrlRequest');


OJ.extendClass(
    'OjRpc', [OjUrlLoader],
    {
        '_props_' : {
            'method' : null,
            'params' : null
        },

        '_get_props_' : {
            'id' : null
        },


        '_constructor' : function(url, method, params/*, content_type, async*/){
            this._super(OjUrlLoader, '_constructor', []);

            var args = arguments,
                ln = args.length;

            this.content_type = ln > 3 ? args[3] : OjUrlRequest.JSON;

            this.request = new OjUrlRequest(
                url,
                {
                    'id'        : this._id = OjRpc.guid(),
                    'method'    : method,
                    'params'    : Array.array(params)
                },
                this._content_type,
                OjUrlRequest.POST
            );

            if(ln > 4){
                this.async = args[4];
            }
        },

        'load' : function(){
            return this._super(OjUrlLoader, 'load', []);
        },


        '.request' : function(){
            // todo: add clone request for getRequest() func
            return this._request;
        },

        '=method' : function(val){
            if(this._method == val){
                return;
            }

            this._request.data.method = (this._method = val);
        },

        '=params' : function(val){
            if(this._params == val){
                return;
            }

            this._request.data.params = (this._params = val);
        }
    },
    {
        'guid' : function(){
            return OJ._guid++;
        }
    }
);