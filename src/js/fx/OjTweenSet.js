importJs('oj.events.OjActionable');
importJs('oj.fx.OjPropTween');




OJ.extendClass(
    'OjTweenSet', [OjActionable],
    {
        '_props_' : {
            'tweens' : null
        },

        '_get_props_' : {
            'numTweens' : null,
            'isFinished' : false
        },


        '_constructor' : function(/*tweens|tween, tween, tween...*/){
            var self = this,
                args = arguments;

            self._completed = [];
            self._tweens = [];

            self._super(OjActionable, '_constructor', []);

            if(args.length){
                if(isArray(args[0])){
                    this.tweens = args[0];
                }
                else{
                    this.tweens = Array.array(arguments);
                }
            }
        },

        '_destructor' : function(depth){
            var self = this,
                tweens = self._tweens;

            this.stop();

            if(depth){
                tweens.forEachReverse(function(item){
                    OJ.destroy(item, depth);
                });
            }
            else{
                tweens.forEachReverse(function(item){
                    self.removeTween(item);
                });
            }

            return self._super(OjActionable, '_destructor', arguments);
        },


        '_checkCompleted' : function(){
            var self = this,
                evt = OjTweenEvent;

            if(self._tweens.length == self._completed.length && !self.isFinished){
                self.dispatchEvent(new evt(evt.COMPLETE));
            }
        },


        '_onTweenComplete'  : function(evt){
            var self = this,
                completed = self._completed,
                tween = evt.target;

            if(!completed.contains(tween)){
                completed.append(tween);
            }

//                this.dispatchEvent(new OjTweenEvent(OjTweenEvent.TICK));

            self._checkCompleted();
        },


        '_controlTweens' : function(command, args){
            this._tweens.forEachReverse(function(item){
                item[command].apply(item, args);
            });
        },

        'start' : function(){
            this._controlTweens('start', arguments);
        },

        'pause' : function(){
            this._controlTweens('pause', arguments);
        },

        'stop' : function(){
            this._controlTweens('stop', arguments);
        },

        'reverse' : function(){
            this._controlTweens('reverse', arguments);
        },


        // tween management functions
        'addTween' : function(tween){
            var self = this;

            if(self.hasTween(tween)){
                return;
            }

            self._isFinished = false;

            tween.addEventListener(OjTweenEvent.COMPLETE, self, '_onTweenComplete');

            return self._tweens.append(tween);
        },

        'removeTween' : function(tween){
            var self = this,
                tweens = self._tweens,
                index = tweens.indexOf(tween);

            if(index == -1){
                return;
            }

            tween.removeEventListener(OjTweenEvent.COMPLETE, self, '_onTweenComplete');

            tweens.removeAt(index);

            self._checkCompleted();

            return tween;
        },

        'hasTween' : function(tween){
            return this._tweens.contains(tween);
        },


        '.numTweens' : function(){
            return this._tweens.length;
        },

        '.tweens' : function(){
            return this._tweens.clone();
        },
        '=tweens' : function(tweens){
            var self = this;

            self._tweens.forEachReverse(function(item){
                self.removeTween(item);
            });

            if(tweens){
                tweens.forEachReverse(function(item){
                    self.addTween(item);
                });
            }
        }
    }
);