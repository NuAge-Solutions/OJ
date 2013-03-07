OJ.importJs('oj.data.Object');


'use strict';

OJ.compileClass(
	'OjActionable',
	oj.events.Actionable = function(){
		return new oj.data.Object(
			arguments, 'OjActionable',
			{
				'_properties_' : {
					'eventProxy' : null
				},

				'_prevent_dispatch' : false,


				'_constructor' : function(){
					this._eventProxy = this;

					this._super('OjActionable', '_constructor', arguments);
				},

				'_destructor' : function(){
					this.removeAllListeners();

					return this._super('OjActionable', '_destructor', arguments);
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
	}
);