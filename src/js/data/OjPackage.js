importJs('oj.events.OjActionable');


OJ.extendClass(
  'OjPackage', [OjActionable],
  {
    '_onOjLoad' : function(evt){
      OJ.removeEventListener(OjEvent.LOAD, this, '_onOjLoad');
    },

    '_onOjReady' : function(evt){
      OJ.removeEventListener(OjEvent.READY, this, '_onOjReady');
    }
  }
);