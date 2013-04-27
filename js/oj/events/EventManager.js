OJ.importJs('oj.data.Object');
OJ.importJs('oj.events.Event');


'use strict';

OJ.extendManager(
	'EventManager', OjObject, 'OjEventManager',
	{
		'_events' : {},  '_index' : {},


		'_constructor' : function(){
			this._super('OjEventManager', '_constructor', arguments);

			var ready, timer;

			var onChange = function(e){
				if(e && e.type == 'DOMContentLoaded'){
					fireDOMReady();
				}
				else if(e && e.type == 'load'){
					fireDOMReady();
				}
				else if(document.readyState){
					if((/loaded|complete/).test(document.readyState)){
						fireDOMReady();
					}
					else if(!!document.documentElement.doScroll){
						try{
							ready || document.documentElement.doScroll('left');
						}
						catch(e){
							return;
						}

						fireDOMReady();
					}
				}
			};

			var fireDOMReady = function(){
				if(!ready){
					ready = true;

					if(document.removeEventListener){
						document.removeEventListener('DOMContentLoaded', onChange, false);
					}

					document.onreadystatechange = null;

					window.onload = null;

					clearInterval(timer);

					timer = null;

					window.onDomReady();
				}
			};

			// add the listener to the document
			if(document.addEventListener){
				document.addEventListener('DOMContentLoaded', onChange, false);
			}

			document.onreadystatechange = onChange;

			timer = setInterval(onChange, 5);

			window.onload = onChange;

			return this;
		},


		'_dispatchEvents' : function(evt, type, target){
			if(evt.isCanceled()){
				return;
			}

			var target_id = target.id();

			evt._currentTarget = target;

			if(this._events[type] && this._events[type][target_id]){
				var listeners = this._events[type][target_id], listener, key;

				for(key in listeners){
					listener = listeners[key];

					if(listener && isFunction(listener.callback)){
						listener.callback.call(listener.context, evt);
					}
				}

				listeners = listener = key = null;
			}

			target_id = null;
		},

		'_getIndex' : function(target_id, params){
			if(!this._index[target_id]){
				this._index[target_id] = {};
			}

			this._index[target_id][params[0] + ':' + params[1] + ':' + params[3]] = params;
		},


		'addEventListener' : function(target, type, context, callback){
			// make sure we have a holder for this type of event
			if(!this._events[type]){
				this._events[type] = {};
			}

			// make sure the callback is a function
			callback = isString(callback) ? context[callback] : callback;

			// get the unique ids needed to qualify listeners
			var target_id = target.id(),
				context_id = context == window ? 'window' : context.id(),
				guid = context_id + ':' + (callback.guid ? callback.guid : callback.guid = OJ.guid());

			// make sure we have a holder for this target on this type of event
			if(!this._events[type][target_id]){
				this._events[type][target.id()] = {};
			}

			// only make changes if we haven't already recorded this listener
			if(!this._events[type][target_id][guid]){
				this._events[type][target_id][guid] = {
					'callback' : callback,
					'context' : context
				};

				// track the listener by the target for cleanup purposes
				this._getIndex(target_id, [target_id, type, context_id, guid]);
				this._getIndex(context_id, [target_id, type, context_id, guid]);
			}
		},

		'dispatchEvent' : function(target, evt){
			var type = evt.getType();

			evt._target = evt._target ? evt._target : target;
			evt._currentTarget = target;

			this._dispatchEvents(evt, type, target);

			if(evt._bubbles){
				var parent = target;

				while(parent && isFunction(parent.parent) && (parent = parent.parent())){
					this._dispatchEvents(evt, type, parent);
				}

				if(parent && parent != OJ){
					this._dispatchEvents(evt, type, OJ);
				}
			}
		},

		'hasEventListener' : function(target, type){
			if(this._events[type] && this._events[type][target.id()]){
				return true;
			}

			return false;
		},

		'_removeEventListener' : function(target_id, type, context_id, guid){
			// cleanup the events
			if(this._events[type] && this._events[type][target_id] && this._events[type][target_id][guid]){
				delete this._events[type][target_id][guid];

				if(isEmptyObject(this._events[type][target_id])){
					delete this._events[type][target_id];

					if(isEmptyObject(this._events[type])){
						delete this._events[type];
					}
				}
			}

			// cleanup the index
			var index = target_id + ':' + type + ':' + guid;

			if(this._index[target_id] && this._index[target_id][index]){
				delete this._index[target_id][index];

				if(isEmptyObject(this._index[target_id])){
					delete this._index[target_id];
				}
			}

			if(this._index[context_id] && this._index[context_id][index]){
				delete this._index[context_id][index];

				if(isEmptyObject(this._index[context_id])){
					delete this._index[context_id];
				}
			}
		},

		'removeAllListeners' : function(target){
			var target_id = target.id(), events, evt;

			if(events = this._index[target_id]){
				for(evt in events){
					this._removeEventListener.apply(this, events[evt]);
				}

				delete this._index[target_id];
			}
		},

		'removeEventListener' : function(target, type, context, callback){
			if(this._events[type]){
				var target_id = target.id();

				if(this._events[type][target_id]){
					if(callback = isString(callback) ? context[callback] : callback){
						var context_id = context.id(), guid = context_id + ':' + callback.guid;

						if(this._events[type][target_id][guid]){
							this._removeEventListener(target_id, type, context_id, guid);
						}
					}
				}
			}
		}
	}
);