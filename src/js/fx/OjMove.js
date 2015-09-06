OJ.importJs('oj.fx.OjDimTween');


OJ.extendClass(
	'OjMove', [OjDimTween],
	{
		'=amount' : function(amount){
            var self = this,
                dir = self.direction,
                cls = OjMove,
                to = self._to;

			if(self._amount == amount){
                return;
            }

            self._amount = amount;

			if(dir == cls.BOTH){
				to.x = amount[0];
				to.y = amount[1];
			}
			else if(dir == cls.X){
				to.x = amount;
			}
			else{
				to.y = amount;
			}
		}
	},
	{
		'X'    : OjDimTween.HORIZONTAL,
		'Y'    : OjDimTween.VERTICAL,
		'BOTH' : OjDimTween.BOTH
	}
);