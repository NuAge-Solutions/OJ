OJ.importJs('oj.data.OjObject');


'use strict';

OJ.extendClass(
	'OjEvent', [OjObject],
	{
		'_get_props_' : {
			'bubbles'       : false,
			'cancelable'    : false,
			'currentTarget' : null,
			'phase'         : 0,
			'target'        : null,
			'type'          : null
		},

		'_canceled' : false,


		'_constructor' : function(type/*, bubbles = false, cancelable = false*/){
			var args = arguments,
				ln = args.length;

			this._super(OjObject, '_constructor', []);

			this._type = type;

			if(ln > 1){
				this._bubbles = args[1];

				if(ln > 2){
					this._cancelable = args[2];
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
	},
	{
		'ADDED'    : 'onAdded',
		'OPEN'     : 'onOpen',
		'CANCEL'   : 'onCancel',
		'CHANGE'   : 'onChange',
		'CLOSE'    : 'onClose',
		'COMPLETE' : 'onComplete',
		'DESTROY'  : 'onDestroy',
		'FAIL'     : 'onFail',
		'HIDE'     : 'onHide',
		'INIT'     : 'onInit',
		'LOAD'     : 'onLoad',
		'OK'       : 'onOk',
		'READY'    : 'onReady',
		'REMOVED'  : 'onRemoved',
		'SHOW'     : 'onShow',
		'SUBMIT'   : 'onSubmit',

		'ADDED_TO_DISPLAY'      : 'onAddToDisplay',
		'REMOVED_FROM_DISPLAY'  : 'onRemovedFromDisplay'
	}
);