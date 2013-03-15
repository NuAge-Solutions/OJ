OJ.importJs('oj.events.Actionable');
OJ.importJs('oj.events.Event');
OJ.importJs('oj.net.Url');
OJ.importJs('oj.timer.Timer');


'use strict';

OJ.extendManager(
	'HistoryManager', OjActionable, 'OjHistoryManager',
	{
		'_previous' : null,  '_next' : null,  '_current' : 0,  '_native' : false,  '_timer' : 0,

		'_ignore_next' : false,  '_list' : null,


		'PREVIOUS'  : 'previous',
		'NEXT'      : 'next',
		'FORWARD'   : 'historyForward',
		'BACK'      : 'historyBack',
		'CHANGE'    : 'historyChange',


		'_constructor' : function(){
			this._s('OjHistoryManager', '_constructor', arguments);

			this._list = [new OjUrl(window.location.href)];

			try{
				var prev = window.history.previous;

				this._native = true;

				prev = null;
			}
			catch(e){}

			if('onhashchange' in window){
				// Add listener for url change
				window.onhashchange = function(evt){
					HistoryManager._onChange(evt)
				};
			}
			else{
				// Add timer to listener for url change
				this._timer = new OjTimer(1000, 0);
				this._timer.addEventListener(OjTimer.TICK, HistoryManager, '_onChange');
				this._timer.start();
			}
		},

		'_destructor' : function(){
			OJ.destroy(this._timer);

			return this._s('OjHistoryManager', '_destructor', arguments);
		},


		'_onChange' : function(){
			var old_url = HistoryManager.get();

			// check to see if the url has changed
			if(old_url.toString() != window.location.href){
				var new_url = new OjUrl(window.location.href);

				// check to see if the url change was page driven or browser driven
				// < 0 browser driven
				// > -1 page driven
				if(OJ.getDepth() < 0){
					// check for a back button click
					if(new_url.toString() == this.get(-1).toString()){
						this._current--;
					}
					// check for a forward button click
					else if(new_url.toString() == this.get(this._current + 1).toString()){
						this._current++;
					}
					// we assume that if it wasn't a forward or a back button click that we know of then it is a back button click we did not know about
					// therefore we make an adjustment to our history list and current positioning
					else{
						this._current = 0;

						this._list.unshift(new_url);
					}
				}
				else{
					if(this._current == 0){
						this._list = [this._list[0]];
					}
					else{
						this._list = this._list.slice(0, this._current + 1);
					}

					this._list.push(new_url);

					this._current = this._list.length - 1;
				}

				this._previous = this.get(-1);

				this._next = this.get(this._current + 1);

				this._dispatchChange(old_url, new_url);
			}
		},

		'_dispatchChange' : function(old_url, new_url){
			this.dispatchEvent(new OjEvent(HistoryManager.CHANGE, true));
		},


		'get' : function(){
			var url, index = arguments.length ? arguments[0] : this._current;

			if(this._native){
				if(window.history[index]){
					return new OjUrl(window.history[index]);
				}

				url = this._list[index];
			}
			else if(index < 0){
				url = this._list[Math.max(this._current + index, 0)];
			}
			else if(index >= this._list.length){
				url = this._list[this._list.length - 1];
			}
			else {
				url = this._list[index];
			}

			return url ? url.clone() : null;
		},

		'previous' : function(){
			return this._previous;
		},

		'next' : function(){
			return this._next;
		},

		'go' : function(val){
			if(this._native){
				window.history.go(val);

				return;
			}

			var url;

			if(isNaN(index)){
				var ln = this._list.length;

				while(ln-- > 0){
					if(this._list[ln].toString() == val){
						url = val;

						break;
					}
				}

				this._current = ln;
			}
			else{
				url = this.get(val);

				this._current = val;
			}

			OJ.open(url);
		},

		'forward' : function(){
			if(this._native){
				window.history.forward();

				return;
			}

			OJ.open(this.get(this._current + 1));
		},

		'back' : function(){
			if(this._native){
				window.history.back();

				return;
			}

			OJ.go(this.get(this._current - 1));
		},

		'length' : function(){
			return this._list.length;
		}
	}
);