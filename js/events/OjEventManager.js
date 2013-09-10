OJ.importJs('oj.data.OjObject');
OJ.importJs('oj.events.OjEvent');


'use strict';

OJ.extendManager(
	'EventManager', 'OjEventManager', [OjObject],
	{
		'_events' : {},  '_index' : {},


		'_constructor' : function(){
      this._super(OjObject, '_constructor', []);

			var ready,
				timer,
				onChange = function(e){
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
				},
				fireDOMReady = function(){
					if(!ready){
            ready = true;

						if(document.removeEventListener){
							document.removeEventListener('DOMContentLoaded', onChange, false);
						}

            clearInterval(timer);

						document.onreadystatechange = window.onload = timer = null;

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

			var events = this._events,
				target_id = target.id(),
				listener, listeners, key;

			evt._currentTarget = target;

			if(events[type] && events[type][target_id]){
				listeners = events[type][target_id];

				for(key in listeners){
					listener = listeners[key];

					if(listener && isFunction(listener.callback)){
						listener.callback.call(listener.context, evt);
					}
				}
			}
		},

		'_getIndex' : function(target_id, params){
			var index = this._index;

			if(!index[target_id]){
				index[target_id] = {};
			}

			index[target_id][params[0] + ':' + params[1] + ':' + params[3]] = params;
		},


		'addEventListener' : function(target, type, context, callback){
			// make sure the callback is a function
			callback = isString(callback) ? context[callback] : callback;

			// get the unique ids needed to qualify listeners
			var events = this._events,
				target_id = target.id(),
				context_id = context == window ? 'window' : context.id(),
				guid = context_id + ':' + (callback.guid ? callback.guid : callback.guid = OJ.guid());

			// make sure we have a holder for this type of event
			if(!events[type]){
				events[type] = {};
			}

			// make sure we have a holder for this target on this type of event
			if(!events[type][target_id]){
				events[type][target.id()] = {};
			}

			// only make changes if we haven't already recorded this listener
			if(!events[type][target_id][guid]){
				events[type][target_id][guid] = {
					'callback' : callback,
					'context' : context
				};

				// track the listener by the target for cleanup purposes
				this._getIndex(target_id, [target_id, type, context_id, guid]);
				this._getIndex(context_id, [target_id, type, context_id, guid]);
			}
		},

		'dispatchEvent' : function(target, evt){
			var type = evt.getType(),
				parent;

			evt._target = evt._target ? evt._target : target;
			evt._currentTarget = target;

			this._dispatchEvents(evt, type, target);

			if(evt._bubbles){
				parent = target;

				while(parent && isFunction(parent.parent) && (parent = parent.parent())){
					this._dispatchEvents(evt, type, parent);
				}

				if(parent && parent != OJ){
					this._dispatchEvents(evt, type, OJ);
				}
			}
		},

		'hasEventListener' : function(target, type){
			var events = this._events;

			if(events[type] && events[type][target.id()]){
				return true;
			}

			return false;
		},

		'_removeEventListener' : function(target_id, type, context_id, guid){
			var events = this._events,
				index = this._index,
				i = target_id + ':' + type + ':' + guid;

			// cleanup the events
			if(events[type] && events[type][target_id] && events[type][target_id][guid]){
				delete events[type][target_id][guid];

				if(isEmptyObject(events[type][target_id])){
					delete events[type][target_id];

					if(isEmptyObject(events[type])){
						delete events[type];
					}
				}
			}

			// cleanup the index
			if(index[target_id] && index[target_id][i]){
				delete index[target_id][i];

				if(isEmptyObject(index[target_id])){
					delete index[target_id];
				}
			}

			if(index[context_id] && index[context_id][i]){
				delete index[context_id][index];

				if(isEmptyObject(index[context_id])){
					delete index[context_id];
				}
			}
		},

		'removeAllListeners' : function(target){
			var target_id = target.id(),
				events, evt;

			if(events = this._index[target_id]){
				for(evt in events){
					this._removeEventListener.apply(this, events[evt]);
				}

				delete this._index[target_id];
			}
		},

		'removeEventListener' : function(target, type, context, callback){
			var events = this._events,
				target_id = target.id(),
				context_id = context.id(),
				guid;

			if(events[type]){
				if(events[type][target_id]){
					if(callback = isString(callback) ? context[callback] : callback){
						guid = context_id + ':' + callback.guid;

						if(events[type][target_id][guid]){
							this._removeEventListener(target_id, type, context_id, guid);
						}
					}
				}
			}
		}
	}
);