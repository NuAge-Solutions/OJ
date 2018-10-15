importJs("oj.data.OjObject");




OJ.extendClass(
    "OjRect", [OjObject],
    {
        "_props_" : {
            "top"    : 0,
            "left"   : 0,
            "width"  : 0,
            "height" : 0
        },

        "_get_props_" : {
            "array": null,
            "bottom" : 0,
            "right"  : 0
        },


        "_constructor" : function(/*left, top, width, height*/){
            this._super(OjObject, "_constructor", []);

            this._processArguments(arguments, {
                "left" : 0,
                "top" : 0,
                "width" : 0,
                "height" : 0
            });
        },

        "delta" : function(rect){
            var self = this;

            return new OjRect(
                self.top - (rect ? rect.top : 0),
                self.left - (rect ? rect.left : 0),
                self.width - (rect ? rect.width : 0),
                self.height - (rect ? rect.height : 0)
            );
        },

        "hitTestPoint" : function(x, y){
            var self = this;

            return x >= self._left && x <= self._right && y >= self._top && y <= self._bottom;
        },

        "hitTestRect" : function(rect){
            var self = this;

            return (rect._top >= self._top && rect._top <= self._bottom && rect._left >= self._left && rect._left <= self._right) ||
                (rect._top >= self._top && rect._top <= self._bottom && rect._right >= self._left && rect._right <= self._right) ||
                (rect._bottom >= self._top && rect._bottom <= self._bottom && rect._left >= self._left && rect._left <= self._right) ||
                (rect._bottom >= self._top && rect._bottom <= self._bottom && rect._right >= self._left && rect._right <= self._right);
        },


        ".array" : function(){
            return [this.left, this.top, this.width, this.height];
        },

        "=top" : function(val){
            var self = this;

            self._bottom = (self._top = val) + self._height;
        },

        "=left" : function(val){
            var self = this;

            self._right = (self._left = val) + self._width;
        },

        "=width" : function(val){
            var self = this;

            self._right = (self._width = val) + self._left;
        },

        "=height" : function(val){
            var self = this;

            self._bottom = (self._height = val) + self._top;
        }
    },
    {
        "rect" : function(obj){
            if(isObjective(obj, OjRect)){
                return obj;
            }

            if(isObject(obj)){
                if(isSet(obj.top) && isSet(obj.left) && isSet(obj.width) && isSet(obj.height)){
                    return new OjRect(obj.left, obj.top, obj.width, obj.height);
                }
            }
            else if(isArray(obj) && obj.length == 4){
                return new OjRect(obj[0], obj[1], obj[2], obj[3]);
            }

            return new OjRect();
        }
    }
);