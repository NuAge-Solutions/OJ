OJ.importJs('oj.data.OjObject');


'use strict';

OJ.extendClass(
	OjObject, 'OjActionable',
	{
		'_props_' : {
			'eventProxy' : null
		},

		'_prevent_dispatch' : false,


		'_constructor' : function(){
			this._eventProxy = this;

			this._super('OjActionable', '_constructor', arguments);
		},

		'_destructor' : function(){
			// dispatch a destroy event and then destroy all active listeners
			if(this._eventProxy){

				this.dispatchEvent(new OjEvent(OjEvent.DESTROY));

				this.removeAllListeners();

				this._eventProxy = null;
			}

			return this._super('OjActionable', '_destructor', arguments);
		},


		'_listeners' : function(type) {
			return null;
		},

		'_updateListeners' : function(action, type){
			var type = type.ucFirst(),
				func = action == 'add' ? 'addEventListener' : 'removeEventListener',
				settings = this._listeners(type),
				ln = settings ? settings.length : 0;

			if(ln){
				if(ln > 1){
					settings[0][func](settings[1], this, '_on' + type);
				}

				if(ln > 2){
					settings[0][func](settings[2], this, '_on' + type + 'Fail');
				}
			}
		},


		'addEventListener' : function(type, context, callback){
			EventManager.addEventListener(this._eventProxy, type, context, callback);
		},

		'hasEventListener' : function(type){
			return EventManager.hasEventListener(this._eventProxy, type);
		},

		'removeAllListeners' : function(){
			return EventManager.removeAllListeners(this._eventProxy);
		},

		'removeEventListener' : function(type, context, callback){
			EventManager.removeEventListener(this._eventProxy, type, context, callback);
		},

		'dispatchEvent' : function(evt){
			if(this._prevent_dispatch || evt.isCanceled()){
				return;
			}

			EventManager.dispatchEvent(this._eventProxy, evt);
		},


		'setEventProxy' : function(proxy){
			if(this._eventProxy){
				this.removeAllListeners();

				// todo: add in a way to transfer existing listeners to the new proxy
			}

			this._eventProxy = proxy;
		}
	}
);