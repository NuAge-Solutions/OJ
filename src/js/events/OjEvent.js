importJs('oj.data.OjObject');


OJ.extendClass(
    'OjEvent', [OjObject],
    {
        '_get_props_' : {
            'bubbles' : null,
            'cancelable' : null,
            'canceled' : false,
            'current_target' : null,
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
                this._canceled = true;
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
                if(key != 'current_target' || key != 'phase' || key != 'target'){
                    clone['_' + key] = delta[key];
                }
            }

            return clone;
        },

        "exportData" : function(mode, processed){
            processed = processed || [];

            var self = this,
                data = self._super(OjObject, "exportData", [mode, processed]);

            data.bubbles = self.bubbles;
            data.cancelable = self.cancelable;
            data.current_target = OjObject.exportData(self.current_target, mode, processed);
            data.canceled = self.canceled;
            data.phase = self.phase;
            data.target = OjObject.exportData(self.target, mode, processed);
            data.type = self.type;

            return data;
        },

        "importData": function(data, mode){
            var self = this;

            if(isSet(data.bubbles)){
                self._bubbles = data.bubbles;
            }

            if(isSet(data.cancelable)){
                self._cancelable = data.cancelable;
            }

            if(isSet(data.canceled)){
                self._canceled = data.canceled;
            }

            if(isSet(data.current_target)){
                self._current_target = OjObject.importData(data.current_target);
            }

            if(isSet(data.phase)){
                self._phase = data.phase;
            }

            if(isSet(data.target)){
                self._target = OjObject.importData(data.target);
            }

            if(isSet(data.type)){
                self._type = data.type;
            }

            return self;
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