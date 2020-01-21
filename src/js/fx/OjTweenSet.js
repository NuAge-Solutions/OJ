importJs('oj.events.OjActionable');
importJs('oj.fx.OjPropTween');




OJ.extendClass(
    'OjTweenSet', [OjActionable],
    {
        '_props_' : {
            'tweens' : null
        },

        '_get_props_' : {
            'num_tweens' : null,
            'is_finished' : false
        },


        '_constructor' : function(/*tweens|tween, tween, tween...*/){
            const args = arguments;

            this._completed = [];
            this._tweens = [];

            this._super(OjActionable, '_constructor', []);

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
            const self = this,
                tweens = self._tweens;

            self.stop();

            self.tweens = null;

            if(depth){
                tweens.forEach((item) => {
                    OJ.destroy(item, depth);
                });
            }

            return self._super(OjActionable, '_destructor', arguments);
        },


        '_checkCompleted' : function(){
            if(this.num_tweens == this._completed.length && !this._is_finished){
                const evt = OjTweenEvent;

                this._is_finished = true;

                this.dispatchEvent(new evt(evt.COMPLETE));
            }
        },


        '_onTweenComplete' : function(evt){
            const completed = this._completed,
                tween = evt.target;

            if(!completed.contains(tween)){
                completed.append(tween);
            }

            this._checkCompleted();
        },


        '_controlTweens' : function(command, args){
            this._tweens.forEach((item) => {
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
            if(this.hasTween(tween)){
                return;
            }

            this._is_finished = false;

            tween.addEventListener(OjTweenEvent.COMPLETE, this, '_onTweenComplete');

            return this._tweens.append(tween);
        },

        'removeTween' : function(tween){
            const tweens = this._tweens,
                index = tweens.indexOf(tween);

            if(index == -1){
                return;
            }

            tween.removeEventListener(OjTweenEvent.COMPLETE, this, '_onTweenComplete');

            tweens.removeAt(index);

            this._checkCompleted();

            return tween;
        },

        'hasTween' : function(tween){
            return this._tweens.contains(tween);
        },


        '.num_tweens' : function(){
            return this._tweens.length;
        },

        '.tweens' : function(){
            return this._tweens.clone();
        },
        '=tweens' : function(tweens){
            const self = this;

            self._tweens.forEach((item) => {
                self.removeTween(item);
            });

            if(tweens){
                tweens.forEach((item) => {
                    self.addTween(item);
                });
            }
        }
    }
);