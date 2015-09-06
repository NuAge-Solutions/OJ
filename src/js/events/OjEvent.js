OJ.importJs('oj.data.OjObject');


OJ.extendClass(
    'OjEvent', [OjObject],
    {
        '_get_props_' : {
            'bubbles' : null,
            'cancelable' : null,
            'currentTarget' : null,
            'isCanceled' : false,
            'phase' : 0,
            'target' : null,
            'type' : null
        },


        '_constructor' : function(type/*, bubbles = false, cancelable = false*/){
            this._super(OjObject, '_constructor', []);

            this._processArguments(arguments, {
                '_type' : type,
                '_bubbles' : false,
                '_cancelable' : false
            });
        },

        'cancel' : function(){
            if(this._cancelable){
                this._isCanceled = true;
            }
        },

        'clone' : function(){
            var evt = this._super(OjObject, 'clone', arguments);
            evt._bubbles = this.bubbles;
            evt._cancelable = this.cancelable;
            evt._type = this.type;

            return evt;
        },

        'cloneWithChanges' : function(delta){
            var clone = this.clone(), key;

            for(key in delta){
                if(key != 'currentTarget' || key != 'phase' || key != 'target'){
                    clone['_' + key] = delta[key];
                }
            }

            return clone;
        }
    },
    {
        'ADDED' : 'onAdded',
        'OPEN' : 'onOpen',
        'CANCEL' : 'onCancel',
        'CHANGE' : 'onChange',
        'CLOSE' : 'onClose',
        'COMPLETE' : 'onComplete',
        'DESTROY' : 'onDestroy',
        'FAIL' : 'onFail',
        'HIDE' : 'onHide',
        'INIT' : 'onInit',
        'LOAD' : 'onLoad',
        'OK' : 'onOk',
        'READY' : 'onReady',
        'REMOVED' : 'onRemoved',
        'SHOW' : 'onShow',
        'SUBMIT' : 'onSubmit',
        'UNLOAD' : 'onUnload',

        'ADDED_TO_DISPLAY' : 'onAddToDisplay',
        'REMOVED_FROM_DISPLAY' : 'onRemovedFromDisplay'
    }
);