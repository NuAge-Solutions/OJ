OJ.importJs('oj.data.OjObject');


'use strict';

OJ.extendClass(
	'OjActionable', [OjObject],
	{

		'_prevent_dispatch' : false,

//    '_actionable' : null,


		'_constructor' : function(){
			this._actionable = this;

			this._super(OjObject, '_constructor', arguments);
		},

		'_destructor' : function(){
			// dispatch a destroy event and then destroy all active listeners
			if(this._actionable){

				this.dispatchEvent(new OjEvent(OjEvent.DESTROY));

				this.removeAllListeners();

				this._actionable = null;
			}

			return this._super(OjObject, '_destructor', arguments);
		},


		'_listeners' : function(type) {
			return null;
		},

		'_updateListeners' : function(action, type){
			var type = type.ucFirst(),
				func = action == 'add' ? 'addEventListener' : 'removeEventListener',
				settings = this._listeners(type),
				ln = settings ? settings.length : 0,
				obj;

			if(ln){
				if((obj = settings[0]) && obj[func]){
					if(ln > 1){
						obj[func](settings[1], this, '_on' + type);
					}

					if(ln > 2){
						obj[func](settings[2], this, '_on' + type + 'Fail');
					}
				}
			}
		},


		'addEventListener' : function(type, context, callback){
			EventManager.addEventListener(this._actionable, type, context, callback);
		},

		'hasEventListener' : function(type){
			return EventManager.hasEventListener(this._actionable, type);
		},

		'hasEventListeners' : function(type/*|types, type*/){
			var args = arguments,
				  ln = args.length;

			if(ln == 1){
				if(isArray(args[0])){
					args = args[0];

					ln = args.length;
				}
				else{
					args = [args[0]];

					ln = 1;
				}
			}

			for(; ln--;){
				if(!EventManager.hasEventListener(this._actionable, args[ln])){
					return false;
				}
			}

			return true;
		},

		'removeAllListeners' : function(){
			return EventManager.removeAllListeners(this._actionable);
		},

		'removeEventListener' : function(type, context, callback){
			EventManager.removeEventListener(this._actionable, type, context, callback);
		},

		'dispatchEvent' : function(evt){
			if(this._prevent_dispatch || evt.isCanceled()){
				return;
			}

			EventManager.dispatchEvent(this._actionable, evt);
		}
	},
  {
    'ADD' : 'add',
    'REMOVE' : 'remove'
  }
);