OJ.importJs('oj.renderers.OjItemRenderer');
OJ.importJs('oj.media.OjImage');


OJ.extendComponent(
    'OjListItem', [OjItemRenderer],
    {
        '_props_' : {
            'showAccessory' : false,
            'showIcon' : false
        },

        '_template' : 'oj.renderers.OjListItem',


        '_destructor' : function(/*depth = 0*/){
            var data = this._data;

            if(isObjective(data, OjActionable)){
                data.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
            }

            this._list = this._data = null;

            return this._super(OjItemRenderer, '_destructor', arguments);
        },


        '_redrawAccessory' : function(){
            if(this.showAccessory){
                this.removeCss('no-accessory');
            }
            else{
                this.addCss('no-accessory');
            }
        },

        '_redrawData' : function(){
            if(this._super(OjItemRenderer, '_redrawData', arguments)){
                this.content.text = this.data;

                return true;
            }

            return false;
        },

        '_redrawIcon' : function(){
            if(this.showIcon){
                this.removeCss('no-icon');
            }
            else{
                this.addCss('no-icon');
            }
        },


        'redraw' : function(){
            if(this._super(OjItemRenderer, 'redraw', arguments)){
                this._redrawAccessory();

                this._redrawIcon();

                return true;
            }

            return false;
        },


        '_onDataChange' : function(evt){
            this._redrawData();
        },


        '=data' : function(data){
            var old = this._data;

            if(isObjective(old, OjActionable)){
                old.removeEventListener(OjEvent.CHANGE, this, '_onDataChange');
            }

            this._data = data;

            if(isObjective(data, OjActionable)){
                data.addEventListener(OjEvent.CHANGE, this, '_onDataChange');
            }

            this.redraw();
        },

        '=showAccessory' : function(val){
            if(this._showAccessory == val){
                return;
            }

            this._showAccessory = val;

            this.redraw();
        },

        '=showIcon' : function(val){
            if(this._showIcon == val){
                return;
            }

            this._showIcon = val;

            this.redraw();
        }
    },
    {
        '_TAGS' : ['listitem']
    }
);