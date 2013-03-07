OJ.importJs('oj.data.Object');


'use strict';

OJ.compileClass(
	'OjEvent',
	oj.events.Event = function(){
		return new oj.data.Object(
			arguments, 'OjEvent',
			{
				'_get_properties_' : {
					'bubbles'       : false,
					'cancelable'    : false,
					'currentTarget' : null,
					'phase'         : 0,
					'target'        : null,
					'type'          : null
				},

				'_canceled' : false,


				'_constructor' : function(type/*, bubbles = false, cancelable = false*/){
					this._super('OjEvent', '_constructor', []);

					var ln = arguments.length;

					this._type = type;

					if(ln > 1){
						this._bubbles = arguments[1];

						if(ln > 2){
							this._cancelable = arguments[2];
						}
					}
				},

				'cancel' : function(){
					if(this._cancelable){
						this._canceled = true;
					}
				},

				'clone' : function(){
					var clone = new window[this._class_name](this._type);

					clone._bubbles = this._bubbles;
					clone._cancelable = this._cancelable;

					return clone;
				},

				'cloneWithChanges' : function(delta){
					var clone = this.clone(), key;

					for(key in delta){
						if(key != 'currentTarget' || key != 'phase' || key != 'target'){
							clone['_' + key] = delta[key];
						}
					}

					return clone;
				},

				'isCanceled' : function(){
					return this._canceled;
				}
			}
		);
	},
	{
		'ADDED'    : 'ojAdded',
		'OPEN'     : 'ojOpen',
		'CANCEL'   : 'ojCancel',
		'CHANGE'   : 'ojChange',
		'CLOSE'    : 'ojClose',
		'COMPLETE' : 'ojComplete',
		'FAIL'     : 'ojFail',
		'HIDE'     : 'ojHide',
		'OK'       : 'ojOk',
		'READY'    : 'ojReady',
		'REMOVED'  : 'ojRemoved',
		'SHOW'     : 'ojShow',
		'SUBMIT'   : 'ojSubmit',

		'ADDED_TO_DISPLAY'      : 'onAddToDisplay',
		'REMOVED_FROM_DISPLAY'  : 'onRemovedFromDisplay'
	}
);