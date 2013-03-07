OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.fx.PropTween');


'use strict';

OJ.compileClass(
	'OjTweenSet',
	oj.fx.TweenSet = function(){
		return new oj.events.Actionable(
			arguments, 'OjTweenSet',
			{
				'_tweens' : null,  '_completed' : null,  '_is_finished' : false,


				'_constructor' : function(/*tweens|tween, tween, tween...*/){
					this._tweens = [];

					this._completed = [];

					this._super('OjTweenSet', '_constructor', []);

					if(arguments.length){
						if(isArray(arguments[0])){
							this.setTweens(arguments[0]);
						}
						else{
							this.setTweens(arguments);
						}
					}
				},

				'_destructor' : function(/*recursive = false*/){
					var ln = this._tweens.length;

					this.stop();

					if(arguments.length && arguments[0]){
						while(ln-- > 0){
							OJ.destroy(this._tweens[ln]);
						}
					}
					else{
						while(ln-- > 0){
							this.removeTween(this._tweens[ln]);
						}
					}

					return this._super('OjTweenSet', '_destructor', arguments);
				},


				'_checkCompleted' : function(){
					if(this._tweens.length == this._completed.length && !this._is_finished){
						this.dispatchEvent(new OjTweenEvent(OjTweenEvent.COMPLETE));
					}
				},


				'_onTweenComplete'  : function(evt){
					var tween = evt.getTarget();

					if(this._completed.indexOf(tween) == -1){
						this._completed.push(tween);
					}

//				this.dispatchEvent(new OjTweenEvent(OjTweenEvent.TICK));

					this._checkCompleted();
				},


				'_controlTweens' : function(command, args){
					var ln = this._tweens.length;

					while(ln-- > 0){
						this._tweens[ln][command].apply(this._tweens[ln], args);
					}
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

					return this._tweens.push(tween);
				},

				'removeTween' : function(tween){
					var index = this._tweens.indexOf(tween);

					if(index == -1){
						return;
					}

					tween.removeEventListener(OjTweenEvent.COMPLETE, this, '_onTweenComplete');

					this._tweens.splice(index, 1);

					this._checkCompleted();

					return tween;
				},

				'hasTween' : function(tween){
					return this._tweens.indexOf(tween) != -1;
				},

				'numTweens' : function(){
					return this._tweens.length;
				},


				'getTweens' : function(){
					return this._tweens.clone();
				},
				'setTweens' : function(tweens){
					var ln;

					if(this._tweens){
						ln = this._tweens.length;

						while(ln-- > 0){
							this.removeTween(this._tweens[ln]);
						}
					}

					this._tweens = [];

					if(tweens){
						ln = tweens.length;

						while(ln-- > 0){
							this.addTween(tweens[ln]);
						}
					}
				},

				'isFinished' : function(){
					return this._is_finished;
				}
			}
		);
	}
);