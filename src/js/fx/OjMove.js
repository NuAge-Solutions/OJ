importJs("oj.fx.OjDimTween");


OJ.extendClass(
    "OjMove", [OjDimTween],
    {
        "=amount" : function(amount){
            const self = this,
                dir = self.direction,
                cls = OjMove,
                to = self._to;

            if(self._amount == amount){
                return;
            }

            self._amount = amount;

            if(dir == cls.BOTH){
                to.top = amount[0];
                to.left = amount[1];
            }
            else{
                to[dir] = amount;
            }
        }
    },
    {
        "X"    : "left",
        "Y"    : "top",
        "BOTH" : OjDimTween.BOTH,

        "TOP"    : "top",
        "LEFT"   : "left",
        "BOTTOM" : "bottom",
        "RIGHT"  : "right"
    }
);